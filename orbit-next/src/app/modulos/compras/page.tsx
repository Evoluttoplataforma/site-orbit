import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Módulo Compras Orbit: pedidos, RFQ e fornecedores integrados',
  description:
    'Pedidos de compra, cotações (RFQ), fornecedores, workflows e aprovações. O módulo de Compras da Orbit conectado aos agentes de IA.',
  alternates: { canonical: 'https://orbitgestao.com.br/modulos/compras' },
  openGraph: {
    title: 'Módulo Compras | Orbit Gestão',
    description: 'Pedidos, RFQ, fornecedores e aprovações com governança e integração financeira.',
    url: 'https://orbitgestao.com.br/modulos/compras',
    images: [{ url: 'https://orbitgestao.com.br/og/modulo-compras.jpg', width: 1200, height: 630 }],
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Módulos', item: 'https://orbitgestao.com.br/modulos' },
    { '@type': 'ListItem', position: 3, name: 'Compras', item: 'https://orbitgestao.com.br/modulos/compras' },
  ],
};

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Software de gestão de compras com IA',
  name: 'Módulo Compras Orbit',
  provider: { '@type': 'Organization', name: 'Orbit Gestão', url: 'https://orbitgestao.com.br' },
  description:
    'Pedidos de compra, cotações (RFQ), fornecedores, workflows de aprovação e integração nativa com o financeiro.',
  areaServed: 'Brasil',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['Substitui Mercado Eletrônico ou Conformidade?', 'Para B2B brasileira de médio porte focada em gestão integrada, sim, com vantagem por estar conectado nativamente ao financeiro.'],
    ['Como o RFQ funciona?', 'Solicita cotação a múltiplos fornecedores na mesma operação e compara propostas automaticamente.'],
    ['Fornecedor tem portal?', 'Sim, com acesso restrito e auditável.'],
    ['Workflow tem alçada por valor?', 'Sim, alçada configurável por valor e por área.'],
    ['Integra com financeiro?', 'Sim. Aprovação cria contas a pagar automaticamente no módulo financeiro.'],
    ['Suporta cadastro nacional?', 'Sim, com SINTEGRA e Receita Federal.'],
    ['Aprovação tem SLA?', 'Sim, com escalonamento automático se ninguém aprovar dentro do prazo.'],
    ['Tempo até processo estabelecido?', 'Cerca de 30 dias.'],
  ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  );
}
