import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { addMeetingRegistrant, hasZoomCreds } from "../_shared/zoom.ts";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_EMAIL = Deno.env.get("ORBIT_FROM_EMAIL") || "noreply@orbitgestao.com.br";
const FROM_NAME = "Orbit - Bootcamp";

// ═══ CONFIG DO EVENTO ═══
const EVENT_DATE = "2026-10-15";            // YYYY-MM-DD
const EVENT_HOUR_BRT = 8;                   // 08h30 BRT
const EVENT_MINUTE_BRT = 30;
const EVENT_DURATION_MIN = 240;             // 4 horas (8h30–12h30)
const ONLINE_LINK = "https://us06web.zoom.us/j/85057730138";
const ZOOM_MEETING_ID = "85057730138";
const PRESENCIAL_LOCAL = "Square SC — Rod. José Carlos Daux, 5500 — Saco Grande, Florianópolis/SC, 88032-005";
const WHATSAPP_GROUP = "https://chat.whatsapp.com/JDzmJ9WTutLJPYSnqQTd4y";
const HAS_WHATSAPP = !WHATSAPP_GROUP.includes("CHANGE_ME");
const PAGE_URL = "https://orbitgestao.com.br/bootcamp-orbit";

// ═══ ASAAS (pagamento presencial e mentoria) ═══
const ASAAS_PRESENCIAL = "https://www.asaas.com/c/na1azgdsfwsmeed2";
const ASAAS_MENTORIA = "https://www.asaas.com/c/hs50xqdo7o4ejk7s";

type EmailType = "confirmacao" | "lembrete_d1" | "dia_evento" | "ao_vivo";
type Modo = "online" | "presencial" | "mentoria";

function sourceToModo(source: string): Modo {
  if (source.includes("mentoria")) return "mentoria";
  if (source.includes("presencial")) return "presencial";
  return "online";
}

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  return { first: parts[0] || "Participante", last: parts.slice(1).join(" ") };
}

// Pagos via webhook → bootcamp_pagamentos. Sem isso, o botão Asaas continua no e-mail.
async function fetchPaidEmails(): Promise<Set<string>> {
  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/bootcamp_pagamentos?select=email&status=eq.paid&limit=10000`,
      { headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}` } }
    );
    if (!resp.ok) return new Set();
    const rows = (await resp.json()) as Array<{ email: string }>;
    return new Set(rows.map((r) => (r.email || "").toLowerCase().trim()).filter(Boolean));
  } catch {
    return new Set();
  }
}

