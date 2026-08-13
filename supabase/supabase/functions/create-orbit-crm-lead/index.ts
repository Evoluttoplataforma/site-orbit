// supabase/functions/create-orbit-crm-lead/index.ts
// Cria leads no CRM Orbit (REST v1) a partir do site:
//   - whatsapp_widget → funil Leads B2B Orbit
//   - treinamento-*   → funil LIVES (exclusivo de inscricoes /treinamentos)
// Token e URLs so via secrets do Supabase — nunca no frontend.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEFAULT_REST_BASE =
  "https://cvanwvoddchatcdstwry.supabase.co/functions/v1/crm-api-v1";

const PIPE_B2B =
  Deno.env.get("ORBIT_PIPELINE_B2B") ?? "7b522de3-210a-4c62-9eb5-25788a4e6239";
const STAGE_B2B =
  Deno.env.get("ORBIT_STAGE_B2B") ?? "94a0e221-9f3b-42a0-b204-f60b8f609182";
// Funil exclusivo de treinamentos (CRM → pipeline "Treinamento", etapa "Inscrito")
const PIPE_TREINA =
  Deno.env.get("ORBIT_PIPELINE_TREINAMENTOS") ??
  "51da79ac-7bb0-4946-a4ca-12138cee9e18";
const STAGE_TREINA =
  Deno.env.get("ORBIT_STAGE_TREINAMENTOS") ??
  "675c1b15-7290-4fb4-a6cc-254ea50ce453";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function resolveRestBase(raw: string | undefined): string {
  const base = (raw || "").trim().replace(/\/$/, "");
  if (!base) return DEFAULT_REST_BASE;
  // .env.local às vezes aponta para a SPA (/crm) — forçar REST real
  if (
    base.includes("app.orbitgestao.com.br") ||
    base.endsWith("/crm") ||
    !base.includes("functions/v1")
  ) {
    return DEFAULT_REST_BASE;
  }
  if (base.endsWith("/crm-api") && !base.endsWith("/crm-api-v1")) {
    return base.replace(/\/crm-api$/, "/crm-api-v1");
  }
  return base;
}

function e164(phone?: string | null): string | null {
  if (!phone) return null;
  const d = String(phone).replace(/\D/g, "");
  if (!d) return null;
  return d.startsWith("55") ? `+${d}` : `+55${d}`;
}

