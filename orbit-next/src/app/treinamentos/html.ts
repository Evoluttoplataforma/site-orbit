import { TRAINING_SESSIONS, TRAINING_LIVE_CARDS, slotLabel, WEEKDAY_SHORT, timeLabel } from '@/lib/training-sessions';

// Chips do hero e textos da agenda vêm da fonte única (src/lib/training-sessions.ts),
// não mais cravados aqui — antes mudar um horário exigia editar 3 arquivos.
const heroChips = TRAINING_SESSIONS.map(
  (s) => `<div class="tr-hero__stat"><i class="fa-solid ${s.icon}"></i><span><strong>${s.title}</strong> · ${slotLabel(s)}</span></div>`
).join('\n            ');

const scheduleLine = TRAINING_SESSIONS.map((s) => `${WEEKDAY_SHORT[s.weekday]} ${timeLabel(s)}`).join(' · ');

const liveCards = TRAINING_LIVE_CARDS.map(
  (c) => `
            <a class="tr-live" href="${c.href}">
                <span class="tr-live__day">${WEEKDAY_SHORT[c.weekday]} · ${timeLabel(c)}</span>
                <div class="tr-live__icon"><i class="fa-solid ${c.icon}"></i></div>
                <div class="tr-live__title">${c.title}${c.note ? `<span class="tr-live__note">${c.note}</span>` : ''}</div>
                <p class="tr-live__desc">${c.description}</p>
                <span class="tr-live__cta">Ver p&aacute;gina <i class="fa-solid fa-arrow-right"></i></span>
            </a>`
).join('\n');

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
  .tr-how .tr-section__title { color: #fff; }
  .tr-how .tr-section__sub { color: #8B949E; }

  .tr-week { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: stretch; }
  @media (max-width: 900px) { .tr-week { grid-template-columns: 1fr; } }

  .tr-slot { display: flex; flex-direction: column; background: linear-gradient(180deg, #161B22 0%, #0D1117 100%); border: 1px solid rgba(255,255,255,0.10); border-radius: 16px; padding: 18px 18px 16px; cursor: pointer; transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; position: relative; overflow: hidden; flex: 1; min-height: 230px; color: inherit; appearance: none; -webkit-appearance: none; text-align: left; font: inherit; width: 100%; }
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

  /* ===== LIVES (sem inscrição aqui) ===== */
  .tr-lives-wrap { max-width: 1080px; margin: 56px auto 0; }
  .tr-lives-wrap__head { text-align: center; margin-bottom: 22px; }
  .tr-lives-wrap__head h3 { color: #0D1117; font-size: 1.15rem; font-weight: 800; margin: 0 0 6px; }
  .tr-lives-wrap__head p { color: #6B7280; font-size: 0.92rem; margin: 0; }
  .tr-lives { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  @media (max-width: 700px) { .tr-lives { grid-template-columns: 1fr; } }
  .tr-live { display: flex; flex-direction: column; position: relative; padding: 20px; border-radius: 16px; background: #fff; border: 1px solid rgba(13,17,23,0.10); text-decoration: none; transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; }
  .tr-live:hover { transform: translateY(-3px); border-color: rgba(45,140,255,0.45); box-shadow: 0 14px 32px rgba(13,17,23,0.10); }
  .tr-live__day { position: absolute; top: 16px; right: 16px; padding: 4px 10px; border-radius: 50px; background: rgba(45,140,255,0.10); border: 1px solid rgba(45,140,255,0.30); color: #1A6FD9; font-size: 10.5px; font-weight: 800; letter-spacing: 0.3px; }
  .tr-live__icon { width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #2D8CFF, #1A6FD9); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; margin-bottom: 14px; }
  .tr-live__title { color: #0D1117; font-size: 1rem; font-weight: 800; margin: 0 0 6px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .tr-live__note { padding: 2px 8px; border-radius: 50px; background: rgba(255,186,26,0.16); color: #8a5a00; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; }
  .tr-live__desc { color: #4B5563; font-size: 0.88rem; line-height: 1.5; margin: 0 0 14px; flex: 1; }
  .tr-live__cta { display: inline-flex; align-items: center; gap: 6px; color: #1A6FD9; font-size: 0.82rem; font-weight: 800; margin-top: auto; }
  .tr-live__cta i { font-size: 0.72rem; transition: transform 0.2s; }
  .tr-live:hover .tr-live__cta i { transform: translateX(3px); }

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
  .tr-modal__chip.zoom i { color: #2D8CFF; }
  .tr-modal__body { padding: 24px 28px 28px; }
  .tr-modal__label { display: block; color: #fff; font-size: 0.82rem; font-weight: 700; margin: 0 0 10px; }
  .tr-modal__label-sub { color: #8B949E; font-size: 0.78rem; font-weight: 400; margin-left: 6px; }

  /* Checkboxes de sessão (multi-seleção) */
  .tr-checks { display: flex; flex-direction: column; gap: 10px; margin-bottom: 8px; }
  .tr-check { display: flex; align-items: flex-start; gap: 12px; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; transition: all 0.2s; }
  .tr-check:hover { border-color: rgba(255,186,26,0.4); background: rgba(255,186,26,0.04); }
  .tr-check input { appearance: none; -webkit-appearance: none; width: 20px; height: 20px; flex-shrink: 0; margin: 1px 0 0; border: 2px solid rgba(255,255,255,0.25); border-radius: 6px; cursor: pointer; position: relative; transition: all 0.2s; }
  .tr-check input:checked { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); border-color: #ffba1a; }
  .tr-check input:checked::after { content: '\\2713'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #0D1117; font-size: 13px; font-weight: 900; }
  .tr-check input:focus-visible { outline: 2px solid #ffba1a; outline-offset: 2px; }
  .tr-check:has(input:checked) { border-color: rgba(255,186,26,0.55); background: rgba(255,186,26,0.07); }
  .tr-check__body { flex: 1; min-width: 0; }
  .tr-check__title { color: #fff; font-size: 0.92rem; font-weight: 700; margin: 0; display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .tr-check__when { color: #ffba1a; font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; }
  .tr-check__desc { color: #8B949E; font-size: 0.8rem; line-height: 1.45; margin: 4px 0 0; }

  .tr-modal__note { display: flex; gap: 9px; align-items: flex-start; margin: 4px 0 20px; padding: 11px 13px; background: rgba(45,140,255,0.07); border: 1px solid rgba(45,140,255,0.22); border-radius: 10px; }
  .tr-modal__note i { color: #2D8CFF; font-size: 12px; margin-top: 2px; flex-shrink: 0; }
  .tr-modal__note span { color: #C9D1D9; font-size: 0.79rem; line-height: 1.5; }

  .tr-modal__input { width: 100%; padding: 14px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; color: #fff; font-size: 15px; font-family: inherit; box-sizing: border-box; margin-bottom: 12px; transition: all 0.2s; }
  .tr-modal__input:focus { outline: none; border-color: rgba(255,186,26,0.5); background: rgba(255,255,255,0.05); }
  .tr-modal__input::placeholder { color: #6B7280; }
  .tr-hp { position: absolute !important; left: -9999px !important; width: 1px !important; height: 1px !important; opacity: 0 !important; pointer-events: none !important; }
  .tr-modal__submit { width: 100%; margin-top: 12px; padding: 16px 24px; background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); color: #0D1117; border: none; border-radius: 50px; font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit; transition: all 0.25s; letter-spacing: 0.3px; box-shadow: 0 8px 24px rgba(255,186,26,0.25); }
  .tr-modal__submit:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,186,26,0.4); }
  .tr-modal__submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
  .tr-modal__error { color: #F85149; font-size: 0.85rem; margin: 8px 0 0; display: none; background: rgba(248,81,73,0.08); padding: 10px 14px; border-radius: 8px; border-left: 3px solid #F85149; }
  .tr-modal__error.show { display: block; }

  .tr-zoom-cta { display: inline-flex; align-items: center; gap: 10px; padding: 14px 26px; border-radius: 50px; background: linear-gradient(135deg, #2D8CFF, #1A6FD9); color: #fff; text-decoration: none; font-weight: 700; font-size: 15px; letter-spacing: 0.2px; border: 1px solid rgba(45,140,255,0.6); box-shadow: 0 8px 24px rgba(45,140,255,0.30); transition: all 0.25s cubic-bezier(0.4,0,0.2,1); cursor: pointer; font-family: inherit; }
  .tr-zoom-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(45,140,255,0.45); }
  .tr-zoom-cta i { font-size: 16px; }
  .tr-zoom-cta--ghost { background: transparent; color: #C9D1D9; border-color: rgba(255,255,255,0.20); box-shadow: none; }
  .tr-zoom-cta--ghost:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,186,26,0.45); color: #ffba1a; box-shadow: 0 8px 24px rgba(0,0,0,0.20); }
</style>

<!-- HERO -->
<section class="tr-hero">
    <div class="tr-hero__inner">
        <span class="tr-hero__badge"><i class="fa-solid fa-graduation-cap"></i>Treinamentos Orbit</span>
        <h1>Domine todos os <span class="accent">pilares de gest&atilde;o</span> da sua empresa no Orbit &mdash; sess&otilde;es ao vivo, toda semana, com o time que criou a plataforma.</h1>
        <p class="lead">Voc&ecirc; se inscreve <strong style="color:#fff;">uma vez</strong> e passa a ser convidado toda semana. As sess&otilde;es acontecem ao vivo pelo Zoom, com c&acirc;mera e microfone abertos &mdash; d&aacute; para conversar, mostrar a tela e tirar d&uacute;vida na hora.</p>
        <div class="tr-hero__stats">
            ${heroChips}
            <div class="tr-hero__stat"><i class="fa-solid fa-video" style="color:#2D8CFF;"></i><span>Ao vivo pelo <strong>Zoom</strong></span></div>
            <div class="tr-hero__stat"><i class="fa-solid fa-circle-check" style="color:#3FB950;"></i><span><strong>100% gratuito</strong></span></div>
        </div>
        <div style="margin-top:28px;display:flex;gap:14px;flex-wrap:wrap;justify-content:center;">
            <button type="button" class="tr-zoom-cta" id="trainingOpenAll">
                <i class="fa-solid fa-calendar-check"></i> Quero me inscrever
            </button>
            <a href="https://evoluhub.evolutto.com/exclusivo/9ddce2dc-1b7b-44be-ad71-3adcc077f43d?utm_source=site&amp;utm_medium=cta&amp;utm_campaign=treinamentos_hero" target="_blank" rel="noopener noreferrer" class="tr-zoom-cta tr-zoom-cta--ghost">
                <i class="fa-solid fa-book-open"></i> Material de apoio
            </a>
        </div>
    </div>
</section>

<!-- GRADE SEMANAL -->
<section class="tr-section" style="padding-top:40px;">
    <div class="tr-section__head">
        <span class="tr-section__eyebrow">Agenda da semana</span>
        <h2 class="tr-section__title">Escolha as sess&otilde;es que voc&ecirc; quer</h2>
        <p class="tr-section__sub">${scheduleLine}. Marque quantas quiser &mdash; uma inscri&ccedil;&atilde;o s&oacute; vale para todas as semanas.</p>
    </div>
    <div class="tr-week" id="trainingGrid"></div>

    <div class="tr-lives-wrap">
        <div class="tr-lives-wrap__head">
            <h3>Tamb&eacute;m acontecem toda semana</h3>
            <p>Estas t&ecirc;m p&aacute;gina e inscri&ccedil;&atilde;o pr&oacute;prias.</p>
        </div>
        <div class="tr-lives">${liveCards}
        </div>
    </div>
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
            <div class="tr-step__icon"><i class="fa-solid fa-list-check"></i></div>
            <h3>Marque suas sess&otilde;es</h3>
            <p>Tira D&uacute;vidas &eacute; voc&ecirc; quem traz a pauta. <strong style="color:#fff;">Treinamento</strong> &eacute; aula preparada, passo a passo. Marque uma, duas ou todas.</p>
        </div>
        <div class="tr-step">
            <div class="tr-step__num">02</div>
            <div class="tr-step__icon"><i class="fa-solid fa-user-check"></i></div>
            <h3>Inscreva-se uma vez</h3>
            <p>Preenche seus dados e pronto. N&atilde;o precisa voltar aqui toda semana &mdash; a inscri&ccedil;&atilde;o vale para todas as ocorr&ecirc;ncias.</p>
        </div>
        <div class="tr-step">
            <div class="tr-step__num">03</div>
            <div class="tr-step__icon"><i class="fa-solid fa-bell" style="color:#2D8CFF;"></i></div>
            <h3>Receba o lembrete</h3>
            <p>O link do Zoom chega por e-mail na inscri&ccedil;&atilde;o, e a gente lembra voc&ecirc; <strong style="color:#fff;">1 dia antes</strong> e <strong style="color:#fff;">1 hora antes</strong> de cada sess&atilde;o.</p>
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
                    <h2 class="tr-modal__title" id="trainingModalTitle">Inscri&ccedil;&atilde;o gratuita</h2>
                    <p class="tr-modal__sub" id="trainingModalSubtitle">Escolha as sess&otilde;es e preencha seus dados</p>
                </div>
            </div>
            <div class="tr-modal__meta" id="trainingModalMeta">
                <span class="tr-modal__chip zoom"><i class="fa-solid fa-video"></i>Ao vivo pelo Zoom</span>
                <span class="tr-modal__chip"><i class="fa-solid fa-repeat"></i>Toda semana</span>
                <span class="tr-modal__chip"><i class="fa-solid fa-clock"></i>1 hora</span>
            </div>
        </div>
        <div class="tr-modal__body">
            <form id="trainingForm">
                <label class="tr-modal__label">Quais sess&otilde;es voc&ecirc; quer participar? <span class="tr-modal__label-sub">pode marcar mais de uma</span></label>
                <div class="tr-checks" id="trainingSessionChecks"></div>

                <div class="tr-modal__note">
                    <i class="fa-solid fa-circle-info"></i>
                    <span>Uma inscri&ccedil;&atilde;o s&oacute; vale para <strong style="color:#fff;">todas as semanas</strong>. O link de acesso chega no seu e-mail e a gente lembra voc&ecirc; antes de cada sess&atilde;o.</span>
                </div>

                <label class="tr-modal__label">Seus dados</label>
                <input class="tr-modal__input" type="text" name="nome" required placeholder="Nome completo" autocomplete="name">
                <input class="tr-modal__input" type="text" name="empresa" required placeholder="Nome da empresa" autocomplete="organization">
                <input class="tr-modal__input" type="email" name="email" required placeholder="E-mail" autocomplete="email">
                <input class="tr-modal__input" type="tel" name="telefone" required placeholder="WhatsApp com DDD" autocomplete="tel">

                <input class="tr-hp" type="text" name="hp" tabindex="-1" aria-hidden="true" autocomplete="off">
                <input type="hidden" name="ts" id="trainingTs">

                <p class="tr-modal__error" id="trainingError"></p>
                <button type="submit" class="tr-modal__submit" id="trainingSubmit">
                    <i class="fa-solid fa-check" style="margin-right:8px;"></i>Confirmar inscri&ccedil;&atilde;o gratuita
                </button>
            </form>
        </div>
    </div>
</div>
`;
