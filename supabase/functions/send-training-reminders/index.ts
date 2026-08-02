// supabase/functions/send-training-reminders/index.ts
//
// Lembretes das sessões de /treinamentos: 1 dia antes (d1) e 1 hora antes (h1).
//
// Reunião do Zoom NAO manda lembrete automático (só Webinar manda) — por isso
// este disparador existe. Chamado por pg_cron a cada 10 minutos.
//
// Estratégia: janela de tempo em vez de crons fixos por sessão. Sessão nova é um
// INSERT em training_sessions, não uma edição de cron; e o offset de fuso vem do
// Intl, então continua correto se o horário de verão voltar.
//
// Idempotência: claim-then-send. O claim insere training_reminders com status
// 'pending' ANTES do envio, e o unique (registration_id, occurrence_date, kind)
// garante um lembrete só, mesmo com a mesma janela caindo em vários ticks.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
// Domínio sem o "i" de propósito (anti-spam). Ver supabase/EMAILS-LIVE.md:10.
// Trocar para orbitgestao.com.br quebra o envio: não é o domínio verificado.
const FROM_EMAIL = Deno.env.get("TRAINING_FROM_EMAIL") || "noreply@orbtgestao.com.br";
const FROM_NAME = "Orbit Gestão";
const SITE = "https://orbitgestao.com.br";
const TZ = "America/Sao_Paulo";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
};

// Janelas em minutos antes do início. Com cron a cada 10 min, cada ocorrência cai
// na janela em vários ticks; o primeiro reivindica e envia, os outros não acham
// nada (o unique de training_reminders garante isso).
//
// As janelas são largas de propósito: a d1 cobre 60 min e a h1 cobre 35, então
// dois ticks perdidos seguidos (function fria, pg_net com erro) ainda deixam o
// lembrete sair. Janela estreita = lembrete silenciosamente não enviado.
const WINDOWS = {
  d1: { min: 1410, max: 1470 }, // 23h30 a 24h30 antes
  h1: { min: 50, max: 85 },     // 50min a 1h25 antes
} as const;

type Kind = keyof typeof WINDOWS;

interface SessionRow {
  slug: string;
  title: string;
  kind: string;
  weekday: number;
  start_time: string;
  duration_min: number;
  zoom_join_url: string | null;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const BRT_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: TZ,
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit",
  hourCycle: "h23",
});

/** Partes do relógio local de São Paulo para um instante. */
function brtParts(at: Date) {
  const p: Record<string, string> = {};
  for (const part of BRT_FMT.formatToParts(at)) {
    if (part.type !== "literal") p[part.type] = part.value;
  }
  return {
    year: Number(p.year),
    month: Number(p.month),
    day: Number(p.day),
    hour: Number(p.hour),
    minute: Number(p.minute),
    second: Number(p.second),
    dateStr: `${p.year}-${p.month}-${p.day}`,
  };
}

/**
 * Offset de São Paulo no instante dado, em minutos (-180 hoje).
 * Lê o relógio local como se fosse UTC e compara com o instante real — assim o
 * valor sai do próprio Intl, e não de um -3 cravado que quebraria se o horário
 * de verão voltasse.
 */
function brtOffsetMin(at: Date): number {
  const b = brtParts(at);
  const wallAsUtc = Date.UTC(b.year, b.month - 1, b.day, b.hour, b.minute, b.second);
  return Math.round((wallAsUtc - at.getTime()) / 60000);
}

/** Instante UTC em que começa a ocorrência de data local `dateStrBRT` às `startTime`. */
function occurrenceStartUtc(dateStrBRT: string, startTime: string): Date {
  const [y, m, d] = dateStrBRT.split("-").map(Number);
  const [hh, mm] = startTime.split(":").map(Number);
  const naive = Date.UTC(y, m - 1, d, hh, mm, 0);
  // uma iteração basta: o offset só muda em transição de DST, e a correção
  // recalculada no instante aproximado já cai do lado certo.
  const off1 = brtOffsetMin(new Date(naive));
  const off2 = brtOffsetMin(new Date(naive - off1 * 60000));
  return new Date(naive - off2 * 60000);
}

