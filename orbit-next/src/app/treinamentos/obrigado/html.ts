export const pageHTML = `
<section style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:#0D1117;padding:60px 20px;position:relative;overflow:hidden;">
    <div style="position:absolute;width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(63,185,80,0.08) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
    <div style="max-width:560px;margin:0 auto;position:relative;z-index:1;">
        <div style="width:80px;height:80px;background:rgba(63,185,80,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;animation:tyBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;">
            <i class="fa-solid fa-check" style="color:#3FB950;font-size:36px;"></i>
        </div>

        <h1 style="color:#fff;font-size:clamp(1.8rem,4vw,2.5rem);font-weight:800;margin-bottom:12px;">
            Inscri&ccedil;&atilde;o confirmada!
        </h1>

        <p id="trainingObrigadoMsg" style="color:#8B949E;font-size:1.1rem;line-height:1.6;margin-bottom:32px;">
            Sua vaga est&aacute; reservada. No hor&aacute;rio da sess&atilde;o, entre pela sala do Google Meet.
        </p>

        <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:16px;padding:24px;margin-bottom:24px;text-align:left;">
            <div id="trainingObrigadoDetails"></div>
        </div>

        <div id="trainingCalendarBlock" style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:16px;padding:24px;margin-bottom:28px;text-align:left;display:none;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
                <i class="fa-solid fa-calendar-plus" style="color:#ffba1a;font-size:18px;"></i>
                <strong style="color:#fff;font-size:15px;">Salvar na agenda</strong>
            </div>
            <p style="color:#8B949E;font-size:13px;line-height:1.5;margin:0 0 16px;">Escolha sua agenda preferida — o lembrete ajuda a chegar no hor&aacute;rio certo.</p>
            <div id="trainingCalendarBtns" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;"></div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
            <a href="/treinamentos" style="display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);color:#ffba1a;border-radius:50px;font-weight:700;text-decoration:none;font-size:14px;">
                <i class="fa-solid fa-arrow-left"></i>Ver outras sess&otilde;es
            </a>
        </div>
    </div>
</section>

<style>
    .ty-cal-btn { display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:14px 10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#C9D1D9;text-decoration:none;font-size:12px;font-weight:600;transition:all 0.2s;cursor:pointer;font-family:inherit; }
    .ty-cal-btn:hover { border-color:rgba(255,186,26,0.45);background:rgba(255,186,26,0.06);color:#fff;transform:translateY(-2px); }
    .ty-cal-btn i { font-size:22px; }
    @media (max-width: 480px) { #trainingCalendarBtns { grid-template-columns:1fr !important; } }
</style>

<style>
@keyframes tyBounce { 0% { transform: scale(0); } 100% { transform: scale(1); } }
</style>
`;