// ═══ .ICS (convite de calendário) ═══
function buildICS(modo: Modo): string {
  const [y, m, d] = EVENT_DATE.split("-").map(Number);
  const hour = modo === "mentoria" ? 14 : EVENT_HOUR_BRT;
  const minute = modo === "mentoria" ? 0 : EVENT_MINUTE_BRT;
  // BRT -03:00 → UTC: soma 3h
  const startUTC = new Date(Date.UTC(y, m - 1, d, hour + 3, minute, 0));
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
  const local = modo === "online" ? ONLINE_LINK : PRESENCIAL_LOCAL;
  const description =
    modo === "presencial"
      ? `Bootcamp Orbit — Imersão Canais (PRESENCIAL). Local: ${PRESENCIAL_LOCAL}. Detalhes: ${PAGE_URL}`
      : modo === "mentoria"
      ? `Bootcamp Orbit — Mentoria presencial em grupo com Igor e Chris. Local: ${PRESENCIAL_LOCAL}. Detalhes: ${PAGE_URL}`
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
    `URL:${modo === "online" ? ONLINE_LINK : PAGE_URL}`,
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
      if (modo === "presencial") return "🎖️ ALISTAMENTO CONFIRMADO — Bootcamp Orbit (Presencial · Floripa)";
      if (modo === "mentoria") return "🎖️ ALISTAMENTO CONFIRMADO — Mentoria Bootcamp Orbit";
      return "🎖️ ALISTAMENTO CONFIRMADO — Bootcamp Orbit (Online ao vivo)";
    case "lembrete_d1":
      return "⚠️ É AMANHÃ — Operação Bootcamp Orbit · 15/10 · 08h30";
    case "dia_evento":
      return "🚨 HOJE É O DIA — Operação Bootcamp Orbit · 08h30 BRT";
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

function payBlock(modo: "presencial" | "mentoria"): string {
  if (modo === "mentoria") {
    return `<div style="background:linear-gradient(135deg,rgba(255,186,26,0.12),rgba(199,62,29,0.10));border:1px solid #ffba1a;border-radius:10px;padding:20px;margin:18px 0;text-align:center;">
<p style="${GOLD}font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;margin:0 0 6px;">⚠ Sua vaga da mentoria só é confirmada após o pagamento</p>
<p style="${P}margin:0 0 14px;">Conclua o pagamento de <strong style="${GOLD}">R$2.500</strong> (até 15/09). Não use o checkout do presencial.</p>
<a href="${ASAAS_MENTORIA}" style="display:inline-block;background:#ffba1a;color:#0A0E13;font-weight:800;font-size:16px;padding:15px 38px;border-radius:6px;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">🔒 Pagar mentoria</a>
<p style="font-size:11px;color:#8B7355;margin:12px 0 0;">Pagamento seguro via Asaas</p>
</div>`;
  }
  return `<div style="background:linear-gradient(135deg,rgba(255,186,26,0.12),rgba(199,62,29,0.10));border:1px solid #ffba1a;border-radius:10px;padding:20px;margin:18px 0;text-align:center;">
<p style="${GOLD}font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;margin:0 0 6px;">⚠ Sua vaga presencial só é confirmada após o pagamento</p>
<p style="${P}margin:0 0 14px;">Conclua o pagamento de <strong style="${GOLD}">R$250</strong> pra travar sua vaga em Florianópolis (até 15/09).</p>
<a href="${ASAAS_PRESENCIAL}" style="display:inline-block;background:#ffba1a;color:#0A0E13;font-weight:800;font-size:16px;padding:15px 38px;border-radius:6px;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">🔒 Pagar e confirmar vaga</a>
<p style="font-size:11px;color:#8B7355;margin:12px 0 0;">Pagamento seguro via Asaas</p>
</div>`;
}

function localBlock(modo: Modo): string {
  if (modo === "presencial") {
    return `<div style="background:#0F1410;border:1px solid #4B5320;border-radius:8px;padding:18px 20px;margin:0 0 14px;">
<p style="${P}margin:0 0 6px;">📍 <strong style="${STRONG}">PRESENCIAL</strong> — ${PRESENCIAL_LOCAL}</p>
<p style="${P}margin:0;">🗓️ <strong style="${GOLD}">15 OUT 2026 · 08h30 BRT</strong> (4 horas, mão na massa)</p>
</div>`;
  }
  if (modo === "mentoria") {
    return `<div style="background:#0F1410;border:1px solid #4B5320;border-radius:8px;padding:18px 20px;margin:0 0 14px;">
<p style="${P}margin:0 0 6px;">⭐ <strong style="${STRONG}">MENTORIA PRESENCIAL</strong> — grupo com Igor e Chris</p>
<p style="${P}margin:0;">🗓️ <strong style="${GOLD}">15 OUT 2026 · 14h–18h BRT</strong> · ${PRESENCIAL_LOCAL}</p>
</div>`;
  }
  return `<div style="background:#0F1410;border:1px solid #4B5320;border-radius:8px;padding:18px 20px;margin:0 0 14px;">
<p style="${P}margin:0 0 6px;">💻 <strong style="${STRONG}">ONLINE AO VIVO</strong> — Zoom</p>
<p style="${P}margin:0;">🗓️ <strong style="${GOLD}">15 OUT 2026 · 08h30 BRT</strong> (4 horas, mão na massa)</p>
</div>`;
}

function getHTML(type: EmailType, nome: string, modo: Modo, email = "", pago = false, zoomJoinUrl = ""): string {
  const first = (nome || "").split(" ")[0] || "Recruta";
  const pay =
    !pago && (modo === "presencial" || modo === "mentoria") ? payBlock(modo) : "";

  if (type === "confirmacao") {
    const acesso =
      modo === "online"
        ? zoomJoinUrl
          ? `<p style="${P}">Você já está inscrito no Zoom. O link exclusivo da sala:</p>${btn(zoomJoinUrl, "Entrar no Zoom")}<p style="font-size:13px;color:#6B7339;text-align:center;">O Zoom também manda a confirmação no mesmo e-mail.</p>`
          : `<p style="${P}">Estamos registrando você no Zoom. A confirmação e o link da sala chegam neste e-mail em instantes. Não use link de senha — só o convite do Zoom.</p>`
        : modo === "mentoria"
        ? `<p style="${P}">No anexo (.ics) está seu convite — adiciona na agenda agora. Te esperamos no <strong style="${STRONG}">${PRESENCIAL_LOCAL}</strong> às 14h.</p>`
        : `<p style="${P}">No anexo (.ics) está seu convite — adiciona na agenda agora. Te esperamos no <strong style="${STRONG}">${PRESENCIAL_LOCAL}</strong>.</p>`;
    return shell(
      "Alistamento confirmado",
      "linear-gradient(135deg,#3D4127 0%,#0A0E13 100%)",
      "Você está dentro da operação",
      `<p style="${P}">Recruta <strong style="${STRONG}">${first}</strong>,</p>
<p style="${P}">Seu alistamento no <strong style="${STRONG}">Bootcamp Orbit</strong> está <strong style="${GOLD}">CONFIRMADO</strong>. Missão: destravar a adoção do Orbit na sua operação — com Igor e Chris.</p>
${localBlock(modo)}
${pay}
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
<p style="${P}">Amanhã, <strong style="${GOLD}">15/10 às 08h30 BRT</strong>, começa a operação Bootcamp Orbit. Prepare o terreno: bloqueie a agenda, separe caderno e deixe o pré-requisito (Agente de Ativação) concluído.</p>
${localBlock(modo)}
${pay}
${btn(PAGE_URL, "Ver detalhes da operação")}
<p style="font-size:13px;color:#6B7339;text-align:center;margin:0;">Confirme presença no grupo de avisos. Câmbio.</p>`
    );
  }

  if (type === "dia_evento") {
    const cta =
      modo === "online"
        ? btn(ONLINE_LINK, "Entrar na transmissão")
        : btn(PAGE_URL, "Como chegar");
    return shell(
      "Hoje · Dia D",
      "linear-gradient(135deg,#C73E1D 0%,#0A0E13 100%)",
      "Hoje é o dia. 08h30 em ponto.",
      `<p style="${P}">Recruta <strong style="${STRONG}">${first}</strong>,</p>
<p style="${P}">A operação começa <strong style="${GOLD}">hoje às 08h30 BRT</strong>. Não atrase — formação não espera retardatário.</p>
${localBlock(modo)}
${pay}
${cta}
<p style="font-size:13px;color:#6B7339;text-align:center;margin:0;">Fique de olho no grupo de avisos. Câmbio, desligo.</p>`
    );
  }

  // ao_vivo
  const cta =
    modo === "online"
      ? btn(ONLINE_LINK, "Entrar agora")
      : btn(PAGE_URL, "Estou a caminho");
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
async function sendEmail(
  email: string,
  nome: string,
  type: EmailType,
  modo: Modo,
  pago = false,
  extra?: { telefone?: string; empresa?: string }
): Promise<boolean> {
  let zoomJoinUrl = "";
  if (type === "confirmacao" && modo === "online" && hasZoomCreds()) {
    try {
      const { first, last } = splitName(nome);
      const z = await addMeetingRegistrant(ZOOM_MEETING_ID, {
        email,
        firstName: first,
        lastName: last,
        phone: extra?.telefone,
        org: extra?.empresa,
      });
      zoomJoinUrl = z.join_url || "";
    } catch (e) {
      console.error("[send-bootcamp-email] zoom register failed", String(e));
    }
  }

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
      html: getHTML(type, nome, modo, email, pago, zoomJoinUrl),
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
    out.push({ nome: r.nome, email: r.email, modo: sourceToModo(r.source || "") });
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
      telefone?: string;
      empresa?: string;
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
      const modo: Modo =
        body.modo === "presencial" ? "presencial" : body.modo === "mentoria" ? "mentoria" : "online";
      // Na inscrição ainda não pagou; mas se for re-envio e já tiver pago, omite o botão.
      const paid = modo === "presencial" ? await fetchPaidEmails() : new Set<string>();
      const pago = paid.has(body.email.toLowerCase().trim());
      const ok = await sendEmail(body.email, body.nome || "", type, modo, pago, {
        telefone: body.telefone,
        empresa: body.empresa,
      });
      return new Response(JSON.stringify({ success: ok, mode: "single", modo, pago }), {
        status: ok ? 200 : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // MODO 2 — disparo em massa (cron): varre os leads do bootcamp
    const leads = await fetchLeads(body.modo);
    const paidSet = await fetchPaidEmails(); // quem já pagou o presencial (não recebe botão)
    let sent = 0;
    let failed = 0;
    for (const lead of leads) {
      const pago = lead.modo === "presencial" && paidSet.has(lead.email.toLowerCase().trim());
      const ok = await sendEmail(lead.email, lead.nome, type, lead.modo, pago);
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
