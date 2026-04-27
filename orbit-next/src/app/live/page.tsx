import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Live Semanal de Gestão com IA | Orbit',
  description: 'Inscreva-se gratuitamente na live semanal sobre gestão operada por agentes de IA.',
  alternates: { canonical: 'https://orbitgestao.com.br/live' },
  openGraph: {
    title: 'Live Semanal de Gestão com IA | Orbit',
    description: 'Live gratuita semanal sobre gestão com agentes de IA.',
    url: 'https://orbitgestao.com.br/live',
  },
};

export default function Page() { return <PageContent />; }
