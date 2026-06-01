/**
 * Página /modulos/compras
 * Usa o template padrão de módulo (src/lib/module-page-template.ts).
 */

import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';

const data: PageData = {
  currentSlug: 'compras',
  isModule: true,

  pill: 'Módulo · Compras',
  h1Pre: 'Módulo Compras: pedidos, RFQ e fornecedores',
  h1Highlight: 'integrados',
  h1Post: '.',
  subtitle:
    'Pedidos de compra, cotações (RFQ), fornecedores, workflows de aprovação e relatórios. <strong>Integra nativamente com o financeiro e os agentes do Time Olívia.</strong>',
  heroNote: '⏱️ 30 dias até processo estabelecido · Integração nativa com financeiro',
  heroCtaPrimary: 'QUERO CONHECER COMPRAS',
  heroCtaSecondary: 'Ver 8 funcionalidades',
  heroCredentials: [
    { strong: 'RFQ', label: 'múltiplos fornecedores' },
    { strong: 'Workflow', label: 'com alçada por valor' },
    { strong: 'Integração', label: 'nativa ao financeiro' },
  ],

  funcsBadge: '8 funcionalidades',
  funcsH2Pre: 'O que o módulo de Compras',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'da requisição ao pagamento',
  funcsIntro:
    'Cada capacidade abaixo é nativa do módulo, conectada ao financeiro, aos agentes da Olívia e à governança da empresa.',
  funcs: [
    { icon: 'fa-bag-shopping', title: 'Pedidos de compra', desc: 'Solicitação, aprovação, recebimento, fluxo único do início ao fim.' },
    { icon: 'fa-envelope-circle-check', title: 'Cotações (RFQ)', desc: 'Solicita a múltiplos fornecedores e compara propostas automaticamente.' },
    { icon: 'fa-truck', title: 'Fornecedores', desc: 'Cadastro, contratos, histórico e avaliação centralizados em ficha única.' },
    { icon: 'fa-code-pull-request', title: 'Workflows de aprovação', desc: 'Configurável por valor e por área, sem reinventar processo a cada compra.' },
    { icon: 'fa-check', title: 'Aprovações auditáveis', desc: 'Trilha completa de quem aprovou o quê, quando e por quê.' },
    { icon: 'fa-chart-column', title: 'Relatórios de compras', desc: 'Por fornecedor, categoria e centro de custo, pra negociar com dado.' },
    { icon: 'fa-box', title: 'Catálogo configurável', desc: 'Produtos e serviços padronizados, requisição vira mais rápida e correta.' },
    { icon: 'fa-link', title: 'Integração financeira', desc: 'Aprovação dispara contas a pagar automaticamente no módulo financeiro.' },
  ],

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações que o Compras',
  scenariosH2Highlight: 'organiza',
  scenariosH2Post: 'sem virar burocracia',
  scenariosIntro: 'Padrões que se repetem em empresas que crescem mais rápido que o processo de compras.',
  scenarios: [
    { tag: 'Governança', title: 'Compras sem governança', body: 'O workflow obriga aprovação por valor com trilha auditável, sem barrar a operação, mas registrando tudo.' },
    { tag: 'RFQ', title: 'Cotações por e-mail são caos', body: 'O RFQ centralizado solicita a vários fornecedores, recebe propostas no sistema e compara automaticamente.' },
    { tag: 'Negociação', title: 'Empresa não sabe se está pagando preço bom', body: 'O histórico de cotação e fornecedor mostra benchmark, você negocia com dado, não com achismo.' },
  ],

  testiH2: 'Quem opera Compras com a Orbit',
  testiIntro: 'Compradores e diretores financeiros contando o que mudou.',
  testimonials: [
    { initials: 'SC', quote: '"A trilha de aprovação acabou com aquela história de \'quem autorizou isso?\'. Cada centavo tem um nome do lado."', name: 'Sandra Coelho', role: 'Gerente de Compras · Indústria Sul' },
    { initials: 'JN', quote: '"O RFQ no sistema cortou em 60% o tempo que eu gastava com cotação por e-mail. E ainda comparo propostas lado a lado."', name: 'João Nascimento', role: 'Comprador Sênior · Vetor Engenharia' },
    { initials: 'BL', quote: '"Aprovação automática alimenta o financeiro sem digitação dupla. O contas a pagar virou consequência, não tarefa."', name: 'Bianca Lemos', role: 'Diretora Financeira · Distribuidora Norte' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o módulo Compras',
  faqIntro: 'As 8 perguntas que o time comercial mais ouve.',
  faqs: [
    { q: 'Substitui Mercado Eletrônico ou Conformidade?', a: 'Para B2B brasileira de médio porte focada em gestão integrada, sim, com vantagem por estar conectado nativamente ao financeiro e ao restante da operação.' },
    { q: 'Como o RFQ funciona?', a: 'Solicita cotação a múltiplos fornecedores na mesma operação. Cada um responde no portal e a comparação é automática.' },
    { q: 'Fornecedor tem portal?', a: 'Sim, com acesso restrito e cada ação auditada.' },
    { q: 'Workflow tem alçada por valor?', a: 'Sim, alçada configurável por valor e por área, com escalonamento automático em caso de SLA estourado.' },
    { q: 'Integra com financeiro?', a: 'Sim. Pedido aprovado vira contas a pagar automaticamente no módulo financeiro.' },
    { q: 'Suporta cadastro nacional?', a: 'Sim, com integração SINTEGRA e Receita Federal pra validação automática de CNPJ.' },
    { q: 'Aprovação tem SLA?', a: 'Sim. SLA por etapa com escalonamento automático se ninguém aprovar no prazo.' },
    { q: 'Tempo até o processo estabelecido?', a: 'Cerca de 30 dias para mapear alçadas, fornecedores e workflows.' },
  ],

  knowledgeIntro: 'Artigos recentes do nosso blog sobre processos, integração e gestão',
  relatedBlogSlugs: [
    'gestao-financeira-integrada-empresa',
    'como-mapear-processos-empresa-bpmn',
    'erp-vs-plataforma-all-in-one',
    'como-integrar-sistemas-empresa',
    'indicadores-nao-refletem-realidade',
    'sistemas-nao-conversam-custo',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Seu processo de compras estruturado em',
  ctaH2Highlight: '30 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o módulo Compras, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
