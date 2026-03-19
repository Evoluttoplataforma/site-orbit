'use client';

import { useEffect, useRef } from 'react';

interface PageShellProps {
  html: string;
  translations?: Record<string, string>;
}

export function PageShell({ html, translations }: PageShellProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Execute inline scripts from the original HTML
    const scripts = ref.current.querySelectorAll('script');
    const executed: HTMLScriptElement[] = [];

    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
      executed.push(newScript);
    });

    return () => {
      executed.forEach(s => s.remove());
    };
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
