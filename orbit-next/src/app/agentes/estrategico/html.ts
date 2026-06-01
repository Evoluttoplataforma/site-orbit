/**
 * /agentes/estrategico, copy do playbook §7.1
 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'O Agente Estratégico substitui consultor de estratégia?', a: 'Não. Consultor traz visão externa pontual. O Agente opera execução contínua. São complementares.' },
  { q: 'Como o Agente conecta estratégia com operação?', a: 'Cada objetivo do plano vira meta de indicador, que puxa dado da operação real. Conexão automática.' },
  { q: 'Que metodologia o Agente usa?', a: 'A Orbit aplica a metodologia consolidada do Grupo GSN, refinada em 30 anos e mais de 8.000 empresas.' },
  { q: 'Quem revisa o plano?', a: 'A liderança revisa em ritual periódico. O Agente prepara: status, desvios e sugestões.' },
  { q: 'Posso usar OKR no Agente Estratégico?', a: 'Sim, OKR, BSC ou framework próprio. O Agente é agnóstico de metodologia.' },
  { q: 'Como funciona a SWOT na Orbit?', a: 'Quadrantes editáveis colaborativamente, com recomendações estratégicas geradas pela IA.' },
  { q: 'O Agente identifica oportunidades sozinho?', a: 'Sim, em conjunto com o Agente de Oportunidades. Cruza indicadores e contexto.' },
  { q: 'Em quanto tempo vejo resultado?', a: 'Plano executável em 30 dias. Cadência sustentável em 60 dias. Impacto em indicadores em 90 dias.' },
];

export const agentSeo: AgentSeo = {
  slug: 'estrategico',
  name: 'Agente Estratégico',
  title: 'Agente Estratégico: planejamento e execução operados por IA | Orbit',
  description: 'Plano estratégico, missão/visão/valores, SWOT e objetivos, o Agente Estratégico transforma plano de gaveta em execução semanal monitorada pela Olívia.',
  ogTitle: 'Agente Estratégico | Orbit Gestão',
  ogDescription: 'Planejamento e execução estratégica operados por IA, coordenado pela Olívia.',
  faqs,
};

const data: PageData = {
  currentSlug: 'estrategico',
  isModule: false,

  pill: 'Time Olívia · Estratégia',
  h1Pre: 'Agente Estratégico: planejamento e execução estratégica',
  h1Highlight: 'operados por IA',
  h1Post: '.',
  subtitle: 'Tire o planejamento do PDF. O Agente Estratégico opera o ciclo completo, missão, visão, valores, SWOT, objetivos, plano de ação e revisão, <strong>coordenado pela Olívia, junto com a sua liderança.</strong>',
  heroNote: '⏱️ Plano executável em 30 dias · Impacto em indicadores em 90 dias',
  heroCtaPrimary: 'QUERO CONHECER O ESTRATÉGICO',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'SWOT', label: 'colaborativa com IA' },
    { strong: 'Diagnóstico', label: 'inicial em 30 min' },
    { strong: '30 anos', label: 'metodologia GSN' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente Estratégico',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'continuamente',
  funcsIntro: 'Cada capacidade abaixo é nativa do Agente, coordenada pela Olívia, conectada aos outros agentes do time.',
  funcs: [
    { icon: 'fa-compass', title: 'Missão, Visão e Valores', desc: 'Documenta e mantém vivo o norte estratégico, citado nas decisões diárias.' },
    { icon: 'fa-table-cells-large', title: 'Análise SWOT', desc: 'Estrutura forças, fraquezas, oportunidades e ameaças com base em dado real da operação.' },
    { icon: 'fa-bullseye', title: 'Objetivos Estratégicos', desc: 'Desdobra prioridades em metas trimestrais com responsável e indicador.' },
    { icon: 'fa-list-check', title: 'Plano de Ação', desc: 'Cada objetivo vira plano com prazo, dono e prioridade, auditável.' },
    { icon: 'fa-scroll', title: 'Política & Escopo', desc: 'Documenta governança estratégica e escopo decisório.' },
    { icon: 'fa-arrows-rotate', title: 'Revisão estratégica', desc: 'Cadência periódica de revisão com sugestões automáticas de ajuste.' },
    { icon: 'fa-brain', title: 'Recomendações da IA', desc: 'A Olívia sugere ajustes estratégicos baseados em desempenho e contexto.' },
    { icon: 'fa-table-columns', title: 'Dashboard estratégico', desc: 'Visão consolidada pronta pra reunião de board e comitê.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente Estratégico',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Estratégia só funciona conectada à operação. O Agente Estratégico conversa nativamente com os outros agentes do time.',
    items: [
      { partner: 'Estratégico + Indicadores', benefit: 'cada objetivo do plano vira KPI monitorado em tempo real' },
      { partner: 'Estratégico + Oportunidades', benefit: 'oportunidades estratégicas identificadas viram input do próximo ciclo' },
      { partner: 'Estratégico + Pessoas', benefit: 'competências necessárias por objetivo mapeadas em PDIs do time' },
      { partner: 'Estratégico + Reuniões', benefit: 'comitê executivo registra decisões diretamente conectadas ao plano' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Estratégico destrava',
  scenariosH2Post: 'a empresa',
  scenariosIntro: 'Padrões que se repetem, endereçados com cadência semanal de execução.',
  scenarios: [
    { tag: 'Crescimento', title: 'Empresa em crescimento sem estratégia clara', body: 'O Agente conduz construção do plano em 30 dias e estabelece ritmo de execução semanal.' },
    { tag: 'Ressuscitar', title: 'Plano maduro que não sai do papel', body: 'O Agente reativa cadência de revisão, conecta indicadores e responsabiliza donos.' },
    { tag: 'Captação', title: 'Empresa preparando captação ou venda', body: 'O Agente prepara narrativa estratégica com indicadores que investidores e compradores procuram.' },
  ],

  testiH2: 'Quem opera estratégia com a Orbit',
  testiIntro: 'CEOs e diretores contando o que mudou na disciplina semanal.',
  testimonials: [
    { initials: 'GS', quote: '"Antes o plano vivia num PDF. Hoje ele vive na operação. Toda decisão de semana é discutida contra os objetivos do trimestre."', name: 'Gabriel Santos', role: 'CEO · Indústria Aliança' },
    { initials: 'MV', quote: '"A SWOT colaborativa com IA me deu uma visão honesta que eu não tinha. Os pontos cegos viraram pauta de board."', name: 'Mariana Vieira', role: 'Diretora de Estratégia · Veris' },
    { initials: 'CC', quote: '"Cadência semanal de execução estratégica era impossível antes. Hoje a Olívia prepara o material e a reunião vira decisão, não relatório."', name: 'Carlos Câmara', role: 'CEO · GrupoCC' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente Estratégico',
  faqIntro: 'As 8 perguntas que aparecem antes da decisão.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre planejamento e execução estratégica',
  relatedBlogSlugs: [
    'tirar-planejamento-estrategico-do-papel',
    'plano-de-acao-executavel',
    'indicadores-nao-refletem-realidade',
    'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas',
    'como-integrar-sistemas-empresa',
    'erp-vs-plataforma-all-in-one',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Seu plano estratégico vivo em',
  ctaH2Highlight: '30 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente Estratégico, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
