import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Treinamentos Orbit — Sessões de tira dúvidas ao vivo',
  description: 'Sessões de tira dúvidas no Google Meet para clientes finais e consultorias. Reserve sua vaga e tire dúvidas com o time Orbit.',
  alternates: { canonical: 'https://orbitgestao.com.br/treinamentos' },
  openGraph: {
    title: 'Treinamentos Orbit — Sessões de tira dúvidas ao vivo',
    description: 'Tira dúvidas ao vivo para clientes finais e consultorias. Reserve sua vaga e acesse a sala no Google Meet.',
    url: 'https://orbitgestao.com.br/treinamentos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treinamentos Orbit — Sessões de tira dúvidas ao vivo',
    description: 'Tira dúvidas ao vivo para clientes finais e consultorias. Reserve sua vaga e acesse a sala no Google Meet.',
  },
};

export default function TreinamentosPage() {
  return <PageContent />;
}
