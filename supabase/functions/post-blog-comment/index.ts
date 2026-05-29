import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const FROM_EMAIL = "noreply@orbtgestao.com.br";
const FROM_NAME  = "Orbit - Blog";
const NOTIFY_TO  = [
  { email: "contato@orbitgestao.com.br" },
  { email: "marketing@templum.com.br"  },
];
const CMS_URL = "https://orbitgestao.com.br/acesso/painel";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Payload {
  article_slug?: string;
  name?: string;
  email?: string;
  comment?: string;
  website?: string; // honeypot — bot preenche, humano nunca
}

function esc(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

serve(async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const body = (await req.json().catch(() => ({}))) as Payload;

    // Honeypot: campo invisível "website" — humano não preenche
    if (body.website && body.website.trim().length > 0) {
      // Finge sucesso pra bot ir embora sem suspeitar
      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const slug    = (body.article_slug || "").trim().toLowerCase();
    const name    = (body.name    || "").trim();
    const email   = (body.email   || "").trim();
    const comment = (body.comment || "").trim();

    // Validações básicas
    const errors: string[] = [];
    if (!slug || slug.length > 200)                       errors.push("article_slug inválido");
    if (!name  || name.length < 2 || name.length > 100)   errors.push("nome deve ter 2–100 caracteres");
    if (!email || !EMAIL_RE.test(email) || email.length > 200) errors.push("email inválido");
    if (!comment || comment.length < 2 || comment.length > 5000) errors.push("comentário deve ter 2–5000 caracteres");
    if (errors.length) {
      return new Response(JSON.stringify({ error: errors.join("; ") }), {
        status: 400, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // Confirma que o artigo existe (pega article_id pra preencher também)
    const aResp = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_articles?slug=eq.${encodeURIComponent(slug)}&select=id,title&limit=1`,
      { headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}` } }
    );
    const articles = (await aResp.json().catch(() => [])) as Array<{ id: number; title: string }>;
    if (!articles.length) {
      return new Response(JSON.stringify({ error: "Artigo não encontrado" }), {
        status: 404, headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    const article = articles[0];

    // Insere comentário como pending
    const insertResp = await fetch(`${SUPABASE_URL}/rest/v1/blog_comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        article_id: article.id,
        article_slug: slug,
        name,
        email,
        comment,
        status: "pending",
        is_admin_reply: false,
        parent_id: null,
      }),
    });
    if (!insertResp.ok) {
      const errTxt = await insertResp.text();
      return new Response(JSON.stringify({ error: "Falha ao salvar", detail: errTxt.slice(0, 300) }), {
        status: 500, headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    const inserted = (await insertResp.json()) as Array<Record<string, unknown>>;
    const newId = inserted[0]?.id;

    // Notificação (fire-and-forget — não bloqueia a resposta ao usuário)
    notifyAdmins({ id: newId as number | undefined, name, email, comment, slug, articleTitle: article.title })
      .catch(() => {});

    return new Response(JSON.stringify({ success: true, id: newId, status: "pending" }), {
      status: 200, headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});

async function notifyAdmins(c: { id?: number; name: string; email: string; comment: string; slug: string; articleTitle: string }) {
  const html = `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#E6E8EB;border-radius:12px;overflow:hidden;border:1px solid #30363D;">
<div style="background:linear-gradient(135deg,#161B22 0%,#0D1117 100%);padding:28px 32px;text-align:center;border-bottom:1px solid #30363D;">
<img src="https://orbitgestao.com.br/images/logo-orbit-white.png" alt="Orbit" style="height:32px;margin-bottom:14px;">
<h1 style="color:#ffba1a;font-size:20px;margin:0;font-weight:700;">💬 Novo comentário pendente</h1>
</div>
<div style="padding:28px 32px;">
<p style="font-size:14px;color:#8B949E;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Artigo</p>
<p style="font-size:16px;color:#fff;margin:0 0 18px;font-weight:600;line-height:1.4;">${esc(c.articleTitle)}</p>

<p style="font-size:14px;color:#8B949E;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">De</p>
<p style="font-size:15px;color:#C9D1D9;margin:0 0 18px;"><strong style="color:#fff;">${esc(c.name)}</strong> &middot; ${esc(c.email)}</p>

<p style="font-size:14px;color:#8B949E;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Comentário</p>
<div style="background:#161B22;border-left:3px solid #ffba1a;padding:14px 18px;border-radius:0 8px 8px 0;margin:0 0 24px;">
  <p style="font-size:15px;color:#E6E8EB;line-height:1.6;margin:0;white-space:pre-wrap;">${esc(c.comment)}</p>
</div>

<div style="text-align:center;">
  <a href="${CMS_URL}" style="display:inline-block;background:#ffba1a;color:#0D1117;font-weight:800;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">Aprovar / Responder no CMS</a>
</div>
</div>
<div style="padding:18px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:11px;color:#484F58;margin:0;">Orbit Gestão · Blog · Moderação</p>
</div>
</div>`;

  await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${MAILERSEND_KEY}` },
    body: JSON.stringify({
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: NOTIFY_TO,
      subject: `💬 Comentário pendente · ${c.articleTitle.slice(0, 60)}`,
      html,
    }),
  });

  // Log opcional (best-effort) em email_logs
  await fetch(`${SUPABASE_URL}/rest/v1/email_logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email_type: "blog_comment_pending",
      recipient_email: NOTIFY_TO.map((r) => r.email).join(","),
      recipient_name: null,
      success: true,
    }),
  }).catch(() => {});
}
