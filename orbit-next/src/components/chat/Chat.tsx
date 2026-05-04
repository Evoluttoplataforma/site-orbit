'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { supabaseMkt } from '@/lib/supabase-mkt';
import { normalizePhone } from '@/lib/phone';
import ChatHeader from './ChatHeader';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatOptions from './ChatOptions';
import WhatsAppInput from './WhatsAppInput';
import CalendarPicker from './CalendarPicker';
import ConfirmationScreen from './ConfirmationScreen';
import TypingIndicator from './TypingIndicator';

type StepType =
  | 'welcome' | 'name' | 'whatsapp' | 'email' | 'empresa'
  | 'oqueFaz' | 'cargo' | 'softwareGestaoConfirm' | 'softwareGestao'
  | 'faturamento' | 'faturamentoConsultor' | 'clientesAtivosConsultor'
  | 'funcionarios' | 'prioridade' | 'preferencia'
  | 'budget_validation' | 'farewell'
  | 'calendar' | 'confirmationVendedor' | 'confirmation';

const STEPS: StepType[] = [
  'welcome','name','whatsapp','email','empresa','oqueFaz','cargo',
  'softwareGestaoConfirm','softwareGestao',
  'faturamento','faturamentoConsultor','clientesAtivosConsultor',
  'funcionarios','prioridade','preferencia','budget_validation','farewell',
  'calendar','confirmationVendedor','confirmation',
];

interface Executive { nome: string; foto: string; whatsapp: string; }
const EXECUTIVES: Record<string, Executive> = {
  gabriel: { nome: 'Gabriel Carvente', foto: '/images/executivos/gabriel.png', whatsapp: '5511971999192' },
  gisele:  { nome: 'Gisele Ferrarezi', foto: '/images/executivos/gisele.png',  whatsapp: '5548991206282' },
  pedro:   { nome: 'Pedro',            foto: '/images/executivos/pedro.png',   whatsapp: '5548996934524' },
  thayane: { nome: 'Thayane Torbis',   foto: '/images/executivos/thayane.png', whatsapp: '5548996934515' },
};

function matchExecutive(ownerName: string): Executive | null {
  const lower = ownerName.toLowerCase();
  for (const [key, exec] of Object.entries(EXECUTIVES)) {
    if (lower.includes(key)) return exec;
  }
  return null;
}

const FATURAMENTO_OPTIONS = [
  'Até R$ 100 mil/mês',
  'R$ 100 mil - R$ 500 mil/mês',
  'R$ 500 mil - R$ 1 milhão/mês',
  'Acima de R$ 1 milhão/mês',
];
const FATURAMENTO_CONSULTOR_OPTIONS = [
  'Até R$ 30 mil/mês',
  'R$ 30 mil - R$ 100 mil/mês',
  'R$ 100 mil - R$ 500 mil/mês',
  'R$ 500 mil - R$ 1 milhão/mês',
  'Acima de R$ 1 milhão/mês',
];
const CLIENTES_ATIVOS_OPTIONS = [
  'Ainda não tenho clientes ativos',
  '1 a 3 clientes',
  '4 a 8 clientes',
  '9 a 15 clientes',
  '16 a 30 clientes',
  'Mais de 30 clientes',
];
const FUNCIONARIOS_OPTIONS = [
  '1-5 funcionários','6-20 funcionários','21-50 funcionários','51-100 funcionários','Mais de 100 funcionários',
];
const BUDGET_VALIDATION_OPTIONS = [
  'Sim, quero participar',
  'Quero testar o Orbit',
];
const SEGMENTO_OPTIONS = ['Consultoria','Indústria','Serviços','Comércio / Varejo','Governo','Outro'];
const CARGO_OPTIONS = ['CEO / Diretor','Funcionário','Responsável pela Qualidade','Consultor','Outro'];
const PRIORIDADE_OPTIONS = [
  'Urgente — preciso para ontem',
  'Em breve — nos próximos 30 dias',
  'Estou pesquisando ainda',
  'Só quero conhecer',
];

interface Message { text: string; isUser?: boolean; boldName?: string; }
interface LeadData {
  name: string; nome: string; sobrenome: string; whatsapp: string; email: string;
  empresa: string; oqueFaz: string; cargo: string; softwareGestao: string;
  faturamento: string; funcionarios: string; prioridade: string; date: string; time: string;
}

const MEET_LINKS = {
  pequeno: 'https://meet.google.com/efd-bbnc-zfc',
  grande: 'https://meet.google.com/ycz-dosc-znk',
  consultor: 'https://meet.google.com/xuc-mrnp-sec',
};

function getMeetingLink(faturamento: string, cargo: string, segmento: string) {
  const isConsultor = segmento.toLowerCase().includes('consultoria') || cargo.toLowerCase().includes('consultor');
  if (isConsultor) return MEET_LINKS.consultor;
  const fat = faturamento.toLowerCase();
  return fat.includes('até') && fat.includes('100 mil') ? MEET_LINKS.pequeno : MEET_LINKS.grande;
}

