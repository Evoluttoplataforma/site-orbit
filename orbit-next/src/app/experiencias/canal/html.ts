export const pageHTML = `
<style>
/* ═══ A/B version toggle ═══ */
.cl-va, .cl-vb { display: none; }
body.version-a .cl-va { display: block; }
body.version-b .cl-vb { display: block; }
body.version-a .cl-va-inline { display: inline !important; }
body.version-b .cl-vb-inline { display: inline !important; }

/* ═══ LP Canal — override dark em todas as seções ═══ */
.cl-wrap { background: #0D1117; color: #C9D1D9; min-height: 100vh; }
.cl-wrap .lp-section { background: #0D1117 !important; color: #C9D1D9; }
.cl-wrap .lp-section--alt { background: #161b22 !important; }
.cl-wrap .lp-section-header h2 { color: #fff !important; }
.cl-wrap .math-number-card { background: #161b22; border: 1px solid #21262d; color: #C9D1D9; }
.cl-wrap .big-label { color: #8B949E; }
.cl-wrap .faq-question { color: #fff !important; background: transparent !important; }
.cl-wrap .faq-question i { color: #ffba1a !important; }
.cl-wrap .faq-answer__inner { color: #8B949E !important; }
.cl-wrap .faq-item { border-color: #21262d !important; }
.cl-wrap .section-badge { background: rgba(255,186,26,0.1); color: #ffba1a; border: 1px solid rgba(255,186,26,0.2); }
.cl-wrap .section-badge--red { background: rgba(220,38,38,0.1); color: #DC2626; border: 1px solid rgba(220,38,38,0.2); }

/* Nav minimalista */
.cl-nav { padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.06); background: #0D1117; }
.cl-nav .container { display: flex; align-items: center; justify-content: space-between; }
.cl-nav img { height: 36px; }

/* Footer minimalista */
.cl-footer { padding: 24px 0; border-top: 1px solid #21262d; text-align: center; font-size: 13px; color: #484F58; background: #0D1117; }
</style>

<div class="cl-wrap">

<!-- ═══ NAV MINIMAL ═══ -->
<nav class="cl-nav">
    <div class="container">
        <a href="/"><img src="/images/logo-orbit-white.png" alt="Orbit Gestão" height="36"></a>
        <a href="#ctaFinal" class="btn btn-primary" style="padding:10px 24px;font-size:14px;">AGENDAR CONVERSA</a>
    </div>
</nav>

<!-- ═══ HERO ═══ -->
<section class="lp-hero" id="hero">
    <div class="lp-hero__glow lp-hero__glow--1"></div>
    <div class="lp-hero__glow lp-hero__glow--2"></div>
    <div class="container">
        <span class="hero-zoom__badge" data-reveal><i class="fas fa-rocket" style="margin-right:6px;"></i> Programa de Canais Orbit</span>

        <!-- COPY A Hero -->
        <div class="cl-va">
            <h1 class="hero-zoom__title" data-reveal>
                Você entrega. O cliente não mantém.<br>
                O resultado se perde. <span class="hero-zoom__title-highlight">Até agora.</span>
            </h1>
            <p class="hero-zoom__subtitle" data-reveal>Agentes de IA que trabalham com você durante o projeto e continuam executando no cliente depois. O ciclo se quebra. A recorrência começa.</p>
        </div>

        <!-- COPY B Hero -->
        <div class="cl-vb">
            <h1 class="hero-zoom__title" data-reveal>
                <span class="hero-zoom__title-highlight">R$600</span> de custo.
                <span class="hero-zoom__title-highlight">R$3.000</span> de receita.
                <span class="hero-zoom__title-highlight">80%</span> de margem. Todo mês.
            </h1>
            <p class="hero-zoom__subtitle" data-reveal>Agentes de IA que operam a gestão no cliente com a sua marca. Você vende consultoria recorrente sem entregar mais horas.</p>
        </div>

        <!-- Video -->
        <div data-reveal style="max-width:720px;margin:32px auto;border-radius:16px;overflow:hidden;background:#161b22;aspect-ratio:16/9;position:relative;cursor:pointer;" id="videoWrapper">
            <div style="width:100%;height:100%;background:#161b22;display:flex;align-items:center;justify-content:center;">
                <div style="width:72px;height:72px;background:rgba(255,186,26,0.9);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                    <i class="fas fa-play" style="color:#0D1117;font-size:24px;margin-left:4px;"></i>
                </div>
            </div>
        </div>

        <div class="hero-zoom__ctas" data-reveal style="margin-top:32px;">
            <div class="cl-va"><a href="#ctaFinal" class="btn btn-primary btn-lg hero-cta-glow">QUERO QUEBRAR ESSE CICLO</a></div>
            <div class="cl-vb"><a href="#ctaFinal" class="btn btn-primary btn-lg hero-cta-glow">QUERO ENTENDER O MODELO</a></div>
        </div>
        <p class="hero-zoom__note" data-reveal>Sem compromisso • 15 minutos • 100% gratuito</p>
    </div>
</section>


<!-- ═══ PROBLEMA (A) / OPORTUNIDADE (B) ═══ -->
<section class="lp-section lp-section--alt">
    <div class="lp-container">

        <!-- COPY A — O ciclo -->
        <div class="cl-va">
            <div class="lp-section-header" data-reveal>
                <span class="section-badge section-badge--red">Isso te parece familiar?</span>
                <h2>O ciclo que <span style="color:#ffba1a;">todo consultor</span> conhece</h2>
            </div>

            <div class="math-numbers" data-reveal-stagger>
                <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                    <div style="font-size:36px;margin-bottom:12px;">✅</div>
                    <div class="big-number big-number--gold" style="font-size:20px;">Você entrega o projeto</div>
                    <div class="big-label" style="color:#8B949E;margin-top:8px;">Diagnóstico, plano, indicadores. Tudo redondo. O cliente sai satisfeito.</div>
                </div>
                <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                    <div style="font-size:36px;margin-bottom:12px;">📉</div>
                    <div class="big-number big-number--gold" style="font-size:20px;">O cliente não mantém</div>
                    <div class="big-label" style="color:#8B949E;margin-top:8px;">Sem equipe, sem tempo, sem disciplina. Em 3 meses, tudo volta ao estado anterior.</div>
                </div>
                <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                    <div style="font-size:36px;margin-bottom:12px;">🔄</div>
                    <div class="big-number big-number--gold" style="font-size:20px;">Você caça novo cliente</div>
                    <div class="big-label" style="color:#8B949E;margin-top:8px;">E o ciclo recomeça. Receita instável. Resultado que se perde.</div>
                </div>
            </div>

            <div data-reveal style="max-width:700px;margin:0 auto;background:rgba(255,186,26,0.06);border:1px solid rgba(255,186,26,0.15);border-radius:16px;padding:24px 32px;text-align:center;">
                <p style="font-size:17px;color:#C9D1D9;"><strong style="color:#ffba1a;">70% dos projetos de consultoria não sustentam resultados em 12 meses.</strong></p>
                <p style="font-size:13px;color:#8B949E;margin-top:8px;">— McKinsey & Company</p>
            </div>
        </div>

        <!-- COPY B — Oportunidade -->
        <div class="cl-vb">
            <div class="lp-section-header" data-reveal>
                <span class="section-badge">Dados de mercado</span>
                <h2>O mercado está se movendo. <span style="color:#ffba1a;">Você está posicionado?</span></h2>
            </div>

            <div class="math-numbers" data-reveal-stagger>
                <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                    <div class="big-number big-number--gold">94%</div>
                    <div class="big-label">das funções administrativas podem ser cobertas por IA. Só 33% estão.</div>
                    <div style="margin-top:8px;font-size:12px;color:#484F58;">— Anthropic</div>
                </div>
                <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                    <div class="big-number big-number--gold">11%</div>
                    <div class="big-label">usam IA agêntica em produção. 38% estão em piloto.</div>
                    <div style="margin-top:8px;font-size:12px;color:#484F58;">— Deloitte</div>
                </div>
                <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                    <div class="big-number big-number--green">Janela aberta</div>
                    <div class="big-label">Quem ocupar esse espaço agora define o padrão do mercado.</div>
                </div>
            </div>
        </div>
    </div>
</section>


<!-- ═══ SOLUÇÃO (A) / COMO FUNCIONA (B) ═══ -->
<section class="lp-section">
    <div class="lp-container">

        <!-- COPY A — E se continuassem executando? -->
        <div class="cl-va">
            <div class="lp-section-header" data-reveal>
                <h2>E se os agentes de IA <span style="color:#ffba1a;">continuassem executando?</span></h2>
            </div>

            <div class="math-numbers" data-reveal-stagger>
                <div class="math-number-card">
                    <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ffba1a;margin-bottom:8px;">DURANTE</div>
                    <div class="big-number big-number--gold" style="font-size:18px;">Agentes trabalham com você</div>
                    <div class="big-label" style="margin-top:8px;">Organizam dados, estruturam indicadores, aceleram entregas. Você foca no que importa.</div>
                </div>
                <div class="math-number-card">
                    <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#C9D1D9;margin-bottom:8px;">DEPOIS</div>
                    <div class="big-number big-number--gold" style="font-size:18px;">O projeto termina. Os agentes não param.</div>
                    <div class="big-label" style="margin-top:8px;">Monitoram, cobram, alertam. 24/7. Sem você precisar estar lá.</div>
                </div>
                <div class="math-number-card">
                    <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#22C55E;margin-bottom:8px;">RESULTADO</div>
                    <div class="big-number big-number--green" style="font-size:18px;">Recorrência real</div>
                    <div class="big-label" style="margin-top:8px;">O cliente paga pela operação contínua. Você ganha na recorrência. Sem entregar mais horas.</div>
                </div>
            </div>
        </div>

        <!-- COPY B — 3 Passos -->
        <div class="cl-vb">
            <div class="lp-section-header" data-reveal>
                <h2>O modelo em <span style="color:#ffba1a;">3 passos</span></h2>
            </div>

            <div class="math-numbers" data-reveal-stagger>
                <div class="math-number-card">
                    <div class="big-number big-number--gold">1</div>
                    <div class="big-label"><strong style="color:#fff;">Configure com sua metodologia.</strong> White-label completo — sua marca, sua URL.</div>
                </div>
                <div class="math-number-card">
                    <div class="big-number big-number--gold">2</div>
                    <div class="big-label"><strong style="color:#fff;">Agentes trabalham durante e depois.</strong> O projeto termina, os agentes continuam operando.</div>
                </div>
                <div class="math-number-card">
                    <div class="big-number big-number--green">3</div>
                    <div class="big-label"><strong style="color:#fff;">Recorrência real.</strong> O cliente paga mensalidade. Você retém a margem.</div>
                </div>
            </div>
        </div>
    </div>
</section>


<!-- ═══ MATEMÁTICA ═══ -->
<section class="lp-section lp-section--alt">
    <div class="lp-container">

        <!-- COPY A -->
        <div class="cl-va">
            <div class="lp-section-header" data-reveal>
                <h2>A conta que <span style="color:#ffba1a;">muda o modelo</span></h2>
            </div>
        </div>

        <!-- COPY B -->
        <div class="cl-vb">
            <div class="lp-section-header" data-reveal>
                <h2>A matemática é <span style="color:#ffba1a;">simples</span></h2>
            </div>
        </div>

        <div class="math-numbers" data-reveal-stagger>
            <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                <div class="big-number" style="color:#C9D1D9;">R$600</div>
                <div class="big-label">seu custo/mês por cliente</div>
            </div>
            <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                <div class="big-number big-number--gold">R$3.000</div>
                <div class="big-label">sua venda/mês (média)</div>
            </div>
            <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                <div class="big-number big-number--green">80%</div>
                <div class="big-label">margem líquida</div>
            </div>
        </div>

        <!-- Copy B: números extras -->
        <div class="cl-vb">
            <div class="math-numbers" data-reveal-stagger style="margin-top:24px;">
                <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                    <div class="big-number big-number--green">R$24k</div>
                    <div class="big-label">com 10 clientes/mês</div>
                </div>
                <div class="math-number-card" style="background:#161b22;border:1px solid #21262d;">
                    <div class="big-number big-number--green">R$48k</div>
                    <div class="big-label">com 20 clientes/mês</div>
                </div>
            </div>
        </div>

        <!-- Copy A: resultado -->
        <div class="cl-va">
            <div data-reveal style="max-width:500px;margin:32px auto 0;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.15);border-radius:16px;padding:24px 32px;text-align:center;">
                <p style="font-size:15px;color:#8B949E;">Com 10 clientes ativos</p>
                <p style="font-size:32px;font-weight:800;color:#22C55E;margin:8px 0;">R$ 24.000/mês</p>
            </div>
        </div>

        <p data-reveal style="text-align:center;font-size:16px;color:#8B949E;margin-top:24px;">Sem entregar mais horas. Os agentes fazem o trabalho pesado.</p>
    </div>
</section>


<!-- ═══ PROVA SOCIAL ═══ -->
<section class="lp-section">
    <div class="lp-container">

        <div class="cl-va">
            <div class="lp-section-header" data-reveal>
                <h2>Você faz parte dessa história. <span style="color:#ffba1a;">O próximo capítulo começa agora.</span></h2>
            </div>
        </div>
        <div class="cl-vb">
            <div class="lp-section-header" data-reveal>
                <h2><span style="color:#ffba1a;">30 anos</span> de consultoria. 2.000+ empresas. Agora com IA.</h2>
            </div>
        </div>

        <div class="math-numbers" data-reveal-stagger>
            <div class="math-number-card">
                <div class="big-number big-number--gold">30+</div>
                <div class="big-label">anos no mercado de gestão</div>
            </div>
            <div class="math-number-card">
                <div class="big-number big-number--gold">2.000+</div>
                <div class="big-label">empresas atendidas</div>
            </div>
            <div class="math-number-card">
                <div class="big-number big-number--gold">30+</div>
                <div class="big-label">canais ativos na plataforma</div>
            </div>
        </div>
    </div>
</section>


<!-- ═══ FAQ ═══ -->
<section class="lp-section lp-section--alt">
    <div class="lp-container">
        <div class="lp-section-header" data-reveal>
            <h2>Perguntas frequentes</h2>
        </div>

        <div class="faq-list" data-reveal>
            <div class="faq-item">
                <button class="faq-question">
                    <span>Preciso ter experiência com IA?</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer__inner">
                        Não. A Orbit cuida de toda a tecnologia. Você foca na sua metodologia e no relacionamento com o cliente. Os agentes são configurados e mantidos pela plataforma.
                    </div>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question">
                    <span>Como funciona o white-label?</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer__inner">
                        Sua marca, sua URL, seu logo. O cliente vê a plataforma como se fosse sua. Toda a infraestrutura de IA roda por trás, invisível pro cliente final.
                    </div>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question">
                    <span>Qual o investimento mínimo?</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer__inner">
                        O custo por cliente na plataforma é a partir de R$600/mês. Não há taxa de adesão ou mensalidade fixa obrigatória — você paga por cliente ativo.
                    </div>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question">
                    <span>Posso usar minha metodologia própria?</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer__inner">
                        Sim. Os agentes são configuráveis. Você define processos, indicadores, cadências e instruções. A plataforma executa a sua metodologia, não a nossa.
                    </div>
                </div>
            </div>
            <div class="faq-item">
                <button class="faq-question">
                    <span>E se o cliente cancelar?</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer__inner">
                        Como os agentes entregam valor contínuo (monitoramento, alertas, execução), a retenção tende a ser muito superior à consultoria tradicional. Modelo mensal — sem multa, sem lock-in.
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<!-- ═══ CTA FINAL ═══ -->
<section class="site-cta" id="ctaFinal">
    <div class="site-cta__particles"><span></span><span></span><span></span><span></span></div>
    <div class="container">
        <div class="site-cta__card" data-reveal="scale">
            <div class="site-cta__icon"><i class="fas fa-rocket"></i></div>

            <div class="cl-va">
                <h2>Pronto para quebrar o ciclo?</h2>
                <p>Agende uma conversa de 15 minutos para entender se faz sentido pra você.</p>
            </div>
            <div class="cl-vb">
                <h2>Pronto para montar o seu modelo?</h2>
                <p>15 minutos para alinhar pricing, white-label e primeiros passos.</p>
            </div>

            <div class="site-cta__buttons">
                <a href="/chat" class="btn btn-primary btn-lg">AGENDAR MINHA CONVERSA</a>
            </div>
            <p style="font-size:14px;color:#8B949E;margin-top:12px;">Sem compromisso. 100% gratuito.</p>
        </div>
    </div>
</section>

<!-- ═══ FOOTER MINIMAL ═══ -->
<footer class="cl-footer">
    <div class="container">
        <p>Orbit Gestão — Gestão Operada por IA &copy; 2026</p>
    </div>
</footer>

</div><!-- /cl-wrap -->

<script>
(function() {
    // Lê parâmetros
    var params = new URLSearchParams(window.location.search);
    var s = params.get('s') || '1';
    var v = params.get('v');

    // Se v não foi definido, randomiza 50/50 e salva no sessionStorage
    if (!v) {
        var stored = sessionStorage.getItem('__cl_version');
        if (stored) {
            v = stored;
        } else {
            v = Math.random() < 0.5 ? 'a' : 'b';
            sessionStorage.setItem('__cl_version', v);
        }
        // Atualiza URL sem reload
        var url = new URL(window.location.href);
        url.searchParams.set('v', v);
        url.searchParams.set('s', s);
        history.replaceState(null, '', url.toString());
    }

    // Aplica a classe no body
    document.body.classList.add(v === 'b' ? 'version-b' : 'version-a');

    // Smooth scroll para links com #
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Track: GTM dataLayer
    if (window.dataLayer) {
        window.dataLayer.push({
            event: 'lp_canal_view',
            lp_version: v,
            lp_segment: s
        });
    }
})();
</script>
`;
