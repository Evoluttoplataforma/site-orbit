import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Live Especial RD Station | Orbit Gestão',
  description: 'Live exclusiva para canais RD Station: gestão com agentes de IA aplicada à operação.',
  alternates: { canonical: 'https://orbitgestao.com.br/live/rd' },
  openGraph: {
    title: 'Live Especial RD Station | Orbit Gestão',
    description: 'Live para canais RD: gestão operada por IA.',
    url: 'https://orbitgestao.com.br/live/rd',
  },
};

export default function LiveRDPage() {
  return <PageContent />;
}
