import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILERSEND_KEY = Deno.env.get("MAILERSEND_API_KEY")!;
const ORBIT_URL = "https://yfpdrckyuxltvznqfqgh.supabase.co";
const ORBIT_KEY = Deno.env.get("ORBIT_SERVICE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Campaign {
  id: number;
  subject: string;
  html: string;
  from_email: string;
  from_name: string;
}

interface Contact {
  id: number;
  nome: string | null;
  email: string;
  custom_vars: Record<string, string>;
}

function renderTemplate(html: string, contact: Contact): string {
  const firstName = (contact.nome || "").split(" ")[0] || "";
  let rendered = html.replaceAll("{{nome}}", firstName);
  for (const [key, value] of Object.entries(contact.custom_vars || {})) {
    rendered = rendered.replaceAll(`{{${key}}}`, String(value));
  }
  return rendered;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { campaign_id, limit = 50 } = await req.json();
    if (!campaign_id) {
      return new Response(JSON.stringify({ error: "campaign_id required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Fetch campaign
    const campResp = await fetch(
      `${ORBIT_URL}/rest/v1/email_campaigns?id=eq.${campaign_id}&select=*`,
      { headers: { apikey: ORBIT_KEY, Authorization: `Bearer ${ORBIT_KEY}` } }
    );
    const campaigns: Campaign[] = await campResp.json();
    if (!campaigns[0]) {
      return new Response(JSON.stringify({ error: "campaign not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const campaign = campaigns[0];

    // 2. Fetch pending contacts (not sent yet)
    const contactsResp = await fetch(
      `${ORBIT_URL}/rest/v1/email_campaign_contacts?campaign_id=eq.${campaign_id}&sent=eq.false&select=id,nome,email,custom_vars&order=id&limit=${limit}`,
      { headers: { apikey: ORBIT_KEY, Authorization: `Bearer ${ORBIT_KEY}` } }
    );
    const contacts: Contact[] = await contactsResp.json();

    if (contacts.length === 0) {
      return new Response(JSON.stringify({ success: true, message: "no pending contacts", sent: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0;
    let errors = 0;

    // Send in parallel (5 at a time)
    for (let i = 0; i < contacts.length; i += 5) {
      const batch = contacts.slice(i, i + 5);
      const results = await Promise.all(
        batch.map(async (contact) => {
          const html = renderTemplate(campaign.html, contact);
          const resp = await fetch("https://api.mailersend.com/v1/email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${MAILERSEND_KEY}`,
            },
            body: JSON.stringify({
              from: { email: campaign.from_email, name: campaign.from_name },
              to: [{ email: contact.email, name: contact.nome || "" }],
              subject: campaign.subject,
              html,
            }),
          });

          const success = resp.status === 202;
          const msgId = resp.headers.get("x-message-id") || null;
          const errMsg = success ? null : `HTTP ${resp.status}`;

          // Update contact status
          await fetch(
            `${ORBIT_URL}/rest/v1/email_campaign_contacts?id=eq.${contact.id}`,
            {
              method: "PATCH",
              headers: {
                apikey: ORBIT_KEY,
                Authorization: `Bearer ${ORBIT_KEY}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
              },
              body: JSON.stringify({
                sent: success,
                sent_at: success ? new Date().toISOString() : null,
                error_message: errMsg,
                custom_vars: { ...contact.custom_vars, message_id: msgId },
              }),
            }
          );

          // Log
          await fetch(`${ORBIT_URL}/rest/v1/email_logs`, {
            method: "POST",
            headers: {
              apikey: ORBIT_KEY,
              Authorization: `Bearer ${ORBIT_KEY}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              email_type: `campaign_${campaign.id}`,
              recipient_email: contact.email,
              recipient_name: contact.nome,
              resend_id: msgId,
              success,
              error_message: errMsg,
            }),
          }).catch(() => {});

          return success;
        })
      );
      results.forEach((ok) => { if (ok) sent++; else errors++; });
      await new Promise((r) => setTimeout(r, 200));
    }

    return new Response(JSON.stringify({
      success: true,
      campaign: campaign.id,
      sent, errors,
      batch: contacts.length,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
