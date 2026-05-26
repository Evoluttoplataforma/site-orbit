import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Histórias de Clientes | Orbit Gestão — Cases Reais',
  description: 'Cases de empresas que estruturaram gestão com agentes de IA. Resultados, jornadas e aprendizados de quem já implementou a Orbit.',
  alternates: { canonical: 'https://orbitgestao.com.br/historias' },
  openGraph: {
    title: 'Histórias de Clientes | Orbit Gestão',
    description: 'Cases reais de empresas com gestão operada por agentes de IA.',
    url: 'https://orbitgestao.com.br/historias',
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Histórias de Clientes', item: 'https://orbitgestao.com.br/historias' },
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
