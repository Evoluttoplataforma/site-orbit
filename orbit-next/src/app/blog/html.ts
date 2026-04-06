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
            <!-- Filter buttons are generated dynamically from article categories -->
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
                    <a href="/chat" class="btn btn-primary btn-lg">Conhecer o Time de IA</a>
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
                        <a href="https://wa.me/554898149776" target="_blank" rel="noopener" class="social-hover__item" data-name="WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                            <span class="social-hover__label">WhatsApp</span>
                        </a>
                        <a href="https://www.instagram.com/orbitgestao/" target="_blank" rel="noopener" class="social-hover__item" data-name="Instagram">
                            <i class="fab fa-instagram"></i>
                            <span class="social-hover__label">Instagram</span>
                        </a>
                        <a href="https://www.youtube.com/@Orbit.Gest%C3%A3o" target="_blank" rel="noopener" class="social-hover__item" data-name="YouTube">
                            <i class="fab fa-youtube"></i>
                            <span class="social-hover__label">YouTube</span>
                        </a>
                    </div>
                </div>
                <div class="footer-column">
                    <h5 data-i18n="footer.contact">Contato</h5>
                    <ul class="footer-contact">
                        <li><a href="mailto:contato@orbitgestao.com.br" style="color:inherit;text-decoration:none;"><i class="fas fa-envelope"></i> contato@orbitgestao.com.br</a></li>
                        <li><a href="https://wa.me/554898149776" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;"><i class="fab fa-whatsapp"></i> (48) 9814-9776</a></li>
                        <li><i class="fas fa-map-marker-alt"></i> Square SC, Florianópolis - SC</li>
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
        'planejamento-estrategico': 'Planejamento Estratégico',
        processos: 'Processos',
        indicadores: 'Indicadores',
        lideranca: 'Liderança',
        ia: 'IA & Inovação',
        marketing: 'Marketing',
        growth: 'Growth',
        outros: 'Outros'
    };

    var CAT_COLORS = {
        estrategica:                { bg: 'rgba(255,186,26,0.12)', text: '#D4960A', border: 'rgba(255,186,26,0.25)' },
        'planejamento-estrategico': { bg: 'rgba(255,186,26,0.12)', text: '#D4960A', border: 'rgba(255,186,26,0.25)' },
        processos:                  { bg: 'rgba(59,130,246,0.10)', text: '#3B82F6', border: 'rgba(59,130,246,0.25)' },
        indicadores:                { bg: 'rgba(34,197,94,0.10)',  text: '#16A34A', border: 'rgba(34,197,94,0.25)' },
        lideranca:                  { bg: 'rgba(168,85,247,0.10)', text: '#9333EA', border: 'rgba(168,85,247,0.25)' },
        ia:                         { bg: 'rgba(236,72,153,0.10)', text: '#DB2777', border: 'rgba(236,72,153,0.25)' },
        marketing:                  { bg: 'rgba(249,115,22,0.10)', text: '#EA580C', border: 'rgba(249,115,22,0.25)' },
        growth:                     { bg: 'rgba(6,182,212,0.10)',  text: '#0891B2', border: 'rgba(6,182,212,0.25)' },
        outros:                     { bg: 'rgba(107,114,128,0.10)', text: '#6B7280', border: 'rgba(107,114,128,0.25)' }
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

    // Share functions (defined here to avoid escaping issues in inline onclick)
    window.__shareInstagram = function() {
        window.open('https://www.instagram.com/orbitgestao/');
    };
    window.__copyLink = function(btn) {
        navigator.clipboard.writeText(location.href).then(function() {
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(function() { btn.innerHTML = '<i class="fas fa-link"></i>'; }, 1500);
        });
    };

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
                            (a.author_avatar
                                ? '<img src="' + escapeHtml(a.author_avatar) + '" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0;" alt="">'
                                : '<div class="blog-card__avatar">' + initials + '</div>') +
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

    // ── Build filter buttons dynamically from article categories ──
    function buildFilterButtons() {
        var bar = document.getElementById('filterBar');
        if (!bar) return;
        // Extract unique categories from articles
        var seen = {};
        articlesCache.forEach(function(a) {
            if (a.category && !seen[a.category]) seen[a.category] = true;
        });
        // Keep "Todos" button, add category buttons
        var html = '<button class="filter-btn active" data-filter="all">Todos</button>';
        Object.keys(seen).forEach(function(cat) {
            var label = CATEGORIES[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
            html += '<button class="filter-btn" data-filter="' + cat + '">' + escapeHtml(label) + '</button>';
        });
        bar.innerHTML = html;
        // Bind click events
        bar.querySelectorAll('.filter-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                bar.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderArticles();
            });
        });
    }

    // ── Single article view ──
    function injectArticleSEO(article) {
        var seoTitle = (article.seo_title || article.title) + ' | Blog Orbit Gestão';
        var seoDesc = article.excerpt || (article.content || '').replace(/<[^>]*>/g, '').slice(0, 160);
        var seoUrl = article.seo_canonical || 'https://orbitgestao.com.br/blog?artigo=' + encodeURIComponent(article.slug);
        var seoImage = article.seo_og_image || article.cover_url || 'https://orbitgestao.com.br/images/og-image.png';
        var seoKeyword = article.seo_keyword || '';
        var categoryLabel = CATEGORIES[article.category] || article.category || 'Blog';
        var author = article.author || 'Equipe Orbit';
        var publishDate = article.published_at || article.created_at || new Date().toISOString();
        var wordCount = (article.content || '').replace(/<[^>]*>/g, '').split(/\\s+/).length;
        var readMins = Math.max(1, Math.ceil(wordCount / 200));

        // Update document title
        document.title = seoTitle;

        // Helper to set/create meta tags
        function setMeta(attr, attrVal, content) {
            var sel = 'meta[' + attr + '="' + attrVal + '"]';
            var el = document.querySelector(sel);
            if (!el) { el = document.createElement('meta'); el.setAttribute(attr, attrVal); document.head.appendChild(el); }
            el.setAttribute('content', content);
        }

        // Primary meta
        setMeta('name', 'description', seoDesc);
        setMeta('name', 'author', author);
        setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
        if (seoKeyword) setMeta('name', 'keywords', seoKeyword + ', gestão estratégica, orbit gestão');

        // Canonical
        var canon = document.querySelector('link[rel="canonical"]');
        if (!canon) { canon = document.createElement('link'); canon.setAttribute('rel', 'canonical'); document.head.appendChild(canon); }
        canon.setAttribute('href', seoUrl);

        // Open Graph
        setMeta('property', 'og:type', 'article');
        setMeta('property', 'og:url', seoUrl);
        setMeta('property', 'og:title', seoTitle);
        setMeta('property', 'og:description', seoDesc);
        setMeta('property', 'og:image', seoImage);
        setMeta('property', 'og:image:width', '1200');
        setMeta('property', 'og:image:height', '630');
        setMeta('property', 'og:site_name', 'Orbit Gestão');
        setMeta('property', 'og:locale', 'pt_BR');
        setMeta('property', 'article:published_time', publishDate);
        setMeta('property', 'article:author', author);
        setMeta('property', 'article:section', categoryLabel);
        if (seoKeyword) setMeta('property', 'article:tag', seoKeyword);

        // Twitter Card
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', seoTitle);
        setMeta('name', 'twitter:description', seoDesc);
        setMeta('name', 'twitter:image', seoImage);

        // JSON-LD structured data (BlogPosting + BreadcrumbList)
        var schema = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': article.seo_title || article.title,
            'description': seoDesc,
            'image': seoImage,
            'author': { '@type': 'Person', 'name': author },
            'publisher': {
                '@type': 'Organization',
                'name': 'Orbit Gestão',
                'logo': { '@type': 'ImageObject', 'url': 'https://orbitgestao.com.br/images/logo-orbit-white.png' }
            },
            'datePublished': publishDate,
            'dateModified': article.updated_at || publishDate,
            'mainEntityOfPage': { '@type': 'WebPage', '@id': seoUrl },
            'wordCount': wordCount,
            'articleSection': categoryLabel,
            'inLanguage': 'pt-BR',
            'timeRequired': 'PT' + readMins + 'M'
        };
        if (seoKeyword) schema.keywords = seoKeyword;

        var breadcrumb = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://orbitgestao.com.br/' },
                { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://orbitgestao.com.br/blog' },
                { '@type': 'ListItem', 'position': 3, 'name': article.title, 'item': seoUrl }
            ]
        };

        // Remove old LD+JSON if any
        document.querySelectorAll('script[data-article-seo]').forEach(function(s) { s.remove(); });

        var ldArticle = document.createElement('script');
        ldArticle.type = 'application/ld+json';
        ldArticle.setAttribute('data-article-seo', '1');
        ldArticle.textContent = JSON.stringify(schema);
        document.head.appendChild(ldArticle);

        var ldBread = document.createElement('script');
        ldBread.type = 'application/ld+json';
        ldBread.setAttribute('data-article-seo', '1');
        ldBread.textContent = JSON.stringify(breadcrumb);
        document.head.appendChild(ldBread);
    }

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
                            (article.author_avatar
                                ? '<img src="' + escapeHtml(article.author_avatar) + '" style="width:32px;height:32px;border-radius:50%;object-fit:cover;" alt="">'
                                : '<div class="blog-card__avatar">' + initials + '</div>') +
                            '<span>' + escapeHtml(article.author || 'Equipe Orbit') + '</span>' +
                        '</div>' +
                        '<span><i class="fas fa-calendar-alt"></i> ' + date + '</span>' +
                        '<span><i class="fas fa-clock"></i> ' + mins + ' min de leitura</span>' +
                    '</div>' +

                    '<div class="blog-article-content">' + (article.content || '') + '</div>' +

                    '<!-- Comments Section -->' +
                    '<div class="blog-comments" id="commentsSection" data-article-id="' + article.id + '">' +
                        '<h2 class="blog-comments__title"><i class="fas fa-comments" style="color:#ffba1a;margin-right:10px;"></i>Coment&aacute;rios</h2>' +
                        '<div class="blog-comments__list" id="commentsList"></div>' +

                        '<div class="blog-comments__form-wrapper">' +
                            '<h3 class="blog-comments__form-title">Deixe seu coment&aacute;rio</h3>' +
                            '<form id="commentForm" class="blog-comments__form">' +
                                '<div class="blog-comments__form-row">' +
                                    '<div class="form-group">' +
                                        '<label for="commentName">Nome *</label>' +
                                        '<input type="text" id="commentName" placeholder="Seu nome" required>' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        '<label for="commentEmail">E-mail *</label>' +
                                        '<input type="email" id="commentEmail" placeholder="seu@email.com" required>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label for="commentPhone">Telefone</label>' +
                                    '<input type="tel" id="commentPhone" placeholder="(00) 00000-0000">' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<label for="commentText">Coment&aacute;rio *</label>' +
                                    '<textarea id="commentText" rows="4" placeholder="Escreva seu coment&aacute;rio..." required></textarea>' +
                                '</div>' +
                                '<button type="submit" class="btn btn-primary" id="commentSubmitBtn">' +
                                    '<i class="fas fa-paper-plane" style="margin-right:6px;"></i> Enviar coment&aacute;rio' +
                                '</button>' +
                            '</form>' +
                            '<div class="blog-comments__success" id="commentSuccess" style="display:none;">' +
                                '<i class="fas fa-check-circle" style="color:#22C55E;font-size:1.5rem;"></i>' +
                                '<p>Coment&aacute;rio enviado! Ser&aacute; exibido ap&oacute;s aprova&ccedil;&atilde;o.</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="blog-article__bottom-cta">' +
                        '<a href="/blog" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Voltar ao Blog</a>' +
                    '</div>' +
                '</article>' +

                // Sidebar
                '<aside class="blog-article__sidebar">' +
                '<div class="blog-article__sidebar-sticky">' +
                    '<div class="blog-sidebar-card">' +
                        '<p class="blog-sidebar-card__label">Escrito por</p>' +
                        '<div class="blog-sidebar-card__author">' +
                            (article.author_avatar
                                ? '<img src="' + escapeHtml(article.author_avatar) + '" style="width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0;" alt="' + escapeHtml(article.author || '') + '">'
                                : '<div class="blog-card__avatar blog-card__avatar--lg">' + initials + '</div>') +
                            '<div>' +
                                '<p class="blog-sidebar-card__name">' + escapeHtml(article.author || 'Equipe Orbit') + '</p>' +
                                '<p class="blog-sidebar-card__role">Equipe Orbit</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div id="leadMagnetSidebar"></div>' +

                    '<div class="blog-sidebar-cta">' +
                        '<div class="blog-sidebar-cta__icon"><i class="fas fa-robot"></i></div>' +
                        '<h3>Conhe&ccedil;a o Time de IA</h3>' +
                        '<p>Dezenas de agentes especializados que operam a gest&atilde;o da sua empresa 24/7.</p>' +
                        '<a href="/chat" class="btn btn-primary" style="width:100%;text-align:center;">Agendar demonstra&ccedil;&atilde;o</a>' +
                    '</div>' +

                    '<div class="blog-sidebar-card">' +
                        '<p class="blog-sidebar-card__label">Compartilhar</p>' +
                        '<div class="blog-sidebar-share">' +
                            '<a href="https://www.instagram.com/orbitgestao/" target="_blank" class="blog-share-btn blog-share-btn--instagram" aria-label="Seguir no Instagram"><i class="fab fa-instagram"></i></a>' +
                            '<button class="blog-share-btn blog-share-btn--copy" onclick="window.__copyLink(this)" aria-label="Copiar link"><i class="fas fa-link"></i></button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '</aside>' +

            '</div>' +
        '</div>';
    }

    function renderLeadMagnet(lm) {
        var container = document.getElementById('leadMagnetSidebar');
        if (!container || !lm) return;
        var LEAD_ICONS = { ebook: 'fa-book', checklist: 'fa-list-check', planilha: 'fa-table', webinar: 'fa-video', trial: 'fa-rocket' };
        var icon = LEAD_ICONS[lm.type] || 'fa-gift';
        container.innerHTML =
            '<div class="blog-sidebar-cta" style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);">' +
                '<div class="blog-sidebar-cta__icon"><i class="fas ' + icon + '"></i></div>' +
                '<h3 style="color:#fff;">' + escapeHtml(lm.title) + '</h3>' +
                (lm.description ? '<p style="color:rgba(255,255,255,.7);">' + escapeHtml(lm.description) + '</p>' : '') +
                '<a href="' + escapeHtml(lm.cta_url || '/chat') + '" class="btn btn-primary" style="width:100%;text-align:center;">' +
                    '<i class="fas fa-download" style="margin-right:6px;"></i>' + escapeHtml(lm.cta_text || 'Baixar agora') +
                '</a>' +
            '</div>';
    }

    // ══ COMMENTS ══
    function loadComments(articleId) {
        var list = document.getElementById('commentsList');
        if (!list) return;
        list.innerHTML = '<p style="color:#9CA3AF;font-size:0.9rem;text-align:center;padding:16px 0;"><i class="fas fa-spinner fa-spin"></i> Carregando...</p>';

        fetch(SUPABASE_URL + '/rest/v1/blog_comments?article_id=eq.' + articleId + '&status=eq.approved&order=created_at.desc', {
            headers: supaHeaders()
        })
        .then(function(res) { return res.json(); })
        .then(function(comments) {
            if (!comments || comments.length === 0) {
                list.innerHTML = '<p style="color:#9CA3AF;font-size:0.9rem;text-align:center;padding:20px 0;">Nenhum coment&aacute;rio ainda. Seja o primeiro!</p>';
                return;
            }
            list.innerHTML = comments.map(function(c) {
                var initials = c.name.split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
                var date = new Date(c.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
                return '<div class="blog-comment">' +
                    '<div class="blog-comment__header">' +
                        '<div class="blog-comment__avatar">' + initials + '</div>' +
                        '<div>' +
                            '<p class="blog-comment__name">' + escapeHtml(c.name) + '</p>' +
                            '<p class="blog-comment__date">' + date + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<p class="blog-comment__text">' + escapeHtml(c.comment) + '</p>' +
                '</div>';
            }).join('');
        })
        .catch(function() {
            list.innerHTML = '<p style="color:#9CA3AF;font-size:0.9rem;">Erro ao carregar coment&aacute;rios.</p>';
        });
    }

    function initCommentForm(articleId) {
        var form = document.getElementById('commentForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = document.getElementById('commentName').value.trim();
            var email = document.getElementById('commentEmail').value.trim();
            var phone = document.getElementById('commentPhone').value.trim();
            var comment = document.getElementById('commentText').value.trim();
            var btn = document.getElementById('commentSubmitBtn');

            if (!name || !email || !comment) return;
            if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
                alert('E-mail inv\\u00e1lido.');
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            fetch(SUPABASE_URL + '/rest/v1/blog_comments', {
                method: 'POST',
                headers: Object.assign({ 'Content-Type': 'application/json', 'Prefer': 'return=minimal' }, supaHeaders()),
                body: JSON.stringify({
                    article_id: articleId,
                    name: name,
                    email: email,
                    phone: phone || null,
                    comment: comment,
                    status: 'pending'
                })
            })
            .then(function(res) {
                if (!res.ok) throw new Error('Erro');
                document.getElementById('commentForm').style.display = 'none';
                document.getElementById('commentSuccess').style.display = 'flex';
            })
            .catch(function() {
                alert('Erro ao enviar coment\\u00e1rio. Tente novamente.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane" style="margin-right:6px;"></i> Enviar coment\\u00e1rio';
            });
        });
    }

    function injectCtaBanner(article) {
        if (!article.cta_banner_enabled) return;
        var contentEl = document.querySelector('.blog-article-content');
        if (!contentEl) return;

        var ctaUrl = escapeHtml(article.cta_banner_cta_url || '/chat');
        var bannerHTML = article.cta_banner_image
            ? '<a href="' + ctaUrl + '" style="display:block;margin:40px 0;border-radius:16px;overflow:hidden;">' +
                '<img src="' + escapeHtml(article.cta_banner_image) + '" style="width:100%;display:block;" alt="' + escapeHtml(article.cta_banner_title || 'Banner') + '">' +
              '</a>'
            : '<div style="background:#0D1117;border-radius:16px;padding:36px 32px;margin:40px 0;">' +
                (article.cta_banner_title ? '<h3 style="color:#fff;font-size:1.25rem;font-weight:700;margin-bottom:8px;">' + escapeHtml(article.cta_banner_title) + '</h3>' : '') +
                (article.cta_banner_desc ? '<p style="color:rgba(255,255,255,.7);font-size:0.95rem;margin-bottom:16px;">' + escapeHtml(article.cta_banner_desc) + '</p>' : '') +
                '<a href="' + ctaUrl + '" class="btn btn-primary" style="color:#fff;">' + escapeHtml(article.cta_banner_cta_text || 'Agendar demonstração') + '</a>' +
              '</div>';

        // Insert at the end of article content
        var banner = document.createElement('div');
        banner.innerHTML = bannerHTML;
        contentEl.appendChild(banner.firstChild);
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
                injectArticleSEO(data[0]);
                injectCtaBanner(data[0]);
                loadComments(data[0].id);
                initCommentForm(data[0].id);

                // Sticky sidebar via JS (desktop only)
                (function() {
                    if (window.innerWidth <= 1024) return;
                    var el = document.querySelector('.blog-article__sidebar-sticky');
                    var aside = document.querySelector('.blog-article__sidebar');
                    if (!el || !aside) return;
                    var gap = 100;
                    var placeholder = document.createElement('div');
                    var isFixed = false;
                    var isPinned = false;

                    function tick() {
                        var asideRect = aside.getBoundingClientRect();
                        var elH = el.offsetHeight;
                        var asideTop = asideRect.top;
                        var asideBottom = asideRect.bottom;

                        if (asideTop < gap && asideBottom > elH + gap) {
                            // Fix to viewport
                            if (!isFixed) {
                                placeholder.style.width = el.offsetWidth + 'px';
                                placeholder.style.height = elH + 'px';
                                el.parentNode.insertBefore(placeholder, el);
                                el.style.position = 'fixed';
                                el.style.top = gap + 'px';
                                el.style.width = aside.offsetWidth + 'px';
                                el.style.zIndex = '50';
                                isFixed = true;
                                isPinned = false;
                            }
                        } else if (asideBottom <= elH + gap) {
                            // Pin to bottom
                            if (isFixed || !isPinned) {
                                if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);
                                el.style.position = 'absolute';
                                el.style.top = 'auto';
                                el.style.bottom = '0';
                                el.style.width = aside.offsetWidth + 'px';
                                el.style.zIndex = '';
                                aside.style.position = 'relative';
                                isFixed = false;
                                isPinned = true;
                            }
                        } else {
                            // Normal
                            if (isFixed || isPinned) {
                                if (placeholder.parentNode) placeholder.parentNode.removeChild(placeholder);
                                el.style.position = '';
                                el.style.top = '';
                                el.style.bottom = '';
                                el.style.width = '';
                                el.style.zIndex = '';
                                isFixed = false;
                                isPinned = false;
                            }
                        }
                    }

                    window.addEventListener('scroll', tick, { passive: true });
                    window.addEventListener('resize', tick);
                    tick();
                })();

                // Fetch lead magnet if article has one
                if (data[0].lead_magnet_id) {
                    fetch(SUPABASE_URL + '/rest/v1/lead_magnets?id=eq.' + data[0].lead_magnet_id + '&active=eq.true&limit=1', {
                        headers: supaHeaders()
                    })
                    .then(function(r) { return r.json(); })
                    .then(function(lms) { if (lms && lms[0]) renderLeadMagnet(lms[0]); })
                    .catch(function() {});
                }
            } else {
                fetchArticles().then(function() { buildFilterButtons(); renderArticles(); });
            }
        })
        .catch(function(e) {
            console.error('Erro fetch single:', e);
            fetchArticles().then(function() { buildFilterButtons(); renderArticles(); });
        });
    }

    // ── Init ──
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('artigo');
    if (slug) {
        fetchSingleArticle(slug);
    } else {
        fetchArticles().then(function() { buildFilterButtons(); renderArticles(); });
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
