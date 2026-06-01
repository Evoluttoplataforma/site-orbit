/** /agentes/riscos, playbook §7.5 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Funciona pra LGPD?', a: 'Sim. Riscos de privacidade, plano de ação, evidências e trilha de auditoria.' },
  { q: 'Atende ISO 9001 e ISO 27001?', a: 'Sim. Estrutura compatível com os requisitos das normas.' },
  { q: 'Como a IA detecta risco emergente?', a: 'Cruza indicadores operacionais e identifica padrões anômalos antes do impacto.' },
  { q: 'Tem matriz de risco visual?', a: 'Sim. Probabilidade × impacto, configurável por categoria.' },
  { q: 'Posso aceitar risco com aprovação documentada?', a: 'Sim. Trilha auditável de aceitação consciente.' },
  { q: 'Riscos viram tarefas?', a: 'Sim. O plano de ação vira tarefas no painel de cada responsável.' },
  { q: 'Quem revisa o catálogo?', a: 'A liderança em ritual periódico, com proposta de ajuste pelo Agente.' },
  { q: 'Tempo até mapeamento inicial?', a: '30 a 45 dias com sessões estruturadas por área.' },
];

export const agentSeo: AgentSeo = {
  slug: 'riscos',
  name: 'Agente de Riscos',
  title: 'Agente de Riscos: identificação e mitigação operadas por IA | Orbit',
  description: 'Identificação, classificação, plano de ação e monitoramento de riscos. O Agente de Riscos opera governança operacional, financeira e regulatória coordenado pela Olívia.',
  ogTitle: 'Agente de Riscos | Orbit Gestão',
  ogDescription: 'Governança de risco operada por IA, com plano de ação rastreável.',
  faqs,
};

const data: PageData = {
  currentSlug: 'riscos',
  isModule: false,

  pill: 'Time Olívia · Riscos',
  h1Pre: 'Agente de Riscos: governança',
  h1Highlight: 'operada por IA',
  h1Post: '.',
  subtitle: 'Identifica, classifica, prioriza e monitora riscos operacionais, financeiros, regulatórios e estratégicos. <strong>Plano de ação, responsável nomeado e revisão periódica.</strong>',
  heroNote: '⏱️ Mapeamento inicial em 30-45 dias · LGPD + ISO',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'Matriz', label: 'probabilidade × impacto' },
    { strong: 'LGPD/ISO', label: 'trilha auditável' },
    { strong: 'Olívia', label: 'detecta risco emergente' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Riscos',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'continuamente',
  funcsIntro: 'Cada capacidade nativa do Agente, conectada aos processos, indicadores e à governança da empresa.',
  funcs: [
    { icon: 'fa-shield-halved', title: 'Repositório de riscos', desc: 'Catálogo central por categoria, área e impacto.' },
    { icon: 'fa-table-cells', title: 'Matriz de risco', desc: 'Probabilidade × impacto com priorização visual.' },
    { icon: 'fa-list-check', title: 'Plano de ação', desc: 'Ação mitigatória, responsável, prazo e indicador.' },
    { icon: 'fa-wave-square', title: 'Monitoramento contínuo', desc: 'Status do risco atualizado conforme a operação acontece.' },
    { icon: 'fa-file-lines', title: 'Relatórios de risco', desc: 'Visão executiva pronta pra board e compliance.' },
    { icon: 'fa-link', title: 'Vinculação a processos', desc: 'Risco amarrado ao processo onde se manifesta.' },
    { icon: 'fa-circle-check', title: 'Aprovações de risco', desc: 'Trilha auditável de quem aceitou cada risco e por quê.' },
    { icon: 'fa-brain', title: 'Detecção pela Olívia', desc: 'IA identifica padrões de risco emergente antes do impacto.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Riscos',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Risco isolado é teoria. Conectado aos processos, indicadores e estratégia, vira governança real.',
    items: [
      { partner: 'Riscos + Processos', benefit: 'riscos vinculados aos processos onde se manifestam' },
      { partner: 'Riscos + Indicadores', benefit: 'riscos críticos monitorados como KPIs vivos' },
      { partner: 'Riscos + Estratégico', benefit: 'riscos críticos viram pauta de comitê executivo' },
      { partner: 'Riscos + Documentos', benefit: 'evidências e relatórios anexados de forma auditável' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Riscos antecipa',
  scenariosH2Post: 'a crise',
  scenariosIntro: 'Padrões comuns em empresas que cresceram sem governança formal.',
  scenarios: [
    { tag: 'Maturidade', title: 'Empresa cresceu sem mapear riscos', body: 'O Agente conduz mapeamento inicial em 30 dias com sessão estruturada por área.' },
    { tag: 'Compliance', title: 'Compliance regulatório virou requisito', body: 'O Agente entrega trilha auditável para LGPD, ISO e normas setoriais.' },
    { tag: 'Board', title: 'Board exige relatório de risco trimestral', body: 'O Agente gera relatório executivo pronto, com matriz e plano de ação.' },
  ],

  testiH2: 'Quem opera governança com a Orbit',
  testiIntro: 'Compliance officers e diretores contando o que mudou na trilha de auditoria.',
  testimonials: [
    { initials: 'VR', quote: '"A auditoria LGPD do ano passado foi a primeira em que a gente não passou três semanas montando relatório. Tudo já estava na trilha do Agente."', name: 'Vanessa Ramos', role: 'DPO · Grupo Ramos' },
    { initials: 'AH', quote: '"O risco que mais me preocupava virou número monitorado, não medo no estômago. Decisões viraram dado."', name: 'Antônio Hering', role: 'CEO · Hering Têxtil' },
    { initials: 'DM', quote: '"O board pediu reporting trimestral. Hoje sai sozinho, eu valido, não monto."', name: 'Daniela Maia', role: 'Diretora de Risco · MaiaCorp' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Riscos',
  faqIntro: 'As 8 perguntas que aparecem antes do mapeamento.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre governança e processos',
  relatedBlogSlugs: [
    'como-mapear-processos-empresa-bpmn',
    'indicadores-nao-refletem-realidade',
    'plano-de-acao-executavel',
    'erp-vs-plataforma-all-in-one',
    'sistemas-nao-conversam-custo',
    'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Seu mapa de riscos vivo em',
  ctaH2Highlight: '45 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Riscos, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
