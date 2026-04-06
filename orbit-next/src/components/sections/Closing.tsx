import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function ClosingSection() {
  const t = useTranslations('closing');

  return (
    <section className="py-16 bg-gradient-to-r from-gold to-gold-light text-center">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="text-[clamp(20px,3vw,28px)] font-extrabold text-black mb-2 leading-tight">
          {t('title')}
          <span className="block mt-2">{t('title2')}</span>
        </h2>
        <Link
          href="/chat"
          className="inline-block mt-6 px-8 py-3.5 bg-black text-white font-bold rounded-full hover:bg-[#1A1D23] transition-colors"
        >
          {t('btn')}
        </Link>
      </div>
    </section>
  );
}
