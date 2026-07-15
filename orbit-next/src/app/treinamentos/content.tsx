'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const MEET_URL = 'https://meet.google.com/yzw-piji-xhi';

interface SessionSlot {
  dayLabel: string;
  hour: number;
  description: string;
}

interface AudienceGroup {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  slots: SessionSlot[];
}

const AUDIENCES: AudienceGroup[] = [
  {
    id: 'clientes',
    title: 'Clientes finais',
    subtitle: 'Sessões de tira dúvidas para empresas que usam o Orbit',
    icon: 'fa-building',
    slots: [
      { dayLabel: 'Segunda', hour: 14, description: 'Tire dúvidas sobre a operação do Orbit na sua empresa.' },
      { dayLabel: 'Quarta', hour: 10, description: 'Sessão ao vivo com o time para apoiar o uso da plataforma.' },
    ],
  },
  {
    id: 'consultorias',
    title: 'Consultorias',
    subtitle: 'Sessões de tira dúvidas para canais e parceiros B2B',
    icon: 'fa-handshake',
    slots: [
      { dayLabel: 'Quarta', hour: 13, description: 'Tire dúvidas sobre operação, clientes e modelo com Orbit.' },
      { dayLabel: 'Sexta', hour: 10, description: 'Sessão ao vivo focada em consultores e canais.' },
    ],
  },
];

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const grid = ref.current.querySelector('#trainingGrid');
    if (!grid) return;

    grid.innerHTML = AUDIENCES.map(group => {
      const slots = group.slots.map(slot => `
        <a class="tr-slot" href="${MEET_URL}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;">
          <span class="tr-slot__time"><i class="fa-solid fa-clock"></i>${String(slot.hour).padStart(2, '0')}h</span>
          <div class="tr-slot__icon"><i class="fa-solid ${group.icon}"></i></div>
          <div class="tr-slot__title">${slot.dayLabel}</div>
          <div class="tr-slot__sub">Tira dúvidas · ${String(slot.hour).padStart(2, '0')}h</div>
          <p class="tr-slot__desc">${slot.description}</p>
          <span class="tr-slot__cta"><i class="fa-solid fa-video"></i> Entrar no Meet</span>
        </a>
      `).join('');

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
  }, [mounted]);

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
