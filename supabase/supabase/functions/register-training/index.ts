// supabase/functions/register-training/index.ts
//
// Inscrição em /treinamentos. Uma chamada faz tudo server-side:
//   1. grava o lead em live_orbit_leads
//   2. cria 1 linha em training_registrations por sessão marcada
//   3. registra a pessoa no Zoom em cada uma delas
//   4. cria o lead no CRM Orbit (best-effort, depois da resposta)
//
// A ordem importa: as linhas são criadas com zoom_status='pending' ANTES de
// chamar o Zoom. Se o Zoom cair ou o isolate morrer, nada é perdido — o cron
// training-zoom-retry recupera. O usuário nunca perde a inscrição.
//
// Modo interno: POST {"mode":"retry_pending"} + header x-cron-secret.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { addMeetingRegistrant, hasZoomCreds, ZoomError } from "../_shared/zoom.ts";

type Sb = ReturnType<typeof createClient>;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-cron-secret, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_SESSIONS = 3;
const MIN_FILL_MS = 2000; // menos que isso é bot
const RL_SCOPE = "register-training";
// Se uma sessão passar disso em 24h, para de chamar o Zoom (protege a reunião).
const DAILY_SESSION_CAP = 200;

const DISPOSABLE = [
  "mailinator.com", "tempmail.com", "guerrillamail.com", "yopmail.com",
  "10minutemail.com", "throwawaymail.com", "trashmail.com", "getnada.com",
];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function e164(phone?: string | null): string | null {
  if (!phone) return null;
  const d = String(phone).replace(/\D/g, "");
  if (!d) return null;
  return d.startsWith("55") ? `+${d}` : `+55${d}`;
}

function isEmailShapeValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  return { first: parts[0] || "Participante", last: parts.slice(1).join(" ") };
}

