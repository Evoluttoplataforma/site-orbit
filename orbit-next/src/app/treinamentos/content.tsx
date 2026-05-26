'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

interface Training {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  day: number;
  hour: number;
  icon: string;
}

const TRAININGS: Training[] = [
  { slug: 'pessoas-1', title: 'Pessoas 1', subtitle: 'Cargos / PDI / Treinamentos', description: 'Estruture o organograma, defina PDIs e organize a trilha de treinamentos.', day: 1, hour: 10, icon: 'fa-users' },
  { slug: 'estrategia-mercado', title: 'Estratégia e Mercado', description: 'Mapa estratégico, concorrentes e radar de mercado do Orbit.', day: 1, hour: 16, icon: 'fa-chess-knight' },
  { slug: 'pessoas-2', title: 'Pessoas 2', subtitle: 'Documentos dos Colaboradores', description: 'Contratos, certificados e documentos obrigatórios da equipe.', day: 2, hour: 10, icon: 'fa-id-card' },
  { slug: 'processos', title: 'Processos', description: 'Mapeie e documente processos com versionamento e responsáveis.', day: 2, hour: 16, icon: 'fa-diagram-project' },
  { slug: 'indicadores', title: 'Indicadores', description: 'KPIs por área, metas e desempenho operacional em tempo real.', day: 3, hour: 10, icon: 'fa-chart-line' },
  { slug: 'documentos', title: 'Documentos', description: 'Base de conhecimento: políticas, procedimentos e contratos.', day: 3, hour: 16, icon: 'fa-folder-open' },
  { slug: 'crm-fluxos', title: 'CRM / Fluxos', subtitle: 'Operação Comercial', description: 'Pipeline comercial, fluxos de operação e régua de clientes.', day: 4, hour: 10, icon: 'fa-bullseye' },
  { slug: 'problemas-riscos', title: 'Problemas / Riscos', subtitle: 'e Oportunidades', description: 'Não conformidades, riscos e melhoria contínua.', day: 4, hour: 16, icon: 'fa-triangle-exclamation' },
  { slug: 'tarefas-projetos', title: 'Tarefas / Projetos', description: 'Gerenciamento de tarefas, projetos e prazos com a Olívia.', day: 5, hour: 10, icon: 'fa-list-check' },
  { slug: 'financeiro', title: 'Financeiro', description: 'Plano de contas, fluxo de caixa e integrações financeiras.', day: 5, hour: 16, icon: 'fa-sack-dollar' },
];

const DAY_LABELS: Record<number, string> = { 1: 'Segunda', 2: 'Terça', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta' };
const DAY_FULL: Record<number, string> = { 1: 'Segunda-feira', 2: 'Terça-feira', 3: 'Quarta-feira', 4: 'Quinta-feira', 5: 'Sexta-feira' };
const WEEKDAYS_SHORT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];

function fmtDateISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// Treinamentos comecam na semana de 01/06/2026 — pode ser removido depois dessa data
const TRAINING_START_FLOOR = new Date(2026, 5, 1);

