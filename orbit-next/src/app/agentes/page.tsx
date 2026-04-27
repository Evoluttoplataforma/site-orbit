import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Agentes de IA | Orbit Gestão — Conheça o Time que Opera sua Gestão',
  description: 'Estrategista, Financeiro, Comercial, RH e mais. Veja todos os agentes de IA da Orbit que executam a gestão da sua empresa 24/7.',
  alternates: { canonical: 'https://orbitgestao.com.br/agentes' },
  openGraph: {
    title: 'Agentes de IA | Orbit Gestão',
    description: 'Time de agentes de IA especializados em cada área da gestão.',
    url: 'https://orbitgestao.com.br/agentes',
  },
};

export default function Page() {
  return <PageContent />;
}
