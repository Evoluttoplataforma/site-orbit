'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

// Bootcamp: 13 de junho de 2026, 9h BRT (-03:00)
const BOOTCAMP_DATE = new Date('2026-06-13T09:00:00-03:00');

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    // ═══ Countdown ═══
    const daysEl = ref.current.querySelector('#bcDays') as HTMLElement | null;
    const hoursEl = ref.current.querySelector('#bcHours') as HTMLElement | null;
    const minsEl = ref.current.querySelector('#bcMins') as HTMLElement | null;
    const secsEl = ref.current.querySelector('#bcSecs') as HTMLElement | null;

    function updateCountdown() {
      const now = new Date();
      const diff = BOOTCAMP_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
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
    }
    updateCountdown();
    const cdInterval = setInterval(updateCountdown, 1000);

    // ═══ Modality picker (visual toggle) ═══
    const modalityOpts = ref.current.querySelectorAll('.bc-modality__opt');
    modalityOpts.forEach((opt) => {
      opt.addEventListener('click', () => {
        modalityOpts.forEach((o) => o.classList.remove('is-selected'));
        opt.classList.add('is-selected');
      });
    });

    // ═══ Form submit ═══
    const form = ref.current.querySelector('#bcForm') as HTMLFormElement | null;
    const submitBtn = ref.current.querySelector('#bcSubmit') as HTMLButtonElement | null;
    const errorEl = ref.current.querySelector('#bcError') as HTMLElement | null;
    const successEl = ref.current.querySelector('#bcSuccess') as HTMLElement | null;

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (errorEl) errorEl.classList.remove('show');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>Enviando...';
      }

      const fd = new FormData(form);
      const modalidade = String(fd.get('modalidade') || 'presencial');
      const tracking = (typeof window !== 'undefined' && (window as unknown as { __wlTracking?: Record<string, unknown> }).__wlTracking) || {};

      const payload: Record<string, unknown> = {
        nome: String(fd.get('nome') || ''),
        email: String(fd.get('email') || ''),
        telefone: String(fd.get('telefone') || ''),
        empresa: String(fd.get('empresa') || ''),
        // source identifica o evento + modalidade pra segmentar depois
        source: `bootcamp-orbit-${modalidade}`,
        chosen_date: '2026-06-13',
        landing_page: window.location.href,
        referrer: document.referrer || null,
        ...tracking,
      };

      // Anexa expectativas no campo livre se houver
      const expect = String(fd.get('expectativas') || '').trim();
      if (expect) payload.session_attributes_encoded = btoa(unescape(encodeURIComponent(JSON.stringify({ expectativas: expect, modalidade }))));

      try {
        const resp = await fetch(`${SB_URL}/rest/v1/live_orbit_leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SB_KEY,
            Authorization: `Bearer ${SB_KEY}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(payload),
        });

        if (!resp.ok && resp.status !== 201 && resp.status !== 204) {
          const t = await resp.text();
          throw new Error(`HTTP ${resp.status}: ${t.slice(0, 200)}`);
        }

        // GTM event
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'bootcamp_inscricao',
          modalidade,
          lead_email: payload.email,
          lead_name: payload.nome,
          empresa: payload.empresa,
        });

        if (form) form.style.display = 'none';
        if (successEl) successEl.style.display = 'block';
      } catch (err) {
        if (errorEl) {
          errorEl.textContent = `Erro ao enviar inscrição: ${err instanceof Error ? err.message.slice(0, 120) : 'tente novamente'}`;
          errorEl.classList.add('show');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Garantir minha vaga <i class="fa-solid fa-arrow-right" style="margin-left:6px;"></i>';
        }
      }
    });

    return () => clearInterval(cdInterval);
  }, [mounted]);

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
