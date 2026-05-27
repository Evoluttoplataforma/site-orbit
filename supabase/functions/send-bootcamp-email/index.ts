import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_EMAIL = "noreply@orbtgestao.com.br";
const FROM_NAME = "Orbit - Bootcamp";

// ═══ CONFIG DO EVENTO ═══
const EVENT_DATE = "2026-06-13";            // YYYY-MM-DD
const EVENT_HOUR_BRT = 9;                   // 09h BRT
const EVENT_DURATION_MIN = 240;             // 4 horas
const ONLINE_LINK = "https://www.youtube.com/@orbitgestao/live";
const PRESENCIAL_LOCAL = "Square SC — Rod. José Carlos Daux, 5500 — Saco Grande, Florianópolis/SC, 88032-005";
// TODO: trocar pelo link real do grupo de avisos (enquanto for CHANGE_ME, o botão é omitido)
const WHATSAPP_GROUP = "https://chat.whatsapp.com/CHANGE_ME";
const HAS_WHATSAPP = !WHATSAPP_GROUP.includes("CHANGE_ME");
const PAGE_URL = "https://orbitgestao.com.br/bootcamp-orbit";

type EmailType = "confirmacao" | "lembrete_d1" | "dia_evento" | "ao_vivo";
type Modo = "online" | "presencial";

// ═══ .ICS (convite de calendário) ═══
function buildICS(modo: Modo): string {
  const [y, m, d] = EVENT_DATE.split("-").map(Number);
  // BRT -03:00 → UTC: soma 3h
  const startUTC = new Date(Date.UTC(y, m - 1, d, EVENT_HOUR_BRT + 3, 0, 0));
  const endUTC = new Date(startUTC.getTime() + EVENT_DURATION_MIN * 60 * 1000);
  const fmt = (dt: Date) =>
    dt.getUTCFullYear().toString() +
    String(dt.getUTCMonth() + 1).padStart(2, "0") +
    String(dt.getUTCDate()).padStart(2, "0") +
    "T" +
    String(dt.getUTCHours()).padStart(2, "0") +
    String(dt.getUTCMinutes()).padStart(2, "0") +
    "00Z";
  const esc = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
  const local = modo === "presencial" ? PRESENCIAL_LOCAL : ONLINE_LINK;
  const description =
    modo === "presencial"
      ? `Bootcamp Orbit — Imersão Canais (PRESENCIAL). Local: ${PRESENCIAL_LOCAL}. Detalhes: ${PAGE_URL}`
      : `Bootcamp Orbit — Imersão Canais (ONLINE AO VIVO). Link: ${ONLINE_LINK}`;
  const uid = `bootcamp-orbit-${modo}-${EVENT_DATE.replace(/-/g, "")}-${Math.random().toString(36).slice(2, 10)}@orbitgestao.com.br`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Orbit Gestao//Bootcamp//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(startUTC)}`,
    `DTEND:${fmt(endUTC)}`,
    `SUMMARY:${esc("Bootcamp Orbit — Imersão Canais")}`,
    `DESCRIPTION:${esc(description)}`,
    `LOCATION:${esc(local)}`,
    `URL:${modo === "presencial" ? PAGE_URL : ONLINE_LINK}`,
    `ORGANIZER;CN=Bootcamp Orbit:MAILTO:${FROM_EMAIL}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "BEGIN:VALARM",
    "TRIGGER:-PT60M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc("Bootcamp Orbit comeca em 1 hora")}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function toBase64(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function getSubject(type: EmailType, modo: Modo): string {
  switch (type) {
    case "confirmacao":
      return modo === "presencial"
        ? "🎖️ ALISTAMENTO CONFIRMADO — Bootcamp Orbit (Presencial · Floripa)"
        : "🎖️ ALISTAMENTO CONFIRMADO — Bootcamp Orbit (Online ao vivo)";
    case "lembrete_d1":
      return "⚠️ É AMANHÃ — Operação Bootcamp Orbit · 13/06 · 09h";
    case "dia_evento":
      return "🚨 HOJE É O DIA — Operação Bootcamp Orbit · 09h BRT";
    case "ao_vivo":
      return "🔴 COMEÇA EM 15 MINUTOS — Entre na operação agora";
  }
}

// ═══ TEMPLATE BASE (tema guerra) ═══
function shell(headerLabel: string, headerColor: string, title: string, bodyInner: string): string {
  return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0E13;color:#E6E8EB;border-radius:12px;overflow:hidden;border:1px solid #3D4127;">
<div style="height:8px;background:repeating-linear-gradient(45deg,#F5C518 0 18px,#0A0E13 18px 36px);"></div>
<div style="background:${headerColor};padding:34px 32px;text-align:center;">
<img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:34px;margin-bottom:18px;">
<div style="display:inline-block;background:rgba(0,0,0,0.35);color:#fff;font-size:12px;font-weight:800;letter-spacing:3px;padding:6px 14px;border-radius:4px;text-transform:uppercase;margin-bottom:14px;">${headerLabel}</div>
<h1 style="color:#fff;font-size:25px;margin:0;font-weight:800;text-transform:uppercase;letter-spacing:1px;line-height:1.15;">${title}</h1>
</div>
<div style="padding:32px;">${bodyInner}</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#6B7339;margin:0;letter-spacing:1px;">ORBIT GESTÃO · COMANDO BOOTCAMP · EXCLUSIVO CANAIS</p>
</div>
</div>`;
}

