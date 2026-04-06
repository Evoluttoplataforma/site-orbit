# Orbit Gestão — Design System & Brand Guidelines

> Documento de referência para geração automática de Landing Pages.
> Toda LP criada para o Orbit DEVE seguir estas especificações exatamente.

---

## 1. Cores

### Paleta Principal

| Token | Hex | Uso |
|-------|-----|-----|
| `--primary` | `#ffba1a` | Dourado — cor principal da marca, CTAs, destaques |
| `--primary-dark` | `#e6a200` | Hover de elementos dourados |
| `--primary-light` | `#ffca4a` | Gradientes dourados, destaques suaves |
| `--primary-glow` | `rgba(255, 186, 26, 0.3)` | Glow/brilho em botões e cards |
| `--black` | `#0D1117` | Background principal (dark) |
| `--black-soft` | `#161B22` | Background secundário (dark) |
| `--black-card` | `#1C2333` | Background de cards (dark) |
| `--white` | `#ffffff` | Texto principal sobre fundo escuro |

### Cinzas (Paleta GitHub-inspired)

| Token | Hex | Uso |
|-------|-----|-----|
| `--gray-50` | `#161B22` | Bg escuro alternativo |
| `--gray-100` | `#1C2333` | Cards, separadores |
| `--gray-200` | `#30363D` | Bordas em dark mode |
| `--gray-300` | `#484F58` | Bordas, divisores |
| `--gray-400` | `#8B949E` | Texto secundário, placeholders |
| `--gray-600` | `#C9D1D9` | Texto padrão sobre fundo escuro |
| `--gray-800` | `#E6EDF3` | Texto claro/destaque |

### Cores para Seções Claras (Light)

| Token | Hex | Uso |
|-------|-----|-----|
| `--light-bg` | `#FAFBFC` | Background principal light |
| `--light-bg-alt` | `#F0F2F5` | Background alternativo light |
| `--light-card` | `#FFFFFF` | Cards em seção light |
| `--light-border` | `rgba(0,0,0,0.06)` | Bordas em light |
| `--light-text` | `#1A1D23` | Texto principal em light |
| `--light-text-secondary` | `#5A6069` | Texto secundário em light |

### Cores de Status

| Token | Hex | Uso |
|-------|-----|-----|
| `--success` | `#3FB950` | Sucesso, confirmações |
| `--error` | `#F85149` | Erros, alertas |

### Regras de Uso de Cor

- Seções escuras: usar `--gray-*` e `rgba(255,255,255,x)` para texto
- Seções claras: **NUNCA** usar `--gray-*` — usar `--light-*` ou hardcode hex
- Bordas em dark: `rgba(255,255,255,0.08)` padrão, `rgba(255,186,26,0.2)` para destaque
- Bordas em light: `rgba(0,0,0,0.06)` padrão

---

## 2. Tipografia

### Fonte

| Propriedade | Valor |
|-------------|-------|
| **Font Family** | `Plus Jakarta Sans` |
| **Fallback** | `-apple-system, BlinkMacSystemFont, sans-serif` |
| **Weights disponíveis** | 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold), 800 (Extra-Bold) |
| **Display** | `swap` |
| **Suavização** | `-webkit-font-smoothing: antialiased` |

### Escala Tipográfica

| Elemento | Tamanho | Weight | Line-Height | Letter-Spacing | Uso |
|----------|---------|--------|-------------|----------------|-----|
| **Hero H1** | `clamp(36px, 5vw, 64px)` | 800 | 1.1 | -0.03em | Título principal do hero |
| **Section H2** | `clamp(28px, 4vw, 44px)` | 600 | 1.15 | -0.02em | Títulos de seção |
| **Section H2 Large** | `clamp(36px, 6vw, 64px)` | 600 | 1.1 | -0.03em | Títulos grandes |
| **H3 Subsection** | `clamp(24px, 3vw, 34px)` | 600 | 1.2 | -0.01em | Subtítulos |
| **H3 Medium** | `clamp(24px, 4vw, 40px)` | 600 | 1.2 | -0.01em | Subtítulos maiores |
| **Body** | `16px` | 400 | 1.6–1.7 | normal | Parágrafos |
| **Body Large** | `18px` | 400 | 1.6 | normal | Descrições de seção |
| **Caption** | `14px` | 400–500 | 1.5 | 0.3px | Legendas, meta info |
| **Label** | `0.85rem` (~13.6px) | 600 | 1 | 0.5px–2px | Labels, badges |
| **Label Uppercase** | `0.6rem` (~9.6px) | 700 | 1 | 1.5px | Tags, categorias |
| **Button** | `15px` | 600 | 1 | normal | Texto de botões |

