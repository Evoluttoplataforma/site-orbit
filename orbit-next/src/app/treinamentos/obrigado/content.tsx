'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';
import {
  parseSlugs,
  nextOccurrence,
  longDateLabel,
  timeLabel,
  icalByDay,
  WEEKDAY_FULL,
  RECURRENCE_ENDS_AT,
  type TrainingSession,
} from '@/lib/training-sessions';
import {
  buildGoogleUrl,
  buildOutlookUrl,
  buildICS,
  icsDataUri,
  type CalendarEvent,
} from '@/lib/calendar-links';

const RESULT_KEY = 'orbit_training_reg';

interface RegResult {
  slug: string;
  status: string;
  join_url: string | null;
  next_occurrence?: string;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const root = ref.current;

    const details = root.querySelector('#trainingObrigadoDetails') as HTMLElement | null;
    const msgEl = root.querySelector('#trainingObrigadoMsg') as HTMLElement | null;
    if (!details) return;

    // ?t=slug1,slug2 — parseSlugs aceita slugs legados de bookmark e ignora inválidos
    const params = new URLSearchParams(window.location.search);
    const sessions = parseSlugs(params.get('t'));

    // join_url é pessoal (por par pessoa+reunião), então vem por sessionStorage,
    // não pela URL: em query string apareceria em referrer e em analytics.
    let results: RegResult[] = [];
    let nome = '';
    try {
      const raw = sessionStorage.getItem(RESULT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        results = Array.isArray(parsed?.results) ? parsed.results : [];
        nome = String(parsed?.nome || '');
      }
    } catch {
      /* modo privado: segue sem os links pessoais */
    }
    const byslug = new Map(results.map((r) => [r.slug, r]));

    if (!sessions.length) {
      // Sem slug reconhecível (link antigo, colado errado): não deixa a página vazia.
      if (msgEl) {
        msgEl.innerHTML =
          'Sua inscrição foi registrada. O link de acesso e os detalhes das sessões estão no e-mail de confirmação que o Zoom acabou de enviar.';
      }
      details.innerHTML = `
        <p style="color:#8B949E;font-size:14px;line-height:1.6;margin:0;">
          Não conseguimos identificar as sessões neste link. Confira seu e-mail ou
          <a href="/treinamentos" style="color:#ffba1a;">volte à agenda</a> para se inscrever de novo.
        </p>`;
      return;
    }

    const firstName = nome.trim().split(/\s+/)[0];
    if (msgEl) {
      const plural = sessions.length > 1;
      msgEl.innerHTML = `${firstName ? esc(firstName) + ', sua' : 'Sua'} inscrição está confirmada ${
        plural ? `nas <strong style="color:#fff;">${sessions.length} sessões</strong>` : 'na sessão'
      } abaixo — e vale para <strong style="color:#fff;">todas as semanas</strong>. Você recebe o link por e-mail e um lembrete antes de cada encontro.`;
    }

    // ─── um bloco por sessão ─────────────────────────────────────────────
    const anyPending = sessions.some((s) => {
      const r = byslug.get(s.slug);
      return r ? r.status !== 'registered' : false;
    });