const P = `font-size:16px;line-height:1.7;color:#C9D1D9;margin:0 0 14px;`;
const STRONG = `color:#fff;`;
const GOLD = `color:#ffba1a;`;
function btn(href: string, label: string): string {
  return `<div style="text-align:center;margin:30px 0;"><a href="${href}" style="display:inline-block;background:#ffba1a;color:#0A0E13;font-weight:800;font-size:16px;padding:16px 40px;border-radius:6px;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">${label}</a></div>`;
}

function localBlock(modo: Modo): string {
  if (modo === "presencial") {
    return `<div style="background:#0F1410;border:1px solid #4B5320;border-radius:8px;padding:18px 20px;margin:0 0 14px;">
<p style="${P}margin:0 0 6px;">📍 <strong style="${STRONG}">PRESENCIAL</strong> — ${PRESENCIAL_LOCAL}</p>
<p style="${P}margin:0;">🗓️ <strong style="${GOLD}">13 JUN 2026 · 09h BRT</strong> (4 horas, mão na massa)</p>
</div>`;
  }
  return `<div style="background:#0F1410;border:1px solid #4B5320;border-radius:8px;padding:18px 20px;margin:0 0 14px;">
<p style="${P}margin:0 0 6px;">💻 <strong style="${STRONG}">ONLINE AO VIVO</strong> — link da transmissão enviado no dia</p>
<p style="${P}margin:0;">🗓️ <strong style="${GOLD}">13 JUN 2026 · 09h BRT</strong> (4 horas, mão na massa)</p>
</div>`;
}

function getHTML(type: EmailType, nome: string, modo: Modo): string {
  const first = (nome || "").split(" ")[0] || "Recruta";

  if (type === "confirmacao") {
    const acesso =
      modo === "presencial"
        ? `<p style="${P}">No anexo (.ics) está seu convite — adiciona na agenda agora. Te esperamos no <strong style="${STRONG}">${PRESENCIAL_LOCAL}</strong>.</p>`
        : `<p style="${P}">No anexo (.ics) está seu convite — adiciona na agenda agora. O link da transmissão chega aqui no e-mail e no grupo de avisos antes do início.</p>`;
    return shell(
      "Alistamento confirmado",
      "linear-gradient(135deg,#3D4127 0%,#0A0E13 100%)",
      "Você está dentro da operação",
      `<p style="${P}">Recruta <strong style="${STRONG}">${first}</strong>,</p>
<p style="${P}">Seu alistamento no <strong style="${STRONG}">Bootcamp Orbit</strong> está <strong style="${GOLD}">CONFIRMADO</strong>. Missão: blindar sua operação pro 2º semestre — atração, conversão, produtização, precificação e atendimento.</p>
${localBlock(modo)}
${acesso}
${HAS_WHATSAPP ? `<p style="${P}">Entre no grupo de avisos pra não perder nenhuma ordem:</p>${btn(WHATSAPP_GROUP, "Entrar no grupo de avisos")}` : ""}
<p style="font-size:13px;color:#6B7339;text-align:center;margin:0;">Dúvidas? Responda este e-mail. Câmbio, desligo.</p>`
    );
  }

  if (type === "lembrete_d1") {
    return shell(
      "Contagem regressiva · D-1",
      "linear-gradient(135deg,#8B5A00 0%,#0A0E13 100%)",
      "É amanhã, recruta",
      `<p style="${P}">Recruta <strong style="${STRONG}">${first}</strong>,</p>
<p style="${P}">Amanhã, <strong style="${GOLD}">13/06 às 09h BRT</strong>, começa a operação Bootcamp Orbit. Prepare o terreno: bloqueie a agenda, separe caderno e deixe o pré-requisito (Agente de Ativação) concluído.</p>
${localBlock(modo)}
${btn(PAGE_URL, "Ver detalhes da operação")}
<p style="font-size:13px;color:#6B7339;text-align:center;margin:0;">Confirme presença no grupo de avisos. Câmbio.</p>`
    );
  }

  if (type === "dia_evento") {
    const cta =
      modo === "presencial"
        ? btn(PAGE_URL, "Como chegar")
        : btn(ONLINE_LINK, "Entrar na transmissão");
    return shell(
      "Hoje · Dia D",
      "linear-gradient(135deg,#C73E1D 0%,#0A0E13 100%)",
      "Hoje é o dia. 09h em ponto.",
      `<p style="${P}">Recruta <strong style="${STRONG}">${first}</strong>,</p>
<p style="${P}">A operação começa <strong style="${GOLD}">hoje às 09h BRT</strong>. Não atrase — formação não espera retardatário.</p>
${localBlock(modo)}
${cta}
<p style="font-size:13px;color:#6B7339;text-align:center;margin:0;">Fique de olho no grupo de avisos. Câmbio, desligo.</p>`
    );
  }

  // ao_vivo
  const cta =
    modo === "presencial"
      ? btn(PAGE_URL, "Estou a caminho")
      : btn(ONLINE_LINK, "Entrar agora");
  return shell(
    "🔴 Ao vivo agora",
    "linear-gradient(135deg,#8B0000 0%,#0A0E13 100%)",
    "Começa em 15 minutos",
    `<p style="${P}">Recruta <strong style="${STRONG}">${first}</strong>,</p>
<p style="${P}">Faltam <strong style="${GOLD}">15 minutos</strong>. Posição de combate — entre agora pra não perder a abertura.</p>
${cta}
<p style="font-size:13px;color:#6B7339;text-align:center;margin:0;">Câmbio, desligo.</p>`
  );
}

