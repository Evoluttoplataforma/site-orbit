# ORBIT — Padrões de Landing Pages & CRO

> Biblioteca de seções, animações, design e regras de construção para todas as Landing Pages do Orbit.

---

## 1. REGRAS GERAIS DE CONSTRUÇÃO

| Regra | Valor |
|---|---|
| Mínimo de seções por LP | 3 (hero + cta + footer) |
| Máximo de seções por LP | 8 (excesso mata conversão) |
| Ordem lógica | Problema → Solução → Benefícios → Prova → Ação |
| Mobile-first | Toda LP inicia pelo layout mobile |
| Peso máximo | < 500KB primeira carga (sem imagens) |
| LCP target | < 2.5s |
| CLS target | < 0.1 |

### Fluxo de Construção

```
1. Definir objetivo (captura / vendas / lista de espera / evento)
2. Selecionar seções da biblioteca (§2)
3. Aplicar design system (§3)
4. Implementar animações (§4)
5. Integrar tracking (ver TRACKING-ARCHITECTURE.md)
6. Validar com checklist (§7)
```

---

## 2. BIBLIOTECA DE SEÇÕES — 17 TIPOS

Cada seção tem: nome, objetivo, layout e quando usar.

### Seções de Abertura

| # | Seção | Objetivo | Layout |
|---|---|---|---|
| 1 | `hero` | Impacto + CTA principal | Headline H1 + subtítulo + CTA + badge de credibilidade |
| 2 | `hero-split` | Impacto com visual | 50/50 — texto à esquerda, imagem/mockup à direita |

### Seções de Problema

| # | Seção | Objetivo | Layout |
|---|---|---|---|
| 3 | `pain-points` | Identificação com dores | Cards de dor (ícone + frase curta) — max 4 itens |
| 4 | `reframe` | Mudar perspectiva | Título provocativo + texto explicativo + comparação visual |

### Seções de Solução

| # | Seção | Objetivo | Layout |
|---|---|---|---|
| 5 | `solution` | Apresentar a solução | Headline de solução + 3-4 bullets visuais + CTA secundário |
| 6 | `how-it-works` | Processo claro | 3 passos numerados com ícone + texto curto |
| 7 | `features` | Detalhar funcionalidades | Grid 2x3 ou 3x2 — ícone + título + descrição 1 linha |

### Seções de Prova

| # | Seção | Objetivo | Layout |
|---|---|---|---|
| 8 | `social-proof` | Credibilidade rápida | Logos de clientes/parceiros em linha + número destaque |
| 9 | `stats` | Impacto com números | 3-4 KPIs grandes (número + label) em grid horizontal |
| 10 | `testimonials` | Prova por depoimento | Cards de depoimento (foto + nome + cargo + texto curto) |
| 11 | `guarantee` | Reduzir risco | Badge/ícone de garantia + texto da garantia + prazo |

### Seções de Conversão

| # | Seção | Objetivo | Layout |
|---|---|---|---|
| 12 | `cta-form` | Captura de lead | Formulário (nome + email + tel) + headline + benefício |
| 13 | `cta-simple` | Ação direta | Headline + CTA button grande + texto de reforço |
| 14 | `pricing` | Apresentar planos | Cards de pricing (1-3 planos) com destaque no recomendado |

### Seções de Suporte

| # | Seção | Objetivo | Layout |
|---|---|---|---|
| 15 | `faq` | Eliminar objeções | Accordion com 5-8 perguntas — abertura com clique |
| 16 | `about` | Humanizar | Foto + nome + bio curta dos fundadores/time |
| 17 | `footer` | Fechamento | Logo + links legais + contato |

### Combinações por Objetivo

**LP de Captura de Leads (B2B):**
```
hero → pain-points → reframe → solution → how-it-works → testimonials → cta-form → footer
```

**LP de Canais (B2B2B):**
```
hero → pain-points → solution → stats → how-it-works → guarantee → cta-form → footer
```

**LP de Lista de Espera:**
```
hero → features → stats → cta-simple → footer
```

**LP de Evento/Live:**
```
hero-split → about → cta-form → footer
```

---

## 3. DESIGN SYSTEM — VARIÁVEIS CSS

### Estrutura Base

```css
:root {
  /* === CORES PRIMÁRIAS === */
  --color-bg: #0D1117;
  --color-surface: #161B22;
  --color-card: #1C2333;
  --color-border: #30363D;

  /* === TEXTO === */
  --color-text-primary: #E6EDF3;
  --color-text-secondary: #8B949E;
  --color-text-muted: #484F58;

  /* === ACCENT === */
  --color-gold: #D4A017;
  --color-gold-hover: #E8B830;
  --color-gold-glow: rgba(212, 160, 23, 0.3);

  /* === STATUS === */
  --color-success: #3FB950;
  --color-warning: #D29922;
  --color-error: #F85149;

  /* === TIPOGRAFIA === */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* === ESPAÇAMENTO === */
  --section-padding-y: clamp(3rem, 8vw, 6rem);
  --section-padding-x: clamp(1rem, 5vw, 4rem);
  --container-max: 1200px;
  --card-radius: 16px;
  --btn-radius: 12px;

  /* === ANIMAÇÃO === */
  --ease-snap: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 800ms;

  /* === SOMBRAS === */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 20px var(--color-gold-glow);
}
```

