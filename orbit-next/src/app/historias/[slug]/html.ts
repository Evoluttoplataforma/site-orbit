// Auto-generated from site/historias/historia.html
export const pageHTML = `
        <div class="article-not-found" id="storyFallback">
            <i class="fas fa-spinner fa-spin" style="color:#ffba1a;"></i>
            <h2>Carregando história...</h2>
            <p>Se a página não carregar, a história pode não estar disponível neste dispositivo.</p>
            <a href="/historias" class="btn btn-primary">Ver todas as histórias</a>
        </div>
    </div>

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox" onclick="this.classList.remove('active')">
        <button class="lightbox-close" onclick="document.getElementById('lightbox').classList.remove('active')"><i class="fas fa-times"></i></button>
        <img id="lightboxImg" src="" alt="">
    </div>

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

    <button class="back-to-top" id="backToTop"><i class="fas fa-arrow-up"></i></button>

    <script>
    var SEGMENTS = {
        industria: 'Indústria', servicos: 'Serviços', tecnologia: 'Tecnologia',
        saude: 'Saúde', educacao: 'Educação', varejo: 'Varejo',
        financeiro: 'Financeiro', agronegocio: 'Agronegócio', outro: 'Outro'
    };

    function escapeHtml(str) {
        if (!str) return '';
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function formatDate(d) {
        try { return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }); }
        catch(e) { return d; }
    }

    function getDB() {
        try { return JSON.parse(localStorage.getItem('orbit_cms')) || { customerStories: [] }; }
        catch(e) { return { customerStories: [] }; }
    }

    function getVideoEmbed(url) {
        if (!url) return '';
        var ytMatch = url.match(/(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/|youtube\\.com\\/embed\\/)([^&?#]+)/);
        if (ytMatch) return '<div class="video-embed"><iframe src="https://www.youtube.com/embed/' + ytMatch[1] + '" allowfullscreen></iframe></div>';
        var vmMatch = url.match(/vimeo\\.com\\/(\\d+)/);
        if (vmMatch) return '<div class="video-embed"><iframe src="https://player.vimeo.com/video/' + vmMatch[1] + '" allowfullscreen></iframe></div>';
        return '<p><a href="' + escapeHtml(url) + '" target="_blank"><i class="fas fa-play-circle"></i> Assistir video</a></p>';
    }

    try {
    var params = new URLSearchParams(window.location.search);
    var pathSlug = window.location.pathname.split('/historias/')[1] || '';
    var storySlug = (pathSlug && pathSlug !== 'historia' && pathSlug !== 'historia.html') ? decodeURIComponent(pathSlug) : (params.get('slug') || params.get('id'));
    var db = getDB();
    var story = (db.customerStories || []).find(function(s) { return (s.slug === storySlug || s.id === storySlug) && s.status === 'published'; });
    var container = document.getElementById('storyContent');

    if (!story) {
        container.innerHTML = '<div class="article-not-found">' +
            '<i class="fas fa-search"></i>' +
            '<h2>História não encontrada</h2>' +
            '<p>Esta história pode ter sido removida ou ainda não foi publicada.</p>' +
            '<a href="/historias" class="btn btn-primary">Ver todas as histórias</a>' +
            '</div>';
    } else {
        var storyId = story.id || storySlug;
        document.title = escapeHtml(story.titulo) + ' - ' + escapeHtml(story.empresa) + ' | Orbit Gestão';

        var coverImg = (story.photos && story.photos.length) ? story.photos[0] : '';
        var segment = SEGMENTS[story.segmento] || story.segmento || '';
        var modulos = story.modulos || [];
        var photos = (story.photos || []).slice(1);
        var pageUrl = encodeURIComponent(window.location.href);
        var pageTitle = encodeURIComponent(story.titulo);

        var moduleIcons = {
            'Processos': 'fa-sitemap', 'Indicadores': 'fa-chart-line', 'Tarefas': 'fa-tasks',
            'Competências': 'fa-users', 'Auditorias': 'fa-clipboard-check', 'Orbit IA': 'fa-robot'
        };

        var html = '';

        // ═══ HERO: two columns (left: text, right: image) ═══
        html += '<section class="story-hero">';
        html += '<div class="story-hero__left">';

        // Company logo
        html += '<div class="story-hero__logo">';
        if (story.companyLogo) {
            html += '<img src="' + story.companyLogo + '" alt="' + escapeHtml(story.empresa) + '">';
        } else {
            html += '<div class="story-hero__logo-fallback"><i class="fas fa-building"></i> ' + escapeHtml(story.empresa) + '</div>';
        }
        html += '</div>';

        // Title
        html += '<h1>' + escapeHtml(story.titulo) + '</h1>';

        // Description (first 2 lines of desafio as intro)
        var introText = (story.desafio || '').split('\\n').slice(0, 3).join(' ').slice(0, 300);
        if (introText) {
            html += '<p class="story-hero__desc">' + escapeHtml(introText) + (story.desafio.length > 300 ? '...' : '') + '</p>';
        }

        // Social links
        if (story.linkedin || story.instagram || story.website) {
            html += '<div class="story-hero__social">';
            if (story.linkedin) html += '<a href="' + escapeHtml(story.linkedin) + '" target="_blank" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>';
            if (story.instagram) html += '<a href="' + escapeHtml(story.instagram) + '" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>';
            if (story.website) html += '<a href="' + escapeHtml(story.website) + '" target="_blank" title="Website"><i class="fas fa-globe"></i></a>';
            html += '</div>';
        }

        // Buttons
        html += '<div class="story-hero__buttons">';
        html += '<a href="/#contato-form" class="btn btn-primary">Conhecer Orbit</a>';
        html += '<a href="/historias" class="btn-outline-dark">Ver todas as histórias</a>';
        html += '</div>';

        html += '</div>'; // end left

        // Right: main image
        html += '<div class="story-hero__image">';
        if (coverImg) {
            html += '<img src="' + coverImg + '" alt="' + escapeHtml(story.titulo) + '">';
        } else {
            html += '<div class="story-hero__image-empty"><i class="fas fa-image"></i></div>';
        }
        html += '</div>';

        html += '</section>'; // end hero

        // ═══ TESTIMONIAL (depoimento) ═══
        if (story.depoimento) {
            html += '<section class="story-testimonials">';
            html += '<div class="story-testimonials__inner">';
            // Split depoimento in two if it's long enough, otherwise show single centered
            var depoText = story.depoimento;
            var midIdx = depoText.length > 200 ? Math.floor(depoText.length / 2) : -1;
            var splitAt = -1;
            if (midIdx > 0) {
                // Find nearest period or comma near the middle
                for (var i = midIdx; i < midIdx + 80 && i < depoText.length; i++) {
                    if (depoText[i] === '.' || depoText[i] === ',' || depoText[i] === ';') { splitAt = i + 1; break; }
                }
                if (splitAt === -1) {
                    for (var j = midIdx; j > midIdx - 80 && j >= 0; j--) {
                        if (depoText[j] === '.' || depoText[j] === ',' || depoText[j] === ';') { splitAt = j + 1; break; }
                    }
                }
            }
            if (splitAt > 0) {
                var part1 = depoText.slice(0, splitAt).trim();
                var part2 = depoText.slice(splitAt).trim();
                html += '<div class="story-quote">';
                html += '<p class="story-quote__text">&ldquo;' + escapeHtml(part1) + '&rdquo;</p>';
                html += '<div class="story-quote__author">' + escapeHtml(story.nome) + '</div>';
                html += '<div class="story-quote__role">' + escapeHtml(story.cargo || '') + (story.cargo && story.empresa ? ' - ' : '') + escapeHtml(story.empresa) + '</div>';
                html += '</div>';
                html += '<div class="story-quote">';
                html += '<p class="story-quote__text">&ldquo;' + escapeHtml(part2) + '&rdquo;</p>';
                html += '<div class="story-quote__author">' + escapeHtml(story.nome) + '</div>';
                html += '<div class="story-quote__role">' + escapeHtml(story.cargo || '') + (story.cargo && story.empresa ? ' - ' : '') + escapeHtml(story.empresa) + '</div>';
                html += '</div>';
            } else {
                html += '<div class="story-quote" style="grid-column:1/-1;max-width:600px;margin:0 auto;">';
                html += '<p class="story-quote__text">&ldquo;' + escapeHtml(depoText) + '&rdquo;</p>';
                html += '<div class="story-quote__author">' + escapeHtml(story.nome) + '</div>';
                html += '<div class="story-quote__role">' + escapeHtml(story.cargo || '') + (story.cargo && story.empresa ? ' - ' : '') + escapeHtml(story.empresa) + '</div>';
                html += '</div>';
            }
            html += '</div></section>';
        }

        // ═══ COMPANY INFO BAR ═══
        html += '<section class="story-info-bar">';
        html += '<div class="story-info-bar__inner">';
        html += '<div class="info-item"><div class="info-item__label">Empresa</div><div class="info-item__value">' + escapeHtml(story.empresa) + '</div></div>';
        html += '<div class="info-item"><div class="info-item__label">Segmento</div><div class="info-item__value">' + escapeHtml(segment) + '</div></div>';
        html += '<div class="info-item"><div class="info-item__label">Responsável</div><div class="info-item__value">' + escapeHtml(story.nome) + '</div></div>';
        html += '<div class="info-item"><div class="info-item__label">Cargo</div><div class="info-item__value">' + escapeHtml(story.cargo || '-') + '</div></div>';
        html += '</div></section>';

        // ═══ RESULTS METRICS (if resultados has numbers) ═══
        // Try to extract metrics from resultados text
        var metricsRegex = /(\\d+[\\d.,]*\\s*%?)\\s*(?:de\\s+)?([a-záàãéêíóôúç\\s]+)/gi;
        var metrics = [];
        var match;
        var resText = story.resultados || '';
        while ((match = metricsRegex.exec(resText)) !== null && metrics.length < 4) {
            var num = match[1].trim();
            var label = match[2].trim();
            if (label.length > 3 && label.length < 40) {
                metrics.push({ number: num, label: label });
            }
        }

        // Also add modules as a metric if we have few
        if (modulos.length > 0 && metrics.length < 4) {
            metrics.push({ number: modulos.length.toString(), label: 'Módulos utilizados' });
        }

        if (metrics.length >= 2) {
            html += '<section class="story-metrics">';
            html += '<div class="story-metrics__inner">';
            metrics.forEach(function(m) {
                html += '<div class="metric-item">';
                html += '<div class="metric-item__number">' + escapeHtml(m.number) + '</div>';
                html += '<div class="metric-item__label">' + escapeHtml(m.label) + '</div>';
                html += '</div>';
            });
            html += '</div></section>';
        }

        // ═══ ARTICLE CONTENT ═══
        html += '<section class="story-content">';
        html += '<div class="story-content__inner">';

        // Modules
        if (modulos.length) {
            html += '<div class="story-modules">';
            modulos.forEach(function(m) {
                var icon = moduleIcons[m] || 'fa-cube';
                html += '<span class="story-module-pill"><i class="fas ' + icon + '"></i> ' + escapeHtml(m) + '</span>';
            });
            html += '</div>';
        }

        // O Desafio
        html += '<h2>O Desafio</h2>';
        html += '<p>' + escapeHtml(story.desafio) + '</p>';

        // A Solução
        html += '<h2>A Solução com a Orbit</h2>';
        html += '<p>' + escapeHtml(story.solucao) + '</p>';

        // Os Resultados
        html += '<h2>Os Resultados</h2>';
        html += '<p>' + escapeHtml(story.resultados) + '</p>';

        // Video
        if (story.videoUrl) {
            html += '<h2>Vídeo</h2>';
            html += getVideoEmbed(story.videoUrl);
        }

        // Photo gallery
        if (photos.length) {
            html += '<h2>Galeria</h2>';
            html += '<div class="photo-gallery">';
            photos.forEach(function(p) {
                html += '<img src="' + p + '" alt="Foto" onclick="document.getElementById(\\'lightboxImg\\').src=this.src;document.getElementById(\\'lightbox\\').classList.add(\\'active\\')">';
            });
            html += '</div>';
        }

        html += '</div></section>'; // end content

        // ═══ SHARE BAR ═══
        html += '<section class="story-share-bar">';
        html += '<div class="story-share-bar__inner">';
        html += '<span class="share-label">Compartilhar esta história</span>';
        html += '<div class="share-buttons">';
        html += '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl + '" target="_blank" class="share-btn" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>';
        html += '<a href="https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle + '" target="_blank" class="share-btn" title="Twitter"><i class="fab fa-x-twitter"></i></a>';
        html += '<a href="https://api.whatsapp.com/send?text=' + pageTitle + '%20' + pageUrl + '" target="_blank" class="share-btn" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>';
        html += '<button class="share-btn" title="Copiar link" onclick="var b=this;navigator.clipboard.writeText(window.location.href);b.innerHTML=\\'<i class=\\\\\\'fas fa-check\\\\\\'></i>\\';setTimeout(function(){b.innerHTML=\\'<i class=\\\\\\'fas fa-link\\\\\\'></i>\\';},2000)"><i class="fas fa-link"></i></button>';
        html += '</div></div></section>';

        // ═══ CTA ═══
        html += '<section class="story-cta">';
        html += '<h3>Sua empresa também pode ser destaque</h3>';
        html += '<p>Conte como a Orbit transformou sua gestão e inspire outros negócios.</p>';
        html += '<a href="/historias/enviar" class="btn btn-primary btn-lg">Conte sua história</a>';
        html += '</section>';

        // ═══ RELATED STORIES ═══
        var otherStories = (db.customerStories || [])
            .filter(function(s) { return s.id !== storyId && s.status === 'published'; })
            .sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); })
            .slice(0, 4);

        if (otherStories.length) {
            html += '<section class="related-section">';
            html += '<div class="related-section__header">';
            html += '<h3>Outras histórias de sucesso</h3>';
            html += '<p>Veja como outras empresas transformaram sua gestão</p>';
            html += '</div>';
            html += '<div class="related-carousel-wrap"><div class="related-carousel">';
            otherStories.forEach(function(s) {
                html += '<a href="/historias/' + (s.slug || s.id) + '" class="related-card">';
                html += '<div class="related-card__segment">' + escapeHtml(SEGMENTS[s.segmento] || s.segmento || '') + '</div>';
                html += '<div class="related-card__company">' + escapeHtml(s.empresa) + '</div>';
                html += '<h4>' + escapeHtml(s.titulo) + '</h4>';
                html += '<span class="related-card__link">Leia a história &rarr;</span>';
                html += '</a>';
            });
            html += '</div></div></section>';
        }

        container.innerHTML = html;
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
    var header = document.querySelector('.header');
    var backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 50);
        if (backToTop) backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    if (backToTop) {
        backToTop.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // Dropdown hover
    document.querySelectorAll('.nav-menu > li').forEach(function(item) {
        var dropdown = item.querySelector('.dropdown');
        if (!dropdown) return;
        item.addEventListener('mouseenter', function() { dropdown.classList.add('show'); });
        item.addEventListener('mouseleave', function() { dropdown.classList.remove('show'); });
    });
    } catch(e) {
        console.error('Story render error:', e);
        var c = document.getElementById('storyContent');
        if (c) c.innerHTML = '<div class="article-not-found">' +
            '<i class="fas fa-exclamation-triangle"></i>' +
            '<h2>Erro ao carregar história</h2>' +
            '<p>Ocorreu um erro ao carregar esta história. Tente novamente.</p>' +
            '<a href="/historias" class="btn btn-primary">Ver todas as histórias</a></div>';
    }
    </script>
    <!-- Scroll Reveal -->
    <script>
    (function() {
        var els = document.querySelectorAll('[data-reveal],[data-reveal-stagger]');
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
