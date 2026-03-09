# Blog System — Orbit Gestão

## Overview

Complete blog system with listing page, article reader, CMS integration, lead magnets, and CTA banners. Articles are stored in `localStorage` and rendered client-side.

## Architecture

```
┌──────────────────┐     ┌───────────────────┐     ┌──────────────────┐
│  CMS Panel       │     │  Blog Listing     │     │  Article Reader  │
│  acesso/         │────▶│  pages/blog.html   │────▶│  blog/leitor.html│
│  painel.html     │     │                   │     │                  │
│                  │     │  Reads db.articles │     │  Reads article   │
│  CRUD articles   │     │  Shows published   │     │  by ?slug=xxx    │
│  CRUD leadMagnets│     │  Grid layout       │     │  Two-column      │
└──────────────────┘     └───────────────────┘     └──────────────────┘
        │                                                   │
        └───────────── localStorage ('orbit_cms') ──────────┘
```

## Blog Listing Page (`pages/blog.html`)

### URL
`/pages/blog.html`

### Features
- Hero section with badge "Blog & Conhecimento", glow effects, radial gradient
- Reads all articles with `status === 'published'` from `localStorage`
- Article cards: cover image, category badge, title, excerpt, author avatar, date, read time
- Links to `../blog/leitor.html?slug={article.slug}`
- Responsive grid: 3 columns → 2 → 1

### Categories Displayed
```js
{ estrategica: 'Gestao Estrategica', processos: 'Processos',
  indicadores: 'Indicadores', lideranca: 'Lideranca', ia: 'IA & Inovacao' }
```

## Article Reader (`blog/leitor.html`)

### URL Format
- Primary: `/blog/leitor.html?slug=titulo-do-artigo`
- Fallback: `/blog/leitor.html?id=art_xxxxx`

### Layout Structure
```
┌────────────────────────────────────────────────────────┐
│ Reading Progress Bar (fixed top, yellow, 3px)          │
├────────────────────────────────────────────────────────┤
│ Header (fixed, 72px)                                   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌─────────────────────────────┐ ┌──────────────────┐ │
│  │ Article Cover (full width)  │ │ Lead Magnet Card │ │
│  ├─────────────────────────────┤ │ (sticky top:96px)│ │
│  │ Category Badge              │ │                  │ │
│  │ Title (H1)                  │ │ Type icon/badge  │ │
│  │ Author | Date | Read Time   │ │ Title            │ │
│  ├─────────────────────────────┤ │ Description      │ │
│  │                             │ │ Download CTA     │ │
│  │ Article Body (HTML)         │ ├──────────────────┤ │
│  │                             │ │ Share Buttons    │ │
│  │ [Mid-CTA Banner ~50%]      │ │ LinkedIn/Twitter │ │
│  │                             │ │ Facebook/WhatsApp│ │
│  │                             │ │ Copy link        │ │
│  ├─────────────────────────────┤ ├──────────────────┤ │
│  │ Tags + Share Bar            │ │ Tags             │ │
│  └─────────────────────────────┘ └──────────────────┘ │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Related Articles (scroll-snap carousel, 340px)   │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  Footer                                                │
└────────────────────────────────────────────────────────┘
```

### Grid Specs
```css
grid-template-columns: 1fr 300px;
gap: 48px;
max-width: 1140px;
margin: 0 auto;
```

### Responsive Breakpoints
| Breakpoint | Layout |
|-----------|--------|
| > 1024px | Two-column: article + 300px sidebar |
| ≤ 1024px | Single column, sidebar becomes 2-column grid below article |
| ≤ 768px | Full single column |

### Reading Progress Bar
- Fixed at top of page
- Yellow (`var(--primary)`)
- Width calculated: `(scrollTop / (docHeight - viewHeight)) * 100%`
- Height: 3px, z-index above header

### Lead Magnet Card (Sidebar)
Resolved from `db.leadMagnets[]` by `article.leadMagnetId`:

```js
// Resolution order:
// 1. article.leadMagnetId → db.leadMagnets.find(lm => lm.id === id)
// 2. Fallback: old per-article fields (article.leadMagnetEnabled === '1')
// 3. Default: hardcoded "Guia Completo de Gestão Estratégica para PMEs"
```

