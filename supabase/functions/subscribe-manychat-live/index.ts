import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// API key vem de secret (não commitar no Git)
const MC = Deno.env.get('MANYCHAT_API_KEY') || '';
const MC_API = 'https://api.manychat.com/fb';

const TAGS: Record<string, string> = {
  'live-semanal': 'evento-live-igor',
  'live-chris': 'evento-live-chris',
};

// Horário fixo por evento (BRT, -03:00). Combinado com chosen_date pra montar
// o campo custom 'data-e-horario-da-live' (tipo datetime) no ManyChat.
const TIME_BY_SOURCE: Record<string, string> = {
  'live-semanal': '13:00',
  'live-chris': '18:00',
};

const CUF_DATETIME = 'data-e-horario-da-live';
const CUF_DATA = 'data-live';
const CUF_HORARIO = 'horario-live';

function buildLiveDateTime(chosenDate: string | undefined, source: string): string | null {
  const time = TIME_BY_SOURCE[source];
  if (!chosenDate || !time) return null;
  // Ex: "2026-05-12T13:00:00-03:00"
  return `${chosenDate}T${time}:00-03:00`;
}

// "2026-05-12" -> "12/05/2026"
function formatDataBR(chosenDate: string | undefined): string | null {
  if (!chosenDate) return null;
  const m = chosenDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return `${m[3]}/${m[2]}/${m[1]}`;
}

// "13:00" -> "13h"
function formatHorarioBR(source: string): string | null {
  const time = TIME_BY_SOURCE[source];
  if (!time) return null;
  return time.split(':')[0] + 'h';
}

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
    const { nome, email, telefone, source, chosen_date } = body;
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

    const tag = TAGS[source];
    if (!tag) {
      return new Response(JSON.stringify({ error: 'source sem tag mapeada', source }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!MC) {
      return new Response(JSON.stringify({ error: 'MANYCHAT_API_KEY não configurada' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
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

    // 4. Seta os 3 campos custom (datetime pro trigger + text pra exibição)
    const liveDateTime = buildLiveDateTime(chosen_date, source);
    const dataBR = formatDataBR(chosen_date);
    const horarioBR = formatHorarioBR(source);

    const cufResults: Record<string, unknown> = {};
    if (liveDateTime) {
      const r = await mcRequest('POST', 'subscriber/setCustomFieldByName', {
        subscriber_id: subscriberId, field_name: CUF_DATETIME, field_value: liveDateTime,
      });
      cufResults[CUF_DATETIME] = r.data?.status;
    }
    if (dataBR) {
      const r = await mcRequest('POST', 'subscriber/setCustomFieldByName', {
        subscriber_id: subscriberId, field_name: CUF_DATA, field_value: dataBR,
      });
      cufResults[CUF_DATA] = r.data?.status;
    }
    if (horarioBR) {
      const r = await mcRequest('POST', 'subscriber/setCustomFieldByName', {
        subscriber_id: subscriberId, field_name: CUF_HORARIO, field_value: horarioBR,
      });
      cufResults[CUF_HORARIO] = r.data?.status;
    }

    return new Response(JSON.stringify({
      success: tagRes.status === 200 && tagRes.data?.status === 'success',
      subscriber_id: subscriberId,
      tag,
      tag_result: tagRes.data,
      live_datetime: liveDateTime,
      data_live: dataBR,
      horario_live: horarioBR,
      cuf_results: cufResults,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'interno', details: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
