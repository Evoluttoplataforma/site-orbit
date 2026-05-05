import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_EMAIL = "noreply@orbtgestao.com.br";
const FROM_NAME = "Orbit Gestão";

type LiveSource = "live-chris" | "live-semanal";

interface LiveConfig {
  title: string;        // título completo (header)
  kind: string;         // "Live" | "Masterclass" (usado nas frases)
  titleShort: string;   // título curto que vem depois do kind nas frases
  subtitle: string;
  schedule: string;
  description: string;
  channel: string;
}

const CONFIGS: Record<LiveSource, LiveConfig> = {
  "live-chris": {
    title: "Masterclass Consultores",
    kind: "Masterclass",
    titleShort: "Consultores",
    subtitle: "Toda quarta-feira às 18h",
    schedule: "quarta-feira às 18h",
    description:
      "Você vai entender como consultores estão criando recorrência passiva e escalando com agentes de IA, conduzido por Christian Hart (Diretor de Canais — Grupo GSN).",
    channel: "no grupo fechado de avisos no WhatsApp",
  },
  "live-semanal": {
    title: "A Nova Era da Gestão com Time de IA",
    kind: "Live",
    titleShort: "A Nova Era da Gestão com Time de IA",
    subtitle: "Toda terça-feira às 13h",
    schedule: "terça-feira às 13h",
    description:
      "Você vai ver na prática como dezenas de agentes de IA operam a gestão de empresas 24/7.",
    channel: "no YouTube",
  },
};

function confirmationHTML(nome: string, source: LiveSource): string {
  const cfg = CONFIGS[source];
  const first = nome?.split(" ")[0] || "Olá";
  return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;">
<div style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);padding:40px 32px;text-align:center;">
<img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;">
<h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">Inscrição Confirmada!</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;font-weight:600;">${cfg.title}</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Sua inscrição para a ${cfg.kind} <strong style="color:#fff;">${cfg.titleShort}</strong> está confirmada!</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">A ${cfg.kind} acontece toda <strong style="color:#ffba1a;">${cfg.schedule}</strong>. ${cfg.description}</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Você vai receber o link de acesso ${cfg.channel} antes do início.</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Enviaremos lembretes para você não perder.</p>
</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#484F58;margin:0;">Orbit Gestão — Gestão Operada por IA</p>
</div>
</div>`;
}

function getSubject(source: LiveSource): string {
  return source === "live-chris"
    ? "Inscrição confirmada — Masterclass Consultores"
    : "Inscrição Confirmada — Live Orbit Gestão";
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
    const { nome, email } = body;
    const sourceRaw = (body.source as string) || "live-semanal";
    const source: LiveSource = sourceRaw === "live-chris" ? "live-chris" : "live-semanal";

    if (!email) {
      return new Response(JSON.stringify({ error: "email required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const msResp = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILERSEND_KEY}`,
      },
      body: JSON.stringify({
        from: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email, name: nome || "" }],
        subject: getSubject(source),
        html: confirmationHTML(nome, source),
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
        email_type: "convite_agendamento",
        recipient_email: email,
        recipient_name: nome || null,
        resend_id: msId,
        success,
        error_message: success ? null : `HTTP ${msResp.status}`,
      }),
    }).catch(() => {});

    return new Response(JSON.stringify({ success, message_id: msId, source }), {
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
