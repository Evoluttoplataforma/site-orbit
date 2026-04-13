'use client';

import { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { pageHTML } from './html';

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

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: pageHTML }} />;
}

export function PageContent() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0D1117' }} />}>
      <CanalInner />
    </Suspense>
  );
}
