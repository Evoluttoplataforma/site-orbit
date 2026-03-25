// Shared header - auto-generated
export const headerHTML = `
    <!-- ═══ HEADER ═══ -->
    <header class="header">
        <div class="container">
            <div class="logo">
                <a href="/">
                    <img src="/images/logo-orbit-white.png" alt="Orbit Gestão" height="40">
                </a>
            </div>

            <ul class="nav-menu">
                <li>
                    <a href="#plataforma"><span data-i18n="nav.agents_menu">Agentes de IA</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
                    <div class="dropdown dropdown--lg">
                        <div class="dropdown__links">
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-chess-king"></i></div>
                                <div class="dd-text"><span>Estrategista</span><small>Planejamento estratégico</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-sitemap"></i></div>
                                <div class="dd-text"><span>Processos</span><small>Mapeamento e padronização</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-users"></i></div>
                                <div class="dd-text"><span>Pessoas</span><small>Cargos, avaliação e PDIs</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-graduation-cap"></i></div>
                                <div class="dd-text"><span>Treinamento</span><small>Microlearning via WhatsApp</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-chart-line"></i></div>
                                <div class="dd-text"><span>Indicadores</span><small>KPIs e causa raiz</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-magnifying-glass-chart"></i></div>
                                <div class="dd-text"><span>Pesquisa</span><small>Clima, NPS e insights</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-shield-halved"></i></div>
                                <div class="dd-text"><span>Riscos</span><small>Prevenção e mitigação</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-lightbulb"></i></div>
                                <div class="dd-text"><span>Oportunidades</span><small>Mercado e expansão</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-triangle-exclamation"></i></div>
                                <div class="dd-text"><span>Problemas</span><small>PDCA e causa raiz</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-file-lines"></i></div>
                                <div class="dd-text"><span>Documentos</span><small>Controle e versões</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-handshake"></i></div>
                                <div class="dd-text"><span>Vendas</span><small>CRM, funil e coaching</small></div>
                            </a>
                            <a href="/agentes" style="cursor:default;pointer-events:none;opacity:0.7;">
                                <div class="dd-icon"><i class="fas fa-video"></i></div>
                                <div class="dd-text"><span>Reuniões</span><small>Transcrição e atas</small></div>
                            </a>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#para-quem"><span data-i18n="nav.for_who">Para quem</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
                    <div class="dropdown dropdown--sm">
                        <div class="dropdown__links">
                            <a href="/empresarios">
                                <div class="dd-icon"><i class="fas fa-building"></i></div>
                                <div class="dd-text"><span data-i18n="nav.businesses">Empresários</span><small data-i18n="nav.businesses.sub">Time de IA para sua empresa</small></div>
                            </a>
                            <a href="/consultores">
                                <div class="dd-icon"><i class="fas fa-user-tie"></i></div>
                                <div class="dd-text"><span data-i18n="nav.consultants">Consultores</span><small data-i18n="nav.consultants.sub">Modelo de canais B2B2B</small></div>
                            </a>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="/blog"><span data-i18n="nav.content">Conteúdo</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
                    <div class="dropdown dropdown--sm">
                        <div class="dropdown__links">
                            <a href="/blog">
                                <div class="dd-icon"><i class="fas fa-newspaper"></i></div>
                                <div class="dd-text"><span data-i18n="nav.blog">Blog</span><small data-i18n="nav.blog.sub">Artigos e insights</small></div>
                            </a>
                            <a href="/historias">
                                <div class="dd-icon"><i class="fas fa-star"></i></div>
                                <div class="dd-text"><span data-i18n="nav.stories">Histórias de Clientes</span><small data-i18n="nav.stories.sub">Cases de sucesso</small></div>
                            </a>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="/sobre"><span data-i18n="nav.company">Empresa</span></a>
                </li>
            </ul>

            <div class="nav-actions">
                <a href="https://app.orbitgestao.com.br/" class="btn btn-outline" data-i18n="nav.login">Entrar</a>
                <a href="#contato-form" class="btn btn-primary" data-i18n="nav.cta">Conhecer o Time de IA</a>
            </div>

            <button class="lang-switch" onclick="switchLang()" aria-label="Change language">
                <span class="lang-switch__flag">🇺🇸</span>
                <span class="lang-switch__label">EN</span>
            </button>

            <button class="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- Mobile Menu -->
    <div class="mobile-menu-overlay" onclick="closeMobileMenu()"></div>
    <div class="mobile-menu">
        <div class="mobile-menu__header">
            <span class="mobile-menu__header-title" data-i18n="mobile.title">Menu</span>
            <button class="mobile-menu-close" onclick="closeMobileMenu()">&times;</button>
        </div>
        <div class="mobile-menu__body">
            <div class="mobile-menu__label" data-i18n="mobile.nav">Navegação</div>
            <a href="/"><i class="fas fa-home"></i> <span data-i18n="nav.home">Início</span></a>
            <a href="#contato-form" onclick="closeMobileMenu()"><i class="fas fa-envelope"></i> <span data-i18n="mobile.contact">Fale Conosco</span></a>
            <div class="mobile-menu__label">Agentes de IA</div>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-chess-king"></i> Estrategista</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-sitemap"></i> Processos</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-users"></i> Pessoas</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-graduation-cap"></i> Treinamento</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-chart-line"></i> Indicadores</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-magnifying-glass-chart"></i> Pesquisa</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-shield-halved"></i> Riscos</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-lightbulb"></i> Oportunidades</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-triangle-exclamation"></i> Problemas</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-file-lines"></i> Documentos</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-handshake"></i> Vendas</span>
            <span style="opacity:0.7;padding:12px 0;display:flex;align-items:center;gap:10px;"><i class="fas fa-video"></i> Reuniões</span>
            <div class="mobile-menu__label" data-i18n="mobile.content">Conteúdo</div>
            <a href="/blog"><i class="fas fa-newspaper"></i> Blog</a>
            <a href="/historias"><i class="fas fa-star"></i> Histórias de Clientes</a>
            <div class="mobile-menu__label" data-i18n="mobile.company">Empresa</div>
            <a href="/sobre"><i class="fas fa-building"></i> Sobre Nós</a>
        </div>
        <div class="mobile-menu__footer">
            <button class="lang-switch" onclick="switchLang()" aria-label="Change language">
                <span class="lang-switch__flag">🇺🇸</span>
                <span class="lang-switch__label">EN</span>
            </button>
            <a href="#contato-form" class="btn btn-primary" onclick="closeMobileMenu()" data-i18n="nav.cta">Conhecer o Time de IA</a>
        </div>
    </div>
`;
