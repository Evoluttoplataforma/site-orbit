/**
 * Página /modulos/financeiro
 * Usa o template padrão de módulo (src/lib/module-page-template.ts).
 * Esta página só fornece os DADOS, visual está no template.
 */

import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';

const data: PageData = {
  currentSlug: 'financeiro',
  isModule: true,

  pill: 'Módulo · Financeiro',
  h1Pre: 'Módulo Financeiro: contas, fluxo de caixa e',
  h1Highlight: 'DRE em tempo real',
  h1Post: '.',
  subtitle:
    'Contas a pagar, contas a receber, fluxo de caixa projetado, DRE em tempo real, orçamento, conciliação bancária e insights da Olívia. <strong>Coordenado pelos agentes do Time Olívia.</strong>',
  heroNote: '⏱️ 30 dias até DRE em tempo real · Open Finance nativo',
  heroCtaPrimary: 'QUERO CONHECER O FINANCEIRO',
  heroCtaSecondary: 'Ver 8 funcionalidades',
  heroCredentials: [
    { strong: 'DRE', label: 'em tempo real' },
    { strong: '30/60/90', label: 'fluxo projetado' },
    { strong: 'Open Finance', label: 'conciliação nativa' },
  ],

  funcsBadge: '8 funcionalidades',
  funcsH2Pre: 'O que o módulo financeiro',
  funcsH2Highlight: 'faz',
  funcsH2Post: 'sozinho',
  funcsIntro:
    'Cada item abaixo é uma capacidade nativa, coordenada pelos agentes da Olívia, integrada ao resto da Orbit.',
  funcs: [
    { icon: 'fa-circle-arrow-up', title: 'Contas a pagar', desc: 'Lança, aprova, paga e concilia em um único fluxo, com regras por valor e hierarquia.' },
    { icon: 'fa-circle-arrow-down', title: 'Contas a receber', desc: 'Emite, monitora inadimplência e dispara cobrança automática quando o cliente atrasa.' },
    { icon: 'fa-water', title: 'Fluxo de caixa projetado', desc: '30, 60 e 90 dias atualizados em tempo real conforme a operação acontece.' },
    { icon: 'fa-file-invoice-dollar', title: 'DRE em tempo real', desc: 'Resultado provável atualizado a cada lançamento, fechamento vira validação, não descoberta.' },
    { icon: 'fa-chart-pie', title: 'Orçamento', desc: 'Orçado vs realizado por centro de custo, com alerta automático em desvios.' },
    { icon: 'fa-building-columns', title: 'Conciliação bancária', desc: 'Open Finance e integrações nativas com os principais bancos brasileiros.' },
    { icon: 'fa-folder-tree', title: 'Centros de custo', desc: 'Estrutura configurável por área, projeto ou produto, DRE multi-dimensional.' },
    { icon: 'fa-brain', title: 'Insights da Olívia', desc: 'Anomalias detectadas, sugestões de otimização e alertas de risco de liquidez.' },
  ],

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações que o financeiro',
  scenariosH2Highlight: 'resolve sozinho',
  scenariosH2Post: '',
  scenariosIntro: 'Padrões que se repetem em empresas de médio porte, antecipados antes de virarem crise.',
  scenarios: [
    { tag: 'Liquidez', title: 'Vende muito, mas o caixa aperta', body: 'O fluxo projetado expõe o descompasso entre prazo médio de recebimento e pagamento antes da crise virar emergência.' },
    { tag: 'Fechamento', title: 'Fechando o mês na última semana', body: 'Com DRE em tempo real, o fechamento contábil deixa de ser descoberta e vira validação, você sabe o resultado a qualquer momento.' },
    { tag: 'Inadimplência', title: 'Inadimplência crescendo no silêncio', body: 'Padrões de comportamento disparam cobrança semanas antes do default, protege margem sem desgastar relacionamento.' },
  ],

  testiH2: 'Quem opera com o módulo financeiro',
  testiIntro: 'CFOs e gestores financeiros contando o que mudou na prática.',
  testimonials: [
    { initials: 'PL', quote: '"Antes a gente sabia o resultado do mês depois que ele tinha acabado. Hoje o DRE roda em tempo real e eu tomo decisão com 20 dias de antecedência."', name: 'Paulo Lima', role: 'CFO · Construtora Horizonte' },
    { initials: 'CF', quote: '"O fluxo de caixa projetado mudou nossa rotina. Conseguimos antecipar uma crise de liquidez três meses antes, e renegociar prazo com fornecedor sem entrar em desespero."', name: 'Carla Ferreira', role: 'Diretora Financeira · Indústria Max' },
    { initials: 'AM', quote: '"A cobrança automática reduziu nossa inadimplência em 38%. E o time financeiro voltou a focar em análise, não em ligar pra cliente."', name: 'Ana Mendes', role: 'Gerente Financeira · FastLog' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o módulo financeiro',
  faqIntro: 'O que o time comercial mais ouve antes da decisão.',
  faqs: [
    { q: 'Substitui Conta Azul ou Omie?', a: 'Para B2B brasileira de médio porte focada em gestão integrada, sim. Para microempresa, esses outros são mais leves e baratos.' },
    { q: 'Como funciona a DRE em tempo real?', a: 'Lançamentos atualizam a DRE instantaneamente. Você vê o resultado provável em qualquer dia do mês, sem esperar fechamento.' },
    { q: 'Concilia com o banco automaticamente?', a: 'Sim, via Open Finance e integrações nativas com os principais bancos brasileiros.' },
    { q: 'Detecta inadimplência precoce?', a: 'Sim. Padrões de comportamento (atraso médio, recorrência, valor) disparam alerta semanas antes do default.' },
    { q: 'Tem regras de aprovação?', a: 'Sim. Limite por valor, hierarquia e escalonamento são totalmente configuráveis.' },
    { q: 'Atende empresas do Simples?', a: 'Sim, Simples Nacional, Lucro Presumido, Lucro Real e MEI.' },
    { q: 'Integra com ERP?', a: 'Sim, via API REST e conectores prontos para os principais ERPs brasileiros.' },
    { q: 'Quanto tempo até ter DRE em tempo real?', a: 'Aproximadamente 30 dias após o início, tempo de migrar plano de contas e centros de custo.' },
  ],

  knowledgeIntro: 'Artigos recentes do nosso blog sobre gestão financeira com IA',
  relatedBlogSlugs: [
    'dre-tempo-real',
    'vendas-boas-caixa-negativo',
    'gestao-financeira-integrada-empresa',
    'dashboard-gestao-empresarial',
    'indicadores-nao-refletem-realidade',
    'erp-vs-plataforma-all-in-one',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Sua DRE em tempo real começa em',
  ctaH2Highlight: '30 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça a Olívia, o financeiro e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
