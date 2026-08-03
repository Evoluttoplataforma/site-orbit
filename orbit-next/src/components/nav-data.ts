/**
 * FONTE ÚNICA da navegação do site.
 *
 * Antes, `shared-header.ts` tinha os dois menus escritos à mão — desktop e mobile —
 * no mesmo arquivo. Cada item novo precisava ser escrito duas vezes, e o resultado
 * foi divergência silenciosa: o grupo "Para quem" (/empresarios, /consultores,
 * /programa) existia SÓ no desktop, a ordem dos 12 agentes era diferente, e rótulos,
 * ícones e traduções não batiam.
 *
 * Agora os dois menus são gerados daqui. Cada um mantém seu próprio layout — o
 * mega-menu do desktop continua com a estrutura que o CSS exige —, mas os DADOS
 * não podem mais divergir.
 *
 * AO ADICIONAR ITEM: edite só este arquivo. Se o item tem rótulo visível, dê a ele
 * uma chave `i18n` e adicione essa chave ao `i18nMap` de public/js/orbit-init.js,
 * senão ele fica em português no modo EN.
 *
 * ATENÇÃO — este arquivo NÃO é a única navegação do repositório, apenas a única que
 * vale. Existem duas cópias legadas fora de uso ou quebradas:
 *   - src/app/acesso/painel/html.ts (~2560) — header copiado à mão, aponta para
 *     /processos, /tarefas, /competencias, /auditorias, rotas que não existem mais
 *   - src/components/layout/Header.tsx — header React com next-intl, sem nenhum
 *     importador, alimentado por um nav.* paralelo em messages/pt.json
 * Não replique nada nelas.
 *
 * TEXTO: usar Unicode literal (ó, ·, •), nunca entidade HTML (&oacute;, &middot;).
 * O dicionário de tradução compara texto já decodificado, então entidade no dado
 * quebraria o match. O escape aplicado no render cobre só & < > " em atributos.
 */

export type NavVisibility = 'both' | 'desktop' | 'mobile';

export interface NavLink {
  href: string;
  label: string;
  icon: string;
  /** Sub-rótulo. No desktop vira <small>; no mobile, segunda linha do item. */
  sub?: string;
  /** Chave do i18nMap para o rótulo. Sem ela, o item fica em PT no modo EN. */
  i18n?: string;
  i18nSub?: string;
  /** Cor do ícone, quando precisa fugir do dourado padrão. */
  iconColor?: string;
  external?: boolean;
  /** Renderiza como .dd-subitem — item aninhado sob o anterior (ex.: /programa). */
  subitem?: boolean;
  visibility?: NavVisibility;
}

export interface NavGroup {
  /** Usado para gerar ids determinísticos de aria-controls. Nunca usar índice. */
  id: string;
  label: string;
  /** Destino do nível 1 no desktop. */
  href: string;
  i18n?: string;
  /** Ícone do grupo no menu mobile. */
  icon?: string;
  /** Bolinha pulsante de "ao vivo". */
  dot?: boolean;
}

export function isVisible(item: NavLink, target: 'desktop' | 'mobile'): boolean {
  const v = item.visibility ?? 'both';
  return v === 'both' || v === target;
}

// ─── Para quem ──────────────────────────────────────────────────────────────
export const GROUP_PARA_QUEM: NavGroup = {
  id: 'para-quem',
  label: 'Para quem',
  // Aponta para o primeiro item, seguindo o padrão dos outros níveis 1
  // (Conteúdo → /blog, Eventos → /live). Antes era a âncora #para-quem, que só
  // existe na home — fora dela o clique não levava a lugar nenhum.
  href: '/empresarios',
  i18n: 'nav.for_who',
  icon: 'fa-users-viewfinder',
};

export const PARA_QUEM: NavLink[] = [
  {
    href: '/empresarios',
    label: 'Empresários',
    sub: 'Time de IA para sua empresa',
    icon: 'fas fa-building',
    i18n: 'nav.businesses',
    i18nSub: 'nav.businesses.sub',
  },
  {
    href: '/consultores',
    label: 'Consultores',
    sub: 'Modelo de canais B2B2B',
    icon: 'fas fa-user-tie',
    i18n: 'nav.consultants',
    i18nSub: 'nav.consultants.sub',
  },
  {
    href: '/programa',
    label: 'Programa de Recompensa',
    sub: 'Programa Orbit de Crescimento e Reconhecimento',
    icon: 'fas fa-trophy',
    i18n: 'nav.program',
    i18nSub: 'nav.program.sub',
    subitem: true,
  },
];

// ─── Plataforma ─────────────────────────────────────────────────────────────
export const GROUP_PLATAFORMA: NavGroup = {
  id: 'plataforma',
  label: 'Plataforma',
  href: '/agentes-de-ia',
  i18n: 'nav.platform',
  icon: 'fa-robot',
};

