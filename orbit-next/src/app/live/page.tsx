import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Live Quinzenal de Gestão com IA | Orbit',
  description: 'A cada 15 dias, ao vivo pelo Zoom. Inscreva-se gratuitamente na live de gestão operada por agentes de IA.',
  alternates: { canonical: 'https://orbitgestao.com.br/live' },
  openGraph: {
    title: 'Live Quinzenal de Gestão com IA | Orbit',
    description: 'A cada 15 dias, ao vivo pelo Zoom. Live gratuita sobre gestão com agentes de IA.',
    url: 'https://orbitgestao.com.br/live',
  },
};

export default function Page() { return <PageContent />; }
