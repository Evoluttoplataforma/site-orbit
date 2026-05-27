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

  .bc-page { background: #0A0E13; color: #E6E8EB; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
  .bc-page * { box-sizing: border-box; }
  .bc-stencil { font-family: 'Black Ops One', 'Big Shoulders Stencil', impact, sans-serif; letter-spacing: 0.02em; text-transform: uppercase; }
  .bc-mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

  /* Listras de perigo amarelo/preto — animada */
  .bc-warning-stripes { height: 14px; background: repeating-linear-gradient(45deg, #F5C518 0 24px, #0A0E13 24px 48px); position: relative; overflow: hidden; }
  .bc-warning-stripes::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent 0 24px, rgba(0,0,0,0.15) 24px 48px); }

  /* ═══ HERO — full impact ═══ */
  .bc-hero { position: relative; padding: 110px 24px 90px; background: #0A0E13; overflow: hidden; min-height: 760px; display: flex; align-items: center; justify-content: center; }

  /* Camuflagem multi-camada de fundo */
  .bc-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      radial-gradient(ellipse 50% 40% at 18% 30%, #4B5320 0%, transparent 60%),
      radial-gradient(ellipse 45% 35% at 78% 20%, #3D4127 0%, transparent 55%),
      radial-gradient(ellipse 40% 35% at 50% 75%, #2F3318 0%, transparent 55%),
      radial-gradient(ellipse 30% 25% at 88% 75%, #6B7339 0%, transparent 50%),
      radial-gradient(ellipse 25% 20% at 8% 85%, #4B5320 0%, transparent 50%),
      linear-gradient(180deg, #0A0E13 0%, #0F1410 100%);
    opacity: 0.55;
    pointer-events: none;
  }

  /* Grid tático coordenadas */
  .bc-hero::after {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(245,197,24,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,197,24,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .bc-hero__inner { position: relative; max-width: 1080px; margin: 0 auto; text-align: center; z-index: 2; }

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
  @media (max-width: 600px) {
    .bc-count { min-width: 72px; padding: 12px 8px 10px; }
    .bc-count__num { font-size: 1.9rem; margin-top: 12px; }
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
  .bc-promise { padding: 90px 24px; background: #0A0E13; position: relative; }
  .bc-promise::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle at 50% 0%, rgba(75,83,32,0.25) 0%, transparent 60%);
    pointer-events: none;
  }
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
  .bc-hosts { padding: 90px 24px; background: linear-gradient(180deg, #0F1410 0%, #0A0E13 100%); border-top: 4px double #4B5320; border-bottom: 4px double #4B5320; position: relative; }
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
  .bc-host__photo {
    width: 96px; height: 96px;
    background: linear-gradient(135deg, #4B5320, #2F3318);
    border: 3px solid #ffba1a;
    display: flex; align-items: center; justify-content: center;
    color: #ffba1a;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 2rem; flex-shrink: 0;
    box-shadow: 4px 4px 0 #000;
    margin-top: 18px;
  }
  .bc-host__photo--img { padding: 0; overflow: hidden; }
  .bc-host__photo--img img { width: 100%; height: 100%; object-fit: cover; }
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
  .bc-testi { padding: 90px 24px; background: #0A0E13; position: relative; }
  .bc-testi::before {
    content: ''; position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(0deg, transparent 0 80px, rgba(75,83,32,0.10) 80px 81px),
      repeating-linear-gradient(90deg, transparent 0 80px, rgba(75,83,32,0.10) 80px 81px);
    pointer-events: none;
  }
  .bc-testi__head { text-align: center; max-width: 800px; margin: 0 auto 40px; position: relative; z-index: 1; }
  .bc-testi__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  @media (max-width: 1024px) { .bc-testi__grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .bc-testi__grid { grid-template-columns: 1fr; } }
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
  .bc-format { padding: 90px 24px; background: linear-gradient(180deg, #0A0E13 0%, #0F1410 100%); }
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

  /* ═══ FORM — RECRUTAMENTO ═══ */
  .bc-form-sec { padding: 90px 24px; background: linear-gradient(180deg, #0F1410 0%, #0A0E13 100%); position: relative; }
  .bc-form-sec::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 14px;
    background: repeating-linear-gradient(45deg, #F5C518 0 24px, #0A0E13 24px 48px);
  }
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
  .bc-form__label--req::after { content: ' *'; color: #C73E1D; }
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

<!-- ═══ HERO ═══ -->
<section class="bc-hero">
  <div class="bc-hero__inner">

    <div class="bc-hero__tarja">CLASSIFICADO · OPERAÇÃO BC-260613</div>

    <div class="bc-hero__coord">LAT -27.5954 · LON -48.5480 · SQUARE SC · ZULU-03</div>

    <!-- Insígnia central: estrela + ring -->
    <div class="bc-hero__insignia">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#ffba1a" stroke-width="2"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#ffba1a" stroke-width="1" stroke-dasharray="2 4" opacity="0.6"/>
        <polygon points="50,18 57,40 80,40 61,54 68,76 50,62 32,76 39,54 20,40 43,40" fill="#ffba1a" stroke="#0A0E13" stroke-width="1"/>
        <text x="50" y="92" text-anchor="middle" font-family="Black Ops One, impact" font-size="6" fill="#ffba1a" letter-spacing="1.5">BOOTCAMP ORBIT</text>
      </svg>
    </div>

    <h1>Prepare sua consultoria para a <span class="accent">guerra</span> do 2º semestre</h1>
    <p class="bc-hero__sub">Uma imersão de 4 horas, 100% mão na massa, para acelerar a adoção do Orbit Gestão e blindar sua operação contra a Copa do Mundo, feriados e eleições.</p>

    <div class="bc-countdown" id="bcCountdown">
      <div class="bc-count"><span class="bc-count__num" id="bcDays">--</span><span class="bc-count__lbl">Dias</span></div>
      <div class="bc-count"><span class="bc-count__num" id="bcHours">--</span><span class="bc-count__lbl">Horas</span></div>
      <div class="bc-count"><span class="bc-count__num" id="bcMins">--</span><span class="bc-count__lbl">Minutos</span></div>
      <div class="bc-count"><span class="bc-count__num" id="bcSecs">--</span><span class="bc-count__lbl">Segundos</span></div>
    </div>

    <div class="bc-hero__ctas">
      <a href="#inscricao" class="bc-btn bc-btn--primary">
        <svg class="bc-crosshair" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>
        Garantir minha vaga
      </a>
      <a href="#promessa" class="bc-btn bc-btn--ghost">
        <i class="fa-solid fa-chevron-down"></i>
        Ver o que vamos destravar
      </a>
    </div>

    <div class="bc-hero__chips">
      <div class="bc-chip"><i class="fa-solid fa-location-dot"></i><span><strong>Square SC</strong> Florianópolis</span></div>
      <div class="bc-chip"><i class="fa-solid fa-satellite-dish"></i><span><strong>+ Online</strong> Transmissão ao vivo</span></div>
      <div class="bc-chip"><i class="fa-solid fa-shield-halved"></i><span><strong>Pré-requisito:</strong> Agente de Ativação</span></div>
    </div>

  </div>
</section>

<div class="bc-warning-stripes"></div>

<!-- ═══ PROMESSA ═══ -->
<section class="bc-promise" id="promessa">
  <div class="bc-promise__head">
    <div class="bc-eyebrow"><i class="fa-solid fa-flag"></i>A Promessa</div>
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

<!-- ═══ HOSTS ═══ -->
<section class="bc-hosts">
  <div style="text-align:center;max-width:880px;margin:0 auto 12px;">
    <div class="bc-eyebrow"><i class="fa-solid fa-medal"></i>Alto Comando</div>
    <h2 class="bc-h2">Dois empresários, <span class="accent">40 anos somados</span> em campo</h2>
  </div>
  <div class="bc-hosts__grid">
    <div class="bc-host">
      <div class="bc-host__photo bc-host__photo--img"><img src="/images/blog/host-igor.webp" alt="Igor Furniel"></div>
      <div class="bc-host__content">
        <h3 class="bc-host__name">Igor Furniel</h3>
        <p class="bc-host__role">CEO &amp; Founder · Orbit Gestão</p>
        <p class="bc-host__bio">25 anos como empresário de consultoria e mentor. Fundador do grupo que conta com Templum Consultoria e Evolutto Plataforma — empresas referência no mercado.</p>
        <div class="bc-host__rank">★ ★ ★ ★ ★</div>
      </div>
    </div>
    <div class="bc-host">
      <div class="bc-host__photo bc-host__photo--img"><img src="/images/blog/host-chris.webp" alt="Christian Hart"></div>
      <div class="bc-host__content">
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
  <form class="bc-form" id="bcForm">
    <div class="bc-form__inner">
      <label class="bc-form__label bc-form__label--req">Nome completo</label>
      <input class="bc-form__input" type="text" name="nome" required placeholder="Seu nome">

      <label class="bc-form__label bc-form__label--req">E-mail</label>
      <input class="bc-form__input" type="email" name="email" required placeholder="voce@empresa.com">

      <label class="bc-form__label bc-form__label--req">Telefone (WhatsApp)</label>
      <input class="bc-form__input" type="tel" name="telefone" required placeholder="(00) 00000-0000">

      <label class="bc-form__label bc-form__label--req">Empresa</label>
      <input class="bc-form__input" type="text" name="empresa" required placeholder="Nome da sua consultoria">

      <label class="bc-form__label bc-form__label--req">Posto de combate</label>
      <div class="bc-modality">
        <label class="bc-modality__opt is-selected" data-modality="presencial">
          <input type="radio" name="modalidade" value="presencial" checked>
          <div class="bc-modality__title"><i class="fa-solid fa-helmet-safety"></i>Presencial</div>
          <div class="bc-modality__sub">Florianópolis · R$150 (almoço + mentoria)</div>
        </label>
        <label class="bc-modality__opt" data-modality="online">
          <input type="radio" name="modalidade" value="online">
          <div class="bc-modality__title"><i class="fa-solid fa-satellite-dish"></i>Online ao vivo</div>
          <div class="bc-modality__sub">Transmissão exclusiva · Gratuito</div>
        </label>
      </div>

      <label class="bc-form__label">Briefing tático <small style="color:#8B7355;font-weight:500;text-transform:none;letter-spacing:0;">(opcional · o que espera levar do evento)</small></label>
      <textarea class="bc-form__input bc-form__textarea" name="expectativas" placeholder="Conte-nos seus principais desafios..."></textarea>

      <p class="bc-form__error" id="bcError"></p>
      <button type="submit" class="bc-form__submit" id="bcSubmit">
        ★ Alistar agora ★
      </button>
      <p class="bc-form__foot">[ EXCLUSIVO PARA CANAIS E CONSULTORIAS CLIENTES ATIVAS · ORBIT GESTÃO ]</p>
    </div>
  </form>
  <div class="bc-form" id="bcSuccess" style="display:none;max-width:640px;margin:0 auto;">
    <div class="bc-form__inner" style="text-align:center;">
      <i class="fa-solid fa-circle-check" style="font-size:3.5rem;color:#3FB950;margin-bottom:18px;"></i>
      <h3 style="color:#fff;font-family:'Black Ops One',impact,sans-serif;font-size:1.5rem;margin:0 0 8px;text-transform:uppercase;letter-spacing:1.5px;">Alistamento confirmado!</h3>
      <p style="color:#C9D1D9;margin:0;font-family:'JetBrains Mono',monospace;font-size:0.95rem;">Vamos enviar todos os detalhes do Bootcamp Orbit para seu e-mail e WhatsApp.</p>
    </div>
  </div>
</section>

<div class="bc-warning-stripes"></div>
`;
