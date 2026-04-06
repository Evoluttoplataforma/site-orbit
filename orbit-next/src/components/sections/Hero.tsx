'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function HeroSection() {
  const t = useTranslations('hero');
  const words: string[] = t.raw('words');
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative min-h-[80vh] flex items-center pt-[180px] pb-[120px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.06] blur-[120px] z-0" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[100px] z-0" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <span className="inline-block px-5 py-2 mb-8 text-sm font-medium text-gold/80 border border-gold/20 rounded-full bg-gold/[0.06]">
          {t('badge')}
        </span>

        {/* Title */}
        <h1 className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.15] tracking-tight mb-6 text-white/90">
          {t('title1')}<br />
          {t('title2')} <span className="text-gradient-gold">{t('titleHighlight')}</span> {t('titleEnd')}{' '}
          <span className="relative inline-flex overflow-hidden h-[1.2em] align-bottom min-w-[200px]">
            {words.map((word, i) => (
              <span
                key={i}
                className={`absolute left-0 w-full text-gold font-extrabold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === wordIndex
                    ? 'opacity-100 translate-y-0'
                    : i < wordIndex || (wordIndex === 0 && i === words.length - 1)
                    ? 'opacity-0 -translate-y-[120%]'
                    : 'opacity-0 translate-y-full'
                }`}
                style={i === wordIndex ? { position: 'relative' } : {}}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray max-w-[680px] mx-auto mb-8 leading-relaxed">
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Link
            href="/chat"
            className="group relative px-7 py-4 pr-14 bg-gold text-black font-bold text-base rounded-full overflow-hidden transition-all duration-500 hover:pl-14 hover:pr-7"
          >
            <span className="relative z-10">{t('ctaPrimary')}</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-gold rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-48px)] group-hover:rotate-45 text-sm">→</span>
          </Link>
          <Link href="#agentes" className="px-7 py-4 text-white font-semibold text-base hover:text-gold transition-colors">
            {t('ctaSecondary')} <span className="ml-1">↓</span>
          </Link>
        </div>

        <p className="text-sm text-gray/60 mb-10">{t('note')}</p>

        {/* Credentials */}
        <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
          <div className="text-center">
            <strong className="block text-2xl sm:text-3xl font-extrabold text-gradient-gold">{t('years')}</strong>
            <span className="text-xs text-gray uppercase tracking-wider">{t('yearsLabel')}</span>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <strong className="block text-2xl sm:text-3xl font-extrabold text-gradient-gold">{t('companies')}</strong>
            <span className="text-xs text-gray uppercase tracking-wider">{t('companiesLabel')}</span>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <strong className="block text-2xl sm:text-3xl font-extrabold text-gradient-gold">{t('orbit')}</strong>
            <span className="text-xs text-gray uppercase tracking-wider">{t('orbitLabel')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
