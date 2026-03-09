# Architecture Reference — Orbit Gestão Website

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Markup | HTML5 | Semantic elements, no templating engine |
| Styling | CSS3 + Custom Properties | `styles-v2.css` (active), no preprocessor |
| Scripts | Vanilla JS (ES6+) | `main-v2.js` for homepage, inline for other pages |
| Fonts | Google Fonts (Poppins) | Weights: 300, 400, 500, 600, 700, 800, 900 |
| Icons | Font Awesome 6.4.0 | CDN: cdnjs.cloudflare.com |
| Storage | localStorage | CMS data (`orbit_cms` key) |
| Auth | Web Crypto API (SHA-256) | Salt: `_orbit_salt_2024` |

No build step, no bundler, no npm dependencies.

## Page Map

```
                    ┌─────────────────┐
                    │   index.html    │ ← Homepage (v2)
                    │  styles-v2.css  │
                    │   main-v2.js    │
                    └───────┬─────────┘
                            │
        ┌───────┬───────┬───┴───┬───────┬───────┐
        │       │       │       │       │       │
     ┌──┴──┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐  │
     │Proc.│ │Indic│ │Taref│ │Comp.│ │Audit│  │
     │.html│ │.html│ │.html│ │.html│ │.html│  │
     └─────┘ └─────┘ └─────┘ └─────┘ └─────┘  │
     All use styles-v2.css + inline JS          │
                                         ┌──────┴──────┐
                                         │  Blog System │
                                         ├─────────────┤
                                         │ pages/      │
                                         │  blog.html  │ ← Blog listing
                                         │ blog/       │
                                         │  leitor.html│ ← Article reader
                                         └──────┬──────┘
                                                │
                                         ┌──────┴──────┐
                                         │  CMS System  │
                                         ├─────────────┤
                                         │ acesso/     │
                                         │  index.html │ ← Login
                                         │  painel.html│ ← Admin panel
                                         └─────────────┘
                                                │
                                         localStorage
                                         ('orbit_cms')
```

## Data Flow

```
CMS (painel.html) ──write──▶ localStorage('orbit_cms')
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                    blog.html                 leitor.html
                    (listing)                 (reader)
                         │                         │
                    Read articles            Read single article
                    status=published         by slug or id
                    Show cards grid          + leadMagnets[]
                                            + CTA banner
```

## CSS Architecture (styles-v2.css ~1598 lines)

### Organization

```
Line    Section
─────── ─────────────────────────────────
1-60    Reset & CSS Variables (:root)
61-130  Utilities (.container, .highlight, .section-header)
82-130  Buttons (.btn, .btn-primary, .btn-outline, .btn-ghost, .btn-lg)
131-260 Header (fixed nav, dropdown, mobile menu toggle)
260-310 Mobile Menu (.mobile-menu)
310-440 Hero Zoom (black bg, glow orbs, gradient title, background image)
440-480 Solutions Carousel section (.solutions-carousel)
480-570 Carousel (track, cards, arrows, dots)
570-700 Platform Tabs (tab buttons, panels, badge, features)
700-770 Trust Marquee (infinite logo scroll)
770-830 Stats Banner (4-column counter grid)
830-920 Testimonials (card grid)
920-1010 Integration 360° (orbit ring, floating icons)
1010-1080 Knowledge/Blog (content card grid)
1080-1200 Contact Form (split layout, form card, validation)
1200-1300 Footer (4-column grid, social links)
1300-1360 Back to Top, Scroll Reveal
1360-1500 Product Pages (hero, benefits, features, detail, testimonial, CTA)
1500-1540 Other Modules Strip (.other-modules)
1540-1598 Product Page Responsive (1024px, 768px, 480px)
```

### Naming Convention
- BEM-inspired: `.block__element--modifier`
- Homepage sections: `.hero-zoom`, `.one-platform`, `.trust-marquee`, `.stats-banner`
- Product pages: `.product-hero`, `.product-benefits-v2`, `.product-features-v2`
- Blog: `.reader-grid`, `.sidebar-lead`, `.mid-cta-banner`, `.related-card`
- CMS: `.sidebar`, `.card`, `.form-group`, `.modal`, `.table-wrapper`

## JavaScript Architecture (main-v2.js ~369 lines)

### Module Breakdown

```
Line    Module                  Trigger
─────── ─────────────────────── ───────────────────
8-26    Header Scroll Effect    scroll event, 50px threshold
34-61   Mobile Menu             click toggle
63-77   Navbar Dropdown         mouseenter/mouseleave
79-193  Carousel                autoplay 4s, click, touch, resize
195-214 Platform Tabs           click toggle
216-229 Smooth Scroll           anchor click with offset
231-251 Scroll Reveal           IntersectionObserver
253-285 Counter Animation       IntersectionObserver, setInterval
287-302 Session ID              sessionStorage
304-319 Phone Mask              input event, BR format
321-369 Lead Form Submit        submit event, validation, dataLayer
```