**Lead Magnet Types & Icons:**
```js
LEAD_ICONS = {
  ebook: 'fas fa-book-open',
  checklist: 'fas fa-clipboard-check',
  planilha: 'fas fa-file-excel',
  webinar: 'fas fa-video',
  trial: 'fas fa-rocket'
};
LEAD_LABELS = {
  ebook: 'Ebook gratuito',
  checklist: 'Checklist gratuito',
  planilha: 'Planilha gratuita',
  webinar: 'Webinar gratuito',
  trial: 'Teste gratuito'
};
```

### Lead Magnet Conversion Popup
Clicking the lead magnet CTA opens a popup form (not a direct link).

**Form fields:**
- Nome completo (required)
- E-mail corporativo (required)
- Telefone (required, BR mask)
- Cargo (optional)
- Empresa (optional)

**On submit:**
1. Push `lead_magnet_conversion` event to `window.dataLayer` (GTM)
2. Send RD Station conversion event with `conversion_identifier` = lead magnet `event` field
3. Show success message with link to download material
4. Auto-open material URL after 1.5s

**RD Station Integration:**
- Each lead magnet has an `event` field (configured in CMS)
- Event identifier sent as `conversion_identifier` in RD Station payload
- Payload includes: email, name, personal_phone, job_title, company_name, traffic_source
- Currently logs to console; configure actual API endpoint via GTM or direct `fetch()`

### Mid-Article CTA Banner
- Injected at approximately 50% of content children
- Only rendered when `article.ctaBannerEnabled === '1'`
- Can have background image (base64 uploaded via CMS)
- Contains: title, description, CTA button

```js
// Injection logic
const children = tempDiv.children;
const midPoint = Math.floor(children.length / 2);
// Insert midCtaHTML after midPoint element
```

### Related Articles
- Shows up to 4 published articles from same category (excluding current)
- Horizontal scroll-snap carousel
- Fixed 340px card width
- Shows cover, category badge, title, author, date

### Schema.org / JSON-LD
Each article page includes structured data:
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "image": "...",
  "author": { "@type": "Person", "name": "..." },
  "publisher": { "@type": "Organization", "name": "Orbit Gestão" },
  "datePublished": "...",
  "dateModified": "...",
  "wordCount": 0,
  "articleSection": "...",
  "inLanguage": "pt-BR",
  "timeRequired": "PT5M"
}
```

## Slug Generation

```js
title
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // Remove accents
  .replace(/[^a-z0-9\s-]/g, '')                       // Remove special chars
  .replace(/\s+/g, '-')                                // Spaces to hyphens
  .replace(/-+/g, '-')                                 // Collapse hyphens
  .replace(/^-|-$/g, '')                               // Trim hyphens
  .slice(0, 80);                                       // Max 80 chars
```

## CSS Classes (leitor.html inline styles)

### Article Layout
| Class | Description |
|-------|-------------|
| `.reader-grid` | Two-column grid container |
| `.article-cover` | Full-width cover image (border-radius 16px) |
| `.article-header` | Title, meta info area |
| `.article-body` | Rich HTML content with typography styles |
| `.article-footer` | Tags and share buttons bar |

### Sidebar
| Class | Description |
|-------|-------------|
| `.reader-sidebar` | Sticky sidebar container (top: 96px) |
| `.sidebar-lead` | Lead magnet card |
| `.sidebar-lead__img` | Image area with gradient bg |
| `.sidebar-lead__badge` | Type label badge |
| `.sidebar-lead__btn` | Download CTA button |
| `.sidebar-share` | Share buttons card |
| `.sidebar-tags` | Tags list |

### CTA Banner
| Class | Description |
|-------|-------------|
| `.mid-cta-banner` | Banner container (gradient bg) |
| `.mid-cta-banner--has-image` | Variant with background image |
| `.mid-cta-banner__content` | Text content area |

### Related Articles
| Class | Description |
|-------|-------------|
| `.related-articles` | Section container |
| `.related-track` | Horizontal scroll-snap track |
| `.related-card` | Individual article card (340px) |