function isTreinamentoSource(source?: string | null): boolean {
  const s = String(source || "").toLowerCase();
  return s.startsWith("treinamento");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("ORBIT_CRM_TOKEN") || "";
    const restBase = resolveRestBase(Deno.env.get("ORBIT_CRM_BASE_URL"));
    if (!token) {
      console.error("[create-orbit-crm-lead] ORBIT_CRM_TOKEN missing");
      return json({ ok: false, skipped: true, reason: "missing_token" });
    }

    const body = await req.json().catch(() => ({}));
    const {
      lead_id,
      nome,
      name,
      email,
      telefone,
      whatsapp,
      phone,
      empresa,
      company,
      source,
      tags,
      chosen_date,
      training_slug,
      notes,
      utmData,
      custom_fields,
      orbit_lead_id: existingOrbitId,
    } = body ?? {};

    const contactName = String(nome || name || "").trim();
    const contactEmail = String(email || "").trim().toLowerCase();
    const contactPhone = e164(telefone || whatsapp || phone);
    const companyName = String(empresa || company || "").trim() || null;
    const leadSource = String(source || "site").trim();

    if (!contactName && !contactEmail && !contactPhone) {
      return json({ ok: false, error: "contact required" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const sb =
      supabaseUrl && serviceKey
        ? createClient(supabaseUrl, serviceKey)
        : null;

    // Idempotencia: se ja sincronizou, nao cria de novo
    if (lead_id && sb) {
      const { data: row } = await sb
        .from("leads")
        .select("orbit_lead_id")
        .eq("id", lead_id)
        .maybeSingle();
      if (row?.orbit_lead_id) {
        return json({
          ok: true,
          skipped: true,
          reason: "already_synced",
          orbit_lead_id: row.orbit_lead_id,
        });
      }
    }
    if (existingOrbitId) {
      return json({
        ok: true,
        skipped: true,
        reason: "already_synced",
        orbit_lead_id: existingOrbitId,
      });
    }

    const treinamento = isTreinamentoSource(leadSource);
    const pipeline_id = treinamento ? PIPE_TREINA : PIPE_B2B;
    const stage_id = treinamento ? STAGE_TREINA : STAGE_B2B;

    const tagList: string[] = Array.isArray(tags)
      ? tags.map((t: unknown) => String(t)).filter(Boolean)
      : [];
    if (treinamento) {
      if (!tagList.includes("treinamento")) tagList.push("treinamento");
      if (!tagList.includes("clientes")) tagList.push("clientes");
      const slug = String(training_slug || leadSource.replace(/^treinamento-/, "") || "");
      if (slug && !tagList.includes(slug)) tagList.push(slug);
      if (chosen_date && !tagList.includes(String(chosen_date))) {
        tagList.push(String(chosen_date));
      }
    } else {
      if (!tagList.includes("whatsapp")) tagList.push("whatsapp");
      if (!tagList.includes("inbound")) tagList.push("inbound");
    }

    const titleParts = [contactName || "Lead"];
    if (companyName) titleParts.push(`— ${companyName}`);
    if (treinamento && chosen_date) titleParts.push(`(${chosen_date})`);

    const noteParts: string[] = [];
    if (notes) noteParts.push(String(notes));
    if (treinamento) {
      noteParts.push(`Origem: /treinamentos (${leadSource})`);
      if (chosen_date) noteParts.push(`Data escolhida: ${chosen_date}`);
    } else {
      noteParts.push("Origem: Widget WhatsApp do site");
    }

    const cf: Record<string, unknown> = {
      ...(typeof custom_fields === "object" && custom_fields ? custom_fields : {}),
      ...(typeof utmData === "object" && utmData ? utmData : {}),
    };
    if (lead_id != null) cf.supabase_lead_id = String(lead_id);
    if (chosen_date) cf.chosen_date = String(chosen_date);
    if (training_slug) cf.training_slug = String(training_slug);

    const payload: Record<string, unknown> = {
      pipeline_id,
      stage_id,
      title: titleParts.join(" "),
      contact_name: contactName || null,
      contact_email: contactEmail || null,
      contact_phone: contactPhone,
      company_name: companyName,
      source: leadSource,
      tags: tagList,
      notes: noteParts.join("\n") || null,
      custom_fields: Object.keys(cf).length ? cf : undefined,
    };

    const res = await fetch(`${restBase}/v1/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let created: Record<string, unknown> = {};
    try {
      created = JSON.parse(text);
    } catch {
      created = {};
    }

    if (!res.ok) {
      console.error(
        "[create-orbit-crm-lead] CRM error",
        res.status,
        text.slice(0, 300),
      );
      // 200 para o frontend nao bloquear o fluxo local
      return json({
        ok: false,
        error: `crm_${res.status}`,
        detail: text.slice(0, 200),
      });
    }

    const data = (created.data ?? created.lead ?? created) as Record<
      string,
      unknown
    >;
    const orbit_lead_id = (data.id ?? created.id ?? null) as string | null;

    if (orbit_lead_id && lead_id && sb) {
      try {
        await sb
          .from("leads")
          .update({ orbit_lead_id, orbit_pipeline_id: pipeline_id })
          .eq("id", lead_id);
      } catch (persistErr) {
        console.warn(
          "[create-orbit-crm-lead] persist orbit_lead_id failed",
          persistErr,
        );
      }
    }

    return json({
      ok: true,
      orbit_lead_id,
      pipeline: treinamento ? "treinamentos" : "b2b",
      pipeline_id,
      stage_id,
    });
  } catch (e) {
    console.error("[create-orbit-crm-lead]", e);
    return json({ ok: false, error: String(e) });
  }
});
