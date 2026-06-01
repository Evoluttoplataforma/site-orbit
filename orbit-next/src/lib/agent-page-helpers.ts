/**
 * Helpers compartilhados pelas 12 páginas de agentes.
 * Gera os schemas JSON-LD (Service, FAQPage, BreadcrumbList) que
 * cada page.tsx precisa, a partir do payload de dados de cada agente.
 */

export type AgentSeo = {
  slug: string;          // 'estrategico'
  name: string;          // 'Agente Estratégico'
  title: string;         // meta title
  description: string;   // meta description
  ogTitle: string;       // OG title (curto)
  ogDescription: string; // OG description
  faqs: Array<{ q: string; a: string }>; // mesmas FAQs renderizadas na página
};

const BASE_URL = 'https://orbitgestao.com.br';

export function buildAgentBreadcrumb(seo: AgentSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Agentes de IA', item: `${BASE_URL}/agentes-de-ia` },
      { '@type': 'ListItem', position: 3, name: seo.name, item: `${BASE_URL}/agentes/${seo.slug}` },
    ],
  };
}

export function buildAgentService(seo: AgentSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Agente de IA para gestão empresarial',
    name: seo.name,
    provider: { '@type': 'Organization', name: 'Orbit Gestão', url: BASE_URL },
    description: seo.description,
    areaServed: 'Brasil',
    url: `${BASE_URL}/agentes/${seo.slug}`,
  };
}

// Detecta menções a outros agentes/módulos nas FAQs e devolve URLs canônicas.
// Usado como `mentions` no FAQPage schema, AI overviews extraem isso e amplificam
// o contexto da resposta na busca generativa.
function detectFaqMentions(faqs: AgentSeo['faqs']): Array<{ '@type': string; name: string; url: string }> {
  const text = faqs.map(f => f.q + ' ' + f.a).join(' ');
  const map: Array<{ pattern: RegExp; name: string; url: string }> = [
    { pattern: /Agente de Oportunidades/i, name: 'Agente de Oportunidades', url: `${BASE_URL}/agentes/oportunidades` },
    { pattern: /Agente de Indicadores/i, name: 'Agente de Indicadores', url: `${BASE_URL}/agentes/indicadores` },
    { pattern: /Agente de Processos/i, name: 'Agente de Processos', url: `${BASE_URL}/agentes/processos` },
    { pattern: /Agente de Pessoas/i, name: 'Agente de Pessoas', url: `${BASE_URL}/agentes/pessoas` },
    { pattern: /Agente de Riscos/i, name: 'Agente de Riscos', url: `${BASE_URL}/agentes/riscos` },
    { pattern: /Agente de Reuniões/i, name: 'Agente de Reuniões', url: `${BASE_URL}/agentes/reunioes` },
    { pattern: /módulo financeiro/i, name: 'Módulo Financeiro', url: `${BASE_URL}/modulos/financeiro` },
    { pattern: /Time Olívia/i, name: 'Time Olívia', url: `${BASE_URL}/agentes-de-ia` },
  ];
  return map
    .filter(m => m.pattern.test(text))
    .map(m => ({ '@type': 'Thing', name: m.name, url: m.url }));
}

export function buildAgentFaqSchema(seo: AgentSeo) {
  const mentions = detectFaqMentions(seo.faqs);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${BASE_URL}/agentes/${seo.slug}`,
    mainEntity: seo.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
    ...(mentions.length > 0 ? { mentions } : {}),
  };
}

/**
 * HowTo schema, boost pra AI Overviews do Google / Gemini.
 * Modelo: "Como implementar [agente] na sua empresa" em 4 passos.
 */
export function buildAgentHowToSchema(seo: AgentSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Como implementar o ${seo.name} na sua empresa`,
    description: `Passo a passo para adotar o ${seo.name} da Orbit em 30 a 60 dias.`,
    totalTime: 'P30D',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Diagnóstico inicial',
        text: 'A Olívia conduz um diagnóstico de 30 minutos do cenário atual da sua área, dados, processos e dores principais.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Configuração e integração',
        text: `Conexão com seus dados existentes e configuração do ${seo.name} integrado aos outros agentes do Time Olívia.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Operação assistida',
        text: 'Primeiras semanas com a Olívia executando ao lado do seu time, validando decisões e ajustando regras.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Operação 24/7',
        text: `Após 30 a 60 dias, o ${seo.name} opera continuamente, seu time foca em decisão, não em execução.`,
      },
    ],
  };
}

/**
 * Speakable schema, AIEO/voice search (Google Assistant, Alexa).
 * Marca os trechos mais "falaveis" pra mecanismos de voz lerem.
 */
export function buildAgentSpeakableSchema(seo: AgentSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    url: `${BASE_URL}/agentes/${seo.slug}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-zoom__title', '.hero-zoom__subtitle', '.section-header h2'],
    },
  };
}
