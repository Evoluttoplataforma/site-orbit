'use client';

import { useEffect, useRef } from 'react';
import { pageHTML } from './html';
import { footerHTML } from '@/components/shared-footer';
import { reapplyOrbitLang } from '@/lib/reapply-lang';
import { supabaseMkt } from '@/lib/supabase-mkt';

const SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

const BOOTCAMP_DATE = new Date('2026-10-15T08:30:00-03:00');
type BootcampModo = 'online' | 'presencial' | 'mentoria';
function resolveModo(raw: string | undefined): BootcampModo {
  if (raw === 'presencial') return 'presencial';
  if (raw === 'mentoria') return 'mentoria';
  return 'online';
}

const IGOR_AVATAR = '/images/bootcamp/igor-fardado.webp';

// Perguntas do Igor no chat — em ordem
type Step =
  | { kind: 'msg'; text: string; delay?: number }
  | { kind: 'input'; field: string; placeholder: string; type?: string; validate?: (v: string) => string | null }
  | { kind: 'choices'; field: string; options: { label: string; value: string }[] };

const VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEPS: Step[] = [
  { kind: 'msg', text: 'Olá, recruta. Sou o General Igor Furniel. 🪖' },
  { kind: 'msg', text: 'Vou te fazer 5 perguntas rápidas para sua inscrição no Bootcamp Canais Orbit do dia 15/10.', delay: 1400 },
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
    { label: '📡 ONLINE', value: 'online' },
    { label: '🪖 PRESENCIAL FLORIANÓPOLIS', value: 'presencial' },
    { label: '⭐ MENTORIA COM IGOR E CHRISTIAN', value: 'mentoria' },
  ] },
  { kind: 'msg', text: 'Inscrição em análise...', delay: 600 },
];

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;

    // ═══ Marca body com data-bc pra ativar cursor mira global ═══
    document.body.setAttribute('data-bc', '1');

    // ═══ Trava overflow horizontal (SVGs, tickers, decorativos podem estourar) ═══
    // overflow-x: clip (não hidden) — clip não cria contexto de scroll, então `position: sticky` continua funcionando
    const prevHtmlOX = document.documentElement.style.overflowX;
    const prevBodyOX = document.body.style.overflowX;
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';

    // ═══ Topbar fixa: mede altura e dimensiona o spacer (evita cobrir o hero) ═══
    const topbar = root.querySelector('.bc-topbar') as HTMLElement | null;
    const spacer = root.querySelector('.bc-topbar-spacer') as HTMLElement | null;
    function syncTopbarSpacer() {
      if (topbar && spacer) spacer.style.height = topbar.offsetHeight + 'px';
    }
    syncTopbarSpacer();
    window.addEventListener('resize', syncTopbarSpacer);
    // Re-mede após fontes/layout assentarem
    const topbarT1 = window.setTimeout(syncTopbarSpacer, 300);
    const topbarT2 = window.setTimeout(syncTopbarSpacer, 1200);

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

    // ═══ Sinal social real, sem nomes, empresas ou outra PII ═══
    let lastEnlistCount: number | null = null;
    function showToast(delta: number) {
      const t = document.createElement('div');
      t.className = 'bc-toast';
      t.innerHTML = `
        <div class="bc-toast__icon"><i class="fa-solid fa-user-plus"></i></div>
        <div class="bc-toast__body">
          <p class="bc-toast__title">★ Pelotão em movimento ★</p>
          <p class="bc-toast__text">${delta === 1 ? 'Uma nova inscrição foi registrada' : `${delta} novas inscrições foram registradas`}<small>Contagem real do Bootcamp Canais Orbit</small></p>
        </div>`;
      document.body.appendChild(t);
      requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('is-visible')));
      setTimeout(() => {
        t.classList.remove('is-visible');
        setTimeout(() => t.remove(), 800);
      }, 6000);
    }
    async function checkEnlistGrowth() {
      try {
        const sources = '("bootcamp-orbit-online","bootcamp-orbit-presencial","bootcamp-orbit-mentoria")';
        const response = await fetch(`${SB_URL}/rest/v1/live_orbit_leads?source=in.${sources}&select=id`, {
          headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Prefer: 'count=exact', Range: '0-0' },
        });
        if (!response.ok) return;
        const range = response.headers.get('content-range') || '0-0/0';
        const count = Number.parseInt(range.split('/')[1] || '0', 10);
        if (!Number.isFinite(count)) return;
        if (lastEnlistCount !== null && count > lastEnlistCount) showToast(count - lastEnlistCount);
        lastEnlistCount = count;
      } catch {
        // Sem sinal real, não exibe notificação.
      }
    }
    void checkEnlistGrowth();
    const enlistPollInterval = window.setInterval(checkEnlistGrowth, 30000);

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
    // Só auto-rola depois que o usuário interagiu — evita arrastar a página pro form no load
    let userInteracted = false;

    function maybeScrollTo() {
      if (!userInteracted || !chatBody) return;
      // chat agora vive num overlay com scroll próprio — rola o container, não a página
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendMsg(text: string, isUser = false) {
      if (!chatBody) return;
      const div = document.createElement('div');
      div.className = 'bc-msg' + (isUser ? ' bc-msg--user' : '');
      div.innerHTML = isUser
        ? `<div class="bc-msg__avatar">EU</div><div class="bc-msg__bubble">${escapeHtml(text)}</div>`
        : `<div class="bc-msg__avatar"><img src="${IGOR_AVATAR}" alt="Igor"></div><div class="bc-msg__bubble">${escapeHtml(text)}</div>`;
      chatBody.appendChild(div);
      requestAnimationFrame(maybeScrollTo);
    }
    function escapeHtml(s: string) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function appendTyping(): HTMLElement {
      const div = document.createElement('div');
      div.className = 'bc-msg';
      div.innerHTML = `<div class="bc-msg__avatar"><img src="${IGOR_AVATAR}" alt="Igor"></div><div class="bc-msg__bubble"><span class="bc-typing"><span></span><span></span><span></span></span></div>`;
      chatBody?.appendChild(div);
      requestAnimationFrame(maybeScrollTo);
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
          // preventScroll evita que o focus arraste a página pro form no load
          try { chatInput.focus({ preventScroll: true }); } catch { /* noop */ }
        }
      } else if (step.kind === 'choices') {
        if (inputArea) inputArea.style.display = 'none';
        const preselected = step.options.find((option) => option.value === answers[step.field]);
        if (preselected) {
          appendMsg(preselected.label, true);
          updateProgress();
          stepIdx++;
          setTimeout(runStep, 400);
          return;
        }
        if (chatChoices) {
          chatChoices.style.display = 'flex';
          chatChoices.innerHTML = step.options.map((o) =>
            `<button class="bc-chat__choice" data-value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</button>`
          ).join('');
          chatChoices.querySelectorAll('.bc-chat__choice').forEach((btn) => {
            btn.addEventListener('click', () => {
              userInteracted = true;
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
        try { chatInput.focus({ preventScroll: true }); } catch { /* noop */ }
        return;
      }
      userInteracted = true;
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
      const modo = resolveModo(answers.modalidade);

      // Só colunas que existem em live_orbit_leads (whitelist) — spread do __wlTracking
      // inteiro estourava 400 (PGRST204: coluna inexistente, ex. originPage/user_agent).
      const tk = (typeof window !== 'undefined' && (window as unknown as { __wlTracking?: Record<string, unknown> }).__wlTracking) || {};
      const pick = (k: string) => (tk[k] != null && tk[k] !== '' ? tk[k] : null);
      const payload: Record<string, unknown> = {
        nome: answers.nome,
        email: answers.email,
        telefone: answers.telefone,
        empresa: answers.empresa,
        source: `bootcamp-orbit-${modo}`,
        chosen_date: '2026-10-15',
        landing_page: window.location.href,
        referrer: document.referrer || null,
        utm_source: pick('utm_source'),
        utm_medium: pick('utm_medium'),
        utm_campaign: pick('utm_campaign'),
        utm_content: pick('utm_content'),
        utm_term: pick('utm_term'),
        gclid: pick('gclid'),
        fbclid: pick('fbclid'),
        session_id: pick('session_id'),
      };

      let registrationStatus: 'registered' | 'waitlist' = 'registered';
      try {
        const registrationResponse = await fetch(`${SB_URL}/rest/v1/rpc/register_bootcamp_lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
          body: JSON.stringify({ lead: payload }),
        });
        if (!registrationResponse.ok) throw new Error(`registration_${registrationResponse.status}`);
        const registration = await registrationResponse.json() as { status?: 'registered' | 'waitlist' };
        registrationStatus = registration.status === 'waitlist' ? 'waitlist' : 'registered';
      } catch {
        submitted = false;
        appendMsg('Não foi possível registrar sua inscrição agora. Tente novamente em alguns instantes.');
        return;
      }

      // CRM Orbit — funil Treinamento / Inscrito (source precisa começar com "treinamento")
      supabaseMkt.functions.invoke('create-orbit-crm-lead', {
        body: {
          nome: answers.nome,
          email: answers.email,
          telefone: answers.telefone,
          empresa: answers.empresa,
          source: 'treinamentos',
          tags: ['bootcamp', 'bootcamp-orbit', modo, registrationStatus],
          chosen_date: '2026-10-15',
          notes: `Inscrição /bootcamp-orbit\nModalidade: ${modo}`,
          custom_fields: { bootcamp_modalidade: modo },
        },
      }).catch(() => {});

      if (registrationStatus === 'registered') {
        fetch(`${SB_URL}/functions/v1/send-bootcamp-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
          body: JSON.stringify({
            type: 'confirmacao',
            nome: answers.nome,
            email: answers.email,
            modo,
            telefone: answers.telefone,
            empresa: answers.empresa,
          }),
        }).catch(() => {});
      }

      // GTM
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: registrationStatus === 'waitlist' ? 'bootcamp_lista_espera' : 'bootcamp_inscricao',
        modalidade: modo,
      });

      if (registrationStatus === 'waitlist') {
        appendMsg('As 40 vagas presenciais já foram preenchidas. Seu nome entrou na lista de espera e nossa equipe poderá entrar em contato pelos dados cadastrados se houver disponibilidade.');
      }

      // Beep de confirmação + redirect pra página de obrigado militar (sempre)
      beep(1200, 0.15, 0.10);
      setTimeout(() => beep(1500, 0.20, 0.10), 180);
      const params = new URLSearchParams({
        modo,
        nome: (answers.nome || '').split(' ')[0] || '',
        ...(registrationStatus === 'waitlist' ? { status: 'waitlist' } : {}),
      });
      setTimeout(() => { window.location.href = `/bootcamp-orbit/obrigado?${params.toString()}`; }, registrationStatus === 'waitlist' ? 2600 : 600);
    }

    // ═══ Overlay: abre/fecha o chat (popup centralizado) ═══
    const chatOverlay = root.querySelector('#bcChatOverlay') as HTMLElement | null;
    const chatClose = root.querySelector('#bcChatClose') as HTMLButtonElement | null;
    const chatBackdrop = root.querySelector('#bcChatBackdrop') as HTMLElement | null;
    let chatStarted = false;
    let prevBodyOverflow = '';

    function openChat() {
      if (!chatOverlay) return;
      userInteracted = true; // libera o auto-scroll do container
      chatOverlay.classList.add('open');
      chatOverlay.setAttribute('aria-hidden', 'false');
      prevBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden'; // trava scroll da página atrás do modal
      if (!chatStarted) { chatStarted = true; setTimeout(runStep, 450); }
      else if (chatInput && inputArea && inputArea.style.display !== 'none') {
        try { chatInput.focus({ preventScroll: true }); } catch { /* noop */ }
      }
    }
    function closeChat() {
      if (!chatOverlay) return;
      chatOverlay.classList.remove('open');
      chatOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = prevBodyOverflow;
    }
    // Somente os CTAs de modalidade abrem o chat; o CTA do hero rola até esta seção.
    const onCtaOpen = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-bc-mode], [data-open-chat]');
      if (!el) return;
      e.preventDefault();
      const selectedMode = el.dataset.bcMode;
      if (selectedMode) {
        answers.modalidade = resolveModo(selectedMode);
        const analytics = window as Window & { dataLayer?: Record<string, unknown>[] };
        analytics.dataLayer = analytics.dataLayer || [];
        analytics.dataLayer.push({ event: 'bootcamp_modalidade_click', modalidade: answers.modalidade });
      }
      openChat();
    };
    root.addEventListener('click', onCtaOpen);
    chatClose?.addEventListener('click', closeChat);
    chatBackdrop?.addEventListener('click', closeChat);
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeChat(); };
    document.addEventListener('keydown', onEsc);

    return () => {
      root.removeEventListener('click', onCtaOpen);
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = prevBodyOverflow;
      clearInterval(cdInterval);
      window.clearInterval(enlistPollInterval);
      window.removeEventListener('resize', syncTopbarSpacer);
      window.clearTimeout(topbarT1);
      window.clearTimeout(topbarT2);
      document.body.removeAttribute('data-bc');
      document.documentElement.style.overflowX = prevHtmlOX;
      document.body.style.overflowX = prevBodyOX;
      // remove toasts vivos
      document.querySelectorAll('.bc-toast').forEach((t) => t.remove());
    };
  }, []);

  useEffect(() => {
    reapplyOrbitLang();
    const t = setTimeout(reapplyOrbitLang, 80);
    return () => clearTimeout(t);
  });

  // LP de evento: sem nav menu pra focar na conversao
  const fullHTML = pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
