// Bootcamp Orbit — Imersão Canais 13/06/2026
// Visual placeholder militar (verde militar + dourado Orbit + uppercase bold).
// Substituir paleta/grafismos quando identidade final chegar.
export const pageHTML = `
<style>
  /* ═══ TOKENS — Bootcamp visual ═══ */
  .bc-page { background: #0D1117; color: #E6E8EB; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
  .bc-page * { box-sizing: border-box; }

  /* PALETA militar placeholder */
  /* #2F3318 = verde camuflagem escuro | #4B5320 = verde militar | #6B7339 = sage | #ffba1a = dourado Orbit */

  .bc-section { padding: 80px 24px; position: relative; }
  .bc-container { max-width: 1180px; margin: 0 auto; }
  .bc-eyebrow { display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px; background: rgba(255,186,26,0.08); border: 1px solid rgba(255,186,26,0.30); border-radius: 4px; color: #ffba1a; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; }
  .bc-eyebrow i { font-size: 11px; }
  .bc-h1 { font-size: clamp(2rem, 5vw, 3.6rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.025em; color: #fff; margin: 24px 0 18px; text-transform: uppercase; }
  .bc-h1 span.accent { color: #ffba1a; }
  .bc-h2 { font-size: clamp(1.7rem, 3.5vw, 2.4rem); font-weight: 900; line-height: 1.15; color: #fff; margin: 0 0 18px; text-transform: uppercase; letter-spacing: -0.015em; }
  .bc-lead { color: #C9D1D9; font-size: 1.1rem; line-height: 1.65; max-width: 760px; }

  /* ═══ HERO ═══ */
  .bc-hero { padding: 130px 24px 80px; background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(75,83,32,0.30) 0%, transparent 60%), linear-gradient(180deg, #0D1117 0%, #161B22 100%); position: relative; overflow: hidden; }
  .bc-hero::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, transparent 0 28px, rgba(255,186,26,0.03) 28px 29px); pointer-events: none; }
  .bc-hero__inner { position: relative; max-width: 980px; margin: 0 auto; text-align: center; }
  .bc-hero__date { display: inline-flex; align-items: center; gap: 12px; padding: 10px 20px; background: rgba(255,186,26,0.10); border: 1px solid rgba(255,186,26,0.45); border-radius: 6px; color: #ffba1a; font-size: 13px; font-weight: 900; letter-spacing: 2px; margin-bottom: 24px; text-transform: uppercase; }
  .bc-hero__date i { font-size: 12px; }
  .bc-hero h1 { font-size: clamp(2.2rem, 5.5vw, 4rem); font-weight: 900; line-height: 1.02; letter-spacing: -0.03em; color: #fff; margin: 0 0 22px; text-transform: uppercase; }
  .bc-hero h1 .accent { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .bc-hero__sub { color: #C9D1D9; font-size: clamp(1.05rem, 1.6vw, 1.25rem); line-height: 1.6; max-width: 760px; margin: 0 auto 40px; }

  /* Countdown blocos militares */
  .bc-countdown { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; margin: 0 auto 36px; max-width: 600px; }
  .bc-count { display: flex; flex-direction: column; align-items: center; min-width: 96px; padding: 18px 14px; background: rgba(13,17,23,0.85); border: 1px solid rgba(255,186,26,0.35); border-radius: 4px; position: relative; }
  .bc-count::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #ffba1a; }
  .bc-count__num { font-size: 2.4rem; font-weight: 900; color: #ffba1a; line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .bc-count__lbl { font-size: 11px; color: #8B949E; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-top: 8px; }
  @media (max-width: 600px) {
    .bc-count { min-width: 70px; padding: 12px 10px; }
    .bc-count__num { font-size: 1.8rem; }
  }

  .bc-hero__ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin: 0 auto 40px; }
  .bc-btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 28px; border-radius: 6px; font-weight: 900; font-size: 14px; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; transition: all 0.2s; border: 2px solid transparent; cursor: pointer; font-family: inherit; }
  .bc-btn--primary { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); color: #0D1117; box-shadow: 0 8px 24px rgba(255,186,26,0.30); }
  .bc-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,186,26,0.45); }
  .bc-btn--ghost { background: transparent; color: #fff; border-color: rgba(255,255,255,0.25); }
  .bc-btn--ghost:hover { border-color: #ffba1a; color: #ffba1a; }

  .bc-hero__chips { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-top: 14px; }
  .bc-chip { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.10); border-radius: 4px; font-size: 13px; color: #C9D1D9; }
  .bc-chip i { color: #ffba1a; font-size: 14px; }
  .bc-chip strong { color: #fff; }

  /* ═══ PROMESSA ═══ */
  .bc-promise { padding: 90px 24px; background: #0D1117; }
  .bc-promise__head { text-align: center; max-width: 820px; margin: 0 auto 56px; }
  .bc-promise__grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; max-width: 1180px; margin: 0 auto; }
  @media (max-width: 1024px) { .bc-promise__grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .bc-promise__grid { grid-template-columns: 1fr; } }
  .bc-block { background: linear-gradient(180deg, rgba(75,83,32,0.10) 0%, transparent 100%); border: 1px solid rgba(255,186,26,0.18); border-radius: 6px; padding: 28px 22px; position: relative; transition: all 0.25s; }
  .bc-block:hover { border-color: rgba(255,186,26,0.50); transform: translateY(-4px); }
  .bc-block__num { position: absolute; top: 18px; right: 22px; font-size: 1.6rem; font-weight: 900; color: rgba(255,186,26,0.45); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .bc-block__title { color: #ffba1a; font-size: 0.95rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 12px; padding-right: 46px; }
  .bc-block__desc { color: #C9D1D9; font-size: 0.95rem; line-height: 1.55; margin: 0; }

  /* ═══ HOSTS ═══ */
  .bc-hosts { padding: 90px 24px; background: linear-gradient(180deg, #161B22 0%, #0D1117 100%); border-top: 1px solid rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.04); }
  .bc-hosts__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; max-width: 1100px; margin: 40px auto 0; }
  @media (max-width: 800px) { .bc-hosts__grid { grid-template-columns: 1fr; } }
  .bc-host { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 32px; display: flex; gap: 22px; align-items: flex-start; }
  .bc-host__photo { width: 88px; height: 88px; border-radius: 4px; background: linear-gradient(135deg, rgba(255,186,26,0.20), rgba(255,140,0,0.05)); border: 2px solid rgba(255,186,26,0.40); display: flex; align-items: center; justify-content: center; color: #ffba1a; font-size: 1.6rem; font-weight: 900; flex-shrink: 0; object-fit: cover; }
  .bc-host__photo--img { padding: 0; overflow: hidden; }
  .bc-host__name { color: #fff; font-size: 1.3rem; font-weight: 900; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .bc-host__role { color: #ffba1a; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 14px; }
  .bc-host__bio { color: #C9D1D9; font-size: 0.95rem; line-height: 1.6; margin: 0; }

  /* ═══ DEPOIMENTOS ═══ */
  .bc-testi { padding: 90px 24px; background: #0D1117; }
  .bc-testi__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1100px; margin: 40px auto 0; }
  @media (max-width: 900px) { .bc-testi__grid { grid-template-columns: 1fr; } }
  .bc-video { aspect-ratio: 9/16; background: linear-gradient(180deg, rgba(75,83,32,0.20), rgba(13,17,23,0.95)); border: 1px solid rgba(255,255,255,0.10); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; color: #6B7280; font-size: 0.95rem; }
  .bc-video i { font-size: 2rem; color: rgba(255,186,26,0.35); }

  /* ═══ FORMATO (cards online vs presencial) ═══ */
  .bc-format { padding: 90px 24px; background: linear-gradient(180deg, #0D1117 0%, #161B22 100%); }
  .bc-format__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 1000px; margin: 40px auto 0; }
  @media (max-width: 800px) { .bc-format__grid { grid-template-columns: 1fr; } }
  .bc-fmt { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.10); border-radius: 8px; padding: 36px 30px; position: relative; transition: all 0.25s; }
  .bc-fmt--featured { border-color: rgba(255,186,26,0.55); background: linear-gradient(180deg, rgba(255,186,26,0.06) 0%, rgba(255,186,26,0.01) 100%); }
  .bc-fmt--featured::before { content: 'RECOMENDADO'; position: absolute; top: -12px; right: 20px; background: linear-gradient(135deg, #ffba1a, #ff8c00); color: #0D1117; font-size: 10px; font-weight: 900; padding: 4px 12px; border-radius: 4px; letter-spacing: 1.5px; }
  .bc-fmt__label { color: #8B949E; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px; }
  .bc-fmt__name { color: #fff; font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin: 0 0 16px; letter-spacing: 0.5px; }
  .bc-fmt__price { color: #ffba1a; font-size: 2.4rem; font-weight: 900; letter-spacing: -0.02em; margin: 0 0 4px; }
  .bc-fmt__price small { font-size: 0.9rem; color: #8B949E; font-weight: 600; letter-spacing: 0; text-transform: none; margin-left: 4px; }
  .bc-fmt__free { color: #3FB950; font-size: 2.4rem; font-weight: 900; margin: 0 0 4px; }
  .bc-fmt__desc { color: #C9D1D9; font-size: 0.95rem; line-height: 1.55; margin: 12px 0 22px; }
  .bc-fmt__features { list-style: none; padding: 0; margin: 0 0 24px; }
  .bc-fmt__features li { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; color: #C9D1D9; font-size: 0.95rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .bc-fmt__features li:last-child { border-bottom: none; }
  .bc-fmt__features li i { color: #3FB950; font-size: 13px; margin-top: 5px; flex-shrink: 0; }

  /* ═══ PRÉ-REQUISITO ═══ */
  .bc-prereq { padding: 60px 24px; background: #0D1117; }
  .bc-prereq__box { max-width: 880px; margin: 0 auto; background: linear-gradient(135deg, rgba(248,81,73,0.06), rgba(248,81,73,0.02)); border: 1px solid rgba(248,81,73,0.30); border-left: 4px solid #F85149; border-radius: 6px; padding: 28px 32px; display: flex; gap: 20px; align-items: flex-start; }
  .bc-prereq__icon { width: 48px; height: 48px; border-radius: 4px; background: rgba(248,81,73,0.12); border: 1px solid rgba(248,81,73,0.40); display: flex; align-items: center; justify-content: center; color: #F85149; font-size: 18px; flex-shrink: 0; }
  .bc-prereq__title { color: #fff; font-size: 1.05rem; font-weight: 800; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px; }
  .bc-prereq__text { color: #C9D1D9; font-size: 0.95rem; line-height: 1.6; margin: 0; }

  /* ═══ FORM ═══ */
  .bc-form-sec { padding: 90px 24px; background: linear-gradient(180deg, #161B22 0%, #0D1117 100%); }
  .bc-form { max-width: 620px; margin: 36px auto 0; background: rgba(13,17,23,0.85); border: 1px solid rgba(255,186,26,0.25); border-radius: 8px; padding: 36px 32px; }
  .bc-form__label { display: block; color: #fff; font-size: 0.85rem; font-weight: 700; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px; }
  .bc-form__label--req::after { content: ' *'; color: #ffba1a; }
  .bc-form__input { width: 100%; padding: 14px 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10); border-radius: 4px; color: #fff; font-size: 15px; font-family: inherit; margin-bottom: 20px; transition: all 0.2s; box-sizing: border-box; }
  .bc-form__input:focus { outline: none; border-color: #ffba1a; background: rgba(255,255,255,0.06); }
  .bc-form__input::placeholder { color: #6B7280; }
  .bc-form__textarea { min-height: 90px; resize: vertical; font-family: inherit; }

  .bc-modality { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  @media (max-width: 500px) { .bc-modality { grid-template-columns: 1fr; } }
  .bc-modality__opt { display: block; padding: 18px 16px; background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.10); border-radius: 6px; cursor: pointer; transition: all 0.2s; }
  .bc-modality__opt input { display: none; }
  .bc-modality__opt:hover { border-color: rgba(255,186,26,0.35); }
  .bc-modality__opt.is-selected { border-color: #ffba1a; background: rgba(255,186,26,0.06); }
  .bc-modality__title { display: flex; align-items: center; gap: 8px; color: #fff; font-weight: 800; font-size: 0.95rem; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .bc-modality__title i { color: #ffba1a; font-size: 14px; }
  .bc-modality__sub { color: #8B949E; font-size: 12px; line-height: 1.4; }

  .bc-form__submit { width: 100%; margin-top: 12px; padding: 18px 28px; background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); color: #0D1117; border: none; border-radius: 6px; font-size: 14px; font-weight: 900; cursor: pointer; font-family: inherit; transition: all 0.2s; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: 0 8px 22px rgba(255,186,26,0.25); }
  .bc-form__submit:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(255,186,26,0.40); }
  .bc-form__submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
  .bc-form__error { color: #F85149; font-size: 0.9rem; margin: 10px 0 0; display: none; background: rgba(248,81,73,0.08); padding: 10px 14px; border-radius: 4px; border-left: 3px solid #F85149; }
  .bc-form__error.show { display: block; }
  .bc-form__success { display: none; text-align: center; padding: 40px 20px; }
  .bc-form__success.show { display: block; }
  .bc-form__success i { font-size: 3rem; color: #3FB950; margin-bottom: 16px; }
  .bc-form__success h3 { color: #fff; font-size: 1.4rem; font-weight: 900; margin: 0 0 8px; text-transform: uppercase; }
  .bc-form__success p { color: #C9D1D9; margin: 0; }

  .bc-form__foot { text-align: center; color: #6B7280; font-size: 12px; margin: 20px 0 0; letter-spacing: 0.5px; }
</style>

<!-- ═══ HERO ═══ -->
<section class="bc-section bc-hero">
  <div class="bc-hero__inner">
    <div class="bc-hero__date"><i class="fa-solid fa-calendar-day"></i>EVENTO HÍBRIDO &middot; EXCLUSIVO CANAIS &middot; 13 JUN 2026 &middot; 9H ÀS 13H</div>
    <h1>Prepare sua consultoria para a <span class="accent">guerra do 2&ordm; semestre</span> de 2026</h1>
    <p class="bc-hero__sub">Uma imersão de 4 horas, 100% mão na massa, para acelerar a adoção do Orbit Gestão e blindar sua operação contra a Copa do Mundo, feriados e eleições.</p>
    <div class="bc-countdown" id="bcCountdown">
      <div class="bc-count"><span class="bc-count__num" id="bcDays">--</span><span class="bc-count__lbl">Dias</span></div>
      <div class="bc-count"><span class="bc-count__num" id="bcHours">--</span><span class="bc-count__lbl">Horas</span></div>
      <div class="bc-count"><span class="bc-count__num" id="bcMins">--</span><span class="bc-count__lbl">Minutos</span></div>
      <div class="bc-count"><span class="bc-count__num" id="bcSecs">--</span><span class="bc-count__lbl">Segundos</span></div>
    </div>
    <div class="bc-hero__ctas">
      <a href="#inscricao" class="bc-btn bc-btn--primary">Garantir minha vaga <i class="fa-solid fa-arrow-right"></i></a>
      <a href="#promessa" class="bc-btn bc-btn--ghost">Ver o que vamos destravar</a>
    </div>
    <div class="bc-hero__chips">
      <div class="bc-chip"><i class="fa-solid fa-location-dot"></i><span><strong>Square SC</strong> Florianópolis</span></div>
      <div class="bc-chip"><i class="fa-solid fa-video"></i><span><strong>+ Online</strong> Transmissão ao vivo</span></div>
      <div class="bc-chip"><i class="fa-solid fa-shield-halved"></i><span><strong>Pré-requisito:</strong> Agente de Ativação</span></div>
    </div>
  </div>
</section>

<!-- ═══ PROMESSA ═══ -->
<section class="bc-section bc-promise" id="promessa">
  <div class="bc-container bc-promise__head">
    <div class="bc-eyebrow"><i class="fa-solid fa-bullseye"></i>A Promessa</div>
    <h2 class="bc-h2" style="margin-top:20px;">Vamos abrir a caixa-preta da <span style="color:#ffba1a;">consultoria recorrente</span></h2>
    <p class="bc-lead" style="margin:0 auto;">4 horas intensas onde cada bloco vira ação prática dentro da sua operação Orbit. Você sai com playbooks, scripts e ativações rodando no mesmo dia.</p>
  </div>
  <div class="bc-promise__grid">
    <div class="bc-block"><div class="bc-block__num">01</div><h3 class="bc-block__title">Atração de Demanda</h3><p class="bc-block__desc">Como abrir torneira de leads qualificados sem depender de indicação.</p></div>
    <div class="bc-block"><div class="bc-block__num">02</div><h3 class="bc-block__title">Conversão</h3><p class="bc-block__desc">O processo comercial que transforma reunião em contrato assinado.</p></div>
    <div class="bc-block"><div class="bc-block__num">03</div><h3 class="bc-block__title">Produtização</h3><p class="bc-block__desc">Empacotar serviço em produto escalável e replicável.</p></div>
    <div class="bc-block"><div class="bc-block__num">04</div><h3 class="bc-block__title">Precificação</h3><p class="bc-block__desc">Modelo que protege margem e justifica preço premium.</p></div>
    <div class="bc-block"><div class="bc-block__num">05</div><h3 class="bc-block__title">Atendimento</h3><p class="bc-block__desc">Operação que retém cliente e gera receita recorrente.</p></div>
  </div>
</section>

<!-- ═══ HOSTS ═══ -->
<section class="bc-section bc-hosts">
  <div class="bc-container" style="text-align:center;">
    <div class="bc-eyebrow"><i class="fa-solid fa-user-tie"></i>Quem conduz a imersão</div>
    <h2 class="bc-h2" style="margin-top:20px;">Dois empresários, <span style="color:#ffba1a;">40 anos somados</span> de consultoria</h2>
  </div>
  <div class="bc-hosts__grid">
    <div class="bc-host">
      <div class="bc-host__photo">IF</div>
      <div>
        <h3 class="bc-host__name">Igor Furniel</h3>
        <p class="bc-host__role">CEO &amp; Founder &middot; Orbit Gestão</p>
        <p class="bc-host__bio">25 anos como empresário de consultoria e mentor. Fundador do grupo que conta com Templum Consultoria e Evolutto Plataforma — empresas referência no mercado.</p>
      </div>
    </div>
    <div class="bc-host">
      <div class="bc-host__photo">CH</div>
      <div>
        <h3 class="bc-host__name">Christian Hart</h3>
        <p class="bc-host__role">Co-Founder &amp; Head de Canais &middot; Orbit Gestão</p>
        <p class="bc-host__bio">15 anos como empresário de consultoria, executivo e mentor de empresários. Especialista em estruturar canais e operações de alta performance.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ DEPOIMENTOS ═══ -->
<section class="bc-section bc-testi">
  <div class="bc-container" style="text-align:center;">
    <div class="bc-eyebrow"><i class="fa-solid fa-quote-right"></i>Depoimentos</div>
    <h2 class="bc-h2" style="margin-top:20px;">Quem viveu imersões anteriores <span style="color:#ffba1a;">conta</span></h2>
    <p class="bc-lead" style="margin:0 auto;">Vídeos dos consultores que participaram de edições passadas e voltaram com a operação transformada.</p>
  </div>
  <div class="bc-testi__grid">
    <div class="bc-video"><i class="fa-solid fa-circle-play"></i><span>Depoimento #1</span><small style="color:#484F58;">Vídeo em breve</small></div>
    <div class="bc-video"><i class="fa-solid fa-circle-play"></i><span>Depoimento #2</span><small style="color:#484F58;">Vídeo em breve</small></div>
    <div class="bc-video"><i class="fa-solid fa-circle-play"></i><span>Depoimento #3</span><small style="color:#484F58;">Vídeo em breve</small></div>
  </div>
</section>

<!-- ═══ FORMATO ═══ -->
<section class="bc-section bc-format">
  <div class="bc-container" style="text-align:center;">
    <div class="bc-eyebrow"><i class="fa-solid fa-route"></i>Escolha seu formato</div>
    <h2 class="bc-h2" style="margin-top:20px;">Duas formas de viver o <span style="color:#ffba1a;">Bootcamp</span></h2>
  </div>
  <div class="bc-format__grid">
    <div class="bc-fmt">
      <p class="bc-fmt__label">Online ao vivo</p>
      <h3 class="bc-fmt__name">Transmissão</h3>
      <p class="bc-fmt__free">Gratuito</p>
      <p class="bc-fmt__desc">Transmissão exclusiva para canais e clientes ativos Orbit Gestão, com apoio digital.</p>
      <ul class="bc-fmt__features">
        <li><i class="fa-solid fa-check"></i>4h de imersão ao vivo</li>
        <li><i class="fa-solid fa-check"></i>Acesso a material digital</li>
        <li><i class="fa-solid fa-check"></i>Q&amp;A ao vivo durante o evento</li>
      </ul>
      <a href="#inscricao" class="bc-btn bc-btn--ghost" style="width:100%;justify-content:center;">Quero assistir online</a>
    </div>
    <div class="bc-fmt bc-fmt--featured">
      <p class="bc-fmt__label">Presencial &middot; Florianópolis</p>
      <h3 class="bc-fmt__name">Imersão In Loco</h3>
      <p class="bc-fmt__price">R$150<small>/ vaga</small></p>
      <p class="bc-fmt__desc">Valor 100% revertido para o almoço especial + sessão extra de mentoria com Igor e Christian.</p>
      <ul class="bc-fmt__features">
        <li><i class="fa-solid fa-check"></i>4h de imersão presencial no Square SC</li>
        <li><i class="fa-solid fa-check"></i>Almoço especial com os hosts</li>
        <li><i class="fa-solid fa-check"></i>Mentoria extra durante o almoço</li>
        <li><i class="fa-solid fa-check"></i>Networking com canais Orbit</li>
      </ul>
      <a href="#inscricao" class="bc-btn bc-btn--primary" style="width:100%;justify-content:center;">Garantir vaga presencial</a>
    </div>
  </div>
</section>

<!-- ═══ PRÉ-REQUISITO ═══ -->
<section class="bc-section bc-prereq">
  <div class="bc-prereq__box">
    <div class="bc-prereq__icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
    <div>
      <h3 class="bc-prereq__title">Pré-requisito obrigatório &middot; Agente de Ativação concluído</h3>
      <p class="bc-prereq__text">A participação é exclusiva para consultorias que seguiram e executaram todo o conteúdo do <strong style="color:#fff;">Agente de Ativação de Canal</strong>, disponível no ambiente de cada consultoria dentro do Orbit Gestão. Isso garante que toda a sala esteja no mesmo nível para o trabalho mão na massa.</p>
    </div>
  </div>
</section>

<!-- ═══ FORM ═══ -->
<section class="bc-section bc-form-sec" id="inscricao">
  <div class="bc-container" style="text-align:center;">
    <div class="bc-eyebrow"><i class="fa-solid fa-clipboard-list"></i>Garanta sua vaga</div>
    <h2 class="bc-h2" style="margin-top:20px;">Inscreva-se no <span style="color:#ffba1a;">Bootcamp Orbit</span></h2>
    <p class="bc-lead" style="margin:0 auto;">Vagas limitadas. Confirme abaixo seus dados e a modalidade de participação.</p>
  </div>
  <form class="bc-form" id="bcForm">
    <label class="bc-form__label bc-form__label--req">Nome completo</label>
    <input class="bc-form__input" type="text" name="nome" required placeholder="Seu nome">

    <label class="bc-form__label bc-form__label--req">E-mail</label>
    <input class="bc-form__input" type="email" name="email" required placeholder="voce@empresa.com">

    <label class="bc-form__label bc-form__label--req">Telefone (WhatsApp)</label>
    <input class="bc-form__input" type="tel" name="telefone" required placeholder="(00) 00000-0000">

    <label class="bc-form__label bc-form__label--req">Empresa</label>
    <input class="bc-form__input" type="text" name="empresa" required placeholder="Nome da sua consultoria">

    <label class="bc-form__label bc-form__label--req">Como vai participar?</label>
    <div class="bc-modality">
      <label class="bc-modality__opt is-selected" data-modality="presencial">
        <input type="radio" name="modalidade" value="presencial" checked>
        <div class="bc-modality__title"><i class="fa-solid fa-location-dot"></i>Presencial</div>
        <div class="bc-modality__sub">Florianópolis &middot; R$150 (almoço + mentoria)</div>
      </label>
      <label class="bc-modality__opt" data-modality="online">
        <input type="radio" name="modalidade" value="online">
        <div class="bc-modality__title"><i class="fa-solid fa-video"></i>Online ao vivo</div>
        <div class="bc-modality__sub">Transmissão exclusiva &middot; Gratuito</div>
      </label>
    </div>

    <label class="bc-form__label">O que você espera levar deste evento? <small style="color:#8B949E;font-weight:500;text-transform:none;letter-spacing:0;">(opcional)</small></label>
    <textarea class="bc-form__input bc-form__textarea" name="expectativas" placeholder="Conte-nos seus principais desafios..."></textarea>

    <p class="bc-form__error" id="bcError"></p>
    <button type="submit" class="bc-form__submit" id="bcSubmit">Garantir minha vaga <i class="fa-solid fa-arrow-right" style="margin-left:6px;"></i></button>
    <p class="bc-form__foot">Exclusivo para canais e consultorias clientes ativas Orbit Gestão.</p>
  </form>
  <div class="bc-form" id="bcSuccess" style="display:none;text-align:center;">
    <i class="fa-solid fa-circle-check" style="font-size:3rem;color:#3FB950;margin-bottom:16px;"></i>
    <h3 style="color:#fff;font-size:1.4rem;font-weight:900;margin:0 0 8px;text-transform:uppercase;">Vaga garantida!</h3>
    <p style="color:#C9D1D9;margin:0;">Vamos enviar todos os detalhes do Bootcamp Orbit para seu e-mail e WhatsApp.</p>
  </div>
</section>
`;
