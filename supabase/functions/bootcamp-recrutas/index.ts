import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
// Senha do painel de recrutas. Pode sobrescrever via secret BOOTCAMP_PANEL_PASS.
const PANEL_PASS = Deno.env.get("BOOTCAMP_PANEL_PASS") || "orbit-bootcamp-2026";

interface Lead {
  nome: string | null;
  email: string | null;
  telefone: string | null;
  empresa: string | null;
  source: string | null;
  created_at: string | null;
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

    // O pagamento ocorre dentro do Orbit e ainda não possui fonte autenticada neste repo.
    if (body.debug) {
      return new Response(
        JSON.stringify({
          payment_tracking: "unavailable",
          message: "O painel não confirma pagamentos até existir uma integração autenticada com a fonte do Orbit.",
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
    // dedup por email (mantém o mais recente, que já vem primeiro pelo order desc)
    const seen = new Set<string>();
    const online: Lead[] = [];
    const presencial: Lead[] = [];
    const mentoria: Lead[] = [];
    const waitlist: Lead[] = [];
    for (const r of rows) {
      const key = (r.email || "").toLowerCase().trim();
      if (key && seen.has(key)) continue;
      if (key) seen.add(key);
      const src = r.source || "";
      if (src.endsWith("-waitlist")) waitlist.push(r);
      else if (src.includes("mentoria")) mentoria.push(r);
      else if (src.includes("presencial")) presencial.push(r);
      else online.push(r);
    }

    return new Response(
      JSON.stringify({
        online,
        presencial,
        mentoria,
        waitlist,
        total_online: online.length,
        total_presencial: presencial.length,
        total_mentoria: mentoria.length,
        total_waitlist: waitlist.length,
        payment_tracking: "unavailable",
        total: online.length + presencial.length + mentoria.length + waitlist.length,
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
