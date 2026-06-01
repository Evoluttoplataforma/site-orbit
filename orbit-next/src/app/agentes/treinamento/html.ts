/** /agentes/treinamento, playbook §7.6 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Substitui LMS dedicado tipo Moodle ou TalentLMS?', a: 'Para B2B brasileira focada em aprendizagem aplicada, sim. Para volume massivo de cursos, complementa.' },
  { q: 'Tem certificação reconhecida?', a: 'Sim, certificados auditáveis, downloadáveis, com QR de verificação.' },
  { q: 'Suporta microlearning?', a: 'Sim, com pílulas de 5 a 15 minutos contextuais.' },
  { q: 'Funciona mobile?', a: 'Sim, mobile-first.' },
  { q: 'Como mede aplicação real?', a: 'Liga aprendizado a comportamento no processo/projeto, não só conclusão de curso.' },
  { q: 'Pode importar conteúdo SCORM?', a: 'Sim, conectores pra padrões SCORM e xAPI.' },
  { q: 'Permite trilha customizada?', a: 'Sim, por cargo, área, PDI ou projeto.' },
  { q: 'Tempo até primeira trilha publicada?', a: '7 a 14 dias por trilha estruturada.' },
];

export const agentSeo: AgentSeo = {
  slug: 'treinamento',
  name: 'Agente de Treinamento',
  title: 'Agente de Treinamento: LMS e aprendizagem aplicada operados por IA | Orbit',
  description: 'Trilhas formais, microlearning, certificações, acompanhamento de aprendizagem aplicada. O Agente de Treinamento conecta capacitação à operação real.',
  ogTitle: 'Agente de Treinamento | Orbit Gestão',
  ogDescription: 'Capacitação aplicada operada por IA, conectada à operação.',
  faqs,
};

const data: PageData = {
  currentSlug: 'treinamento',
  isModule: false,

  pill: 'Time Olívia · Treinamento',
  h1Pre: 'Agente de Treinamento: capacitação',
  h1Highlight: 'aplicada por IA',
  h1Post: '.',
  subtitle: 'Trilhas formais, microlearning, certificações e gestão de aprendizagem aplicada. <strong>O conhecimento vira mudança comportamental, não certificado guardado na gaveta.</strong>',
  heroNote: '⏱️ Primeira trilha no ar em 7-14 dias · SCORM + xAPI',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'Trilhas', label: 'aplicadas ao processo' },
    { strong: 'Microlearning', label: '5-15min contextual' },
    { strong: 'Mobile', label: 'aprendizado em campo' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Treinamento',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'do conteúdo à aplicação',
  funcsIntro: 'Cada capacidade nativa, conectada a Pessoas, Processos e Indicadores.',
  funcs: [
    { icon: 'fa-graduation-cap', title: 'Trilhas formais', desc: 'Cursos estruturados com módulos, avaliações e certificação.' },
    { icon: 'fa-bolt', title: 'Microlearning', desc: 'Conteúdo curto, contextual e just-in-time.' },
    { icon: 'fa-award', title: 'Certificações', desc: 'Registro auditável de qualificações com verificação por QR.' },
    { icon: 'fa-user-plus', title: 'Matrículas em massa', desc: 'Atribuição automática por cargo, área ou PDI.' },
    { icon: 'fa-arrow-trend-up', title: 'Progresso individual', desc: 'Acompanhamento por colaborador em tempo real.' },
    { icon: 'fa-clipboard-check', title: 'Avaliações', desc: 'Quiz, prova, recuperação e certificação condicionada.' },
    { icon: 'fa-play', title: 'Mídia mista', desc: 'Vídeo, texto, áudio e screencast, múltiplos formatos.' },
    { icon: 'fa-screwdriver-wrench', title: 'Aplicação prática', desc: 'Conecta o que foi aprendido ao projeto ou processo real.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Treinamento',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Aprendizado isolado é curso. Conectado ao PDI, processo e KPI, vira mudança real.',
    items: [
      { partner: 'Treinamento + Pessoas', benefit: 'PDI alimenta trilha de aprendizado personalizada' },
      { partner: 'Treinamento + Indicadores', benefit: 'KPI de progresso de capacitação no dashboard executivo' },
      { partner: 'Treinamento + Processos', benefit: 'POP da empresa vira material de treinamento automático' },
      { partner: 'Treinamento + R&S', benefit: 'onboarding com trilha customizada pra cada novo colaborador' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Treinamento converte',
  scenariosH2Post: 'curso em ação',
  scenariosIntro: 'Padrões que se repetem em empresas que treinam e não veem mudança.',
  scenarios: [
    { tag: 'Aplicação', title: 'Treinamento isolado virou evento sem aplicação', body: 'O Agente conecta cada treinamento a projeto ou processo onde será aplicado, e mede a mudança.' },
    { tag: 'Escala', title: 'Empresa quer escalar conhecimento de especialistas', body: 'O Agente captura conhecimento tácito em trilhas reproduzíveis.' },
    { tag: 'Onboarding', title: 'Onboarding demora 90+ dias', body: 'O Agente acelera adoção em 30-45 dias com microlearning aplicado.' },
  ],

  testiH2: 'Quem opera capacitação com a Orbit',
  testiIntro: 'Líderes de L&D contando o que mudou no engajamento.',
  testimonials: [
    { initials: 'LP', quote: '"Antes era curso, depois ninguém aplicava. Hoje a Olívia liga o aprendizado ao processo real, e eu vejo a mudança no dashboard."', name: 'Luana Prado', role: 'Head de L&D · Prado Educação' },
    { initials: 'RC', quote: '"Onboarding caiu de 90 pra 35 dias. Microlearning + processo no mesmo lugar acelera demais."', name: 'Rodrigo Carvalho', role: 'Gerente de RH · Indaial' },
    { initials: 'MN', quote: '"O conhecimento da Maria virou trilha. Quando ela sair, a operação continua."', name: 'Marcio Nogueira', role: 'COO · Nogueira & Cia' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Treinamento',
  faqIntro: 'As 8 perguntas que aparecem antes da primeira trilha.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre Treinamento e Pessoas',
  relatedBlogSlugs: [
    'treinamento-corporativo-nao-funciona',
    'plataforma-treinamento-corporativo',
    'como-reter-talentos-empresa',
    'software-rh-como-escolher',
    'plano-de-acao-executavel',
    'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Sua primeira trilha aplicada em',
  ctaH2Highlight: '14 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Treinamento, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
