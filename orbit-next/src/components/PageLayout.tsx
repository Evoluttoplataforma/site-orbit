'use client';

import { useEffect, useRef, useCallback } from 'react';
import { headerHTML } from './shared-header';

interface PageLayoutProps {
  contentHTML: string;
}

export function PageLayout({ contentHTML }: PageLayoutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const initAll = useCallback(() => {
    if (!ref.current || initialized.current) return;
    initialized.current = true;

    // Execute inline scripts
    const scripts = ref.current.querySelectorAll('script');
    scripts.forEach(oldScript => {
      if (oldScript.src) {
        const newScript = document.createElement('script');
        newScript.src = oldScript.src;
        document.body.appendChild(newScript);
      } else if (oldScript.textContent) {
        try {
          const fn = new Function(oldScript.textContent);
          fn();
        } catch (e) {
          console.warn('Script execution error:', e);
        }
      }
    });

    // Mobile menu, nav dropdowns, header scroll, and lang switch
    // are ALL handled by main-v2.js via event delegation.
    // Do NOT add direct handlers here — they conflict with event delegation.
  }, []);

  useEffect(() => {
    const t1 = setTimeout(initAll, 50);
    const t2 = setTimeout(initAll, 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [initAll]);

  const fullHTML = headerHTML + '\n' + contentHTML;

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
