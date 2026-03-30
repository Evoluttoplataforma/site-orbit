export const pageHTML = `
    <!-- ═══ HERO ═══ -->
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
                <span style="color:#ffba1a;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;">MASTERCLASS AO VIVO</span>
            </div>

            <!-- Schedule -->
            <div style="display:inline-block;background:linear-gradient(135deg,rgba(255,186,26,0.15),rgba(255,186,26,0.05));border:2px solid rgba(255,186,26,0.4);border-radius:16px;padding:16px 36px;margin-bottom:32px;" data-reveal>
                <span style="color:#ffba1a;font-size:clamp(1.1rem,2.5vw,1.5rem);font-weight:800;letter-spacing:0.5px;">
                    <i class="fa-solid fa-calendar-check" style="margin-right:10px;"></i>TODA SEGUNDA E QUARTA &Agrave;S 16H
                </span>
            </div>

            <!-- Title -->
            <h1 style="font-size:clamp(1.8rem,4.5vw,3.2rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:20px;" data-reveal>
                Como transformar sua <span style="color:#ffba1a;">consultoria</span> com gest&atilde;o operada por IA
            </h1>

            <!-- Subtitle -->
            <p style="font-size:clamp(1rem,2.5vw,1.3rem);color:#8B949E;max-width:700px;margin:0 auto 16px;line-height:1.6;" data-reveal>
                Voc&ecirc; j&aacute; entrega resultados para seus clientes. Agora imagine fazer isso com <strong style="color:#ffba1a;">dezenas de agentes de IA</strong> trabalhando 24/7 ao seu lado &mdash; mapeando processos, monitorando indicadores e gerando relat&oacute;rios automaticamente.
            </p>

            <!-- Apresentadora -->
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:28px 0 8px;" data-reveal>
                <img src="/images/diretor-dani.jpg" alt="Daniela Albuquerque" width="64" height="64" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,186,26,0.4);">
                <div style="text-align:left;">
                    <span style="color:#fff;font-weight:700;font-size:17px;display:block;line-height:1.3;">Daniela Albuquerque</span>
                    <span style="color:#8B949E;font-size:14px;">Especialista em Processos e Qualidade</span>
                </div>
            </div>

            <!-- Info -->
            <div style="display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;margin:32px 0;" data-reveal>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-calendar-day" style="color:#ffba1a;font-size:18px;"></i>
                    <span id="nextRDLiveDate" style="font-size:18px;font-weight:600;">Pr&oacute;xima sess&atilde;o</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-clock" style="color:#ffba1a;font-size:18px;"></i>
                    <span style="font-size:18px;font-weight:600;">16h (hor&aacute;rio de Bras&iacute;lia)</span>
                </div>
            </div>

            <!-- Countdown -->
            <div id="rdCountdown" style="display:flex;justify-content:center;gap:16px;margin:40px 0;" data-reveal>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="rdDays" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Dias</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="rdHours" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Horas</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="rdMinutes" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Minutos</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="rdSeconds" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Segundos</span>
                </div>
            </div>

            <!-- Live now -->
            <div id="rdLiveNow" style="display:none;margin:40px 0;">
                <p style="font-size:1.5rem;font-weight:700;color:#3FB950;">
                    <i class="fa-solid fa-circle" style="font-size:12px;animation:livePulse 1.5s ease-in-out infinite;margin-right:8px;"></i>
                    Estamos ao vivo agora!
                </p>
            </div>

            <!-- CTA -->
            <div style="margin-top:8px;" data-reveal>
                <a onclick="document.getElementById('inscreva-se').scrollIntoView({behavior:'smooth'})" class="btn btn-primary btn-lg hero-cta-glow" style="font-size:18px;padding:18px 48px;cursor:pointer;">
                    QUERO PARTICIPAR
                </a>
                <p style="color:#8B949E;font-size:14px;margin-top:16px;">
                    <i class="fa-solid fa-lock" style="margin-right:6px;"></i>Gratuito. Inscreva-se para receber o link da sala.
                </p>
            </div>
        </div>
    </section>

    <!-- ═══ PARA QUEM ═══ -->
    <section style="padding:100px 0;background:#0D1117;">
        <div class="container" style="max-width:1000px;">
            <div style="text-align:center;margin-bottom:56px;" data-reveal>
                <span style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,186,26,0.1);border:1px solid rgba(255,186,26,0.25);border-radius:100px;padding:6px 18px;font-size:13px;color:#ffba1a;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">
                    <i class="fas fa-bullseye"></i> Para quem &eacute; essa masterclass
                </span>
                <h2 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:#fff;margin-bottom:16px;">
                    Se voc&ecirc; se identifica, essa live &eacute; <span style="color:#ffba1a;">para voc&ecirc;</span>
                </h2>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
                <div style="background:var(--black-card);border:1px solid var(--gray-200);border-radius:16px;padding:32px;" data-reveal>
                    <div style="width:48px;height:48px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;"><i class="fas fa-user-tie" style="color:#ffba1a;font-size:20px;"></i></div>
                    <h3 style="color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:10px;">Consultores de Gest&atilde;o</h3>
                    <p style="color:#8B949E;font-size:15px;line-height:1.6;">Voc&ecirc; entrega projetos de processos, qualidade ou estrat&eacute;gia e quer escalar sem aumentar equipe.</p>
                </div>
                <div style="background:var(--black-card);border:1px solid var(--gray-200);border-radius:16px;padding:32px;" data-reveal>
                    <div style="width:48px;height:48px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;"><i class="fas fa-building" style="color:#ffba1a;font-size:20px;"></i></div>
                    <h3 style="color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:10px;">Donos de Consultoria</h3>
                    <p style="color:#8B949E;font-size:15px;line-height:1.6;">Quer oferecer um servi&ccedil;o recorrente para seus clientes com IA operando a gest&atilde;o continuamente.</p>
                </div>
                <div style="background:var(--black-card);border:1px solid var(--gray-200);border-radius:16px;padding:32px;" data-reveal>
                    <div style="width:48px;height:48px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;"><i class="fas fa-chart-line" style="color:#ffba1a;font-size:20px;"></i></div>
                    <h3 style="color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:10px;">Profissionais RD Station</h3>
                    <p style="color:#8B949E;font-size:15px;line-height:1.6;">Voc&ecirc; j&aacute; usa RD para marketing e quer conectar a gera&ccedil;&atilde;o de leads com a gest&atilde;o real da empresa do cliente.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ O QUE VOCE VAI VER ═══ -->
    <section style="padding:100px 0;background:var(--black-soft);">
        <div class="container" style="max-width:800px;text-align:center;">
            <h2 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:#fff;margin-bottom:48px;" data-reveal>
                O que vamos mostrar na pr&aacute;tica
            </h2>
            <div style="display:flex;flex-direction:column;gap:20px;text-align:left;max-width:650px;margin:0 auto;">
                <div style="display:flex;align-items:flex-start;gap:16px;background:rgba(255,186,26,0.04);border:1px solid rgba(255,186,26,0.1);border-radius:14px;padding:20px 24px;" data-reveal>
                    <div style="width:40px;height:40px;background:rgba(255,186,26,0.12);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-sitemap" style="color:#ffba1a;"></i></div>
                    <div>
                        <strong style="color:#fff;font-size:16px;">Mapeamento de processos com IA</strong>
                        <p style="color:#8B949E;font-size:14px;margin:6px 0 0;line-height:1.5;">Como o agente de Processos mapeia, padroniza e gera playbooks automaticamente para seus clientes.</p>
                    </div>
                </div>
                <div style="display:flex;align-items:flex-start;gap:16px;background:rgba(255,186,26,0.04);border:1px solid rgba(255,186,26,0.1);border-radius:14px;padding:20px 24px;" data-reveal>
                    <div style="width:40px;height:40px;background:rgba(255,186,26,0.12);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-chart-column" style="color:#ffba1a;"></i></div>
                    <div>
                        <strong style="color:#fff;font-size:16px;">Indicadores e dashboards em tempo real</strong>
                        <p style="color:#8B949E;font-size:14px;margin:6px 0 0;line-height:1.5;">KPIs monitorados 24/7, com causa raiz identificada pela IA antes do cliente perceber o problema.</p>
                    </div>
                </div>
                <div style="display:flex;align-items:flex-start;gap:16px;background:rgba(255,186,26,0.04);border:1px solid rgba(255,186,26,0.1);border-radius:14px;padding:20px 24px;" data-reveal>
                    <div style="width:40px;height:40px;background:rgba(255,186,26,0.12);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-handshake" style="color:#ffba1a;"></i></div>
                    <div>
                        <strong style="color:#fff;font-size:16px;">Modelo de receita recorrente</strong>
                        <p style="color:#8B949E;font-size:14px;margin:6px 0 0;line-height:1.5;">Como consultores est&atilde;o gerando renda passiva oferecendo Orbit como servi&ccedil;o cont&iacute;nuo aos clientes.</p>
                    </div>
                </div>
                <div style="display:flex;align-items:flex-start;gap:16px;background:rgba(255,186,26,0.04);border:1px solid rgba(255,186,26,0.1);border-radius:14px;padding:20px 24px;" data-reveal>
                    <div style="width:40px;height:40px;background:rgba(255,186,26,0.12);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-brain" style="color:#ffba1a;"></i></div>
                    <div>
                        <strong style="color:#fff;font-size:16px;">Ol&iacute;via coordenando os agentes ao vivo</strong>
                        <p style="color:#8B949E;font-size:14px;margin:6px 0 0;line-height:1.5;">Veja a coordenadora geral de IA orquestrando dezenas de agentes em tempo real &mdash; sem slides, na plataforma real.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ FORMULARIO ═══ -->
    <section id="inscreva-se" style="padding:100px 0;background:#0D1117;text-align:center;">
        <div class="container" style="max-width:520px;">
            <h2 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:#fff;margin-bottom:16px;" data-reveal>
                Garanta sua vaga
            </h2>
            <p style="color:#8B949E;font-size:1.1rem;margin-bottom:40px;" data-reveal>
                Toda segunda e quarta &agrave;s 16h. Preencha abaixo para receber o link da sala.
            </p>

            <div class="cta-form-card" data-reveal>
                <div style="text-align:center;margin-bottom:24px;">
                    <h3 style="font-size:22px;font-weight:700;color:#fff;margin-bottom:6px;">Inscreva-se gratuitamente</h3>
                    <p style="font-size:14px;color:#8B949E;">Preencha e receba o link no seu e-mail.</p>
                </div>

                <form id="rdLiveForm" class="lead-form" novalidate>
                    <div class="form-group">
                        <label for="rd-nome" style="color:#C9D1D9;">Nome completo *</label>
                        <input type="text" id="rd-nome" name="nome" placeholder="Seu nome completo" required style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                    </div>
                    <div class="form-group">
                        <label for="rd-email" style="color:#C9D1D9;">E-mail *</label>
                        <input type="email" id="rd-email" name="email" placeholder="seu@email.com" required style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                    </div>
                    <div class="form-group">
                        <label for="rd-telefone" style="color:#C9D1D9;">WhatsApp *</label>
                        <input type="tel" id="rd-telefone" name="telefone" placeholder="(00) 00000-0000" required style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                    </div>
                    <div class="form-group">
                        <label for="rd-empresa" style="color:#C9D1D9;">Nome da consultoria (opcional)</label>
                        <input type="text" id="rd-empresa" name="empresa" placeholder="Sua empresa ou consultoria" style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg btn-submit hero-cta-glow" style="cursor:pointer;border:none;">
                        QUERO PARTICIPAR
                    </button>
                    <p style="color:#8B949E;font-size:13px;text-align:center;margin-top:8px;">
                        <i class="fa-solid fa-lock" style="margin-right:6px;"></i>Seus dados est&atilde;o seguros. N&atilde;o enviamos spam.
                    </p>
                </form>

                <div id="rdFormSuccess" style="display:none;text-align:center;padding:20px 0;">
                    <div style="width:64px;height:64px;background:rgba(63,185,80,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                        <i class="fa-solid fa-check" style="color:#3FB950;font-size:28px;"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.5rem;font-weight:700;margin-bottom:12px;">Inscri&ccedil;&atilde;o confirmada!</h3>
                    <p style="color:var(--gray-500);font-size:16px;">Voc&ecirc; receber&aacute; o link da sala no seu e-mail.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Countdown: next Monday or Wednesday at 16h BRT -->
    <script>
    (function() {
        function getNextSession() {
            var now = new Date();
            var day = now.getDay();
            // Monday=1, Wednesday=3
            var targets = [1, 3];
            var daysUntil = 7;
            for (var i = 0; i < targets.length; i++) {
                var d = (targets[i] - day + 7) % 7;
                if (d === 0) {
                    var todayAt16 = new Date(now);
                    todayAt16.setHours(17, 0, 0, 0);
                    if (now < todayAt16) { daysUntil = 0; break; }
                    continue;
                }
                if (d < daysUntil) daysUntil = d;
            }
            if (daysUntil === 7) {
                daysUntil = (1 - day + 7) % 7;
                if (daysUntil === 0) daysUntil = 7;
            }
            var next = new Date(now);
            next.setDate(now.getDate() + daysUntil);
            next.setHours(16, 0, 0, 0);
            return next;
        }

        function formatDateBR(d) {
            var dias = ['Domingo','Segunda','Terca','Quarta','Quinta','Sexta','Sabado'];
            var months = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            return dias[d.getDay()] + ', ' + d.getDate() + ' de ' + months[d.getMonth()];
        }

        var target = getNextSession();
        var dateEl = document.getElementById('nextRDLiveDate');
        if (dateEl) dateEl.textContent = formatDateBR(target);

        function tick() {
            var now = Date.now();
            var diff = target.getTime() - now;

            if (diff <= 0 && diff > -3600000) {
                var c = document.getElementById('rdCountdown');
                var l = document.getElementById('rdLiveNow');
                if (c) c.style.display = 'none';
                if (l) l.style.display = 'block';
                return;
            }

            if (diff <= 0) {
                target = getNextSession();
                if (dateEl) dateEl.textContent = formatDateBR(target);
                diff = target.getTime() - now;
            }

            var days = Math.floor(diff / 86400000);
            var hours = Math.floor((diff % 86400000) / 3600000);
            var minutes = Math.floor((diff % 3600000) / 60000);
            var seconds = Math.floor((diff % 60000) / 1000);
            var p = function(n) { return n.toString().padStart(2, '0'); };

            var d = document.getElementById('rdDays');
            var h = document.getElementById('rdHours');
            var m = document.getElementById('rdMinutes');
            var s = document.getElementById('rdSeconds');
            if (d) d.textContent = p(days);
            if (h) h.textContent = p(hours);
            if (m) m.textContent = p(minutes);
            if (s) s.textContent = p(seconds);
        }

        tick();
        setInterval(tick, 1000);
    })();
    </script>

    <!-- Form handler -->
    <script>
    (function() {
        if (window.__rdFormInit) return;
        window.__rdFormInit = true;

        var SUPABASE_URL = 'https://tnpzoklepkvktbqouctf.supabase.co';
        var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucHpva2xlcGt2a3RicW91Y3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MjAxNjcsImV4cCI6MjA4NzE5NjE2N30.hXrOhbIm9DnxaItT1e9g6B6d9mhAmeoLKJ2DuHlABFU';

        var form = document.getElementById('rdLiveForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>Enviando...';

            var formData = new FormData(form);
            var data = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                source: 'live-rd-consultores'
            };

            fetch(SUPABASE_URL + '/rest/v1/live_orbit_leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + SUPABASE_KEY,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(data)
            }).then(function(res) {
                if (!res.ok) throw new Error('Erro ao salvar');
                // Send confirmation email
                fetch(SUPABASE_URL + '/functions/v1/send-rd-confirmation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome: data.nome, email: data.email })
                }).catch(function() {});
                // Show success
                form.style.display = 'none';
                document.getElementById('rdFormSuccess').style.display = 'block';
            }).catch(function(err) {
                console.error('Erro:', err);
                btn.disabled = false;
                btn.innerHTML = 'QUERO PARTICIPAR';
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
        #rdCountdown { gap: 8px !important; }
        #rdCountdown > div { min-width: 65px !important; padding: 14px 8px !important; }
        #rdCountdown > div > span:first-child { font-size: 1.6rem !important; }
        .cta-form-card { padding: 24px 20px !important; }
        .btn-lg { font-size: 15px !important; padding: 14px 24px !important; }
    }
    @media (max-width: 420px) {
        #rdCountdown > div { min-width: 58px !important; padding: 10px 6px !important; }
        #rdCountdown > div > span:first-child { font-size: 1.3rem !important; }
        #rdCountdown > div > span:last-child { font-size: 10px !important; }
    }
    </style>
`;
