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
  | 'faturamento' | 'funcionarios' | 'prioridade' | 'calendar' | 'confirmation';

const STEPS: StepType[] = [
  'welcome','name','whatsapp','email','empresa','oqueFaz','cargo',
  'softwareGestaoConfirm','softwareGestao','faturamento','funcionarios','prioridade','calendar','confirmation',
];

const FATURAMENTO_OPTIONS = [
  'Até R$ 100 mil/mês',
  'R$ 100 mil - R$ 500 mil/mês',
  'R$ 500 mil - R$ 1 milhão/mês',
  'Acima de R$ 1 milhão/mês',
];
const FUNCIONARIOS_OPTIONS = [
  '1-5 funcionários','6-20 funcionários','21-50 funcionários','51-100 funcionários','Mais de 100 funcionários',
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
  }
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
    link_reuniao: data.date && data.time ? getMeetingLink(data.faturamento, data.cargo, data.oqueFaz) : null,
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

  // Salva lead parcial (após email)
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
      const { data: inserted, error } = await supabaseMkt
        .from('leads')
        .insert(toDbPayload(data, 'parcial'))
        .select('id')
        .single();
      if (error) { console.error('Insert lead failed:', error); return; }
      leadIdRef.current = inserted.id;
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
        if (value.toLowerCase().includes('qualidade')) {
          setTimeout(() => { addBotMessage('Você utiliza algum software de gestão?'); setCurrentStep('softwareGestaoConfirm'); }, 400);
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
        setTimeout(() => { addBotMessage('Qual a prioridade para você implementar um sistema de gestão?'); setCurrentStep('prioridade'); }, 400);
        break;
      }
      case 'prioridade': {
        const updated = { ...leadData, prioridade: value };
        setLeadData((p) => ({ ...p, prioridade: value }));
        updateLead(updated);
        updatePipedriveDeal({ prioridade: value });
        setTimeout(() => {
          addBotMessage('Perfeito! Agora escolha o melhor dia e horário para a sua demonstração gratuita com nosso time:');
          setCurrentStep('calendar');
        }, 400);
        break;
      }
    }
  };

  const handleCalendarSelect = async (date: string, time: string) => {
    const updated = { ...leadData, date, time };
    setLeadData(updated);
    addUserMessage(`${date} às ${time}`);
    const meetLink = getMeetingLink(leadData.faturamento, leadData.cargo, leadData.oqueFaz);
    setResolvedMeetLink(meetLink);

    // 1. Salva no banco como completo + link da reunião
    await updateLead(updated, 'completo');

    // 2. Update Pipedrive com TUDO (nota completa precisa de name/whatsapp/email/empresa + todos os campos)
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

    // 3. Atribui owner via round-robin (move pra "Reunião Agendada")
    if (pipedriveIdsRef.current.deal_id) {
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
      case 'funcionarios':
        return <ChatOptions options={FUNCIONARIOS_OPTIONS} onSelect={(v) => handleAnswer('funcionarios', v)} />;
      case 'softwareGestaoConfirm':
        return <ChatOptions options={['Sim', 'Não']} onSelect={(v) => handleAnswer('softwareGestaoConfirm', v)} />;
      case 'softwareGestao':
        return <ChatInput label="SOFTWARE DE GESTÃO" placeholder="Ex: Totvs, SAP..." onSubmit={(v) => handleAnswer('softwareGestao', v)} />;
      case 'prioridade':
        return <ChatOptions options={PRIORIDADE_OPTIONS} onSelect={(v) => handleAnswer('prioridade', v)} />;
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
            <CalendarPicker onSelect={handleCalendarSelect} />
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
