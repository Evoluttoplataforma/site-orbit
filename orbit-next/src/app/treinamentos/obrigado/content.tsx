'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const TRAININGS_LOOKUP: Record<string, { title: string; day: number; hour: number }> = {
  'clientes-seg-14': { title: 'Clientes finais — Segunda 14h', day: 1, hour: 14 },
  'clientes-qua-10': { title: 'Clientes finais — Quarta 10h', day: 3, hour: 10 },
  'consultorias-qua-13': { title: 'Consultorias — Quarta 13h', day: 3, hour: 13 },
  'consultorias-sex-10': { title: 'Consultorias — Sexta 10h', day: 5, hour: 10 },
};

const DAY_LABELS: Record<number, string> = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};
const MEET_URL = 'https://meet.google.com/yzw-piji-xhi';
const DURATION_MIN = 60;

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toUTCStamp(y: number, m: number, d: number, hour: number, min: number): string {
  const dt = new Date(Date.UTC(y, m - 1, d, hour + 3, min, 0));
  return (
    dt.getUTCFullYear().toString() +
    pad(dt.getUTCMonth() + 1) +
    pad(dt.getUTCDate()) +
    'T' +
    pad(dt.getUTCHours()) +
    pad(dt.getUTCMinutes()) +
    '00Z'
  );
}

function buildGoogleUrl(title: string, startUTC: string, endUTC: string, details: string): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startUTC}/${endUTC}`,
    details,
    location: MEET_URL,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildOutlookUrl(
  title: string,
  y: number,
  m: number,
  d: number,
  hour: number,
  durMin: number,
  details: string
): string {
  const startISO = `${y}-${pad(m)}-${pad(d)}T${pad(hour)}:00:00-03:00`;
  const endMin = hour * 60 + durMin;
  const endHour = Math.floor(endMin / 60);
  const endMm = endMin % 60;
  const endISO = `${y}-${pad(m)}-${pad(d)}T${pad(endHour)}:${pad(endMm)}:00-03:00`;
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: title,
    startdt: startISO,
    enddt: endISO,
    body: details,
    location: MEET_URL,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function buildICS(
  title: string,
  startUTC: string,
  endUTC: string,
  details: string,
  slug: string,
  dateStr: string
): string {
  const dtStamp = toUTCStamp(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth() + 1,
    new Date().getUTCDate(),
    new Date().getUTCHours() - 3,
    new Date().getUTCMinutes()
  );
  const uid = `treinamento-${slug}-${dateStr.replace(/-/g, '')}-${Math.random().toString(36).slice(2, 10)}@orbitgestao.com.br`;
  const esc = (s: string) =>
    s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Orbit Gestao//Treinamentos//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${startUTC}`,
    `DTEND:${endUTC}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(details)}`,
    `LOCATION:${esc(MEET_URL)}`,
    `URL:${MEET_URL}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(title)} comeca em 30 minutos`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('t') || '';
    const dateStr = params.get('d') || '';
    const t = TRAININGS_LOOKUP[slug];
    const details = ref.current.querySelector('#trainingObrigadoDetails') as HTMLElement | null;
    if (!t || !details) return;

    let dateLabel = '';
    if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];
      dateLabel = `${DAY_LABELS[dt.getDay()] || ''}, ${dt.getDate()} de ${months[dt.getMonth()]}`;
    }

    details.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <div style="width:44px;height:44px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fa-solid fa-graduation-cap" style="color:#ffba1a;font-size:18px;"></i>
        </div>
        <div>
          <strong style="color:#fff;font-size:15px;display:block;">${t.title}</strong>
          <span style="color:#8B949E;font-size:13px;">${dateLabel || DAY_LABELS[t.day]} • ${String(t.hour).padStart(2, '0')}h00</span>
        </div>
      </div>
      <a href="${MEET_URL}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:16px 20px;background:linear-gradient(135deg,#34A853,#2d8f47);color:#fff;border-radius:50px;font-weight:800;font-size:15px;text-decoration:none;box-sizing:border-box;">
        <i class="fa-solid fa-video"></i> Entrar no Google Meet
      </a>
      <p style="color:#8B949E;font-size:12px;margin:12px 0 0;text-align:center;line-height:1.4;">Entre no horário da sessão. Se chegar antes, espere o time abrir a sala.</p>`;

    if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, mo, d] = dateStr.split('-').map(Number);
      const startUTC = toUTCStamp(y, mo, d, t.hour, 0);
      const endMin = t.hour * 60 + DURATION_MIN;
      const endUTC = toUTCStamp(y, mo, d, Math.floor(endMin / 60), endMin % 60);
      const title = `Tira dúvidas Orbit: ${t.title}`;
      const description = `Sessão de tira dúvidas da Orbit. Link da sala: ${MEET_URL}`;

      const googleUrl = buildGoogleUrl(title, startUTC, endUTC, description);
      const outlookUrl = buildOutlookUrl(title, y, mo, d, t.hour, DURATION_MIN, description);
      const icsContent = buildICS(title, startUTC, endUTC, description, slug, dateStr);
      const icsDataUrl = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent);
      const icsFilename = `treinamento-${slug}-${dateStr}.ics`;

      const calBlock = ref.current.querySelector('#trainingCalendarBlock') as HTMLElement | null;
      const calBtns = ref.current.querySelector('#trainingCalendarBtns') as HTMLElement | null;
      if (calBlock && calBtns) {
        calBtns.innerHTML = `
          <a class="ty-cal-btn" href="${googleUrl}" target="_blank" rel="noopener">
            <i class="fa-brands fa-google" style="color:#4285F4;"></i>
            <span>Google Calendar</span>
          </a>
          <a class="ty-cal-btn" href="${outlookUrl}" target="_blank" rel="noopener">
            <i class="fa-brands fa-microsoft" style="color:#0078D4;"></i>
            <span>Outlook</span>
          </a>
          <a class="ty-cal-btn" href="${icsDataUrl}" download="${icsFilename}">
            <i class="fa-brands fa-apple" style="color:#fff;"></i>
            <span>Apple / iCal</span>
          </a>
        `;
        calBlock.style.display = 'block';
      }
    }
  }, [mounted]);

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
