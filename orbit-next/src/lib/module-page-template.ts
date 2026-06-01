/**
 * Shared template para páginas de agentes/módulos.
 *
 * Aplica EXATAMENTE o padrão consolidado no design-system.html §4.5:
 *   - .pg-dark wrapper (resolve body=branco do Tailwind v4)
 *   - 8 blocos na ordem: Hero → Funcs → Cenários → Testi → FAQ → Vídeos → Conteúdo → CTA
 *   - dark/light alternados igual home
 *   - Conteúdo blog puxa real do articles.json (nunca inventado)
 *
 * Cada página/módulo só fornece o `PageData`. Visual fica idêntico,
 * mudanças no template propagam pra todas automaticamente.
 *
 * Referência viva: /modulos/financeiro
 */

import articlesData from '@/data/articles.json';

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

export type FuncItem = { icon: string; title: string; desc: string };
export type ScenarioItem = { tag: string; title: string; body: string };
export type TestiItem = { initials: string; quote: string; name: string; role: string };
export type FaqItem = { q: string; a: string };
export type HeroCredential = { strong: string; label: string };
// Apenas agentes têm o bloco de integrações com os outros agentes
export type IntegrationItem = { partner: string; benefit: string };

export type PageData = {
  // Identificação (pra remover a si próprio do cross-linking)
  currentSlug?: string;          // 'estrategico' ou 'financeiro' etc, opcional
  isModule?: boolean;            // true se for módulo (afeta tom do cross-link)

  // §0 Hero
  pill: string;                  // "Módulo · Financeiro"
  h1Pre: string;                 // "Módulo Financeiro: contas, fluxo de caixa e"
  h1Highlight: string;           // "DRE em tempo real" (gold highlight)
  h1Post?: string;               // ".", opcional após o highlight
  subtitle: string;              // pode conter <strong>...</strong>
  heroNote: string;              // "⏱️ 30 dias..."
  heroCtaPrimary: string;        // "QUERO CONHECER O FINANCEIRO"
  heroCtaSecondary: string;      // "Ver 8 funcionalidades"
  heroCredentials: [HeroCredential, HeroCredential, HeroCredential];

  // §1 Funcionalidades
  funcsBadge: string;            // "8 funcionalidades"
  funcsH2Pre: string;            // "O que o módulo financeiro"
  funcsH2Highlight: string;      // "faz" (gold)
  funcsH2Post: string;           // "sozinho"
  funcsIntro: string;
  funcs: FuncItem[];

  // §1.5 Integrações, opcional, só agentes mostram
  // Quando presente, renderiza ANTES dos cenários como bloco dark com 4 cards.
  integrations?: {
    badge: string;       // "4 integrações no Time"
    h2Pre: string;       // "Como o agente"
    h2Highlight: string; // "trabalha junto"
    h2Post: string;      // "com o resto da Orbit"
    intro: string;
    items: IntegrationItem[]; // 4 items
  };

  // §2 Cenários (light)
  scenariosBadge: string;
  scenariosH2Pre: string;
  scenariosH2Highlight: string;
  scenariosH2Post: string;
  scenariosIntro: string;
  scenarios: ScenarioItem[];

  // §3 Depoimentos textuais
  testiH2: string;               // "Quem opera com o módulo financeiro"
  testiIntro: string;
  testimonials: TestiItem[];

  // §4 FAQ (light)
  faqBadge: string;
  faqH2: string;                 // "Sobre o módulo financeiro"
  faqIntro: string;
  faqs: FaqItem[];

  // §5 Conteúdo do blog (light)
  knowledgeIntro: string;        // "Artigos recentes do nosso blog sobre…"
  relatedBlogSlugs: string[];    // até 6 slugs reais do articles.json

  // §6 CTA final
  ctaBadge: string;
  ctaH2Pre: string;
  ctaH2Highlight: string;
  ctaH2Post: string;
  ctaIntro: string;
  ctaButton: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES, listas globais pra cross-linking
// ─────────────────────────────────────────────────────────────────────────────

// Módulos (4), copy curto pros cards segment-card no cross-link
type ModuleCopy = { tag: string; title: string; body: string };
const MODULE_COPY: Record<string, ModuleCopy> = {
  financeiro: {
    tag: 'Fluxo · DRE',
    title: 'Contas, fluxo e DRE em tempo real',
    body: 'Contas a pagar e a receber, fluxo de caixa projetado de 30/60/90 dias, DRE em tempo real e conciliação Open Finance nativa.',
  },
  'recrutamento-selecao': {
    tag: 'Vagas · Triagem IA',
    title: 'Do anúncio à contratação com IA',
    body: 'Descrição automática, triagem de CV por IA, scorecards configuráveis, comunicação automática e banco de talentos vivo.',
  },
  projetos: {
    tag: 'Gantt · Portfólio',
    title: 'Portfólio com Gantt e dependências',
    body: 'Cronograma com dependências, automações, portal do cliente externo e risco de atraso antecipado pela Olívia.',
  },
  compras: {
    tag: 'RFQ · Fornecedores',
    title: 'Pedidos, RFQ e fornecedores integrados',
    body: 'Pedidos de compra, RFQ multifornecedor com comparação automática, workflows de alçada e integração nativa ao financeiro.',
  },
};

// Cada agente tem 1 imagem de retrato pronta em /public/images/
// (alguns slugs diferem do nome da imagem, mapeado em `img`).
const ALL_AGENTS: Array<{ slug: string; name: string; icon: string; img: string; tagline: string }> = [
  { slug: 'estrategico', name: 'Estratégico', icon: 'fa-compass', img: '/images/agente-estrategista.png', tagline: 'SWOT, BSC e planejamento estratégico' },
  { slug: 'processos', name: 'Processos', icon: 'fa-diagram-project', img: '/images/agente-processos.jpg', tagline: 'BPMN, playbooks e execução' },
  { slug: 'pessoas', name: 'Pessoas', icon: 'fa-users', img: '/images/agente-pessoas.png', tagline: 'Cargos, PDI e organograma vivo' },
  { slug: 'indicadores', name: 'Indicadores', icon: 'fa-chart-line', img: '/images/agente-indicadores.jpg', tagline: 'KPIs em tempo real e causa raiz' },
  { slug: 'riscos', name: 'Riscos', icon: 'fa-shield-halved', img: '/images/agente-riscos.jpg', tagline: 'Matriz, plano e detecção emergente' },
  { slug: 'treinamento', name: 'Treinamento', icon: 'fa-graduation-cap', img: '/images/agente-treinamento.jpg', tagline: 'Microlearning e aprendizagem aplicada' },
  { slug: 'oportunidades', name: 'Oportunidades', icon: 'fa-lightbulb', img: '/images/agente-oportunidades.jpg', tagline: 'Captura, viabilidade e priorização' },
  { slug: 'documentos', name: 'Documentos', icon: 'fa-folder-tree', img: '/images/agente-documentos.jpg', tagline: 'Repositório, versionamento e busca semântica' },
  { slug: 'comercial', name: 'Comercial', icon: 'fa-code-branch', img: '/images/agente-vendas.jpg', tagline: 'CRM, pipeline e WhatsApp Business' },
  { slug: 'problemas-operacionais', name: 'Problemas', icon: 'fa-triangle-exclamation', img: '/images/agente-problemas.jpg', tagline: 'RCA com 5 Porquês e Ishikawa' },
  { slug: 'reunioes', name: 'Reuniões', icon: 'fa-microphone-lines', img: '/images/agente-reunioes.jpg', tagline: 'Pauta, transcrição PT-BR e ata automática' },
  { slug: 'pesquisas', name: 'Pesquisas', icon: 'fa-clipboard-list', img: '/images/agente-pesquisa.jpg', tagline: 'Clima, NPS e plano automático' },
];

const ALL_MODULES: Array<{ slug: string; name: string; icon: string }> = [
  { slug: 'financeiro', name: 'Financeiro', icon: 'fa-building-columns' },
  { slug: 'recrutamento-selecao', name: 'R&S', icon: 'fa-user-plus' },
  { slug: 'projetos', name: 'Projetos', icon: 'fa-chart-gantt' },
  { slug: 'compras', name: 'Compras', icon: 'fa-bag-shopping' },
];

// ─────────────────────────────────────────────────────────────────────────────
// AUTO-LINK FAQ, transforma menções em links internos
// ─────────────────────────────────────────────────────────────────────────────
//
// Pra cada resposta de FAQ, varremos frases conhecidas e linkamos pra página
// correspondente, AOMENTE NA PRIMEIRA OCORRÊNCIA (não polui a leitura).
// Ordem importa, frases mais específicas vêm antes (ex: "Agente de Processos"
// antes de "processos").
//
// Lista AMPLIADA: primeiro tenta nome explícito ("Agente de X"), depois
// termos conceituais que aparecem nas respostas (BPMN, DRE, KPI, etc).
// Ordem importa, mais específico vem antes do mais genérico.
const FAQ_AUTOLINKS: Array<{ phrase: RegExp; url: string }> = [
  // ─── Pillar ───
  { phrase: /\bTime Olívia\b/, url: '/agentes-de-ia' },
  // ─── 12 Agentes, nome explícito ───
  { phrase: /\bAgente Estratégico\b/i, url: '/agentes/estrategico' },
  { phrase: /\bAgente de Processos\b/i, url: '/agentes/processos' },
  { phrase: /\bAgente de Pessoas\b/i, url: '/agentes/pessoas' },
  { phrase: /\bAgente de Indicadores\b/i, url: '/agentes/indicadores' },
  { phrase: /\bAgente de Riscos\b/i, url: '/agentes/riscos' },
  { phrase: /\bAgente de Treinamento\b/i, url: '/agentes/treinamento' },
  { phrase: /\bAgente de Oportunidades\b/i, url: '/agentes/oportunidades' },
  { phrase: /\bAgente de Documentos\b/i, url: '/agentes/documentos' },
  { phrase: /\bAgente Comercial\b/i, url: '/agentes/comercial' },
  { phrase: /\bAgente de Problemas( Operacionais)?\b/i, url: '/agentes/problemas-operacionais' },
  { phrase: /\bAgente de Reuniões\b/i, url: '/agentes/reunioes' },
  { phrase: /\bAgente de Pesquisas\b/i, url: '/agentes/pesquisas' },
  // ─── 4 Módulos, nome explícito ───
  { phrase: /\bmódulo financeiro\b/i, url: '/modulos/financeiro' },
  { phrase: /\bmódulo (de )?R&S\b/i, url: '/modulos/recrutamento-selecao' },
  { phrase: /\bmódulo (de )?Recrutamento( e Seleção)?\b/i, url: '/modulos/recrutamento-selecao' },
  { phrase: /\bmódulo (de )?Projetos\b/i, url: '/modulos/projetos' },
  { phrase: /\bmódulo (de )?Compras\b/i, url: '/modulos/compras' },
  // ─── Termos conceituais → agente especialista ou módulo ───
  { phrase: /\bIshikawa\b/i, url: '/agentes/problemas-operacionais' },
  { phrase: /\b5 Porqu[êe]s\b/i, url: '/agentes/problemas-operacionais' },
  { phrase: /\bBPMN\b/i, url: '/agentes/processos' },
  { phrase: /\bPOP(s)?\b/, url: '/agentes/processos' },
  { phrase: /\bPDI\b/, url: '/agentes/pessoas' },
  { phrase: /\borganograma\b/i, url: '/agentes/pessoas' },
  { phrase: /\bturnover\b/i, url: '/agentes/pessoas' },
  { phrase: /\beNPS\b/i, url: '/agentes/pesquisas' },
  { phrase: /\bNPS de cliente\b/i, url: '/agentes/pesquisas' },
  { phrase: /\bclima organizacional\b/i, url: '/agentes/pesquisas' },
  { phrase: /\bLGPD\b/, url: '/agentes/riscos' },
  { phrase: /\bISO ?(9001|27001)\b/, url: '/agentes/riscos' },
  { phrase: /\bmatriz de risco\b/i, url: '/agentes/riscos' },
  { phrase: /\bSWOT\b/, url: '/agentes/estrategico' },
  { phrase: /\bOKR\b/, url: '/agentes/estrategico' },
  { phrase: /\bBSC\b/, url: '/agentes/estrategico' },
  { phrase: /\bKPI(s)?\b/, url: '/agentes/indicadores' },
  { phrase: /\bdashboards?\b/i, url: '/agentes/indicadores' },
  { phrase: /\bdrill-down\b/i, url: '/agentes/indicadores' },
  { phrase: /\bbusca sem[âa]ntica\b/i, url: '/agentes/documentos' },
  { phrase: /\bassinatura digital\b/i, url: '/agentes/documentos' },
  { phrase: /\bversionamento\b/i, url: '/agentes/documentos' },
  { phrase: /\btranscri[çc][ãa]o\b/i, url: '/agentes/reunioes' },
  { phrase: /\bata( automática)?\b/i, url: '/agentes/reunioes' },
  { phrase: /\bmicrolearning\b/i, url: '/agentes/treinamento' },
  { phrase: /\btrilha(s)? de aprendizado\b/i, url: '/agentes/treinamento' },
  { phrase: /\bonboarding\b/i, url: '/agentes/treinamento' },
  { phrase: /\bpipeline( de leads)?\b/i, url: '/agentes/comercial' },
  { phrase: /\bWhatsApp Business( API)?\b/i, url: '/agentes/comercial' },
  { phrase: /\bICP\b/, url: '/agentes/comercial' },
  { phrase: /\bCRM\b/, url: '/agentes/comercial' },
  // ─── Termos conceituais → módulo ───
  { phrase: /\bfluxo de caixa\b/i, url: '/modulos/financeiro' },
  { phrase: /\bcontas a (pagar|receber)\b/i, url: '/modulos/financeiro' },
  { phrase: /\bOpen Finance\b/i, url: '/modulos/financeiro' },
  { phrase: /\bconcilia[çc][ãa]o banc[áa]ria\b/i, url: '/modulos/financeiro' },
  { phrase: /\bcentros? de custo\b/i, url: '/modulos/financeiro' },
  { phrase: /\btriagem de CV\b/i, url: '/modulos/recrutamento-selecao' },
  { phrase: /\bscorecards?\b/i, url: '/modulos/recrutamento-selecao' },
  { phrase: /\bbanco de talentos\b/i, url: '/modulos/recrutamento-selecao' },
  { phrase: /\bGantt\b/, url: '/modulos/projetos' },
  { phrase: /\bdepend[êe]ncias\b/i, url: '/modulos/projetos' },
  { phrase: /\bRFQ\b/, url: '/modulos/compras' },
  { phrase: /\bfornecedores?\b/i, url: '/modulos/compras' },
  { phrase: /\bpedidos? de compra\b/i, url: '/modulos/compras' },
  // ─── Blog: conceitos com artigo dedicado ───
  { phrase: /\bDRE em tempo real\b/i, url: '/blog/dre-tempo-real' },
  { phrase: /\bDRE\b/, url: '/blog/dre-tempo-real' },
  { phrase: /\bgest[ãa]o financeira integrada\b/i, url: '/blog/gestao-financeira-integrada-empresa' },
  { phrase: /\bplano de a[çc][ãa]o\b/i, url: '/blog/plano-de-acao-executavel' },
  { phrase: /\bplanejamento estrat[ée]gico\b/i, url: '/blog/tirar-planejamento-estrategico-do-papel' },
  { phrase: /\bERP\b/, url: '/blog/erp-vs-plataforma-all-in-one' },
  { phrase: /\binadimpl[êe]ncia\b/i, url: '/blog/vendas-boas-caixa-negativo' },
  { phrase: /\bdashboard de gest[ãa]o\b/i, url: '/blog/dashboard-gestao-empresarial' },
  // ─── Outras páginas próprias do site ───
  { phrase: /\bGrupo GSN\b/, url: '/sobre' },
  { phrase: /\b8\.000\+? empresas\b/, url: '/sobre' },
  { phrase: /\b30 anos de metodologia\b/i, url: '/sobre' },
  { phrase: /\bconsultor(es)? de estrat[ée]gia\b/i, url: '/agentes/estrategico' },
  // ─── Genéricos por último (mais específicos já casaram primeiro) ───
  { phrase: /\bOl[íi]via\b/, url: '/agentes-de-ia' },
];

function autolinkFaqAnswer(answer: string, selfUrl?: string): string {
  let result = answer;
  const used = new Set<string>();
  for (const { phrase, url } of FAQ_AUTOLINKS) {
    if (used.has(url)) continue;
    if (selfUrl && url === selfUrl) continue; // não linka pra si mesmo
    result = result.replace(phrase, (match) => {
      if (used.has(url)) return match;
      used.add(url);
      return `<a href="${url}" class="faq-inline-link">${match}</a>`;
    });
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES, depo videos (fixos pra todas as páginas, igual home)
// ─────────────────────────────────────────────────────────────────────────────

const DEPO_VIDEOS = [
  { id: '1194123078', name: 'Lucineia Pedrosa', role: 'Econtech Consultoria' },
  { id: '1194124564', name: 'Hygor Limar', role: 'Potencialize Resultados' },
  { id: '1194125389', name: 'Bruno Lozano', role: 'Ritual de Gestão' },
  { id: '1194126879', name: 'Rogério Menossi', role: 'Time Produtivo' },
];

const CATEGORY_LABEL: Record<string, string> = {
  estrategica: 'Gestão estratégica',
  indicadores: 'Indicadores',
  'planejamento-estrategico': 'Planejamento estratégico',
  ia: 'IA & Gestão',
  marketing: 'Marketing',
};

type Article = { slug: string; title: string; category: string; cover_url: string | null };

// ─────────────────────────────────────────────────────────────────────────────
// WRAPPER CSS (§4.5.1 do design-system.html)
// ─────────────────────────────────────────────────────────────────────────────

const WRAPPER_STYLE = `
<style>
  .pg-dark { background: #0D1117; color: #C9D1D9; }
  .pg-dark .section-dark { background: #0D1117; }
  .pg-dark .section-dark-soft { background: #161B22; }
  .pg-dark .section--light { color: var(--light-text); }
  .pg-dark .section--light h2,
  .pg-dark .section--light h3,
  .pg-dark .section--light h4 { color: var(--light-text); }
  .pg-dark .section--light p,
  .pg-dark .section--light li { color: var(--light-text-secondary); }
  .pg-dark .section--light .segment-card h3 { color: var(--light-text); }
  .pg-dark .section--light .segment-card p { color: var(--light-text-secondary); }
  /* Cards .agent-card dentro de section--light (ex.: grids de pillar/cross-link)
     viram brancos com texto escuro, sobrescreve o default dark do orbit.css. */
  .pg-dark .section--light .agent-card {
    background: #fff !important;
    border: 1px solid rgba(0,0,0,0.08) !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .pg-dark .section--light .agent-card:hover {
    border-color: rgba(255,186,26,0.45) !important;
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.10);
  }
  .pg-dark .section--light .agent-card h3 { color: #1A1D23 !important; }
  .pg-dark .section--light .agent-card p { color: #5A6069 !important; }
  /* Segment cards dos módulos no cross-link (.section--light estilo Cenários) */
  .pg-dark .section--light .mod-segment-card { display: flex; flex-direction: column; height: 100%; }
  .pg-dark .section--light .mod-segment-card h3 {
    color: #1A1D23 !important; font-size: 20px; font-weight: 700;
    line-height: 1.25; margin: 0 0 14px;
    text-wrap: balance;
  }
  .pg-dark .section--light .mod-segment-card p {
    color: #5A6069 !important; font-size: 14px; line-height: 1.55;
    margin: 0 0 22px;
  }
  .pg-dark .section--light .mod-segment-card__link {
    color: #D4960A; font-size: 13px; font-weight: 700;
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: auto;
    transition: gap 0.2s;
  }
  .pg-dark .section--light .mod-segment-card:hover .mod-segment-card__link { gap: 10px; }
  /* Auto-link interno nas respostas de FAQ: subtle gold com underline-on-hover */
  .pg-dark .faq-section .faq-inline-link,
  .pg-dark .section--light .faq-inline-link {
    color: #D4960A !important;
    text-decoration: none;
    border-bottom: 1px dashed rgba(212,150,10,0.45);
    transition: all 0.15s;
  }
  .pg-dark .section--light .faq-inline-link:hover {
    color: #ffba1a !important;
    border-bottom-color: #ffba1a;
  }
  /* Veja também: pills cross-link no fim da FAQ */
  .pg-dark .section--light .faq-see-also__label {
    color: #6E7884; font-size: 11px; font-weight: 800;
    letter-spacing: 2px; text-transform: uppercase;
    margin: 0 0 16px; font-family: 'JetBrains Mono', ui-monospace, monospace;
  }
  .pg-dark .section--light .faq-see-also__chips {
    display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
  }
  .pg-dark .section--light .faq-see-also__chip {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 18px; background: #fff;
    border: 1px solid rgba(0,0,0,0.10); border-radius: 50px;
    color: #1A1D23 !important; text-decoration: none;
    font-size: 13px; font-weight: 600;
    transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .pg-dark .section--light .faq-see-also__chip:hover {
    border-color: rgba(255,186,26,0.55);
    color: #D4960A !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.08);
  }
  .pg-dark .section--light .faq-see-also__chip i { color: #6E7884; font-size: 12px; }
  .pg-dark .section--light .faq-see-also__chip:hover i { color: #ffba1a; }
  .pg-dark .section--light .faq-see-also__chip--gold {
    background: linear-gradient(135deg, rgba(255,186,26,0.10), rgba(255,202,74,0.05)) !important;
    border-color: rgba(255,186,26,0.40) !important;
    color: #D4960A !important;
  }
  .pg-dark .section--light .faq-see-also__chip--gold i { color: #D4960A; }
  /* CTA banner pós-FAQ, hover discreto */
  .pg-dark .section--light .faq-cta {
    transition: all 0.25s;
  }
  .pg-dark .section--light .faq-cta:hover {
    border-color: rgba(255,186,26,0.55);
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(0,0,0,0.15);
  }
</style>
`;

// ─────────────────────────────────────────────────────────────────────────────
// FACTORY
// ─────────────────────────────────────────────────────────────────────────────

export function buildModulePageHTML(d: PageData): string {
  // Bloco 1.5 (opcional): integrações entre agentes
  const integrationCards = d.integrations
    ? d.integrations.items.map(i => `
    <article class="agent-card" style="text-align:left;">
      <div class="agent-card__icon" style="background:linear-gradient(135deg,#ffba1a,#ffca4a);"><i class="fa-solid fa-link"></i></div>
      <h3 style="font-size:0.98rem;">${i.partner}</h3>
      <p>→ ${i.benefit}</p>
    </article>`).join('')
    : '';

  const integrationsSection = d.integrations ? `
<section class="section-padded section-dark-soft" id="integracoes" style="padding:80px 0;">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-badge section-badge--gold">${d.integrations.badge}</span>
      <h2>${d.integrations.h2Pre} <span class="highlight">${d.integrations.h2Highlight}</span> ${d.integrations.h2Post}</h2>
      <p>${d.integrations.intro}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-top:48px;">
      ${integrationCards}
    </div>
  </div>
</section>
` : '';

  // Bloco 1: 8 funcionalidades
  const funcCards = d.funcs.map(f => `
    <article class="agent-card">
      <div class="agent-card__icon"><i class="fa-solid ${f.icon}"></i></div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </article>`).join('');

  // Bloco 2: cenários
  const scenarioCards = d.scenarios.map(s => `
    <article class="segment-card">
      <span class="section-badge section-badge--gold">${s.tag}</span>
      <h3>${s.title}</h3>
      <p>${s.body}</p>
    </article>`).join('');

  // Bloco 3: depoimentos textuais
  const testiCards = d.testimonials.map(t => `
    <div class="testi-card">
      <p class="testi-quote">${t.quote}</p>
      <div class="testi-author">
        <div class="testi-avatar">${t.initials}</div>
        <div class="testi-info">
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    </div>`).join('');

  // Bloco 4: FAQ, com auto-link interno nas respostas
  const selfUrl = d.currentSlug
    ? `/${d.isModule ? 'modulos' : 'agentes'}/${d.currentSlug}`
    : undefined;
  const faqItems = d.faqs.map((f, i) => `
    <details class="faq-item"${i === 0 ? ' open' : ''}>
      <summary>${f.q}</summary>
      <div class="faq-item__answer"><p>${autolinkFaqAnswer(f.a, selfUrl)}</p></div>
    </details>`).join('');

  // Bloco 5: blog (do articles.json real)
  const articles = (articlesData as Article[]);
  const relatedBlog = d.relatedBlogSlugs
    .map(slug => articles.find(a => a.slug === slug))
    .filter((a): a is Article => Boolean(a));

  const blogCards = relatedBlog.map(a => {
    const img = a.cover_url || '/images/og-image.png';
    const label = CATEGORY_LABEL[a.category] || a.category || 'Artigo';
    const t = a.title.replace(/"/g, '&quot;');
    return `
    <a href="/blog/${a.slug}" class="knowledge-card">
      <div class="knowledge-card__image">
        <img src="${img}" alt="${t}" width="400" height="250" loading="lazy">
        <span class="knowledge-card__type"><i class="fas fa-file-alt"></i> ${label}</span>
      </div>
      <div class="knowledge-card__body">
        <h4>${a.title}</h4>
        <span class="knowledge-card__link">Ler artigo</span>
      </div>
    </a>`;
  }).join('');

  // Bloco 7: CROSS-LINKING, carrossel 3D com os agentes (mesma gallery3d da home)
  //                          + grid pequeno de módulos abaixo
  // Em /agentes/<X>, exclui o próprio X (11 agentes). Em /modulos/<X>, mostra todos os 12.
  const galleryAgents = d.isModule
    ? ALL_AGENTS
    : ALL_AGENTS.filter(a => a.slug !== d.currentSlug);
  const galleryCards = galleryAgents.map(a => `
    <div class="gallery3d__card">
      <a href="/agentes/${a.slug}">
        <img src="${a.img}" alt="${a.name}" width="512" height="686" loading="lazy" decoding="async">
        <div class="gallery3d__info">
          <div class="gallery3d__icon"><i class="fa-solid ${a.icon}"></i></div>
          <h3>${a.name}</h3>
          <p>${a.tagline}</p>
          <span class="gallery3d__link">Saiba mais <i class="fas fa-arrow-right"></i></span>
        </div>
      </a>
    </div>`).join('');

  // Cards de módulos no estilo Cenários (.segment-card em .section--light)
  const otherModules = ALL_MODULES.filter(m => m.slug !== d.currentSlug);
  const moduleSegmentCards = otherModules.map(m => {
    const copy = MODULE_COPY[m.slug];
    if (!copy) return '';
    return `
    <a href="/modulos/${m.slug}" class="segment-card mod-segment-card" style="text-decoration:none;display:block;">
      <span class="section-badge section-badge--gold" style="margin-bottom:18px;">${copy.tag}</span>
      <h3>${copy.title}</h3>
      <p>${copy.body}</p>
      <span class="mod-segment-card__link">Ver módulo <i class="fa-solid fa-arrow-right"></i></span>
    </a>`;
  }).join('');

  const crossLinkingSection = `
<!-- §5.5 CROSS-LINKING, gallery3d (12 agentes) + chips módulos (dark) -->
<section class="section-padded section-dark" id="explorar" style="padding:90px 0 70px;position:relative;overflow:hidden;">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-badge section-badge--gold">Time Olívia completo</span>
      <h2>Continue explorando o <span class="highlight">resto do time</span></h2>
      <p>${d.isModule
        ? 'Os 12 agentes que operam a gestão da sua empresa, coordenados pela Olívia.'
        : 'Os outros agentes do time e os módulos operacionais da plataforma.'}</p>
    </div>
  </div>

  <div class="gallery3d" id="gallery3d-cross">
    <button class="gallery3d__arrow gallery3d__arrow--prev" id="gallery3d-cross-prev" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>
    <button class="gallery3d__arrow gallery3d__arrow--next" id="gallery3d-cross-next" aria-label="Próximo"><i class="fas fa-chevron-right"></i></button>
    <div class="gallery3d__track" id="gallery3d-cross-track">
      ${galleryCards}
    </div>
  </div>

  <div class="container" style="text-align:center;margin-top:60px;">
    <a href="/agentes-de-ia" style="display:inline-flex;align-items:center;gap:8px;padding:14px 30px;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.35);color:#ffba1a;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;">Ver visão geral do Time Olívia <i class="fa-solid fa-arrow-right"></i></a>
  </div>
</section>

<!-- §5.6 MÓDULOS DA PLATAFORMA (light, estilo Cenários) -->
<section class="section--light section-padded" id="modulos-related" style="padding:80px 0;">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-badge section-badge--gold">${d.isModule ? '3 outros módulos da plataforma' : '4 módulos da plataforma'}</span>
      <h2>Os módulos que <span class="highlight">conectam tudo</span></h2>
      <p>Módulos operacionais que conversam nativamente com os agentes do Time Olívia.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:48px;">
      ${moduleSegmentCards}
    </div>
  </div>
</section>

<script>
// Init gallery3d (clone do init da home, IDs próprios pra não conflitar)
(function(){
  var track = document.getElementById('gallery3d-cross-track');
  if (!track) return;
  var cards = track.querySelectorAll('.gallery3d__card');
  var n = cards.length;
  var step = 360 / n;
  var rotation = 0;
  var isDragging = false, dragStartX = 0, rotStart = 0, dragDelta = 0;
  function getRadius() {
    var w = window.innerWidth;
    if (w < 480) return 380;
    if (w < 768) return 480;
    return 620;
  }
  function updateCards() {
    var R = getRadius();
    var totalRot = ((rotation % 360) + 360) % 360;
    for (var i = 0; i < n; i++) {
      var itemAngle = i * step;
      cards[i].style.transform = 'rotateY(' + itemAngle + 'deg) translateZ(' + R + 'px)';
      var relAngle = ((itemAngle + totalRot + 360) % 360);
      var normAngle = relAngle > 180 ? 360 - relAngle : relAngle;
      var opacity = normAngle < 60 ? 1 : Math.max(0.25, 1 - ((normAngle - 60) / 120));
      cards[i].style.opacity = opacity;
    }
    track.style.transform = 'rotateY(' + rotation + 'deg)';
  }
  function animate() {
    if (!isDragging) rotation += 0.08;
    updateCards();
    requestAnimationFrame(animate);
  }
  var gallery = document.getElementById('gallery3d-cross');
  gallery.addEventListener('pointerdown', function(e) {
    isDragging = true; dragStartX = e.clientX; rotStart = rotation; dragDelta = 0; e.preventDefault();
  });
  window.addEventListener('pointermove', function(e) {
    if (!isDragging) return;
    dragDelta = e.clientX - dragStartX;
    rotation = rotStart + dragDelta * 0.25;
  });
  window.addEventListener('pointerup', function() { isDragging = false; });
  track.addEventListener('click', function(e) { if (Math.abs(dragDelta) > 8) e.preventDefault(); }, true);
  var prev = document.getElementById('gallery3d-cross-prev');
  var next = document.getElementById('gallery3d-cross-next');
  if (prev) prev.addEventListener('click', function() { rotation += step; });
  if (next) next.addEventListener('click', function() { rotation -= step; });
  var touchStartX = 0;
  gallery.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  gallery.addEventListener('touchend', function(e) {
    var diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) rotation += diff > 0 ? step : -step;
  }, { passive: true });
  animate();
})();
</script>
`;

  // Bloco 6: vídeos (constante)
  const videoCards = DEPO_VIDEOS.map(v => `
    <div class="depo-card">
      <div class="depo-card__video">
        <iframe src="https://player.vimeo.com/video/${v.id}?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>
      </div>
      <div class="depo-card__info"><h3>${v.name}</h3><p>${v.role}</p></div>
    </div>`).join('');

  return `
${WRAPPER_STYLE}
<div class="pg-dark">

<!-- §0 HERO -->
<section class="hero-zoom" id="hero">
  <div class="hero-zoom__bg-image"></div>
  <div class="hero-zoom__bg">
    <div class="hero-zoom__glow hero-zoom__glow--1"></div>
    <div class="hero-zoom__glow hero-zoom__glow--2"></div>
  </div>
  <div class="container">
    <div class="hero-zoom__header">
      <span class="hero-zoom__badge">${d.pill}</span>
      <h1 class="hero-zoom__title">
        ${d.h1Pre} <span class="hero-zoom__title-highlight">${d.h1Highlight}</span>${d.h1Post || ''}
      </h1>
      <p class="hero-zoom__subtitle">${d.subtitle}</p>
      <div class="hero-zoom__ctas">
        <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary btn-lg hero-cta-glow">${d.heroCtaPrimary}</a>
        <a href="#funcionalidades" class="btn btn-ghost btn-lg">${d.heroCtaSecondary} <i class="fas fa-arrow-down"></i></a>
      </div>
      <p class="hero-zoom__note">${d.heroNote}</p>
      <div class="hero-zoom__credentials">
        <div class="hero-zoom__credential"><strong>${d.heroCredentials[0].strong}</strong><span>${d.heroCredentials[0].label}</span></div>
        <div class="hero-zoom__credential-divider"></div>
        <div class="hero-zoom__credential"><strong>${d.heroCredentials[1].strong}</strong><span>${d.heroCredentials[1].label}</span></div>
        <div class="hero-zoom__credential-divider"></div>
        <div class="hero-zoom__credential"><strong>${d.heroCredentials[2].strong}</strong><span>${d.heroCredentials[2].label}</span></div>
      </div>
    </div>
  </div>
</section>

<hr class="glow-divider">

<!-- §1 FUNCIONALIDADES (dark) -->
<section class="section-padded section-dark" id="funcionalidades" style="padding:80px 0;">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-badge section-badge--gold">${d.funcsBadge}</span>
      <h2>${d.funcsH2Pre} <span class="highlight">${d.funcsH2Highlight}</span> ${d.funcsH2Post}</h2>
      <p>${d.funcsIntro}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin-top:48px;">
      ${funcCards}
    </div>
  </div>
</section>

${integrationsSection}
<!-- §2 CENÁRIOS (light) -->
<section class="section--light section-padded" id="cenarios" style="padding:80px 0;">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-badge section-badge--gold">${d.scenariosBadge}</span>
      <h2>${d.scenariosH2Pre} <span class="highlight">${d.scenariosH2Highlight}</span> ${d.scenariosH2Post}</h2>
      <p>${d.scenariosIntro}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:48px;">
      ${scenarioCards}
    </div>
  </div>
</section>

<!-- §3 DEPOIMENTOS TEXTUAIS (dark soft) -->
<section class="testi-section section-dark-soft" id="depoimentos" style="padding:80px 0;">
  <div class="container">
    <div class="testi-header" data-reveal>
      <div class="testi-badge">Depoimentos</div>
      <h2>${d.testiH2}</h2>
      <p>${d.testiIntro}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:48px;">
      ${testiCards}
    </div>
  </div>
</section>

<!-- §4 FAQ (light) com auto-link + CTA -->
<section class="faq-section section--light" id="faq" style="padding:80px 0;">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-badge section-badge--gold">${d.faqBadge}</span>
      <h2>${d.faqH2}</h2>
      <p>${d.faqIntro}</p>
    </div>
    <div class="faq-list" style="max-width:840px;margin:48px auto 0;">
      ${faqItems}
    </div>

    <!-- VEJA TAMBÉM: cross-link garantido em toda página, derivado das
         integrações do agente/módulo (ou fallback pros 4 mais relevantes) -->
    ${(() => {
      // Para agentes, deriva dos parceiros das integrações. Para módulos, usa 4 agentes-âncora.
      const relatedSlugs = d.integrations
        ? d.integrations.items
            .map(i => {
              const partner = i.partner.split('+').pop()?.trim().toLowerCase() || '';
              // Mapeia nome do parceiro (último termo) pro slug
              const map: Record<string, string> = {
                'estratégico': 'estrategico', 'estrategico': 'estrategico',
                'processos': 'processos', 'pessoas': 'pessoas',
                'indicadores': 'indicadores', 'riscos': 'riscos',
                'treinamento': 'treinamento', 'oportunidades': 'oportunidades',
                'documentos': 'documentos', 'comercial': 'comercial',
                'problemas': 'problemas-operacionais',
                'reuniões': 'reunioes', 'reunioes': 'reunioes',
                'pesquisas': 'pesquisas',
                'r&s': 'recrutamento-selecao',
                'financeiro': 'financeiro',
                'projetos': 'projetos', 'compras': 'compras',
              };
              return map[partner] || '';
            })
            .filter(Boolean)
        : ['estrategico', 'processos', 'indicadores', 'comercial']; // fallback pros módulos
      const isAgent = (s: string) => ALL_AGENTS.some(a => a.slug === s);
      const chips = relatedSlugs.slice(0, 5).map(slug => {
        const isA = isAgent(slug);
        const ref = isA ? ALL_AGENTS.find(a => a.slug === slug) : ALL_MODULES.find(m => m.slug === slug);
        if (!ref) return '';
        const url = `/${isA ? 'agentes' : 'modulos'}/${slug}`;
        return `<a href="${url}" class="faq-see-also__chip"><i class="fa-solid ${ref.icon}"></i> ${ref.name}</a>`;
      }).join('');
      // Sempre inclui a pillar como última pílula
      const pillarChip = `<a href="/agentes-de-ia" class="faq-see-also__chip faq-see-also__chip--gold"><i class="fa-solid fa-robot"></i> Time Olívia</a>`;
      return `
      <div class="faq-see-also" style="max-width:840px;margin:36px auto 0;text-align:center;">
        <p class="faq-see-also__label">Veja também</p>
        <div class="faq-see-also__chips">
          ${chips}
          ${pillarChip}
        </div>
      </div>`;
    })()}

    <!-- CTA banner pós-FAQ: capta intenção mid-research -->
    <div class="faq-cta" style="max-width:840px;margin:36px auto 0;display:flex;align-items:center;gap:24px;padding:28px 32px;background:linear-gradient(135deg,#0D1117,#161B22);border:1px solid rgba(255,186,26,0.30);border-radius:18px;color:#fff;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:18px;flex:1;min-width:240px;">
        <div style="width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,#ffba1a,#ffca4a);color:#0D1117;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:0 8px 20px rgba(255,186,26,0.35);"><i class="fa-solid fa-comments"></i></div>
        <div>
          <h4 style="color:#fff;font-size:18px;font-weight:700;margin:0 0 4px;line-height:1.3;">Não achou a resposta?</h4>
          <p style="color:#C9D1D9;font-size:14px;margin:0;">Converse com a Olívia agora, 2 min, sem compromisso.</p>
        </div>
      </div>
      <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary" style="flex-shrink:0;">Falar com a Olívia <i class="fa-solid fa-arrow-right" style="margin-left:6px;"></i></a>
    </div>
  </div>
</section>

<!-- §4.5 VÍDEOS DE DEPOIMENTOS (dark), quebra dois claros em sequência -->
<section class="depo-section" id="videos" style="padding:80px 20px;background:linear-gradient(180deg,#0D1117 0%,#161B22 100%);position:relative;overflow:hidden;">
  <div class="container" style="text-align:center;margin-bottom:48px;">
    <span class="section-badge section-badge--gold" style="margin-bottom:18px;">Quem já usa</span>
    <h2 style="color:#fff;line-height:1.15;letter-spacing:-0.02em;">Empresários que viram o <span class="highlight">Orbit transformar</span> a operação</h2>
    <p style="color:#C9D1D9;max-width:680px;margin:14px auto 0;">Quatro consultorias brasileiras contam, em primeira pessoa, o que mudou depois de implantar a Orbit.</p>
  </div>
  <div class="depo-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-width:1200px;margin:0 auto;">
    ${videoCards}
  </div>
  <div style="text-align:center;margin-top:36px;">
    <a href="/historias" style="display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:rgba(255,186,26,0.10);border:1px solid rgba(255,186,26,0.30);color:#ffba1a;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;transition:all 0.2s;">Ver todas as histórias de clientes <i class="fa-solid fa-arrow-right"></i></a>
  </div>
  <style>
    .depo-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; overflow:hidden; transition:all 0.25s; }
    .depo-card:hover { border-color:rgba(255,186,26,0.45); transform:translateY(-3px); box-shadow:0 12px 28px rgba(0,0,0,0.40); }
    .depo-card__video { aspect-ratio:9/16; width:100%; background:#000; display:block; }
    .depo-card__video iframe { width:100%; height:100%; border:0; display:block; }
    .depo-card__info { padding:14px 16px 16px; border-top:1px solid rgba(255,255,255,0.08); }
    .depo-card__info h3 { color:#fff; font-size:0.95rem; font-weight:700; margin:0 0 3px; letter-spacing:-0.005em; }
    .depo-card__info p { color:#ffba1a; font-size:12px; font-weight:600; margin:0; letter-spacing:0.3px; }
    @media (max-width:1024px) { .depo-grid { grid-template-columns:repeat(2,1fr) !important; } }
    @media (max-width:560px) { .depo-grid { grid-template-columns:1fr !important; max-width:340px; } }
  </style>
</section>

<!-- §5 CONTEÚDO BLOG (light), articles.json real -->
<section class="knowledge-section section--light" id="conteudo">
  <div class="container">
    <div class="section-header" data-reveal>
      <h2>Amplie seus <span class="highlight">conhecimentos</span></h2>
      <p style="margin-top:8px;font-size:0.95rem;">${d.knowledgeIntro}</p>
    </div>
    <div class="knowledge-grid">
      ${blogCards}
    </div>
    <div style="text-align:center;margin-top:36px;">
      <a href="/blog" class="btn btn-dark btn-lg">Ver todos os artigos</a>
    </div>
  </div>
</section>

${crossLinkingSection}
<!-- §6 CTA FINAL (dark) -->
<section class="cta-section section-dark" style="padding:100px 0;text-align:center;">
  <div class="container">
    <div class="section-header" data-reveal style="max-width:760px;margin:0 auto;">
      <span class="hero-zoom__badge">${d.ctaBadge}</span>
      <h2>${d.ctaH2Pre} <span class="highlight">${d.ctaH2Highlight}</span> ${d.ctaH2Post}</h2>
      <p>${d.ctaIntro}</p>
    </div>
    <div style="margin-top:36px;">
      <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary btn-lg hero-cta-glow">${d.ctaButton}</a>
    </div>
  </div>
</section>

</div>
`;
}
