export const pageHTML = `
    <!-- ═══ LIVE HERO ═══ -->
    <section class="lp-hero" id="hero" style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden;">
        <div class="lp-hero__bg-image" style="opacity:0.25;">
            <img src="/images/fundo-orbit.jpg" alt="" width="1920" height="1080" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:center;">
        </div>
        <div class="lp-hero__glow lp-hero__glow--1"></div>
        <div class="lp-hero__glow lp-hero__glow--2"></div>
        <div class="container" style="max-width:900px;">

            <!-- Recurrence badge -->
            <div style="display:inline-flex;align-items:center;gap:10px;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);border-radius:100px;padding:8px 20px;margin-bottom:24px;" data-reveal>
                <span style="width:10px;height:10px;background:#ff4444;border-radius:50%;display:inline-block;animation:livePulse 1.5s ease-in-out infinite;"></span>
                <span style="color:#ffba1a;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;">AO VIVO NO YOUTUBE</span>
            </div>

            <!-- Schedule highlight -->
            <div style="display:inline-block;background:linear-gradient(135deg,rgba(255,186,26,0.15),rgba(255,186,26,0.05));border:2px solid rgba(255,186,26,0.4);border-radius:16px;padding:16px 36px;margin-bottom:32px;" data-reveal>
                <span style="color:#ffba1a;font-size:clamp(1.1rem,2.5vw,1.5rem);font-weight:800;letter-spacing:0.5px;">
                    <i class="fa-solid fa-calendar-check" style="margin-right:10px;"></i>TODA TERCA-FEIRA AS 13H
                </span>
            </div>

            <!-- Title -->
            <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:20px;" data-reveal>
                A Nova Era da Gestao
            </h1>

            <!-- Subtitle -->
            <p style="font-size:clamp(1rem,2.5vw,1.35rem);color:#8B949E;max-width:700px;margin:0 auto 16px;line-height:1.6;" data-reveal>
                Como resolver problemas de <strong style="color:#ffba1a;">gestao e processos com IA</strong>. Uma conversa pratica sobre o que ja e possivel fazer hoje — e como aplicar na sua empresa.
            </p>

            <!-- Apresentadores -->
            <div style="display:flex;align-items:center;justify-content:center;gap:32px;flex-wrap:wrap;margin:24px 0 8px;" data-reveal>
                <div style="display:flex;align-items:center;gap:12px;">
                    <img src="/images/diretor-igor.jpg" alt="Igor Furniel" width="56" height="56" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,186,26,0.4);">
                    <div style="text-align:left;">
                        <span style="color:#fff;font-weight:700;font-size:16px;display:block;line-height:1.3;">Igor Furniel</span>
                        <span style="color:#8B949E;font-size:13px;">CEO Templum & Evolutto</span>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                    <img src="/images/diretor-dani.jpg" alt="Daniela Albuquerque" width="56" height="56" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,186,26,0.4);">
                    <div style="text-align:left;">
                        <span style="color:#fff;font-weight:700;font-size:16px;display:block;line-height:1.3;">Daniela Albuquerque</span>
                        <span style="color:#8B949E;font-size:13px;">Especialista em Processos e Qualidade</span>
                    </div>
                </div>
            </div>

            <!-- Next live info -->
            <div style="display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;margin:32px 0;" data-reveal>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-calendar-day" style="color:#ffba1a;font-size:18px;"></i>
                    <span id="nextLiveDate" style="font-size:18px;font-weight:600;">Proxima terca-feira</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-clock" style="color:#ffba1a;font-size:18px;"></i>
                    <span style="font-size:18px;font-weight:600;">13h (horario de Brasilia)</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-brands fa-youtube" style="color:#ff0000;font-size:20px;"></i>
                    <span style="font-size:18px;font-weight:600;">YouTube</span>
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
                    <i class="fa-brands fa-youtube" style="margin-right:8px;"></i>QUERO PARTICIPAR DA LIVE
                </a>
                <p style="color:#8B949E;font-size:14px;margin-top:16px;">
                    <i class="fa-solid fa-lock" style="margin-right:6px;"></i>Gratuito no YouTube. Inscreva-se para receber o link.
                </p>
            </div>
        </div>
    </section>

    <!-- ═══ O QUE VOCE VAI APRENDER ═══ -->
    <section style="padding:100px 0;background:#0D1117;">
        <div class="container" style="max-width:1000px;">
            <h2 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:#fff;text-align:center;margin-bottom:16px;" data-reveal>
                O que voce vai aprender
            </h2>
            <p style="color:#8B949E;text-align:center;max-width:600px;margin:0 auto 56px;font-size:1.1rem;" data-reveal>
                Em menos de 1 hora, voce vai entender como a IA pode resolver gargalos reais de gestao e processos na sua empresa.
            </p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
                <div style="background:var(--black-card);border:1px solid var(--gray-200);border-radius:16px;padding:32px;" data-reveal>
                    <div class="roda__card-icon" style="margin:0 0 20px;"><i class="fas fa-gears"></i></div>
                    <h3 style="color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:10px;">Problemas Reais de Gestao</h3>
                    <p style="color:#8B949E;font-size:15px;line-height:1.6;">Os gargalos mais comuns em processos, pessoas e decisoes — e como a IA resolve cada um deles.</p>
                </div>
                <div style="background:var(--black-card);border:1px solid var(--gray-200);border-radius:16px;padding:32px;" data-reveal>
                    <div class="roda__card-icon" style="margin:0 0 20px;"><i class="fas fa-robot"></i></div>
                    <h3 style="color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:10px;">IA Aplicada a Processos</h3>
                    <p style="color:#8B949E;font-size:15px;line-height:1.6;">Como agentes de IA podem operar a gestao da sua empresa de forma continua — nao apenas gerar textos.</p>
                </div>
                <div style="background:var(--black-card);border:1px solid var(--gray-200);border-radius:16px;padding:32px;" data-reveal>
                    <div class="roda__card-icon" style="margin:0 0 20px;"><i class="fas fa-play"></i></div>
                    <h3 style="color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:10px;">Demonstracao ao Vivo</h3>
                    <p style="color:#8B949E;font-size:15px;line-height:1.6;">Veja na pratica como funciona e tire suas duvidas em tempo real com Igor e Daniela.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ QUEM DEVE PARTICIPAR ═══ -->
    <section style="padding:100px 0;background:var(--black-soft);">
        <div class="container" style="max-width:800px;text-align:center;">
            <h2 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:#fff;margin-bottom:16px;" data-reveal>
                Essa live e para voce que...
            </h2>
            <div style="display:flex;flex-direction:column;gap:16px;margin-top:40px;text-align:left;max-width:600px;margin-left:auto;margin-right:auto;">
                <div style="display:flex;align-items:flex-start;gap:14px;" data-reveal>
                    <i class="fa-solid fa-check-circle" style="color:#ffba1a;font-size:20px;margin-top:3px;flex-shrink:0;"></i>
                    <span style="color:#C9D1D9;font-size:17px;line-height:1.6;">E empresario ou gestor de uma empresa de <strong style="color:#fff;">R$ 5M a R$ 100M/ano</strong></span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:14px;" data-reveal>
                    <i class="fa-solid fa-check-circle" style="color:#ffba1a;font-size:20px;margin-top:3px;flex-shrink:0;"></i>
                    <span style="color:#C9D1D9;font-size:17px;line-height:1.6;">Quer entender como IA pode <strong style="color:#fff;">operar a gestao</strong> (e nao so gerar texto)</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:14px;" data-reveal>
                    <i class="fa-solid fa-check-circle" style="color:#ffba1a;font-size:20px;margin-top:3px;flex-shrink:0;"></i>
                    <span style="color:#C9D1D9;font-size:17px;line-height:1.6;">Busca uma <strong style="color:#fff;">solucao completa</strong>, nao so mais uma ferramenta</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:14px;" data-reveal>
                    <i class="fa-solid fa-check-circle" style="color:#ffba1a;font-size:20px;margin-top:3px;flex-shrink:0;"></i>
                    <span style="color:#C9D1D9;font-size:17px;line-height:1.6;">Quer ver como funciona <strong style="color:#fff;">na pratica</strong> antes de investir</span>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ FORMULARIO DE INSCRICAO ═══ -->
    <section id="inscreva-se" style="padding:100px 0;background:#0D1117;text-align:center;">
        <div class="container" style="max-width:520px;">
            <h2 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:#fff;margin-bottom:16px;" data-reveal>
                Garanta sua vaga na live
            </h2>
            <p style="color:#8B949E;font-size:1.1rem;margin-bottom:40px;" data-reveal>
                Toda terca-feira as 13h no YouTube. Preencha abaixo para receber o link.
            </p>

            <div class="cta-form-card" data-reveal>
                <div style="text-align:center;margin-bottom:24px;">
                    <h3 style="font-size:22px;font-weight:700;color:#fff;margin-bottom:6px;"><i class="fa-brands fa-youtube" style="color:#ff0000;margin-right:8px;"></i>Inscreva-se gratuitamente</h3>
                    <p style="font-size:14px;color:#8B949E;">Preencha abaixo e receba o link da live no seu e-mail.</p>
                </div>

                <form id="liveForm" class="lead-form" novalidate>
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
                    <button type="submit" class="btn btn-primary btn-lg btn-submit hero-cta-glow" style="cursor:pointer;border:none;">
                        <i class="fa-brands fa-youtube" style="margin-right:8px;"></i>QUERO PARTICIPAR DA LIVE
                    </button>
                    <p style="color:#8B949E;font-size:13px;text-align:center;margin-top:8px;">
                        <i class="fa-solid fa-lock" style="margin-right:6px;"></i>Seus dados estao seguros. Nao enviamos spam.
                    </p>
                </form>

                <div id="liveFormSuccess" style="display:none;text-align:center;padding:20px 0;">
                    <div style="width:64px;height:64px;background:rgba(63,185,80,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                        <i class="fa-solid fa-check" style="color:#3FB950;font-size:28px;"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.5rem;font-weight:700;margin-bottom:12px;">Inscricao confirmada!</h3>
                    <p style="color:var(--gray-500);font-size:16px;">Voce recebera o link da live no seu e-mail e WhatsApp antes do inicio.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Dynamic countdown to next Tuesday 13h BRT -->
    <script>
    (function() {
        function getNextTuesday() {
            var now = new Date();
            var day = now.getDay();
            var daysUntilTuesday = (2 - day + 7) % 7;
            if (daysUntilTuesday === 0) {
                var todayAt13 = new Date(now);
                todayAt13.setHours(14, 0, 0, 0);
                if (now >= todayAt13) daysUntilTuesday = 7;
            }
            var next = new Date(now);
            next.setDate(now.getDate() + daysUntilTuesday);
            next.setHours(13, 0, 0, 0);
            return next;
        }

        function formatDateBR(d) {
            var months = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            return d.getDate() + ' de ' + months[d.getMonth()] + ', ' + d.getFullYear();
        }

        var target = getNextTuesday();

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
                target = getNextTuesday();
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
        var SUPABASE_URL = 'https://tnpzoklepkvktbqouctf.supabase.co';
        var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucHpva2xlcGt2a3RicW91Y3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MjAxNjcsImV4cCI6MjA4NzE5NjE2N30.hXrOhbIm9DnxaItT1e9g6B6d9mhAmeoLKJ2DuHlABFU';

        var form = document.getElementById('liveForm');
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
                source: 'live-semanal'
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
                if (res.ok) {
                    window.location.href = '/live/obrigado';
                } else {
                    throw new Error('Erro ao salvar');
                }
            }).catch(function(err) {
                console.error('Erro:', err);
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-brands fa-youtube" style="margin-right:8px;"></i>QUERO PARTICIPAR DA LIVE';
                alert('Erro ao enviar. Tente novamente.');
            });
        });
    })();
    </script>

    <style>
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
