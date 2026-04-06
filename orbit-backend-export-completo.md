# EXPORTAÇÃO COMPLETA DO BACKEND — Orbit Gestão
Data de exportação: 2026-04-06

---

## 1. EDGE FUNCTIONS COMPLETAS

### assign-pipedrive-owner/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PIPEDRIVE_API = "https://api.pipedrive.com/v1";

// Round-robin vendedores by email (order matters!)
const ROLETA_VENDEDORES = [
  "gisele.rocha@templum.com.br",
  "pedro.maia@evolutto.com",
  "thayane.duarte@evolutto.com",
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { deal_id, flow } = await req.json();

    if (!deal_id) {
      return new Response(JSON.stringify({ error: "deal_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = Deno.env.get("PIPEDRIVE_API_TOKEN");
    if (!token) throw new Error("PIPEDRIVE_API_TOKEN not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseKey);

    // 1. Get current counter and increment atomically
    const { data: counter } = await sb
      .from("roleta_counter")
      .select("current_index")
      .eq("id", 1)
      .single();

    const currentIndex = counter?.current_index ?? 0;
    const nextIndex = (currentIndex + 1) % ROLETA_VENDEDORES.length;

    // Update counter for next call
    await sb.from("roleta_counter").update({ current_index: nextIndex }).eq("id", 1);

    const selectedEmail = ROLETA_VENDEDORES[currentIndex];
    console.log(`[assign-owner] Roleta index ${currentIndex} → ${selectedEmail}`);

    // 2. Get all Pipedrive users to find the selected vendedor
    const usersRes = await fetch(`${PIPEDRIVE_API}/users?api_token=${token}`);
    const usersData = await usersRes.json();
    if (!usersData?.success) throw new Error("Failed to fetch Pipedrive users");

    let assignedUser: { id: number; email: string; name: string } | null = null;
    for (const user of usersData.data || []) {
      if ((user.email || "").toLowerCase() === selectedEmail) {
        assignedUser = { id: user.id, email: user.email, name: user.name };
        break;
      }
    }

    if (!assignedUser) {
      console.error(`[assign-owner] User not found in Pipedrive for email: ${selectedEmail}`);
      return new Response(JSON.stringify({ error: "User not found", success: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Assign owner on the deal
    await fetch(`${PIPEDRIVE_API}/deals/${deal_id}?api_token=${token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: assignedUser.id }),
    });
    console.log(`[assign-owner] Deal ${deal_id} assigned to ${assignedUser.name}`);

    // 4. Move deal to appropriate stage (only for "sala" flow; "vendedor" stays at current stage)
    if (flow !== "vendedor") {
      const pipeline = await findPipelineByName(token, "Orbit");
      if (pipeline) {
        const stagesRes = await fetch(
          `${PIPEDRIVE_API}/stages?pipeline_id=${pipeline.id}&api_token=${token}`
        );
        const stagesData = await stagesRes.json();
        const stages = stagesData?.data || [];

        const targetStage = stages.find((s: { name: string }) => {
          const n = s.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return n.includes("reuniao agendada") || n.includes("reunião agendada");
        });

        if (targetStage) {
          await fetch(`${PIPEDRIVE_API}/deals/${deal_id}?api_token=${token}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stage_id: targetStage.id }),
          });
          console.log(`[assign-owner] Deal ${deal_id} moved to "${targetStage.name}"`);
        } else {
          console.warn(`[assign-owner] Stage "Reunião Agendada" not found`);
        }
      }
    } else {
      console.log(`[assign-owner] Flow "vendedor" — deal ${deal_id} stays at current stage (Lead Novo)`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        assigned_user: { id: assignedUser.id, name: assignedUser.name, email: assignedUser.email },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("[assign-owner] Error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function findPipelineByName(token: string, name: string) {
  const res = await fetch(`${PIPEDRIVE_API}/pipelines?api_token=${token}`);
  const data = await res.json();
  return data?.data?.find((p: { name: string; id: number }) =>
    p.name.toLowerCase() === name.toLowerCase()
  ) || null;
}

```

### auth-email-hook/index.ts

```typescript
import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { sendLovableEmail, parseEmailWebhookPayload } from 'npm:@lovable.dev/email-js'
import { WebhookError, verifyWebhookRequest } from 'npm:@lovable.dev/webhooks-js'
import { SignupEmail } from '../_shared/email-templates/signup.tsx'
import { InviteEmail } from '../_shared/email-templates/invite.tsx'
import { MagicLinkEmail } from '../_shared/email-templates/magic-link.tsx'
import { RecoveryEmail } from '../_shared/email-templates/recovery.tsx'
import { EmailChangeEmail } from '../_shared/email-templates/email-change.tsx'
import { ReauthenticationEmail } from '../_shared/email-templates/reauthentication.tsx'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-lovable-signature, x-lovable-timestamp, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const EMAIL_SUBJECTS: Record<string, string> = {
  signup: 'Confirm your email',
  invite: "You've been invited",
  magiclink: 'Your login link',
  recovery: 'Reset your password',
  email_change: 'Confirm your new email',
  reauthentication: 'Your verification code',
}

// Template mapping
const EMAIL_TEMPLATES: Record<string, React.ComponentType<any>> = {
  signup: SignupEmail,
  invite: InviteEmail,
  magiclink: MagicLinkEmail,
  recovery: RecoveryEmail,
  email_change: EmailChangeEmail,
  reauthentication: ReauthenticationEmail,
}

// Configuration
const SITE_NAME = "orbitgestaolead"
const SENDER_DOMAIN = "notify.demonstracao.orbitgestao.com.br"
const ROOT_DOMAIN = "demonstracao.orbitgestao.com.br"
const FROM_DOMAIN = "notify.demonstracao.orbitgestao.com.br" // Domain shown in From address (may be root or sender subdomain)

// Sample data for preview mode ONLY (not used in actual email sending).
// URLs are baked in at scaffold time from the project's real data.
// The sample email uses a fixed placeholder (RFC 6761 .test TLD) so the Go backend
// can always find-and-replace it with the actual recipient when sending test emails,
// even if the project's domain has changed since the template was scaffolded.
const SAMPLE_PROJECT_URL = "https://orbitgestaolead.lovable.app"
const SAMPLE_EMAIL = "user@example.test"
const SAMPLE_DATA: Record<string, object> = {
  signup: {
    siteName: SITE_NAME,
    siteUrl: SAMPLE_PROJECT_URL,
    recipient: SAMPLE_EMAIL,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  magiclink: {
    siteName: SITE_NAME,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  recovery: {
    siteName: SITE_NAME,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  invite: {
    siteName: SITE_NAME,
    siteUrl: SAMPLE_PROJECT_URL,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  email_change: {
    siteName: SITE_NAME,
    email: SAMPLE_EMAIL,
    newEmail: SAMPLE_EMAIL,
    confirmationUrl: SAMPLE_PROJECT_URL,
  },
  reauthentication: {
    token: '123456',
  },
}

// Preview endpoint handler - returns rendered HTML without sending email
async function handlePreview(req: Request): Promise<Response> {
  const previewCorsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: previewCorsHeaders })
  }

  const apiKey = Deno.env.get('LOVABLE_API_KEY')
  const authHeader = req.headers.get('Authorization')

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...previewCorsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let type: string
  try {
    const body = await req.json()
    type = body.type
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
      status: 400,
      headers: { ...previewCorsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const EmailTemplate = EMAIL_TEMPLATES[type]

  if (!EmailTemplate) {
    return new Response(JSON.stringify({ error: `Unknown email type: ${type}` }), {
      status: 400,
      headers: { ...previewCorsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const sampleData = SAMPLE_DATA[type] || {}
  const html = await renderAsync(React.createElement(EmailTemplate, sampleData))

  return new Response(html, {
    status: 200,
    headers: { ...previewCorsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
  })
}

// Webhook handler - verifies signature and sends email
async function handleWebhook(req: Request): Promise<Response> {
  const apiKey = Deno.env.get('LOVABLE_API_KEY')

  if (!apiKey) {
    console.error('LOVABLE_API_KEY not configured')
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // Verify signature + timestamp, then parse payload.
  let payload: any
  let run_id = ''
  try {
    const verified = await verifyWebhookRequest({
      req,
      secret: apiKey,
      parser: parseEmailWebhookPayload,
    })
    payload = verified.payload
    run_id = payload.run_id
  } catch (error) {
    if (error instanceof WebhookError) {
      switch (error.code) {
        case 'invalid_signature':
        case 'missing_timestamp':
        case 'invalid_timestamp':
        case 'stale_timestamp':
          console.error('Invalid webhook signature', { error: error.message })
          return new Response(JSON.stringify({ error: 'Invalid signature' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        case 'invalid_payload':
        case 'invalid_json':
          console.error('Invalid webhook payload', { error: error.message })
          return new Response(
            JSON.stringify({ error: 'Invalid webhook payload' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
      }
    }

    console.error('Webhook verification failed', { error })
    return new Response(
      JSON.stringify({ error: 'Invalid webhook payload' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  if (!run_id) {
    console.error('Webhook payload missing run_id')
    return new Response(
      JSON.stringify({ error: 'Invalid webhook payload' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  if (payload.version !== '1') {
    console.error('Unsupported payload version', { version: payload.version, run_id })
    return new Response(
      JSON.stringify({ error: `Unsupported payload version: ${payload.version}` }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  // The email action type is in payload.data.action_type (e.g., "signup", "recovery")
  // payload.type is the hook event type ("auth")
  const emailType = payload.data.action_type
  console.log('Received auth event', { emailType, email: payload.data.email, run_id })

  const EmailTemplate = EMAIL_TEMPLATES[emailType]
  if (!EmailTemplate) {
    console.error('Unknown email type', { emailType, run_id })
    return new Response(
      JSON.stringify({ error: `Unknown email type: ${emailType}` }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // Build template props from payload.data (HookData structure)
  const templateProps = {
    siteName: SITE_NAME,
    siteUrl: `https://${ROOT_DOMAIN}`,
    recipient: payload.data.email,
    confirmationUrl: payload.data.url,
    token: payload.data.token,
    email: payload.data.email,
    newEmail: payload.data.new_email,
  }

  // Render React Email to HTML and plain text
  const html = await renderAsync(React.createElement(EmailTemplate, templateProps))
  const text = await renderAsync(React.createElement(EmailTemplate, templateProps), {
    plainText: true,
  })

  // Send email via Lovable Email API
  // The callback URL is provided in the payload by Lovable, ensuring correct routing
  // for both production and local development
  const callbackUrl = payload.data.callback_url
  if (!callbackUrl) {
    console.error('No callback_url in payload', { run_id })
    return new Response(JSON.stringify({ error: 'Missing callback_url in payload' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let result: { message_id?: string }
  try {
    result = await sendLovableEmail(
      {
        run_id,
        to: payload.data.email,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: EMAIL_SUBJECTS[emailType] || 'Notification',
        html,
        text,
        purpose: 'transactional',
      },
      { apiKey, sendUrl: callbackUrl }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email'
    console.error('Email API error', { error: message, run_id })
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  console.log('Email sent successfully', { message_id: result.message_id, run_id })

  return new Response(
    JSON.stringify({ success: true, message_id: result.message_id }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

Deno.serve(async (req) => {
  const url = new URL(req.url)

  // Handle CORS preflight for main endpoint
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Route to preview handler for /preview path
  if (url.pathname.endsWith('/preview')) {
    return handlePreview(req)
  }

  // Main webhook handler
  try {
    return await handleWebhook(req)
  } catch (error) {
    console.error('Webhook handler error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

```

#### auth-email-hook/deno.json

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "npm:react@18.3.1",
    "types": ["npm:@types/react@18.3.1"]
  }
}

```

### batch-confirmation-calls/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing Supabase env vars");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Current time in Brasília (UTC-3)
    const now = new Date();
    const brasiliaOffsetMs = -3 * 60 * 60 * 1000;
    const nowBrasilia = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + brasiliaOffsetMs);

    console.log(`[batch-confirmation-calls] Brasília time: ${nowBrasilia.toISOString()}`);

    const results: string[] = [];

    // ========== 1. Check LEADS ==========
    const { data: leads, error: leadsError } = await supabase
      .from("leads")
      .select("*")
      .eq("status", "completo")
      .eq("ligacao_confirmacao_enviada", false)
      .not("data_reuniao", "is", null)
      .not("horario_reuniao", "is", null)
      .neq("data_reuniao", "")
      .neq("horario_reuniao", "")
      .neq("whatsapp", "");

    if (leadsError) {
      console.error("Error fetching leads:", leadsError);
    }

    for (const lead of leads || []) {
      try {
        const parts = lead.data_reuniao!.split("/");
        if (parts.length !== 3) continue;

        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[2]);
        const [h, m] = lead.horario_reuniao!.split(":").map(Number);

        if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(h) || isNaN(m)) continue;

        const meetingBrasilia = new Date(year, month, day, h, m, 0);
        const diffMinutes = (meetingBrasilia.getTime() - nowBrasilia.getTime()) / (1000 * 60);

        // Trigger call 3-7 minutes before
        if (diffMinutes >= 3 && diffMinutes <= 7) {
          console.log(`[batch] Triggering call for lead ${lead.nome} (${lead.email}), meeting in ${diffMinutes.toFixed(1)}min`);

          // Fire and forget — call the confirmation-call function
          const callResp = await fetch(`${SUPABASE_URL}/functions/v1/confirmation-call`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            },
            body: JSON.stringify({ leadId: lead.id }),
          });

          const callResult = await callResp.json();
          results.push(`lead:${lead.nome}:${callResp.ok ? "ok" : callResult.error}`);
        }
      } catch (e) {
        console.error(`Error processing lead ${lead.id}:`, e);
        results.push(`lead:${lead.id}:error`);
      }
    }

    // ========== 2. Check SALA_PRESENCAS ==========
    // We need to join with sala_horarios to get the time
    const todayBrasilia = `${nowBrasilia.getFullYear()}-${String(nowBrasilia.getMonth() + 1).padStart(2, "0")}-${String(nowBrasilia.getDate()).padStart(2, "0")}`;

    const { data: presencas, error: presencasError } = await supabase
      .from("sala_presencas")
      .select("*, sala_horarios!inner(horario)")
      .eq("data_sessao", todayBrasilia)
      .eq("ligacao_confirmacao_enviada", false)
      .neq("whatsapp", "");

    if (presencasError) {
      console.error("Error fetching presencas:", presencasError);
    }

    for (const presenca of presencas || []) {
      try {
        const horario = (presenca as any).sala_horarios?.horario;
        if (!horario) continue;

        const [h, m] = horario.split(":").map(Number);
        if (isNaN(h) || isNaN(m)) continue;

        const sessionBrasilia = new Date(
          nowBrasilia.getFullYear(),
          nowBrasilia.getMonth(),
          nowBrasilia.getDate(),
          h, m, 0
        );
        const diffMinutes = (sessionBrasilia.getTime() - nowBrasilia.getTime()) / (1000 * 60);

        if (diffMinutes >= 3 && diffMinutes <= 7) {
          console.log(`[batch] Triggering call for presenca ${presenca.nome}, session in ${diffMinutes.toFixed(1)}min`);

          const callResp = await fetch(`${SUPABASE_URL}/functions/v1/confirmation-call`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            },
            body: JSON.stringify({ presencaId: presenca.id }),
          });

          const callResult = await callResp.json();
          results.push(`presenca:${presenca.nome}:${callResp.ok ? "ok" : callResult.error}`);
        }
      } catch (e) {
        console.error(`Error processing presenca ${presenca.id}:`, e);
        results.push(`presenca:${presenca.id}:error`);
      }
    }

    console.log(`[batch-confirmation-calls] Done. Results: ${JSON.stringify(results)}`);

    return new Response(
      JSON.stringify({
        success: true,
        leads_checked: leads?.length || 0,
        presencas_checked: presencas?.length || 0,
        results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[batch-confirmation-calls] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

```

### batch-trigger-calls/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const N8N_URL = "https://webhook.rodriguinhodomarketing.com.br/webhook/salva-supabase";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch leads with scheduled meetings that haven't been sent to n8n
    const { data: leads, error } = await supabase
      .from("leads")
      .select("id, nome, sobrenome, whatsapp, email, empresa, pipedrive_deal_id, data_reuniao, horario_reuniao, manychat_subscriber_id")
      .eq("ligacao_agendada", false)
      .not("data_reuniao", "is", null)
      .not("data_reuniao", "eq", "")
      .not("horario_reuniao", "is", null)
      .not("horario_reuniao", "eq", "");

    if (error) {
      console.error("[batch] DB query error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[batch] Found ${leads?.length || 0} leads with ligacao_agendada=false`);

    const now = new Date();
    let processed = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const lead of leads || []) {
      try {
        // Parse date: formats like "DD/MM/YYYY" or "D/M/YYYY"
        const dateParts = lead.data_reuniao.split("/");
        if (dateParts.length !== 3) {
          console.log(`[batch] Skipping lead ${lead.id}: invalid date format "${lead.data_reuniao}"`);
          skipped++;
          continue;
        }

        const [dd, mm, yyyy] = dateParts;
        const isoDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${lead.horario_reuniao}:00-03:00`;
        const meetingDate = new Date(isoDate);

        // Only process future meetings
        if (meetingDate <= now) {
          console.log(`[batch] Skipping lead ${lead.id}: meeting in the past (${isoDate})`);
          skipped++;
          continue;
        }

        const phone = lead.whatsapp.startsWith("+")
          ? lead.whatsapp
          : `+55${lead.whatsapp.replace(/\D/g, "")}`;

        const payload = {
          lead_name: `${lead.nome} ${lead.sobrenome || ""}`.trim(),
          lead_phone: phone,
          call_datetime: isoDate,
          subscriber_id: lead.manychat_subscriber_id || null,
          deal_id: lead.pipedrive_deal_id || null,
          link_reuniao: "https://meet.google.com/qpy-himp-cxj",
          vendedor_phone: "+5519266029722",
          vendedor_name: "Olivia",
        };

        console.log(`[batch] Sending lead ${lead.id} (${lead.nome}):`, JSON.stringify(payload));

        const res = await fetch(N8N_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await res.text();

        if (res.ok) {
          // Mark as sent
          await supabase.from("leads").update({ ligacao_agendada: true }).eq("id", lead.id);
          processed++;
          console.log(`[batch] ✅ Lead ${lead.id} sent successfully`);
        } else {
          console.error(`[batch] ❌ Lead ${lead.id} n8n error: ${res.status} ${text}`);
          errors.push(`${lead.id}: ${res.status}`);
        }
      } catch (e) {
        console.error(`[batch] ❌ Lead ${lead.id} exception:`, e);
        errors.push(`${lead.id}: ${e.message}`);
      }
    }

    const summary = {
      total_found: leads?.length || 0,
      processed,
      skipped,
      errors: errors.length,
      error_details: errors,
    };

    console.log("[batch] Summary:", JSON.stringify(summary));

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[batch] Fatal error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

```

### confirm-participation/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const BASE_URL = 'https://api.pipedrive.com/v1';

async function pipedriveFetch(endpoint: string, method: string, token: string, body?: unknown) {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_token=${token}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return await res.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, rating, comment, deseja_contato_vendedor } = await req.json();

    if (!email || !rating) {
      return new Response(JSON.stringify({ success: false, error: 'Email e nota são obrigatórios' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const PIPEDRIVE_API_TOKEN = Deno.env.get('PIPEDRIVE_API_TOKEN')!;

    // Find lead by email
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (leadError || !lead) {
      console.error('[confirm-participation] Lead not found:', email, leadError);
      return new Response(JSON.stringify({ success: false, error: 'Email não encontrado. Verifique se usou o mesmo email do cadastro.' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[confirm-participation] Found lead: ${lead.id}, deal_id: ${lead.pipedrive_deal_id}`);

    // Update lead in DB
    const dbUpdate: Record<string, unknown> = {
      confirmou_participacao: true,
      status_reuniao: 'participou',
    };
    if (deseja_contato_vendedor !== undefined && deseja_contato_vendedor !== null) {
      dbUpdate.deseja_contato_vendedor = deseja_contato_vendedor;
    }
    await supabase
      .from('leads')
      .update(dbUpdate)
      .eq('id', lead.id);

    // Update Pipedrive if deal exists
    if (lead.pipedrive_deal_id) {
      // First get the deal to know its pipeline
      const dealData = await pipedriveFetch(`/deals/${lead.pipedrive_deal_id}`, 'GET', PIPEDRIVE_API_TOKEN);
      const pipelineId = dealData.data?.pipeline_id;
      console.log(`[confirm-participation] Deal ${lead.pipedrive_deal_id} is in pipeline ${pipelineId}`);

      // Find "Participou Reunião Grupo" stage in the same pipeline
      const stagesData = await pipedriveFetch(`/stages?pipeline_id=${pipelineId}`, 'GET', PIPEDRIVE_API_TOKEN);
      const stageNames = stagesData.data?.map((s: any) => `${s.id}: "${s.name}"`);
      console.log(`[confirm-participation] Pipeline ${pipelineId} stages:`, JSON.stringify(stageNames));

      let targetStage = stagesData.data?.find((s: any) =>
        s.name.toLowerCase().includes('participou')
      );

      // If not found, create the stage in this pipeline
      if (!targetStage) {
        console.log(`[confirm-participation] Stage not found, creating "Participou Reunião Grupo" in pipeline ${pipelineId}`);
        // Find the position: after "Passou na Levantada de mão" or at the end
        const stages = stagesData.data || [];
        const sorted = stages.sort((a: any, b: any) => a.order_nr - b.order_nr);
        // Insert after the last existing stage
        const lastOrder = sorted.length > 0 ? sorted[sorted.length - 1].order_nr : 0;
        // Find "Contato Realizado" to insert before it, or just append
        const contatoIdx = sorted.findIndex((s: any) => s.name.toLowerCase().includes('contato realizado'));
        const insertOrder = contatoIdx >= 0 ? sorted[contatoIdx].order_nr : lastOrder + 1;

        const createResult = await pipedriveFetch('/stages', 'POST', PIPEDRIVE_API_TOKEN, {
          name: 'Participou Reunião Grupo',
          pipeline_id: pipelineId,
          order_nr: insertOrder,
        });

        if (createResult.success && createResult.data) {
          targetStage = createResult.data;
          console.log(`[confirm-participation] Created stage ${targetStage.id}: "${targetStage.name}"`);
        } else {
          console.error('[confirm-participation] Failed to create stage:', JSON.stringify(createResult));
        }
      }

      if (targetStage) {
        console.log(`[confirm-participation] Moving deal ${lead.pipedrive_deal_id} to stage "${targetStage.name}" (${targetStage.id})`);
        await pipedriveFetch(`/deals/${lead.pipedrive_deal_id}`, 'PUT', PIPEDRIVE_API_TOKEN, {
          stage_id: targetStage.id,
        });
      } else {
        console.warn('[confirm-participation] Could not find or create target stage');
      }

      // Add note with rating
      const ratingLabels: Record<number, string> = {
        1: '⭐ Ruim',
        2: '⭐⭐ Regular',
        3: '⭐⭐⭐ Bom',
        4: '⭐⭐⭐⭐ Muito bom',
        5: '⭐⭐⭐⭐⭐ Excelente',
      };

      const contatoLabel = deseja_contato_vendedor === true ? '✅ Sim' : deseja_contato_vendedor === false ? '❌ Não' : '—';
      let noteContent = `<b>✅ Participou da Reunião Grupo</b><br><br>`;
      noteContent += `<b>Nota:</b> ${ratingLabels[rating] || rating}/5<br>`;
      if (comment) {
        noteContent += `<b>Comentário:</b> ${comment}<br>`;
      }
      noteContent += `<b>Deseja contato vendedor:</b> ${contatoLabel}<br>`;
      noteContent += `<br><i>Registrado em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</i>`;

      await pipedriveFetch('/notes', 'POST', PIPEDRIVE_API_TOKEN, {
        content: noteContent,
        deal_id: lead.pipedrive_deal_id,
        pinned_to_deal_flag: 0,
      });

      console.log(`[confirm-participation] Note added to deal ${lead.pipedrive_deal_id}`);
    } else {
      console.warn(`[confirm-participation] Lead ${lead.id} has no pipedrive_deal_id`);
    }

    // Update ManyChat stage
    try {
      await fetch(`${supabaseUrl}/functions/v1/tag-manychat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          action: 'set_field',
          whatsapp: lead.whatsapp,
          field_name: 'etapa_pipedrive',
          field_value: 'participou reuniao grupo',
        }),
      });
    } catch (e) {
      console.warn('[confirm-participation] ManyChat update error:', e);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[confirm-participation] Error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Erro interno' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

```

### confirmation-call/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TWILIO_GATEWAY = "https://connector-gateway.lovable.dev/twilio";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const TWILIO_API_KEY = Deno.env.get("TWILIO_API_KEY");
    const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing Supabase env vars");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");
    if (!TWILIO_API_KEY) throw new Error("TWILIO_API_KEY is not configured");
    if (!TWILIO_PHONE_NUMBER) throw new Error("TWILIO_PHONE_NUMBER is not configured");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body = await req.json();

    // Support both lead-based and direct data
    let nome: string;
    let telefone: string;
    let empresa: string;
    let contexto: string;
    let leadId: string | null = null;
    let presencaId: string | null = null;
    let tableName: "leads" | "sala_presencas" = "leads";

    if (body.leadId) {
      leadId = body.leadId;
      const { data: lead, error } = await supabase.from("leads").select("*").eq("id", leadId).single();
      if (error || !lead) throw new Error(`Lead not found: ${leadId}`);
      nome = lead.nome;
      telefone = lead.whatsapp;
      empresa = lead.empresa || "sua empresa";
      contexto = `Reunião de demonstração do Orbit Gestão agendada para ${lead.data_reuniao} às ${lead.horario_reuniao}. A pessoa é ${lead.cargo || "profissional"} da empresa ${empresa}, que fatura ${lead.faturamento || "não informado"} e tem ${lead.funcionarios || "não informado"} funcionários. Setor: ${lead.oque_faz || "não informado"}.`;
      tableName = "leads";
    } else if (body.presencaId) {
      presencaId = body.presencaId;
      const { data: presenca, error } = await supabase.from("sala_presencas").select("*").eq("id", presencaId).single();
      if (error || !presenca) throw new Error(`Presença not found: ${presencaId}`);
      nome = presenca.nome;
      telefone = presenca.whatsapp || "";
      empresa = "sua empresa";
      contexto = `Sessão de sala agendada para ${presenca.data_sessao}. Participante confirmado.`;
      tableName = "sala_presencas";
    } else if (body.nome && body.telefone) {
      nome = body.nome;
      telefone = body.telefone;
      empresa = body.empresa || "sua empresa";
      contexto = body.contexto || "Reunião agendada em breve.";
    } else {
      throw new Error("Must provide leadId, presencaId, or {nome, telefone}");
    }

    if (!telefone || telefone.replace(/\D/g, "").length < 10) {
      throw new Error(`Invalid phone number: ${telefone}`);
    }

    // Normalize phone to E.164
    let phoneDigits = telefone.replace(/\D/g, "");
    if (!phoneDigits.startsWith("55") && phoneDigits.length <= 11) {
      phoneDigits = "55" + phoneDigits;
    }
    const phoneE164 = "+" + phoneDigits;

    console.log(`[confirmation-call] Generating script for ${nome} (${phoneE164})`);

    // 1. Generate provocative script via Lovable AI (Gemini Flash)
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Você é a Olívia, assistente de inteligência artificial da Orbit Gestão. Sua missão é gerar um SCRIPT DE LIGAÇÃO curto e impactante para confirmar a presença de alguém em uma reunião/sessão que começa em poucos minutos.

REGRAS DO SCRIPT:
- Comece SEMPRE com: "Oi [nome do participante], aqui é a Olívia, da Orbit Gestão."
- Máximo 3-4 frases curtas após a saudação (15-20 segundos de fala total)
- Tom profissional, direto e levemente provocativo — enfatize o custo de oportunidade de NÃO participar
- Se tiver dados de faturamento/funcionários, use-os para personalizar o impacto ("empresas do porte da ${empresa}, com X funcionários, costumam perder Y horas por semana sem processos estruturados")
- Finalize com uma frase curta pedindo confirmação: "Posso confirmar sua presença?"
- NÃO use emojis, hashtags, aspas ou formatação — é texto puro para ser falado em voz alta
- Português brasileiro natural e fluido, como uma conversa real
- Varie o estilo a cada geração — não repita estruturas idênticas
- NUNCA mencione que você é uma IA ou assistente virtual na ligação`,
          },
          {
            role: "user",
            content: `Gere o script de ligação para confirmar a presença de ${nome} da empresa ${empresa}.\n\nContexto: ${contexto}`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const script = aiData.choices?.[0]?.message?.content?.trim();
    if (!script) throw new Error("AI returned empty script");

    console.log(`[confirmation-call] Script generated (${script.length} chars): ${script.substring(0, 100)}...`);

    // 2. Convert to audio via OpenAI TTS
    const ttsResponse = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: script,
        voice: "nova",
        response_format: "mp3",
        speed: 1.05,
      }),
    });

    if (!ttsResponse.ok) {
      const errText = await ttsResponse.text();
      console.error("OpenAI TTS error:", ttsResponse.status, errText);
      throw new Error(`OpenAI TTS error: ${ttsResponse.status}`);
    }

    const audioBuffer = await ttsResponse.arrayBuffer();
    console.log(`[confirmation-call] Audio generated: ${audioBuffer.byteLength} bytes`);

    // 3. Upload MP3 to call-audio bucket
    const fileName = `call-${Date.now()}-${phoneDigits}.mp3`;
    const { error: uploadError } = await supabase.storage
      .from("call-audio")
      .upload(fileName, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    const audioUrl = `${SUPABASE_URL}/storage/v1/object/public/call-audio/${fileName}`;
    console.log(`[confirmation-call] Audio uploaded: ${audioUrl}`);

    // 4. Initiate call via Twilio Gateway
    const twiml = `<Response><Play>${audioUrl}</Play></Response>`;

    const twilioResponse = await fetch(`${TWILIO_GATEWAY}/Calls.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TWILIO_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: phoneE164,
        From: TWILIO_PHONE_NUMBER,
        Twiml: twiml,
      }),
    });

    const twilioData = await twilioResponse.json();

    if (!twilioResponse.ok) {
      console.error("Twilio API error:", twilioResponse.status, JSON.stringify(twilioData));
      throw new Error(`Twilio error [${twilioResponse.status}]: ${JSON.stringify(twilioData)}`);
    }

    console.log(`[confirmation-call] Call initiated! SID: ${twilioData.sid}`);

    // 5. Mark as sent in database
    const recordId = leadId || presencaId;
    if (recordId) {
      const { error: updateError } = await supabase
        .from(tableName)
        .update({ ligacao_confirmacao_enviada: true })
        .eq("id", recordId);

      if (updateError) {
        console.warn(`Failed to update ${tableName}:`, updateError);
      }
    }

    // 6. Log in email_logs
    try {
      await supabase.from("email_logs").insert({
        email_type: "ligacao_confirmacao",
        recipient_email: telefone,
        recipient_name: nome,
        lead_id: leadId,
        resend_id: twilioData.sid || null,
        success: true,
      });
    } catch (logErr) {
      console.warn("Failed to log call:", logErr);
    }

    // 7. Schedule cleanup of audio file after 10 minutes
    setTimeout(async () => {
      try {
        await supabase.storage.from("call-audio").remove([fileName]);
        console.log(`[cleanup] Removed ${fileName}`);
      } catch (e) {
        console.warn(`[cleanup] Failed to remove ${fileName}:`, e);
      }
    }, 10 * 60 * 1000);

    return new Response(
      JSON.stringify({
        success: true,
        callSid: twilioData.sid,
        phone: phoneE164,
        scriptLength: script.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[confirmation-call] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

```

### create-cs-user/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify caller is admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
    const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const callerId = claimsData.claims.sub;
    const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: roleCheck } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', callerId)
      .eq('role', 'admin')
      .single();

    if (!roleCheck) {
      return new Response(JSON.stringify({ error: 'Apenas administradores podem criar usuários CS' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { nome, email, senha } = await req.json();

    if (!nome || !email || !senha) {
      return new Response(JSON.stringify({ error: 'Nome, e-mail e senha são obrigatórios' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create auth user
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
    });

    if (createError) {
      return new Response(JSON.stringify({ error: `Erro ao criar usuário: ${createError.message}` }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = newUser.user.id;

    // Assign CS role
    await adminClient.from('user_roles').insert({ user_id: userId, role: 'cs' });

    return new Response(JSON.stringify({ success: true, user_id: userId }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error creating CS user:', error);
    const msg = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

```

### create-pipedrive-lead/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const BASE_URL = 'https://api.pipedrive.com/v1';

async function pipedriveFetch(endpoint: string, method: string, token: string, body?: unknown) {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_token=${token}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(`Pipedrive ${endpoint} failed: ${JSON.stringify(data)}`);
  }
  return data;
}

async function findPipelineByName(token: string, name: string) {
  const data = await pipedriveFetch('/pipelines', 'GET', token);
  const pipeline = data.data?.find((p: { name: string }) => 
    p.name.toLowerCase() === name.toLowerCase()
  );
  return pipeline || null;
}

async function getFirstStage(token: string, pipelineId: number) {
  const data = await pipedriveFetch(`/stages?pipeline_id=${pipelineId}`, 'GET', token);
  if (data.data?.length > 0) {
    const sorted = data.data.sort((a: { order_nr: number }, b: { order_nr: number }) => a.order_nr - b.order_nr);
    return sorted[0].id;
  }
  return null;
}

async function ensureCustomField(token: string, entity: 'dealFields' | 'personFields', fieldName: string, fieldType: string) {
  const data = await pipedriveFetch(`/${entity}`, 'GET', token);
  const existing = data.data?.find((f: { name: string }) => 
    f.name.toLowerCase() === fieldName.toLowerCase()
  );
  if (existing) return existing.key;

  const created = await pipedriveFetch(`/${entity}`, 'POST', token, {
    name: fieldName,
    field_type: fieldType,
  });
  return created.data.key;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PIPEDRIVE_API_TOKEN = Deno.env.get('PIPEDRIVE_API_TOKEN');
    if (!PIPEDRIVE_API_TOKEN) {
      throw new Error('PIPEDRIVE_API_TOKEN is not configured');
    }

    const payload = await req.json();
    const { action = 'create' } = payload;

    // ACTION: CREATE — initial lead with basic info (name, email, whatsapp, empresa)
    if (action === 'create') {
      const { name, whatsapp, email, empresa, oqueFaz, cargo, leadId, utmData, copyVariant } = payload;

      // IDEMPOTENCY: Check if person already exists by email to avoid duplicates
      const searchRes = await fetch(
        `${BASE_URL}/persons/search?term=${encodeURIComponent(email)}&fields=email&limit=1&api_token=${PIPEDRIVE_API_TOKEN}`
      );
      const searchData = await searchRes.json();
      const existingPerson = searchData?.data?.items?.[0]?.item;

      if (existingPerson) {
        // Person already exists — ALWAYS create a new deal (never reuse won/lost/archived deals)
        const personId = existingPerson.id;
        let orgId = existingPerson.org_id || null;

        console.log('Person already exists in Pipedrive, creating NEW deal:', { personId, orgId });

        // Create org if person has none
        if (!orgId && empresa) {
          const orgData = await pipedriveFetch('/organizations', 'POST', PIPEDRIVE_API_TOKEN, {
            name: empresa || 'Não informado',
          });
          orgId = orgData.data.id;
          await pipedriveFetch(`/persons/${personId}`, 'PUT', PIPEDRIVE_API_TOKEN, { org_id: orgId });
        }

        // Find/create Orbit pipeline
        const pipeline = await findPipelineByName(PIPEDRIVE_API_TOKEN, 'Orbit');
        let pipelineId = pipeline?.id;
        let stageId: number | null = null;
        if (pipelineId) {
          stageId = await getFirstStage(PIPEDRIVE_API_TOKEN, pipelineId);
        } else {
          const pipelineData = await pipedriveFetch('/pipelines', 'POST', PIPEDRIVE_API_TOKEN, { name: 'Orbit' });
          pipelineId = pipelineData.data.id;
          stageId = await getFirstStage(PIPEDRIVE_API_TOKEN, pipelineId);
        }

        // Ensure UTM custom fields exist
        const [utmSourceKey, utmMediumKey, utmCampaignKey, utmContentKey, utmTermKey, gclidKey, fbclidKey, landingPageKey, originPageKey] = await Promise.all([
          ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Source', 'varchar'),
          ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Medium', 'varchar'),
          ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Campaign', 'varchar'),
          ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Content', 'varchar'),
          ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Term', 'varchar'),
          ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'GCLID', 'varchar'),
          ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'FBCLID', 'varchar'),
          ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Landing Page', 'varchar'),
          ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Origin Page', 'varchar'),
        ]);

        const dealBody: Record<string, unknown> = {
          title: `${name} - ${empresa || 'Sem empresa'} | Orbit`,
          person_id: personId,
          ...(orgId ? { org_id: orgId } : {}),
          pipeline_id: pipelineId,
          ...(stageId ? { stage_id: stageId } : {}),
        };
        if (utmData) {
          if (utmData.utm_source) dealBody[utmSourceKey] = utmData.utm_source;
          if (utmData.utm_medium) dealBody[utmMediumKey] = utmData.utm_medium;
          if (utmData.utm_campaign) dealBody[utmCampaignKey] = utmData.utm_campaign;
          if (utmData.utm_content) dealBody[utmContentKey] = utmData.utm_content;
          if (utmData.utm_term) dealBody[utmTermKey] = utmData.utm_term;
          if (utmData.gclid) dealBody[gclidKey] = utmData.gclid;
          if (utmData.fbclid) dealBody[fbclidKey] = utmData.fbclid;
          if (utmData.landing_page) dealBody[landingPageKey] = utmData.landing_page;
          if (utmData.origin_page) dealBody[originPageKey] = utmData.origin_page;
        }

        const dealData = await pipedriveFetch('/deals', 'POST', PIPEDRIVE_API_TOKEN, dealBody);
        const dealId = dealData.data.id;

        // Add initial note
        const noteLines = [
          `📋 Novo lead capturado (pessoa existente no Pipedrive)`,
          `👤 Nome: ${name}`,
          `📱 WhatsApp: ${whatsapp}`,
          `📧 E-mail: ${email}`,
          `🏢 Empresa: ${empresa || 'Não informado'}`,
        ];
        await pipedriveFetch('/notes', 'POST', PIPEDRIVE_API_TOKEN, {
          content: noteLines.join('\n'),
          deal_id: dealId,
          pinned_to_deal_flag: 0,
        });

        console.log('Created new deal for existing person:', { personId, orgId, dealId });

        // Ensure lead exists in DB (fallback if client-side insert failed)
        {
          const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
          const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
          const sb = createClient(supabaseUrl, supabaseKey);

          if (leadId && dealId) {
            try {
              await sb.from('leads').update({
                pipedrive_person_id: personId,
                pipedrive_org_id: orgId,
                pipedrive_deal_id: dealId,
              }).eq('id', leadId);
            } catch (e) {
              console.error('Failed to update lead with Pipedrive IDs:', e);
            }
          } else if (!leadId && dealId) {
            // Client insert FAILED — try to find existing lead first, then create as fallback
            console.warn('[Fallback-Existing] No leadId, checking for existing lead before inserting');
            try {
              const phoneDigits = (whatsapp || '').replace(/\D/g, '');
              const { data: existingLead } = await sb.from('leads')
                .select('id')
                .or(`email.eq.${email},whatsapp.ilike.%${phoneDigits}%`)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();
              
              if (existingLead) {
                console.log('[Fallback-Existing] Found existing lead, updating:', existingLead.id);
                await sb.from('leads').update({
                  pipedrive_person_id: personId,
                  pipedrive_org_id: orgId,
                  pipedrive_deal_id: dealId,
                }).eq('id', existingLead.id);
              } else {
                const { error: fbErr } = await sb.from('leads').insert({
                  nome: name?.split(' ')[0] || '',
                  sobrenome: name?.split(' ').slice(1).join(' ') || '',
                  whatsapp: whatsapp || '',
                  email: email || '',
                  empresa: empresa || '',
                  status: 'parcial',
                  pipedrive_person_id: personId,
                  pipedrive_org_id: orgId,
                  pipedrive_deal_id: dealId,
                  ...(copyVariant ? { copy_variant: copyVariant } : {}),
                  ...(utmData?.utm_source ? { utm_source: utmData.utm_source } : {}),
                  ...(utmData?.utm_medium ? { utm_medium: utmData.utm_medium } : {}),
                  ...(utmData?.utm_campaign ? { utm_campaign: utmData.utm_campaign } : {}),
                });
                if (fbErr) console.error('[Fallback-Existing] DB insert failed:', fbErr);
                else console.log('[Fallback-Existing] Lead created server-side');
              }
            } catch (e) {
              console.error('[Fallback-Existing] Exception:', e);
            }
          }
        }

        // Check if lead already completed before applying fallback tag
        try {
          const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
          const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
          const sbCheck = createClient(supabaseUrl, supabaseKey);
          const { data: currentLead } = await sbCheck.from('leads').select('status').eq('whatsapp', whatsapp).order('created_at', { ascending: false }).limit(1).maybeSingle();

          if (currentLead?.status === 'completo') {
            console.log('[create-pipedrive-lead] Lead already completed, skipping nao-respondeu tag (existing person)');
          } else {
            await fetch(`${supabaseUrl}/functions/v1/tag-manychat`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${supabaseKey}`,
              },
              body: JSON.stringify({
                action: 'tag',
                whatsapp: whatsapp,
                tag_name: 'nao-respondeu-chat-demonstracao',
                lead_data: { nome: name?.split(' ')[0], sobrenome: name?.split(' ').slice(1).join(' ') || 'Não informado', email, empresa },
              }),
            });
            console.log('[create-pipedrive-lead] Tagged nao-respondeu-chat-demonstracao (existing person)');
          }
        } catch (e) {
          console.warn('[create-pipedrive-lead] ManyChat tag error:', e);
        }

        return new Response(JSON.stringify({ 
          success: true, 
          person_id: personId, 
          org_id: orgId,
          deal_id: dealId,
          deduplicated: true,
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const [cargoKey, segmentoPersonKey, utmSourceKey, utmMediumKey, utmCampaignKey, utmContentKey, utmTermKey, gclidKey, fbclidKey, landingPageKey, originPageKey] = await Promise.all([
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'personFields', 'Cargo', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'personFields', 'Ramo de Atividade', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Source', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Medium', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Campaign', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Content', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Term', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'GCLID', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'FBCLID', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Landing Page', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Origin Page', 'varchar'),
      ]);

      // Create Organization
      const orgData = await pipedriveFetch('/organizations', 'POST', PIPEDRIVE_API_TOKEN, {
        name: empresa || 'Não informado',
      });
      const orgId = orgData.data.id;

      // Create Person
      const personBody: Record<string, unknown> = {
        name,
        email: [{ value: email, primary: true }],
        phone: [{ value: whatsapp, primary: true }],
        org_id: orgId,
      };
      if (cargo) personBody[cargoKey] = cargo;
      if (oqueFaz) personBody[segmentoPersonKey] = oqueFaz;

      const personData = await pipedriveFetch('/persons', 'POST', PIPEDRIVE_API_TOKEN, personBody);
      const personId = personData.data.id;

      // Find/create Orbit pipeline
      const pipeline = await findPipelineByName(PIPEDRIVE_API_TOKEN, 'Orbit');
      let pipelineId = pipeline?.id;
      let stageId: number | null = null;

      if (pipelineId) {
        stageId = await getFirstStage(PIPEDRIVE_API_TOKEN, pipelineId);
      } else {
        const pipelineData = await pipedriveFetch('/pipelines', 'POST', PIPEDRIVE_API_TOKEN, {
          name: 'Orbit',
        });
        pipelineId = pipelineData.data.id;
        stageId = await getFirstStage(PIPEDRIVE_API_TOKEN, pipelineId);
      }

      // Create Deal with UTM fields
      const dealBody: Record<string, unknown> = {
        title: `${name} - ${empresa || 'Sem empresa'} | Orbit`,
        person_id: personId,
        org_id: orgId,
        pipeline_id: pipelineId,
        ...(stageId ? { stage_id: stageId } : {}),
      };
      // Populate UTM custom fields on the deal
      if (utmData) {
        if (utmData.utm_source) dealBody[utmSourceKey] = utmData.utm_source;
        if (utmData.utm_medium) dealBody[utmMediumKey] = utmData.utm_medium;
        if (utmData.utm_campaign) dealBody[utmCampaignKey] = utmData.utm_campaign;
        if (utmData.utm_content) dealBody[utmContentKey] = utmData.utm_content;
        if (utmData.utm_term) dealBody[utmTermKey] = utmData.utm_term;
        if (utmData.gclid) dealBody[gclidKey] = utmData.gclid;
        if (utmData.fbclid) dealBody[fbclidKey] = utmData.fbclid;
        if (utmData.landing_page) dealBody[landingPageKey] = utmData.landing_page;
        if (utmData.origin_page) dealBody[originPageKey] = utmData.origin_page;
      }

      const dealData = await pipedriveFetch('/deals', 'POST', PIPEDRIVE_API_TOKEN, dealBody);
      const dealId = dealData.data.id;

      // Add initial note with UTM data
      const utmLines: string[] = [];
      if (utmData) {
        if (utmData.utm_source) utmLines.push(`🔗 Fonte: ${utmData.utm_source}`);
        if (utmData.utm_medium) utmLines.push(`📢 Mídia: ${utmData.utm_medium}`);
        if (utmData.utm_campaign) utmLines.push(`🎯 Campanha: ${utmData.utm_campaign}`);
        if (utmData.utm_content) utmLines.push(`📝 Conteúdo: ${utmData.utm_content}`);
        if (utmData.utm_term) utmLines.push(`🔑 Termo: ${utmData.utm_term}`);
        if (utmData.gclid) utmLines.push(`📊 GCLID: ${utmData.gclid}`);
        if (utmData.fbclid) utmLines.push(`📊 FBCLID: ${utmData.fbclid}`);
        if (utmData.landing_page) utmLines.push(`🌐 LP: ${utmData.landing_page}`);
        if (utmData.origin_page) utmLines.push(`↩️ Origem: ${utmData.origin_page}`);
      }
      const dealNote = [
        `📋 Lead parcial capturado`,
        `👤 Nome: ${name}`,
        `📱 WhatsApp: ${whatsapp}`,
        `📧 E-mail: ${email}`,
        `🏢 Empresa: ${empresa || 'Não informado'}`,
        ...(utmLines.length > 0 ? ['', '--- Tracking ---', ...utmLines] : []),
      ].join('\n');

      await pipedriveFetch('/notes', 'POST', PIPEDRIVE_API_TOKEN, {
        content: dealNote,
        deal_id: dealId,
        pinned_to_deal_flag: 0,
      });

      // Ensure lead exists in DB (fallback if client-side insert failed)
      {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const sb = createClient(supabaseUrl, supabaseKey);

        if (leadId) {
          // Client insert succeeded — just update with Pipedrive IDs
          try {
            await sb.from('leads').update({
              pipedrive_person_id: personId,
              pipedrive_org_id: orgId,
              pipedrive_deal_id: dealId,
            }).eq('id', leadId);
          } catch (e) {
            console.error('Failed to update lead with Pipedrive IDs:', e);
          }
        } else {
          // Client insert FAILED — check for existing lead first, then create as fallback
          console.warn('[Fallback] No leadId received, checking for existing lead before inserting');
          try {
            const phoneDigits = (whatsapp || '').replace(/\D/g, '');
            const { data: existingLead } = await sb.from('leads')
              .select('id')
              .or(`email.eq.${email},whatsapp.ilike.%${phoneDigits}%`)
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle();
            
            if (existingLead) {
              console.log('[Fallback] Found existing lead, updating:', existingLead.id);
              await sb.from('leads').update({
                pipedrive_person_id: personId,
                pipedrive_org_id: orgId,
                pipedrive_deal_id: dealId,
              }).eq('id', existingLead.id);
            } else {
              const { data: fallbackLead, error: fbErr } = await sb.from('leads').insert({
                nome: name?.split(' ')[0] || '',
                sobrenome: name?.split(' ').slice(1).join(' ') || '',
                whatsapp: whatsapp || '',
                email: email || '',
                empresa: empresa || '',
                status: 'parcial',
                pipedrive_person_id: personId,
                pipedrive_org_id: orgId,
                pipedrive_deal_id: dealId,
                ...(copyVariant ? { copy_variant: copyVariant } : {}),
                ...(utmData?.utm_source ? { utm_source: utmData.utm_source } : {}),
                ...(utmData?.utm_medium ? { utm_medium: utmData.utm_medium } : {}),
                ...(utmData?.utm_campaign ? { utm_campaign: utmData.utm_campaign } : {}),
                ...(utmData?.utm_content ? { utm_content: utmData.utm_content } : {}),
                ...(utmData?.utm_term ? { utm_term: utmData.utm_term } : {}),
                ...(utmData?.gclid ? { gclid: utmData.gclid } : {}),
                ...(utmData?.fbclid ? { fbclid: utmData.fbclid } : {}),
                ...(utmData?.landing_page ? { landing_page: utmData.landing_page } : {}),
                ...(utmData?.origin_page ? { origin_page: utmData.origin_page } : {}),
              }).select('id').maybeSingle();
              if (fbErr) {
                console.error('[Fallback] DB insert failed:', fbErr);
              } else {
                console.log('[Fallback] Lead created server-side:', fallbackLead?.id);
              }
            }
          } catch (e) {
            console.error('[Fallback] Exception inserting lead:', e);
          }
        }

      // Check if lead already completed before applying fallback tag
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const sbCheck2 = createClient(supabaseUrl, supabaseKey);
        const { data: currentLead2 } = await sbCheck2.from('leads').select('status').eq('whatsapp', whatsapp).order('created_at', { ascending: false }).limit(1).maybeSingle();

        if (currentLead2?.status === 'completo') {
          console.log('[create-pipedrive-lead] Lead already completed, skipping nao-respondeu tag (new person)');
        } else {
          await fetch(`${supabaseUrl}/functions/v1/tag-manychat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({
              action: 'tag',
              whatsapp: whatsapp,
              tag_name: 'nao-respondeu-chat-demonstracao',
              lead_data: { nome: name?.split(' ')[0], sobrenome: name?.split(' ').slice(1).join(' ') || 'Não informado', email, empresa, oqueFaz, cargo },
            }),
          });
          console.log('[create-pipedrive-lead] Tagged nao-respondeu-chat-demonstracao (new person)');
        }
      } catch (e) {
        console.warn('[create-pipedrive-lead] ManyChat tag error:', e);
      }

      return new Response(JSON.stringify({ 
        success: true, 
        person_id: personId, 
        org_id: orgId,
        deal_id: dealId,
        pipeline_id: pipelineId,
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    }

    // ACTION: UPDATE — update existing deal/person with new data
    if (action === 'update') {
      const { person_id, org_id, deal_id, oqueFaz, cargo, softwareGestao, faturamento, funcionarios, prioridade, date, time, utmData } = payload;

      const [cargoKey, segmentoPersonKey, faturamentoKey, funcionariosKey, prioridadeKey, reuniaoKey, utmSourceKey, utmMediumKey, utmCampaignKey, utmContentKey, utmTermKey, gclidKey, fbclidKey, landingPageKey, originPageKey] = await Promise.all([
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'personFields', 'Cargo', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'personFields', 'Ramo de Atividade', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Qual o faturamento ?', 'varchar'),
        Promise.resolve('e3aa6db84dfdf3594d0f75c3aa36b6c6a82a426f'), // Faixa de Funcionários - fixed key
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Prioridade', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Data Reunião', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Source', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Medium', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Campaign', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Content', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'UTM Term', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'GCLID', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'FBCLID', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Landing Page', 'varchar'),
        ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Origin Page', 'varchar'),
      ]);

      // Update Person fields if provided
      const personUpdate: Record<string, unknown> = {};
      if (cargo) personUpdate[cargoKey] = cargo;
      if (oqueFaz) personUpdate[segmentoPersonKey] = oqueFaz;
      if (Object.keys(personUpdate).length > 0 && person_id) {
        await pipedriveFetch(`/persons/${person_id}`, 'PUT', PIPEDRIVE_API_TOKEN, personUpdate);
      }

      // Update Deal fields if provided
      const dealUpdate: Record<string, unknown> = {};
      if (faturamento) dealUpdate[faturamentoKey] = faturamento;
      if (funcionarios) dealUpdate[funcionariosKey] = funcionarios;
      if (prioridade) dealUpdate[prioridadeKey] = prioridade;
      if (date && time) dealUpdate[reuniaoKey] = `${date} às ${time}`;
      // UTM fields on update too (in case they weren't set on create)
      if (utmData) {
        if (utmData.utm_source) dealUpdate[utmSourceKey] = utmData.utm_source;
        if (utmData.utm_medium) dealUpdate[utmMediumKey] = utmData.utm_medium;
        if (utmData.utm_campaign) dealUpdate[utmCampaignKey] = utmData.utm_campaign;
        if (utmData.utm_content) dealUpdate[utmContentKey] = utmData.utm_content;
        if (utmData.utm_term) dealUpdate[utmTermKey] = utmData.utm_term;
        if (utmData.gclid) dealUpdate[gclidKey] = utmData.gclid;
        if (utmData.fbclid) dealUpdate[fbclidKey] = utmData.fbclid;
        if (utmData.landing_page) dealUpdate[landingPageKey] = utmData.landing_page;
        if (utmData.origin_page) dealUpdate[originPageKey] = utmData.origin_page;
      }
      if (Object.keys(dealUpdate).length > 0 && deal_id) {
        await pipedriveFetch(`/deals/${deal_id}`, 'PUT', PIPEDRIVE_API_TOKEN, dealUpdate);
      }

      // If scheduling is complete: move stage, create activity, update note
      if (date && time && deal_id) {
        // 1) Move deal to "Reunião Agendada" stage
        try {
          const pipeline = await findPipelineByName(PIPEDRIVE_API_TOKEN, 'Orbit');
          if (pipeline) {
            const stagesData = await pipedriveFetch(`/stages?pipeline_id=${pipeline.id}`, 'GET', PIPEDRIVE_API_TOKEN);
            const reuniaoStage = stagesData.data?.find((s: { name: string }) =>
              s.name.toLowerCase().includes('reunião agendada') || s.name.toLowerCase().includes('reuniao agendada')
            );
            if (reuniaoStage) {
              await pipedriveFetch(`/deals/${deal_id}`, 'PUT', PIPEDRIVE_API_TOKEN, {
                stage_id: reuniaoStage.id,
              });
              console.log(`[Update] Deal ${deal_id} moved to stage "${reuniaoStage.name}" (${reuniaoStage.id})`);
            } else {
              console.warn('[Update] Stage "Reunião Agendada" not found in Orbit pipeline');
            }
          }
        } catch (e) {
          console.error('[Update] Failed to move deal stage:', e);
        }

        // 2) Create activity "Reunião Online" with the scheduled date/time
        try {
          // Parse date: expected format "D/M/YYYY" -> "YYYY-MM-DD"
          const dateParts = date.split('/');
          let dueDate = date;
          if (dateParts.length === 3) {
            const day = dateParts[0].padStart(2, '0');
            const month = dateParts[1].padStart(2, '0');
            const year = dateParts[2];
            dueDate = `${year}-${month}-${day}`;
          }
          // Compensate for Pipedrive timezone: API interprets due_time as UTC
          // but displays in account timezone (America/Sao_Paulo = UTC-3).
          // So we add 3h to the user's chosen time so it displays correctly.
          const [hh, mm] = time.split(':').map(Number);
          const utcHour = (hh + 3) % 24; // wrap around midnight
          const dueTime = `${utcHour.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:00`;

          // If adding 3h crosses midnight, advance the due_date by 1 day
          let activityDueDate = dueDate;
          if (hh + 3 >= 24 && dateParts.length === 3) {
            const d = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]) + 1);
            activityDueDate = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
          }

          // Get deal owner to set as activity owner
          let dealOwnerId: number | undefined;
          try {
            const dealInfo = await pipedriveFetch(`/deals/${deal_id}`, 'GET', PIPEDRIVE_API_TOKEN);
            dealOwnerId = dealInfo.data?.user_id?.id || dealInfo.data?.user_id;
            console.log(`[Update] Deal owner user_id: ${dealOwnerId}`);
          } catch (e) {
            console.error('[Update] Failed to get deal owner:', e);
          }

          // Find the "Reunião Virtual" activity type key
          let activityTypeKey = 'meeting'; // fallback
          try {
            const typesRes = await pipedriveFetch('/activityTypes', 'GET', PIPEDRIVE_API_TOKEN);
            const virtualType = typesRes.data?.find((t: { name: string; key_string: string }) =>
              t.name.toLowerCase().includes('reunião virtual') || t.name.toLowerCase().includes('reuniao virtual')
            );
            if (virtualType) {
              activityTypeKey = virtualType.key_string;
              console.log(`[Update] Using activity type: ${virtualType.name} (${activityTypeKey})`);
            } else {
              console.warn('[Update] Activity type "Reunião Virtual" not found, using "meeting"');
            }
          } catch (e) {
            console.error('[Update] Failed to fetch activity types:', e);
          }

          await pipedriveFetch('/activities', 'POST', PIPEDRIVE_API_TOKEN, {
            subject: `Reunião Online - ${time}`,
            type: activityTypeKey,
            due_date: activityDueDate,
            due_time: dueTime,
            duration: '01:00',
            deal_id: deal_id,
            ...(person_id ? { person_id } : {}),
            ...(org_id ? { org_id } : {}),
            ...(dealOwnerId ? { user_id: dealOwnerId } : {}),
            note: `Reunião online agendada pelo chat Orbit.\n📅 ${date} às ${time}`,
          });
          console.log(`[Update] Activity "${activityTypeKey}" created for deal ${deal_id} on ${activityDueDate} ${dueTime}`);
        } catch (e) {
          console.error('[Update] Failed to create activity:', e);
        }

        const { name, whatsapp, email, empresa } = payload;

        // Classify lead type
        const isConsultor = (oqueFaz || '').toLowerCase().includes('consultoria') || (cargo || '').toLowerCase().includes('consultor');
        const isLowRevenue = (faturamento || '').toLowerCase().includes('até') && (faturamento || '').toLowerCase().includes('100 mil');
        let leadType = 'Grande';
        let salaName = 'Orbit Grande';
        let salaLink = 'https://meet.google.com/ycz-dosc-znk';
        if (isConsultor) {
          leadType = 'Consultor';
          salaName = 'Orbit Consultor';
          salaLink = 'https://meet.google.com/xuc-mrnp-sec';
        } else if (isLowRevenue) {
          leadType = 'Pequeno';
          salaName = 'Orbit Pequeno';
          salaLink = 'https://meet.google.com/efd-bbnc-zfc';
        }

        const noteLines = [
          `📋 Lead completo — Reunião agendada`,
          '',
          `🏷️ Tipo de Lead: ${leadType}`,
          `🚪 Sala: ${salaName}`,
          `🔗 Link da Sala: ${salaLink}`,
          '',
          `👤 Nome: ${name || '-'}`,
          `📱 WhatsApp: ${whatsapp || '-'}`,
          `📧 E-mail: ${email || '-'}`,
          `🏢 Empresa: ${empresa || '-'}`,
          `💼 Segmento / O que faz: ${oqueFaz || '-'}`,
          `🎯 Cargo: ${cargo || '-'}`,
          ...(softwareGestao ? [`🖥️ Software de Gestão: ${softwareGestao}`] : []),
          `💰 Faturamento: ${faturamento || '-'}`,
          `👥 Funcionários: ${funcionarios || '-'}`,
          `⏰ Prioridade: ${prioridade || '-'}`,
          `📅 Reunião: ${date} às ${time}`,
        ];
        // UTM / Tracking
        const utmLines: string[] = [];
        if (utmData) {
          if (utmData.utm_source) utmLines.push(`🔗 Fonte: ${utmData.utm_source}`);
          if (utmData.utm_medium) utmLines.push(`📢 Mídia: ${utmData.utm_medium}`);
          if (utmData.utm_campaign) utmLines.push(`🎯 Campanha: ${utmData.utm_campaign}`);
          if (utmData.utm_content) utmLines.push(`📝 Conteúdo: ${utmData.utm_content}`);
          if (utmData.utm_term) utmLines.push(`🔑 Termo: ${utmData.utm_term}`);
          if (utmData.gclid) utmLines.push(`📊 GCLID: ${utmData.gclid}`);
          if (utmData.fbclid) utmLines.push(`📊 FBCLID: ${utmData.fbclid}`);
          if (utmData.landing_page) utmLines.push(`🌐 LP: ${utmData.landing_page}`);
          if (utmData.origin_page) utmLines.push(`↩️ Origem: ${utmData.origin_page}`);
        }
        if (utmLines.length > 0) {
          noteLines.push('', '--- Tracking ---', ...utmLines);
        }
        const fullNote = noteLines.join('\n');

        // Get existing notes to find the main one (first note added to the deal)
        try {
          const notesData = await pipedriveFetch(`/deals/${deal_id}/notes`, 'GET', PIPEDRIVE_API_TOKEN);
          const existingNote = notesData.data?.[0];
          if (existingNote) {
            await pipedriveFetch(`/notes/${existingNote.id}`, 'PUT', PIPEDRIVE_API_TOKEN, {
              content: fullNote,
            });
          } else {
            await pipedriveFetch('/notes', 'POST', PIPEDRIVE_API_TOKEN, {
              content: fullNote,
              deal_id,
              pinned_to_deal_flag: 0,
            });
          }
        } catch {
          // If notes update fails, just add a new one
          await pipedriveFetch('/notes', 'POST', PIPEDRIVE_API_TOKEN, {
            content: fullNote,
            deal_id,
            pinned_to_deal_flag: 0,
          });
        }
      }

      // SERVER-SIDE DB FALLBACK: Always ensure scheduling data is persisted in DB
      if (deal_id) {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const sb = createClient(supabaseUrl, supabaseKey);

        const dbUpdate: Record<string, unknown> = {};
        if (oqueFaz) dbUpdate.oque_faz = oqueFaz;
        if (cargo) dbUpdate.cargo = cargo;
        if (faturamento) dbUpdate.faturamento = faturamento;
        if (funcionarios) dbUpdate.funcionarios = funcionarios;
        if (prioridade) dbUpdate.prioridade = prioridade;
        if (date) dbUpdate.data_reuniao = date;
        if (time) dbUpdate.horario_reuniao = time;
        if (date && time) dbUpdate.status = 'completo';

        if (Object.keys(dbUpdate).length > 0) {
          try {
            const { error: dbErr } = await sb.from('leads').update(dbUpdate).eq('pipedrive_deal_id', deal_id);
            if (dbErr) console.error('[Update-Fallback] DB update failed:', dbErr);
            else console.log('[Update-Fallback] DB updated for deal', deal_id, dbUpdate);
          } catch (e) {
            console.error('[Update-Fallback] Exception:', e);
          }
        }
      }

      // SERVER-SIDE n8n FALLBACK: trigger n8n call when scheduling is complete
      if (date && time) {
        try {
          const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
          const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
          
          // Get lead info for phone number
          const sbN8n = createClient(supabaseUrl, supabaseKey);
          let leadPhone = payload.whatsapp || '';
          let leadName = payload.name || '';
          if (deal_id && (!leadPhone || !leadName)) {
            const { data: leadRow } = await sbN8n.from('leads').select('nome, sobrenome, whatsapp').eq('pipedrive_deal_id', deal_id).limit(1).maybeSingle();
            if (leadRow) {
              leadPhone = leadPhone || leadRow.whatsapp;
              leadName = leadName || `${leadRow.nome} ${leadRow.sobrenome || ''}`.trim();
            }
          }

          if (leadPhone && leadName) {
            const dateParts2 = date.split('/');
            const callDatetime = dateParts2.length === 3
              ? `${dateParts2[2]}-${dateParts2[1].padStart(2, '0')}-${dateParts2[0].padStart(2, '0')}T${time}:00-03:00`
              : `${date}T${time}:00-03:00`;
            const phone = leadPhone.startsWith('+') ? leadPhone : `+55${leadPhone.replace(/\D/g, '')}`;

            const n8nRes = await fetch(`${supabaseUrl}/functions/v1/trigger-n8n-call`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${supabaseKey}` },
              body: JSON.stringify({
                lead_name: leadName,
                lead_phone: phone,
                call_datetime: callDatetime,
                subscriber_id: null,
                deal_id: deal_id,
              }),
            });
            const n8nText = await n8nRes.text();
            console.log(`[Update-n8n-Fallback] trigger-n8n-call response: ${n8nRes.status} ${n8nText}`);
          } else {
            console.warn('[Update-n8n-Fallback] Missing leadPhone or leadName, skipping n8n trigger');
          }
        } catch (e) {
          console.error('[Update-n8n-Fallback] Failed to trigger n8n:', e);
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ACTION: RESCHEDULE — update existing deal with new date/time (for no-show leads)
    if (action === 'reschedule') {
      const { deal_id, person_id, org_id, date, time, name } = payload;

      if (!deal_id || !date || !time) {
        throw new Error('deal_id, date, and time are required for reschedule');
      }

      // Update deal custom field "Data Reunião"
      const reuniaoKey = await ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Data Reunião', 'varchar');
      await pipedriveFetch(`/deals/${deal_id}`, 'PUT', PIPEDRIVE_API_TOKEN, {
        [reuniaoKey]: `${date} às ${time}`,
      });

      // Move deal back to "Reunião Agendada" stage
      try {
        const pipeline = await findPipelineByName(PIPEDRIVE_API_TOKEN, 'Orbit');
        if (pipeline) {
          const stagesData = await pipedriveFetch(`/stages?pipeline_id=${pipeline.id}`, 'GET', PIPEDRIVE_API_TOKEN);
          const reuniaoStage = stagesData.data?.find((s: { name: string }) =>
            s.name.toLowerCase().includes('reunião agendada') || s.name.toLowerCase().includes('reuniao agendada')
          );
          if (reuniaoStage) {
            await pipedriveFetch(`/deals/${deal_id}`, 'PUT', PIPEDRIVE_API_TOKEN, {
              stage_id: reuniaoStage.id,
            });
          }
        }
      } catch (e) {
        console.error('[Reschedule] Failed to move deal stage:', e);
      }

      // Create new activity
      try {
        const dateParts = date.split('/');
        let dueDate = date;
        if (dateParts.length === 3) {
          const day = dateParts[0].padStart(2, '0');
          const month = dateParts[1].padStart(2, '0');
          const year = dateParts[2];
          dueDate = `${year}-${month}-${day}`;
        }
        const [hh, mm] = time.split(':').map(Number);
        const utcHour = (hh + 3) % 24;
        const dueTime = `${utcHour.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:00`;

        let activityDueDate = dueDate;
        if (hh + 3 >= 24 && dateParts.length === 3) {
          const d = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]) + 1);
          activityDueDate = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
        }

        // Get deal owner
        let dealOwnerId: number | undefined;
        try {
          const dealInfo = await pipedriveFetch(`/deals/${deal_id}`, 'GET', PIPEDRIVE_API_TOKEN);
          dealOwnerId = dealInfo.data?.user_id?.id || dealInfo.data?.user_id;
        } catch (e) {
          console.error('[Reschedule] Failed to get deal owner:', e);
        }

        // Find activity type
        let activityTypeKey = 'meeting';
        try {
          const typesRes = await pipedriveFetch('/activityTypes', 'GET', PIPEDRIVE_API_TOKEN);
          const virtualType = typesRes.data?.find((t: { name: string; key_string: string }) =>
            t.name.toLowerCase().includes('reunião virtual') || t.name.toLowerCase().includes('reuniao virtual')
          );
          if (virtualType) activityTypeKey = virtualType.key_string;
        } catch (e) {
          console.error('[Reschedule] Failed to fetch activity types:', e);
        }

        await pipedriveFetch('/activities', 'POST', PIPEDRIVE_API_TOKEN, {
          subject: `Reunião Reagendada - ${time}`,
          type: activityTypeKey,
          due_date: activityDueDate,
          due_time: dueTime,
          duration: '01:00',
          deal_id: deal_id,
          ...(person_id ? { person_id } : {}),
          ...(org_id ? { org_id } : {}),
          ...(dealOwnerId ? { user_id: dealOwnerId } : {}),
          note: `Reunião reagendada pelo link de reagendamento.\n📅 ${date} às ${time}`,
        });
      } catch (e) {
        console.error('[Reschedule] Failed to create activity:', e);
      }

      // Add note to deal
      try {
        await pipedriveFetch('/notes', 'POST', PIPEDRIVE_API_TOKEN, {
          content: `🔄 Reagendamento\n\n${name || 'Lead'} reagendou a demonstração para ${date} às ${time}.`,
          deal_id,
          pinned_to_deal_flag: 0,
        });
      } catch (e) {
        console.error('[Reschedule] Failed to add note:', e);
      }

      // SERVER-SIDE n8n FALLBACK for reschedule
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const sbN8n = createClient(supabaseUrl, supabaseKey);

        let leadPhone = '';
        let leadName2 = name || '';
        const { data: leadRow } = await sbN8n.from('leads').select('nome, sobrenome, whatsapp, manychat_subscriber_id').eq('pipedrive_deal_id', deal_id).limit(1).maybeSingle();
        if (leadRow) {
          leadPhone = leadRow.whatsapp;
          leadName2 = leadName2 || `${leadRow.nome} ${leadRow.sobrenome || ''}`.trim();
        }

        if (leadPhone && leadName2) {
          const dateParts2 = date.split('/');
          const callDatetime = dateParts2.length === 3
            ? `${dateParts2[2]}-${dateParts2[1].padStart(2, '0')}-${dateParts2[0].padStart(2, '0')}T${time}:00-03:00`
            : `${date}T${time}:00-03:00`;
          const phone = leadPhone.startsWith('+') ? leadPhone : `+55${leadPhone.replace(/\D/g, '')}`;

          const n8nRes = await fetch(`${supabaseUrl}/functions/v1/trigger-n8n-call`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${supabaseKey}` },
            body: JSON.stringify({
              lead_name: leadName2,
              lead_phone: phone,
              call_datetime: callDatetime,
              subscriber_id: leadRow?.manychat_subscriber_id || null,
              deal_id: deal_id,
            }),
          });
          const n8nText = await n8nRes.text();
          console.log(`[Reschedule-n8n-Fallback] trigger-n8n-call response: ${n8nRes.status} ${n8nText}`);
        }
      } catch (e) {
        console.error('[Reschedule-n8n-Fallback] Failed to trigger n8n:', e);
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ACTION: SYNC — fetch recent Pipedrive deals from Orbit pipeline and insert missing ones into DB
    if (action === 'sync') {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const sb = createClient(supabaseUrl, supabaseKey);

      // Find Orbit pipeline
      const pipeline = await findPipelineByName(PIPEDRIVE_API_TOKEN, 'Orbit');
      if (!pipeline) {
        return new Response(JSON.stringify({ success: false, error: 'Orbit pipeline not found' }), {
          status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Fetch deals from Orbit pipeline (single page, use 'start' param for pagination)
      const startOffset = payload.start || 0;
      const dealsRes = await pipedriveFetch(`/deals?pipeline_id=${pipeline.id}&status=all_not_deleted&limit=100&start=${startOffset}`, 'GET', PIPEDRIVE_API_TOKEN);
      const deals = dealsRes.data || [];
      const hasMorePages = dealsRes.additional_data?.pagination?.more_items_in_collection === true;

      // Get existing deal IDs from DB
      const { data: existingLeads } = await sb.from('leads').select('pipedrive_deal_id').not('pipedrive_deal_id', 'is', null);
      const existingDealIds = new Set((existingLeads || []).map((l: { pipedrive_deal_id: number }) => l.pipedrive_deal_id));

      const synced: string[] = [];
      const skipped: string[] = [];

      for (const deal of deals) {
        if (existingDealIds.has(deal.id)) {
          skipped.push(`${deal.title} (deal ${deal.id})`);
          continue;
        }

        // Fetch person details
        let personEmail = '';
        let personPhone = '';
        let personName = '';
        if (deal.person_id) {
          try {
            const personRes = await pipedriveFetch(`/persons/${deal.person_id.value || deal.person_id}`, 'GET', PIPEDRIVE_API_TOKEN);
            const person = personRes.data;
            personName = person.name || '';
            personEmail = person.email?.[0]?.value || '';
            personPhone = person.phone?.[0]?.value || '';
          } catch { /* skip */ }
        }

        // Fetch notes for this deal to extract scheduling info
        let dataReuniao = '';
        let horarioReuniao = '';
        try {
          const notesRes = await pipedriveFetch(`/deals/${deal.id}/notes`, 'GET', PIPEDRIVE_API_TOKEN);
          const mainNote = notesRes.data?.find((n: any) => n.content?.includes('Reunião:')) || notesRes.data?.[0];
          if (mainNote?.content) {
            const reuniaoMatch = mainNote.content.match(/Reunião:\s*(\d{2}\/\d{2}\/\d{4})\s*às\s*(\d{2}:\d{2})/);
            if (reuniaoMatch) {
              dataReuniao = reuniaoMatch[1];
              horarioReuniao = reuniaoMatch[2];
            }
          }
        } catch { /* skip */ }

        const orgName = deal.org_name || '';
        const parts = personName.trim().split(' ');

        if (!personEmail) {
          skipped.push(`${deal.title} (no email)`);
          continue;
        }

        const { error: insertErr } = await sb.from('leads').insert({
          nome: parts[0] || '',
          sobrenome: parts.slice(1).join(' ') || '',
          whatsapp: personPhone || '',
          email: personEmail,
          empresa: orgName,
          status: dataReuniao ? 'completo' : 'parcial',
          data_reuniao: dataReuniao || '',
          horario_reuniao: horarioReuniao || '',
          pipedrive_person_id: deal.person_id?.value || deal.person_id || null,
          pipedrive_org_id: deal.org_id?.value || deal.org_id || null,
          pipedrive_deal_id: deal.id,
        });

        if (insertErr) {
          console.error(`[Sync] Failed to insert deal ${deal.id}:`, insertErr);
          skipped.push(`${deal.title} (insert error: ${insertErr.message})`);
        } else {
          synced.push(`${personName} <${personEmail}> (deal ${deal.id})`);
        }
      }

      return new Response(JSON.stringify({ 
        success: true, 
        total_deals: deals.length,
        synced: synced.length,
        skipped: skipped.length,
        has_more: hasMorePages,
        next_start: startOffset + 100,
        synced_details: synced,
        skipped_details: skipped,
      }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ACTION: SEARCH — search for a person by email in Pipedrive and sync to DB
    if (action === 'search') {
      const { email: searchEmail } = payload;
      if (!searchEmail) throw new Error('email is required for search');

      const searchRes = await fetch(
        `${BASE_URL}/persons/search?term=${encodeURIComponent(searchEmail)}&fields=email&limit=5&api_token=${PIPEDRIVE_API_TOKEN}`
      );
      const searchData = await searchRes.json();
      const items = searchData?.data?.items || [];
      
      const results: unknown[] = [];
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const sb = createClient(supabaseUrl, supabaseKey);

      for (const item of items) {
        const person = item.item;
        const personId = person.id;
        const personName = person.name || '';
        const personEmail = person.primary_email || searchEmail;
        const personPhone = person.phones?.[0] || '';

        // Get deals for this person
        try {
          const dealsRes = await pipedriveFetch(`/persons/${personId}/deals?status=all_not_deleted`, 'GET', PIPEDRIVE_API_TOKEN);
          for (const deal of (dealsRes.data || [])) {
            // Check if already in DB
            const { data: existing } = await sb.from('leads').select('id').eq('pipedrive_deal_id', deal.id).maybeSingle();
            if (existing) {
              results.push({ deal_id: deal.id, title: deal.title, status: 'already_in_db' });
              continue;
            }

            // Fetch notes for scheduling info
            let dataReuniao = '';
            let horarioReuniao = '';
            try {
              const notesRes = await pipedriveFetch(`/deals/${deal.id}/notes`, 'GET', PIPEDRIVE_API_TOKEN);
              const mainNote = notesRes.data?.find((n: any) => n.content?.includes('Reunião:')) || notesRes.data?.[0];
              if (mainNote?.content) {
                const m = pinnedNote.content.match(/Reunião:\s*(\d{2}\/\d{2}\/\d{4})\s*às\s*(\d{2}:\d{2})/);
                if (m) { dataReuniao = m[1]; horarioReuniao = m[2]; }
              }
            } catch { /* skip */ }

            const parts = personName.trim().split(' ');
            const orgName = deal.org_name || '';

            const { error: insertErr } = await sb.from('leads').insert({
              nome: parts[0] || '',
              sobrenome: parts.slice(1).join(' ') || '',
              whatsapp: personPhone || '',
              email: personEmail,
              empresa: orgName,
              status: dataReuniao ? 'completo' : 'parcial',
              data_reuniao: dataReuniao,
              horario_reuniao: horarioReuniao,
              pipedrive_person_id: personId,
              pipedrive_org_id: deal.org_id?.value || deal.org_id || null,
              pipedrive_deal_id: deal.id,
            });

            results.push({ 
              deal_id: deal.id, title: deal.title, 
              status: insertErr ? `error: ${insertErr.message}` : 'synced',
              dataReuniao, horarioReuniao,
            });
          }
        } catch (e) {
          results.push({ person_id: personId, error: String(e) });
        }
      }

      return new Response(JSON.stringify({ success: true, results }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ACTION: REPAIR — fix leads that exist in DB but have missing scheduling data
    if (action === 'repair') {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const sb = createClient(supabaseUrl, supabaseKey);

      // Find leads with pipedrive_deal_id but missing scheduling data
      const limit = payload.limit || 5;
      let query = sb.from('leads')
        .select('id, pipedrive_deal_id, email, nome')
        .not('pipedrive_deal_id', 'is', null)
        .or('data_reuniao.is.null,data_reuniao.eq.')
        .limit(limit);
      
      // Optional: filter by specific deal_id
      if (payload.deal_id) {
        query = sb.from('leads')
          .select('id, pipedrive_deal_id, email, nome')
          .eq('pipedrive_deal_id', payload.deal_id);
      }

      const { data: brokenLeads } = await query;

      if (!brokenLeads || brokenLeads.length === 0) {
        return new Response(JSON.stringify({ success: true, message: 'No leads to repair', repaired: 0 }), {
          status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get the "Data Reunião" custom field key
      const reuniaoKey = await ensureCustomField(PIPEDRIVE_API_TOKEN, 'dealFields', 'Data Reunião', 'varchar');

      const repaired: string[] = [];
      const failed: string[] = [];

      for (const lead of brokenLeads) {
        try {
          // Fetch deal from Pipedrive to get custom field "Data Reunião"
          const dealRes = await pipedriveFetch(`/deals/${lead.pipedrive_deal_id}`, 'GET', PIPEDRIVE_API_TOKEN);
          const deal = dealRes.data;
          const reuniaoValue = deal?.[reuniaoKey] || ''; // e.g. "05/03/2026 às 14:00"

          let dataReuniao = '';
          let horarioReuniao = '';

          if (reuniaoValue) {
            const m = reuniaoValue.match(/(\d{2}\/\d{2}\/\d{4})\s*às\s*(\d{2}:\d{2})/);
            if (m) { dataReuniao = m[1]; horarioReuniao = m[2]; }
          }

          // If not in custom field, try notes
          if (!dataReuniao) {
            try {
              const notesRes = await pipedriveFetch(`/deals/${lead.pipedrive_deal_id}/notes`, 'GET', PIPEDRIVE_API_TOKEN);
              const mainNote = notesRes.data?.find((n: any) => n.content?.includes('Reunião:')) || notesRes.data?.[0];
              if (mainNote?.content) {
                const m = pinnedNote.content.match(/Reunião:\s*(\d{2}\/\d{2}\/\d{4})\s*às\s*(\d{2}:\d{2})/);
                if (m) { dataReuniao = m[1]; horarioReuniao = m[2]; }
              }
            } catch { /* skip */ }
          }

          // Also extract other fields from notes if available
          let oqueFaz = '', cargo = '', faturamento = '', funcionarios = '', prioridade = '';
          try {
            const notesRes = await pipedriveFetch(`/deals/${lead.pipedrive_deal_id}/notes`, 'GET', PIPEDRIVE_API_TOKEN);
            const mainNote = notesRes.data?.find((n: any) => n.content?.includes('Segmento') || n.content?.includes('Cargo')) || notesRes.data?.[0];
            if (mainNote?.content) {
              const c = mainNote.content;
              const seg = c.match(/Segmento.*?:\s*(.+)/); if (seg) oqueFaz = seg[1].trim();
              const car = c.match(/Cargo:\s*(.+)/); if (car) cargo = car[1].trim();
              const fat = c.match(/Faturamento:\s*(.+)/); if (fat) faturamento = fat[1].trim();
              const func = c.match(/Funcion.rios:\s*(.+)/); if (func) funcionarios = func[1].trim();
              const pri = c.match(/Prioridade:\s*(.+)/); if (pri) prioridade = pri[1].trim();
            }
          } catch { /* skip */ }

          const update: Record<string, unknown> = {};
          if (dataReuniao) { update.data_reuniao = dataReuniao; update.horario_reuniao = horarioReuniao; update.status = 'completo'; }
          if (oqueFaz && oqueFaz !== '-') update.oque_faz = oqueFaz;
          if (cargo && cargo !== '-') update.cargo = cargo;
          if (faturamento && faturamento !== '-') update.faturamento = faturamento;
          if (funcionarios && funcionarios !== '-') update.funcionarios = funcionarios;
          if (prioridade && prioridade !== '-') update.prioridade = prioridade;

          if (Object.keys(update).length > 0) {
            await sb.from('leads').update(update).eq('id', lead.id);
            repaired.push(`${lead.nome} <${lead.email}> → ${dataReuniao || 'no date'} ${horarioReuniao}`);
          } else {
            failed.push(`${lead.nome} <${lead.email}> (no data in Pipedrive)`);
          }
        } catch (e) {
          failed.push(`${lead.nome} <${lead.email}> (error: ${String(e)})`);
        }
      }

      return new Response(JSON.stringify({ success: true, total: brokenLeads.length, repaired: repaired.length, failed: failed.length, repaired_details: repaired, failed_details: failed }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error(`Unknown action: ${action}`);

  } catch (error: unknown) {
    console.error('Error in Pipedrive function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

```

### create-vendedor/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify caller is admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), { status: 401, headers: corsHeaders });
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
    const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Verify caller with anon client
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), { status: 401, headers: corsHeaders });
    }

    const callerId = claimsData.claims.sub;

    // Check admin role using service role client
    const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: roleCheck } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', callerId)
      .eq('role', 'admin')
      .single();

    if (!roleCheck) {
      return new Response(JSON.stringify({ error: 'Apenas administradores podem criar vendedores' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { nome, email, whatsapp, senha } = await req.json();

    if (!nome || !email || !senha) {
      return new Response(JSON.stringify({ error: 'Nome, e-mail e senha são obrigatórios' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1. Create auth user
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
    });

    if (createError) {
      return new Response(JSON.stringify({ error: `Erro ao criar usuário: ${createError.message}` }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = newUser.user.id;

    // 2. Assign vendedor role
    await adminClient.from('user_roles').insert({ user_id: userId, role: 'vendedor' });

    // 3. Create/update vendedores record
    await adminClient.from('vendedores').insert({
      nome,
      email,
      whatsapp: whatsapp || '',
      user_id: userId,
    });

    return new Response(JSON.stringify({ success: true, user_id: userId }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error creating seller:', error);
    const msg = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

```

### generate-diagnostic/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ORBIT_MODULE_CATALOG = [
  {
    module: "Estratégico",
    focus: "direção, prioridades, indicadores, rituais de gestão e tomada de decisão",
  },
  {
    module: "Processos",
    focus: "padronização, gargalos, retrabalho, delegação e previsibilidade operacional",
  },
  {
    module: "Workflows / Automações",
    focus: "handoffs entre áreas, aprovações, alertas, automações e fluxo de execução",
  },
  {
    module: "Indicadores / Qualidade",
    focus: "KPIs, metas, qualidade, desvios, acompanhamento e melhoria contínua",
  },
  {
    module: "Pessoas / Estrutura",
    focus: "clareza de papéis, liderança, capacidade de execução, dependência de pessoas-chave",
  },
  {
    module: "Treinamentos",
    focus: "onboarding, capacitação, retenção de conhecimento e consistência de entrega",
  },
  {
    module: "CRM / Comercial",
    focus: "pipeline, follow-up, previsibilidade comercial, conversão e rotina de vendas",
  },
  {
    module: "Projetos",
    focus: "priorização, cronogramas, dependências, implantação, portfólio e acompanhamento de entregas",
  },
  {
    module: "Compras",
    focus: "fornecedores, suprimentos, aprovações, rastreabilidade, cotações e prazo de abastecimento",
  },
  {
    module: "Reuniões / Execução / Tarefas",
    focus: "cadência, follow-up, responsabilização, execução semanal e cobrança de plano de ação",
  },
] as const;

async function callAI(systemPrompt: string, userPrompt: string, apiKey: string): Promise<string> {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 8192,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AI gateway error:", response.status, errorText);
    if (response.status === 429) throw { status: 429, message: "Rate limit exceeded" };
    if (response.status === 402) throw { status: 402, message: "Payment required" };
    throw new Error(`AI gateway error: ${response.status}`);
  }

  const aiResponse = await response.json();
  const content = aiResponse.choices?.[0]?.message?.content;
  const finishReason = aiResponse.choices?.[0]?.finish_reason;
  console.log("AI finish_reason:", finishReason, "content length:", content?.length ?? 0);

  if (!content) throw new Error(`No content in AI response. finish_reason: ${finishReason}`);
  return content;
}

function parseQuestionsJSON(content: string): any[] {
  const codeBlockMatch = content.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  let clean = codeBlockMatch ? codeBlockMatch[1].trim() : content.trim();

  clean = clean.replace(/,(\s*[}\]])/g, "$1");

  const parsed = JSON.parse(clean);
  const questions = parsed.questions || parsed;

  if (!Array.isArray(questions) || questions.length < 10) {
    throw new Error(`Only ${questions?.length ?? 0} questions generated, need at least 10`);
  }

  for (const q of questions) {
    if (!q.id || !q.question || !q.levels || !q.category) {
      throw new Error("Invalid question structure: missing id, category, question, or levels");
    }
  }

  return questions;
}

async function findLatestSalaPresence(supabase: ReturnType<typeof createClient>, email: string) {
  const { data, error } = await supabase
    .from("sala_presencas")
    .select("sala_id, data_sessao, created_at, salas(nome, categoria)")
    .eq("email", email.trim().toLowerCase())
    .order("data_sessao", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error loading latest sala presence:", error);
    return null;
  }

  return data?.[0] || null;
}

async function findSalaByCurrentSession(supabase: ReturnType<typeof createClient>) {
  // Get current date/time in Brasilia timezone (UTC-3)
  const now = new Date();
  const brNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const dayOfWeek = brNow.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const todayISO = brNow.toISOString().split("T")[0]; // YYYY-MM-DD
  const currentHour = brNow.getHours();

  console.log(`Finding sala by session: dayOfWeek=${dayOfWeek}, date=${todayISO}, hour=${currentHour}`);

  // Try data_especifica first
  const { data: especifica } = await supabase
    .from("sala_horarios")
    .select("sala_id, horario, salas(nome, categoria)")
    .eq("data_especifica", todayISO)
    .eq("ativo", true)
    .eq("tipo", "pontual");

  let candidates = especifica || [];

  // Then try recorrente by dia_semana
  if (candidates.length === 0) {
    const { data: recorrente } = await supabase
      .from("sala_horarios")
      .select("sala_id, horario, salas(nome, categoria)")
      .eq("dia_semana", dayOfWeek)
      .eq("ativo", true)
      .eq("tipo", "recorrente");
    candidates = recorrente || [];
  }

  if (candidates.length === 0) {
    console.log("No sala_horarios found for today");
    return null;
  }

  // Pick the closest session by time (within ±3 hours)
  let best: typeof candidates[0] | null = null;
  let bestDiff = Infinity;

  for (const c of candidates) {
    const [h] = (c.horario as string).split(":").map(Number);
    const diff = Math.abs(currentHour - h);
    if (diff <= 3 && diff < bestDiff) {
      bestDiff = diff;
      best = c;
    }
  }

  if (!best) {
    console.log("No sala session within ±3h window");
    return null;
  }

  const salaInfo = best.salas as { nome?: string; categoria?: string } | null;
  console.log(`Matched sala by session: ${salaInfo?.nome} (${best.horario})`);
  return { sala_id: best.sala_id, salas: best.salas };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, setor_manual, nome_manual, celular_manual, empresa_manual } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email é obrigatório" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: leads } = await supabase
      .from("leads")
      .select("*")
      .eq("email", normalizedEmail)
      .order("created_at", { ascending: false })
      .limit(1);

    const lead = leads?.[0] || null;
    let salaPresence = await findLatestSalaPresence(supabase, normalizedEmail);
    // Fallback: if no sala_presencas match, try to infer from current sala session
    if (!salaPresence) {
      console.log("No sala_presencas match, trying session-based fallback...");
      salaPresence = await findSalaByCurrentSession(supabase);
    }
    const salaInfo = (salaPresence?.salas as { nome?: string | null; categoria?: string | null } | null) ?? null;

    const setor = (setor_manual && setor_manual.trim()) ? setor_manual.trim() : (lead?.oque_faz || "empresa");
    const empresa = empresa_manual?.trim() || lead?.empresa || "";
    const cargo = lead?.cargo || "";
    const salaContext = salaInfo?.nome
      ? `Turma/Sala mais recente vinculada por presença: ${salaInfo.nome}${salaInfo.categoria ? ` (${salaInfo.categoria})` : ""}`
      : "Sem turma/sala vinculada";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `Você é um consultor especialista em gestão empresarial, desenho operacional e inteligência artificial da Orbit Gestão.
Responda APENAS com JSON válido, sem markdown, sem texto adicional.

REGRAS CRÍTICAS:
- Gere exatamente 13 perguntas
- Cada pergunta deve ter 5 níveis de resposta (escala 1-5)
- Personalize PROFUNDAMENTE para o contexto informado
- Linguagem direta, sem jargão
- Labels curtos (máx 10 palavras por nível)
- O objetivo é diagnosticar maturidade e também detectar sinais comerciais para recomendar módulos da Orbit sem citar os nomes dos módulos nas perguntas
- O campo "setor" pode conter segmento, atividade, nicho ou até o cargo do lead; use isso para inferir contexto real de operação
- Cada pergunta deve incluir o campo adicional "theme"
- Temas permitidos: "estrategia", "processos", "pessoas", "comercial", "projetos", "compras", "ia"`;

    const catalogText = ORBIT_MODULE_CATALOG
      .map(item => `- ${item.module}: ${item.focus}`)
      .join("\n");

    const userPrompt = `DADOS:
- Setor/Atividade informado pelo lead: "${setor}"
- Empresa: ${empresa}
- Cargo: ${cargo}
- Contexto de turma: ${salaContext}

CATÁLOGO CURADO ORBIT (use apenas como mapa de dores e capacidades, sem citar módulos literalmente nas perguntas):
${catalogText}

OBJETIVO:
Gerar 13 perguntas de diagnóstico ALTAMENTE PERSONALIZADAS para descobrir o nível de maturidade da empresa e captar sinais para recomendações comerciais futuras.

DISTRIBUIÇÃO OBRIGATÓRIA:
- Perguntas 1-10: category="gestao"
- Perguntas 11-13: category="ia"
- Perguntas 1-3 devem ter theme="estrategia"
- Perguntas 11-13 devem ter theme="ia"

COBERTURA MÍNIMA NAS PERGUNTAS 1-10:
- Estratégia e prioridades
- Processos, execução e gargalos operacionais
- Pessoas, estrutura e retenção de conhecimento
- Rotina comercial / CRM / follow-up
- Sinais de gestão de projetos / entregas / implantação / dependências quando fizer sentido para o contexto
- Sinais de compras / suprimentos / fornecedores / aprovações quando fizer sentido para o contexto

REGRAS DE ADERÊNCIA:
- Se o contexto sugerir operação com entregas, obras, implantação, carteira de projetos, cronogramas, múltiplas demandas simultâneas ou dependências entre áreas, inclua pelo menos 1 pergunta com theme="projetos"
- Se o contexto sugerir fornecedores, estoque, insumos, cotações, abastecimento, compras recorrentes, aprovações ou impacto de suprimentos na operação, inclua pelo menos 1 pergunta com theme="compras"
- Se o contexto não pedir explicitamente projetos ou compras, ainda assim investigue execução e dependências de forma concreta dentro do negócio
- Não use frases genéricas como "na sua empresa" ou "no seu setor" sem contexto; seja específico
- NÃO cite nomes de módulos da Orbit nas perguntas

FORMATO JSON:
{
  "questions": [
    {
      "id": 1,
      "category": "gestao",
      "theme": "estrategia",
      "question": "pergunta personalizada mencionando processos reais do contexto",
      "levels": {
        "1": "nível 1",
        "2": "nível 2",
        "3": "nível 3",
        "4": "nível 4",
        "5": "nível 5"
      }
    }
  ]
}

IMPORTANTE:
- Responda APENAS com o JSON, nada mais
- As perguntas devem soar como consultoria prática, não como questionário genérico
- Os níveis devem mostrar evolução clara de maturidade
- As perguntas 11-13 devem medir prontidão de dados, uso prático de IA e visão estratégica de automação/IA.`;

    const MAX_RETRIES = 3;
    let lastError: any = null;
    let questions: any[] | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${MAX_RETRIES} for sector: ${setor}`);
        const content = await callAI(systemPrompt, userPrompt, LOVABLE_API_KEY);
        questions = parseQuestionsJSON(content);
        console.log(`Success on attempt ${attempt}: ${questions.length} questions generated`);
        break;
      } catch (err: any) {
        lastError = err;
        console.error(`Attempt ${attempt} failed:`, err.message || err);

        if (err.status === 429 || err.status === 402) {
          return new Response(
            JSON.stringify({ error: err.message }),
            { status: err.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        if (attempt < MAX_RETRIES) {
          const waitMs = attempt * 2000;
          console.log(`Waiting ${waitMs}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitMs));
        }
      }
    }

    if (!questions) {
      console.error("All retries exhausted. Last error:", lastError);
      return new Response(
        JSON.stringify({ error: "Falha ao gerar perguntas após múltiplas tentativas. Tente novamente." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const leadNome = lead ? `${lead.nome} ${lead.sobrenome || ""}`.trim() : (nome_manual?.trim() || normalizedEmail.split("@")[0]);
    const { data: diagnostic, error: insertError } = await supabase
      .from("diagnostic_responses")
      .insert({
        lead_id: lead?.id || null,
        lead_email: normalizedEmail,
        lead_nome: leadNome,
        lead_celular: celular_manual?.trim() || lead?.whatsapp || null,
        lead_empresa: empresa || null,
        setor,
        questions,
        meeting_date: lead?.data_reuniao || null,
        meeting_time: lead?.horario_reuniao || null,
        sala_id: salaPresence?.sala_id || null,
        sala_nome: salaInfo?.nome || null,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error("Failed to save diagnostic");
    }

    return new Response(JSON.stringify({
      diagnostic_id: diagnostic.id,
      lead_nome: leadNome,
      empresa,
      setor,
      questions,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("generate-diagnostic error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro interno" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

### generate-diagnostic-insights/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ORBIT_RECOMMENDATION_CATALOG = [
  "Estratégico",
  "Processos",
  "Workflows / Automações",
  "Indicadores / Qualidade",
  "Pessoas / Estrutura",
  "Treinamentos",
  "CRM / Comercial",
  "Projetos",
  "Compras",
  "Reuniões / Execução / Tarefas",
] as const;

interface DiagnosticData {
  lead_nome: string;
  lead_empresa: string | null;
  setor: string;
  score_gestao: number | null;
  score_ia: number | null;
  score_total: number | null;
  maturity_level: string | null;
  ai_summary: string | null;
  sala_nome?: string | null;
  questions: Array<{ id: number; category: string; question: string; theme?: string }>;
  answers: number[] | null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { responses, scope_label } = await req.json() as {
      responses: DiagnosticData[];
      scope_label?: string;
    };

    if (!responses || responses.length === 0) {
      return new Response(JSON.stringify({ error: "Nenhuma resposta para analisar" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const setores = responses.map(r => r.setor).filter(Boolean);
    const setorCount: Record<string, number> = {};
    setores.forEach(s => { setorCount[s] = (setorCount[s] || 0) + 1; });

    const salas = responses.map(r => r.sala_nome).filter(Boolean) as string[];
    const salaCount: Record<string, number> = {};
    salas.forEach(s => { salaCount[s] = (salaCount[s] || 0) + 1; });

    const maturityCount: Record<string, number> = {};
    responses.forEach(r => {
      if (r.maturity_level) maturityCount[r.maturity_level] = (maturityCount[r.maturity_level] || 0) + 1;
    });

    const questionScores: Record<string, { question: string; category: string; theme?: string; total: number; count: number }> = {};
    responses.forEach(r => {
      if (!r.questions || !r.answers) return;
      r.questions.forEach((q, i) => {
        const key = `${q.id}-${q.category}-${q.theme || "sem-tema"}`;
        if (!questionScores[key]) questionScores[key] = { question: q.question, category: q.category, theme: q.theme, total: 0, count: 0 };
        if (typeof r.answers?.[i] === "number") {
          questionScores[key].total += r.answers[i];
          questionScores[key].count += 1;
        }
      });
    });

    const questionAvgs = Object.values(questionScores)
      .map(q => ({ ...q, avg: q.count > 0 ? (q.total / q.count).toFixed(2) : "N/A" }))
      .sort((a, b) => (a.count > 0 && b.count > 0 ? a.total / a.count - b.total / b.count : 0));

    const weakestQuestions = questionAvgs.slice(0, 5);
    const strongestQuestions = questionAvgs.slice(-5).reverse();

    const avgGestao = responses.reduce((a, r) => a + (r.score_gestao || 0), 0) / responses.length;
    const avgIa = responses.reduce((a, r) => a + (r.score_ia || 0), 0) / responses.length;
    const avgTotal = responses.reduce((a, r) => a + (r.score_total || 0), 0) / responses.length;

    const summaries = responses
      .filter(r => r.ai_summary)
      .map(r => `[${r.setor}] ${r.ai_summary}`)
      .slice(0, 30);

    const prompt = `Você é um analista estratégico e consultor comercial da Orbit Gestão.

Analise os dados agregados de ${responses.length} diagnósticos de maturidade respondidos por leads e gere um relatório estratégico para uso do time comercial e da apresentação da turma.

## ESCOPO DA ANÁLISE
- Escopo selecionado: ${scope_label || "Visão geral"}
- Quantidade de diagnósticos: ${responses.length}

## CATÁLOGO CURADO DE MÓDULOS ELEGÍVEIS
${ORBIT_RECOMMENDATION_CATALOG.map(item => `- ${item}`).join("\n")}

REGRAS CRÍTICAS:
- O módulo obrigatório deve ser SEMPRE "Estratégico"
- Além do obrigatório, recomende exatamente 3 módulos adicionais no campo "modulos_sugeridos"
- Os 3 módulos sugeridos devem ser os mais aderentes ao grupo analisado
- NÃO repita "Estratégico" na lista de modulos_sugeridos
- Considere Projetos e Compras quando houver sinais de execução complexa, dependências, implantação, fornecedores, suprimentos, aprovações ou rastreabilidade
- O relatório deve ser objetivo e comercialmente acionável

## DADOS AGREGADOS

**Setores dos respondentes:** ${JSON.stringify(setorCount)}

**Turmas/salas presentes no recorte:** ${JSON.stringify(salaCount)}

**Distribuição de maturidade:** ${JSON.stringify(maturityCount)}

**Médias gerais:** Gestão: ${avgGestao.toFixed(2)} | IA: ${avgIa.toFixed(2)} | Total: ${avgTotal.toFixed(2)} (escala 1-5)

**Top 5 perguntas com MENOR score (maiores dores):**
${weakestQuestions.map(q => `- [${q.category}${q.theme ? `/${q.theme}` : ""}] "${q.question}" → média ${q.avg}`).join("\n")}

**Top 5 perguntas com MAIOR score (pontos fortes):**
${strongestQuestions.map(q => `- [${q.category}${q.theme ? `/${q.theme}` : ""}] "${q.question}" → média ${q.avg}`).join("\n")}

**Resumos individuais (amostra):**
${summaries.join("\n")}

## GERE O RELATÓRIO NO SEGUINTE FORMATO JSON (sem markdown, sem blocos de código):

{
  "titulo": "Título impactante do relatório",
  "escopo_analise": "Resumo curto do recorte analisado",
  "resumo_executivo": "Parágrafo de 3-4 frases com visão geral dos achados principais",
  "modulo_obrigatorio": {
    "modulo": "Estratégico",
    "porque": "Por que esse módulo é obrigatório neste contexto"
  },
  "modulos_sugeridos": [
    {
      "modulo": "Nome do módulo sugerido",
      "porque": "Justificativa comercial objetiva",
      "dores_relacionadas": ["Dor 1", "Dor 2"],
      "o_que_mostrar": "Que tipo de prova, fluxo ou demonstração mostrar na apresentação"
    }
  ],
  "principais_dores": [
    {
      "dor": "Nome curto da dor",
      "descricao": "Descrição detalhada do problema identificado",
      "percentual_afetados": "Estimativa de % dos respondentes afetados",
      "conexao_orbit": "Como a Orbit pode resolver isso especificamente"
    }
  ],
  "oportunidades_orbit": [
    {
      "oportunidade": "Nome da oportunidade",
      "descricao": "Descrição da oportunidade de negócio",
      "argumento_venda": "Pitch direto para usar na abordagem comercial"
    }
  ],
  "perfil_predominante": {
    "nivel": "Nível de maturidade predominante",
    "caracteristicas": "Descrição do perfil típico dos respondentes",
    "gaps_principais": ["Gap 1", "Gap 2", "Gap 3"]
  },
  "insights_por_setor": [
    {
      "setor": "Nome do setor",
      "insight": "Insight específico daquele setor",
      "abordagem_sugerida": "Como abordar comercialmente"
    }
  ],
  "recomendacoes_estrategicas": [
    "Recomendação 1 acionável",
    "Recomendação 2 acionável",
    "Recomendação 3 acionável"
  ]
}

IMPORTANTE: Retorne APENAS o JSON puro, sem nenhum texto adicional, sem markdown.`;

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`AI API error: ${err}`);
    }

    const aiData = await response.json();
    let content = aiData.choices?.[0]?.message?.content || "";

    content = content.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();

    const insights = JSON.parse(content);

    return new Response(JSON.stringify({ insights }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error generating insights:", e);
    return new Response(JSON.stringify({ error: e.message || "Erro ao gerar insights" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

### generate-slide/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { prompt, existingSlide } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `Você é um assistente especialista em criar slides para apresentações comerciais do Orbit — plataforma de gestão com IA do Grupo GSN (Templum + Evolutto).

Contexto do produto:
- Orbit usa IA (Olivia) para mapear processos, criar KPIs e organizar gestão
- Público: empresários de PMEs e consultores de gestão
- Tom: direto, provocativo, profissional, urgente
- Referências: "Mapa de Guerra", "balde furado", "apagar incêndios", "língua do lucro"

${existingSlide ? `Slide atual para editar:
- Título: "${existingSlide.title}"
- Layout: "${existingSlide.layoutType}"
- Conteúdo: ${JSON.stringify(existingSlide.content)}

Edite conforme solicitado mantendo o estilo e tom.` : "Crie um novo slide com conteúdo persuasivo e impactante."}

IMPORTANTE: Gere todo conteúdo em português brasileiro.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "create_slide",
            description: "Cria ou edita um slide de apresentação",
            parameters: {
              type: "object",
              properties: {
                title: { type: "string", description: "Título principal do slide" },
                layoutType: {
                  type: "string",
                  enum: ["hero", "statement", "stats", "split", "cards", "steps", "comparison", "cta"],
                  description: "Tipo de layout: hero (capa), statement (afirmação), stats (estatísticas), split (lista dividida), cards (cartões), steps (passos), comparison (antes/depois), cta (chamada para ação)",
                },
                content: {
                  type: "object",
                  properties: {
                    tag: { type: "string", description: "Categoria/tag do slide" },
                    subtitle: { type: "string" },
                    body: { type: "string", description: "Texto principal (para layout statement)" },
                    items: { type: "array", items: { type: "string" }, description: "Lista de itens (para layout split)" },
                    cards: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: { title: { type: "string" }, desc: { type: "string" }, badge: { type: "string" } },
                        required: ["title", "desc"],
                      },
                    },
                    stats: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: { value: { type: "string" }, label: { type: "string" } },
                        required: ["value", "label"],
                      },
                    },
                    steps: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: { num: { type: "string" }, title: { type: "string" }, desc: { type: "string" } },
                        required: ["num", "title", "desc"],
                      },
                    },
                    comparisons: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: { before: { type: "string" }, after: { type: "string" } },
                        required: ["before", "after"],
                      },
                    },
                    footer: { type: "string" },
                    buttonText: { type: "string" },
                    buttonLink: { type: "string" },
                    badges: { type: "array", items: { type: "string" } },
                    highlight: { type: "string", description: "Parte do título que deve ficar destacada em cor" },
                  },
                },
              },
              required: ["title", "layoutType", "content"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "create_slide" } },
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limited, tente novamente em alguns segundos." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "Créditos insuficientes." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "Erro na IA" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "IA não retornou resultado estruturado" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const slide = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify({ slide }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("generate-slide error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

```

### get-pipedrive-owners/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PIPEDRIVE_API = "https://api.pipedrive.com/v1";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { leads, add_note } = await req.json();
    // leads: Array<{ id: string, email: string, nome: string, pipedrive_deal_id?: number }>
    // add_note?: { deal_id: number, content: string } — optional, posts a note to the deal

    const pipedriveToken = Deno.env.get("PIPEDRIVE_API_TOKEN");
    if (!pipedriveToken) throw new Error("PIPEDRIVE_API_TOKEN not configured");

    // If add_note is provided, post the note to Pipedrive
    if (add_note?.deal_id && add_note?.content) {
      const noteRes = await fetch(`${PIPEDRIVE_API}/notes?api_token=${pipedriveToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: add_note.content,
          deal_id: add_note.deal_id,
          pinned_to_deal_flag: 0,
        }),
      });
      const noteData = await noteRes.json();
      console.log("[get-pipedrive-owners] Note added:", noteData?.success);
    }

    const results: Record<string, { owner_name: string; deal_id?: number }> = {};

    // Process in parallel batches of 5 to avoid rate limits
    const BATCH_SIZE = 5;
    for (let i = 0; i < leads.length; i += BATCH_SIZE) {
      const batch = leads.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(async (lead: any) => {
        try {
          // Strategy 1: If we already have a deal_id, fetch directly
          if (lead.pipedrive_deal_id) {
            const owner = await getDealOwner(lead.pipedrive_deal_id, pipedriveToken);
            if (owner) {
              results[lead.id] = { owner_name: owner, deal_id: lead.pipedrive_deal_id };
              return;
            }
          }

          // Strategy 2: Search by email
          const byEmail = await searchPersonByEmail(lead.email, pipedriveToken);
          if (byEmail) {
            const owner = await getDealOwnerByPersonId(byEmail.personId, pipedriveToken);
            if (owner) {
              results[lead.id] = { owner_name: owner.ownerName, deal_id: owner.dealId };
              return;
            }
          }

          // Strategy 3: Fallback search by name
          const byName = await searchPersonByName(lead.nome, pipedriveToken);
          if (byName) {
            const owner = await getDealOwnerByPersonId(byName.personId, pipedriveToken);
            if (owner) {
              results[lead.id] = { owner_name: owner.ownerName, deal_id: owner.dealId };
              return;
            }
          }
        } catch (e) {
          console.error(`Error fetching owner for lead ${lead.id}:`, e);
        }
      }));
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("get-pipedrive-owners error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function getDealOwner(dealId: number, token: string): Promise<string | null> {
  const res = await fetch(`${PIPEDRIVE_API}/deals/${dealId}?api_token=${token}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data?.user_id?.name || null;
}

async function searchPersonByEmail(email: string, token: string): Promise<{ personId: number } | null> {
  const res = await fetch(`${PIPEDRIVE_API}/persons/search?term=${encodeURIComponent(email)}&fields=email&limit=1&api_token=${token}`);
  if (!res.ok) return null;
  const data = await res.json();
  const item = data?.data?.items?.[0]?.item;
  if (!item) return null;
  return { personId: item.id };
}

async function searchPersonByName(name: string, token: string): Promise<{ personId: number } | null> {
  const res = await fetch(`${PIPEDRIVE_API}/persons/search?term=${encodeURIComponent(name)}&fields=name&limit=1&api_token=${token}`);
  if (!res.ok) return null;
  const data = await res.json();
  const item = data?.data?.items?.[0]?.item;
  if (!item) return null;
  return { personId: item.id };
}

async function getDealOwnerByPersonId(personId: number, token: string): Promise<{ ownerName: string; dealId: number } | null> {
  const res = await fetch(`${PIPEDRIVE_API}/persons/${personId}/deals?limit=1&sort=add_time DESC&api_token=${token}`);
  if (!res.ok) return null;
  const data = await res.json();
  const deal = data?.data?.[0];
  if (!deal) return null;
  return {
    ownerName: deal.user_id?.name || deal.owner_name || "—",
    dealId: deal.id,
  };
}

```

### manychat-webhook/index.ts

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MANYCHAT_API = "https://api.manychat.com/fb";
const PIPEDRIVE_BASE = "https://api.pipedrive.com/v1";

function buildIsoDatetime(dateStr: string, timeStr: string): string | null {
  try {
    const [day, month, year] = dateStr.split("/");
    if (!day || !month || !year) return null;
    const [hour, minute] = timeStr.split(":");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${(hour || "00").padStart(2, "0")}:${(minute || "00").padStart(2, "0")}:00-03:00`;
  } catch {
    return null;
  }
}

function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length <= 11) digits = "55" + digits;
  return digits;
}

async function mcPost(endpoint: string, body: Record<string, unknown>, apiToken: string) {
  const res = await fetch(`${MANYCHAT_API}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function mcGet(endpoint: string, apiToken: string) {
  const res = await fetch(`${MANYCHAT_API}/${endpoint}`, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { status: "error", message: "Non-JSON response" }; }
}

function extractSubscriberId(data: Record<string, unknown>): string | null {
  if (!data?.data) return null;
  const d = data.data as Record<string, unknown>;
  if (Array.isArray(d) && d.length > 0) return String((d[0] as Record<string, unknown>).id);
  if (d.id) return String(d.id);
  return null;
}

async function getCustomFieldId(fieldName: string, apiToken: string): Promise<number | null> {
  const data = await mcGet("page/getCustomFields", apiToken);
  if (!data?.data) return null;
  const field = data.data.find((f: { name: string; id: number }) =>
    f.name.toLowerCase() === fieldName.toLowerCase()
  );
  return field?.id ?? null;
}

async function findSubscriber(whatsapp: string, email: string | null, apiToken: string): Promise<string | null> {
  const normalizedPhone = normalizePhone(whatsapp);

  // Check DB cache first
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const { data: cachedLead } = await supabase
    .from("leads")
    .select("manychat_subscriber_id")
    .eq("whatsapp", whatsapp)
    .not("manychat_subscriber_id", "is", null)
    .limit(1)
    .maybeSingle();
  if (cachedLead?.manychat_subscriber_id) {
    console.log(`[manychat-webhook] Using cached subscriber_id: ${cachedLead.manychat_subscriber_id}`);
    return cachedLead.manychat_subscriber_id;
  }

  // Try findBySystemField email
  if (email) {
    const emailData = await mcGet(
      `subscriber/findBySystemField?field_name=email&field_value=${encodeURIComponent(email)}`,
      apiToken
    );
    const subId = extractSubscriberId(emailData);
    if (subId) {
      await supabase.from("leads").update({ manychat_subscriber_id: subId }).eq("whatsapp", whatsapp);
      return subId;
    }
  }

  // Try findByCustomField Email with field_id
  if (email) {
    const emailFieldId = await getCustomFieldId("Email", apiToken);
    if (emailFieldId) {
      const customData = await mcGet(
        `subscriber/findByCustomField?field_id=${emailFieldId}&field_value=${encodeURIComponent(email)}`,
        apiToken
      );
      const subId = extractSubscriberId(customData);
      if (subId) {
        await supabase.from("leads").update({ manychat_subscriber_id: subId }).eq("whatsapp", whatsapp);
        return subId;
      }
    }
  }

  // Try createSubscriber
  const createData = await mcPost("subscriber/createSubscriber", {
    whatsapp_phone: normalizedPhone,
    consent_phrase: "Lead from Orbit website",
  }, apiToken);
  if (createData?.data?.id) {
    const subId = String(createData.data.id);
    await supabase.from("leads").update({ manychat_subscriber_id: subId }).eq("whatsapp", whatsapp);
    return subId;
  }

  // "already exists" — try Empresa field
  const errStr = JSON.stringify(createData);
  if (errStr.includes("already exists")) {
    // No reliable way to extract subscriber from "already exists" without custom field data
    console.error(`[manychat-webhook] Subscriber already exists but can't find ID for ${whatsapp}`);
  }

  return null;
}

async function getTagId(tagName: string, apiToken: string): Promise<number | null> {
  const data = await mcGet("page/getTags", apiToken);
  if (!data?.data) return null;
  const normalize = (s: string) => s.toLowerCase().replace(/[\s_-]/g, "");
  const tag = data.data.find(
    (t: { name: string; id: number }) => normalize(t.name) === normalize(tagName)
  );
  return tag?.id ?? null;
}

async function addPipedriveNote(dealId: number, content: string, pipedriveToken: string) {
  const res = await fetch(
    `${PIPEDRIVE_BASE}/notes?api_token=${pipedriveToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, deal_id: dealId }),
    }
  );
  return res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const manychatToken = Deno.env.get("MANYCHAT_API_TOKEN");
    const pipedriveToken = Deno.env.get("PIPEDRIVE_API_TOKEN");
    if (!manychatToken) {
      return new Response(JSON.stringify({ error: "MANYCHAT_API_TOKEN not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const body = await req.json();
    console.log("[manychat-webhook] Received:", JSON.stringify(body), "query:", url.search);

    // Support multiple formats:
    // 1. Custom: { whatsapp: "...", action: "..." }
    // 2. Native ManyChat subscriber: { whatsapp_phone: "+55...", ... } + ?action=participou in URL
    // 3. Mixed: body.action or query param action
    let whatsapp = body.whatsapp as string | undefined;
    const action = (body.action || url.searchParams.get("action")) as string | undefined;

    // If no whatsapp field, try ManyChat's whatsapp_phone
    if (!whatsapp && body.whatsapp_phone) {
      whatsapp = String(body.whatsapp_phone).replace(/\D/g, "");
    }

    if (!whatsapp || !action) {
      return new Response(JSON.stringify({ error: "whatsapp (or whatsapp_phone) and action (body or ?action= query param) required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ===== FLOW-LOG (new action) =====
    if (action === "flow-log") {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const digits = whatsapp.replace(/\D/g, "");
      const localDigits = digits.startsWith("55") && digits.length >= 12 ? digits.substring(2) : digits;
      const { data: leads } = await supabase.rpc("find_lead_by_phone", { phone_digits: localDigits });
      let lead = leads && leads.length > 0 ? leads[0] : null;
      if (!lead && localDigits !== digits) {
        const { data: leads2 } = await supabase.rpc("find_lead_by_phone", { phone_digits: digits });
        lead = leads2 && leads2.length > 0 ? leads2[0] : null;
      }

      const { error } = await supabase.from("manychat_flow_logs").insert({
        lead_id: lead?.id ?? null,
        whatsapp: digits,
        flow_name: body.flow_name || "",
        step_name: body.step_name || "",
        message_preview: body.message_preview || null,
        raw_payload: body,
      });

      if (error) {
        console.error("[manychat-webhook] flow-log insert error:", error);
        return new Response(JSON.stringify({ ok: false, error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log(`[manychat-webhook] flow-log saved for ${digits}, lead: ${lead?.id ?? "not found"}`);
      return new Response(JSON.stringify({ ok: true, action: "flow-log", leadId: lead?.id ?? null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!["confirmou", "recusou", "reagendou", "participou", "nps"].includes(action)) {
      return new Response(JSON.stringify({ error: "action must be 'confirmou', 'recusou', 'reagendou', 'participou', 'nps', or 'flow-log'" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Find lead in database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Normalize phone: extract only digits
    const digits = whatsapp.replace(/\D/g, "");
    // Remove country code for matching
    const localDigits = digits.startsWith("55") && digits.length >= 12 ? digits.substring(2) : digits;

    // Use SQL function that strips formatting for reliable matching
    const { data: leads } = await supabase.rpc("find_lead_by_phone", { phone_digits: localDigits });
    let lead = leads && leads.length > 0 ? leads[0] : null;

    // Fallback: try full digits with country code
    if (!lead && localDigits !== digits) {
      const { data: leads2 } = await supabase.rpc("find_lead_by_phone", { phone_digits: digits });
      lead = leads2 && leads2.length > 0 ? leads2[0] : null;
    }

    if (!lead) {
      console.error(`[manychat-webhook] Lead not found for whatsapp: ${whatsapp}`);
      return new Response(JSON.stringify({ ok: false, error: "Lead not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[manychat-webhook] Found lead: ${lead.nome} (${lead.id}), action: ${action}`);

    // ===== REAGENDOU =====
    if (action === "reagendou") {
      const { date, time } = body as { date?: string; time?: string; whatsapp: string; action: string };
      if (!date || !time) {
        return new Response(JSON.stringify({ error: "date and time required for reagendou" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // 1. Update database
      await supabase
        .from("leads")
        .update({
          data_reuniao: date,
          horario_reuniao: time,
          status: "completo",
          status_reuniao: null,
        })
        .eq("id", lead.id);
      console.log(`[manychat-webhook] DB updated for reagendou: ${date} ${time}`);

      // 2. Update Pipedrive (reschedule action)
      if (pipedriveToken && lead.pipedrive_deal_id) {
        try {
          const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
          const res = await fetch(`${supabaseUrl}/functions/v1/create-pipedrive-lead`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}`,
            },
            body: JSON.stringify({
              action: "reschedule",
              deal_id: lead.pipedrive_deal_id,
              person_id: lead.pipedrive_person_id,
              org_id: lead.pipedrive_org_id,
              date,
              time,
              name: `${lead.nome || ""} ${lead.sobrenome || ""}`.trim(),
            }),
          });
          const result = await res.json();
          console.log(`[manychat-webhook] Pipedrive reschedule result:`, JSON.stringify(result));
        } catch (e) {
          console.error(`[manychat-webhook] Pipedrive reschedule error:`, e);
        }
      }

      // 3. Update ManyChat tags: remove old, apply agendou-reuniao
      const subscriberId = await findSubscriber(lead.whatsapp, lead.email, manychatToken);
      if (subscriberId) {
        const tagsToRemove = ["nao-entrou-na-reuniao", "participou-reuniao", "recusou-participacao", "nao-respondeu-chat-demonstracao"];
        for (const oldTag of tagsToRemove) {
          const oldTagId = await getTagId(oldTag, manychatToken);
          if (oldTagId) {
            await mcPost("subscriber/removeTag", {
              subscriber_id: subscriberId,
              tag_id: oldTagId,
            }, manychatToken);
            console.log(`[manychat-webhook] Removed tag "${oldTag}"`);
          }
        }
        const agendouTagId = await getTagId("agendou-reuniao", manychatToken);
        if (agendouTagId) {
          await mcPost("subscriber/addTag", {
            subscriber_id: subscriberId,
            tag_id: agendouTagId,
          }, manychatToken);
          console.log(`[manychat-webhook] Applied tag "agendou-reuniao"`);
        }

        // Update custom fields with new date/time
        await mcPost("subscriber/setCustomFieldByName", {
          subscriber_id: subscriberId,
          field_name: "Data Reuniao",
          field_value: date,
        }, manychatToken);
        await mcPost("subscriber/setCustomFieldByName", {
          subscriber_id: subscriberId,
          field_name: "Horario Reuniao",
          field_value: time,
        }, manychatToken);
        await mcPost("subscriber/setCustomFieldByName", {
          subscriber_id: subscriberId,
          field_name: "Status Reuniao",
          field_value: "",
        }, manychatToken);

        // Set combined datetime for ManyChat triggers
        const isoDatetime = buildIsoDatetime(date, time);
        if (isoDatetime) {
          await mcPost("subscriber/setCustomFieldByName", {
            subscriber_id: subscriberId,
            field_name: "Horário da Reunião Datetime",
            field_value: isoDatetime,
          }, manychatToken);
          console.log(`[manychat-webhook] Set Horário da Reunião Datetime = ${isoDatetime}`);
        }
      }

      // 4. Send calendar invite
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        await fetch(`${supabaseUrl}/functions/v1/send-calendar-invite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}`,
          },
          body: JSON.stringify({
            email: lead.email,
            name: `${lead.nome || ""} ${lead.sobrenome || ""}`.trim(),
            date,
            time,
          }),
        });
        console.log(`[manychat-webhook] Calendar invite sent for reagendou`);
      } catch (e) {
        console.error(`[manychat-webhook] Calendar invite error:`, e);
      }

      // 5. Disparar webhook n8n via edge function
      try {
        const [dd, mm, yyyy] = date.split("/");
        const callDatetime = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${time}:00-03:00`;
        const phone = lead.whatsapp?.startsWith("+") ? lead.whatsapp : `+55${(lead.whatsapp || "").replace(/\D/g, "")}`;
        const n8nUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/trigger-n8n-call`;
        const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
        await fetch(n8nUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${anonKey}`,
          },
          body: JSON.stringify({
            lead_name: `${lead.nome || ""} ${lead.sobrenome || ""}`.trim(),
            lead_phone: phone,
            call_datetime: callDatetime,
            subscriber_id: subscriberId || null,
            deal_id: lead.pipedrive_deal_id || null,
          }),
        });
        console.log(`[manychat-webhook] n8n webhook disparado via edge function`);
      } catch (e) {
        console.error(`[manychat-webhook] Falha ao disparar n8n:`, e);
      }

      return new Response(JSON.stringify({
        ok: true,
        action: "reagendou",
        leadId: lead.id,
        date,
        time,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ===== PARTICIPOU =====
    if (action === "participou") {
      // 1. Update database
      await supabase
        .from("leads")
        .update({
          status_reuniao: "participou",
          confirmou_participacao: true,
        })
        .eq("id", lead.id);
      console.log(`[manychat-webhook] DB updated: status_reuniao=participou for lead ${lead.id}`);

      // 2. Move deal in Pipedrive to "Participou Reunião Grupo"
      if (pipedriveToken && lead.pipedrive_deal_id) {
        try {
          // Get deal to find pipeline
          const dealRes = await fetch(
            `${PIPEDRIVE_BASE}/deals/${lead.pipedrive_deal_id}?api_token=${pipedriveToken}`
          );
          const dealData = await dealRes.json();
          const pipelineId = dealData.data?.pipeline_id;

          if (pipelineId) {
            // Get stages in this pipeline
            const stagesRes = await fetch(
              `${PIPEDRIVE_BASE}/stages?pipeline_id=${pipelineId}&api_token=${pipedriveToken}`
            );
            const stagesData = await stagesRes.json();

            let targetStage = stagesData.data?.find((s: { name: string; id: number }) =>
              s.name.toLowerCase().includes("participou")
            );

            // Create stage if not found
            if (!targetStage) {
              const stages = stagesData.data || [];
              const sorted = stages.sort((a: { order_nr: number }, b: { order_nr: number }) => a.order_nr - b.order_nr);
              const lastOrder = sorted.length > 0 ? sorted[sorted.length - 1].order_nr : 0;
              const createRes = await fetch(
                `${PIPEDRIVE_BASE}/stages?api_token=${pipedriveToken}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: "Participou Reunião Grupo",
                    pipeline_id: pipelineId,
                    order_nr: lastOrder + 1,
                  }),
                }
              );
              const createResult = await createRes.json();
              if (createResult.success && createResult.data) {
                targetStage = createResult.data;
                console.log(`[manychat-webhook] Created stage "${targetStage.name}" (${targetStage.id})`);
              }
            }

            if (targetStage) {
              await fetch(
                `${PIPEDRIVE_BASE}/deals/${lead.pipedrive_deal_id}?api_token=${pipedriveToken}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ stage_id: targetStage.id }),
                }
              );
              console.log(`[manychat-webhook] Moved deal ${lead.pipedrive_deal_id} to stage "${targetStage.name}"`);
            }
          }

          // Add note
          await addPipedriveNote(
            lead.pipedrive_deal_id,
            `✅ Lead participou da Reunião Grupo (registrado via webhook ManyChat)`,
            pipedriveToken
          );
        } catch (e) {
          console.error(`[manychat-webhook] Pipedrive participou error:`, e);
        }
      }

      // 3. Update ManyChat tags
      const subscriberId = await findSubscriber(lead.whatsapp, lead.email, manychatToken);
      if (subscriberId) {
        const tagsToRemove = ["agendou-reuniao", "confirmou-participacao", "nao-entrou-na-reuniao", "recusou-participacao", "nao-respondeu-chat-demonstracao"];
        for (const oldTag of tagsToRemove) {
          const oldTagId = await getTagId(oldTag, manychatToken);
          if (oldTagId) {
            await mcPost("subscriber/removeTag", {
              subscriber_id: subscriberId,
              tag_id: oldTagId,
            }, manychatToken);
          }
        }
        const participouTagId = await getTagId("participou-reuniao", manychatToken);
        if (participouTagId) {
          await mcPost("subscriber/addTag", {
            subscriber_id: subscriberId,
            tag_id: participouTagId,
          }, manychatToken);
          console.log(`[manychat-webhook] Applied tag "participou-reuniao"`);
        }

        // Update etapa_pipedrive custom field
        await mcPost("subscriber/setCustomFieldByName", {
          subscriber_id: subscriberId,
          field_name: "etapa_pipedrive",
          field_value: "participou reuniao grupo",
        }, manychatToken);
        await mcPost("subscriber/setCustomFieldByName", {
          subscriber_id: subscriberId,
          field_name: "Status Reuniao",
          field_value: "participou",
        }, manychatToken);
      }

      // 4. Update etapa_pipedrive in DB
      await supabase
        .from("leads")
        .update({ etapa_pipedrive: "Participou Reunião Grupo" })
        .eq("id", lead.id);

      return new Response(JSON.stringify({
        ok: true,
        action: "participou",
        leadId: lead.id,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ===== NPS =====
    if (action === "nps") {
      const npsValue = Number(body.nps ?? url.searchParams.get("nps"));
      if (![0, 5, 10].includes(npsValue)) {
        return new Response(JSON.stringify({ error: "nps must be 0, 5, or 10" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // 1. Update database
      await supabase
        .from("leads")
        .update({ nps: npsValue })
        .eq("id", lead.id);
      console.log(`[manychat-webhook] DB updated: nps=${npsValue} for lead ${lead.id}`);

      // 2. Add note in Pipedrive
      if (pipedriveToken && lead.pipedrive_deal_id) {
        const emoji = npsValue >= 10 ? "🟢" : npsValue >= 5 ? "🟡" : "🔴";
        await addPipedriveNote(
          lead.pipedrive_deal_id,
          `📊 NPS: ${npsValue} ${emoji} — Lead avaliou a apresentação com nota ${npsValue}`,
          pipedriveToken
        );
        console.log(`[manychat-webhook] Pipedrive note added for NPS ${npsValue}`);
      }

      // 3. Apply tag in ManyChat
      const subscriberId = await findSubscriber(lead.whatsapp, lead.email, manychatToken);
      if (subscriberId) {
        const npsTagName = `nps-${npsValue}`;
        const npsTagId = await getTagId(npsTagName, manychatToken);
        if (npsTagId) {
          await mcPost("subscriber/addTag", {
            subscriber_id: subscriberId,
            tag_id: npsTagId,
          }, manychatToken);
          console.log(`[manychat-webhook] Applied tag "${npsTagName}"`);
        } else {
          console.warn(`[manychat-webhook] Tag "${npsTagName}" not found in ManyChat`);
        }
      }

      return new Response(JSON.stringify({
        ok: true,
        action: "nps",
        leadId: lead.id,
        nps: npsValue,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ===== CONFIRMOU / RECUSOU =====
    const tagName = action === "confirmou" ? "confirmou-participacao" : "recusou-participacao";

    // Update database
    if (action === "confirmou") {
      await supabase
        .from("leads")
        .update({ confirmou_participacao: true })
        .eq("id", lead.id);
      console.log(`[manychat-webhook] Updated confirmou_participacao=true for lead ${lead.id}`);
    }

    // Apply tag in ManyChat
    const tagId = await getTagId(tagName, manychatToken);
    let tagged = false;
    if (tagId) {
      const subscriberId = await findSubscriber(lead.whatsapp, lead.email, manychatToken);
      if (subscriberId) {
        const tagResult = await mcPost("subscriber/addTag", {
          subscriber_id: subscriberId,
          tag_id: tagId,
        }, manychatToken);
        tagged = tagResult?.status === "success";
        console.log(`[manychat-webhook] Tag "${tagName}" applied:`, JSON.stringify(tagResult));
      }
    } else {
      console.warn(`[manychat-webhook] Tag "${tagName}" not found in ManyChat`);
    }

    // Add note in Pipedrive if we have deal_id
    if (pipedriveToken && lead.pipedrive_deal_id) {
      const noteContent = action === "confirmou"
        ? `✅ Lead confirmou participação na reunião via WhatsApp`
        : `❌ Lead recusou participação na reunião via WhatsApp`;
      await addPipedriveNote(lead.pipedrive_deal_id, noteContent, pipedriveToken);
      console.log(`[manychat-webhook] Pipedrive note added for deal ${lead.pipedrive_deal_id}`);
    }

    return new Response(JSON.stringify({
      ok: true,
      action,
      leadId: lead.id,
      tagged,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[manychat-webhook] Error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

```

### pipedrive-webhook/index.ts

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MANYCHAT_API = "https://api.manychat.com/fb";

const CUSTOM_FIELD_MAP: Record<string, string> = {
  empresa: "Empresa",
  oque_faz: "Segmento",
  cargo: "Cargo",
  faturamento: "Faturamento",
  funcionarios: "Funcionarios",
  prioridade: "Prioridade",
  data_reuniao: "Data Reuniao",
  horario_reuniao: "Horario Reuniao",
  software_gestao: "Software Gestao",
  utm_source: "UTM Source",
  utm_medium: "UTM Medium",
  utm_campaign: "UTM Campaign",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getCustomFieldId(fieldName: string, apiToken: string): Promise<number | null> {
  const data = await mcGet("page/getCustomFields", apiToken);
  if (!data?.data) {
    console.warn("[pipedrive-webhook] Failed to fetch custom fields:", JSON.stringify(data).substring(0, 300));
    return null;
  }
  const field = data.data.find((f: { name: string; id: number }) =>
    f.name.toLowerCase() === fieldName.toLowerCase()
  );
  if (field) {
    console.log(`[pipedrive-webhook] Custom field "${fieldName}" → field_id=${field.id}`);
  } else {
    console.warn(`[pipedrive-webhook] Custom field "${fieldName}" not found`);
  }
  return field?.id ?? null;
}

async function syncSystemFields(
  subscriberId: string,
  lead: Record<string, unknown>,
  apiToken: string
): Promise<void> {
  const payload: Record<string, unknown> = { subscriber_id: subscriberId };
  if (lead.nome) payload.first_name = String(lead.nome);
  if (lead.sobrenome) payload.last_name = String(lead.sobrenome);
  if (lead.email) {
    payload.email = String(lead.email);
    payload.has_opt_in_email = true;
  }
  // NOTE: Do NOT send phone/has_opt_in_sms — phone was already set during createSubscriber
  // Sending phone requires consent_phrase which causes the entire updateSubscriber to fail
  console.log(`[pipedrive-webhook] updateSubscriber for ${subscriberId}:`, JSON.stringify(payload));
  try {
    const res = await mcPost("subscriber/updateSubscriber", payload, apiToken);
    if (res?.status !== "success") {
      console.warn(`[pipedrive-webhook] updateSubscriber failed:`, JSON.stringify(res));
    }
  } catch (err) {
    console.warn(`[pipedrive-webhook] Error in updateSubscriber:`, err);
  }
  await sleep(250);
}

async function setAllCustomFields(
  subscriberId: string,
  lead: Record<string, unknown>,
  apiToken: string
): Promise<void> {
  // 1. Sync system fields (nome, sobrenome, email, phone)
  await syncSystemFields(subscriberId, lead, apiToken);

  // 2. Fetch all custom field IDs once (cache)
  const allFieldsData = await mcGet("page/getCustomFields", apiToken);
  const fieldIdCache: Record<string, number> = {};
  if (allFieldsData?.data) {
    for (const f of allFieldsData.data) {
      fieldIdCache[f.name.toLowerCase()] = f.id;
    }
    console.log(`[pipedrive-webhook] Loaded ${Object.keys(fieldIdCache).length} custom field IDs`);
  } else {
    console.error("[pipedrive-webhook] Failed to load custom fields");
    return;
  }

  // 3. Custom fields using field_id (NOT field_name) for WhatsApp compatibility
  for (const [ourKey, fieldName] of Object.entries(CUSTOM_FIELD_MAP)) {
    const value = lead[ourKey];
    if (!value) continue;

    const fieldId = fieldIdCache[fieldName.toLowerCase()];
    if (!fieldId) {
      console.warn(`[pipedrive-webhook] Field "${fieldName}" not found, skipping`);
      continue;
    }

    try {
      const res = await mcPost("subscriber/setCustomField", {
        subscriber_id: subscriberId,
        field_id: fieldId,
        field_value: String(value),
      }, apiToken);
      console.log(`[pipedrive-webhook] setCustomField ${fieldName} (id=${fieldId}):`, JSON.stringify(res));
    } catch (err) {
      console.warn(`[pipedrive-webhook] Error setting ${fieldName}:`, err);
    }
    await sleep(250);
  }

  // Set combined datetime field
  if (lead.data_reuniao && lead.horario_reuniao) {
    const isoDatetime = buildIsoDatetime(String(lead.data_reuniao), String(lead.horario_reuniao));
    if (isoDatetime) {
      const dtFieldId = fieldIdCache["horário da reunião datetime"];
      if (dtFieldId) {
        try {
          const res = await mcPost("subscriber/setCustomField", {
            subscriber_id: subscriberId,
            field_id: dtFieldId,
            field_value: isoDatetime,
          }, apiToken);
          console.log(`[pipedrive-webhook] setCustomField Datetime (id=${dtFieldId}):`, JSON.stringify(res));
        } catch (err) {
          console.warn(`[pipedrive-webhook] Error setting datetime field:`, err);
        }
      } else {
        console.warn(`[pipedrive-webhook] Field "Horário da Reunião Datetime" not found. Available: ${Object.keys(fieldIdCache).join(", ")}`);
      }
    }
  }

  console.log("[pipedrive-webhook] All custom fields synced for subscriber:", subscriberId);
}

const STAGE_TAG_MAP: Record<string, string> = {
  "reuniao agendada": "agendou-reuniao",
  "nao entrou na reuniao": "nao-entrou-na-reuniao",
  "participou reuniao grupo": "participou-reuniao",
  "negociacoes iniciadas": "negociacoes-iniciadas",
  "propostas": "propostas",
  "testando pre analise": "testando-pre-analise",
};

function buildIsoDatetime(dateStr: string, timeStr: string): string | null {
  try {
    const [day, month, year] = dateStr.split("/");
    if (!day || !month || !year) return null;
    const [hour, minute] = timeStr.split(":");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${(hour || "00").padStart(2, "0")}:${(minute || "00").padStart(2, "0")}:00-03:00`;
  } catch {
    return null;
  }
}

function normalizeStage(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length <= 11) digits = "55" + digits;
  return digits;
}

async function mcPost(endpoint: string, body: Record<string, unknown>, apiToken: string) {
  const res = await fetch(`${MANYCHAT_API}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { console.warn("[pipedrive-webhook] Non-JSON response:", text.substring(0, 200)); return { status: "error", message: "Non-JSON response" }; }
}

async function mcGet(endpoint: string, apiToken: string) {
  const res = await fetch(`${MANYCHAT_API}/${endpoint}`, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { console.warn("[pipedrive-webhook] Non-JSON response:", text.substring(0, 200)); return { status: "error", message: "Non-JSON response" }; }
}

async function getTagId(tagName: string, apiToken: string): Promise<number | null> {
  const data = await mcGet("page/getTags", apiToken);
  if (!data?.data) return null;
  const normalize = (s: string) => s.toLowerCase().replace(/[\s_-]/g, "");
  const tag = data.data.find(
    (t: { name: string; id: number }) => normalize(t.name) === normalize(tagName)
  );
  return tag?.id ?? null;
}

function extractSubscriberId(data: Record<string, unknown>): string | null {
  if (!data?.data) return null;
  const d = data.data as Record<string, unknown>;
  if (Array.isArray(d) && d.length > 0) return String((d[0] as Record<string, unknown>).id);
  if (d.id) return String(d.id);
  return null;
}

async function findSubscriber(
  lead: Record<string, unknown>,
  apiToken: string,
  supabase: ReturnType<typeof createClient>
): Promise<{ subscriberId: string; freshLead: Record<string, unknown> } | null> {
  const whatsapp = String(lead.whatsapp);
  const email = lead.email ? String(lead.email) : null;
  const normalizedPhone = normalizePhone(whatsapp);

  // Step 0: Check cached subscriber_id from DB
  if (lead.manychat_subscriber_id) {
    console.log(`[pipedrive-webhook] Step 0: Using cached subscriber_id: ${lead.manychat_subscriber_id}`);
    return { subscriberId: String(lead.manychat_subscriber_id), freshLead: lead };
  }

  // Step 0b: Wait 5s for concurrent processes (tag-manychat) to finish, then re-read lead
  console.log(`[pipedrive-webhook] Step 0b: subscriber_id is null, waiting 5s for concurrent processes...`);
  await sleep(5000);
  const { data: freshLead } = await supabase
    .from("leads")
    .select("*")
    .eq("whatsapp", whatsapp)
    .maybeSingle();
  if (freshLead?.manychat_subscriber_id) {
    console.log(`[pipedrive-webhook] Step 0b: Found subscriber_id after retry: ${freshLead.manychat_subscriber_id}`);
    return { subscriberId: String(freshLead.manychat_subscriber_id), freshLead: freshLead as Record<string, unknown> };
  }
  console.log(`[pipedrive-webhook] Step 0b: Still no subscriber_id after retry, continuing with lookup...`);

  // Step 1: findBySystemField email (only email works for WhatsApp contacts)
  if (email) {
    console.log(`[pipedrive-webhook] Step 1: findBySystemField email=${email}`);
    const emailData = await mcGet(
      `subscriber/findBySystemField?field_name=email&field_value=${encodeURIComponent(email)}`,
      apiToken
    );
    console.log(`[pipedrive-webhook] Step 1 result:`, JSON.stringify(emailData).substring(0, 300));
    const subId = extractSubscriberId(emailData);
    if (subId) {
      console.log(`[pipedrive-webhook] Found by email: ${subId}`);
      await saveSubscriberId(supabase, whatsapp, subId);
      return { subscriberId: subId, freshLead: (freshLead || lead) as Record<string, unknown> };
    }
  }

  // Step 2: findByCustomField with dynamic field_id for Email
  if (email) {
    console.log(`[pipedrive-webhook] Step 2: findByCustomField Email=${email} (with field_id)`);
    const emailFieldId = await getCustomFieldId("Email", apiToken);
    if (emailFieldId) {
      const customEmailData = await mcGet(
        `subscriber/findByCustomField?field_id=${emailFieldId}&field_value=${encodeURIComponent(email)}`,
        apiToken
      );
      console.log(`[pipedrive-webhook] Step 2 result:`, JSON.stringify(customEmailData).substring(0, 300));
      const subId = extractSubscriberId(customEmailData);
      if (subId) {
        console.log(`[pipedrive-webhook] Found by custom Email: ${subId}`);
        await saveSubscriberId(supabase, whatsapp, subId);
        return { subscriberId: subId, freshLead: (freshLead || lead) as Record<string, unknown> };
      }
    }
  }

  // Step 3: Try createSubscriber
  console.log(`[pipedrive-webhook] Step 3: createSubscriber for ${normalizedPhone}`);
  const createData = await mcPost("subscriber/createSubscriber", {
    whatsapp_phone: normalizedPhone,
    consent_phrase: "Lead from Orbit website",
    has_opt_in_email: false,
    has_opt_in_sms: false,
  }, apiToken);
  console.log("[pipedrive-webhook] Step 3 result:", JSON.stringify(createData).substring(0, 400));

  if (createData?.data?.id) {
    const newId = String(createData.data.id);
    console.log(`[pipedrive-webhook] Created subscriber: ${newId}`);
    await saveSubscriberId(supabase, whatsapp, newId);
    return { subscriberId: newId, freshLead: (freshLead || lead) as Record<string, unknown> };
  }

  // Step 4: "already exists" — try findByCustomField with Empresa or other fields
  const errStr = JSON.stringify(createData);
  const waIdMatch = errStr.match(/already exists: (\d+)/);
  if (waIdMatch) {
    const waId = waIdMatch[1];
    console.log(`[pipedrive-webhook] Step 4: "already exists" wa_id=${waId}`);

    // 4a: Try Empresa custom field
    const empresa = lead.empresa ? String(lead.empresa) : null;
    if (empresa) {
      const empresaFieldId = await getCustomFieldId("Empresa", apiToken);
      if (empresaFieldId) {
        console.log(`[pipedrive-webhook] Step 4a: findByCustomField Empresa=${empresa}`);
        const empresaData = await mcGet(
          `subscriber/findByCustomField?field_id=${empresaFieldId}&field_value=${encodeURIComponent(empresa)}`,
          apiToken
        );
        console.log(`[pipedrive-webhook] Step 4a result:`, JSON.stringify(empresaData).substring(0, 300));
        const subId = extractSubscriberId(empresaData);
        if (subId) {
          console.log(`[pipedrive-webhook] Found by Empresa: ${subId}`);
          await saveSubscriberId(supabase, whatsapp, subId);
          return { subscriberId: subId, freshLead: (freshLead || lead) as Record<string, unknown> };
        }
      }
    }

    // 4b: Try phone lookup with wa_id
    if (waId !== normalizedPhone) {
      console.log(`[pipedrive-webhook] Step 4b: findBySystemField phone=+${waId}`);
      const waPhoneData = await mcGet(
        `subscriber/findBySystemField?field_name=phone&field_value=${encodeURIComponent("+" + waId)}`,
        apiToken
      );
      console.log(`[pipedrive-webhook] Step 4b result:`, JSON.stringify(waPhoneData).substring(0, 300));
      const subId = extractSubscriberId(waPhoneData);
      if (subId) {
        console.log(`[pipedrive-webhook] Found via wa_id: ${subId}`);
        await saveSubscriberId(supabase, whatsapp, subId);
        return { subscriberId: subId, freshLead: (freshLead || lead) as Record<string, unknown> };
      }
    }
  }

  console.error("[pipedrive-webhook] FAILED: Could not find subscriber:", whatsapp, email);
  return null;
}

async function saveSubscriberId(
  supabase: ReturnType<typeof createClient>,
  whatsapp: string,
  subscriberId: string
): Promise<void> {
  const { error } = await supabase
    .from("leads")
    .update({ manychat_subscriber_id: subscriberId })
    .eq("whatsapp", whatsapp);
  if (error) {
    console.warn("[pipedrive-webhook] Failed to save subscriber_id:", error);
  } else {
    console.log(`[pipedrive-webhook] Saved subscriber_id ${subscriberId} for ${whatsapp}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const pipedriveToken = Deno.env.get("PIPEDRIVE_API_TOKEN");
    const manychatToken = Deno.env.get("MANYCHAT_API_TOKEN");
    if (!pipedriveToken || !manychatToken) {
      return new Response(JSON.stringify({ error: "Missing API tokens" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    console.log("[pipedrive-webhook] Event received:", JSON.stringify(body).substring(0, 500));

    const current = body.current || body.data;
    const previous = body.previous;
    if (!current) {
      return new Response(JSON.stringify({ ok: true, skipped: "no current data" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    console.log(`[pipedrive-webhook] Deal ${current.id}, stage_id: ${current.stage_id}, prev: ${previous?.stage_id}`);

    const dealId = current.id;
    const stageId = current.stage_id;
    const previousStageId = previous?.stage_id;

    if (stageId === previousStageId) {
      return new Response(JSON.stringify({ ok: true, skipped: "stage not changed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stageRes = await fetch(
      `https://api.pipedrive.com/v1/stages/${stageId}?api_token=${pipedriveToken}`
    );
    const stageData = await stageRes.json();
    const stageName = stageData?.data?.name;
    console.log(`[pipedrive-webhook] Deal ${dealId} moved to stage: "${stageName}" (id: ${stageId})`);

    if (!stageName) {
      return new Response(JSON.stringify({ ok: true, skipped: "could not resolve stage name" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const normalizedStage = normalizeStage(stageName);
    const tagName = STAGE_TAG_MAP[normalizedStage];

    if (!tagName) {
      return new Response(JSON.stringify({ ok: true, skipped: `stage "${stageName}" not mapped` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[pipedrive-webhook] Matched stage → tag: "${tagName}"`);

    const CONFLICTING_TAGS: Record<string, string[]> = {
      "agendou-reuniao": ["nao-entrou-na-reuniao", "participou-reuniao", "nao-respondeu-chat-demonstracao"],
      "nao-entrou-na-reuniao": ["agendou-reuniao", "participou-reuniao", "nao-respondeu-chat-demonstracao"],
      "participou-reuniao": ["agendou-reuniao", "nao-entrou-na-reuniao", "nao-respondeu-chat-demonstracao"],
      "negociacoes-iniciadas": ["nao-respondeu-chat-demonstracao"],
      "propostas": ["nao-respondeu-chat-demonstracao"],
      "testando-pre-analise": ["nao-respondeu-chat-demonstracao"],
    };

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("pipedrive_deal_id", dealId)
      .maybeSingle();

    if (error || !lead) {
      console.error(`[pipedrive-webhook] Lead not found for deal ${dealId}:`, error);
      return new Response(JSON.stringify({ ok: false, error: "Lead not found", dealId }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[pipedrive-webhook] Found lead: ${lead.nome} (${lead.whatsapp}), cached_sub_id: ${lead.manychat_subscriber_id}`);

    // Update etapa_pipedrive and status_reuniao in database
    const STAGE_STATUS_MAP: Record<string, string> = {
      "agendou-reuniao": "reuniao_agendada",
      "nao-entrou-na-reuniao": "nao_entrou",
      "participou-reuniao": "participou",
      "negociacoes-iniciadas": "negociacoes_iniciadas",
      "propostas": "propostas",
      "testando-pre-analise": "testando_pre_analise",
    };
    const dbUpdate: Record<string, string> = { etapa_pipedrive: stageName };
    const statusReuniao = STAGE_STATUS_MAP[tagName];
    if (statusReuniao) {
      dbUpdate.status_reuniao = statusReuniao;
    }
    const { error: updateError } = await supabase
      .from("leads")
      .update(dbUpdate)
      .eq("pipedrive_deal_id", dealId);
    if (updateError) {
      console.error(`[pipedrive-webhook] Error updating lead:`, updateError);
    } else {
      console.log(`[pipedrive-webhook] etapa_pipedrive set to "${stageName}" for deal ${dealId}`);
    }

    // Find subscriber using improved logic with DB cache + retry
    const result = await findSubscriber(lead, manychatToken, supabase);
    if (!result) {
      return new Response(JSON.stringify({ ok: false, error: "Subscriber not found in ManyChat", whatsapp: lead.whatsapp }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { subscriberId, freshLead } = result;

    // Remove conflicting tags
    const tagsToRemove = CONFLICTING_TAGS[tagName] || [];
    for (const conflictTag of tagsToRemove) {
      const conflictTagId = await getTagId(conflictTag, manychatToken);
      if (conflictTagId) {
        const removeResult = await mcPost("subscriber/removeTag", {
          subscriber_id: subscriberId,
          tag_id: conflictTagId,
        }, manychatToken);
        console.log(`[pipedrive-webhook] Removed tag "${conflictTag}":`, JSON.stringify(removeResult));
      }
    }

    // Apply new tag
    const tagId = await getTagId(tagName, manychatToken);
    if (!tagId) {
      return new Response(JSON.stringify({ ok: false, error: `Tag '${tagName}' not found in ManyChat` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tagResult = await mcPost("subscriber/addTag", {
      subscriber_id: subscriberId,
      tag_id: tagId,
    }, manychatToken);
    console.log(`[pipedrive-webhook] Tag "${tagName}" applied:`, JSON.stringify(tagResult));

    // Sync all custom fields using freshLead (has latest data_reuniao, horario_reuniao, etc.)
    await setAllCustomFields(subscriberId, freshLead, manychatToken);

    return new Response(JSON.stringify({
      ok: true,
      dealId,
      stageName,
      tagName,
      subscriberId,
      tagsRemoved: tagsToRemove,
      tagged: tagResult?.status === "success",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[pipedrive-webhook] Error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

```

### register-vendedor/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, email, whatsapp, senha } = await req.json();

    if (!nome || !email || !senha || !whatsapp) {
      return new Response(JSON.stringify({ error: 'Nome, e-mail, WhatsApp e senha são obrigatórios' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Check if email already exists in vendedores
    const { data: existing } = await adminClient
      .from('vendedores')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ error: 'Este e-mail já está cadastrado' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1. Create auth user
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
    });

    if (createError) {
      return new Response(JSON.stringify({ error: `Erro ao criar conta: ${createError.message}` }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = newUser.user.id;

    // 2. Assign vendedor role
    await adminClient.from('user_roles').insert({ user_id: userId, role: 'vendedor' });

    // 3. Create vendedores record
    await adminClient.from('vendedores').insert({
      nome,
      email,
      whatsapp,
      user_id: userId,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error registering seller:', error);
    const msg = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

```

### send-calendar-invite/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function generateICS(date: string, time: string, name: string, meetingLink: string, email: string): string {
  const parts = date.split("/");
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const year = parseInt(parts[2]);
  const [h, m] = time.split(":").map(Number);

  const startUTC = new Date(Date.UTC(year, month, day, h + 3, m, 0));
  const endUTC = new Date(startUTC.getTime() + 60 * 60 * 1000);

  const fmt = (d: Date) =>
    d.getUTCFullYear().toString() +
    (d.getUTCMonth() + 1).toString().padStart(2, "0") +
    d.getUTCDate().toString().padStart(2, "0") +
    "T" +
    d.getUTCHours().toString().padStart(2, "0") +
    d.getUTCMinutes().toString().padStart(2, "0") +
    "00Z";

  const now = new Date();
  const uid = `orbit-${now.getTime()}@orbitgestao.com.br`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Orbit Gestão//Demonstração//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(now)}`,
    `DTSTART:${fmt(startUTC)}`,
    `DTEND:${fmt(endUTC)}`,
    `SUMMARY:Demonstração Orbit Gestão - ${name}`,
    `DESCRIPTION:Olá ${name}!\\n\\nSua demonstração do Orbit Gestão está confirmada.\\n\\nLink da reunião: ${meetingLink}\\n\\nNos vemos em breve!`,
    `LOCATION:${meetingLink}`,
    `URL:${meetingLink}`,
    "STATUS:CONFIRMED",
    "TRANSP:TRANSPARENT",
    `ORGANIZER;CN=Orbit Gestão:mailto:demonstracao@orbitgestao.com.br`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${email}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Demonstração Orbit em 30 minutos",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT10M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Demonstração Orbit em 10 minutos",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function buildEmailHTML(name: string, date: string, time: string, meetingLink: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

<!-- Header -->
<tr><td style="background:#0F1319;padding:32px 40px;text-align:center;">
  <img src="https://nmeuxanxjnhpdcfkdrdc.supabase.co/storage/v1/object/public/email-assets/orbit-icon.png" alt="Orbit" width="60" style="display:inline-block;" />
</td></tr>

<!-- Badge -->
<tr><td style="padding:32px 40px 0;text-align:center;">
  <span style="display:inline-block;background:#E8F5E9;color:#2E7D32;font-size:13px;font-weight:600;padding:6px 16px;border-radius:20px;letter-spacing:0.5px;">
    ✅ DEMONSTRAÇÃO CONFIRMADA
  </span>
</td></tr>

<!-- Greeting -->
<tr><td style="padding:24px 40px 0;text-align:center;">
  <h1 style="margin:0;font-size:26px;color:#0F1319;font-weight:700;">Olá, ${name}!</h1>
  <p style="margin:8px 0 0;font-size:16px;color:#6B7280;line-height:1.5;">
    Sua demonstração do Orbit Gestão está agendada. Estamos ansiosos para te mostrar como transformar a gestão da sua empresa.
  </p>
</td></tr>

<!-- Date Card -->
<tr><td style="padding:24px 40px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;border:1px solid #E5E7EB;border-radius:12px;">
    <tr>
      <td style="padding:24px;text-align:center;border-right:1px solid #E5E7EB;" width="50%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">📅 Data</p>
        <p style="margin:0;font-size:22px;color:#0F1319;font-weight:700;">${date}</p>
      </td>
      <td style="padding:24px;text-align:center;" width="50%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">🕐 Horário</p>
        <p style="margin:0;font-size:22px;color:#0F1319;font-weight:700;">${time}</p>
      </td>
    </tr>
  </table>
</td></tr>

<!-- CTA Button -->
<tr><td style="padding:0 40px 24px;text-align:center;">
  <a href="${meetingLink}" style="display:inline-block;background:#CC9511;color:#ffffff;padding:16px 48px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;letter-spacing:0.3px;">
    Acessar Reunião
  </a>
  <p style="margin:12px 0 0;font-size:13px;color:#9CA3AF;">
    ou copie: <a href="${meetingLink}" style="color:#CC9511;text-decoration:underline;">${meetingLink}</a>
  </p>
</td></tr>

<!-- Computer warning -->
<tr><td style="padding:0 40px 16px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEE2E2;border:1px solid #FECACA;border-radius:10px;">
    <tr><td style="padding:16px 20px;text-align:center;">
      <p style="margin:0 0 6px;font-size:28px;line-height:1;">🚫📱</p>
      <p style="margin:0;font-size:14px;color:#991B1B;line-height:1.5;font-weight:600;">
        Acesse pelo computador — a experiência não funciona pelo celular.
      </p>
    </td></tr>
  </table>
</td></tr>

<!-- Calendar tip -->
<tr><td style="padding:0 40px 32px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8E1;border:1px solid #FFE082;border-radius:10px;">
    <tr><td style="padding:16px 20px;">
      <p style="margin:0;font-size:14px;color:#795548;line-height:1.5;">
        📎 <strong>Dica:</strong> Anexamos um convite de calendário a este e-mail. Aceite-o para bloquear automaticamente o horário na sua agenda (Google, Outlook ou Apple).
      </p>
    </td></tr>
  </table>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #E5E7EB;margin:0;" /></td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px 32px;text-align:center;">
  <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
    Orbit Gestão · Transformando empresas com IA<br/>
    Caso precise reagendar, responda este e-mail.
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, date, time, meetingLink } = await req.json();

    if (!email || !name || !date || !time) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email, name, date, time" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const link = meetingLink || "https://meet.google.com/qpy-himp-cxj";
    const icsContent = generateICS(date, time, name, link, email);
    const emailHTML = buildEmailHTML(name, date, time, link);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Orbit Gestão <demonstracao@orbitgestao.com.br>",
        to: [email],
        subject: `Demonstração confirmada — ${date} às ${time} 🚀`,
        html: emailHTML,
        attachments: [
          {
            filename: "demonstracao-orbit.ics",
            content: btoa(icsContent),
            content_type: "text/calendar; method=REQUEST",
          },
        ],
      }),
    });

    const emailResult = await emailResponse.json();

    // Log email
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const sb = createClient(supabaseUrl, supabaseKey);
      await sb.from("email_logs").insert({
        email_type: "convite_agendamento",
        recipient_email: email,
        recipient_name: name,
        resend_id: emailResult?.id || null,
        success: emailResponse.ok,
        error_message: emailResponse.ok ? null : JSON.stringify(emailResult),
      });
    } catch (logErr) {
      console.warn("Failed to log email:", logErr);
    }

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailResult);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: emailResult }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Calendar invite sent successfully to:", email, "Resend ID:", emailResult.id);
    return new Response(
      JSON.stringify({ success: true, message: "Calendar invite sent", id: emailResult.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

```

### send-meeting-reminder/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function buildReminderHTML(name: string, date: string, time: string, meetingLink: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

<!-- Header -->
<tr><td style="background:#0F1319;padding:32px 40px;text-align:center;">
  <img src="https://nmeuxanxjnhpdcfkdrdc.supabase.co/storage/v1/object/public/email-assets/orbit-icon.png" alt="Orbit" width="60" style="display:inline-block;" />
</td></tr>

<!-- Badge -->
<tr><td style="padding:32px 40px 0;text-align:center;">
  <span style="display:inline-block;background:#FFF3E0;color:#E65100;font-size:13px;font-weight:600;padding:6px 16px;border-radius:20px;letter-spacing:0.5px;">
    ⏰ LEMBRETE — SUA REUNIÃO É EM 1 HORA
  </span>
</td></tr>

<!-- Greeting -->
<tr><td style="padding:24px 40px 0;text-align:center;">
  <h1 style="margin:0;font-size:26px;color:#0F1319;font-weight:700;">Falta pouco, ${name}!</h1>
  <p style="margin:8px 0 0;font-size:16px;color:#6B7280;line-height:1.5;">
    Sua demonstração do Orbit Gestão começa em <strong>1 hora</strong>. Prepare-se para conhecer como podemos transformar a gestão da sua empresa.
  </p>
</td></tr>

<!-- Date Card -->
<tr><td style="padding:24px 40px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;border:1px solid #E5E7EB;border-radius:12px;">
    <tr>
      <td style="padding:24px;text-align:center;border-right:1px solid #E5E7EB;" width="50%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">📅 Data</p>
        <p style="margin:0;font-size:22px;color:#0F1319;font-weight:700;">${date}</p>
      </td>
      <td style="padding:24px;text-align:center;" width="50%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">🕐 Horário</p>
        <p style="margin:0;font-size:22px;color:#0F1319;font-weight:700;">${time}</p>
      </td>
    </tr>
  </table>
</td></tr>

<!-- CTA Button -->
<tr><td style="padding:0 40px 24px;text-align:center;">
  <a href="${meetingLink}" style="display:inline-block;background:#CC9511;color:#ffffff;padding:16px 48px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;letter-spacing:0.3px;">
    Entrar na Reunião
  </a>
  <p style="margin:12px 0 0;font-size:13px;color:#9CA3AF;">
    ou copie: <a href="${meetingLink}" style="color:#CC9511;text-decoration:underline;">${meetingLink}</a>
  </p>
</td></tr>

<!-- Tip -->
<tr><td style="padding:0 40px 32px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8E1;border:1px solid #FFE082;border-radius:10px;">
    <tr><td style="padding:16px 20px;">
      <p style="margin:0;font-size:14px;color:#795548;line-height:1.5;">
        💡 <strong>Dica:</strong> Tenha em mãos informações sobre a gestão e os processos da sua empresa para aproveitarmos melhor a demonstração.
      </p>
    </td></tr>
  </table>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #E5E7EB;margin:0;" /></td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px 32px;text-align:center;">
  <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
    Orbit Gestão · Transformando empresas com IA<br/>
    Caso precise reagendar, responda este e-mail.
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check for force_email parameter (test mode)
    let forceEmail: string | null = null;
    try {
      const body = await req.json();
      forceEmail = body?.force_email || null;
    } catch { /* no body */ }

    // Current time in Brasília (UTC-3)
    const now = new Date();
    const brasiliaOffsetMs = -3 * 60 * 60 * 1000;
    const nowBrasilia = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + brasiliaOffsetMs);

    console.log("Current Brasília time:", nowBrasilia.toISOString());

    // Fetch leads with status 'completo', meeting scheduled, reminder not yet sent
    let query = supabase
      .from("leads")
      .select("*")
      .eq("status", "completo")
      .not("data_reuniao", "is", null)
      .not("horario_reuniao", "is", null)
      .neq("data_reuniao", "")
      .neq("horario_reuniao", "");

    if (forceEmail) {
      query = query.eq("email", forceEmail);
      console.log(`Force mode: sending to ${forceEmail}`);
    } else {
      query = query.eq("lembrete_enviado", false);
    }

    const { data: leads, error } = await query;

    if (error) {
      console.error("Error fetching leads:", error);
      throw error;
    }

    console.log(`Found ${leads?.length || 0} leads to check for reminders`);

    const fallbackLink = "https://meet.google.com/qpy-himp-cxj";
    let sentCount = 0;

    for (const lead of leads || []) {
      try {
        // Parse date (DD/MM/YYYY) and time (HH:MM) as Brasília local time
        const parts = lead.data_reuniao!.split("/");
        if (parts.length !== 3) continue;

        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[2]);
        const [h, m] = lead.horario_reuniao!.split(":").map(Number);

        if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(h) || isNaN(m)) continue;

        // Build meeting datetime in Brasília
        const meetingBrasilia = new Date(year, month, day, h, m, 0);

        // Difference in minutes between meeting time and current Brasília time
        const diffMs = meetingBrasilia.getTime() - nowBrasilia.getTime();
        const diffMinutes = diffMs / (1000 * 60);

        console.log(`Lead ${lead.email}: meeting ${lead.data_reuniao} ${lead.horario_reuniao}, diff=${diffMinutes.toFixed(1)}min`);

        // Send reminder if forced or if meeting is between 30 and 75 minutes away
        if (forceEmail || (diffMinutes >= 30 && diffMinutes <= 75)) {
          console.log(`Sending reminder to ${lead.email}`);

          const leadMeetingLink = (lead as any).link_reuniao || fallbackLink;

          const emailHTML = buildReminderHTML(
            lead.nome,
            lead.data_reuniao!,
            lead.horario_reuniao!,
            leadMeetingLink
          );

          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "Orbit Gestão <demonstracao@orbitgestao.com.br>",
              to: [lead.email],
              subject: `⏰ Lembrete: sua demonstração é em 1 hora — ${lead.horario_reuniao}`,
              html: emailHTML,
            }),
          });

          const emailResult = await emailResponse.json();

          // Log email
          try {
            await supabase.from("email_logs").insert({
              email_type: "lembrete_reuniao",
              recipient_email: lead.email,
              recipient_name: lead.nome,
              lead_id: lead.id,
              resend_id: emailResult?.id || null,
              success: emailResponse.ok,
              error_message: emailResponse.ok ? null : JSON.stringify(emailResult),
            });
          } catch (logErr) {
            console.warn("Failed to log email:", logErr);
          }

          if (!emailResponse.ok) {
            console.error(`Failed to send reminder to ${lead.email}:`, emailResult);
            continue;
          }

          // Mark reminder as sent
          const { error: updateError } = await supabase
            .from("leads")
            .update({ lembrete_enviado: true })
            .eq("id", lead.id);

          if (updateError) {
            console.error(`Failed to update lembrete_enviado for ${lead.email}:`, updateError);
          } else {
            sentCount++;
            console.log(`Reminder sent to ${lead.email}, Resend ID: ${emailResult.id}`);
          }
        }
      } catch (leadError) {
        console.error(`Error processing lead ${lead.email}:`, leadError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, reminders_sent: sentCount, leads_checked: leads?.length || 0 }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

```

### send-sala-confirmation/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function buildConfirmationHTML(
  nome: string,
  salaNome: string,
  categoria: string,
  dataSessao: string,
  horario: string,
  linkSala: string,
): string {
  const isOnboarding = categoria.startsWith("onboarding");
  const badgeText = isOnboarding ? "ONBOARDING CONFIRMADO" : "PRESENÇA CONFIRMADA";
  const badgeBg = isOnboarding ? "#E8F5E9" : "#E3F2FD";
  const badgeColor = isOnboarding ? "#2E7D32" : "#1565C0";
  const emoji = isOnboarding ? "🚀" : "✅";
  const subtitleText = isOnboarding
    ? "Sua sessão de onboarding do Orbit está confirmada. Prepare-se para configurar tudo e começar a usar a plataforma."
    : "Sua presença na sessão de tira-dúvidas está confirmada. Prepare suas perguntas!";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

<!-- Header -->
<tr><td style="background:#0F1319;padding:32px 40px;text-align:center;">
  <img src="https://nmeuxanxjnhpdcfkdrdc.supabase.co/storage/v1/object/public/email-assets/orbit-icon.png" alt="Orbit" width="60" style="display:inline-block;" />
</td></tr>

<!-- Badge -->
<tr><td style="padding:32px 40px 0;text-align:center;">
  <span style="display:inline-block;background:${badgeBg};color:${badgeColor};font-size:13px;font-weight:600;padding:6px 16px;border-radius:20px;letter-spacing:0.5px;">
    ${emoji} ${badgeText}
  </span>
</td></tr>

<!-- Greeting -->
<tr><td style="padding:24px 40px 0;text-align:center;">
  <h1 style="margin:0;font-size:26px;color:#0F1319;font-weight:700;">Olá, ${nome}!</h1>
  <p style="margin:8px 0 0;font-size:16px;color:#6B7280;line-height:1.5;">
    ${subtitleText}
  </p>
</td></tr>

<!-- Session info -->
  <tr><td style="padding:24px 40px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;border:1px solid #E5E7EB;border-radius:12px;">
    <tr>
      <td style="padding:20px;text-align:center;border-right:1px solid #E5E7EB;" width="25%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">📅 Data</p>
        <p style="margin:0;font-size:18px;color:#0F1319;font-weight:700;">${dataSessao}</p>
      </td>
      <td style="padding:20px;text-align:center;border-right:1px solid #E5E7EB;" width="25%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">🕐 Horário</p>
        <p style="margin:0;font-size:18px;color:#0F1319;font-weight:700;">${horario}</p>
      </td>
      <td style="padding:20px;text-align:center;border-right:1px solid #E5E7EB;" width="25%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">⏱️ Duração</p>
        <p style="margin:0;font-size:18px;color:#0F1319;font-weight:700;">${isOnboarding ? "3 horas" : "1 hora"}</p>
      </td>
      <td style="padding:20px;text-align:center;" width="25%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">🎯 Sala</p>
        <p style="margin:0;font-size:18px;color:#0F1319;font-weight:700;">${salaNome}</p>
      </td>
    </tr>
  </table>
</td></tr>

<!-- CTA Button -->
<tr><td style="padding:0 40px 24px;text-align:center;">
  <a href="${linkSala}" style="display:inline-block;background:#CC9511;color:#ffffff;padding:16px 48px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;letter-spacing:0.3px;">
    Acessar Sala
  </a>
  <p style="margin:12px 0 0;font-size:13px;color:#9CA3AF;">
    ou copie: <a href="${linkSala}" style="color:#CC9511;text-decoration:underline;">${linkSala}</a>
  </p>
</td></tr>

<!-- Computer warning -->
<tr><td style="padding:0 40px 16px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEE2E2;border:1px solid #FECACA;border-radius:10px;">
    <tr><td style="padding:16px 20px;text-align:center;">
      <p style="margin:0 0 6px;font-size:28px;line-height:1;">🚫📱</p>
      <p style="margin:0;font-size:14px;color:#991B1B;line-height:1.5;font-weight:600;">
        Acesse pelo computador — a experiência não funciona pelo celular.
      </p>
    </td></tr>
  </table>
</td></tr>

<!-- Tip -->
<tr><td style="padding:0 40px 32px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8E1;border:1px solid #FFE082;border-radius:10px;">
    <tr><td style="padding:16px 20px;">
      <p style="margin:0;font-size:14px;color:#795548;line-height:1.5;">
        💡 <strong>Dica:</strong> Salve o link da sala e entre no horário agendado. A sessão será ao vivo por videoconferência.
      </p>
    </td></tr>
  </table>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #E5E7EB;margin:0;" /></td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px 32px;text-align:center;">
  <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
    Orbit Gestão · Transformando empresas com IA<br/>
    Caso precise reagendar, responda este e-mail.
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, email, sala_nome, categoria, data_sessao, horario, link_sala } = await req.json();

    if (!nome || !email || !sala_nome || !data_sessao || !horario) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    // Format date for display (YYYY-MM-DD -> DD/MM/YYYY)
    const [y, m, d] = data_sessao.split("-");
    const displayDate = `${d}/${m}/${y}`;

    const isOnboarding = (categoria || "").startsWith("onboarding");
    const subject = isOnboarding
      ? `Onboarding confirmado — ${displayDate} às ${horario} 🚀`
      : `Presença confirmada — ${displayDate} às ${horario} ✅`;

    const emailHTML = buildConfirmationHTML(
      nome, sala_nome, categoria || "onboarding", displayDate, horario, link_sala || ""
    );

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Orbit Gestão <demonstracao@orbitgestao.com.br>",
        to: [email],
        subject,
        html: emailHTML,
      }),
    });

    const emailResult = await emailResponse.json();

    // Log email
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const sb = createClient(supabaseUrl, supabaseKey);
      await sb.from("email_logs").insert({
        email_type: isOnboarding ? "confirmacao_onboarding" : "confirmacao_tira_duvidas",
        recipient_email: email,
        recipient_name: nome,
        resend_id: emailResult?.id || null,
        success: emailResponse.ok,
        error_message: emailResponse.ok ? null : JSON.stringify(emailResult),
      });
    } catch (logErr) {
      console.warn("Failed to log email:", logErr);
    }

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailResult);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: emailResult }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sala confirmation sent to:", email, "Resend ID:", emailResult.id);
    return new Response(
      JSON.stringify({ success: true, id: emailResult.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

```

### send-sala-reminder/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function buildReminderHTML(
  nome: string,
  salaNome: string,
  categoria: string,
  dataSessao: string,
  horario: string,
  linkSala: string,
): string {
  const isOnboarding = categoria === "onboarding";
  const sessionType = isOnboarding ? "sessão de onboarding" : "sessão de tira-dúvidas";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

<!-- Header -->
<tr><td style="background:#0F1319;padding:32px 40px;text-align:center;">
  <img src="https://nmeuxanxjnhpdcfkdrdc.supabase.co/storage/v1/object/public/email-assets/orbit-icon.png" alt="Orbit" width="60" style="display:inline-block;" />
</td></tr>

<!-- Badge -->
<tr><td style="padding:32px 40px 0;text-align:center;">
  <span style="display:inline-block;background:#FFF3E0;color:#E65100;font-size:13px;font-weight:600;padding:6px 16px;border-radius:20px;letter-spacing:0.5px;">
    ⏰ LEMBRETE — SUA SESSÃO É EM 1 HORA
  </span>
</td></tr>

<!-- Greeting -->
<tr><td style="padding:24px 40px 0;text-align:center;">
  <h1 style="margin:0;font-size:26px;color:#0F1319;font-weight:700;">Falta pouco, ${nome}!</h1>
  <p style="margin:8px 0 0;font-size:16px;color:#6B7280;line-height:1.5;">
    Sua ${sessionType} do Orbit começa em <strong>1 hora</strong>. Não se esqueça!
  </p>
</td></tr>

<!-- Session info -->
<tr><td style="padding:24px 40px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;border:1px solid #E5E7EB;border-radius:12px;">
    <tr>
      <td style="padding:20px;text-align:center;border-right:1px solid #E5E7EB;" width="33%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">📅 Data</p>
        <p style="margin:0;font-size:18px;color:#0F1319;font-weight:700;">${dataSessao}</p>
      </td>
      <td style="padding:20px;text-align:center;border-right:1px solid #E5E7EB;" width="33%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">🕐 Horário</p>
        <p style="margin:0;font-size:18px;color:#0F1319;font-weight:700;">${horario}</p>
      </td>
      <td style="padding:20px;text-align:center;" width="33%">
        <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">🎯 Sala</p>
        <p style="margin:0;font-size:18px;color:#0F1319;font-weight:700;">${salaNome}</p>
      </td>
    </tr>
  </table>
</td></tr>

<!-- CTA Button -->
<tr><td style="padding:0 40px 24px;text-align:center;">
  <a href="${linkSala}" style="display:inline-block;background:#CC9511;color:#ffffff;padding:16px 48px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;letter-spacing:0.3px;">
    Entrar na Sala
  </a>
  <p style="margin:12px 0 0;font-size:13px;color:#9CA3AF;">
    ou copie: <a href="${linkSala}" style="color:#CC9511;text-decoration:underline;">${linkSala}</a>
  </p>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #E5E7EB;margin:0;" /></td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px 32px;text-align:center;">
  <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
    Orbit Gestão · Transformando empresas com IA
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Current time in Brasília (UTC-3)
    const now = new Date();
    const brasiliaOffsetMs = -3 * 60 * 60 * 1000;
    const nowBrasilia = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + brasiliaOffsetMs);

    console.log("Current Brasília time:", nowBrasilia.toISOString());

    // Fetch presencas with their sala and horario info
    // We need to find sessions happening in 30-75 minutes
    const { data: presencas, error: presencaError } = await supabase
      .from("sala_presencas")
      .select("*");

    if (presencaError) {
      console.error("Error fetching presencas:", presencaError);
      throw presencaError;
    }

    // Fetch salas and horarios
    const { data: salas } = await supabase.from("salas").select("*").eq("ativo", true);
    const { data: horarios } = await supabase.from("sala_horarios").select("*").eq("ativo", true);

    const salasMap = new Map((salas || []).map((s: any) => [s.id, s]));
    const horariosMap = new Map((horarios || []).map((h: any) => [h.id, h]));

    console.log(`Found ${presencas?.length || 0} presencas to check`);

    let sentCount = 0;

    for (const presenca of presencas || []) {
      try {
        const horario = horariosMap.get(presenca.horario_id);
        const sala = salasMap.get(presenca.sala_id);
        if (!horario || !sala) continue;

        // Parse session date and time
        const [y, m, d] = presenca.data_sessao.split("-").map(Number);
        const [hh, mm] = horario.horario.split(":").map(Number);

        if (isNaN(y) || isNaN(m) || isNaN(d) || isNaN(hh) || isNaN(mm)) continue;

        const sessionBrasilia = new Date(y, m - 1, d, hh, mm, 0);
        const diffMs = sessionBrasilia.getTime() - nowBrasilia.getTime();
        const diffMinutes = diffMs / (1000 * 60);

        // Send reminder if session is between 30 and 75 minutes away
        if (diffMinutes >= 30 && diffMinutes <= 75) {
          // Check if we already sent a reminder (look in email_logs)
          const { data: existingLog } = await supabase
            .from("email_logs")
            .select("id")
            .eq("email_type", "lembrete_sala")
            .eq("recipient_email", presenca.email)
            .gte("created_at", new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString())
            .limit(1);

          if (existingLog && existingLog.length > 0) {
            console.log(`Reminder already sent to ${presenca.email} for this session, skipping`);
            continue;
          }

          const displayDate = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;

          console.log(`Sending sala reminder to ${presenca.email} for ${displayDate} ${horario.horario}`);

          const emailHTML = buildReminderHTML(
            presenca.nome,
            sala.nome,
            sala.categoria,
            displayDate,
            horario.horario.slice(0, 5),
            sala.link_sala,
          );

          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "Orbit Gestão <demonstracao@orbitgestao.com.br>",
              to: [presenca.email],
              subject: `⏰ Lembrete: sua sessão é em 1 hora — ${horario.horario.slice(0, 5)}`,
              html: emailHTML,
            }),
          });

          const emailResult = await emailResponse.json();

          // Log email
          await supabase.from("email_logs").insert({
            email_type: "lembrete_sala",
            recipient_email: presenca.email,
            recipient_name: presenca.nome,
            resend_id: emailResult?.id || null,
            success: emailResponse.ok,
            error_message: emailResponse.ok ? null : JSON.stringify(emailResult),
          });

          if (emailResponse.ok) {
            sentCount++;
            console.log(`Sala reminder sent to ${presenca.email}, Resend ID: ${emailResult.id}`);
          } else {
            console.error(`Failed to send reminder to ${presenca.email}:`, emailResult);
          }
        }
      } catch (err) {
        console.error(`Error processing presenca ${presenca.email}:`, err);
      }
    }

    return new Response(
      JSON.stringify({ success: true, reminders_sent: sentCount, presencas_checked: presencas?.length || 0 }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

```

### submit-diagnostic/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PIPEDRIVE_BASE = "https://api.pipedrive.com/v1";

function getMaturityLevel(score: number): string {
  if (score <= 1.5) return "Iniciante";
  if (score <= 2.5) return "Básico";
  if (score <= 3.5) return "Intermediário";
  if (score <= 4.5) return "Avançado";
  return "Referência";
}

function getMaturityColor(level: string): string {
  const map: Record<string, string> = {
    "Iniciante": "#ef4444",
    "Básico": "#f97316",
    "Intermediário": "#eab308",
    "Avançado": "#22c55e",
    "Referência": "#3b82f6",
  };
  return map[level] || "#6b7280";
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { diagnostic_id, answers } = await req.json();
    if (!diagnostic_id || !answers || !Array.isArray(answers)) {
      return new Response(JSON.stringify({ error: "diagnostic_id e answers são obrigatórios" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: diag, error: diagError } = await supabase
      .from("diagnostic_responses")
      .select("*")
      .eq("id", diagnostic_id)
      .single();

    if (diagError || !diag) {
      return new Response(JSON.stringify({ error: "Diagnóstico não encontrado" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const questions = diag.questions as Array<{ id: number; category: string; question: string }>;

    // Calculate scores by category
    const gestaoAnswers = answers.filter((_: number, i: number) => questions[i]?.category === "gestao");
    const iaAnswers = answers.filter((_: number, i: number) => questions[i]?.category === "ia");

    const scoreGestao = gestaoAnswers.length > 0
      ? gestaoAnswers.reduce((a: number, b: number) => a + b, 0) / gestaoAnswers.length
      : 0;
    const scoreIa = iaAnswers.length > 0
      ? iaAnswers.reduce((a: number, b: number) => a + b, 0) / iaAnswers.length
      : 0;
    const scoreTotal = answers.reduce((a: number, b: number) => a + b, 0) / answers.length;
    const maturityLevel = getMaturityLevel(scoreTotal);

    // Generate AI summary
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    let aiSummary = "";

    if (LOVABLE_API_KEY) {
      try {
        const qaPairs = questions.map((q, i) => `${q.question}: ${answers[i]}/5`).join("\n");
        const summaryRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-lite",
            messages: [
              { role: "system", content: "Você é um consultor de gestão do Orbit. Gere um resumo executivo curto (4-5 frases) sobre o diagnóstico da empresa. Foque nos pontos mais críticos: onde a empresa sangra em gestão (direção, processos, pessoas) E qual o nível de maturidade em IA. Conecte cada fraqueza de gestão ao agente do Orbit que resolve (Estrategista, Processos ou Treinamento). Na parte de IA, destaque se a empresa está preparada ou atrasada para adotar IA e como o Orbit pode acelerar isso. Seja direto e provocativo." },
              { role: "user", content: `Empresa do setor: ${diag.setor}\nNível: ${maturityLevel}\nScore Gestão (Direção + Processos + Pessoas, P1-10): ${scoreGestao.toFixed(1)}/5\nScore Maturidade IA (P11-13): ${scoreIa.toFixed(1)}/5\nScore Total: ${scoreTotal.toFixed(1)}/5\n\nRespostas:\n${qaPairs}` },
            ],
          }),
        });
        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          aiSummary = summaryData.choices?.[0]?.message?.content || "";
        }
      } catch (e) {
        console.error("AI summary error:", e);
      }
    }

    // Update diagnostic record
    const { error: updateError } = await supabase
      .from("diagnostic_responses")
      .update({
        answers,
        score_gestao: parseFloat(scoreGestao.toFixed(2)),
        score_ia: parseFloat(scoreIa.toFixed(2)),
        score_total: parseFloat(scoreTotal.toFixed(2)),
        maturity_level: maturityLevel,
        ai_summary: aiSummary,
      })
      .eq("id", diagnostic_id);

    if (updateError) {
      console.error("Update error:", updateError);
      throw new Error("Failed to save answers");
    }

    // Update lead status
    if (diag.lead_id) {
      await supabase
        .from("leads")
        .update({
          status_reuniao: "participou",
          confirmou_participacao: true,
          etapa_pipedrive: "Participou Reunião Grupo",
        })
        .eq("id", diag.lead_id);
    }

    // Move deal in Pipedrive
    const pipedriveToken = Deno.env.get("PIPEDRIVE_API_TOKEN");
    if (pipedriveToken && diag.lead_id) {
      try {
        const { data: lead } = await supabase
          .from("leads")
          .select("pipedrive_deal_id")
          .eq("id", diag.lead_id)
          .single();

        if (lead?.pipedrive_deal_id) {
          const dealRes = await fetch(`${PIPEDRIVE_BASE}/deals/${lead.pipedrive_deal_id}?api_token=${pipedriveToken}`);
          const dealData = await dealRes.json();
          const pipelineId = dealData.data?.pipeline_id;

          if (pipelineId) {
            const stagesRes = await fetch(`${PIPEDRIVE_BASE}/stages?pipeline_id=${pipelineId}&api_token=${pipedriveToken}`);
            const stagesData = await stagesRes.json();

            let targetStage = stagesData.data?.find((s: { name: string }) =>
              s.name.toLowerCase().includes("participou")
            );

            if (!targetStage) {
              const stages = stagesData.data || [];
              const sorted = stages.sort((a: { order_nr: number }, b: { order_nr: number }) => a.order_nr - b.order_nr);
              const lastOrder = sorted.length > 0 ? sorted[sorted.length - 1].order_nr : 0;
              const createRes = await fetch(`${PIPEDRIVE_BASE}/stages?api_token=${pipedriveToken}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Participou Reunião Grupo", pipeline_id: pipelineId, order_nr: lastOrder + 1 }),
              });
              const createResult = await createRes.json();
              if (createResult.success) targetStage = createResult.data;
            }

            if (targetStage) {
              await fetch(`${PIPEDRIVE_BASE}/deals/${lead.pipedrive_deal_id}?api_token=${pipedriveToken}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stage_id: targetStage.id }),
              });
            }

            const noteContent = `📊 Diagnóstico de Maturidade — Orbit Gestão\n\n` +
              `🏢 Setor: ${diag.setor}\n` +
              `🎯 Gestão (Direção + Processos + Pessoas): ${scoreGestao.toFixed(1)}/5\n` +
              `🤖 Maturidade em IA: ${scoreIa.toFixed(1)}/5\n` +
              `⭐ Score Total: ${scoreTotal.toFixed(1)}/5\n` +
              `📈 Nível: ${maturityLevel}\n\n` +
              `${aiSummary ? `💡 Resumo: ${aiSummary}\n\n` : ""}` +
              `Respostas detalhadas:\n` +
              questions.map((q, i) => `• ${q.question}: ${answers[i]}/5`).join("\n");

            await fetch(`${PIPEDRIVE_BASE}/notes?api_token=${pipedriveToken}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                content: noteContent,
                deal_id: lead.pipedrive_deal_id,
                pinned_to_deal_flag: 0,
              }),
            });
          }
        }
      } catch (e) {
        console.error("Pipedrive error:", e);
      }
    }

    // Send email
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey && diag.lead_email) {
      try {
        const matColor = getMaturityColor(maturityLevel);
        const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="text-align:center;margin-bottom:32px;">
    <h1 style="color:#1a1a2e;font-size:24px;margin:0;">Seu Diagnóstico de Maturidade</h1>
    <p style="color:#666;font-size:14px;">Gestão & Inteligência Artificial — Orbit Gestão</p>
  </div>
  
  <div style="background:#f8f9fa;border-radius:12px;padding:24px;margin-bottom:24px;">
    <p style="margin:0 0 8px;color:#333;">Olá <strong>${diag.lead_nome}</strong>,</p>
    <p style="margin:0;color:#666;font-size:14px;">Aqui está o resultado do seu diagnóstico de maturidade em Gestão e Inteligência Artificial.</p>
  </div>

  <div style="display:flex;gap:12px;margin-bottom:24px;">
    <div style="flex:1;background:#1a1a2e;border-radius:12px;padding:20px;text-align:center;">
      <p style="color:#999;font-size:12px;margin:0 0 4px;text-transform:uppercase;">Gestão</p>
      <p style="color:#c8a52e;font-size:28px;font-weight:bold;margin:0;">${scoreGestao.toFixed(1)}</p>
      <p style="color:#666;font-size:12px;margin:4px 0 0;">/5.0</p>
    </div>
    <div style="flex:1;background:#1a1a2e;border-radius:12px;padding:20px;text-align:center;">
      <p style="color:#999;font-size:12px;margin:0 0 4px;text-transform:uppercase;">IA</p>
      <p style="color:#c8a52e;font-size:28px;font-weight:bold;margin:0;">${scoreIa.toFixed(1)}</p>
      <p style="color:#666;font-size:12px;margin:4px 0 0;">/5.0</p>
    </div>
    <div style="flex:1;background:#1a1a2e;border-radius:12px;padding:20px;text-align:center;">
      <p style="color:#999;font-size:12px;margin:0 0 4px;text-transform:uppercase;">Total</p>
      <p style="color:#c8a52e;font-size:28px;font-weight:bold;margin:0;">${scoreTotal.toFixed(1)}</p>
      <p style="color:#666;font-size:12px;margin:4px 0 0;">/5.0</p>
    </div>
  </div>

  <div style="text-align:center;margin-bottom:24px;">
    <span style="display:inline-block;background:${matColor};color:white;padding:8px 24px;border-radius:20px;font-weight:bold;font-size:16px;">
      ${maturityLevel}
    </span>
  </div>

  ${aiSummary ? `<div style="background:#f0f4ff;border-left:4px solid #3b82f6;padding:16px;border-radius:0 8px 8px 0;margin-bottom:24px;">
    <p style="margin:0;color:#333;font-size:14px;line-height:1.6;">${aiSummary}</p>
  </div>` : ""}

  <div style="margin-bottom:24px;">
    <h2 style="color:#1a1a2e;font-size:16px;margin:0 0 16px;">Suas Respostas</h2>
    ${questions.map((q, i) => `
    <div style="padding:12px 0;border-bottom:1px solid #eee;">
      <p style="margin:0 0 4px;color:#333;font-size:13px;">${q.question}</p>
      <p style="margin:0;color:#c8a52e;font-weight:bold;font-size:14px;">${answers[i]}/5</p>
    </div>`).join("")}
  </div>

  <div style="text-align:center;padding:24px 0;border-top:1px solid #eee;">
    <p style="color:#999;font-size:12px;margin:0;">Orbit Gestão — Transformando empresas com IA</p>
  </div>
</div>
</body>
</html>`;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Orbit Gestão <demonstracao@orbitgestao.com.br>",
            to: [diag.lead_email],
            subject: `Seu Diagnóstico de Maturidade — ${maturityLevel}`,
            html: emailHtml,
          }),
        });
        console.log(`[submit-diagnostic] Email sent to ${diag.lead_email}`);
      } catch (e) {
        console.error("Email error:", e);
      }
    }

    return new Response(JSON.stringify({
      score_gestao: parseFloat(scoreGestao.toFixed(2)),
      score_ia: parseFloat(scoreIa.toFixed(2)),
      score_total: parseFloat(scoreTotal.toFixed(2)),
      maturity_level: maturityLevel,
      ai_summary: aiSummary,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-diagnostic error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro interno" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

```

### summarize-transcription/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { transcription, lead_nome, setor } = await req.json();

    if (!transcription || transcription.trim().length < 50) {
      return new Response(JSON.stringify({ error: "Transcrição muito curta. Cole pelo menos um trecho significativo da reunião." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `Você é um analista de vendas especialista em consultoria de gestão empresarial e implementação de IA. 
Sua tarefa é analisar a transcrição de uma reunião de demonstração e gerar um resumo estruturado.

CONTEXTO:
- A empresa é a Orbit Gestão, que vende agentes de IA para gestão empresarial
- O lead se chama "${lead_nome}" e atua no setor "${setor}"

RETORNE EXATAMENTE este JSON (sem markdown, sem blocos de código):
{
  "resumo": "Resumo executivo da reunião em 2-3 parágrafos. Inclua os principais pontos discutidos, dores identificadas e interesses demonstrados.",
  "proximos_passos_lead": ["Lista de 3-5 ações que o lead precisa tomar como próximos passos"],
  "acoes_vendedor": ["Lista de 3-5 ações que o vendedor precisa executar para avançar este lead no funil"],
  "temperatura": "quente|morno|frio",
  "observacoes": "Observações adicionais relevantes sobre o perfil do lead, objeções levantadas, ou oportunidades identificadas"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Transcrição da reunião:\n\n${transcription}` },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns segundos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Adicione créditos no workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from response, handling potential markdown wrapping
    let summary;
    try {
      const cleaned = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      summary = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(JSON.stringify({ error: "Erro ao processar resposta da IA. Tente novamente." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("summarize-transcription error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

```

### sync-lead-crm/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CRM_BASE_URL = "https://cvanwvoddchatcdstwry.supabase.co/functions/v1";
const WEBFORM_ID = "b84131b3-feff-4766-bff6-7d8c6d3dd2c8";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, email, whatsapp, empresa } = await req.json();

    if (!nome || !email) {
      return new Response(
        JSON.stringify({ error: "nome and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Syncing lead to CRM: ${nome} <${email}>`);

    // Try the webform-submit endpoint (common pattern for Supabase CRM webforms)
    const submitUrl = `${CRM_BASE_URL}/crm-webform-submit`;
    
    const payload = {
      form_id: WEBFORM_ID,
      name: nome,
      email: email,
      phone: whatsapp || "",
      company: empresa || "",
    };

    const response = await fetch(submitUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = { raw: result };
    }

    if (!response.ok) {
      console.error("CRM submit failed:", response.status, parsed);
      return new Response(
        JSON.stringify({ success: false, status: response.status, details: parsed }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("CRM sync success:", parsed);
    return new Response(
      JSON.stringify({ success: true, crm_response: parsed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error syncing to CRM:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

```

### sync-lead-make/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MAKE_WEBHOOK_URL = "https://hook.us1.make.com/dcqw8dhq4lngw8vsgcv3cdfdl2d7pfem";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lead_id } = await req.json();

    if (!lead_id) {
      return new Response(
        JSON.stringify({ error: "lead_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", lead_id)
      .single();

    if (dbError || !lead) {
      console.error("[sync-lead-make] Lead not found:", dbError);
      return new Response(
        JSON.stringify({ error: "Lead not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[sync-lead-make] Sending lead ${lead_id} to Make.com`);

    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    const result = await response.text();
    console.log(`[sync-lead-make] Make.com response: ${response.status} ${result}`);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ success: false, status: response.status, details: result }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[sync-lead-make] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

```

### tag-manychat/index.ts

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface LeadFields {
  nome?: string;
  sobrenome?: string;
  email?: string;
  empresa?: string;
  oque_faz?: string;
  cargo?: string;
  faturamento?: string;
  funcionarios?: string;
  prioridade?: string;
  data_reuniao?: string;
  horario_reuniao?: string;
  software_gestao?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  status_reuniao?: string;
  link_reuniao?: string;
}

interface TagRequest {
  action: "tag" | "batch-tag-existing" | "list-tags" | "sync-from-pipedrive";
  whatsapp?: string;
  tag_name?: string;
  lead_data?: LeadFields;
  offset?: number;
  limit?: number;
}

const MANYCHAT_API = "https://api.manychat.com/fb";

// email, nome, sobrenome are SYSTEM fields → synced via updateSubscriber, NOT here
const CUSTOM_FIELD_MAP: Record<string, string> = {
  empresa: "Empresa",
  oque_faz: "Segmento",
  cargo: "Cargo",
  faturamento: "Faturamento",
  funcionarios: "Funcionarios",
  prioridade: "Prioridade",
  data_reuniao: "Data Reuniao",
  horario_reuniao: "Horario Reuniao",
  software_gestao: "Software Gestao",
  utm_source: "UTM Source",
  utm_medium: "UTM Medium",
  utm_campaign: "UTM Campaign",
  status_reuniao: "Status Reuniao",
  link_reuniao: "link_reuniao",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Build ISO 8601 datetime string from date (DD/MM/YYYY) and time (HH:mm).
 * Returns e.g. "2026-03-10T09:00:00-03:00"
 */
function buildIsoDatetime(dateStr: string, timeStr: string): string | null {
  try {
    const [day, month, year] = dateStr.split("/");
    if (!day || !month || !year) return null;
    const [hour, minute] = timeStr.split(":");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${(hour || "00").padStart(2, "0")}:${(minute || "00").padStart(2, "0")}:00-03:00`;
  } catch {
    return null;
  }
}

function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length <= 11) {
    digits = "55" + digits;
  }
  return digits;
}

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

async function saveSubscriberId(whatsapp: string, subscriberId: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("leads")
    .update({ manychat_subscriber_id: subscriberId })
    .eq("whatsapp", whatsapp);
  if (error) {
    console.warn("[ManyChat] Failed to save subscriber_id to DB:", error);
  } else {
    console.log(`[ManyChat] Saved subscriber_id ${subscriberId} for ${whatsapp}`);
  }
}

async function getSubscriberIdFromDb(whatsapp: string): Promise<string | null> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("leads")
    .select("manychat_subscriber_id")
    .eq("whatsapp", whatsapp)
    .not("manychat_subscriber_id", "is", null)
    .limit(1)
    .maybeSingle();
  if (data?.manychat_subscriber_id) return data.manychat_subscriber_id;
  return null;
}

async function getCustomFieldId(fieldName: string, apiToken: string): Promise<number | null> {
  const data = await mcGet("page/getCustomFields", apiToken);
  if (!data?.data) {
    console.warn("[ManyChat] Failed to fetch custom fields:", JSON.stringify(data).substring(0, 300));
    return null;
  }
  const field = data.data.find((f: { name: string; id: number }) =>
    f.name.toLowerCase() === fieldName.toLowerCase()
  );
  if (field) {
    console.log(`[ManyChat] Custom field "${fieldName}" → field_id=${field.id}`);
  } else {
    console.warn(`[ManyChat] Custom field "${fieldName}" not found. Available: ${data.data.map((f: { name: string }) => f.name).join(", ")}`);
  }
  return field?.id ?? null;
}

/**
 * Sync system fields (first_name, last_name, email, phone) via updateSubscriber
 */
async function syncSystemFields(
  subscriberId: string,
  leadData: LeadFields,
  whatsapp: string,
  apiToken: string
): Promise<void> {
  const payload: Record<string, unknown> = { subscriber_id: subscriberId };
  if (leadData.nome) payload.first_name = leadData.nome;
  if (leadData.sobrenome) payload.last_name = leadData.sobrenome;
  if (leadData.email) {
    payload.email = leadData.email;
    payload.has_opt_in_email = true;
  }
  // NOTE: Do NOT send phone/has_opt_in_sms here — phone was already set during createSubscriber
  // Sending phone requires consent_phrase which causes the entire updateSubscriber to fail

  console.log(`[ManyChat] updateSubscriber for ${subscriberId}:`, JSON.stringify(payload));
  try {
    const res = await mcPost("subscriber/updateSubscriber", payload, apiToken);
    if (res?.status !== "success") {
      console.warn(`[ManyChat] updateSubscriber failed:`, JSON.stringify(res));
    } else {
      console.log(`[ManyChat] System fields synced for ${subscriberId}`);
    }
  } catch (err) {
    console.warn(`[ManyChat] Error in updateSubscriber:`, err);
  }
  await sleep(250);
}

async function setAllCustomFields(
  subscriberId: string,
  leadData: LeadFields,
  apiToken: string,
  whatsapp?: string
): Promise<void> {
  // 1. Sync system fields first (nome, sobrenome, email, phone)
  if (whatsapp) {
    await syncSystemFields(subscriberId, leadData, whatsapp, apiToken);
  }

  // 2. Fetch all custom field IDs once (cache for this call)
  const allFieldsData = await mcGet("page/getCustomFields", apiToken);
  const fieldIdCache: Record<string, number> = {};
  if (allFieldsData?.data) {
    for (const f of allFieldsData.data) {
      fieldIdCache[f.name.toLowerCase()] = f.id;
    }
    console.log(`[ManyChat] Loaded ${Object.keys(fieldIdCache).length} custom field IDs`);
  } else {
    console.error("[ManyChat] Failed to load custom fields, cannot set values");
    return;
  }

  // 3. Set custom fields using field_id (NOT field_name) for WhatsApp compatibility
  console.log("[ManyChat] Setting fields for subscriber:", subscriberId, "keys:", Object.keys(leadData).join(", "));
  for (const [ourKey, fieldName] of Object.entries(CUSTOM_FIELD_MAP)) {
    const value = leadData[ourKey as keyof LeadFields];
    if (!value) {
      console.log(`[ManyChat] Skipping field ${ourKey} (${fieldName}): no value`);
      continue;
    }

    const fieldId = fieldIdCache[fieldName.toLowerCase()];
    if (!fieldId) {
      console.warn(`[ManyChat] Field "${fieldName}" not found in custom fields, skipping`);
      continue;
    }

    console.log(`[ManyChat] Setting field ${fieldName} (id=${fieldId}) = ${value}`);
    try {
      const res = await mcPost("subscriber/setCustomField", {
        subscriber_id: subscriberId,
        field_id: fieldId,
        field_value: String(value),
      }, apiToken);
      console.log(`[ManyChat] setCustomField ${fieldName} result:`, JSON.stringify(res));
    } catch (err) {
      console.warn(`[ManyChat] Error setting ${fieldName}:`, err);
    }
    await sleep(250);
  }

  // Set combined datetime field for ManyChat triggers
  if (leadData.data_reuniao && leadData.horario_reuniao) {
    const isoDatetime = buildIsoDatetime(leadData.data_reuniao, leadData.horario_reuniao);
    if (isoDatetime) {
      const dtFieldId = fieldIdCache["horário da reunião datetime"];
      if (dtFieldId) {
        console.log(`[ManyChat] Setting Horário da Reunião Datetime (id=${dtFieldId}) = ${isoDatetime}`);
        try {
          const res = await mcPost("subscriber/setCustomField", {
            subscriber_id: subscriberId,
            field_id: dtFieldId,
            field_value: isoDatetime,
          }, apiToken);
          console.log(`[ManyChat] setCustomField Datetime result:`, JSON.stringify(res));
        } catch (err) {
          console.warn(`[ManyChat] Error setting Horário da Reunião Datetime:`, err);
        }
      } else {
        console.warn(`[ManyChat] Field "Horário da Reunião Datetime" not found. Available: ${Object.keys(fieldIdCache).join(", ")}`);
      }
    }
  }

  console.log("[ManyChat] All fields set for subscriber:", subscriberId);
}

async function mcPost(endpoint: string, body: Record<string, unknown>, apiToken: string) {
  const res = await fetch(`${MANYCHAT_API}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { console.warn("[ManyChat] Non-JSON response:", text.substring(0, 200)); return { status: "error", message: "Non-JSON response" }; }
}

async function mcGet(endpoint: string, apiToken: string) {
  const res = await fetch(`${MANYCHAT_API}/${endpoint}`, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { console.warn("[ManyChat] Non-JSON response:", text.substring(0, 200)); return { status: "error", message: "Non-JSON response" }; }
}

async function getTagId(tagName: string, apiToken: string): Promise<number | null> {
  const data = await mcGet("page/getTags", apiToken);
  if (!data?.data) {
    console.error("[ManyChat] Failed to fetch tags:", JSON.stringify(data));
    return null;
  }
  console.log("[ManyChat] Available tags:", data.data.map((t: { name: string }) => t.name).join(", "));
  const normalize = (s: string) => s.toLowerCase().replace(/[\s_-]/g, "");
  const tag = data.data.find(
    (t: { name: string; id: number }) => normalize(t.name) === normalize(tagName)
  );
  if (!tag) {
    console.error(`[ManyChat] Tag "${tagName}" not found in available tags.`);
    return null;
  }
  return tag.id;
}

function extractSubscriberId(data: Record<string, unknown>): string | null {
  if (!data?.data) return null;
  const d = data.data as Record<string, unknown>;
  if (Array.isArray(d) && d.length > 0) return String((d[0] as Record<string, unknown>).id);
  if (d.id) return String(d.id);
  return null;
}

/**
 * Find or create subscriber. When isPrimary=true, saves subscriber_id to DB and uses DB cache.
 * For secondary tokens, skip DB operations since each ManyChat account has different IDs.
 */
async function findOrCreateSubscriber(
  phone: string,
  leadData: LeadFields | undefined,
  apiToken: string,
  isPrimary = true
): Promise<string | null> {
  const normalizedPhone = normalizePhone(phone);
  const email = leadData?.email;
  const label = isPrimary ? "[ManyChat]" : "[ManyChat-2]";

  // Step 0: Check DB cache (only for primary token)
  if (isPrimary) {
    const cachedId = await getSubscriberIdFromDb(phone);
    if (cachedId) {
      console.log(`${label} Step 0: Found cached subscriber_id in DB: ${cachedId} for ${phone}`);
      return cachedId;
    }
  }

  // Step 1: Try findBySystemField
  // For secondary (WhatsApp-only) accounts, search by phone instead of email
  if (!isPrimary) {
    // Try phone system field first (with + prefix)
    const phoneWithPlus = "+" + normalizedPhone;
    console.log(`${label} Step 1: findBySystemField phone=${phoneWithPlus}`);
    const phoneData = await mcGet(
      `subscriber/findBySystemField?field_name=phone&field_value=${encodeURIComponent(phoneWithPlus)}`,
      apiToken
    );
    console.log(`${label} Step 1 result:`, JSON.stringify(phoneData).substring(0, 300));
    const subId = extractSubscriberId(phoneData);
    if (subId) {
      console.log(`${label} Found by phone: ${phoneWithPlus} → ${subId}`);
      return subId;
    }
    // Also try email system field
    if (email) {
      console.log(`${label} Step 1b: findBySystemField email=${email}`);
      const emailData = await mcGet(
        `subscriber/findBySystemField?field_name=email&field_value=${encodeURIComponent(email)}`,
        apiToken
      );
      console.log(`${label} Step 1b result:`, JSON.stringify(emailData).substring(0, 300));
      const emailSubId = extractSubscriberId(emailData);
      if (emailSubId) {
        console.log(`${label} Found by email: ${email} → ${emailSubId}`);
        return emailSubId;
      }
    }
  } else if (email) {
    console.log(`${label} Step 1: findBySystemField email=${email}`);
    const emailData = await mcGet(
      `subscriber/findBySystemField?field_name=email&field_value=${encodeURIComponent(email)}`,
      apiToken
    );
    console.log(`${label} Step 1 result:`, JSON.stringify(emailData).substring(0, 300));
    const subId = extractSubscriberId(emailData);
    if (subId) {
      console.log(`${label} Found by email: ${email} → ${subId}`);
      if (isPrimary) await saveSubscriberId(phone, subId);
      return subId;
    }
  }

  // Step 2: Try findByCustomField with dynamic field_id for Email
  if (email) {
    console.log(`${label} Step 2: findByCustomField Email=${email} (with field_id)`);
    const emailFieldId = await getCustomFieldId("Email", apiToken);
    if (emailFieldId) {
      const customEmailData = await mcGet(
        `subscriber/findByCustomField?field_id=${emailFieldId}&field_value=${encodeURIComponent(email)}`,
        apiToken
      );
      console.log(`${label} Step 2 result:`, JSON.stringify(customEmailData).substring(0, 300));
      const customSub = extractSubscriberId(customEmailData);
      if (customSub) {
        console.log(`${label} Found by custom Email field: ${email} → ${customSub}`);
        if (isPrimary) await saveSubscriberId(phone, customSub);
        return customSub;
      }
    }
  }

  // Step 3: Try to create subscriber via whatsapp_phone
  console.log(`${label} Step 3: createSubscriber for ${normalizedPhone}`);
  const createPayload: Record<string, unknown> = {
    whatsapp_phone: normalizedPhone,
    consent_phrase: "Lead from Orbit website",
    has_opt_in_email: false,
    has_opt_in_sms: false,
  };
  if (leadData?.nome) createPayload.first_name = leadData.nome;
  if (leadData?.sobrenome) createPayload.last_name = leadData.sobrenome;

  const createData = await mcPost("subscriber/createSubscriber", createPayload, apiToken);
  console.log(`${label} Step 3 result:`, JSON.stringify(createData).substring(0, 400));

  if (createData?.data?.id) {
    const subId = String(createData.data.id);
    console.log(`${label} Created new subscriber: ${subId}`);
    if (isPrimary) await saveSubscriberId(phone, subId);
    return subId;
  }

  // Step 3b: If wa_id permission denied, try creating via email (for secondary accounts)
  const createErrStr = JSON.stringify(createData);
  if (createErrStr.includes("Permission denied to import wa_id") && email) {
    console.log(`${label} Step 3b: wa_id denied, trying createSubscriber via email=${email}`);
    const emailCreatePayload: Record<string, unknown> = {
      email: email,
      has_opt_in_email: true,
      has_opt_in_sms: false,
      consent_phrase: "Lead from Orbit website",
    };
    if (leadData?.nome) emailCreatePayload.first_name = leadData.nome;
    if (leadData?.sobrenome) emailCreatePayload.last_name = leadData.sobrenome;

    const emailCreateData = await mcPost("subscriber/createSubscriber", emailCreatePayload, apiToken);
    console.log(`${label} Step 3b result:`, JSON.stringify(emailCreateData).substring(0, 400));

    if (emailCreateData?.data?.id) {
      const subId = String(emailCreateData.data.id);
      console.log(`${label} Created subscriber via email: ${subId}`);
      // Set phone as custom field since we couldn't use whatsapp_phone
      const phoneFieldId = await getCustomFieldId("Phone", apiToken);
      if (phoneFieldId) {
        await mcPost("subscriber/setCustomField", {
          subscriber_id: subId,
          field_id: phoneFieldId,
          field_value: normalizedPhone,
        }, apiToken);
        console.log(`${label} Set phone custom field for ${subId}`);
      }
      return subId;
    }

    // If email creation also says "already exists", fall through to Step 4
    const emailErrStr = JSON.stringify(emailCreateData);
    console.log(`${label} Step 3b: email creation also failed:`, emailErrStr.substring(0, 300));
  }

  // Step 4: "already exists" — extract wa_id, try findByCustomField with other fields
  const errStr = JSON.stringify(createData);
  const waIdMatch = errStr.match(/already exists: (\d+)/);
  if (waIdMatch) {
    const waId = waIdMatch[1];
    console.log(`${label} Step 4: "already exists" with wa_id=${waId}`);

    // 4a: Try findByCustomField with Empresa
    if (email) {
      const empresaFieldId = await getCustomFieldId("Empresa", apiToken);
      if (empresaFieldId && leadData?.empresa) {
        console.log(`${label} Step 4a: findByCustomField Empresa=${leadData.empresa}`);
        const empresaData = await mcGet(
          `subscriber/findByCustomField?field_id=${empresaFieldId}&field_value=${encodeURIComponent(leadData.empresa)}`,
          apiToken
        );
        console.log(`${label} Step 4a result:`, JSON.stringify(empresaData).substring(0, 300));
        const empSub = extractSubscriberId(empresaData);
        if (empSub) {
          console.log(`${label} Found by Empresa: ${leadData.empresa} → ${empSub}`);
          if (isPrimary) await saveSubscriberId(phone, empSub);
          return empSub;
        }
      }
    }

    // 4b: Try findBySystemField phone with the wa_id
    if (waId !== normalizedPhone) {
      console.log(`${label} Step 4b: findBySystemField phone=+${waId}`);
      const waPhoneData = await mcGet(
        `subscriber/findBySystemField?field_name=phone&field_value=${encodeURIComponent("+" + waId)}`,
        apiToken
      );
      console.log(`${label} Step 4b result:`, JSON.stringify(waPhoneData).substring(0, 300));
      const waPhoneSub = extractSubscriberId(waPhoneData);
      if (waPhoneSub) {
        console.log(`${label} Found via wa_id phone lookup: ${waPhoneSub}`);
        if (isPrimary) await saveSubscriberId(phone, waPhoneSub);
        return waPhoneSub;
      }
    }

    // 4c: For secondary accounts, try getInfo with the wa_id directly
    if (!isPrimary) {
      console.log(`${label} Step 4c: trying subscriber/getInfo with id=${waId}`);
      const infoData = await mcPost("subscriber/getInfo", { subscriber_id: waId }, apiToken);
      if (infoData?.data?.id) {
        const subId = String(infoData.data.id);
        console.log(`${label} Found via getInfo: ${subId}`);
        return subId;
      }
    }
  }

  console.error(`${label} FAILED: Could not find/create subscriber:`, phone, email);
  return null;
}

async function applyTag(subscriberId: string, tagId: number, apiToken: string): Promise<boolean> {
  const data = await mcPost("subscriber/addTag", {
    subscriber_id: subscriberId,
    tag_id: tagId,
  }, apiToken);
  console.log("[ManyChat] addTag:", JSON.stringify(data));
  return data?.status === "success";
}

function buildLeadData(lead: Record<string, unknown>): LeadFields {
  return {
    nome: lead.nome as string,
    sobrenome: lead.sobrenome as string,
    email: lead.email as string,
    empresa: lead.empresa as string,
    oque_faz: lead.oque_faz as string,
    cargo: lead.cargo as string,
    faturamento: lead.faturamento as string,
    funcionarios: lead.funcionarios as string,
    prioridade: lead.prioridade as string,
    data_reuniao: lead.data_reuniao as string,
    horario_reuniao: lead.horario_reuniao as string,
    software_gestao: lead.software_gestao as string,
    utm_source: lead.utm_source as string,
    utm_medium: lead.utm_medium as string,
    utm_campaign: lead.utm_campaign as string,
    status_reuniao: lead.status_reuniao as string,
  };
}

// ==========================================
// DUAL-TOKEN: Run action for a single token
// ==========================================

async function runTagAction(
  body: TagRequest,
  apiToken: string,
  isPrimary: boolean
): Promise<{ success: boolean; subscriber_id?: string; tags_removed?: string[] }> {
  const label = isPrimary ? "[MC1]" : "[MC2]";

  if (!body.whatsapp || !body.tag_name) {
    return { success: false };
  }

  const tagId = await getTagId(body.tag_name, apiToken);
  if (!tagId) return { success: false };

  const subscriberId = await findOrCreateSubscriber(body.whatsapp, body.lead_data, apiToken, isPrimary);
  if (!subscriberId) return { success: false };

  const CONFLICTING_TAGS: Record<string, string[]> = {
    "agendou-reuniao": ["nao-respondeu-chat-demonstracao", "nao-entrou-na-reuniao", "recusou-participacao"],
    "nao-entrou-na-reuniao": ["agendou-reuniao", "participou-reuniao", "nao-respondeu-chat-demonstracao"],
    "participou-reuniao": ["agendou-reuniao", "nao-entrou-na-reuniao", "nao-respondeu-chat-demonstracao"],
    "negociacoes-iniciadas": ["nao-respondeu-chat-demonstracao"],
    "propostas": ["nao-respondeu-chat-demonstracao"],
    "testando-pre-analise": ["nao-respondeu-chat-demonstracao"],
    "confirmou-participacao": ["nao-respondeu-chat-demonstracao"],
  };
  const tagsToRemove = CONFLICTING_TAGS[body.tag_name] || [];
  for (const conflictTag of tagsToRemove) {
    const conflictTagId = await getTagId(conflictTag, apiToken);
    if (conflictTagId) {
      const removeResult = await mcPost("subscriber/removeTag", {
        subscriber_id: subscriberId,
        tag_id: conflictTagId,
      }, apiToken);
      console.log(`${label} Removed conflicting tag "${conflictTag}":`, JSON.stringify(removeResult));
    }
  }

  if (body.lead_data) {
    await setAllCustomFields(subscriberId, body.lead_data, apiToken, body.whatsapp);
  }
  const success = await applyTag(subscriberId, tagId, apiToken);
  console.log(`${label} Tag "${body.tag_name}" applied: ${success}`);

  return { success, subscriber_id: subscriberId, tags_removed: tagsToRemove };
}

async function runBatchTagExisting(
  body: TagRequest,
  apiToken: string,
  isPrimary: boolean
): Promise<{ tagged: number; failed: number; errors: string[]; batch_size: number; offset: number; next_offset: number }> {
  const label = isPrimary ? "[MC1-Batch]" : "[MC2-Batch]";
  const supabase = getSupabase();
  const batchLimit = body.limit || 20;
  const batchOffset = body.offset || 0;

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .range(batchOffset, batchOffset + batchLimit - 1);

  if (error) {
    return { tagged: 0, failed: 0, errors: [String(error)], batch_size: 0, offset: batchOffset, next_offset: batchOffset };
  }

  const tagNames = [
    "agendou-reuniao",
    "nao-respondeu-chat-demonstracao",
    "confirmou-participacao",
    "nao-entrou-na-reuniao",
    "participou-reuniao",
  ];
  const tagIds: Record<string, number | null> = {};
  for (const name of tagNames) {
    tagIds[name] = await getTagId(name, apiToken);
    console.log(`${label} Tag "${name}" → ID: ${tagIds[name]}`);
  }

  let tagged = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const lead of leads || []) {
    console.log(`${label} ${lead.nome} | ${lead.whatsapp} | ${lead.email} | status=${lead.status}`);

    const leadData = buildLeadData(lead);
    const subscriberId = await findOrCreateSubscriber(lead.whatsapp, leadData, apiToken, isPrimary);
    if (!subscriberId) {
      failed++;
      errors.push(`Not found: ${lead.whatsapp} / ${lead.email}`);
      await sleep(300);
      continue;
    }

    const tagsToApply: string[] = [];
    if (lead.status === "completo") {
      tagsToApply.push("agendou-reuniao");
    } else {
      tagsToApply.push("nao-respondeu-chat-demonstracao");
    }
    if (lead.confirmou_participacao) {
      tagsToApply.push("confirmou-participacao");
    }
    if (lead.status_reuniao === "nao_entrou") {
      tagsToApply.push("nao-entrou-na-reuniao");
    }
    if (lead.status_reuniao === "participou") {
      tagsToApply.push("participou-reuniao");
    }

    await setAllCustomFields(subscriberId, leadData, apiToken, lead.whatsapp);

    let allSuccess = true;
    for (const tagName of tagsToApply) {
      const tid = tagIds[tagName];
      if (!tid) continue;
      const ok = await applyTag(subscriberId, tid, apiToken);
      if (!ok) {
        allSuccess = false;
        errors.push(`Tag "${tagName}" failed: ${lead.whatsapp}`);
      }
    }

    if (allSuccess) tagged++; else failed++;
    await sleep(300);
  }

  return {
    tagged,
    failed,
    errors: errors.slice(0, 20),
    batch_size: leads?.length || 0,
    offset: batchOffset,
    next_offset: batchOffset + (leads?.length || 0),
  };
}

async function runSyncFromPipedrive(
  body: TagRequest,
  apiToken: string,
  isPrimary: boolean
): Promise<{ synced: number; failed: number; errors: string[]; results: { nome: string; stage: string; tag: string }[]; batch_size: number; offset: number; next_offset: number }> {
  const label = isPrimary ? "[MC1-Sync]" : "[MC2-Sync]";
  const pipedriveToken = Deno.env.get("PIPEDRIVE_API_TOKEN");
  if (!pipedriveToken) {
    return { synced: 0, failed: 0, errors: ["PIPEDRIVE_API_TOKEN not configured"], results: [], batch_size: 0, offset: 0, next_offset: 0 };
  }

  const supabase = getSupabase();
  const batchLimit = body.limit || 20;
  const batchOffset = body.offset || 0;

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .not("pipedrive_deal_id", "is", null)
    .order("created_at", { ascending: false })
    .range(batchOffset, batchOffset + batchLimit - 1);

  if (error) {
    return { synced: 0, failed: 0, errors: [String(error)], results: [], batch_size: 0, offset: batchOffset, next_offset: batchOffset };
  }

  const STAGE_TAG_MAP: Record<string, string> = {
    "reuniao agendada": "agendou-reuniao",
    "nao entrou na reuniao": "nao-entrou-na-reuniao",
    "participou reuniao grupo": "participou-reuniao",
    "negociacoes iniciadas": "negociacoes-iniciadas",
    "propostas": "propostas",
    "testando pre analise": "testando-pre-analise",
  };

  const normalizeStage = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

  const stageCache: Record<number, string | null> = {};
  let synced = 0;
  let failed = 0;
  const errors: string[] = [];
  const results: { nome: string; stage: string; tag: string }[] = [];

  for (const lead of leads || []) {
    try {
      const dealId = lead.pipedrive_deal_id;
      console.log(`${label} Processing ${lead.nome} | deal=${dealId}`);

      const dealRes = await fetch(
        `https://api.pipedrive.com/v1/deals/${dealId}?api_token=${pipedriveToken}`
      );
      const dealData = await dealRes.json();
      const stageId = dealData?.data?.stage_id;

      if (!stageId) {
        failed++;
        errors.push(`No stage: ${lead.nome} (deal ${dealId})`);
        await sleep(300);
        continue;
      }

      if (!(stageId in stageCache)) {
        const stageRes = await fetch(
          `https://api.pipedrive.com/v1/stages/${stageId}?api_token=${pipedriveToken}`
        );
        const stageData = await stageRes.json();
        stageCache[stageId] = stageData?.data?.name || null;
      }

      const stageName = stageCache[stageId];
      if (!stageName) {
        failed++;
        errors.push(`Stage name not found: ${lead.nome} (stage ${stageId})`);
        await sleep(300);
        continue;
      }

      const normalized = normalizeStage(stageName);
      const tagName = STAGE_TAG_MAP[normalized];

      if (!tagName) {
        console.log(`${label} Stage "${stageName}" not mapped, skipping ${lead.nome}`);
        await sleep(200);
        continue;
      }

      const leadData = buildLeadData(lead);
      const subscriberId = await findOrCreateSubscriber(lead.whatsapp, leadData, apiToken, isPrimary);
      if (!subscriberId) {
        failed++;
        errors.push(`Subscriber not found: ${lead.nome} (${lead.whatsapp})`);
        await sleep(300);
        continue;
      }

      const tagId = await getTagId(tagName, apiToken);
      if (!tagId) {
        failed++;
        errors.push(`Tag "${tagName}" not found in ManyChat`);
        await sleep(300);
        continue;
      }

      const ok = await applyTag(subscriberId, tagId, apiToken);
      await setAllCustomFields(subscriberId, leadData, apiToken, lead.whatsapp);

      if (ok) {
        synced++;
        results.push({ nome: lead.nome, stage: stageName, tag: tagName });
      } else {
        failed++;
        errors.push(`Tag failed: ${lead.nome} → ${tagName}`);
      }

      await sleep(300);
    } catch (err) {
      failed++;
      errors.push(`Error: ${lead.nome} → ${String(err)}`);
    }
  }

  return {
    synced,
    failed,
    errors: errors.slice(0, 20),
    results: results.slice(0, 50),
    batch_size: leads?.length || 0,
    offset: batchOffset,
    next_offset: batchOffset + (leads?.length || 0),
  };
}

// ==========================================
// Parallel wrapper for secondary token (MUST be awaited)
// ==========================================
async function runForSecondaryToken(
  action: string,
  body: TagRequest,
  apiToken2: string
): Promise<void> {
  try {
    console.log("[MC2] Starting mirror for action:", action);
    if (action === "tag") {
      await runTagAction(body, apiToken2, false);
    } else if (action === "batch-tag-existing") {
      await runBatchTagExisting(body, apiToken2, false);
    } else if (action === "sync-from-pipedrive") {
      await runSyncFromPipedrive(body, apiToken2, false);
    }
    console.log("[MC2] Mirror completed for action:", action);
  } catch (err) {
    console.error("[MC2] Mirror FAILED for action:", action, err);
  }
}

// ==========================================
// MAIN HANDLER
// ==========================================
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get("MANYCHAT_API_TOKEN");
    if (!apiToken) {
      return new Response(JSON.stringify({ error: "MANYCHAT_API_TOKEN not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiToken2 = Deno.env.get("MANYCHAT_API_TOKEN_2");
    if (!apiToken2) {
      console.warn("[ManyChat] MANYCHAT_API_TOKEN_2 not configured — skipping secondary account");
    }

    const body: TagRequest = await req.json();

    // ---- ACTION: sync-from-pipedrive ----
    if (body.action === "sync-from-pipedrive") {
      const pipedriveToken = Deno.env.get("PIPEDRIVE_API_TOKEN");
      if (!pipedriveToken) {
        return new Response(JSON.stringify({ error: "PIPEDRIVE_API_TOKEN not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const [result] = await Promise.all([
        runSyncFromPipedrive(body, apiToken, true),
        apiToken2 ? runForSecondaryToken("sync-from-pipedrive", body, apiToken2) : Promise.resolve(),
      ]);
      return new Response(
        JSON.stringify({ success: true, ...result }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ---- ACTION: batch-tag-existing ----
    if (body.action === "batch-tag-existing") {
      const [result] = await Promise.all([
        runBatchTagExisting(body, apiToken, true),
        apiToken2 ? runForSecondaryToken("batch-tag-existing", body, apiToken2) : Promise.resolve(),
      ]);
      return new Response(
        JSON.stringify({ success: true, ...result }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ---- ACTION: tag ----
    if (body.action === "tag") {
      if (!body.whatsapp || !body.tag_name) {
        return new Response(JSON.stringify({ error: "whatsapp and tag_name required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const [result] = await Promise.all([
        runTagAction(body, apiToken, true),
        apiToken2 ? runForSecondaryToken("tag", body, apiToken2) : Promise.resolve(),
      ]);
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ---- ACTION: list-tags ----
    if (body.action === "list-tags") {
      const data = await mcGet("page/getTags", apiToken);
      return new Response(
        JSON.stringify({ tags: data?.data || [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[tag-manychat] Error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

```

### trigger-n8n-call/index.ts

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const N8N_URL = "https://webhook.rodriguinhodomarketing.com.br/webhook/salva-supabase";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { lead_name, lead_phone, call_datetime, subscriber_id, deal_id, link_reuniao, vendedor_phone, vendedor_name } = body;

    if (!lead_name || !lead_phone || !call_datetime) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = {
      lead_name,
      lead_phone,
      call_datetime,
      subscriber_id: subscriber_id ?? null,
      deal_id: deal_id ?? null,
      link_reuniao: link_reuniao ?? "https://meet.google.com/qpy-himp-cxj",
      vendedor_phone: vendedor_phone ?? "+5519266029722",
      vendedor_name: vendedor_name ?? "Olivia",
    };

    console.log("[trigger-n8n-call] Sending to n8n:", JSON.stringify(payload));

    const res = await fetch(N8N_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log(`[trigger-n8n-call] n8n response: ${res.status} ${text}`);

    if (!res.ok) {
      console.error(`[trigger-n8n-call] n8n returned non-2xx: ${res.status} ${text}`);
      return new Response(JSON.stringify({ ok: false, status: res.status, response: text }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, status: res.status, response: text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[trigger-n8n-call] Error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

```

---

## 2. SECRETS / ENVIRONMENT VARIABLES

| Nome Exato da Secret | Onde é usada | Tipo |
|---|---|---|
| `PIPEDRIVE_API_TOKEN` | create-pipedrive-lead, assign-pipedrive-owner, get-pipedrive-owners, pipedrive-webhook, tag-manychat | API Token |
| `MANYCHAT_API_TOKEN` | tag-manychat, pipedrive-webhook, manychat-webhook | API Token (conta primária) |
| `MANYCHAT_API_TOKEN_2` | tag-manychat | API Token (conta secundária, mirror) |
| `RESEND_API_KEY` | send-calendar-invite | API Key |
| `OPENAI_API_KEY` | confirmation-call (TTS) | API Key |
| `TWILIO_API_KEY` | confirmation-call | Connection API Key (managed by connector) |
| `TWILIO_PHONE_NUMBER` | confirmation-call | Número origem das ligações |
| `LOVABLE_API_KEY` | confirmation-call (AI gateway + Twilio gateway) | Platform Key |
| `ELEVENLABS_API_KEY` | Não usada atualmente no código | API Key |
| `AgenteElevenLabs` | Não usada atualmente no código | Agent ID |
| `SUPABASE_URL` | Todas as funções (auto-provisionada) | URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Todas as funções (auto-provisionada) | Secret Key |
| `SUPABASE_PUBLISHABLE_KEY` | Auto-provisionada | Anon Key |
| `SUPABASE_ANON_KEY` | Auto-provisionada | Anon Key |
| `SUPABASE_DB_URL` | Auto-provisionada | DB Connection String |

**Observações importantes:**
- Os valores das secrets são sensíveis e não podem ser exibidos. Você precisará recriar cada uma no novo ambiente.
- `TWILIO_API_KEY` é gerenciada pelo conector Twilio do Lovable — no novo Supabase, configure manualmente com Account SID + Auth Token.
- `LOVABLE_API_KEY` é exclusiva da plataforma Lovable — no novo Supabase, substitua as chamadas ao AI gateway (`ai.gateway.lovable.dev`) e ao Twilio gateway (`connector-gateway.lovable.dev/twilio`) por chamadas diretas às APIs do OpenAI e Twilio.

**URLs hardcoded no código:**
- **Make.com webhook:** `https://hook.us1.make.com/dcqw8dhq4lngw8vsgcv3cdfdl2d7pfem`
- **n8n webhook:** `https://webhook.rodriguinhodomarketing.com.br/webhook/salva-supabase`
- **CRM externo:** `https://cvanwvoddchatcdstwry.supabase.co/functions/v1/crm-webform-submit` (form_id: `b84131b3-feff-4766-bff6-7d8c6d3dd2c8`)
- **Email remetente (Resend):** `Orbit Gestão <demonstracao@orbitgestao.com.br>`

---

## 3. MAPEAMENTO DOS CUSTOM FIELDS DO PIPEDRIVE

**IMPORTANTE:** Os hashes dos custom fields são gerados automaticamente pelo Pipedrive e são **únicos por conta**. O código usa `ensureCustomField()` que **busca pelo nome** e cria o campo se não existir. Portanto, os hashes abaixo são específicos desta conta e serão diferentes na nova.

### Custom Fields usados no código (buscados por nome via ensureCustomField):

| Campo (nome no Pipedrive) | Entidade | Tipo | Usado em |
|---|---|---|---|
| `Cargo` | personFields | varchar | create-pipedrive-lead |
| `Ramo de Atividade` | personFields | varchar | create-pipedrive-lead (= Segmento) |
| `Qual o faturamento ?` | dealFields | varchar | create-pipedrive-lead (update) |
| `Prioridade` | dealFields | varchar | create-pipedrive-lead (update) |
| `Data Reunião` | dealFields | varchar | create-pipedrive-lead (update/reschedule/repair) |
| `UTM Source` | dealFields | varchar | create-pipedrive-lead |
| `UTM Medium` | dealFields | varchar | create-pipedrive-lead |
| `UTM Campaign` | dealFields | varchar | create-pipedrive-lead |
| `UTM Content` | dealFields | varchar | create-pipedrive-lead |
| `UTM Term` | dealFields | varchar | create-pipedrive-lead |
| `GCLID` | dealFields | varchar | create-pipedrive-lead |
| `FBCLID` | dealFields | varchar | create-pipedrive-lead |
| `Landing Page` | dealFields | varchar | create-pipedrive-lead |
| `Origin Page` | dealFields | varchar | create-pipedrive-lead |

### Custom Field com hash fixo (hardcoded):

| Campo | Hash | Entidade |
|---|---|---|
| `Faixa de Funcionários` | `e3aa6db84dfdf3594d0f75c3aa36b6c6a82a426f` | dealFields |

**⚠️ ATENÇÃO:** Este hash é da conta Pipedrive atual. Na nova conta, você precisa:
1. Criar o campo "Faixa de Funcionários" manualmente no Pipedrive
2. Obter o novo hash via API (`GET /dealFields`)
3. Atualizar a linha 480 de `create-pipedrive-lead/index.ts`

---

## 4. IDs DOS STAGES DO PIPELINE

**Pipeline:** `Orbit` (buscado dinamicamente por nome via `findPipelineByName()`)

O código **NÃO usa IDs numéricos fixos** — busca stages por nome com normalização de acentos. Os stages mapeados são:

| Stage (nome esperado) | Tag ManyChat | Status DB |
|---|---|---|
| Primeiro stage (order_nr menor) | — | Lead Novo (estado inicial) |
| `Reunião Agendada` | `agendou-reuniao` | `reuniao_agendada` |
| `Não Entrou na Reunião` | `nao-entrou-na-reuniao` | `nao_entrou` |
| `Participou Reunião Grupo` | `participou-reuniao` | `participou` |
| `Negociações Iniciadas` | `negociacoes-iniciadas` | `negociacoes_iniciadas` |
| `Propostas` | `propostas` | `propostas` |
| `Testando Pré Análise` | `testando-pre-analise` | `testando_pre_analise` |

**Para recriar no novo Pipedrive:**
1. Crie o pipeline "Orbit"
2. Crie os stages acima na ordem desejada
3. O código encontrará automaticamente pelos nomes

---

## 5. VENDEDORES NO ROUND-ROBIN

O `assign-pipedrive-owner` usa uma lista **hardcoded** de e-mails para o round-robin:

```typescript
const ROLETA_VENDEDORES = [
  "gisele.rocha@templum.com.br",
  "pedro.maia@evolutto.com",
  "thayane.duarte@evolutto.com",
];
```

| # | E-mail | Nome (inferido) |
|---|---|---|
| 0 | gisele.rocha@templum.com.br | Gisele |
| 1 | pedro.maia@evolutto.com | Pedro |
| 2 | thayane.duarte@evolutto.com | Thayane |

**Observações:**
- Gabriel **NÃO** está na roleta atual do `assign-pipedrive-owner`
- O round-robin usa a tabela `roleta_counter` (id=1) para manter o índice atual
- Os User IDs do Pipedrive são resolvidos dinamicamente buscando o e-mail na lista de usuários (`GET /users`)

**Tabela `roleta_counter`:**
```sql
CREATE TABLE public.roleta_counter (
  id integer NOT NULL DEFAULT 1 PRIMARY KEY,
  current_index integer NOT NULL DEFAULT 0
);
-- Inserir registro inicial:
INSERT INTO roleta_counter (id, current_index) VALUES (1, 0);
```

---

## 6. SCHEMA COMPLETO DA TABELA `leads`

```sql
CREATE TABLE public.leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  sobrenome text DEFAULT ''::text,
  whatsapp text NOT NULL,
  email text NOT NULL,
  empresa text NOT NULL,
  oque_faz text DEFAULT ''::text,
  cargo text DEFAULT ''::text,
  faturamento text DEFAULT ''::text,
  funcionarios text DEFAULT ''::text,
  prioridade text DEFAULT ''::text,
  data_reuniao text DEFAULT ''::text,
  horario_reuniao text DEFAULT ''::text,
  created_at timestamptz NOT NULL DEFAULT now(),
  pipedrive_person_id integer,
  pipedrive_org_id integer,
  pipedrive_deal_id integer,
  status text NOT NULL DEFAULT 'parcial'::text,
  copy_variant text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  gclid text,
  fbclid text,
  gbraid text,
  wbraid text,
  ttclid text,
  gad_campaignid text,
  gad_source text,
  msclkid text,
  li_fat_id text,
  sck text,
  landing_page text,
  origin_page text,
  session_attributes_encoded text,
  apex_session_id text,
  software_gestao text,
  reschedule_token text,
  confirmou_participacao boolean NOT NULL DEFAULT false,
  status_reuniao text,
  manychat_subscriber_id text,
  etapa_pipedrive text,
  lembrete_enviado boolean NOT NULL DEFAULT false,
  deseja_contato_vendedor boolean,
  nps integer,
  ligacao_agendada boolean NOT NULL DEFAULT false,
  ligacao_confirmacao_enviada boolean NOT NULL DEFAULT false,
  link_reuniao text
);

-- RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update leads" ON public.leads FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can read leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete leads" ON public.leads FOR DELETE TO authenticated USING (true);
CREATE POLICY "Anon can read leads by email" ON public.leads FOR SELECT TO anon USING (true);

-- Funções auxiliares
CREATE OR REPLACE FUNCTION public.digits_only(text)
RETURNS text LANGUAGE sql IMMUTABLE AS $$ SELECT regexp_replace($1, '\D', '', 'g') $$;

CREATE OR REPLACE FUNCTION public.find_lead_by_phone(phone_digits text)
RETURNS SETOF leads LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT * FROM leads
  WHERE length(digits_only(whatsapp)) >= 8
    AND (
      digits_only(whatsapp) LIKE '%' || phone_digits || '%'
      OR phone_digits LIKE '%' || digits_only(whatsapp) || '%'
    )
  ORDER BY created_at DESC
  LIMIT 1
$$;
```

---

## 7. TEMPLATES DE EMAIL

O `send-calendar-invite` envia UM tipo de email via Resend:

**Assunto:** `Demonstração confirmada — {date} às {time} 🚀`

**Remetente:** `Orbit Gestão <demonstracao@orbitgestao.com.br>`

**Anexo:** `demonstracao-orbit.ics` (text/calendar; method=REQUEST)

O template HTML completo está inline na função `buildEmailHTML()` dentro de `send-calendar-invite/index.ts` (linhas 65-159). O ICS é gerado pela função `generateICS()` (linhas 9-63).

**Variáveis do template:**
- `${name}` — nome do lead
- `${date}` — data formatada (DD/MM/YYYY)
- `${time}` — horário (HH:mm)
- `${meetingLink}` — link do Google Meet

**Assets referenciados no email:**
- Logo: `https://nmeuxanxjnhpdcfkdrdc.supabase.co/storage/v1/object/public/email-assets/orbit-icon.png`
  (Será necessário re-upload no novo bucket)

---

## 8. CONFIGURAÇÃO DO MANYCHAT

### Tags usadas pelo sistema

| Tag | Quando é aplicada | Conflitos (removida quando) |
|---|---|---|
| `nao-respondeu-chat-demonstracao` | 15min após lead parcial (create-pipedrive-lead) | Removida por: agendou-reuniao, participou-reuniao, etc |
| `agendou-reuniao` | Lead agenda demonstração (pipedrive-webhook stage change) | Remove: nao-respondeu, nao-entrou, recusou |
| `nao-entrou-na-reuniao` | Pipedrive move para "Não Entrou na Reunião" | Remove: agendou, participou, nao-respondeu |
| `participou-reuniao` | Pipedrive move para "Participou Reunião Grupo" | Remove: agendou, nao-entrou, nao-respondeu |
| `confirmou-participacao` | manychat-webhook action=confirmou | Remove: nao-respondeu |
| `recusou-participacao` | manychat-webhook action=recusou | — |
| `negociacoes-iniciadas` | Pipedrive stage | Remove: nao-respondeu |
| `propostas` | Pipedrive stage | Remove: nao-respondeu |
| `testando-pre-analise` | Pipedrive stage | Remove: nao-respondeu |
| `foi-falar-com-vendedor` | Lead escolhe "Falar com executivo" | — |

### Custom Fields do ManyChat

| Nome no ManyChat | Campo do Lead | Tipo |
|---|---|---|
| `Empresa` | empresa | text |
| `Segmento` | oque_faz | text |
| `Cargo` | cargo | text |
| `Faturamento` | faturamento | text |
| `Funcionarios` (sem acento) | funcionarios | text |
| `Prioridade` | prioridade | text |
| `Data Reuniao` | data_reuniao | text |
| `Horario Reuniao` | horario_reuniao | text |
| `Software Gestao` | software_gestao | text |
| `UTM Source` | utm_source | text |
| `UTM Medium` | utm_medium | text |
| `UTM Campaign` | utm_campaign | text |
| `Status Reuniao` | status_reuniao | text |
| `link_reuniao` | link_reuniao | text |
| `Horário da Reunião Datetime` | (calculado de data+hora) | datetime (ISO 8601) |
| `Email` | email | text (custom, não sistema) |

### Dual-Token (Mirror)
O sistema envia para DUAS contas ManyChat simultaneamente:
- **Primária:** `MANYCHAT_API_TOKEN` (subscriber_id salvo no DB)
- **Secundária:** `MANYCHAT_API_TOKEN_2` (best-effort, subscriber_id NÃO salvo)

---

## 9. WEBHOOK DO MAKE.COM

**URL:** `https://hook.us1.make.com/dcqw8dhq4lngw8vsgcv3cdfdl2d7pfem`

**Payload:** O registro COMPLETO do lead do banco de dados (todos os campos da tabela `leads`).

**Quando é disparado (via `sync-lead-make`):**
1. Captura inicial (nome, whatsapp, email)
2. Conclusão do agendamento
3. Solicitação de contato com executivo

**O que o cenário do Make faz:** Configurado externamente — o sistema apenas envia o JSON do lead completo. A lógica do cenário é gerenciada no Make.com.

---

## 10. N8N

**URL do webhook:** `https://webhook.rodriguinhodomarketing.com.br/webhook/salva-supabase`

**Payload esperado:**
```json
{
  "lead_name": "Nome Completo",
  "lead_phone": "+5548999999999",
  "call_datetime": "2026-04-07T14:00:00-03:00",
  "subscriber_id": "123456789" | null,
  "deal_id": 12345 | null,
  "link_reuniao": "https://meet.google.com/xxx-xxxx-xxx",
  "vendedor_phone": "+5519266029722",
  "vendedor_name": "Olivia"
}
```

**Valores padrão:**
- `vendedor_phone`: `+5519266029722` (Olívia)
- `vendedor_name`: `Olivia`
- `link_reuniao`: `https://meet.google.com/qpy-himp-cxj` (fallback)

**Batch trigger:** A função `batch-trigger-calls` roda periodicamente, busca leads com `ligacao_agendada=false` e reuniões futuras, e envia cada um ao webhook. Após sucesso, marca `ligacao_agendada=true`.

**O workflow do n8n faz:** Configuração externa (provavelmente agenda uma ligação de confirmação via telephony provider). O sistema Orbit apenas envia o payload.

---

## 11. OUTRAS TABELAS NECESSÁRIAS

Além de `leads`, você precisará recriar:

### `roleta_counter`
```sql
CREATE TABLE public.roleta_counter (
  id integer NOT NULL DEFAULT 1 PRIMARY KEY,
  current_index integer NOT NULL DEFAULT 0
);
ALTER TABLE public.roleta_counter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service can read roleta" ON public.roleta_counter FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service can update roleta" ON public.roleta_counter FOR UPDATE TO anon, authenticated USING (true);
INSERT INTO public.roleta_counter (id, current_index) VALUES (1, 0);
```

### `email_logs`
```sql
CREATE TABLE public.email_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  email_type text NOT NULL,
  recipient_email text NOT NULL,
  recipient_name text,
  lead_id uuid,
  resend_id text,
  success boolean NOT NULL DEFAULT true,
  error_message text
);
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read email_logs" ON public.email_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Service role can insert email_logs" ON public.email_logs FOR INSERT TO anon, authenticated WITH CHECK (true);
```

### `salas`, `sala_horarios`, `sala_presencas`, `diagnostic_responses`, `presentation_slides`, `vendedores`, `user_roles`
Estas tabelas também existem. Os schemas completos estão no arquivo `types.ts` já fornecido. Use-o como referência para recriar.

### Enum
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'vendedor', 'cs');
```

### Função `has_role`
```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
```

---

## 12. STORAGE BUCKETS

| Bucket | Público | Uso |
|---|---|---|
| `email-assets` | Sim | Logo do email (`orbit-icon.png`) |
| `call-audio` | Sim | MP3 temporários das ligações de confirmação (auto-cleanup em 10min) |

---

## 13. SUPABASE CONFIG (config.toml)

```toml
project_id = "nmeuxanxjnhpdcfkdrdc"

[functions]
  [functions.auth-email-hook]
    verify_jwt = false
  [functions.manychat-webhook]
    verify_jwt = false
  [functions.pipedrive-webhook]
    verify_jwt = false
  [functions.send-calendar-invite]
    verify_jwt = false
  [functions.tag-manychat]
    verify_jwt = false
  [functions.send-meeting-reminder]
    verify_jwt = false
  [functions.generate-diagnostic]
    verify_jwt = false
  [functions.submit-diagnostic]
    verify_jwt = false
  [functions.summarize-transcription]
    verify_jwt = false
  [functions.get-pipedrive-owners]
    verify_jwt = false
  [functions.trigger-n8n-call]
    verify_jwt = false
  [functions.batch-trigger-calls]
    verify_jwt = false
  [functions.confirmation-call]
    verify_jwt = false
  [functions.sync-lead-make]
    verify_jwt = false
  [functions.batch-confirmation-calls]
    verify_jwt = false
  [functions.assign-pipedrive-owner]
    verify_jwt = false

```

