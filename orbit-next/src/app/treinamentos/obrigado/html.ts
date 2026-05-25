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
            Voc&ecirc; vai receber o e-mail de confirma&ccedil;&atilde;o com o arquivo .ics pra adicionar na sua agenda.
        </p>

        <div style="background:#161B22;border:1px solid rgba(255,186,26,0.15);border-radius:16px;padding:24px;margin-bottom:28px;text-align:left;">
            <div id="trainingObrigadoDetails"></div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
            <a href="/treinamentos" style="display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);color:#ffba1a;border-radius:50px;font-weight:700;text-decoration:none;font-size:14px;">
                <i class="fa-solid fa-arrow-left"></i>Ver outros treinamentos
            </a>
            <a href="https://www.youtube.com/@orbitgestao/live" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:#ff0000;color:#fff;border-radius:50px;font-weight:700;text-decoration:none;font-size:14px;">
                <i class="fa-brands fa-youtube"></i>Canal no YouTube
            </a>
        </div>
    </div>
</section>

<style>
@keyframes tyBounce { 0% { transform: scale(0); } 100% { transform: scale(1); } }
</style>
`;
