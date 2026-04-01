export const pageHTML = `
    <section style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:#0D1117;position:relative;overflow:hidden;padding:60px 20px;">
        <div style="position:absolute;width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(63,185,80,0.08) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
        <div style="max-width:560px;margin:0 auto;position:relative;z-index:1;">

            <!-- Check animation -->
            <div style="width:80px;height:80px;background:rgba(63,185,80,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;animation:tyBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;">
                <i class="fa-solid fa-check" style="color:#3FB950;font-size:36px;"></i>
            </div>

            <!-- Title -->
            <h1 style="color:#fff;font-size:clamp(1.8rem,4vw,2.5rem);font-weight:800;margin-bottom:12px;">
                Sua vaga est&aacute; garantida!
            </h1>

            <p style="color:#8B949E;font-size:1.1rem;line-height:1.6;margin-bottom:32px;">
                Voc&ecirc; vai receber o link da reuni&atilde;o no seu e-mail. Fique atento &agrave; caixa de entrada.
            </p>

            <!-- Info card -->
            <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:16px;padding:28px 24px;margin-bottom:32px;text-align:left;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                    <div style="width:44px;height:44px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="fas fa-envelope" style="color:#ffba1a;font-size:18px;"></i>
                    </div>
                    <div>
                        <strong style="color:#fff;font-size:15px;">Link enviado por e-mail</strong>
                        <p style="color:#8B949E;font-size:13px;margin:2px 0 0;">Verifique tamb&eacute;m a pasta de spam.</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                    <div style="width:44px;height:44px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="fas fa-calendar-check" style="color:#ffba1a;font-size:18px;"></i>
                    </div>
                    <div>
                        <strong style="color:#fff;font-size:15px;">Evento no seu calend&aacute;rio</strong>
                        <p style="color:#8B949E;font-size:13px;margin:2px 0 0;">Lembretes autom&aacute;ticos 30min e 5min antes.</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,186,26,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="fas fa-user-group" style="color:#ffba1a;font-size:18px;"></i>
                    </div>
                    <div>
                        <strong style="color:#fff;font-size:15px;">Reuni&atilde;o em Grupo com Daniela Albuquerque</strong>
                        <p style="color:#8B949E;font-size:13px;margin:2px 0 0;">Toda segunda e quarta &agrave;s 16h.</p>
                    </div>
                </div>
            </div>

            <!-- Schedule -->
            <p style="color:#ffba1a;font-size:16px;font-weight:700;margin-bottom:32px;">
                <i class="fa-solid fa-calendar-check" style="margin-right:8px;"></i>Toda segunda e quarta &agrave;s 16h
            </p>

            <!-- Back link -->
            <a href="/live/rd" style="display:inline-block;color:#8B949E;font-size:14px;text-decoration:underline;text-underline-offset:4px;">
                <i class="fa-solid fa-arrow-left" style="margin-right:6px;"></i>Voltar para a p&aacute;gina do evento
            </a>
        </div>
    </section>

    <style>
    @keyframes tyBounce { 0% { transform: scale(0); } 100% { transform: scale(1); } }
    </style>
`;
