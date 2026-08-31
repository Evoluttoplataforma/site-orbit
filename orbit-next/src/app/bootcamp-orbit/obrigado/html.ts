export const pageHTML = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=JetBrains+Mono:wght@500;700&display=swap');

  .bco-page { background: #0A0E13; color: #E6E8EB; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; min-height: 100vh; padding: 60px 20px; position: relative; overflow: hidden; }
  .bco-page::before {
    content: ''; position: absolute; inset: 0;
    background-image: url('/images/bootcamp/camuflagem.webp');
    background-size: cover; background-position: center;
    opacity: 0.18; pointer-events: none;
  }
  .bco-page::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, rgba(10,14,19,0.50) 0%, rgba(10,14,19,0.95) 100%);
    pointer-events: none;
  }

  /* Listras de perigo no topo */
  .bco-stripes { position: fixed; top: 0; left: 0; right: 0; height: 14px; background: repeating-linear-gradient(45deg, #F5C518 0 24px, #0A0E13 24px 48px); z-index: 10; }

  .bco-container { position: relative; z-index: 1; max-width: 720px; margin: 40px auto 0; text-align: center; }

  /* Carimbo MISSAO APROVADA */
  .bco-stamp {
    max-width: 380px; width: 80%; height: auto; margin: 0 auto 30px;
    display: block;
    filter: drop-shadow(6px 6px 0 rgba(0,0,0,0.5));
    transform: rotate(-4deg);
    animation: bco-stamp-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes bco-stamp-in {
    0% { opacity: 0; transform: rotate(-25deg) scale(0.3); }
    100% { opacity: 1; transform: rotate(-4deg) scale(1); }
  }

  .bco-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 7px 18px; background: rgba(63,185,80,0.10);
    border: 1px solid #3FB950; color: #3FB950;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    margin-bottom: 16px;
  }

  .bco-h1 {
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: clamp(1.8rem, 4.5vw, 2.8rem);
    line-height: 1.1; color: #fff;
    margin: 0 0 16px; text-transform: uppercase;
    text-shadow: 3px 3px 0 #000;
    letter-spacing: 0.5px;
  }
  .bco-h1 .accent { color: #ffba1a; }
  .bco-sub { color: #C9D1D9; font-size: 1.1rem; line-height: 1.6; margin: 0 auto 32px; max-width: 580px; }

  /* Briefing operacional — card */
  .bco-briefing {
    background: linear-gradient(180deg, rgba(75,83,32,0.20) 0%, rgba(13,17,23,0.95) 100%);
    border: 2px solid #4B5320;
    margin: 32px auto;
    text-align: left;
    max-width: 640px;
    position: relative;
  }
  .bco-briefing__head {
    background: #4B5320; color: #ffba1a;
    padding: 12px 20px;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase;
    text-align: center;
  }
  .bco-briefing__body { padding: 24px 28px; }
  .bco-briefing__row {
    display: flex; gap: 14px; padding: 12px 0;
    border-bottom: 1px dashed rgba(107,115,57,0.30);
    font-family: 'JetBrains Mono', monospace;
  }
  .bco-briefing__row:last-child { border-bottom: none; }
  .bco-briefing__label {
    color: #6B7339; min-width: 110px;
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1.5px; padding-top: 2px;
  }
  .bco-briefing__value { color: #fff; font-size: 14px; flex: 1; }
  .bco-briefing__value strong { color: #ffba1a; }

  /* Próximos passos */
  .bco-steps {
    margin: 40px auto 32px;
    max-width: 640px; text-align: left;
  }
  .bco-steps__title {
    font-family: 'Black Ops One', impact, sans-serif;
    color: #ffba1a; font-size: 1.2rem;
    text-align: center; text-transform: uppercase;
    letter-spacing: 2px; margin: 0 0 24px;
  }
  .bco-step {
    display: flex; gap: 16px; padding: 16px 20px;
    background: rgba(43,57,40,0.30);
    border-left: 3px solid #ffba1a;
    margin-bottom: 12px;
  }
  .bco-step__num {
    width: 38px; height: 38px;
    background: #ffba1a; color: #0A0E13;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 16px; flex-shrink: 0;
    box-shadow: 3px 3px 0 #000;
  }
  .bco-step__content { flex: 1; }
  .bco-step__title {
    color: #fff; font-family: 'Black Ops One', impact, sans-serif;
    font-size: 0.95rem; letter-spacing: 1px;
    text-transform: uppercase; margin: 2px 0 4px;
  }
  .bco-step__desc { color: #C9D1D9; font-size: 0.92rem; line-height: 1.5; margin: 0; }

  /* CTAs ação imediata */
  .bco-ctas {
    display: flex; gap: 12px; justify-content: center;
    flex-wrap: wrap; margin: 32px 0 24px;
  }
  .bco-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 28px; border-radius: 0;
    font-family: 'Black Ops One', impact, sans-serif;
    font-size: 13px; letter-spacing: 1.5px;
    text-transform: uppercase; text-decoration: none;
    transition: all 0.2s;
    border: 2px solid transparent; cursor: pointer;
  }
  .bco-btn--wa {
    background: #25D366; color: #fff;
    border-color: #25D366;
    box-shadow: 4px 4px 0 #000;
  }
  .bco-btn--wa:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #000; }
  .bco-btn--ghost {
    background: transparent; color: #ffba1a;
    border-color: #ffba1a;
  }
  .bco-btn--ghost:hover { background: #ffba1a; color: #0A0E13; }

  .bco-foot {
    font-family: 'JetBrains Mono', monospace;
    color: #6B7339; font-size: 11px;
    letter-spacing: 1.5px; text-transform: uppercase;
    margin-top: 32px;
    text-align: center;
  }

  @media (max-width: 600px) {
    .bco-briefing__row { flex-direction: column; gap: 4px; padding: 10px 0; }
    .bco-briefing__label { min-width: 0; }
    .bco-step { padding: 14px 16px; }
    .bco-step__num { width: 32px; height: 32px; font-size: 14px; }
  }

  /* Esconde widgets globais nessa LP */
  .whatsapp-widget, [class*="whatsapp"], #livePopupOverlay,
  .orbit-banner--popup-center, .orbit-banner--popup-side,
  .orbit-banner--floating-bottom { display: none !important; }
</style>

<div class="bco-stripes"></div>
<section class="bco-page">
  <div class="bco-container">
    <img id="bcoStamp" src="/images/bootcamp/missao-aprovada.webp" alt="Missão confirmada" class="bco-stamp" loading="eager">

    <div class="bco-eyebrow" id="bcoEyebrow"><i class="fa-solid fa-circle-check"></i>Inscrição recebida</div>
    <h1 class="bco-h1" id="bcoTitle">Bem-vindo ao <span class="accent">Bootcamp Canais Orbit</span>, recruta</h1>
    <p class="bco-sub" id="bcoSub"><span id="bcoNome"></span></p>
    <div id="bcoBenefits" style="display:none;margin:0 auto 28px;max-width:640px;text-align:left;color:#C9D1D9;font-size:15px;line-height:1.65;"></div>

    <!-- BRIEFING DA OPERAÇÃO -->
    <div class="bco-briefing">
      <div class="bco-briefing__head">◢ Briefing da Operação ◣</div>
      <div class="bco-briefing__body">
        <div class="bco-briefing__row">
          <span class="bco-briefing__label">▸ Data</span>
          <span class="bco-briefing__value"><strong>15 de outubro de 2026</strong> · quinta</span>
        </div>
        <div class="bco-briefing__row">
          <span class="bco-briefing__label">▸ Horário</span>
          <span class="bco-briefing__value" id="bcoHorario"><strong>08h30 às 12h30</strong> (BRT)</span>
        </div>
        <div class="bco-briefing__row">
          <span class="bco-briefing__label">▸ Modalidade</span>
          <span class="bco-briefing__value" id="bcoModalidade"><strong>—</strong></span>
        </div>
        <div class="bco-briefing__row" id="bcoLocalRow">
          <span class="bco-briefing__label">▸ Local</span>
          <span class="bco-briefing__value" id="bcoLocal"><strong>Square SC</strong> · Florianópolis · SC</span>
        </div>
      </div>
    </div>

    <div id="bcoWaitlist" style="display:none;margin:0 0 28px;background:rgba(199,62,29,0.12);border:1px solid #C73E1D;padding:24px;text-align:center;">
      <h3 style="color:#fff;font-family:'Black Ops One',impact,sans-serif;font-size:1.4rem;margin:0 0 8px;text-transform:uppercase;">Lista de espera presencial</h3>
      <p style="color:#C9D1D9;font-size:14px;line-height:1.6;margin:0;">As 40 vagas presenciais já foram preenchidas. Seu nome foi registrado na lista de espera e nossa equipe poderá entrar em contato pelos dados cadastrados se houver disponibilidade.</p>
    </div>

    <!-- PAGAMENTO (só presencial) -->
    <div id="bcoPagamento" style="display:none;margin:0 0 28px;background:linear-gradient(135deg,rgba(255,186,26,0.12),rgba(199,62,29,0.10));border:1px solid #ffba1a;border-radius:14px;padding:24px;text-align:center;">
      <div style="font-family:'Black Ops One',impact,sans-serif;color:#ffba1a;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">⚠ Falta 1 passo pra garantir sua vaga</div>
      <h3 style="color:#fff;font-family:'Black Ops One',impact,sans-serif;font-size:1.4rem;margin:0 0 6px;text-transform:uppercase;">Confirme sua participação no Bootcamp presencial · R$250</h3>
      <p style="color:#C9D1D9;font-size:14px;line-height:1.6;margin:0 0 18px;">Para garantir sua vaga, acesse o seu perfil de administrador no Orbit e realize o pagamento até 15 de setembro.</p>
      <a data-payment-mode="presencial" href="https://app.orbitgestao.com.br/login" target="_blank" rel="noopener"
         style="display:inline-flex;align-items:center;gap:10px;background:#ffba1a;color:#0A0E13;font-family:'Black Ops One',impact,sans-serif;font-size:16px;letter-spacing:1px;text-transform:uppercase;padding:16px 38px;border-radius:9px;text-decoration:none;box-shadow:0 8px 26px rgba(255,186,26,0.32);">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Ir para o pagamento
      </a>
      <p style="color:#8B7355;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:1px;margin:14px 0 0;">Acesso seguro ao perfil administrador Orbit</p>
    </div>

    <!-- ZOOM (só online) -->
    <div id="bcoZoom" style="display:none;margin:0 0 28px;background:linear-gradient(135deg,rgba(45,140,255,0.12),rgba(13,17,23,0.6));border:1px solid rgba(45,140,255,0.4);border-radius:14px;padding:24px;text-align:center;">
      <div style="font-family:'Black Ops One',impact,sans-serif;color:#2D8CFF;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">Link da transmissão</div>
      <h3 style="color:#fff;font-family:'Black Ops One',impact,sans-serif;font-size:1.4rem;margin:0 0 6px;text-transform:uppercase;">Você já está no Zoom</h3>
      <p style="color:#C9D1D9;font-size:14px;line-height:1.6;margin:0;">Inscrevemos você na reunião automaticamente. O link exclusivo da sala chega no e-mail (e na confirmação do Zoom). Confira também o spam.</p>
    </div>

    <!-- MENTORIA -->
    <div id="bcoMentoriaPay" style="display:none;margin:0 0 28px;background:linear-gradient(135deg,rgba(255,186,26,0.12),rgba(13,17,23,0.6));border:1px solid #ffba1a;border-radius:14px;padding:24px;text-align:center;">
      <div style="font-family:'Black Ops One',impact,sans-serif;color:#ffba1a;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">⚠ Falta 1 passo pra garantir sua vaga</div>
      <h3 style="color:#fff;font-family:'Black Ops One',impact,sans-serif;font-size:1.4rem;margin:0 0 6px;text-transform:uppercase;">Confirme sua participação na mentoria presencial · R$2.500</h3>
      <p style="color:#C9D1D9;font-size:14px;line-height:1.6;margin:0 0 18px;">Para garantir sua vaga no Bootcamp + mentoria presencial, acesse o seu perfil de administrador no Orbit e realize o pagamento até 15 de setembro.</p>
      <a data-payment-mode="mentoria" href="https://app.orbitgestao.com.br/login" target="_blank" rel="noopener"
         style="display:inline-flex;align-items:center;gap:10px;background:#ffba1a;color:#0A0E13;font-family:'Black Ops One',impact,sans-serif;font-size:16px;letter-spacing:1px;text-transform:uppercase;padding:16px 38px;border-radius:9px;text-decoration:none;box-shadow:0 8px 26px rgba(255,186,26,0.32);">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Ir para o pagamento
      </a>
      <p style="color:#8B7355;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:1px;margin:14px 0 0;">Acesso seguro ao perfil administrador Orbit</p>
    </div>

    <!-- PRÓXIMOS PASSOS -->
    <div class="bco-steps">
      <h2 class="bco-steps__title">Próximos passos · ordem do comando</h2>

      <div class="bco-step">
        <div class="bco-step__num">01</div>
        <div class="bco-step__content">
          <h3 class="bco-step__title">Confirmação no e-mail</h3>
          <p class="bco-step__desc">Você vai receber um e-mail nos próximos minutos com todas as coordenadas, link da transmissão (se online) e arquivo .ics pra adicionar na agenda.</p>
        </div>
      </div>

      <div class="bco-step">
        <div class="bco-step__num">02</div>
        <div class="bco-step__content">
          <h3 class="bco-step__title">Entre no grupo dos recrutas</h3>
          <p class="bco-step__desc">Grupo de WhatsApp exclusivo onde Igor e Christian compartilham o briefing pré-bootcamp e respondem dúvidas. Clique no botão abaixo pra entrar.</p>
        </div>
      </div>

      <div class="bco-step">
        <div class="bco-step__num">03</div>
        <div class="bco-step__content">
          <h3 class="bco-step__title">Lembretes ativados</h3>
          <p class="bco-step__desc">Vamos te lembrar 7 dias antes, 1 dia antes e na manhã do Bootcamp, por e-mail.</p>
        </div>
      </div>
    </div>

    <!-- CTAs -->
    <div class="bco-ctas">
      <a href="https://chat.whatsapp.com/HeVwpSJYmNw86wp7dCaxXB" target="_blank" rel="noopener" class="bco-btn bco-btn--wa">
        <i class="fa-brands fa-whatsapp" style="font-size:18px;"></i>
        Entrar no grupo dos recrutas
      </a>
      <a href="/bootcamp-orbit" class="bco-btn bco-btn--ghost">
        <i class="fa-solid fa-arrow-left"></i>
        Voltar ao QG
      </a>
    </div>

    <p class="bco-foot">[ INSCRIÇÃO RECEBIDA · BOOTCAMP CANAIS ORBIT · ★ ESTÁVEL ★ ]</p>
  </div>
</section>
`;
