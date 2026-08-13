import { TRAINING_SESSIONS, TRAINING_LIVE_CARDS, WEEKDAY_SHORT, WEEKDAY_SHORT_EN, timeLabel } from '@/lib/training-sessions';
import { i18nText, i18nEl } from '@/lib/i18n-html';

// Chips do hero e textos da agenda vêm da fonte única (src/lib/training-sessions.ts),
// não mais cravados aqui — antes mudar um horário exigia editar 3 arquivos.
//
// Só UM chip resume a agenda. Antes eram 5 chips (3 sessões + Zoom + gratuito), o
// que competia com o botão principal em vez de apoiá-lo.
const agendaResumo = TRAINING_SESSIONS.map((s) => `${WEEKDAY_SHORT[s.weekday]} ${timeLabel(s)}`).join(' · ');
const agendaResumoEn = TRAINING_SESSIONS.map((s) => `${WEEKDAY_SHORT_EN[s.weekday]} ${timeLabel(s)}`).join(' · ');

// O chip de "quando" vem de whenLabel, nao de dia+hora: a Live Orbit acontece em
// datas pontuais do mes, entao mostrar "Terça · 13h" daria a entender que e semanal.
const liveCards = TRAINING_LIVE_CARDS.map(
  (c) => `
            <a class="tr-live${c.cadence === 'pontual' ? ' tr-live--pontual' : ''}" href="${c.href}">
                <div class="tr-live__icon"><i class="fa-solid ${c.icon}"></i></div>
                <div class="tr-live__body">
                    <div class="tr-live__top">
                        <span class="tr-live__title">${i18nText(c.title, c.titleEn)}</span>
                        ${c.note ? `<span class="tr-live__note">${i18nText(c.note, c.noteEn || c.note)}</span>` : ''}
                        <span class="tr-live__day">${i18nText(c.whenLabel, c.whenLabelEn || c.whenLabel)}</span>
                    </div>
                    ${i18nEl('p', c.description, c.descriptionEn, 'class="tr-live__desc"')}
                </div>
                <span class="tr-live__arrow"><i class="fa-solid fa-arrow-right"></i></span>
            </a>`
).join('');

