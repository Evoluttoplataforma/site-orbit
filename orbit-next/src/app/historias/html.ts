// Auto-generated from site/historias/index.html
export const pageHTML = `
    <section class="stories-hero">
        <div class="stories-hero__bg">
            <div class="stories-hero__glow stories-hero__glow--1"></div>
            <div class="stories-hero__glow stories-hero__glow--2"></div>
        </div>
        <div class="container">
            <div class="stories-hero__badge"><i class="fas fa-trophy"></i> Histórias de Sucesso</div>
            <h1>Descubra como nossos clientes <span>transformaram</span> sua gestão</h1>
            <p>Conheça as histórias reais de empresas que alcançaram resultados extraordinários com a Orbit Gestão.</p>
        </div>
    </section>

    <!-- Stories Section -->
    <section class="stories-section" data-reveal>
        <div class="stories-section__inner">
            <!-- Filters -->
            <div class="stories-filters" id="filterBar">
                <button class="filter-btn active" data-filter="all">Todos</button>
            </div>

            <!-- Grid -->
            <div class="stories-grid" id="storiesGrid"></div>

            <!-- Empty State -->
            <div class="stories-empty" id="storiesEmpty" style="display:none;">
                <i class="fas fa-book-open"></i>
                <h3>Em breve teremos histórias incríveis</h3>
                <p>Estamos reunindo os melhores cases de sucesso dos nossos clientes. Volte em breve!</p>
                <a href="/historias/enviar" class="btn btn-primary">Conte sua história</a>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="stories-cta" data-reveal>
        <div class="container">
            <div class="stories-cta__badge"><i class="fas fa-star"></i> Conte sua história</div>
            <h3>Sua empresa também pode ser destaque</h3>
            <p>Compartilhe sua experiência com a Orbit Gestão e inspire outras empresas a transformarem sua gestão.</p>
            <div class="stories-cta__buttons">
                <a href="/historias/enviar" class="btn btn-primary btn-lg">Conte sua história</a>
                <a href="/chat" class="btn btn-outline btn-lg">Agendar demonstração</a>
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
                        <li><a href="/consultores" data-i18n="footer.partners">Seja Parceiro</a></li>
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
    // ── Helpers ──
    var SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
    var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ── Segment mapping ──
    const SEGMENTS = {
        industria: 'Indústria',
        servicos: 'Serviços',
        tecnologia: 'Tecnologia',
        saude: 'Saúde',
        educacao: 'Educação',
        varejo: 'Varejo',
        financeiro: 'Financeiro',
        agronegocio: 'Agronegócio',
        outro: 'Outro'
    };

    // ── Get published stories from Supabase ──
    var cachedStories = null;
    async function getPublishedStories() {
        if (cachedStories) return cachedStories;
        try {
            var res = await fetch(SB_URL + '/rest/v1/customer_stories?status=eq.published&order=created_at.desc&select=*', {
                headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY }
            });
            if (res.ok) {
                var data = await res.json();
                cachedStories = data.map(function(s) {
                    return {
                        id: s.id,
                        slug: s.slug,
                        empresa: s.company_name,
                        nome: s.contact_name,
                        cargo: s.contact_role,
                        segmento: s.segment,
                        desafio: s.challenge,
                        solucao: s.solution,
                        resultados: s.results,
                        depoimento: s.testimonial,
                        companyLogo: s.logo_url,
                        coverUrl: s.cover_url,
                        createdAt: s.created_at,
                        status: s.status
                    };
                });
                return cachedStories;
            }
        } catch(e) { console.warn('Erro ao buscar historias:', e); }
        return [];
    }

    // ── Build dynamic filters ──
    function buildFilters(stories) {
        const filterBar = document.getElementById('filterBar');
        const segments = [...new Set(stories.map(s => s.segmento || s.segment).filter(Boolean))];

        segments.forEach(seg => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = seg;
            btn.textContent = SEGMENTS[seg] || seg;
            filterBar.appendChild(btn);
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderStories();
            });
        });
    }

    // ── Render stories ──
    let currentFilter = 'all';

    async function renderStories() {
        const stories = await getPublishedStories();
        const filtered = currentFilter === 'all'
            ? stories
            : stories.filter(s => (s.segmento || s.segment) === currentFilter);

        const grid = document.getElementById('storiesGrid');
        const empty = document.getElementById('storiesEmpty');

        if (filtered.length === 0) {
            grid.innerHTML = '';
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';

        grid.innerHTML = filtered.map(story => {
            const segmentLabel = SEGMENTS[story.segmento] || SEGMENTS[story.segment] || story.segmento || story.segment || '';

            // Company logo
            var logoHtml;
            if (story.companyLogo || story.logoData) {
                var logoSrc = story.companyLogo || story.logoData;
                logoHtml = '<img src="' + logoSrc + '" alt="' + escapeHtml(story.empresa) + '" loading="lazy">';
            } else {
                logoHtml = '<div class="story-card__logo-placeholder"><i class="fas fa-building"></i></div>';
            }

            var autorCargo = [story.nome, story.cargo].filter(Boolean).join(' - ');

            return '<a href="/historias/' + encodeURIComponent(story.slug || story.id) + '" class="story-card">' +
                (segmentLabel ? '<span class="story-card__segment">' + escapeHtml(segmentLabel) + '</span>' : '') +
                '<div class="story-card__logo">' + logoHtml + '</div>' +
                '<div class="story-card__company">' + escapeHtml(story.empresa) + '</div>' +
                (autorCargo ? '<div class="story-card__author">' + escapeHtml(autorCargo) + '</div>' : '') +
                '<div class="story-card__title">' + escapeHtml(story.titulo) + '</div>' +
                '<span class="story-card__link">Leia a hist&oacute;ria &rarr;</span>' +
            '</a>';
        }).join('');
    }

    // ── Init ──
    (async function init() {
        const stories = await getPublishedStories();
        buildFilters(stories);
        await renderStories();
    })();

    // Mobile menu, header scroll, dropdowns handled by PageLayout.tsx
    </script>
    <!-- Scroll Reveal -->
    <script>
    (function() {
        var els = document.querySelectorAll('[data-reveal],[data-reveal-stagger]');
        // Enable reveal animations - content is visible by default via CSS override
        document.body.classList.add('reveal-ready');
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed');
                        io.unobserve(e.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            els.forEach(function(el) { io.observe(el); });
        }
        // Fallback: force reveal all after 800ms in case observer didn't fire
        setTimeout(function() {
            els.forEach(function(el) { el.classList.add('revealed'); });
        }, 800);
    })();
    </script>
    <script src="/js/seo.js"></script>
`;
