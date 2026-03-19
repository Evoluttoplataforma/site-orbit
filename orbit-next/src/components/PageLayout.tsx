'use client';

import { useEffect, useRef } from 'react';
import { headerHTML } from './shared-header';
import { oliviaHTML } from './shared-olivia';

interface PageLayoutProps {
  contentHTML: string;
}

export function PageLayout({ contentHTML }: PageLayoutProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Wait for DOM to be fully rendered, then execute inline scripts
    const timer = setTimeout(() => {
      const scripts = ref.current?.querySelectorAll('script');
      if (!scripts) return;

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
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Content already includes footer, Olivia hub, and page-specific scripts
  const fullHTML = headerHTML + '\n' + contentHTML;

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
