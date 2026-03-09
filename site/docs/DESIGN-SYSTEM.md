# Design System Reference — Orbit Gestão

## Color Palette

### Primary Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Yellow | `#FDB73F` | `--primary` | CTAs, badges, highlights, icons |
| Yellow Dark | `#E5A235` | `--primary-dark` | Button hover states |
| Yellow Light | `#FEC85F` | `--primary-light` | Gradients, glow effects |
| Black | `#000000` | `--black` | Hero bg, header, footer, dark sections |
| Soft Black | `#111111` | `--black-soft` | Dropdown bg, dark cards |

### Neutrals
| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| White | `#FFFFFF` | `--white` | Text on dark, section backgrounds |
| Gray 50 | `#F9FAFB` | `--gray-50` | Light section backgrounds |
| Gray 100 | `#F3F4F6` | `--gray-100` | Card backgrounds, alt rows |
| Gray 200 | `#E5E7EB` | `--gray-200` | Borders, dividers |
| Gray 300 | `#D1D5DB` | `--gray-300` | Subtle borders |
| Gray 400 | `#9CA3AF` | `--gray-400` | Placeholder text |
| Gray 500 | `#6B7280` | `--gray-500` | Secondary text, subtitles |
| Gray 600 | `#4B5563` | `--gray-600` | Body text secondary |
| Gray 700 | `#374151` | `--gray-700` | Body text, headings alt |
| Gray 800 | `#1F2937` | `--gray-800` | Dark text |
| Gray 900 | `#111827` | `--gray-900` | Heading text on white bg |

### Semantic Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Success | `#22C55E` | `--success` | Form success feedback |
| Error | `#EF4444` | `--error` | Form error feedback |

## Typography

### Font Family
```css
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale
| Element | Weight | Size | Line-height |
|---------|--------|------|------------|
| Hero Title | 800 (ExtraBold) | clamp(36px, 5vw, 64px) | 1.1 |
| Page Title (H1) | 700 (Bold) | clamp(28px, 4vw, 44px) | 1.2 |
| Section Title (H2) | 700 (Bold) | clamp(24px, 3vw, 36px) | 1.2 |
| Card Title (H3) | 600 (Semibold) | 20–24px | 1.3 |
| Body | 400 (Regular) | 16px | 1.6 |
| Small / Labels | 500 (Medium) | 14px | 1.5 |
| Nav Links | 500 (Medium) | 14px | 1 |
| Buttons | 600 (Semibold) | 15px (16px for .btn-lg) | 1 |

## Spacing & Layout

### Container
```css
.container {
  max-width: 1200px; /* --max-width */
  padding: 0 24px;   /* --container-px */
  margin: 0 auto;
}
```

### Section Padding
- Standard sections: `100px 0`
- Product hero: `140px 0 100px` (extra top for fixed header)
- Stats banner / marquee: `60px 0`

### Border Radius
| Variable | Value | Usage |
|----------|-------|-------|
| `--radius-sm` | 8px | Inputs, dropdown items, small cards |
| `--radius` | 16px | Standard cards, panels |
| `--radius-lg` | 24px | Featured sections, large cards |
| `--radius-xl` | 32px | Badges, pills |
| `50px` | (inline) | Buttons, module strip pills |

## Shadows
| Variable | Value | Usage |
|----------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06)` | Subtle card shadows |
| `--shadow` | `0 4px 24px rgba(0,0,0,0.08)` | Default card shadow |
| `--shadow-lg` | `0 12px 48px rgba(0,0,0,0.12)` | Hover states |
| `--shadow-xl` | `0 20px 60px rgba(0,0,0,0.15)` | Dropdown, featured cards |

## Transitions
| Variable | Value | Usage |
|----------|-------|-------|
| `--transition` | `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Standard animations |
| `--transition-fast` | `all 0.15s ease` | Hover micro-interactions |

## Component Reference

### Buttons
```html
<!-- Primary CTA -->
<a href="#" class="btn btn-primary">Agendar Demo</a>

<!-- Secondary on dark bg -->
<a href="#" class="btn btn-outline">Entrar</a>

<!-- Ghost link-style -->
<a href="#" class="btn btn-ghost">Ver mais <i class="fas fa-arrow-right"></i></a>

<!-- Dark button -->
<a href="#" class="btn btn-dark">Saiba mais</a>

<!-- Large variant (add to any) -->
<a href="#" class="btn btn-primary btn-lg">Agendar demonstração</a>
```

### Cards
```html
<!-- Benefit card (product pages) -->
<div class="benefit-card-v2">
    <div class="benefit-card-v2__icon"><i class="fas fa-icon"></i></div>
    <h3>Title</h3>
    <p>Description</p>
</div>

<!-- Feature item (product pages) -->
<div class="feature-item-v2">
    <div class="feature-item-v2__check"><i class="fas fa-check"></i></div>
    <div>
        <h4>Feature Title</h4>
        <p>Feature description</p>
    </div>
</div>
```

### Badges
```html
<!-- Product page badge -->
<span class="product-hero__badge">Orbit Processos</span>

<!-- Tab panel badge -->
<div class="platform-panel__badge">Orbit Indicadores</div>

<!-- IA variant -->
<div class="platform-panel__badge platform-panel__badge--ia">Orbit IA</div>
```

### Gradient Text Effect
```css
.element span {
    background: linear-gradient(135deg, var(--primary), var(--primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

### Glow Effect (Hero/Product)
```css
.glow-element {
    box-shadow: 0 20px 60px rgba(253, 183, 63, 0.15);
}

/* Animated glow orb */
.hero-zoom__glow {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(253,183,63,0.15), transparent);
    animation: float 8s ease-in-out infinite;
}
```

## Visual Effects Catalog

| Effect | CSS | Used In |
|--------|-----|---------|
| Gradient title | `linear-gradient + background-clip: text` | Hero, product heroes |
| Glow orbs | `radial-gradient + float animation` | Homepage hero |
| Card hover lift | `translateY(-8px) + shadow-lg` | All cards |
| Button hover lift | `translateY(-2px) + yellow shadow` | Primary buttons |
| Header blur | `backdrop-filter: blur(20px)` | Header on scroll |
| Marquee scroll | `@keyframes marquee translateX(-50%)` | Client logos |
| Orbit float | `@keyframes orbit-float` | Integration icons |
| Counter animation | JS IntersectionObserver + setInterval | Stats section |
| Scroll reveal | JS `.revealed` class toggle | Various sections |
