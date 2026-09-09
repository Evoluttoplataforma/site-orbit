'use client';

import { useEffect } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { pageHTML } from './html';
import { supabaseMkt } from '@/lib/supabase-mkt';
import { validateEmail } from '@/lib/email-validation';
import { MASTERCLASS_SLUG } from '@/lib/training-sessions';
import { i18nText } from '@/lib/i18n-html';

const RESULT_KEY = 'orbit_training_reg';

export function PageContent() {
  useEffect(() => {
    const modal = () => document.getElementById('chrisModal');
    const form = () => document.getElementById('chrisForm') as HTMLFormElement | null;
    const errorEl = () => document.getElementById('chrisError');
    const submitBtn = () => document.getElementById('chrisSubmit') as HTMLButtonElement | null;
    const tsInput = () => document.getElementById('chrisTs') as HTMLInputElement | null;

    function showError(pt: string, en?: string) {
      const el = errorEl();
      if (!el) return;
      el.innerHTML = en ? i18nText(pt, en) : pt;
      el.classList.add('show');
    }
    function clearError() {
      errorEl()?.classList.remove('show');
    }
    function openModal() {
      const m = modal();
      if (!m) return;
      const ts = tsInput();
      if (ts) ts.value = String(Date.now());
      clearError();
      m.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('tr-modal-open');
    }
    function closeModal() {
      modal()?.classList.remove('active');
      document.body.style.overflow = '';
      document.body.classList.remove('tr-modal-open');
    }

    let submitting = false;

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('[data-open-chris-form]')) {
        e.preventDefault();
        openModal();
        return;
      }
      if (t.closest('#chrisModalClose')) {
        closeModal();
        return;
      }
      if (t.id === 'chrisModal') closeModal();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal()?.classList.contains('active')) closeModal();
    };

    const onSubmit = async (e: Event) => {
      const f = form();
      if (!f || e.target !== f) return;
      e.preventDefault();
      if (submitting) return;

      const fd = new FormData(f);
      const nome = String(fd.get('nome') || '').trim();
      const email = String(fd.get('email') || '').trim().toLowerCase();
      const emailCheck = validateEmail(email);
      if (!emailCheck.valid) {
        showError(emailCheck.error || 'Digite um e-mail válido.', 'Enter a valid email.');
        return;
      }

      clearError();
      submitting = true;
      const btn = submitBtn();
      const originalLabel = btn?.innerHTML ?? '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>' +
          i18nText('Inscrevendo...', 'Signing up...');
      }

      const params = new URLSearchParams(window.location.search);
      const body = {
        nome,
        empresa: String(fd.get('empresa') || '').trim(),
        email,
        telefone: String(fd.get('telefone') || '').trim(),
        sessions: [MASTERCLASS_SLUG],
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
          showError(
            code === 'rate_limited'
              ? 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente de novo.'
              : code === 'invalid_email' || code === 'disposable_email'
              ? 'Use um e-mail válido para receber o link de acesso.'
              : 'Não conseguimos concluir agora. Tente novamente em instantes.',
            code === 'rate_limited'
              ? 'Too many attempts in a short time. Wait a few minutes and try again.'
              : 'We could not finish now. Try again in a moment.'
          );
          submitting = false;
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalLabel;
          }
          return;
        }

        try {
          sessionStorage.setItem(RESULT_KEY, JSON.stringify({ nome, email, results: data.results ?? [] }));
        } catch {
          /* modo privado */
        }
        try {
          const w = window as Window & { dataLayer?: Record<string, unknown>[] };
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({ event: 'masterclass_inscricao', sessions: MASTERCLASS_SLUG });
        } catch {
          /* tracking nunca bloqueia */
        }
        window.location.href = '/live/chris/obrigado';
      } catch {
        showError('Erro de conexão. Verifique sua internet e tente novamente.');
        submitting = false;
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalLabel;
        }
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    document.addEventListener('submit', onSubmit, true);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('submit', onSubmit, true);
      document.body.style.overflow = '';
      document.body.classList.remove('tr-modal-open');
    };
  }, []);

  return <PageLayout contentHTML={pageHTML} />;
}
