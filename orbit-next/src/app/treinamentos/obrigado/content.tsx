'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const TRAININGS_LOOKUP: Record<string, { title: string; day: number; hour: number }> = {
  'pessoas-1':         { title: 'Pessoas 1 — Cargos / PDI / Treinamentos', day: 1, hour: 10 },
  'estrategia-mercado':{ title: 'Estratégia e Mercado', day: 1, hour: 16 },
  'pessoas-2':         { title: 'Pessoas 2 — Documentos dos Colaboradores', day: 2, hour: 10 },
  'processos':         { title: 'Processos', day: 2, hour: 16 },
  'indicadores':       { title: 'Indicadores', day: 3, hour: 10 },
  'documentos':        { title: 'Documentos', day: 3, hour: 16 },
  'crm-fluxos':        { title: 'CRM / Fluxos de Operação', day: 4, hour: 10 },
  'problemas-riscos':  { title: 'Problemas / Riscos e Oportunidades', day: 4, hour: 16 },
  'tarefas-projetos':  { title: 'Tarefas / Projetos', day: 5, hour: 10 },
  'financeiro':        { title: 'Financeiro', day: 5, hour: 16 },
};

const DAY_LABELS: Record<number, string> = { 1: 'Segunda-feira', 2: 'Terça-feira', 3: 'Quarta-feira', 4: 'Quinta-feira', 5: 'Sexta-feira' };

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('t') || '';
    const dateStr = params.get('d') || '';
    const t = TRAININGS_LOOKUP[slug];
    const details = ref.current.querySelector('#trainingObrigadoDetails') as HTMLElement | null;
    if (!t || !details) return;

    let dateLabel = '';
    if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
      dateLabel = `${DAY_LABELS[dt.getDay()] || ''}, ${dt.getDate()} de ${months[dt.getMonth()]}`;
    }

    details.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
        <div style="width:44px;height:44px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fa-solid fa-graduation-cap" style="color:#ffba1a;font-size:18px;"></i>
        </div>
        <div>
          <strong style="color:#fff;font-size:15px;display:block;">${t.title}</strong>
          <span style="color:#8B949E;font-size:13px;">${dateLabel || DAY_LABELS[t.day]} • ${String(t.hour).padStart(2,'0')}h00</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:44px;height:44px;background:rgba(255,0,0,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fa-brands fa-youtube" style="color:#ff0000;font-size:20px;"></i>
        </div>
        <div>
          <strong style="color:#fff;font-size:15px;display:block;">Transmissão no YouTube</strong>
          <span style="color:#8B949E;font-size:13px;">youtube.com/@orbitgestao/live</span>
        </div>
      </div>`;
  }, [mounted]);

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
