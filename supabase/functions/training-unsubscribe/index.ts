// supabase/functions/training-unsubscribe/index.ts
//
// Descadastro dos lembretes de /treinamentos. GET ?r=<registration_id>.
// Linkado no rodapé e no header List-Unsubscribe de todo lembrete — exigência
// prática de e-mail em volume, e protege a reputação de orbitgestao.com.br, que é
// compartilhada com as lives, o bootcamp e o e-mail corporativo.
//
// Não remove o registro no Zoom nem apaga o lead: só desliga os lembretes. A
// pessoa continua com o link de acesso que já recebeu.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE = "https://orbitgestao.com.br";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function page(title: string, body: string, status = 200): Response {
  return new Response(
    `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${title} — Orbit Gestão</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#0D1117;color:#C9D1D9;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;padding:24px;}
  .card{max-width:460px;text-align:center;background:#161B22;border:1px solid rgba(255,186,26,.18);
        border-radius:16px;padding:40px 32px;}
  img{height:34px;margin-bottom:24px}
  h1{color:#fff;font-size:1.4rem;margin:0 0 12px;font-weight:800}
  p{font-size:.95rem;line-height:1.65;margin:0 0 20px}
  a.btn{display:inline-block;padding:12px 26px;border-radius:50px;background:rgba(255,186,26,.12);
        border:1px solid rgba(255,186,26,.3);color:#ffba1a;text-decoration:none;font-weight:700;font-size:.88rem}
</style></head><body><div class="card">
<img src="${SITE}/images/logo-orbit-white.png" alt="Orbit Gestão">
<h1>${title}</h1>${body}
<a class="btn" href="${SITE}/treinamentos">Voltar para a agenda</a>
</div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } }
  );
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const id = (url.searchParams.get("r") || "").trim();

  if (!UUID_RE.test(id)) {
    return page("Link inválido", "<p>Não reconhecemos este link de descadastro. Se quiser parar de receber, responda o e-mail que a gente resolve.</p>", 400);
  }

  try {
    const sb = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data, error } = await sb
      .from("training_registrations")
      .update({ reminders_enabled: false, unsubscribed_at: new Date().toISOString() })
      .eq("id", id)
      .select("session_slug")
      .maybeSingle();

    if (error) {
      console.error("[training-unsubscribe] update failed", error);
      return page("Não conseguimos agora", "<p>Tente novamente em alguns instantes.</p>", 500);
    }
    if (!data) {
      // id válido no formato mas inexistente: não confirma nem nega a existência
      return page("Pronto", "<p>Você não vai mais receber lembretes destas sessões.</p>");
    }

    return page(
      "Lembretes desativados",
      "<p>Você não vai mais receber os avisos desta sessão. Sua inscrição no Zoom continua válida — se quiser participar, o link que você já recebeu continua funcionando.</p>"
    );
  } catch (e) {
    console.error("[training-unsubscribe]", e);
    return page("Não conseguimos agora", "<p>Tente novamente em alguns instantes.</p>", 500);
  }
});