### Responsividade

```css
/* Mobile first */
.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--section-padding-x); }

/* Breakpoints */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Wide */ }
```

### Componentes Base

| Componente | Especificação |
|---|---|
| H1 (hero) | `font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.1` |
| H2 (seção) | `font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 700; line-height: 1.2` |
| Body | `font-size: 1rem; line-height: 1.6; color: var(--color-text-secondary)` |
| CTA Button | `padding: 16px 32px; border-radius: var(--btn-radius); background: var(--color-gold); font-weight: 700` |
| Card | `background: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--card-radius); padding: 24px` |
| Input | `background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 12px 16px; color: var(--color-text-primary)` |
| Badge | `background: rgba(212, 160, 23, 0.15); color: var(--color-gold); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600` |

---

## 4. CATÁLOGO DE ANIMAÇÕES — 12 EFEITOS

### Easing Padrão

Todas as animações usam o easing "snap" para sensação profissional:

```css
transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
```

### Tiers de Animação

#### OBRIGATÓRIAS (toda LP deve ter)

| # | Efeito | CSS/JS | Onde usar |
|---|---|---|---|
| 1 | Fade-in no scroll | `opacity: 0 → 1` + `translateY(30px → 0)` via IntersectionObserver | Todas as seções |
| 2 | CTA glow pulse | `box-shadow` pulsante com `@keyframes` | Botões de CTA |
| 3 | Gradient text no H1 | `background: linear-gradient` + `-webkit-background-clip: text` | Hero headline |
| 4 | Staggered delay | `transition-delay` incremental em filhos | Cards, features, steps |
| 5 | Input focus glow | `box-shadow` gold no `:focus` | Campos do formulário |

#### RECOMENDADAS (melhoram UX)

| # | Efeito | CSS/JS | Onde usar |
|---|---|---|---|
| 6 | Counter animation | JS — incremento numérico no scroll | Stats, KPIs |
| 7 | Progress bar scroll | `scaleX` atualizado no `scroll` event | Topo da página |
| 8 | Hover lift | `translateY(-4px)` + `box-shadow` intensificado | Cards |
| 9 | Parallax sutil | `translateY` a velocidade diferente do scroll | Background de seções |

#### DIFERENCIAIS (usar com moderação)

| # | Efeito | CSS/JS | Onde usar |
|---|---|---|---|
| 10 | Typewriter | JS — caractere por caractere | Sub-headline do hero |
| 11 | Morph entre estados | CSS transitions entre layouts | Tabs de features |
| 12 | Magnetic cursor | JS — botão segue leve o cursor | CTA principal (desktop only) |

### IntersectionObserver — Código Padrão

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### CSS Base para Animações

```css
/* Fade-in scroll */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-slow) var(--ease-snap),
              transform var(--duration-slow) var(--ease-snap);
}

[data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children */
[data-animate-stagger] > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-normal) var(--ease-snap),
              transform var(--duration-normal) var(--ease-snap);
}

[data-animate-stagger].visible > *:nth-child(1) { transition-delay: 0ms; opacity: 1; transform: translateY(0); }
[data-animate-stagger].visible > *:nth-child(2) { transition-delay: 100ms; opacity: 1; transform: translateY(0); }
[data-animate-stagger].visible > *:nth-child(3) { transition-delay: 200ms; opacity: 1; transform: translateY(0); }
[data-animate-stagger].visible > *:nth-child(4) { transition-delay: 300ms; opacity: 1; transform: translateY(0); }

/* CTA glow */
@keyframes ctaGlow {
  0%, 100% { box-shadow: 0 0 10px var(--color-gold-glow); }
  50% { box-shadow: 0 0 25px var(--color-gold-glow), 0 0 50px rgba(212, 160, 23, 0.15); }
}

.cta-primary {
  animation: ctaGlow 2.5s ease-in-out infinite;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Input focus */
input:focus, textarea:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px var(--color-gold-glow);
}

/* Hover lift */
.card-hover {
  transition: transform var(--duration-fast) var(--ease-snap),
              box-shadow var(--duration-fast) var(--ease-snap);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card), 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Counter animation */
.counter-value {
  font-variant-numeric: tabular-nums;
}
```

### Counter Animation — JS

```javascript
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = prefix + Math.round(target * eased).toLocaleString('pt-BR') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
```

---

## 5. FORMULÁRIO — ESTRUTURA PADRÃO

### HTML do Formulário

