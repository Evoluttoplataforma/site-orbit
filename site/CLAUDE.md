# CLAUDE.md — Orbit Gestão Website

## Project Overview

Static website for **Orbit Gestão**, a strategic management platform with AI for mid-market companies. Built with pure HTML/CSS/JS (no frameworks). Visual design inspired by Zoom.com.

**Brand:** Orbit Gestão — "Onde a Estratégia vira Execução"
**Target:** Mid-market companies (R$ 5M–100M/year revenue)
**Product:** 5 modules + AI (Processos, Indicadores, Tarefas, Competências, Auditorias, Orbit IA)

## Quick Reference

### Brand Identity
- **Primary color (yellow):** `#FDB73F` → CSS var `--primary`
- **Primary dark:** `#E5A235` → CSS var `--primary-dark`
- **Primary light:** `#FEC85F` → CSS var `--primary-light`
- **Black:** `#000000` → CSS var `--black`
- **Font:** Poppins (Google Fonts), weights 300–900
- **Icons:** Font Awesome 6
- **Logo:** `images/logo-orbit.svg` (yellow rounded square with black "O")

### File Structure
```
site/
├── CLAUDE.md                    # THIS FILE — project context for Claude Code
├── index.html                   # Homepage (v2 Zoom-style, ~693 lines)
├── css/
│   ├── styles-v2.css            # ★ ACTIVE design system (~1598 lines)
│   └── styles.css               # ✗ LEGACY v1 — DO NOT USE for new pages
├── js/
│   ├── main-v2.js               # ★ ACTIVE homepage JS (~369 lines)
│   └── main.js                  # ✗ LEGACY v1 — DO NOT USE for new pages
├── images/
│   ├── logo-orbit.svg           # Brand logo SVG
│   ├── hero-bg.avif             # Homepage hero background image
│   └── manual-marca.pdf         # Brand manual (reference only)
├── pages/
│   ├── processos.html           # Product page: Processos (v2)
│   ├── indicadores.html         # Product page: Indicadores (v2)
│   ├── tarefas.html             # Product page: Tarefas (v2)
│   ├── competencias.html        # Product page: Competências (v2)
│   ├── auditorias.html          # Product page: Auditorias (v2)
│   ├── blog.html                # Blog listing page (v2)
│   ├── parcerias.html           # Partners page (v2)
│   └── obrigado.html            # Thank you page
├── blog/
│   ├── leitor.html              # Article reader page (v2, ~794 lines)
│   └── artigo-template.html     # Article template reference
├── acesso/
│   ├── index.html               # CMS login page
│   └── painel.html              # CMS admin panel (~2583 lines)
└── docs/
    ├── ARCHITECTURE.md           # Detailed architecture reference
    ├── DESIGN-SYSTEM.md          # CSS variables, components, patterns
    ├── CMS.md                    # CMS system documentation
    └── BLOG.md                   # Blog system documentation
```

### Active vs Legacy Files
| Status | CSS | JS | Pages |
|--------|-----|-----|-------|
| ★ ACTIVE (v2) | `styles-v2.css` | `main-v2.js` | `index.html`, 5 product pages, `blog.html`, `leitor.html` |
| ✗ LEGACY (v1) | `styles.css` | `main.js` | `parcerias.html` |

**IMPORTANT:** All new pages and modifications MUST use `styles-v2.css`. Never reference `styles.css` for new work.

## Design System (CSS)

### CSS Variables (`:root` in styles-v2.css)
```css
--primary: #FDB73F;          /* Yellow — CTAs, highlights, badges */
--primary-dark: #E5A235;     /* Button hover */
--primary-light: #FEC85F;    /* Gradients, glow effects */
--black: #000000;            /* Backgrounds, header, footer */
--black-soft: #111111;       /* Dropdown, dark cards */
--white: #FFFFFF;
--gray-50 to --gray-900;     /* Full gray scale */
--success: #22C55E;          /* Form success */
--error: #EF4444;            /* Form error */
--radius: 16px;              /* Cards, panels */
--radius-sm: 8px;            /* Inputs, small elements */
--radius-lg: 24px;           /* Highlighted sections */
--radius-xl: 32px;           /* Badges, pills */
--max-width: 1200px;         /* Container max */
--container-px: 24px;        /* Container padding */
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--shadow-sm/--shadow/--shadow-lg/--shadow-xl;
```

### Button Classes
| Class | Style | Use |
|-------|-------|-----|
| `.btn-primary` | Yellow bg, black text | Primary CTAs |
| `.btn-outline` | White border, transparent | Secondary CTAs on dark bg |
| `.btn-ghost` | No border, transparent | Tertiary actions |
| `.btn-dark` | Black bg, white text | Product page CTAs |
| `.btn-lg` | 16px 36px padding | Hero buttons |

