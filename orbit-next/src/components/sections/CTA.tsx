import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-24 bg-light-bg text-center">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-[0_8px_24px_rgba(255,186,26,0.25)]">
          <span className="text-2xl">🚀</span>
        </div>
        <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-light-text mb-3 leading-tight">
          {t('title')}
        </h2>
        <p className="text-base text-gray-dark mb-8 leading-relaxed">
          {t('desc')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#contato-form"
            className="group relative px-7 py-3.5 pr-14 bg-gold text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:pl-14 hover:pr-7"
          >
            <span className="relative z-10">{t('primary')}</span>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-black text-gold rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-40px)] group-hover:rotate-45 text-xs">→</span>
          </Link>
          <Link href="#contato-form" className="px-7 py-3.5 text-light-text font-semibold border border-[#D1D5DB] rounded-full hover:border-light-text hover:bg-black/[0.04] transition-all">
            {t('secondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