### Regras

- Headings SEMPRE usam `clamp()` para responsividade fluida
- Itálico permitido em headings para ênfase: `<em>` com `color: var(--primary-dark)`
- `<strong>` em parágrafos: `color: #fff` (dark) ou `color: #1a1d23` (light)
- Nunca usar mais de 2 weights diferentes na mesma seção

---

## 3. Botões

### Base (`.btn`)

```css
padding: 12px 28px;
border-radius: 50px;
font-size: 15px;
font-weight: 600;
font-family: 'Plus Jakarta Sans', sans-serif;
transition: all 0.15s ease;
border: 2px solid transparent;
cursor: pointer;
text-decoration: none;
display: inline-flex;
align-items: center;
gap: 8px;
```

### Variantes

| Classe | Background | Texto | Borda | Hover |
|--------|-----------|-------|-------|-------|
| `.btn-primary` | `#ffba1a` | `#0D1117` | — | Glow dourado + seta gira 45deg |
| `.btn-outline` | `transparent` | `#fff` | `2px solid #fff` | `bg: rgba(255,255,255,0.1)` |
| `.btn-ghost` | `transparent` | `#fff` | — | `color: var(--primary)` |
| `.btn-dark` | `#0D1117` | `#fff` | — | `bg: #161B22` |
| `.btn-lg` | — | — | — | Padding maior, ícone maior |

### Botão Primário — Comportamento Detalhado

```css
/* Estado normal */
padding: 14px 56px 14px 28px;
background: #ffba1a;
color: #0D1117;
border-radius: 50px;
position: relative;

/* Ícone seta (pseudo-element ::after) */
content: '\f061'; /* Font Awesome arrow-right */
font-family: 'Font Awesome 6 Free';
width: 36px;
height: 36px;
border-radius: 50%;
background: #0D1117;
color: var(--primary);

/* Hover */
padding-left: 52px;
padding-right: 24px;
/* Seta move para esquerda e gira -45deg */
/* Glow: box-shadow: 0 0 25px rgba(255,186,26,0.3) */
```

### Glow Animado (`.hero-cta-glow`)

```css
@keyframes ctaGlow {
  0%, 100% { box-shadow: 0 0 10px rgba(255,186,26,0.3); }
  50%      { box-shadow: 0 0 25px rgba(255,186,26,0.3); }
}
animation: ctaGlow 3s infinite;
```

---

## 4. Cards

### Card Padrão (Dark)

```css
background: rgba(255,255,255,0.05);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 14px–20px;
padding: 24px–32px;
transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
```

**Hover:**
```css
transform: translateY(-4px);
border-color: rgba(255,186,26,0.2);
box-shadow: 0 12px 32px rgba(255,186,26,0.1);
```

### Card Light

```css
background: #FFFFFF;
border: 1px solid rgba(0,0,0,0.06);
border-radius: 14px–20px;
box-shadow: 0 4px 24px rgba(0,0,0,0.06);
```

### Card Highlight (Dark)

```css
border-color: rgba(255,186,26,0.2);
background: rgba(255,186,26,0.05);
```

### Card Testimonial

```css
background: linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
border: 1px solid rgba(255,255,255,0.06);
border-radius: 20px;
padding: 32px 28px;
box-shadow: 0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,186,26,0.04);
```

---

## 5. Seções

### Estrutura Base

```css
section {
  padding: 140px 0;         /* Desktop */
  /* padding: 80px 0;       /* Tablet (≤1024px) */
  /* padding: 60px 0;       /* Mobile (≤768px) */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  /* padding: 0 20px;       /* Tablet */
  /* padding: 0 16px;       /* Mobile */
}
```

### Seção Escura (padrão)

```css
background: #0D1117; /* ou var(--black) */
color: #C9D1D9;
```

### Seção Clara