### Responsive Breakpoints
- `≤ 1024px` — Tablet: hamburger menu, 2-col grids, stacked hero
- `≤ 768px` — Mobile: 1-col grids, smaller fonts
- `≤ 480px` — Small mobile: full-width buttons, minimal layout

## Homepage Architecture (index.html)

The homepage uses `styles-v2.css` + `main-v2.js`. Sections in order:

1. **Header** (`.header`) — Fixed, black, 72px. Logo + nav + dropdown + CTAs. Adds `.scrolled` class after 50px scroll.
2. **Hero** (`#home .hero-zoom`) — Black bg with background image (`hero-bg.avif`, 30% opacity), animated yellow glow orbs. Title with gradient text, 2 CTAs. `padding: 180px 0 120px; min-height: 80vh`.
3. **Solutions Carousel** (`#solucoes .solutions-carousel`) — Separate section. Header "Conheça nossas soluções" + 6 cards (5 modules + Orbit IA). Autoplay 4s, arrows, dots, touch/swipe.
4. **Platform Tabs** (`.one-platform`) — "Uma plataforma. Tudo conectado." 6 tabs with content panels.
5. **Trust Marquee** (`.trust-marquee`) — Infinite scrolling client logos.
6. **Stats Banner** (`.stats-banner`) — 4 animated counters (IntersectionObserver).
7. **Testimonials** (`.testimonials-section`) — 3 cards with 5-star ratings.
8. **Integration 360°** (`.integration-section`) — Animated orbit visual + Google Workspace integration.
9. **Knowledge** (`.knowledge-section`) — 3 content cards (Article, Ebook, Webinar).
10. **Contact Form** (`.cta-form-section`) — Split layout: benefits + form. GTM dataLayer push on submit.
11. **Footer** (`.footer`) — 4 columns: brand+social, contact, solutions, knowledge.

## Blog System

### Blog Listing (`pages/blog.html`)
- Hero with badge, glows, radial gradient background
- Lists all published articles from `localStorage` (`orbit_cms` key)
- Articles link to `../blog/leitor.html?slug={article-slug}`
- Category filter, responsive grid

### Article Reader (`blog/leitor.html`)
- **Two-column layout**: article (1fr) + sidebar (300px), gap 48px, max-width 1140px
- **Left column**: cover image, header (category badge, title, author, date, read time), article body, tags, share bar, mid-article CTA banner
- **Right column** (sticky, top 96px): Lead magnet card, share buttons, tags
- **Mid-article CTA**: Injected at ~50% of content children when enabled
- **Lead magnet**: Resolved from `db.leadMagnets[]` by `article.leadMagnetId` (with backwards compat for old per-article fields)
- **Reading progress bar**: Top of page, scroll-based
- **Related articles**: Horizontal scroll-snap carousel with 340px cards
- Responsive: 1024px → single column, sidebar becomes 2-col grid; 768px → all single column

### URL Format
- SEO-friendly slugs: `?slug=titulo-do-artigo`
- Slug auto-generated from title (NFD normalize, remove accents, lowercase, hyphens)
- Fallback: `?id=art_xxxxx` for backwards compat

## CMS System (`acesso/`)

### Authentication
- **Login**: `acesso/index.html`
- **Password**: SHA-256 via Web Crypto API with salt `_orbit_salt_2024`
- **Session**: `sessionStorage` under key `orbit_session`
- **Default admin**: `rodrigoosouzaamarketing@gmail.com` / `orbit@2024`

### Admin Panel (`acesso/painel.html`)
- **Sidebar nav**: Dashboard, Artigos, Novo Artigo, Iscas Digitais, Usuarios (admin only), Ver Blog, Ver Site
- **Data**: `localStorage` under key `orbit_cms`

### Data Model (`orbit_cms` in localStorage)
```js
{
  users: [{ id, name, email, password (sha256), role ('admin'|'editor') }],
  articles: [{
    id, title, slug, content (HTML), category, author, readTime, metaDesc,
    imageUrl, imageData (base64),
    seoTitle, seoCanonical, seoKeyword, seoOgImage,
    leadMagnetId,          // references db.leadMagnets[].id
    ctaBannerEnabled,      // '0' or '1'
    ctaBannerTitle, ctaBannerDesc, ctaBannerCtaText, ctaBannerCtaUrl,
    ctaBannerImage,        // base64 data URL (file upload)
    status ('published'|'draft'),
    authorId, createdAt, updatedAt
  }],
  leadMagnets: [{
    id, type ('ebook'|'checklist'|'planilha'|'webinar'|'trial'),
    title, desc, cta, url, event (RD Station identifier), image (base64)
  }],
  version: 1
}
```

