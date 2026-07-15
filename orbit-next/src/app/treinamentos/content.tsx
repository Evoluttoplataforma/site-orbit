'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

interface Session {
  slug: string;
  audience: string;
  title: string;
  subtitle: string;
  description: string;
  day: number;
  hour: number;
  icon: string;
}

interface AudienceGroup {
  id: string;
  title: string;
  subtitle: string;
  sessions: Session[];
}

const SESSIONS: Session[] = [
  {
    slug: 'clientes-seg-14',
    audience: 'Clientes finais',
    title: 'Segunda',
    subtitle: 'Tira dúvidas · 14h',
    description: 'Tire dúvidas sobre a operação do Orbit na sua empresa.',
    day: 1,
    hour: 14,
    icon: 'fa-building',
  },
  {
    slug: 'clientes-qua-10',
    audience: 'Clientes finais',
    title: 'Quarta',
    subtitle: 'Tira dúvidas · 10h',
    description: 'Sessão ao vivo com o time para apoiar o uso da plataforma.',
    day: 3,
    hour: 10,
    icon: 'fa-building',
  },
  {
    slug: 'consultorias-qua-13',
    audience: 'Consultorias',
    title: 'Quarta',
    subtitle: 'Tira dúvidas · 13h',
    description: 'Tire dúvidas sobre operação, clientes e modelo com Orbit.',
    day: 3,
    hour: 13,
    icon: 'fa-handshake',
  },
  {
    slug: 'consultorias-sex-10',
    audience: 'Consultorias',
    title: 'Sexta',
    subtitle: 'Tira dúvidas · 10h',
    description: 'Sessão ao vivo focada em consultores e canais.',
    day: 5,
    hour: 10,
    icon: 'fa-handshake',
  },
];

const AUDIENCES: AudienceGroup[] = [
  {
    id: 'clientes',
    title: 'Clientes finais',
    subtitle: 'Sessões de tira dúvidas para empresas que usam o Orbit',
    sessions: SESSIONS.filter((s) => s.audience === 'Clientes finais'),
  },
  {
    id: 'consultorias',
    title: 'Consultorias',
    subtitle: 'Sessões de tira dúvidas para canais e parceiros B2B',
    sessions: SESSIONS.filter((s) => s.audience === 'Consultorias'),
  },
];

