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
                    <a href="/agentes"><span data-i18n="nav.agents_menu">Agentes de IA</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
                    <div class="dropdown dropdown--sm">
                        <div class="dropdown__links">
                            <a href="/agentes">
                                <div class="dd-icon"><i class="fas fa-robot"></i></div>
                                <div class="dd-text"><span>Todos os Agentes</span><small>Conheça os 12 especialistas</small></div>
                            </a>
                            <a href="/agentes/estrategista">
                                <div class="dd-icon"><i class="fas fa-compass"></i></div>
                                <div class="dd-text"><span>Agente Estratégico</span><small>Planejamento e execução estratégica</small></div>
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
                <li><a href="/preco" data-i18n="nav.plans">Planos</a></li>
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
                    <a href="/sobre"><span data-i18n="nav.company">Empresa</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
                    <div class="dropdown dropdown--sm">
                        <div class="dropdown__links">
                            <a href="/sobre">
                                <div class="dd-icon"><i class="fas fa-building"></i></div>
                                <div class="dd-text"><span data-i18n="nav.about">Sobre Nós</span><small data-i18n="nav.about.sub">30 anos de história</small></div>
                            </a>
                            <a href="/parcerias">
                                <div class="dd-icon"><i class="fas fa-handshake"></i></div>
                                <div class="dd-text"><span data-i18n="nav.partners">Seja Parceiro</span><small data-i18n="nav.partners.sub">Programa de canais</small></div>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="nav-actions">
                <a href="/acesso" class="btn btn-outline" data-i18n="nav.login">Entrar</a>
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
            <a href="/preco"><i class="fas fa-tag"></i> <span data-i18n="mobile.plans">Planos e Preços</span></a>
            <a href="#contato-form" onclick="closeMobileMenu()"><i class="fas fa-envelope"></i> <span data-i18n="mobile.contact">Fale Conosco</span></a>
            <div class="mobile-menu__label" data-i18n="mobile.platform">Plataforma</div>
            <a href="/agentes"><i class="fas fa-robot"></i> Agentes de IA</a>
            <a href="/processos"><i class="fas fa-sitemap"></i> Processos</a>
            <a href="/indicadores"><i class="fas fa-chart-line"></i> Indicadores</a>
            <a href="/tarefas"><i class="fas fa-tasks"></i> Tarefas</a>
            <a href="/competencias"><i class="fas fa-users"></i> Competências</a>
            <a href="/auditorias"><i class="fas fa-clipboard-check"></i> Auditorias</a>
            <div class="mobile-menu__label" data-i18n="mobile.content">Conteúdo</div>
            <a href="/blog"><i class="fas fa-newspaper"></i> Blog</a>
            <a href="/historias"><i class="fas fa-star"></i> Histórias de Clientes</a>
            <div class="mobile-menu__label" data-i18n="mobile.company">Empresa</div>
            <a href="/sobre"><i class="fas fa-building"></i> Sobre Nós</a>
            <a href="/parcerias"><i class="fas fa-handshake"></i> Seja Parceiro</a>
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