/** Próximas ocorrências (datas locais BRT) de uma sessão, a partir de `from`. */
function upcomingOccurrences(s: SessionRow, from: Date, days = 3) {
  const out: { dateBRT: string; startUtc: Date }[] = [];
  const b = brtParts(from);
  // varre dia a dia no calendário local
  for (let i = 0; i <= days; i++) {
    const probe = new Date(Date.UTC(b.year, b.month - 1, b.day + i, 12, 0, 0));
    const pb = brtParts(probe);
    const dow = new Date(Date.UTC(pb.year, pb.month - 1, pb.day)).getUTCDay();
    if (dow !== s.weekday) continue;
    const startUtc = occurrenceStartUtc(pb.dateStr, s.start_time);
    if (startUtc.getTime() > from.getTime()) out.push({ dateBRT: pb.dateStr, startUtc });
  }
  return out;
}

function subjectFor(kind: Kind, s: SessionRow, weekdayLabel: string, timeLbl: string): string {
  if (kind === "d1") return `Amanhã: ${s.title} Orbit · ${weekdayLabel} ${timeLbl}`;
  return `Começa em 1 hora: ${s.title} Orbit — entre pelo Zoom`;
}

function htmlFor(
  kind: Kind,
  s: SessionRow,
  nome: string,
  joinUrl: string,
  dateLabel: string,
  timeLbl: string,
  unsubUrl: string
): string {
  const first = (nome || "").trim().split(/\s+/)[0] || "Olá";
  const isTreino = s.kind === "treinamento";
  const headline = kind === "d1" ? "Amanhã tem sessão!" : "Começa em 1 hora!";
  // Sem prometer que a dúvida será resolvida ao vivo — não está sob nosso controle.
  // O que a sessão entrega é resposta e direção.
  const pitch = isTreino
    ? "É aula preparada, passo a passo. Se puder, deixe o Orbit aberto ao lado para acompanhar."
    : "A pauta é sua: chegue com a dúvida ou o caso que quer entender, e a gente responde ao vivo.";
  const cta = kind === "d1" ? "VER O LINK DE ACESSO" : "ENTRAR AGORA";

  return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;">
<div style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);padding:40px 32px;text-align:center;">
<img src="${SITE}/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;">
<h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">${headline}</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;font-weight:600;">${s.title} · ${dateLabel} às ${timeLbl}</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">${
    kind === "d1"
      ? `Amanhã, <strong style="color:#ffba1a;">${dateLabel} às ${timeLbl}</strong>, acontece o <strong style="color:#fff;">${s.title}</strong>.`
      : `Falta <strong style="color:#ffba1a;">1 hora</strong> para o <strong style="color:#fff;">${s.title}</strong> começar.`
  }</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">${pitch}</p>
