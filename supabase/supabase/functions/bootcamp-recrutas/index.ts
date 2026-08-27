import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
// Senha do painel de recrutas. Pode sobrescrever via secret BOOTCAMP_PANEL_PASS.
const PANEL_PASS = Deno.env.get("BOOTCAMP_PANEL_PASS") || "orbit-bootcamp-2026";
// Stripe (opcional): se setado, marca quem pagou consultando a Stripe ao vivo.
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const STRIPE_LINK_SLUG = "3cIfZgbnr7gRfL5dS3aAw01"; // slug do buy.stripe.com/<slug>

interface Lead {
  nome: string | null;
  email: string | null;
  telefone: string | null;
  empresa: string | null;
  source: string | null;
  created_at: string | null;
  pago?: boolean;
}

async function stripeGet(path: string): Promise<Record<string, unknown> | null> {
  try {
    const resp = await fetch(`https://api.stripe.com/v1/${path}`, {
      headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
    });
    if (!resp.ok) return null;
    return (await resp.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

// Descobre o id (plink_...) do Payment Link a partir do slug da URL
async function findPaymentLinkId(): Promise<string | null> {
  let startingAfter = "";
  for (let page = 0; page < 5; page++) {
    const q = `payment_links?limit=100${startingAfter ? `&starting_after=${startingAfter}` : ""}`;
    const data = await stripeGet(q);
    const list = (data?.data as Array<Record<string, unknown>>) || [];
    for (const pl of list) {
      const url = (pl.url as string) || "";
      if (url.includes(STRIPE_LINK_SLUG)) return pl.id as string;
    }
    if (!data?.has_more || !list.length) break;
    startingAfter = list[list.length - 1].id as string;
  }
  return null;
}

// Emails que pagaram esse Payment Link (consulta a Stripe ao vivo)
async function fetchPaidEmailsStripe(): Promise<Set<string>> {
  const out = new Set<string>();
  const plink = await findPaymentLinkId();
  if (!plink) return out;
  let startingAfter = "";
  for (let page = 0; page < 10; page++) {
    const q = `checkout/sessions?payment_link=${plink}&limit=100${startingAfter ? `&starting_after=${startingAfter}` : ""}`;
    const data = await stripeGet(q);
    const list = (data?.data as Array<Record<string, unknown>>) || [];
    for (const s of list) {
      if (s.payment_status === "paid") {
        const det = (s.customer_details || {}) as Record<string, unknown>;
        const email = ((det.email as string) || (s.customer_email as string) || "").toLowerCase().trim();
        if (email) out.add(email);
      }
    }
    if (!data?.has_more || !list.length) break;
    startingAfter = list[list.length - 1].id as string;
  }
  return out;
}

// Fallback: tabela bootcamp_pagamentos (caso use webhook em vez da Stripe API)
async function fetchPaidEmailsTable(): Promise<Set<string>> {
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

async function fetchPaidEmails(): Promise<Set<string>> {
  // Prioriza a Stripe API (mais simples de configurar); senão usa a tabela do webhook.
  if (STRIPE_SECRET_KEY) return await fetchPaidEmailsStripe();
  return await fetchPaidEmailsTable();
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json().catch(() => ({}))) as { senha?: string; debug?: boolean };
    if (!body.senha || body.senha !== PANEL_PASS) {
      return new Response(JSON.stringify({ error: "Senha incorreta" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Modo diagnóstico: confirma conexão com a Stripe sem precisar de pagamento
    if (body.debug) {
      const configured = !!STRIPE_SECRET_KEY;
      const plink = configured ? await findPaymentLinkId() : null;
      const porStatus: Record<string, number> = {};
      let totalSessions = 0;
      if (plink) {
        let after = "";
        for (let p = 0; p < 10; p++) {
          const d = await stripeGet(`checkout/sessions?payment_link=${plink}&limit=100${after ? `&starting_after=${after}` : ""}`);
          const list = (d?.data as Array<Record<string, unknown>>) || [];
          for (const s of list) {
            totalSessions++;
            const st = (s.payment_status as string) || "?";
            porStatus[st] = (porStatus[st] || 0) + 1;
          }
          if (!d?.has_more || !list.length) break;
          after = list[list.length - 1].id as string;
        }
      }
      const paid = configured ? await fetchPaidEmailsStripe() : new Set<string>();
      return new Response(
        JSON.stringify({
          stripe_configured: configured,
          payment_link_encontrado: !!plink,
          payment_link_id: plink,
          sessoes_total: totalSessions,
          sessoes_por_status: porStatus,
          pagamentos_confirmados: paid.size,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Lê os leads do bootcamp com a chave de serviço (RLS bypassed)
    const url =
      `${SUPABASE_URL}/rest/v1/live_orbit_leads` +
      `?select=nome,email,telefone,empresa,source,created_at` +
      `&source=like.bootcamp-orbit%25` +
      `&order=created_at.desc&limit=10000`;
    const resp = await fetch(url, {
      headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}` },
    });
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: `Falha ao ler leads (HTTP ${resp.status})` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const rows = (await resp.json()) as Lead[];
    const paid = await fetchPaidEmails();

    // dedup por email (mantém o mais recente, que já vem primeiro pelo order desc)
    const seen = new Set<string>();
    const online: Lead[] = [];
    const presencial: Lead[] = [];
    const mentoria: Lead[] = [];
    for (const r of rows) {
      const key = (r.email || "").toLowerCase().trim();
      if (key && seen.has(key)) continue;
      if (key) seen.add(key);
      r.pago = key ? paid.has(key) : false;
      const src = r.source || "";
      if (src.includes("mentoria")) mentoria.push(r);
      else if (src.includes("presencial")) presencial.push(r);
      else online.push(r);
    }
    const total_pagos = presencial.filter((l) => l.pago).length;

    return new Response(
      JSON.stringify({
        online,
        presencial,
        mentoria,
        total_online: online.length,
        total_presencial: presencial.length,
        total_mentoria: mentoria.length,
        total_pagos,
        total: online.length + presencial.length + mentoria.length,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
