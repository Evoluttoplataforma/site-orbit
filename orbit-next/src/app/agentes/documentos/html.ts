/** /agentes/documentos, playbook §7.8 */
import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';
import type { AgentSeo } from '@/lib/agent-page-helpers';

const faqs = [
  { q: 'Substitui Notion ou Confluence?', a: 'Para B2B brasileira que quer documentação integrada à operação, sim, com vantagem em workflows nativos.' },
  { q: 'Tem busca semântica?', a: 'Sim. A Olívia entende perguntas em linguagem natural e retorna o documento relevante.' },
  { q: 'Como funciona a assinatura digital?', a: 'Integração nativa com DocuSign, ClickSign e Adobe Sign.' },
  { q: 'Tem versionamento?', a: 'Sim, histórico completo com diff entre versões.' },
  { q: 'Posso compartilhar externamente?', a: 'Sim. Link público com auditoria e revogável a qualquer momento.' },
  { q: 'Workflow tem prazo?', a: 'Sim, SLA por etapa, com escalonamento automático.' },
  { q: 'Suporta OCR de PDF?', a: 'Sim, PDFs e imagens viram texto pesquisável.' },
  { q: 'Quanto tempo pra consolidar?', a: '3 a 6 meses pra empresa de médio porte, em fases.' },
];

export const agentSeo: AgentSeo = {
  slug: 'documentos',
  name: 'Agente de Documentos',
  title: 'Agente de Documentos: repositório e workflows operados por IA | Orbit',
  description: 'Repositório centralizado, workflows de aprovação, versionamento e assinaturas digitais. Governança documental operada pelo Agente de Documentos coordenado pela Olívia.',
  ogTitle: 'Agente de Documentos | Orbit Gestão',
  ogDescription: 'Governança documental operada por IA com busca semântica.',
  faqs,
};

const data: PageData = {
  currentSlug: 'documentos',
  isModule: false,

  pill: 'Time Olívia · Documentos',
  h1Pre: 'Agente de Documentos: governança',
  h1Highlight: 'operada por IA',
  h1Post: '.',
  subtitle: 'Repositório centralizado, workflows de aprovação, versionamento, assinaturas digitais e <strong>busca semântica</strong>. Documentação amarrada à operação real.',
  heroNote: '⏱️ Consolidação em 3-6 meses · OCR + SCORM + assinatura nativa',
  heroCtaPrimary: 'QUERO CONHECER O AGENTE',
  heroCtaSecondary: 'Ver 8 capacidades',
  heroCredentials: [
    { strong: 'Busca', label: 'semântica por IA' },
    { strong: 'Versão', label: 'com diff auditável' },
    { strong: 'Assinatura', label: 'nativa integrada' },
  ],

  funcsBadge: '8 capacidades',
  funcsH2Pre: 'O que o Agente de Documentos',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'do upload à auditoria',
  funcsIntro: 'Cada capacidade nativa, conectada a Comercial, Processos, Riscos e R&S.',
  funcs: [
    { icon: 'fa-folder-tree', title: 'Repositório centralizado', desc: 'Estrutura hierárquica configurável por área e tipo.' },
    { icon: 'fa-tags', title: 'Categorias', desc: 'Classificação por tipo com políticas específicas de governança.' },
    { icon: 'fa-code-pull-request', title: 'Workflows de aprovação', desc: 'Fluxo configurável de revisão e aprovação.' },
    { icon: 'fa-clock-rotate-left', title: 'Versionamento', desc: 'Histórico completo de versões com data, autor e diff.' },
    { icon: 'fa-check', title: 'Aprovações auditáveis', desc: 'Trilha auditável de quem aprovou e quando.' },
    { icon: 'fa-pen-nib', title: 'Assinatura digital', desc: 'Integração nativa com provedores de assinatura jurídica.' },
    { icon: 'fa-share-nodes', title: 'Compartilhamento público', desc: 'Links públicos auditáveis e revogáveis.' },
    { icon: 'fa-magnifying-glass', title: 'Busca semântica', desc: 'Pergunte em linguagem natural, a Olívia encontra.' },
  ],

  integrations: {
    badge: '4 integrações no Time Olívia',
    h2Pre: 'Como o Agente de Documentos',
    h2Highlight: 'trabalha junto',
    h2Post: 'com o resto da Orbit',
    intro: 'Documento isolado é arquivo. Conectado à operação vira evidência viva.',
    items: [
      { partner: 'Documentos + Comercial', benefit: 'propostas e contratos gerados com dados do CRM' },
      { partner: 'Documentos + Processos', benefit: 'POPs vinculados aos processos correspondentes' },
      { partner: 'Documentos + Riscos', benefit: 'evidências e relatórios anexados de forma auditável' },
      { partner: 'Documentos + R&S', benefit: 'ofertas, NDA e contratos de admissão gerenciados' },
    ],
  },

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações em que o',
  scenariosH2Highlight: 'Documentos resolve',
  scenariosH2Post: 'a bagunça',
  scenariosIntro: 'Padrões comuns em empresas com documentação espalhada.',
  scenarios: [
    { tag: 'Centralização', title: 'Documentos espalhados em Drive + e-mail + WhatsApp', body: 'O Agente migra pra hub único com estrutura hierárquica clara.' },
    { tag: 'Busca', title: 'Time gasta horas procurando documento', body: 'A busca semântica reduz o tempo de procura em até 80%.' },
    { tag: 'Auditoria', title: 'Auditoria fiscal vai começar', body: 'O Agente garante trilha completa de aprovação, versionamento e compliance.' },
  ],

  testiH2: 'Quem opera documentos com a Orbit',
  testiIntro: 'Compliance officers e líderes contando o que mudou na busca.',
  testimonials: [
    { initials: 'IM', quote: '"Tempo médio pra encontrar contrato caiu de 22 minutos pra 30 segundos. A busca semântica é magia."', name: 'Isabela Monte', role: 'Diretora Jurídica · Monte Advocacia' },
    { initials: 'AC', quote: '"Versionamento com diff acabou com a história de \'qual é a versão final?\'. Tem uma só, auditável."', name: 'André Coelho', role: 'COO · Coelho Logística' },
    { initials: 'TR', quote: '"Auditoria do ano passado durou 4 dias. Antes durava 3 semanas. Tudo já estava versionado e aprovado."', name: 'Tatiana Ribeiro', role: 'Compliance · Grupo TR' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o Agente de Documentos',
  faqIntro: 'As 8 perguntas que aparecem antes da migração.',
  faqs,

  knowledgeIntro: 'Artigos recentes do nosso blog sobre documentação e processos',
  relatedBlogSlugs: [
    'encontrar-documento-empresa',
    'knowledge-base-corporativo-como-escolher',
    'como-mapear-processos-empresa-bpmn',
    'como-integrar-sistemas-empresa',
    'sistemas-nao-conversam-custo',
    'erp-vs-plataforma-all-in-one',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Sua documentação no lugar certo em',
  ctaH2Highlight: '90 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o Agente de Documentos, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
