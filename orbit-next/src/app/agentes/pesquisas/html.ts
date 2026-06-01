/** /agentes/pesquisas, playbook §7.12 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Substitui SurveyMonkey ou Typeform?', a: 'Para B2B brasileira focada em pesquisa organizacional e de cliente integrada à gestão, sim.' },
  { q: 'Tem análise de texto aberto?', a: 'Sim, a Olívia categoriza e identifica padrão em respostas abertas.' },
  { q: 'Pesquisas anônimas funcionam?', a: 'Sim, com anonimização garantida e auditável.' },
  { q: 'Suporta NPS, eNPS e CSAT?', a: 'Sim, com templates prontos para cada metodologia.' },
  { q: 'Quantas pesquisas simultâneas?', a: 'Ilimitado.' },
  { q: 'Como envia?', a: 'E-mail, link público e mobile push.' },
  { q: 'Tem benchmark de mercado?', a: 'Sim, comparação com padrão da indústria quando disponível.' },
  { q: 'Tempo até primeira pesquisa em campo?', a: '7 a 14 dias.' },
];

export const agentSeo: AgentSeo = {
  slug: 'pesquisas',
  name: 'Agente de Pesquisas',
  title: 'Agente de Pesquisas: clima, satisfação e engajamento por IA | Orbit',
  description: 'Pesquisas de clima organizacional, satisfação e engajamento, com análise por IA e geração de plano de ação automático. Operado pela Olívia.',
  ogTitle: 'Agente de Pesquisas | Orbit Gestão',
  ogDescription: 'Clima, NPS e engajamento operados por IA com plano automático.',
  faqs,
};

const data: PageData = {
  currentSlug: 'pesquisas',
  isModule: false,

  pill: 'Time Olívia · Pesquisas',
  h1Pre: 'Agente de Pesquisas: clima, NPS e engajamento',
  h1Highlight: 'por IA',
  h1Post: '.',
  subtitle: 'Pesquisas de clima organizacional, satisfação interna, eNPS, NPS de cliente e engajamento, <strong>com análise por IA, identificação de padrão e plano de ação automático.</strong>',
  heroNote: '⏱️ Primeira pesquisa em campo em 7-14 dias',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'Análise', label: 'de texto aberto por IA' },
    { strong: 'eNPS · NPS', label: 'templates prontos' },
    { strong: 'Plano', label: 'gerado automaticamente' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Pesquisas',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'do envio à decisão',
  funcsIntro: 'Cada capacidade nativa, conectada a Pessoas, Oportunidades, Indicadores e Problemas.',
  funcs: [
    { icon: 'fa-clipboard-list', title: 'Criação de pesquisas', desc: 'Templates ou customizada, múltiplos formatos.' },
    { icon: 'fa-layer-group', title: 'Séries de pesquisa', desc: 'Cadência periódica configurável.' },
    { icon: 'fa-paper-plane', title: 'Distribuição automática', desc: 'Envio por e-mail, link e mobile.' },
    { icon: 'fa-bell', title: 'Lembretes inteligentes', desc: 'Re-engajamento de respondentes pendentes.' },
    { icon: 'fa-brain', title: 'Análise por IA', desc: 'A Olívia interpreta resposta aberta e categoriza padrão.' },
    { icon: 'fa-chart-bar', title: 'Visão consolidada', desc: 'Dashboards com filtragem por área, cargo e tempo.' },
    { icon: 'fa-list-check', title: 'Geração de plano', desc: 'Insights viram plano de ação atribuído a responsável.' },
    { icon: 'fa-clock-rotate-left', title: 'Histórico comparativo', desc: 'Evolução de clima e engajamento ao longo do tempo.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Pesquisas',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Pesquisa isolada é número solto. Conectada vira ação atribuída.',
    items: [
      { partner: 'Pesquisas + Pessoas', benefit: 'eNPS conecta a turnover e engajamento do time' },
      { partner: 'Pesquisas + Oportunidades', benefit: 'feedback de cliente vira oportunidade priorizada' },
      { partner: 'Pesquisas + Indicadores', benefit: 'eNPS e NPS são KPIs vivos no dashboard executivo' },
      { partner: 'Pesquisas + Problemas', benefit: 'padrão recorrente em pesquisa vira problema mapeado' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Pesquisas transforma',
  scenariosH2Post: 'feedback em ação',
  scenariosIntro: 'Padrões comuns em empresas que perguntam e não respondem.',
  scenarios: [
    { tag: 'Clima', title: 'Clima organizacional caindo sem causa clara', body: 'O Agente cruza pesquisa de clima com indicadores comportamentais e identifica padrão.' },
    { tag: 'NPS', title: 'NPS de cliente é número solto sem ação', body: 'A análise automática categoriza feedback e gera plano de ação por categoria.' },
    { tag: 'Voz do time', title: 'CEO quer ouvir o time sem viés de hierarquia', body: 'Pesquisa anônima estruturada com análise de IA, sem manipulação.' },
  ],

  testiH2: 'Quem opera pesquisas com a Orbit',
  testiIntro: 'Líderes de RH e CX contando o que mudou na escuta.',
  testimonials: [
    { initials: 'GE', quote: '"O texto aberto da pesquisa de clima virava montanha de planilha. Hoje a IA categoriza e me devolve as 5 dores que aparecem."', name: 'Gabriela Estrela', role: 'CHRO · Estrela Tech' },
    { initials: 'VR', quote: '"NPS deixou de ser número. Cada cluster vira plano de ação atribuído, e o cliente sente."', name: 'Vinicius Ramos', role: 'Head de CX · Ramos Group' },
    { initials: 'AB', quote: '"Pesquisa anônima estruturada deu voz ao time sem politicagem. Decisões mudaram de fonte."', name: 'Ana Brito', role: 'CEO · Brito Indústria' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Pesquisas',
  faqIntro: 'As 8 perguntas que aparecem antes do primeiro envio.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre Pessoas e clima',
  relatedBlogSlugs: [
    'como-reter-talentos-empresa',
    'software-rh-como-escolher',
    'vendas-marketing-operacoes-conflito',
    'plataformas-comunicacao-corporativa',
    'plano-de-acao-executavel',
    'indicadores-nao-refletem-realidade',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Sua primeira pesquisa em campo em',
  ctaH2Highlight: '14 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Pesquisas, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
