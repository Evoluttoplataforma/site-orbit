// Living design system — clones tokens, components, motion exatamente do site
// Hero: clone exato da home (apenas texto adaptado pra apresentar o DS).
export const pageHTML = `
<style>
/* DS-only: nav fixo de seções (separado do header global) */
.ds-nav {
    position: sticky;
    top: 80px;
    z-index: 50;
    background: rgba(13,17,23,0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding: 12px 0;
    margin-bottom: 60px;
}
.ds-nav__inner {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
}
.ds-nav__inner::-webkit-scrollbar { display: none; }
.ds-nav a {
    padding: 8px 14px;
    border-radius: 8px;
    color: rgba(255,255,255,0.6);
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    transition: all 0.15s ease;
    border: 1px solid transparent;
}
.ds-nav a:hover {
    color: #ffba1a;
    background: rgba(255,186,26,0.08);
    border-color: rgba(255,186,26,0.2);
}

/* DS-only: estrutura de cada seção do showcase */
.ds-section {
    padding: 80px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
}
.ds-section__title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
}
.ds-section__subtitle {
    font-size: 15px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 48px;
    max-width: 680px;
}

/* Type spec rows */
.ds-type-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 32px;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
}
.ds-type-row:last-child { border-bottom: none; }
.ds-type-row__name {
    flex-shrink: 0;
    width: 140px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
.ds-type-row__preview {
    flex: 1;
    min-width: 0;
}
.ds-type-row__spec {
    flex-shrink: 0;
    font-family: 'SF Mono','Fira Code',monospace;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    text-align: right;
    width: 160px;
}

/* Color swatch grid */
.ds-color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
}
.ds-swatch {
    background: #161b22;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    overflow: hidden;
}
.ds-swatch__color {
    height: 96px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
}
.ds-swatch__meta {
    padding: 12px 14px;
}
.ds-swatch__name {
    font-size: 13px;
    font-weight: 700;
    color: #fff;
}
.ds-swatch__token {
    font-family: 'SF Mono','Fira Code',monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    margin-top: 2px;
}

/* Component preview boxes */
.ds-preview {
    background: linear-gradient(135deg, rgba(28,35,51,0.6) 0%, rgba(13,17,23,0.6) 100%);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 40px;
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;
}
.ds-preview--col { flex-direction: column; }
.ds-preview--start { align-items: flex-start; justify-content: flex-start; }
.ds-preview__label {
    width: 100%;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 4px;
}

/* Spec list */
.ds-spec-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
}
.ds-spec-item {
    background: #161b22;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 14px 16px;
}
.ds-spec-item__token {
    font-family: 'SF Mono','Fira Code',monospace;
    font-size: 12px;
    color: #ffba1a;
    margin-bottom: 4px;
}
.ds-spec-item__value {
    font-family: 'SF Mono','Fira Code',monospace;
    font-size: 13px;
    color: rgba(255,255,255,0.7);
}

/* Icon grid */
.ds-icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
}
.ds-icon-card {
    background: #161b22;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 20px 12px;
    text-align: center;
}
.ds-icon-card i {
    font-size: 24px;
    color: #ffba1a;
    margin-bottom: 12px;
}
.ds-icon-card__label {
    font-family: 'SF Mono','Fira Code',monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    word-break: break-word;
}
</style>

<!-- ═══ 0) HERO — clone exato (texto adaptado) ═══ -->
<section class="hero-zoom" id="hero">
    <div class="hero-zoom__bg-image"></div>
    <div class="hero-zoom__bg">
        <div class="hero-zoom__glow hero-zoom__glow--1"></div>
        <div class="hero-zoom__glow hero-zoom__glow--2"></div>
    </div>

    <div class="container">
        <div class="hero-zoom__header">
            <span class="hero-zoom__badge">Living design system • Orbit Gestão</span>
            <h1 class="hero-zoom__title">
                Tokens, componentes e motion.<br>
                Tudo num único <span class="hero-zoom__title-highlight">guia visual</span> que
                <span class="hero-rotate" id="heroRotate">
                    <span class="hero-rotate__word hero-rotate__word--active">documenta.</span>
                    <span class="hero-rotate__word">padroniza.</span>
                    <span class="hero-rotate__word">acelera.</span>
                    <span class="hero-rotate__word">escala.</span>
                </span>
            </h1>
            <p class="hero-zoom__subtitle">As mesmas classes, animações e tokens usados nas páginas reais — sem reinvenção, sem aproximação.</p>
            <div class="hero-zoom__ctas">
                <a href="#typography" class="btn btn-primary btn-lg hero-cta-glow">EXPLORAR O SISTEMA</a>
                <a href="#motion" class="btn btn-ghost btn-lg">Ver animações <i class="fas fa-arrow-down"></i></a>
            </div>
            <p class="hero-zoom__note">Reutiliza orbit.css • Sem novos estilos • Fiel ao site</p>
            <div class="hero-zoom__credentials">
                <div class="hero-zoom__credential">
                    <strong>72</strong>
                    <span>tokens CSS</span>
                </div>
                <div class="hero-zoom__credential-divider"></div>
                <div class="hero-zoom__credential">
                    <strong>30+</strong>
                    <span>componentes</span>
                </div>
                <div class="hero-zoom__credential-divider"></div>
                <div class="hero-zoom__credential">
                    <strong>40+</strong>
                    <span>keyframes</span>
                </div>
            </div>
        </div>
    </div>
</section>

<hr class="glow-divider">

<!-- ═══ NAV ANCORADO ═══ -->
<nav class="ds-nav">
    <div class="container">
        <div class="ds-nav__inner">
            <a href="#typography">Typography</a>
            <a href="#colors">Colors &amp; Surfaces</a>
            <a href="#buttons">Buttons</a>
            <a href="#badges">Badges</a>
            <a href="#cards">Cards &amp; Dividers</a>
            <a href="#dock">Dock</a>
            <a href="#layout">Layout &amp; Spacing</a>
            <a href="#motion">Motion</a>
            <a href="#icons">Icons</a>
        </div>
    </div>
</nav>

<!-- ═══ 1) TYPOGRAPHY ═══ -->
<section class="ds-section" id="typography">
    <div class="container">
        <h2 class="ds-section__title">Typography</h2>
        <p class="ds-section__subtitle">Plus Jakarta Sans em todos os pesos. Headings usam <code>clamp()</code> pra escala fluida; subtítulos têm cor dessaturada (rgba branco). Highlights gold via gradient text.</p>

        <div class="ds-type-row">
            <div class="ds-type-row__name">Heading 1</div>
            <div class="ds-type-row__preview">
                <h1 class="hero-zoom__title" style="margin:0;">Sua empresa precisa de um <span class="hero-zoom__title-highlight">time de IA</span></h1>
            </div>
            <div class="ds-type-row__spec">clamp(36, 6vw, 64) / 1.1<br>weight 600</div>
        </div>

        <div class="ds-type-row">
            <div class="ds-type-row__name">Heading 2</div>
            <div class="ds-type-row__preview">
                <div class="section-header" style="text-align:left;margin-bottom:0;">
                    <h2 style="margin:0;">Dezenas de agentes. <span class="highlight">Um time completo.</span></h2>
                </div>
            </div>
            <div class="ds-type-row__spec">clamp(32, 4.5vw, 48) / 1.15<br>weight 600</div>
        </div>

        <div class="ds-type-row">
            <div class="ds-type-row__name">Heading 3</div>
            <div class="ds-type-row__preview">
                <h3 style="font-size:clamp(24px,3vw,32px);font-weight:700;color:#fff;line-height:1.2;letter-spacing:-0.02em;margin:0;">A conta que muda o modelo</h3>
            </div>
            <div class="ds-type-row__spec">clamp(24, 3vw, 32) / 1.2<br>weight 700</div>
        </div>

        <div class="ds-type-row">
            <div class="ds-type-row__name">Subtitle</div>
            <div class="ds-type-row__preview">
                <p class="hero-zoom__subtitle" style="margin:0;text-align:left;max-width:none;">Gestão Operada por IA: dezenas de agentes especializados constroem e operam a gestão da sua empresa.</p>
            </div>
            <div class="ds-type-row__spec">clamp(16, 2vw, 20) / 1.6<br>rgba(255,255,255,.5)</div>
        </div>

        <div class="ds-type-row">
            <div class="ds-type-row__name">Body</div>
            <div class="ds-type-row__preview">
                <p style="font-size:18px;color:rgba(255,255,255,0.5);line-height:1.6;margin:0;">Texto padrão de seção: 18px com cor dessaturada pra leitura confortável em fundo escuro.</p>
            </div>
            <div class="ds-type-row__spec">18 / 1.6<br>weight 400</div>
        </div>

        <div class="ds-type-row">
            <div class="ds-type-row__name">Body S</div>
            <div class="ds-type-row__preview">
                <p style="font-size:13px;color:rgba(255,255,255,0.5);margin:0;">Texto auxiliar / nota: 13px, usado em <code>.hero-zoom__note</code> e legendas.</p>
            </div>
            <div class="ds-type-row__spec">13 / 1.5<br>weight 400</div>
        </div>

        <div class="ds-type-row">
            <div class="ds-type-row__name">Highlight gold</div>
            <div class="ds-type-row__preview">
                <span class="hero-zoom__title-highlight" style="font-size:32px;font-weight:600;">Gradient gold text</span>
            </div>
            <div class="ds-type-row__spec">linear-gradient(135deg,<br>#ffba1a → #ffca4a)</div>
        </div>

        <div class="ds-type-row">
            <div class="ds-type-row__name">Eyebrow</div>
            <div class="ds-type-row__preview">
                <span class="section-badge">Programa de Canais</span>
            </div>
            <div class="ds-type-row__spec">12 / uppercase<br>letter-spacing 0.08em</div>
        </div>
    </div>
</section>

<!-- ═══ 2) COLORS & SURFACES ═══ -->
<section class="ds-section" id="colors">
    <div class="container">
        <h2 class="ds-section__title">Colors &amp; Surfaces</h2>
        <p class="ds-section__subtitle">Paleta dark-first com gold como única cor de marca. Tokens definidos em <code>:root</code> e usados via <code>var(--*)</code>.</p>

        <div class="ds-preview__label">Brand</div>
        <div class="ds-color-grid" style="margin-bottom:32px;">
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#ffba1a;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Primary</div><div class="ds-swatch__token">--primary · #ffba1a</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#e6a200;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Primary Dark</div><div class="ds-swatch__token">--primary-dark · #e6a200</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#ffca4a;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Primary Light</div><div class="ds-swatch__token">--primary-light · #ffca4a</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:rgba(255,186,26,0.3);"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Primary Glow</div><div class="ds-swatch__token">--primary-glow · rgba(.,.3)</div></div></div>
        </div>

        <div class="ds-preview__label">Surfaces (Dark)</div>
        <div class="ds-color-grid" style="margin-bottom:32px;">
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#0D1117;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Black (page)</div><div class="ds-swatch__token">--black · #0D1117</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#161B22;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Black Soft</div><div class="ds-swatch__token">--black-soft · #161B22</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#1C2333;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Black Card</div><div class="ds-swatch__token">--black-card · #1C2333</div></div></div>
        </div>

        <div class="ds-preview__label">Text / Lines</div>
        <div class="ds-color-grid" style="margin-bottom:32px;">
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#ffffff;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">White</div><div class="ds-swatch__token">--white · #ffffff</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#E6EDF3;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Gray 900</div><div class="ds-swatch__token">--gray-900 · #E6EDF3</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#C9D1D9;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Gray 700</div><div class="ds-swatch__token">--gray-700 · #C9D1D9</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#8B949E;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Gray 500</div><div class="ds-swatch__token">--gray-500 · #8B949E</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#484F58;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Gray 300</div><div class="ds-swatch__token">--gray-300 · #484F58</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#30363D;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Gray 200</div><div class="ds-swatch__token">--gray-200 · #30363D</div></div></div>
        </div>

        <div class="ds-preview__label">Status</div>
        <div class="ds-color-grid" style="margin-bottom:32px;">
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#3FB950;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Success</div><div class="ds-swatch__token">--success · #3FB950</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:#F85149;"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Error</div><div class="ds-swatch__token">--error · #F85149</div></div></div>
        </div>

        <div class="ds-preview__label">Gradients</div>
        <div class="ds-color-grid">
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:linear-gradient(135deg,#ffba1a,#ffca4a);"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Gold (highlight)</div><div class="ds-swatch__token">135deg · primary → light</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.55) 100%);"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Hero title</div><div class="ds-swatch__token">180deg · white fade</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02));"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Glass icon</div><div class="ds-swatch__token">160deg · white 8 → 2</div></div></div>
            <div class="ds-swatch"><div class="ds-swatch__color" style="background:linear-gradient(90deg,transparent,rgba(255,186,26,0.3),transparent);"></div><div class="ds-swatch__meta"><div class="ds-swatch__name">Glow divider</div><div class="ds-swatch__token">90deg · gold .3 fade</div></div></div>
        </div>
    </div>
</section>

<!-- ═══ 3a) BUTTONS ═══ -->
<section class="ds-section" id="buttons">
    <div class="container">
        <h2 class="ds-section__title">Buttons</h2>
        <p class="ds-section__subtitle">Pill radius (50px), hover com slide do círculo da seta — só o primary. Outline e ghost são neutros.</p>

        <div class="ds-preview">
            <div class="ds-preview__label">Primary · default + hover slide</div>
            <a href="#" class="btn btn-primary">QUERO COMEÇAR</a>
            <a href="#" class="btn btn-primary btn-lg">QUERO COMEÇAR (LG)</a>
            <a href="#" class="btn btn-primary btn-lg hero-cta-glow">PRIMARY + GLOW</a>
        </div>

        <div class="ds-preview">
            <div class="ds-preview__label">Outline · borda translúcida</div>
            <a href="#" class="btn btn-outline">Saiba mais</a>
            <a href="#" class="btn btn-outline btn-lg">Saiba mais (LG)</a>
        </div>

        <div class="ds-preview">
            <div class="ds-preview__label">Ghost · sem borda</div>
            <a href="#" class="btn btn-ghost">Voltar</a>
            <a href="#" class="btn btn-ghost btn-lg">Ver os agentes <i class="fas fa-arrow-down"></i></a>
        </div>

        <ul class="ds-spec-list">
            <li class="ds-spec-item"><div class="ds-spec-item__token">.btn</div><div class="ds-spec-item__value">padding 12 28 · radius 50px · font 15/600</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">.btn-primary</div><div class="ds-spec-item__value">bg primary · transition .5s ease-snap</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">.btn-lg</div><div class="ds-spec-item__value">padding 16 36 · font 16</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">.hero-cta-glow</div><div class="ds-spec-item__value">animation ctaGlow 2.5s infinite</div></li>
        </ul>
    </div>
</section>

<!-- ═══ 3b) BADGES ═══ -->
<section class="ds-section" id="badges">
    <div class="container">
        <h2 class="ds-section__title">Badges</h2>
        <p class="ds-section__subtitle">Pills pequenos pra eyebrows e tags. Gold padrão, vermelho pra alerta (presente em outras LPs).</p>

        <div class="ds-preview">
            <div class="ds-preview__label">Hero badge · gold tinted</div>
            <span class="hero-zoom__badge">30 anos de gestão empresarial. Agora com IA.</span>
        </div>

        <div class="ds-preview">
            <div class="ds-preview__label">Section badge · uppercase eyebrow</div>
            <span class="section-badge">Programa de Canais Orbit</span>
            <span class="section-badge section-badge--gold">Live semanal</span>
        </div>
    </div>
</section>

<!-- ═══ 3c) CARDS & DIVIDERS ═══ -->
<section class="ds-section" id="cards">
    <div class="container">
        <h2 class="ds-section__title">Cards &amp; Dividers</h2>
        <p class="ds-section__subtitle">Cards escuros com glass overlay sutil. <code>.glow-divider</code> separa seções com fade gold.</p>

        <div class="ds-preview ds-preview--col ds-preview--start">
            <div class="ds-preview__label">Glow divider</div>
            <hr class="glow-divider" style="width:100%;">
        </div>

        <div class="ds-preview ds-preview--start" style="padding:0;background:none;border:none;">
            <div style="background:linear-gradient(135deg,#1C2333 0%,#13161D 100%);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:32px;flex:1;min-width:260px;">
                <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(160deg,rgba(255,186,26,0.12),rgba(255,186,26,0.04));border:1px solid rgba(255,186,26,0.2);display:flex;align-items:center;justify-content:center;color:#ffba1a;font-size:20px;margin-bottom:16px;"><i class="fas fa-rocket"></i></div>
                <h3 style="font-size:18px;font-weight:700;color:#fff;margin:0 0 8px;">Card padrão</h3>
                <p style="font-size:14px;color:rgba(255,255,255,0.55);line-height:1.6;margin:0;">Background gradient diagonal, border 1px branco com 6% opacity, radius 14px.</p>
            </div>
            <div style="background:#161b22;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:32px;flex:1;min-width:260px;">
                <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#ffba1a,#ffca4a);color:#000;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:16px;"><i class="fas fa-star"></i></div>
                <h3 style="font-size:18px;font-weight:700;color:#fff;margin:0 0 8px;">Card sólido</h3>
                <p style="font-size:14px;color:rgba(255,255,255,0.55);line-height:1.6;margin:0;">Variante sólida com black-soft. Ícone gold preenchido pra destaque.</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(255,186,26,0.08) 0%,rgba(255,186,26,0.02) 100%);border:1px solid rgba(255,186,26,0.2);border-radius:14px;padding:32px;flex:1;min-width:260px;">
                <div style="width:48px;height:48px;border-radius:14px;background:rgba(255,186,26,0.12);color:#ffba1a;border:1px solid rgba(255,186,26,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:16px;"><i class="fas fa-bolt"></i></div>
                <h3 style="font-size:18px;font-weight:700;color:#fff;margin:0 0 8px;">Card destaque</h3>
                <p style="font-size:14px;color:rgba(255,255,255,0.55);line-height:1.6;margin:0;">Variante gold tinted pra CTAs e features destacadas.</p>
            </div>
        </div>

        <ul class="ds-spec-list" style="margin-top:24px;">
            <li class="ds-spec-item"><div class="ds-spec-item__token">--card-radius</div><div class="ds-spec-item__value">14px</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">card border</div><div class="ds-spec-item__value">1px rgba(255,255,255,0.06)</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">card padding</div><div class="ds-spec-item__value">32px</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">--shadow</div><div class="ds-spec-item__value">0 4px 24px rgba(0,0,0,.3)</div></li>
        </ul>
    </div>
</section>

<!-- ═══ 3d) DOCK (componente assinatura) ═══ -->
<section class="ds-section" id="dock">
    <div class="container">
        <h2 class="ds-section__title">Dock (macOS-style)</h2>
        <p class="ds-section__subtitle">Componente assinatura da home. Backdrop-filter blur, ícones glass, indicador gold no item ativo.</p>

        <div class="ds-preview" style="padding:60px 40px 40px;">
            <div class="dock-container" style="height:auto;margin-bottom:0;">
                <div class="dock">
                    <button class="dock-item active"><div class="dock-icon"><i class="fas fa-chess-king"></i></div><div class="dock-label">Estrategista</div></button>
                    <button class="dock-item"><div class="dock-icon"><i class="fas fa-sitemap"></i></div><div class="dock-label">Processos</div></button>
                    <button class="dock-item"><div class="dock-icon"><i class="fas fa-users"></i></div><div class="dock-label">Pessoas</div></button>
                    <button class="dock-item"><div class="dock-icon"><i class="fas fa-chart-line"></i></div><div class="dock-label">Indicadores</div></button>
                    <button class="dock-item"><div class="dock-icon"><i class="fas fa-shield-halved"></i></div><div class="dock-label">Riscos</div></button>
                    <button class="dock-item dock-item--gold"><div class="dock-icon"><i class="fas fa-rocket"></i></div><div class="dock-label">Premium</div></button>
                </div>
            </div>
        </div>

        <ul class="ds-spec-list">
            <li class="ds-spec-item"><div class="ds-spec-item__token">.dock</div><div class="ds-spec-item__value">backdrop-filter blur(20px) · radius 20</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">.dock-icon</div><div class="ds-spec-item__value">48 · radius 14 · glass gradient</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">.dock-item.active::after</div><div class="ds-spec-item__value">5px gold dot abaixo</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">transition</div><div class="ds-spec-item__value">.2s cubic-bezier(.34,1.56,.64,1)</div></li>
        </ul>
    </div>
</section>

<!-- ═══ 4) LAYOUT & SPACING ═══ -->
<section class="ds-section" id="layout">
    <div class="container">
        <h2 class="ds-section__title">Layout &amp; Spacing</h2>
        <p class="ds-section__subtitle">Container central de 1200px com 24px de padding lateral. Section padding default 140px (mobile reduz). Section header centralizado com max-width de 640px.</p>

        <ul class="ds-spec-list" style="margin-bottom:32px;">
            <li class="ds-spec-item"><div class="ds-spec-item__token">--max-width</div><div class="ds-spec-item__value">1200px</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">--container-px</div><div class="ds-spec-item__value">24px</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">--section-py</div><div class="ds-spec-item__value">140px</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">--radius</div><div class="ds-spec-item__value">16px (sm 8 / lg 24 / xl 32)</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">--transition</div><div class="ds-spec-item__value">all .3s cubic-bezier(.4,0,.2,1)</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">--ease-snap</div><div class="ds-spec-item__value">cubic-bezier(.16,1,.3,1)</div></li>
        </ul>

        <div class="ds-preview ds-preview--col ds-preview--start">
            <div class="ds-preview__label">Section header centralizado (padrão home)</div>
            <div class="section-header" style="margin-bottom:0;width:100%;">
                <span class="section-badge">Eyebrow</span>
                <h2>Layout canônico de seção</h2>
                <p>Subtítulo dessaturado, max-width 640px, line-height 1.6.</p>
            </div>
        </div>
    </div>
</section>

<!-- ═══ 5) MOTION & INTERACTION ═══ -->
<section class="ds-section" id="motion">
    <div class="container">
        <h2 class="ds-section__title">Motion &amp; Interaction</h2>
        <p class="ds-section__subtitle">Easing assinatura: <code>cubic-bezier(.16, 1, .3, 1)</code> (snap-out, exposto como <code>--ease-snap</code>). Reveal-on-scroll via <code>[data-reveal]</code> + IntersectionObserver.</p>

        <div class="ds-preview ds-preview--col ds-preview--start">
            <div class="ds-preview__label">Hero rotating words (loop infinito)</div>
            <h3 style="font-size:32px;font-weight:600;color:#fff;margin:0;">
                Um time de IA que
                <span class="hero-rotate" id="dsHeroRotate" style="min-width:240px;">
                    <span class="hero-rotate__word hero-rotate__word--active">executa.</span>
                    <span class="hero-rotate__word">organiza.</span>
                    <span class="hero-rotate__word">decide.</span>
                </span>
            </h3>
        </div>

        <div class="ds-preview ds-preview--col ds-preview--start">
            <div class="ds-preview__label">CTA glow pulse · @keyframes ctaGlow 2.5s infinite</div>
            <a href="#" class="btn btn-primary btn-lg hero-cta-glow">QUERO CONHECER</a>
        </div>

        <div class="ds-preview ds-preview--col ds-preview--start">
            <div class="ds-preview__label">Reveal on scroll · [data-reveal] (role a página pra ver)</div>
            <div data-reveal style="background:#161b22;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:24px;width:100%;color:rgba(255,255,255,0.7);">
                Quando este card entra na viewport, <code>.revealed</code> é adicionado e ele faz fade-up 24px em 700ms.
            </div>
        </div>

        <ul class="ds-spec-list">
            <li class="ds-spec-item"><div class="ds-spec-item__token">@keyframes ctaGlow</div><div class="ds-spec-item__value">2.5s ease-in-out infinite (pulse box-shadow)</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">[data-reveal]</div><div class="ds-spec-item__value">opacity 0 → 1 + translateY 24 → 0 / 700ms</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">[data-reveal-stagger]</div><div class="ds-spec-item__value">delay 0/80/160/240/320/400ms</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">.hero-rotate__word</div><div class="ds-spec-item__value">slide vertical 100% / 500ms ease-snap</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">.btn-primary hover</div><div class="ds-spec-item__value">arrow-circle slide-left + rotate 45° / 500ms ease-snap</div></li>
            <li class="ds-spec-item"><div class="ds-spec-item__token">.dock-item hover</div><div class="ds-spec-item__value">.2s cubic-bezier(.34,1.56,.64,1) (overshoot)</div></li>
        </ul>
    </div>
</section>

<!-- ═══ 6) ICONS ═══ -->
<section class="ds-section" id="icons">
    <div class="container">
        <h2 class="ds-section__title">Icons</h2>
        <p class="ds-section__subtitle">Font Awesome 6 Free (Solid + Brands). Tamanho herda do contexto, cor herda de <code>currentColor</code> ou é forçada gold.</p>

        <div class="ds-icon-grid">
            <div class="ds-icon-card"><i class="fas fa-chess-king"></i><div class="ds-icon-card__label">fa-chess-king</div></div>
            <div class="ds-icon-card"><i class="fas fa-rocket"></i><div class="ds-icon-card__label">fa-rocket</div></div>
            <div class="ds-icon-card"><i class="fas fa-bolt"></i><div class="ds-icon-card__label">fa-bolt</div></div>
            <div class="ds-icon-card"><i class="fas fa-chart-line"></i><div class="ds-icon-card__label">fa-chart-line</div></div>
            <div class="ds-icon-card"><i class="fas fa-shield-halved"></i><div class="ds-icon-card__label">fa-shield-halved</div></div>
            <div class="ds-icon-card"><i class="fas fa-users"></i><div class="ds-icon-card__label">fa-users</div></div>
            <div class="ds-icon-card"><i class="fas fa-sitemap"></i><div class="ds-icon-card__label">fa-sitemap</div></div>
            <div class="ds-icon-card"><i class="fas fa-graduation-cap"></i><div class="ds-icon-card__label">fa-graduation-cap</div></div>
            <div class="ds-icon-card"><i class="fas fa-handshake"></i><div class="ds-icon-card__label">fa-handshake</div></div>
            <div class="ds-icon-card"><i class="fas fa-lightbulb"></i><div class="ds-icon-card__label">fa-lightbulb</div></div>
            <div class="ds-icon-card"><i class="fas fa-arrow-right"></i><div class="ds-icon-card__label">fa-arrow-right</div></div>
            <div class="ds-icon-card"><i class="fas fa-arrow-down"></i><div class="ds-icon-card__label">fa-arrow-down</div></div>
            <div class="ds-icon-card"><i class="fas fa-calendar-check"></i><div class="ds-icon-card__label">fa-calendar-check</div></div>
            <div class="ds-icon-card"><i class="fas fa-star"></i><div class="ds-icon-card__label">fa-star</div></div>
            <div class="ds-icon-card"><i class="fab fa-whatsapp"></i><div class="ds-icon-card__label">fa-whatsapp</div></div>
            <div class="ds-icon-card"><i class="fab fa-instagram"></i><div class="ds-icon-card__label">fa-instagram</div></div>
            <div class="ds-icon-card"><i class="fab fa-youtube"></i><div class="ds-icon-card__label">fa-youtube</div></div>
        </div>
    </div>
</section>

<!-- Hero rotate driver — replica o comportamento do site -->
<script>
(function() {
    function driveRotate(el) {
        if (!el || el.__dsRotateInit) return;
        el.__dsRotateInit = true;
        var words = el.querySelectorAll('.hero-rotate__word');
        if (words.length < 2) return;
        var idx = 0;
        setInterval(function() {
            words[idx].classList.remove('hero-rotate__word--active');
            words[idx].classList.add('hero-rotate__word--exit');
            var next = (idx + 1) % words.length;
            words[next].classList.remove('hero-rotate__word--exit');
            words[next].classList.add('hero-rotate__word--active');
            setTimeout(function(prev) { return function() {
                words[prev].classList.remove('hero-rotate__word--exit');
            }; }(idx), 500);
            idx = next;
        }, 2200);
    }
    driveRotate(document.getElementById('heroRotate'));
    driveRotate(document.getElementById('dsHeroRotate'));

    // Reveal on scroll
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('[data-reveal]').forEach(function(el) { io.observe(el); });
    }
})();
</script>
`;