function getNextOccurrences(dayOfWeek: number, count = 4): Date[] {
  const out: Date[] = [];
  const now = new Date();
  now.setHours(0,0,0,0);
  const today = now.getDay();
  let diff = (dayOfWeek - today + 7) % 7;
  if (diff === 0) {
    const nowFull = new Date();
    if (nowFull.getHours() >= 18) diff = 7;
  }
  const first = new Date(now);
  first.setDate(now.getDate() + diff);
  while (first < TRAINING_START_FLOOR) {
    first.setDate(first.getDate() + 7);
  }
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

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const grid = ref.current.querySelector('#trainingGrid');
    if (!grid) return;

    const byDay: Record<number, Training[]> = {};
    TRAININGS.forEach(t => {
      if (!byDay[t.day]) byDay[t.day] = [];
      byDay[t.day].push(t);
    });

    const cols = [1, 2, 3, 4, 5].map(day => {
      const items = (byDay[day] || []).sort((a, b) => a.hour - b.hour);
      const slots = items.map(t => `
        <div class="tr-slot" data-slug="${t.slug}">
          <span class="tr-slot__time"><i class="fa-solid fa-clock"></i>${String(t.hour).padStart(2,'0')}h</span>
          <div class="tr-slot__icon"><i class="fa-solid ${t.icon}"></i></div>
          <div class="tr-slot__title">${t.title}</div>
          ${t.subtitle ? `<div class="tr-slot__sub">${t.subtitle}</div>` : ''}
          <p class="tr-slot__desc">${t.description}</p>
          <span class="tr-slot__cta">Quero participar <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      `).join('');
      return `
        <div class="tr-day">
          <div class="tr-day__header">
            <div class="tr-day__name">${DAY_LABELS[day]}</div>
            <div class="tr-day__count">${items.length} m&oacute;dulos</div>
          </div>
          <div class="tr-day__slots">${slots}</div>
        </div>
      `;
    });

    grid.innerHTML = cols.join('');

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

    function openModal(training: Training) {
      if (!modal || !modalTitle || !modalIcon || !modalMeta || !slugInput || !dateInput || !datesContainer) return;
      slugInput.value = training.slug;
      modalTitle.textContent = training.title;
      if (modalSubtitle) modalSubtitle.textContent = training.subtitle || '';
      modalIcon.innerHTML = `<i class="fa-solid ${training.icon}"></i>`;
      modalMeta.innerHTML = `
        <span class="tr-modal__chip"><i class="fa-solid fa-calendar"></i>${DAY_FULL[training.day]}</span>
        <span class="tr-modal__chip"><i class="fa-solid fa-clock"></i>${String(training.hour).padStart(2,'0')}h00 — ${String(training.hour + 1).padStart(2,'0')}h00</span>
        <span class="tr-modal__chip yt"><i class="fa-brands fa-youtube"></i>YouTube</span>
      `;
      const dates = getNextOccurrences(training.day, 4);
      dateInput.value = '';
      datesContainer.innerHTML = dates.map(d => {
        const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
        const label = `${String(d.getDate()).padStart(2,'0')} ${months[d.getMonth()]}`;
        const wk = WEEKDAYS_SHORT[d.getDay()];
        return `<button type="button" class="tr-modal__date-btn" data-date="${fmtDateISO(d)}"><small>${wk}</small>${label}</button>`;
      }).join('');
      datesContainer.querySelectorAll('.tr-modal__date-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          datesContainer.querySelectorAll('.tr-modal__date-btn').forEach(b => b.classList.remove('selected'));
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

    ref.current.querySelectorAll('.tr-slot').forEach(card => {
      card.addEventListener('click', () => {
        const slug = (card as HTMLElement).dataset.slug;
        const t = TRAININGS.find(x => x.slug === slug);
        if (t) openModal(t);
      });
    });

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal(); });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!dateInput?.value) {
        if (errorEl) { errorEl.textContent = 'Escolha uma data antes de confirmar.'; errorEl.classList.add('show'); }
        return;
      }
      if (errorEl) errorEl.classList.remove('show');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>Enviando...'; }

      const fd = new FormData(form);
      const payload = {
        nome: String(fd.get('nome') || ''),
        empresa: String(fd.get('empresa') || ''),
        email: String(fd.get('email') || ''),
        telefone: String(fd.get('telefone') || ''),
        source: 'treinamento-' + String(fd.get('training_slug') || ''),
        chosen_date: String(fd.get('chosen_date') || ''),
        landing_page: window.location.href,
        referrer: document.referrer || null,
      };

      try {
        await fetch(`${SB_URL}/rest/v1/live_orbit_leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Prefer: 'return=minimal' },
          body: JSON.stringify(payload),
        });

        fetch(`${SB_URL}/functions/v1/send-training-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
          body: JSON.stringify({ nome: payload.nome, empresa: payload.empresa, email: payload.email, training_slug: String(fd.get('training_slug') || ''), chosen_date: payload.chosen_date }),
        }).catch(() => {});

        fetch(`${SB_URL}/functions/v1/subscribe-manychat-training`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
          body: JSON.stringify({ nome: payload.nome, empresa: payload.empresa, email: payload.email, telefone: payload.telefone, training_slug: String(fd.get('training_slug') || ''), chosen_date: payload.chosen_date }),
        }).catch(() => {});

        window.location.href = '/treinamentos/obrigado?t=' + encodeURIComponent(String(fd.get('training_slug') || '')) + '&d=' + encodeURIComponent(payload.chosen_date);
      } catch {
        if (errorEl) { errorEl.textContent = 'Erro ao enviar. Tente novamente.'; errorEl.classList.add('show'); }
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fa-solid fa-check" style="margin-right:8px;"></i>Confirmar inscrição gratuita'; }
      }
    });
  }, [mounted]);

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
