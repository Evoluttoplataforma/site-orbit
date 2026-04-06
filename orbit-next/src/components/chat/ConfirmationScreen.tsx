'use client';
import { useState, useEffect, useMemo } from 'react';
import { CheckCircle, Copy, CalendarPlus, Download, MessageCircle, Monitor, Users, Lightbulb, Share2, Check } from 'lucide-react';

interface ConfirmationScreenProps {
  name: string;
  date: string;
  time: string;
  segmento?: string;
  meetingLink?: string;
}

const LEGACY_LINK = 'https://meet.google.com/qpy-himp-cxj';

const C = {
  text: '#ffffff',
  textMuted: '#8b949e',
  textDim: '#6b7280',
  card: '#1c2230',
  cardLight: '#242b3a',
  border: 'rgba(255,255,255,0.1)',
  primary: '#ffba1a',
  primaryDark: '#0d1117',
  success: '#22c55e',
  successBg: 'rgba(34,197,94,0.15)',
  whatsapp: '#22c55e',
};

export default function ConfirmationScreen({ name, date, time, segmento, meetingLink }: ConfirmationScreenProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, min: 0, seg: 0 });
  const [copied, setCopied] = useState(false);

  const isConsultor = segmento?.toLowerCase().includes('consultor') || segmento?.toLowerCase().includes('consultoria');
  const whatsappGroupLink = isConsultor
    ? 'https://chat.whatsapp.com/JnvD7U2BpdI0Tr4oWNMyuu'
    : 'https://chat.whatsapp.com/GsAH5Ve8PGh5QIPFLjPYkN?mode=gi_t';

  const resolvedLink = meetingLink || LEGACY_LINK;

  const googleCalendarUrl = useMemo(() => {
    const parts = date.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);
    const [h, m] = time.split(':').map(Number);
    const start = new Date(year, month, day, h, m);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const fmt = (d: Date) =>
      d.getFullYear().toString() +
      (d.getMonth() + 1).toString().padStart(2, '0') +
      d.getDate().toString().padStart(2, '0') +
      'T' +
      d.getHours().toString().padStart(2, '0') +
      d.getMinutes().toString().padStart(2, '0') +
      '00';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Demonstração Orbit',
      dates: `${fmt(start)}/${fmt(end)}`,
      details: `Link da demonstração: ${resolvedLink}`,
      location: resolvedLink,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [date, time, resolvedLink]);

  const handleDownloadICS = () => {
    const parts = date.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);
    const [h, m] = time.split(':').map(Number);
    const start = new Date(year, month, day, h, m);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const fmtICS = (d: Date) =>
      d.getFullYear().toString() +
      (d.getMonth() + 1).toString().padStart(2, '0') +
      d.getDate().toString().padStart(2, '0') +
      'T' +
      d.getHours().toString().padStart(2, '0') +
      d.getMinutes().toString().padStart(2, '0') +
      '00';
    const ics = [
      'BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT',
      `DTSTART:${fmtICS(start)}`, `DTEND:${fmtICS(end)}`,
      'SUMMARY:Demonstração Orbit',
      `DESCRIPTION:Link da demonstração: ${resolvedLink}`,
      `LOCATION:${resolvedLink}`,
      'END:VEVENT','END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demonstracao-orbit.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const parts = date.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);
    const [h, m] = time.split(':').map(Number);
    const target = new Date(year, month, day, h, m);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) { setCountdown({ days: 0, hours: 0, min: 0, seg: 0 }); return; }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        min: Math.floor((diff % 3600000) / 60000),
        seg: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [date, time]);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const handleCopy = () => {
    navigator.clipboard.writeText(resolvedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttonBase: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px 20px',
    borderRadius: '14px',
    border: 'none',
    fontWeight: 600,
    fontSize: '15px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '24px',
        animation: 'fade-in-up 0.5s ease-out',
      }}
    >
      {/* Check icon */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: C.successBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <CheckCircle size={40} color={C.success} strokeWidth={2.5} />
      </div>

      {/* Title */}
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: C.text, margin: '0 0 8px', lineHeight: 1.2 }}>
          Prontinho, {name}!
        </h2>
        <p style={{ color: C.textMuted, fontSize: '14px', margin: 0 }}>
          Sua demonstração está confirmada. Faltam:
        </p>
      </div>

      {/* Countdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {[
          { value: countdown.days, label: 'DIAS' },
          { value: countdown.hours, label: 'HORAS' },
          { value: countdown.min, label: 'MIN' },
          { value: countdown.seg, label: 'SEG' },
        ].map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {i > 0 && <span style={{ color: C.textDim, fontSize: '20px', fontWeight: 300 }}>:</span>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: '14px',
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '24px', fontWeight: 800, color: C.text, fontVariantNumeric: 'tabular-nums' }}>
                  {pad(item.value)}
                </span>
              </div>
              <span style={{ fontSize: '10px', color: C.textMuted, letterSpacing: '1px', fontWeight: 600 }}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...buttonBase,
            background: C.primary,
            color: C.primaryDark,
            boxShadow: '0 6px 24px rgba(255,186,26,0.3)',
          }}
        >
          <CalendarPlus size={18} />
          Adicionar ao Google Agenda
        </a>

        <button
          onClick={handleDownloadICS}
          style={{
            ...buttonBase,
            background: C.card,
            color: C.text,
            border: `1px solid ${C.border}`,
          }}
        >
          <Download size={18} />
          Baixar para outro calendário
        </button>

        <a
          href={whatsappGroupLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...buttonBase,
            background: C.whatsapp,
            color: '#ffffff',
            boxShadow: '0 6px 24px rgba(34,197,94,0.25)',
          }}
        >
          <MessageCircle size={18} />
          Entrar no grupo do WhatsApp
        </a>
      </div>

      <p style={{ fontSize: '12px', color: C.textMuted, margin: 0, maxWidth: '380px', lineHeight: 1.5 }}>
        Acompanhe novidades, dicas e conteúdos exclusivos sobre gestão e IA no nosso grupo.
      </p>

      {/* Meeting link */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: '12px',
          padding: '12px 14px',
          width: '100%',
        }}
      >
        <span
          style={{
            flex: 1,
            fontSize: '13px',
            color: C.textMuted,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'left',
          }}
        >
          {resolvedLink}
        </span>
        <button
          onClick={handleCopy}
          style={{
            padding: '8px',
            borderRadius: '8px',
            background: copied ? C.successBg : 'rgba(255,255,255,0.06)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
          }}
        >
          {copied ? <Check size={16} color={C.success} /> : <Copy size={16} color={C.text} />}
        </button>
      </div>

      {/* Tips section */}
      <div
        style={{
          width: '100%',
          marginTop: '16px',
          paddingTop: '24px',
          borderTop: `1px solid ${C.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h3 style={{ fontSize: '12px', fontWeight: 700, color: C.text, letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>
          📋 Prepare-se para a melhor demonstração
        </h3>

        {/* Tip 1 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', textAlign: 'left' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,186,26,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Monitor size={16} color={C.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: C.text, margin: '0 0 4px' }}>Use o computador</p>
            <p style={{ fontSize: '12px', color: C.textMuted, margin: 0, lineHeight: 1.5 }}>
              A experiência é muito melhor em tela grande — você vai ver dashboards, processos e indicadores com clareza.
            </p>
          </div>
        </div>

        {/* Tip 2 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', textAlign: 'left' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,186,26,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Users size={16} color={C.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: C.text, margin: '0 0 4px' }}>Convide seus sócios e líderes</p>
            <p style={{ fontSize: '12px', color: C.textMuted, margin: '0 0 8px', lineHeight: 1.5 }}>
              Decisões estratégicas são melhores em equipe.
            </p>
            <button
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: C.primary,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
              }}
            >
              <Share2 size={12} />
              Copiar link para compartilhar
            </button>
          </div>
        </div>

        {/* Tip 3 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', textAlign: 'left' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,186,26,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Lightbulb size={16} color={C.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: C.text, margin: '0 0 6px' }}>Dicas para aproveitar ao máximo</p>
            <ul style={{ fontSize: '12px', color: C.textMuted, margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: 1.5 }}>
              <li>✓ Anote suas maiores dores de gestão antes</li>
              <li>✓ Pense em 2-3 processos que mais travam sua operação</li>
              <li>✓ Tenha em mente seus indicadores atuais</li>
              <li>✓ Reserve 30 minutos sem interrupções</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
