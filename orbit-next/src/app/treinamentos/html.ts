export const pageHTML = `
<style>
  /* ===== HERO ===== */
  .tr-hero { position: relative; padding: 140px 20px 80px; text-align: center; background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,186,26,0.10) 0%, transparent 60%), linear-gradient(180deg, #0D1117 0%, #0a0d12 100%); overflow: hidden; }
  .tr-hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0); background-size: 32px 32px; pointer-events: none; }
  .tr-hero__inner { position: relative; max-width: 920px; margin: 0 auto; }
  .tr-hero__badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; border-radius: 50px; background: rgba(255,186,26,0.08); color: #ffba1a; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 28px; border: 1px solid rgba(255,186,26,0.25); backdrop-filter: blur(8px); }
  .tr-hero__badge i { font-size: 11px; }
  .tr-hero h1 { font-size: clamp(1.6rem, 3.8vw, 2.6rem); font-weight: 800; color: #fff; margin: 0 0 20px; letter-spacing: -0.03em; line-height: 1.2; }
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
  .tr-section__title { font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 800; color: #0D1117; margin: 0 0 16px; letter-spacing: -0.02em; }
  .tr-section__sub { color: #4B5563; font-size: 1.05rem; line-height: 1.6; max-width: 620px; margin: 0 auto; }
  /* Section dark variant (Como funciona) — texto claro sobre fundo escuro */
  .tr-how .tr-section__title { color: #fff; }
  .tr-how .tr-section__sub { color: #8B949E; }

  .tr-week { max-width: 920px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; align-items: stretch; }
  @media (max-width: 768px) { .tr-week { grid-template-columns: 1fr; } }

  .tr-day { display: flex; flex-direction: column; gap: 14px; background: transparent; border: none; }
  .tr-day__header { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 0 0 4px; text-align: center; }
  .tr-day__name { display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; background: rgba(255,186,26,0.10); border: 1px solid rgba(255,186,26,0.25); border-radius: 50px; color: #ffba1a; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
  .tr-day__name::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #ffba1a; box-shadow: 0 0 8px rgba(255,186,26,0.6); }
  .tr-day__count { color: #6B7280; font-size: 13px; font-weight: 500; line-height: 1.4; max-width: 280px; }
  .tr-day__slots { display: flex; flex-direction: column; gap: 14px; flex: 1; }

  .tr-slot { display: flex; flex-direction: column; background: linear-gradient(180deg, #161B22 0%, #0D1117 100%); border: 1px solid rgba(255,255,255,0.10); border-radius: 16px; padding: 18px 18px 16px; cursor: pointer; transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; position: relative; overflow: hidden; flex: 1; min-height: 220px; color: inherit; appearance: none; -webkit-appearance: none; }
  .tr-slot::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #ffba1a 0%, #ff8c00 100%); opacity: 0; transition: opacity 0.25s; }
  .tr-slot:hover { transform: translateY(-3px); border-color: rgba(255,186,26,0.5); box-shadow: 0 16px 36px rgba(0,0,0,0.5); }
  .tr-slot:hover::before { opacity: 1; }
  .tr-slot__time { position: absolute; top: 14px; right: 14px; display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; background: rgba(13,17,23,0.85); border: 1px solid rgba(255,186,26,0.35); border-radius: 50px; color: #ffba1a; font-size: 10.5px; font-weight: 800; letter-spacing: 0.3px; }
  .tr-slot__time i { font-size: 8.5px; }
  .tr-slot__icon { width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); display: flex; align-items: center; justify-content: center; color: #0D1117; font-size: 17px; box-shadow: 0 8px 20px rgba(255,186,26,0.3); margin-bottom: 14px; }
  .tr-slot__title { color: #ffffff; font-size: 1.02rem; font-weight: 700; line-height: 1.25; margin: 0 0 4px; letter-spacing: -0.01em; }
  .tr-slot__sub { color: #ffba1a; font-size: 0.72rem; font-weight: 700; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.8px; }
  .tr-slot__desc { color: #C9D1D9; font-size: 0.84rem; line-height: 1.5; margin: 0 0 16px; flex: 1; }
  .tr-slot__cta { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 14px; background: rgba(255,186,26,0.10); border: 1px solid rgba(255,186,26,0.30); border-radius: 50px; color: #ffba1a; font-size: 0.8rem; font-weight: 700; transition: all 0.2s; margin-top: auto; }
  .tr-slot__cta i { transition: transform 0.2s; font-size: 0.72rem; }
  .tr-slot:hover .tr-slot__cta { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); border-color: transparent; color: #0D1117; }
  .tr-slot:hover .tr-slot__cta i { transform: translateX(3px); }

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
  /* CTAs Zoom no hero: primário azul Zoom, ghost branco */
  .tr-zoom-cta {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 26px; border-radius: 50px;
    background: linear-gradient(135deg, #2D8CFF, #1A6FD9);
    color: #fff; text-decoration: none;
    font-weight: 700; font-size: 15px; letter-spacing: 0.2px;
    border: 1px solid rgba(45,140,255,0.6);
    box-shadow: 0 8px 24px rgba(45,140,255,0.30);
    transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
  }
  .tr-zoom-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(45,140,255,0.45); }
  .tr-zoom-cta i { font-size: 16px; }
  .tr-zoom-cta--ghost {
    background: transparent;
    color: #C9D1D9;
    border-color: rgba(255,255,255,0.20);
    box-shadow: none;
  }
  .tr-zoom-cta--ghost:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,186,26,0.45);
    color: #ffba1a;
    box-shadow: 0 8px 24px rgba(0,0,0,0.20);
  }
</style>

<!-- HERO -->
<section class="tr-hero">
    <div class="tr-hero__inner">
        <span class="tr-hero__badge"><i class="fa-solid fa-graduation-cap"></i>Treinamentos Orbit</span>
        <h1>Domine todos os <span class="accent">pilares de gest&atilde;o</span> da sua empresa no Orbit &mdash; Treinamentos detalhados de cada m&oacute;dulo do Orbit para voc&ecirc; e seu time.</h1>
        <p class="lead">Sess&otilde;es de tira d&uacute;vidas ao vivo no Google Meet &mdash; uma grade para clientes finais e outra para consultorias. Reserve sua vaga e acesse a sala ap&oacute;s a confirma&ccedil;&atilde;o.</p>
        <div class="tr-hero__stats">
            <div class="tr-hero__stat"><i class="fa-solid fa-building"></i><span><strong>Clientes finais</strong> · Seg 14h · Qua 10h</span></div>
            <div class="tr-hero__stat"><i class="fa-solid fa-handshake"></i><span><strong>Consultorias</strong> · Qua 13h · Sex 10h</span></div>
            <div class="tr-hero__stat"><i class="fa-solid fa-video" style="color:#34A853;"></i><span>Ao vivo no <strong>Google Meet</strong></span></div>
            <div class="tr-hero__stat"><i class="fa-solid fa-circle-check" style="color:#3FB950;"></i><span><strong>100% gratuito</strong></span></div>
        </div>
        <div style="margin-top:28px;display:flex;gap:14px;flex-wrap:wrap;justify-content:center;">
            <a href="https://evoluhub.evolutto.com/exclusivo/9ddce2dc-1b7b-44be-ad71-3adcc077f43d?utm_source=site&amp;utm_medium=cta&amp;utm_campaign=treinamentos_hero" target="_blank" rel="noopener noreferrer" class="tr-zoom-cta">
                <i class="fa-solid fa-arrow-right"></i> Acesse aqui
            </a>
        </div>
    </div>
</section>

<!-- GRADE SEMANAL -->
<section class="tr-section" style="padding-top:40px;">
    <div class="tr-section__head">
        <span class="tr-section__eyebrow">Agenda da semana</span>
        <h2 class="tr-section__title">Escolha sua sess&atilde;o de tira d&uacute;vidas</h2>
        <p class="tr-section__sub">Duas frentes: clientes finais e consultorias. Reserve sua vaga e, ap&oacute;s a confirma&ccedil;&atilde;o, acesse a sala do Google Meet.</p>
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
            <h3>Escolha seu perfil</h3>
            <p>Selecione a sess&atilde;o de <strong style="color:#fff;">Clientes finais</strong> ou <strong style="color:#fff;">Consultorias</strong>, conforme o seu perfil.</p>
        </div>
        <div class="tr-step">
            <div class="tr-step__num">02</div>
            <div class="tr-step__icon"><i class="fa-solid fa-calendar-check"></i></div>
            <h3>Escolha o hor&aacute;rio</h3>
            <p>Clientes finais: segundas 14h e quartas 10h. Consultorias: quartas 13h e sextas 10h.</p>
        </div>
        <div class="tr-step">
            <div class="tr-step__num">03</div>
            <div class="tr-step__icon"><i class="fa-solid fa-video" style="color:#34A853;"></i></div>
            <h3>Confirme e entre na sala</h3>
            <p>Preencha a inscri&ccedil;&atilde;o gratuita. Depois da confirma&ccedil;&atilde;o, voc&ecirc; acessa a sala do Google Meet.</p>
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
                <input class="tr-modal__input" type="text" name="empresa" required placeholder="Nome da empresa">
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
