import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Para Empresários | Orbit Gestão — Time de IA que Operacionaliza',
  description: 'Empresário que precisa de gestão sem virar gerente: descubra como o time de IA da Orbit constrói e opera processos, indicadores e rotinas 24/7.',
  alternates: { canonical: 'https://orbitgestao.com.br/empresarios' },
  openGraph: {
    title: 'Para Empresários | Orbit Gestão',
    description: 'Time de IA que constrói e opera a gestão da sua empresa, com consultoria recorrente passiva inclusa.',
    url: 'https://orbitgestao.com.br/empresarios',
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Para Empresários', item: 'https://orbitgestao.com.br/empresarios' },
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
