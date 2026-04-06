'use client';

import { PageLayout } from '@/components/PageLayout';

const html = `
<!-- HERO -->
<section class="hero-zoom" style="min-height:80vh;">
  <div class="hero-zoom__bg">
    <div class="hero-zoom__glow hero-zoom__glow--1"></div>
    <div class="hero-zoom__glow hero-zoom__glow--2"></div>
  </div>
  <div class="container" style="position:relative;z-index:1;">
    <div class="hero-zoom__header" data-reveal>
      <span class="hero-zoom__badge">Agente Estratégico</span>
      <h1 class="hero-zoom__title" style="background:linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.7) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
        Sua empresa não precisa de mais estratégia.<br>
        Precisa de estratégia sendo <span style="color:#ffba1a;-webkit-text-fill-color:#ffba1a;">executada todos os dias.</span>
      </h1>
      <p class="hero-zoom__subtitle">
        Enquanto você planeja, ajusta e reprioriza... nada realmente muda na operação. O Orbit transforma decisões em execução contínua.
      </p>
      <div style="display:flex;flex-direction:column;gap:12px;align-items:center;margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.6);font-size:0.9rem;">
          <span style="color:#22C55E;"><i class="fas fa-check-circle"></i></span> Reuniões viram plano automaticamente
        </div>
        <div style="display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.6);font-size:0.9rem;">
          <span style="color:#22C55E;"><i class="fas fa-check-circle"></i></span> Prioridades deixam de depender de você
        </div>
        <div style="display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.6);font-size:0.9rem;">
          <span style="color:#22C55E;"><i class="fas fa-check-circle"></i></span> A estratégia passa a rodar todos os dias
        </div>
      </div>
      <div class="hero-zoom__ctas">
        <a href="/chat" class="btn btn-primary btn-lg">Ver demonstração</a>
      </div>
      <p class="hero-zoom__note">Veja como isso funcionaria na sua empresa.</p>
    </div>
  </div>
</section>

<!-- QUEBRA DE CRENÇA -->
<section style="background:#161B22;padding:120px 0;text-align:center;position:relative;overflow:hidden;">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:500px;background:radial-gradient(circle,rgba(255,186,26,0.06) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
  <div class="container" style="max-width:800px;position:relative;z-index:1;" data-reveal>
    <h2 style="color:#fff;font-size:clamp(28px,4vw,44px);font-weight:800;margin-bottom:24px;line-height:1.2;">
      Planejamento estratégico não resolve o problema da sua empresa.
    </h2>
    <p style="color:#8B949E;font-size:1.15rem;line-height:1.8;">
      Você já definiu metas. Já fez reuniões. Já alinhou direção.<br>
      E mesmo assim... nada muda.<br><br>
      <strong style="color:#ffba1a;font-size:1.3rem;">Porque o problema nunca foi saber o que fazer.</strong>
    </p>
  </div>
</section>

<!-- EXPOSIÇÃO DO PROBLEMA -->
<section style="background:#0D1117;padding:100px 0;">
  <div class="container" style="max-width:800px;">
    <h2 style="color:#EF4444;font-size:clamp(24px,3.5vw,36px);font-weight:800;margin-bottom:48px;text-align:center;" data-reveal>
      A estratégia não chega na operação
    </h2>
    <div style="display:flex;flex-direction:column;gap:16px;" data-reveal-stagger>
      <div style="display:flex;align-items:center;gap:16px;background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.15);border-radius:14px;padding:22px 28px;transition:all 0.3s ease;" onmouseover="this.style.borderColor='rgba(239,68,68,0.4)';this.style.transform='translateX(8px)'" onmouseout="this.style.borderColor='rgba(239,68,68,0.15)';this.style.transform='none'">
        <i class="fas fa-circle-xmark" style="color:#EF4444;font-size:1.2rem;flex-shrink:0;"></i>
        <span style="color:#C9D1D9;font-size:1.05rem;">Metas que ninguém acompanha</span>
      </div>
      <div style="display:flex;align-items:center;gap:16px;background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.15);border-radius:14px;padding:22px 28px;transition:all 0.3s ease;" onmouseover="this.style.borderColor='rgba(239,68,68,0.4)';this.style.transform='translateX(8px)'" onmouseout="this.style.borderColor='rgba(239,68,68,0.15)';this.style.transform='none'">
        <i class="fas fa-circle-xmark" style="color:#EF4444;font-size:1.2rem;flex-shrink:0;"></i>
        <span style="color:#C9D1D9;font-size:1.05rem;">Decisões que não viram ação</span>
      </div>
      <div style="display:flex;align-items:center;gap:16px;background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.15);border-radius:14px;padding:22px 28px;transition:all 0.3s ease;" onmouseover="this.style.borderColor='rgba(239,68,68,0.4)';this.style.transform='translateX(8px)'" onmouseout="this.style.borderColor='rgba(239,68,68,0.15)';this.style.transform='none'">
        <i class="fas fa-circle-xmark" style="color:#EF4444;font-size:1.2rem;flex-shrink:0;"></i>
        <span style="color:#C9D1D9;font-size:1.05rem;">Prioridades mudam toda semana</span>
      </div>
      <div style="display:flex;align-items:center;gap:16px;background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.15);border-radius:14px;padding:22px 28px;transition:all 0.3s ease;" onmouseover="this.style.borderColor='rgba(239,68,68,0.4)';this.style.transform='translateX(8px)'" onmouseout="this.style.borderColor='rgba(239,68,68,0.15)';this.style.transform='none'">
        <i class="fas fa-circle-xmark" style="color:#EF4444;font-size:1.2rem;flex-shrink:0;"></i>
        <span style="color:#C9D1D9;font-size:1.05rem;">Cada área segue um caminho</span>
      </div>
      <div style="display:flex;align-items:center;gap:16px;background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.15);border-radius:14px;padding:22px 28px;transition:all 0.3s ease;" onmouseover="this.style.borderColor='rgba(239,68,68,0.4)';this.style.transform='translateX(8px)'" onmouseout="this.style.borderColor='rgba(239,68,68,0.15)';this.style.transform='none'">
        <i class="fas fa-circle-xmark" style="color:#EF4444;font-size:1.2rem;flex-shrink:0;"></i>
        <span style="color:#C9D1D9;font-size:1.05rem;">Tudo depende de você</span>
      </div>
    </div>
  </div>
</section>

<!-- VIRADA -->
<section style="background:linear-gradient(135deg,rgba(255,186,26,0.08),rgba(255,186,26,0.02)),#0D1117;border-top:2px solid rgba(255,186,26,0.2);border-bottom:2px solid rgba(255,186,26,0.2);padding:100px 0;text-align:center;position:relative;overflow:hidden;">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(255,186,26,0.1) 0%,transparent 60%);border-radius:50%;pointer-events:none;"></div>
  <div class="container" style="max-width:800px;position:relative;z-index:1;" data-reveal="scale">
    <h2 style="color:#fff;font-size:clamp(28px,4vw,44px);font-weight:800;line-height:1.2;">
      Sua empresa não precisa de mais estratégia.<br>
      Ela precisa de <span style="color:#ffba1a;">execução estratégica contínua.</span>
    </h2>
  </div>
</section>

<!-- PRINT SECTIONS (5-10) - Alternating layout with glassmorphism cards -->
<!-- Section 5: Prova Real -->
<section style="background:#0D1117;padding:120px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;" data-reveal="left">
      <div>
        <span class="section-badge section-badge--gold">Prova real</span>
        <h2 style="color:#fff;font-size:clamp(24px,3.5vw,36px);font-weight:800;margin:16px 0 16px;">
          Veja o que acontece depois de uma decisão
        </h2>
        <p style="color:#8B949E;font-size:1.05rem;line-height:1.7;">
          Você não precisa organizar nada. O Orbit transforma automaticamente em estrutura estratégica.
        </p>
      </div>
      <div style="background:linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;text-align:center;min-height:400px;display:flex;align-items:center;justify-content:center;transition:all 0.4s ease;box-shadow:0 8px 32px rgba(0,0,0,0.2);" onmouseover="this.style.borderColor='rgba(255,186,26,0.3)';this.style.boxShadow='0 12px 48px rgba(255,186,26,0.08)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)'">
        <p style="color:#8B949E;font-size:0.9rem;"><i class="fas fa-image" style="font-size:3rem;display:block;margin-bottom:16px;color:#ffba1a;"></i>Print: Missão / Visão / Estrutura estratégica</p>
      </div>
    </div>
  </div>
</section>

<!-- Section 6: Análise Automática (inverted) -->
<section style="background:#161B22;padding:120px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;" data-reveal="right">
      <div style="background:linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;text-align:center;min-height:400px;display:flex;align-items:center;justify-content:center;transition:all 0.4s ease;box-shadow:0 8px 32px rgba(0,0,0,0.2);" onmouseover="this.style.borderColor='rgba(255,186,26,0.3)';this.style.boxShadow='0 12px 48px rgba(255,186,26,0.08)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)'">
        <p style="color:#8B949E;font-size:0.9rem;"><i class="fas fa-image" style="font-size:3rem;display:block;margin-bottom:16px;color:#ffba1a;"></i>Print: Análise SWOT</p>
      </div>
      <div>
        <h2 style="color:#fff;font-size:clamp(24px,3.5vw,36px);font-weight:800;margin-bottom:16px;">
          Você não analisa cenário. O sistema já organiza tudo.
        </h2>
        <p style="color:#8B949E;font-size:1.05rem;line-height:1.7;">
          Classifica, prioriza e estrutura automaticamente o que realmente impacta sua empresa.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Section 7: Direcionamento -->
<section style="background:#0D1117;padding:120px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;" data-reveal="left">
      <div>
        <h2 style="color:#fff;font-size:clamp(24px,3.5vw,36px);font-weight:800;margin-bottom:16px;">
          A análise vira direcionamento claro.
        </h2>
        <p style="color:#8B949E;font-size:1.05rem;line-height:1.7;">
          Você sabe exatamente para onde ir.
        </p>
      </div>
      <div style="background:linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;text-align:center;min-height:400px;display:flex;align-items:center;justify-content:center;transition:all 0.4s ease;box-shadow:0 8px 32px rgba(0,0,0,0.2);" onmouseover="this.style.borderColor='rgba(255,186,26,0.3)';this.style.boxShadow='0 12px 48px rgba(255,186,26,0.08)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)'">
        <p style="color:#8B949E;font-size:0.9rem;"><i class="fas fa-image" style="font-size:3rem;display:block;margin-bottom:16px;color:#ffba1a;"></i>Print: Gráfico + Direcionamento</p>
      </div>
    </div>
  </div>
</section>

<!-- Section 8: Plano Estratégico (inverted) -->
<section style="background:#161B22;padding:120px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;" data-reveal="right">
      <div style="background:linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;text-align:center;min-height:400px;display:flex;align-items:center;justify-content:center;transition:all 0.4s ease;box-shadow:0 8px 32px rgba(0,0,0,0.2);" onmouseover="this.style.borderColor='rgba(255,186,26,0.3)';this.style.boxShadow='0 12px 48px rgba(255,186,26,0.08)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)'">
        <p style="color:#8B949E;font-size:0.9rem;"><i class="fas fa-image" style="font-size:3rem;display:block;margin-bottom:16px;color:#ffba1a;"></i>Print: Recomendações estratégicas</p>
      </div>
      <div>
        <h2 style="color:#fff;font-size:clamp(24px,3.5vw,36px);font-weight:800;margin-bottom:16px;">
          A estratégia deixa de ser ideia
        </h2>
        <p style="color:#8B949E;font-size:1.05rem;line-height:1.7;">
          E vira plano estruturado com lógica clara. Com justificativa, direcionamento e organização completa.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Section 9: Execução Real -->
<section style="background:#0D1117;padding:120px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;" data-reveal="left">
      <div>
        <h2 style="color:#fff;font-size:clamp(24px,3.5vw,36px);font-weight:800;margin-bottom:16px;">
          E o mais importante: <span style="color:#ffba1a;">começa a ser executado</span>
        </h2>
        <p style="color:#8B949E;font-size:1.05rem;line-height:1.7;">
          Nada fica parado. Cada decisão vira ação com responsável e prazo.
        </p>
      </div>
      <div style="background:linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;text-align:center;min-height:400px;display:flex;align-items:center;justify-content:center;transition:all 0.4s ease;box-shadow:0 8px 32px rgba(0,0,0,0.2);" onmouseover="this.style.borderColor='rgba(255,186,26,0.3)';this.style.boxShadow='0 12px 48px rgba(255,186,26,0.08)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)'">
        <p style="color:#8B949E;font-size:0.9rem;"><i class="fas fa-image" style="font-size:3rem;display:block;margin-bottom:16px;color:#ffba1a;"></i>Print: Iniciativas prioritárias / Execução</p>
      </div>
    </div>
  </div>
</section>

<!-- Section 10: Conexão com Objetivos (inverted) -->
<section style="background:#161B22;padding:120px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;" data-reveal="right">
      <div style="background:linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;text-align:center;min-height:400px;display:flex;align-items:center;justify-content:center;transition:all 0.4s ease;box-shadow:0 8px 32px rgba(0,0,0,0.2);" onmouseover="this.style.borderColor='rgba(255,186,26,0.3)';this.style.boxShadow='0 12px 48px rgba(255,186,26,0.08)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)'">
        <p style="color:#8B949E;font-size:0.9rem;"><i class="fas fa-image" style="font-size:3rem;display:block;margin-bottom:16px;color:#ffba1a;"></i>Print: Objetivos financeiros / processos / crescimento</p>
      </div>
      <div>
        <h2 style="color:#fff;font-size:clamp(24px,3.5vw,36px);font-weight:800;margin-bottom:16px;">
          Tudo está conectado
        </h2>
        <p style="color:#8B949E;font-size:1.05rem;line-height:1.7;">
          Metas, estratégia e execução deixam de ser separados. Agora fazem parte do mesmo fluxo.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- BEFORE/AFTER -->
<section style="background:#0D1117;padding:120px 0;">
  <div class="container" style="max-width:960px;">
    <h2 style="color:#fff;font-size:clamp(28px,3.5vw,40px);font-weight:800;margin-bottom:48px;text-align:center;" data-reveal>Antes vs Depois</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;" data-reveal-stagger>
      <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.15);border-radius:20px;padding:36px;transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
        <h3 style="color:#EF4444;font-size:1.15rem;font-weight:700;margin-bottom:24px;display:flex;align-items:center;gap:10px;"><i class="fas fa-circle-xmark"></i> ANTES</h3>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:14px;">
          <li style="color:#C9D1D9;font-size:1rem;display:flex;align-items:center;gap:10px;"><span style="color:rgba(239,68,68,0.5);">-</span> Você define a estratégia</li>
          <li style="color:#C9D1D9;font-size:1rem;display:flex;align-items:center;gap:10px;"><span style="color:rgba(239,68,68,0.5);">-</span> O time interpreta</li>
          <li style="color:#C9D1D9;font-size:1rem;display:flex;align-items:center;gap:10px;"><span style="color:rgba(239,68,68,0.5);">-</span> Nada é acompanhado</li>
          <li style="color:#C9D1D9;font-size:1rem;display:flex;align-items:center;gap:10px;"><span style="color:rgba(239,68,68,0.5);">-</span> Tudo depende de você</li>
        </ul>
      </div>
      <div style="background:linear-gradient(135deg,rgba(255,186,26,0.08),rgba(255,186,26,0.02));border:2px solid rgba(255,186,26,0.25);border-radius:20px;padding:36px;transition:all 0.3s ease;box-shadow:0 0 40px rgba(255,186,26,0.05);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 0 60px rgba(255,186,26,0.1)'" onmouseout="this.style.transform='none';this.style.boxShadow='0 0 40px rgba(255,186,26,0.05)'">
        <h3 style="color:#ffba1a;font-size:1.15rem;font-weight:700;margin-bottom:24px;display:flex;align-items:center;gap:10px;"><i class="fas fa-circle-check"></i> DEPOIS</h3>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:14px;">
          <li style="color:#C9D1D9;font-size:1rem;display:flex;align-items:center;gap:10px;"><span style="color:#ffba1a;"><i class="fas fa-arrow-right" style="font-size:0.7rem;"></i></span> Estratégia vira estrutura</li>
          <li style="color:#C9D1D9;font-size:1rem;display:flex;align-items:center;gap:10px;"><span style="color:#ffba1a;"><i class="fas fa-arrow-right" style="font-size:0.7rem;"></i></span> Estrutura vira plano</li>
          <li style="color:#C9D1D9;font-size:1rem;display:flex;align-items:center;gap:10px;"><span style="color:#ffba1a;"><i class="fas fa-arrow-right" style="font-size:0.7rem;"></i></span> Plano vira execução</li>
          <li style="color:#C9D1D9;font-size:1rem;display:flex;align-items:center;gap:10px;"><span style="color:#ffba1a;"><i class="fas fa-arrow-right" style="font-size:0.7rem;"></i></span> Execução é acompanhada automaticamente</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- PROVA LÓGICA -->
<section style="background:#161B22;padding:100px 0;">
  <div class="container" style="max-width:800px;text-align:center;" data-reveal>
    <h2 style="color:#fff;font-size:clamp(22px,3vw,30px);font-weight:800;margin-bottom:28px;">Para fazer isso manualmente, você precisaria de:</h2>
    <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:28px;">
      <span style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15);color:#EF4444;padding:10px 24px;border-radius:50px;font-size:0.95rem;font-weight:600;">Diretor estratégico</span>
      <span style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15);color:#EF4444;padding:10px 24px;border-radius:50px;font-size:0.95rem;font-weight:600;">Analistas</span>
      <span style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15);color:#EF4444;padding:10px 24px;border-radius:50px;font-size:0.95rem;font-weight:600;">Acompanhamento diário</span>
      <span style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.15);color:#EF4444;padding:10px 24px;border-radius:50px;font-size:0.95rem;font-weight:600;">Controle constante</span>
    </div>
    <p style="color:#ffba1a;font-size:1.3rem;font-weight:700;">Agora isso acontece automaticamente.</p>
  </div>
</section>

<!-- VÍDEO -->
<section style="background:#0D1117;padding:120px 0;text-align:center;">
  <div class="container" style="max-width:900px;" data-reveal="scale">
    <h2 style="color:#fff;font-size:clamp(24px,3.5vw,36px);font-weight:800;margin-bottom:32px;">Veja isso acontecendo na prática</h2>
    <div style="background:linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:80px 40px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:300px;background:radial-gradient(circle,rgba(255,186,26,0.1) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
      <p style="color:#8B949E;position:relative;z-index:1;"><i class="fas fa-play-circle" style="font-size:5rem;color:#ffba1a;display:block;margin-bottom:20px;cursor:pointer;transition:transform 0.3s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='none'"></i>Vídeo demonstrando fluxo real</p>
    </div>
  </div>
</section>

<!-- CTA FINAL -->
<section style="background:linear-gradient(135deg,rgba(255,186,26,0.1),rgba(255,186,26,0.03)),#0D1117;border-top:2px solid rgba(255,186,26,0.3);padding:120px 0;text-align:center;position:relative;overflow:hidden;">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;background:radial-gradient(circle,rgba(255,186,26,0.08) 0%,transparent 60%);border-radius:50%;pointer-events:none;"></div>
  <div class="container" style="max-width:700px;position:relative;z-index:1;" data-reveal="scale">
    <h2 style="color:#fff;font-size:clamp(32px,5vw,52px);font-weight:800;margin-bottom:16px;line-height:1.15;">
      Veja sua estratégia sendo <span style="color:#ffba1a;">executada</span>
    </h2>
    <p style="color:#8B949E;font-size:1.1rem;margin-bottom:36px;">Em poucos minutos você entende como isso se aplica à sua empresa.</p>
    <a href="/chat" class="btn btn-primary btn-lg" style="font-size:1.1rem;padding:18px 40px;">Quero ver o Orbit funcionando</a>
  </div>
</section>
`;

export function PageContent() {
  return <PageLayout contentHTML={html} />;
}
