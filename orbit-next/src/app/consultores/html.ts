// Auto-generated
export const pageHTML = `
    <!-- ═══ 1. HERO ═══ -->
    <section class="lp-hero lp-section--dark">
        <div class="lp-container">
            <div data-reveal>
                <span class="lp-badge">30+ consultorias já são recorrentes com o Orbit</span>
                <p style="font-size:20px; color:#ffba1a; font-weight:700; margin-bottom:20px; letter-spacing:0.5px;">Pare de vender projeto. Comece a vender operação.</p>
                <h1>Seja uma plataforma de funcionários de IA para os seus clientes.</h1>
                <p class="lp-hero__sub">Transforme consultoria pontual em operação recorrente. Seus clientes ficam, sua receita cresce, seus agentes trabalham 24/7.</p>
                <a href="#cta-final" class="lp-btn lp-btn--gold">QUERO SER UMA PLATAFORMA DE IA PARA MEUS CLIENTES</a>
                <p class="lp-hero__note">&#9201; 2 min &bull; 100% gratuito &bull; Sem compromisso</p>
            </div>
        </div>
    </section>


    <!-- ═══ 2. PAIN - O ciclo do churn (Cinema) ═══ -->
    <section class="pain-cinema" id="dores-canais">
        <div class="pain-cinema__bg">
            <div class="pain-cinema__grid-lines"></div>
            <div class="pain-cinema__glow"></div>
        </div>
        <div class="container">
            <div class="section-header" data-reveal>
                <span class="section-badge section-badge--red">Isso te parece familiar?</span>
                <h2>Reconhece esse ciclo?</h2>
                <p>Vende projeto &rarr; entrega &rarr; cliente sai &rarr; precisa vender de novo. O inimigo não é a concorrência. É o <strong style="color:#EF4444;">churn estrutural</strong>.</p>
            </div>

            <div class="pain-thoughts" id="painThoughtsCanais">
                <div class="pain-thought" data-idx="0">
                    <div class="pain-thought__icon"><i class="fas fa-door-open"></i></div>
                    <div class="pain-thought__bubble">
                        <p>"Quando o projeto acaba, o cliente vai embora."</p>
                        <div class="pain-thought__typing"><span></span><span></span><span></span></div>
                    </div>
                    <div class="pain-thought__pulse"></div>
                </div>
                <div class="pain-thought" data-idx="1">
                    <div class="pain-thought__icon"><i class="fas fa-calendar-xmark"></i></div>
                    <div class="pain-thought__bubble">
                        <p>"Minha receita depende 100% da minha agenda."</p>
                        <div class="pain-thought__typing"><span></span><span></span><span></span></div>
                    </div>
                    <div class="pain-thought__pulse"></div>
                </div>
                <div class="pain-thought" data-idx="2">
                    <div class="pain-thought__icon"><i class="fas fa-arrow-down-wide-short"></i></div>
                    <div class="pain-thought__bubble">
                        <p>"O mercado está comoditizando o que eu faço."</p>
                        <div class="pain-thought__typing"><span></span><span></span><span></span></div>
                    </div>
                    <div class="pain-thought__pulse"></div>
                </div>
                <div class="pain-thought" data-idx="3">
                    <div class="pain-thought__icon"><i class="fas fa-user-group"></i></div>
                    <div class="pain-thought__bubble">
                        <p>"Não consigo escalar sem contratar gente."</p>
                        <div class="pain-thought__typing"><span></span><span></span><span></span></div>
                    </div>
                    <div class="pain-thought__pulse"></div>
                </div>
                <div class="pain-thought" data-idx="4">
                    <div class="pain-thought__icon"><i class="fas fa-rotate"></i></div>
                    <div class="pain-thought__bubble">
                        <p>"Fico refém da próxima venda."</p>
                        <div class="pain-thought__typing"><span></span><span></span><span></span></div>
                    </div>
                    <div class="pain-thought__pulse"></div>
                </div>
            </div>

            <!-- Resposta do Orbit -->
            <div class="pain-answer" id="painAnswerCanais">
                <div class="pain-answer__line"></div>
                <div class="pain-answer__card">
                    <div class="pain-answer__avatar">
                        <img src="images/olivia.png" alt="Olívia">
                        <div class="pain-answer__status"></div>
                    </div>
                    <div class="pain-answer__content">
                        <span class="pain-answer__name">Olívia - Orbit</span>
                        <p>"Eu entendo. Com o Orbit, seus clientes operam com IA - e você ganha receita recorrente."</p>
                    </div>
                </div>
                <div class="pain-answer__cta">
                    <a href="#cta-final" class="lp-btn lp-btn--gold">QUERO SAIR DESSE CICLO <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>

        <style>
            .pain-cinema {
                position: relative;
                padding: 120px 0 80px;
                background: #FAFBFC;
                overflow: hidden;
            }
            .pain-cinema .section-header h2 {
                color: #1A1D23;
            }
            .pain-cinema .section-header p {
                color: #5A6069;
            }
            .pain-cinema__bg {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }
            .pain-cinema__grid-lines {
                position: absolute;
                inset: 0;
                background-image:
                    linear-gradient(rgba(248,81,73,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(248,81,73,0.04) 1px, transparent 1px);
                background-size: 60px 60px;
                mask-image: radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 70%);
            }
            .pain-cinema__glow {
                position: absolute;
                width: 500px;
                height: 500px;
                top: 10%;
                left: 50%;
                transform: translateX(-50%);
                background: radial-gradient(circle, rgba(248,81,73,0.06) 0%, transparent 70%);
                border-radius: 50%;
                animation: pain-glow-pulse 4s ease-in-out infinite;
            }
            @keyframes pain-glow-pulse {
                0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
                50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
            }

            /* Section badge red */
            .section-badge--red {
                background: rgba(248,81,73,0.08);
                border: 1px solid rgba(248,81,73,0.2);
                color: #DC2626;
            }

            /* Pain thoughts container */
            .pain-thoughts {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                max-width: 800px;
                margin: 0 auto;
            }

            /* Individual thought */
            .pain-thought {
                display: flex;
                align-items: flex-start;
                gap: 14px;
                background: #fff;
                border: 1px solid #E5E7EB;
                border-radius: 16px;
                padding: 22px;
                position: relative;
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                transition: border-color 0.3s ease, box-shadow 0.3s ease;
                box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            }
            .pain-thought:hover {
                border-color: rgba(248,81,73,0.3);
                box-shadow: 0 8px 32px rgba(248,81,73,0.1);
                transform: translateY(-2px) scale(1);
            }
            .pain-thought.pain-visible {
                animation: pain-thought-in 0.6s forwards;
            }
            @keyframes pain-thought-in {
                0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                60% { transform: translateY(-4px) scale(1.01); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }

            /* Icon */
            .pain-thought__icon {
                width: 44px;
                height: 44px;
                border-radius: 12px;
                background: linear-gradient(135deg, #FEE2E2, #FECACA);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                position: relative;
                border: none;
            }
            .pain-thought__icon i {
                font-size: 17px;
                color: #DC2626;
            }

            /* Pulse ring around icon */
            .pain-thought__pulse {
                position: absolute;
                top: 22px;
                left: 22px;
                width: 44px;
                height: 44px;
                border-radius: 12px;
                border: 1px solid rgba(220,38,38,0.3);
                opacity: 0;
            }
            .pain-visible .pain-thought__pulse {
                animation: pain-icon-ring 2s 0.6s ease-out infinite;
            }
            @keyframes pain-icon-ring {
                0% { transform: scale(1); opacity: 0.5; }
                100% { transform: scale(1.6); opacity: 0; }
            }

            /* Bubble */
            .pain-thought__bubble p {
                font-size: 15px;
                color: #3D4450;
                line-height: 1.6;
                font-style: italic;
                margin: 0;
            }

            /* Typing indicator */
            .pain-thought__typing {
                display: flex;
                gap: 4px;
                padding: 4px 0;
                position: absolute;
                top: 22px;
                left: 80px;
            }
            .pain-thought__typing span {
                width: 6px;
                height: 6px;
                background: rgba(220,38,38,0.35);
                border-radius: 50%;
                animation: pain-typing-dot 1s infinite;
            }
            .pain-thought__typing span:nth-child(2) { animation-delay: 0.2s; }
            .pain-thought__typing span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes pain-typing-dot {
                0%, 100% { opacity: 0.3; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1); }
            }
            /* Hide typing once text is shown */
            .pain-thought.pain-typed .pain-thought__typing {
                display: none;
            }
            .pain-thought__bubble p {
                opacity: 0;
            }
            .pain-thought.pain-typed .pain-thought__bubble p {
                opacity: 1;
                animation: pain-text-reveal 0.4s ease;
            }
            @keyframes pain-text-reveal {
                from { opacity: 0; filter: blur(4px); }
                to { opacity: 1; filter: blur(0); }
            }

            /* ═══ Orbit Answer ═══ */
            .pain-answer {
                max-width: 600px;
                margin: 48px auto 0;
                opacity: 0;
                transform: translateY(20px);
            }
            .pain-answer.pain-answer-visible {
                animation: pain-answer-in 0.8s 0.3s forwards;
            }
            @keyframes pain-answer-in {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .pain-answer__line {
                width: 2px;
                height: 40px;
                background: linear-gradient(180deg, rgba(220,38,38,0.15), rgba(255,186,26,0.4));
                margin: 0 auto 0;
                border-radius: 2px;
            }
            .pain-answer__card {
                display: flex;
                align-items: flex-start;
                gap: 16px;
                background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
                border: 1px solid rgba(255,186,26,0.25);
                border-radius: 20px;
                padding: 24px;
                margin-top: 0;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(255,186,26,0.1);
            }
            .pain-answer__card::before {
                content: '';
                position: absolute;
                top: -1px;
                left: 20%;
                right: 20%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ffba1a, transparent);
            }
            .pain-answer__avatar {
                position: relative;
                flex-shrink: 0;
            }
            .pain-answer__avatar img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                border: 2px solid #ffba1a;
            }
            .pain-answer__status {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 12px;
                height: 12px;
                background: #22C55E;
                border-radius: 50%;
                border: 2px solid #FFFBEB;
                animation: rfm-live-blink 1.5s ease-in-out infinite;
            }
            @keyframes rfm-live-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
            }
            .pain-answer__name {
                font-size: 12px;
                font-weight: 700;
                color: #B8860B;
                display: block;
                margin-bottom: 6px;
            }
            .pain-answer__content p {
                font-size: 16px;
                color: #3D4450;
                line-height: 1.6;
                font-style: italic;
                margin: 0;
            }
            .pain-answer__cta {
                text-align: center;
                margin-top: 32px;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .pain-thoughts { grid-template-columns: 1fr; max-width: 480px; }
                .pain-cinema { padding: 80px 0 60px; }
            }
            @media (max-width: 480px) {
                .pain-thought { padding: 16px; gap: 12px; }
                .pain-thought__icon { width: 38px; height: 38px; border-radius: 10px; }
                .pain-thought__icon i { font-size: 14px; }
                .pain-thought__bubble p { font-size: 14px; }
                .pain-thought__typing { left: 66px; }
                .pain-thought__pulse { width: 38px; height: 38px; border-radius: 10px; top: 16px; left: 16px; }
            }
        </style>

        <script>
        (function() {
            var container = document.getElementById('painThoughtsCanais');
            var answer = document.getElementById('painAnswerCanais');
            if (!container) return;
            var thoughts = container.querySelectorAll('.pain-thought');
            var activated = false;

            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting && !activated) {
                        activated = true;
                        obs.unobserve(e.target);

                        thoughts.forEach(function(t, i) {
                            setTimeout(function() {
                                t.classList.add('pain-visible');
                            }, i * 500);
                            setTimeout(function() {
                                t.classList.add('pain-typed');
                            }, i * 500 + 600);
                        });

                        setTimeout(function() {
                            if (answer) answer.classList.add('pain-answer-visible');
                        }, thoughts.length * 500 + 800);
                    }
                });
            }, { threshold: 0.2 });
            obs.observe(container);
        })();
        </script>
    </section>


    <!-- ═══ 3. O NOVO MODELO (v2) ═══ -->
    <section class="lp-section lp-section--dark" id="modelo">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <span class="lp-badge">Modelo de negócio</span>
                <h2>Ganhe recorrência com IA<br>trabalhando pelo seu cliente.</h2>
                <p>Pare de depender de novos projetos. Com o Orbit, agentes continuam executando - e você ganha receita recorrente real.</p>
            </div>

            <div class="bm-cinema" id="bmCinemaCanais">
                <!-- Phase 1: Modelo Tradicional -->
                <div class="bm-phase bm-phase--old" data-phase="old">
                    <div class="bm-phase__header">
                        <div class="bm-phase__badge bm-phase__badge--red"><i class="fas fa-xmark"></i> Modelo Tradicional</div>
                    </div>
                    <div class="bm-phase__timeline">
                        <div class="bm-phase__rail"><div class="bm-phase__rail-fill bm-phase__rail-fill--red"></div></div>
                        <div class="bm-step bm-step--old" data-idx="1">
                            <div class="bm-step__dot bm-step__dot--red">1</div>
                            <div class="bm-step__card">
                                <div class="bm-step__content">
                                    <strong>Projeto pontual</strong>
                                    <span>Escopo fechado, prazo curto, entrega única</span>
                                </div>
                                <div class="bm-step__scene">
                                    <div class="bm-scene-doc">
                                        <div class="bm-scene-doc__icon"><i class="fas fa-file-contract"></i></div>
                                        <div class="bm-scene-doc__lines"><span></span><span></span><span></span></div>
                                        <div class="bm-scene-doc__stamp"><i class="fas fa-clock"></i> Prazo: 30 dias</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bm-step bm-step--old" data-idx="2">
                            <div class="bm-step__dot bm-step__dot--red">2</div>
                            <div class="bm-step__card">
                                <div class="bm-step__content">
                                    <strong>Entrega e encerramento</strong>
                                    <span>Cliente recebe o material e o contrato acaba</span>
                                </div>
                                <div class="bm-step__scene">
                                    <div class="bm-scene-bye">
                                        <div class="bm-scene-bye__box"><i class="fas fa-box-archive"></i></div>
                                        <div class="bm-scene-bye__arrow"><i class="fas fa-arrow-right"></i></div>
                                        <div class="bm-scene-bye__client"><i class="fas fa-user"></i></div>
                                        <div class="bm-scene-bye__x"><i class="fas fa-link-slash"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bm-step bm-step--old" data-idx="3">
                            <div class="bm-step__dot bm-step__dot--red">3</div>
                            <div class="bm-step__card">
                                <div class="bm-step__content">
                                    <strong>Churn inevitável</strong>
                                    <span>Sem operação contínua, cliente para de pagar</span>
                                </div>
                                <div class="bm-step__scene">
                                    <div class="bm-scene-churn">
                                        <div class="bm-scene-churn__bar bm-scene-churn__bar--1"></div>
                                        <div class="bm-scene-churn__bar bm-scene-churn__bar--2"></div>
                                        <div class="bm-scene-churn__bar bm-scene-churn__bar--3"></div>
                                        <div class="bm-scene-churn__bar bm-scene-churn__bar--4"></div>
                                        <div class="bm-scene-churn__label"><i class="fas fa-arrow-trend-down"></i> Receita caindo</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bm-step bm-step--old" data-idx="4">
                            <div class="bm-step__dot bm-step__dot--red">4</div>
                            <div class="bm-step__card">
                                <div class="bm-step__content">
                                    <strong>Começar do zero</strong>
                                    <span>Precisa vender um novo projeto para faturar</span>
                                </div>
                                <div class="bm-step__scene">
                                    <div class="bm-scene-loop">
                                        <div class="bm-scene-loop__icon"><i class="fas fa-rotate"></i></div>
                                        <span>Ciclo eterno</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bm-phase__result bm-phase__result--red">
                        <i class="fas fa-triangle-exclamation"></i>
                        <span>Receita instável, ciclo de venda eterno</span>
                    </div>
                </div>

                <!-- VS Divider -->
                <div class="bm-vs">
                    <div class="bm-vs__line"></div>
                    <div class="bm-vs__circle">VS</div>
                    <div class="bm-vs__line"></div>
                </div>

                <!-- Phase 2: Modelo com Orbit -->
                <div class="bm-phase bm-phase--new" data-phase="new">
                    <div class="bm-phase__header">
                        <div class="bm-phase__badge bm-phase__badge--gold"><i class="fas fa-check"></i> Modelo com Orbit</div>
                        <div class="bm-phase__tag"><i class="fas fa-crown"></i> Recomendado</div>
                    </div>
                    <div class="bm-phase__timeline">
                        <div class="bm-phase__rail"><div class="bm-phase__rail-fill bm-phase__rail-fill--gold"></div></div>
                        <div class="bm-step bm-step--new" data-idx="1">
                            <div class="bm-step__dot bm-step__dot--gold">1</div>
                            <div class="bm-step__card bm-step__card--gold">
                                <div class="bm-step__content">
                                    <strong>Projeto + ativação de agentes</strong>
                                    <span>Mesmo escopo, mas agora com IA embutida</span>
                                </div>
                                <div class="bm-step__scene">
                                    <div class="bm-scene-activate">
                                        <div class="bm-scene-activate__agents">
                                            <span style="--d:0"><i class="fas fa-robot"></i></span>
                                            <span style="--d:1"><i class="fas fa-robot"></i></span>
                                            <span style="--d:2"><i class="fas fa-robot"></i></span>
                                        </div>
                                        <div class="bm-scene-activate__label"><i class="fas fa-bolt"></i> Agentes ativados</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bm-step bm-step--new" data-idx="2">
                            <div class="bm-step__dot bm-step__dot--gold">2</div>
                            <div class="bm-step__card bm-step__card--gold">
                                <div class="bm-step__content">
                                    <strong>Operação contínua com IA</strong>
                                    <span>Agentes seguem executando após a entrega</span>
                                </div>
                                <div class="bm-step__scene">
                                    <div class="bm-scene-running">
                                        <div class="bm-scene-running__pulse"></div>
                                        <div class="bm-scene-running__icon"><i class="fas fa-gear"></i></div>
                                        <div class="bm-scene-running__label">24/7 operando</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bm-step bm-step--new" data-idx="3">
                            <div class="bm-step__dot bm-step__dot--gold">3</div>
                            <div class="bm-step__card bm-step__card--gold">
                                <div class="bm-step__content">
                                    <strong>Receita recorrente</strong>
                                    <span>Cliente paga mensalidade porque IA continua trabalhando</span>
                                </div>
                                <div class="bm-step__scene">
                                    <div class="bm-scene-revenue">
                                        <div class="bm-scene-revenue__bar bm-scene-revenue__bar--1"></div>
                                        <div class="bm-scene-revenue__bar bm-scene-revenue__bar--2"></div>
                                        <div class="bm-scene-revenue__bar bm-scene-revenue__bar--3"></div>
                                        <div class="bm-scene-revenue__bar bm-scene-revenue__bar--4"></div>
                                        <div class="bm-scene-revenue__label"><i class="fas fa-arrow-trend-up"></i> Receita crescente</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bm-step bm-step--new" data-idx="4">
                            <div class="bm-step__dot bm-step__dot--green">4</div>
                            <div class="bm-step__card bm-step__card--green">
                                <div class="bm-step__content">
                                    <strong>Expansão natural</strong>
                                    <span>Ativar novos agentes = upsell sem venda nova</span>
                                </div>
                                <div class="bm-step__scene">
                                    <div class="bm-scene-expand">
                                        <div class="bm-scene-expand__item bm-scene-expand__item--1"><i class="fas fa-user-plus"></i> +3 agentes</div>
                                        <div class="bm-scene-expand__item bm-scene-expand__item--2"><i class="fas fa-chart-line"></i> +R$ 600/mês</div>
                                        <div class="bm-scene-expand__item bm-scene-expand__item--3"><i class="fas fa-rocket"></i> Sem venda nova</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bm-phase__result bm-phase__result--green">
                        <i class="fas fa-circle-check"></i>
                        <span>Receita previsível, margem ~90%, crescimento composto</span>
                    </div>
                </div>
            </div>

            <!-- Keypoint -->
            <div class="bm-keypoint" data-reveal>
                <div class="bm-keypoint__card">
                    <div class="bm-keypoint__icon"><i class="fas fa-bolt"></i></div>
                    <p><strong>Agentes continuam executando depois que você termina.</strong><br>Cliente continua pagando porque agentes continuam trabalhando. Você ganha receita recorrente real. Isso é <strong style="color:#ffba1a;">consultoria recorrente passiva</strong>.</p>
                </div>
            </div>

            <!-- IBM Quote -->
            <div class="bm-quote" data-reveal>
                <i class="fas fa-quote-left"></i>
                <p>O CEO da IBM Consulting declarou que consultorias devem agir como empresas de software para sobreviver à era da IA. A IBM já desenvolveu mais de 5.000 agentes digitais.</p>
            </div>
        </div>

        <style>
        /* ═══ BUSINESS MODEL CINEMA ═══ */
        .bm-cinema { max-width: 1000px; margin: 0 auto; }

        /* Phase containers */
        .bm-phase { margin-bottom: 0; }
        .bm-phase__header { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
        .bm-phase__badge {
            display: inline-flex; align-items: center; gap: 8px;
            font-size: 14px; font-weight: 700; padding: 8px 20px;
            border-radius: 50px; letter-spacing: 0.5px;
        }
        .bm-phase__badge--red { background: rgba(239,68,68,0.1); color: #EF4444; border: 1px solid rgba(239,68,68,0.25); }
        .bm-phase__badge--gold { background: rgba(255,186,26,0.1); color: #ffba1a; border: 1px solid rgba(255,186,26,0.25); }
        .bm-phase__tag {
            display: inline-flex; align-items: center; gap: 6px;
            background: linear-gradient(135deg, #ffba1a, #ffca4a);
            color: #000; font-size: 11px; font-weight: 800;
            padding: 5px 14px; border-radius: 50px;
            box-shadow: 0 4px 16px rgba(255,186,26,0.3);
        }

        /* Timeline rail */
        .bm-phase__timeline { position: relative; padding-left: 60px; }
        .bm-phase__rail {
            position: absolute; left: 22px; top: 0; bottom: 0; width: 3px;
            background: rgba(255,255,255,0.06); border-radius: 3px;
        }
        .bm-phase__rail-fill {
            width: 100%; height: 0%; border-radius: 3px;
            transition: height 2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bm-phase__rail-fill--red { background: linear-gradient(180deg, #EF4444, rgba(239,68,68,0.3)); box-shadow: 0 0 8px rgba(239,68,68,0.3); }
        .bm-phase__rail-fill--gold { background: linear-gradient(180deg, #ffba1a, #22C55E); box-shadow: 0 0 8px rgba(255,186,26,0.3); }
        .bm-phase.bm-active .bm-phase__rail-fill { height: 100%; }

        /* Steps */
        .bm-step {
            position: relative; margin-bottom: 20px;
            opacity: 0; transform: translateY(30px);
        }
        .bm-step:last-child { margin-bottom: 0; }
        .bm-step.bm-step-visible {
            opacity: 1; transform: translateY(0);
            transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .bm-step__dot {
            position: absolute; left: -60px; top: 50%; transform: translateY(-50%);
            width: 44px; height: 44px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 16px; font-weight: 800; z-index: 2;
        }
        .bm-step__dot--red { background: linear-gradient(135deg, #EF4444, #DC2626); color: #fff; box-shadow: 0 4px 16px rgba(239,68,68,0.3); }
        .bm-step__dot--gold { background: linear-gradient(135deg, #ffba1a, #ffca4a); color: #000; box-shadow: 0 4px 16px rgba(255,186,26,0.3); }
        .bm-step__dot--green {
            background: linear-gradient(135deg, #22C55E, #16A34A); color: #fff;
            box-shadow: 0 4px 16px rgba(34,197,94,0.3);
            animation: bm-green-pulse 2s ease-in-out infinite;
        }
        @keyframes bm-green-pulse {
            0%, 100% { box-shadow: 0 4px 16px rgba(34,197,94,0.3), 0 0 0 0 rgba(34,197,94,0.1); }
            50% { box-shadow: 0 4px 16px rgba(34,197,94,0.5), 0 0 0 10px rgba(34,197,94,0); }
        }

        /* Card */
        .bm-step__card {
            display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;
            background: linear-gradient(135deg, #1C2333, #13161D);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 16px; padding: 28px 24px;
            transition: all 0.3s ease;
        }
        .bm-step__card:hover {
            border-color: rgba(255,255,255,0.1);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .bm-step__card--gold { border-color: rgba(255,186,26,0.15); }
        .bm-step__card--gold:hover { border-color: rgba(255,186,26,0.3); box-shadow: 0 8px 32px rgba(255,186,26,0.1); }
        .bm-step__card--green { border-color: rgba(34,197,94,0.2); background: linear-gradient(135deg, #1C2333, rgba(34,197,94,0.05)); }
        .bm-step__content strong { display: block; font-size: 17px; color: #fff; margin-bottom: 6px; font-weight: 700; }
        .bm-step__content span { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.6; }
        .bm-step--old .bm-step__content strong { color: rgba(255,255,255,0.7); }

        /* Scenes */
        .bm-step__scene { display: flex; align-items: center; justify-content: center; min-height: 80px; }

        /* Scene: Document */
        .bm-scene-doc { display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; padding: 14px 18px; width: 100%; }
        .bm-scene-doc__icon { font-size: 24px; color: rgba(239,68,68,0.5); }
        .bm-scene-doc__lines { display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .bm-scene-doc__lines span { height: 4px; background: rgba(255,255,255,0.06); border-radius: 4px; }
        .bm-scene-doc__lines span:nth-child(1) { width: 80%; }
        .bm-scene-doc__lines span:nth-child(2) { width: 60%; }
        .bm-scene-doc__lines span:nth-child(3) { width: 70%; }
        .bm-step-visible .bm-scene-doc__lines span { animation: bm-line-draw 0.6s ease forwards; opacity: 0; }
        .bm-step-visible .bm-scene-doc__lines span:nth-child(1) { animation-delay: 0.3s; }
        .bm-step-visible .bm-scene-doc__lines span:nth-child(2) { animation-delay: 0.5s; }
        .bm-step-visible .bm-scene-doc__lines span:nth-child(3) { animation-delay: 0.7s; }
        @keyframes bm-line-draw { to { opacity: 1; } }
        .bm-scene-doc__stamp { font-size: 10px; color: rgba(239,68,68,0.6); white-space: nowrap; display: flex; align-items: center; gap: 4px; }

        /* Scene: Goodbye */
        .bm-scene-bye { display: flex; align-items: center; gap: 10px; justify-content: center; }
        .bm-scene-bye__box, .bm-scene-bye__client { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .bm-scene-bye__box { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); }
        .bm-scene-bye__arrow { color: rgba(255,255,255,0.15); font-size: 12px; }
        .bm-scene-bye__client { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); }
        .bm-scene-bye__x { color: #EF4444; font-size: 14px; opacity: 0; }
        .bm-step-visible .bm-scene-bye__x { animation: bm-x-appear 0.4s 0.8s forwards; }
        @keyframes bm-x-appear { to { opacity: 1; } }

        /* Scene: Churn bars (descending) */
        .bm-scene-churn { display: flex; align-items: flex-end; gap: 6px; height: 60px; position: relative; padding-bottom: 20px; }
        .bm-scene-churn__bar { width: 20px; border-radius: 4px 4px 0 0; background: rgba(239,68,68,0.3); }
        .bm-scene-churn__bar--1 { height: 50px; }
        .bm-scene-churn__bar--2 { height: 38px; }
        .bm-scene-churn__bar--3 { height: 24px; }
        .bm-scene-churn__bar--4 { height: 12px; }
        .bm-step-visible .bm-scene-churn__bar { animation: bm-bar-shrink 1s ease forwards; }
        @keyframes bm-bar-shrink { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); transform-origin: bottom; } }
        .bm-scene-churn__label { position: absolute; bottom: 0; left: 0; font-size: 10px; color: #EF4444; display: flex; align-items: center; gap: 4px; white-space: nowrap; }

        /* Scene: Loop */
        .bm-scene-loop { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .bm-scene-loop__icon { font-size: 28px; color: rgba(239,68,68,0.4); }
        .bm-step-visible .bm-scene-loop__icon { animation: bm-spin 3s linear infinite; }
        @keyframes bm-spin { to { transform: rotate(360deg); } }
        .bm-scene-loop span { font-size: 11px; color: rgba(239,68,68,0.5); font-weight: 600; }

        /* Scene: Activate agents */
        .bm-scene-activate { text-align: center; }
        .bm-scene-activate__agents { display: flex; gap: 8px; justify-content: center; margin-bottom: 10px; }
        .bm-scene-activate__agents span {
            width: 36px; height: 36px; border-radius: 50%;
            background: rgba(255,186,26,0.1); border: 1.5px solid rgba(255,186,26,0.3);
            display: flex; align-items: center; justify-content: center;
            font-size: 14px; color: #ffba1a;
            opacity: 0; transform: scale(0.5);
        }
        .bm-step-visible .bm-scene-activate__agents span { animation: bm-agent-pop 0.4s calc(var(--d) * 0.15s + 0.3s) forwards; }
        @keyframes bm-agent-pop { 0% { opacity: 0; transform: scale(0.5); } 70% { transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }
        .bm-scene-activate__label { font-size: 10px; font-weight: 700; color: #ffba1a; background: rgba(255,186,26,0.08); padding: 4px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 4px; }

        /* Scene: Running 24/7 */
        .bm-scene-running { position: relative; display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .bm-scene-running__pulse {
            position: absolute; width: 50px; height: 50px; border-radius: 50%;
            border: 2px solid rgba(255,186,26,0.2); top: 50%; left: 50%; transform: translate(-50%, -50%);
        }
        .bm-step-visible .bm-scene-running__pulse { animation: bm-running-pulse 2s ease-in-out infinite; }
        @keyframes bm-running-pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; } 50% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; } }
        .bm-scene-running__icon { font-size: 24px; color: #ffba1a; position: relative; z-index: 2; }
        .bm-step-visible .bm-scene-running__icon { animation: bm-gear-spin 4s linear infinite; }
        @keyframes bm-gear-spin { to { transform: rotate(360deg); } }
        .bm-scene-running__label { font-size: 10px; font-weight: 700; color: #ffba1a; }

        /* Scene: Revenue bars (ascending) */
        .bm-scene-revenue { display: flex; align-items: flex-end; gap: 6px; height: 60px; position: relative; padding-bottom: 20px; }
        .bm-scene-revenue__bar { width: 20px; border-radius: 4px 4px 0 0; background: linear-gradient(180deg, #ffba1a, rgba(255,186,26,0.4)); }
        .bm-scene-revenue__bar--1 { height: 14px; }
        .bm-scene-revenue__bar--2 { height: 26px; }
        .bm-scene-revenue__bar--3 { height: 38px; }
        .bm-scene-revenue__bar--4 { height: 52px; }
        .bm-step-visible .bm-scene-revenue__bar { animation: bm-bar-shrink 1s ease forwards; }
        .bm-scene-revenue__label { position: absolute; bottom: 0; left: 0; font-size: 10px; color: #22C55E; display: flex; align-items: center; gap: 4px; white-space: nowrap; }

        /* Scene: Expansion */
        .bm-scene-expand { display: flex; flex-direction: column; gap: 6px; }
        .bm-scene-expand__item {
            display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600;
            padding: 8px 14px; border-radius: 10px; opacity: 0; transform: translateX(20px);
        }
        .bm-scene-expand__item i { font-size: 11px; }
        .bm-scene-expand__item--1 { background: rgba(34,197,94,0.08); color: #22C55E; border: 1px solid rgba(34,197,94,0.15); }
        .bm-scene-expand__item--2 { background: rgba(255,186,26,0.08); color: #ffba1a; border: 1px solid rgba(255,186,26,0.15); }
        .bm-scene-expand__item--3 { background: rgba(99,102,241,0.08); color: #818CF8; border: 1px solid rgba(99,102,241,0.15); }
        .bm-step-visible .bm-scene-expand__item--1 { animation: bm-expand-in 0.5s 0.3s forwards; }
        .bm-step-visible .bm-scene-expand__item--2 { animation: bm-expand-in 0.5s 0.6s forwards; }
        .bm-step-visible .bm-scene-expand__item--3 { animation: bm-expand-in 0.5s 0.9s forwards; }
        @keyframes bm-expand-in { to { opacity: 1; transform: translateX(0); } }

        /* VS Divider */
        .bm-vs { display: flex; align-items: center; gap: 0; margin: 40px 0; }
        .bm-vs__line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); }
        .bm-vs__circle {
            width: 56px; height: 56px; border-radius: 50%;
            background: #161B22; border: 2px solid rgba(255,255,255,0.1);
            display: flex; align-items: center; justify-content: center;
            font-size: 14px; font-weight: 800; color: #fff; letter-spacing: 1px;
            flex-shrink: 0;
        }

        /* Phase result */
        .bm-phase__result {
            display: flex; align-items: center; gap: 10px;
            padding: 16px 20px; border-radius: 12px; margin-top: 20px; margin-left: 60px;
            font-size: 14px; font-weight: 600;
        }
        .bm-phase__result--red { background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15); color: rgba(239,68,68,0.7); }
        .bm-phase__result--green { background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); color: #22C55E; }

        /* Keypoint card */
        .bm-keypoint { margin-top: 48px; }
        .bm-keypoint__card {
            max-width: 740px; margin: 0 auto;
            background: linear-gradient(135deg, rgba(255,186,26,0.06), rgba(255,186,26,0.02));
            border: 1px solid rgba(255,186,26,0.15); border-radius: 16px;
            padding: 28px 32px; display: flex; align-items: flex-start; gap: 16px;
        }
        .bm-keypoint__icon { font-size: 20px; color: #ffba1a; flex-shrink: 0; margin-top: 2px; }
        .bm-keypoint__card p { color: rgba(255,255,255,0.75); font-size: 15px; line-height: 1.7; margin: 0; }
        .bm-keypoint__card strong { color: #fff; }

        /* Quote */
        .bm-quote {
            max-width: 740px; margin: 24px auto 0;
            padding: 24px 32px; background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.06); border-radius: 12px;
            display: flex; align-items: flex-start; gap: 12px;
        }
        .bm-quote i { color: #ffba1a; font-size: 16px; flex-shrink: 0; margin-top: 3px; }
        .bm-quote p { color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.7; margin: 0; }

        /* Responsive */
        @media (max-width: 768px) {
            .bm-phase__timeline { padding-left: 48px; }
            .bm-step__dot { left: -48px; width: 36px; height: 36px; font-size: 14px; }
            .bm-step__card { grid-template-columns: 1fr; gap: 16px; padding: 20px 18px; }
            .bm-phase__result { margin-left: 48px; font-size: 13px; }
            .bm-vs__circle { width: 44px; height: 44px; font-size: 12px; }
            .bm-keypoint__card, .bm-quote { padding: 20px 18px; }
        }
        @media (max-width: 480px) {
            .bm-phase__timeline { padding-left: 40px; }
            .bm-step__dot { left: -40px; width: 32px; height: 32px; font-size: 12px; }
            .bm-phase__result { margin-left: 40px; }
            .bm-step__card { padding: 16px 12px; gap: 12px; }
            .bm-step__text h3 { font-size: 16px; }
            .bm-step__text p { font-size: 13px; }
        }
        </style>

        <script>
        (function() {
            var cinema = document.getElementById('bmCinemaCanais');
            if (!cinema) return;
            var phases = cinema.querySelectorAll('.bm-phase');

            phases.forEach(function(phase) {
                var steps = phase.querySelectorAll('.bm-step');
                var activated = false;

                var obs = new IntersectionObserver(function(entries) {
                    entries.forEach(function(e) {
                        if (e.isIntersecting && !activated) {
                            activated = true;
                            phase.classList.add('bm-active');
                            steps.forEach(function(step, i) {
                                setTimeout(function() {
                                    step.classList.add('bm-step-visible');
                                }, i * 600);
                            });
                            obs.unobserve(e.target);
                        }
                    });
                }, { threshold: 0.15 });
                obs.observe(phase);
            });
        })();
        </script>
    </section>


    <!-- ═══ 4. MATEMÁTICA DO CANAL ═══ -->
    <section class="lp-section lp-section--light">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <h2>A matemática que muda tudo</h2>
            </div>

            <div class="math-numbers" data-reveal-stagger>
                <div class="math-number-card">
                    <div class="big-number big-number--gold">R$ 250</div>
                    <div class="big-label">/mês por cliente ativado</div>
                </div>
                <div class="math-number-card">
                    <div class="big-number big-number--green">~90%</div>
                    <div class="big-label">de margem para você</div>
                </div>
                <div class="math-number-card">
                    <div class="big-number big-number--gold">ZERO</div>
                    <div class="big-label">custo de tecnologia</div>
                </div>
            </div>

            <div data-reveal>
                <table class="math-table">
                    <thead>
                        <tr>
                            <th>Clientes</th>
                            <th>Receita Mensal</th>
                            <th>Receita Anual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10 clientes</td>
                            <td>R$ 2.500/mês</td>
                            <td>R$ 30.000/ano</td>
                        </tr>
                        <tr>
                            <td>25 clientes</td>
                            <td>R$ 6.250/mês</td>
                            <td>R$ 75.000/ano</td>
                        </tr>
                        <tr>
                            <td>50 clientes</td>
                            <td>R$ 12.500/mês</td>
                            <td>R$ 150.000/ano</td>
                        </tr>
                        <tr>
                            <td>100 clientes</td>
                            <td>R$ 25.000/mês</td>
                            <td>R$ 300.000/ano</td>
                        </tr>
                    </tbody>
                </table>
                <p class="math-note">Além da recorrência, você ganha na implementação (projeto único por cliente).</p>
            </div>
        </div>
    </section>


    <!-- ═══ 5. OS 12 AGENTES (Orbital Hub) ═══ -->
    <section class="lp-section lp-section--dark">
        <div class="lp-container">
                <!-- ═══ OLÍVIA - COORDENADORA ═══ -->
    <section class="section-padded-lg" style="background:#161B22;" id="olivia">
        <div class="container">
            <div class="olivia-intro" data-reveal>
                <div>
                    <span class="section-badge">Conheça a líder do time</span>
                    <h2 style="font-size:2.25rem;font-weight:800;color:#fff;margin:16px 0;">Olívia, sua <span style="color:#ffba1a;">Coordenadora de IA</span></h2>
                    <p style="color:#C9D1D9;font-size:1.1rem;line-height:1.7;margin-bottom:20px;">Olívia é a especialista em IA do Orbit e a voz do sistema para sua empresa. Ela coordena os 12 agentes, conecta dados de todos os departamentos e traduz complexidade em clareza para a tomada de decisão.</p>
                    <p style="color:#8B949E;font-size:1rem;line-height:1.7;margin-bottom:24px;">Quando o Agente de Riscos detecta uma ameaça, é a Olívia que cruza com o Agente de Oportunidades e apresenta o cenário completo. Humana o suficiente para criar vínculo. Inteligente o suficiente para gerar valor real.</p>
                    <div style="background:#1C2333;border-left:3px solid #ffba1a;padding:20px 24px;border-radius:0 12px 12px 0;">
                        <p style="color:#C9D1D9;font-style:italic;margin:0;">"Bom dia! Analisei os dados da semana. Três pontos precisam da sua atenção: margem caiu 2%, o time comercial bateu recorde, e temos uma oportunidade no segmento B que ninguém está olhando. Vamos resolver?"</p>
                        <span style="color:#ffba1a;font-size:0.875rem;margin-top:8px;display:block;">- Olívia, Coordenadora Geral</span>
                    </div>
                </div>
                <div style="background:linear-gradient(135deg,rgba(255,186,26,0.1),rgba(255,186,26,0.02));border:2px solid rgba(255,186,26,0.2);border-radius:14px;padding:32px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                    <img src="/images/olivia.png" alt="Olívia - Coordenadora Geral de IA do Orbit" style="width:200px;height:200px;border-radius:50%;object-fit:cover;border:4px solid #ffba1a;margin-bottom:24px;">
                    <h3 style="color:#fff;font-size:1.5rem;margin-bottom:8px;">Olívia</h3>
                    <p style="color:#ffba1a;font-size:0.95rem;margin-bottom:16px;">Coordenadora Geral de IA</p>
                    <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
                        <span style="background:rgba(255,186,26,0.15);color:#ffba1a;padding:6px 14px;border-radius:20px;font-size:0.8rem;">Coordena 12 agentes</span>
                        <span style="background:rgba(255,186,26,0.15);color:#ffba1a;padding:6px 14px;border-radius:20px;font-size:0.8rem;">Conecta todos os dados</span>
                        <span style="background:rgba(255,186,26,0.15);color:#ffba1a;padding:6px 14px;border-radius:20px;font-size:0.8rem;">Traduz em decisão</span>
                    </div>
                </div>
            </div>

            <!-- ═══ ORBITAL: 12 agentes ao redor da Olívia ═══ -->
            <div style="margin-top:80px;" id="agentes">
                <!-- Section header -->
                <div style="text-align:center;margin-bottom:24px;" data-reveal>
                    <span class="section-badge section-badge--gold">12 agentes especializados</span>
                    <h3 style="color:#fff;font-size:clamp(1.5rem,3vw,2rem);font-weight:800;margin:16px 0 12px;">Seu time de IA coordenado pela <span style="color:#ffba1a;">Olívia</span></h3>
                    <p style="color:rgba(255,255,255,0.5);font-size:1rem;max-width:560px;margin:0 auto;">Cada agente domina uma área. A Olívia coordena todos, conecta os dados e entrega clareza.</p>
                </div>

                <!-- Orbital container - SVG lines drawn by JS -->
                <div class="orbit-hub" id="orbitHub">
                    <!-- Center: Olívia -->
                    <div class="orbit-hub__center">
                        <div class="orbit-hub__glow"></div>
                        <div class="orbit-hub__photo">
                            <img src="/images/olivia.png" alt="Olívia">
                        </div>
                        <div class="orbit-hub__name">Olívia</div>
                        <div class="orbit-hub__role">Coordenadora Geral</div>
                        <div class="orbit-hub__ring orbit-hub__ring--1"></div>
                        <div class="orbit-hub__ring orbit-hub__ring--2"></div>
                        <div class="orbit-hub__ring orbit-hub__ring--3"></div>
                    </div>

                    <!-- SVG connector lines (drawn by JS) -->
                    <svg class="orbit-hub__lines" id="orbitLines"></svg>

                    <!-- 12 Agent nodes positioned in a circle -->
                    <div class="orbit-hub__node" data-idx="0">
                        <div class="orbit-hub__node-icon"><i class="fas fa-compass"></i></div>
                        <div class="orbit-hub__node-label">Estrategista</div>
                        <div class="orbit-hub__node-desc">SWOT, BSC e planejamento estratégico</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente Estrategista</div>
                            <div class="orbit-node-card__text">Analisa o cenário da empresa com SWOT, define OKRs e monta o planejamento estratégico. Cruza dados de todos os outros agentes para alinhar a direção.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>95%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:95%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">SWOT</span><span class="orbit-node-card__tag">BSC</span><span class="orbit-node-card__tag">OKRs</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="1">
                        <div class="orbit-hub__node-icon"><i class="fas fa-diagram-project"></i></div>
                        <div class="orbit-hub__node-label">Processos</div>
                        <div class="orbit-hub__node-desc">Mapeamento, playbooks e automação</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Processos</div>
                            <div class="orbit-node-card__text">Mapeia, documenta e gera instruções de trabalho automaticamente. Reduz retrabalho e garante qualidade em cada execução.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>90%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:90%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Playbooks</span><span class="orbit-node-card__tag">ISO</span><span class="orbit-node-card__tag">Automação</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="2">
                        <div class="orbit-hub__node-icon"><i class="fas fa-user-group"></i></div>
                        <div class="orbit-hub__node-label">Pessoas</div>
                        <div class="orbit-hub__node-desc">Cargos, desempenho e PDIs</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Pessoas</div>
                            <div class="orbit-node-card__text">Cria descrições de cargo, avaliações de desempenho e PDIs personalizados. Identifica gaps de competência e sugere trilhas de desenvolvimento.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>88%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:88%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">360°</span><span class="orbit-node-card__tag">PDI</span><span class="orbit-node-card__tag">Skills</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="3">
                        <div class="orbit-hub__node-icon"><i class="fas fa-graduation-cap"></i></div>
                        <div class="orbit-hub__node-label">Treinamento</div>
                        <div class="orbit-hub__node-desc">Microlearning e trilhas via WhatsApp</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Treinamento</div>
                            <div class="orbit-node-card__text">Treina equipes via WhatsApp com microlearning diário. Adapta conteúdo ao nível de cada colaborador e acompanha engajamento.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>92%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:92%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">WhatsApp</span><span class="orbit-node-card__tag">Micro</span><span class="orbit-node-card__tag">Quiz</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="4">
                        <div class="orbit-hub__node-icon"><i class="fas fa-chart-column"></i></div>
                        <div class="orbit-hub__node-label">Indicadores</div>
                        <div class="orbit-hub__node-desc">KPIs em tempo real e causa raiz</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Indicadores</div>
                            <div class="orbit-node-card__text">Monitora KPIs em tempo real, identifica desvios e sugere hipóteses de causa raiz com IA antes que o problema cresça.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>94%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:94%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">KPIs</span><span class="orbit-node-card__tag">Dashboard</span><span class="orbit-node-card__tag">Alertas</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="5">
                        <div class="orbit-hub__node-icon"><i class="fas fa-magnifying-glass-chart"></i></div>
                        <div class="orbit-hub__node-label">Pesquisa</div>
                        <div class="orbit-hub__node-desc">Clima, formulários e insights</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Pesquisa</div>
                            <div class="orbit-node-card__text">Cria pesquisas de clima, satisfação e NPS. Analisa respostas e entrega insights acionáveis sobre a percepção das equipes.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>82%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:82%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">NPS</span><span class="orbit-node-card__tag">Clima</span><span class="orbit-node-card__tag">Insights</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="6">
                        <div class="orbit-hub__node-icon"><i class="fas fa-shield-halved"></i></div>
                        <div class="orbit-hub__node-label">Riscos</div>
                        <div class="orbit-hub__node-desc">Mitigação e prevenção contínua</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Riscos</div>
                            <div class="orbit-node-card__text">Identifica ameaças antes que virem crises. Monitora indicadores de risco e sugere planos de mitigação preventivos.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>91%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:91%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Prevenção</span><span class="orbit-node-card__tag">PDCA</span><span class="orbit-node-card__tag">Alertas</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="7">
                        <div class="orbit-hub__node-icon"><i class="fas fa-lightbulb"></i></div>
                        <div class="orbit-hub__node-label">Oportunidades</div>
                        <div class="orbit-hub__node-desc">Mercado, parcerias e expansão</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Oportunidades</div>
                            <div class="orbit-node-card__text">Escaneia o mercado, identifica novas oportunidades e cruza com dados internos para sugerir ações de expansão e parcerias.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>87%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:87%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Mercado</span><span class="orbit-node-card__tag">Growth</span><span class="orbit-node-card__tag">Parcerias</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="8">
                        <div class="orbit-hub__node-icon"><i class="fas fa-triangle-exclamation"></i></div>
                        <div class="orbit-hub__node-label">Problemas</div>
                        <div class="orbit-hub__node-desc">Não-conformidades e PDCA</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Problemas</div>
                            <div class="orbit-node-card__text">Registra não-conformidades, aplica PDCA automaticamente e acompanha a resolução até o fechamento com evidências.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>89%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:89%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">PDCA</span><span class="orbit-node-card__tag">5W2H</span><span class="orbit-node-card__tag">NC</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="9">
                        <div class="orbit-hub__node-icon"><i class="fas fa-file-lines"></i></div>
                        <div class="orbit-hub__node-label">Documentos</div>
                        <div class="orbit-hub__node-desc">Padronização e controle</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Documentos</div>
                            <div class="orbit-node-card__text">Padroniza, versiona e controla todos os documentos da empresa. Garante que todos trabalhem com a versão mais recente.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>80%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:80%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Versão</span><span class="orbit-node-card__tag">ISO</span><span class="orbit-node-card__tag">Padrão</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="10">
                        <div class="orbit-hub__node-icon"><i class="fas fa-handshake"></i></div>
                        <div class="orbit-hub__node-label">Vendas</div>
                        <div class="orbit-hub__node-desc">CRM, funil e coaching comercial</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Vendas</div>
                            <div class="orbit-node-card__text">Gerencia o funil comercial, faz coaching da equipe de vendas e identifica oportunidades de upsell e cross-sell com IA.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>93%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:93%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">CRM</span><span class="orbit-node-card__tag">Funil</span><span class="orbit-node-card__tag">Coaching</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="11">
                        <div class="orbit-hub__node-icon"><i class="fas fa-video"></i></div>
                        <div class="orbit-hub__node-label">Reuniões</div>
                        <div class="orbit-hub__node-desc">Transcrição e planos de ação</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Reuniões</div>
                            <div class="orbit-node-card__text">Transcreve reuniões, extrai decisões e gera planos de ação automaticamente. Nunca mais perca um follow-up.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>86%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:86%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Ata</span><span class="orbit-node-card__tag">Follow-up</span><span class="orbit-node-card__tag">IA</span></div>
                        </div>
                    </div>
                </div>

                <!-- Bottom CTA -->
                <div style="text-align:center;margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.06);" data-reveal>
                    <p style="color:rgba(255,255,255,0.5);font-size:1.1rem;margin-bottom:20px;">12 especialistas. 1 coordenadora. <strong style="color:#fff;">Custo de 1 funcionário.</strong></p>
                    <a href="#contato" class="btn btn-primary btn-lg">Quero meu time de IA <i class="fas fa-arrow-right" style="margin-left:8px;"></i></a>
                </div>

                <script>
                (function() {
                    var hub = document.getElementById('orbitHub');
                    if (!hub) return;

                    var TOTAL = 12;
                    var nodes = hub.querySelectorAll('.orbit-hub__node');
                    var svg = document.getElementById('orbitLines');

                    function layout() {
                        var w = hub.offsetWidth;
                        var h = hub.offsetHeight;
                        var cx = w / 2;
                        var cy = h / 2;
                        /* Radius scales with container */
                        var radius = Math.min(w, h) / 2 - 40;
                        if (w < 500) radius = Math.min(w, h) / 2 - 30;
                        if (radius < 100) radius = 100;
                        if (radius > 360) radius = 360;

                        svg.setAttribute('width', w);
                        svg.setAttribute('height', h);
                        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
                        svg.innerHTML = '';

                        /* Defs for glow filter and gradient */
                        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                        defs.innerHTML = '<filter id="lineGlow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
                        svg.appendChild(defs);

                        nodes.forEach(function(node, i) {
                            var angle = (i / TOTAL) * Math.PI * 2 - Math.PI / 2;
                            var nx = cx + Math.cos(angle) * radius;
                            var ny = cy + Math.sin(angle) * radius;

                            node.style.left = nx + 'px';
                            node.style.top = ny + 'px';

                            /* Draw line from node to center */
                            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            line.setAttribute('x1', cx);
                            line.setAttribute('y1', cy);
                            line.setAttribute('x2', nx);
                            line.setAttribute('y2', ny);
                            line.setAttribute('stroke', 'rgba(255,186,26,0.2)');
                            line.setAttribute('stroke-width', '1.5');
                            line.setAttribute('filter', 'url(#lineGlow)');
                            svg.appendChild(line);

                            /* Animated dot traveling along line */
                            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                            circle.setAttribute('r', '3.5');
                            circle.setAttribute('fill', '#ffca4a');
                            circle.setAttribute('filter', 'url(#lineGlow)');
                            var anim = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
                            anim.setAttribute('dur', '2.5s');
                            anim.setAttribute('repeatCount', 'indefinite');
                            anim.setAttribute('begin', (i * 0.2) + 's');
                            var path = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
                            /* Create a path element for the motion */
                            var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                            pathEl.setAttribute('id', 'orbit-path-' + i);
                            pathEl.setAttribute('d', 'M' + nx + ',' + ny + ' L' + cx + ',' + cy);
                            pathEl.setAttribute('fill', 'none');
                            defs.appendChild(pathEl);
                            path.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#orbit-path-' + i);
                            anim.appendChild(path);
                            circle.appendChild(anim);
                            svg.appendChild(circle);
                        });
                    }

                    /* Entrance animation on scroll */
                    var observer = new IntersectionObserver(function(entries) {
                        if (entries[0].isIntersecting) {
                            hub.classList.add('orbit-visible');
                            layout();
                            observer.disconnect();
                        }
                    }, { threshold: 0.1 });
                    observer.observe(hub);

                    var resizeTimer;
                    window.addEventListener('resize', function() {
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(function() {
                            if (hub.classList.contains('orbit-visible')) layout();
                        }, 150);
                    });

                    /* Click to expand agent card */
                    nodes.forEach(function(node) {
                        node.addEventListener('click', function(e) {
                            e.stopPropagation();
                            var wasActive = node.classList.contains('orbit-node--active');
                            /* Close all */
                            nodes.forEach(function(n) {
                                n.classList.remove('orbit-node--active', 'orbit-node--dimmed');
                            });
                            if (!wasActive) {
                                node.classList.add('orbit-node--active');
                                nodes.forEach(function(n) {
                                    if (n !== node) n.classList.add('orbit-node--dimmed');
                                });
                            }
                        });
                    });
                    /* Click outside to close */
                    document.addEventListener('click', function(e) {
                        if (!hub.contains(e.target)) {
                            nodes.forEach(function(n) {
                                n.classList.remove('orbit-node--active', 'orbit-node--dimmed');
                            });
                        }
                    });
                })();
                </script>
            </div>

            <style>
                /* ═══ ORBITAL HUB - 12 agents around Olívia ═══ */
                .orbit-hub {
                    position: relative;
                    width: 100%;
                    max-width: 860px;
                    height: 860px;
                    margin: 0 auto;
                }

                /* SVG connector lines */
                .orbit-hub__lines {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                /* ── CENTER: OLÍVIA ── */
                .orbit-hub__center {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 3;
                }
                .orbit-hub__glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 260px;
                    height: 260px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,186,26,0.2) 0%, rgba(255,186,26,0.05) 50%, transparent 70%);
                    animation: orbit-glow 3.5s ease-in-out infinite;
                    pointer-events: none;
                }
                @keyframes orbit-glow {
                    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
                }
                .orbit-hub__photo {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 4px solid rgba(255,186,26,0.6);
                    overflow: hidden;
                    box-shadow: 0 0 40px rgba(255,186,26,0.4), 0 0 80px rgba(255,186,26,0.15);
                    animation: orbit-photo-breathe 3.5s ease-in-out infinite;
                    position: relative;
                    z-index: 2;
                }
                @keyframes orbit-photo-breathe {
                    0%, 100% { box-shadow: 0 0 40px rgba(255,186,26,0.4), 0 0 80px rgba(255,186,26,0.15); }
                    50% { box-shadow: 0 0 50px rgba(255,186,26,0.6), 0 0 100px rgba(255,186,26,0.25); }
                }
                .orbit-hub__photo img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .orbit-hub__name {
                    color: #ffba1a;
                    font-size: 20px;
                    font-weight: 800;
                    margin-top: 14px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .orbit-hub__role {
                    color: rgba(255,255,255,0.5);
                    font-size: 13px;
                    margin-top: 4px;
                }

                /* Pulsating rings */
                .orbit-hub__ring {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    border: 1.5px solid rgba(255,186,26,0.12);
                    pointer-events: none;
                    animation: orbit-ring 3.5s ease-in-out infinite;
                }
                .orbit-hub__ring--1 {
                    width: 180px; height: 180px;
                    transform: translate(-50%, calc(-50% - 12px));
                }
                .orbit-hub__ring--2 {
                    width: 220px; height: 220px;
                    border-color: rgba(255,186,26,0.07);
                    transform: translate(-50%, calc(-50% - 12px));
                    animation-delay: 0.5s;
                }
                .orbit-hub__ring--3 {
                    width: 264px; height: 264px;
                    border-color: rgba(255,186,26,0.04);
                    transform: translate(-50%, calc(-50% - 12px));
                    animation-delay: 1s;
                }
                @keyframes orbit-ring {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }

                /* ── AGENT NODES ── */
                .orbit-hub__node {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    z-index: 2;
                    cursor: default;
                    transition: transform 0.3s ease;
                    /* Entrance: start invisible */
                    opacity: 0;
                    scale: 0.5;
                }
                .orbit-visible .orbit-hub__node {
                    animation: orbit-node-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
                }
                .orbit-visible .orbit-hub__node[data-idx="0"]  { animation-delay: 0.1s; }
                .orbit-visible .orbit-hub__node[data-idx="1"]  { animation-delay: 0.15s; }
                .orbit-visible .orbit-hub__node[data-idx="2"]  { animation-delay: 0.2s; }
                .orbit-visible .orbit-hub__node[data-idx="3"]  { animation-delay: 0.25s; }
                .orbit-visible .orbit-hub__node[data-idx="4"]  { animation-delay: 0.3s; }
                .orbit-visible .orbit-hub__node[data-idx="5"]  { animation-delay: 0.35s; }
                .orbit-visible .orbit-hub__node[data-idx="6"]  { animation-delay: 0.4s; }
                .orbit-visible .orbit-hub__node[data-idx="7"]  { animation-delay: 0.45s; }
                .orbit-visible .orbit-hub__node[data-idx="8"]  { animation-delay: 0.5s; }
                .orbit-visible .orbit-hub__node[data-idx="9"]  { animation-delay: 0.55s; }
                .orbit-visible .orbit-hub__node[data-idx="10"] { animation-delay: 0.6s; }
                .orbit-visible .orbit-hub__node[data-idx="11"] { animation-delay: 0.65s; }

                @keyframes orbit-node-in {
                    to { opacity: 1; scale: 1; }
                }

                .orbit-hub__node:hover {
                    transform: translate(-50%, -50%) scale(1.12);
                }
                .orbit-hub__node:hover .orbit-hub__node-icon {
                    border-color: #ffba1a;
                    box-shadow: 0 0 24px rgba(255,186,26,0.5);
                    background: linear-gradient(135deg, rgba(255,186,26,0.35), rgba(255,186,26,0.1));
                }

                .orbit-hub__node-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(255,186,26,0.15), rgba(255,186,26,0.04));
                    border: 2px solid rgba(255,186,26,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(4px);
                }
                .orbit-hub__node-icon i {
                    font-size: 20px;
                    color: #ffba1a;
                }
                .orbit-hub__node-label {
                    font-size: 14px;
                    font-weight: 800;
                    color: #fff;
                    white-space: nowrap;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
                }
                .orbit-hub__node-desc {
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(255,255,255,0.7);
                    white-space: nowrap;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
                    margin-top: -2px;
                }

                /* ── AGENT CARD ON CLICK ── */
                .orbit-hub__node { cursor: pointer; }
                .orbit-hub__node.orbit-node--active {
                    transform: translate(-50%, -50%) scale(1.2);
                    z-index: 100;
                }
                .orbit-hub__node.orbit-node--active .orbit-hub__node-icon {
                    border-color: #ffba1a;
                    box-shadow: 0 0 30px rgba(255,186,26,0.6);
                    background: linear-gradient(135deg, rgba(255,186,26,0.4), rgba(255,186,26,0.15));
                }
                .orbit-hub__node.orbit-node--dimmed {
                    opacity: 0.3 !important;
                }
                .orbit-node-card {
                    position: absolute;
                    top: calc(100% + 12px);
                    left: 50%;
                    transform: translateX(-50%) scale(0.9);
                    width: 260px;
                    background: rgba(13,17,23,0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,186,26,0.25);
                    border-radius: 16px;
                    padding: 20px;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 200;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 40px rgba(255,186,26,0.08);
                }
                .orbit-node--active .orbit-node-card {
                    opacity: 1;
                    pointer-events: auto;
                    transform: translateX(-50%) scale(1);
                }
                .orbit-node-card::before {
                    content: '';
                    position: absolute;
                    top: -6px;
                    left: 50%;
                    transform: translateX(-50%) rotate(45deg);
                    width: 10px;
                    height: 10px;
                    background: rgba(13,17,23,0.95);
                    border-left: 1px solid rgba(255,186,26,0.25);
                    border-top: 1px solid rgba(255,186,26,0.25);
                }
                .orbit-node-card__status {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.65rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #22C55E;
                    background: rgba(34,197,94,0.1);
                    border: 1px solid rgba(34,197,94,0.2);
                    padding: 3px 10px;
                    border-radius: 20px;
                    margin-bottom: 12px;
                }
                .orbit-node-card__title {
                    color: #fff;
                    font-size: 0.95rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .orbit-node-card__text {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.8rem;
                    line-height: 1.6;
                    margin-bottom: 14px;
                }
                .orbit-node-card__bar {
                    margin-bottom: 12px;
                }
                .orbit-node-card__bar-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 4px;
                }
                .orbit-node-card__bar-track {
                    width: 100%;
                    height: 4px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 2px;
                    overflow: hidden;
                }
                .orbit-node-card__bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ffba1a, #ffca4a);
                    border-radius: 2px;
                    transition: width 0.6s ease;
                }
                .orbit-node-card__tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }
                .orbit-node-card__tag {
                    font-size: 0.65rem;
                    color: rgba(255,255,255,0.5);
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.06);
                    padding: 3px 8px;
                    border-radius: 4px;
                }
                @media (max-width: 768px) {
                    .orbit-node-card { width: 220px; padding: 16px; }
                }

                /* Olívia entrance */
                .orbit-hub__center {
                    opacity: 0;
                    scale: 0.3;
                }
                .orbit-visible .orbit-hub__center {
                    animation: orbit-center-in 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards;
                }
                @keyframes orbit-center-in {
                    to { opacity: 1; scale: 1; }
                }

                /* SVG lines entrance */
                .orbit-hub__lines {
                    opacity: 0;
                }
                .orbit-visible .orbit-hub__lines {
                    animation: orbit-lines-in 0.8s ease 0.3s forwards;
                }
                @keyframes orbit-lines-in {
                    to { opacity: 1; }
                }

                /* ── MOBILE: keep orbital, just smaller ── */
                @media (max-width: 768px) {
                    .orbit-hub {
                        max-width: 100%;
                        height: 420px;
                    }
                    .orbit-hub__glow { width: 120px; height: 120px; }
                    .orbit-hub__photo { width: 70px; height: 70px; border-width: 3px; }
                    .orbit-hub__name { font-size: 13px; margin-top: 8px; }
                    .orbit-hub__role { font-size: 10px; }
                    .orbit-hub__ring--1 { width: 110px; height: 110px; }
                    .orbit-hub__ring--2 { width: 140px; height: 140px; }
                    .orbit-hub__ring--3 { display: none; }
                    .orbit-hub__node-icon {
                        width: 36px;
                        height: 36px;
                    }
                    .orbit-hub__node-icon i { font-size: 14px; }
                    .orbit-hub__node-label {
                        font-size: 10px;
                    }
                    .orbit-hub__node-desc {
                        display: none;
                    }
                }
                @media (max-width: 480px) {
                    .orbit-hub {
                        height: 360px;
                    }
                    .orbit-hub__photo { width: 56px; height: 56px; }
                    .orbit-hub__glow { width: 90px; height: 90px; }
                    .orbit-hub__name { font-size: 11px; margin-top: 6px; }
                    .orbit-hub__role { font-size: 9px; }
                    .orbit-hub__ring--1 { width: 90px; height: 90px; }
                    .orbit-hub__ring--2 { display: none; }
                    .orbit-hub__node-icon {
                        width: 30px;
                        height: 30px;
                    }
                    .orbit-hub__node-icon i { font-size: 12px; }
                    .orbit-hub__node-label { font-size: 9px; }
                }
            </style>
        </div>
    </section>

        </div>
    </section>


    <!-- ═══ 6. O QUE VOCÊ GANHA ═══ -->
    <section class="lp-section lp-section--light">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <h2>O que você ganha como parceiro</h2>
            </div>

            <div class="benefits-grid" data-reveal-stagger>
                <div class="benefit-card">
                    <div class="icon-premium icon-premium--solid"><i class="fas fa-arrows-rotate"></i></div>
                    <h3>Receita Recorrente</h3>
                    <p>R$ 250/mês por cliente ativado. Receita que não depende da sua agenda.</p>
                </div>
                <div class="benefit-card">
                    <div class="icon-premium icon-premium--solid"><i class="fas fa-tag"></i></div>
                    <h3>White-label</h3>
                    <p>Sua marca, seu relacionamento. O cliente é seu do início ao fim.</p>
                </div>
                <div class="benefit-card">
                    <div class="icon-premium icon-premium--solid"><i class="fas fa-lock"></i></div>
                    <h3>Lock-in Natural</h3>
                    <p>Cliente opera no software. Quanto mais usa, mais depende. Churn próximo de zero.</p>
                </div>
                <div class="benefit-card">
                    <div class="icon-premium icon-premium--solid"><i class="fas fa-hand-holding-dollar"></i></div>
                    <h3>Zero Investimento</h3>
                    <p>O Grupo GSN opera toda a plataforma. Você não paga nada pela tecnologia.</p>
                </div>
                <div class="benefit-card">
                    <div class="icon-premium icon-premium--solid"><i class="fas fa-headset"></i></div>
                    <h3>Suporte Dedicado</h3>
                    <p>Onboarding, materiais de venda, treinamento e suporte técnico inclusos.</p>
                </div>
                <div class="benefit-card">
                    <div class="icon-premium icon-premium--solid"><i class="fas fa-wand-magic-sparkles"></i></div>
                    <h3>Roadmap de Agentes</h3>
                    <p>Em breve, agentes customizáveis para suas verticais específicas.</p>
                </div>
            </div>
        </div>
    </section>


    <!-- ═══ 7. ROADMAP ═══ -->
    <section class="lp-section lp-section--dark">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <span class="lp-badge">E isso é só o começo</span>
                <h2>O futuro: agentes customizáveis</h2>
                <p>Em breve, você poderá criar agentes específicos para suas verticais. Sua metodologia, operacionalizada por IA.</p>
            </div>

            <div class="rm-cinema" id="rmCinemaCanais">
                <div class="rm-cinema__rail"><div class="rm-cinema__rail-fill"></div></div>

                <!-- AGORA -->
                <div class="rm-step" data-step="1">
                    <div class="rm-step__marker">
                        <div class="rm-step__dot rm-step__dot--active"><i class="fas fa-check"></i></div>
                        <span class="rm-step__badge rm-step__badge--active"><i class="fas fa-circle"></i> Ativo agora</span>
                    </div>
                    <div class="rm-step__card rm-step__card--active">
                        <div class="rm-step__text">
                            <h3>Agora</h3>
                            <p>12 agentes especializados prontos para operar nos seus clientes.</p>
                        </div>
                        <div class="rm-step__scene">
                            <div class="rm-agents-mini">
                                <div class="rm-agent-dot" style="--d:0"><i class="fas fa-chess-queen"></i></div>
                                <div class="rm-agent-dot" style="--d:1"><i class="fas fa-sitemap"></i></div>
                                <div class="rm-agent-dot" style="--d:2"><i class="fas fa-users"></i></div>
                                <div class="rm-agent-dot" style="--d:3"><i class="fas fa-chart-line"></i></div>
                                <div class="rm-agent-dot" style="--d:4"><i class="fas fa-shield-halved"></i></div>
                                <div class="rm-agent-dot" style="--d:5"><i class="fas fa-lightbulb"></i></div>
                            </div>
                            <div class="rm-agents-label"><i class="fas fa-bolt"></i> 12 agentes operando</div>
                        </div>
                    </div>
                </div>

                <!-- 6 MESES -->
                <div class="rm-step" data-step="2">
                    <div class="rm-step__marker">
                        <div class="rm-step__dot rm-step__dot--upcoming"><i class="fas fa-code"></i></div>
                        <span class="rm-step__badge rm-step__badge--upcoming"><i class="fas fa-clock"></i> 6 meses</span>
                    </div>
                    <div class="rm-step__card">
                        <div class="rm-step__text">
                            <h3>6 meses</h3>
                            <p>Agentes configuráveis por vertical. Você adapta à sua metodologia.</p>
                        </div>
                        <div class="rm-step__scene">
                            <div class="rm-config-mockup">
                                <div class="rm-config-mockup__header">
                                    <div class="rm-config-dots"><span></span><span></span><span></span></div>
                                    <span>Configurador de Agentes</span>
                                </div>
                                <div class="rm-config-mockup__body">
                                    <div class="rm-config-field rm-config-field--1">
                                        <span class="rm-config-field__label">Vertical</span>
                                        <div class="rm-config-field__val">Consultoria financeira</div>
                                    </div>
                                    <div class="rm-config-field rm-config-field--2">
                                        <span class="rm-config-field__label">Método</span>
                                        <div class="rm-config-field__val">Sua metodologia própria</div>
                                    </div>
                                    <div class="rm-config-btn rm-config-field--3"><i class="fas fa-wand-magic-sparkles"></i> Gerar agente</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 12 MESES -->
                <div class="rm-step" data-step="3">
                    <div class="rm-step__marker">
                        <div class="rm-step__dot rm-step__dot--future"><i class="fas fa-rocket"></i></div>
                        <span class="rm-step__badge rm-step__badge--upcoming"><i class="fas fa-clock"></i> 12 meses</span>
                    </div>
                    <div class="rm-step__card">
                        <div class="rm-step__text">
                            <h3>12 meses</h3>
                            <p>Marketplace de agentes. Crie, publique e monetize seus próprios agentes.</p>
                        </div>
                        <div class="rm-step__scene">
                            <div class="rm-marketplace">
                                <div class="rm-mp-card rm-mp-card--1">
                                    <div class="rm-mp-card__icon"><i class="fas fa-building"></i></div>
                                    <div class="rm-mp-card__info">
                                        <strong>Agente Financeiro</strong>
                                        <span>por Você</span>
                                    </div>
                                    <div class="rm-mp-card__price">R$ 197/mês</div>
                                </div>
                                <div class="rm-mp-card rm-mp-card--2">
                                    <div class="rm-mp-card__icon"><i class="fas fa-industry"></i></div>
                                    <div class="rm-mp-card__info">
                                        <strong>Agente Industrial</strong>
                                        <span>por Parceiro</span>
                                    </div>
                                    <div class="rm-mp-card__price">R$ 247/mês</div>
                                </div>
                                <div class="rm-mp-card rm-mp-card--3">
                                    <div class="rm-mp-card__icon"><i class="fas fa-store"></i></div>
                                    <div class="rm-mp-card__info">
                                        <strong>Agente Varejo</strong>
                                        <span>por Comunidade</span>
                                    </div>
                                    <div class="rm-mp-card__price">R$ 147/mês</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
        /* ═══ ROADMAP CINEMA ═══ */
        .rm-cinema { position: relative; max-width: 900px; margin: 0 auto; padding: 20px 0 0; }
        .rm-cinema__rail { position: absolute; left: 28px; top: 0; bottom: 0; width: 3px; background: rgba(255,255,255,0.06); border-radius: 3px; z-index: 0; }
        .rm-cinema__rail-fill { width: 100%; height: 0%; background: linear-gradient(180deg, #ffba1a, #ffca4a, #818CF8); border-radius: 3px; transition: height 2.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 12px rgba(255,186,26,0.4); }
        .rm-cinema.rm-active .rm-cinema__rail-fill { height: 100%; }

        .rm-step { position: relative; padding-left: 80px; margin-bottom: 48px; opacity: 0; transform: translateY(40px); }
        .rm-step:last-child { margin-bottom: 0; }
        .rm-step.rm-step-visible { opacity: 1; transform: translateY(0); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1); }

        .rm-step__marker { position: absolute; left: 0; top: 0; display: flex; align-items: center; gap: 12px; z-index: 2; }
        .rm-step__dot { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .rm-step__dot--active { background: linear-gradient(135deg, #ffba1a, #ffca4a); color: #000; box-shadow: 0 4px 20px rgba(255,186,26,0.3); animation: rm-dot-pulse 2s ease-in-out infinite; }
        @keyframes rm-dot-pulse { 0%, 100% { box-shadow: 0 4px 20px rgba(255,186,26,0.3), 0 0 0 0 rgba(255,186,26,0.1); } 50% { box-shadow: 0 4px 20px rgba(255,186,26,0.5), 0 0 0 12px rgba(255,186,26,0); } }
        .rm-step__dot--upcoming { background: #1C2333; border: 2px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.4); }
        .rm-step__dot--future { background: linear-gradient(135deg, #6366F1, #818CF8); color: #fff; box-shadow: 0 4px 20px rgba(99,102,241,0.3); }

        .rm-step__badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 20px; white-space: nowrap; }
        .rm-step__badge--active { background: rgba(255,186,26,0.1); color: #ffba1a; }
        .rm-step__badge--active i { font-size: 6px; animation: rm-blink 1.5s ease-in-out infinite; }
        @keyframes rm-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .rm-step__badge--upcoming { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); }

        .rm-step__card { background: linear-gradient(135deg, #1C2333, #13161D); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: center; margin-top: 8px; transition: all 0.3s ease; overflow: hidden; }
        .rm-step__card:hover { border-color: rgba(255,255,255,0.1); box-shadow: 0 12px 48px rgba(0,0,0,0.4); }
        .rm-step__card--active { border-color: rgba(255,186,26,0.2); background: linear-gradient(135deg, #1C2333, rgba(255,186,26,0.04)); }
        .rm-step__text h3 { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 10px; }
        .rm-step__card--active .rm-step__text h3 { color: #ffba1a; }
        .rm-step__text p { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.7; }

        /* Scene: Agents mini grid */
        .rm-agents-mini { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 10px; }
        .rm-agent-dot { width: 38px; height: 38px; border-radius: 50%; background: rgba(255,186,26,0.1); border: 1.5px solid rgba(255,186,26,0.25); display: flex; align-items: center; justify-content: center; font-size: 13px; color: #ffba1a; opacity: 0; transform: scale(0.5); }
        .rm-step-visible .rm-agent-dot { animation: rm-agent-pop 0.4s calc(var(--d) * 0.1s + 0.3s) forwards; }
        @keyframes rm-agent-pop { 0% { opacity: 0; transform: scale(0.5); } 70% { transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }
        .rm-agents-label { text-align: center; font-size: 11px; font-weight: 700; color: #ffba1a; background: rgba(255,186,26,0.08); padding: 4px 14px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px; margin: 0 auto; display: flex; width: fit-content; }

        /* Scene: Config mockup */
        .rm-config-mockup { background: #0D1117; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; width: 100%; }
        .rm-config-mockup__header { display: flex; align-items: center; gap: 12px; padding: 10px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .rm-config-dots { display: flex; gap: 6px; }
        .rm-config-dots span { width: 10px; height: 10px; border-radius: 50%; }
        .rm-config-dots span:nth-child(1) { background: #EF4444; }
        .rm-config-dots span:nth-child(2) { background: #F59E0B; }
        .rm-config-dots span:nth-child(3) { background: #22C55E; }
        .rm-config-mockup__header span { font-size: 12px; color: rgba(255,255,255,0.4); }
        .rm-config-mockup__body { padding: 16px; }
        .rm-config-field { margin-bottom: 12px; opacity: 0; transform: translateX(20px); }
        .rm-config-field__label { display: block; font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .rm-config-field__val { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 8px 12px; font-size: 13px; color: rgba(255,255,255,0.7); }
        .rm-config-btn { display: flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #6366F1, #818CF8); color: #fff; font-size: 13px; font-weight: 700; padding: 10px; border-radius: 8px; opacity: 0; transform: scale(0.9); }
        .rm-step-visible .rm-config-field--1 { animation: rm-field-in 0.5s 0.3s forwards; }
        .rm-step-visible .rm-config-field--2 { animation: rm-field-in 0.5s 0.7s forwards; }
        .rm-step-visible .rm-config-field--3 { animation: rm-btn-in 0.4s 1.1s forwards; }
        @keyframes rm-field-in { to { opacity: 1; transform: translateX(0); } }
        @keyframes rm-btn-in { to { opacity: 1; transform: scale(1); } }

        /* Scene: Marketplace */
        .rm-marketplace { display: flex; flex-direction: column; gap: 8px; }
        .rm-mp-card { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 12px 16px; opacity: 0; transform: translateX(30px); }
        .rm-step-visible .rm-mp-card--1 { animation: rm-mp-in 0.5s 0.3s forwards; }
        .rm-step-visible .rm-mp-card--2 { animation: rm-mp-in 0.5s 0.6s forwards; }
        .rm-step-visible .rm-mp-card--3 { animation: rm-mp-in 0.5s 0.9s forwards; }
        @keyframes rm-mp-in { to { opacity: 1; transform: translateX(0); } }
        .rm-mp-card__icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); display: flex; align-items: center; justify-content: center; font-size: 14px; color: #818CF8; flex-shrink: 0; }
        .rm-mp-card__info { flex: 1; }
        .rm-mp-card__info strong { display: block; font-size: 13px; color: #fff; font-weight: 600; }
        .rm-mp-card__info span { font-size: 11px; color: rgba(255,255,255,0.35); }
        .rm-mp-card__price { font-size: 12px; font-weight: 700; color: #22C55E; background: rgba(34,197,94,0.08); padding: 4px 10px; border-radius: 8px; white-space: nowrap; }

        /* Responsive */
        @media (max-width: 768px) {
            .rm-cinema__rail { left: 20px; }
            .rm-step { padding-left: 64px; }
            .rm-step__dot { width: 42px; height: 42px; font-size: 16px; }
            .rm-step__card { grid-template-columns: 1fr; padding: 24px 20px; gap: 20px; }
        }
        @media (max-width: 480px) {
            .rm-step { padding-left: 56px; margin-bottom: 36px; }
            .rm-cinema__rail { left: 16px; }
            .rm-step__dot { width: 36px; height: 36px; font-size: 14px; }
            .rm-step__badge { font-size: 10px; padding: 4px 10px; }
            .rm-step__card { padding: 20px 16px; }
            .rm-config-field__label { font-size: 9px; }
            .rm-config-field__val { font-size: 12px; padding: 6px 10px; }
            .rm-mp-card { padding: 10px 12px; gap: 10px; }
            .rm-mp-card__info strong { font-size: 12px; }
        }
        </style>

        <script>
        (function() {
            var cinema = document.getElementById('rmCinemaCanais');
            if (!cinema) return;
            var steps = cinema.querySelectorAll('.rm-step');
            var activated = false;

            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting && !activated) {
                        activated = true;
                        cinema.classList.add('rm-active');
                        steps.forEach(function(step, i) {
                            setTimeout(function() {
                                step.classList.add('rm-step-visible');
                            }, i * 800);
                        });
                        obs.unobserve(e.target);
                    }
                });
            }, { threshold: 0.15 });
            obs.observe(cinema);
        })();
        </script>
    </section>


    <!-- ═══ 8. FAQ ═══ -->
    <section class="lp-section lp-section--light">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <h2>Perguntas frequentes</h2>
            </div>

            <div class="faq-list" data-reveal>
                <div class="faq-item">
                    <button class="faq-question">
                        <span>Quanto eu realmente ganho?</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            Você recebe R$ 250/mês por cliente ativado, com margem de aproximadamente 90%. Com 25 clientes ativos, são R$ 6.250/mês de receita recorrente. Além disso, você cobra normalmente pelo projeto de implementação.
                        </div>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question">
                        <span>Vou perder o controle do cliente?</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            Não. O modelo é white-label: sua marca, seu relacionamento. Você é o ponto de contato do cliente. O Orbit opera nos bastidores como infraestrutura tecnológica.
                        </div>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question">
                        <span>Meus clientes são pequenos, vão pagar?</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            Exatamente o ponto. Empresas que não podem pagar R$ 80 mil a R$ 180 mil por uma consultoria completa pagam R$ 997 a R$ 2.500/mês por uma operação com agentes de IA. Você amplia seu mercado endereçável sem reduzir seu ticket.
                        </div>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question">
                        <span>E se o Orbit não atender minha metodologia?</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            O Orbit é uma plataforma, não uma metodologia. Você configura os agentes, processos e indicadores de acordo com a sua abordagem. A plataforma executa; a inteligência metodológica é sua.
                        </div>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question">
                        <span>Vou poder criar meus próprios agentes?</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            Sim. O roadmap inclui agentes configuráveis por vertical em 6 meses e um marketplace de agentes em 12 meses. Você poderá criar, publicar e monetizar agentes específicos para suas verticais.
                        </div>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question">
                        <span>Qual o investimento?</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            Custo zero de tecnologia. O Grupo GSN opera toda a infraestrutura. Você investe apenas o seu tempo na implementação e relacionamento com o cliente.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- ═══ 9. CTA FINAL ═══ -->
    <section class="lp-cta-final lp-section--dark" id="cta-final">
        <div class="lp-container">
            <div data-reveal>
                <h2>Pronto para ter receita recorrente?</h2>
                <p>30+ consultorias já estão ganhando com IA. Sua vez.</p>
                <a href="https://wa.me/5548991206282?text=Quero%20ser%20uma%20plataforma%20de%20IA%20para%20meus%20clientes" target="_blank" class="lp-btn lp-btn--gold">QUERO SER UMA PLATAFORMA DE IA PARA MEUS CLIENTES</a>

                <div class="cta-stats">
                    <div class="cta-stats__item">
                        <span class="cta-stats__number">30+</span>
                        <span class="cta-stats__label">canais ativos</span>
                    </div>
                    <div class="cta-stats__item">
                        <span class="cta-stats__number">2.206</span>
                        <span class="cta-stats__label">empresas</span>
                    </div>
                    <div class="cta-stats__item">
                        <span class="cta-stats__number">30</span>
                        <span class="cta-stats__label">anos de experiência</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ FOOTER ═══ -->
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
    <button class="back-to-top" id="backToTop">
        <i class="fas fa-arrow-up"></i>
    </button>


    <!-- ═══ SCRIPTS ═══ -->
    <script>
    (function() {
        'use strict';

        /* --- Header scroll --- */
        var header = document.querySelector('.header');
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

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

        /* --- Dropdown hover --- */
        document.querySelectorAll('.nav-menu > li').forEach(function(li) {
            var dropdown = li.querySelector('.dropdown');
            if (!dropdown) return;
            li.addEventListener('mouseenter', function() { dropdown.style.opacity = '1'; dropdown.style.visibility = 'visible'; dropdown.style.transform = 'translateY(0)'; });
            li.addEventListener('mouseleave', function() { dropdown.style.opacity = '0'; dropdown.style.visibility = 'hidden'; dropdown.style.transform = 'translateY(8px)'; });
        });

        /* --- Back to top --- */
        var backBtn = document.getElementById('backToTop');
        if (backBtn) {
            window.addEventListener('scroll', function() {
                backBtn.classList.toggle('visible', window.scrollY > 600);
            });
            backBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        /* --- Scroll Reveal --- */
        var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(function(el) {
            revealObserver.observe(el);
        });

        /* --- FAQ Accordion --- */
        document.querySelectorAll('.faq-question').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var item = btn.parentElement;
                var answer = item.querySelector('.faq-answer');
                var isActive = item.classList.contains('active');

                // Close all
                document.querySelectorAll('.faq-item').forEach(function(fi) {
                    fi.classList.remove('active');
                    fi.querySelector('.faq-answer').style.maxHeight = '0';
                });

                // Open clicked (if it was closed)
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });

        /* --- Smooth scroll for anchor links --- */
        document.querySelectorAll('a[href^="#"]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                var target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

    })();
    </script>

    <script src="/js/seo.js"></script>
`;
