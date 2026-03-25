'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[1340px] z-[1000] border border-white/[0.08] rounded-2xl transition-all duration-400 ${scrolled ? 'bg-black/85 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/10 top-2' : 'bg-[#0D1117]/60 backdrop-blur-[24px]'}`}>
        <div className="flex items-center justify-between h-[72px] max-w-[1200px] mx-auto px-6">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo-orbit-white.png" alt="Orbit" width={140} height={40} className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-1">
            <li><Link href="/" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all">{t('home')}</Link></li>
            <NavDropdown label={t('platform')}>
              <DropdownLink href="/agentes" icon="🤖" title={t('agents')} sub={t('agentsSub')} />
              <DropdownLink href="/processos" icon="🔄" title={t('processes')} sub={t('processesSub')} />
              <DropdownLink href="/indicadores" icon="📊" title={t('indicators')} sub={t('indicatorsSub')} />
              <DropdownLink href="/tarefas" icon="✅" title={t('tasks')} sub={t('tasksSub')} />
              <DropdownLink href="/competencias" icon="👥" title={t('skills')} sub={t('skillsSub')} />
              <DropdownLink href="/auditorias" icon="📋" title={t('audits')} sub={t('auditsSub')} />
            </NavDropdown>
            <NavDropdown label={t('forWhom')}>
              <DropdownLink href="/lp-empresas" icon="🏢" title={t('businesses')} sub={t('businessesSub')} />
              <DropdownLink href="/consultores" icon="👔" title={t('consultants')} sub={t('consultantsSub')} />
            </NavDropdown>
            <li><Link href="/pricing" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all">{t('plans')}</Link></li>
            <NavDropdown label={t('content')}>
              <DropdownLink href="/blog" icon="📰" title={t('blog')} sub={t('blogSub')} />
              <DropdownLink href="/historias" icon="⭐" title={t('stories')} sub={t('storiesSub')} />
              <DropdownLink href="/faq" icon="❓" title={t('faq')} sub={t('faqSub')} />
            </NavDropdown>
            <NavDropdown label={t('company')}>
              <DropdownLink href="/sobre" icon="🏛️" title={t('about')} sub={t('aboutSub')} />
              <DropdownLink href="/parcerias" icon="🤝" title={t('partners')} sub={t('partnersSub')} />
              <DropdownLink href="/consultores" icon="🌐" title={t('channels')} sub={t('channelsSub')} />
            </NavDropdown>
          </ul>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://app.orbitgestao.com.br/login" className="px-5 py-2 text-sm font-semibold text-white border border-white/20 rounded-full hover:border-white/40 transition-all">{t('login')}</a>
            <Link href="#contato-form" className="group relative px-5 py-2 pr-12 text-sm font-semibold bg-gold text-black rounded-full overflow-hidden transition-all duration-500 hover:pl-12 hover:pr-5">
              <span className="relative z-10">{t('cta')}</span>
              <span className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-black text-gold rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45 text-xs">→</span>
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <LanguageSwitcher />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="flex flex-col gap-[5px] p-2">
              <span className="w-6 h-0.5 bg-white rounded" />
              <span className="w-6 h-0.5 bg-white rounded" />
              <span className="w-6 h-0.5 bg-white rounded" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1999]" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 w-[min(320px,85vw)] h-dvh bg-gradient-to-b from-[#0D1117] to-[#161B22] z-[2000] flex flex-col border-l border-white/[0.06] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center bg-white/[0.06] border border-white/[0.08] rounded-lg text-white/60 text-xl hover:bg-white/10">×</button>
            </div>
            <div className="flex-1 p-4 space-y-1">
              <MobileLink href="/" icon="🏠" onClick={() => setMobileOpen(false)}>{t('home')}</MobileLink>
              <MobileLink href="/pricing" icon="🏷️" onClick={() => setMobileOpen(false)}>{t('plans')}</MobileLink>
              <MobileLink href="/agentes" icon="🤖" onClick={() => setMobileOpen(false)}>{t('agents')}</MobileLink>
              <MobileLink href="/processos" icon="🔄" onClick={() => setMobileOpen(false)}>{t('processes')}</MobileLink>
              <MobileLink href="/indicadores" icon="📊" onClick={() => setMobileOpen(false)}>{t('indicators')}</MobileLink>
              <MobileLink href="/blog" icon="📰" onClick={() => setMobileOpen(false)}>{t('blog')}</MobileLink>
              <MobileLink href="/sobre" icon="🏛️" onClick={() => setMobileOpen(false)}>{t('about')}</MobileLink>
              <MobileLink href="/faq" icon="❓" onClick={() => setMobileOpen(false)}>{t('faq')}</MobileLink>
            </div>
            <div className="p-4 border-t border-white/[0.06]">
              <Link href="#contato-form" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3.5 bg-gold text-black font-bold rounded-full">{t('cta')}</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="relative group">
      <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all">
        {label} <span className="text-[10px] transition-transform group-hover:rotate-180">▾</span>
      </button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[300px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-black/[0.06] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50 p-2">
        {children}
      </div>
    </li>
  );
}

function DropdownLink({ href, icon, title, sub }: { href: string; icon: string; title: string; sub: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-dark hover:bg-[#FAFBFC] transition-all group/link">
      <span className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center text-base group-hover/link:bg-gold group-hover/link:text-black transition-all">{icon}</span>
      <div>
        <div className="text-sm font-semibold text-[#1A1D23]">{title}</div>
        <div className="text-xs text-[#5A6069]">{sub}</div>
      </div>
    </Link>
  );
}

function MobileLink({ href, icon, children, onClick }: { href: string; icon: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-3 px-3 py-3 text-white/75 text-[0.9rem] font-medium rounded-lg hover:bg-gold/[0.06] transition-all">
      <span className="w-8 h-8 flex items-center justify-center text-sm bg-gold/[0.08] rounded-lg">{icon}</span>
      {children}
    </Link>
  );
}
