'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { pageHTML } from './html';
import { headerHTML } from '@/components/shared-header';

export function PageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const initScripts = useCallback(() => {
    if (!ref.current) return;

    // Reset init flags
    const toggle = document.querySelector('.menu-toggle') as any;
    if (toggle) toggle.__menuInit = false;
    document.querySelectorAll('.nav-menu > li').forEach((item: any) => { item.__dropInit = false; });
    (window as any).__headerScrollInit = false;

    ref.current.querySelectorAll('script').forEach(oldScript => {
      if (oldScript.src) {
        const s = document.createElement('script');
        s.src = oldScript.src;
        document.body.appendChild(s);
      } else if (oldScript.textContent) {
        try { new Function(oldScript.textContent)(); } catch (e) { console.warn('Script error:', e); }
      }
    });

    initMobileMenu();
    initNavDropdowns();
    initHeaderScroll();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(initScripts, 50);
    return () => clearTimeout(t);
  }, [mounted, initScripts]);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#0D1117' }} />;

  const fullHTML = headerHTML + '\n' + pageHTML;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: fullHTML }} />;
}

// ── Header helpers ──
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle') as HTMLElement;
  const menu = document.querySelector('.mobile-menu') as HTMLElement;
  const overlay = document.querySelector('.mobile-menu-overlay') as HTMLElement;
  if (!toggle || !menu) { setTimeout(initMobileMenu, 250); return; }
  if ((toggle as any).__menuInit) return;
  (toggle as any).__menuInit = true;
  const close = () => { toggle.classList.remove('active'); menu.classList.remove('active'); if (overlay) overlay.classList.remove('active'); document.body.style.overflow = ''; };
  const open = () => { toggle.classList.add('active'); menu.classList.add('active'); if (overlay) overlay.classList.add('active'); document.body.style.overflow = 'hidden'; };
  (window as any).closeMobileMenu = close;
  (window as any).openMobileMenu = open;
  toggle.addEventListener('click', () => { menu.classList.contains('active') ? close() : open(); });
  menu.querySelectorAll('a').forEach(link => { link.addEventListener('click', close); });
}

function initNavDropdowns() {
  const navItems = document.querySelectorAll('.nav-menu > li');
  if (!navItems.length) { setTimeout(initNavDropdowns, 300); return; }
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  navItems.forEach(item => {
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown || (item as any).__dropInit) return;
    (item as any).__dropInit = true;
    if (isTouch) {
      item.addEventListener('click', (e) => {
        const isOpen = dropdown.classList.contains('show');
        document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
        if (!isOpen) { e.preventDefault(); dropdown.classList.add('show'); }
      });
    } else {
      item.addEventListener('mouseenter', () => dropdown.classList.add('show'));
      item.addEventListener('mouseleave', () => dropdown.classList.remove('show'));
    }
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.header') as HTMLElement;
  const backToTop = document.querySelector('#backToTop') as HTMLElement;
  if (!header && !backToTop) { setTimeout(initHeaderScroll, 300); return; }
  if ((window as any).__headerScrollInit) return;
  (window as any).__headerScrollInit = true;
  window.addEventListener('scroll', () => {
    const h = document.querySelector('.header') as HTMLElement;
    const btn = document.querySelector('#backToTop') as HTMLElement;
    if (h) h.classList.toggle('scrolled', window.scrollY > 50);
    if (btn) btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  });
}