### CMS Views
| View | Route | Description |
|------|-------|-------------|
| Dashboard | `dashboard` | Stats: articles count, published, drafts, users |
| Artigos | `articles` | Table with all articles, edit/duplicate/delete actions |
| Novo Artigo | `editor` | Rich text editor, featured image (upload/URL), SEO card, lead magnet dropdown, CTA banner config |
| Iscas Digitais | `leadmagnets` | CRUD table for lead magnets. Modal for create/edit with image upload |
| Usuarios | `users` | Admin-only user management |

### Image Upload Pattern
All image uploads use the same pattern:
1. `<div class="image-upload-area">` with file input + drag & drop zone
2. `FileReader.readAsDataURL()` → base64 string
3. Max 2MB, accepts `image/*`
4. Preview in `.image-preview` container
5. Stored as base64 data URL in hidden input or directly in data model

### Lead Magnets Library
- Managed as a **separate collection** (`db.leadMagnets[]`)
- CRUD via "Iscas Digitais" view in sidebar
- Each lead magnet has: type, title, description, CTA text, URL, RD Station event, image
- In article editor: **dropdown** to select from the library
- In leitor.html: resolved by ID from `db.leadMagnets[]`
- CTA opens a **popup form** (nome, email, telefone, cargo, empresa)
- On submit: pushes `lead_magnet_conversion` to dataLayer + RD Station event

### CTA Banner (Mid-Article)
- Configured per-article in the editor
- Enable/disable toggle
- Fields: title, description, CTA text, CTA URL, image (file upload)
- Rendered at ~50% of article content in leitor.html

## Product Pages Template

All 5 product pages (`pages/*.html`) share the same structure. They use `../css/styles-v2.css?v=2` and include inline JS for header/dropdown/back-to-top.

### Structure
```
Header → Mobile Menu → Product Hero (badge + gradient title + 2 CTAs + image)
→ Modules Strip (pill nav) → Benefits (3-card grid) → Features (2-col + checks)
→ Detail (split image + text) → Testimonial → CTA → Footer → Back to Top
```

### Modules
| Module | Hero Title | Focus |
|--------|-----------|-------|
| Processos | "Padronize e Otimize seus Processos Críticos" | Process mapping, automation, ISO |
| Indicadores | "KPIs em Tempo Real com Dashboards Inteligentes" | Dashboards, OKRs/BSC, alerts |
| Tarefas | "Alinhe Tarefas à Estratégia e Aos Objetivos" | Kanban, strategic alignment |
| Competências | "Desenvolva o Potencial Máximo do Seu Time" | Skills matrix, 360° evaluation |
| Auditorias | "Garanta Conformidade e Qualidade nos Processos" | Checklists, action plans |

## GTM / Form Tracking

```js
{ event: 'form_submit_success', email, phoneNumber, nome, sobrenome, apex_session_id, time_on_page_at_submit }
```

Hidden UTM fields: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`, `gbraid`, `wbraid`, `ttclid`, `msclkid`, `session_id`, `landing_page`, `session_attributes_encoded`.

## Development Notes

### Running Locally
```bash
cd site/
python3 -m http.server 8080
# Open http://localhost:8080
```

### Key CSS Patterns
- **Gradient text:** `background: linear-gradient(135deg, var(--primary), var(--primary-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
- **Glow effect:** `box-shadow: 0 20px 60px rgba(253,183,63,0.15);`
- **Card hover:** `transform: translateY(-8px); box-shadow: var(--shadow-lg);`
- **Pill buttons:** `border-radius: 50px; padding: 12px 28px;`

### Placeholder Images
Replace with real product screenshots before production:
- Homepage carousel: `380x240`
- Platform tabs: `560x380`
- Product page hero: `600x400`
- Product detail section: `540x380`
- Client logos: `120x48`

## Pending Work
- [ ] Replace placeholder images with real product screenshots
- [ ] Connect form to real webhook (n8n/Zapier)
- [ ] Install GTM container snippet
- [ ] Migrate `parcerias.html` to v2 design
- [ ] Add SEO meta tags (OG, Twitter Cards) across all pages
- [ ] Add sitemap.xml and robots.txt
- [ ] Minify CSS/JS for production
- [ ] WCAG accessibility audit
- [ ] Deploy to Vercel/hosting