// Schema PT compatível com edge functions do Lovable
function toDbPayload(data: LeadData, status: 'parcial' | 'completo') {
  // Pega UTMs/tracking do sessionStorage e mistura no payload
  let tracking: Record<string, string> = {};
  let copyVariant: string | null = null;
  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem('__wl_tracking');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.originPage && !parsed.origin_page) parsed.origin_page = parsed.originPage;
        const trackingFields = [
          'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
          'gclid', 'gbraid', 'wbraid', 'gad_campaignid', 'gad_source',
          'fbclid', 'ttclid', 'msclkid', 'li_fat_id', 'sck',
          'landing_page', 'origin_page', 'session_attributes_encoded',
          'apex_session_id',
        ];
        for (const f of trackingFields) {
          if (parsed[f]) tracking[f] = parsed[f];
        }
      }
    } catch {}
    try {
      const lpRaw = sessionStorage.getItem('orbit_lp_data');
      if (lpRaw) copyVariant = JSON.parse(lpRaw)?.copyVariant || null;
      if (!copyVariant) copyVariant = sessionStorage.getItem('hero_copy_variant');
    } catch {}
  }
  const hasSchedule = !!(data.date && data.time);
  return {
    nome: data.nome || (data.name || '').split(' ')[0] || '',
    sobrenome: data.sobrenome || (data.name || '').split(' ').slice(1).join(' '),
    whatsapp: normalizePhone(data.whatsapp),
    email: data.email,
    empresa: data.empresa || '',
    oque_faz: data.oqueFaz || '',
    cargo: data.cargo || '',
    faturamento: data.faturamento || '',
    funcionarios: data.funcionarios || '',
    prioridade: data.prioridade || '',
    software_gestao: data.softwareGestao || null,
    data_reuniao: data.date || '',
    horario_reuniao: data.time || '',
    link_reuniao: hasSchedule ? getMeetingLink(data.faturamento, data.cargo, data.oqueFaz) : null,
    ligacao_agendada: hasSchedule ? true : null,
    copy_variant: copyVariant,
    status,
    ...tracking,
  };
}

