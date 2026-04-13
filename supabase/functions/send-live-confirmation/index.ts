import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM_EMAIL = "noreply@orbtgestao.com.br";
const FROM_NAME = "Orbit Gestão";
const LIVE_PAGE = "https://orbitgestao.com.br/live";

function confirmationHTML(nome: string) {
  const first = nome?.split(" ")[0] || "Olá";
  return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;">
<div style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);padding:40px 32px;text-align:center;">
<img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;">
<h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">Inscrição Confirmada!</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;font-weight:600;">A Nova Era da Gestão com Time de IA</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>,</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Sua inscrição para a live <strong style="color:#fff;">A Nova Era da Gestão com Time de IA</strong> está confirmada!</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">A live acontece toda <strong style="color:#ffba1a;">terça-feira às 13h</strong>. Você vai ver na prática como dezenas de agentes de IA operam a gestão de empresas 24/7.</p>
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Enviaremos lembretes antes de começar para você não perder.</p>
<div style="text-align:center;margin:32px 0;">
<a href="${LIVE_PAGE}" style="display:inline-block;background:#ffba1a;color:#0D1117;font-weight:700;font-size:16px;padding:16px 40px;border-radius:8px;text-decoration:none;">VER DETALHES DA LIVE</a>
</div>
</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#484F58;margin:0;">Orbit Gestão — Gestão Operada por IA</p>
</div>
</div>`;
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
    const { nome, email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "email required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email via MailerSend
    const msResp = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILERSEND_KEY}`,
      },
      body: JSON.stringify({
        from: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email, name: nome || "" }],
        subject: "Inscrição Confirmada — Live Orbit Gestão",
        html: confirmationHTML(nome),
      }),
    });

    const success = msResp.status === 202;
    const msId = msResp.headers.get("x-message-id") || null;

    // Log in email_logs table
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
    });

    return new Response(JSON.stringify({ success, message_id: msId }), {
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
