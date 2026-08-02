import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_EMAIL = Deno.env.get("ORBIT_FROM_EMAIL") || "noreply@orbitgestao.com.br";
const FROM_NAME = "Orbit Gestão";
const LIVE_URL = "https://www.youtube.com/@orbitgestao/live";

interface TrainingConfig {
  title: string;
  subtitle?: string;
  day: number;
  dayName: string;
  hour: number;
  durationMin: number;
}

const TRAININGS: Record<string, TrainingConfig> = {
  "pessoas-1":          { title: "Pessoas 1", subtitle: "Cargos / PDI / Treinamentos",       day: 1, dayName: "segunda-feira", hour: 10, durationMin: 60 },
  "estrategia-mercado": { title: "Estratégia e Mercado",                                      day: 1, dayName: "segunda-feira", hour: 16, durationMin: 60 },
  "pessoas-2":          { title: "Pessoas 2", subtitle: "Documentos dos Colaboradores",      day: 2, dayName: "terça-feira",   hour: 10, durationMin: 60 },
  "processos":          { title: "Processos",                                                 day: 2, dayName: "terça-feira",   hour: 16, durationMin: 60 },
  "indicadores":        { title: "Indicadores",                                               day: 3, dayName: "quarta-feira",  hour: 10, durationMin: 60 },
  "documentos":         { title: "Documentos",                                                day: 3, dayName: "quarta-feira",  hour: 16, durationMin: 60 },
  "crm-fluxos":         { title: "CRM / Fluxos de Operação",                                  day: 4, dayName: "quinta-feira",  hour: 10, durationMin: 60 },
  "problemas-riscos":   { title: "Problemas / Riscos e Oportunidades",                        day: 4, dayName: "quinta-feira",  hour: 16, durationMin: 60 },
  "tarefas-projetos":   { title: "Tarefas / Projetos",                                        day: 5, dayName: "sexta-feira",   hour: 10, durationMin: 60 },
  "financeiro":         { title: "Financeiro",                                                day: 5, dayName: "sexta-feira",   hour: 16, durationMin: 60 },
};

function buildICS(chosenDate: string, slug: string): string | null {
  const cfg = TRAININGS[slug];
  if (!cfg) return null;
  const [y, m, d] = chosenDate.split("-").map(Number);
  // BRT -03:00 → UTC: soma 3h
  const startUTC = new Date(Date.UTC(y, m - 1, d, cfg.hour + 3, 0, 0));
  const endUTC = new Date(startUTC.getTime() + cfg.durationMin * 60 * 1000);
  const fmt = (dt: Date) =>
    dt.getUTCFullYear().toString() +
    String(dt.getUTCMonth() + 1).padStart(2, "0") +
    String(dt.getUTCDate()).padStart(2, "0") +
    "T" +
    String(dt.getUTCHours()).padStart(2, "0") +
    String(dt.getUTCMinutes()).padStart(2, "0") +
    "00Z";
  const dtStart = fmt(startUTC);
  const dtEnd = fmt(endUTC);
  const dtStamp = fmt(new Date());
  const uid = `treinamento-${slug}-${chosenDate.replace(/-/g, "")}-${Math.random().toString(36).slice(2, 10)}@orbitgestao.com.br`;
  const esc = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
  const fullTitle = `Treinamento Orbit: ${cfg.title}${cfg.subtitle ? " - " + cfg.subtitle : ""}`;
  const description = `Treinamento da plataforma Orbit. Link da live: ${LIVE_URL}`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Orbit Gestao//Treinamentos//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${esc(fullTitle)}`,
    `DESCRIPTION:${esc(description)}`,
    `LOCATION:${esc(LIVE_URL)}`,
    `URL:${LIVE_URL}`,
    `ORGANIZER;CN=Orbit Gestao:MAILTO:${FROM_EMAIL}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:Treinamento ${esc(cfg.title)} comeca em 30 minutos`,
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

function fmtDataBR(chosenDate: string): string {
  const m = chosenDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return chosenDate;
  return `${m[3]}/${m[2]}/${m[1]}`;
}

function confirmationHTML(nome: string, slug: string, chosenDate: string): string {
  const cfg = TRAININGS[slug];
  const first = nome?.split(" ")[0] || "Olá";
  const titleFull = `${cfg.title}${cfg.subtitle ? " - " + cfg.subtitle : ""}`;
  return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;"><div style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);padding:40px 32px;text-align:center;"><img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;"><h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">Inscrição confirmada!</h1><p style="color:#C9D1D9;font-size:18px;margin:0;font-weight:600;">${titleFull}</p></div><div style="padding:32px;"><p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p><p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Sua inscrição no treinamento <strong style="color:#fff;">${titleFull}</strong> está confirmada.</p><p style="font-size:16px;line-height:1.7;color:#C9D1D9;">📅 <strong style="color:#ffba1a;">${fmtDataBR(chosenDate)}</strong> (${cfg.dayName}) às <strong style="color:#ffba1a;">${String(cfg.hour).padStart(2, "0")}h00</strong>.</p><p style="font-size:16px;line-height:1.7;color:#C9D1D9;">No dia, entre pelo link: <a href="${LIVE_URL}" style="color:#ffba1a;">${LIVE_URL}</a></p><p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Anexamos um convite (.ics) - clica nele pra adicionar no Google Calendar / iCloud / Outlook.</p></div><div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;"><p style="font-size:12px;color:#484F58;margin:0;">Orbit Gestão - Treinamentos da plataforma</p></div></div>`;
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { nome, email, training_slug, chosen_date } = body;

    if (!email || !training_slug || !chosen_date) {
      return new Response(JSON.stringify({ error: "nome, email, training_slug, chosen_date obrigatórios" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!TRAININGS[training_slug]) {
      return new Response(JSON.stringify({ error: "training_slug inválido", training_slug }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const attachments: Array<Record<string, string>> = [];
    if (/^\d{4}-\d{2}-\d{2}$/.test(chosen_date)) {
      const ics = buildICS(chosen_date, training_slug);
      if (ics) {
        attachments.push({ content: toBase64(ics), filename: `treinamento-${training_slug}-${chosen_date}.ics`, disposition: "attachment" });
      }
    }

    const cfg = TRAININGS[training_slug];
    const titleFull = `${cfg.title}${cfg.subtitle ? " - " + cfg.subtitle : ""}`;

    const msResp = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${MAILERSEND_KEY}` },
      body: JSON.stringify({
        from: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email, name: nome || "" }],
        subject: `Inscrição confirmada - Treinamento ${cfg.title}`,
        html: confirmationHTML(nome, training_slug, chosen_date),
        ...(attachments.length ? { attachments } : {}),
      }),
    });

    const success = msResp.status === 202;
    const msId = msResp.headers.get("x-message-id") || null;

    await fetch(`${SUPABASE_URL}/rest/v1/email_logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`, Prefer: "return=minimal" },
      body: JSON.stringify({
        email_type: `treinamento_${training_slug}`,
        recipient_email: email,
        recipient_name: nome || null,
        resend_id: msId,
        success,
        error_message: success ? null : `HTTP ${msResp.status}`,
      }),
    }).catch(() => {});

    return new Response(JSON.stringify({ success, message_id: msId, training: titleFull }), {
      status: success ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
