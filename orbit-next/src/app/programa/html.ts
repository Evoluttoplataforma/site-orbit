// Auto-generated — Liga Orbit · Canais (/programa)
// htmlTop: HERO -> ... -> cabeçalho do bloco RANKING. O <LigaRanking/> (React)
// é renderizado logo após, em content.tsx.
// htmlBottom: FAQ -> CTA FINAL + <script> (reveal/FAQ/smooth-scroll).

import { i18nText, i18nEl } from '@/lib/i18n-html';

export const htmlTop = `
    <!-- ═══ 1. HERO ═══ -->
    <section class="lp-section lp-section--dark liga-hero" id="topo">
        <div class="liga-hero__glow"></div>
        <div class="lp-container">
            <div class="liga-hero__inner" data-reveal>
                <span class="lp-badge">${i18nText('PROGRAMA ORBIT DE CRESCIMENTO E RECONHECIMENTO', 'ORBIT GROWTH AND RECOGNITION PROGRAM')}</span>
                ${i18nEl('h1', 'Vence quem mais cresce.', 'Growth wins.', 'class="liga-hero__title"')}
                ${i18nEl('p', 'A disputa entre canais que mais expandem. Quem mais cresce até setembro leva o pódio.', 'The race among the channels that expand the most. Whoever grows the most by September takes the podium.', 'class="liga-hero__sub"')}
                <p class="liga-hero__tagline"><span class="lp-gold">${i18nText('Cresça de verdade. Leve o pódio.', 'Grow for real. Take the podium.')}</span></p>
                <div class="liga-hero__ctas">
                    <a href="#ranking" class="lp-btn lp-btn--gold">${i18nText('Ver o ranking', 'See the ranking')}</a>
                    <a href="#podio" class="lp-btn lp-btn--outline">${i18nText('Ver o pódio', 'See the podium')}</a>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ 2. A META DA REDE ═══ -->
    <section class="lp-section lp-section--light">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <span class="lp-badge lp-badge--light">${i18nText('A meta da rede', 'The network goal')}</span>
                ${i18nEl('h2', 'A conta que move a rede', 'The math that moves the network')}
                ${i18nEl('p', 'Cada canal, +6 licenças. Juntos, 600.', 'Each channel, +6 licenses. Together, 600.')}
            </div>
            <div class="liga-math" data-reveal-stagger>
                <div class="liga-math__cell">
                    <div class="liga-math__num">100</div>
                    <div class="liga-math__label">${i18nText('canais ativos hoje', 'active channels today')}</div>
                </div>
                <div class="liga-math__op">×</div>
                <div class="liga-math__cell">
                    <div class="liga-math__num">+6</div>
                    <div class="liga-math__label">${i18nText('licenças por canal', 'licenses per channel')}</div>
                </div>
                <div class="liga-math__op">=</div>
                <div class="liga-math__cell liga-math__cell--goal">
                    <div class="liga-math__num">600</div>
                    <div class="liga-math__label">${i18nText('a linha de chegada', 'the finish line')}</div>
                </div>
            </div>
            ${i18nEl('p', 'Cada canal cuida das suas 6. A rede inteira cruza a linha junta — é isso que destrava o pódio.', 'Each channel takes care of its 6. The whole network crosses the line together — that is what unlocks the podium.', 'class="liga-note" data-reveal')}
        </div>
    </section>

    <!-- ═══ 3. A REGRA ═══ -->
    <section class="lp-section lp-section--dark">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <span class="lp-badge">${i18nText('A regra', 'The rule')}</span>
                ${i18nEl('h2', 'A regra é uma só', 'There is only one rule')}
                ${i18nEl('p', 'Licenças novas pagantes, líquido de cancelamentos.', 'New paying licenses, net of cancellations.')}
            </div>
            <ul class="liga-rules" data-reveal-stagger>
                <li class="liga-rule"><i class="fas fa-circle-check"></i><span>${i18nText('Trial só pontua quando vira cliente pagante.', 'A trial only scores when it becomes a paying client.')}</span></li>
                <li class="liga-rule"><i class="fas fa-circle-check"></i><span>${i18nText('Crescimento líquido: ativou e perdeu, desconta o churn.', 'Net growth: if you activate and lose, churn is deducted.')}</span></li>
                <li class="liga-rule"><i class="fas fa-circle-check"></i><span>${i18nText('A receita precisa estar ativa no dia do Bootcamp.', 'Revenue must be active on Bootcamp day.')}</span></li>
                <li class="liga-rule"><i class="fas fa-circle-check"></i><span>${i18nText('Medido pelo próprio Orbit (assinaturas pagas).', 'Measured by Orbit itself (paid subscriptions).')}</span></li>
                <li class="liga-rule"><i class="fas fa-circle-check"></i><span>${i18nText('Cada canal começa do seu ponto.', 'Each channel starts from its own point.')}</span></li>
            </ul>
        </div>
    </section>

    <!-- ═══ 4. NÃO É SÓ PRO TOPO ═══ -->
    <section class="lp-section lp-section--light">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <span class="lp-badge lp-badge--light">${i18nText('Não é só pro topo', 'Not just for the top')}</span>
                ${i18nEl('h2', 'Cresceu, ganhou leads', 'You grew, you won leads')}
                ${i18nEl('p', 'Todo canal com pelo menos 3 novas licenças ganha 5 leads no LeadBid por licença adicionada.', 'Every channel with at least 3 new licenses gets 5 LeadBid leads per added license.')}
            </div>
            <div class="liga-leads" data-reveal-stagger>
                <div class="liga-lead-card">
                    <div class="liga-lead-card__from">${i18nText('3 licenças', '3 licenses')}</div>
                    <div class="liga-lead-card__arrow"><i class="fas fa-arrow-right"></i></div>
                    <div class="liga-lead-card__to">${i18nText('15 leads', '15 leads')}</div>
                </div>
                <div class="liga-lead-card">
                    <div class="liga-lead-card__from">${i18nText('6 licenças', '6 licenses')}</div>
                    <div class="liga-lead-card__arrow"><i class="fas fa-arrow-right"></i></div>
                    <div class="liga-lead-card__to">${i18nText('30 leads', '30 leads')}</div>
                </div>
                <div class="liga-lead-card">
                    <div class="liga-lead-card__from">${i18nText('10 licenças', '10 licenses')}</div>
                    <div class="liga-lead-card__arrow"><i class="fas fa-arrow-right"></i></div>
                    <div class="liga-lead-card__to">${i18nText('50 leads', '50 leads')}</div>
                </div>
            </div>
            ${i18nEl('p', 'Todo canal que adiciona pelo menos 3 licenças já entra na premiação em leads. O topo leva o pódio — mas ninguém que cresce sai de mãos vazias.', 'Every channel that adds at least 3 licenses already enters the lead rewards. The top takes the podium — but nobody who grows leaves empty-handed.', 'class="liga-note" data-reveal')}
        </div>
    </section>

    <!-- ═══ 5. O PÓDIO ═══ -->
    <section class="lp-section lp-section--dark" id="podio">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <span class="lp-badge">${i18nText('O pódio', 'The podium')}</span>
                ${i18nEl('h2', 'Experiências com os founders', 'Experiences with the founders')}
            </div>
            <div class="liga-podium" data-reveal-stagger>
                <div class="liga-podium__card liga-podium__card--champion">
                    <div class="liga-podium__rank"><i class="fas fa-trophy"></i> ${i18nText('1º — O Campeão', '1st — The Champion')}</div>
                    <ul class="liga-podium__list">
                        <li>${i18nText('Treinamento de liderança executiva no Disney Institute (EUA), viagem inclusa.', 'Executive leadership training at the Disney Institute (USA), travel included.')}</li>
                        <li>${i18nText('2 dias de experiência em Florianópolis com os founders.', '2 days of experience in Florianópolis with the founders.')}</li>
                        <li>${i18nText('Gravação de conteúdo com os founders.', 'Content recording with the founders.')}</li>
                    </ul>
                </div>
                <div class="liga-podium__card">
                    <div class="liga-podium__rank"><i class="fas fa-medal"></i> ${i18nText('2º e 3º', '2nd and 3rd')}</div>
                    <ul class="liga-podium__list">
                        <li>${i18nText('2 dias em Florianópolis.', '2 days in Florianópolis.')}</li>
                        <li>${i18nText('Gravação de conteúdo.', 'Content recording.')}</li>
                    </ul>
                </div>
                <div class="liga-podium__card">
                    <div class="liga-podium__rank"><i class="fas fa-medal"></i> ${i18nText('4º e 5º', '4th and 5th')}</div>
                    <ul class="liga-podium__list">
                        <li>${i18nText('2 dias em Florianópolis.', '2 days in Florianópolis.')}</li>
                    </ul>
                </div>
            </div>
            <div class="liga-podium-cta" data-reveal>
                <a href="#ranking" class="lp-btn lp-btn--gold">${i18nText('Ver o ranking ao vivo', 'See the live ranking')}</a>
            </div>
        </div>
    </section>

    <!-- ═══ 6. A LINHA DE CHEGADA ═══ -->
    <section class="lp-section lp-section--light liga-finish-section">
        <div class="lp-container">
            <div class="liga-finish" data-reveal>
                <span class="lp-badge lp-badge--light">${i18nText('A linha de chegada', 'The finish line')}</span>
                ${i18nEl('h2', 'Bootcamp do 3º trimestre', 'Q3 Bootcamp')}
                <p class="liga-finish__date"><i class="fas fa-flag-checkered"></i> 01, 02 e 03/10</p>
                ${i18nEl('p', 'É lá que o placar fecha e a premiação acontece. A receita das licenças precisa estar ativa nesse dia. Até lá, cada licença nova que seu canal inclui conta.', 'That is where the scoreboard closes and the awards happen. License revenue must be active on that day. Until then, every new license your channel adds counts.')}
            </div>
        </div>
    </section>

    <!-- ═══ 7. RANKING (cabeçalho; <LigaRanking/> renderiza logo abaixo) ═══ -->
    <section class="lp-section lp-section--dark liga-ranking-head" id="ranking">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                <span class="lp-badge">${i18nText('Ranking ao vivo', 'Live ranking')}</span>
                ${i18nEl('h2', 'O ranking já começou. E você?', 'The ranking has already started. And you?')}
                ${i18nEl('p', 'Licenças novas desde 1º de julho · atualizado ao longo do programa', 'New licenses since July 1 · updated throughout the program')}
            </div>
        </div>
    </section>
`;