/** 'YYYY-MM-DD' da próxima ocorrência, em data LOCAL de São Paulo. */
function nextOccurrenceDateBRT(weekday: number, hour: number, minute: number): string {
  const nowBRT = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );
  let diff = (weekday - nowBRT.getDay() + 7) % 7;
  if (diff === 0 && nowBRT.getHours() * 60 + nowBRT.getMinutes() >= hour * 60 + minute) {
    diff = 7;
  }
  nowBRT.setDate(nowBRT.getDate() + diff);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${nowBRT.getFullYear()}-${p(nowBRT.getMonth() + 1)}-${p(nowBRT.getDate())}`;
}

interface SessionRow {
  slug: string;
  title: string;
  kind: string;
  weekday: number;
  start_time: string;
  duration_min: number;
  zoom_meeting_id: string | null;
  zoom_join_url: string | null;
  recurrence_ends_at: string | null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    console.error("[register-training] missing supabase env");
    return json({ ok: false, error: "server_misconfigured" }, 500);
  }
  const sb = createClient(supabaseUrl, serviceKey);

  try {
    const body = await req.json().catch(() => ({}));

    // ─── modo interno: reprocessa pendências ───────────────────────────────
    if (body?.mode === "retry_pending") {
      const secret = Deno.env.get("CRON_SECRET") || "";
      if (!secret || req.headers.get("x-cron-secret") !== secret) {
        return json({ ok: false, error: "forbidden" }, 403);
      }
      return await retryPending(sb, Number(body.limit) || 50);
    }

    // ─── 1) validação ──────────────────────────────────────────────────────
    const nome = String(body?.nome || "").trim().slice(0, 120);
    const email = String(body?.email || "").trim().toLowerCase().slice(0, 160);
    const empresa = String(body?.empresa || "").trim().slice(0, 160) || null;
    const telefone = e164(body?.telefone);
    const slugs: string[] = Array.isArray(body?.sessions)
      ? [...new Set(body.sessions.map((s: unknown) => String(s)))].slice(0, MAX_SESSIONS)
      : [];

    if (!nome) return json({ ok: false, error: "invalid_name" }, 400);
    if (!isEmailShapeValid(email)) return json({ ok: false, error: "invalid_email" }, 400);
    const domain = email.split("@")[1] || "";
    if (DISPOSABLE.includes(domain)) return json({ ok: false, error: "disposable_email" }, 400);
    if (!slugs.length) return json({ ok: false, error: "no_sessions" }, 400);

    // ─── 2) anti-abuso ─────────────────────────────────────────────────────
    // honeypot: campo oculto tem de vir vazio
    if (String(body?.hp || "").trim()) {
      console.warn("[register-training] honeypot hit");
      return json({ ok: true, results: [], spam: true }); // não revela o motivo
    }
    // tempo mínimo de preenchimento
    const ts = Number(body?.ts) || 0;
    if (ts && Date.now() - ts < MIN_FILL_MS) {
      return json({ ok: false, error: "too_fast" }, 400);
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      "unknown";
    const salt = Deno.env.get("RATE_SALT") || "orbit";
    const ipHash = await sha256Hex(`${ip}${salt}`);
    const emailHash = await sha256Hex(email);

    const rl = await checkRateLimit(sb, ipHash, emailHash);
    if (!rl.ok) {
      console.warn("[register-training] rate limited", rl.reason);
      return json({ ok: false, error: "rate_limited", retry_after: rl.retryAfter }, 429);
    }
    await sb.from("rate_limit_hits").insert([
      { bucket_key: `ip:${ipHash}`, scope: RL_SCOPE },
      { bucket_key: `email:${emailHash}`, scope: RL_SCOPE },
    ]);

    // ─── 3) sessões válidas (a tabela é a autoridade) ──────────────────────
    const { data: sessionRows, error: sErr } = await sb
      .from("training_sessions")
      .select("slug,title,kind,weekday,start_time,duration_min,zoom_meeting_id,zoom_join_url,recurrence_ends_at")
      .in("slug", slugs)
      .eq("active", true);

    if (sErr) {
      console.error("[register-training] sessions query failed", sErr);
      return json({ ok: false, error: "sessions_unavailable" }, 500);
    }
    const sessions = (sessionRows || []) as SessionRow[];
    if (!sessions.length) return json({ ok: false, error: "invalid_session" }, 400);

    // ─── 4) grava o lead ───────────────────────────────────────────────────
    const utm = body?.utm ?? {};
    const { data: leadRow } = await sb
      .from("live_orbit_leads")
      .insert({
        nome,
        email,
        telefone: telefone || "",
        empresa,
        source: "treinamentos",
        chosen_date: null,
        landing_page: body?.landing_page ?? null,
        referrer: body?.referrer ?? null,
        session_id: body?.session_id ?? null,
        utm_source: utm.utm_source ?? null,
        utm_medium: utm.utm_medium ?? null,
        utm_campaign: utm.utm_campaign ?? null,
        utm_content: utm.utm_content ?? null,
        utm_term: utm.utm_term ?? null,
        gclid: body?.gclid ?? null,
        fbclid: body?.fbclid ?? null,
        live_title: sessions.map((s) => s.title).join(" + "),
      })
      .select("id")
      .maybeSingle();

    const leadId = leadRow?.id ?? null;

    // ─── 5) upsert das inscrições, ANTES de falar com o Zoom ───────────────
    const nowIso = new Date().toISOString();
    const { data: regRows, error: rErr } = await sb
      .from("training_registrations")
      .upsert(
        sessions.map((s) => ({
          lead_id: leadId,
          session_slug: s.slug,
          nome,
          email,
          telefone,
          empresa,
          source: "treinamentos",
          landing_page: body?.landing_page ?? null,
          referrer: body?.referrer ?? null,
          session_id: body?.session_id ?? null,
          utm_source: utm.utm_source ?? null,
          utm_medium: utm.utm_medium ?? null,
          utm_campaign: utm.utm_campaign ?? null,
          utm_content: utm.utm_content ?? null,
          utm_term: utm.utm_term ?? null,
          gclid: body?.gclid ?? null,
          fbclid: body?.fbclid ?? null,
          ip_hash: ipHash,
          updated_at: nowIso,
        })),
        { onConflict: "email,session_slug" }
      )
      .select("id,session_slug,zoom_status,zoom_registrant_id,zoom_join_url");

    if (rErr || !regRows) {
      console.error("[register-training] upsert failed", rErr);
      return json({ ok: false, error: "registration_failed" }, 500);
    }

    const bySlug = new Map(sessions.map((s) => [s.slug, s]));
    const results: Record<string, unknown>[] = [];
    let abortRest = false;

    // ─── 6) Zoom, SEQUENCIAL (respeita rate limit e permite abortar no 429) ─
    for (const reg of regRows) {
      const s = bySlug.get(reg.session_slug)!;
      const [hh, mm] = s.start_time.split(":").map(Number);
      const nextDate = nextOccurrenceDateBRT(s.weekday, hh, mm);
      const base = {
        slug: s.slug,
        registration_id: reg.id,
        title: s.title,
        next_occurrence: nextDate,
      };

      // já registrado: não chama de novo (idempotência)
      if (reg.zoom_status === "registered" && reg.zoom_registrant_id) {
        results.push({ ...base, status: "registered", join_url: reg.zoom_join_url });
        continue;
      }

      if (abortRest) {
        results.push({ ...base, status: "pending", join_url: null });
        continue;
      }

      if (!s.zoom_meeting_id || !hasZoomCreds()) {
        // sala ainda não criada ou integração desligada: fica pendente, o cron pega
        await sb.from("training_registrations")
          .update({ zoom_status: "pending", zoom_error: s.zoom_meeting_id ? "no_credentials" : "no_meeting_id" })
          .eq("id", reg.id);
        results.push({ ...base, status: "pending", join_url: s.zoom_join_url });
        continue;
      }

      // guarda de blast radius: reunião cheia de inscrições em 24h
      const { count } = await sb
        .from("training_registrations")
        .select("id", { count: "exact", head: true })
        .eq("session_slug", s.slug)
        .gte("created_at", new Date(Date.now() - 86400_000).toISOString());
      if ((count ?? 0) > DAILY_SESSION_CAP) {
        console.error("[register-training] daily cap hit, skipping zoom", s.slug, count);
        await sb.from("training_registrations")
          .update({ zoom_status: "skipped", zoom_error: "daily_cap" })
          .eq("id", reg.id);
        results.push({ ...base, status: "skipped", join_url: s.zoom_join_url });
        continue;
      }

      // recorrência perto do fim: registra mas avisa
      const warn =
        s.recurrence_ends_at && new Date(s.recurrence_ends_at).getTime() < Date.now() + 14 * 86400_000
          ? "recurrence_expiring"
          : undefined;
      if (warn) console.error("[register-training] RECURRENCE EXPIRING", s.slug, s.recurrence_ends_at);

      const { first, last } = splitName(nome);
      try {
        const z = await addMeetingRegistrant(s.zoom_meeting_id, {
          email,
          firstName: first,
          lastName: last,
          phone: telefone,
          org: empresa,
        });
        await sb.from("training_registrations").update({
          zoom_status: "registered",
          zoom_registrant_id: z.registrant_id,
          zoom_participant_id: z.id,
          zoom_join_url: z.join_url || s.zoom_join_url,
          zoom_error: null,
          zoom_error_kind: null,
          zoom_registered_at: new Date().toISOString(),
        }).eq("id", reg.id);
        results.push({ ...base, status: "registered", join_url: z.join_url || s.zoom_join_url, ...(warn ? { warning: warn } : {}) });
      } catch (e) {
        const ze = e instanceof ZoomError ? e : new ZoomError(String(e), "retryable");
        // retryable fica 'pending' (cron reprocessa); permanent vira 'failed'
        const status = ze.kind === "retryable" ? "pending" : "failed";
        await sb.from("training_registrations").update({
          zoom_status: status,
          zoom_error: ze.message.slice(0, 300),
          zoom_error_kind: ze.kind,
          zoom_attempts: 1,
        }).eq("id", reg.id);
        results.push({ ...base, status, join_url: s.zoom_join_url, error: ze.message.slice(0, 120) });
        // 429: não queima as outras sessões nesta requisição
        if (ze.status === 429) abortRest = true;
      }
    }

    // ─── 7) CRM depois da resposta ─────────────────────────────────────────
    const crmBody = {
      lead_id: leadId,
      nome,
      email,
      telefone,
      empresa,
      source: "treinamentos",
      tags: [
        "treinamento",
        ...sessions.map((s) => s.slug),
        ...(sessions.some((s) => s.slug.includes("masterclass")) ? ["masterclass"] : []),
      ],
      notes: sessions.some((s) => s.slug.includes("masterclass"))
        ? `Inscrição /live/chris (masterclass)\nSessões: ${sessions.map((s) => `${s.title} (${s.slug})`).join(", ")}`
        : `Inscrição /treinamentos\nSessões: ${sessions.map((s) => `${s.title} (${s.slug})`).join(", ")}`,
      custom_fields: { training_slugs: sessions.map((s) => s.slug).join(",") },
    };
    const crmTask = fetch(`${supabaseUrl}/functions/v1/create-orbit-crm-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${serviceKey}` },
      body: JSON.stringify(crmBody),
    }).catch((e) => console.warn("[register-training] crm call failed", String(e)));

    // @ts-ignore EdgeRuntime existe no runtime do Supabase
    if (typeof EdgeRuntime !== "undefined" && EdgeRuntime?.waitUntil) {
      // @ts-ignore
      EdgeRuntime.waitUntil(crmTask);
    } else {
      await crmTask;
    }

    return json({ ok: true, lead_id: leadId, results });
  } catch (e) {
    console.error("[register-training]", e);
    return json({ ok: false, error: String(e) }, 200);
  }
});

// ─── rate limit ────────────────────────────────────────────────────────────
async function checkRateLimit(
  sb: Sb,
  ipHash: string,
  emailHash: string
): Promise<{ ok: boolean; reason?: string; retryAfter?: number }> {
  const now = Date.now();
  const windows: { key: string; sinceMs: number; max: number; reason: string; retry: number }[] = [
    { key: `ip:${ipHash}`, sinceMs: 10 * 60_000, max: 6, reason: "ip_10min", retry: 600 },
    { key: `ip:${ipHash}`, sinceMs: 24 * 3600_000, max: 20, reason: "ip_24h", retry: 3600 },
    { key: `email:${emailHash}`, sinceMs: 3600_000, max: 4, reason: "email_1h", retry: 3600 },
  ];
  for (const w of windows) {
    const { count, error } = await sb
      .from("rate_limit_hits")
      .select("bucket_key", { count: "exact", head: true })
      .eq("scope", RL_SCOPE)
      .eq("bucket_key", w.key)
      .gte("hit_at", new Date(now - w.sinceMs).toISOString());
    if (error) {
      console.warn("[register-training] rate limit query failed, allowing", error);
      return { ok: true }; // fail-open: não perder lead real por erro nosso
    }
    if ((count ?? 0) >= w.max) return { ok: false, reason: w.reason, retryAfter: w.retry };
  }
  return { ok: true };
}

// ─── retry das pendências (cron) ───────────────────────────────────────────
async function retryPending(sb: Sb, limit: number): Promise<Response> {
  if (!hasZoomCreds()) return json({ ok: false, skipped: true, reason: "missing_credentials" });

  const { data: rows } = await sb
    .from("training_registrations")
    .select("id,session_slug,nome,email,telefone,empresa,zoom_attempts")
    .or("zoom_status.eq.pending,and(zoom_status.eq.failed,zoom_error_kind.eq.retryable)")
    .lt("zoom_attempts", 5)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (!rows?.length) return json({ ok: true, processed: 0, fixed: 0 });

  const { data: sessions } = await sb
    .from("training_sessions")
    .select("slug,zoom_meeting_id,zoom_join_url")
    .eq("active", true);
  const meetingBySlug = new Map(
    (sessions || []).map((s: SessionRow) => [s.slug, s])
  );

  let fixed = 0;
  for (const r of rows) {
    const s = meetingBySlug.get(r.session_slug) as SessionRow | undefined;
    if (!s?.zoom_meeting_id) continue;
    const { first, last } = splitName(r.nome);
    try {
      const z = await addMeetingRegistrant(s.zoom_meeting_id, {
        email: r.email,
        firstName: first,
        lastName: last,
        phone: r.telefone,
        org: r.empresa,
      });
      await sb.from("training_registrations").update({
        zoom_status: "registered",
        zoom_registrant_id: z.registrant_id,
        zoom_participant_id: z.id,
        zoom_join_url: z.join_url || s.zoom_join_url,
        zoom_error: null,
        zoom_error_kind: null,
        zoom_registered_at: new Date().toISOString(),
        zoom_attempts: (r.zoom_attempts ?? 0) + 1,
      }).eq("id", r.id);
      fixed++;
    } catch (e) {
      const ze = e instanceof ZoomError ? e : new ZoomError(String(e), "retryable");
      await sb.from("training_registrations").update({
        zoom_status: ze.kind === "retryable" ? "pending" : "failed",
        zoom_error: ze.message.slice(0, 300),
        zoom_error_kind: ze.kind,
        zoom_attempts: (r.zoom_attempts ?? 0) + 1,
      }).eq("id", r.id);
      if (ze.status === 429) break; // deixa o resto para o próximo tick
    }
  }
  return json({ ok: true, processed: rows.length, fixed });
}
