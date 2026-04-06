'use client';
import { useState, useEffect, useMemo } from 'react';
import { CheckCircle, Copy, CalendarPlus, Download, MessageCircle, Monitor, Users, Lightbulb, Share2 } from 'lucide-react';

interface ConfirmationScreenProps {
  name: string;
  date: string;
  time: string;
  segmento?: string;
  meetingLink?: string;
}

const LEGACY_LINK = 'https://meet.google.com/qpy-himp-cxj';

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

  return (
    <div className="flex flex-col items-center text-center py-8 animate-fade-in-up space-y-6">
      <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-success" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-foreground">Prontinho, {name}!</h2>
        <p className="text-muted-foreground mt-1">Sua demonstração está confirmada. Faltam</p>
      </div>
      <div className="flex items-center gap-2">
        {[
          { value: countdown.days, label: 'DIAS' },
          { value: countdown.hours, label: 'HORAS' },
          { value: countdown.min, label: 'MIN' },
          { value: countdown.seg, label: 'SEG' },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-muted-foreground text-xl font-light">:</span>}
            <div className="flex flex-col items-center">
              <div className="bg-secondary border border-border rounded-xl w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{pad(item.value)}</span>
              </div>
              <span className="text-[10px] tracking-wider text-muted-foreground mt-1">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
      <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-full px-6 py-3 font-medium hover:bg-primary/90 transition-colors w-full max-w-sm">
        <CalendarPlus className="w-5 h-5" />Adicionar ao Google Agenda
      </a>
      <button onClick={handleDownloadICS}
        className="flex items-center justify-center gap-3 bg-secondary text-foreground border border-border rounded-full px-6 py-3 font-medium hover:bg-muted transition-colors w-full max-w-sm">
        <Download className="w-5 h-5" />Baixar para outro calendário
      </button>
      <a href={whatsappGroupLink} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 bg-[hsl(142,70%,45%)] text-white rounded-full px-6 py-3 font-medium hover:bg-[hsl(142,70%,40%)] transition-colors w-full max-w-sm">
        <MessageCircle className="w-5 h-5" />Entrar no grupo do WhatsApp
      </a>
      <p className="text-xs text-muted-foreground max-w-sm">
        Acompanhe novidades, dicas e conteúdos exclusivos sobre gestão e IA no nosso grupo.
      </p>
      <div className="flex items-center bg-secondary rounded-xl px-4 py-3 border border-border w-full max-w-sm">
        <span className="flex-1 text-sm text-muted-foreground truncate text-left">{resolvedLink}</span>
        <button onClick={handleCopy} className="ml-2 p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
          <Copy className="w-4 h-4 text-foreground" />
        </button>
      </div>
      {copied && <span className="text-xs text-success">Copiado!</span>}
      <div className="w-full max-w-sm mt-4 pt-6 border-t border-border space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">📋 Prepare-se para a melhor demonstração</h3>
        <div className="flex items-start gap-3 text-left">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Monitor className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Use o computador</p>
            <p className="text-xs text-muted-foreground">A experiência é muito melhor em tela grande — você vai ver dashboards, processos e indicadores com clareza.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-left">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Convide seus sócios e líderes</p>
            <p className="text-xs text-muted-foreground">Decisões estratégicas são melhores em equipe.</p>
            <button onClick={() => { navigator.clipboard.writeText(resolvedLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
              <Share2 className="w-3 h-3" />Copiar link para compartilhar
            </button>
          </div>
        </div>
        <div className="flex items-start gap-3 text-left">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Dicas para aproveitar ao máximo</p>
            <ul className="text-xs text-muted-foreground space-y-1 mt-1 list-none">
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
