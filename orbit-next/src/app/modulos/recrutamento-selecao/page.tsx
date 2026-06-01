import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Módulo R&S Orbit: recrutamento e seleção com triagem de CV por IA',
  description:
    'Vagas, candidatos, triagem de CV por IA, etapas seletivas, scorecards, banco de talentos. O módulo de R&S da Orbit conectado aos agentes.',
  alternates: { canonical: 'https://orbitgestao.com.br/modulos/recrutamento-selecao' },
  openGraph: {
    title: 'Módulo Recrutamento e Seleção | Orbit Gestão',
    description: 'Do anúncio à contratação com IA, triagem, scorecards e banco de talentos.',
    url: 'https://orbitgestao.com.br/modulos/recrutamento-selecao',
    images: [{ url: 'https://orbitgestao.com.br/og/modulo-recrutamento-selecao.jpg', width: 1200, height: 630 }],
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Módulos', item: 'https://orbitgestao.com.br/modulos' },
    { '@type': 'ListItem', position: 3, name: 'Recrutamento e Seleção', item: 'https://orbitgestao.com.br/modulos/recrutamento-selecao' },
  ],
};

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Software de recrutamento e seleção com IA',
  name: 'Módulo Recrutamento e Seleção Orbit',
  provider: { '@type': 'Organization', name: 'Orbit Gestão', url: 'https://orbitgestao.com.br' },
  description:
    'Vagas, candidatos, triagem de CV por IA, etapas seletivas, scorecards e banco de talentos, coordenado pelos agentes do Time Olívia.',
  areaServed: 'Brasil',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['Substitui Gupy ou Kenoby?', 'Para B2B brasileira de médio porte focada em gestão integrada, sim, com vantagem em integração com o restante da operação.'],
    ['A IA discrimina candidatos?', 'Não. A IA avalia aderência técnica e comportamental ao perfil definido pelo time, sem usar atributos sensíveis.'],
    ['Como a triagem funciona?', 'A IA compara o CV ao perfil definido na vaga e gera um score com justificativa por candidato.'],
    ['Posso definir scorecard de entrevista?', 'Sim. Scorecards são configuráveis por cargo e por etapa do processo.'],
    ['Integra com LinkedIn?', 'Sim, importação de vagas e perfis suportada.'],
    ['O candidato vê o status dele?', 'Sim. Portal de candidato com transparência sobre etapa atual e próximos passos.'],
    ['Tem banco de talentos?', 'Sim. Candidatos qualificados ficam classificados para vagas futuras similares.'],
    ['Reduz tempo de fechamento em quanto?', 'De 30% a 50% em 60 a 90 dias, dependendo do volume e do perfil das vagas.'],
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
