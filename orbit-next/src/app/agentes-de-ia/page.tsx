import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Time Olívia: 12 agentes de IA que operam sua gestão | Orbit Gestão',
  description:
    'Conheça os 12 agentes de IA da Orbit, coordenados pela Olívia. Estratégico, processos, pessoas, indicadores, riscos, treinamento, oportunidades e mais.',
  alternates: { canonical: 'https://orbitgestao.com.br/agentes-de-ia' },
  openGraph: {
    title: 'Time Olívia · 12 agentes de IA | Orbit Gestão',
    description: 'Construído sobre 30 anos de metodologia GSN, agora operado por IA.',
    url: 'https://orbitgestao.com.br/agentes-de-ia',
    images: [{ url: 'https://orbitgestao.com.br/og/agentes-de-ia.jpg', width: 1200, height: 630 }],
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Agentes de IA', item: 'https://orbitgestao.com.br/agentes-de-ia' },
  ],
};

const collection = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Time Olívia · 12 agentes de IA',
  url: 'https://orbitgestao.com.br/agentes-de-ia',
  description:
    'Plataforma de gestão empresarial operada por 12 agentes de IA coordenados pela Olívia.',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
      <PageContent />
    </>
  );
}