const DAY_FULL: Record<number, string> = {
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
};
const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function fmtDateISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getNextOccurrences(dayOfWeek: number, count = 4): Date[] {
  const out: Date[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const today = now.getDay();
  let diff = (dayOfWeek - today + 7) % 7;
  if (diff === 0) {
    const nowFull = new Date();
    if (nowFull.getHours() >= 18) diff = 7;
  }
  const first = new Date(now);
  first.setDate(now.getDate() + diff);
  out.push(new Date(first));
  for (let i = 1; i < count; i++) {
    const next = new Date(first);
    next.setDate(first.getDate() + 7 * i);
    out.push(next);
  }
  return out;
}

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const grid = ref.current.querySelector('#trainingGrid');
    if (!grid) return;

    const bySlug = Object.fromEntries(SESSIONS.map((s) => [s.slug, s]));

    grid.innerHTML = AUDIENCES.map((group) => {
      const slots = group.sessions
        .map(
          (s) => `
        <button type="button" class="tr-slot" data-slug="${s.slug}" style="text-align:left;font:inherit;width:100%;">
          <span class="tr-slot__time"><i class="fa-solid fa-clock"></i>${String(s.hour).padStart(2, '0')}h</span>
          <div class="tr-slot__icon"><i class="fa-solid ${s.icon}"></i></div>
          <div class="tr-slot__title">${s.title}</div>
          <div class="tr-slot__sub">${s.subtitle}</div>
          <p class="tr-slot__desc">${s.description}</p>
          <span class="tr-slot__cta"><i class="fa-solid fa-calendar-check"></i> Reservar minha vaga</span>
        </button>
      `
        )
        .join('');

      return `
        <div class="tr-day">
          <div class="tr-day__header">
            <div class="tr-day__name">${group.title}</div>
            <div class="tr-day__count">${group.subtitle}</div>
          </div>
          <div class="tr-day__slots">${slots}</div>
        </div>
      `;
    }).join('');

    const modal = ref.current.querySelector('#trainingModal') as HTMLElement | null;
    const modalTitle = ref.current.querySelector('#trainingModalTitle') as HTMLElement | null;
    const modalSubtitle = ref.current.querySelector('#trainingModalSubtitle') as HTMLElement | null;
    const modalIcon = ref.current.querySelector('#trainingModalIcon') as HTMLElement | null;
    const modalMeta = ref.current.querySelector('#trainingModalMeta') as HTMLElement | null;
    const slugInput = ref.current.querySelector('#trainingSlug') as HTMLInputElement | null;
    const dateInput = ref.current.querySelector('#trainingChosenDate') as HTMLInputElement | null;
    const datesContainer = ref.current.querySelector('#trainingDates') as HTMLElement | null;
    const errorEl = ref.current.querySelector('#trainingError') as HTMLElement | null;
    const submitBtn = ref.current.querySelector('#trainingSubmit') as HTMLButtonElement | null;
    const form = ref.current.querySelector('#trainingForm') as HTMLFormElement | null;
    const closeBtn = ref.current.querySelector('#trainingModalClose');

    function openModal(session: Session) {
      if (!modal || !modalTitle || !modalIcon || !modalMeta || !slugInput || !dateInput || !datesContainer) return;
      slugInput.value = session.slug;
      modalTitle.textContent = `${session.audience} — ${session.title}`;
      if (modalSubtitle) modalSubtitle.textContent = session.subtitle;
      modalIcon.innerHTML = `<i class="fa-solid ${session.icon}"></i>`;
      modalMeta.innerHTML = `
        <span class="tr-modal__chip"><i class="fa-solid fa-calendar"></i>${DAY_FULL[session.day]}</span>
        <span class="tr-modal__chip"><i class="fa-solid fa-clock"></i>${String(session.hour).padStart(2, '0')}h00 — ${String(session.hour + 1).padStart(2, '0')}h00</span>
        <span class="tr-modal__chip"><i class="fa-solid fa-video" style="color:#34A853;"></i>Google Meet</span>
      `;
      const dates = getNextOccurrences(session.day, 4);
      dateInput.value = '';
      datesContainer.innerHTML = dates
        .map((d) => {
          const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
          const label = `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]}`;
          const wk = WEEKDAYS_SHORT[d.getDay()];
          return `<button type="button" class="tr-modal__date-btn" data-date="${fmtDateISO(d)}"><small>${wk}</small>${label}</button>`;
        })
        .join('');
      datesContainer.querySelectorAll('.tr-modal__date-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          datesContainer.querySelectorAll('.tr-modal__date-btn').forEach((b) => b.classList.remove('selected'));
          btn.classList.add('selected');
          if (dateInput) dateInput.value = (btn as HTMLElement).dataset.date || '';
        });
      });
      if (errorEl) errorEl.classList.remove('show');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    grid.querySelectorAll('.tr-slot').forEach((btn) => {
      btn.addEventListener('click', () => {
        const slug = (btn as HTMLElement).dataset.slug || '';
        const session = bySlug[slug];
        if (session) openModal(session);
      });
    });

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
    };
    document.addEventListener('keydown', onKey);

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!dateInput?.value) {
        if (errorEl) {
          errorEl.textContent = 'Escolha uma data antes de confirmar.';
          errorEl.classList.add('show');
        }
        return;
      }
      if (errorEl) errorEl.classList.remove('show');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>Enviando...';
      }

      const fd = new FormData(form);
      const slug = String(fd.get('training_slug') || '');
      const payload = {
        nome: String(fd.get('nome') || ''),
        empresa: String(fd.get('empresa') || ''),
        email: String(fd.get('email') || ''),
        telefone: String(fd.get('telefone') || ''),
        source: 'treinamento-' + slug,
        chosen_date: String(fd.get('chosen_date') || ''),
        landing_page: window.location.href,
        referrer: document.referrer || null,
      };

      try {
        await fetch(`${SB_URL}/rest/v1/live_orbit_leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SB_KEY,
            Authorization: `Bearer ${SB_KEY}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(payload),
        });

        window.location.href =
          '/treinamentos/obrigado?t=' +
          encodeURIComponent(slug) +
          '&d=' +
          encodeURIComponent(payload.chosen_date);
      } catch {
        if (errorEl) {
          errorEl.textContent = 'Erro ao enviar. Tente novamente.';
          errorEl.classList.add('show');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            '<i class="fa-solid fa-check" style="margin-right:8px;"></i>Confirmar inscrição gratuita';
        }
      }
    });

    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [mounted]);

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
