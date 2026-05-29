export const pageHTML = `
    <!-- ═══ DOBRA 1 — HERO ═══ -->
    <section class="lp-hero" id="hero" style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden;">
        <div class="lp-hero__bg-image" style="opacity:0.2;">
            <img src="/images/fundo-orbit.jpg" alt="" width="1920" height="1080" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:center;">
        </div>
        <div class="lp-hero__glow lp-hero__glow--1"></div>
        <div class="lp-hero__glow lp-hero__glow--2"></div>
        <div class="container" style="max-width:900px;">

            <!-- Badge -->
            <div style="display:inline-flex;align-items:center;gap:10px;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);border-radius:100px;padding:8px 20px;margin-bottom:24px;" data-reveal>
                <span style="width:10px;height:10px;background:#ff4444;border-radius:50%;display:inline-block;animation:livePulse 1.5s ease-in-out infinite;"></span>
                <span style="color:#ffba1a;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;">LIVE SEMANAL PARA CONSULTORES</span>
            </div>

            <!-- Schedule -->
            <div style="display:inline-block;background:linear-gradient(135deg,rgba(255,186,26,0.15),rgba(255,186,26,0.05));border:2px solid rgba(255,186,26,0.4);border-radius:16px;padding:16px 36px;margin-bottom:32px;" data-reveal>
                <span style="color:#ffba1a;font-size:clamp(1.1rem,2.5vw,1.5rem);font-weight:800;letter-spacing:0.5px;">
                    <i class="fa-solid fa-calendar-check" style="margin-right:10px;"></i>TODA QUINTA-FEIRA &Agrave;S 18H
                </span>
            </div>

            <!-- Headline -->
            <h1 style="font-size:clamp(1.8rem,4.5vw,3.2rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:20px;" data-reveal>
                A live semanal para consultores que querem destravar <span style="color:#ffba1a;">recorr&ecirc;ncia passiva</span> com agentes de IA
            </h1>

            <!-- Subheadline -->
            <p style="font-size:clamp(1rem,2.5vw,1.25rem);color:#C9D1D9;max-width:760px;margin:0 auto 24px;line-height:1.6;" data-reveal>
                Toda quinta &agrave;s 18h, <strong style="color:#fff;">Christian Hart</strong> mostra como os consultores est&atilde;o criando novas receitas, escalando com agentes de IA e transformando a consultoria em um modelo recorrente.
            </p>

            <!-- Apresentador -->
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:28px 0 8px;" data-reveal>
                <img src="/images/diretor-chris.jpg" alt="Christian Hart" width="64" height="64" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,186,26,0.4);">
                <div style="text-align:left;">
                    <span style="color:#fff;font-weight:700;font-size:17px;display:block;line-height:1.3;">Christian Hart</span>
                    <span style="color:#8B949E;font-size:14px;">Diretor de Canais &mdash; Grupo GSN</span>
                </div>
            </div>

            <!-- Info -->
            <div style="display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;margin:32px 0;" data-reveal>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-calendar-day" style="color:#ffba1a;font-size:18px;"></i>
                    <span id="nextLiveDate" style="font-size:18px;font-weight:600;">Pr&oacute;xima quinta-feira</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-clock" style="color:#ffba1a;font-size:18px;"></i>
                    <span style="font-size:18px;font-weight:600;">18h (hor&aacute;rio de Bras&iacute;lia)</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-brands fa-whatsapp" style="color:#25D366;font-size:20px;"></i>
                    <span style="font-size:18px;font-weight:600;">Grupo fechado</span>
                </div>
            </div>

            <!-- Countdown -->
            <div id="liveCountdown" style="display:flex;justify-content:center;gap:16px;margin:40px 0;" data-reveal>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countDays" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Dias</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countHours" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Horas</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countMinutes" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Minutos</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countSeconds" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Segundos</span>
                </div>
            </div>

            <!-- Live now message (hidden until live) -->
            <div id="liveNow" style="display:none;margin:40px 0;">
                <p style="font-size:1.5rem;font-weight:700;color:#3FB950;">
                    <i class="fa-solid fa-circle" style="font-size:12px;animation:livePulse 1.5s ease-in-out infinite;margin-right:8px;"></i>
                    Estamos ao vivo agora!
                </p>
            </div>

            <!-- CTA -->
            <div style="margin-top:8px;" data-reveal>
                <a href="https://us06web.zoom.us/webinar/register/WN_heirSJIJSIGmsFdtbmGKTg" target="_blank" rel="noopener" class="btn btn-primary btn-lg hero-cta-glow" style="font-size:18px;padding:18px 48px;cursor:pointer;">
                    <i class="fa-solid fa-arrow-right" style="margin-right:8px;"></i>QUERO ENTRAR NA PR&Oacute;XIMA AULA
                </a>
                <p style="color:#8B949E;font-size:14px;margin-top:16px;">
                    <i class="fa-brands fa-whatsapp" style="margin-right:6px;color:#25D366;"></i>Entre para o grupo fechado de avisos no WhatsApp ap&oacute;s a inscri&ccedil;&atilde;o.
                </p>
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 2 — A GRANDE RUPTURA ═══ -->
    <section style="padding:100px 0;background:#0D1117;">
        <div class="container" style="max-width:820px;text-align:center;">
            <h2 style="font-size:clamp(1.8rem,4vw,2.75rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:32px;" data-reveal>
                O modelo de consultoria por <span style="color:#ffba1a;">projeto</span> est&aacute; ficando para tr&aacute;s
            </h2>
            <div style="display:flex;flex-direction:column;gap:20px;color:#C9D1D9;font-size:clamp(1.05rem,2vw,1.2rem);line-height:1.7;" data-reveal>
                <p style="margin:0;">Voc&ecirc; fecha um projeto. Entrega. O cliente n&atilde;o segue o que voc&ecirc; construiu. E o jogo recome&ccedil;a.</p>
                <p style="margin:0;">E quanto mais voc&ecirc; cresce&hellip; mais isso se repete.</p>
                <p style="margin:0;color:#fff;font-weight:600;">Nesta aula voc&ecirc; vai entender como os consultores est&atilde;o migrando do modelo artesanal para <span style="color:#ffba1a;">consultoria recorrente passiva</span>.</p>
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 3 — O QUE ESTÁ POR TRÁS DO NOVO MODELO ═══ -->
    <section style="padding:100px 0;background:var(--black-soft);">
        <div class="container" style="max-width:1100px;">
            <div style="text-align:center;margin-bottom:64px;">
                <span class="section-badge section-badge--gold" data-reveal>O que est&aacute; por tr&aacute;s</span>
                <h2 style="font-size:clamp(1.6rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin-top:16px;" data-reveal>
                    O novo modelo de consultoria com <span style="color:#ffba1a;">Agentes de IA</span>
                </h2>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;" data-reveal-stagger>
                <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:20px;padding:32px 28px;display:flex;flex-direction:column;gap:16px;" data-reveal>
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(255,186,26,0.12);display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-arrows-rotate" style="color:#ffba1a;font-size:24px;"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.25rem;font-weight:700;margin:0;line-height:1.3;">Recorr&ecirc;ncia Passiva para Consultorias</h3>
                    <p style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:0;">Voc&ecirc; vai entender como consultores est&atilde;o deixando de depender de projetos pontuais e passando a operar com receita mensal previs&iacute;vel dos mesmos clientes.</p>
                    <p style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;">Em vez de come&ccedil;ar do zero todo m&ecirc;s, o cliente continua dentro da estrutura, gerando valor e faturamento cont&iacute;nuo.</p>
                </div>

                <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:20px;padding:32px 28px;display:flex;flex-direction:column;gap:16px;" data-reveal>
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(255,186,26,0.12);display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-robot" style="color:#ffba1a;font-size:24px;"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.25rem;font-weight:700;margin:0;line-height:1.3;">Super Agentes Consultores</h3>
                    <p style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:0;">Veja como transformar sua metodologia em um agente que guia o cliente com fases, etapas e um cronograma claro de implementa&ccedil;&atilde;o.</p>
                    <p style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;">Isso permite escalar a entrega com padr&atilde;o, sem depender de voc&ecirc; executar tudo manualmente.</p>
                </div>

                <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:20px;padding:32px 28px;display:flex;flex-direction:column;gap:16px;" data-reveal>
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(255,186,26,0.12);display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-bullseye" style="color:#ffba1a;font-size:24px;"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.25rem;font-weight:700;margin:0;line-height:1.3;">Como resolver a aquisi&ccedil;&atilde;o de novos clientes</h3>
                    <p style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:0;">Descubra como alguns consultores est&atilde;o deixando de depender apenas de indica&ccedil;&atilde;o e criando acesso a novas oportunidades de crescimento.</p>
                    <p style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;">Uma forma mais previs&iacute;vel de expandir a carteira sem ficar ref&eacute;m da pr&oacute;pria agenda.</p>
                </div>

                <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:20px;padding:32px 28px;display:flex;flex-direction:column;gap:16px;" data-reveal>
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(255,186,26,0.12);display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-tag" style="color:#ffba1a;font-size:24px;"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.25rem;font-weight:700;margin:0;line-height:1.3;">Tudo com a sua marca</h3>
                    <p style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:0;">Tudo isso acontece dentro de uma estrutura personalizada, onde o cliente enxerga como parte da sua consultoria.</p>
                    <p style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;">Voc&ecirc; n&atilde;o vende uma ferramenta. Voc&ecirc; entrega uma opera&ccedil;&atilde;o com a sua marca.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 4 — O NOVO MODELO DO CONSULTOR ═══ -->
    <section style="padding:100px 0;background:#0D1117;">
        <div class="container" style="max-width:1000px;">
            <div style="text-align:center;margin-bottom:64px;">
                <h2 style="font-size:clamp(1.8rem,4vw,2.75rem);font-weight:800;color:#fff;line-height:1.2;" data-reveal>
                    Voc&ecirc; n&atilde;o precisa vender mais horas para crescer.
                </h2>
                <p style="font-size:clamp(1.2rem,3vw,1.75rem);color:#ffba1a;font-weight:700;margin-top:8px;" data-reveal>
                    Precisa mudar o modelo.
                </p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;align-items:stretch;">
                <div style="background:rgba(248,81,73,0.06);border:1px solid rgba(248,81,73,0.25);border-radius:20px;padding:36px 32px;" data-reveal>
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
                        <div style="width:48px;height:48px;border-radius:12px;background:rgba(248,81,73,0.15);display:flex;align-items:center;justify-content:center;">
                            <i class="fa-solid fa-arrow-rotate-left" style="color:#f85149;font-size:20px;"></i>
                        </div>
                        <span style="color:#f85149;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:1px;">Antes</span>
                    </div>
                    <p style="color:#C9D1D9;font-size:1.15rem;font-weight:600;line-height:1.5;margin:0;">
                        Projeto &rarr; entrega &rarr; <span style="color:#f85149;">churn</span>
                    </p>
                    <p style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:14px 0 0;">
                        Cada cliente come&ccedil;a do zero. O ciclo n&atilde;o se sustenta sozinho.
                    </p>
                </div>

                <div style="background:rgba(63,185,80,0.06);border:1px solid rgba(63,185,80,0.3);border-radius:20px;padding:36px 32px;" data-reveal>
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
                        <div style="width:48px;height:48px;border-radius:12px;background:rgba(63,185,80,0.15);display:flex;align-items:center;justify-content:center;">
                            <i class="fa-solid fa-arrows-rotate" style="color:#3FB950;font-size:20px;"></i>
                        </div>
                        <span style="color:#3FB950;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:1px;">Depois</span>
                    </div>
                    <p style="color:#fff;font-size:1.15rem;font-weight:600;line-height:1.5;margin:0;">
                        Consultoria + agentes + <span style="color:#3FB950;">recorr&ecirc;ncia</span> + demanda
                    </p>
                    <p style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:14px 0 0;">
                        O cliente continua dentro da estrutura, gerando valor m&ecirc;s a m&ecirc;s &mdash; com a sua marca.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 5 — COM QUEM VOCÊ VAI APRENDER ═══ -->
    <section style="padding:100px 0;background:var(--black-soft);">
        <div class="container" style="max-width:880px;text-align:center;">
            <span class="section-badge section-badge--gold" data-reveal>Quem conduz</span>
            <h2 style="font-size:clamp(1.6rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:16px 0 48px;" data-reveal>
                Conduzido por <span style="color:#ffba1a;">Christian Hart</span>
            </h2>

            <div style="background:#161B22;border:1px solid rgba(255,186,26,0.2);border-radius:24px;padding:48px 36px;" data-reveal>
                <img src="/images/diretor-chris.jpg" alt="Christian Hart" width="140" height="140" style="width:140px;height:140px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,186,26,0.5);margin:0 auto 24px;display:block;">
                <h3 style="color:#fff;font-size:1.5rem;font-weight:700;margin:0 0 6px;">Christian Hart</h3>
                <p style="color:#ffba1a;font-size:1rem;font-weight:600;margin:0 0 24px;">Diretor de Canais &mdash; Grupo GSN</p>
                <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin:0 0 16px;">
                    Atua diretamente na constru&ccedil;&atilde;o do modelo que est&aacute; transformando a forma como consultorias estruturam <strong style="color:#fff;">entrega, escala e recorr&ecirc;ncia</strong> com IA.
                </p>
                <p style="color:#8B949E;font-size:1rem;line-height:1.6;margin:0;">
                    Uma conversa pr&aacute;tica, sem teoria, com quem est&aacute; construindo isso na pr&aacute;tica.
                </p>
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 6 — CTA FINAL + CALENDAR + FORM ═══ -->
    <section id="inscreva-se" style="padding:100px 0;background:#0D1117;text-align:center;">
        <div class="container" style="max-width:640px;">
            <h2 style="font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;color:#fff;margin-bottom:12px;" data-reveal>
                Garanta sua vaga na masterclass
            </h2>
            <p style="color:#8B949E;font-size:1.1rem;margin-bottom:32px;" data-reveal>
                Toda quinta-feira &agrave;s 18h. Inscri&ccedil;&atilde;o gratuita pelo Zoom &mdash; o link e os lembretes chegam por l&aacute;.
            </p>

            <div style="background:#161B22;border:1px solid rgba(255,186,26,0.18);border-radius:16px;padding:36px 28px;" data-reveal>
                <a href="https://us06web.zoom.us/webinar/register/WN_heirSJIJSIGmsFdtbmGKTg" target="_blank" rel="noopener" class="btn btn-primary btn-lg hero-cta-glow" style="font-size:17px;padding:18px 40px;display:inline-block;">
                    <i class="fa-solid fa-video" style="margin-right:8px;"></i>INSCREVER-ME NA MASTERCLASS
                </a>
                <p style="color:#8B949E;font-size:13px;margin-top:18px;">
                    <i class="fa-solid fa-lock" style="margin-right:6px;"></i>Inscri&ccedil;&atilde;o no Zoom &middot; voc&ecirc; recebe link e lembretes automaticamente.
                </p>
            </div>
        </div>
    </section>

    <!-- ═══ FAQ ═══ -->
    <section style="padding:80px 0;background:var(--black-soft);">
        <div class="container" style="max-width:780px;">
            <h2 style="font-size:clamp(1.4rem,2.8vw,2rem);font-weight:800;color:#fff;text-align:center;margin-bottom:8px;" data-reveal>
                Perguntas r&aacute;pidas antes de entrar
            </h2>
            <p style="color:#8B949E;font-size:1rem;text-align:center;margin-bottom:48px;" data-reveal>
                Tudo o que voc&ecirc; precisa saber para participar.
            </p>

            <div style="display:flex;flex-direction:column;gap:14px;" data-reveal-stagger>
                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>Preciso dominar IA para participar?</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        N&atilde;o. A aula n&atilde;o &eacute; sobre ferramentas. &Eacute; sobre <strong style="color:#fff;">modelo de consultoria</strong> e como usar IA de forma pr&aacute;tica na entrega.
                    </div>
                </details>

                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>Isso funciona para qualquer tipo de consultoria?</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        Sim. O modelo pode ser aplicado em diferentes nichos, porque ele n&atilde;o depende do setor &mdash; depende da <strong style="color:#fff;">estrutura da sua entrega</strong>.
                    </div>
                </details>

                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>Essa aula &eacute; gratuita mesmo?</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        Sim. Voc&ecirc; entra gratuitamente no grupo e recebe o acesso &agrave; aula ao vivo.
                    </div>
                </details>

                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>Vou sair com algo aplic&aacute;vel ou &eacute; s&oacute; conte&uacute;do?</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        A proposta &eacute; pr&aacute;tica. Voc&ecirc; vai entender o modelo e como come&ccedil;ar a aplicar na sua pr&oacute;pria consultoria.
                    </div>
                </details>

                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>Preciso j&aacute; ter clientes para fazer sentido?</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        N&atilde;o. Se voc&ecirc; j&aacute; atende clientes, vai ver como transformar isso em recorr&ecirc;ncia. Se ainda est&aacute; estruturando, vai entender o <strong style="color:#fff;">modelo certo desde o in&iacute;cio</strong>.
                    </div>
                </details>
            </div>
        </div>
    </section>

    <!-- Dynamic countdown to next Thursday 18h BRT -->
    <script>
    (function() {
        // Primeira edição confirmada da masterclass — nada antes dela
        var minLiveStart = new Date(2026, 4, 21, 18, 0, 0); // 21/05/2026 18h

        function getNextThursday() {
            var now = new Date();
            var day = now.getDay();
            var daysUntilThursday = (4 - day + 7) % 7;
            if (daysUntilThursday === 0) {
                var todayAt19 = new Date(now);
                todayAt19.setHours(19, 0, 0, 0);
                if (now >= todayAt19) daysUntilThursday = 7;
            }
            var next = new Date(now);
            next.setDate(now.getDate() + daysUntilThursday);
            next.setHours(18, 0, 0, 0);
            if (next < minLiveStart) next = new Date(minLiveStart);
            return next;
        }

        function formatDateBR(d) {
            var months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            return d.getDate() + ' de ' + months[d.getMonth()] + ', ' + d.getFullYear();
        }

        var target = getNextThursday();

        var dateEl = document.getElementById('nextLiveDate');
        if (dateEl) dateEl.textContent = formatDateBR(target);

        function updateCountdown() {
            var now = new Date().getTime();
            var diff = target.getTime() - now;

            if (diff <= 0 && diff > -3600000) {
                var countdownEl = document.getElementById('liveCountdown');
                var liveNowEl = document.getElementById('liveNow');
                if (countdownEl) countdownEl.style.display = 'none';
                if (liveNowEl) liveNowEl.style.display = 'block';
                return;
            }

            if (diff <= 0) {
                target = getNextThursday();
                if (dateEl) dateEl.textContent = formatDateBR(target);
                diff = target.getTime() - now;
            }

            var days = Math.floor(diff / 86400000);
            var hours = Math.floor((diff % 86400000) / 3600000);
            var minutes = Math.floor((diff % 3600000) / 60000);
            var seconds = Math.floor((diff % 60000) / 1000);

            var d = document.getElementById('countDays');
            var h = document.getElementById('countHours');
            var m = document.getElementById('countMinutes');
            var s = document.getElementById('countSeconds');
            if (d) d.textContent = days.toString().padStart(2, '0');
            if (h) h.textContent = hours.toString().padStart(2, '0');
            if (m) m.textContent = minutes.toString().padStart(2, '0');
            if (s) s.textContent = seconds.toString().padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    })();
    </script>

    <style>
    body { overflow-x: hidden !important; }

    [data-reveal], [data-reveal-stagger] {
        opacity: 1 !important;
        transform: none !important;
    }

    @keyframes livePulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
    }

    .cta-form-card {
        border: 1px solid rgba(255,186,26,0.15) !important;
        box-shadow: 0 0 40px rgba(255,186,26,0.05);
    }

    @media (max-width: 768px) {
        .lp-hero .container { padding: 0 20px !important; }
        #liveCountdown { gap: 8px !important; }
        #liveCountdown > div { min-width: 65px !important; padding: 14px 8px !important; }
        #liveCountdown > div > span:first-child { font-size: 1.6rem !important; }
        .cta-form-card { padding: 24px 20px !important; }
        .btn-lg { font-size: 15px !important; padding: 14px 24px !important; }
    }
    @media (max-width: 420px) {
        #liveCountdown > div { min-width: 58px !important; padding: 10px 6px !important; }
        #liveCountdown > div > span:first-child { font-size: 1.3rem !important; }
        #liveCountdown > div > span:last-child { font-size: 10px !important; }
    }
    </style>
`;
