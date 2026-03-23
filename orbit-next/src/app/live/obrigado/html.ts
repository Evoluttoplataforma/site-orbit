export const pageHTML = `
    <!-- ═══ CONFETTI CANVAS ═══ -->
    <canvas id="confettiCanvas" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;"></canvas>

    <!-- ═══ HERO OBRIGADO ═══ -->
    <section style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden;background:#0D1117;">
        <div class="lp-hero__glow lp-hero__glow--1"></div>
        <div class="lp-hero__glow lp-hero__glow--2"></div>

        <!-- Floating particles -->
        <div id="particles" style="position:absolute;inset:0;overflow:hidden;pointer-events:none;"></div>

        <div class="container" style="max-width:700px;position:relative;z-index:2;">

            <!-- Animated checkmark -->
            <div style="margin-bottom:40px;" class="fade-in">
                <div id="checkCircle" style="width:120px;height:120px;border-radius:50%;background:rgba(63,185,80,0.1);border:3px solid #3FB950;display:flex;align-items:center;justify-content:center;margin:0 auto;animation:checkPop 0.6s cubic-bezier(0.175,0.885,0.32,1.275) forwards,checkGlow 2s ease-in-out infinite 0.6s;">
                    <i class="fa-solid fa-check" style="font-size:48px;color:#3FB950;opacity:0;animation:checkFade 0.4s ease forwards 0.3s;"></i>
                </div>
            </div>

            <!-- Title -->
            <h1 class="fade-in fade-in-delay-1" style="font-size:clamp(2rem,5vw,3.2rem);font-weight:800;color:#fff;line-height:1.2;margin-bottom:20px;">
                Inscrição <span style="color:#ffba1a;">confirmada!</span>
            </h1>

            <!-- Subtitle -->
            <p class="fade-in fade-in-delay-2" style="font-size:clamp(1rem,2.5vw,1.25rem);color:#C9D1D9;max-width:550px;margin:0 auto 40px;line-height:1.7;">
                Tudo certo! Vamos enviar o <strong style="color:#fff;">link da live no YouTube</strong> direto no seu e-mail antes do início.
            </p>

            <!-- Info card -->
            <div class="fade-in fade-in-delay-3" style="background:var(--black-card,#1C2333);border:1px solid rgba(255,186,26,0.2);border-radius:20px;padding:36px 32px;margin-bottom:40px;text-align:left;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
                    <div style="width:40px;height:40px;background:rgba(255,186,26,0.12);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="fa-solid fa-calendar-check" style="color:#ffba1a;font-size:18px;"></i>
                    </div>
                    <div>
                        <span style="color:#fff;font-weight:700;font-size:16px;display:block;">Terça, 24 de Março de 2026</span>
                        <span style="color:#8B949E;font-size:14px;">13h (horário de São Paulo) — YouTube</span>
                    </div>
                </div>

                <div style="display:flex;flex-direction:column;gap:16px;">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <i class="fa-solid fa-envelope" style="color:#ffba1a;font-size:16px;width:20px;text-align:center;"></i>
                        <span style="color:#C9D1D9;font-size:15px;">Link será enviado por <strong style="color:#fff;">e-mail</strong></span>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;">
                        <i class="fa-brands fa-whatsapp" style="color:#3FB950;font-size:18px;width:20px;text-align:center;"></i>
                        <span style="color:#C9D1D9;font-size:15px;">Lembrete também pelo <strong style="color:#fff;">WhatsApp</strong></span>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;">
                        <i class="fa-solid fa-users" style="color:#ffba1a;font-size:16px;width:20px;text-align:center;"></i>
                        <span style="color:#C9D1D9;font-size:15px;">Com <strong style="color:#fff;">Igor Furniel</strong> e <strong style="color:#fff;">Daniela Albuquerque</strong></span>
                    </div>
                </div>
            </div>

            <!-- Countdown mini -->
            <div class="fade-in fade-in-delay-4" style="margin-bottom:40px;">
                <p style="color:#8B949E;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px;">A live começa em</p>
                <div id="miniCountdown" style="display:flex;justify-content:center;gap:12px;">
                    <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:12px;padding:14px 18px;min-width:72px;text-align:center;">
                        <span id="cDays" style="font-size:1.8rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                        <span style="font-size:11px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Dias</span>
                    </div>
                    <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:12px;padding:14px 18px;min-width:72px;text-align:center;">
                        <span id="cHours" style="font-size:1.8rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                        <span style="font-size:11px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Horas</span>
                    </div>
                    <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:12px;padding:14px 18px;min-width:72px;text-align:center;">
                        <span id="cMin" style="font-size:1.8rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                        <span style="font-size:11px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Min</span>
                    </div>
                    <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:12px;padding:14px 18px;min-width:72px;text-align:center;">
                        <span id="cSec" style="font-size:1.8rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                        <span style="font-size:11px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Seg</span>
                    </div>
                </div>
            </div>

            <!-- Share / CTA -->
            <div class="fade-in fade-in-delay-5" style="display:flex;flex-direction:column;align-items:center;gap:16px;">
                <p style="color:#8B949E;font-size:15px;">Compartilhe com quem precisa transformar a gestão:</p>
                <div style="display:flex;gap:12px;">
                    <a onclick="window.open('https://api.whatsapp.com/send?text='+encodeURIComponent('Live: A Nova Era da Gestão — Como resolver problemas de gestão e processos com IA. 24/03 às 13h no YouTube. Inscreva-se: '+window.location.origin+'/live'),'_blank')" style="width:48px;height:48px;background:rgba(63,185,80,0.12);border:1px solid rgba(63,185,80,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 0.2s;" onmouseenter="this.style.transform='scale(1.1)'" onmouseleave="this.style.transform='scale(1)'">
                        <i class="fa-brands fa-whatsapp" style="color:#3FB950;font-size:22px;"></i>
                    </a>
                    <a onclick="window.open('https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(window.location.origin+'/live'),'_blank')" style="width:48px;height:48px;background:rgba(10,102,194,0.12);border:1px solid rgba(10,102,194,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 0.2s;" onmouseenter="this.style.transform='scale(1.1)'" onmouseleave="this.style.transform='scale(1)'">
                        <i class="fa-brands fa-linkedin-in" style="color:#0A66C2;font-size:22px;"></i>
                    </a>
                    <a onclick="navigator.clipboard.writeText(window.location.origin+'/live');this.querySelector('i').className='fa-solid fa-check';var el=this;setTimeout(function(){el.querySelector('i').className='fa-solid fa-link'},2000)" style="width:48px;height:48px;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 0.2s;" onmouseenter="this.style.transform='scale(1.1)'" onmouseleave="this.style.transform='scale(1)'">
                        <i class="fa-solid fa-link" style="color:#ffba1a;font-size:20px;"></i>
                    </a>
                </div>
            </div>

            <!-- Back link -->
            <a href="/live" class="fade-in fade-in-delay-5" style="display:inline-block;margin-top:48px;color:#8B949E;font-size:14px;text-decoration:underline;text-underline-offset:4px;">
                <i class="fa-solid fa-arrow-left" style="margin-right:6px;"></i>Voltar para a página da live
            </a>
        </div>
    </section>

    <!-- ═══ SCRIPTS ═══ -->

    <!-- Countdown -->
    <script>
    (function() {
        var target = new Date('2026-03-24T13:00:00-03:00').getTime();
        function tick() {
            var diff = target - Date.now();
            if (diff <= 0) { document.getElementById('miniCountdown').innerHTML = '<p style="color:#3FB950;font-size:1.2rem;font-weight:700;"><i class="fa-solid fa-circle" style="font-size:10px;animation:livePulse 1.5s ease-in-out infinite;margin-right:8px;"></i>A live está acontecendo agora!</p>'; return; }
            var d = Math.floor(diff/864e5), h = Math.floor(diff%864e5/36e5), m = Math.floor(diff%36e5/6e4), s = Math.floor(diff%6e4/1e3);
            var p = function(n){ return n.toString().padStart(2,'0'); };
            document.getElementById('cDays').textContent = p(d);
            document.getElementById('cHours').textContent = p(h);
            document.getElementById('cMin').textContent = p(m);
            document.getElementById('cSec').textContent = p(s);
        }
        tick(); setInterval(tick, 1000);
    })();
    </script>

    <!-- Confetti -->
    <script>
    (function() {
        var canvas = document.getElementById('confettiCanvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var W, H;
        function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
        resize(); window.addEventListener('resize', resize);

        var colors = ['#ffba1a','#3FB950','#ff4444','#0A66C2','#fff','#e6a200'];
        var pieces = [];
        for (var i = 0; i < 150; i++) {
            pieces.push({
                x: Math.random() * W,
                y: Math.random() * H - H,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                vy: Math.random() * 3 + 2,
                vx: Math.random() * 2 - 1,
                rot: Math.random() * 360,
                vr: Math.random() * 6 - 3,
                opacity: 1
            });
        }

        var startTime = Date.now();
        var duration = 4000;

        function draw() {
            var elapsed = Date.now() - startTime;
            if (elapsed > duration + 2000) { canvas.style.display = 'none'; return; }
            ctx.clearRect(0, 0, W, H);
            var fade = elapsed > duration ? 1 - (elapsed - duration) / 2000 : 1;

            for (var i = 0; i < pieces.length; i++) {
                var p = pieces[i];
                p.y += p.vy;
                p.x += p.vx;
                p.rot += p.vr;
                if (elapsed > duration) p.opacity = fade;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            }
            requestAnimationFrame(draw);
        }
        draw();
    })();
    </script>

    <!-- Floating particles -->
    <script>
    (function() {
        var container = document.getElementById('particles');
        if (!container) return;
        for (var i = 0; i < 20; i++) {
            var dot = document.createElement('div');
            var size = Math.random() * 4 + 2;
            dot.style.cssText = 'position:absolute;width:'+size+'px;height:'+size+'px;background:rgba(255,186,26,'+(Math.random()*0.3+0.1)+');border-radius:50%;left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;animation:particleFloat '+(Math.random()*4+3)+'s ease-in-out infinite '+(Math.random()*2)+'s;';
            container.appendChild(dot);
        }
    })();
    </script>

    <!-- Styles -->
    <style>
    /* Force visibility */
    [data-reveal], [data-reveal-stagger] { opacity: 1 !important; transform: none !important; }

    /* Fade in animations */
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .fade-in-delay-1 { animation-delay: 0.15s; }
    .fade-in-delay-2 { animation-delay: 0.3s; }
    .fade-in-delay-3 { animation-delay: 0.45s; }
    .fade-in-delay-4 { animation-delay: 0.6s; }
    .fade-in-delay-5 { animation-delay: 0.75s; }

    @keyframes fadeInUp {
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes checkPop {
        0% { transform: scale(0); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }
    @keyframes checkFade {
        to { opacity: 1; }
    }
    @keyframes checkGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(63,185,80,0.2); }
        50% { box-shadow: 0 0 40px rgba(63,185,80,0.4), 0 0 80px rgba(63,185,80,0.15); }
    }

    @keyframes livePulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
    }

    @keyframes particleFloat {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
    }

    @media (max-width: 640px) {
        #miniCountdown > div {
            min-width: 60px !important;
            padding: 10px 8px !important;
        }
        #miniCountdown span:first-child {
            font-size: 1.4rem !important;
        }
    }
    </style>
`;
