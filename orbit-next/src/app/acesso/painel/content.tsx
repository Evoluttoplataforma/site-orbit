'use client';
import { useEffect, useRef } from 'react';
import { pageHTML } from './html';
export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const timer = setTimeout(() => {
      ref.current?.querySelectorAll('script').forEach(oldScript => {
        if (oldScript.src) {
          const s = document.createElement('script');
          s.src = oldScript.src;
          document.body.appendChild(s);
        } else if (oldScript.textContent) {
          try { new Function(oldScript.textContent)(); } catch(e) { console.warn(e); }
        }
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: pageHTML }} />;
}
