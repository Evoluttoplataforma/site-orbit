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

    const timer = setTimeout(() => {
      // Execute inline scripts
      const scripts = ref.current?.querySelectorAll('script');
      if (scripts) {
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
      }

      // Use document.querySelector (global) to find elements reliably
      initMobileMenu();
      initNavDropdowns();
      initHeaderScroll();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const fullHTML = headerHTML + '\n' + contentHTML;

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle') as HTMLElement;
  const menu = document.querySelector('.mobile-menu') as HTMLElement;
  const overlay = document.querySelector('.mobile-menu-overlay') as HTMLElement;

  if (!toggle || !menu) {
    console.warn('Mobile menu elements not found, retrying...');
    setTimeout(initMobileMenu, 300);
    return;
  }

  // Avoid duplicate listeners
  if ((toggle as any).__menuInit) return;
  (toggle as any).__menuInit = true;

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

function initNavDropdowns() {
  const navItems = document.querySelectorAll('.nav-menu > li');
  if (!navItems.length) {
    setTimeout(initNavDropdowns, 300);
    return;
  }

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  navItems.forEach(item => {
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown) return;
    if ((item as any).__dropInit) return;
    (item as any).__dropInit = true;

    if (isTouch) {
      item.addEventListener('click', (e) => {
        const isOpen = dropdown.classList.contains('show');
        document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
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
        document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
      }
    });
  }
}

function initHeaderScroll() {
  const header = document.querySelector('.header') as HTMLElement;
  const backToTop = document.querySelector('#backToTop') as HTMLElement;
  if (!header && !backToTop) {
    setTimeout(initHeaderScroll, 300);
    return;
  }

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    if (backToTop) backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
  });
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}
