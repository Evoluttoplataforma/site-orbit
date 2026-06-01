/** /agentes/indicadores, playbook §7.4 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Substitui Power BI ou Tableau?', a: 'Para B2B brasileira de médio porte focada em gestão integrada, sim, com vantagem em conexão nativa com a operação.' },
  { q: 'Os indicadores são realmente em tempo real?', a: 'Sim. Eventos da operação atualizam os KPIs instantaneamente.' },
  { q: 'Posso criar qualquer indicador?', a: 'Sim, fórmula customizável, múltiplas fontes e periodicidades.' },
  { q: 'Tem alertas no celular?', a: 'Sim. App mobile com notificações inteligentes.' },
  { q: 'Como evito vanity metrics?', a: 'A Olívia sugere KPIs conectados a decisão real, não vaidade.' },
  { q: 'Posso compartilhar dashboards externos?', a: 'Sim. Links públicos auditáveis e revogáveis.' },
  { q: 'Integra com Power BI?', a: 'Sim, exporta dado pra Power BI/Tableau quando necessário.' },
  { q: 'Tempo até primeiros KPIs em tempo real?', a: '7 a 14 dias para os KPIs críticos.' },
];

export const agentSeo: AgentSeo = {
  slug: 'indicadores',
  name: 'Agente de Indicadores',
  title: 'Agente de Indicadores: KPIs e dashboards operados por IA | Orbit',
  description: 'Crie, conecte e monitore KPIs em tempo real. Dashboards executivos, alertas inteligentes e insights da Olívia. O Agente de Indicadores opera a gestão por dados.',
  ogTitle: 'Agente de Indicadores | Orbit Gestão',
  ogDescription: 'KPIs e dashboards em tempo real coordenados pela Olívia.',
  faqs,
};

const data: PageData = {
  currentSlug: 'indicadores',
  isModule: false,

  pill: 'Time Olívia · Indicadores',
  h1Pre: 'Agente de Indicadores: KPIs e dashboards',
  h1Highlight: 'em tempo real',
  h1Post: '.',
  subtitle: 'Cada indicador conectado à operação real. Dashboards atualizados automaticamente. Alertas quando algo desvia. <strong>Planilha morta vira ferramenta de gestão viva.</strong>',
  heroNote: '⏱️ KPIs críticos no ar em 7-14 dias · App mobile com alertas',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'Tempo real', label: 'eventos da operação' },
    { strong: 'Drill-down', label: 'até a transação' },
    { strong: 'Olívia', label: 'detecta anomalia' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Indicadores',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'continuamente',
  funcsIntro: 'Cada capacidade nativa do Agente, conectada aos outros agentes e aos módulos.',
  funcs: [
    { icon: 'fa-chart-line', title: 'Indicadores configuráveis', desc: 'Crie qualquer KPI com fórmula, periodicidade e meta.' },
    { icon: 'fa-plug', title: 'Conectores', desc: 'Puxa dado direto de CRM, financeiro, processos, RH e sistemas externos.' },
    { icon: 'fa-table-columns', title: 'Dashboards executivos', desc: 'Visões customizáveis por papel, área ou projeto.' },
    { icon: 'fa-bell', title: 'Alertas automáticos', desc: 'Notificação quando o KPI desvia da meta ou da faixa esperada.' },
    { icon: 'fa-magnifying-glass-plus', title: 'Drill-down', desc: 'Clique no número e veja a origem na operação.' },
    { icon: 'fa-clock-rotate-left', title: 'Comparação histórica', desc: 'vs mês anterior, ano anterior, meta e benchmark.' },
    { icon: 'fa-brain', title: 'Insights da Olívia', desc: 'Anomalias detectadas com sugestões de ação contextual.' },
    { icon: 'fa-mobile-screen-button', title: 'Mobile-first', desc: 'Acompanhe os principais indicadores no celular.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Indicadores',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Indicador isolado é vaidade. Conectado ao plano, ao processo e à venda vira decisão.',
    items: [
      { partner: 'Indicadores + Estratégico', benefit: 'cada objetivo do plano vira KPI monitorado' },
      { partner: 'Indicadores + Processos', benefit: 'SLA, taxa de erro e tempo de execução de cada processo' },
      { partner: 'Indicadores + Comercial', benefit: 'conversão por etapa, ticket médio, ciclo de venda' },
      { partner: 'Indicadores + Financeiro', benefit: 'DRE em tempo real, fluxo de caixa, margem por linha' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Indicadores destrava',
  scenariosH2Post: 'a decisão',
  scenariosIntro: 'Padrões que se repetem, endereçados com conexão nativa à operação.',
  scenarios: [
    { tag: 'Excel', title: 'Indicadores no Excel atualizados todo mês', body: 'O Agente conecta dados diretamente da operação, atualização passa a ser em tempo real.' },
    { tag: 'Confiança', title: 'Liderança não confia nos números', body: 'Cada indicador tem trilha auditável até a transação original. Confiança volta com o drill-down.' },
    { tag: 'Visão única', title: 'CEO quer a empresa inteira em uma tela', body: 'Dashboard executivo consolida estratégico, financeiro, comercial e operacional.' },
  ],

  testiH2: 'Quem opera por dados com a Orbit',
  testiIntro: 'CEOs e líderes contando o que mudou na reunião semanal.',
  testimonials: [
    { initials: 'GA', quote: '"Antes a sexta-feira era pra fechar relatório. Hoje o dashboard se faz sozinho, sexta voltou a ser pra decidir."', name: 'Gustavo Almeida', role: 'CFO · Almeida Logística' },
    { initials: 'BP', quote: '"O alerta de queda de conversão chegou no meu celular antes da minha gerente comercial me ligar. Agimos no mesmo dia."', name: 'Beatriz Pinheiro', role: 'CEO · NovaB2B' },
    { initials: 'LM', quote: '"Drill-down resolveu a guerra entre financeiro e comercial. Cada um vê a mesma transação, sem versão paralela."', name: 'Lucas Martin', role: 'Diretor de Operações · Forte Indústria' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Indicadores',
  faqIntro: 'As 8 perguntas que aparecem antes da decisão.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre indicadores e dashboards',
  relatedBlogSlugs: [
    'indicadores-nao-refletem-realidade',
    'dashboard-gestao-empresarial',
    'dre-tempo-real',
    'plano-de-acao-executavel',
    'tirar-planejamento-estrategico-do-papel',
    'gestao-financeira-integrada-empresa',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Seus KPIs críticos em tempo real em',
  ctaH2Highlight: '14 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Indicadores, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
