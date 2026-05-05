import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Hardcoded server-side - não exposto no browser
const MC = '4423653:9c0401d0a5f3ffee38883c2746df1331';
const MC_API = 'https://api.manychat.com/fb';

const TAGS: Record<string, string> = {
  'live-semanal': 'inscrito-live-semanal',
  'live-rd-consultores': 'inscrito-masterclass-qualidade',
  'live-chris': 'inscrito-masterclass-consultores',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function normalizePhone(p: string): string | null {
  const digits = (p || '').replace(/\D/g, '');
  if (!digits) return null;
  if (digits.length === 10 || digits.length === 11) return '+55' + digits;
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) return '+' + digits;
  if (digits.length >= 8) return '+' + digits;
  return null;
}

async function mcRequest(method: string, endpoint: string, body?: unknown) {
  const res = await fetch(`${MC_API}/${endpoint}`, {
    method,
    headers: { 'Authorization': `Bearer ${MC}`, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  let data: any = null;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, data };
}

async function findByName(name: string): Promise<string | null> {
  const enc = encodeURIComponent(name);
  const { status, data } = await mcRequest('GET', `subscriber/findByName?name=${enc}`);
  if (status === 200 && data?.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
    return String(data.data[0].id);
  }
  return null;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const body = await req.json();
    const { nome, email, telefone, source } = body;
    if (!nome || !telefone) {
      return new Response(JSON.stringify({ error: 'nome e telefone obrigatórios' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const phone = normalizePhone(telefone);
    if (!phone) {
      return new Response(JSON.stringify({ error: 'telefone inválido' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const tag = TAGS[source] || 'inscrito-live-semanal';
    const parts = String(nome).trim().split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');

    let subscriberId: string | null = null;

    // 1. Tenta criar
    const createPayload: Record<string, unknown> = {
      whatsapp_phone: phone,
      consent_phrase: 'Lead da Live Orbit',
      has_opt_in_email: true,
      has_opt_in_sms: false,
      first_name: firstName,
      last_name: lastName,
    };
    if (email) createPayload.email = email;

    const createRes = await mcRequest('POST', 'subscriber/createSubscriber', createPayload);
    if (createRes.status === 200 && createRes.data?.status === 'success') {
      subscriberId = String(createRes.data.data.id);
    } else {
      // 2. Se 'already exists' tenta achar pelo nome
      const errStr = JSON.stringify(createRes.data);
      if (errStr.includes('already exists')) {
        subscriberId = await findByName(nome);
      }
      if (!subscriberId) {
        return new Response(JSON.stringify({
          success: false,
          step: 'create',
          error: createRes.data,
        }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    // 3. Aplica a tag
    const tagRes = await mcRequest('POST', 'subscriber/addTagByName', {
      subscriber_id: subscriberId,
      tag_name: tag,
    });

    return new Response(JSON.stringify({
      success: tagRes.status === 200 && tagRes.data?.status === 'success',
      subscriber_id: subscriberId,
      tag,
      tag_result: tagRes.data,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'interno', details: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