```html
<form id="form-lead" novalidate>
  <!-- Campos visíveis -->
  <div class="form-group">
    <input type="text" id="nome" name="nome" placeholder="Seu nome completo" required
           autocomplete="name">
  </div>

  <div class="form-group">
    <input type="email" id="email" name="email" placeholder="Seu melhor email" required
           autocomplete="email">
  </div>

  <div class="form-group">
    <input type="tel" id="telefone" name="telefone" placeholder="(XX) XXXXX-XXXX" required
           autocomplete="tel">
  </div>

  <!-- 19 campos ocultos — ver TRACKING-ARCHITECTURE.md §3 -->
  <!-- UTMs (5) + Click IDs (10) + Sessão (4) -->

  <button type="submit" class="cta-primary">
    <span class="btn-text">Quero conhecer o Orbit</span>
    <span class="btn-loading" style="display:none;">Enviando...</span>
  </button>
</form>
```

### Máscara de Telefone

```javascript
document.getElementById('telefone').addEventListener('input', function(e) {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 6) {
    v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
  } else if (v.length > 2) {
    v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
  } else if (v.length > 0) {
    v = '(' + v;
  }
  e.target.value = v;
});
```

### Feedback Visual

```javascript
function showFormState(state) {
  const btn = document.querySelector('.cta-primary');
  const btnText = btn.querySelector('.btn-text');
  const btnLoading = btn.querySelector('.btn-loading');

  switch(state) {
    case 'loading':
      btn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      break;

    case 'success':
      btn.style.background = 'var(--color-success)';
      btnLoading.style.display = 'none';
      btnText.textContent = 'Enviado com sucesso!';
      btnText.style.display = 'inline';
      // Redirect após 1.5s
      setTimeout(() => { window.location.href = '/obrigado'; }, 1500);
      break;

    case 'error':
      btn.disabled = false;
      btn.style.background = 'var(--color-error)';
      btnLoading.style.display = 'none';
      btnText.textContent = 'Erro — tente novamente';
      btnText.style.display = 'inline';
      setTimeout(() => {
        btn.style.background = '';
        btnText.textContent = 'Quero conhecer o Orbit';
      }, 3000);
      break;
  }
}
```

---

## 6. CRO — REGRAS DE OTIMIZAÇÃO

### Princípios

| Princípio | Implementação |
|---|---|
| Um CTA por seção visível | Não competir com múltiplas ações |
| Headline responde "O que ganho?" | Benefício > funcionalidade |
| Prova antes do pedido | Social proof/stats antes do form |
| Formulário mínimo | Max 3 campos visíveis — resto em hidden |
| Urgência real, não falsa | Prazo da garantia ou vagas limitadas (se real) |
| Contraste no CTA | Botão gold sobre fundo escuro — sempre |

### Hierarquia Visual (F-Pattern)

```
┌─────────────────────────────────┐
│ HEADLINE (lido primeiro)        │
│ ──────────────────────────      │
│ Subtítulo explicativo           │
│                                 │
│ ┌─────────┐                     │
│ │  [CTA]  │ ← olho para aqui   │
│ └─────────┘                     │
│                                 │
│ Badge / prova social            │
└─────────────────────────────────┘
```

### Testes A/B Recomendados

| Elemento | Variação A | Variação B | Métrica |
|---|---|---|---|
| Hero headline | Pain-first | Benefit-first | Scroll past hero |
| CTA text | "Agendar demonstração" | "Ver como funciona" | CTR |
| Social proof | Logos | Número destaque | Tempo na seção |
| Form position | Inline na seção | Sticky sidebar | Conversão |
| Garantia | Com prazo | Sem prazo | Conversão |

---

## 7. CHECKLIST DE VALIDAÇÃO

### Design
- [ ] Dark mode consistente (variáveis CSS)
- [ ] Contraste mínimo 4.5:1 (WCAG AA)
- [ ] CTA gold com glow visível sobre fundo escuro
- [ ] Tipografia Plus Jakarta Sans carregada
- [ ] Responsivo mobile/tablet/desktop testado
- [ ] Imagens otimizadas (WebP, lazy loading)

### Formulário
- [ ] 3 campos visíveis (nome, email, telefone)
- [ ] 19 campos ocultos presentes (ver TRACKING-ARCHITECTURE.md)
- [ ] Validação HTML5 (required, type=email, type=tel)
- [ ] Máscara de telefone funcionando
- [ ] Feedback visual (loading → sucesso → erro)
- [ ] Redirect pós-submit configurado
- [ ] `novalidate` + validação JS customizada

### Animações
- [ ] Fade-in scroll em todas as seções
- [ ] CTA glow pulsante
- [ ] Gradient text no H1
- [ ] Staggered delay em cards/features
- [ ] Input focus glow nos campos
- [ ] `prefers-reduced-motion` respeitado
- [ ] Performance < 16ms por frame

### SEO & Acessibilidade
- [ ] Meta title (60 chars) + description (155 chars)
- [ ] Open Graph tags (título, descrição, imagem)
- [ ] Schema markup (Organization ou Product)
- [ ] Heading hierarchy (H1 > H2 > H3, sem pulo)
- [ ] Alt text em todas as imagens
- [ ] `lang="pt-BR"` no `<html>`
- [ ] Sitemap atualizado

### Performance
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] FID < 100ms
- [ ] Fontes com `font-display: swap`
- [ ] CSS crítico inline no `<head>`
- [ ] JS não-crítico com `defer`

---

*Referência técnica — Orbit 2026*
