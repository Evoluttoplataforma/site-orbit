import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Agente Estrategista | Orbit — Planejamento e OKRs com IA',
  description: 'Olívia, Coordenadora Geral, conduz planejamento estratégico, OKRs e revisões trimestrais com base em dados da sua empresa.',
  alternates: { canonical: 'https://orbitgestao.com.br/agentes/estrategista' },
  openGraph: {
    title: 'Agente Estrategista | Orbit Gestão',
    description: 'Planejamento estratégico operado por IA com a Olívia.',
    url: 'https://orbitgestao.com.br/agentes/estrategista',
  },
};

export default function Page() { return <PageContent />; }
