export const pageHTML = `
<style>
/* ═══ CANAL LP — RESET & BASE ═══ */
.cl * { box-sizing: border-box; margin: 0; padding: 0; }
.cl { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background: #0D1117; color: #C9D1D9; line-height: 1.6; overflow-x: hidden; }
.cl a { color: #ffba1a; text-decoration: none; }
.cl .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

/* ═══ NAV ═══ */
.cl-nav { padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.cl-nav .container { display: flex; align-items: center; justify-content: space-between; }
.cl-nav img { height: 36px; }
.cl-nav__cta { background: #ffba1a; color: #0D1117; font-weight: 700; font-size: 14px; padding: 10px 24px; border-radius: 8px; border: none; cursor: pointer; transition: transform .2s; }
.cl-nav__cta:hover { transform: scale(1.03); }

/* ═══ HERO ═══ */
.cl-hero { padding: 80px 0 60px; text-align: center; }
.cl-hero__badge { display: inline-block; background: rgba(255,186,26,0.1); color: #ffba1a; font-size: 13px; font-weight: 600; padding: 6px 16px; border-radius: 20px; margin-bottom: 24px; border: 1px solid rgba(255,186,26,0.2); }
.cl-hero h1 { font-size: clamp(28px, 5vw, 48px); font-weight: 800; color: #fff; line-height: 1.15; max-width: 800px; margin: 0 auto 20px; }
.cl-hero h1 span { color: #ffba1a; }
.cl-hero__sub { font-size: clamp(16px, 2.5vw, 20px); color: #8B949E; max-width: 640px; margin: 0 auto 40px; line-height: 1.6; }
.cl-hero__video { max-width: 720px; margin: 0 auto 32px; border-radius: 12px; overflow: hidden; background: #161b22; aspect-ratio: 16/9; position: relative; cursor: pointer; }
.cl-hero__video img { width: 100%; height: 100%; object-fit: cover; }
.cl-hero__video .play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 72px; height: 72px; background: rgba(255,186,26,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: transform .2s; }
.cl-hero__video .play-btn::after { content: ''; border-left: 20px solid #0D1117; border-top: 12px solid transparent; border-bottom: 12px solid transparent; margin-left: 4px; }
.cl-hero__video:hover .play-btn { transform: translate(-50%,-50%) scale(1.1); }

/* ═══ CTA BUTTON ═══ */
.cl-btn { display: inline-block; background: #ffba1a; color: #0D1117; font-weight: 700; font-size: 16px; padding: 16px 40px; border-radius: 8px; border: none; cursor: pointer; letter-spacing: 0.3px; transition: transform .2s, box-shadow .2s; }
.cl-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,186,26,0.3); }
.cl-btn--lg { font-size: 18px; padding: 18px 48px; }
.cl-btn--red { background: #DC2626; color: #fff; }
.cl-sub-cta { font-size: 14px; color: #8B949E; margin-top: 12px; }

/* ═══ SECTIONS ═══ */
.cl-section { padding: 80px 0; }
.cl-section--alt { background: #161b22; }
.cl-section__title { font-size: clamp(24px, 4vw, 36px); font-weight: 800; color: #fff; text-align: center; margin-bottom: 48px; }
.cl-section__title span { color: #ffba1a; }

/* ═══ CARDS (3-col) ═══ */
.cl-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 40px; }
.cl-card { background: #0D1117; border: 1px solid #21262d; border-radius: 12px; padding: 32px; text-align: center; transition: border-color .3s; }
.cl-card:hover { border-color: #ffba1a; }
.cl-card__icon { font-size: 36px; margin-bottom: 16px; }
.cl-card__title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.cl-card__text { font-size: 15px; color: #8B949E; }

/* ═══ HIGHLIGHT BOX ═══ */
.cl-highlight { background: rgba(255,186,26,0.06); border: 1px solid rgba(255,186,26,0.15); border-radius: 12px; padding: 24px 32px; text-align: center; font-size: 17px; color: #C9D1D9; }
.cl-highlight strong { color: #ffba1a; }
.cl-highlight small { display: block; margin-top: 8px; color: #8B949E; font-size: 13px; }

/* ═══ TIMELINE ═══ */
.cl-timeline { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0; margin-bottom: 40px; }
.cl-timeline__step { position: relative; padding: 32px; border-left: 3px solid #21262d; }
.cl-timeline__step:first-child { border-left-color: #ffba1a; }
.cl-timeline__step:last-child { border-left-color: #22C55E; }
.cl-timeline__label { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #ffba1a; margin-bottom: 8px; }
.cl-timeline__step:last-child .cl-timeline__label { color: #22C55E; }
.cl-timeline__title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.cl-timeline__text { font-size: 15px; color: #8B949E; }

/* ═══ MATH TABLE ═══ */
.cl-math { max-width: 600px; margin: 0 auto 32px; }
.cl-math__row { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid #21262d; }
.cl-math__row:last-child { border-bottom: none; background: rgba(34,197,94,0.06); border-radius: 0 0 12px 12px; }
.cl-math__label { font-size: 16px; color: #8B949E; }
.cl-math__value { font-size: 20px; font-weight: 700; color: #fff; }
.cl-math__value--green { color: #22C55E; font-size: 24px; }
.cl-math__value--gold { color: #ffba1a; }

/* ═══ MATH BIG (Copy B) ═══ */
.cl-math-big { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 700px; margin: 0 auto 32px; }
.cl-math-big__item { background: #0D1117; border: 1px solid #21262d; border-radius: 12px; padding: 24px; text-align: center; }
.cl-math-big__number { font-size: clamp(28px, 4vw, 40px); font-weight: 800; color: #22C55E; }
.cl-math-big__label { font-size: 14px; color: #8B949E; margin-top: 4px; }

/* ═══ PROOF ═══ */
.cl-proof { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; text-align: center; margin-bottom: 40px; }
.cl-proof__number { font-size: clamp(32px, 5vw, 48px); font-weight: 800; color: #ffba1a; }
.cl-proof__label { font-size: 15px; color: #8B949E; }

/* ═══ FAQ ═══ */
.cl-faq { max-width: 700px; margin: 0 auto; }
.cl-faq__item { border-bottom: 1px solid #21262d; }
.cl-faq__q { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; cursor: pointer; font-size: 16px; font-weight: 600; color: #fff; }
.cl-faq__q::after { content: '+'; font-size: 24px; color: #ffba1a; transition: transform .3s; flex-shrink: 0; margin-left: 16px; }
.cl-faq__item.open .cl-faq__q::after { transform: rotate(45deg); }
.cl-faq__a { max-height: 0; overflow: hidden; transition: max-height .3s ease; }
.cl-faq__item.open .cl-faq__a { max-height: 500px; }
.cl-faq__a p { padding: 0 0 20px; font-size: 15px; color: #8B949E; line-height: 1.7; }

/* ═══ CTA FINAL ═══ */
.cl-cta-final { padding: 80px 0; text-align: center; background: linear-gradient(180deg, #0D1117 0%, #161b22 100%); }
.cl-cta-final h2 { font-size: clamp(24px, 4vw, 36px); font-weight: 800; color: #fff; margin-bottom: 24px; }

/* ═══ FOOTER ═══ */
.cl-footer { padding: 24px 0; border-top: 1px solid #21262d; text-align: center; font-size: 13px; color: #484F58; }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 768px) {
  .cl-hero { padding: 48px 0 40px; }
  .cl-section { padding: 48px 0; }
  .cl-timeline { grid-template-columns: 1fr; }
  .cl-cards { grid-template-columns: 1fr; }
}

/* ═══ HIDDEN TOGGLE ═══ */
.cl-va, .cl-vb { display: none; }
body.version-a .cl-va { display: block; }
body.version-b .cl-vb { display: block; }
body.version-a .cl-va-inline { display: inline; }
body.version-b .cl-vb-inline { display: inline; }
body.version-a .cl-va-flex { display: flex; }
body.version-b .cl-vb-flex { display: flex; }
body.version-a .cl-va-grid { display: grid; }
body.version-b .cl-vb-grid { display: grid; }
</style>

<div class="cl">

<!-- ═══ NAV ═══ -->
<nav class="cl-nav">
  <div class="container">
    <a href="/"><img src="/images/logo-orbit-white.png" alt="Orbit Gestão" width="102" height="40"></a>
    <button class="cl-nav__cta" onclick="document.getElementById('ctaFinal').scrollIntoView({behavior:'smooth'})">AGENDAR CONVERSA</button>
  </div>
</nav>

<!-- ═══ HERO ═══ -->
<section class="cl-hero">
  <div class="container">
    <div class="cl-hero__badge"><i class="fas fa-rocket" style="margin-right:6px;"></i> Programa de Canais Orbit</div>

    <!-- COPY A Hero -->
    <div class="cl-va">
      <h1>Você entrega. O cliente não mantém. O resultado se perde. <span>Até agora.</span></h1>
      <p class="cl-hero__sub">Agentes de IA que trabalham com você durante o projeto e continuam executando no cliente depois. O ciclo se quebra. A recorrência começa.</p>
    </div>

    <!-- COPY B Hero -->
    <div class="cl-vb">
      <h1><span>R$600</span> de custo. <span>R$3.000</span> de receita. <span>80%</span> de margem. Todo mês.</h1>
      <p class="cl-hero__sub">Agentes de IA que operam a gestão no cliente com a sua marca. Você vende consultoria recorrente sem entregar mais horas.</p>
    </div>

    <!-- Video placeholder -->
    <div class="cl-hero__video" id="videoWrapper">
      <div class="cl-va"><img src="/images/og-image.png" alt="VSL A" id="thumbA"></div>
      <div class="cl-vb"><img src="/images/og-image.png" alt="VSL B" id="thumbB"></div>
      <div class="play-btn"></div>
    </div>

    <div class="cl-va"><button class="cl-btn cl-btn--lg" onclick="document.getElementById('ctaFinal').scrollIntoView({behavior:'smooth'})">QUERO QUEBRAR ESSE CICLO</button></div>
    <div class="cl-vb"><button class="cl-btn cl-btn--lg" onclick="document.getElementById('ctaFinal').scrollIntoView({behavior:'smooth'})">QUERO ENTENDER O MODELO</button></div>
  </div>
</section>

<!-- ═══ SEÇÃO 2: PROBLEMA (A) / OPORTUNIDADE (B) ═══ -->
<section class="cl-section cl-section--alt">
  <div class="container">

    <!-- COPY A — Problema -->
    <div class="cl-va">
      <h2 class="cl-section__title">O ciclo que <span>todo consultor</span> conhece</h2>
      <div class="cl-cards">
        <div class="cl-card">
          <div class="cl-card__icon">✅</div>
          <div class="cl-card__title">Você entrega o projeto</div>
          <div class="cl-card__text">Diagnóstico, plano, indicadores. Tudo redondo. O cliente sai satisfeito.</div>
        </div>
        <div class="cl-card">
          <div class="cl-card__icon">📉</div>
          <div class="cl-card__title">O cliente não mantém</div>
          <div class="cl-card__text">Sem equipe, sem tempo, sem disciplina. Em 3 meses, tudo volta ao estado anterior.</div>
        </div>
        <div class="cl-card">
          <div class="cl-card__icon">🔄</div>
          <div class="cl-card__title">Você caça novo cliente</div>
          <div class="cl-card__text">E o ciclo recomeça. Receita instável. Resultado que se perde. Frustração recorrente.</div>
        </div>
      </div>
      <div class="cl-highlight">
        <strong>70% dos projetos de consultoria não sustentam resultados em 12 meses.</strong>
        <small>— McKinsey & Company</small>
      </div>
    </div>

    <!-- COPY B — Oportunidade -->
    <div class="cl-vb">
      <h2 class="cl-section__title">O mercado está se movendo. <span>Você está posicionado?</span></h2>
      <div class="cl-cards">
        <div class="cl-card">
          <div class="cl-card__icon">🤖</div>
          <div class="cl-card__title">94% cobertas por IA</div>
          <div class="cl-card__text">94% das funções administrativas podem ser cobertas por IA. Só 33% estão.</div>
          <div style="margin-top:8px;font-size:12px;color:#484F58;">— Anthropic</div>
        </div>
        <div class="cl-card">
          <div class="cl-card__icon">🚀</div>
          <div class="cl-card__title">11% em produção</div>
          <div class="cl-card__text">Apenas 11% usam IA agêntica em produção. 38% estão em piloto.</div>
          <div style="margin-top:8px;font-size:12px;color:#484F58;">— Deloitte</div>
        </div>
        <div class="cl-card">
          <div class="cl-card__icon">⚡</div>
          <div class="cl-card__title">Janela aberta</div>
          <div class="cl-card__text">Quem ocupar esse espaço agora define o padrão do mercado.</div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ═══ SEÇÃO 3: SOLUÇÃO (A) / COMO FUNCIONA (B) ═══ -->
<section class="cl-section">
  <div class="container">

    <!-- COPY A — Solução -->
    <div class="cl-va">
      <h2 class="cl-section__title">E se os agentes de IA <span>continuassem executando?</span></h2>
      <div class="cl-timeline">
        <div class="cl-timeline__step">
          <div class="cl-timeline__label">DURANTE</div>
          <div class="cl-timeline__title">Agentes trabalham com você</div>
          <div class="cl-timeline__text">Organizam dados, estruturam indicadores, aceleram entregas. Você foca no que importa.</div>
        </div>
        <div class="cl-timeline__step">
          <div class="cl-timeline__label" style="color:#C9D1D9;">DEPOIS</div>
          <div class="cl-timeline__title">O projeto termina. Os agentes não param.</div>
          <div class="cl-timeline__text">Monitoram, cobram, alertam. 24 horas por dia, 7 dias por semana. Sem você precisar estar lá.</div>
        </div>
        <div class="cl-timeline__step">
          <div class="cl-timeline__label">RESULTADO</div>
          <div class="cl-timeline__title">Recorrência real</div>
          <div class="cl-timeline__text">O cliente paga pela operação contínua. Você ganha na recorrência. Sem entregar mais horas.</div>
        </div>
      </div>
    </div>

    <!-- COPY B — Como Funciona -->
    <div class="cl-vb">
      <h2 class="cl-section__title">O modelo em <span>3 passos</span></h2>
      <div class="cl-timeline">
        <div class="cl-timeline__step">
          <div class="cl-timeline__label">PASSO 1</div>
          <div class="cl-timeline__title">Configure com sua metodologia</div>
          <div class="cl-timeline__text">Você configura os agentes com a sua metodologia. White-label completo — sua marca, sua URL.</div>
        </div>
        <div class="cl-timeline__step">
          <div class="cl-timeline__label" style="color:#C9D1D9;">PASSO 2</div>
          <div class="cl-timeline__title">Agentes trabalham durante e depois</div>
          <div class="cl-timeline__text">Os agentes trabalham com você durante o projeto e continuam operando no cliente depois.</div>
        </div>
        <div class="cl-timeline__step">
          <div class="cl-timeline__label">PASSO 3</div>
          <div class="cl-timeline__title">Recorrência real</div>
          <div class="cl-timeline__text">O cliente paga mensalidade. Você retém a margem. Recorrência real sem entregar mais horas.</div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ═══ SEÇÃO 4: MATEMÁTICA ═══ -->
<section class="cl-section cl-section--alt">
  <div class="container">

    <!-- COPY A — Matemática -->
    <div class="cl-va">
      <h2 class="cl-section__title">A conta que <span>muda o modelo</span></h2>
      <div class="cl-math" style="background:#0D1117;border:1px solid #21262d;border-radius:12px;overflow:hidden;">
        <div class="cl-math__row">
          <span class="cl-math__label">Seu custo por cliente</span>
          <span class="cl-math__value">R$ 600/mês</span>
        </div>
        <div class="cl-math__row">
          <span class="cl-math__label">Sua venda</span>
          <span class="cl-math__value cl-math__value--gold">R$ 3.000/mês</span>
        </div>
        <div class="cl-math__row">
          <span class="cl-math__label">Sua margem</span>
          <span class="cl-math__value cl-math__value--green">80%</span>
        </div>
        <div class="cl-math__row">
          <span class="cl-math__label">Com 10 clientes</span>
          <span class="cl-math__value cl-math__value--green">R$ 24.000/mês</span>
        </div>
      </div>
      <p style="text-align:center;font-size:16px;color:#8B949E;">Sem entregar mais horas. Os agentes fazem o trabalho pesado.</p>
    </div>

    <!-- COPY B — Matemática Agressiva -->
    <div class="cl-vb">
      <h2 class="cl-section__title">A matemática é <span>simples</span></h2>
      <div class="cl-math-big">
        <div class="cl-math-big__item">
          <div class="cl-math-big__number">R$600</div>
          <div class="cl-math-big__label">Seu custo/mês por cliente</div>
        </div>
        <div class="cl-math-big__item">
          <div class="cl-math-big__number">R$3.000</div>
          <div class="cl-math-big__label">Sua venda/mês (média)</div>
        </div>
        <div class="cl-math-big__item">
          <div class="cl-math-big__number" style="color:#ffba1a;">80%</div>
          <div class="cl-math-big__label">Margem líquida</div>
        </div>
        <div class="cl-math-big__item">
          <div class="cl-math-big__number">R$24k</div>
          <div class="cl-math-big__label">10 clientes/mês</div>
        </div>
        <div class="cl-math-big__item">
          <div class="cl-math-big__number">R$48k</div>
          <div class="cl-math-big__label">20 clientes/mês</div>
        </div>
      </div>
      <p style="text-align:center;font-size:16px;color:#8B949E;">Sem entregar mais horas. Sem contratar equipe. Os agentes fazem o trabalho pesado.</p>
    </div>

  </div>
</section>

<!-- ═══ SEÇÃO 5: PROVA ═══ -->
<section class="cl-section">
  <div class="container">

    <div class="cl-va">
      <h2 class="cl-section__title">Você faz parte dessa história. <span>O próximo capítulo começa agora.</span></h2>
    </div>
    <div class="cl-vb">
      <h2 class="cl-section__title"><span>30 anos</span> de consultoria. 2.000+ empresas. Agora com IA.</h2>
    </div>

    <div class="cl-proof">
      <div>
        <div class="cl-proof__number">30+</div>
        <div class="cl-proof__label">Anos no mercado de gestão</div>
      </div>
      <div>
        <div class="cl-proof__number">2.000+</div>
        <div class="cl-proof__label">Empresas atendidas</div>
      </div>
      <div>
        <div class="cl-proof__number">30+</div>
        <div class="cl-proof__label">Canais ativos na plataforma</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══ FAQ ═══ -->
<section class="cl-section cl-section--alt">
  <div class="container">
    <h2 class="cl-section__title">Perguntas <span>frequentes</span></h2>
    <div class="cl-faq">
      <div class="cl-faq__item">
        <div class="cl-faq__q">Preciso ter experiência com IA?</div>
        <div class="cl-faq__a"><p>Não. A Orbit cuida de toda a tecnologia. Você foca na sua metodologia e no relacionamento com o cliente. Os agentes são configurados e mantidos pela plataforma.</p></div>
      </div>
      <div class="cl-faq__item">
        <div class="cl-faq__q">Como funciona o white-label?</div>
        <div class="cl-faq__a"><p>Sua marca, sua URL, seu logo. O cliente vê a plataforma como se fosse sua. Toda a infraestrutura de IA roda por trás, invisível pro cliente final.</p></div>
      </div>
      <div class="cl-faq__item">
        <div class="cl-faq__q">Qual o investimento mínimo?</div>
        <div class="cl-faq__a"><p>O custo por cliente na plataforma é a partir de R$600/mês. Não há taxa de adesão ou mensalidade fixa obrigatória — você paga por cliente ativo.</p></div>
      </div>
      <div class="cl-faq__item">
        <div class="cl-faq__q">Posso usar minha metodologia própria?</div>
        <div class="cl-faq__a"><p>Sim. Os agentes são configuráveis. Você define processos, indicadores, cadências e instruções. A plataforma executa a sua metodologia, não a nossa.</p></div>
      </div>
      <div class="cl-faq__item">
        <div class="cl-faq__q">E se o cliente cancelar?</div>
        <div class="cl-faq__a"><p>Como os agentes entregam valor contínuo (monitoramento, alertas, execução), a retenção tende a ser muito superior à consultoria tradicional. Mas o modelo é mensal — sem multa, sem lock-in.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ═══ CTA FINAL ═══ -->
<section class="cl-cta-final" id="ctaFinal">
  <div class="container">

    <div class="cl-va">
      <h2>Pronto para <span style="color:#ffba1a;">quebrar o ciclo?</span></h2>
      <button class="cl-btn cl-btn--lg" onclick="window.open('https://orbitgestao.com.br/chat','_blank')">AGENDAR MINHA CONVERSA</button>
      <p class="cl-sub-cta">Sem compromisso. 15 minutos pra entender se faz sentido pra você.</p>
    </div>

    <div class="cl-vb">
      <h2>Pronto para <span style="color:#ffba1a;">montar o seu modelo?</span></h2>
      <button class="cl-btn cl-btn--lg" onclick="window.open('https://orbitgestao.com.br/chat','_blank')">AGENDAR MINHA CONVERSA</button>
      <p class="cl-sub-cta">15 minutos para alinhar pricing, white-label e primeiros passos.</p>
    </div>

  </div>
</section>

<!-- ═══ FOOTER ═══ -->
<footer class="cl-footer">
  <div class="container">
    <p>Orbit Gestão — Gestão Operada por IA © 2026</p>
  </div>
</footer>

</div>

<script>
(function() {
  // Lê parâmetros
  var params = new URLSearchParams(window.location.search);
  var s = params.get('s') || '1';
  var v = params.get('v');

  // Se v não foi definido, randomiza 50/50 e salva no sessionStorage
  if (!v) {
    var stored = sessionStorage.getItem('__cl_version');
    if (stored) {
      v = stored;
    } else {
      v = Math.random() < 0.5 ? 'a' : 'b';
      sessionStorage.setItem('__cl_version', v);
    }
    // Atualiza URL sem reload
    var url = new URL(window.location.href);
    url.searchParams.set('v', v);
    url.searchParams.set('s', s);
    history.replaceState(null, '', url.toString());
  }

  // Aplica a classe no body
  document.body.classList.add(v === 'b' ? 'version-b' : 'version-a');

  // FAQ toggle
  document.querySelectorAll('.cl-faq__q').forEach(function(q) {
    q.addEventListener('click', function() {
      this.parentElement.classList.toggle('open');
    });
  });

  // Track: salvar versão para analytics
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'lp_canal_view',
      lp_version: v,
      lp_segment: s
    });
  }
})();
</script>
`;