export const htmlBottom = `
    <!-- ═══ 8. FAQ ═══ -->
    <section class="lp-section lp-section--light">
        <div class="lp-container">
            <div class="lp-section-header" data-reveal>
                ${i18nEl('h2', 'Perguntas frequentes', 'Frequently asked questions')}
            </div>
            <div class="faq-list" data-reveal>
                <div class="faq-item">
                    <button class="faq-question">
                        <span>${i18nText('Como eu subo no ranking?', 'How do I climb the ranking?')}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            ${i18nText('Adicionando licenças novas pagantes no seu canal. Cada nova assinatura ativa soma pontos; cancelamentos descontam. O Orbit acompanha o crescimento de cada canal — você só precisa crescer.', 'By adding new paying licenses in your channel. Each new active subscription adds points; cancellations deduct. Orbit tracks each channel\'s growth — you just need to grow.')}
                        </div>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">
                        <span>${i18nText('Quando o programa fecha?', 'When does the program close?')}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            ${i18nText('Nos dias 01, 02 e 03 de outubro, no Bootcamp do 3º trimestre. É quando o placar fecha — e a receita das licenças precisa estar ativa.', 'On October 1, 2 and 3, at the Q3 Bootcamp. That is when the scoreboard closes — and license revenue must be active.')}
                        </div>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">
                        <span>${i18nText('Preciso me inscrever?', 'Do I need to sign up?')}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            ${i18nText('Não. O ranking é automático: o Orbit acompanha as licenças ativas de cada canal e monta o placar sozinho. Para ver a sua posição, é só usar o e-mail de login do Orbit no card "Sua posição", aqui na página.', 'No. The ranking is automatic: Orbit tracks each channel\'s active licenses and builds the scoreboard on its own. To see your position, just use your Orbit login email in the "Your position" card on this page.')}
                        </div>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">
                        <span>${i18nText('Quais são os prêmios?', 'What are the prizes?')}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer__inner">
                            ${i18nText('O 1º lugar leva uma imersão de liderança nos EUA (Instituto Disney) com os founders, mais 2 dias em Florianópolis e gravação de conteúdo. 2º ao 5º ganham experiências em Florianópolis. E todo canal que cresce ganha leads no LeadBid.', '1st place gets a leadership immersion in the US (Disney Institute) with the founders, plus 2 days in Florianópolis and content recording. 2nd to 5th get experiences in Florianópolis. And every channel that grows gets LeadBid leads.')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ 9. CTA FINAL ═══ -->
    <section class="lp-cta-final lp-section--dark">
        <div class="lp-container">
            <div data-reveal>
                ${i18nEl('h2', 'Seu placar começa agora.', 'Your scoreboard starts now.')}
                <a href="#ranking" class="lp-btn lp-btn--gold">${i18nText('Ver o ranking', 'See the ranking')}</a>
                ${i18nEl('p', 'Prêmios e metas sujeitos ao regulamento do programa.', 'Prizes and goals are subject to the program rules.', 'class="liga-cta-micro"')}
            </div>
        </div>
    </section>

    <script>
    (function() {
        'use strict';

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
                document.querySelectorAll('.faq-item').forEach(function(fi) {
                    fi.classList.remove('active');
                    fi.querySelector('.faq-answer').style.maxHeight = '0';
                });
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
`;
