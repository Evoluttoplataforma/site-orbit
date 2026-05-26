export const pageHTML = `
<style>
  /* ===== HERO ===== */
  .tr-hero { position: relative; padding: 140px 20px 80px; text-align: center; background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,186,26,0.10) 0%, transparent 60%), linear-gradient(180deg, #0D1117 0%, #0a0d12 100%); overflow: hidden; }
  .tr-hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0); background-size: 32px 32px; pointer-events: none; }
  .tr-hero__inner { position: relative; max-width: 920px; margin: 0 auto; }
  .tr-hero__badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; border-radius: 50px; background: rgba(255,186,26,0.08); color: #ffba1a; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 28px; border: 1px solid rgba(255,186,26,0.25); backdrop-filter: blur(8px); }
  .tr-hero__badge i { font-size: 11px; }
  .tr-hero h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 800; color: #fff; margin: 0 0 20px; letter-spacing: -0.03em; line-height: 1.1; }
  .tr-hero h1 span.accent { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .tr-hero p.lead { color: #C9D1D9; font-size: clamp(1.05rem, 1.6vw, 1.2rem); line-height: 1.6; max-width: 680px; margin: 0 auto; }
  .tr-hero__stats { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 40px; }
  .tr-hero__stat { display: flex; align-items: center; gap: 10px; padding: 12px 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 50px; backdrop-filter: blur(8px); }
  .tr-hero__stat i { color: #ffba1a; font-size: 14px; }
  .tr-hero__stat span { color: #C9D1D9; font-size: 13px; font-weight: 600; }
  .tr-hero__stat strong { color: #fff; }

  /* ===== TIMETABLE ===== */
  .tr-section { padding: 80px 20px; }
  .tr-section__head { max-width: 920px; margin: 0 auto 48px; text-align: center; }
  .tr-section__eyebrow { display: inline-block; color: #ffba1a; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px; }
  .tr-section__title { font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 800; color: #fff; margin: 0 0 16px; letter-spacing: -0.02em; }
  .tr-section__sub { color: #8B949E; font-size: 1.05rem; line-height: 1.6; max-width: 620px; margin: 0 auto; }

  .tr-week { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
  @media (max-width: 1024px) { .tr-week { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .tr-week { grid-template-columns: 1fr; } }

  .tr-day { background: linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden; transition: border-color 0.25s; }
  .tr-day:hover { border-color: rgba(255,186,26,0.25); }
  .tr-day__header { padding: 20px 20px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); text-align: center; }
  .tr-day__name { color: #ffba1a; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2px; }
  .tr-day__count { color: #8B949E; font-size: 12px; }
  .tr-day__slots { padding: 14px; display: flex; flex-direction: column; gap: 12px; }

  .tr-slot { background: rgba(13,17,23,0.6); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 18px 16px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
  .tr-slot::before { content: ''; position: absolute; top: 0; left: 0; height: 100%; width: 3px; background: linear-gradient(180deg, #ffba1a, #ff8c00); transform: scaleY(0); transform-origin: top; transition: transform 0.3s ease; }
  .tr-slot:hover { background: rgba(255,186,26,0.04); border-color: rgba(255,186,26,0.4); transform: translateX(2px); }
  .tr-slot:hover::before { transform: scaleY(1); }
  .tr-slot__time { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(255,186,26,0.10); border-radius: 6px; color: #ffba1a; font-size: 11px; font-weight: 700; margin-bottom: 10px; }
  .tr-slot__time i { font-size: 9px; }
  .tr-slot__icon-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .tr-slot__icon { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, rgba(255,186,26,0.15), rgba(255,140,0,0.08)); display: flex; align-items: center; justify-content: center; color: #ffba1a; font-size: 14px; flex-shrink: 0; }
  .tr-slot__title { color: #fff; font-size: 0.98rem; font-weight: 700; line-height: 1.3; }
  .tr-slot__sub { color: #8B949E; font-size: 0.78rem; margin: 0 0 10px; }
  .tr-slot__desc { color: #C9D1D9; font-size: 0.82rem; line-height: 1.5; margin: 0 0 14px; }
  .tr-slot__cta { display: inline-flex; align-items: center; gap: 6px; color: #ffba1a; font-size: 0.8rem; font-weight: 700; }
  .tr-slot__cta i { transition: transform 0.2s; }
  .tr-slot:hover .tr-slot__cta i { transform: translateX(4px); }

  /* ===== COMO FUNCIONA ===== */
  .tr-how { background: linear-gradient(180deg, #0a0d12 0%, #0D1117 100%); border-top: 1px solid rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.04); }
  .tr-how__steps { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  @media (max-width: 900px) { .tr-how__steps { grid-template-columns: 1fr; } }
  .tr-step { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 32px 28px; position: relative; }
  .tr-step__num { position: absolute; top: 24px; right: 24px; font-size: 3.5rem; font-weight: 900; color: rgba(255,186,26,0.12); line-height: 1; letter-spacing: -0.05em; }
  .tr-step__icon { width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, rgba(255,186,26,0.18) 0%, rgba(255,140,0,0.08) 100%); display: flex; align-items: center; justify-content: center; color: #ffba1a; font-size: 22px; margin-bottom: 20px; }
  .tr-step h3 { color: #fff; font-size: 1.2rem; font-weight: 700; margin: 0 0 10px; }
  .tr-step p { color: #8B949E; font-size: 0.95rem; line-height: 1.6; margin: 0; }

  /* ===== MODAL ===== */
  .tr-modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.78); z-index: 999; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(12px); animation: trFadeIn 0.2s ease; }
  .tr-modal-overlay.active { display: flex; }
  @keyframes trFadeIn { from { opacity: 0; } to { opacity: 1; } }
  .tr-modal { background: linear-gradient(180deg, #161B22 0%, #0D1117 100%); border: 1px solid rgba(255,186,26,0.2); border-radius: 24px; width: 100%; max-width: 520px; max-height: 92vh; overflow-y: auto; position: relative; box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,186,26,0.08); animation: trSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes trSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .tr-modal__head { padding: 28px 28px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); position: relative; }
  .tr-modal__close { position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.05); border: none; color: #C9D1D9; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .tr-modal__close:hover { background: rgba(248,81,73,0.15); color: #F85149; }
  .tr-modal__icon-row { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; padding-right: 40px; }
  .tr-modal__icon { width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, rgba(255,186,26,0.2), rgba(255,140,0,0.1)); display: flex; align-items: center; justify-content: center; color: #ffba1a; font-size: 20px; flex-shrink: 0; border: 1px solid rgba(255,186,26,0.25); }
  .tr-modal__title { color: #fff; font-size: 1.25rem; font-weight: 800; margin: 0; line-height: 1.25; letter-spacing: -0.01em; }
  .tr-modal__sub { color: #8B949E; font-size: 0.85rem; margin: 2px 0 0; }
  .tr-modal__meta { display: flex; flex-wrap: wrap; gap: 8px; }
  .tr-modal__chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 50px; color: #C9D1D9; font-size: 12px; font-weight: 600; }
  .tr-modal__chip i { color: #ffba1a; font-size: 11px; }
  .tr-modal__chip.yt i { color: #ff0000; }
  .tr-modal__body { padding: 24px 28px 28px; }
  .tr-modal__label { display: block; color: #fff; font-size: 0.82rem; font-weight: 700; margin: 0 0 10px; }
  .tr-modal__label-sub { color: #8B949E; font-size: 0.78rem; font-weight: 400; margin-left: 6px; }
  .tr-modal__dates { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 22px; }
  .tr-modal__date-btn { padding: 14px 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #C9D1D9; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; transition: all 0.2s; font-family: inherit; line-height: 1.3; }
  .tr-modal__date-btn small { display: block; color: #8B949E; font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
  .tr-modal__date-btn:hover { border-color: rgba(255,186,26,0.4); color: #fff; background: rgba(255,186,26,0.04); }
  .tr-modal__date-btn:hover small { color: #ffba1a; }
  .tr-modal__date-btn.selected { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); color: #0D1117; border-color: #ffba1a; box-shadow: 0 6px 20px rgba(255,186,26,0.3); }
  .tr-modal__date-btn.selected small { color: rgba(13,17,23,0.7); }
  .tr-modal__input { width: 100%; padding: 14px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; color: #fff; font-size: 15px; font-family: inherit; box-sizing: border-box; margin-bottom: 12px; transition: all 0.2s; }
  .tr-modal__input:focus { outline: none; border-color: rgba(255,186,26,0.5); background: rgba(255,255,255,0.05); }
  .tr-modal__input::placeholder { color: #6B7280; }
  .tr-modal__submit { width: 100%; margin-top: 12px; padding: 16px 24px; background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); color: #0D1117; border: none; border-radius: 50px; font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit; transition: all 0.25s; letter-spacing: 0.3px; box-shadow: 0 8px 24px rgba(255,186,26,0.25); }
  .tr-modal__submit:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,186,26,0.4); }
  .tr-modal__submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
  .tr-modal__error { color: #F85149; font-size: 0.85rem; margin: 8px 0 0; display: none; background: rgba(248,81,73,0.08); padding: 10px 14px; border-radius: 8px; border-left: 3px solid #F85149; }
  .tr-modal__error.show { display: block; }
</style>

<!-- HERO -->
<section class="tr-hero">
    <div class="tr-hero__inner">
        <span class="tr-hero__badge"><i class="fa-solid fa-graduation-cap"></i>Treinamentos Orbit</span>
        <h1>Domine a Orbit em <span class="accent">10 sess&otilde;es semanais</span> ao vivo</h1>
        <p class="lead">Toda semana, de segunda a sexta, dois treinamentos por dia. Aprenda direto com nosso time, ao vivo no YouTube, sem custo.</p>
        <div class="tr-hero__stats">
            <div class="tr-hero__stat"><i class="fa-solid fa-layer-group"></i><span><strong>10 m&oacute;dulos</strong> por semana</span></div>
            <div class="tr-hero__stat"><i class="fa-brands fa-youtube" style="color:#ff0000;"></i><span>Ao vivo no <strong>YouTube</strong></span></div>
            <div class="tr-hero__stat"><i class="fa-solid fa-calendar-week"></i><span><strong>Seg a Sex</strong> &middot; 10h e 16h</span></div>
            <div class="tr-hero__stat"><i class="fa-solid fa-circle-check" style="color:#3FB950;"></i><span><strong>100% gratuito</strong></span></div>
        </div>
    </div>
</section>

<!-- GRADE SEMANAL -->
<section class="tr-section" style="padding-top:40px;">
    <div class="tr-section__head">
        <span class="tr-section__eyebrow">Agenda da semana</span>
        <h2 class="tr-section__title">Escolha um treinamento e marque sua presen&ccedil;a</h2>
        <p class="tr-section__sub">Cada m&oacute;dulo cobre uma &aacute;rea da plataforma com foco pr&aacute;tico. Voc&ecirc; participa quantas vezes quiser.</p>
    </div>
    <div class="tr-week" id="trainingGrid"></div>
</section>

<!-- COMO FUNCIONA -->
<section class="tr-section tr-how">
    <div class="tr-section__head">
        <span class="tr-section__eyebrow">Como funciona</span>
        <h2 class="tr-section__title">3 passos para participar</h2>
    </div>
    <div class="tr-how__steps">
        <div class="tr-step">
            <div class="tr-step__num">01</div>
            <div class="tr-step__icon"><i class="fa-solid fa-hand-pointer"></i></div>
            <h3>Escolha o m&oacute;dulo</h3>
            <p>Selecione um dos 10 treinamentos da grade. Cada um foca em uma &aacute;rea diferente da Orbit.</p>
        </div>
        <div class="tr-step">
            <div class="tr-step__num">02</div>
            <div class="tr-step__icon"><i class="fa-solid fa-calendar-check"></i></div>
            <h3>Marque a data</h3>
            <p>Pegue a pr&oacute;xima data dispon&iacute;vel ou agende para uma das pr&oacute;ximas semanas.</p>
        </div>
        <div class="tr-step">
            <div class="tr-step__num">03</div>
            <div class="tr-step__icon"><i class="fa-brands fa-youtube" style="color:#ff0000;"></i></div>
            <h3>Entre no YouTube</h3>
            <p>No hor&aacute;rio, acesse o link que enviamos por email e participe ao vivo.</p>
        </div>
    </div>
</section>

<!-- MODAL -->
<div class="tr-modal-overlay" id="trainingModal">
    <div class="tr-modal">
        <div class="tr-modal__head">
            <button class="tr-modal__close" type="button" id="trainingModalClose"><i class="fa-solid fa-xmark"></i></button>
            <div class="tr-modal__icon-row">
                <div class="tr-modal__icon" id="trainingModalIcon"><i class="fa-solid fa-graduation-cap"></i></div>
                <div>
                    <h2 class="tr-modal__title" id="trainingModalTitle">Treinamento</h2>
                    <p class="tr-modal__sub" id="trainingModalSubtitle"></p>
                </div>
            </div>
            <div class="tr-modal__meta" id="trainingModalMeta"></div>
        </div>
        <div class="tr-modal__body">
            <form id="trainingForm">
                <input type="hidden" name="training_slug" id="trainingSlug">

                <label class="tr-modal__label">Escolha uma data <span class="tr-modal__label-sub">pr&oacute;ximas ocorr&ecirc;ncias</span></label>
                <div class="tr-modal__dates" id="trainingDates"></div>
                <input type="hidden" name="chosen_date" id="trainingChosenDate" required>

                <label class="tr-modal__label" style="margin-top:8px;">Seus dados</label>
                <input class="tr-modal__input" type="text" name="nome" required placeholder="Nome completo">
                <input class="tr-modal__input" type="email" name="email" required placeholder="E-mail">
                <input class="tr-modal__input" type="tel" name="telefone" required placeholder="WhatsApp com DDD">

                <p class="tr-modal__error" id="trainingError"></p>
                <button type="submit" class="tr-modal__submit" id="trainingSubmit">
                    <i class="fa-solid fa-check" style="margin-right:8px;"></i>Confirmar inscri&ccedil;&atilde;o gratuita
                </button>
            </form>
        </div>
    </div>
</div>
`;
