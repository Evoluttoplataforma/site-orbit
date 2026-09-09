'use client';

import { useEffect, useRef } from 'react';
import { pageHTML } from './html';
import { reapplyOrbitLang } from '@/lib/reapply-lang';

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Trava overflow horizontal igual à página principal
    const prevHtmlOX = document.documentElement.style.overflowX;
    const prevBodyOX = document.body.style.overflowX;
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';
    document.body.setAttribute('data-bc', '1');

    const params = new URLSearchParams(window.location.search);
    const rawModo = (params.get('modo') || 'online').toLowerCase();
    const modo = rawModo === 'mentoria' || rawModo === 'presencial' ? rawModo : 'online';
    const isWaitlist = params.get('status') === 'waitlist' && modo !== 'online';
    const nome = params.get('nome') || '';
    const namePrefix = nome ? `Recruta ${nome.charAt(0).toUpperCase() + nome.slice(1)}. ` : '';

    const root = ref.current;
    const stampEl = root.querySelector('#bcoStamp') as HTMLElement | null;
    const eyebrowEl = root.querySelector('#bcoEyebrow') as HTMLElement | null;
    const titleEl = root.querySelector('#bcoTitle') as HTMLElement | null;
    const subEl = root.querySelector('#bcoSub') as HTMLElement | null;
    const benefitsEl = root.querySelector('#bcoBenefits') as HTMLElement | null;
    const modEl = root.querySelector('#bcoModalidade') as HTMLElement | null;
    const localRow = root.querySelector('#bcoLocalRow') as HTMLElement | null;
    const localEl = root.querySelector('#bcoLocal') as HTMLElement | null;
    const pagamento = root.querySelector('#bcoPagamento') as HTMLElement | null;
    const zoomBox = root.querySelector('#bcoZoom') as HTMLElement | null;
    const mentoriaPay = root.querySelector('#bcoMentoriaPay') as HTMLElement | null;
    const waitlistBox = root.querySelector('#bcoWaitlist') as HTMLElement | null;
    const horarioEl = root.querySelector('#bcoHorario') as HTMLElement | null;

    if (modo.includes('mentoria')) {
      if (stampEl) stampEl.style.display = 'none';
      if (eyebrowEl) eyebrowEl.innerHTML = '<i class="fa-solid fa-file-circle-check"></i>Inscrição iniciada';
      if (titleEl) titleEl.innerHTML = 'Confirme sua participação na <span class="accent">mentoria presencial</span> · R$2.500';
      if (subEl) subEl.textContent = `${namePrefix}Missão iniciada. Para concluir sua inscrição e garantir seu nome no pelotão da Mentoria com Igor e Chris + Bootcamp Canais Orbit, assista ao vídeo abaixo e veja o passo a passo para realizar o pagamento da taxa de inscrição até 15 de setembro pelo seu perfil de administrador na plataforma.`;
      if (benefitsEl) {
        benefitsEl.style.display = 'block';
        benefitsEl.innerHTML = '<strong style="color:#ffba1a;">Sua inscrição garante:</strong><ul><li>Vaga no Bootcamp presencial, com 4 horas de imersão, material digital, Q&amp;A ao vivo, coffee e almoço de networking</li><li>4 horas de mentoria em grupo com Igor e Christian</li><li>Direcionamento estratégico sobre posicionamento, produtização, precificação, atendimento e gestão da consultoria</li></ul>';
      }
      if (modEl) modEl.innerHTML = '<strong>Mentoria presencial em grupo</strong> · com Igor e Chris';
      if (localEl) localEl.innerHTML = '<strong>Square SC</strong> · Rod. José Carlos Daux, 5500 - Saco Grande, Florianópolis - SC, 88032-005';
      if (horarioEl) horarioEl.innerHTML = '<strong>8h30 às 12h30</strong> Bootcamp · <strong>14h às 18h</strong> Mentoria';
      if (!isWaitlist && mentoriaPay) mentoriaPay.style.display = 'block';
    } else if (modo.includes('presencial')) {
      if (stampEl) stampEl.style.display = 'none';
      if (eyebrowEl) eyebrowEl.innerHTML = '<i class="fa-solid fa-file-circle-check"></i>Inscrição iniciada';
      if (titleEl) titleEl.innerHTML = 'Confirme sua participação no <span class="accent">Bootcamp presencial</span> · R$250';
      if (subEl) subEl.textContent = `${namePrefix}Missão iniciada. Para concluir sua inscrição e garantir seu nome no pelotão do Bootcamp Canais Orbit, assista ao vídeo abaixo e veja o passo a passo para realizar o pagamento da taxa de inscrição até 15 de setembro pelo seu perfil de administrador na plataforma.`;
      if (benefitsEl) {
        benefitsEl.style.display = 'block';
        benefitsEl.innerHTML = '<strong style="color:#ffba1a;">Sua inscrição garante:</strong><ul><li>4 horas de imersão no Square SC, em Florianópolis, das 8h30 às 12h30</li><li>Acesso a material digital</li><li>Q&amp;A ao vivo durante o evento</li><li>Coffee + almoço de networking com outros canais</li></ul>';
      }
      if (modEl) modEl.innerHTML = '<strong>Imersão Presencial</strong> · Florianópolis';
      if (localEl) localEl.innerHTML = '<strong>Square SC</strong> · Rod. José Carlos Daux, 5500 - Saco Grande, Florianópolis - SC, 88032-005';
      if (!isWaitlist && pagamento) pagamento.style.display = 'block';
    } else {
      if (eyebrowEl) eyebrowEl.innerHTML = '<i class="fa-solid fa-circle-check"></i>Missão confirmada';
      if (titleEl) titleEl.innerHTML = 'Bem-vindo ao <span class="accent">Bootcamp Canais Orbit</span>, recruta';
      if (subEl) subEl.textContent = `${namePrefix}Missão confirmada. Sua inscrição foi concluída e seu nome já está no pelotão do Bootcamp Canais Orbit. A partir de agora, o General Igor e o Coronel Christian assumem o comando. No dia 15 de outubro, esteja a postos: é hora de entrar em campo.`;
      if (modEl) modEl.innerHTML = '<strong>Online ao vivo</strong> · Zoom';
      if (localRow) localRow.style.display = 'none';
      if (zoomBox) zoomBox.style.display = 'block';
    }

    if (isWaitlist) {
      if (eyebrowEl) eyebrowEl.innerHTML = '<i class="fa-solid fa-clock"></i>Lista de espera';
      if (titleEl) titleEl.innerHTML = 'Vagas presenciais <span class="accent">preenchidas</span>';
      if (subEl) subEl.textContent = `${namePrefix}Recebemos seus dados e registramos seu interesse. Nossa equipe poderá entrar em contato pelos dados cadastrados se houver disponibilidade presencial.`;
      if (benefitsEl) benefitsEl.style.display = 'none';
      if (waitlistBox) waitlistBox.style.display = 'block';
    }

    // GTM — confirmação de chegada na thank-you
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: isWaitlist ? 'bootcamp_lista_espera_obrigado' : 'bootcamp_inscricao_obrigado', modalidade: modo });

    const paymentLinks = root.querySelectorAll<HTMLAnchorElement>('[data-payment-mode]');
    const tracking = (window as Window & { __wlTracking?: Record<string, unknown> }).__wlTracking || {};
    const orbitUrl = new URL('https://app.orbitgestao.com.br/my-space');
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'].forEach((key) => {
      const value = tracking[key];
      if (typeof value === 'string' && value && !value.startsWith('(')) orbitUrl.searchParams.set(key, value);
    });
    const trackPaymentClick = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      w.dataLayer.push({ event: 'bootcamp_pagamento_click', modalidade: target.dataset.paymentMode || modo });
    };
    paymentLinks.forEach((link) => {
      link.href = orbitUrl.toString();
      link.addEventListener('click', trackPaymentClick);
    });

    return () => {
      paymentLinks.forEach((link) => link.removeEventListener('click', trackPaymentClick));
      document.documentElement.style.overflowX = prevHtmlOX;
      document.body.style.overflowX = prevBodyOX;
      document.body.removeAttribute('data-bc');
    };
  }, []);

  useEffect(() => {
    reapplyOrbitLang();
    const t = setTimeout(reapplyOrbitLang, 80);
    return () => clearTimeout(t);
  });

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: pageHTML }} />;
}
