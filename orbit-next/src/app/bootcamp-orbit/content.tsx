'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';
import { footerHTML } from '@/components/shared-footer';

const SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

const BOOTCAMP_DATE = new Date('2026-06-13T09:00:00-03:00');

const IGOR_AVATAR = '/images/bootcamp/igor-fardado.webp';

// Lista de alistamentos fakes que ficam aparecendo no canto
const FAKE_ENLISTS = [
  { nome: 'Lucas Silva', empresa: 'Pinnacle Consultoria', cidade: 'São Paulo · SP' },
  { nome: 'Mariana Costa', empresa: 'NextStep Estratégia', cidade: 'Belo Horizonte · MG' },
  { nome: 'Roberto Almeida', empresa: 'Vértice Gestão', cidade: 'Curitiba · PR' },
  { nome: 'Patrícia Oliveira', empresa: 'Atlas Consultoria', cidade: 'Porto Alegre · RS' },
  { nome: 'André Mendes', empresa: 'Engaja PME', cidade: 'Recife · PE' },
  { nome: 'Camila Rocha', empresa: 'Foco Consultoria', cidade: 'Goiânia · GO' },
  { nome: 'Felipe Tavares', empresa: 'Sigma Gestão', cidade: 'Florianópolis · SC' },
  { nome: 'Juliana Pereira', empresa: 'Orbit Partner Cuiabá', cidade: 'Cuiabá · MT' },
  { nome: 'Eduardo Pinheiro', empresa: 'Acta Consultoria', cidade: 'Salvador · BA' },
  { nome: 'Renata Souza', empresa: 'Vetor Gestão', cidade: 'Fortaleza · CE' },
  { nome: 'Marcos Vinícius', empresa: 'Eixo Estratégico', cidade: 'Brasília · DF' },
  { nome: 'Beatriz Lima', empresa: 'Trilha Consultoria', cidade: 'Vitória · ES' },
];

// Perguntas do Igor no chat — em ordem
type Step =
  | { kind: 'msg'; text: string; delay?: number }
  | { kind: 'input'; field: string; placeholder: string; type?: string; validate?: (v: string) => string | null }
  | { kind: 'choices'; field: string; options: { label: string; value: string }[] };

const VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEPS: Step[] = [
  { kind: 'msg', text: 'Olá, recruta. Sou o General Igor Furniel. 🪖' },
  { kind: 'msg', text: 'Vou te fazer 5 perguntas rápidas pra garantir sua vaga no Bootcamp Orbit do dia 13/06.', delay: 1400 },
  { kind: 'msg', text: 'Vamos começar — qual é seu nome completo?', delay: 1200 },
  { kind: 'input', field: 'nome', placeholder: 'Digite seu nome', validate: (v) => v.trim().length < 3 ? 'Digite seu nome completo' : null },
  { kind: 'msg', text: 'Bom ter você aqui. Qual é o melhor e-mail pra te enviarmos as coordenadas da operação?', delay: 800 },
  { kind: 'input', field: 'email', type: 'email', placeholder: 'voce@empresa.com', validate: (v) => !VALID_EMAIL.test(v) ? 'E-mail inválido' : null },
  { kind: 'msg', text: 'Confirmado. Agora seu WhatsApp pra entrar no grupo dos recrutas:', delay: 700 },
  { kind: 'input', field: 'telefone', type: 'tel', placeholder: '(00) 00000-0000', validate: (v) => v.replace(/\D/g, '').length < 10 ? 'Telefone inválido' : null },
  { kind: 'msg', text: 'Perfeito. Qual o nome da sua consultoria?', delay: 700 },
  { kind: 'input', field: 'empresa', placeholder: 'Nome da consultoria', validate: (v) => v.trim().length < 2 ? 'Digite o nome da empresa' : null },
  { kind: 'msg', text: 'Último passo — como você quer participar?', delay: 700 },
  { kind: 'choices', field: 'modalidade', options: [
    { label: '🪖 Presencial · Floripa · R$150', value: 'presencial' },
    { label: '📡 Online ao vivo · Grátis', value: 'online' },
  ] },
  { kind: 'msg', text: 'Inscrição em análise...', delay: 600 },
];

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const root = ref.current;

    // ═══ Marca body com data-bc pra ativar cursor mira global ═══
    document.body.setAttribute('data-bc', '1');

    // ═══ Trava overflow horizontal (SVGs, tickers, decorativos podem estourar) ═══
    const prevHtmlOX = document.documentElement.style.overflowX;
    const prevBodyOX = document.body.style.overflowX;
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    // ═══ Countdown ═══
    const daysEl = root.querySelector('#bcDays') as HTMLElement | null;
    const hoursEl = root.querySelector('#bcHours') as HTMLElement | null;
    const minsEl = root.querySelector('#bcMins') as HTMLElement | null;
    const secsEl = root.querySelector('#bcSecs') as HTMLElement | null;
    const alertDaysEl = root.querySelector('#bcAlertDays') as HTMLElement | null;

    function updateCountdown() {
      const now = new Date();
      const diff = BOOTCAMP_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        [daysEl, hoursEl, minsEl, secsEl].forEach((el) => { if (el) el.textContent = '00'; });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
      if (alertDaysEl) alertDaysEl.textContent = String(d);
    }
    updateCountdown();
    const cdInterval = setInterval(updateCountdown, 1000);

    // ═══ Roster ═══
    const rosterCount = root.querySelector('#bcRosterCount') as HTMLElement | null;
    const rosterBar = root.querySelector('#bcRosterBar') as HTMLElement | null;
    const TOTAL_VAGAS = 200;
    const BASE_INSCRITOS = 147;
    fetch(`${SB_URL}/rest/v1/live_orbit_leads?source=like.bootcamp-orbit%25&select=id`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Prefer: 'count=exact' },
    }).then((r) => {
      const range = r.headers.get('content-range') || '0-0/0';
      const real = parseInt(range.split('/')[1] || '0', 10);
      const display = Math.min(BASE_INSCRITOS + real, TOTAL_VAGAS);
      const pct = Math.min(Math.round((display / TOTAL_VAGAS) * 100), 100);
      if (rosterCount) rosterCount.textContent = String(display);
      if (rosterBar) rosterBar.style.width = pct + '%';
    }).catch(() => {});

    // ═══ Audio de tecla — Web Audio API gerado em código ═══
    let audioCtx: AudioContext | null = null;
    function getAudio() {
      if (audioCtx) return audioCtx;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
      if (Ctx) audioCtx = new Ctx();
      return audioCtx;
    }
    function beep(freq = 850, duration = 0.04, vol = 0.06) {
      const ctx = getAudio();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.value = vol;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {}
    }
    function beepSend() {
      // sequência rápida tipo "tac-tic" pro envio
      beep(600, 0.05, 0.08);
      setTimeout(() => beep(900, 0.06, 0.08), 60);
    }

    // ═══ Toast de alistamentos fakes ═══
    let toastIdx = 0;
    function showToast() {
      const fake = FAKE_ENLISTS[toastIdx % FAKE_ENLISTS.length];
      toastIdx++;
      // Cria toast
      const t = document.createElement('div');
      t.className = 'bc-toast';
      t.innerHTML = `
        <div class="bc-toast__icon"><i class="fa-solid fa-user-plus"></i></div>
        <div class="bc-toast__body">
          <p class="bc-toast__title">★ Novo Alistamento ★</p>
          <p class="bc-toast__text">${fake.nome} se alistou<small>${fake.empresa} · ${fake.cidade}</small></p>
        </div>`;
      document.body.appendChild(t);
      // anima entrada
      requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('is-visible')));
      // remove depois de 6s
      setTimeout(() => {
        t.classList.remove('is-visible');
        setTimeout(() => t.remove(), 800);
      }, 6000);
    }
    // primeiro toast após 8s; depois a cada 18-30s aleatório
    const firstToastTo = window.setTimeout(showToast, 8000);
    const toastInterval = window.setInterval(() => {
      showToast();
    }, 22000);

    // ═══ CHAT CONVERSACIONAL ═══
    const chatBody = root.querySelector('#bcChatBody') as HTMLElement | null;
    const chatBar = root.querySelector('#bcChatBar') as HTMLElement | null;
    const inputArea = root.querySelector('#bcChatInputArea') as HTMLElement | null;
    const chatInput = root.querySelector('#bcChatInput') as HTMLInputElement | null;
    const chatSend = root.querySelector('#bcChatSend') as HTMLButtonElement | null;
    const chatChoices = root.querySelector('#bcChatChoices') as HTMLElement | null;

    const answers: Record<string, string> = {};
    let stepIdx = 0;
    let submitted = false;

    function appendMsg(text: string, isUser = false) {
      if (!chatBody) return;
      const div = document.createElement('div');
      div.className = 'bc-msg' + (isUser ? ' bc-msg--user' : '');
      div.innerHTML = isUser
        ? `<div class="bc-msg__avatar">EU</div><div class="bc-msg__bubble">${escapeHtml(text)}</div>`
        : `<div class="bc-msg__avatar"><img src="${IGOR_AVATAR}" alt="Igor"></div><div class="bc-msg__bubble">${escapeHtml(text)}</div>`;
      chatBody.appendChild(div);
      requestAnimationFrame(() => div.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }
    function escapeHtml(s: string) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function appendTyping(): HTMLElement {
      const div = document.createElement('div');
      div.className = 'bc-msg';
      div.innerHTML = `<div class="bc-msg__avatar"><img src="${IGOR_AVATAR}" alt="Igor"></div><div class="bc-msg__bubble"><span class="bc-typing"><span></span><span></span><span></span></span></div>`;
      chatBody?.appendChild(div);
      requestAnimationFrame(() => div.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      return div;
    }
    function updateProgress() {
      const inputSteps = STEPS.filter((s) => s.kind === 'input' || s.kind === 'choices').length;
      const answered = Object.keys(answers).length;
      const pct = Math.min((answered / inputSteps) * 100, 100);
      if (chatBar) chatBar.style.width = pct + '%';
    }

    async function runStep() {
      if (stepIdx >= STEPS.length) {
        if (!submitted) await submitForm();
        return;
      }
      const step = STEPS[stepIdx];
      if (step.kind === 'msg') {
        const typing = appendTyping();
        await new Promise((r) => setTimeout(r, step.delay ?? 900));
        typing.remove();
        appendMsg(step.text);
        beep(700, 0.03, 0.04);
        stepIdx++;
        setTimeout(runStep, 350);
      } else if (step.kind === 'input') {
        if (inputArea) inputArea.style.display = 'flex';
        if (chatChoices) chatChoices.style.display = 'none';
        if (chatInput) {
          chatInput.value = '';
          chatInput.placeholder = step.placeholder;
          chatInput.type = step.type || 'text';
          chatInput.focus();
        }
      } else if (step.kind === 'choices') {
        if (inputArea) inputArea.style.display = 'none';
        if (chatChoices) {
          chatChoices.style.display = 'flex';
          chatChoices.innerHTML = step.options.map((o) =>
            `<button class="bc-chat__choice" data-value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</button>`
          ).join('');
          chatChoices.querySelectorAll('.bc-chat__choice').forEach((btn) => {
            btn.addEventListener('click', () => {
              const v = (btn as HTMLElement).dataset.value || '';
              const label = btn.textContent || v;
              beepSend();
              answers[step.field] = v;
              appendMsg(label, true);
              if (chatChoices) chatChoices.style.display = 'none';
              updateProgress();
              stepIdx++;
              setTimeout(runStep, 400);
            });
          });
        }
      }
    }

    function handleSubmit() {
      if (stepIdx >= STEPS.length) return;
      const step = STEPS[stepIdx];
      if (step.kind !== 'input' || !chatInput) return;
      const value = chatInput.value.trim();
      const err = step.validate ? step.validate(value) : null;
      if (err) {
        // shake input + beep erro
        chatInput.style.borderColor = '#C73E1D';
        beep(220, 0.18, 0.10);
        setTimeout(() => { if (chatInput) chatInput.style.borderColor = ''; }, 1200);
        chatInput.focus();
        return;
      }
      beepSend();
      answers[step.field] = value;
      appendMsg(value, true);
      if (inputArea) inputArea.style.display = 'none';
      updateProgress();
      stepIdx++;
      setTimeout(runStep, 400);
    }

    chatSend?.addEventListener('click', handleSubmit);
    chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      } else if (e.key.length === 1) {
        // beep de tecla típico de terminal
        beep(820 + Math.random() * 80, 0.02, 0.04);
      }
    });

    async function submitForm() {
      submitted = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tracking = (typeof window !== 'undefined' && (window as unknown as { __wlTracking?: Record<string, unknown> }).__wlTracking) || {};
      const payload: Record<string, unknown> = {
        nome: answers.nome,
        email: answers.email,
        telefone: answers.telefone,
        empresa: answers.empresa,
        source: `bootcamp-orbit-${answers.modalidade || 'online'}`,
        chosen_date: '2026-06-13',
        landing_page: window.location.href,
        referrer: document.referrer || null,
        ...tracking,
      };
      try {
        const resp = await fetch(`${SB_URL}/rest/v1/live_orbit_leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Prefer: 'return=minimal' },
          body: JSON.stringify(payload),
        });
        if (!resp.ok && resp.status !== 201 && resp.status !== 204) throw new Error(`HTTP ${resp.status}`);

        // GTM
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'bootcamp_inscricao',
          modalidade: answers.modalidade,
          lead_email: answers.email,
          lead_name: answers.nome,
          empresa: answers.empresa,
        });

        // Beep de confirmação + redirect pra página de obrigado militar
        beep(1200, 0.15, 0.10);
        setTimeout(() => beep(1500, 0.20, 0.10), 180);
        const params = new URLSearchParams({
          modo: answers.modalidade || 'online',
          nome: (answers.nome || '').split(' ')[0] || '',
        });
        setTimeout(() => { window.location.href = `/bootcamp-orbit/obrigado?${params.toString()}`; }, 600);
      } catch {
        submitted = false;
        appendMsg('⚠️ Falha na transmissão. Tente de novo em alguns segundos.');
      }
    }

    // Inicia a conversa
    setTimeout(runStep, 600);

    return () => {
      clearInterval(cdInterval);
      window.clearTimeout(firstToastTo);
      window.clearInterval(toastInterval);
      document.body.removeAttribute('data-bc');
      document.documentElement.style.overflowX = prevHtmlOX;
      document.body.style.overflowX = prevBodyOX;
      // remove toasts vivos
      document.querySelectorAll('.bc-toast').forEach((t) => t.remove());
    };
  }, [mounted]);

  // LP de evento: sem nav menu pra focar na conversao
  const fullHTML = pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
