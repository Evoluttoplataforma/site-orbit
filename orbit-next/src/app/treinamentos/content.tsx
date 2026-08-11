'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';
import { supabaseMkt } from '@/lib/supabase-mkt';
import { validateEmail } from '@/lib/email-validation';
import {
  TRAINING_SESSIONS,
  TRAINING_BY_SLUG,
  WEEKDAY_FULL,
  slotLabel,
  timeLabel,
  nextOccurrence,
  longDateLabel,
  type TrainingSession,
} from '@/lib/training-sessions';

/** Chave do sessionStorage lida pela página de obrigado para mostrar o join_url pessoal. */
const RESULT_KEY = 'orbit_training_reg';

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

    const grid = root.querySelector('#trainingGrid');
    if (!grid) return;

    // ─── grade de sessões ────────────────────────────────────────────────
    // A data da próxima ocorrência é INFORMAÇÃO (texto secundário), e o CTA é a
    // ação. Antes a data vinha estilizada como botão dourado e as pessoas
    // clicavam nela esperando ver a agenda, não abrir o formulário.
    grid.innerHTML = TRAINING_SESSIONS.map((s) => {
      const next = nextOccurrence(s);
      const isTreino = s.kind === 'treinamento';
      return `
        <button type="button" class="tr-slot${isTreino ? ' tr-slot--treino' : ''}" data-slug="${s.slug}"
                aria-label="Inscrever-se em ${esc(s.title)}, ${WEEKDAY_FULL[s.weekday]} às ${timeLabel(s)}">
          <div class="tr-slot__head">
            <div class="tr-slot__icon"><i class="fa-solid ${s.icon}"></i></div>
            <div class="tr-slot__labels">
              <div class="tr-slot__title">${esc(s.title)}</div>
              <span class="tr-slot__when">${WEEKDAY_FULL[s.weekday]} &middot; ${timeLabel(s)}</span>
            </div>
          </div>
          <p class="tr-slot__desc">${esc(s.description)}</p>
          <p class="tr-slot__next"><i class="fa-solid fa-calendar-day"></i>Pr&oacute;xima: <strong>${longDateLabel(next)}</strong></p>
          <span class="tr-slot__cta">Quero participar <i class="fa-solid fa-arrow-right"></i></span>
        </button>`;
    }).join('');

    // ─── checkboxes do modal ─────────────────────────────────────────────
    const checksBox = root.querySelector('#trainingSessionChecks') as HTMLElement | null;
    if (checksBox) {
      checksBox.innerHTML = TRAINING_SESSIONS.map(
        (s) => `
        <label class="tr-check">
          <input type="checkbox" name="sessions" value="${s.slug}">
          <span class="tr-check__body">
            <span class="tr-check__title">${esc(s.title)} <span class="tr-check__when">${slotLabel(s)}</span></span>
            <span class="tr-check__desc">${esc(s.description)}</span>
          </span>
        </label>`
      ).join('');
    }

    const modal = root.querySelector('#trainingModal') as HTMLElement | null;
    const errorEl = root.querySelector('#trainingError') as HTMLElement | null;
    const submitBtn = root.querySelector('#trainingSubmit') as HTMLButtonElement | null;
    const form = root.querySelector('#trainingForm') as HTMLFormElement | null;
    const tsInput = root.querySelector('#trainingTs') as HTMLInputElement | null;
    const closeBtn = root.querySelector('#trainingModalClose');
    const openAllBtn = root.querySelector('#trainingOpenAll');

    function showError(msg: string) {
      if (!errorEl) return;
      errorEl.textContent = msg;
      errorEl.classList.add('show');
    }
    function clearError() {
      errorEl?.classList.remove('show');
    }

    /** Abre o modal. Com sessão, pré-marca só ela; sem, mantém o que estiver marcado. */
    function openModal(session?: TrainingSession) {
      if (!modal) return;
      const boxes = Array.from(
        root.querySelectorAll('#trainingSessionChecks input[name="sessions"]')
      ) as HTMLInputElement[];
      if (session) {
        boxes.forEach((b) => {
          b.checked = b.value === session.slug;
        });
      } else if (!boxes.some((b) => b.checked)) {
        // abrindo pelo CTA geral sem nada marcado: sugere o treinamento
        const suggested = boxes.find((b) => TRAINING_BY_SLUG[b.value]?.kind === 'treinamento');
        if (suggested) suggested.checked = true;
      }
      // marca o instante de abertura — o servidor rejeita preenchimento < 2s
      if (tsInput) tsInput.value = String(Date.now());
      clearError();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // a classe esconde os widgets flutuantes (WhatsApp/chat), que ficavam por
      // cima do modal e do botão de confirmar
      document.body.classList.add('tr-modal-open');
      // Não dar foco automático em tela pequena: abriria o teclado por cima da
      // lista de sessões, que é a primeira decisão a tomar.
      if (window.innerWidth > 560) {
        (root.querySelector('#trainingForm input[name="nome"]') as HTMLInputElement | null)?.focus();
      }
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
      document.body.classList.remove('tr-modal-open');
    }

    grid.querySelectorAll('.tr-slot').forEach((btn) => {
      btn.addEventListener('click', () => {
        const slug = (btn as HTMLElement).dataset.slug || '';
        openModal(TRAINING_BY_SLUG[slug]);
      });
    });
    openAllBtn?.addEventListener('click', () => openModal());
    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
    };
    document.addEventListener('keydown', onKey);

    // ─── submit ──────────────────────────────────────────────────────────
    // Guarda in-flight: antes daqui, dois cliques rápidos criavam dois leads.
    let submitting = false;

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      if (submitting || !form) return;

      const fd = new FormData(form);
      const slugs = fd.getAll('sessions').map(String).filter(Boolean);
      if (!slugs.length) {
        showError('Marque pelo menos uma sessão para continuar.');
        return;
      }

      const nome = String(fd.get('nome') || '').trim();
      const email = String(fd.get('email') || '').trim().toLowerCase();
      const emailCheck = validateEmail(email);
      if (!emailCheck.valid) {
        showError(emailCheck.error || 'Digite um e-mail válido.');
        return;
      }

      clearError();
      submitting = true;
      const originalLabel = submitBtn?.innerHTML ?? '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>Inscrevendo...';
      }

      const params = new URLSearchParams(window.location.search);
      const body = {
        nome,
        empresa: String(fd.get('empresa') || '').trim(),
        email,
        telefone: String(fd.get('telefone') || '').trim(),
        sessions: slugs,
        hp: String(fd.get('hp') || ''),
        ts: Number(fd.get('ts')) || 0,
        landing_page: window.location.href,
        referrer: document.referrer || null,
        utm: {
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
          utm_content: params.get('utm_content'),
          utm_term: params.get('utm_term'),
        },
        gclid: params.get('gclid'),
        fbclid: params.get('fbclid'),
      };

      try {
        const { data, error } = await supabaseMkt.functions.invoke('register-training', { body });

        if (error || !data?.ok) {
          const code = data?.error || '';
          const msg =
            code === 'rate_limited'
              ? 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.'
              : code === 'invalid_email' || code === 'disposable_email'
              ? 'Use um e-mail válido para receber o link de acesso.'
              : 'Não conseguimos concluir agora. Tente novamente em instantes.';
          showError(msg);
          submitting = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalLabel;
          }
          return;
        }

        // Guarda os join_url pessoais para a página de obrigado. Não vão na URL:
        // são links de acesso individuais e apareceriam em referrer e analytics.
        try {
          sessionStorage.setItem(
            RESULT_KEY,
            JSON.stringify({ nome, email, results: data.results ?? [] })
          );
        } catch {
          /* modo privado sem storage: a obrigado cai no texto do e-mail */
        }

        try {
          const w = window as Window & {
            dataLayer?: Record<string, unknown>[];
            oaiq?: (...args: unknown[]) => void;
          };
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({
            event: 'treinamento_inscricao',
            sessions: slugs.join(','),
            session_count: slugs.length,
          });
          if (typeof w.oaiq === 'function') {
            w.oaiq('measure', 'lead_created', { type: 'customer_action' });
          }
        } catch {
          /* tracking nunca bloqueia */
        }

        window.location.href = `/treinamentos/obrigado?t=${encodeURIComponent(slugs.join(','))}`;
      } catch {
        showError('Erro de conexão. Verifique sua internet e tente novamente.');
        submitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        }
      }
    };

    form?.addEventListener('submit', onSubmit);

    return () => {
      document.removeEventListener('keydown', onKey);
      form?.removeEventListener('submit', onSubmit);
      // não deixar o site travado nem os widgets escondidos se desmontar aberto
      document.body.style.overflow = '';
      document.body.classList.remove('tr-modal-open');
    };
  }, [mounted]);

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
