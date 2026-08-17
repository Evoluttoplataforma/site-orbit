/**
 * Header compartilhado — gerado a partir de src/components/nav-data.ts.
 *
 * Os dois menus (desktop e mobile) saem do MESMO dado. Antes eram markup duplicado
 * à mão neste arquivo, e por isso divergiram: o grupo "Para quem" existia só no
 * desktop, a ordem dos agentes era outra, rótulos e ícones não batiam.
 *
 * Cada renderizador mantém seu layout. O desktop preserva a estrutura que o CSS
 * exige — mexer nela quebra blocos inteiros de orbit.css:
 *   - `.dropdown__links a` espera exatamente a > .dd-icon + .dd-text > (span+small)
 *   - o mega-menu NÃO usa `.dropdown__links`; se usasse, herdaria flex-column e as
 *     duas colunas morreriam
 *
 * Todo rótulo traduzível vive em <span data-i18n>/<small data-i18n> próprio, nunca
 * no <a> ou <button>: orbit-init.js faz `el.textContent = valor`, o que apagaria o
 * ícone irmão — e só no modo inglês.
 */

import {
  GROUP_PARA_QUEM, PARA_QUEM,
  GROUP_PLATAFORMA, AGENTES, AGENTES_HEAD, MODULOS, MODULOS_HEAD,
  GROUP_CONTEUDO, CONTEUDO,
  GROUP_EVENTOS, EVENTOS,
  GROUP_EMPRESA, EMPRESA, NAV_SECURITY,
  NAV_ACTIONS, MOBILE_EXTRA, MOBILE_GROUPS,
  isVisible,
  type NavLink, type NavGroup,
} from './nav-data';

/** Escapa só o necessário para atributo. Rótulos usam Unicode literal e não são escapados. */
function attr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function i18nAttr(key?: string): string {
  return key ? ` data-i18n="${attr(key)}"` : '';
}

function targetAttr(item: { external?: boolean }): string {
  return item.external ? ' target="_blank" rel="noopener"' : '';
}

// ═══════════════════════════════ DESKTOP ═══════════════════════════════

/** Item de dropdown padrão: a > .dd-icon + .dd-text > (span + small) */
function ddItem(item: NavLink): string {
  const cls = item.subitem ? ' class="dd-subitem"' : '';
  const color = item.iconColor ? ` style="color:${attr(item.iconColor)};"` : '';
  const small = item.sub ? `<small${i18nAttr(item.i18nSub)}>${item.sub}</small>` : '';
  return `<a href="${attr(item.href)}"${cls}${targetAttr(item)}>
                                <div class="dd-icon"><i class="${attr(item.icon)}"${color}></i></div>
                                <div class="dd-text"><span${i18nAttr(item.i18n)}>${item.label}</span>${small}</div>
                            </a>`;
}

function topLink(href: string, label: string, i18n?: string): string {
  return `                <li>
                    <a href="${attr(href)}"><span${i18nAttr(i18n)}>${label}</span></a>
                </li>`;
}

function ddGroup(group: NavGroup, items: NavLink[]): string {
  const visible = items.filter((i) => isVisible(i, 'desktop'));
  const dot = group.dot
    ? '<span class="nav-dot" aria-hidden="true"></span>'
    : '';
  return `                <li>
                    <a href="${attr(group.href)}">${dot}<span${i18nAttr(group.i18n)}>${group.label}</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
                    <div class="dropdown dropdown--sm">
                        <div class="dropdown__links">
                            ${visible.map(ddItem).join('\n                            ')}
                        </div>
                    </div>
                </li>`;
}

/** Linha do mega-menu. O rótulo vai em <span> para o data-i18n não apagar o ícone. */
function plRow(item: NavLink): string {
  return `<a href="${attr(item.href)}" class="pl-menu-row"><i class="${attr(item.icon)}"></i><span${i18nAttr(item.i18n)}>${item.label}</span></a>`;
}

function plHead(h: typeof AGENTES_HEAD): string {
  return `<a href="${attr(h.href)}" class="pl-menu-head">
                                    <div class="pl-hd-icon"><i class="${attr(h.icon)}"></i></div>
                                    <div class="pl-hd-text"><span${i18nAttr(h.i18n)}>${h.label}</span><small${i18nAttr(h.i18nSub)}>${h.sub}</small></div>
                                </a>`;
}

