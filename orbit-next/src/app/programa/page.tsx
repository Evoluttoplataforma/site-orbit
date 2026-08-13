import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Programa Orbit de Crescimento e Reconhecimento — Vence quem mais cresce',
  description: 'A disputa entre canais. Quem mais cresce até setembro leva o pódio: leads, experiências com os founders e o Disney Institute nos EUA.',
  metadataBase: new URL('https://orbitgestao.com.br'),
  alternates: { canonical: '/programa' },
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    url: 'https://orbitgestao.com.br/programa',
    siteName: 'Orbit',
    title: 'Programa Orbit de Crescimento e Reconhecimento — Vence quem mais cresce',
    description: 'A disputa entre canais. Quem mais cresce até setembro leva o pódio: leads, experiências com os founders e o Disney Institute nos EUA.',
    images: [{ url: '/images/og-programa-v2.png', width: 1200, height: 630, alt: 'Programa Orbit de Crescimento e Reconhecimento' }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programa Orbit de Crescimento e Reconhecimento — Vence quem mais cresce',
    description: 'A disputa entre canais. Quem mais cresce até setembro leva o pódio: leads, experiências com os founders e o Disney Institute nos EUA.',
    images: ['/images/og-programa-v2.png'],
  },
};

export default function Page() {
  return <PageContent />;
}
