'use client';

import { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

function CanalInner() {
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const initScripts = useCallback(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('script').forEach(oldScript => {
      if (oldScript.textContent) {
        try { new Function(oldScript.textContent)(); } catch (e) { console.warn('Script error:', e); }
      }
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(initScripts, 50);
    return () => clearTimeout(t);
  }, [mounted, initScripts]);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#0D1117' }} />;

  const fullHTML = headerHTML + '\n' + pageHTML + '\n' + footerHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}

export function PageContent() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0D1117' }} />}>
      <CanalInner />
    </Suspense>
  );
}
