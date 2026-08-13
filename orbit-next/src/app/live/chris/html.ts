import { i18nText, i18nEl } from '@/lib/i18n-html';

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
                <span style="color:#ffba1a;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;">${i18nText('LIVE SEMANAL PARA CONSULTORES', 'WEEKLY LIVE FOR CONSULTANTS')}</span>
            </div>

            <!-- Schedule -->
            <div style="display:inline-block;background:linear-gradient(135deg,rgba(255,186,26,0.15),rgba(255,186,26,0.05));border:2px solid rgba(255,186,26,0.4);border-radius:16px;padding:16px 36px;margin-bottom:32px;" data-reveal>
                <span style="color:#ffba1a;font-size:clamp(1.1rem,2.5vw,1.5rem);font-weight:800;letter-spacing:0.5px;">
                    <i class="fa-solid fa-calendar-check" style="margin-right:10px;"></i>${i18nText('TODA QUINTA-FEIRA ÀS 18H', 'EVERY THURSDAY AT 6PM')}
                </span>
            </div>

            <!-- Headline -->
            ${i18nEl('h1', 'A live semanal para consultores que querem destravar <span style="color:#ffba1a;">recorrência passiva</span> com agentes de IA', 'The weekly live for consultants who want to unlock <span style="color:#ffba1a;">passive recurring revenue</span> with AI agents', 'style="font-size:clamp(1.8rem,4.5vw,3.2rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:20px;" data-reveal')}

            <!-- Subheadline -->
            ${i18nEl('p', 'Toda quinta às 18h, <strong style="color:#fff;">Christian Hart</strong> mostra como os consultores estão criando novas receitas, escalando com agentes de IA e transformando a consultoria em um modelo recorrente.', 'Every Thursday at 6pm, <strong style="color:#fff;">Christian Hart</strong> shows how consultants are creating new revenue, scaling with AI agents and turning consulting into a recurring model.', 'style="font-size:clamp(1rem,2.5vw,1.25rem);color:#C9D1D9;max-width:760px;margin:0 auto 24px;line-height:1.6;" data-reveal')}

            <!-- Apresentador -->
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:28px 0 8px;" data-reveal>
                <img src="/images/diretor-chris-novo.jpg" alt="Christian Hart" width="64" height="64" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,186,26,0.4);">
                <div style="text-align:left;">
                    <span style="color:#fff;font-weight:700;font-size:17px;display:block;line-height:1.3;">Christian Hart</span>
                    <span style="color:#8B949E;font-size:14px;">${i18nText('Diretor de Canais — Grupo GSN', 'Channel Director — Grupo GSN')}</span>
                </div>
            </div>

            <!-- Info -->
            <div style="display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;margin:32px 0;" data-reveal>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-calendar-day" style="color:#ffba1a;font-size:18px;"></i>
                    <span id="nextLiveDate" style="font-size:18px;font-weight:600;">${i18nText('Próxima quinta-feira', 'Next Thursday')}</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-clock" style="color:#ffba1a;font-size:18px;"></i>
                    <span style="font-size:18px;font-weight:600;">${i18nText('18h (horário de Brasília)', '6pm (Brasília time)')}</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-brands fa-whatsapp" style="color:#25D366;font-size:20px;"></i>
                    <span style="font-size:18px;font-weight:600;">${i18nText('Grupo fechado', 'Closed group')}</span>
                </div>
            </div>

            <!-- Countdown -->
            <div id="liveCountdown" style="display:flex;justify-content:center;gap:16px;margin:40px 0;" data-reveal>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countDays" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">${i18nText('Dias', 'Days')}</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countHours" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">${i18nText('Horas', 'Hours')}</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countMinutes" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">${i18nText('Minutos', 'Minutes')}</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countSeconds" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">${i18nText('Segundos', 'Seconds')}</span>
                </div>
            </div>

            <!-- Live now message (hidden until live) -->
            <div id="liveNow" style="display:none;margin:40px 0;">
                <p style="font-size:1.5rem;font-weight:700;color:#3FB950;">
                    <i class="fa-solid fa-circle" style="font-size:12px;animation:livePulse 1.5s ease-in-out infinite;margin-right:8px;"></i>
                    ${i18nText('Estamos ao vivo agora!', 'We are live now!')}
                </p>
            </div>

            <!-- CTA -->
            <div style="margin-top:8px;" data-reveal>
                <a href="https://us06web.zoom.us/webinar/register/WN_heirSJIJSIGmsFdtbmGKTg" target="_blank" rel="noopener" class="btn btn-primary btn-lg hero-cta-glow" style="font-size:18px;padding:18px 48px;cursor:pointer;">
                    <i class="fa-solid fa-arrow-right" style="margin-right:8px;"></i>${i18nText('QUERO ENTRAR NA PRÓXIMA AULA', 'I WANT TO JOIN THE NEXT CLASS')}
                </a>
                <p style="color:#8B949E;font-size:14px;margin-top:16px;">
                    <i class="fa-brands fa-whatsapp" style="margin-right:6px;color:#25D366;"></i>${i18nText('Entre para o grupo fechado de avisos no WhatsApp após a inscrição.', 'Join the closed WhatsApp notice group after signing up.')}
                </p>
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 2 — A GRANDE RUPTURA ═══ -->
    <section style="padding:100px 0;background:#0D1117;">
        <div class="container" style="max-width:820px;text-align:center;">
            ${i18nEl('h2', 'O modelo de consultoria por <span style="color:#ffba1a;">projeto</span> está ficando para trás', 'The project-based consulting model is <span style="color:#ffba1a;">falling behind</span>', 'style="font-size:clamp(1.8rem,4vw,2.75rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:32px;" data-reveal')}
            <div style="display:flex;flex-direction:column;gap:20px;color:#C9D1D9;font-size:clamp(1.05rem,2vw,1.2rem);line-height:1.7;" data-reveal>
                ${i18nEl('p', 'Você fecha um projeto. Entrega. O cliente não segue o que você construiu. E o jogo recomeça.', 'You close a project. You deliver. The client does not follow what you built. And the cycle starts over.', 'style="margin:0;"')}
                ${i18nEl('p', 'E quanto mais você cresce… mais isso se repete.', 'And the more you grow… the more it repeats.', 'style="margin:0;"')}
                ${i18nEl('p', 'Nesta aula você vai entender como os consultores estão migrando do modelo artesanal para <span style="color:#ffba1a;">consultoria recorrente passiva</span>.', 'In this class you will see how consultants are moving from the handmade model to <span style="color:#ffba1a;">passive recurring consulting</span>.', 'style="margin:0;color:#fff;font-weight:600;"')}
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 3 — O QUE ESTÁ POR TRÁS DO NOVO MODELO ═══ -->
    <section style="padding:100px 0;background:var(--black-soft);">
        <div class="container" style="max-width:1100px;">
            <div style="text-align:center;margin-bottom:64px;">
                <span class="section-badge section-badge--gold" data-reveal>${i18nText('O que está por trás', 'What is behind it')}</span>
                ${i18nEl('h2', 'O novo modelo de consultoria com <span style="color:#ffba1a;">Agentes de IA</span>', 'The new consulting model with <span style="color:#ffba1a;">AI Agents</span>', 'style="font-size:clamp(1.6rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin-top:16px;" data-reveal')}
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;" data-reveal-stagger>
                <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:20px;padding:32px 28px;display:flex;flex-direction:column;gap:16px;" data-reveal>
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(255,186,26,0.12);display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-arrows-rotate" style="color:#ffba1a;font-size:24px;"></i>
                    </div>
                    ${i18nEl('h3', 'Recorrência Passiva para Consultorias', 'Passive Recurring Revenue for Consultancies', 'style="color:#fff;font-size:1.25rem;font-weight:700;margin:0;line-height:1.3;"')}
                    ${i18nEl('p', 'Você vai entender como consultores estão deixando de depender de projetos pontuais e passando a operar com receita mensal previsível dos mesmos clientes.', 'You will see how consultants are stopping to depend on one-off projects and starting to operate with predictable monthly revenue from the same clients.', 'style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:0;"')}
                    ${i18nEl('p', 'Em vez de começar do zero todo mês, o cliente continua dentro da estrutura, gerando valor e faturamento contínuo.', 'Instead of starting from scratch every month, the client stays inside the structure, generating ongoing value and revenue.', 'style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;"')}
                </div>

                <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:20px;padding:32px 28px;display:flex;flex-direction:column;gap:16px;" data-reveal>
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(255,186,26,0.12);display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-robot" style="color:#ffba1a;font-size:24px;"></i>
                    </div>
                    ${i18nEl('h3', 'Super Agentes Consultores', 'Super Consultant Agents', 'style="color:#fff;font-size:1.25rem;font-weight:700;margin:0;line-height:1.3;"')}
                    ${i18nEl('p', 'Veja como transformar sua metodologia em um agente que guia o cliente com fases, etapas e um cronograma claro de implementação.', 'See how to turn your methodology into an agent that guides the client with phases, steps and a clear implementation timeline.', 'style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:0;"')}
                    ${i18nEl('p', 'Isso permite escalar a entrega com padrão, sem depender de você executar tudo manualmente.', 'That lets you scale delivery with a standard, without depending on you to execute everything by hand.', 'style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;"')}
                </div>

                <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:20px;padding:32px 28px;display:flex;flex-direction:column;gap:16px;" data-reveal>
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(255,186,26,0.12);display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-bullseye" style="color:#ffba1a;font-size:24px;"></i>
                    </div>
                    ${i18nEl('h3', 'Como resolver a aquisição de novos clientes', 'How to solve new-client acquisition', 'style="color:#fff;font-size:1.25rem;font-weight:700;margin:0;line-height:1.3;"')}
                    ${i18nEl('p', 'Descubra como alguns consultores estão deixando de depender apenas de indicação e criando acesso a novas oportunidades de crescimento.', 'Discover how some consultants are stopping to depend only on referrals and creating access to new growth opportunities.', 'style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:0;"')}
                    ${i18nEl('p', 'Uma forma mais previsível de expandir a carteira sem ficar refém da própria agenda.', 'A more predictable way to expand the book of business without being hostage to your own calendar.', 'style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;"')}
                </div>

                <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:20px;padding:32px 28px;display:flex;flex-direction:column;gap:16px;" data-reveal>
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(255,186,26,0.12);display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-tag" style="color:#ffba1a;font-size:24px;"></i>
                    </div>
                    ${i18nEl('h3', 'Tudo com a sua marca', 'Everything under your brand', 'style="color:#fff;font-size:1.25rem;font-weight:700;margin:0;line-height:1.3;"')}
                    ${i18nEl('p', 'Tudo isso acontece dentro de uma estrutura personalizada, onde o cliente enxerga como parte da sua consultoria.', 'All of this happens inside a customized structure, where the client sees it as part of your consultancy.', 'style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:0;"')}
                    ${i18nEl('p', 'Você não vende uma ferramenta. Você entrega uma operação com a sua marca.', 'You do not sell a tool. You deliver an operation under your brand.', 'style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;"')}
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 4 — O NOVO MODELO DO CONSULTOR ═══ -->
    <section style="padding:100px 0;background:#0D1117;">
        <div class="container" style="max-width:1000px;">
            <div style="text-align:center;margin-bottom:64px;">
                ${i18nEl('h2', 'Você não precisa vender mais horas para crescer.', 'You do not need to sell more hours to grow.', 'style="font-size:clamp(1.8rem,4vw,2.75rem);font-weight:800;color:#fff;line-height:1.2;" data-reveal')}
                ${i18nEl('p', 'Precisa mudar o modelo.', 'You need to change the model.', 'style="font-size:clamp(1.2rem,3vw,1.75rem);color:#ffba1a;font-weight:700;margin-top:8px;" data-reveal')}
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;align-items:stretch;">
                <div style="background:rgba(248,81,73,0.06);border:1px solid rgba(248,81,73,0.25);border-radius:20px;padding:36px 32px;" data-reveal>
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
                        <div style="width:48px;height:48px;border-radius:12px;background:rgba(248,81,73,0.15);display:flex;align-items:center;justify-content:center;">
                            <i class="fa-solid fa-arrow-rotate-left" style="color:#f85149;font-size:20px;"></i>
                        </div>
                        <span style="color:#f85149;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:1px;">${i18nText('Antes', 'Before')}</span>
                    </div>
                    ${i18nEl('p', 'Projeto → entrega → <span style="color:#f85149;">churn</span>', 'Project → delivery → <span style="color:#f85149;">churn</span>', 'style="color:#C9D1D9;font-size:1.15rem;font-weight:600;line-height:1.5;margin:0;"')}
                    ${i18nEl('p', 'Cada cliente começa do zero. O ciclo não se sustenta sozinho.', 'Each client starts from scratch. The cycle does not sustain itself.', 'style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:14px 0 0;"')}
                </div>

                <div style="background:rgba(63,185,80,0.06);border:1px solid rgba(63,185,80,0.3);border-radius:20px;padding:36px 32px;" data-reveal>
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
                        <div style="width:48px;height:48px;border-radius:12px;background:rgba(63,185,80,0.15);display:flex;align-items:center;justify-content:center;">
                            <i class="fa-solid fa-arrows-rotate" style="color:#3FB950;font-size:20px;"></i>
                        </div>
                        <span style="color:#3FB950;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:1px;">${i18nText('Depois', 'After')}</span>
                    </div>
                    ${i18nEl('p', 'Consultoria + agentes + <span style="color:#3FB950;">recorrência</span> + demanda', 'Consulting + agents + <span style="color:#3FB950;">recurring revenue</span> + demand', 'style="color:#fff;font-size:1.15rem;font-weight:600;line-height:1.5;margin:0;"')}
                    ${i18nEl('p', 'O cliente continua dentro da estrutura, gerando valor mês a mês — com a sua marca.', 'The client stays inside the structure, generating value month after month — under your brand.', 'style="color:#8B949E;font-size:0.95rem;line-height:1.6;margin:14px 0 0;"')}
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 5 — COM QUEM VOCÊ VAI APRENDER ═══ -->
    <section style="padding:100px 0;background:var(--black-soft);">
        <div class="container" style="max-width:880px;text-align:center;">
            <span class="section-badge section-badge--gold" data-reveal>${i18nText('Quem conduz', 'Who leads')}</span>
            ${i18nEl('h2', 'Conduzido por <span style="color:#ffba1a;">Christian Hart</span>', 'Led by <span style="color:#ffba1a;">Christian Hart</span>', 'style="font-size:clamp(1.6rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:16px 0 48px;" data-reveal')}

            <div style="background:#161B22;border:1px solid rgba(255,186,26,0.2);border-radius:24px;padding:48px 36px;" data-reveal>
                <img src="/images/diretor-chris-novo.jpg" alt="Christian Hart" width="140" height="140" style="width:140px;height:140px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,186,26,0.5);margin:0 auto 24px;display:block;">
                <h3 style="color:#fff;font-size:1.5rem;font-weight:700;margin:0 0 6px;">Christian Hart</h3>
                <p style="color:#ffba1a;font-size:1rem;font-weight:600;margin:0 0 24px;">${i18nText('Diretor de Canais — Grupo GSN', 'Channel Director — Grupo GSN')}</p>
                ${i18nEl('p', 'Atua diretamente na construção do modelo que está transformando a forma como consultorias estruturam <strong style="color:#fff;">entrega, escala e recorrência</strong> com IA.', 'He works directly on building the model that is transforming how consultancies structure <strong style="color:#fff;">delivery, scale and recurring revenue</strong> with AI.', 'style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin:0 0 16px;"')}
                ${i18nEl('p', 'Uma conversa prática, sem teoria, com quem está construindo isso na prática.', 'A practical conversation, with no theory, with someone who is building this in practice.', 'style="color:#8B949E;font-size:1rem;line-height:1.6;margin:0;"')}
            </div>
        </div>
    </section>

    <!-- ═══ DOBRA 6 — CTA FINAL + CALENDAR + FORM ═══ -->
    <section id="inscreva-se" style="padding:100px 0;background:#0D1117;text-align:center;">
        <div class="container" style="max-width:640px;">
            ${i18nEl('h2', 'Garanta sua vaga na masterclass', 'Secure your seat in the masterclass', 'style="font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;color:#fff;margin-bottom:12px;" data-reveal')}
            ${i18nEl('p', 'Toda quinta-feira às 18h. Inscrição gratuita pelo Zoom — o link e os lembretes chegam por lá.', 'Every Thursday at 6pm. Free registration on Zoom — the link and reminders arrive there.', 'style="color:#8B949E;font-size:1.1rem;margin-bottom:32px;" data-reveal')}

            <div style="background:#161B22;border:1px solid rgba(255,186,26,0.18);border-radius:16px;padding:36px 28px;" data-reveal>
                <a href="https://us06web.zoom.us/webinar/register/WN_heirSJIJSIGmsFdtbmGKTg" target="_blank" rel="noopener" class="btn btn-primary btn-lg hero-cta-glow" style="font-size:17px;padding:18px 40px;display:inline-block;">
                    <i class="fa-solid fa-video" style="margin-right:8px;"></i>${i18nText('INSCREVER-ME NA MASTERCLASS', 'REGISTER FOR THE MASTERCLASS')}
                </a>
                <p style="color:#8B949E;font-size:13px;margin-top:18px;">
                    <i class="fa-solid fa-lock" style="margin-right:6px;"></i>${i18nText('Inscrição no Zoom · você recebe link e lembretes automaticamente.', 'Zoom registration · you receive the link and reminders automatically.')}
                </p>
            </div>
        </div>
    </section>

    <!-- ═══ FAQ ═══ -->
    <section style="padding:80px 0;background:var(--black-soft);">
        <div class="container" style="max-width:780px;">
            ${i18nEl('h2', 'Perguntas rápidas antes de entrar', 'Quick questions before you join', 'style="font-size:clamp(1.4rem,2.8vw,2rem);font-weight:800;color:#fff;text-align:center;margin-bottom:8px;" data-reveal')}
            ${i18nEl('p', 'Tudo o que você precisa saber para participar.', 'Everything you need to know to take part.', 'style="color:#8B949E;font-size:1rem;text-align:center;margin-bottom:48px;" data-reveal')}

            <div style="display:flex;flex-direction:column;gap:14px;" data-reveal-stagger>
                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>${i18nText('Preciso dominar IA para participar?', 'Do I need to master AI to take part?')}</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        ${i18nText('Não. A aula não é sobre ferramentas. É sobre <strong style="color:#fff;">modelo de consultoria</strong> e como usar IA de forma prática na entrega.', 'No. The class is not about tools. It is about a <strong style="color:#fff;">consulting model</strong> and how to use AI practically in delivery.')}
                    </div>
                </details>

                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>${i18nText('Isso funciona para qualquer tipo de consultoria?', 'Does this work for any type of consultancy?')}</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        ${i18nText('Sim. O modelo pode ser aplicado em diferentes nichos, porque ele não depende do setor — depende da <strong style="color:#fff;">estrutura da sua entrega</strong>.', 'Yes. The model can be applied in different niches, because it does not depend on the sector — it depends on the <strong style="color:#fff;">structure of your delivery</strong>.')}
                    </div>
                </details>

                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>${i18nText('Essa aula é gratuita mesmo?', 'Is this class really free?')}</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        ${i18nText('Sim. Você entra gratuitamente no grupo e recebe o acesso à aula ao vivo.', 'Yes. You join the group for free and receive access to the live class.')}
                    </div>
                </details>

                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>${i18nText('Vou sair com algo aplicável ou é só conteúdo?', 'Will I leave with something I can apply, or is it just content?')}</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        ${i18nText('A proposta é prática. Você vai entender o modelo e como começar a aplicar na sua própria consultoria.', 'The proposal is practical. You will understand the model and how to start applying it in your own consultancy.')}
                    </div>
                </details>

                <details style="background:#161B22;border:1px solid rgba(255,186,26,0.12);border-radius:14px;padding:20px 24px;cursor:pointer;" data-reveal>
                    <summary style="color:#fff;font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;">
                        <span>${i18nText('Preciso já ter clientes para fazer sentido?', 'Do I already need clients for this to make sense?')}</span>
                        <i class="fa-solid fa-plus" style="color:#ffba1a;font-size:14px;"></i>
                    </summary>
                    <div style="color:#C9D1D9;font-size:0.98rem;line-height:1.6;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
                        ${i18nText('Não. Se você já atende clientes, vai ver como transformar isso em recorrência. Se ainda está estruturando, vai entender o <strong style="color:#fff;">modelo certo desde o início</strong>.', 'No. If you already serve clients, you will see how to turn that into recurring revenue. If you are still structuring, you will understand the <strong style="color:#fff;">right model from the start</strong>.')}
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

        function formatDate(d) {
            var en = document.documentElement.lang === 'en';
            if (en) {
                var monthsEn = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                return monthsEn[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
            }
            var months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            return d.getDate() + ' de ' + months[d.getMonth()] + ', ' + d.getFullYear();
        }

        var target = getNextThursday();

        var dateEl = document.getElementById('nextLiveDate');
        if (dateEl) dateEl.textContent = formatDate(target);

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
                if (dateEl) dateEl.textContent = formatDate(target);
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
