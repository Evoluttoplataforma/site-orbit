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
                    <i class="fa-solid fa-calendar-check" style="margin-right:10px;"></i>TODA QUARTA-FEIRA &Agrave;S 18H
                </span>
            </div>

            <!-- Headline -->
            <h1 style="font-size:clamp(1.8rem,4.5vw,3.2rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:20px;" data-reveal>
                A live semanal para consultores que querem destravar <span style="color:#ffba1a;">recorr&ecirc;ncia passiva</span> com agentes de IA
            </h1>

            <!-- Subheadline -->
            <p style="font-size:clamp(1rem,2.5vw,1.25rem);color:#C9D1D9;max-width:760px;margin:0 auto 24px;line-height:1.6;" data-reveal>
                Toda quarta &agrave;s 18h, <strong style="color:#fff;">Christian Hart</strong> mostra como os consultores est&atilde;o criando novas receitas, escalando com agentes de IA e transformando a consultoria em um modelo recorrente.
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
                    <span id="nextLiveDate" style="font-size:18px;font-weight:600;">Pr&oacute;xima quarta-feira</span>
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
                <a onclick="document.getElementById('inscreva-se').scrollIntoView({behavior:'smooth'})" class="btn btn-primary btn-lg hero-cta-glow" style="font-size:18px;padding:18px 48px;cursor:pointer;">
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
        <div class="container" style="max-width:700px;">
            <h2 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:#fff;margin-bottom:8px;" data-reveal>
                Toda quarta &agrave;s 18h.
            </h2>
            <p style="color:#C9D1D9;font-size:1.1rem;margin-bottom:8px;" data-reveal>
                Entre para a pr&oacute;xima aula ao vivo e entenda como aplicar isso na sua consultoria.
            </p>
            <p style="color:#8B949E;font-size:0.95rem;margin-bottom:40px;" data-reveal>
                <i class="fa-brands fa-whatsapp" style="color:#25D366;margin-right:6px;"></i>Receba o link no grupo fechado.
            </p>

            <!-- Calendar -->
            <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:16px;padding:28px 24px;margin-bottom:32px;" data-reveal>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
                    <button id="calPrev" style="background:none;border:none;color:#ffba1a;font-size:20px;cursor:pointer;padding:8px;"><i class="fas fa-chevron-left"></i></button>
                    <span id="calMonthLabel" style="color:#fff;font-size:18px;font-weight:700;text-transform:capitalize;"></span>
                    <button id="calNext" style="background:none;border:none;color:#ffba1a;font-size:20px;cursor:pointer;padding:8px;"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:8px;">
                    <span style="color:#8B949E;font-size:12px;font-weight:600;text-align:center;padding:8px 0;">DOM</span>
                    <span style="color:#8B949E;font-size:12px;font-weight:600;text-align:center;padding:8px 0;">SEG</span>
                    <span style="color:#8B949E;font-size:12px;font-weight:600;text-align:center;padding:8px 0;">TER</span>
                    <span style="color:#8B949E;font-size:12px;font-weight:600;text-align:center;padding:8px 0;">QUA</span>
                    <span style="color:#8B949E;font-size:12px;font-weight:600;text-align:center;padding:8px 0;">QUI</span>
                    <span style="color:#8B949E;font-size:12px;font-weight:600;text-align:center;padding:8px 0;">SEX</span>
                    <span style="color:#8B949E;font-size:12px;font-weight:600;text-align:center;padding:8px 0;">S&Aacute;B</span>
                </div>
                <div id="calGrid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;"></div>
                <div id="calSelected" style="margin-top:16px;display:none;">
                    <p style="color:#ffba1a;font-size:15px;font-weight:600;"><i class="fas fa-calendar-check" style="margin-right:8px;"></i>Voc&ecirc; escolheu: <span id="calSelectedDate"></span></p>
                </div>
            </div>

            <!-- Form Popup -->
            <div id="liveFormWrapper" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);z-index:3000;padding:20px;overflow-y:auto;" onclick="if(event.target===this){this.style.display='none';}">
                <div style="max-width:480px;margin:60px auto;position:relative;animation:bannerPopIn 0.3s ease-out;">
                    <button onclick="document.getElementById('liveFormWrapper').style.display='none'" style="position:absolute;top:-12px;right:-12px;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.6);border:none;color:#fff;font-size:20px;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);">&times;</button>
                    <div class="cta-form-card" style="border:1px solid rgba(255,186,26,0.2) !important;">
                        <div style="text-align:center;margin-bottom:8px;">
                            <p id="liveFormDate" style="color:#ffba1a;font-size:14px;font-weight:700;margin:0 0 12px;"><i class="fas fa-calendar-check" style="margin-right:6px;"></i></p>
                            <h3 style="font-size:22px;font-weight:700;color:#fff;margin-bottom:6px;"><i class="fa-brands fa-whatsapp" style="color:#25D366;margin-right:8px;"></i>Garanta sua vaga</h3>
                            <p style="font-size:14px;color:#8B949E;">Preencha e receba o link no grupo fechado.</p>
                        </div>

                        <form id="liveForm" class="lead-form" novalidate>
                            <input type="hidden" id="live-chosen-date" name="chosen_date">
                            <input type="hidden" name="utm_source" id="h_utm_source">
                            <input type="hidden" name="utm_medium" id="h_utm_medium">
                            <input type="hidden" name="utm_campaign" id="h_utm_campaign">
                            <input type="hidden" name="utm_content" id="h_utm_content">
                            <input type="hidden" name="utm_term" id="h_utm_term">
                            <input type="hidden" name="gclid" id="h_gclid">
                            <input type="hidden" name="fbclid" id="h_fbclid">
                            <input type="hidden" name="landing_page" id="h_landing_page">
                            <input type="hidden" name="referrer" id="h_referrer">
                            <input type="hidden" name="session_id" id="h_session_id">
                            <input type="hidden" name="originPage" id="h_originPage">
                            <div class="form-group">
                                <label for="live-nome" style="color:#C9D1D9;">Nome completo *</label>
                                <input type="text" id="live-nome" name="nome" placeholder="Seu nome completo" required style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                            </div>
                            <div class="form-group">
                                <label for="live-email" style="color:#C9D1D9;">E-mail *</label>
                                <input type="email" id="live-email" name="email" placeholder="seu@email.com" required style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                            </div>
                            <div class="form-group">
                                <label for="live-telefone" style="color:#C9D1D9;">WhatsApp *</label>
                                <input type="tel" id="live-telefone" name="telefone" placeholder="(00) 00000-0000" required style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                            </div>
                            <div class="form-group" style="margin:16px 0;">
                                <label for="live-consent" style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;color:#C9D1D9;font-size:13px;line-height:1.5;font-weight:400;">
                                    <input type="checkbox" id="live-consent" name="consent" required style="margin-top:3px;flex-shrink:0;width:16px;height:16px;accent-color:#ffba1a;cursor:pointer;">
                                    <span>Concordo em receber comunica&ccedil;&otilde;es da Orbit Gest&atilde;o por <strong>e-mail e WhatsApp</strong> sobre a live, lembretes, conte&uacute;dos e novidades, conforme nossa <a href="/politica-privacidade" target="_blank" style="color:#ffba1a;text-decoration:underline;">Pol&iacute;tica de Privacidade</a>. Posso cancelar a qualquer momento.</span>
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-submit hero-cta-glow" style="cursor:pointer;border:none;width:100%;">
                                <i class="fa-solid fa-arrow-right" style="margin-right:8px;"></i>QUERO ENTRAR NA PR&Oacute;XIMA AULA
                            </button>
                            <p style="color:#8B949E;font-size:13px;text-align:center;margin-top:8px;">
                                <i class="fa-solid fa-lock" style="margin-right:6px;"></i>Seus dados est&atilde;o seguros (LGPD).
                            </p>
                        </form>

                        <div id="liveFormSuccess" style="display:none;text-align:center;padding:20px 0;">
                            <div style="width:64px;height:64px;background:rgba(63,185,80,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                                <i class="fa-solid fa-check" style="color:#3FB950;font-size:28px;"></i>
                            </div>
                            <h3 style="color:#fff;font-size:1.5rem;font-weight:700;margin-bottom:12px;">Inscri&ccedil;&atilde;o confirmada!</h3>
                            <p style="color:var(--gray-500);font-size:16px;">Voc&ecirc; receber&aacute; o link no seu e-mail e no grupo fechado.</p>
                        </div>
                    </div>
                </div>
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

    <!-- Calendar JS — quartas -->
    <script>
    (function() {
        if (window.__liveCalInit) return;
        window.__liveCalInit = true;

        var eventDays = [3]; // Wednesday = 3
        var currentMonth = new Date().getMonth();
        var currentYear = new Date().getFullYear();
        var selectedDate = null;

        var months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

        function renderCalendar() {
            var grid = document.getElementById('calGrid');
            var label = document.getElementById('calMonthLabel');
            if (!grid || !label) return;

            label.textContent = months[currentMonth] + ' ' + currentYear;

            var firstDay = new Date(currentYear, currentMonth, 1).getDay();
            var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            var today = new Date();
            today.setHours(0,0,0,0);

            var html = '';

            for (var i = 0; i < firstDay; i++) {
                html += '<div></div>';
            }

            for (var d = 1; d <= daysInMonth; d++) {
                var date = new Date(currentYear, currentMonth, d);
                var dayOfWeek = date.getDay();
                var isEvent = eventDays.indexOf(dayOfWeek) !== -1;
                var isPast = date < today;
                var isSelected = selectedDate && date.getTime() === selectedDate.getTime();
                var dateStr = currentYear + '-' + String(currentMonth+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');

                if (isEvent && !isPast) {
                    html += '<button onclick=\"window.__selectLiveDate(\\'' + dateStr + '\\')\" style=\"' +
                        'background:' + (isSelected ? '#ffba1a' : 'rgba(255,186,26,0.12)') + ';' +
                        'color:' + (isSelected ? '#0D1117' : '#ffba1a') + ';' +
                        'border:2px solid ' + (isSelected ? '#ffba1a' : 'rgba(255,186,26,0.3)') + ';' +
                        'border-radius:10px;padding:10px 0;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.2s;' +
                        '\">' + d + '</button>';
                } else {
                    html += '<div style=\"color:' + (isPast ? '#30363D' : '#484F58') + ';padding:10px 0;font-size:14px;' +
                        (isEvent && isPast ? 'text-decoration:line-through;' : '') +
                        '\">' + d + '</div>';
                }
            }

            grid.innerHTML = html;
        }

        window.__selectLiveDate = function(dateStr) {
            var parts = dateStr.split('-');
            selectedDate = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));

            var display = document.getElementById('calSelected');
            var dateLabel = document.getElementById('calSelectedDate');
            var formWrapper = document.getElementById('liveFormWrapper');
            var hiddenInput = document.getElementById('live-chosen-date');

            if (display) display.style.display = 'block';
            if (dateLabel) {
                var dias = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
                dateLabel.textContent = dias[selectedDate.getDay()] + ', ' + selectedDate.getDate() + ' de ' + months[selectedDate.getMonth()] + ' de ' + selectedDate.getFullYear() + ' às 18h';
            }
            if (hiddenInput) hiddenInput.value = dateStr;
            var formDate = document.getElementById('liveFormDate');
            if (formDate) formDate.innerHTML = '<i class="fas fa-calendar-check" style="margin-right:6px;"></i>' + dateLabel.textContent;
            if (formWrapper) formWrapper.style.display = 'flex';

            renderCalendar();
        };

        var prevBtn = document.getElementById('calPrev');
        var nextBtn = document.getElementById('calNext');
        if (prevBtn) prevBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            renderCalendar();
        });
        if (nextBtn) nextBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
            renderCalendar();
        });

        function hasFutureEventDay(year, month) {
            var todayD = new Date();
            todayD.setHours(0,0,0,0);
            var daysInMonth = new Date(year, month + 1, 0).getDate();
            for (var d = 1; d <= daysInMonth; d++) {
                var date = new Date(year, month, d);
                if (eventDays.indexOf(date.getDay()) !== -1 && date >= todayD) return true;
            }
            return false;
        }
        for (var __i = 0; __i < 12 && !hasFutureEventDay(currentYear, currentMonth); __i++) {
            currentMonth++;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        }
        renderCalendar();
    })();
    </script>

    <!-- Dynamic countdown to next Wednesday 18h BRT -->
    <script>
    (function() {
        function getNextWednesday() {
            var now = new Date();
            var day = now.getDay();
            var daysUntilWednesday = (3 - day + 7) % 7;
            if (daysUntilWednesday === 0) {
                var todayAt19 = new Date(now);
                todayAt19.setHours(19, 0, 0, 0);
                if (now >= todayAt19) daysUntilWednesday = 7;
            }
            var next = new Date(now);
            next.setDate(now.getDate() + daysUntilWednesday);
            next.setHours(18, 0, 0, 0);
            return next;
        }

        function formatDateBR(d) {
            var months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            return d.getDate() + ' de ' + months[d.getMonth()] + ', ' + d.getFullYear();
        }

        var target = getNextWednesday();

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
                target = getNextWednesday();
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

    <!-- Form submit handler -->
    <script>
    (function() {
        if (window.__liveFormInit) return;
        window.__liveFormInit = true;

        var SUPABASE_URL = 'https://tnpzoklepkvktbqouctf.supabase.co';
        var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucHpva2xlcGt2a3RicW91Y3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MjAxNjcsImV4cCI6MjA4NzE5NjE2N30.hXrOhbIm9DnxaItT1e9g6B6d9mhAmeoLKJ2DuHlABFU';
        var ORBIT_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
        var ORBIT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

        var form = document.getElementById('liveForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>Enviando...';

            var formData = new FormData(form);
            var chosenDate = document.getElementById('live-chosen-date');
            var g = function(id) { var el = document.getElementById(id); return el ? el.value : ''; };
            var data = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                source: 'live-chris',
                chosen_date: chosenDate ? chosenDate.value : null,
                utm_source: g('h_utm_source') || null,
                utm_medium: g('h_utm_medium') || null,
                utm_campaign: g('h_utm_campaign') || null,
                utm_content: g('h_utm_content') || null,
                utm_term: g('h_utm_term') || null,
                gclid: g('h_gclid') || null,
                fbclid: g('h_fbclid') || null,
                landing_page: g('h_landing_page') || null,
                referrer: g('h_referrer') || null,
                session_id: g('h_session_id') || null,
                live_title: 'Masterclass Consultores com Christian Hart'
            };

            var saveTo = function(url, key) {
                return fetch(url + '/rest/v1/live_orbit_leads', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': key,
                        'Authorization': 'Bearer ' + key,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify(data)
                });
            };
            Promise.allSettled([
                saveTo(SUPABASE_URL, SUPABASE_KEY),
                saveTo(ORBIT_URL, ORBIT_KEY)
            ]).then(function(results) {
                var anyOk = results.some(function(r) { return r.status === 'fulfilled' && r.value.ok; });
                if (!anyOk) throw new Error('Erro ao salvar');
                results.forEach(function(r, i) {
                    if (r.status === 'rejected' || !r.value.ok) {
                        console.warn('Save falhou no destino', i, r);
                    }
                });
                fetch(ORBIT_URL + '/functions/v1/send-live-confirmation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': ORBIT_KEY,
                        'Authorization': 'Bearer ' + ORBIT_KEY
                    },
                    body: JSON.stringify({ nome: data.nome, email: data.email, source: 'live-chris' })
                }).catch(function() {});
                fetch(SUPABASE_URL + '/functions/v1/subscribe-manychat-live', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome: data.nome, email: data.email, telefone: data.telefone, source: 'live-chris' })
                }).catch(function() {});
                window.location.href = '/live/chris/obrigado';
            }).catch(function(err) {
                console.error('Erro:', err);
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-solid fa-arrow-right" style="margin-right:8px;"></i>QUERO ENTRAR NA PRÓXIMA AULA';
                alert('Erro ao enviar. Tente novamente.');
            });
        });
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
