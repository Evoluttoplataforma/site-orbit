// Orbit - Thank You Page
export const pageHTML = `
    <section class="ty-hero">
        <!-- Animated background -->
        <div class="ty-bg">
            <div class="ty-bg__glow ty-bg__glow--1"></div>
            <div class="ty-bg__glow ty-bg__glow--2"></div>
            <div class="ty-bg__glow ty-bg__glow--3"></div>
            <div class="ty-bg__grid"></div>
            <!-- Floating particles -->
            <div class="ty-particles" id="tyParticles"></div>
        </div>

        <div class="ty-content">
            <!-- Animated check icon -->
            <div class="ty-check">
                <div class="ty-check__ring ty-check__ring--1"></div>
                <div class="ty-check__ring ty-check__ring--2"></div>
                <div class="ty-check__ring ty-check__ring--3"></div>
                <div class="ty-check__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#0D1117" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12" class="ty-check__path"></polyline>
                    </svg>
                </div>
            </div>

            <!-- Confetti burst -->
            <div class="ty-confetti" id="tyConfetti"></div>

            <p class="ty-badge"><i class="fas fa-rocket"></i> Tudo certo!</p>

            <h1>Seu time de IA<br>est&aacute; sendo <span>montado</span></h1>

            <p class="ty-subtitle">Nosso time de consultores entrar&aacute; em contato em at&eacute; <strong>24 horas &uacute;teis</strong> para agendar sua demonstra&ccedil;&atilde;o personalizada.</p>

            <!-- Animated steps -->
            <div class="ty-timeline">
                <div class="ty-timeline__line"></div>
                <div class="ty-step ty-step--1">
                    <div class="ty-step__dot"><i class="fas fa-search"></i></div>
                    <div class="ty-step__content">
                        <h4>An&aacute;lise do perfil</h4>
                        <p>Vamos entender o momento da sua empresa e os principais desafios.</p>
                    </div>
                </div>
                <div class="ty-step ty-step--2">
                    <div class="ty-step__dot"><i class="fas fa-desktop"></i></div>
                    <div class="ty-step__content">
                        <h4>Demo personalizada</h4>
                        <p>Demonstra&ccedil;&atilde;o focada nas suas necessidades, com os agentes de IA em a&ccedil;&atilde;o.</p>
                    </div>
                </div>
                <div class="ty-step ty-step--3">
                    <div class="ty-step__dot"><i class="fas fa-handshake"></i></div>
                    <div class="ty-step__content">
                        <h4>Proposta sob medida</h4>
                        <p>Plano de implanta&ccedil;&atilde;o adequado ao tamanho e necessidade do seu neg&oacute;cio.</p>
                    </div>
                </div>
            </div>

            <!-- Social proof counter -->
            <div class="ty-proof">
                <div class="ty-proof__item">
                    <span class="ty-proof__number" data-target="8000">0</span><span class="ty-proof__plus">+</span>
                    <span class="ty-proof__label">contratos ativos</span>
                </div>
                <div class="ty-proof__divider"></div>
                <div class="ty-proof__item">
                    <span class="ty-proof__number" data-target="12">0</span>
                    <span class="ty-proof__label">agentes de IA</span>
                </div>
                <div class="ty-proof__divider"></div>
                <div class="ty-proof__item">
                    <span class="ty-proof__number" data-target="4">0</span>
                    <span class="ty-proof__label">pa&iacute;ses</span>
                </div>
            </div>

            <div class="ty-ctas">
                <a href="/" class="btn btn-primary btn-lg ty-cta-btn">
                    <i class="fas fa-home" style="margin-right:8px;"></i> Voltar ao site
                </a>
                <a href="/blog" class="btn btn-outline btn-lg ty-cta-btn">
                    <i class="fas fa-newspaper" style="margin-right:8px;"></i> Explorar conte&uacute;dos
                </a>
            </div>

            <p class="ty-follow">Siga-nos <a href="https://www.instagram.com/orbitgestao/" target="_blank"><i class="fab fa-instagram"></i> @orbitgestao</a></p>
        </div>
    </section>

    <script>
    // ── Particles ──
    (function() {
        var container = document.getElementById('tyParticles');
        if (!container) return;
        for (var i = 0; i < 30; i++) {
            var p = document.createElement('div');
            p.className = 'ty-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (6 + Math.random() * 8) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            p.style.opacity = (0.1 + Math.random() * 0.3).toString();
            container.appendChild(p);
        }
    })();

    // ── Confetti burst ──
    (function() {
        var container = document.getElementById('tyConfetti');
        if (!container) return;
        var colors = ['#ffba1a', '#fff', '#E5A235', '#22C55E', '#3B82F6', '#F59E0B'];
        for (var i = 0; i < 50; i++) {
            var c = document.createElement('div');
            c.className = 'ty-confetti-piece';
            c.style.left = '50%';
            c.style.top = '0';
            c.style.background = colors[Math.floor(Math.random() * colors.length)];
            c.style.setProperty('--x', (Math.random() - 0.5) * 600 + 'px');
            c.style.setProperty('--y', (Math.random() * -400 - 100) + 'px');
            c.style.setProperty('--r', Math.random() * 720 - 360 + 'deg');
            c.style.animationDelay = (Math.random() * 0.3) + 's';
            c.style.width = (4 + Math.random() * 6) + 'px';
            c.style.height = (4 + Math.random() * 6) + 'px';
            c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(c);
        }
    })();

    // ── Counter animation ──
    (function() {
        var counters = document.querySelectorAll('.ty-proof__number[data-target]');
        counters.forEach(function(el) {
            var target = parseInt(el.getAttribute('data-target'));
            var duration = 2000;
            var start = 0;
            var startTime = null;
            function step(ts) {
                if (!startTime) startTime = ts;
                var progress = Math.min((ts - startTime) / duration, 1);
                var ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(ease * target).toLocaleString('pt-BR');
                if (progress < 1) requestAnimationFrame(step);
            }
            setTimeout(function() { requestAnimationFrame(step); }, 800);
        });
    })();
    </script>
`;