<div style="text-align:center;margin:32px 0;">
<a href="${joinUrl}" style="display:inline-block;background:#2D8CFF;color:#fff;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">${cta}</a>
</div>
<p style="font-size:13px;line-height:1.6;color:#8B949E;text-align:center;">Este é o seu link pessoal de acesso — não precisa se inscrever de novo.</p>
</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#484F58;margin:0 0 8px;">Orbit Gestão — Gestão Operada por IA</p>
<p style="font-size:11px;color:#484F58;margin:0;"><a href="${unsubUrl}" style="color:#6B7280;">Não quero mais receber lembretes destas sessões</a></p>
</div>
</div>`;
}

async function sendOne(
  to: string,
  nome: string,
  subject: string,
  html: string,
  emailType: string,
  unsubUrl: string
): Promise<{ ok: boolean; messageId: string | null; status: number }> {
  const resp = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${MAILERSEND_KEY}` },
    body: JSON.stringify({
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: to, name: nome || to }],
      subject,
      html,
      headers: [{ name: "List-Unsubscribe", value: `<${unsubUrl}>` }],
    }),
  });
  const ok = resp.status === 202;
  const messageId = resp.headers.get("x-message-id") || null;

  // log no mesmo lugar das outras send-*
  await fetch(`${SUPABASE_URL}/rest/v1/email_logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email_type: emailType,
      recipient_email: to,
      recipient_name: nome,
      resend_id: messageId,
      success: ok,
      error_message: ok ? null : `HTTP ${resp.status}`,
    }),
  }).catch(() => {});

  return { ok, messageId, status: resp.status };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const body = await req.json().catch(() => ({}));

  // A anon key é pública (está no bundle do site), então sozinha não é gate.
  const secret = Deno.env.get("CRON_SECRET") || "";
  if (secret && req.headers.get("x-cron-secret") !== secret) {
    return json({ ok: false, error: "forbidden" }, 403);
  }
  if (!MAILERSEND_KEY) {
    console.error("[send-training-reminders] MAILERSEND_API_KEY missing");
    return json({ ok: false, skipped: true, reason: "missing_mailersend_key" });
  }

  const dryRun = Boolean(body?.dry_run);
  const limit = Math.min(Number(body?.limit) || 200, 500);
  const kinds: Kind[] =
    body?.kind === "d1" ? ["d1"] : body?.kind === "h1" ? ["h1"] : ["d1", "h1"];
  // `now` forçado permite testar sem esperar o horário real
  const now = body?.now ? new Date(String(body.now)) : new Date();
  if (Number.isNaN(now.getTime())) return json({ ok: false, error: "invalid_now" }, 400);

  const sb = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: sessions, error: sErr } = await sb
    .from("training_sessions")
    .select("slug,title,kind,weekday,start_time,duration_min,zoom_join_url")
    .eq("active", true);
  if (sErr) {
    console.error("[send-training-reminders] sessions query failed", sErr);
    return json({ ok: false, error: "sessions_unavailable" }, 500);
  }

  const targets: Record<string, unknown>[] = [];
  let pendingTail = 0;

  for (const s of (sessions || []) as SessionRow[]) {
    for (const occ of upcomingOccurrences(s, now, 3)) {
      const leadMin = Math.round((occ.startUtc.getTime() - now.getTime()) / 60000);
      for (const kind of kinds) {
        const w = WINDOWS[kind];
        if (leadMin <= w.min || leadMin > w.max) continue;

        const b = brtParts(occ.startUtc);
        const weekdayLabel = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, weekday: "long" })
          .format(occ.startUtc);
        const dateLabel = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, day: "2-digit", month: "long" })
          .format(occ.startUtc);
        const timeLbl = b.minute ? `${String(b.hour).padStart(2, "0")}h${String(b.minute).padStart(2, "0")}` : `${b.hour}h`;

        if (dryRun) {
          targets.push({ slug: s.slug, occurrence_date: occ.dateBRT, kind, lead_min: leadMin, dry_run: true });
          continue;
        }

        const { data: claimed, error: cErr } = await sb.rpc("claim_training_reminders", {
          p_slug: s.slug,
          p_date: occ.dateBRT,
          p_kind: kind,
          p_limit: limit,
        });
        if (cErr) {
          console.error("[send-training-reminders] claim failed", s.slug, kind, cErr);
          continue;
        }

        const rows = (claimed || []) as {
          reminder_id: string; registration_id: string;
          nome: string; email: string; join_url: string | null;
        }[];

        let sent = 0;
        let failed = 0;
        let stopped = false;

        for (const r of rows) {
          const joinUrl = r.join_url || s.zoom_join_url || `${SITE}/treinamentos`;
          const unsubUrl = `${SUPABASE_URL}/functions/v1/training-unsubscribe?r=${r.registration_id}`;
          const res = await sendOne(
            r.email,
            r.nome,
            subjectFor(kind, s, weekdayLabel, timeLbl),
            htmlFor(kind, s, r.nome, joinUrl, dateLabel, timeLbl, unsubUrl),
            `treinamento_${kind}_${s.slug}`,
            unsubUrl
          );

          if (res.ok) {
            sent++;
            await sb.from("training_reminders")
              .update({ status: "sent", sent_at: new Date().toISOString(), message_id: res.messageId })
              .eq("id", r.reminder_id);
          } else {
            failed++;
            await sb.from("training_reminders")
              .update({ status: res.status === 429 ? "pending" : "failed", error: `HTTP ${res.status}` })
              .eq("id", r.reminder_id);
            // 429 do MailerSend: para o loop e deixa a cauda para o próximo tick
            if (res.status === 429) {
              stopped = true;
              console.warn("[send-training-reminders] mailersend 429, stopping batch", s.slug, kind);
              break;
            }
          }
          await new Promise((r2) => setTimeout(r2, 120)); // respiro do rate limit
        }

        if (stopped) pendingTail += rows.length - sent - failed;
        targets.push({ slug: s.slug, occurrence_date: occ.dateBRT, kind, claimed: rows.length, sent, failed });
      }
    }
  }

  return json({ ok: true, ran_at: now.toISOString(), dry_run: dryRun, targets, pending_tail: pendingTail });
});