/** Cabeçalho do bloco de agentes (mega-menu do desktop + item de topo no mobile). */
export const AGENTES_HEAD = {
  href: '/agentes-de-ia',
  label: 'Time Olívia · 12 agentes',
  sub: 'Visão geral · 30 anos de metodologia GSN',
  icon: 'fas fa-robot',
  i18n: 'nav.agents_head',
  i18nSub: 'nav.agents_head.sub',
};

/**
 * ORDEM IMPORTA: o mega-menu do desktop é um grid de 2 colunas preenchido por
 * linha, então reordenar este array muda o visual do desktop. Esta é a ordem que
 * já estava lá. O mobile passa a seguir a mesma.
 */
export const AGENTES: NavLink[] = [
  { href: '/agentes/estrategico', label: 'Estratégico', icon: 'fa-solid fa-compass', i18n: 'nav.ag.estrategico' },
  { href: '/agentes/riscos', label: 'Riscos', icon: 'fa-solid fa-shield-halved', i18n: 'nav.ag.riscos' },
  { href: '/agentes/processos', label: 'Processos', icon: 'fa-solid fa-diagram-project', i18n: 'nav.ag.processos' },
  { href: '/agentes/treinamento', label: 'Treinamento', icon: 'fa-solid fa-graduation-cap', i18n: 'nav.ag.treinamento' },
  { href: '/agentes/pessoas', label: 'Pessoas', icon: 'fa-solid fa-users', i18n: 'nav.ag.pessoas' },
  { href: '/agentes/oportunidades', label: 'Oportunidades', icon: 'fa-solid fa-lightbulb', i18n: 'nav.ag.oportunidades' },
  { href: '/agentes/indicadores', label: 'Indicadores', icon: 'fa-solid fa-chart-line', i18n: 'nav.ag.indicadores' },
  { href: '/agentes/documentos', label: 'Documentos', icon: 'fa-solid fa-folder-tree', i18n: 'nav.ag.documentos' },
  { href: '/agentes/comercial', label: 'Comercial', icon: 'fa-solid fa-code-branch', i18n: 'nav.ag.comercial' },
  { href: '/agentes/reunioes', label: 'Reuniões', icon: 'fa-solid fa-microphone-lines', i18n: 'nav.ag.reunioes' },
  // Desktop mostrava "Problemas" e mobile "Problemas Operacionais" — unificado.
  { href: '/agentes/problemas-operacionais', label: 'Problemas', icon: 'fa-solid fa-triangle-exclamation', i18n: 'nav.ag.problemas' },
  { href: '/agentes/pesquisas', label: 'Pesquisas', icon: 'fa-solid fa-clipboard-list', i18n: 'nav.ag.pesquisas' },
];

export const MODULOS_HEAD = {
  href: '/agentes-de-ia#modulos',
  label: 'Módulos da plataforma',
  sub: '4 módulos operacionais integrados',
  icon: 'fas fa-cubes',
  i18n: 'nav.modules_head',
  i18nSub: 'nav.modules_head.sub',
};

export const MODULOS: NavLink[] = [
  { href: '/modulos/financeiro', label: 'Financeiro', icon: 'fa-solid fa-building-columns', i18n: 'nav.mod.financeiro' },
  { href: '/modulos/recrutamento-selecao', label: 'Recrutamento e Seleção', icon: 'fa-solid fa-user-plus', i18n: 'nav.mod.recrutamento' },
  { href: '/modulos/projetos', label: 'Projetos', icon: 'fa-solid fa-chart-gantt', i18n: 'nav.mod.projetos' },
  { href: '/modulos/compras', label: 'Compras', icon: 'fa-solid fa-bag-shopping', i18n: 'nav.mod.compras' },
];

// ─── Conteúdo ───────────────────────────────────────────────────────────────
export const GROUP_CONTEUDO: NavGroup = {
  id: 'conteudo',
  label: 'Conteúdo',
  href: '/blog',
  i18n: 'nav.content',
  icon: 'fa-newspaper',
};

export const CONTEUDO: NavLink[] = [
  { href: '/blog', label: 'Blog', sub: 'Artigos e insights', icon: 'fas fa-newspaper', i18n: 'nav.blog', i18nSub: 'nav.blog.sub' },
  { href: '/historias', label: 'Histórias de Clientes', sub: 'Cases de sucesso', icon: 'fas fa-star', i18n: 'nav.stories', i18nSub: 'nav.stories.sub' },
];

// ─── Eventos ────────────────────────────────────────────────────────────────
export const GROUP_EVENTOS: NavGroup = {
  id: 'eventos',
  label: 'Eventos',
  href: '/live',
  i18n: 'nav.events',
  icon: 'fa-calendar-days',
  dot: true,
};