    details.innerHTML = sessions
      .map((s, i) => {
        const r = byslug.get(s.slug);
        const next = nextOccurrence(s);
        const joinUrl = r?.join_url || '';
        const registered = r?.status === 'registered';

        const button = joinUrl
          ? `<a href="${esc(joinUrl)}" target="_blank" rel="noopener noreferrer"
                style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px 20px;background:linear-gradient(135deg,#2D8CFF,#1A6FD9);color:#fff;border-radius:50px;font-weight:800;font-size:14px;text-decoration:none;box-sizing:border-box;">
               <i class="fa-solid fa-video"></i> Entrar no Zoom
             </a>`
          : `<p style="color:#8B949E;font-size:12.5px;line-height:1.5;margin:0;padding:12px 14px;background:rgba(45,140,255,0.06);border:1px solid rgba(45,140,255,0.2);border-radius:10px;">
               <i class="fa-solid fa-envelope" style="color:#2D8CFF;margin-right:6px;"></i>
               ${registered
                 ? 'O link de acesso está no e-mail de confirmação do Zoom.'
                 : 'Estamos finalizando seu cadastro — o link chega por e-mail em alguns minutos.'}
             </p>`;

        return `
        <div style="${i > 0 ? 'margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);' : ''}">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
            <div style="width:44px;height:44px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fa-solid ${s.icon}" style="color:#ffba1a;font-size:18px;"></i>
            </div>
            <div>
              <strong style="color:#fff;font-size:15px;display:block;">${esc(s.title)}</strong>
              <span style="color:#8B949E;font-size:13px;">${WEEKDAY_FULL[s.weekday]} · ${timeLabel(s)} &nbsp;•&nbsp; toda semana</span>
              <span style="color:#6B7280;font-size:12px;display:block;margin-top:2px;">Próxima: ${longDateLabel(next)}</span>
            </div>
          </div>
          ${button}
        </div>`;
      })
      .join('');

    if (anyPending) {
      details.innerHTML += `
        <p style="color:#8B949E;font-size:12px;margin:16px 0 0;text-align:center;line-height:1.5;">
          Entre no horário da sessão. Se chegar antes, aguarde o time abrir a sala.
        </p>`;
    }

    // ─── calendário: eventos recorrentes ─────────────────────────────────
    const events: CalendarEvent[] = sessions.map((s: TrainingSession) => {
      const r = byslug.get(s.slug);
      const location = r?.join_url || 'https://orbitgestao.com.br/treinamentos';
      return {
        title: `${s.title} Orbit · ${WEEKDAY_FULL[s.weekday]}`,
        start: nextOccurrence(s),
        durationMin: s.durationMin,
        description:
          s.kind === 'treinamento'
            ? `Aula preparada da Orbit, passo a passo. Acesso: ${location}`
            : `Perguntas e respostas ao vivo sobre o Orbit. A pauta é sua. Acesso: ${location}`,
        location,
        byDay: icalByDay(s.weekday),
        until: RECURRENCE_ENDS_AT,
        uidKey: s.slug,
      };
    });

    const calBlock = root.querySelector('#trainingCalendarBlock') as HTMLElement | null;
    const calBtns = root.querySelector('#trainingCalendarBtns') as HTMLElement | null;
    if (calBlock && calBtns && events.length) {
      // Google e Outlook aceitam um evento por link; o .ics leva todos de uma vez.
      const first = events[0];
      const icsHref = icsDataUri(buildICS(events));
      const icsName =
        events.length > 1 ? 'treinamentos-orbit.ics' : `treinamento-${sessions[0].slug}.ics`;

      calBtns.innerHTML = `
        <a class="ty-cal-btn" href="${esc(buildGoogleUrl(first))}" target="_blank" rel="noopener">
          <i class="fa-brands fa-google" style="color:#4285F4;"></i>
          <span>Google Calendar</span>
        </a>
        <a class="ty-cal-btn" href="${esc(buildOutlookUrl(first))}" target="_blank" rel="noopener">
          <i class="fa-brands fa-microsoft" style="color:#0078D4;"></i>
          <span>Outlook</span>
        </a>
        <a class="ty-cal-btn" href="${icsHref}" download="${icsName}">
          <i class="fa-brands fa-apple" style="color:#fff;"></i>
          <span>Apple / iCal</span>
        </a>`;

      if (events.length > 1) {
        const hint = document.createElement('p');
        hint.style.cssText =
          'color:#6B7280;font-size:11.5px;margin:12px 0 0;text-align:center;line-height:1.45;';
        hint.textContent =
          'Google e Outlook adicionam a primeira sessão. O arquivo Apple/iCal traz todas de uma vez.';
        calBtns.parentElement?.appendChild(hint);
      }
      calBlock.style.display = 'block';
    }
  }, [mounted]);

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
