'use client';

import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    // Trava overflow horizontal igual à página principal
    const prevHtmlOX = document.documentElement.style.overflowX;
    const prevBodyOX = document.body.style.overflowX;
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';
    document.body.setAttribute('data-bc', '1');

    const params = new URLSearchParams(window.location.search);
    const modo = (params.get('modo') || 'online').toLowerCase();
    const nome = params.get('nome') || '';
    const email = params.get('email') || '';

    const root = ref.current;
    const nomeEl = root.querySelector('#bcoNome') as HTMLElement | null;
    const modEl = root.querySelector('#bcoModalidade') as HTMLElement | null;
    const localRow = root.querySelector('#bcoLocalRow') as HTMLElement | null;
    const localEl = root.querySelector('#bcoLocal') as HTMLElement | null;
    const pagamento = root.querySelector('#bcoPagamento') as HTMLElement | null;
    const pagarBtn = root.querySelector('#bcoPagarBtn') as HTMLAnchorElement | null;

    if (nomeEl && nome) {
      nomeEl.textContent = `Recruta ${nome.charAt(0).toUpperCase() + nome.slice(1)}, sua patente foi registrada no manifesto.`;
    }

    if (modo.includes('presencial')) {
      if (modEl) modEl.innerHTML = '<strong>Presencial</strong> · Florianópolis/SC';
      if (localEl) localEl.innerHTML = '<strong>Square SC</strong> · endereço completo no e-mail';
      // revela o bloco de pagamento Stripe (vaga presencial só confirma pagando)
      if (pagamento) pagamento.style.display = 'block';
      if (pagarBtn && email) {
        try {
          const u = new URL(pagarBtn.href);
          u.searchParams.set('prefilled_email', email);
          pagarBtn.href = u.toString();
        } catch { /* mantém href padrão */ }
      }
    } else {
      if (modEl) modEl.innerHTML = '<strong>Online ao vivo</strong> · transmissão exclusiva';
      if (localRow) localRow.style.display = 'none';
    }

    // GTM — confirmação de chegada na thank-you
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'bootcamp_inscricao_obrigado', modalidade: modo });

    return () => {
      document.documentElement.style.overflowX = prevHtmlOX;
      document.body.style.overflowX = prevBodyOX;
      document.body.removeAttribute('data-bc');
    };
  }, [mounted]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: pageHTML }} />;
}
