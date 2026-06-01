/** /agentes/reunioes, playbook §7.11 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Substitui Fellow ou Otter?', a: 'Para B2B brasileira focada em gestão integrada, sim, com vantagem em conexão com PDI, plano e tarefas.' },
  { q: 'Como a transcrição funciona?', a: 'Áudio processado por IA vira texto pesquisável em PT-BR.' },
  { q: 'Posso editar a ata?', a: 'Sim. A ata gerada é rascunho, o time revisa e aprova.' },
  { q: 'As ações criadas vão pra onde?', a: 'Painel de tarefas do responsável + calendário.' },
  { q: 'Suporta reuniões recorrentes?', a: 'Sim, séries com pauta padrão e histórico.' },
  { q: 'Funciona com Google Meet e Zoom?', a: 'Sim, via integração ou upload do áudio.' },
  { q: 'Tem chat com transcrição?', a: 'Sim. Pergunte ao Agente o que foi discutido, ele responde com trecho.' },
  { q: 'Quando vejo redução de reuniões sem ação?', a: '60 a 90 dias com ritual instituído.' },
];

export const agentSeo: AgentSeo = {
  slug: 'reunioes',
  name: 'Agente de Reuniões',
  title: 'Agente de Reuniões: pauta, atas e ações operadas por IA | Orbit',
  description: 'Pauta, atas, ações pós-reunião, transcrição com IA, extração automática de tarefas. O Agente de Reuniões transforma reunião em execução rastreável.',
  ogTitle: 'Agente de Reuniões | Orbit Gestão',
  ogDescription: 'Pauta, ata e ações operadas por IA, com extração automática de tarefas.',
  faqs,
};

const data: PageData = {
  currentSlug: 'reunioes',
  isModule: false,

  pill: 'Time Olívia · Reuniões',
  h1Pre: 'Agente de Reuniões: pauta, ata e ações',
  h1Highlight: 'operadas por IA',
  h1Post: '.',
  subtitle: 'Pauta colaborativa, transcrição inteligente, extração automática de decisões e ações, encaminhamento por responsável. <strong>Horas de discussão viram execução rastreável.</strong>',
  heroNote: '⏱️ Ritual instituído em 60-90 dias · PT-BR + chat com transcrição',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'Transcrição', label: 'PT-BR por IA' },
    { strong: 'Ações', label: 'extraídas automaticamente' },
    { strong: 'Chat', label: 'pesquise a discussão' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Reuniões',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'da pauta à execução',
  funcsIntro: 'Cada capacidade nativa, conectada a Pessoas, Estratégico, Problemas e Oportunidades.',
  funcs: [
    { icon: 'fa-list', title: 'Pauta colaborativa', desc: 'Itens, tempos e responsáveis montados antes da reunião.' },
    { icon: 'fa-folder', title: 'Repositório de reuniões', desc: 'Histórico por série, time ou projeto.' },
    { icon: 'fa-microphone-lines', title: 'Transcrição com IA', desc: 'Áudio vira texto automaticamente em PT-BR.' },
    { icon: 'fa-message', title: 'Chat com transcrição', desc: 'Pergunte ao Agente sobre o que foi discutido.' },
    { icon: 'fa-circle-check', title: 'Extração de tarefas', desc: 'A IA identifica ações decididas e cria tarefa.' },
    { icon: 'fa-layer-group', title: 'Ações em massa', desc: 'Múltiplas ações gerenciadas em painel único.' },
    { icon: 'fa-scale-balanced', title: 'Decisões registradas', desc: 'Toda decisão fica rastreável com contexto.' },
    { icon: 'fa-paper-plane', title: 'Encaminhamento automático', desc: 'Ata enviada, ações criadas no painel de tarefas.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Reuniões',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Reunião isolada vira conversa esquecida. Conectada vira execução.',
    items: [
      { partner: 'Reuniões + Pessoas', benefit: 'ações de 1:1 vinculadas ao PDI do colaborador' },
      { partner: 'Reuniões + Estratégico', benefit: 'reuniões de comitê conectadas ao plano' },
      { partner: 'Reuniões + Problemas', benefit: 'reuniões de melhoria puxam problemas pendentes' },
      { partner: 'Reuniões + Oportunidades', benefit: 'oportunidades discutidas viram registros priorizados' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Reuniões transforma',
  scenariosH2Post: 'discussão em ação',
  scenariosIntro: 'Padrões comuns em times com agenda lotada e baixa execução.',
  scenarios: [
    { tag: 'Execução', title: 'Reuniões viram conversa sem execução', body: 'O Agente extrai decisões e ações, cria tarefas e acompanha execução.' },
    { tag: 'Memória', title: 'Time perde tempo lembrando o que ficou combinado', body: 'Repositório central pesquisável, chat com transcrição responde "quando combinamos X?".' },
    { tag: 'Histórico', title: 'CEO quer revisar histórico de decisão estratégica', body: 'O chat com transcrição responde "quando discutimos X?" com o trecho exato.' },
  ],

  testiH2: 'Quem opera reuniões com a Orbit',
  testiIntro: 'Líderes contando o que mudou no ritual de execução.',
  testimonials: [
    { initials: 'AS', quote: '"60% das minhas reuniões viraram ata + tarefa antes mesmo de eu sair da sala. Acabou a sexta-feira do follow-up."', name: 'André Souza', role: 'COO · SouzaCorp' },
    { initials: 'PD', quote: '"O chat com transcrição me deixa pesquisar a decisão. \'Quando aprovamos o orçamento de X?\', pronto, a resposta vem com trecho."', name: 'Patrícia Diniz', role: 'Diretora Executiva · Diniz Tech' },
    { initials: 'JM', quote: '"As ações de 1:1 amarradas ao PDI mudaram o follow-up. O líder não esquece, o Agente cobra."', name: 'Juliana Martins', role: 'Head de RH · MartinsGroup' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Reuniões',
  faqIntro: 'As 8 perguntas que aparecem antes da adoção.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre comunicação e execução',
  relatedBlogSlugs: [
    'vendas-marketing-operacoes-conflito',
    'plataformas-comunicacao-corporativa',
    'plano-de-acao-executavel',
    'tirar-planejamento-estrategico-do-papel',
    'como-integrar-sistemas-empresa',
    'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Sua próxima reunião vira execução em',
  ctaH2Highlight: 'tempo real',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Reuniões, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