export const EVENTOS: NavLink[] = [
  {
    href: '/live',
    label: 'Live Orbit',
    sub: 'Próxima edição em breve',
    // Câmera azul nos dois menus: as sessões acontecem no Zoom. O play vermelho
    // do desktop remetia a YouTube, que não é mais o canal.
    icon: 'fa-solid fa-video',
    iconColor: '#2D8CFF',
    i18n: 'nav.ev.live',
    i18nSub: 'nav.ev.live.sub',
  },
  {
    href: '/live/chris',
    label: 'Masterclass Consultores',
    sub: 'Quinta 18h com Christian Hart',
    icon: 'fas fa-chalkboard-user',
    iconColor: '#ffba1a',
    i18n: 'nav.ev.masterclass',
    i18nSub: 'nav.ev.masterclass.sub',
  },
  {
    href: '/treinamentos',
    label: 'Treinamentos',
    sub: 'Tira dúvidas e treinamento ao vivo',
    icon: 'fas fa-chalkboard-teacher',
    iconColor: '#ffba1a',
    i18n: 'nav.ev.trainings',
    i18nSub: 'nav.ev.trainings.sub',
  },
  {
    href: 'https://demonstracao.orbitgestao.com.br/salas/onboarding',
    label: 'Onboarding',
    sub: 'Qua 9h/17h • Sex 14h',
    icon: 'fas fa-graduation-cap',
    iconColor: '#3FB950',
    external: true,
    i18n: 'nav.ev.onboarding',
    i18nSub: 'nav.ev.onboarding.sub',
  },
];

// ─── Empresa ────────────────────────────────────────────────────────────────
// No desktop é só um link de nível 1 para /sobre. No mobile o grupo ganha as
// páginas que não estavam em NENHUM dos dois menus.
export const GROUP_EMPRESA: NavGroup = {
  id: 'empresa',
  label: 'Empresa',
  href: '/sobre',
  i18n: 'nav.company',
  icon: 'fa-building',
};

export const EMPRESA: NavLink[] = [
  { href: '/sobre', label: 'Sobre Nós', sub: 'Quem constrói o Orbit', icon: 'fas fa-building', i18n: 'nav.about', i18nSub: 'nav.about.sub' },
  { href: '/faq', label: 'Perguntas Frequentes', icon: 'fas fa-circle-question', i18n: 'nav.faq', visibility: 'mobile' },
  { href: '/glossario', label: 'Glossário', icon: 'fas fa-book', i18n: 'nav.glossary', visibility: 'mobile' },
  { href: '/seguranca-ia', label: 'Segurança & IA', icon: 'fas fa-lock', i18n: 'nav.security', visibility: 'mobile' },
];

// ─── Ações e links soltos ───────────────────────────────────────────────────
export const NAV_ACTIONS = {
  login: { href: 'https://app.orbitgestao.com.br/login', label: 'Entrar', i18n: 'nav.login' },
  // Mesmo texto nos dois menus — o mobile mostrava "Conhecer o Time", sem "de IA".
  cta: { href: 'https://demonstracao.orbitgestao.com.br/chat', label: 'Conhecer o Time de IA', i18n: 'nav.cta' },
};

/** Itens que só o menu mobile tem, fora dos grupos. */
export const MOBILE_EXTRA: NavLink[] = [
  { href: '/', label: 'Início', icon: 'fas fa-home', i18n: 'nav.home' },
  { href: 'https://demonstracao.orbitgestao.com.br/chat', label: 'Fale Conosco', icon: 'fas fa-envelope', i18n: 'mobile.contact' },
];

/**
 * Ordem dos grupos no menu mobile. "Para quem" primeiro: é a decisão de entrada
 * (sou empresa ou consultoria?) e era justamente o que faltava.
 */
export const MOBILE_GROUPS: { group: NavGroup; items: NavLink[] }[] = [
  { group: GROUP_PARA_QUEM, items: PARA_QUEM },
  { group: GROUP_CONTEUDO, items: CONTEUDO },
  { group: GROUP_EVENTOS, items: EVENTOS },
  { group: GROUP_EMPRESA, items: EMPRESA },
];

/** Todas as chaves i18n usadas na navegação — consumido por scripts/check-i18n.mjs. */
export function allI18nKeys(): string[] {
  const keys = new Set<string>();
  const add = (k?: string) => { if (k) keys.add(k); };
  for (const g of [GROUP_PARA_QUEM, GROUP_PLATAFORMA, GROUP_CONTEUDO, GROUP_EVENTOS, GROUP_EMPRESA]) add(g.i18n);
  for (const arr of [PARA_QUEM, AGENTES, MODULOS, CONTEUDO, EVENTOS, EMPRESA, MOBILE_EXTRA]) {
    for (const it of arr) { add(it.i18n); add(it.i18nSub); }
  }
  for (const h of [AGENTES_HEAD, MODULOS_HEAD]) { add(h.i18n); add(h.i18nSub); }
  add(NAV_ACTIONS.login.i18n); add(NAV_ACTIONS.cta.i18n);
  return [...keys].sort();
}