const desktopMenu = `            <ul class="nav-menu">
${ddGroup(GROUP_PARA_QUEM, PARA_QUEM)}
                <li>
                    <a href="${attr(GROUP_PLATAFORMA.href)}"><span${i18nAttr(GROUP_PLATAFORMA.i18n)}>${GROUP_PLATAFORMA.label}</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
                    <!-- Mega-menu compacto: 12 agentes em 2 sub-colunas + 4 módulos -->
                    <div class="dropdown dropdown--sm" style="width:880px;max-width:94vw;">
                        <style>
                          .pl-menu-row { display:flex; align-items:center; gap:10px; padding:8px 14px; color:#1A1D23; text-decoration:none; border-radius:8px; transition:background .15s; font-size:13px; font-weight:500; }
                          .pl-menu-row:hover { background:rgba(255,186,26,0.08); color:#1A1D23; }
                          .pl-menu-row i { color:#6E7884; font-size:13px; width:16px; text-align:center; }
                          .pl-menu-row:hover i { color:#ffba1a; }
                          .pl-menu-head { display:flex; align-items:center; gap:10px; padding:14px 14px 10px; color:#1A1D23; text-decoration:none; border-bottom:1px solid rgba(0,0,0,0.06); margin-bottom:6px; }
                          .pl-menu-head:hover { background:transparent; color:#1A1D23; }
                          .pl-menu-head .pl-hd-icon { width:32px; height:32px; border-radius:8px; background:linear-gradient(135deg,#ffba1a,#ffca4a); display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; flex-shrink:0; }
                          .pl-menu-head .pl-hd-text { display:flex; flex-direction:column; line-height:1.3; }
                          .pl-menu-head .pl-hd-text span { font-weight:700; font-size:13px; color:#1A1D23; }
                          .pl-menu-head .pl-hd-text small { font-size:11px; color:#6E7884; }
                          .pl-menu-foot { padding:10px 14px; border-top:1px solid rgba(0,0,0,0.06); }
                          .pl-menu-foot a { color:#ffba1a; font-size:12px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:6px; }
                        </style>
                        <div style="display:grid;grid-template-columns:1.4fr 1fr;padding:0;gap:0;">
                            <!-- BLOCO 1: 12 AGENTES (em 2 sub-colunas) -->
                            <div style="border-right:1px solid rgba(0,0,0,0.06);padding:0 8px 8px;">
                                ${plHead(AGENTES_HEAD)}
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;padding:0 6px;">
                                    ${AGENTES.map(plRow).join('\n                                    ')}
                                </div>
                                <div class="pl-menu-foot"><a href="/agentes-de-ia"><span data-i18n="nav.agents_all">Ver visão geral do Time Olívia</span> <i class="fa-solid fa-arrow-right"></i></a></div>
                            </div>
                            <!-- BLOCO 2: 4 MÓDULOS -->
                            <div style="padding:0 8px 8px;">
                                ${plHead(MODULOS_HEAD)}
                                <div style="padding:0 6px;">
                                    ${MODULOS.map(plRow).join('\n                                    ')}
                                </div>
                                <div class="pl-menu-foot"><a href="/agentes-de-ia#modulos"><span data-i18n="nav.modules_all">Ver todos os módulos</span> <i class="fa-solid fa-arrow-right"></i></a></div>
                            </div>
                        </div>
                    </div>
                </li>
${ddGroup(GROUP_CONTEUDO, CONTEUDO)}
${ddGroup(GROUP_EVENTOS, EVENTOS)}
${topLink(GROUP_EMPRESA.href, GROUP_EMPRESA.label, GROUP_EMPRESA.i18n)}
${topLink(NAV_SECURITY.href, NAV_SECURITY.label, NAV_SECURITY.i18n)}
            </ul>`;

// ═══════════════════════════════ MOBILE ════════════════════════════════

/** Item do menu mobile. O texto vai em wrapper próprio para o sub-rótulo cair embaixo. */
function mmItem(item: NavLink): string {
  const color = item.iconColor ? ` style="color:${attr(item.iconColor)};"` : '';
  const small = item.sub ? `<small${i18nAttr(item.i18nSub)}>${item.sub}</small>` : '';
  return `<a href="${attr(item.href)}"${targetAttr(item)}><i class="${attr(item.icon)}"${color}></i><span class="mm-txt"><span${i18nAttr(item.i18n)}>${item.label}</span>${small}</span></a>`;
}

/**
 * Grupo do mobile como acordeão. O cabeçalho é <button>, não <a>: main-v2.js fecha
 * o menu em qualquer clique em `.mobile-menu a`, então um cabeçalho navegável
 * fecharia o menu ao tentar expandir. O destino do grupo já é o primeiro item.
 *
 * `data-nav-group` e o id de `aria-controls` vêm de NavGroup.id — determinístico,
 * nunca por índice: headerHTML é interpolado dentro de outras strings em
 * blog/page.tsx e glossario/page.tsx, e ids por índice poderiam colidir.
 */
