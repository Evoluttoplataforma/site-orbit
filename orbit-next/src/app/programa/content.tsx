'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { htmlTop, htmlBottom } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';
import { LigaRanking } from '@/components/LigaRanking';
import { reapplyOrbitLang } from '@/lib/reapply-lang';

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const initialized = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  // Reexecuta os <script> inline injetados via dangerouslySetInnerHTML
  // (reveal / FAQ / smooth-scroll). Mesmo mecanismo de historias/content.tsx.
  const initScripts = useCallback(() => {
    if (!ref.current || initialized.current) return;
    initialized.current = true;
    ref.current.querySelectorAll('script').forEach((oldScript) => {
      if (oldScript.src) {
        const s = document.createElement('script');
        s.src = oldScript.src;
        document.body.appendChild(s);
      } else if (oldScript.textContent) {
        try { new Function(oldScript.textContent)(); } catch (e) { console.warn('Script error:', e); }
      }
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t1 = setTimeout(initScripts, 50);
    const t2 = setTimeout(initScripts, 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [mounted, initScripts]);

  useEffect(() => {
    reapplyOrbitLang();
    const t = setTimeout(reapplyOrbitLang, 80);
    return () => clearTimeout(t);
  });

  return (
    <div ref={ref}>
      <div dangerouslySetInnerHTML={{ __html: headerHTML + '\n' + htmlTop }} />
      <LigaRanking />
      <div dangerouslySetInnerHTML={{ __html: htmlBottom + '\n' + footerHTML }} />
    </div>
  );
}
