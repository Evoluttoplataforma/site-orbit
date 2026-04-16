'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { pageHTML } from '@/app/consultores/html';
import { presentationCSS, presentationJS } from './presentation';

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const initScripts = useCallback(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('script').forEach(oldScript => {
      if (oldScript.src) {
        const s = document.createElement('script');
        s.src = oldScript.src;
        s.defer = true;
        document.body.appendChild(s);
      } else if (oldScript.textContent) {
        try { new Function(oldScript.textContent)(); } catch (e) { console.warn('Script error:', e); }
      }
    });

    // Executa o JS de apresentação por último (depois de tudo montado)
    setTimeout(() => {
      try { new Function(presentationJS)(); } catch (e) { console.warn('Presentation JS error:', e); }
    }, 200);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(initScripts, 50);
    return () => clearTimeout(t);
  }, [mounted, initScripts]);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#0D1117' }} />;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: presentationCSS }} />
      <div ref={ref} className="presentation-mode" dangerouslySetInnerHTML={{ __html: pageHTML }} />
    </>
  );
}
