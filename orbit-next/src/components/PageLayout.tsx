'use client';

import { useEffect, useRef } from 'react';
import { headerHTML } from './shared-header';
import { footerHTML } from './shared-footer';

interface PageLayoutProps {
  contentHTML: string;
}

export function PageLayout({ contentHTML }: PageLayoutProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Execute inline scripts from the content HTML
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

  // Content already includes footer and page-specific scripts
  const fullHTML = headerHTML + '\n' + contentHTML;

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
