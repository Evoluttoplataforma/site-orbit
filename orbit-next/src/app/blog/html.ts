// Blog page - redesigned
export const pageHTML = `
    <section class="blog-hero">
        <div class="blog-hero__bg">
            <div class="blog-hero__glow blog-hero__glow--1"></div>
            <div class="blog-hero__glow blog-hero__glow--2"></div>
        </div>
        <div class="container">
            <div class="blog-hero__badge"><i class="fas fa-lightbulb"></i> Conhecimento & Estratégia</div>
            <h1>Amplie seus <span>conhecimentos</span></h1>
            <p>Artigos e insights sobre gestão estratégica para empresas que querem resultados reais.</p>
        </div>
    </section>

    <!-- Filters -->
    <div class="blog-filters">
        <div class="blog-filters__inner" id="filterBar">
            <button class="filter-btn active" data-filter="all">Todos</button>
            <button class="filter-btn" data-filter="estrategica">Gestão Estratégica</button>
            <button class="filter-btn" data-filter="processos">Processos</button>
            <button class="filter-btn" data-filter="indicadores">Indicadores</button>
            <button class="filter-btn" data-filter="lideranca">Liderança</button>
            <button class="filter-btn" data-filter="ia">IA & Inovação</button>
        </div>
        <button class="filter-scroll-btn filter-scroll-btn--left" id="filterScrollLeft" aria-label="Scroll esquerda"><i class="fas fa-chevron-left"></i></button>
        <button class="filter-scroll-btn filter-scroll-btn--right" id="filterScrollRight" aria-label="Scroll direita"><i class="fas fa-chevron-right"></i></button>
    </div>

    <!-- Blog Grid — NO data-reveal to avoid opacity:0 on async content -->
    <section class="blog-grid-section">
        <div class="blog-grid" id="blogGrid">
            <!-- Loading skeleton -->
            <div class="blog-card blog-card--skeleton"><div class="blog-card__image"></div><div class="blog-card__body"><div class="skeleton-line skeleton-line--short"></div><div class="skeleton-line"></div><div class="skeleton-line skeleton-line--medium"></div></div></div>
            <div class="blog-card blog-card--skeleton"><div class="blog-card__image"></div><div class="blog-card__body"><div class="skeleton-line skeleton-line--short"></div><div class="skeleton-line"></div><div class="skeleton-line skeleton-line--medium"></div></div></div>
            <div class="blog-card blog-card--skeleton"><div class="blog-card__image"></div><div class="blog-card__body"><div class="skeleton-line skeleton-line--short"></div><div class="skeleton-line"></div><div class="skeleton-line skeleton-line--medium"></div></div></div>
        </div>
        <div class="blog-empty" id="blogEmpty" style="display:none;">
            <i class="fas fa-newspaper"></i>
            <p>Nenhum artigo encontrado nesta categoria.</p>
            <small>Em breve novos conteúdos serão publicados.</small>
        </div>
    </section>

    <!-- CTA -->
    <section class="site-cta">
        <div class="site-cta__particles"><span></span><span></span><span></span><span></span></div>
        <div class="container">
            <div class="site-cta__card" data-reveal="scale">
                <div class="site-cta__icon"><i class="fas fa-rocket"></i></div>
                <h2>Pronto para transformar sua gestão?</h2>
                <p>Conheça o time de IA que executa a estratégia da sua empresa.</p>
                <div class="site-cta__buttons">
                    <a href="/#contato-form" class="btn btn-primary btn-lg">Conhecer o Time de IA</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-logo"><img src="/images/logo-orbit-white.png" alt="Orbit Gestão" height="36"></div>
                    <p data-i18n="footer.tagline">Plataforma de gestão com IA. Contrate um time que executa.</p>
                    <div class="social-hover">
                        <a href="#" class="social-hover__item" data-name="LinkedIn">
                            <i class="fab fa-linkedin"></i>
                            <span class="social-hover__label">LinkedIn</span>
                        </a>
                        <a href="#" class="social-hover__item" data-name="Facebook">
                            <i class="fab fa-facebook"></i>
                            <span class="social-hover__label">Facebook</span>
                        </a>
                        <a href="#" class="social-hover__item" data-name="Instagram">
                            <i class="fab fa-instagram"></i>
                            <span class="social-hover__label">Instagram</span>
                        </a>
                        <a href="#" class="social-hover__item" data-name="YouTube">
                            <i class="fab fa-youtube"></i>
                            <span class="social-hover__label">YouTube</span>
                        </a>
                    </div>
                </div>
                <div class="footer-column">
                    <h5 data-i18n="footer.contact">Contato</h5>
                    <ul class="footer-contact">
                        <li><i class="fas fa-phone"></i> (48) 99120-6282</li>
                        <li><i class="fas fa-map-marker-alt"></i> Square SC, Florianópolis - SC</li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h5 data-i18n="footer.platform">Plataforma</h5>
                    <ul>
                        <li><a href="/agentes" data-i18n="footer.agents">Agentes de IA</a></li>
                        <li><a href="/processos">Processos</a></li>
                        <li><a href="/indicadores">Indicadores</a></li>
                        <li><a href="/tarefas">Tarefas</a></li>
                        <li><a href="/competencias">Competências</a></li>
                        <li><a href="/auditorias">Auditorias</a></li>
                        <li><a href="/preco" data-i18n="footer.plans">Planos e Preços</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h5 data-i18n="footer.content">Conteúdo</h5>
                    <ul>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/historias" data-i18n="footer.stories">Histórias de Clientes</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                    <h5 style="margin-top: 20px;" data-i18n="footer.company">Empresa</h5>
                    <ul>
                        <li><a href="/sobre" data-i18n="footer.about">Sobre Nós</a></li>
                        <li><a href="/parcerias" data-i18n="footer.partners">Seja Parceiro</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p data-i18n="footer.rights">&copy; 2026 Orbit - Grupo GSN. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Back to Top -->
    <button class="back-to-top" id="backToTop" style="display:none;">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script>
    var CATEGORIES = {
        estrategica: 'Gestão Estratégica',
        processos: 'Processos',
        indicadores: 'Indicadores',
        lideranca: 'Liderança',
        ia: 'IA & Inovação'
    };

    var CAT_COLORS = {
        estrategica: { bg: 'rgba(255,186,26,0.12)', text: '#D4960A', border: 'rgba(255,186,26,0.25)' },
        processos:   { bg: 'rgba(59,130,246,0.10)', text: '#3B82F6', border: 'rgba(59,130,246,0.25)' },
        indicadores: { bg: 'rgba(34,197,94,0.10)',  text: '#16A34A', border: 'rgba(34,197,94,0.25)' },
        lideranca:   { bg: 'rgba(168,85,247,0.10)', text: '#9333EA', border: 'rgba(168,85,247,0.25)' },
        ia:          { bg: 'rgba(236,72,153,0.10)', text: '#DB2777', border: 'rgba(236,72,153,0.25)' }
    };

    var SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

    var articlesCache = [];

    function supaHeaders() {
        return { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY };
    }

    function fetchArticles() {
        var url = SUPABASE_URL + '/rest/v1/blog_articles?published=eq.true&order=published_at.desc&select=*';
        return fetch(url, { headers: supaHeaders() })
            .then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
            .then(function(result) {
                if (result.ok && Array.isArray(result.data)) {
                    articlesCache = result.data;
                }
            })
            .catch(function(e) { console.error('Erro ao buscar artigos:', e); });
    }

    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatDate(d) {
        try { return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }); }
        catch(err) { return d; }
    }

    function truncate(str, len) {
        if (!str) return '';
        var text = str.replace(/<[^>]*>/g, '');
        return text.length > len ? text.slice(0, len) + '...' : text;
    }

    function readTime(content) {
        var words = (content || '').replace(/<[^>]*>/g, '').split(/\\s+/).length;
        return Math.max(1, Math.ceil(words / 200));
    }

    function getInitials(name) {
        if (!name) return 'O';
        var parts = name.trim().split(/\\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        return parts[0][0].toUpperCase();
    }

    // ── Render articles grid ──
    var currentFilter = 'all';

    function renderArticles() {
        var filtered = currentFilter === 'all'
            ? articlesCache
            : articlesCache.filter(function(a) { return a.category === currentFilter; });

        var grid = document.getElementById('blogGrid');
        var empty = document.getElementById('blogEmpty');
        if (!grid) return;

        if (filtered.length === 0) {
            grid.innerHTML = '';
            if (empty) empty.style.display = 'block';
            return;
        }

        if (empty) empty.style.display = 'none';

        grid.innerHTML = filtered.map(function(a, i) {
            var imgSrc = a.cover_url || 'https://placehold.co/600x340/0D1117/ffba1a?text=Orbit+Blog';
            var catLabel = CATEGORIES[a.category] || a.category || 'Artigo';
            var catColor = CAT_COLORS[a.category] || CAT_COLORS.estrategica;
            var preview = a.excerpt || truncate(a.content, 140);
            var date = formatDate(a.published_at || a.created_at);
            var mins = readTime(a.content);
            var initials = getInitials(a.author);

            return '<article class="blog-card blog-card--animate" style="animation-delay:' + (i * 80) + 'ms" data-category="' + (a.category || '') + '" data-slug="' + a.slug + '" onclick="window.__goToArticle(this)">' +
                '<div class="blog-card__image">' +
                    '<img src="' + escapeHtml(imgSrc) + '" alt="' + escapeHtml(a.title) + '" loading="lazy">' +
                    '<span class="blog-card__tag" style="background:' + catColor.bg + ';color:' + catColor.text + ';border:1px solid ' + catColor.border + ';">' + escapeHtml(catLabel) + '</span>' +
                '</div>' +
                '<div class="blog-card__body">' +
                    '<h3>' + escapeHtml(a.title) + '</h3>' +
                    '<p>' + escapeHtml(preview) + '</p>' +
                    '<div class="blog-card__footer">' +
                        '<div class="blog-card__author">' +
                            '<div class="blog-card__avatar">' + initials + '</div>' +
                            '<div class="blog-card__author-info">' +
                                '<span class="blog-card__author-name">' + escapeHtml(a.author || 'Equipe Orbit') + '</span>' +
                                '<span class="blog-card__date">' + date + '</span>' +
                            '</div>' +
                        '</div>' +
                        '<span class="blog-card__read-time"><i class="fas fa-clock"></i> ' + mins + ' min</span>' +
                    '</div>' +
                '</div>' +
            '</article>';
        }).join('');
    }

    // Navigate to article
    window.__goToArticle = function(el) {
        var slug = el.getAttribute('data-slug');
        if (slug) window.location.href = '/blog?artigo=' + encodeURIComponent(slug);
    };

    // ── Filters ──
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderArticles();
        });
    });

    // ── Single article view ──
    function renderSingleArticle(article) {
        var categoryLabel = CATEGORIES[article.category] || article.category || 'Artigo';
        var catColor = CAT_COLORS[article.category] || CAT_COLORS.estrategica;
        var date = formatDate(article.published_at || article.created_at);
        var container = document.querySelector('.blog-grid-section');
        var filtersEl = document.querySelector('.blog-filters');
        if (filtersEl) filtersEl.style.display = 'none';

        var wordCount = (article.content || '').replace(/<[^>]*>/g, '').split(/\\s+/).length;
        var mins = Math.max(1, Math.ceil(wordCount / 200));
        var initials = getInitials(article.author);

        container.innerHTML =
        '<div class="blog-article">' +
            '<a href="/blog" class="blog-article__back"><i class="fas fa-arrow-left"></i> Voltar ao Blog</a>' +

            '<div class="blog-article__layout">' +

                // Main content
                '<article class="blog-article__main">' +
                    (article.cover_url ? '<img class="blog-article__cover" src="' + escapeHtml(article.cover_url) + '" alt="' + escapeHtml(article.title) + '">' : '') +

                    '<span class="blog-article__category" style="background:' + catColor.bg + ';color:' + catColor.text + ';border:1px solid ' + catColor.border + ';">' + escapeHtml(categoryLabel) + '</span>' +
                    '<h1 class="blog-article__title">' + escapeHtml(article.title) + '</h1>' +

                    '<div class="blog-article__meta">' +
                        '<div class="blog-article__meta-author">' +
                            '<div class="blog-card__avatar">' + initials + '</div>' +
                            '<span>' + escapeHtml(article.author || 'Equipe Orbit') + '</span>' +
                        '</div>' +
                        '<span><i class="fas fa-calendar-alt"></i> ' + date + '</span>' +
                        '<span><i class="fas fa-clock"></i> ' + mins + ' min de leitura</span>' +
                    '</div>' +

                    '<div class="blog-article-content">' + (article.content || '') + '</div>' +

                    '<div class="blog-article__bottom-cta">' +
                        '<a href="/blog" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Voltar ao Blog</a>' +
                    '</div>' +
                '</article>' +

                // Sidebar
                '<aside class="blog-article__sidebar">' +
                    '<div class="blog-sidebar-card">' +
                        '<p class="blog-sidebar-card__label">Escrito por</p>' +
                        '<div class="blog-sidebar-card__author">' +
                            '<div class="blog-card__avatar blog-card__avatar--lg">' + initials + '</div>' +
                            '<div>' +
                                '<p class="blog-sidebar-card__name">' + escapeHtml(article.author || 'Equipe Orbit') + '</p>' +
                                '<p class="blog-sidebar-card__role">Equipe Orbit</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="blog-sidebar-cta">' +
                        '<div class="blog-sidebar-cta__icon"><i class="fas fa-robot"></i></div>' +
                        '<h3>Conhe&ccedil;a o Time de IA</h3>' +
                        '<p>Dezenas de agentes especializados que operam a gest&atilde;o da sua empresa 24/7.</p>' +
                        '<a href="/#contato-form" class="btn btn-primary" style="width:100%;text-align:center;">Agendar demonstra&ccedil;&atilde;o</a>' +
                    '</div>' +

                    '<div class="blog-sidebar-card">' +
                        '<p class="blog-sidebar-card__label">Compartilhar</p>' +
                        '<div class="blog-sidebar-share">' +
                            '<button class="blog-share-btn blog-share-btn--whatsapp" onclick="window.open(\'https://api.whatsapp.com/send?text=\'+encodeURIComponent(document.title+\' \'+location.href))" aria-label="Compartilhar no WhatsApp"><i class="fab fa-whatsapp"></i></button>' +
                            '<button class="blog-share-btn blog-share-btn--linkedin" onclick="window.open(\'https://linkedin.com/sharing/share-offsite/?url=\'+encodeURIComponent(location.href))" aria-label="Compartilhar no LinkedIn"><i class="fab fa-linkedin-in"></i></button>' +
                            '<button class="blog-share-btn blog-share-btn--copy" onclick="navigator.clipboard.writeText(location.href).then(function(){var b=this;b.innerHTML=\'<i class=&quot;fas fa-check&quot;></i>\';setTimeout(function(){b.innerHTML=\'<i class=&quot;fas fa-link&quot;></i>\';},1500);}.bind(this))" aria-label="Copiar link"><i class="fas fa-link"></i></button>' +
                        '</div>' +
                    '</div>' +
                '</aside>' +

            '</div>' +
        '</div>';
    }

    function fetchSingleArticle(slug) {
        fetch(SUPABASE_URL + '/rest/v1/blog_articles?slug=eq.' + encodeURIComponent(slug) + '&published=eq.true&limit=1', {
            headers: supaHeaders()
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data && data[0]) {
                var heroTitle = document.querySelector('.blog-hero h1');
                if (heroTitle) heroTitle.innerHTML = escapeHtml(data[0].title);
                var heroDesc = document.querySelector('.blog-hero p');
                if (heroDesc) heroDesc.textContent = data[0].excerpt || '';
                var heroBadge = document.querySelector('.blog-hero__badge');
                if (heroBadge) heroBadge.style.display = 'none';
                renderSingleArticle(data[0]);
            } else {
                fetchArticles().then(renderArticles);
            }
        })
        .catch(function(e) {
            console.error('Erro fetch single:', e);
            fetchArticles().then(renderArticles);
        });
    }

    // ── Init ──
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('artigo');
    if (slug) {
        fetchSingleArticle(slug);
    } else {
        fetchArticles().then(renderArticles);
    }

    // Filter scroll arrows
    (function() {
        var bar = document.getElementById('filterBar');
        var btnL = document.getElementById('filterScrollLeft');
        var btnR = document.getElementById('filterScrollRight');
        if (!bar || !btnL || !btnR) return;
        var step = 200;
        function updateArrows() {
            btnL.style.opacity = bar.scrollLeft > 4 ? '1' : '0';
            btnL.style.pointerEvents = bar.scrollLeft > 4 ? 'auto' : 'none';
            var maxScroll = bar.scrollWidth - bar.clientWidth;
            btnR.style.opacity = bar.scrollLeft < maxScroll - 4 ? '1' : '0';
            btnR.style.pointerEvents = bar.scrollLeft < maxScroll - 4 ? 'auto' : 'none';
        }
        btnL.addEventListener('click', function() { bar.scrollBy({ left: -step, behavior: 'smooth' }); });
        btnR.addEventListener('click', function() { bar.scrollBy({ left: step, behavior: 'smooth' }); });
        bar.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        setTimeout(updateArrows, 100);
    })();
    </script>
    <!-- Scroll Reveal (only for CTA, NOT for blog grid) -->
    <script>
    (function() {
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach(function(el) {
            io.observe(el);
        });
    })();
    </script>
    <script src="/js/seo.js"></script>
`;
