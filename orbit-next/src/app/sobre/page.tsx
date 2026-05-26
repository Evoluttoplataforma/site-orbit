import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Sobre a Orbit Gestão | 30 Anos do Grupo GSN em Consultoria',
  description: 'Da Grupo GSN: 30 anos de experiência, +8.000 empresas atendidas. Conheça a história, o ecossistema e o time da Orbit.',
  alternates: { canonical: 'https://orbitgestao.com.br/sobre' },
  openGraph: {
    title: 'Sobre a Orbit Gestão',
    description: '30 anos de consultoria do Grupo GSN agora operada por agentes de IA.',
    url: 'https://orbitgestao.com.br/sobre',
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Sobre', item: 'https://orbitgestao.com.br/sobre' },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageContent />
    </>
  );
}
