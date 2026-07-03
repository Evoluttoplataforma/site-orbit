import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Liga Orbit · Canais — Programa de Crescimento',
  description: 'A disputa entre canais Orbit: quem mais cresce em licenças novas até o Bootcamp de setembro leva o pódio, leads e uma imersão de liderança nos EUA.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PageContent />;
}
