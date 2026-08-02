import type { Metadata } from 'next';
import { PageContent } from './content';

const TITLE = 'Treinamentos e Tira Dúvidas Orbit — ao vivo toda semana';
const DESC =
  'Sessões ao vivo pelo Zoom: Tira Dúvidas na segunda e na sexta, Treinamento na quarta. Inscreva-se uma vez e receba o convite toda semana.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: 'https://orbitgestao.com.br/treinamentos' },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: 'https://orbitgestao.com.br/treinamentos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
  },
};

export default function TreinamentosPage() {
  return <PageContent />;
}