```css
background: #FAFBFC;
color: #1A1D23;
```

### Section Header

```css
.section-header {
  text-align: center;
  margin-bottom: 72px;
}
.section-header h2 {
  font-size: clamp(32px, 4.5vw, 48px);
  font-weight: 600;
  margin-bottom: 16px;
}
.section-header p {
  font-size: 18px;
  color: rgba(255,255,255,0.5); /* dark */
  /* color: #5A6069;             /* light */
  max-width: 600px;
  margin: 0 auto;
}
```

### Badge/Label de Seção

```css
display: inline-flex;
align-items: center;
gap: 8px;
padding: 6px 14px;
border-radius: 50px;
font-size: 0.85rem;
font-weight: 600;
background: rgba(255,186,26,0.1);
color: #ffba1a;
border: 1px solid rgba(255,186,26,0.15);
margin-bottom: 16px;
```

---

## 6. Gradientes

### Gradientes Dourados (marca)

```css
/* Primário */
linear-gradient(135deg, #ffba1a, #ffca4a)

/* Sutil para backgrounds */
linear-gradient(135deg, rgba(255,186,26,0.1), rgba(255,186,26,0.05))
```

### Gradientes Escuros

```css
/* Cards/painéis */
linear-gradient(135deg, #1C2333 0%, #13161D 100%)
linear-gradient(160deg, #0D1117 0%, #161B22 100%)

/* Overlays de imagem */
linear-gradient(180deg, rgba(13,17,23,0.3) 0%, rgba(13,17,23,0.85) 100%)
linear-gradient(0deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)

/* Texto com fade */
linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.55) 100%)
/* Aplicar com: background-clip: text; -webkit-text-fill-color: transparent */
```

### Mask Gradients (Fade edges)

```css
/* Horizontal (carousels) */
mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);

/* Vertical (marquees) */
mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
```

---

## 7. Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.2)` | Elementos pequenos |
| `--shadow` | `0 4px 24px rgba(0,0,0,0.3)` | Cards padrão |
| `--shadow-lg` | `0 12px 48px rgba(0,0,0,0.4)` | Modais, overlays |
| `--shadow-xl` | `0 20px 60px rgba(0,0,0,0.5)` | Hero elements |
| `--shadow-glow` | `0 0 20px rgba(255,186,26,0.3)` | Destaque dourado |
| `--light-shadow` | `0 4px 24px rgba(0,0,0,0.06)` | Cards em seção light |
| `--light-shadow-lg` | `0 12px 40px rgba(0,0,0,0.08)` | Destaque em light |

---

## 8. Efeitos & Animações

### Transições Padrão

```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);      /* Suave */
--transition-fast: all 0.15s ease;                           /* Rápida */
--ease-snap: cubic-bezier(0.16, 1, 0.3, 1);                /* Elástica */
```

### Backdrop Blur (Glassmorphism)

```css
/* Header */
backdrop-filter: blur(24px);
-webkit-backdrop-filter: blur(24px);

/* Header on scroll */
backdrop-filter: blur(30px);

/* Cards translúcidos */
backdrop-filter: blur(15px);
```

### Animações Reutilizáveis

```css
/* Glow pulsante — para CTAs */
@keyframes ctaGlow {
  0%, 100% { box-shadow: 0 0 10px rgba(255,186,26,0.3); }
  50%      { box-shadow: 0 0 25px rgba(255,186,26,0.3); }
}

/* Fade-in de painéis */
@keyframes panelFadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Marquee horizontal */
@keyframes marqueeScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Rotação orbital */
@keyframes orbitSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Flutuação suave */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

/* Pulse de brilho */
@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50%      { opacity: 1; }
}

/* Blink (indicador live) */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.2; }
}
```

### Hover Padrão em Cards

```css
/* Lift + glow */
transform: translateY(-4px);
border-color: rgba(255,186,26,0.2);
box-shadow: 0 12px 32px rgba(255,186,26,0.1);
```

---

## 9. Espaçamento

### Sistema de 8px

