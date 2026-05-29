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
                    <a href="/agentes-de-ia"><span data-i18n="nav.agents">Agentes de IA</span></a>
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
                    <a href="/live" style="position:relative;">
                        <span style="display:inline-block;width:8px;height:8px;background:#ff4444;border-radius:50%;margin-right:6px;animation:livePulse 1.5s ease-in-out infinite;vertical-align:middle;"></span>
                        <span>Eventos</span> <i class="fas fa-chevron-down dropdown-arrow"></i>
                    </a>
                    <div class="dropdown dropdown--sm">
                        <div class="dropdown__links">
                            <a href="/live">
                                <div class="dd-icon"><i class="fas fa-play-circle" style="color:#ff0000;"></i></div>
                                <div class="dd-text"><span>Live Semanal</span><small>Toda terca 13h com Igor</small></div>
                            </a>
                            <a href="/live/chris">
                                <div class="dd-icon"><i class="fas fa-chalkboard-user" style="color:#ffba1a;"></i></div>
                                <div class="dd-text"><span>Masterclass Consultores</span><small>Quinta 18h com Christian Hart</small></div>
                            </a>
                            <a href="/treinamentos">
                                <div class="dd-icon"><i class="fas fa-chalkboard-teacher" style="color:#ffba1a;"></i></div>
                                <div class="dd-text"><span>Treinamentos</span><small>10 m&oacute;dulos semanais &middot; Seg a Sex</small></div>
                            </a>
                            <a href="https://demonstracao.orbitgestao.com.br/salas/onboarding" target="_blank">
                                <div class="dd-icon"><i class="fas fa-graduation-cap" style="color:#3FB950;"></i></div>
                                <div class="dd-text"><span>Onboarding</span><small>Qua 9h/17h &bull; Sex 14h</small></div>
                            </a>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="/sobre"><span data-i18n="nav.company">Empresa</span></a>
                </li>
                <li class="nav-bootcamp" id="navBootcamp">
                    <a href="/bootcamp-orbit" style="color:#ffba1a;font-weight:700;border:1px solid rgba(255,186,26,0.45);border-radius:8px;padding:6px 14px;">🎖️ Bootcamp</a>
                </li>
            </ul>

            <div class="nav-actions">
                <a href="https://app.orbitgestao.com.br/login" class="btn btn-outline" data-i18n="nav.login">Entrar</a>
                <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary" data-i18n="nav.cta">Conhecer o Time de IA</a>
            </div>

            <button class="lang-switch" aria-label="Change language">
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
            <a href="/bootcamp-orbit" id="navBootcampMobile" style="color:#ffba1a;font-weight:700;border:1px solid rgba(255,186,26,0.45);border-radius:8px;"><i class="fas fa-medal" style="color:#ffba1a;"></i> Bootcamp Orbit</a>
            <a href="/agentes-de-ia"><i class="fas fa-wand-magic-sparkles" style="color:#ffba1a;"></i> Agentes de IA</a>
            <a href="/"><i class="fas fa-home"></i> <span data-i18n="nav.home">Início</span></a>
            <a href="https://demonstracao.orbitgestao.com.br/chat" onclick="closeMobileMenu()"><i class="fas fa-envelope"></i> <span data-i18n="mobile.contact">Fale Conosco</span></a>

            <!-- Agentes dropdown -->
            <div class="mobile-menu__dropdown">
                <button class="mobile-menu__dropdown-toggle" onclick="this.parentElement.classList.toggle('open')">
                    <span><i class="fas fa-robot"></i> Agentes de IA</span>
                    <i class="fas fa-chevron-down mobile-menu__dropdown-arrow"></i>
                </button>
                <div class="mobile-menu__dropdown-items">
                    <span><i class="fas fa-chess-king"></i> Estrategista</span>
                    <span><i class="fas fa-sitemap"></i> Processos</span>
                    <span><i class="fas fa-users"></i> Pessoas</span>
                    <span><i class="fas fa-graduation-cap"></i> Treinamento</span>
                    <span><i class="fas fa-chart-line"></i> Indicadores</span>
                    <span><i class="fas fa-magnifying-glass-chart"></i> Pesquisa</span>
                    <span><i class="fas fa-shield-halved"></i> Riscos</span>
                    <span><i class="fas fa-lightbulb"></i> Oportunidades</span>
                    <span><i class="fas fa-triangle-exclamation"></i> Problemas</span>
                    <span><i class="fas fa-file-lines"></i> Documentos</span>
                    <span><i class="fas fa-handshake"></i> Vendas</span>
                    <span><i class="fas fa-video"></i> Reuniões</span>
                </div>
            </div>

            <div class="mobile-menu__label" data-i18n="mobile.content">Conteúdo</div>
            <a href="/blog"><i class="fas fa-newspaper"></i> Blog</a>
            <a href="/historias"><i class="fas fa-star"></i> Histórias de Clientes</a>
            <div class="mobile-menu__label" style="color:#ffba1a;">
                <span style="display:inline-block;width:8px;height:8px;background:#ff4444;border-radius:50%;margin-right:6px;animation:livePulse 1.5s ease-in-out infinite;"></span>
                Eventos
            </div>
            <a href="/live"><i class="fas fa-play-circle" style="color:#ff0000;"></i> Live Semanal (Ter 13h)</a>
            <a href="/live/chris"><i class="fas fa-chalkboard-user" style="color:#ffba1a;"></i> Masterclass Consultores (Quinta 18h)</a>
            <a href="/treinamentos"><i class="fas fa-chalkboard-teacher" style="color:#ffba1a;"></i> Treinamentos</a>
            <a href="https://demonstracao.orbitgestao.com.br/salas/onboarding" target="_blank"><i class="fas fa-graduation-cap" style="color:#3FB950;"></i> Onboarding</a>
            <div class="mobile-menu__label" data-i18n="mobile.company">Empresa</div>
            <a href="/sobre"><i class="fas fa-building"></i> Sobre Nós</a>
        </div>
        <div class="mobile-menu__footer">
            <a href="https://app.orbitgestao.com.br/login" class="btn btn-outline" style="flex:1;text-align:center;color:#fff;border-color:rgba(255,255,255,0.4);">Entrar</a>
            <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary" onclick="closeMobileMenu()" data-i18n="nav.cta" style="flex:1;text-align:center;">Conhecer o Time</a>
        </div>
    </div>

    <!-- Auto-hide do link Bootcamp após o fim do dia 13/06/2026 (BRT) -->
    <script>
    (function(){
      var ENDS = Date.UTC(2026, 5, 14, 2, 59, 59);
      if (Date.now() > ENDS) {
        ['navBootcamp','navBootcampMobile'].forEach(function(id){
          var el = document.getElementById(id);
          if (el) el.remove();
        });
      }
    })();
    </script>
`;