### Key Patterns
- All code inside single `DOMContentLoaded` listener
- IntersectionObserver for lazy animations (counters, scroll reveal)
- Touch support: `touchstart`/`touchend` with 50px swipe threshold
- Carousel uses `translateX` on `.carousel-track`
- Form uses `dataLayer.push()` for GTM integration

## CMS Architecture (painel.html ~2583 lines)

### Structure
```
Lines 1-726       CSS styles (inline <style>)
Lines 727-1207    HTML body (sidebar, views, modals)
Lines 1208-end    JavaScript (auth, CRUD, editor, uploads)
```

### Key JavaScript Functions (~1375 lines)
```
getDB() / setDB()              Data access layer
initUI()                        Initialize user interface
showView(name)                  SPA navigation
refreshDashboard/Articles/etc   Data refresh per view
clearEditor() / editArticle()   Editor state management
saveArticle(status)             Article persistence
Lead magnet CRUD                Library management
Image upload handlers           FileReader + drag & drop
Rich text editor                contentEditable + execCommand
SEO score calculator            Checklist with scoring
User management (admin)         CRUD with hashed passwords
```

### SPA Navigation
```js
showView(viewName) {
  // Hide all views
  // Show target view
  // Highlight nav item
  // Refresh view data
  // Close mobile sidebar
}
```

## Product Page Template

All 5 product pages share identical structure with content variations.

### HTML Structure
```html
<header class="header"><!-- Nav --></header>
<div class="mobile-menu"><!-- Links --></div>
<section class="product-hero">
    <div class="product-hero__grid">
        <div class="product-hero__content">badge, title, desc, CTAs</div>
        <div class="product-hero__image">screenshot</div>
    </div>
</section>
<section class="other-modules"><!-- 5 pill nav links --></section>
<section class="product-benefits-v2"><!-- 3-card grid --></section>
<section class="product-features-v2"><!-- 2-col checks --></section>
<section class="product-detail-v2"><!-- Split image + text --></section>
<section class="product-testimonial-v2"><!-- Quote card --></section>
<section class="product-cta-v2"><!-- 2 CTAs --></section>
<footer class="footer"><!-- 4 columns --></footer>
```

### Inline JS (~30 lines per page)
1. Header `.scrolled` class on scroll > 50px
2. Dropdown show/hide on mouseenter/mouseleave
3. Back-to-top button visibility and click handler

## Form & GTM Architecture

### Form Flow
```
User fills form → Client-side validation → Phone mask formatting
    → Build first/last name from full name
    → Push to dataLayer:
        event: 'form_submit_success'
        email, phoneNumber, nome, sobrenome
        apex_session_id, time_on_page_at_submit
    → Show loading spinner → Simulate success (setTimeout 1200ms)
    → Hide form, show success message
```

### UTM Capture
Hidden fields auto-populated: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`, `gbraid`, `wbraid`, `ttclid`, `msclkid`, `session_id`, `landing_page`, `session_attributes_encoded`.

## Navigation Architecture

### Desktop
```
Logo | Início | Soluções ▼ | Conhecimento | Seja Parceiro | Fale Conosco | [Entrar] [Agendar Demo]
                    │
                    ├── Processos
                    ├── Indicadores
                    ├── Tarefas
                    ├── Competências
                    └── Auditorias
```

### Mobile
Hamburger → slide-in panel (300px from right) with all links stacked.

### CMS Sidebar
```
Logo + "CMS"
├── Dashboard
├── Artigos
├── Novo Artigo
├── Iscas Digitais
├── ──────────
├── Usuarios (admin only)
├── Ver Blog (external)
└── Ver Site (external)

User card: avatar, name, role, logout
```

## Responsive Strategy

| Breakpoint | Target | Key Changes |
|-----------|--------|-------------|
| > 1024px | Desktop | Full layout, 3-col carousel, 2-col grids, article+sidebar |
| ≤ 1024px | Tablet | Hamburger menu, 2-col carousel, stacked heroes, single-col article |
| ≤ 768px | Mobile | 1-col everything, smaller fonts, stacked stats |
| ≤ 480px | Small | Full-width buttons, minimal padding, 1-col carousel |

### Font Scaling
Uses `clamp()` for fluid typography:
- Hero title: `clamp(36px, 5vw, 64px)`
- Section headings: `clamp(28px, 4vw, 44px)`
- Tab panels: `clamp(24px, 3vw, 36px)`