| Token | Valor | Uso |
|-------|-------|-----|
| `4px` | micro | Gap entre ícone e texto |
| `8px` | xs | Padding interno mínimo |
| `12px` | sm | Padding de badges |
| `16px` | md | Margin entre elementos, gap padrão |
| `24px` | lg | Padding de container, gap de grid |
| `32px` | xl | Padding de cards |
| `48px` | 2xl | Gap entre seções internas |
| `72px` | 3xl | Margin-bottom de section-header |
| `140px` | section | Padding vertical de seções (desktop) |

### Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `8px` | Elementos pequenos, inputs |
| `--radius` | `16px` | Padrão (header, painéis) |
| `--radius-lg` | `24px` | Cards grandes, seções |
| `--radius-xl` | `32px` | Hero elements |
| `50px` | pill | Botões, badges |
| `50%` | circle | Avatares, ícones redondos |

---

## 10. Breakpoints Responsivos

| Breakpoint | Valor | Comportamento |
|------------|-------|---------------|
| **Desktop** | > 1024px | Layout completo, grids 2-3 colunas |
| **Tablet** | ≤ 1024px | Grids colapsam para 2 colunas, padding reduz |
| **Mobile** | ≤ 768px | Single column, nav hamburger, font sizes reduzem |
| **Small** | ≤ 480px | Padding mínimo, stacking completo |

### Mudanças por Breakpoint

```css
/* Desktop (padrão) */
section { padding: 140px 0; }
.container { padding: 0 24px; }
grid-template-columns: 1fr 1fr; /* ou repeat(3, 1fr) */

/* ≤ 1024px */
section { padding: 80px 0; }
grid-template-columns: 1fr 1fr; /* mantém 2 cols */

/* ≤ 768px */
section { padding: 60px 0; }
.container { padding: 0 20px; }
grid-template-columns: 1fr; /* single column */

/* ≤ 480px */
.container { padding: 0 16px; }
/* font-sizes já reduzem via clamp() */
```

---

## 11. Componentes de LP

### Hero

```
Estrutura:
┌─────────────────────────────────────┐
│ Background: imagem + overlay escuro │
│                                     │
│   [Badge com ícone]                 │
│   <h1> Título grande </h1>          │
│   <p> Descrição 18px </p>           │
│   [Botão Primário] [Botão Ghost]    │
│                                     │
│   padding: 180px 0 140px            │
│   min-height: 100vh                 │
└─────────────────────────────────────┘
```

- Overlay: `linear-gradient(to bottom, rgba(13,17,23,0.3) 0%, rgba(13,17,23,0.85) 100%)`
- Título: weight 800, `clamp(36px, 5vw, 64px)`
- Subtítulo: 18px, `rgba(255,255,255,0.6)`
- Texto com fade gradient: `background-clip: text` + gradiente branco→transparente

### CTA Section

```
Estrutura:
┌─────────────────────────────────────┐
│ bg: rgba(255,186,26,0.08)          │
│ border: 1px solid rgba(gold,0.1)   │
│ border-radius: 24px                │
│                                     │
│   [Ícone 56px dourado em círculo]  │
│   <h2> Chamada para ação </h2>     │
│   <p> Descrição curta </p>         │
│   [Botão Primário] [Botão Outline] │
│                                     │
│   text-align: center               │
└─────────────────────────────────────┘
```

### Closing/Footer Section

```
Estrutura:
┌─────────────────────────────────────┐
│ Background: imagem escura + overlay │
│                                     │
│   <h2> Frase de impacto </h2>      │
│   <p> Descrição </p>               │
│   [Botão Primário]                 │
│                                     │
│   text-align: center               │
│   padding: 120px 0                  │
└─────────────────────────────────────┘
```

### Guarantee Section

```
Estrutura:
┌──────────────┬──────────────────────┐
│ Visual       │ Texto                │
│ (selo com    │ <h2> Garantia </h2>  │
│  animação    │ <p> Descrição </p>   │
│  flutuante)  │ [checkmarks list]    │
│              │                      │
│ bg: gradient │                      │
│ escuro       │                      │
│ min-h: 360px │                      │
└──────────────┴──────────────────────┘
grid: 1fr 1fr, gap: 60px
```

### Accordion/FAQ

```
Estrutura:
[Label uppercase]
┌─────────────────────────────────────┐
│ ▸ Pergunta (16px, weight 600)      │
│   Resposta (16px, color gray)      │
│   (expande com animação)           │
├─────────────────────────────────────┤
│ ▸ Pergunta 2                       │
│   ...                              │
└─────────────────────────────────────┘
```

