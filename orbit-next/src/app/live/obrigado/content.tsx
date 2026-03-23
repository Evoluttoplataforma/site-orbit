'use client';

import { useEffect, useRef } from 'react';
import { pageHTML } from './html';

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const timer = setTimeout(() => {
      const scripts = ref.current?.querySelectorAll('script');
      if (!scripts) return;
      scripts.forEach(oldScript => {
        if (oldScript.textContent) {
          try {
            const fn = new Function(oldScript.textContent);
            fn();
          } catch (e) {
            console.warn('Script execution error:', e);
          }
        }
      });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: pageHTML }} />;
}
