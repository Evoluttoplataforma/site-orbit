// Bootcamp Orbit — Imersão Canais 13/06/2026
// VISUAL: Operação militar / guerra. Camuflagem, stencil, mira, dog tags, carimbo CLASSIFIED.
export const pageHTML = `
<style>
  /* ═══ TIPOGRAFIA STENCIL/MILITAR ═══ */
  @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Big+Shoulders+Stencil:wght@700;900&family=JetBrains+Mono:wght@500;700&display=swap');

  /* ═══ TOKENS ═══ */
  /* Verde camuflagem: #3D4127 dark, #4B5320 medium, #6B7339 light */
  /* Khaki/areia: #8B7355, #C2B280 */
  /* Vermelho perigo: #C73E1D, #8B0000 */
  /* Listras warning: amarelo #F5C518 + preto */
  /* Dourado Orbit: #ffba1a (mantém brand) */
  /* Base dark: #0A0E13 */

  .bc-page { background: #0A0E13; color: #E6E8EB; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; overflow-x: clip; width: 100%; max-width: 100vw; position: relative; }
  .bc-page * { box-sizing: border-box; }
  /* overflow-x: clip não cria contexto de scroll → sticky continua funcionando.
     overflow-x: hidden quebraria os elementos sticky abaixo. */
  html:has(body[data-bc="1"]), body[data-bc="1"] { overflow-x: clip !important; max-width: 100vw; }
  .bc-page section, .bc-page > div { max-width: 100vw; overflow-x: clip; }

  /* ═══ CURSOR MIRA — aplicado via body[data-bc] (do content.tsx) ═══ */
  body[data-bc="1"],
  body[data-bc="1"] * { cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><circle cx='20' cy='20' r='18' fill='none' stroke='%23ffba1a' stroke-width='2'/><circle cx='20' cy='20' r='10' fill='none' stroke='%23ffba1a' stroke-width='1.5'/><circle cx='20' cy='20' r='2' fill='%23ffba1a'/><line x1='20' y1='2' x2='20' y2='10' stroke='%23ffba1a' stroke-width='2'/><line x1='20' y1='30' x2='20' y2='38' stroke='%23ffba1a' stroke-width='2'/><line x1='2' y1='20' x2='10' y2='20' stroke='%23ffba1a' stroke-width='2'/><line x1='30' y1='20' x2='38' y2='20' stroke='%23ffba1a' stroke-width='2'/></svg>") 20 20, crosshair !important; }
  body[data-bc="1"] input,
  body[data-bc="1"] textarea,
  body[data-bc="1"] select { cursor: text !important; }
  body[data-bc="1"] a,
  body[data-bc="1"] button { cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><circle cx='20' cy='20' r='18' fill='%23ffba1a' fill-opacity='0.15' stroke='%23ffba1a' stroke-width='2.5'/><circle cx='20' cy='20' r='10' fill='none' stroke='%23ffba1a' stroke-width='2'/><circle cx='20' cy='20' r='3' fill='%23ffba1a'/><line x1='20' y1='2' x2='20' y2='10' stroke='%23ffba1a' stroke-width='2.5'/><line x1='20' y1='30' x2='20' y2='38' stroke='%23ffba1a' stroke-width='2.5'/><line x1='2' y1='20' x2='10' y2='20' stroke='%23ffba1a' stroke-width='2.5'/><line x1='30' y1='20' x2='38' y2='20' stroke='%23ffba1a' stroke-width='2.5'/></svg>") 20 20, pointer !important; }

  /* ═══ GLITCH effect em textos chave ═══ */
  .bc-glitch {
    position: relative;
    display: inline-block;
  }
  .bc-glitch::before, .bc-glitch::after {
    content: attr(data-text);
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
  }
  .bc-glitch::before {
    color: #C73E1D; transform: translate(-2px, 0); mix-blend-mode: screen;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    animation: bc-glitch-1 4s infinite steps(1);
  }
  .bc-glitch::after {
    color: #3FB950; transform: translate(2px, 0); mix-blend-mode: screen;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    animation: bc-glitch-2 4s infinite steps(1);
  }
  @keyframes bc-glitch-1 {
    0%, 100% { transform: translate(0, 0); }
    8% { transform: translate(-2px, -1px); }
    9% { transform: translate(0, 0); }
    96% { transform: translate(0, 0); }
    97% { transform: translate(-2px, 1px); }
    98% { transform: translate(2px, -1px); }
    99% { transform: translate(0, 0); }
  }
  @keyframes bc-glitch-2 {
    0%, 100% { transform: translate(0, 0); }
    8% { transform: translate(2px, 1px); }
    9% { transform: translate(0, 0); }
    96% { transform: translate(0, 0); }
    97% { transform: translate(2px, -1px); }
    98% { transform: translate(-2px, 1px); }
    99% { transform: translate(0, 0); }
  }

  /* ═══ SCANLINES no hero (overlay monitor CRT militar) ═══ */
  .bc-scanlines {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(0deg, rgba(255,186,26,0.04) 0px, rgba(255,186,26,0.04) 1px, transparent 1px, transparent 4px);
    pointer-events: none; z-index: 2;
    animation: bc-scan-move 8s linear infinite;
  }
  @keyframes bc-scan-move {
    from { background-position: 0 0; }
    to { background-position: 0 100px; }
  }
  .bc-stencil { font-family: 'Black Ops One', 'Big Shoulders Stencil', impact, sans-serif; letter-spacing: 0.02em; text-transform: uppercase; }
  .bc-mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

  /* Listras de perigo amarelo/preto */
  .bc-warning-stripes { height: 14px; background: repeating-linear-gradient(45deg, #F5C518 0 24px, #0A0E13 24px 48px); position: relative; overflow: hidden; }
  .bc-warning-stripes::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent 0 24px, rgba(0,0,0,0.15) 24px 48px); }

  /* ═══ TOP BAR fixa — alert + ticker grudados no topo ═══ */
  /* position: fixed é imune a overflow:clip/hidden em ancestrais (que quebram sticky).
     O .bc-topbar-spacer (altura medida via JS) compensa a altura pra não cobrir conteúdo. */
  .bc-topbar { position: fixed; top: 0; left: 0; right: 0; z-index: 200; }
  /* Mobile: NÃO fixa — a topbar rola junto com a página e o spacer some. */
  @media (max-width: 720px) {
    .bc-topbar { position: relative; }
    .bc-topbar-spacer { display: none !important; }
  }
  .bc-alert-bar {
    background: #C73E1D;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 13px; letter-spacing: 2px;
    border-bottom: 2px solid #000;
    display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;
    animation: bc-pulse-bg 2s ease-in-out infinite;
  }
  @keyframes bc-pulse-bg {
    0%, 100% { background: #C73E1D; }
    50% { background: #8B0000; }
  }
  .bc-alert-bar__siren { animation: bc-blink 1s steps(2) infinite; }
  @keyframes bc-blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0.2; } }

  /* ═══ NEWS TICKER rolando — logo abaixo do alert-bar, dentro da topbar fixa ═══ */
  .bc-ticker {
    background: #000;
    border-top: 1px solid #4B5320; border-bottom: 1px solid #4B5320;
    overflow: hidden;
    padding: 10px 0;
    position: relative; z-index: 1;
  }
  .bc-ticker::before, .bc-ticker::after {
    content: ''; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2;
  }
  .bc-ticker::before { left: 0; background: linear-gradient(90deg, #000, transparent); }
  .bc-ticker::after { right: 0; background: linear-gradient(-90deg, #000, transparent); }
  .bc-ticker__track {
    display: inline-block; white-space: nowrap;
    animation: bc-ticker-scroll 40s linear infinite;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; color: #6B7339;
    letter-spacing: 2px;
  }
  .bc-ticker__track span { margin: 0 30px; }
  .bc-ticker__track .bc-tick-hi { color: #ffba1a; font-weight: 700; }
  @keyframes bc-ticker-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* ═══ Carimbo rotacionado URGENTE ═══ */
  .bc-stamp {
    position: absolute;
    font-family: 'Black Ops One', impact, sans-serif;
    color: #C73E1D;
    border: 3px solid #C73E1D;
    padding: 6px 14px;
    font-size: 14px;
    letter-spacing: 3px;
    transform: rotate(-15deg);
    opacity: 0.85;
    pointer-events: none;
    background: rgba(199,62,29,0.05);
    text-transform: uppercase;
  }
  .bc-stamp--right { right: 20px; transform: rotate(12deg); }
  /* Mobile: esconde carimbos (ficavam sobre o titulo) */
  @media (max-width: 768px) { .bc-stamp { display: none; } }

  /* Pulse animation pra CTA */
  @keyframes bc-pulse-cta {
    0%, 100% { box-shadow: 6px 6px 0 #000, 0 0 0 0 rgba(255,186,26,0.7); }
    50% { box-shadow: 6px 6px 0 #000, 0 0 0 14px rgba(255,186,26,0); }
  }
  .bc-btn--pulse { animation: bc-pulse-cta 2.5s ease-out infinite; }

  /* Mira decorativa pulsando no hero */
  @keyframes bc-pulse-mira {
    0%, 100% { opacity: 0.20; transform: scale(1); }
    50% { opacity: 0.40; transform: scale(1.08); }
  }
  /* Bussola rotaciona lentamente */
  @keyframes bc-rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Esconde widgets globais do site nessa LP de evento (foco em conversao) */
  .whatsapp-widget,
  [class*="whatsapp"],
  #livePopupOverlay,
  .orbit-banner--popup-center,
  .orbit-banner--popup-side,
  .orbit-banner--floating-bottom { display: none !important; }

  /* ═══ TOAST de alistamentos fakes (canto inferior esquerdo) ═══ */
  .bc-toast {
    position: fixed; left: 16px; bottom: 16px;
    background: linear-gradient(135deg, rgba(43,57,40,0.96), rgba(13,17,23,0.96));
    border: 2px solid #ffba1a;
    box-shadow: 4px 4px 0 #000, 0 0 40px rgba(255,186,26,0.15);
    padding: 14px 18px 14px 14px;
    display: flex; align-items: center; gap: 12px;
    max-width: 320px;
    z-index: 200;
    transform: translateX(-120%);
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: 'JetBrains Mono', monospace;
  }
  .bc-toast.is-visible { transform: translateX(0); }
  .bc-toast__icon {
    width: 38px; height: 38px;
    background: #ffba1a; color: #0A0E13;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 18px;
    box-shadow: 2px 2px 0 #000;
  }
  .bc-toast__body { line-height: 1.35; }
  .bc-toast__title {
    color: #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 11px; letter-spacing: 1.5px;
    text-transform: uppercase; margin: 0 0 2px;
  }
  .bc-toast__text { color: #fff; font-size: 13px; margin: 0; font-weight: 600; }
  .bc-toast__text small { display: block; color: #8B7355; font-size: 10px; font-weight: 400; margin-top: 2px; }
  @media (max-width: 600px) { .bc-toast { max-width: calc(100% - 32px); left: 16px; right: 16px; bottom: 12px; } }

  /* ═══ HERO — full impact ═══ */
  .bc-hero { position: relative; padding: 110px 24px 90px; background: #0A0E13; overflow: hidden; min-height: 820px; display: flex; align-items: center; justify-content: center; }

  /* Background: camuflagem amarelo/preto esticada cover (fundo para header.png) */
  .bc-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url('/images/bootcamp/camuflagem.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
  }

  /* Overlay escuro FORTE + vinheta + grid tatico — pra valorizar as letras */
  .bc-hero::after {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at center, rgba(10,14,19,0.55) 0%, rgba(10,14,19,0.92) 100%),
      linear-gradient(rgba(245,197,24,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,197,24,0.04) 1px, transparent 1px);
    background-size: 100% 100%, 60px 60px, 60px 60px;
    pointer-events: none;
  }

  .bc-hero__inner { position: relative; max-width: 1080px; margin: 0 auto; text-align: center; z-index: 2; }

  /* Hero soldiers laterais removidos — soldados fullbody com fundo branco
     cobriam a camuflagem. Hero agora tem apenas camuflagem + SVG decorativos. */

  /* Tarja "OPERAÇÃO CLASSIFICADA" topo */
  .bc-hero__tarja {
    display: inline-flex; align-items: center; gap: 14px;
    padding: 8px 20px;
    background: #C73E1D;
    color: #fff;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 28px;
    border: 2px solid #fff;
    box-shadow: 0 0 0 2px #C73E1D, 4px 4px 0 #000;
    position: relative;
  }
  .bc-hero__tarja::before, .bc-hero__tarja::after { content: '★'; color: #fff; font-size: 14px; }

  /* Coordenadas + insígnia */
  .bc-hero__coord {
    color: #6B7339; font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 2px; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px; justify-content: center;
  }
  .bc-hero__coord::before, .bc-hero__coord::after { content: ''; height: 1px; width: 60px; background: #4B5320; }

  /* Insígnia central (5-star + ring) */
  .bc-hero__insignia { width: 96px; height: 96px; margin: 0 auto 24px; position: relative; }
  .bc-hero__insignia svg { width: 100%; height: 100%; }

  /* H1 GIGANTE estilo banner de guerra */
  .bc-hero h1 {
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: clamp(2.4rem, 6.5vw, 5rem);
    line-height: 0.95;
    color: #fff;
    margin: 0 0 24px;
    text-transform: uppercase;
    text-shadow: 4px 4px 0 #000, 0 0 30px rgba(0,0,0,0.6);
    letter-spacing: 0.01em;
  }
  .bc-hero h1 .accent { color: #ffba1a; display: inline-block; position: relative; }
  .bc-hero h1 .accent::before, .bc-hero h1 .accent::after { content: ''; position: absolute; top: 50%; width: 24px; height: 6px; background: #ffba1a; transform: translateY(-50%); }
  .bc-hero h1 .accent::before { left: -36px; }
  .bc-hero h1 .accent::after { right: -36px; }

  .bc-hero__sub {
    color: #C9D1D9; font-size: clamp(1.05rem, 1.6vw, 1.25rem);
    line-height: 1.55; max-width: 800px; margin: 0 auto 40px;
    font-weight: 500;
  }

  /* COUNTDOWN — dog tags estilo militar */
  .bc-countdown { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin: 0 auto 36px; max-width: 600px; }
  .bc-count {
    display: flex; flex-direction: column; align-items: center;
    min-width: 100px; padding: 18px 14px 14px;
    background: linear-gradient(180deg, #2F3318 0%, #0A0E13 100%);
    border: 2px solid #4B5320;
    position: relative;
  }
  .bc-count::before { content: ''; position: absolute; top: -2px; left: -2px; right: -2px; height: 4px; background: #ffba1a; }
  .bc-count::after { content: ''; position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 8px; height: 8px; border-radius: 50%; background: #0A0E13; border: 1px solid #6B7339; }
  .bc-count__num { font-family: 'Black Ops One', impact, sans-serif; font-size: 2.6rem; color: #ffba1a; line-height: 1; font-variant-numeric: tabular-nums; margin-top: 16px; text-shadow: 2px 2px 0 #000; }
  .bc-count__lbl { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #8B7355; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; margin-top: 8px; }
  /* Mobile: 4 colunas estreitas (todos juntos numa linha) */
  @media (max-width: 600px) {
    .bc-countdown {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px; max-width: none; padding: 0 4px;
    }
    .bc-count { min-width: 0; padding: 10px 4px 8px; }
    .bc-count__num { font-size: 1.4rem; margin-top: 10px; }
    .bc-count__lbl { font-size: 8px; letter-spacing: 1.5px; }
  }

  /* CTAs com mira */
  .bc-hero__ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin: 0 auto 36px; }
  .bc-btn {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 18px 32px;
    border-radius: 0;
    font-family: 'Black Ops One', impact, sans-serif;
    font-weight: 400; font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase; text-decoration: none;
    transition: all 0.2s;
    border: 3px solid transparent; cursor: pointer;
    position: relative;
  }
  .bc-btn--primary {
    background: #ffba1a; color: #0A0E13;
    border-color: #ffba1a;
    box-shadow: 6px 6px 0 #000;
  }
  .bc-btn--primary:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #000; }
  .bc-btn--ghost { background: transparent; color: #fff; border-color: rgba(255,255,255,0.40); }
  .bc-btn--ghost:hover { border-color: #ffba1a; color: #ffba1a; box-shadow: 6px 6px 0 rgba(255,186,26,0.30); }
  .bc-btn .bc-crosshair { width: 18px; height: 18px; }

  /* ═══ ROSTER (contador inscritos) ═══ */
  .bc-roster {
    max-width: 520px; margin: 28px auto 28px;
    padding: 16px 22px;
    background: linear-gradient(135deg, rgba(255,186,26,0.10), rgba(199,62,29,0.06));
    border: 2px solid #ffba1a;
    text-align: center;
    box-shadow: 4px 4px 0 #000;
  }
  .bc-roster__label {
    display: block; color: #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    margin-bottom: 6px;
  }
  .bc-roster__num {
    display: block; color: #fff;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 2rem; line-height: 1; letter-spacing: -0.02em;
    text-shadow: 2px 2px 0 #000;
    margin-bottom: 12px;
  }
  .bc-roster__num small { font-size: 0.7rem; color: #8B7355; font-weight: 400; letter-spacing: 1px; margin-left: 4px; }
  .bc-roster__bar { height: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4B5320; overflow: hidden; }
  .bc-roster__bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #ffba1a, #ff8c00);
    transition: width 1.5s ease-out;
    box-shadow: 0 0 12px rgba(255,186,26,0.6);
  }

  /* ═══ HOVER DOSSIE — missões abrindo ═══ */
  .bc-mission { perspective: 800px; transform-style: preserve-3d; }
  .bc-mission { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s; }
  .bc-mission:hover {
    transform: translateY(-6px) rotateX(-2deg);
    border-color: #ffba1a;
    box-shadow: 0 16px 36px rgba(255,186,26,0.20), inset 0 0 0 1px rgba(255,186,26,0.30);
  }
  .bc-mission::after {
    transition: opacity 0.3s, transform 0.4s;
  }
  .bc-mission:hover::after {
    opacity: 1;
    transform: rotate(45deg) scale(1.15);
  }

  .bc-hero__chips { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 14px; }
  .bc-chip {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 10px 16px;
    background: rgba(43,57,40,0.40);
    border: 1px solid #4B5320;
    font-size: 13px; color: #C9D1D9;
    font-family: 'JetBrains Mono', monospace;
  }
  .bc-chip i { color: #ffba1a; font-size: 14px; }
  .bc-chip strong { color: #fff; font-weight: 700; }

  /* ═══ PROMESSA — 5 missões ═══ */
  .bc-promise { padding: 90px 24px; background: #0A0E13; position: relative; overflow: hidden; }
  .bc-promise::before {
    content: ''; position: absolute; inset: 0;
    background-image: url('/images/bootcamp/camuflagem.webp');
    background-size: cover; background-position: center;
    opacity: 0.18;
    pointer-events: none;
  }
  .bc-promise > * { position: relative; z-index: 1; }
  .bc-promise__head { text-align: center; max-width: 820px; margin: 0 auto 56px; position: relative; z-index: 1; }
  .bc-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 8px 18px;
    background: rgba(255,186,26,0.08);
    border: 1px solid #ffba1a;
    color: #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  }
  .bc-eyebrow i { font-size: 11px; }
  .bc-h2 {
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    line-height: 1.05; color: #fff;
    margin: 22px 0 18px; text-transform: uppercase;
    text-shadow: 3px 3px 0 #000;
  }
  .bc-h2 .accent { color: #ffba1a; }
  .bc-lead { color: #C9D1D9; font-size: 1.1rem; line-height: 1.65; max-width: 760px; margin: 0 auto; }

  .bc-promise__grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  @media (max-width: 1024px) { .bc-promise__grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .bc-promise__grid { grid-template-columns: 1fr; } }

  /* Cada bloco = dossiê de missão */
  .bc-mission {
    background: linear-gradient(180deg, rgba(75,83,32,0.18) 0%, rgba(13,17,23,0.95) 100%);
    border: 2px solid #4B5320;
    padding: 24px 20px 22px;
    position: relative;
    transition: all 0.25s;
  }
  .bc-mission::before {
    content: 'MISSÃO';
    position: absolute; top: -1px; left: -1px;
    background: #ffba1a; color: #0A0E13;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 9px; letter-spacing: 1.5px;
    padding: 3px 10px;
  }
  .bc-mission::after {
    content: ''; position: absolute;
    top: 14px; right: 14px;
    width: 22px; height: 22px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffba1a' stroke-width='1.5'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Cline x1='12' y1='2' x2='12' y2='22'/%3E%3Cline x1='2' y1='12' x2='22' y2='12'/%3E%3C/svg%3E") center/contain no-repeat;
    opacity: 0.5;
  }
  .bc-mission:hover { border-color: #ffba1a; transform: translateY(-4px); }
  .bc-mission:hover::after { opacity: 1; }
  .bc-mission__num {
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 3.2rem; color: rgba(255,186,26,0.55);
    line-height: 1; letter-spacing: -0.02em;
    margin: 18px 0 12px;
  }
  .bc-mission__title {
    font-family: 'Black Ops One', impact, sans-serif;
    color: #ffba1a; font-size: 1rem;
    text-transform: uppercase; letter-spacing: 1px;
    margin: 0 0 12px; padding-bottom: 12px;
    border-bottom: 1px dashed #4B5320;
  }
  .bc-mission__desc { color: #C9D1D9; font-size: 0.92rem; line-height: 1.55; margin: 0; }

  /* ═══ HOSTS — Oficiais Comandantes ═══ */
  .bc-hosts { padding: 90px 24px; background: linear-gradient(180deg, #0F1410 0%, #0A0E13 100%); border-top: 4px double #4B5320; border-bottom: 4px double #4B5320; position: relative; overflow: hidden; }
  .bc-hosts::before {
    content: ''; position: absolute; inset: 0;
    background-image: url('/images/bootcamp/bg-hero.webp');
    background-size: cover; background-position: center;
    opacity: 0.12;
    pointer-events: none;
  }
  .bc-hosts > * { position: relative; z-index: 1; }
  .bc-hosts__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; max-width: 1100px; margin: 40px auto 0; }
  @media (max-width: 800px) { .bc-hosts__grid { grid-template-columns: 1fr; } }
  .bc-host {
    background: rgba(43,57,40,0.30);
    border: 2px solid #4B5320;
    padding: 32px 28px;
    display: flex; gap: 22px; align-items: flex-start;
    position: relative;
  }
  .bc-host::before {
    content: '★ OFICIAL COMANDANTE ★';
    position: absolute; top: -1px; left: -1px; right: -1px;
    background: linear-gradient(90deg, #4B5320 0%, #6B7339 50%, #4B5320 100%);
    color: #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 10px; letter-spacing: 2px;
    padding: 4px 12px; text-align: center;
  }
  /* Mobile: host vira coluna (foto em cima centralizada, texto embaixo) */
  @media (max-width: 600px) {
    .bc-host { flex-direction: column; align-items: center; text-align: center; padding: 40px 24px 28px; }
    .bc-host__photo { margin-top: 8px; width: 160px; height: 200px; }
    .bc-host__content { margin-top: 8px; }
    .bc-host__role { font-size: 10px; }
    .bc-host__rank { justify-content: center; }
  }
  .bc-host__photo {
    width: 140px; height: 180px;
    background: linear-gradient(135deg, #4B5320, #2F3318);
    border: 3px solid #ffba1a;
    display: flex; align-items: center; justify-content: center;
    color: #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 2rem; flex-shrink: 0;
    box-shadow: 4px 4px 0 #000;
    margin-top: 18px;
    overflow: hidden;
  }
  .bc-host__photo--img { padding: 0; }
  .bc-host__photo--img img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
  .bc-host__content { margin-top: 18px; }
  .bc-host__name {
    color: #fff;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 1.4rem; margin: 0 0 4px;
    text-transform: uppercase; letter-spacing: 1px;
  }
  .bc-host__role {
    color: #ffba1a;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1.5px;
    margin: 0 0 14px;
  }
  .bc-host__bio { color: #C9D1D9; font-size: 0.95rem; line-height: 1.6; margin: 0; }

  /* Selo patente — 4 estrelas */
  .bc-host__rank { display: inline-flex; gap: 4px; color: #ffba1a; font-size: 14px; margin-top: 12px; }

  /* ═══ DEPOIMENTOS — comunicados de campo ═══ */
  .bc-testi { padding: 90px 24px; background: #0A0E13; position: relative; overflow: hidden; }
  .bc-testi::before {
    content: ''; position: absolute; inset: 0;
    background-image: url('/images/bootcamp/camuflagem.webp');
    background-size: cover; background-position: center;
    opacity: 0.15;
    pointer-events: none;
  }
  .bc-testi > * { position: relative; z-index: 1; }
  .bc-testi__head { text-align: center; max-width: 800px; margin: 0 auto 40px; position: relative; z-index: 1; }
  .bc-testi__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  @media (max-width: 1024px) { .bc-testi__grid { grid-template-columns: repeat(2, 1fr); } }
  /* Mobile: carrossel horizontal com snap (em vez de stack) */
  @media (max-width: 700px) {
    .bc-testi__grid {
      display: flex;
      grid-template-columns: none;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      gap: 14px;
      padding: 4px 20px 20px;
      margin: 0 -20px;
      scrollbar-width: none;
    }
    .bc-testi__grid::-webkit-scrollbar { display: none; }
    .bc-testi-card {
      flex: 0 0 78%;
      scroll-snap-align: center;
    }
  }
  /* Hint visual: setinha "deslize →" no mobile */
  .bc-testi__hint { display: none; text-align: center; color: #ffba1a; font-family: 'JetBrains Mono', monospace; font-size: 11px; margin-top: 14px; letter-spacing: 2px; opacity: 0.7; }
  @media (max-width: 700px) { .bc-testi__hint { display: block; } }
  .bc-testi-card {
    background: linear-gradient(180deg, rgba(75,83,32,0.20), rgba(13,17,23,0.95));
    border: 2px solid #4B5320;
    position: relative;
    transition: all 0.25s;
    overflow: hidden;
  }
  .bc-testi-card:hover { border-color: #ffba1a; transform: translateY(-3px); }
  .bc-testi-card::before {
    content: 'COMUNICADO';
    position: absolute; top: 0; left: 0;
    background: #6B7339; color: #0A0E13;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 9px; letter-spacing: 1.5px;
    padding: 4px 10px; z-index: 2;
  }
  .bc-testi-card__video { aspect-ratio: 9/16; width: 100%; background: #000; display: block; }
  .bc-testi-card__video iframe { width: 100%; height: 100%; border: 0; display: block; }
  .bc-testi-card__info { padding: 14px 16px 16px; border-top: 1px solid #4B5320; }
  .bc-testi-card__name { color: #fff; font-family: 'Black Ops One', impact, sans-serif; font-size: 1rem; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.8px; }
  .bc-testi-card__company { color: #ffba1a; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }

  /* ═══ FORMATO — Posto de Combate vs Quartel Remoto ═══ */
  .bc-format { padding: 90px 24px; background: linear-gradient(180deg, #0A0E13 0%, #0F1410 100%); position: relative; overflow: hidden; }
  .bc-format::before {
    content: ''; position: absolute; inset: 0;
    background-image: url('/images/bootcamp/bg-hero.webp');
    background-size: cover; background-position: center;
    opacity: 0.10;
    pointer-events: none;
  }
  .bc-format > * { position: relative; z-index: 1; }
  .bc-format__head { text-align: center; max-width: 800px; margin: 0 auto 40px; }
  .bc-format__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 1000px; margin: 0 auto; }
  @media (max-width: 800px) { .bc-format__grid { grid-template-columns: 1fr; } }
  .bc-fmt {
    background: rgba(43,57,40,0.30);
    border: 2px solid #4B5320;
    padding: 38px 30px 32px;
    position: relative;
    transition: all 0.25s;
  }
  .bc-fmt--featured {
    border-color: #ffba1a;
    background: linear-gradient(180deg, rgba(255,186,26,0.06) 0%, rgba(43,57,40,0.30) 100%);
  }
  .bc-fmt--featured::before {
    content: '★ RECOMENDADO ★';
    position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
    background: #ffba1a; color: #0A0E13;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 11px; padding: 6px 16px;
    letter-spacing: 2px;
    box-shadow: 3px 3px 0 #000;
  }
  .bc-fmt__icon { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: rgba(255,186,26,0.12); border: 2px solid #ffba1a; color: #ffba1a; font-size: 1.5rem; margin-bottom: 18px; }
  .bc-fmt__label { color: #8B7355; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; margin: 0 0 6px; }
  .bc-fmt__name {
    color: #fff;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 1.6rem; margin: 0 0 18px;
    text-transform: uppercase; letter-spacing: 1px;
  }
  .bc-fmt__price {
    color: #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 2.6rem; margin: 0 0 4px;
    text-shadow: 3px 3px 0 #000;
  }
  .bc-fmt__price small { font-size: 0.9rem; color: #8B7355; font-weight: 600; letter-spacing: 0; text-transform: none; margin-left: 4px; font-family: 'Plus Jakarta Sans', sans-serif; }
  .bc-fmt__free { color: #3FB950; font-family: 'Black Ops One', impact, sans-serif; font-size: 2.4rem; margin: 0 0 4px; text-shadow: 3px 3px 0 #000; }
  .bc-fmt__desc { color: #C9D1D9; font-size: 0.95rem; line-height: 1.55; margin: 14px 0 22px; }
  .bc-fmt__features { list-style: none; padding: 0; margin: 0 0 24px; }
  .bc-fmt__features li { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; color: #C9D1D9; font-size: 0.95rem; border-bottom: 1px dashed rgba(107,115,57,0.40); }
  .bc-fmt__features li:last-child { border-bottom: none; }
  .bc-fmt__features li i { color: #3FB950; font-size: 13px; margin-top: 5px; flex-shrink: 0; }

  /* ═══ PRÉ-REQUISITO — alerta máximo ═══ */
  .bc-prereq { padding: 50px 24px; background: #0A0E13; }
  .bc-prereq__box {
    max-width: 920px; margin: 0 auto;
    background: linear-gradient(135deg, rgba(199,62,29,0.10), rgba(199,62,29,0.04));
    border: 2px solid #C73E1D;
    padding: 0;
    position: relative;
  }
  /* Listras de perigo no topo */
  .bc-prereq__box::before {
    content: ''; display: block; height: 10px;
    background: repeating-linear-gradient(45deg, #C73E1D 0 18px, #0A0E13 18px 36px);
  }
  .bc-prereq__content { padding: 26px 32px; display: flex; gap: 22px; align-items: flex-start; }
  /* Mobile: ícone em cima, texto abaixo alinhado */
  @media (max-width: 600px) {
    .bc-prereq__content { flex-direction: column; align-items: center; text-align: center; padding: 24px 22px; }
    .bc-prereq__stamp { margin: 0 auto 8px; }
    .bc-prereq__title { text-align: center; }
  }
  .bc-prereq__stamp {
    width: 76px; height: 76px;
    background: #C73E1D;
    border: 3px solid #fff;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 32px;
    box-shadow: 4px 4px 0 #000;
    flex-shrink: 0;
  }
  .bc-prereq__title {
    color: #fff;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 1.1rem; margin: 0 0 10px;
    text-transform: uppercase; letter-spacing: 1.5px;
  }
  .bc-prereq__title .accent { color: #ffba1a; }
  .bc-prereq__text { color: #C9D1D9; font-size: 0.95rem; line-height: 1.6; margin: 0; }
  .bc-prereq__text strong { color: #fff; }

  /* ═══ TOAST CONTAINER ═══ */
  .bc-toast-anchor { position: fixed; left: 16px; bottom: 16px; z-index: 200; }

  /* ═══ FORM CHAT — Igor entrevista o recruta ═══ */
  .bc-chat {
    max-width: 640px; margin: 0 auto;
    background: linear-gradient(180deg, rgba(43,57,40,0.40) 0%, rgba(13,17,23,0.95) 100%);
    border: 2px solid #4B5320;
    overflow: hidden;
    display: flex; flex-direction: column;
    min-height: 540px;
  }
  .bc-chat__head {
    background: #4B5320;
    color: #ffba1a;
    padding: 12px 18px;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 11px; letter-spacing: 2px;
    text-align: center; text-transform: uppercase;
    border-bottom: 2px solid #0A0E13;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .bc-chat__head .live-dot { width: 8px; height: 8px; background: #3FB950; border-radius: 50%; box-shadow: 0 0 8px #3FB950; animation: bc-blink 1.5s steps(2) infinite; }
  .bc-chat__body {
    flex: 1;
    padding: 24px 20px;
    display: flex; flex-direction: column; gap: 14px;
    /* sem overflow interno — o chat cresce e a página rola */
  }
  .bc-msg { display: flex; gap: 10px; align-items: flex-end; opacity: 0; transform: translateY(8px); animation: bc-msg-in 0.4s ease-out forwards; }
  @keyframes bc-msg-in { to { opacity: 1; transform: translateY(0); } }
  .bc-msg__avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #4B5320, #2F3318);
    overflow: hidden; flex-shrink: 0;
    border: 2px solid #ffba1a;
  }
  .bc-msg__avatar img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
  .bc-msg__bubble {
    background: #161B22;
    color: #fff; padding: 12px 16px;
    max-width: 78%;
    border-radius: 4px 14px 14px 14px;
    font-size: 14px; line-height: 1.5;
    border-left: 3px solid #ffba1a;
  }
  .bc-msg--user { flex-direction: row-reverse; }
  .bc-msg--user .bc-msg__bubble {
    background: rgba(255,186,26,0.12);
    color: #ffba1a; font-weight: 700;
    border-radius: 14px 4px 14px 14px;
    border-left: none; border-right: 3px solid #ffba1a;
  }
  .bc-msg--user .bc-msg__avatar {
    background: #ffba1a; border-color: #fff;
    display: flex; align-items: center; justify-content: center;
    color: #0A0E13; font-family: 'Black Ops One', impact, sans-serif; font-size: 14px;
  }
  .bc-typing {
    display: inline-flex; gap: 4px;
  }
  .bc-typing span { width: 6px; height: 6px; background: #ffba1a; border-radius: 50%; animation: bc-typing 1.2s ease-in-out infinite; }
  .bc-typing span:nth-child(2) { animation-delay: 0.2s; }
  .bc-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bc-typing { 0%, 100% { opacity: 0.3; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-3px); } }

  .bc-chat__input-area {
    border-top: 2px solid #4B5320;
    padding: 14px 16px;
    background: rgba(10,14,19,0.85);
    display: flex; gap: 10px;
  }
  .bc-chat__input {
    flex: 1; padding: 12px 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid #4B5320;
    color: #fff; font-size: 15px;
    font-family: 'JetBrains Mono', monospace;
    outline: none; transition: border 0.2s;
  }
  .bc-chat__input:focus { border-color: #ffba1a; }
  .bc-chat__input::placeholder { color: #4B5320; }
  .bc-chat__send {
    padding: 12px 20px;
    background: #ffba1a; color: #0A0E13;
    border: 2px solid #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 12px; letter-spacing: 1.5px;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.2s;
  }
  .bc-chat__send:hover { background: #ff8c00; }
  .bc-chat__send:disabled { opacity: 0.5; cursor: not-allowed; }
  .bc-chat__choices { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 16px 0; }
  .bc-chat__choice {
    padding: 10px 16px;
    background: rgba(255,186,26,0.10);
    border: 2px solid #ffba1a;
    color: #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 12px; letter-spacing: 1px;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.2s; flex: 1; min-width: 140px;
  }
  .bc-chat__choice:hover { background: #ffba1a; color: #0A0E13; }
  .bc-chat__progress {
    height: 4px; background: rgba(255,255,255,0.05);
    overflow: hidden;
  }
  .bc-chat__progress-bar {
    height: 100%; background: linear-gradient(90deg, #ffba1a, #ff8c00);
    transition: width 0.5s ease;
  }
  /* Chat mobile — trava largura, impede overflow do input row.
     Breakpoint 768px (cobre a faixa 600–768 onde o chat de 640px estourava). */
  @media (max-width: 768px) {
    .bc-form-sec { padding: 50px 12px; box-sizing: border-box; max-width: 100vw; overflow-x: clip; }
    .bc-form-sec__head { padding-left: 4px; padding-right: 4px; }
    .bc-chat {
      max-width: 100%;
      width: 100%;
      min-width: 0;
      min-height: 380px;
      box-sizing: border-box;
    }
    .bc-chat__body { padding: 14px 10px; min-width: 0; box-sizing: border-box; }
    .bc-chat__head { font-size: 10px; padding: 10px 12px; }
    .bc-msg { gap: 6px; min-width: 0; max-width: 100%; }
    .bc-msg__avatar { width: 28px; height: 28px; border-width: 1.5px; }
    .bc-msg__bubble {
      padding: 9px 11px; font-size: 13px;
      max-width: calc(100% - 36px); /* desconta avatar + gap */
      min-width: 0;
      word-break: break-word; overflow-wrap: anywhere;
    }
    /* Linha do input — trava em 100% e força ENVIAR a não crescer */
    .bc-chat__input-area {
      padding: 10px; gap: 6px;
      width: 100%; max-width: 100%; min-width: 0;
      box-sizing: border-box; align-items: stretch;
    }
    .bc-chat__input {
      flex: 1 1 0; min-width: 0; width: 100%;
      font-size: 14px; padding: 10px 10px;
      box-sizing: border-box;
    }
    .bc-chat__send {
      flex: 0 0 auto;
      padding: 10px 12px; font-size: 11px;
      white-space: nowrap;
    }
    .bc-chat__choices { padding: 10px; gap: 6px; }
    .bc-chat__choice {
      font-size: 11px; padding: 8px 10px;
      min-width: 0; flex: 1 1 calc(50% - 6px);
      word-break: break-word;
    }
  }

  /* ═══ FORM — RECRUTAMENTO (FORM TRADICIONAL — fallback escondido) ═══ */
  .bc-form-sec { padding: 90px 24px; background: linear-gradient(180deg, #0F1410 0%, #0A0E13 100%); position: relative; overflow: hidden; }
  .bc-form-sec::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 14px;
    background: repeating-linear-gradient(45deg, #F5C518 0 24px, #0A0E13 24px 48px);
  }
  /* Mapa tatico decorativo atras */
  .bc-form-sec::after {
    content: ''; position: absolute; inset: 14px 0 0 0;
    background-image: url('/images/bootcamp/mapa-tatico.webp');
    background-size: cover; background-position: center;
    opacity: 0.10; pointer-events: none;
  }
  .bc-form-sec > * { position: relative; z-index: 1; }
  .bc-form-sec__head { text-align: center; max-width: 760px; margin: 0 auto 36px; }
  .bc-form {
    max-width: 640px; margin: 0 auto;
    background: linear-gradient(180deg, rgba(43,57,40,0.40) 0%, rgba(13,17,23,0.95) 100%);
    border: 2px solid #4B5320;
    padding: 0;
    position: relative;
  }
  .bc-form::before {
    content: '◢ FORMULÁRIO DE RECRUTAMENTO ◣';
    display: block;
    background: #4B5320; color: #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 11px; padding: 10px 16px; text-align: center;
    letter-spacing: 2px;
  }
  .bc-form__inner { padding: 32px 30px 30px; }
  .bc-form__label {
    display: block; color: #ffba1a;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 700;
    margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1.5px;
  }
  .bc-form__label::before { content: '> '; color: #6B7339; }
  .bc-form__label--req::after { content: '_'; color: #C73E1D; animation: bc-blink-caret 1s steps(2) infinite; margin-left: 4px; }
  @keyframes bc-blink-caret { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
  .bc-form__input {
    width: 100%; padding: 14px 16px;
    background: rgba(10,14,19,0.85);
    border: 1px solid #4B5320;
    color: #fff; font-size: 15px;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 20px; transition: all 0.2s;
    box-sizing: border-box;
  }
  .bc-form__input:focus { outline: none; border-color: #ffba1a; box-shadow: 0 0 0 1px #ffba1a; background: rgba(10,14,19,0.95); }
  .bc-form__input::placeholder { color: #4B5320; }
  .bc-form__textarea { min-height: 90px; resize: vertical; font-family: 'Plus Jakarta Sans', sans-serif; }

  .bc-modality { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  @media (max-width: 500px) { .bc-modality { grid-template-columns: 1fr; } }
  .bc-modality__opt {
    display: block; padding: 18px 16px;
    background: rgba(10,14,19,0.85);
    border: 2px solid #4B5320;
    cursor: pointer; transition: all 0.2s;
    position: relative;
  }
  .bc-modality__opt input { display: none; }
  .bc-modality__opt:hover { border-color: #6B7339; }
  .bc-modality__opt.is-selected { border-color: #ffba1a; background: rgba(255,186,26,0.06); }
  .bc-modality__opt.is-selected::after { content: '✓'; position: absolute; top: 8px; right: 12px; color: #ffba1a; font-weight: 900; font-size: 18px; }
  .bc-modality__title {
    display: flex; align-items: center; gap: 8px;
    color: #fff;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 0.95rem; margin-bottom: 4px;
    text-transform: uppercase; letter-spacing: 1px;
  }
  .bc-modality__title i { color: #ffba1a; font-size: 14px; }
  .bc-modality__sub { color: #8B7355; font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1.4; }

  .bc-form__submit {
    width: 100%; margin-top: 12px; padding: 20px 28px;
    background: #ffba1a; color: #0A0E13;
    border: 3px solid #ffba1a;
    border-radius: 0;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 15px; cursor: pointer;
    transition: all 0.2s; letter-spacing: 2px;
    text-transform: uppercase;
    box-shadow: 6px 6px 0 #000;
  }
  .bc-form__submit:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #000; }
  .bc-form__submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: 6px 6px 0 #000; }
  .bc-form__error { color: #C73E1D; font-size: 0.9rem; margin: 10px 0 0; display: none; background: rgba(199,62,29,0.10); padding: 10px 14px; border: 1px solid #C73E1D; font-family: 'JetBrains Mono', monospace; }
  .bc-form__error.show { display: block; }
  .bc-form__success { display: none; text-align: center; padding: 50px 24px; background: rgba(43,57,40,0.40); border: 2px solid #3FB950; }
  .bc-form__success.show { display: block; }
  .bc-form__success i { font-size: 3.5rem; color: #3FB950; margin-bottom: 18px; }
  .bc-form__success h3 { color: #fff; font-family: 'Black Ops One', impact, sans-serif; font-size: 1.5rem; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1.5px; }
  .bc-form__success p { color: #C9D1D9; margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; }

  .bc-form__foot { text-align: center; color: #8B7355; font-family: 'JetBrains Mono', monospace; font-size: 11px; margin: 20px 0 0; letter-spacing: 1px; }
</style>

<!-- ═══ TOP BAR FIXA (alert + ticker) ═══ -->
<div class="bc-topbar">
<!-- ═══ ALERT BAR ═══ -->
<div class="bc-alert-bar">
  <span class="bc-alert-bar__siren">🚨</span>
  <span>ALISTAMENTO ABERTO · <span id="bcAlertDays">--</span> DIAS RESTANTES · VAGAS LIMITADAS</span>
  <span class="bc-alert-bar__siren">🚨</span>
</div>

<!-- ═══ NEWS TICKER ═══ -->
<div class="bc-ticker">
  <div class="bc-ticker__track">
    <span>▶ <span class="bc-tick-hi">TRANSMISSÃO TÁTICA</span> · COORDENADAS CONFIRMADAS LAT -27.5954 LON -48.5480</span>
    <span>▶ <span class="bc-tick-hi">ZONA DE OPERAÇÃO</span> SQUARE SC · ZULU-03</span>
    <span>▶ <span class="bc-tick-hi">CONVOCAÇÃO ATIVA</span> EXCLUSIVA PARA CANAIS ORBIT</span>
    <span>▶ DATA: <span class="bc-tick-hi">13 JUN 2026 · 09H BRT</span></span>
    <span>▶ MISSÃO: <span class="bc-tick-hi">BLINDAR OPERAÇÃO 2º SEMESTRE</span></span>
    <span>▶ <span class="bc-tick-hi">5 OBJETIVOS TÁTICOS</span> · ATRAÇÃO · CONVERSÃO · PRODUTIZAÇÃO · PRECIFICAÇÃO · ATENDIMENTO</span>
    <span>▶ <span class="bc-tick-hi">PRÉ-REQUISITO</span> AGENTE DE ATIVAÇÃO CONCLUÍDO</span>
    <!-- Duplica pra loop infinito -->
    <span>▶ <span class="bc-tick-hi">TRANSMISSÃO TÁTICA</span> · COORDENADAS CONFIRMADAS LAT -27.5954 LON -48.5480</span>
    <span>▶ <span class="bc-tick-hi">ZONA DE OPERAÇÃO</span> SQUARE SC · ZULU-03</span>
    <span>▶ <span class="bc-tick-hi">CONVOCAÇÃO ATIVA</span> EXCLUSIVA PARA CANAIS ORBIT</span>
    <span>▶ DATA: <span class="bc-tick-hi">13 JUN 2026 · 09H BRT</span></span>
    <span>▶ MISSÃO: <span class="bc-tick-hi">BLINDAR OPERAÇÃO 2º SEMESTRE</span></span>
    <span>▶ <span class="bc-tick-hi">5 OBJETIVOS TÁTICOS</span> · ATRAÇÃO · CONVERSÃO · PRODUTIZAÇÃO · PRECIFICAÇÃO · ATENDIMENTO</span>
    <span>▶ <span class="bc-tick-hi">PRÉ-REQUISITO</span> AGENTE DE ATIVAÇÃO CONCLUÍDO</span>
  </div>
</div>
</div>
<!-- Spacer: compensa a altura da topbar fixa (medido via JS no content.tsx) -->
<div class="bc-topbar-spacer" aria-hidden="true"></div>

<!-- ═══ HERO ═══ -->
<section class="bc-hero">
  <div class="bc-scanlines"></div>
  <!-- Helicoptero SVG GRANDE (topo direito) -->
  <svg style="position:absolute;right:4%;top:14%;width:240px;height:auto;opacity:0.30;pointer-events:none;z-index:1;" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" fill="#ffba1a">
    <ellipse cx="60" cy="50" rx="35" ry="9"/>
    <rect x="55" y="58" width="10" height="14"/>
    <rect x="95" y="48" width="20" height="4"/>
    <rect x="20" y="22" width="80" height="3"/>
    <rect x="58" y="20" width="4" height="30"/>
    <line x1="20" y1="22" x2="20" y2="32" stroke="#ffba1a" stroke-width="2"/>
    <line x1="100" y1="22" x2="100" y2="32" stroke="#ffba1a" stroke-width="2"/>
  </svg>

  <!-- Bussola militar (topo esquerdo, sutil rotacao) -->
  <img src="/images/bootcamp/bussola.webp" alt="" style="position:absolute;left:4%;top:18%;width:180px;height:auto;opacity:0.55;pointer-events:none;z-index:1;animation:bc-rotate-slow 60s linear infinite;" loading="eager">

  <!-- Tanque SVG GRANDE (canto inferior esquerdo) -->
  <svg style="position:absolute;left:3%;bottom:50px;width:280px;height:auto;opacity:0.28;pointer-events:none;z-index:1;" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" fill="#ffba1a">
    <rect x="10" y="50" width="100" height="18" rx="2"/>
    <rect x="20" y="38" width="60" height="16" rx="2"/>
    <rect x="78" y="42" width="40" height="6"/>
    <circle cx="20" cy="70" r="6"/>
    <circle cx="40" cy="70" r="6"/>
    <circle cx="60" cy="70" r="6"/>
    <circle cx="80" cy="70" r="6"/>
    <circle cx="100" cy="70" r="6"/>
    <rect x="38" y="32" width="6" height="8" rx="1"/>
  </svg>


  <!-- Estrelas militares espalhadas -->
  <svg style="position:absolute;right:18%;top:38%;width:60px;height:60px;opacity:0.22;pointer-events:none;z-index:1;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#ffba1a">
    <polygon points="50,5 61,38 96,38 67,58 78,92 50,72 22,92 33,58 4,38 39,38"/>
  </svg>
  <svg style="position:absolute;left:20%;top:42%;width:42px;height:42px;opacity:0.18;pointer-events:none;z-index:1;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#ffba1a">
    <polygon points="50,5 61,38 96,38 67,58 78,92 50,72 22,92 33,58 4,38 39,38"/>
  </svg>
  <svg style="position:absolute;right:30%;bottom:90px;width:36px;height:36px;opacity:0.16;pointer-events:none;z-index:1;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#ffba1a">
    <polygon points="50,5 61,38 96,38 67,58 78,92 50,72 22,92 33,58 4,38 39,38"/>
  </svg>

  <!-- Granada SVG (decoracao extra topo central) -->
  <svg style="position:absolute;left:50%;top:30%;transform:translateX(-50%);width:34px;height:auto;opacity:0;pointer-events:none;z-index:1;" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg" fill="#ffba1a">
    <ellipse cx="20" cy="36" rx="14" ry="18"/>
    <rect x="16" y="10" width="8" height="12"/>
    <rect x="12" y="6" width="16" height="4"/>
  </svg>

<!-- Igor e Chris fullbody REMOVIDOS do hero (fundo branco cobria a camuflagem).
       Eles continuam na secao Alto Comando com foto meio corpo fardado. -->

  <div class="bc-hero__inner">

    <div class="bc-hero__tarja">CLASSIFICADO · OPERAÇÃO BC-260613</div>

    <div class="bc-hero__coord">LAT -27.5954 · LON -48.5480 · SQUARE SC · ZULU-03</div>

    <!-- Carimbo MISSAO APROVADA (substitui insignia da estrela) -->
    <img src="/images/bootcamp/missao-aprovada.webp" alt="Missão Aprovada" style="display:block;max-width:340px;width:80%;height:auto;margin:0 auto;filter:drop-shadow(6px 6px 0 rgba(0,0,0,0.5));transform:rotate(-4deg);" loading="eager">

    <!-- Badge VOCE FOI CONVOCADO -->
    <div style="display:inline-block;background:#0A0E13;border:3px dashed #ffba1a;color:#ffba1a;font-family:'Black Ops One',impact,sans-serif;font-size:14px;letter-spacing:4px;padding:10px 24px;margin:14px 0 18px;text-transform:uppercase;transform:rotate(-1deg);">★ VOCÊ FOI CONVOCADO ★</div>

    <h1>Prepare sua consultoria para a <span class="accent bc-glitch" data-text="guerra">guerra</span> do 2º semestre</h1>
    <p class="bc-hero__sub">Uma imersão de 4 horas, 100% mão na massa, para acelerar a adoção do Orbit Gestão e blindar sua operação contra a Copa do Mundo, feriados e eleições.</p>

    <div class="bc-countdown" id="bcCountdown">
      <div class="bc-count"><span class="bc-count__num" id="bcDays">--</span><span class="bc-count__lbl">Dias</span></div>
      <div class="bc-count"><span class="bc-count__num" id="bcHours">--</span><span class="bc-count__lbl">Horas</span></div>
      <div class="bc-count"><span class="bc-count__num" id="bcMins">--</span><span class="bc-count__lbl">Minutos</span></div>
      <div class="bc-count"><span class="bc-count__num" id="bcSecs">--</span><span class="bc-count__lbl">Segundos</span></div>
    </div>

    <div class="bc-hero__ctas">
      <a href="#inscricao" class="bc-btn bc-btn--primary bc-btn--pulse">
        <svg class="bc-crosshair" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>
        ★ Convocar-se agora ★
      </a>
      <a href="#promessa" class="bc-btn bc-btn--ghost">
        <i class="fa-solid fa-chevron-down"></i>
        Ver briefing tático
      </a>
    </div>

    <!-- ROSTER: contador de inscritos ao vivo (puxa do Supabase) -->
    <div class="bc-roster" id="bcRoster">
      <span class="bc-roster__label">★ Recrutas convocados ★</span>
      <span class="bc-roster__num"><span id="bcRosterCount">147</span> <small>/ 200 vagas</small></span>
      <div class="bc-roster__bar"><div class="bc-roster__bar-fill" id="bcRosterBar" style="width:73%"></div></div>
    </div>

    <div class="bc-hero__chips">
      <div class="bc-chip"><i class="fa-solid fa-location-dot"></i><span><strong>Square SC</strong> Florianópolis</span></div>
      <div class="bc-chip"><i class="fa-solid fa-satellite-dish"></i><span><strong>+ Online</strong> Transmissão ao vivo</span></div>
      <div class="bc-chip"><i class="fa-solid fa-shield-halved"></i><span><strong>Pré-requisito:</strong> Agente de Ativação</span></div>
    </div>

  </div>
</section>

<div class="bc-warning-stripes"></div>

<!-- ═══ CARD DE MISSAO (detalhes da operacao) ═══ -->
<section style="padding:60px 24px 40px;background:#0A0E13;text-align:center;">
  <img src="/images/bootcamp/missao-card.webp" alt="Missão Bootcamp Orbit · Data: 13 de junho · Hora: 9h às 13h · Local: Square SC Florianópolis · Formato: Presencial + Online · Investimento: Gratuito" style="max-width:880px;width:100%;height:auto;margin:0 auto;display:block;filter:drop-shadow(0 8px 24px rgba(0,0,0,0.6));" loading="lazy">
</section>

<!-- ═══ PROMESSA ═══ -->
<section class="bc-promise" id="promessa" style="position:relative;">
  <div class="bc-promise__head">
    <div class="bc-eyebrow"><i class="fa-solid fa-flag"></i>Briefing Tático · 5 objetivos</div>
    <h2 class="bc-h2">Vamos abrir a caixa-preta da <span class="accent">consultoria recorrente</span></h2>
    <p class="bc-lead">4 horas intensas onde cada bloco vira ação prática dentro da sua operação Orbit. Você sai com playbooks, scripts e ativações rodando no mesmo dia.</p>
  </div>
  <div class="bc-promise__grid">
    <div class="bc-mission"><div class="bc-mission__num">01</div><h3 class="bc-mission__title">Atração de Demanda</h3><p class="bc-mission__desc">Como abrir torneira de leads qualificados sem depender de indicação.</p></div>
    <div class="bc-mission"><div class="bc-mission__num">02</div><h3 class="bc-mission__title">Conversão</h3><p class="bc-mission__desc">O processo comercial que transforma reunião em contrato assinado.</p></div>
    <div class="bc-mission"><div class="bc-mission__num">03</div><h3 class="bc-mission__title">Produtização</h3><p class="bc-mission__desc">Empacotar serviço em produto escalável e replicável.</p></div>
    <div class="bc-mission"><div class="bc-mission__num">04</div><h3 class="bc-mission__title">Precificação</h3><p class="bc-mission__desc">Modelo que protege margem e justifica preço premium.</p></div>
    <div class="bc-mission"><div class="bc-mission__num">05</div><h3 class="bc-mission__title">Atendimento</h3><p class="bc-mission__desc">Operação que retém cliente e gera receita recorrente.</p></div>
  </div>
</section>

<!-- ═══ ZONA DE OPERAÇÃO (mapa Brasil + ops anteriores) ═══ -->
<section style="padding:70px 24px;background:#0A0E13;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:url('/images/bootcamp/camuflagem.webp');background-size:cover;opacity:0.10;pointer-events:none;"></div>
  <div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1.4fr;gap:40px;align-items:center;position:relative;z-index:1;" class="bc-zone-grid">
    <!-- MAPA BRASIL -->
    <div style="text-align:center;">
      <div class="bc-eyebrow"><i class="fa-solid fa-map-location-dot"></i>Zona de Operação</div>
      <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;margin:18px auto 12px;display:block;">
        <!-- Brasil silhueta simplificada -->
        <path d="M 95,20 L 115,18 L 130,28 L 140,42 L 152,40 L 168,52 L 175,68 L 178,85 L 175,100 L 170,115 L 162,128 L 155,142 L 150,156 L 142,168 L 130,178 L 118,184 L 105,186 L 92,182 L 80,175 L 70,166 L 60,154 L 52,140 L 45,124 L 40,108 L 38,92 L 40,76 L 45,60 L 55,48 L 65,38 L 78,28 Z" fill="rgba(75,83,32,0.40)" stroke="#ffba1a" stroke-width="1.5" stroke-dasharray="3 2"/>
        <!-- Grid tatico sobre o mapa -->
        <g stroke="#ffba1a" stroke-width="0.3" opacity="0.4">
          <line x1="40" y1="50" x2="180" y2="50"/>
          <line x1="40" y1="100" x2="180" y2="100"/>
          <line x1="40" y1="150" x2="180" y2="150"/>
          <line x1="60" y1="20" x2="60" y2="190"/>
          <line x1="110" y1="20" x2="110" y2="190"/>
          <line x1="160" y1="20" x2="160" y2="190"/>
        </g>
        <!-- Pin em Florianopolis (sul) -->
        <g transform="translate(120, 160)">
          <circle r="14" fill="rgba(199,62,29,0.20)" stroke="#C73E1D" stroke-width="1">
            <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle r="6" fill="#C73E1D"/>
          <circle r="2" fill="#fff"/>
        </g>
        <text x="100" y="208" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="#ffba1a" letter-spacing="1">SC · FLORIANÓPOLIS</text>
      </svg>
      <div style="display:inline-block;padding:6px 14px;background:rgba(199,62,29,0.15);border:1px solid #C73E1D;color:#C73E1D;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">● Alvo localizado · LAT -27.5954</div>
    </div>

    <!-- OPERAÇÕES ANTERIORES -->
    <div>
      <div class="bc-eyebrow"><i class="fa-solid fa-clock-rotate-left"></i>Operações Anteriores</div>
      <h3 style="color:#fff;font-family:'Black Ops One',impact,sans-serif;font-size:1.5rem;margin:18px 0 22px;text-transform:uppercase;letter-spacing:1px;">Histórico de combate</h3>
      <div style="display:flex;flex-direction:column;gap:10px;font-family:'JetBrains Mono',monospace;font-size:13px;">
        <div style="display:flex;align-items:center;gap:14px;padding:10px 14px;background:rgba(43,57,40,0.30);border-left:3px solid #3FB950;">
          <span style="color:#3FB950;font-weight:700;letter-spacing:1.5px;">▶ BC-260315</span>
          <span style="color:#C9D1D9;flex:1;">15/03 · Florianópolis · 42 recrutas</span>
          <span style="color:#3FB950;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Vitoriosa</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;padding:10px 14px;background:rgba(43,57,40,0.30);border-left:3px solid #3FB950;">
          <span style="color:#3FB950;font-weight:700;letter-spacing:1.5px;">▶ BC-260118</span>
          <span style="color:#C9D1D9;flex:1;">18/01 · Online · 87 recrutas</span>
          <span style="color:#3FB950;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Vitoriosa</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;padding:10px 14px;background:rgba(43,57,40,0.30);border-left:3px solid #3FB950;">
          <span style="color:#3FB950;font-weight:700;letter-spacing:1.5px;">▶ BC-251108</span>
          <span style="color:#C9D1D9;flex:1;">08/11/2025 · Florianópolis · 31 recrutas</span>
          <span style="color:#3FB950;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Vitoriosa</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;padding:12px 14px;background:rgba(255,186,26,0.10);border:1px solid #ffba1a;margin-top:6px;">
          <span style="color:#ffba1a;font-weight:700;letter-spacing:1.5px;">▶ BC-260613</span>
          <span style="color:#fff;flex:1;font-weight:700;">13/06 · Florianópolis + Online · ATUAL</span>
          <span style="color:#ffba1a;font-weight:700;text-transform:uppercase;letter-spacing:1px;animation:bc-blink 1.5s steps(2) infinite;">▮ Em Curso</span>
        </div>
      </div>
    </div>
  </div>
  <style>
    @media (max-width: 800px) { .bc-zone-grid { grid-template-columns: 1fr !important; } }
  </style>
</section>

<!-- ═══ HOSTS ═══ -->
<section class="bc-hosts">
  <div style="text-align:center;max-width:880px;margin:0 auto 12px;">
    <div class="bc-eyebrow"><i class="fa-solid fa-medal"></i>Alto Comando</div>
    <h2 class="bc-h2">Dois empresários, <span class="accent">40 anos somados</span> em campo</h2>
  </div>
  <div class="bc-hosts__grid">
    <div class="bc-host">
      <div class="bc-host__photo bc-host__photo--img"><img src="/images/bootcamp/igor-fardado.webp" alt="Igor Furniel"></div>
      <div class="bc-host__content">
        <div style="display:inline-block;background:linear-gradient(135deg,#ffba1a,#ff8c00);color:#0A0E13;font-family:'Black Ops One',impact,sans-serif;font-size:10px;letter-spacing:2px;padding:3px 10px;margin-bottom:8px;text-transform:uppercase;">GENERAL · ALTO COMANDO</div>
        <h3 class="bc-host__name">Igor Furniel</h3>
        <p class="bc-host__role">CEO &amp; Founder · Orbit Gestão</p>
        <p class="bc-host__bio">25 anos como empresário de consultoria e mentor. Fundador do grupo que conta com Templum Consultoria e Evolutto Plataforma — empresas referência no mercado.</p>
        <div class="bc-host__rank">★ ★ ★ ★ ★</div>
      </div>
    </div>
    <div class="bc-host">
      <div class="bc-host__photo bc-host__photo--img"><img src="/images/bootcamp/chris-fardado.webp" alt="Christian Hart"></div>
      <div class="bc-host__content">
        <div style="display:inline-block;background:linear-gradient(135deg,#ffba1a,#ff8c00);color:#0A0E13;font-family:'Black Ops One',impact,sans-serif;font-size:10px;letter-spacing:2px;padding:3px 10px;margin-bottom:8px;text-transform:uppercase;">CORONEL · LINHA DE FRENTE</div>
        <h3 class="bc-host__name">Christian Hart</h3>
        <p class="bc-host__role">Co-Founder &amp; Head de Canais · Orbit Gestão</p>
        <p class="bc-host__bio">15 anos como empresário de consultoria, executivo e mentor de empresários. Especialista em estruturar canais e operações de alta performance.</p>
        <div class="bc-host__rank">★ ★ ★ ★</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══ DEPOIMENTOS ═══ -->
<section class="bc-testi">
  <div class="bc-testi__head">
    <div class="bc-eyebrow"><i class="fa-solid fa-tower-broadcast"></i>Comunicados de Campo</div>
    <h2 class="bc-h2">Quem viveu imersões anteriores <span class="accent">conta</span></h2>
    <p class="bc-lead">Depoimentos dos consultores que participaram de edições passadas e voltaram com a operação transformada.</p>
  </div>
  <div class="bc-testi__grid">
    <div class="bc-testi-card">
      <div class="bc-testi-card__video"><iframe src="https://player.vimeo.com/video/1194123078?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
      <div class="bc-testi-card__info"><h3 class="bc-testi-card__name">Lucineia Pedrosa</h3><p class="bc-testi-card__company">Econtech Consultoria</p></div>
    </div>
    <div class="bc-testi-card">
      <div class="bc-testi-card__video"><iframe src="https://player.vimeo.com/video/1194124564?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
      <div class="bc-testi-card__info"><h3 class="bc-testi-card__name">Hygor Limar</h3><p class="bc-testi-card__company">Potencialize Resultados</p></div>
    </div>
    <div class="bc-testi-card">
      <div class="bc-testi-card__video"><iframe src="https://player.vimeo.com/video/1194125389?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
      <div class="bc-testi-card__info"><h3 class="bc-testi-card__name">Bruno Lozano</h3><p class="bc-testi-card__company">Ritual de Gestão</p></div>
    </div>
    <div class="bc-testi-card">
      <div class="bc-testi-card__video"><iframe src="https://player.vimeo.com/video/1194126879?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
      <div class="bc-testi-card__info"><h3 class="bc-testi-card__name">Rogério Menossi</h3><p class="bc-testi-card__company">Time Produtivo</p></div>
    </div>
  </div>
  <p class="bc-testi__hint">◂ arraste para ver mais ▸</p>
</section>

<div class="bc-warning-stripes"></div>

<!-- ═══ FORMATO ═══ -->
<section class="bc-format">
  <div class="bc-format__head">
    <div class="bc-eyebrow"><i class="fa-solid fa-route"></i>Posto de Combate</div>
    <h2 class="bc-h2">Escolha como vai <span class="accent">se posicionar</span></h2>
  </div>
  <div class="bc-format__grid">
    <div class="bc-fmt">
      <div class="bc-fmt__icon"><i class="fa-solid fa-satellite-dish"></i></div>
      <p class="bc-fmt__label">Quartel Remoto · Online</p>
      <h3 class="bc-fmt__name">Transmissão ao vivo</h3>
      <p class="bc-fmt__free">Gratuito</p>
      <p class="bc-fmt__desc">Transmissão exclusiva para canais e clientes ativos Orbit Gestão, com apoio digital.</p>
      <ul class="bc-fmt__features">
        <li><i class="fa-solid fa-check"></i>4h de imersão ao vivo</li>
        <li><i class="fa-solid fa-check"></i>Acesso a material digital</li>
        <li><i class="fa-solid fa-check"></i>Q&amp;A ao vivo durante o evento</li>
      </ul>
      <a href="#inscricao" class="bc-btn bc-btn--ghost" style="width:100%;justify-content:center;">Assistir online</a>
    </div>
    <div class="bc-fmt bc-fmt--featured">
      <div class="bc-fmt__icon"><i class="fa-solid fa-helmet-safety"></i></div>
      <p class="bc-fmt__label">Linha de Frente · Presencial</p>
      <h3 class="bc-fmt__name">Imersão In Loco</h3>
      <p class="bc-fmt__price">R$150<small>/ vaga</small></p>
      <p class="bc-fmt__desc">Valor 100% revertido para o almoço especial + sessão extra de mentoria com Igor e Christian.</p>
      <ul class="bc-fmt__features">
        <li><i class="fa-solid fa-check"></i>4h de imersão presencial no Square SC</li>
        <li><i class="fa-solid fa-check"></i>Almoço especial com os hosts</li>
        <li><i class="fa-solid fa-check"></i>Mentoria extra durante o almoço</li>
        <li><i class="fa-solid fa-check"></i>Networking com canais Orbit</li>
      </ul>
      <a href="#inscricao" class="bc-btn bc-btn--primary" style="width:100%;justify-content:center;">Garantir presencial</a>
    </div>
  </div>
</section>

<!-- ═══ PRÉ-REQUISITO ═══ -->
<section class="bc-prereq">
  <div class="bc-prereq__box">
    <div class="bc-prereq__content">
      <div class="bc-prereq__stamp"><i class="fa-solid fa-triangle-exclamation"></i></div>
      <div>
        <h3 class="bc-prereq__title">ACESSO RESTRITO · <span class="accent">Agente de Ativação obrigatório</span></h3>
        <p class="bc-prereq__text">A participação é exclusiva para consultorias que seguiram e executaram todo o conteúdo do <strong>Agente de Ativação de Canal</strong>, disponível no ambiente de cada consultoria dentro do Orbit Gestão. Isso garante que toda a sala esteja no mesmo nível para o trabalho mão na massa.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ FORM ═══ -->
<section class="bc-form-sec" id="inscricao">
  <div class="bc-form-sec__head" style="padding-top:14px;">
    <div class="bc-eyebrow"><i class="fa-solid fa-id-card"></i>Recrutamento</div>
    <h2 class="bc-h2">Confirme seu <span class="accent">alistamento</span></h2>
    <p class="bc-lead">Vagas limitadas. Confirme abaixo seus dados e a modalidade de participação.</p>
  </div>
  <!-- CHAT conversacional: Igor entrevista o recruta -->
  <div class="bc-chat" id="bcChat">
    <div class="bc-chat__head">
      <span class="live-dot"></span>
      ★ Entrevista Tática · General Igor Furniel ★
    </div>
    <div class="bc-chat__progress"><div class="bc-chat__progress-bar" id="bcChatBar" style="width:0%"></div></div>
    <div class="bc-chat__body" id="bcChatBody"></div>
    <div class="bc-chat__input-area" id="bcChatInputArea" style="display:none;">
      <input class="bc-chat__input" id="bcChatInput" type="text" placeholder="Digite e pressione Enter..." autocomplete="off">
      <button class="bc-chat__send" id="bcChatSend">Enviar</button>
    </div>
    <div class="bc-chat__choices" id="bcChatChoices" style="display:none;"></div>
  </div>
  <p class="bc-form__foot">[ EXCLUSIVO PARA CANAIS E CONSULTORIAS CLIENTES ATIVAS · ORBIT GESTÃO ]</p>
  <div class="bc-form" id="bcSuccess" style="display:none;max-width:640px;margin:0 auto;border-color:#3FB950;">
    <div class="bc-form__inner" style="text-align:center;padding:40px 30px;">
      <img src="/images/bootcamp/missao-aprovada.webp" alt="Missão Aprovada" style="max-width:340px;width:80%;height:auto;margin:0 auto 24px;display:block;filter:drop-shadow(4px 4px 0 rgba(0,0,0,0.4));transform:rotate(-3deg);" loading="lazy">
      <h3 style="color:#fff;font-family:'Black Ops One',impact,sans-serif;font-size:1.6rem;margin:0 0 12px;text-transform:uppercase;letter-spacing:2px;">Alistamento confirmado!</h3>
      <p style="color:#C9D1D9;margin:0;font-family:'JetBrains Mono',monospace;font-size:0.95rem;line-height:1.6;">Vamos enviar todos os detalhes da operação para seu e-mail e WhatsApp.</p>
    </div>
  </div>
</section>

<div class="bc-warning-stripes"></div>
`;
