/** /agentes/problemas-operacionais, playbook §7.10 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Substitui ferramenta de qualidade tipo Qualyteam?', a: 'Para B2B brasileira focada em melhoria contínua, sim, com vantagem em integração com o resto da operação.' },
  { q: 'Suporta metodologia 5 Porquês?', a: 'Sim, com Ishikawa, Pareto e outras técnicas estruturadas.' },
  { q: 'A Olívia gera hipóteses?', a: 'Sim, baseado em dado do processo e histórico de problemas similares.' },
  { q: 'Conecta com não conformidade?', a: 'Sim, problemas viram NCs auditáveis quando relevante.' },
  { q: 'Tempo de resolução é monitorado?', a: 'Sim, com SLA por categoria e responsável.' },
  { q: 'Posso registrar problema de cliente externo?', a: 'Sim, origem classificável (interno, cliente, fornecedor, regulação).' },
  { q: 'Como mede recorrência?', a: 'O histórico permite análise de padrão por área, processo e fonte.' },
  { q: 'Tempo até processo estabelecido?', a: '30 a 45 dias com ritual periódico de análise.' },
];

export const agentSeo: AgentSeo = {
  slug: 'problemas-operacionais',
  name: 'Agente de Problemas Operacionais',
  title: 'Agente de Problemas: RCA e resolução operadas por IA | Orbit',
  description: 'Registra, analisa causa raiz e gerencia resolução de problemas operacionais, com hipóteses geradas pela Olívia e plano de ação rastreável.',
  ogTitle: 'Agente de Problemas | Orbit Gestão',
  ogDescription: 'Análise de causa raiz operada por IA com plano rastreável.',
  faqs,
};

const data: PageData = {
  currentSlug: 'problemas-operacionais',
  isModule: false,

  pill: 'Time Olívia · Problemas',
  h1Pre: 'Agente de Problemas Operacionais: RCA',
  h1Highlight: 'operada por IA',
  h1Post: '.',
  subtitle: 'Cada problema operacional registrado, classificado, analisado por hipóteses e <strong>resolvido com plano de ação rastreável</strong>. Reclamação vira melhoria contínua.',
  heroNote: '⏱️ Processo estabelecido em 30-45 dias · 5 Porquês + Ishikawa + Pareto',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'Hipóteses', label: 'geradas pela IA' },
    { strong: 'RCA', label: '5 Porquês + Ishikawa' },
    { strong: 'Plano', label: 'amarrado a indicador' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Problemas',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'do registro à resolução',
  funcsIntro: 'Cada capacidade nativa, conectada a Processos, Indicadores, Riscos e Reuniões.',
  funcs: [
    { icon: 'fa-triangle-exclamation', title: 'Repositório de problemas', desc: 'Catálogo central por área, processo e impacto.' },
    { icon: 'fa-tags', title: 'Categorização', desc: 'Por tipo, severidade, recorrência e área.' },
    { icon: 'fa-brain', title: 'Hipóteses de causa raiz', desc: 'A Olívia gera hipóteses ranqueadas para análise.' },
    { icon: 'fa-microscope', title: 'Análise estruturada', desc: '5 Porquês, Ishikawa e Pareto integrados na ferramenta.' },
    { icon: 'fa-list-check', title: 'Plano de ação', desc: 'Ação corretiva, responsável, prazo e indicador.' },
    { icon: 'fa-wave-square', title: 'Acompanhamento', desc: 'Status: registro, análise, ação e resolução.' },
    { icon: 'fa-file-lines', title: 'Relatório executivo', desc: 'Visão consolidada para liderança.' },
    { icon: 'fa-link', title: 'Vinculação a processos', desc: 'Problema amarrado ao processo onde se manifestou.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Problemas',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Problema isolado é reclamação. Conectado ao processo, indicador e risco vira melhoria contínua.',
    items: [
      { partner: 'Problemas + Processos', benefit: 'problema recorrente em processo dispara redesenho' },
      { partner: 'Problemas + Indicadores', benefit: 'KPI de problemas ativos e tempo de resolução' },
      { partner: 'Problemas + Riscos', benefit: 'problema recorrente vira risco mapeado' },
      { partner: 'Problemas + Reuniões', benefit: 'reunião de melhoria contínua puxa problemas pendentes' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Problemas separa',
  scenariosH2Post: 'sintoma de causa',
  scenariosIntro: 'Padrões comuns em operações que tratam sintoma e nunca chegam à causa.',
  scenarios: [
    { tag: 'Recorrência', title: 'Cliente reclama do mesmo problema várias vezes', body: 'O Agente identifica padrão recorrente e força análise estruturada de causa raiz.' },
    { tag: 'Diagnóstico', title: 'Empresa não consegue diferenciar sintoma de causa', body: 'A Olívia sugere hipóteses ranqueadas, o time valida com dado, não com achismo.' },
    { tag: 'Permanência', title: 'Decisões viram resolução superficial', body: 'O plano de ação amarrado a indicador garante que o problema não volte.' },
  ],

  testiH2: 'Quem opera melhoria contínua com a Orbit',
  testiIntro: 'Líderes de qualidade contando o que mudou na resolução.',
  testimonials: [
    { initials: 'CB', quote: '"As hipóteses ranqueadas pela Olívia me poupam horas. Eu valido, não preciso começar do zero a cada análise."', name: 'Cristina Bittencourt', role: 'Gerente de Qualidade · Bitten Indústria' },
    { initials: 'WO', quote: '"O problema do nosso processo de entrega só virou recorrente quando a gente começou a registrar. Antes era \'ah, vai e volta\'."', name: 'Wagner Otto', role: 'COO · Otto Logística' },
    { initials: 'FC', quote: '"O plano amarrado a indicador garante que a causa raiz foi atacada. Não tem mais \'achei que resolveu\'."', name: 'Fernanda Cruz', role: 'Diretora Operacional · Cruz Manufatura' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Problemas',
  faqIntro: 'As 8 perguntas que aparecem antes da implementação.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre processos e melhoria',
  relatedBlogSlugs: [
    'como-mapear-processos-empresa-bpmn',
    'plano-de-acao-executavel',
    'indicadores-nao-refletem-realidade',
    'software-bpms-como-escolher',
    'sistemas-nao-conversam-custo',
    'como-integrar-sistemas-empresa',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Seu primeiro RCA estruturado em',
  ctaH2Highlight: '7 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Problemas, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
