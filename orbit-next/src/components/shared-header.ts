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
                    <a href="/agentes-de-ia"><span data-i18n="nav.platform">Plataforma</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
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
                                <a href="/agentes-de-ia" class="pl-menu-head">
                                    <div class="pl-hd-icon"><i class="fas fa-robot"></i></div>
                                    <div class="pl-hd-text"><span data-i18n="nav.olivia_team">Time Olívia · 12 agentes</span><small data-i18n="nav.olivia_team.sub">Visão geral · 30 anos de metodologia GSN</small></div>
                                </a>
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;padding:0 6px;">
                                    <a href="/agentes/estrategico" class="pl-menu-row"><i class="fa-solid fa-compass"></i> Estratégico</a>
                                    <a href="/agentes/riscos" class="pl-menu-row"><i class="fa-solid fa-shield-halved"></i> Riscos</a>
                                    <a href="/agentes/processos" class="pl-menu-row"><i class="fa-solid fa-diagram-project"></i> Processos</a>
                                    <a href="/agentes/treinamento" class="pl-menu-row"><i class="fa-solid fa-graduation-cap"></i> Treinamento</a>
                                    <a href="/agentes/pessoas" class="pl-menu-row"><i class="fa-solid fa-users"></i> Pessoas</a>
                                    <a href="/agentes/oportunidades" class="pl-menu-row"><i class="fa-solid fa-lightbulb"></i> Oportunidades</a>
                                    <a href="/agentes/indicadores" class="pl-menu-row"><i class="fa-solid fa-chart-line"></i> Indicadores</a>
                                    <a href="/agentes/documentos" class="pl-menu-row"><i class="fa-solid fa-folder-tree"></i> Documentos</a>
                                    <a href="/agentes/comercial" class="pl-menu-row"><i class="fa-solid fa-code-branch"></i> Comercial</a>
                                    <a href="/agentes/reunioes" class="pl-menu-row"><i class="fa-solid fa-microphone-lines"></i> Reuniões</a>
                                    <a href="/agentes/problemas-operacionais" class="pl-menu-row"><i class="fa-solid fa-triangle-exclamation"></i> Problemas</a>
                                    <a href="/agentes/pesquisas" class="pl-menu-row"><i class="fa-solid fa-clipboard-list"></i> Pesquisas</a>
                                </div>
                                <div class="pl-menu-foot"><a href="/agentes-de-ia"><span data-i18n="nav.olivia_overview">Ver visão geral do Time Olívia</span> <i class="fa-solid fa-arrow-right"></i></a></div>
                            </div>
                            <!-- BLOCO 2: 4 MÓDULOS -->
                            <div style="padding:0 8px 8px;">
                                <a href="/agentes-de-ia#modulos" class="pl-menu-head">
                                    <div class="pl-hd-icon"><i class="fas fa-cubes"></i></div>
                                    <div class="pl-hd-text"><span data-i18n="nav.modules">Módulos da plataforma</span><small data-i18n="nav.modules.sub">4 módulos operacionais integrados</small></div>
                                </a>
                                <div style="padding:0 6px;">
                                    <a href="/modulos/financeiro" class="pl-menu-row"><i class="fa-solid fa-building-columns"></i> Financeiro</a>
                                    <a href="/modulos/recrutamento-selecao" class="pl-menu-row"><i class="fa-solid fa-user-plus"></i> <span data-i18n="nav.recruiting">Recrutamento e Seleção</span></a>
                                    <a href="/modulos/projetos" class="pl-menu-row"><i class="fa-solid fa-chart-gantt"></i> Projetos</a>
                                    <a href="/modulos/compras" class="pl-menu-row"><i class="fa-solid fa-bag-shopping"></i> Compras</a>
                                </div>
                                <div class="pl-menu-foot"><a href="/agentes-de-ia#modulos"><span data-i18n="nav.modules_all">Ver todos os módulos</span> <i class="fa-solid fa-arrow-right"></i></a></div>
                            </div>
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
                    <a href="/live" style="position:relative;">
                        <span style="display:inline-block;width:8px;height:8px;background:#ff4444;border-radius:50%;margin-right:6px;animation:livePulse 1.5s ease-in-out infinite;vertical-align:middle;"></span>
                        <span data-i18n="nav.events">Eventos</span> <i class="fas fa-chevron-down dropdown-arrow"></i>
                    </a>
                    <div class="dropdown dropdown--sm">
                        <div class="dropdown__links">
                            <a href="/live">
                                <div class="dd-icon"><i class="fas fa-play-circle" style="color:#ff0000;"></i></div>
                                <div class="dd-text"><span data-i18n="nav.live">Live Quinzenal</span><small data-i18n="nav.live.sub">A cada 15 dias, terça 13h com Igor</small></div>
                            </a>
                            <a href="/live/chris">
                                <div class="dd-icon"><i class="fas fa-chalkboard-user" style="color:#ffba1a;"></i></div>
                                <div class="dd-text"><span data-i18n="nav.masterclass">Masterclass Consultores</span><small data-i18n="nav.masterclass.sub">Quinta 18h com Christian Hart</small></div>
                            </a>
                            <a href="/treinamentos">
                                <div class="dd-icon"><i class="fas fa-chalkboard-teacher" style="color:#ffba1a;"></i></div>
                                <div class="dd-text"><span data-i18n="nav.trainings">Treinamentos</span><small data-i18n="nav.trainings.sub">10 módulos semanais · Seg a Sex</small></div>
                            </a>
                            <a href="https://demonstracao.orbitgestao.com.br/salas/onboarding" target="_blank">
                                <div class="dd-icon"><i class="fas fa-graduation-cap" style="color:#3FB950;"></i></div>
                                <div class="dd-text"><span>Onboarding</span><small data-i18n="nav.onboarding.sub">Qua 9h/17h • Sex 14h</small></div>
                            </a>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="/sobre"><span data-i18n="nav.company">Empresa</span></a>
                </li>
            </ul>

            <div class="nav-actions">
                <a href="https://app.orbitgestao.com.br/login" class="btn btn-outline" data-i18n="nav.login">Entrar</a>
                <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary" data-i18n="nav.cta">Conhecer o Time de IA</a>
            </div>

            <button class="lang-switch" aria-label="Change language">
                <span class="lang-switch__flag">🇧🇷</span>
                <span class="lang-switch__label">PT</span>
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
            <a href="https://demonstracao.orbitgestao.com.br/chat" onclick="closeMobileMenu()"><i class="fas fa-envelope"></i> <span data-i18n="mobile.contact">Fale Conosco</span></a>

            <!-- Plataforma · Agentes + Módulos (mobile) -->
            <div class="mobile-menu__label" style="color:#ffba1a;" data-i18n="mobile.platform_label">🤖 Plataforma</div>
            <a href="/agentes-de-ia" style="font-weight:700;"><i class="fas fa-robot" style="color:#ffba1a;"></i> <span data-i18n="nav.olivia_team">Time Olívia · 12 agentes</span></a>

            <div class="mobile-menu__dropdown">
                <button class="mobile-menu__dropdown-toggle" onclick="this.parentElement.classList.toggle('open')">
                    <span><i class="fas fa-list"></i> <span data-i18n="mobile.agents12">Os 12 agentes</span></span>
                    <i class="fas fa-chevron-down mobile-menu__dropdown-arrow"></i>
                </button>
                <div class="mobile-menu__dropdown-items">
                    <a href="/agentes/estrategico"><i class="fa-solid fa-compass"></i> Estratégico</a>
                    <a href="/agentes/processos"><i class="fa-solid fa-diagram-project"></i> Processos</a>
                    <a href="/agentes/pessoas"><i class="fa-solid fa-users"></i> Pessoas</a>
                    <a href="/agentes/indicadores"><i class="fa-solid fa-chart-line"></i> Indicadores</a>
                    <a href="/agentes/riscos"><i class="fa-solid fa-shield-halved"></i> Riscos</a>
                    <a href="/agentes/treinamento"><i class="fa-solid fa-graduation-cap"></i> Treinamento</a>
                    <a href="/agentes/oportunidades"><i class="fa-solid fa-lightbulb"></i> Oportunidades</a>
                    <a href="/agentes/documentos"><i class="fa-solid fa-folder-tree"></i> Documentos</a>
                    <a href="/agentes/comercial"><i class="fa-solid fa-code-branch"></i> Comercial</a>
                    <a href="/agentes/problemas-operacionais"><i class="fa-solid fa-triangle-exclamation"></i> <span data-i18n="nav.ops_problems">Problemas Operacionais</span></a>
                    <a href="/agentes/reunioes"><i class="fa-solid fa-microphone-lines"></i> Reuniões</a>
                    <a href="/agentes/pesquisas"><i class="fa-solid fa-clipboard-list"></i> Pesquisas</a>
                </div>
            </div>

            <div class="mobile-menu__dropdown">
                <button class="mobile-menu__dropdown-toggle" onclick="this.parentElement.classList.toggle('open')">
                    <span><i class="fas fa-cubes"></i> <span data-i18n="mobile.modules4">Os 4 módulos</span></span>
                    <i class="fas fa-chevron-down mobile-menu__dropdown-arrow"></i>
                </button>
                <div class="mobile-menu__dropdown-items">
                    <a href="/modulos/financeiro"><i class="fa-solid fa-building-columns"></i> Financeiro</a>
                    <a href="/modulos/recrutamento-selecao"><i class="fa-solid fa-user-plus"></i> <span data-i18n="nav.recruiting">Recrutamento e Seleção</span></a>
                    <a href="/modulos/projetos"><i class="fa-solid fa-chart-gantt"></i> Projetos</a>
                    <a href="/modulos/compras"><i class="fa-solid fa-bag-shopping"></i> Compras</a>
                </div>
            </div>

            <div class="mobile-menu__label" data-i18n="mobile.content">Conteúdo</div>
            <a href="/blog"><i class="fas fa-newspaper"></i> Blog</a>
            <a href="/historias"><i class="fas fa-star"></i> <span data-i18n="nav.stories">Histórias de Clientes</span></a>
            <div class="mobile-menu__label" style="color:#ffba1a;">
                <span style="display:inline-block;width:8px;height:8px;background:#ff4444;border-radius:50%;margin-right:6px;animation:livePulse 1.5s ease-in-out infinite;"></span>
                <span data-i18n="nav.events">Eventos</span>
            </div>
            <a href="/live"><i class="fa-solid fa-video" style="color:#2D8CFF;"></i> <span data-i18n="nav.live_mobile">Live Quinzenal (Ter 13h)</span></a>
            <a href="/live/chris"><i class="fas fa-chalkboard-user" style="color:#ffba1a;"></i> <span data-i18n="nav.masterclass_mobile">Masterclass Consultores (Quinta 18h)</span></a>
            <a href="/treinamentos"><i class="fas fa-chalkboard-teacher" style="color:#ffba1a;"></i> <span data-i18n="nav.trainings">Treinamentos</span></a>
            <a href="https://demonstracao.orbitgestao.com.br/salas/onboarding" target="_blank"><i class="fas fa-graduation-cap" style="color:#3FB950;"></i> Onboarding</a>
            <div class="mobile-menu__label" data-i18n="mobile.company">Empresa</div>
            <a href="/sobre"><i class="fas fa-building"></i> <span data-i18n="footer.about">Sobre Nós</span></a>
        </div>
        <div class="mobile-menu__footer">
            <a href="https://app.orbitgestao.com.br/login" class="btn btn-outline" style="flex:1;text-align:center;color:#fff;border-color:rgba(255,255,255,0.4);" data-i18n="nav.login">Entrar</a>
            <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary" onclick="closeMobileMenu()" data-i18n="nav.cta" style="flex:1;text-align:center;">Conhecer o Time de IA</a>
        </div>
    </div>

`;
