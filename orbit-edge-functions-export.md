# EDGE FUNCTIONS COMPLETAS + SECRETS — Orbit Gestão
Exportado em: 2026-04-06

---

## create-pipedrive-lead/index.ts

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

---

## assign-pipedrive-owner/index.ts

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

---

## get-pipedrive-owners/index.ts

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

---

## sync-lead-make/index.ts

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

---

## sync-lead-crm/index.ts

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

---

## trigger-n8n-call/index.ts

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

## send-calendar-invite/index.ts

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

---

## tag-manychat/index.ts

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

---

## pipedrive-webhook/index.ts

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

---

## SECRETS CONFIGURADOS NO PROJETO

| Nome da Secret | Descrição |
|---|---|
| `PIPEDRIVE_API_TOKEN` | Token da API do Pipedrive |
| `MANYCHAT_API_TOKEN` | Token da conta primária ManyChat |
| `MANYCHAT_API_TOKEN_2` | Token da conta secundária ManyChat (mirror) |
| `RESEND_API_KEY` | Chave API do Resend (envio de emails) |
| `OPENAI_API_KEY` | Chave API do OpenAI |
| `TWILIO_API_KEY` | Chave API do Twilio (gerenciada por conector) |
| `TWILIO_PHONE_NUMBER` | Número de telefone Twilio para ligações |
| `ELEVENLABS_API_KEY` | Chave API do ElevenLabs |
| `AgenteElevenLabs` | ID do agente ElevenLabs |
| `LOVABLE_API_KEY` | Chave da plataforma Lovable (AI gateway + Twilio gateway) |
| `SUPABASE_URL` | URL do projeto Supabase (auto-provisionada) |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role (auto-provisionada) |
| `SUPABASE_ANON_KEY` | Chave anônima (auto-provisionada) |
| `SUPABASE_PUBLISHABLE_KEY` | Chave publicável (auto-provisionada) |
| `SUPABASE_DB_URL` | String de conexão do banco (auto-provisionada) |

**Nota:** Os valores não são exibidos por segurança. As secrets marcadas como "auto-provisionada" são gerenciadas automaticamente pelo Supabase.