// ═══ ENVIO ═══
async function sendEmail(email: string, nome: string, type: EmailType, modo: Modo): Promise<boolean> {
  const attachments: Array<Record<string, string>> = [];
  if (type === "confirmacao") {
    attachments.push({
      content: toBase64(buildICS(modo)),
      filename: `bootcamp-orbit-${modo}.ics`,
      disposition: "attachment",
    });
  }

  const msResp = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${MAILERSEND_KEY}` },
    body: JSON.stringify({
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email, name: nome || "" }],
      subject: getSubject(type, modo),
      html: getHTML(type, nome, modo),
      ...(attachments.length ? { attachments } : {}),
    }),
  });

  const success = msResp.status === 202;
  const msId = msResp.headers.get("x-message-id") || null;

  await fetch(`${SUPABASE_URL}/rest/v1/email_logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email_type: `bootcamp_${type}_${modo}`,
      recipient_email: email,
      recipient_name: nome || null,
      resend_id: msId,
      success,
      error_message: success ? null : `HTTP ${msResp.status}`,
    }),
  }).catch(() => {});

  return success;
}

async function fetchLeads(modo?: Modo): Promise<Array<{ nome: string; email: string; modo: Modo }>> {
  // Por modo: source = bootcamp-orbit-online | bootcamp-orbit-presencial. Sem modo: todos.
  const filter = modo
    ? `source=eq.bootcamp-orbit-${modo}`
    : `source=like.bootcamp-orbit%`;
  const url = `${SUPABASE_URL}/rest/v1/live_orbit_leads?select=nome,email,source&${filter}&order=created_at.desc&limit=5000`;
  const resp = await fetch(url, {
    headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}` },
  });
  if (!resp.ok) return [];
  const rows = (await resp.json()) as Array<{ nome: string; email: string; source: string }>;
  // dedup por email
  const seen = new Set<string>();
  const out: Array<{ nome: string; email: string; modo: Modo }> = [];
  for (const r of rows) {
    if (!r.email || seen.has(r.email)) continue;
    if (/@example\.com$/i.test(r.email.trim())) continue; // ignora endereços de teste
    seen.add(r.email);
    out.push({ nome: r.nome, email: r.email, modo: r.source.includes("presencial") ? "presencial" : "online" });
  }
  return out;
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as {
      type?: EmailType;
      nome?: string;
      email?: string;
      modo?: Modo;
      test?: boolean;
    };
    const type = body.type;
    if (!type || !["confirmacao", "lembrete_d1", "dia_evento", "ao_vivo"].includes(type)) {
      return new Response(
        JSON.stringify({ error: "type deve ser: confirmacao | lembrete_d1 | dia_evento | ao_vivo" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // MODO 1 — envio único (confirmação na inscrição, ou teste)
    if (body.email) {
      const modo: Modo = body.modo === "presencial" ? "presencial" : "online";
      const ok = await sendEmail(body.email, body.nome || "", type, modo);
      return new Response(JSON.stringify({ success: ok, mode: "single", modo }), {
        status: ok ? 200 : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // MODO 2 — disparo em massa (cron): varre os leads do bootcamp
    const leads = await fetchLeads(body.modo);
    let sent = 0;
    let failed = 0;
    for (const lead of leads) {
      const ok = await sendEmail(lead.email, lead.nome, type, lead.modo);
      ok ? sent++ : failed++;
      // pequeno respiro pra não estourar rate limit do MailerSend
      await new Promise((r) => setTimeout(r, 120));
    }
    return new Response(JSON.stringify({ success: true, mode: "bulk", type, total: leads.length, sent, failed }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
