import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Masterclass Consultores com Christian Hart | Orbit Gestão',
  description: 'Live semanal para consultores que querem destravar recorrência passiva com agentes de IA. Toda quarta às 18h, com Christian Hart (Diretor de Canais GSN).',
  alternates: { canonical: 'https://orbitgestao.com.br/live/chris' },
  openGraph: {
    title: 'Masterclass Consultores com Christian Hart | Orbit Gestão',
    description: 'Live semanal para consultores. Toda quarta às 18h.',
    url: 'https://orbitgestao.com.br/live/chris',
  },
};

export default function LiveChrisPage() {
  return <PageContent />;
}
