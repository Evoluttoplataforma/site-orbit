import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// API key vem de secret (compartilhada com subscribe-manychat-live)
const MC = Deno.env.get('MANYCHAT_API_KEY') || '';
const MC_API = 'https://api.manychat.com/fb';

// Tag única + nome do treinamento como CUF (em vez de criar 10 tags)
const TAG_TREINAMENTO = 'inscrito-treinamento';
const CUF_TREINAMENTO = 'treinamento-nome';
const CUF_DATETIME = 'data-e-horario-da-live';
const CUF_DATA = 'data-live';
const CUF_HORARIO = 'horario-live';

interface TrainingConfig {
  title: string;
  hour: number;
}

const TRAININGS: Record<string, TrainingConfig> = {
  'pessoas-1':          { title: 'Pessoas 1 - Cargos / PDI / Treinamentos',           hour: 10 },
  'estrategia-mercado': { title: 'Estratégia e Mercado',                                hour: 16 },
  'pessoas-2':          { title: 'Pessoas 2 - Documentos dos Colaboradores',          hour: 10 },
  'processos':          { title: 'Processos',                                           hour: 16 },
  'indicadores':        { title: 'Indicadores',                                         hour: 10 },
  'documentos':         { title: 'Documentos',                                          hour: 16 },
  'crm-fluxos':         { title: 'CRM / Fluxos de Operação',                            hour: 10 },
  'problemas-riscos':   { title: 'Problemas / Riscos e Oportunidades',                  hour: 16 },
  'tarefas-projetos':   { title: 'Tarefas / Projetos',                                  hour: 10 },
  'financeiro':         { title: 'Financeiro',                                          hour: 16 },
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

async function findByNameAndPhone(name: string, phone: string): Promise<string | null> {
  const phoneDigits = phone.replace(/\D/g, '');
  async function tryQuery(q: string): Promise<string | null> {
    const enc = encodeURIComponent(q);
    const { status, data } = await mcRequest('GET', `subscriber/findByName?name=${enc}`);
    if (status !== 200 || data?.status !== 'success' || !Array.isArray(data.data)) return null;
    for (const s of data.data) {
      const sPhone = String(s.whatsapp_phone || '').replace(/\D/g, '');
      if (sPhone && sPhone === phoneDigits) return String(s.id);
    }
    return null;
  }
  let id = await tryQuery(name);
  if (id) return id;
  const first = name.trim().split(/\s+/)[0];
  if (first && first !== name) {
    id = await tryQuery(first);
    if (id) return id;
  }
  return null;
}

function buildLiveDateTime(chosenDate: string, hour: number): string {
  return `${chosenDate}T${String(hour).padStart(2, '0')}:00:00-03:00`;
}

function formatDataBR(chosenDate: string): string {
  const m = chosenDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : chosenDate;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const body = await req.json();
    const { nome, email, telefone, training_slug, chosen_date } = body;

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

    const cfg = TRAININGS[training_slug as string];
    if (!cfg) {
      return new Response(JSON.stringify({ error: 'training_slug inválido', training_slug }), {
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

    const createPayload: Record<string, unknown> = {
      whatsapp_phone: phone,
      consent_phrase: 'Lead Treinamento Orbit',
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
      const errStr = JSON.stringify(createRes.data);
      if (errStr.includes('already exists')) {
        subscriberId = await findByNameAndPhone(nome, phone);
      }
      if (!subscriberId) {
        return new Response(JSON.stringify({ success: false, step: 'create', error: createRes.data }), {
          status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Aplica tag única de treinamento
    const tagRes = await mcRequest('POST', 'subscriber/addTagByName', {
      subscriber_id: subscriberId, tag_name: TAG_TREINAMENTO,
    });

    // Seta CUFs
    const cufResults: Record<string, unknown> = {};
    const trainingName = cfg.title;

    // Nome do treinamento (CUF custom só pra treinamentos)
    const r1 = await mcRequest('POST', 'subscriber/setCustomFieldByName', {
      subscriber_id: subscriberId, field_name: CUF_TREINAMENTO, field_value: trainingName,
    });
    cufResults[CUF_TREINAMENTO] = r1.data?.status;

    // Reusa CUFs já existentes pro datetime / data / horário (mesma trigger do ManyChat funciona)
    if (chosen_date && /^\d{4}-\d{2}-\d{2}$/.test(chosen_date)) {
      const liveDateTime = buildLiveDateTime(chosen_date, cfg.hour);
      const dataBR = formatDataBR(chosen_date);
      const horarioBR = String(cfg.hour).padStart(2, '0') + 'h';

      const r2 = await mcRequest('POST', 'subscriber/setCustomFieldByName', {
        subscriber_id: subscriberId, field_name: CUF_DATETIME, field_value: liveDateTime,
      });
      cufResults[CUF_DATETIME] = r2.data?.status;

      const r3 = await mcRequest('POST', 'subscriber/setCustomFieldByName', {
        subscriber_id: subscriberId, field_name: CUF_DATA, field_value: dataBR,
      });
      cufResults[CUF_DATA] = r3.data?.status;

      const r4 = await mcRequest('POST', 'subscriber/setCustomFieldByName', {
        subscriber_id: subscriberId, field_name: CUF_HORARIO, field_value: horarioBR,
      });
      cufResults[CUF_HORARIO] = r4.data?.status;
    }

    return new Response(JSON.stringify({
      success: tagRes.status === 200 && tagRes.data?.status === 'success',
      subscriber_id: subscriberId,
      tag: TAG_TREINAMENTO,
      training: trainingName,
      cuf_results: cufResults,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'interno', details: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
