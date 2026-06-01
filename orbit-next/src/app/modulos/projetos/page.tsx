import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Módulo Projetos Orbit: Gantt, dependências e execução por IA',
  description:
    'Crie, execute e monitore projetos com Gantt, dependências, membros, automações. O módulo de Projetos da Orbit conectado aos agentes de IA.',
  alternates: { canonical: 'https://orbitgestao.com.br/modulos/projetos' },
  openGraph: {
    title: 'Módulo Projetos | Orbit Gestão',
    description: 'Gantt, dependências e execução de projetos coordenada por agentes de IA.',
    url: 'https://orbitgestao.com.br/modulos/projetos',
    images: [{ url: 'https://orbitgestao.com.br/og/modulo-projetos.jpg', width: 1200, height: 630 }],
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Módulos', item: 'https://orbitgestao.com.br/modulos' },
    { '@type': 'ListItem', position: 3, name: 'Projetos', item: 'https://orbitgestao.com.br/modulos/projetos' },
  ],
};

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Software de gestão de projetos com IA',
  name: 'Módulo Projetos Orbit',
  provider: { '@type': 'Organization', name: 'Orbit Gestão', url: 'https://orbitgestao.com.br' },
  description:
    'Escopo, cronograma, dependências, membros, automações e riscos, coordenado pelos agentes do Time Olívia.',
  areaServed: 'Brasil',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['Substitui Asana ou Monday?', 'Para B2B brasileira de médio porte focada em gestão integrada, sim, com vantagem por estar conectado ao financeiro, indicadores e processos.'],
    ['Tem Kanban e Gantt?', 'Sim, os dois, alternáveis na mesma view.'],
    ['Posso convidar cliente externo?', 'Sim, com governança de permissões e trilha auditável de tudo.'],
    ['Identifica risco de atraso?', 'Sim, cruzando progresso, carga e dependências em tempo real.'],
    ['Integra com calendário?', 'Sim, Google Calendar e Outlook.'],
    ['Tem template de projeto?', 'Sim, configurável por empresa e por tipo de projeto.'],
    ['Custo do projeto monitorado?', 'Sim, ligado ao centro de custo e ao módulo financeiro.'],
    ['Exporta Gantt?', 'Sim, em PDF e PNG pra apresentação executiva.'],
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