function mmGroup(group: NavGroup, items: NavLink[]): string {
  const visible = items.filter((i) => isVisible(i, 'mobile'));
  const id = `mnav-${group.id}`;
  const dot = group.dot ? '<span class="nav-dot" aria-hidden="true"></span>' : '';
  return `            <div class="mobile-menu__dropdown" data-nav-group="${attr(group.id)}">
                <button class="mobile-menu__dropdown-toggle" type="button" aria-expanded="false" aria-controls="${id}">
                    <span>${dot}<i class="fas ${attr(group.icon || 'fa-circle')}"></i><span${i18nAttr(group.i18n)}>${group.label}</span></span>
                    <i class="fas fa-chevron-down mobile-menu__dropdown-arrow" aria-hidden="true"></i>
                </button>
                <div class="mobile-menu__dropdown-items" id="${id}">
                    ${visible.map(mmItem).join('\n                    ')}
                </div>
            </div>`;
}

const mobileMenu = `        <div class="mobile-menu__body">
            <div class="mobile-menu__label" data-i18n="mobile.nav">Navegação</div>
            ${MOBILE_EXTRA.map(mmItem).join('\n            ')}

            <!-- Plataforma: link de visão geral + 2 acordeões -->
            <div class="mobile-menu__label mobile-menu__label--accent" data-i18n="nav.platform">Plataforma</div>
            ${mmItem({ href: AGENTES_HEAD.href, label: AGENTES_HEAD.label, icon: AGENTES_HEAD.icon, iconColor: '#ffba1a', i18n: AGENTES_HEAD.i18n })}

            <div class="mobile-menu__dropdown" data-nav-group="agentes">
                <button class="mobile-menu__dropdown-toggle" type="button" aria-expanded="false" aria-controls="mnav-agentes">
                    <span><i class="fas fa-list"></i><span data-i18n="nav.agents_list">Os 12 agentes</span></span>
                    <i class="fas fa-chevron-down mobile-menu__dropdown-arrow" aria-hidden="true"></i>
                </button>
                <div class="mobile-menu__dropdown-items" id="mnav-agentes">
                    ${AGENTES.map(mmItem).join('\n                    ')}
                </div>
            </div>

            <div class="mobile-menu__dropdown" data-nav-group="modulos">
                <button class="mobile-menu__dropdown-toggle" type="button" aria-expanded="false" aria-controls="mnav-modulos">
                    <span><i class="fas fa-cubes"></i><span data-i18n="nav.modules_list">Os 4 módulos</span></span>
                    <i class="fas fa-chevron-down mobile-menu__dropdown-arrow" aria-hidden="true"></i>
                </button>
                <div class="mobile-menu__dropdown-items" id="mnav-modulos">
                    ${MODULOS.map(mmItem).join('\n                    ')}
                </div>
            </div>

            <div class="mobile-menu__label" data-i18n="mobile.sections">Seções</div>
${MOBILE_GROUPS.map(({ group, items }) => mmGroup(group, items)).join('\n')}
        </div>`;

// ═══════════════════════════════ HEADER ════════════════════════════════

export const headerHTML = `
    <!-- ═══ HEADER ═══ -->
    <header class="header">
        <div class="container">
            <div class="logo">
                <a href="/">
                    <img src="/images/logo-orbit-white.png" alt="Orbit Gestão" height="40">
                </a>
            </div>

${desktopMenu}

            <div class="nav-actions">
                <a href="${attr(NAV_ACTIONS.login.href)}" class="btn btn-outline" data-i18n="${NAV_ACTIONS.login.i18n}">${NAV_ACTIONS.login.label}</a>
                <a href="${attr(NAV_ACTIONS.cta.href)}" class="btn btn-primary" data-i18n="${NAV_ACTIONS.cta.i18n}">${NAV_ACTIONS.cta.label}</a>
            </div>

            <button class="lang-switch" aria-label="Change language">
                <span class="lang-switch__flag">🇧🇷</span>
                <span class="lang-switch__label">PT</span>
            </button>

            <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobileMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- Mobile Menu -->
    <div class="mobile-menu-overlay"></div>
    <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
        <div class="mobile-menu__header">
            <span class="mobile-menu__header-title" data-i18n="mobile.title">Menu</span>
            <button class="mobile-menu-close" type="button" aria-label="Fechar menu">&times;</button>
        </div>
${mobileMenu}
        <div class="mobile-menu__footer">
            <a href="${attr(NAV_ACTIONS.login.href)}" class="btn btn-outline" data-i18n="${NAV_ACTIONS.login.i18n}" style="flex:1;text-align:center;color:#fff;border-color:rgba(255,255,255,0.4);">${NAV_ACTIONS.login.label}</a>
            <a href="${attr(NAV_ACTIONS.cta.href)}" class="btn btn-primary" data-i18n="${NAV_ACTIONS.cta.i18n}" style="flex:1;text-align:center;">${NAV_ACTIONS.cta.label}</a>
        </div>
    </div>

`;
