import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ORBIT_URL = "https://yfpdrckyuxltvznqfqgh.supabase.co";
const ORBIT_KEY = Deno.env.get("ORBIT_SERVICE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_EMAIL = "noreply@orbtgestao.com.br";
const FROM_NAME = "Orbit Gestão";

type EmailType = "convite" | "reminder_15min" | "ao_vivo" | "proxima_live";
type LiveSource = "live-chris" | "live-semanal";

interface LiveConfig {
  title: string;
  schedule: string; // "terça-feira às 13h"
  weekday: string;  // "terça" | "quarta"
  time: string;     // "13h" | "18h"
  description: string;
  page: string;
  liveLink: string;
  liveLinkLabel: string;
  channelLabel: string; // "YouTube", "WhatsApp"
}

const CONFIGS: Record<LiveSource, LiveConfig> = {
  "live-chris": {
    title: "Masterclass Consultores",
    schedule: "quarta-feira às 18h",
    weekday: "quarta",
    time: "18h",
    description:
      "Você vai entender como consultores estão criando recorrência passiva e escalando com agentes de IA, conduzido por Christian Hart (Diretor de Canais — Grupo GSN).",
    page: "https://orbitgestao.com.br/live/chris",
    liveLink: "https://orbitgestao.com.br/live/chris",
    liveLinkLabel: "ENTRAR NA AULA",
    channelLabel: "grupo fechado de avisos no WhatsApp",
  },
  "live-semanal": {
    title: "A Nova Era da Gestão com Time de IA",
    schedule: "terça-feira às 13h",
    weekday: "terça",
    time: "13h",
    description:
      "Você vai ver na prática como dezenas de agentes de IA operam a gestão de empresas 24/7 — dashboards, KPIs, processos e reuniões no piloto automático.",
    page: "https://orbitgestao.com.br/live",
    liveLink: "https://www.youtube.com/@orbitgestao/live",
    liveLinkLabel: "ENTRAR NA LIVE AGORA",
    channelLabel: "YouTube",
  },
};

function getSubject(type: EmailType, source: LiveSource): string {
  const cfg = CONFIGS[source];
  switch (type) {
    case "convite":
      return `Amanhã tem aula — ${cfg.title}`;
    case "reminder_15min":
      return `Começa em 15 minutos — ${cfg.title}`;
    case "ao_vivo":
      return `🔴 ESTAMOS AO VIVO — Entre agora!`;
    case "proxima_live":
      return `Próxima ${cfg.weekday} tem aula — Garanta sua vaga`;
  }
}

function getHTML(type: EmailType, nome: string, source: LiveSource): string {
  const cfg = CONFIGS[source];
  const first = nome?.split(" ")[0] || "Olá";

  if (type === "convite") {
    return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;">
<div style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);padding:40px 32px;text-align:center;">
<img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;">
<h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">Amanhã tem aula!</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;font-weight:600;">${cfg.schedule.charAt(0).toUpperCase() + cfg.schedule.slice(1)}</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Amanhã às <strong style="color:#ffba1a;">${cfg.time}</strong> tem a aula <strong style="color:#fff;">${cfg.title}</strong>.</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">${cfg.description}</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Você vai receber o acesso pelo <strong style="color:#fff;">${cfg.channelLabel}</strong> antes do início.</p>
<div style="text-align:center;margin:32px 0;">
<a href="${cfg.page}" style="display:inline-block;background:#ffba1a;color:#0D1117;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">VER DETALHES</a>
</div>
</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#484F58;margin:0;">Orbit Gestão — Gestão Operada por IA</p>
</div>
</div>`;
  }

  if (type === "reminder_15min") {
    return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;">
<div style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);padding:40px 32px;text-align:center;">
<img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;">
<h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">Começa em 15 minutos!</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;">${cfg.title}</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Faltam <strong style="color:#ffba1a;">15 minutos</strong> para a aula começar! Prepare-se e entre agora para não perder o início:</p>
<div style="text-align:center;margin:32px 0;">
<a href="${cfg.liveLink}" style="display:inline-block;background:#ffba1a;color:#0D1117;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">${cfg.liveLinkLabel}</a>
</div>
</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#484F58;margin:0;">Orbit Gestão — Gestão Operada por IA</p>
</div>
</div>`;
  }

  if (type === "ao_vivo") {
    return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;">
<div style="background:linear-gradient(135deg,#1a0000 0%,#0D1117 100%);padding:40px 32px;text-align:center;">
<img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;">
<div style="display:inline-block;background:#FF0000;color:#fff;font-size:14px;font-weight:700;padding:6px 16px;border-radius:20px;margin-bottom:16px;letter-spacing:1px;">🔴 AO VIVO AGORA</div>
<h1 style="color:#fff;font-size:26px;margin:0 0 8px;font-weight:800;">Estamos ao vivo!</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;">${cfg.title}</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">A aula já começou! Entre agora:</p>
<div style="text-align:center;margin:32px 0;">
<a href="${cfg.liveLink}" style="display:inline-block;background:#FF0000;color:#fff;font-weight:700;font-size:18px;padding:18px 48px;border-radius:8px;text-decoration:none;letter-spacing:0.5px;">ASSISTIR AGORA</a>
</div>
</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#484F58;margin:0;">Orbit Gestão — Gestão Operada por IA</p>
</div>
</div>`;
  }

  // proxima_live
  return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;">
<div style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);padding:40px 32px;text-align:center;">
<img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;">
<h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">Próxima ${cfg.weekday} tem aula!</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;font-weight:600;">${cfg.schedule.charAt(0).toUpperCase() + cfg.schedule.slice(1)}</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">A aula de hoje já acabou, mas na <strong style="color:#ffba1a;">próxima ${cfg.weekday} às ${cfg.time}</strong> tem mais!</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Garanta sua vaga para a próxima edição:</p>
<div style="text-align:center;margin:32px 0;">
<a href="${cfg.page}" style="display:inline-block;background:#ffba1a;color:#0D1117;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">QUERO PARTICIPAR</a>
</div>
</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#484F58;margin:0;">Orbit Gestão — Gestão Operada por IA</p>
</div>
</div>`;
}

async function fetchLeads(source: LiveSource): Promise<Array<{ nome: string; email: string }>> {
  // Filtra leads por source no Supabase MKT
  const url = `${ORBIT_URL}/rest/v1/live_orbit_leads?select=nome,email&source=eq.${encodeURIComponent(source)}&order=created_at.desc&limit=5000`;
  const resp = await fetch(url, {
    headers: {
      apikey: ORBIT_KEY,
      Authorization: `Bearer ${ORBIT_KEY}`,
    },
  });
  const leads = await resp.json();

  const seen = new Set<string>();
  const unique: Array<{ nome: string; email: string }> = [];
  for (const l of leads) {
    const email = l.email?.trim().toLowerCase();
    if (email && email.includes("@") && !seen.has(email) && !email.startsWith("test") && email !== "t@t.com") {
      seen.add(email);
      unique.push({ nome: l.nome, email });
    }
  }
  return unique;
}

async function sendEmail(email: string, nome: string, type: EmailType, source: LiveSource): Promise<boolean> {
  const resp = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MAILERSEND_KEY}`,
    },
    body: JSON.stringify({
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email, name: nome }],
      subject: getSubject(type, source),
      html: getHTML(type, nome, source),
    }),
  });

  const success = resp.status === 202;

  await fetch(`${SUPABASE_URL}/rest/v1/email_logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email_type: `${type}_${source}`,
      recipient_email: email,
      recipient_name: nome,
      resend_id: resp.headers.get("x-message-id") || null,
      success,
      error_message: success ? null : `HTTP ${resp.status}`,
    }),
  }).catch(() => {});

  return success;
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
    const body = await req.json() as { type: EmailType; source?: string; test?: boolean };
    const { type, test } = body;
    const sourceRaw = body.source || "live-semanal";
    const source: LiveSource = sourceRaw === "live-chris" ? "live-chris" : "live-semanal";

    if (!["convite", "reminder_15min", "ao_vivo", "proxima_live"].includes(type)) {
      return new Response(JSON.stringify({ error: "type must be: convite | reminder_15min | ao_vivo | proxima_live" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const leads = await fetchLeads(source);

    if (test) {
      return new Response(JSON.stringify({ message: "test mode", source, leads_count: leads.length, type }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0;
    let errors = 0;

    for (const lead of leads) {
      const ok = await sendEmail(lead.email, lead.nome, type, source);
      if (ok) sent++;
      else errors++;
      await new Promise((r) => setTimeout(r, 120));
    }

    return new Response(JSON.stringify({ success: true, source, sent, errors, total: leads.length, type }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
