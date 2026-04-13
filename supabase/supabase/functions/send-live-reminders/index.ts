import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
// Banco onde os leads estão (antigo por enquanto — trocar quando migrar)
const LEADS_URL = Deno.env.get("ORBIT_URL") || SUPABASE_URL;
const LEADS_KEY = Deno.env.get("ORBIT_SERVICE_KEY") || SUPABASE_SERVICE_KEY;
const FROM_EMAIL = "noreply@orbtgestao.com.br";
const FROM_NAME = "Orbit Gestão";
const YOUTUBE_LIVE = "https://www.youtube.com/@orbitgestao/live";
const LIVE_PAGE = "https://orbitgestao.com.br/live";

type EmailType = "convite" | "reminder_15min" | "ao_vivo" | "proxima_live";

function getSubject(type: EmailType): string {
  switch (type) {
    case "convite": return "Amanhã tem Live — A Nova Era da Gestão com Time de IA";
    case "reminder_15min": return "Começa em 15 minutos — Live Orbit Gestão";
    case "ao_vivo": return "🔴 ESTAMOS AO VIVO — Entre agora!";
    case "proxima_live": return "Próxima terça tem Live — Garanta sua vaga";
  }
}

function getHTML(type: EmailType, nome: string): string {
  const first = nome?.split(" ")[0] || "Olá";

  if (type === "convite") {
    return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;">
<div style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);padding:40px 32px;text-align:center;">
<img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;">
<h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">Amanhã tem Live!</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;font-weight:600;">Terça-feira às 13h</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Amanhã às <strong style="color:#ffba1a;">13h</strong> tem a live <strong style="color:#fff;">A Nova Era da Gestão com Time de IA</strong>.</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Você vai ver na prática como dezenas de agentes de IA operam a gestão de empresas 24/7 — dashboards, KPIs, processos e reuniões no piloto automático.</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">É ao vivo, gratuito e direto no YouTube:</p>
<div style="text-align:center;margin:32px 0;">
<a href="${LIVE_PAGE}" style="display:inline-block;background:#ffba1a;color:#0D1117;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">GARANTIR MINHA VAGA</a>
</div>
<p style="font-size:14px;color:#8B949E;line-height:1.5;text-align:center;">Enviaremos lembretes antes de começar.</p>
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
<p style="color:#C9D1D9;font-size:18px;margin:0;">A Nova Era da Gestão com Time de IA</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Faltam <strong style="color:#ffba1a;">15 minutos</strong> para a live começar! Prepare-se e entre agora para não perder o início:</p>
<div style="text-align:center;margin:32px 0;">
<a href="${YOUTUBE_LIVE}" style="display:inline-block;background:#FF0000;color:#fff;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">ENTRAR NA LIVE AGORA</a>
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
<p style="color:#C9D1D9;font-size:18px;margin:0;">A Nova Era da Gestão com Time de IA</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">A live já começou! Entre agora e veja na prática como os agentes de IA da Orbit operam a gestão de empresas:</p>
<div style="text-align:center;margin:32px 0;">
<a href="${YOUTUBE_LIVE}" style="display:inline-block;background:#FF0000;color:#fff;font-weight:700;font-size:18px;padding:18px 48px;border-radius:8px;text-decoration:none;letter-spacing:0.5px;">ASSISTIR AGORA</a>
</div>
<p style="font-size:14px;color:#8B949E;text-align:center;">Direto no YouTube — é só clicar.</p>
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
<h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">Próxima terça tem Live!</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;font-weight:600;">Toda terça-feira às 13h</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">A live de hoje já acabou, mas na <strong style="color:#ffba1a;">próxima terça às 13h</strong> tem mais!</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Se você não conseguiu assistir ou quer ver mais, garanta sua vaga para a próxima edição:</p>
<div style="text-align:center;margin:32px 0;">
<a href="${LIVE_PAGE}" style="display:inline-block;background:#ffba1a;color:#0D1117;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">QUERO PARTICIPAR</a>
</div>
</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#484F58;margin:0;">Orbit Gestão — Gestão Operada por IA</p>
</div>
</div>`;
}

async function fetchLeads(): Promise<Array<{ nome: string; email: string }>> {
  // Busca leads usando service_role key para bypass RLS
  const resp = await fetch(
    `${LEADS_URL}/rest/v1/live_orbit_leads?select=nome,email&order=created_at.desc&limit=1000`,
    {
      headers: {
        apikey: LEADS_KEY,
        Authorization: `Bearer ${LEADS_KEY}`,
      },
    }
  );
  const leads = await resp.json();

  // Deduplica por email
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

async function sendEmail(email: string, nome: string, type: EmailType): Promise<boolean> {
  const resp = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MAILERSEND_KEY}`,
    },
    body: JSON.stringify({
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email, name: nome }],
      subject: getSubject(type),
      html: getHTML(type, nome),
    }),
  });

  const success = resp.status === 202;

  // Log
  await fetch(`${SUPABASE_URL}/rest/v1/email_logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email_type: type,
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
    const { type, test, offset = 0, limit = 50 } = await req.json() as {
      type: EmailType; test?: boolean; offset?: number; limit?: number;
    };

    if (!["convite", "reminder_15min", "ao_vivo", "proxima_live"].includes(type)) {
      return new Response(JSON.stringify({ error: "type must be: convite | reminder_15min | ao_vivo | proxima_live" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const allLeads = await fetchLeads();
    const leads = allLeads.slice(offset, offset + limit);

    if (test) {
      return new Response(JSON.stringify({ message: "test mode", leads_count: allLeads.length, batch: leads.length, offset, limit, type }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0;
    let errors = 0;

    // Enviar em paralelo, 5 de cada vez
    for (let i = 0; i < leads.length; i += 5) {
      const batch = leads.slice(i, i + 5);
      const results = await Promise.all(
        batch.map((lead) => sendEmail(lead.email, lead.nome, type))
      );
      results.forEach((ok) => { if (ok) sent++; else errors++; });
      // Pequena pausa entre batches
      await new Promise((r) => setTimeout(r, 200));
    }

    return new Response(JSON.stringify({
      success: true, sent, errors, batch: leads.length,
      total: allLeads.length, offset, has_more: offset + limit < allLeads.length, type,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
