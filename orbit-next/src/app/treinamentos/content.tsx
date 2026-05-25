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
  day: number; // 1 = Monday, 5 = Friday
  hour: number; // 10 or 16
  icon: string;
}

const TRAININGS: Training[] = [
  { slug: 'pessoas-1', title: 'Pessoas 1', subtitle: 'Cargos / PDI / Treinamentos', description: 'Estruture o organograma, defina PDIs por cargo e organize a trilha de treinamentos dos colaboradores.', day: 1, hour: 10, icon: 'fa-users' },
  { slug: 'estrategia-mercado', title: 'Estratégia e Mercado', description: 'Construa o mapa estratégico da sua empresa, mapeie concorrentes e ative o radar de mercado da Orbit.', day: 1, hour: 16, icon: 'fa-chess-knight' },
  { slug: 'pessoas-2', title: 'Pessoas 2', subtitle: 'Documentos dos Colaboradores', description: 'Centralize contratos, certificados e documentos obrigatórios da equipe com vencimentos automatizados.', day: 2, hour: 10, icon: 'fa-id-card' },
  { slug: 'processos', title: 'Processos', description: 'Mapeie e documente os processos da empresa do zero, com versionamento e responsáveis claros.', day: 2, hour: 16, icon: 'fa-diagram-project' },
  { slug: 'indicadores', title: 'Indicadores', description: 'Crie KPIs por área, configure metas e acompanhe o desempenho operacional em tempo real.', day: 3, hour: 10, icon: 'fa-chart-line' },
  { slug: 'documentos', title: 'Documentos', description: 'Organize a base de conhecimento da empresa: políticas, procedimentos, modelos e arquivos contratuais.', day: 3, hour: 16, icon: 'fa-folder-open' },
  { slug: 'crm-fluxos', title: 'CRM / Fluxos de Operação', description: 'Configure o pipeline comercial, fluxos de operação e a régua de relacionamento com clientes.', day: 4, hour: 10, icon: 'fa-bullseye' },
  { slug: 'problemas-riscos', title: 'Problemas / Riscos e Oportunidades', description: 'Registre não conformidades, mapeie riscos e capture oportunidades de melhoria contínua.', day: 4, hour: 16, icon: 'fa-triangle-exclamation' },
  { slug: 'tarefas-projetos', title: 'Tarefas / Projetos', description: 'Domine o gerenciamento de tarefas, projetos e prazos com automações da Olívia.', day: 5, hour: 10, icon: 'fa-list-check' },
  { slug: 'financeiro', title: 'Financeiro', description: 'Configure plano de contas, fluxo de caixa e integrações financeiras na Orbit.', day: 5, hour: 16, icon: 'fa-sack-dollar' },
];

const DAY_LABELS: Record<number, string> = { 1: 'Segunda-feira', 2: 'Terça-feira', 3: 'Quarta-feira', 4: 'Quinta-feira', 5: 'Sexta-feira' };

function fmtDateLabel(d: Date): string {
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return `${String(d.getDate()).padStart(2,'0')}/${months[d.getMonth()]}`;
}

function fmtDateISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getNextOccurrences(dayOfWeek: number, count = 4): Date[] {
  const out: Date[] = [];
  const now = new Date();
  now.setHours(0,0,0,0);
  // Próxima ocorrência (inclui hoje se hoje for o dia e ainda não passou de 18h)
  const today = now.getDay();
  let diff = (dayOfWeek - today + 7) % 7;
  if (diff === 0) {
    // Se hoje, só inclui se ainda não passou da hora (vamos assumir 18h como corte máximo)
    const nowFull = new Date();
    if (nowFull.getHours() >= 18) diff = 7;
  }
  const first = new Date(now);
  first.setDate(now.getDate() + diff);
  out.push(first);
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

    // Agrupa por dia
    const byDay: Record<number, Training[]> = {};
    TRAININGS.forEach(t => {
      if (!byDay[t.day]) byDay[t.day] = [];
      byDay[t.day].push(t);
    });

    const rows = [1, 2, 3, 4, 5].map(day => {
      const items = (byDay[day] || []).sort((a, b) => a.hour - b.hour);
      const cards = items.map(t => `
        <div class="training-card" data-slug="${t.slug}">
          <div class="training-card__header">
            <div class="training-card__icon"><i class="fa-solid ${t.icon}"></i></div>
            <div>
              <div class="training-card__time">${String(t.hour).padStart(2,'0')}:00 — ${String(t.hour + 1).padStart(2,'0')}:00</div>
              <h3>${t.title}</h3>
              ${t.subtitle ? `<div class="training-card__subtitle">${t.subtitle}</div>` : ''}
            </div>
          </div>
          <p class="training-card__desc">${t.description}</p>
          <span class="training-card__cta">Quero participar <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      `).join('');
      return `
        <div class="training-day-row">
          <div class="training-day-label">${DAY_LABELS[day]}</div>
          <div class="training-cards">${cards}</div>
        </div>
      `;
    });

    grid.innerHTML = rows.join('');

    const modal = ref.current.querySelector('#trainingModal') as HTMLElement | null;
    const modalTitle = ref.current.querySelector('#trainingModalTitle') as HTMLElement | null;
    const modalMeta = ref.current.querySelector('#trainingModalMeta') as HTMLElement | null;
    const slugInput = ref.current.querySelector('#trainingSlug') as HTMLInputElement | null;
    const dateInput = ref.current.querySelector('#trainingChosenDate') as HTMLInputElement | null;
    const datesContainer = ref.current.querySelector('#trainingDates') as HTMLElement | null;
    const errorEl = ref.current.querySelector('#trainingError') as HTMLElement | null;
    const submitBtn = ref.current.querySelector('#trainingSubmit') as HTMLButtonElement | null;
    const form = ref.current.querySelector('#trainingForm') as HTMLFormElement | null;
    const closeBtn = ref.current.querySelector('#trainingModalClose');

    function openModal(training: Training) {
      if (!modal || !modalTitle || !modalMeta || !slugInput || !dateInput || !datesContainer) return;
      slugInput.value = training.slug;
      modalTitle.textContent = training.title + (training.subtitle ? ` — ${training.subtitle}` : '');
      modalMeta.innerHTML = `<i class="fa-solid fa-calendar"></i> ${DAY_LABELS[training.day]} • ${String(training.hour).padStart(2,'0')}h00 • <i class="fa-brands fa-youtube" style="color:#ff0000;"></i> YouTube`;
      const dates = getNextOccurrences(training.day, 4);
      dateInput.value = '';
      datesContainer.innerHTML = dates.map(d => `<button type="button" class="training-modal__date-btn" data-date="${fmtDateISO(d)}">${fmtDateLabel(d)}</button>`).join('');
      datesContainer.querySelectorAll('.training-modal__date-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          datesContainer.querySelectorAll('.training-modal__date-btn').forEach(b => b.classList.remove('selected'));
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

    ref.current.querySelectorAll('.training-card').forEach(card => {
      card.addEventListener('click', () => {
        const slug = (card as HTMLElement).dataset.slug;
        const t = TRAININGS.find(x => x.slug === slug);
        if (t) openModal(t);
      });
    });

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!dateInput?.value) {
        if (errorEl) { errorEl.textContent = 'Escolha uma data.'; errorEl.classList.add('show'); }
        return;
      }
      if (errorEl) errorEl.classList.remove('show');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:6px;"></i>Enviando...'; }

      const fd = new FormData(form);
      const payload = {
        nome: String(fd.get('nome') || ''),
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

        // Email + .ics
        fetch(`${SB_URL}/functions/v1/send-training-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
          body: JSON.stringify({ nome: payload.nome, email: payload.email, training_slug: String(fd.get('training_slug') || ''), chosen_date: payload.chosen_date }),
        }).catch(() => {});

        // ManyChat
        fetch(`${SB_URL}/functions/v1/subscribe-manychat-training`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
          body: JSON.stringify({ nome: payload.nome, email: payload.email, telefone: payload.telefone, training_slug: String(fd.get('training_slug') || ''), chosen_date: payload.chosen_date }),
        }).catch(() => {});

        window.location.href = '/treinamentos/obrigado?t=' + encodeURIComponent(String(fd.get('training_slug') || '')) + '&d=' + encodeURIComponent(payload.chosen_date);
      } catch {
        if (errorEl) { errorEl.textContent = 'Erro ao enviar. Tente novamente.'; errorEl.classList.add('show'); }
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fa-solid fa-check" style="margin-right:6px;"></i>Confirmar inscrição'; }
      }
    });
  }, [mounted]);

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
