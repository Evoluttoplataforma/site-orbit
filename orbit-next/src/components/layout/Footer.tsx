import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#0D1117] pt-16 text-white/60">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/[0.08]">
          <div>
            <Image src="/images/logo-orbit-white.png" alt="Orbit Gestão" width={92} height={36} className="h-9 w-auto mb-4" />
            <p className="text-sm leading-relaxed">{t('tagline')}</p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">{t('institutional')}</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/sobre" className="hover:text-white transition-colors">{t('about')}</Link></li>
              <li><Link href="/consultores" className="hover:text-white transition-colors">{t('partners')}</Link></li>
              <li><Link href="/seguranca-ia" className="hover:text-white transition-colors">{t('security')}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/historias" className="hover:text-white transition-colors">{t('stories')}</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">{t('legal')}</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/informacoes-legais" className="hover:text-white transition-colors">{t('legalInfo')}</Link></li>
              <li><Link href="/politica-privacidade" className="hover:text-white transition-colors">{t('privacy')}</Link></li>
              <li><Link href="/termos-de-servico" className="hover:text-white transition-colors">{t('terms')}</Link></li>
              <li><Link href="/politica-seguranca" className="hover:text-white transition-colors">{t('isp')}</Link></li>
              <li><Link href="/status" className="hover:text-white transition-colors">{t('status')}</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">{t('contact')}</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:contato@orbitgestao.com.br" className="hover:text-white transition-colors">contato@orbitgestao.com.br</a></li>
              <li><a href="https://wa.me/5548998246863" className="hover:text-white transition-colors">+55 (48) 99824-6863</a></li>
              <li>Florianópolis, Santa Catarina, Brasil</li>
            </ul>
            <p className="text-xs font-bold text-[#ffba1a] tracking-wide mt-4 mb-2">{t('officeUs')}</p>
            <p className="text-sm">{t('unitUs')}</p>
            <p className="text-sm mt-1">Bainbridge World Center, Orlando, FL</p>
          </div>
        </div>

        <div className="py-6 text-sm space-y-2 text-white/45">
          <p>{t('legalEntity')}</p>
          <p>{t('legalAddress')}</p>
          <p>{t('legalGroup')}</p>
        </div>

        <div className="py-6 text-center text-sm border-t border-white/[0.08]">
          <p>{t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
