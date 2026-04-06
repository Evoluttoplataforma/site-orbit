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

// Mapeia campos do chat (PT) → schema da tabela leads no MKT ORBIT (EN)
function toDbPayload(data: LeadData, status: 'parcial' | 'completo') {
  return {
    name: data.name || `${data.nome} ${data.sobrenome}`.trim(),
    email: data.email,
    phone: normalizePhone(data.whatsapp),
    company: data.empresa || null,
    segment: data.oqueFaz || null,
    role: data.cargo || null,
    revenue: data.faturamento || null,
    employees: data.funcionarios || null,
    priority: data.prioridade || null,
    software_gestao: data.softwareGestao || null,
    data_reuniao: data.date || null,
    horario_reuniao: data.time || null,
    link_reuniao: data.date && data.time ? getMeetingLink(data.faturamento, data.cargo, data.oqueFaz) : null,
    status,
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

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
        setTimeout(() => { addBotMessage('Legal! O que a sua empresa faz?'); setCurrentStep('oqueFaz'); }, 400);
        break;
      }
      case 'oqueFaz': {
        const updated = { ...leadData, oqueFaz: value };
        setLeadData((p) => ({ ...p, oqueFaz: value }));
        updateLead(updated);
        setTimeout(() => { addBotMessage('Entendi! E o que você faz na empresa?'); setCurrentStep('cargo'); }, 400);
        break;
      }
      case 'cargo': {
        const updated = { ...leadData, cargo: value };
        setLeadData((p) => ({ ...p, cargo: value }));
        updateLead(updated);
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
          setTimeout(() => { addBotMessage('Qual o faturamento mensal da empresa?'); setCurrentStep('faturamento'); }, 400);
        }
        break;
      case 'softwareGestao': {
        const updated = { ...leadData, softwareGestao: value };
        setLeadData((p) => ({ ...p, softwareGestao: value }));
        updateLead(updated);
        setTimeout(() => { addBotMessage('Qual o faturamento mensal da empresa?'); setCurrentStep('faturamento'); }, 400);
        break;
      }
      case 'faturamento': {
        const updated = { ...leadData, faturamento: value };
        setLeadData((p) => ({ ...p, faturamento: value }));
        updateLead(updated);
        setTimeout(() => { addBotMessage('Quantos funcionários a empresa tem?'); setCurrentStep('funcionarios'); }, 400);
        break;
      }
      case 'funcionarios': {
        const updated = { ...leadData, funcionarios: value };
        setLeadData((p) => ({ ...p, funcionarios: value }));
        updateLead(updated);
        setTimeout(() => { addBotMessage('Qual a prioridade para você implementar um sistema de gestão?'); setCurrentStep('prioridade'); }, 400);
        break;
      }
      case 'prioridade': {
        const updated = { ...leadData, prioridade: value };
        setLeadData((p) => ({ ...p, prioridade: value }));
        updateLead(updated);
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
    await updateLead(updated, 'completo');
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

  // Estilos inline pra escapar do reset agressivo do orbit.css
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    background:
      'radial-gradient(circle at 20% 0%, rgba(255,186,26,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 100%, rgba(255,186,26,0.05) 0%, transparent 50%), #0d1117',
    overflowY: 'auto',
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '720px',
    height: '100dvh',
    background: '#0d1117',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 0,
    boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,186,26,0.06)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: 0,
  };

  // Em telas sm+: card com bordas arredondadas e altura limitada
  const cardStyleDesktop: React.CSSProperties = {
    ...cardStyle,
    height: 'min(92dvh, 820px)',
    borderRadius: '24px',
    margin: '16px',
  };

  const finalCardStyle = isDesktop ? cardStyleDesktop : cardStyle;

  const messagesAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 20px',
  };

  const inputAreaStyle: React.CSSProperties = {
    flexShrink: 0,
    padding: '16px 20px 20px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(0,0,0,0.2)',
  };

  if (currentStep === 'confirmation') {
    return (
      <div style={overlayStyle}>
        <div style={finalCardStyle}>
          <ChatHeader currentStep={progressSteps} totalSteps={progressSteps} />
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%', maxWidth: '440px' }}>
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
      </div>
    );
  }

  return (
    <div style={overlayStyle}>
      <div style={finalCardStyle}>
        <ChatHeader currentStep={currentProgress} totalSteps={progressSteps} />
        <div ref={scrollRef} style={messagesAreaStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg, i) => (
              <ChatBubble key={i} message={msg.text} isUser={msg.isUser} boldName={msg.boldName} />
            ))}
            {isTyping && <TypingIndicator />}
            {currentStep === 'calendar' && !isTyping && (
              <CalendarPicker onSelect={handleCalendarSelect} />
            )}
          </div>
        </div>
        <div style={inputAreaStyle}>
          {renderInput()}
        </div>
      </div>
    </div>
  );
}
