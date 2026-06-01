/** /agentes/processos, playbook §7.2 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Preciso saber BPMN pra usar?', a: 'Não. O Agente gera o diagrama por entrevista conversacional. Você revisa e ajusta.' },
  { q: 'Substitui Bizagi ou Camunda?', a: 'Para B2B brasileira de médio porte, sim. Para processos super-complexos de empresa grande, complementa.' },
  { q: 'Como aderência aos processos sobe?', a: 'Processo executado dentro do sistema (não PDF). Time vê o próximo passo enquanto trabalha.' },
  { q: 'Posso versionar processos?', a: 'Sim. Cada versão é histórico auditável, com data de revisão e responsável.' },
  { q: 'Identifica gargalo automaticamente?', a: 'Sim. Cruza dados de execução e identifica etapas com tempo médio ou taxa de erro alta.' },
  { q: 'Funciona pra processo industrial?', a: 'Bom pra processo administrativo, comercial, financeiro, RH. Industrial pesado complementa com MES.' },
  { q: 'Cria checklist automaticamente?', a: 'Sim. AI Generate Checklist transforma instrução em checklist executável.' },
  { q: 'Tempo até primeiro processo no ar?', a: '7 a 14 dias por processo crítico.' },
];

export const agentSeo: AgentSeo = {
  slug: 'processos',
  name: 'Agente de Processos',
  title: 'Agente de Processos: BPMN e instruções de trabalho operados por IA | Orbit',
  description: 'Mapeamento BPMN, execução, instruções de trabalho e ciclo de vida da informação. O Agente de Processos transforma processo manual em workflow inteligente.',
  ogTitle: 'Agente de Processos | Orbit Gestão',
  ogDescription: 'BPMN, POPs e execução operados por IA, coordenado pela Olívia.',
  faqs,
};

const data: PageData = {
  currentSlug: 'processos',
  isModule: false,

  pill: 'Time Olívia · Processos',
  h1Pre: 'Agente de Processos: BPMN e execução',
  h1Highlight: 'operados por IA',
  h1Post: '.',
  subtitle: 'Mapeie processos em BPMN, gere instruções de trabalho, distribua tarefas e monitore execução em tempo real, tudo coordenado pelo Agente de Processos <strong>junto com a Olívia.</strong>',
  heroNote: '⏱️ 7-14 dias por processo crítico no ar',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'BPMN 2.0', label: 'editor visual com IA' },
    { strong: 'POPs vivos', label: 'dentro do workflow' },
    { strong: 'SLA + Erro', label: 'monitorados por etapa' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Processos',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'da entrevista à execução',
  funcsIntro: 'Cada capacidade nativa do Agente, conectada à Olívia, aos indicadores e aos outros agentes do time.',
  funcs: [
    { icon: 'fa-diagram-project', title: 'Mapeamento BPMN', desc: 'Editor visual BPMN 2.0 com geração assistida por IA.' },
    { icon: 'fa-book-open', title: 'Instruções de trabalho', desc: 'POPs versionados, vinculados ao processo correspondente.' },
    { icon: 'fa-recycle', title: 'Ciclo de vida da informação', desc: 'Política de criação, revisão, arquivamento e descarte.' },
    { icon: 'fa-circle-play', title: 'Execução de processos', desc: 'Cada processo roda como workflow com responsável e prazo.' },
    { icon: 'fa-brain', title: 'AI Generate Processes', desc: 'Olívia entrevista o time e gera mapeamento BPMN inicial.' },
    { icon: 'fa-bolt', title: 'AI Generate BPMN', desc: 'Atualização e refinamento de diagrama automaticamente.' },
    { icon: 'fa-square-check', title: 'Tarefas conectadas', desc: 'Tarefas geradas a partir dos processos com SLA.' },
    { icon: 'fa-clock-rotate-left', title: 'Histórico e versionamento', desc: 'Cada versão do processo é auditável.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Processos',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Processo só importa quando vira execução. O Agente de Processos amarra cada processo ao resto da operação.',
    items: [
      { partner: 'Processos + Comercial', benefit: 'fechamento de venda dispara processo de onboarding' },
      { partner: 'Processos + Documentos', benefit: 'POPs vinculados aos processos correspondentes' },
      { partner: 'Processos + Indicadores', benefit: 'cada processo gera KPI de SLA, taxa de erro, tempo de execução' },
      { partner: 'Processos + Problemas', benefit: 'exceções viram problemas analisados pela RCA' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Agente padroniza',
  scenariosH2Post: 'sem virar burocracia',
  scenariosIntro: 'Padrões comuns em empresas que cresceram rápido, endereçados em semanas.',
  scenarios: [
    { tag: 'Padronização', title: 'Empresa cresceu rápido sem processo padronizado', body: 'O Agente entrevista o time, gera BPMN inicial e ancora execução em sistema em 30 dias.' },
    { tag: 'Adesão', title: 'Processo existe em PDF mas ninguém segue', body: 'O Agente leva o POP pra dentro do workflow operacional, o time vê o próximo passo enquanto executa.' },
    { tag: 'Gargalo', title: 'Gargalo recorrente em processo específico', body: 'O Agente identifica a etapa que mais atrasa e propõe automação ou redesenho.' },
  ],

  testiH2: 'Quem opera processos com a Orbit',
  testiIntro: 'Líderes de operações contando o que mudou na disciplina diária.',
  testimonials: [
    { initials: 'RV', quote: '"Mapear nossos 14 processos críticos levou 3 semanas. Em PDF teria levado 6 meses, e ainda assim ninguém leria."', name: 'Renato Vilela', role: 'COO · Indústria do Sul' },
    { initials: 'PC', quote: '"O POP dentro do workflow acabou com a história de \'eu não sabia que era assim\'. O passo a passo aparece pra quem executa."', name: 'Patrícia Coelho', role: 'Diretora de Qualidade · Vetorlog' },
    { initials: 'HD', quote: '"O Agente identificou um gargalo de aprovação que tinha 8 dias de média. A gente nem sabia que existia."', name: 'Henrique Drummond', role: 'CEO · Drummond Engenharia' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Processos',
  faqIntro: 'As 8 perguntas que aparecem antes da implantação.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre processos e BPMN',
  relatedBlogSlugs: [
    'como-mapear-processos-empresa-bpmn',
    'software-bpms-como-escolher',
    'como-integrar-sistemas-empresa',
    'sistemas-nao-conversam-custo',
    'plano-de-acao-executavel',
    'erp-vs-plataforma-all-in-one',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Seu primeiro processo crítico no ar em',
  ctaH2Highlight: '14 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Processos, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
