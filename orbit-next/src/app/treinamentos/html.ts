export const pageHTML = `
<style>
  .training-hero { padding: 100px 20px 40px; text-align: center; background: linear-gradient(180deg, #0D1117 0%, #161B22 100%); }
  .training-hero h1 { font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 800; color: #fff; margin-bottom: 16px; letter-spacing: -0.02em; }
  .training-hero p { color: #C9D1D9; font-size: 1.1rem; line-height: 1.6; max-width: 720px; margin: 0 auto; }
  .training-hero .badge { display:inline-flex; align-items:center; gap:8px; padding:8px 18px; border-radius:50px; background:rgba(255,186,26,0.12); color:#ffba1a; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom: 24px; border: 1px solid rgba(255,186,26,0.3); }
  .training-grid { max-width: 1200px; margin: 40px auto 80px; padding: 0 20px; }
  .training-day-row { margin-bottom: 32px; }
  .training-day-label { font-size: 0.85rem; color: #8B949E; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin-bottom: 16px; padding-left: 4px; }
  .training-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  @media (max-width: 768px) { .training-cards { grid-template-columns: 1fr; } }
  .training-card { background: #161B22; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px; cursor: pointer; transition: all 0.25s ease; position: relative; overflow: hidden; }
  .training-card:hover { border-color: rgba(255,186,26,0.4); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
  .training-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #ffba1a; opacity: 0; transition: opacity 0.25s; }
  .training-card:hover::before { opacity: 1; }
  .training-card__header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
  .training-card__icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,186,26,0.12); display: flex; align-items: center; justify-content: center; color: #ffba1a; font-size: 18px; flex-shrink: 0; }
  .training-card__time { font-size: 0.8rem; color: #ffba1a; font-weight: 700; }
  .training-card h3 { font-size: 1.1rem; color: #fff; font-weight: 700; margin: 0 0 4px; line-height: 1.3; }
  .training-card__subtitle { color: #8B949E; font-size: 0.82rem; margin-bottom: 12px; }
  .training-card__desc { color: #C9D1D9; font-size: 0.92rem; line-height: 1.55; margin: 0 0 16px; }
  .training-card__cta { display: inline-flex; align-items: center; gap: 6px; color: #ffba1a; font-size: 0.88rem; font-weight: 600; }
  .training-modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 999; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(6px); }
  .training-modal-overlay.active { display: flex; }
  .training-modal { background: #161B22; border: 1px solid rgba(255,186,26,0.2); border-radius: 20px; padding: 32px; max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; }
  .training-modal__close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.06); border: none; color: #fff; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  .training-modal__close:hover { background: rgba(255,255,255,0.12); }
  .training-modal h2 { color: #fff; font-size: 1.35rem; margin: 0 0 4px; font-weight: 800; }
  .training-modal .modal-meta { color: #ffba1a; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px; }
  .training-modal label { display: block; color: #8B949E; font-size: 0.82rem; font-weight: 600; margin: 14px 0 6px; text-transform: uppercase; letter-spacing: 0.5px; }
  .training-modal input { width: 100%; padding: 12px 14px; background: #0D1117; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #fff; font-size: 15px; font-family: inherit; box-sizing: border-box; }
  .training-modal input:focus { outline: none; border-color: #ffba1a; }
  .training-modal__dates { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 8px; }
  .training-modal__date-btn { padding: 12px 8px; background: rgba(255,186,26,0.08); border: 1px solid rgba(255,186,26,0.25); color: #ffba1a; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center; transition: all 0.2s; font-family: inherit; }
  .training-modal__date-btn:hover { background: rgba(255,186,26,0.15); }
  .training-modal__date-btn.selected { background: #ffba1a; color: #0D1117; border-color: #ffba1a; }
  .training-modal__submit { width: 100%; margin-top: 24px; padding: 14px 24px; background: #ffba1a; color: #0D1117; border: none; border-radius: 50px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all 0.2s; }
  .training-modal__submit:hover { background: #e6a200; transform: translateY(-1px); }
  .training-modal__submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .training-modal__error { color: #F85149; font-size: 0.85rem; margin-top: 8px; display: none; }
  .training-modal__error.show { display: block; }
</style>

<section class="training-hero">
    <span class="badge"><i class="fa-solid fa-graduation-cap"></i> Treinamentos Orbit</span>
    <h1>Treinamentos semanais da plataforma</h1>
    <p>10 m&oacute;dulos por semana, sempre ao vivo no YouTube. Escolha um treinamento, marque sua agenda e participe quantas vezes quiser.</p>
</section>

<section class="training-grid" id="trainingGrid"></section>

<div class="training-modal-overlay" id="trainingModal">
    <div class="training-modal">
        <button class="training-modal__close" type="button" id="trainingModalClose"><i class="fa-solid fa-xmark"></i></button>
        <h2 id="trainingModalTitle">Treinamento</h2>
        <div class="modal-meta" id="trainingModalMeta"></div>

        <form id="trainingForm">
            <input type="hidden" name="training_slug" id="trainingSlug">

            <label>Escolha uma data</label>
            <div class="training-modal__dates" id="trainingDates"></div>
            <input type="hidden" name="chosen_date" id="trainingChosenDate" required>

            <label>Nome completo</label>
            <input type="text" name="nome" required placeholder="Seu nome">

            <label>E-mail</label>
            <input type="email" name="email" required placeholder="seu@email.com">

            <label>WhatsApp</label>
            <input type="tel" name="telefone" required placeholder="(11) 99999-9999">

            <p class="training-modal__error" id="trainingError"></p>
            <button type="submit" class="training-modal__submit" id="trainingSubmit">
                <i class="fa-solid fa-check" style="margin-right:6px;"></i>Confirmar inscri&ccedil;&atilde;o
            </button>
        </form>
    </div>
</div>
`;