---

## 12. Header & Navegação

### Header Flutuante

```css
position: fixed;
top: 16px;
left: 50%;
transform: translateX(-50%);
width: calc(100% - 32px);
max-width: 1340px;
z-index: 1000;
background: rgba(13,17,23,0.6);
backdrop-filter: blur(24px);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16px;
padding: 0 24px;
height: 64px;
```

**On Scroll:**
```css
background: rgba(0,0,0,0.85);
backdrop-filter: blur(30px);
box-shadow: 0 8px 32px rgba(0,0,0,0.4);
border-color: rgba(255,255,255,0.1);
top: 8px;
```

### Nav Links

```css
font-size: 14px;
font-weight: 500;
color: rgba(255,255,255,0.7);
padding: 8px 16px;
border-radius: 8px;
transition: all 0.15s ease;
/* Hover: bg: rgba(255,255,255,0.08), color: #fff */
```

### Mega Dropdown

```css
background: #fff;
border-radius: 16px;
width: 620px;
box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06);
display: grid;
grid-template-columns: 1fr 1fr;
padding: 0;
overflow: hidden;
```

---

## 13. Ícones

### Font Awesome 6 Solid

- **Carregamento**: Async (non-blocking) via JS injection
- **Uso**: Classes `fas fa-*` (solid) e `fab fa-*` (brands)
- **Peso**: `font-weight: 900`

### Ícones Mais Usados

| Classe | Uso |
|--------|-----|
| `fa-arrow-right` | Botões, links |
| `fa-check` | Listas de features |
| `fa-chess-king` | Agente Estrategista |
| `fa-sitemap` | Agente Processos |
| `fa-users` | Agente Pessoas |
| `fa-chart-line` | Agente Indicadores |
| `fa-graduation-cap` | Agente Treinamento |
| `fa-magnifying-glass-chart` | Agente Pesquisa |
| `fa-shield-halved` | Agente Riscos |
| `fa-lightbulb` | Agente Oportunidades |
| `fa-triangle-exclamation` | Agente Problemas |
| `fa-file-lines` | Agente Documentos |
| `fa-handshake` | Agente Vendas |
| `fa-video` | Agente Reuniões |
| `fa-linkedin` | Redes sociais (brands) |
| `fa-whatsapp` | WhatsApp (brands) |
| `fa-chevron-left/right` | Navegação carousel |
| `fa-bars` | Menu mobile |
| `fa-times` | Fechar |

---

## 14. Imagens

### Formatos

| Formato | Uso |
|---------|-----|
| `.avif` | Hero backgrounds (prioridade) |
| `.jpg` | Fotos de pessoas, backgrounds |
| `.png` | Logos, ícones com transparência |
| `.svg` | Favicon, ícones vetoriais |

### Dimensões Recomendadas

| Tipo | Largura Máxima | Qualidade |
|------|---------------|-----------|
| Hero background | 1920px | 70-75% |
| Fotos de pessoas (cards) | 512-600px | 75-80% |
| Backgrounds de seção | 800px | 70% |
| Thumbnails | 400px | 75% |

### Atributos Obrigatórios

```html
<img src="/images/foto.jpg"
     alt="Descrição acessível"
     width="600" height="400"
     loading="lazy"
     decoding="async">
```

- Hero/above the fold: **sem** `loading="lazy"`
- Tudo abaixo do fold: **com** `loading="lazy" decoding="async"`
- Sempre definir `width` e `height` para evitar CLS

---

## 15. Tom de Voz

| Aspecto | Diretriz |
|---------|----------|
| **Personalidade** | Autoridade com acessibilidade |
| **Estilo** | Direto, profissional, sem jargão corporativo vazio |
| **Ancoragem de preço** | SEMPRE comparar com custo CLT humano, NUNCA com software |
| **Olívia** | Coordenadora IA — voz do sistema, sempre presente |
| **Verbos-chave** | executa, organiza, decide, monitora, estrutura |
| **Evitar** | "Revolucionário", "disruptivo", linguagem de startup genérica |
| **Foco** | Resultado mensurável, experiência de 30 anos, IA que trabalha |
