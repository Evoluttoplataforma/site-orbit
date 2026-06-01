/** /agentes/pessoas, playbook §7.3 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Substitui Convenia ou Gupy?', a: 'Para B2B de médio porte focada em RH estratégico (não só folha), sim, com vantagem em integração.' },
  { q: 'Como detecta risco de saída?', a: 'Combina indicadores comportamentais com padrão histórico de desligamentos.' },
  { q: 'Funciona pra empresa multi-unidade?', a: 'Sim, com regras de visibilidade e governança por unidade.' },
  { q: 'Tem app pra colaborador?', a: 'Sim, PDI, organograma e departamentos com experiência mobile-first.' },
  { q: 'Integra com folha de pagamento?', a: 'Sim, via API e conectores prontos.' },
  { q: 'Quem cria o PDI?', a: 'Líder e colaborador cocriam. O Agente sugere conteúdo baseado em perfil e aspiração.' },
  { q: 'Como mede o engajamento?', a: 'Combina dados do Agente de Reuniões, Pesquisas e atividade nas plataformas.' },
  { q: 'Tempo até redução de turnover?', a: '6 a 12 meses com PDI vivo e ritual de 1:1 instituído.' },
];

export const agentSeo: AgentSeo = {
  slug: 'pessoas',
  name: 'Agente de Pessoas',
  title: 'Agente de Pessoas: RH, PDI e organograma operados por IA | Orbit',
  description: 'Colaboradores, cargos, organograma, PDI e departamentos. O Agente de Pessoas opera a gestão de RH estratégico junto com seu time, coordenado pela Olívia.',
  ogTitle: 'Agente de Pessoas | Orbit Gestão',
  ogDescription: 'RH estratégico, PDI e organograma operados por IA, coordenado pela Olívia.',
  faqs,
};

const data: PageData = {
  currentSlug: 'pessoas',
  isModule: false,

  pill: 'Time Olívia · Pessoas',
  h1Pre: 'Agente de Pessoas: RH e desenvolvimento',
  h1Highlight: 'operados por IA',
  h1Post: '.',
  subtitle: 'Colaboradores, cargos, organograma, departamentos, PDI do gestor e do colaborador. O Agente de Pessoas opera o RH estratégico, enquanto sua equipe foca em <strong>cultura, liderança e conversas difíceis.</strong>',
  heroNote: '⏱️ PDI vivo · Multi-unidade · App mobile-first',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'PDI', label: 'vivo no fluxo' },
    { strong: 'Organograma', label: 'multi-unidade' },
    { strong: 'eNPS + 1:1', label: 'engajamento real' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Pessoas',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'no ciclo do colaborador',
  funcsIntro: 'Cada capacidade nativa, conectada ao Treinamento, ao Estratégico e ao módulo de R&S.',
  funcs: [
    { icon: 'fa-users', title: 'Colaboradores', desc: 'Cadastro completo, ciclo de vida e histórico unificado.' },
    { icon: 'fa-sitemap', title: 'Cargos e organograma', desc: 'Estrutura organizacional viva, com responsabilidades.' },
    { icon: 'fa-bullseye', title: 'PDI · visão do gestor', desc: 'Plano de desenvolvimento por colaborador com metas e revisão.' },
    { icon: 'fa-book', title: 'PDI · visão do colaborador', desc: 'Cada pessoa acessa seu plano, atualiza progresso, registra aprendizado.' },
    { icon: 'fa-building', title: 'Departamentos', desc: 'Estrutura por área, com líder, integrantes e KPIs.' },
    { icon: 'fa-location-dot', title: 'Localidades', desc: 'Multi-unidade, multi-país, com regras locais.' },
    { icon: 'fa-brain', title: 'Generate PDI Recommendation', desc: 'Olívia sugere PDI baseado em perfil, performance e aspiração.' },
    { icon: 'fa-star', title: 'Avaliação de competências', desc: 'Skills, gaps, planejamento de evolução individual.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Pessoas',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'RH estratégico só vira execução quando conversa com Treinamento, Estratégia e Reuniões.',
    items: [
      { partner: 'Pessoas + Estratégico', benefit: 'competências por objetivo estratégico mapeadas em PDIs' },
      { partner: 'Pessoas + Treinamento', benefit: 'PDIs alimentam trilhas de aprendizado individualizadas' },
      { partner: 'Pessoas + Processos', benefit: 'responsabilidade em processo vinculada a colaborador específico' },
      { partner: 'Pessoas + Reuniões', benefit: 'ações de 1:1 viram tarefas no PDI do colaborador' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Pessoas devolve',
  scenariosH2Post: 'estratégia ao RH',
  scenariosIntro: 'Padrões que se repetem, endereçados sem inflar o time de RH.',
  scenarios: [
    { tag: 'Retenção', title: 'Empresa perdendo talento sem entender por quê', body: 'O Agente cruza sinais (engajamento, feedback, atividade) e identifica risco de saída antes dele virar pedido de demissão.' },
    { tag: 'PDI vivo', title: 'PDI virou ritual anual de RH', body: 'O Agente conduz cadência periódica viva, sugere ações e mede execução por colaborador.' },
    { tag: 'Multi-unidade', title: 'Empresa multi-unidade sem visão consolidada de RH', body: 'Dashboard único: turnover, eNPS, headcount por unidade, tudo no mesmo lugar.' },
  ],

  testiH2: 'Quem opera RH com a Orbit',
  testiIntro: 'Diretores de Pessoas contando o que mudou no ciclo do colaborador.',
  testimonials: [
    { initials: 'CP', quote: '"O PDI deixou de ser planilha anual. Hoje cada líder revisa o plano da sua gente num ritual mensal, com a Olívia preparando a pauta."', name: 'Clarissa Pellegrini', role: 'CHRO · Pellegrini Group' },
    { initials: 'NM', quote: '"O sinal de risco de saída chegou três semanas antes do meu melhor engenheiro pensar em pedir demissão. Conversa salvou."', name: 'Nilson Maranhão', role: 'VP de Pessoas · TechBrasil' },
    { initials: 'SF', quote: '"Multi-unidade era um caos no Excel. Dashboard único com turnover por filial mudou minha pauta de board."', name: 'Sandra Fontes', role: 'Diretora de RH · RedeFontes' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Pessoas',
  faqIntro: 'As 8 perguntas que aparecem antes da decisão.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre Pessoas e desenvolvimento',
  relatedBlogSlugs: [
    'como-reter-talentos-empresa',
    'software-rh-como-escolher',
    'treinamento-corporativo-nao-funciona',
    'plataforma-treinamento-corporativo',
    'plano-de-acao-executavel',
    'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Sua gestão de Pessoas viva em',
  ctaH2Highlight: '90 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Pessoas, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
