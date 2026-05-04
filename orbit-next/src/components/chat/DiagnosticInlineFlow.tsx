'use client';
import { useState, useEffect, useRef } from 'react';
import { Loader2, CheckCircle2, Sparkles, Target, Bot, ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import { supabaseMkt } from '@/lib/supabase-mkt';
import ChatInput from './ChatInput';
import { CONSULTOR_DIAGNOSTIC_QUESTIONS } from './consultorDiagnosticQuestions';

interface QuestionLevel {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
}

interface Question {
  id: number;
  category: 'gestao' | 'ia' | 'canal';
  theme?: string;
  question: string;
  levels: QuestionLevel;
}

interface DiagnosticResult {
  score_gestao: number;
  score_ia: number;
  score_total: number;
  maturity_level: string;
  ai_summary: string;
}

const MATURITY_COLORS: Record<string, string> = {
  Iniciante: '#ef4444',
  'Básico': '#f97316',
  'Intermediário': '#eab308',
  'Avançado': '#22c55e',
  'Referência': '#3b82f6',
};

const CONSULTOR_MATURITY_COLORS: Record<string, string> = {
  'Consultor Iniciante': '#ef4444',
  'Consultor em Estruturação': '#f97316',
  'Consultor Consolidado': '#eab308',
  'Canal Avançado': '#22c55e',
  'Canal Referência': '#3b82f6',
};

const T = {
  bg: '#0d1117',
  border: 'rgba(255,255,255,0.1)',
  text: '#e6edf3',
  textMuted: '#8b949e',
  textDim: 'rgba(139,148,158,0.4)',
  primary: '#ffba1a',
  destructive: '#f85149',
  card: 'rgba(255,255,255,0.04)',
};

function isConsultorProfile(setor: string): boolean {
  const lower = setor.toLowerCase();
  return lower.includes('consultoria') || lower.includes('consultor');
}

type InternalStep = 'setor' | 'loading' | 'quiz' | 'submitting' | 'result';

interface DiagnosticInlineFlowProps {
  leadNome: string;
  leadEmail: string;
  leadCelular: string;
  leadEmpresa: string;
  leadId?: string;
  prefilledSetor?: string;
  onComplete: () => void;
}

export default function DiagnosticInlineFlow({
  leadNome,
  leadEmail,
  leadCelular,
  leadEmpresa,
  leadId,
  prefilledSetor,
  onComplete,
}: DiagnosticInlineFlowProps) {
  const [internalStep, setInternalStep] = useState<InternalStep>(prefilledSetor ? 'loading' : 'setor');
  const [setor, setSetor] = useState(prefilledSetor || '');
  const [isConsultor, setIsConsultor] = useState(false);
  const [diagnosticId, setDiagnosticId] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const autoStartedRef = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
  }, [currentQ, answers]);

  const startDiagnostic = async (setorValue: string) => {
    setSetor(setorValue);
    setInternalStep('loading');
    setError('');

    const consultorDetected = isConsultorProfile(setorValue);
    setIsConsultor(consultorDetected);

    if (consultorDetected) {
      try {
        const { data: inserted, error: insertErr } = await supabaseMkt
          .from('diagnostic_responses')
          .insert({
            lead_email: leadEmail.toLowerCase(),
            lead_nome: leadNome,
            lead_celular: leadCelular || null,
            lead_empresa: leadEmpresa || null,
            lead_id: leadId || null,
            setor: 'Consultoria',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            questions: CONSULTOR_DIAGNOSTIC_QUESTIONS as any,
          })
          .select('id')
          .single();

        if (insertErr) throw insertErr;

        setDiagnosticId(inserted.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setQuestions(CONSULTOR_DIAGNOSTIC_QUESTIONS as any);
        setAnswers(new Array(CONSULTOR_DIAGNOSTIC_QUESTIONS.length).fill(0));
        setCurrentQ(0);
        setInternalStep('quiz');
      } catch (e) {
        console.error(e);
        setError('Erro ao iniciar diagnóstico. Tente novamente.');
        setInternalStep('setor');
      }
      return;
    }

    try {
      const { data, error: fnError } = await supabaseMkt.functions.invoke('generate-diagnostic', {
        body: {
          email: leadEmail.toLowerCase(),
          setor_manual: setorValue,
          nome_manual: leadNome,
          celular_manual: leadCelular,
          empresa_manual: leadEmpresa,
        },
      });

      if (fnError) throw fnError;
      if (data?.error) {
        setError(data.error);
        setInternalStep('setor');
        return;
      }

      setDiagnosticId(data.diagnostic_id);
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(0));
      setCurrentQ(0);
      setInternalStep('quiz');
    } catch (e) {
      console.error(e);
      setError('Erro ao gerar diagnóstico. Tente novamente.');
      setInternalStep('setor');
    }
  };

  useEffect(() => {
    if (prefilledSetor && !autoStartedRef.current) {
      autoStartedRef.current = true;
      startDiagnostic(prefilledSetor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = value;
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 350);
    }
  };

  const handleSubmit = async () => {
    if (answers.some((a) => a === 0)) return;
    setInternalStep('submitting');

    try {
      const { data, error: fnError } = await supabaseMkt.functions.invoke('submit-diagnostic', {
        body: { diagnostic_id: diagnosticId, answers, source: 'chat' },
      });

      if (fnError) throw fnError;
      if (data?.error) {
        setError(data.error);
        setInternalStep('quiz');
        return;
      }

      setResult(data);
      setInternalStep('result');
    } catch (e) {
      console.error(e);
      setError('Erro ao enviar respostas. Tente novamente.');
      setInternalStep('quiz');
    }
  };

  const q = questions[currentQ];
  const isLastQuestion = currentQ === questions.length - 1;
  const allAnswered = answers.every((a) => a > 0);
  const progressValue = questions.length > 0 ? (answers.filter((a) => a > 0).length / questions.length) * 100 : 0;

  // ===== STEP: SETOR =====
  if (internalStep === 'setor') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fade-in-up 0.4s ease-out' }}>
        <p style={{ fontSize: '14px', color: T.textMuted, margin: 0 }}>
          Para personalizar suas perguntas, qual o setor da sua empresa?
        </p>
        {error && <p style={{ color: T.destructive, fontSize: '14px', margin: 0 }}>{error}</p>}
        <ChatInput
          label="SETOR"
          placeholder="Ex: Contabilidade, Marketing, Saúde..."
          onSubmit={(v) => startDiagnostic(v)}
        />
      </div>
    );
  }

  // ===== STEP: LOADING =====
  if (internalStep === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', padding: '32px 0', animation: 'fade-in-up 0.4s ease-out' }}>
        <Loader2 size={40} color={T.primary} style={{ animation: 'spin 1s linear infinite' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
          <p style={{ color: T.text, fontWeight: 600, fontSize: '14px', margin: 0 }}>
            {isConsultor ? 'Preparando seu diagnóstico de canal...' : 'Gerando perguntas personalizadas...'}
          </p>
          <p style={{ color: T.textMuted, fontSize: '12px', margin: 0 }}>
            {isConsultor ? 'Avaliando seu potencial como parceiro Orbit' : `Analisando o setor e contexto da ${leadEmpresa}`}
          </p>
        </div>
      </div>
    );
  }

  // ===== STEP: QUIZ =====
  if (internalStep === 'quiz' && q) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fade-in-up 0.4s ease-out' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: T.textMuted }}>
            <span>{leadNome} • {leadEmpresa}</span>
            <span>{currentQ + 1}/{questions.length}</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressValue}%`, background: T.primary, transition: 'width 0.3s' }} />
          </div>
        </div>

        <h2 style={{ fontSize: '14px', fontWeight: 600, color: T.text, lineHeight: 1.4, margin: 0 }}>
          {q.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {([1, 2, 3, 4, 5] as const).map((level) => {
            const selected = answers[currentQ] === level;
            return (
              <button
                key={level}
                onClick={() => handleAnswer(level)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: `1px solid ${selected ? T.primary : T.border}`,
                  background: selected ? 'rgba(255,186,26,0.1)' : T.card,
                  color: selected ? T.text : T.textMuted,
                  fontWeight: selected ? 500 : 400,
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                      background: selected ? T.primary : 'rgba(255,255,255,0.06)',
                      color: selected ? '#0d1117' : T.textMuted,
                    }}
                  >
                    {level}
                  </span>
                  <span style={{ lineHeight: 1.35, paddingTop: '2px' }}>
                    {q.levels[String(level) as keyof QuestionLevel]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {currentQ > 0 && (
            <button
              onClick={() => setCurrentQ(currentQ - 1)}
              style={{
                fontSize: '12px',
                color: T.textMuted,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
              }}
            >
              ← Anterior
            </button>
          )}
          <div style={{ flex: 1 }} />
          {isLastQuestion && allAnswered && (
            <button
              onClick={handleSubmit}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: T.primary,
                color: '#0d1117',
                border: 'none',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              Finalizar <CheckCircle2 size={14} />
            </button>
          )}
        </div>
        {error && <p style={{ color: T.destructive, fontSize: '12px', margin: 0 }}>{error}</p>}
        <div ref={bottomRef} />
      </div>
    );
  }

  // ===== STEP: SUBMITTING =====
  if (internalStep === 'submitting') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', padding: '32px 0', animation: 'fade-in-up 0.4s ease-out' }}>
        <Loader2 size={40} color={T.primary} style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ color: T.text, fontWeight: 600, fontSize: '14px', margin: 0 }}>
          {isConsultor ? 'Analisando seu perfil de canal...' : 'Calculando seu diagnóstico...'}
        </p>
      </div>
    );
  }

  // ===== STEP: RESULT =====
  if (internalStep === 'result' && result) {
    const maturityColors = isConsultor ? CONSULTOR_MATURITY_COLORS : MATURITY_COLORS;
    const badgeColor = maturityColors[result.maturity_level] || T.textMuted;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fade-in-up 0.4s ease-out' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <CheckCircle2 size={32} color="#22c55e" />
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: T.text, margin: 0 }}>
            {isConsultor ? 'Diagnóstico de Canal Concluído!' : 'Diagnóstico Concluído!'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {isConsultor ? (
            <>
              <ScoreCard label="Negócio" score={result.score_gestao} icon={<Briefcase size={16} />} />
              <ScoreCard label="Escala" score={result.score_ia} icon={<TrendingUp size={16} />} />
              <ScoreCard label="Total" score={result.score_total} icon={<Sparkles size={16} />} />
            </>
          ) : (
            <>
              <ScoreCard label="Gestão" score={result.score_gestao} icon={<Target size={16} />} />
              <ScoreCard label="IA" score={result.score_ia} icon={<Bot size={16} />} />
              <ScoreCard label="Total" score={result.score_total} icon={<Sparkles size={16} />} />
            </>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              background: badgeColor,
              color: '#fff',
              fontSize: '14px',
              padding: '6px 16px',
              borderRadius: '999px',
              fontWeight: 600,
            }}
          >
            {result.maturity_level}
          </span>
        </div>

        {result.ai_summary && (
          <div
            style={{
              background: T.card,
              borderLeft: `4px solid ${T.primary}`,
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {result.ai_summary.split(/\n\n+/).map((paragraph, idx) => {
              const isBoldLine = paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**');
              if (isBoldLine) {
                return (
                  <h3 key={idx} style={{ fontSize: '13px', fontWeight: 700, color: T.primary, margin: '4px 0 0', textTransform: 'none' }}>
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              const lines = paragraph.split('\n');
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {lines.map((line, li) => {
                    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
                    const escapeHtml = (s: string) =>
                      s
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;');
                    const formatted = escapeHtml(line).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                    return (
                      <p
                        key={li}
                        style={{
                          fontSize: '12px',
                          color: isBullet ? T.textMuted : T.text,
                          lineHeight: 1.5,
                          margin: 0,
                          paddingLeft: isBullet ? '8px' : 0,
                        }}
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={onComplete}
          style={{
            width: '100%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px',
            background: T.primary,
            color: '#0d1117',
            border: 'none',
            borderRadius: '999px',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          Continuar <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return null;
}

function ScoreCard({ label, score, icon }: { label: string; score: number; icon: React.ReactNode }) {
  const pct = (score / 5) * 100;
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: '12px',
        padding: '12px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        alignItems: 'center',
      }}
    >
      <div style={{ color: T.primary }}>{icon}</div>
      <p style={{ fontSize: '10px', color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
        {label}
      </p>
      <p style={{ fontSize: '20px', fontWeight: 700, color: T.text, margin: 0 }}>{score.toFixed(1)}</p>
      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: T.primary, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}