export default function Chat() {
  const [currentStep, setCurrentStep] = useState<StepType>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOutroSegmento, setShowOutroSegmento] = useState(false);
  const [showOutroCargo, setShowOutroCargo] = useState(false);
  const [resolvedMeetLink, setResolvedMeetLink] = useState('');
  const [matchedExec, setMatchedExec] = useState<Executive | null>(null);
  const [loadingExec, setLoadingExec] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({
    name: '', nome: '', sobrenome: '', whatsapp: '', email: '', empresa: '',
    oqueFaz: '', cargo: '', softwareGestao: '', faturamento: '', funcionarios: '',
    prioridade: '', date: '', time: '',
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const leadIdRef = useRef<number | null>(null);
  const savingLeadRef = useRef(false);
  const pipedriveIdsRef = useRef<{ person_id?: number; org_id?: number; deal_id?: number }>({});

  // Coleta UTM/tracking do sessionStorage (populado pelo script global)
  // Normaliza originPage (camelCase) → origin_page (snake_case) que é o que as edge functions esperam
  const getUtmData = () => {
    try {
      const raw = sessionStorage.getItem('__wl_tracking');
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (parsed.originPage && !parsed.origin_page) {
        parsed.origin_page = parsed.originPage;
      }
      return parsed;
    } catch { return {}; }
  };

  // Cria deal no Pipedrive
  const createPipedriveLead = async (data: LeadData) => {
    try {
      const { data: result, error } = await supabaseMkt.functions.invoke('create-pipedrive-lead', {
        body: {
          action: 'create',
          name: data.name || `${data.nome} ${data.sobrenome}`.trim(),
          whatsapp: normalizePhone(data.whatsapp),
          email: data.email,
          empresa: data.empresa,
          oqueFaz: data.oqueFaz,
          cargo: data.cargo,
          label: 'CHAT1',
          labelColor: 'blue',
          leadId: leadIdRef.current,
          utmData: getUtmData(),
        },
      });
      if (error) { console.error('[Chat] Pipedrive create error:', error); return; }
      if (result?.success) {
        pipedriveIdsRef.current = {
          person_id: result.person_id,
          org_id: result.org_id,
          deal_id: result.deal_id,
        };
        console.log('[Chat] Pipedrive deal created:', pipedriveIdsRef.current);
      }
    } catch (err) {
      console.error('[Chat] Pipedrive create exception:', err);
    }
  };

  // Update deal no Pipedrive
  const updatePipedriveDeal = async (extra: Record<string, unknown>) => {
    if (!pipedriveIdsRef.current.deal_id) return;
    try {
      await supabaseMkt.functions.invoke('create-pipedrive-lead', {
        body: { action: 'update', ...pipedriveIdsRef.current, ...extra },
      });
    } catch (err) {
      console.error('[Chat] Pipedrive update failed:', err);
    }
  };

  // Adiciona label adicional no deal (DESQUALIFICADO ORBIT, CLICOU TESTE, etc.)
  const addPipedriveLabel = (label_name: string, label_color: string) => {
    const deal_id = pipedriveIdsRef.current.deal_id;
    if (!deal_id) return;
    supabaseMkt.functions.invoke('create-pipedrive-lead', {
      body: { action: 'add_label', deal_id, label_name, label_color },
    }).catch((err) => console.error(`[Chat] Failed to add label ${label_name}:`, err));
  };

  // Atribui owner direto (Gabriel) para desqualificados
  const assignGabrielDireto = () => {
    const deal_id = pipedriveIdsRef.current.deal_id;
    if (!deal_id) return;
    supabaseMkt.functions.invoke('assign-pipedrive-owner', {
      body: { deal_id, flow: 'gabriel_direto' },
    }).catch((err) => console.error('[Chat] Failed to assign Gabriel:', err));
  };

  // Branch executivo: roleta vendedor + label + nota + tag manychat → confirmationVendedor
  const requestExecutivo = (origin: 'preferencia' | 'calendar') => {
    // Marca preferência por contato vendedor (best-effort, depende da coluna existir no schema)
    if (leadIdRef.current) {
      supabaseMkt.from('leads')
        .update({ deseja_contato_vendedor: true })
        .eq('id', leadIdRef.current)
        .then(() => {}, () => {});
    }
    addPipedriveLabel('DIRETO EXECUTIVO', 'green');
    setLoadingExec(true);

    const deal_id = pipedriveIdsRef.current.deal_id;
    const noteContent = origin === 'calendar'
      ? `<b>📞 Lead solicitou contato com executivo (a partir do calendário)</b><br>O lead não encontrou um horário adequado e prefere ser contatado diretamente.`
      : `<b>📞 Lead solicitou contato com executivo</b><br>${leadData.nome} optou por falar com um executivo comercial em vez de agendar uma demonstração em grupo.`;

    (async () => {
      try {
        if (deal_id) {
          const { data: assignResult } = await supabaseMkt.functions.invoke('assign-pipedrive-owner', {
            body: { deal_id, flow: 'vendedor' },
          });
          if (assignResult?.assigned_user?.name) {
            const exec = matchExecutive(assignResult.assigned_user.name);
            if (exec) setMatchedExec(exec);
          }
          // Posta nota no deal via get-pipedrive-owners (dupla função)
          supabaseMkt.functions.invoke('get-pipedrive-owners', {
            body: { leads: [], add_note: { deal_id, content: noteContent } },
          }).catch((e) => console.warn('[Chat] add note failed:', e));
        }
        // Tag ManyChat: foi-falar-com-vendedor
        supabaseMkt.functions.invoke('tag-manychat', {
          body: {
            action: 'tag',
            whatsapp: leadData.whatsapp,
            tag_name: 'foi-falar-com-vendedor',
            lead_data: {
              nome: leadData.nome,
              sobrenome: leadData.sobrenome,
              email: leadData.email,
              empresa: leadData.empresa,
              oque_faz: leadData.oqueFaz,
              cargo: leadData.cargo,
              faturamento: leadData.faturamento,
              funcionarios: leadData.funcionarios,
              prioridade: leadData.prioridade,
            },
          },
        }).catch((e) => console.warn('[Chat] tag-manychat failed:', e));
        // Sync Make
        if (leadIdRef.current) {
          supabaseMkt.functions.invoke('sync-lead-make', { body: { lead_id: leadIdRef.current } })
            .catch((e) => console.warn('[Chat] sync-make failed:', e));
        }
      } catch (e) {
        console.error('[Chat] requestExecutivo failed:', e);
      } finally {
        setLoadingExec(false);
      }
    })();

    setTimeout(() => setCurrentStep('confirmationVendedor'), 400);
  };

  // Disparado pelo CalendarPicker quando lead escolhe "Falar com executivo" a partir do calendário
  const handleRequestExecutiveFromCalendar = () => requestExecutivo('calendar');

  // Sync Make + ManyChat
  const syncToMake = async () => {
    if (!leadIdRef.current) return;
    try {
      await supabaseMkt.functions.invoke('sync-lead-make', { body: { lead_id: leadIdRef.current } });
    } catch (err) { console.warn('[Chat] Make sync failed:', err); }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const addBotMessage = useCallback((text: string, boldName?: string) => {
    setIsTyping(true);
    scrollToBottom();
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text, boldName }]);
      scrollToBottom();
    }, 800);
  }, []);

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);
    scrollToBottom();
  };

  // Salva lead parcial (após email) — com deduplicação por email/whatsapp (alinhado com Lovable)
  const savePartialLead = async (data: LeadData) => {
    if (savingLeadRef.current) return;
    if (leadIdRef.current) {
      try {
        await supabaseMkt.from('leads').update(toDbPayload(data, 'parcial')).eq('id', leadIdRef.current);
      } catch (err) { console.error('Update lead failed:', err); }
      return;
    }
    savingLeadRef.current = true;
    try {
      const phoneDigits = data.whatsapp.replace(/\D/g, '');
      const payload = toDbPayload(data, 'parcial');

      // Procura lead existente por email OU whatsapp (mais recente)
      const { data: existingLead } = await supabaseMkt.from('leads')
        .select('id')
        .or(`email.eq.${data.email},whatsapp.ilike.%${phoneDigits}%`)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingLead) {
        const { error } = await supabaseMkt.from('leads').update(payload).eq('id', existingLead.id);
        if (error) { console.error('Failed to update existing lead:', error); return; }
        leadIdRef.current = existingLead.id;
        console.log('[Chat] Lead atualizado (existente):', existingLead.id);
      } else {
        const { data: inserted, error } = await supabaseMkt
          .from('leads')
          .insert(payload)
          .select('id')
          .single();
        if (error) { console.error('Insert lead failed:', error); return; }
        leadIdRef.current = inserted.id;
        console.log('[Chat] Lead inserido (novo):', inserted.id);
      }

      // Sync Make.com (fire-and-forget)
      supabaseMkt.functions.invoke('sync-lead-make', {
        body: { lead_id: leadIdRef.current },
      }).catch((e) => console.warn('[Chat] sync-lead-make failed:', e));

      // Sync CRM externo (fire-and-forget)
      supabaseMkt.functions.invoke('sync-lead-crm', {
        body: {
          nome: data.nome + (data.sobrenome ? ` ${data.sobrenome}` : ''),
          email: data.email,
          whatsapp: normalizePhone(data.whatsapp),
          empresa: data.empresa || '',
        },
      }).catch((e) => console.warn('[Chat] sync-lead-crm failed:', e));
    } catch (err) { console.error('Save partial lead failed:', err); }
    finally { savingLeadRef.current = false; }
  };

  const updateLead = async (data: LeadData, status: 'parcial' | 'completo' = 'parcial') => {
    if (!leadIdRef.current) return;
    try {
      await supabaseMkt.from('leads').update(toDbPayload(data, status)).eq('id', leadIdRef.current);
    } catch (err) { console.error('Update lead failed:', err); }
  };

  useEffect(() => {
    // LP handoff: se o popup salvou dados em sessionStorage, pula direto para oqueFaz
    try {
      const lpRaw = sessionStorage.getItem('orbit_lp_data');
      if (lpRaw) {
        const lp = JSON.parse(lpRaw);
        if (lp.nome && lp.email && lp.phone && lp.company) {
          const parts = (lp.name || '').trim().split(' ');
          const firstName = parts[0] || lp.nome;
          const lastName = parts.slice(1).join(' ') || lp.sobrenome || '';

          setLeadData((p) => ({
            ...p,
            name: lp.name || `${lp.nome} ${lp.sobrenome || ''}`.trim(),
            nome: lp.nome || firstName,
            sobrenome: lp.sobrenome || lastName,
            whatsapp: lp.phone,
            email: lp.email,
            empresa: lp.company,
          }));

          if (lp.leadId) leadIdRef.current = lp.leadId;
          if (lp.pipedriveIds) pipedriveIdsRef.current = lp.pipedriveIds;

          // Limpa pra não reusar
          sessionStorage.removeItem('orbit_lp_data');

          const nome = lp.nome || firstName;
          setTimeout(() => {
            setMessages([{ text: `Olá, ${nome}! Prazer em te conhecer! 😊` }]);
            setTimeout(() => {
              addBotMessage(`Já tenho seus dados. Agora me conta: o que a ${lp.company} faz?`);
              setCurrentStep('oqueFaz');
            }, 1200);
          }, 500);
          return;
        }
      }
    } catch {
      // LP data inválido, segue fluxo normal
    }

    // Fluxo normal (sem dados do popup)
    setTimeout(() => {
      setMessages([{ text: 'Reduza custos e aumente a produtividade com o Orbit. Vamos agendar uma conversa?' }]);
      setTimeout(() => {
        addBotMessage('Então bora começar! Qual seu nome?');
        setCurrentStep('name');
      }, 1200);
    }, 500);
  }, [addBotMessage]);

  const stepIndex = STEPS.indexOf(currentStep);
  const progressSteps = 10;
  const currentProgress = Math.min(stepIndex, progressSteps);

  const handleAnswer = (step: StepType, value: string) => {
    addUserMessage(value);
    switch (step) {
      case 'name': {
        const parts = value.trim().split(' ');
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ');
        setLeadData((p) => ({ ...p, name: value, nome: firstName, sobrenome: lastName }));
        setTimeout(() => { addBotMessage(`Prazer, ${value}! Qual seu WhatsApp?`); setCurrentStep('whatsapp'); }, 400);
        break;
      }
      case 'whatsapp':
        setLeadData((p) => ({ ...p, whatsapp: value }));
        setTimeout(() => {
          addBotMessage(`Show, ${leadData.name}! Me passa seu e-mail que já te envio um material top! Qual o seu e-mail?`);
          setCurrentStep('email');
        }, 400);
        break;
      case 'email': {
        const updated = { ...leadData, email: value };
        setLeadData((p) => ({ ...p, email: value }));
        savePartialLead(updated);
        setTimeout(() => { addBotMessage('Ótimo! Qual o nome da sua empresa?'); setCurrentStep('empresa'); }, 400);
        break;
      }
      case 'empresa': {
        const updated = { ...leadData, empresa: value };
        setLeadData((p) => ({ ...p, empresa: value }));
        updateLead(updated);
        // Cria deal no Pipedrive (se não veio da LP com IDs)
        if (!pipedriveIdsRef.current.deal_id) createPipedriveLead(updated);
        setTimeout(() => { addBotMessage('Legal! O que a sua empresa faz?'); setCurrentStep('oqueFaz'); }, 400);
        break;
      }
      case 'oqueFaz': {
        const updated = { ...leadData, oqueFaz: value };
        setLeadData((p) => ({ ...p, oqueFaz: value }));
        updateLead(updated);
        updatePipedriveDeal({ oqueFaz: value });
        setTimeout(() => { addBotMessage('Entendi! E o que você faz na empresa?'); setCurrentStep('cargo'); }, 400);
        break;
      }
      case 'cargo': {
        const updated = { ...leadData, cargo: value };
        setLeadData((p) => ({ ...p, cargo: value }));
        updateLead(updated);
        updatePipedriveDeal({ cargo: value });
        const isConsultorCargo =
          leadData.oqueFaz.toLowerCase().includes('consultoria') ||
          value.toLowerCase().includes('consultor');
        if (value.toLowerCase().includes('qualidade')) {
          setTimeout(() => { addBotMessage('Você utiliza algum software de gestão?'); setCurrentStep('softwareGestaoConfirm'); }, 400);
        } else if (isConsultorCargo) {
          setTimeout(() => { addBotMessage('Qual o faturamento mensal da sua consultoria?'); setCurrentStep('faturamentoConsultor'); }, 400);
        } else {
          setTimeout(() => { addBotMessage('Qual o faturamento mensal da empresa?'); setCurrentStep('faturamento'); }, 400);
        }
        break;
      }
      case 'softwareGestaoConfirm':
        if (value === 'Sim') {
          setTimeout(() => { addBotMessage('Qual software de gestão você utiliza?'); setCurrentStep('softwareGestao'); }, 400);
        } else {
          const updated = { ...leadData, softwareGestao: 'Não utiliza' };
          setLeadData((p) => ({ ...p, softwareGestao: 'Não utiliza' }));
          updateLead(updated);
          updatePipedriveDeal({ softwareGestao: 'Não utiliza' });
          setTimeout(() => { addBotMessage('Qual o faturamento mensal da empresa?'); setCurrentStep('faturamento'); }, 400);
        }
        break;
      case 'softwareGestao': {
        const updated = { ...leadData, softwareGestao: value };
        setLeadData((p) => ({ ...p, softwareGestao: value }));
        updateLead(updated);
        updatePipedriveDeal({ softwareGestao: value });
        setTimeout(() => { addBotMessage('Qual o faturamento mensal da empresa?'); setCurrentStep('faturamento'); }, 400);
        break;
      }
      case 'faturamento': {
        const updated = { ...leadData, faturamento: value };
        setLeadData((p) => ({ ...p, faturamento: value }));
        updateLead(updated);
        updatePipedriveDeal({ faturamento: value });
        setTimeout(() => { addBotMessage('Quantos funcionários a empresa tem?'); setCurrentStep('funcionarios'); }, 400);
        break;
      }
      case 'funcionarios': {
        const updated = { ...leadData, funcionarios: value };
        setLeadData((p) => ({ ...p, funcionarios: value }));
        updateLead(updated);
        updatePipedriveDeal({ funcionarios: value });
        const fatB2b = leadData.faturamento.toLowerCase();
        const isConsultorFunc =
          leadData.oqueFaz.toLowerCase().includes('consultoria') ||
          leadData.cargo.toLowerCase().includes('consultor');
        const isLowRevenueB2b = fatB2b.includes('até') && fatB2b.includes('100 mil');
        const isLowHeadcount = value.toLowerCase().includes('1-5') || value.toLowerCase().includes('1 a 5');
        const isB2bDesqualificado = !isConsultorFunc && isLowRevenueB2b && isLowHeadcount;
        if (isB2bDesqualificado) {
          addPipedriveLabel('DESQUALIFICADO ORBIT', 'red');
          assignGabrielDireto();
          setTimeout(() => {
            addBotMessage(
              `${leadData.nome}, importante: o investimento inicial do Orbit é a partir de R$ 1.200/mês. Considerando seu momento atual, gostaria de participar de uma demonstração em grupo para conhecer melhor a plataforma?`,
            );
            setCurrentStep('budget_validation');
          }, 400);
        } else {
          setTimeout(() => { addBotMessage('Qual a prioridade para você implementar um sistema de gestão?'); setCurrentStep('prioridade'); }, 400);
        }
        break;
      }
      case 'faturamentoConsultor': {
        const updated = { ...leadData, faturamento: value };
        setLeadData((p) => ({ ...p, faturamento: value }));
        updateLead(updated);
        updatePipedriveDeal({ faturamento: value });
        const lower = value.toLowerCase();
        const isDesq = lower.includes('até') && lower.includes('30 mil');
        if (isDesq) {
          addPipedriveLabel('DESQUALIFICADO ORBIT', 'red');
          assignGabrielDireto();
        }
        setTimeout(() => {
          addBotMessage('Quantos clientes ativos você atende simultaneamente?');
          setCurrentStep('clientesAtivosConsultor');
        }, 400);
        break;
      }
      case 'clientesAtivosConsultor': {
        const updated = { ...leadData, funcionarios: value };
        setLeadData((p) => ({ ...p, funcionarios: value }));
        updateLead(updated);
        updatePipedriveDeal({ funcionarios: value });
        setTimeout(() => {
          addBotMessage('Qual a prioridade para você agregar tecnologia ao seu portfólio?');
          setCurrentStep('prioridade');
        }, 400);
        break;
      }
      case 'prioridade': {
        const updated = { ...leadData, prioridade: value };
        setLeadData((p) => ({ ...p, prioridade: value }));
        updateLead(updated);
        updatePipedriveDeal({ prioridade: value });
        const fat = leadData.faturamento.toLowerCase();
        const isConsultorPrior =
          leadData.oqueFaz.toLowerCase().includes('consultoria') ||
          leadData.cargo.toLowerCase().includes('consultor');
        const isDesqConsultor = isConsultorPrior && fat.includes('até') && fat.includes('30 mil');
        if (isDesqConsultor) {
          setTimeout(() => {
            addBotMessage(
              `${leadData.nome}, importante: o investimento mínimo para se tornar um canal Orbit é de R$ 1.800/mês. Considerando seu momento atual, gostaria de participar de uma demonstração em grupo para conhecer melhor a plataforma?`,
            );
            setCurrentStep('budget_validation');
          }, 400);
        } else {
          setTimeout(() => {
            addBotMessage(`${leadData.nome}, como você prefere seguir?`);
            setCurrentStep('preferencia');
          }, 400);
        }
        break;
      }
      case 'preferencia': {
        if (value === 'Demonstração em grupo') {
          setTimeout(() => {
            addBotMessage('Perfeito! Agora escolha o melhor dia e horário para a sua demonstração gratuita com nosso time:');
            setCurrentStep('calendar');
          }, 400);
        } else if (value === 'Falar com executivo comercial') {
          requestExecutivo('preferencia');
        }
        break;
      }
      case 'budget_validation': {
        if (value === 'Sim, quero participar') {
          setTimeout(() => {
            addBotMessage('Ótimo! Vamos agendar sua demonstração em grupo. Escolha o melhor dia e horário:');
            setCurrentStep('calendar');
          }, 400);
        } else {
          addPipedriveLabel('CLICOU TESTE', 'yellow');
          setTimeout(() => {
            addBotMessage(`${leadData.nome}, ótima escolha! 🚀 Você pode começar a testar o Orbit agora mesmo — qualquer dúvida, estamos aqui! Boa jornada! 💪`);
            setCurrentStep('farewell');
          }, 400);
        }
        break;
      }
    }
  };

  const handleCalendarSelect = async (date: string, time: string) => {
    // Fallback: se pipedriveIds estiver vazio, busca da tabela leads (alinhado com Lovable)
    if (!pipedriveIdsRef.current.deal_id && leadIdRef.current) {
      try {
        const { data: fresh } = await supabaseMkt.from('leads')
          .select('pipedrive_deal_id, pipedrive_person_id, pipedrive_org_id')
          .eq('id', leadIdRef.current)
          .maybeSingle();
        if (fresh?.pipedrive_deal_id) {
          pipedriveIdsRef.current = {
            deal_id: fresh.pipedrive_deal_id,
            person_id: fresh.pipedrive_person_id,
            org_id: fresh.pipedrive_org_id,
          };
          console.log('[Chat] Pipedrive IDs fetched at calendar select:', pipedriveIdsRef.current);
        }
      } catch (err) { console.warn('[Chat] Fallback fetch pipedrive IDs failed:', err); }
    }

    const updated = { ...leadData, date, time };
    setLeadData(updated);
    addUserMessage(`${date} às ${time}`);
    const meetLink = getMeetingLink(leadData.faturamento, leadData.cargo, leadData.oqueFaz);
    setResolvedMeetLink(meetLink);

    // 1. Aplica label "EM GRUPO" sempre, antes de tudo (alinhado com Lovable)
    addPipedriveLabel('EM GRUPO', 'blue');

    // 2. Salva no banco como completo + link da reunião
    await updateLead(updated, 'completo');

    // 3. Update Pipedrive com TUDO (nota completa precisa de name/whatsapp/email/empresa + todos os campos)
    updatePipedriveDeal({
      name: leadData.name || `${leadData.nome} ${leadData.sobrenome}`.trim(),
      whatsapp: normalizePhone(leadData.whatsapp),
      email: leadData.email,
      empresa: leadData.empresa,
      oqueFaz: leadData.oqueFaz,
      cargo: leadData.cargo,
      softwareGestao: leadData.softwareGestao || undefined,
      faturamento: leadData.faturamento,
      funcionarios: leadData.funcionarios,
      prioridade: leadData.prioridade,
      date,
      time,
      utmData: getUtmData(),
    });

    // 4. Atribui owner via round-robin (move pra "Reunião Agendada") — APENAS se não for desqualificado
    // (desqualificados consultor/B2B já foram atribuídos a Gabriel direto via gabriel_direto)
    const fatCal = leadData.faturamento.toLowerCase();
    const funcCal = leadData.funcionarios.toLowerCase();
    const isConsultorCal = leadData.oqueFaz.toLowerCase().includes('consultoria') || leadData.cargo.toLowerCase().includes('consultor');
    const isDesqConsultor = isConsultorCal && fatCal.includes('até') && fatCal.includes('30 mil');
    const isDesqB2b = !isConsultorCal && fatCal.includes('até') && fatCal.includes('100 mil') && (funcCal.includes('1-5') || funcCal.includes('1 a 5'));
    if (pipedriveIdsRef.current.deal_id && !isDesqConsultor && !isDesqB2b) {
      supabaseMkt.functions.invoke('assign-pipedrive-owner', {
        body: { deal_id: pipedriveIdsRef.current.deal_id, flow: 'sala' },
      }).catch((e) => console.warn('[Chat] assign-owner failed:', e));
    }

    // 4. Email de confirmação (Resend)
    supabaseMkt.functions.invoke('send-calendar-invite', {
      body: {
        email: leadData.email,
        name: `${leadData.nome} ${leadData.sobrenome}`.trim(),
        date,
        time,
        meetingLink: meetLink,
      },
    }).catch((e) => console.warn('[Chat] send-invite failed:', e));

    // 5. Sync para Make
    syncToMake();

    // 6. Tag ManyChat agendou-reuniao
    supabaseMkt.functions.invoke('tag-manychat', {
      body: {
        action: 'tag',
        whatsapp: leadData.whatsapp,
        tag_name: 'agendou-reuniao',
        lead_data: {
          nome: leadData.nome,
          sobrenome: leadData.sobrenome,
          email: leadData.email,
          empresa: leadData.empresa,
          oque_faz: leadData.oqueFaz,
          cargo: leadData.cargo,
          faturamento: leadData.faturamento,
          funcionarios: leadData.funcionarios,
          prioridade: leadData.prioridade,
          data_reuniao: date,
          horario_reuniao: time,
          software_gestao: leadData.softwareGestao,
          link_reuniao: meetLink,
        },
      },
    }).catch((e) => console.warn('[Chat] tag-manychat failed:', e));

    // 7. Dispara ligação n8n
    try {
      const [dd, mm, yyyy] = date.split('/');
      const callDatetime = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}T${time}:00-03:00`;
      const phone = leadData.whatsapp.startsWith('+')
        ? leadData.whatsapp
        : `+55${leadData.whatsapp.replace(/\D/g, '')}`;
      supabaseMkt.functions.invoke('trigger-n8n-call', {
        body: {
          lead_name: `${leadData.nome} ${leadData.sobrenome}`.trim(),
          lead_phone: phone,
          call_datetime: callDatetime,
          subscriber_id: null,
          deal_id: pipedriveIdsRef.current.deal_id || null,
        },
      }).catch((e) => console.warn('[Chat] n8n failed:', e));
    } catch (e) {
      console.warn('[Chat] n8n exception:', e);
    }

    setTimeout(() => setCurrentStep('confirmation'), 500);
  };

  const renderInput = () => {
    if (isTyping) return null;
    switch (currentStep) {
      case 'name':
        return <ChatInput label="NOME COMPLETO" placeholder="Digite seu nome e sobrenome..." onSubmit={(v) => handleAnswer('name', v)} />;
      case 'whatsapp':
        return <WhatsAppInput onSubmit={(v) => handleAnswer('whatsapp', v)} />;
      case 'email':
        return <ChatInput label="E-MAIL" placeholder="seu@email.com" onSubmit={(v) => handleAnswer('email', v)} type="email" />;
      case 'empresa':
        return <ChatInput label="EMPRESA" placeholder="Nome da sua empresa..." onSubmit={(v) => handleAnswer('empresa', v)} />;
      case 'oqueFaz':
        if (showOutroSegmento) {
          return <ChatInput label="SEGMENTO" placeholder="Digite o segmento da empresa..." onSubmit={(v) => handleAnswer('oqueFaz', v)} />;
        }
        return <ChatOptions options={SEGMENTO_OPTIONS} onSelect={(v) => v === 'Outro' ? setShowOutroSegmento(true) : handleAnswer('oqueFaz', v)} />;
      case 'cargo':
        if (showOutroCargo) {
          return <ChatInput label="SEU CARGO" placeholder="Digite seu cargo..." onSubmit={(v) => handleAnswer('cargo', v)} />;
        }
        return <ChatOptions options={CARGO_OPTIONS} onSelect={(v) => v === 'Outro' ? setShowOutroCargo(true) : handleAnswer('cargo', v)} />;
      case 'faturamento':
        return <ChatOptions options={FATURAMENTO_OPTIONS} onSelect={(v) => handleAnswer('faturamento', v)} />;
      case 'faturamentoConsultor':
        return <ChatOptions options={FATURAMENTO_CONSULTOR_OPTIONS} onSelect={(v) => handleAnswer('faturamentoConsultor', v)} />;
      case 'clientesAtivosConsultor':
        return <ChatOptions options={CLIENTES_ATIVOS_OPTIONS} onSelect={(v) => handleAnswer('clientesAtivosConsultor', v)} />;
      case 'funcionarios':
        return <ChatOptions options={FUNCIONARIOS_OPTIONS} onSelect={(v) => handleAnswer('funcionarios', v)} />;
      case 'softwareGestaoConfirm':
        return <ChatOptions options={['Sim', 'Não']} onSelect={(v) => handleAnswer('softwareGestaoConfirm', v)} />;
      case 'softwareGestao':
        return <ChatInput label="SOFTWARE DE GESTÃO" placeholder="Ex: Totvs, SAP..." onSubmit={(v) => handleAnswer('softwareGestao', v)} />;
      case 'prioridade':
        return <ChatOptions options={PRIORIDADE_OPTIONS} onSelect={(v) => handleAnswer('prioridade', v)} />;
      case 'preferencia': {
        // Demonstração em grupo SEMPRE aparece. Falar com executivo só se NÃO for low-revenue B2B
        // (low-revenue B2B já cai em budget_validation antes de chegar aqui — mas dupla checagem)
        const fatPref = leadData.faturamento.toLowerCase();
        const isLowRevPref = fatPref.includes('até') && fatPref.includes('100 mil');
        const isConsultorPref =
          leadData.oqueFaz.toLowerCase().includes('consultoria') ||
          leadData.cargo.toLowerCase().includes('consultor');
        const showExecPref = !isLowRevPref || isConsultorPref;
        const options = showExecPref
          ? ['Demonstração em grupo', 'Falar com executivo comercial']
          : ['Demonstração em grupo'];
        return <ChatOptions options={options} onSelect={(v) => handleAnswer('preferencia', v)} />;
      }
      case 'budget_validation':
        return <ChatOptions options={BUDGET_VALIDATION_OPTIONS} onSelect={(v) => handleAnswer('budget_validation', v)} />;
      case 'farewell':
        return (
          <a
            href="https://app.orbitgestao.com.br/register"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#ffba1a',
              color: '#0d1117',
              padding: '14px 28px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            🚀 Acessar o Orbit
          </a>
        );
      default:
        return null;
    }
  };

  // Shell full-screen com conteúdo interno centralizado (max-width ~720px)
  const shellStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    background: '#0d1117',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const messagesScrollStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
  };

  const innerContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const inputBarStyle: React.CSSProperties = {
    flexShrink: 0,
    borderTop: '1px solid rgba(255,255,255,0.08)',
    background: '#0d1117',
  };

  const inputInnerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    padding: '16px 20px 20px',
  };

  if (currentStep === 'confirmation') {
    return (
      <div style={shellStyle}>
        <ChatHeader currentStep={progressSteps} totalSteps={progressSteps} />
        <div style={{ ...messagesScrollStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ width: '100%', maxWidth: '480px' }}>
            <ConfirmationScreen
              name={leadData.name}
              date={leadData.date}
              time={leadData.time}
              segmento={leadData.oqueFaz}
              meetingLink={resolvedMeetLink}
            />
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'confirmationVendedor') {
    return (
      <div style={shellStyle}>
        <ChatHeader currentStep={progressSteps} totalSteps={progressSteps} />
        <div style={{ ...messagesScrollStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ width: '100%', maxWidth: '460px', textAlign: 'center', color: '#fff' }}>
            {loadingExec ? (
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Localizando seu executivo…</p>
            ) : matchedExec ? (
              <>
                <img
                  src={matchedExec.foto}
                  alt={matchedExec.nome}
                  style={{
                    width: 128, height: 128, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top',
                    margin: '0 auto 24px', border: '4px solid rgba(255,186,26,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                />
                <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>
                  Você falará com <span style={{ color: '#ffba1a' }}>{matchedExec.nome}</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 24px', fontSize: 15, lineHeight: 1.6 }}>
                  Nosso executivo entrará em contato com você em breve via WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${matchedExec.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#25D366', color: '#fff', padding: '14px 28px',
                    borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  }}
                >
                  💬 Conversar no WhatsApp
                </a>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>
                  Pedido recebido!
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.6 }}>
                  Um executivo comercial entrará em contato com você em breve via WhatsApp.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={shellStyle}>
      <ChatHeader currentStep={currentProgress} totalSteps={progressSteps} />
      <div ref={scrollRef} style={messagesScrollStyle}>
        <div style={innerContainerStyle}>
          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg.text} isUser={msg.isUser} boldName={msg.boldName} />
          ))}
          {isTyping && <TypingIndicator />}
          {currentStep === 'calendar' && !isTyping && (
            <CalendarPicker onSelect={handleCalendarSelect} onRequestExecutive={handleRequestExecutiveFromCalendar} />
          )}
        </div>
      </div>
      <div style={inputBarStyle}>
        <div style={inputInnerStyle}>
          {renderInput()}
        </div>
      </div>
    </div>
  );
}
