/** /agentes/oportunidades, playbook §7.7 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Como a Olívia descobre oportunidades sozinha?', a: 'Cruza dados de mercado, performance, feedback e padrões emergentes da operação.' },
  { q: 'Posso categorizar oportunidades?', a: 'Sim, por área, projeto, segmento, impacto e esforço.' },
  { q: 'Quem decide priorização?', a: 'A liderança decide, com base em matriz e dados gerados pelo Agente.' },
  { q: 'Conecta com plano de ação?', a: 'Sim, oportunidade aprovada vira ação no plano estratégico.' },
  { q: 'Posso ter banco de oportunidades futuras?', a: 'Sim, repositório de oportunidades não priorizadas no momento.' },
  { q: 'Integra com CRM?', a: 'Sim. Oportunidades comerciais sincronizam com o pipeline do Agente Comercial.' },
  { q: 'Como evita pulverizar foco?', a: 'A priorização força escolha consciente entre o que entra no plano e o que fica em backlog.' },
  { q: 'Tempo até processo estabelecido?', a: '30 a 45 dias com cadência periódica de revisão.' },
];

export const agentSeo: AgentSeo = {
  slug: 'oportunidades',
  name: 'Agente de Oportunidades',
  title: 'Agente de Oportunidades: identificação e priorização por IA | Orbit',
  description: 'Identifica, classifica e gerencia oportunidades estratégicas, vindas do mercado, do seu time ou descobertas pela IA. Conectado ao plano estratégico.',
  ogTitle: 'Agente de Oportunidades | Orbit Gestão',
  ogDescription: 'Descoberta e priorização de oportunidades operadas por IA.',
  faqs,
};

const data: PageData = {
  currentSlug: 'oportunidades',
  isModule: false,

  pill: 'Time Olívia · Oportunidades',
  h1Pre: 'Agente de Oportunidades:',
  h1Highlight: 'descoberta e priorização',
  h1Post: ' por IA.',
  subtitle: 'Ideias e oportunidades aparecem em todo lugar, mercado, clientes, time, dados. O Agente captura, classifica, prioriza e conecta ao plano estratégico, <strong>sem deixar nada cair no esquecimento.</strong>',
  heroNote: '⏱️ Processo estabelecido em 30-45 dias',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'Captura', label: 'central única' },
    { strong: 'Análise', label: 'viabilidade por IA' },
    { strong: 'Conexão', label: 'estratégica' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Oportunidades',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'da ideia à execução',
  funcsIntro: 'Cada capacidade nativa, conectada ao estratégico, indicadores e comercial.',
  funcs: [
    { icon: 'fa-lightbulb', title: 'Captura central', desc: 'Qualquer pessoa do time registra oportunidade detectada.' },
    { icon: 'fa-tags', title: 'Classificação automática', desc: 'Por área, impacto, esforço e prioridade.' },
    { icon: 'fa-scale-balanced', title: 'Análise de viabilidade', desc: 'Custo, benefício e risco estimados pela IA.' },
    { icon: 'fa-flag', title: 'Priorização', desc: 'Matriz de impacto × esforço com priorização visual.' },
    { icon: 'fa-link', title: 'Conexão estratégica', desc: 'Vincula a objetivo do plano e ao centro de custo.' },
    { icon: 'fa-flask', title: 'Plano de validação', desc: 'Protótipo, MVP ou experimento, registrável e auditável.' },
    { icon: 'fa-arrow-trend-up', title: 'Acompanhamento', desc: 'Status do ciclo: descoberta, análise, decisão, execução.' },
    { icon: 'fa-brain', title: 'Insights da Olívia', desc: 'Sugestões de oportunidade baseadas em dado da operação.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Oportunidades',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Oportunidade isolada vira ideia esquecida. Conectada vira execução priorizada.',
    items: [
      { partner: 'Oportunidades + Estratégico', benefit: 'oportunidades aprovadas viram objetivos do próximo ciclo' },
      { partner: 'Oportunidades + Indicadores', benefit: 'KPIs definem se a oportunidade vale ser priorizada' },
      { partner: 'Oportunidades + Comercial', benefit: 'upsell/cross-sell vindos do CRM entram no pipeline' },
      { partner: 'Oportunidades + Pesquisas', benefit: 'feedback de cliente e clima vira oportunidade priorizada' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Oportunidades evita',
  scenariosH2Post: 'oportunidade perdida',
  scenariosIntro: 'Padrões comuns em empresas onde "boa ideia" não vira execução.',
  scenarios: [
    { tag: 'Captura', title: 'Oportunidades que aparecem se perdem em reuniões', body: 'O Agente centraliza captura em um único repositório com priorização visual.' },
    { tag: 'Discernimento', title: 'Empresa não sabe diferenciar oportunidade boa de ruim', body: 'Análise de viabilidade automática prioriza pelo dado, não pelo achismo.' },
    { tag: 'Escuta', title: 'CEO quer ouvir o time sem perder ideia', body: 'Qualquer colaborador captura, o sistema valida e organiza no ciclo da decisão.' },
  ],

  testiH2: 'Quem opera priorização com a Orbit',
  testiIntro: 'CEOs e CPOs contando o que mudou no funil de ideias.',
  testimonials: [
    { initials: 'BC', quote: '"Ideias paravam num post-it na sala. Hoje cada uma vira card priorizado. E a Olívia me diz qual vale a aposta."', name: 'Bruna Caldas', role: 'CPO · Caldas Tech' },
    { initials: 'JR', quote: '"A análise de viabilidade da IA cortou um projeto que ia consumir o trimestre, e me alertou pra um que eu não tinha visto."', name: 'Jorge Rocha', role: 'CEO · Rocha Industrial' },
    { initials: 'GA', quote: '"Meu time agora participa do plano sem desorganizar prioridade. Captura é fácil, priorização é honesta."', name: 'Gisele Andrade', role: 'COO · Andrade Soluções' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Oportunidades',
  faqIntro: 'As 8 perguntas que aparecem antes da implementação.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre estratégia e execução',
  relatedBlogSlugs: [
    'tirar-planejamento-estrategico-do-papel',
    'plano-de-acao-executavel',
    'indicadores-nao-refletem-realidade',
    'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas',
    'imersao-mentoria-consultoria-resultado',
    'erp-vs-plataforma-all-in-one',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Sua próxima oportunidade não pode',
  ctaH2Highlight: 'morrer no post-it',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Oportunidades, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
