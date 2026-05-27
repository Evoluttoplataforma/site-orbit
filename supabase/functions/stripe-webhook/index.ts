import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET")!; // whsec_...

// ⚠️ Esta função precisa ser deployada com "Verify JWT" DESLIGADO,
// porque a Stripe chama sem o apikey do Supabase.

const enc = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Verifica a assinatura do webhook da Stripe (esquema t=...,v1=...)
async function verifyStripeSig(rawBody: string, sigHeader: string | null, secret: string): Promise<boolean> {
  if (!sigHeader) return false;
  const parts: Record<string, string> = {};
  for (const kv of sigHeader.split(",")) {
    const [k, v] = kv.split("=");
    if (k && v) parts[k.trim()] = v.trim();
  }
  if (!parts.t || !parts.v1) return false;

  // Tolerância de 5 min contra replay
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(parts.t)) > 300) return false;

  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${parts.t}.${rawBody}`));
  const expected = toHex(sig);

  // comparação em tempo ~constante
  if (expected.length !== parts.v1.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ parts.v1.charCodeAt(i);
  return diff === 0;
}

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const rawBody = await req.text();
  const ok = await verifyStripeSig(rawBody, req.headers.get("stripe-signature"), STRIPE_WEBHOOK_SECRET);
  if (!ok) {
    return new Response(JSON.stringify({ error: "Assinatura inválida" }), { status: 400 });
  }

  let event: { type?: string; data?: { object?: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido" }), { status: 400 });
  }

  // Só nos interessa o checkout concluído
  if (event.type === "checkout.session.completed") {
    const s = (event.data?.object || {}) as Record<string, unknown>;
    const details = (s.customer_details || {}) as Record<string, unknown>;
    const email = (details.email as string) || (s.customer_email as string) || "";
    const nome = (details.name as string) || "";
    const payload = {
      email,
      nome,
      amount_total: (s.amount_total as number) ?? null,
      currency: (s.currency as string) ?? null,
      stripe_session_id: (s.id as string) ?? null,
      status: "paid",
    };

    // upsert por stripe_session_id (idempotente — Stripe pode reenviar o evento)
    await fetch(`${SUPABASE_URL}/rest/v1/bootcamp_pagamentos?on_conflict=stripe_session_id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  // Sempre 200 pra Stripe não reenviar indefinidamente
  return new Response(JSON.stringify({ received: true }), { status: 200, headers: { "Content-Type": "application/json" } });
});
