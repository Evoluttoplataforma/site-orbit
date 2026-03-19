'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState('pt');

  useEffect(() => {
    setLocale(document.cookie.match(/locale=(\w+)/)?.[1] || 'pt');
  }, []);

  const toggle = () => {
    const next = locale === 'pt' ? 'en' : 'pt';
    document.cookie = `locale=${next};path=/;max-age=31536000`;
    setLocale(next);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] border border-white/10 rounded-lg text-white/70 text-sm font-semibold hover:bg-white/10 hover:border-white/20 hover:text-white transition-all cursor-pointer"
      aria-label="Change language"
    >
      <span className="text-base leading-none">{locale === 'pt' ? '🇺🇸' : '🇧🇷'}</span>
      <span className="text-xs font-bold tracking-wide">{locale === 'pt' ? 'EN' : 'PT'}</span>
    </button>
  );
}
