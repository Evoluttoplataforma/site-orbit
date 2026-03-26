'use client';
import { useEffect, useRef, useState } from 'react';
import { pageHTML } from './html';

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only render on client — avoids SSR hydration mismatch
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    ref.current.querySelectorAll('script').forEach(oldScript => {
      if (oldScript.src) {
        const s = document.createElement('script');
        s.src = oldScript.src;
        document.body.appendChild(s);
      } else if (oldScript.textContent) {
        try { new Function(oldScript.textContent)(); } catch (e) { console.error('CMS Script FATAL:', e); }
      }
    });
  }, [mounted]);

  if (!mounted) return null;

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: pageHTML }} />;
}
