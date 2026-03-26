// Auto-generated
export const pageHTML = `
    <section class="blog-hero" data-reveal>
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

    <!-- Blog Grid -->
    <section class="blog-grid-section" data-reveal>
        <div class="blog-grid" id="blogGrid" data-reveal-stagger>
            <!-- Dynamic articles injected here -->
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
    const CATEGORIES = {
        estrategica: 'Gestão Estratégica',
        processos: 'Processos',
        indicadores: 'Indicadores',
        lideranca: 'Liderança',
        ia: 'IA & Inovação'
    };

    const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

    let articlesCache = [];

    async function fetchArticles() {
        try {
            var url = SUPABASE_URL + '/rest/v1/blog_articles?published=eq.true&order=published_at.desc&select=*';
            console.log('Fetching articles from:', url);
            const res = await fetch(url, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
            });
            console.log('Response status:', res.status);
            var data = await res.json();
            console.log('Articles fetched:', data.length, data);
            if (res.ok && Array.isArray(data)) articlesCache = data;
        } catch(e) { console.error('Erro ao buscar artigos:', e); }
    }

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatDate(d) {
        try { return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }); }
        catch { return d; }
    }

    function truncate(str, len) {
        if (!str) return '';
        const text = str.replace(/<[^>]*>/g, '');
        return text.length > len ? text.slice(0, len) + '...' : text;
    }

    // ── Render articles ──
    let currentFilter = 'all';

    function renderArticles() {
        const filtered = currentFilter === 'all'
            ? articlesCache
            : articlesCache.filter(a => a.category === currentFilter);

        const grid = document.getElementById('blogGrid');
        const empty = document.getElementById('blogEmpty');

        if (filtered.length === 0) {
            grid.innerHTML = '';
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';

        grid.innerHTML = filtered.map(a => {
            const imgSrc = a.cover_url || 'https://placehold.co/400x250/0D1117/ffba1a?text=Orbit+Blog';
            const catLabel = CATEGORIES[a.category] || a.category;
            const preview = a.excerpt || truncate(a.content, 120);

            return \`
            <a href="/blog/\${a.slug}" class="blog-card" data-category="\${a.category}">
                <div class="blog-card__image">
                    <img src="\${escapeHtml(imgSrc)}" alt="\${escapeHtml(a.title)}" loading="lazy">
                    <span class="blog-card__tag">\${escapeHtml(catLabel)}</span>
                </div>
                <div class="blog-card__body">
                    <div class="blog-card__meta">
                        <span><i class="fas fa-calendar-alt"></i> \${formatDate(a.published_at || a.created_at)}</span>
                        <span><i class="fas fa-user"></i> \${escapeHtml(a.author)}</span>
                    </div>
                    <h3>\${escapeHtml(a.title)}</h3>
                    <p>\${escapeHtml(preview)}</p>
                    <span class="blog-card__link">Leia Mais <i class="fas fa-arrow-right"></i></span>
                </div>
            </a>\`;
        }).join('');

        // Force visibility after dynamic content injection
        grid.classList.add('revealed');
        var section = grid.closest('.blog-grid-section');
        if (section) section.classList.add('revealed');
    }

    // ── Filters ──
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderArticles();
        });
    });

    // ── Single article view ──
    function renderSingleArticle(article) {
        var categoryLabel = CATEGORIES[article.category] || article.category;
        var date = formatDate(article.published_at || article.created_at);
        var container = document.querySelector('.blog-grid-section');
        var filtersEl = document.querySelector('.blog-filters');
        if (filtersEl) filtersEl.style.display = 'none';

        container.innerHTML = '<div class="container" style="max-width:780px;padding:60px 20px 100px;">' +
            '<a href="/blog" style="display:inline-flex;align-items:center;gap:8px;color:#ffba1a;font-size:14px;margin-bottom:32px;text-decoration:none;"><i class="fas fa-arrow-left"></i> Voltar ao Blog</a>' +
            '<span style="display:inline-block;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);border-radius:100px;padding:6px 16px;color:#ffba1a;font-size:13px;font-weight:600;margin-bottom:20px;">' + escapeHtml(categoryLabel) + '</span>' +
            '<h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:16px;">' + escapeHtml(article.title) + '</h1>' +
            '<div style="display:flex;align-items:center;gap:20px;color:#8B949E;font-size:14px;flex-wrap:wrap;margin-bottom:40px;">' +
                '<span><i class="fas fa-user" style="margin-right:6px;color:#ffba1a;"></i>' + escapeHtml(article.author) + '</span>' +
                '<span><i class="fas fa-calendar-alt" style="margin-right:6px;color:#ffba1a;"></i>' + date + '</span>' +
            '</div>' +
            (article.cover_url ? '<img src="' + article.cover_url + '" alt="" style="width:100%;border-radius:16px;margin-bottom:40px;max-height:450px;object-fit:cover;">' : '') +
            '<div class="blog-article-content" style="color:#C9D1D9;font-size:17px;line-height:1.8;">' + article.content + '</div>' +
            '<div style="margin-top:60px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">' +
                '<a href="/blog" class="btn btn-primary" style="padding:14px 40px;"><i class="fas fa-arrow-left" style="margin-right:8px;"></i>Voltar ao Blog</a>' +
            '</div>' +
        '</div>' +
        '<style>' +
            '.blog-article-content h2{font-size:1.5rem;font-weight:700;color:#fff;margin:40px 0 16px;}' +
            '.blog-article-content h3{font-size:1.25rem;font-weight:700;color:#fff;margin:32px 0 12px;}' +
            '.blog-article-content p{margin-bottom:20px;}' +
            '.blog-article-content ul,.blog-article-content ol{margin:0 0 20px 24px;}' +
            '.blog-article-content li{margin-bottom:8px;}' +
            '.blog-article-content strong{color:#fff;}' +
            '.blog-article-content a{color:#ffba1a;text-decoration:underline;}' +
            '.blog-article-content img{border-radius:12px;margin:24px 0;}' +
            '.blog-article-content blockquote{border-left:3px solid #ffba1a;padding:16px 24px;margin:24px 0;background:rgba(255,186,26,0.05);border-radius:0 12px 12px 0;}' +
        '</style>';
    }

    async function fetchSingleArticle(slug) {
        try {
            var res = await fetch(SUPABASE_URL + '/rest/v1/blog_articles?slug=eq.' + slug + '&published=eq.true&limit=1', {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
            });
            if (res.ok) {
                var data = await res.json();
                if (data[0]) {
                    // Update hero title
                    var heroTitle = document.querySelector('.blog-hero h1');
                    if (heroTitle) heroTitle.innerHTML = escapeHtml(data[0].title);
                    var heroDesc = document.querySelector('.blog-hero p');
                    if (heroDesc) heroDesc.textContent = data[0].excerpt || '';
                    renderSingleArticle(data[0]);
                    return;
                }
            }
        } catch(e) { console.error(e); }
        // Fallback to blog list
        await fetchArticles();
        renderArticles();
    }

    // ── Init ──
    var pathParts = window.location.pathname.replace(/\\/$/, '').split('/');
    var slug = pathParts.length > 2 ? pathParts.slice(2).join('/') : null;
    if (slug) {
        fetchSingleArticle(slug);
    } else {
        fetchArticles().then(renderArticles);
    }

    // Mobile menu
    var toggle = document.querySelector('.menu-toggle');
    var mobileMenu = document.querySelector('.mobile-menu');
    var overlay = document.querySelector('.mobile-menu-overlay');
    window.closeMobileMenu = function() {
        if (toggle) toggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    window.openMobileMenu = function() {
        if (toggle) toggle.classList.add('active');
        if (mobileMenu) mobileMenu.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    if (toggle && mobileMenu) {
        toggle.addEventListener('click', function() {
            mobileMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
        });
        mobileMenu.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', closeMobileMenu);
        });
    }

    // ── Header scroll ──
    const header = document.querySelector('.header');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        if (backToTop) backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Dropdown hover
    document.querySelectorAll('.nav-menu > li').forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        if (!dropdown) return;
        item.addEventListener('mouseenter', () => dropdown.classList.add('show'));
        item.addEventListener('mouseleave', () => dropdown.classList.remove('show'));
    });

    // Filter scroll arrows
    (() => {
        const bar = document.getElementById('filterBar');
        const btnL = document.getElementById('filterScrollLeft');
        const btnR = document.getElementById('filterScrollRight');
        if (!bar || !btnL || !btnR) return;
        const step = 200;
        function updateArrows() {
            btnL.style.opacity = bar.scrollLeft > 4 ? '1' : '0';
            btnL.style.pointerEvents = bar.scrollLeft > 4 ? 'auto' : 'none';
            const maxScroll = bar.scrollWidth - bar.clientWidth;
            btnR.style.opacity = bar.scrollLeft < maxScroll - 4 ? '1' : '0';
            btnR.style.pointerEvents = bar.scrollLeft < maxScroll - 4 ? 'auto' : 'none';
        }
        btnL.addEventListener('click', () => { bar.scrollBy({ left: -step, behavior: 'smooth' }); });
        btnR.addEventListener('click', () => { bar.scrollBy({ left: step, behavior: 'smooth' }); });
        bar.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        setTimeout(updateArrows, 100);
    })();
    </script>
    <!-- Scroll Reveal -->
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
