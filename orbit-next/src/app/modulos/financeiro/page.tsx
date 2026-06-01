import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Módulo Financeiro Orbit: contas, fluxo de caixa, DRE em tempo real',
  description:
    'Contas a pagar, contas a receber, fluxo de caixa, DRE em tempo real, orçamento e conciliação bancária. O módulo financeiro da Orbit conectado aos agentes de IA.',
  alternates: { canonical: 'https://orbitgestao.com.br/modulos/financeiro' },
  openGraph: {
    title: 'Módulo Financeiro | Orbit Gestão',
    description:
      'Contas, fluxo de caixa projetado, DRE em tempo real e conciliação bancária. Coordenado pelos agentes do Time Olívia.',
    url: 'https://orbitgestao.com.br/modulos/financeiro',
    images: [{ url: 'https://orbitgestao.com.br/og/modulo-financeiro.jpg', width: 1200, height: 630 }],
  },
};

// Schemas básicos: Breadcrumb + Service + FAQPage (cumpre seção 4 do playbook).
const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Módulos', item: 'https://orbitgestao.com.br/modulos' },
    { '@type': 'ListItem', position: 3, name: 'Financeiro', item: 'https://orbitgestao.com.br/modulos/financeiro' },
  ],
};

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Software de gestão financeira com IA',
  name: 'Módulo Financeiro Orbit',
  provider: { '@type': 'Organization', name: 'Orbit Gestão', url: 'https://orbitgestao.com.br' },
  description:
    'Contas a pagar, contas a receber, fluxo de caixa, DRE em tempo real, orçamento e conciliação bancária, coordenado pelos agentes de IA do Time Olívia.',
  areaServed: 'Brasil',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['Substitui Conta Azul ou Omie?', 'Para B2B brasileira de médio porte focada em gestão integrada, sim. Para microempresa, são mais leves.'],
    ['Como funciona a DRE em tempo real?', 'Lançamentos atualizam a DRE instantaneamente. Você vê o resultado provável em qualquer dia do mês.'],
    ['Concilia com o banco automaticamente?', 'Sim, via Open Finance e integrações bancárias nativas.'],
    ['Detecta inadimplência precoce?', 'Sim. Padrão de comportamento alerta semanas antes do default.'],
    ['Tem regras de aprovação?', 'Sim. Limite por valor, hierarquia e escalonamento configuráveis.'],
    ['Atende empresas do Simples?', 'Sim. Simples Nacional, Lucro Presumido, Lucro Real e MEI.'],
    ['Integra com ERP?', 'Sim, via API e conectores.'],
    ['Quanto tempo até ter DRE em tempo real?', 'Aproximadamente 30 dias após o início.'],
  ].map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
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