export const pageHTML = `
<style>
  /* ═══════════════ HERO ═══════════════ */
  .tr-hero { position: relative; padding: 132px 20px 72px; text-align: center; background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,186,26,0.10) 0%, transparent 60%), linear-gradient(180deg, #0D1117 0%, #0a0d12 100%); overflow: hidden; }
  .tr-hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0); background-size: 32px 32px; pointer-events: none; }
  .tr-hero__inner { position: relative; max-width: 780px; margin: 0 auto; }
  .tr-hero__badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; border-radius: 50px; background: rgba(255,186,26,0.08); color: #ffba1a; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; border: 1px solid rgba(255,186,26,0.25); }
  .tr-hero__badge i { font-size: 11px; }
  .tr-hero h1 { font-size: clamp(1.75rem, 4.4vw, 2.9rem); font-weight: 800; color: #fff; margin: 0 0 18px; letter-spacing: -0.03em; line-height: 1.14; }
  .tr-hero h1 span.accent { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .tr-hero p.lead { color: #C9D1D9; font-size: clamp(1rem, 1.5vw, 1.15rem); line-height: 1.65; max-width: 620px; margin: 0 auto; }

  /* Um chip só, com a agenda inteira — em vez de cinco competindo com o CTA */
  .tr-hero__agenda { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 30px; padding: 11px 22px; border-radius: 50px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); }
  .tr-hero__agenda-item { display: inline-flex; align-items: center; gap: 8px; color: #C9D1D9; font-size: 13.5px; font-weight: 600; }
  .tr-hero__agenda-item i { color: #ffba1a; font-size: 13px; }
  .tr-hero__agenda-sep { width: 1px; height: 14px; background: rgba(255,255,255,0.14); }
  .tr-hero__agenda-zoom i { color: #2D8CFF; }

  .tr-hero__ctas { margin-top: 30px; display: flex; gap: 13px; flex-wrap: wrap; justify-content: center; }
  .tr-hero__note { color: #6B7280; font-size: 12.5px; margin: 16px 0 0; }

  /* ═══════════════ SEÇÕES ═══════════════ */
  .tr-section { padding: 76px 20px; }
  .tr-section__head { max-width: 760px; margin: 0 auto 42px; text-align: center; }
  .tr-section__eyebrow { display: inline-block; color: #ffba1a; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 13px; }
  .tr-section__title { font-size: clamp(1.6rem, 3.4vw, 2.3rem); font-weight: 800; color: #0D1117; margin: 0 0 14px; letter-spacing: -0.02em; line-height: 1.2; }
  .tr-section__sub { color: #4B5563; font-size: 1.02rem; line-height: 1.6; max-width: 560px; margin: 0 auto; }
  .tr-how .tr-section__title { color: #fff; }
  .tr-how .tr-section__sub { color: #8B949E; }

  /* ═══════════════ CARDS DE SESSÃO ═══════════════ */
  .tr-week { max-width: 1060px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: stretch; }
  @media (max-width: 940px) { .tr-week { grid-template-columns: 1fr; max-width: 480px; } }

  .tr-slot { display: flex; flex-direction: column; background: linear-gradient(180deg, #161B22 0%, #0D1117 100%); border: 1px solid rgba(255,255,255,0.10); border-radius: 18px; padding: 22px; cursor: pointer; transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; position: relative; overflow: hidden; flex: 1; color: inherit; appearance: none; -webkit-appearance: none; text-align: left; font: inherit; width: 100%; }
  .tr-slot::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #ffba1a 0%, #ff8c00 100%); opacity: 0; transition: opacity 0.25s; }
  .tr-slot:hover { transform: translateY(-3px); border-color: rgba(255,186,26,0.45); box-shadow: 0 16px 36px rgba(0,0,0,0.45); }
  .tr-slot:hover::before { opacity: 1; }
  .tr-slot:focus-visible { outline: 2px solid #ffba1a; outline-offset: 3px; }

  .tr-slot__head { display: flex; align-items: center; gap: 13px; margin-bottom: 16px; }
  .tr-slot__icon { width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); display: flex; align-items: center; justify-content: center; color: #0D1117; font-size: 17px; flex-shrink: 0; }
  .tr-slot--treino .tr-slot__icon { background: linear-gradient(135deg, #2D8CFF, #1A6FD9); color: #fff; }
  .tr-slot__labels { min-width: 0; }
  .tr-slot__title { color: #fff; font-size: 1.08rem; font-weight: 700; line-height: 1.2; margin: 0; letter-spacing: -0.01em; }
  .tr-slot__when { display: block; color: #ffba1a; font-size: 0.76rem; font-weight: 700; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.9px; }
  .tr-slot--treino .tr-slot__when { color: #6BB0FF; }
  .tr-slot__desc { color: #C9D1D9; font-size: 0.88rem; line-height: 1.55; margin: 0 0 18px; flex: 1; }

  /* A data e' informacao, nao acao — antes vinha estilizada como botao dourado e
     as pessoas clicavam nela esperando outra coisa. */
  .tr-slot__next { display: flex; align-items: center; gap: 7px; color: #8B949E; font-size: 0.79rem; margin: 0 0 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.07); }
  .tr-slot__next i { color: #6B7280; font-size: 0.74rem; }
  .tr-slot__next strong { color: #C9D1D9; font-weight: 600; }

  .tr-slot__cta { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 46px; padding: 12px 18px; background: rgba(255,186,26,0.10); border: 1px solid rgba(255,186,26,0.32); border-radius: 50px; color: #ffba1a; font-size: 0.87rem; font-weight: 700; transition: all 0.2s; margin-top: auto; }
  .tr-slot__cta i { transition: transform 0.2s; font-size: 0.78rem; }
  .tr-slot:hover .tr-slot__cta { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); border-color: transparent; color: #0D1117; }
  .tr-slot:hover .tr-slot__cta i { transform: translateX(3px); }
  .tr-slot--treino .tr-slot__cta { background: rgba(45,140,255,0.12); border-color: rgba(45,140,255,0.35); color: #6BB0FF; }
  .tr-slot--treino:hover .tr-slot__cta { background: linear-gradient(135deg, #2D8CFF, #1A6FD9); border-color: transparent; color: #fff; }
  .tr-slot--treino:hover { border-color: rgba(45,140,255,0.45); }
  .tr-slot--treino::before { background: linear-gradient(90deg, #2D8CFF, #1A6FD9); }

  /* ═══════════════ LIVES (sem inscrição aqui) ═══════════════ */
  /* Cards escuros: em fundo branco os cards brancos anteriores desapareciam e
     brigavam com os 3 cards escuros da mesma seção. */
  .tr-lives-wrap { max-width: 1060px; margin: 52px auto 0; padding-top: 40px; border-top: 1px solid rgba(13,17,23,0.10); }
  .tr-lives-wrap__head { text-align: center; margin-bottom: 22px; }
  .tr-lives-wrap__head h3 { color: #0D1117; font-size: 1.08rem; font-weight: 800; margin: 0 0 6px; }
  .tr-lives-wrap__head p { color: #6B7280; font-size: 0.9rem; margin: 0; }
  .tr-lives { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  @media (max-width: 760px) { .tr-lives { grid-template-columns: 1fr; } }
  .tr-live { display: flex; align-items: flex-start; gap: 14px; padding: 18px; border-radius: 16px; background: linear-gradient(180deg, #161B22 0%, #11161d 100%); border: 1px solid rgba(255,255,255,0.10); text-decoration: none; transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; }
  .tr-live:hover { transform: translateY(-2px); border-color: rgba(45,140,255,0.5); box-shadow: 0 12px 28px rgba(13,17,23,0.25); }
  .tr-live__icon { width: 38px; height: 38px; border-radius: 11px; background: linear-gradient(135deg, #2D8CFF, #1A6FD9); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 15px; flex-shrink: 0; }
  .tr-live__body { flex: 1; min-width: 0; }
  .tr-live__top { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 5px; }
  .tr-live__title { color: #fff; font-size: 0.97rem; font-weight: 700; }
  .tr-live__note { padding: 2px 8px; border-radius: 50px; background: rgba(255,186,26,0.16); color: #ffba1a; font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; }
  .tr-live__day { padding: 2px 9px; border-radius: 50px; background: rgba(45,140,255,0.14); color: #6BB0FF; font-size: 10px; font-weight: 800; }
  /* Cadencia pontual (Live Orbit): chip neutro em vez de azul de "toda semana",
     e sotaque cinza, para nao prometer recorrencia que nao existe. */
  .tr-live--pontual .tr-live__day { background: rgba(255,255,255,0.07); color: #8B949E; }
  .tr-live--pontual .tr-live__icon { background: rgba(255,255,255,0.08); color: #8B949E; }
  .tr-live--pontual .tr-live__arrow { color: #8B949E; }
  .tr-live--pontual:hover { border-color: rgba(255,255,255,0.22); }
  .tr-live__desc { color: #8B949E; font-size: 0.84rem; line-height: 1.5; margin: 0; }
  .tr-live__arrow { color: #6BB0FF; font-size: 0.8rem; flex-shrink: 0; margin-top: 11px; transition: transform 0.2s; }
  .tr-live:hover .tr-live__arrow { transform: translateX(3px); }

  /* ═══════════════ COMO FUNCIONA ═══════════════ */
  .tr-how { background: linear-gradient(180deg, #0a0d12 0%, #0D1117 100%); border-top: 1px solid rgba(255,255,255,0.04); }
  .tr-how__steps { max-width: 1060px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  @media (max-width: 940px) { .tr-how__steps { grid-template-columns: 1fr; max-width: 480px; } }
  .tr-step { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; padding: 28px 24px; position: relative; }
  .tr-step__num { position: absolute; top: 20px; right: 22px; font-size: 2.8rem; font-weight: 900; color: rgba(255,186,26,0.10); line-height: 1; letter-spacing: -0.05em; }
  .tr-step__icon { width: 46px; height: 46px; border-radius: 13px; background: linear-gradient(135deg, rgba(255,186,26,0.18) 0%, rgba(255,140,0,0.08) 100%); display: flex; align-items: center; justify-content: center; color: #ffba1a; font-size: 19px; margin-bottom: 17px; }
  .tr-step h3 { color: #fff; font-size: 1.1rem; font-weight: 700; margin: 0 0 9px; }
  .tr-step p { color: #8B949E; font-size: 0.92rem; line-height: 1.6; margin: 0; }

  /* ═══════════════ MODAL ═══════════════ */
  /* z-index acima do header (1000), do widget WhatsApp (9990) e do chat (9999).
     Antes o overlay estava em 999 e o header fixo cobria o titulo e o botao de
     fechar — o modal nascia inacessivel no topo. */
  .tr-modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.82); z-index: 10050; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); animation: trFadeIn 0.2s ease; overscroll-behavior: contain; }
  .tr-modal-overlay.active { display: flex; }
  @keyframes trFadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* Esconde o botao flutuante do WhatsApp enquanto o modal esta aberto: ele ficava
     por cima do conteudo e do botao de confirmar. Alvo pelo aria-label porque o
     componente usa estilo inline, sem classe estavel. */
  body.tr-modal-open [aria-label="Falar no WhatsApp"] { display: none !important; }

  /* dvh, nao vh: no mobile a barra do navegador muda a altura e com vh o rodape
     do modal (o botao de confirmar) ficava fora da tela. */
  .tr-modal { display: flex; flex-direction: column; background: #0D1117; border: 1px solid rgba(255,186,26,0.22); border-radius: 22px; width: 100%; max-width: 500px; max-height: 88dvh; position: relative; box-shadow: 0 24px 80px rgba(0,0,0,0.7); animation: trSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
  @keyframes trSlideUp { from { transform: translateY(18px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  /* Head fixo, corpo rolavel: o X fica sempre alcancavel, sem depender de scroll */
  .tr-modal__head { flex-shrink: 0; padding: 22px 24px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); background: linear-gradient(180deg, #161B22, #0D1117); }
  .tr-modal__close { position: absolute; top: 14px; right: 14px; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.07); border: none; color: #C9D1D9; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 2; }
  .tr-modal__close:hover { background: rgba(248,81,73,0.18); color: #F85149; }
  .tr-modal__title { color: #fff; font-size: 1.16rem; font-weight: 800; margin: 0; line-height: 1.25; letter-spacing: -0.01em; padding-right: 44px; }
  .tr-modal__sub { color: #8B949E; font-size: 0.83rem; margin: 4px 0 13px; padding-right: 44px; }
  .tr-modal__meta { display: flex; flex-wrap: wrap; gap: 7px; }
  .tr-modal__chip { display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 50px; color: #C9D1D9; font-size: 11.5px; font-weight: 600; }
  .tr-modal__chip i { color: #ffba1a; font-size: 10.5px; }
  .tr-modal__chip.zoom i { color: #2D8CFF; }

  /* O form precisa ser flex container: o corpo rolavel e o rodape fixo sao filhos
     DELE, nao do .tr-modal. Sem isso o flex:1 do corpo nao tem altura de
     referencia e o rodape (botao de confirmar) sai da tela no mobile.
     min-height:0 e' obrigatorio para o filho com overflow poder encolher. */
  #trainingForm { display: flex; flex-direction: column; flex: 1; min-height: 0; }
  .tr-modal__body { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 20px 24px; overscroll-behavior: contain; }
  .tr-modal__label { display: block; color: #fff; font-size: 0.81rem; font-weight: 700; margin: 0 0 10px; }
  .tr-modal__label-sub { color: #8B949E; font-size: 0.76rem; font-weight: 400; margin-left: 5px; }

  .tr-checks { display: flex; flex-direction: column; gap: 9px; margin-bottom: 14px; }
  .tr-check { display: flex; align-items: flex-start; gap: 12px; padding: 13px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.09); border-radius: 13px; cursor: pointer; transition: all 0.18s; }
  .tr-check:hover { border-color: rgba(255,186,26,0.38); background: rgba(255,186,26,0.04); }
  .tr-check input { appearance: none; -webkit-appearance: none; width: 22px; height: 22px; flex-shrink: 0; margin: 0; border: 2px solid rgba(255,255,255,0.26); border-radius: 6px; cursor: pointer; position: relative; transition: all 0.18s; }
  .tr-check input:checked { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); border-color: #ffba1a; }
  .tr-check input:checked::after { content: '\\2713'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #0D1117; font-size: 13px; font-weight: 900; }
  .tr-check input:focus-visible { outline: 2px solid #ffba1a; outline-offset: 2px; }
  .tr-check:has(input:checked) { border-color: rgba(255,186,26,0.55); background: rgba(255,186,26,0.07); }
  .tr-check__body { flex: 1; min-width: 0; }
  .tr-check__title { color: #fff; font-size: 0.9rem; font-weight: 700; margin: 0; display: block; }
  .tr-check__when { color: #ffba1a; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; display: block; margin-top: 2px; }
  .tr-check__desc { color: #8B949E; font-size: 0.78rem; line-height: 1.45; margin: 5px 0 0; }

  .tr-modal__note { display: flex; gap: 9px; align-items: flex-start; margin: 0 0 18px; padding: 11px 13px; background: rgba(45,140,255,0.07); border: 1px solid rgba(45,140,255,0.2); border-radius: 11px; }
  .tr-modal__note i { color: #2D8CFF; font-size: 12px; margin-top: 2px; flex-shrink: 0; }
  .tr-modal__note span { color: #C9D1D9; font-size: 0.78rem; line-height: 1.5; }

  /* 16px minimo: abaixo disso o iOS da zoom automatico ao focar o campo */
  .tr-modal__input { width: 100%; min-height: 48px; padding: 13px 15px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.09); border-radius: 12px; color: #fff; font-size: 16px; font-family: inherit; box-sizing: border-box; margin-bottom: 10px; transition: all 0.18s; }
  .tr-modal__input:focus { outline: none; border-color: rgba(255,186,26,0.5); background: rgba(255,255,255,0.05); }
  .tr-modal__input::placeholder { color: #6B7280; }
  .tr-hp { position: absolute !important; left: -9999px !important; width: 1px !important; height: 1px !important; opacity: 0 !important; pointer-events: none !important; }

  /* Rodape fixo: o botao de confirmar nunca fica fora da tela */
  .tr-modal__foot { flex-shrink: 0; padding: 14px 24px 18px; border-top: 1px solid rgba(255,255,255,0.07); background: #0D1117; }
  .tr-modal__submit { width: 100%; min-height: 52px; padding: 15px 22px; background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); color: #0D1117; border: none; border-radius: 50px; font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit; transition: all 0.22s; letter-spacing: 0.2px; box-shadow: 0 8px 22px rgba(255,186,26,0.22); }
  .tr-modal__submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255,186,26,0.36); }
  .tr-modal__submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
  .tr-modal__error { color: #F85149; font-size: 0.83rem; margin: 0 0 11px; display: none; background: rgba(248,81,73,0.09); padding: 10px 13px; border-radius: 9px; border-left: 3px solid #F85149; line-height: 1.45; }
  .tr-modal__error.show { display: block; }
  .tr-modal__legal { color: #6B7280; font-size: 11px; text-align: center; margin: 10px 0 0; line-height: 1.45; }

  /* Mobile: folha colada embaixo, mais natural com o polegar */
  @media (max-width: 560px) {
    .tr-modal-overlay { padding: 0; align-items: flex-end; }
    .tr-modal { max-width: 100%; max-height: 92dvh; border-radius: 20px 20px 0 0; border-bottom: none; animation: trSheetUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes trSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    .tr-modal__head { padding: 20px 18px 14px; }
    .tr-modal__body { padding: 18px; }
    .tr-modal__foot { padding: 13px 18px calc(16px + env(safe-area-inset-bottom)); }
    .tr-modal__title { font-size: 1.08rem; }
  }

  /* ═══════════════ CTAs ═══════════════ */
  .tr-zoom-cta { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 50px; padding: 14px 26px; border-radius: 50px; background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); color: #0D1117; text-decoration: none; font-weight: 800; font-size: 15px; border: none; box-shadow: 0 8px 24px rgba(255,186,26,0.24); transition: all 0.24s cubic-bezier(0.4,0,0.2,1); cursor: pointer; font-family: inherit; }
  .tr-zoom-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,186,26,0.4); }
  .tr-zoom-cta i { font-size: 15px; }
  .tr-zoom-cta--ghost { background: transparent; color: #C9D1D9; border: 1px solid rgba(255,255,255,0.2); box-shadow: none; font-weight: 700; }
  .tr-zoom-cta--ghost:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,186,26,0.45); color: #ffba1a; box-shadow: none; }

  @media (max-width: 560px) {
    .tr-hero { padding: 116px 18px 60px; }
    .tr-section { padding: 60px 18px; }
    .tr-hero__agenda { flex-direction: column; align-items: flex-start; gap: 9px; border-radius: 16px; padding: 15px 18px; width: 100%; box-sizing: border-box; }
    .tr-hero__agenda-sep { display: none; }
    .tr-hero__ctas { flex-direction: column; }
    .tr-hero__ctas > * { width: 100%; box-sizing: border-box; }
    .tr-lives-wrap { margin-top: 40px; padding-top: 32px; }
  }
</style>

<!-- HERO -->
<section class="tr-hero">
    <div class="tr-hero__inner">
        <span class="tr-hero__badge"><i class="fa-solid fa-graduation-cap"></i>${i18nText('Treinamentos Orbit', 'Orbit Trainings')}</span>
        ${i18nEl('h1', 'Treinamento e tira dúvidas <span class="accent">ao vivo</span>, toda semana.', 'Live <span class="accent">training and Q&amp;A</span>, every week.')}
        ${i18nEl('p', 'Inscreva-se uma vez e receba o convite de todas as próximas sessões. Ao vivo pelo Zoom, com espaço para perguntar, mostrar a tela e conversar.', 'Sign up once and receive the invite for every upcoming session. Live on Zoom, with room to ask, share your screen and talk.', 'class="lead"')}

        <div class="tr-hero__agenda">
            <span class="tr-hero__agenda-item"><i class="fa-solid fa-calendar-week"></i>${i18nText(agendaResumo, agendaResumoEn)}</span>
            <span class="tr-hero__agenda-sep"></span>
            <span class="tr-hero__agenda-item tr-hero__agenda-zoom"><i class="fa-solid fa-video"></i>${i18nText('Pelo Zoom', 'On Zoom')}</span>
            <span class="tr-hero__agenda-sep"></span>
            <span class="tr-hero__agenda-item"><i class="fa-solid fa-circle-check" style="color:#3FB950;"></i>${i18nText('Gratuito', 'Free')}</span>
        </div>

        <div class="tr-hero__ctas">
            <button type="button" class="tr-zoom-cta" id="trainingOpenAll">
                <i class="fa-solid fa-calendar-check"></i> ${i18nText('Quero me inscrever', 'I want to sign up')}
            </button>
            <a href="https://evoluhub.evolutto.com/exclusivo/9ddce2dc-1b7b-44be-ad71-3adcc077f43d?utm_source=site&amp;utm_medium=cta&amp;utm_campaign=treinamentos_hero" target="_blank" rel="noopener noreferrer" class="tr-zoom-cta tr-zoom-cta--ghost">
                <i class="fa-solid fa-book-open"></i> ${i18nText('Material de apoio', 'Support material')}
            </a>
        </div>
        <p class="tr-hero__note">${i18nText('Leva menos de um minuto · sem custo', 'Takes less than a minute · no cost')}</p>
    </div>
</section>

<!-- GRADE SEMANAL -->
<section class="tr-section" style="padding-top:44px;">
    <div class="tr-section__head">
        <span class="tr-section__eyebrow">${i18nText('Agenda da semana', 'This week\'s agenda')}</span>
        ${i18nEl('h2', 'Três encontros por semana', 'Three sessions a week', 'class="tr-section__title"')}
        ${i18nEl('p', 'Escolha os que fazem sentido para você. A inscrição é única e vale para todas as semanas seguintes.', 'Pick the ones that make sense for you. Sign-up is once and covers every following week.', 'class="tr-section__sub"')}
    </div>
    <div class="tr-week" id="trainingGrid"></div>

    <div class="tr-lives-wrap">
        <div class="tr-lives-wrap__head">
            ${i18nEl('h3', 'Outras sessões ao vivo', 'Other live sessions')}
            ${i18nEl('p', 'Cada uma tem página e inscrição próprias.', 'Each one has its own page and registration.')}
        </div>
        <div class="tr-lives">${liveCards}
        </div>
    </div>
</section>

<!-- COMO FUNCIONA -->
<section class="tr-section tr-how">
    <div class="tr-section__head">
        <span class="tr-section__eyebrow">${i18nText('Como funciona', 'How it works')}</span>
        ${i18nEl('h2', 'Três passos, uma vez só', 'Three steps, just once', 'class="tr-section__title"')}
    </div>
    <div class="tr-how__steps">
        <div class="tr-step">
            <div class="tr-step__num">01</div>
            <div class="tr-step__icon"><i class="fa-solid fa-list-check"></i></div>
            ${i18nEl('h3', 'Escolha as sessões', 'Choose the sessions')}
            ${i18nEl('p', 'No <strong style="color:#fff;">Tira Dúvidas</strong> a pauta é sua. O <strong style="color:#fff;">Treinamento</strong> é aula preparada. Dá para marcar mais de uma.', 'In <strong style="color:#fff;">Q&amp;A</strong> the agenda is yours. <strong style="color:#fff;">Training</strong> is a prepared class. You can pick more than one.')}
        </div>
        <div class="tr-step">
            <div class="tr-step__num">02</div>
            <div class="tr-step__icon"><i class="fa-solid fa-user-check"></i></div>
            ${i18nEl('h3', 'Inscreva-se uma vez', 'Sign up once')}
            ${i18nEl('p', 'Quatro campos e pronto. Não precisa voltar aqui toda semana — a inscrição vale para as próximas sessões.', 'Four fields and you are done. You do not need to come back every week — registration covers the upcoming sessions.')}
        </div>
        <div class="tr-step">
            <div class="tr-step__num">03</div>
            <div class="tr-step__icon"><i class="fa-solid fa-bell" style="color:#2D8CFF;"></i></div>
            ${i18nEl('h3', 'Receba o lembrete', 'Get the reminder')}
            ${i18nEl('p', 'O link do Zoom chega por e-mail na inscrição, e avisamos <strong style="color:#fff;">1 dia antes</strong> e <strong style="color:#fff;">1 hora antes</strong> de cada encontro.', 'The Zoom link arrives by email when you sign up, and we remind you <strong style="color:#fff;">1 day before</strong> and <strong style="color:#fff;">1 hour before</strong> each session.')}
        </div>
    </div>
</section>

<!-- MODAL -->
<div class="tr-modal-overlay" id="trainingModal" role="dialog" aria-modal="true" aria-labelledby="trainingModalTitle">
    <div class="tr-modal">
        <button class="tr-modal__close" type="button" id="trainingModalClose" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
        <div class="tr-modal__head">
            <h2 class="tr-modal__title i18n-pt" id="trainingModalTitle">Inscrição gratuita</h2>
            <h2 class="tr-modal__title i18n-en">Free registration</h2>
            ${i18nEl('p', 'Escolha as sessões e preencha seus dados', 'Choose the sessions and fill in your details', 'class="tr-modal__sub"')}
            <div class="tr-modal__meta">
                <span class="tr-modal__chip zoom"><i class="fa-solid fa-video"></i>${i18nText('Ao vivo pelo Zoom', 'Live on Zoom')}</span>
                <span class="tr-modal__chip"><i class="fa-solid fa-repeat"></i>${i18nText('Toda semana', 'Every week')}</span>
                <span class="tr-modal__chip"><i class="fa-solid fa-clock"></i>${i18nText('1 hora', '1 hour')}</span>
            </div>
        </div>

        <form id="trainingForm">
            <div class="tr-modal__body">
                <label class="tr-modal__label">${i18nText('Quais sessões você quer participar?', 'Which sessions do you want to join?')} <span class="tr-modal__label-sub">${i18nText('pode marcar mais de uma', 'you can pick more than one')}</span></label>
                <div class="tr-checks" id="trainingSessionChecks"></div>

                <div class="tr-modal__note">
                    <i class="fa-solid fa-circle-info"></i>
                    <span>${i18nText('Você se inscreve <strong style="color:#fff;">uma vez</strong> e recebe o convite das próximas sessões. O link de acesso chega no seu e-mail.', 'You sign up <strong style="color:#fff;">once</strong> and receive the invite for upcoming sessions. The access link arrives in your email.')}</span>
                </div>

                <label class="tr-modal__label">${i18nText('Seus dados', 'Your details')}</label>
                <input class="tr-modal__input" type="text" name="nome" required placeholder="Nome completo" data-i18n-placeholder="tr.name" autocomplete="name">
                <input class="tr-modal__input" type="text" name="empresa" required placeholder="Nome da empresa" data-i18n-placeholder="tr.company" autocomplete="organization">
                <input class="tr-modal__input" type="email" name="email" required placeholder="E-mail" data-i18n-placeholder="tr.email" autocomplete="email" inputmode="email">
                <input class="tr-modal__input" type="tel" name="telefone" required placeholder="WhatsApp com DDD" data-i18n-placeholder="tr.whatsapp" autocomplete="tel" inputmode="tel" style="margin-bottom:0;">

                <input class="tr-hp" type="text" name="hp" tabindex="-1" aria-hidden="true" autocomplete="off">
                <input type="hidden" name="ts" id="trainingTs">
            </div>

            <div class="tr-modal__foot">
                <p class="tr-modal__error" id="trainingError" role="alert"></p>
                <button type="submit" class="tr-modal__submit" id="trainingSubmit">
                    <i class="fa-solid fa-check" style="margin-right:8px;"></i>${i18nText('Confirmar inscrição', 'Confirm registration')}
                </button>
                <p class="tr-modal__legal">${i18nText('Gratuito. Você pode cancelar os lembretes quando quiser.', 'Free. You can cancel the reminders whenever you want.')}</p>
            </div>
        </form>
    </div>
</div>
`;
