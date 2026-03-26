// Auto-generated from site/obrigado.html
export const pageHTML = `
    <section class="thankyou-hero">
        <div class="thankyou-hero__bg">
            <div class="thankyou-hero__glow thankyou-hero__glow--1"></div>
            <div class="thankyou-hero__glow thankyou-hero__glow--2"></div>
        </div>

        <div class="thankyou-content">
            <div class="thankyou-icon">
                <i class="fas fa-check"></i>
            </div>

            <h1>Recebemos seu <span>contato!</span></h1>
            <p>Nosso time de consultores entrará em contato em até <strong>24 horas úteis</strong> para agendar sua demonstração personalizada.</p>

            <div class="thankyou-steps">
                <div class="thankyou-step">
                    <div class="thankyou-step__number">1</div>
                    <h4>Análise do perfil</h4>
                    <p>Vamos entender o momento da sua empresa.</p>
                </div>
                <div class="thankyou-step">
                    <div class="thankyou-step__number">2</div>
                    <h4>Demo personalizada</h4>
                    <p>Demonstração focada nas suas necessidades.</p>
                </div>
                <div class="thankyou-step">
                    <div class="thankyou-step__number">3</div>
                    <h4>Proposta sob medida</h4>
                    <p>Plano de implantação adequado ao seu negócio.</p>
                </div>
            </div>

            <div class="thankyou-ctas">
                <a href="/" class="btn btn-primary btn-lg">Voltar ao site</a>
                <a href="/blog" class="btn btn-outline btn-lg">Explorar conteúdos</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <img src="/images/logo-orbit-white.png" alt="Orbit Gestão" height="36">
                    </div>
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

    <script>
        // Mobile menu, header scroll, dropdowns handled by PageLayout.tsx
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
