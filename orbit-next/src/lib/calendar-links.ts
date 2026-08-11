/**
 * Links de "adicionar ao calendário" para eventos recorrentes semanais.
 *
 * Extraído de treinamentos/obrigado/content.tsx, com três mudanças:
 *
 * 1. `location` vira parâmetro. Antes era uma constante de módulo (MEET_URL) —
 *    agora cada sessão tem seu próprio link pessoal do Zoom.
 * 2. Recorrência de verdade (RRULE/recur). O registro no Zoom vale para todas as
 *    ocorrências, então o convite de calendário também deve — antes criava um
 *    evento único numa data.
 * 3. Fuso via TZID + VTIMEZONE em vez de somar +3 na mão. O hack antigo
 *    (`Date.UTC(y, m-1, d, hour + 3, min)`) assume UTC-3 permanente; se o
 *    horário de verão voltar, todo convite sai uma hora errado.
 */

const TZ = 'America/Sao_Paulo';

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** Horário local, sem sufixo Z — usado junto de TZID. */
function localStamp(d: Date): string {
  return (
    `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}` +
    `T${pad2(d.getHours())}${pad2(d.getMinutes())}00`
  );
}

function utcStamp(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad2(d.getUTCMonth() + 1)}${pad2(d.getUTCDate())}` +
    `T${pad2(d.getUTCHours())}${pad2(d.getUTCMinutes())}00Z`
  );
}

function addMinutes(d: Date, min: number): Date {
  return new Date(d.getTime() + min * 60000);
}

function escICS(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\r?\n/g, '\\n');
}

export interface CalendarEvent {
  title: string;
  /** Início da PRIMEIRA ocorrência, em horário local. */
  start: Date;
  durationMin: number;
  description: string;
  /** URL de acesso (link pessoal do Zoom). */
  location: string;
  /** BYDAY do iCal: 'MO' | 'WE' | 'FR' … Presente = evento semanal recorrente. */
  byDay?: string;
  /**
   * Fim da recorrência. Sem isso a RRULE não tem UNTIL e o evento se repete para
   * sempre — o Google notifica cada ocorrência, indefinidamente.
   */
  until?: Date;
  /** Usado no UID do .ics. */
  uidKey: string;
}

/**
 * RRULE semanal, fechada com UNTIL quando há data-fim.
 *
 * UNTIL vai obrigatoriamente em UTC com sufixo Z: o DTSTART usa TZID (hora local), e o
 * RFC 5545 exige que, nesse caso, o UNTIL seja UTC. Passar hora local aqui faz o Google
 * ignorar a recorrência inteira em vez de reclamar.
 */
function weeklyRule(byDay: string, until?: Date): string {
  return `RRULE:FREQ=WEEKLY;BYDAY=${byDay}` + (until ? `;UNTIL=${utcStamp(until)}` : '');
}

/** Google Calendar. `recur` faz o evento nascer recorrente. */
export function buildGoogleUrl(ev: CalendarEvent): string {
  const end = addMinutes(ev.start, ev.durationMin);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${utcStamp(ev.start)}/${utcStamp(end)}`,
    details: ev.description,
    location: ev.location,
    ctz: TZ,
  });
  let url = `https://calendar.google.com/calendar/render?${params.toString()}`;
  if (ev.byDay) {
    // Não passa pelo URLSearchParams: o Google espera a RRULE literal aqui.
    url += `&recur=${encodeURIComponent(weeklyRule(ev.byDay, ev.until))}`;
  }
  return url;
}

/** Outlook Web. Não aceita recorrência por deeplink — cria a primeira ocorrência. */
export function buildOutlookUrl(ev: CalendarEvent): string {
  const end = addMinutes(ev.start, ev.durationMin);
  const iso = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}` +
    `T${pad2(d.getHours())}:${pad2(d.getMinutes())}:00`;
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: ev.title,
    startdt: iso(ev.start),
    enddt: iso(end),
    body: ev.description,
    location: ev.location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * .ics com N eventos recorrentes — um arquivo cobre todas as sessões escolhidas.
 * Inclui VTIMEZONE para São Paulo, então o horário é interpretado corretamente
 * mesmo que as regras de fuso mudem.
 */
export function buildICS(events: CalendarEvent[]): string {
  const stamp = utcStamp(new Date());
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Orbit Gestao//Treinamentos//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    `TZID:${TZ}`,
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:-0300',
    'TZOFFSETTO:-0300',
    'TZNAME:-03',
    'END:STANDARD',
    'END:VTIMEZONE',
  ];

  for (const ev of events) {
    const end = addMinutes(ev.start, ev.durationMin);
    lines.push(
      'BEGIN:VEVENT',
      // UID ESTÁVEL, derivado só do slug. Antes tinha um sufixo Math.random(), e o UID é
      // exatamente o que o iCal usa para dizer "este é o mesmo evento": com valor novo a
      // cada geração, baixar o .ics duas vezes (ou se inscrever de novo) criava uma SÉRIE
      // SEMANAL NOVA em vez de atualizar a existente. N cliques = N séries sobrepostas,
      // cada uma notificando por conta própria.
      `UID:treinamento-${ev.uidKey}@orbitgestao.com.br`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=${TZ}:${localStamp(ev.start)}`,
      `DTEND;TZID=${TZ}:${localStamp(end)}`,
      ...(ev.byDay ? [weeklyRule(ev.byDay, ev.until)] : []),
      `SUMMARY:${escICS(ev.title)}`,
      `DESCRIPTION:${escICS(ev.description)}`,
      `LOCATION:${escICS(ev.location)}`,
      `URL:${ev.location}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'BEGIN:VALARM',
      'TRIGGER:-PT30M',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escICS(ev.title)} comeca em 30 minutos`,
      'END:VALARM',
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/** data: URI para usar em <a download>. */
export function icsDataUri(ics: string): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
