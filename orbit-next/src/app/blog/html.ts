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
                        <li><a href="/pricing" data-i18n="footer.plans">Planos e Preços</a></li>
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

    function getDB() {
        try { return JSON.parse(localStorage.getItem('orbit_cms')) || { articles: [] }; }
        catch { return { articles: [] }; }
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
        const db = getDB();
        const published = db.articles
            .filter(a => a.status === 'published')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const filtered = currentFilter === 'all'
            ? published
            : published.filter(a => a.category === currentFilter);

        const grid = document.getElementById('blogGrid');
        const empty = document.getElementById('blogEmpty');

        if (filtered.length === 0) {
            grid.innerHTML = '';
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';

        grid.innerHTML = filtered.map(a => {
            const imgSrc = a.imageData || a.imageUrl || 'https://placehold.co/400x250/000/FDB73F?text=Artigo';
            const catLabel = CATEGORIES[a.category] || a.category;
            // Get plain text preview from content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = a.content;
            const preview = truncate(tempDiv.textContent, 120);

            return \`
            <a href="/blog/\${a.slug || a.id}" class="blog-card" data-category="\${a.category}">
                <div class="blog-card__image">
                    <img src="\${imgSrc}" alt="\${escapeHtml(a.title)}" loading="lazy">
                    <span class="blog-card__tag">\${escapeHtml(catLabel)}</span>
                </div>
                <div class="blog-card__body">
                    <div class="blog-card__meta">
                        <span><i class="fas fa-calendar-alt"></i> \${formatDate(a.createdAt)}</span>
                        <span><i class="fas fa-clock"></i> \${escapeHtml(a.readTime || '5 min')}</span>
                    </div>
                    <h3>\${escapeHtml(a.title)}</h3>
                    <p>\${escapeHtml(preview)}</p>
                    <span class="blog-card__link">Leia Mais <i class="fas fa-arrow-right"></i></span>
                </div>
            </a>\`;
        }).join('');
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

    // ── Init ──
    renderArticles();

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
