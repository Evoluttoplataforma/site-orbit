'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';

function BlogInner() {
  const searchParams = useSearchParams();
  const artigo = searchParams.get('artigo');
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const initScripts = useCallback(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('script').forEach(oldScript => {
      if (oldScript.src) {
        const s = document.createElement('script');
        s.src = oldScript.src;
        document.body.appendChild(s);
      } else if (oldScript.textContent) {
        try { new Function(oldScript.textContent)(); } catch (e) { console.warn('Blog script error:', e); }
      }
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(initScripts, 50);
    return () => clearTimeout(t);
  }, [mounted, artigo, initScripts]);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#0D1117' }} />;

  const fullHTML = headerHTML + '\n' + pageHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}

export function PageContent() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0D1117' }} />}>
      <BlogInner />
    </Suspense>
  );
}
