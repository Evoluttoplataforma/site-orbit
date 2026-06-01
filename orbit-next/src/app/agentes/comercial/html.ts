/** /agentes/comercial, playbook §7.9 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Substitui RD Station ou HubSpot?', a: 'Para B2B brasileira de médio porte, sim, com vantagem em integração nativa com o resto da operação.' },
  { q: 'Como integra com WhatsApp?', a: 'Conectores nativos com WhatsApp Business API.' },
  { q: 'Qualifica leads sozinho?', a: 'Sim, com base em ICP. Cruza dados públicos e aplica score automaticamente.' },
  { q: 'Posso ter múltiplos pipelines?', a: 'Sim, por produto, segmento, time ou geografia.' },
  { q: 'Como comissão funciona?', a: 'Amarrada ao registro. O Agente calcula com base em regras configuráveis.' },
  { q: 'Integra com marketing?', a: 'Sim, web forms, automações e atribuição multi-touch.' },
  { q: 'Tem mobile?', a: 'Sim. O vendedor opera em campo com experiência mobile-first.' },
  { q: 'Adoção real em quanto tempo?', a: '80-90% em 60-90 dias com redução de fricção.' },
];

export const agentSeo: AgentSeo = {
  slug: 'comercial',
  name: 'Agente Comercial',
  title: 'Agente Comercial: CRM e pipeline de vendas operados por IA | Orbit',
  description: 'Pipeline, leads, automações, formulários, relatórios. O Agente Comercial opera o ciclo completo de vendas B2B, coordenado pela Olívia.',
  ogTitle: 'Agente Comercial | Orbit Gestão',
  ogDescription: 'CRM e operação de vendas B2B operados por IA.',
  faqs,
};

const data: PageData = {
  currentSlug: 'comercial',
  isModule: false,

  pill: 'Time Olívia · Comercial',
  h1Pre: 'Agente Comercial: CRM e vendas B2B',
  h1Highlight: 'operados por IA',
  h1Post: '.',
  subtitle: 'Pipeline de leads, qualificação, atividades, automações, formulários, dashboards comerciais e insights de pipeline. <strong>Operação que não depende do humor do vendedor.</strong>',
  heroNote: '⏱️ Adoção 80-90% em 60-90 dias · WhatsApp Business + mobile',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'Pipeline', label: 'múltiplos funis' },
    { strong: 'WhatsApp', label: 'Business nativo' },
    { strong: 'AI Insights', label: 'risco por etapa' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente Comercial',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'do lead ao fechamento',
  funcsIntro: 'Cada capacidade nativa, conectada ao Financeiro, Documentos, Processos e Indicadores.',
  funcs: [
    { icon: 'fa-code-branch', title: 'Pipeline de leads', desc: 'Funil configurável por equipe com estágios e SLAs.' },
    { icon: 'fa-user-magnifying-glass', title: 'Detalhes do lead', desc: 'Ficha completa com histórico, atividades e contexto enriquecido.' },
    { icon: 'fa-bolt', title: 'Automações de CRM', desc: 'Disparo de tarefas, e-mails e mudanças de estágio por regras.' },
    { icon: 'fa-input-text', title: 'Web Forms', desc: 'Formulários de captura plugáveis em site e LP.' },
    { icon: 'fa-code', title: 'API + Webhooks', desc: 'Integração nativa com qualquer fonte de lead externa.' },
    { icon: 'fa-chart-bar', title: 'Relatórios comerciais', desc: 'Conversão, ticket médio, ciclo e cobertura de pipeline.' },
    { icon: 'fa-pen-nib', title: 'Provedores de assinatura', desc: 'Integração com DocuSign, ClickSign e outros.' },
    { icon: 'fa-brain', title: 'AI Pipeline Insights', desc: 'A Olívia prioriza atividade, identifica risco e sugere ação.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente Comercial',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Venda fechada é só o começo. O Agente Comercial dispara o resto da operação automaticamente.',
    items: [
      { partner: 'Comercial + Financeiro', benefit: 'venda fechada dispara fatura e atualiza projeção de caixa' },
      { partner: 'Comercial + Documentos', benefit: 'contrato e proposta gerados automaticamente' },
      { partner: 'Comercial + Processos', benefit: 'onboarding disparado quando a venda fecha' },
      { partner: 'Comercial + Indicadores', benefit: 'meta de receita conectada ao pipeline em tempo real' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Comercial destrava',
  scenariosH2Post: 'a operação',
  scenariosIntro: 'Padrões comuns em times comerciais B2B brasileiros.',
  scenarios: [
    { tag: 'Adoção', title: 'Vendedor não preenche CRM', body: 'O Agente captura atividade automaticamente e reduz preenchimento manual em 60%.' },
    { tag: 'Previsibilidade', title: 'Pipeline imprevisível', body: 'O Agente projeta cenários e antecipa risco em 8 a 12 semanas.' },
    { tag: 'Reporting', title: 'Sexta inteira gerando relatório', body: 'O Agente entrega relatório semanal pronto com análise causal, sexta volta a ser pra decisão.' },
  ],

  testiH2: 'Quem opera vendas com a Orbit',
  testiIntro: 'CROs e diretores comerciais contando o que mudou na previsibilidade.',
  testimonials: [
    { initials: 'EP', quote: '"Pipeline imprevisível virou previsão semanal. O vendedor não preenche menos, é o sistema que registra a atividade por ele."', name: 'Eduardo Peixoto', role: 'CRO · PeixotoTech' },
    { initials: 'KS', quote: '"Conversão por etapa explodiu quando a Olívia começou a priorizar os leads. Ela não esquece de ninguém, eu esquecia."', name: 'Karina Souto', role: 'Diretora Comercial · NovaB2B' },
    { initials: 'MO', quote: '"O contrato sai automático na hora do fechamento. Antes ia pra fila do jurídico e durava dias."', name: 'Marcos Oliveira', role: 'Sales Ops · OliveirosCorp' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente Comercial',
  faqIntro: 'As 8 perguntas que aparecem antes da troca.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre vendas B2B',
  relatedBlogSlugs: [
    'vendedor-nao-preenche-crm',
    'vendas-marketing-operacoes-conflito',
    'plano-de-acao-executavel',
    'indicadores-nao-refletem-realidade',
    'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas',
    'erp-vs-plataforma-all-in-one',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Seu CRM finalmente preenchido em',
  ctaH2Highlight: '60 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente Comercial, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
