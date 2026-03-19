import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-[#0D1117] pt-16 text-white/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/[0.08]">
          {/* Brand */}
          <div>
            <Image src="/images/logo-orbit-white.png" alt="Orbit" width={140} height={36} className="h-9 w-auto mb-4" />
            <p className="text-sm leading-relaxed">{t('tagline')}</p>
            <div className="flex items-center gap-0 mt-5">
              {['LinkedIn', 'Facebook', 'Instagram', 'YouTube'].map((name) => (
                <a key={name} href="#" className="relative px-4 py-2.5 text-white/50 text-lg hover:text-white transition-all group" title={name}>
                  <span>{name === 'LinkedIn' ? '🔗' : name === 'Facebook' ? '📘' : name === 'Instagram' ? '📷' : '🎬'}</span>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gold/15 border border-gold/30 text-gold text-[0.65rem] font-bold px-2.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">{name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-sm font-semibold text-white mb-4">{t('contact')}</h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">📞 (48) 99120-6282</li>
              <li className="flex items-center gap-2">📍 Square SC, Florianópolis - SC</li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h5 className="text-sm font-semibold text-white mb-4">{t('platform')}</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/agentes" className="hover:text-white transition-colors">{nav('agents')}</Link></li>
              <li><Link href="/processos" className="hover:text-white transition-colors">{nav('processes')}</Link></li>
              <li><Link href="/indicadores" className="hover:text-white transition-colors">{nav('indicators')}</Link></li>
              <li><Link href="/tarefas" className="hover:text-white transition-colors">{nav('tasks')}</Link></li>
              <li><Link href="/competencias" className="hover:text-white transition-colors">{nav('skills')}</Link></li>
              <li><Link href="/auditorias" className="hover:text-white transition-colors">{nav('audits')}</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">{t('plans')}</Link></li>
            </ul>
          </div>

          {/* Content + Company */}
          <div>
            <h5 className="text-sm font-semibold text-white mb-4">{t('content')}</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">{nav('blog')}</Link></li>
              <li><Link href="/historias" className="hover:text-white transition-colors">{t('stories')}</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">{nav('faq')}</Link></li>
            </ul>
            <h5 className="text-sm font-semibold text-white mb-4 mt-6">{t('company')}</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/sobre" className="hover:text-white transition-colors">{t('about')}</Link></li>
              <li><Link href="/parcerias" className="hover:text-white transition-colors">{t('partners')}</Link></li>
              <li><Link href="/consultores" className="hover:text-white transition-colors">{t('channels')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-6 text-center text-sm">
          <p>{t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
