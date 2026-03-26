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

      // Initialize mobile menu after HTML is injected
      const toggle = ref.current?.querySelector('.menu-toggle') as HTMLElement;
      const menu = ref.current?.querySelector('.mobile-menu') as HTMLElement;
      const overlay = ref.current?.querySelector('.mobile-menu-overlay') as HTMLElement;

      if (toggle && menu) {
        const close = () => {
          toggle.classList.remove('active');
          menu.classList.remove('active');
          if (overlay) overlay.classList.remove('active');
          document.body.style.overflow = '';
        };
        const open = () => {
          toggle.classList.add('active');
          menu.classList.add('active');
          if (overlay) overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        };

        (window as any).closeMobileMenu = close;
        (window as any).openMobileMenu = open;

        toggle.addEventListener('click', () => {
          menu.classList.contains('active') ? close() : open();
        });

        menu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', close);
        });
      }

      // Initialize nav dropdowns (touch + hover)
      const navItems = ref.current?.querySelectorAll('.nav-menu > li');
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      navItems?.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        if (!dropdown) return;
        if (isTouch) {
          item.addEventListener('click', (e) => {
            const isOpen = dropdown.classList.contains('show');
            ref.current?.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
            if (!isOpen) {
              e.preventDefault();
              dropdown.classList.add('show');
            }
          });
        } else {
          item.addEventListener('mouseenter', () => dropdown.classList.add('show'));
          item.addEventListener('mouseleave', () => dropdown.classList.remove('show'));
        }
      });
      if (isTouch) {
        document.addEventListener('click', (e) => {
          if (!(e.target as HTMLElement).closest('.nav-menu > li')) {
            ref.current?.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
          }
        });
      }

      // Header scroll effect + back to top
      const header = ref.current?.querySelector('.header') as HTMLElement;
      const backToTop = ref.current?.querySelector('#backToTop') as HTMLElement;
      if (header || backToTop) {
        window.addEventListener('scroll', () => {
          if (header) header.classList.toggle('scrolled', window.scrollY > 50);
          if (backToTop) backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
        });
        if (backToTop) {
          backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Content already includes footer, Olivia hub, and page-specific scripts
  const fullHTML = headerHTML + '\n' + contentHTML;

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}
