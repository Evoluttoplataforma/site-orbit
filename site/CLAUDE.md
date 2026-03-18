# CLAUDE.md — Orbit Gestão Website

## Project Overview

Site e Landing Pages do **Orbit** — plataforma de gestão empresarial com agentes de IA do Grupo GSN. Built with pure HTML/CSS/JS (no frameworks).

**Brand:** Orbit — "Plataforma de gestão com IA. Contrate um time que executa."
**Grupo:** GSN (Gestão e Suporte para Negócios) — 30 anos, 8.000+ empresas
**Target B2B:** PMEs (5–100+ funcionários, R$ 500k–R$ 20M/ano)
**Target B2B2B:** Consultores, mentores, associações, hubs
**Product:** 12 agentes de IA (Estrategista, Processos, Pessoas, Treinamento, Indicadores, Pesquisa, Riscos, Oportunidades, Problemas, Documentos, Vendas, Reuniões)

> ⚠️ **POSICIONAMENTO ATUALIZADO (2026):** O Orbit foi reposicionado de "plataforma de gestão estratégica" para "plataforma de gestão com agentes de IA". Consulte os docs de posicionamento antes de criar qualquer peça de comunicação.

## Positioning Documents (★ READ FIRST)

Antes de criar ou editar QUALQUER peça de comunicação, leia os docs de posicionamento:

| Doc | Conteúdo | Quando consultar |
|-----|----------|-----------------|
| **[NARRATIVE-FRAMEWORK.md](./docs/NARRATIVE-FRAMEWORK.md)** | Framework narrativo v2: movimento, categoria, Olívia, 12 agentes com personas, dinâmicas, manifesto, ICPs, ecossistema GSN | SEMPRE — documento-mãe de toda comunicação |
| **[BRAND-POSITIONING.md](./docs/BRAND-POSITIONING.md)** | Quem somos, proposta de valor, 12 agentes, moat, receita, identidade visual, restrições narrativas | SEMPRE — é a bíblia |
| **[AUDIENCES-MESSAGING.md](./docs/AUDIENCES-MESSAGING.md)** | Personas (Carlos B2B, Fernanda B2B2B, Marcos Associação), copy de LPs, objeções, headlines, CTAs | Ao criar copy, ads, emails, conteúdo |
| **[GROWTH-PLAYBOOK.md](./docs/GROWTH-PLAYBOOK.md)** | Arquitetura de funis, 3 motores de aquisição, economia de canais, KPIs, pricing, roadmap | Ao planejar campanhas, analisar métricas |
| **[GROWTH-COPILOT.md](./docs/GROWTH-COPILOT.md)** | System prompt do agente de Growth (comportamento, escopo, formato) | Ao configurar agentes de IA para Growth |
| **[PROCESSES-MAP.md](./docs/PROCESSES-MAP.md)** | Mapa completo: docs → páginas → funis → operações → pendências | Para entender como tudo se conecta |
| **[TRACKING-ARCHITECTURE.md](./docs/TRACKING-ARCHITECTURE.md)** | Tracking end-to-end, dataLayer, 19 hidden fields, session ID, lead scoring, GTM | Ao implementar formulários e tracking |
| **[LP-STANDARDS.md](./docs/LP-STANDARDS.md)** | 17 seções de LP, animações (12 efeitos), design system CSS, CRO, checklist | Ao criar ou revisar Landing Pages |
| **[INDEXING-STRATEGY.md](./docs/INDEXING-STRATEGY.md)** | Google News, Schema NewsArticle, News Sitemap, Publisher Center, KPIs | Ao publicar artigos e otimizar indexação |

### Narrative Restrictions (ABSOLUTE)
1. **NUNCA** diga "consultoria tradicional não escala" — frase proibida
2. **NUNCA** mencione Evolutto em materiais de marketing
3. **NUNCA** diga que IA substitui consultores — IA potencializa
4. **NUNCA** invente dados financeiros ou depoimentos
5. **NUNCA** use linguagem técnica de IA (LLMs, tokens, API) — use "time de IA", "funcionários digitais", "agentes especializados"
6. **TOM:** Direto, confiante, anti-software, pragmático. Linguagem de negócio, não de tecnologia.

### Brand Identity — NEW Positioning (2026)

| Token | Hex | Uso |
|-------|-----|-----|
| Dark (fundo) | `#0D1117` | Background principal |
| Dark 2 | `#161B22` | Seções alternadas |
| Dark 3 | `#1C2333` | Cards e elementos |
| Gold (destaque) | `#D4A017` | CTAs, badges, ações |
| Gold Light | `#F5C518` | Hover states |
| Green | `#22C55E` | Métricas positivas |
| Red | `#EF4444` | Pain points, urgência |
| White | `#FFFFFF` | Títulos principais |
| Gray | `#8B949E` | Texto secundário |
| Light | `#C9D1D9` | Texto body |

- **Font:** Plus Jakarta Sans (400, 600, 700, 800)
- **Style:** Dark mode padrão, cards border-radius 12-20px, gold para ação

### Brand Identity — CURRENT Site
- **Primary color (gold):** `#D4A017` (migrado de #FDB73F)
- **Font:** Plus Jakarta Sans (400, 600, 700, 800) — migrado de Poppins
- **Icons:** Font Awesome 6 Solid
- **Logo:** `images/logo-orbit.svg` (yellow rounded square with black "O")
- **Dark sections:** `#0D1117` background, white/light text
- **Light sections:** `#FAFBFC` background, hardcoded text colors (`#1A1D23` títulos, `#5A6069` body, `#E5E7EB` borders)

> ⚠️ Em seções claras, SEMPRE usar cores hardcoded (não `var(--gray-*)`) para evitar problemas de transparência.

### File Structure
```
site/
├── CLAUDE.md                    # THIS FILE — project context for Claude Code
├── index.html                   # Homepage (v2 Zoom-style)
├── lp-empresas.html             # LP B2B — 12 seções, 12 agentes, pricing
├── canais.html                  # LP B2B2B — consultores/canais, modelo recorrente
├── sobre.html                   # Sobre — história, ecosystem, diretores
├── faq.html                     # FAQ — 13 Q&As em 4 categorias, accordion
├── pricing.html                 # Pricing — 3 planos, comparação de custos
├── agentes.html                 # AI Agents — showcase dos 12 agentes
├── parcerias.html               # Partners page (v2)
├── robots.txt                   # SEO — Allow all, block /acesso/
├── sitemap.xml                  # SEO — 15 URLs com prioridades
├── cache-bust.sh                # ★ Cache busting — rodar após alterar CSS
├── css/
│   ├── styles-v2.css            # ★ ACTIVE design system (componentes globais centralizados)
│   └── styles.css               # ✗ LEGACY v1 — DO NOT USE
├── js/
│   ├── main-v2.js               # ★ ACTIVE homepage JS
│   ├── main.js                  # ✗ LEGACY v1 — DO NOT USE
│   ├── seo.js                   # SEO — JSON-LD Schema (Organization + WebSite)
│   ├── db.js                    # Data abstraction layer (OrbitDB) — localStorage + Supabase
│   └── db-config.js             # Supabase config (USE_SUPABASE toggle)
├── images/
│   ├── logo-orbit.svg           # Brand logo SVG
│   ├── hero-bg.avif             # Homepage hero background image
│   └── manual-marca.pdf         # Brand manual (reference only)
├── pages/
│   ├── processos.html           # Product page: Processos
│   ├── indicadores.html         # Product page: Indicadores
│   ├── tarefas.html             # Product page: Tarefas
│   ├── competencias.html        # Product page: Competências
│   ├── auditorias.html          # Product page: Auditorias
│   ├── blog.html                # Blog listing page
│   └── obrigado.html            # Thank you page
├── blog/
│   ├── index.html               # Blog listing (alternate path)
│   ├── leitor.html              # Article reader page
│   └── artigo-template.html     # Article template reference
├── historias/
│   ├── index.html               # Customer stories listing
│   ├── historia.html            # Story reader
│   └── enviar.html              # Submit story form
├── acesso/
│   ├── index.html               # CMS login page
│   └── painel.html              # CMS admin panel
└── docs/
    ├── ARCHITECTURE.md           # Detailed architecture reference
    ├── DESIGN-SYSTEM.md          # CSS variables, components, patterns
    ├── CMS.md                    # CMS system documentation
    ├── BLOG.md                   # Blog system documentation
    ├── SUPABASE-MIGRATION.md     # ★ Guia de migração localStorage → Supabase
    ├── TEMPLATE-BLOG-CMS.md      # ★ Template reutilizável blog+CMS para novos projetos
    ├── BRAND-POSITIONING.md      # ★ Bíblia de posicionamento (2026)
    ├── AUDIENCES-MESSAGING.md    # ★ Personas, copy, objeções, LPs
    ├── GROWTH-PLAYBOOK.md        # ★ Funis, canais, KPIs, roadmap
    ├── GROWTH-COPILOT.md         # ★ System prompt do agente de Growth
    ├── PROCESSES-MAP.md          # ★ Mapa de processos doc → site → operação
    ├── TRACKING-ARCHITECTURE.md  # ★ Tracking, dataLayer, GTM, hidden fields, lead scoring
    ├── LP-STANDARDS.md           # ★ Seções de LP, animações, design system, CRO
    ├── INDEXING-STRATEGY.md      # ★ Google News, Schema, News Sitemap, Publisher Center
    └── NARRATIVE-FRAMEWORK.md    # ★ Framework narrativo v2 (movimento, Olívia, 12 agentes, manifesto)
```

### Active vs Legacy Files
| Status | CSS | JS | Pages |
|--------|-----|-----|-------|
| ★ ACTIVE (v2) | `styles-v2.css` | `main-v2.js` | All pages |
| ✗ LEGACY (v1) | `styles.css` | `main.js` | DO NOT USE |

**IMPORTANT:** All pages use `styles-v2.css`. Never reference `styles.css` for new work.

### SEO (All Pages)
- **OG/Twitter meta tags** applied to all 19 HTML pages
- **JSON-LD Schema** (Organization + WebSite) via `js/seo.js`
- **robots.txt** — allows all crawlers, blocks `/acesso/`
- **sitemap.xml** — 15 URLs with priority levels
- **Canonical URLs** on all pages

### Data Abstraction Layer (Supabase-Ready)
- **`js/db.js`** — `OrbitDB` class with `LocalBackend` and `SupabaseBackend`
- **`js/db-config.js`** — Config with `USE_SUPABASE` toggle (currently `false`)
- When Supabase credentials are provided: update `db-config.js`, run SQL from `docs/SUPABASE-MIGRATION.md`
- All CMS and blog pages can switch backends without UI changes

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

## Componentes Padronizados (Site-Wide)

> ⚠️ **REGRA ABSOLUTA:** Todo componente reutilizável DEVE ter CSS em `styles-v2.css`. NUNCA duplicar CSS em `<style>` inline de cada página. Se um componente aparece em mais de 1 página, o CSS vai no arquivo central.

### CTA Final (`.site-cta`) — Antes do footer
Todas as páginas usam o mesmo card CTA antes do footer. CSS em `styles-v2.css`.
```html
<section class="site-cta">
    <div class="site-cta__particles"><span></span><span></span><span></span><span></span></div>
    <div class="container">
        <div class="site-cta__card" data-reveal="scale">
            <div class="site-cta__icon"><i class="fas fa-rocket"></i></div>
            <h2>Título contextual da página</h2>
            <p>Subtítulo contextual</p>
            <div class="site-cta__buttons">
                <a href="/#contato-form" class="btn btn-primary btn-lg">CTA Principal</a>
                <a href="..." class="btn btn-outline btn-lg">CTA Secundário</a>
            </div>
        </div>
    </div>
</section>
```
- **Icon:** Varia por página (fa-rocket, fa-robot, fa-handshake, fa-comments)
- **Efeitos:** Particles flutuantes, gold accent line no topo do card, icon com pulse animation
- **Presente em:** TODAS as páginas (index, lp-empresas, canais, sobre, faq, pricing, agentes, parcerias, 5 product pages, blog)

### Closing Phrase (`.site-closing`) — Frase dourada
Seção de fechamento entre CTA e footer. CSS em `styles-v2.css`.
```html
<section class="site-closing">
    <div class="container">
        <h2>Orbit é o time de gestão que sua empresa sempre precisou.
            <span style="display:block;margin-top:8px;">E que nunca para de trabalhar.</span></h2>
        <a href="/#contato-form" class="btn">Conhecer o Time de IA</a>
    </div>
</section>
```
- **Background:** Gold gradient (#D4A017 → #E8B824), texto preto, botão preto
- **Presente em:** TODAS as páginas

### Garantia 90 Dias (`.guarantee-lp`) — Seção de garantia
Layout 2 colunas com visual scene + conteúdo. CSS em `styles-v2.css`.
```html
<section class="guarantee-section guarantee-section--dark">  <!-- ou --light -->
    <div class="container">
        <div class="guarantee-lp" data-reveal="scale">
            <div class="guarantee-lp__scene">
                <!-- Particles + Contract paper + Seal stamp (SEM caneca) -->
            </div>
            <div class="guarantee-lp__content">
                <!-- Badge "Risco Zero" + h2 + p + Checklist 4 items + CTA -->
            </div>
        </div>
    </div>
</section>
```
- **Coluna esquerda:** Fundo escuro, contrato CSS illustration (paper com header Orbit, linhas, gold bar, check), selo dourado animado (sealStamp), particles
- **Coluna direita:** Fundo branco, badge verde "Risco Zero", título, texto, 4 checks verdes, botão gold
- **Presente em:** index.html, lp-empresas.html, pricing.html

### Padrão de sequência antes do footer
```
[Última seção de conteúdo]
→ [Garantia .guarantee-lp] (se página tem garantia)
→ [CTA Final .site-cta]
→ [Closing Phrase .site-closing]
→ [Footer .footer]
```

## Product Pages Template

All 5 product pages (`pages/*.html`) share the same structure. CSS centralizado em `styles-v2.css` para componentes globais + `<style>` inline apenas para estilos específicos da página.

### Structure
```
Header → Mobile Menu → Product Hero (badge + gradient title + 2 CTAs + image)
→ Benefits (3-card grid) → Features Grid (tech/AI effects) → Detail (split image + text)
→ Testimonial → CTA (.site-cta card) → Closing Phrase (.site-closing) → Footer
```

### Product Page CTA (`.pp-cta`)
As 5 product pages usam `.pp-cta` (inline CSS) com o mesmo design do `.site-cta`. Mesma estrutura: card + rocket icon + particles + gold accent line.

### Modules
| Module | Hero Title | Focus |
|--------|-----------|-------|
| Processos | "Padronize e Otimize seus Processos Críticos" | Process mapping, automation, ISO |
| Indicadores | "KPIs em Tempo Real com Dashboards Inteligentes" | Dashboards, OKRs/BSC, alerts |
| Tarefas | "Alinhe Tarefas à Estratégia e Aos Objetivos" | Kanban, strategic alignment |
| Competências | "Desenvolva o Potencial Máximo do Seu Time" | Skills matrix, 360° evaluation |
| Auditorias | "Garanta Conformidade e Qualidade nos Processos" | Checklists, action plans |

### Features Grid (`.pp-features`)
Grid de recursos com efeitos tech/AI: gradient backgrounds, scan-line hover (::before), radial glow hover (::after), ícones 56px, scale animation on hover.

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

### Cache Busting
CSS usa hash automático no versionamento. Após alterar `styles-v2.css`, rodar:
```bash
cd site/
bash cache-bust.sh
```
Isso atualiza `?v=HASH` em todas as 21 páginas HTML automaticamente. **NUNCA** usar `?v=1`, `?v=2` manual.

### Key CSS Patterns
- **Gradient text:** `background: linear-gradient(135deg, var(--primary), var(--primary-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
- **Glow effect:** `box-shadow: 0 20px 60px rgba(253,183,63,0.15);`
- **Card hover:** `transform: translateY(-8px); box-shadow: var(--shadow-lg);`
- **Pill buttons:** `border-radius: 50px; padding: 12px 28px;`
- **Glassmorphism card:** `background: linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px;`
- **Gold accent line:** `position: absolute; top: -1px; left: 20%; right: 20%; height: 2px; background: linear-gradient(90deg, transparent, #D4A017, transparent);`

### Placeholder Images
Replace with real product screenshots before production:
- Homepage carousel: `380x240`
- Platform tabs: `560x380`
- Product page hero: `600x400`
- Product detail section: `540x380`
- Client logos: `120x48`

## Pending Work

### 🔴 Crítico
- [ ] Atualizar homepage com novo hero/copy ("Contrate um time de IA que executa")
- [ ] Coletar depoimentos reais (placeholders atuais são pendência crítica)
- [ ] Criar imagem OG padrão (`images/og-default.png`) — referenciada nos meta tags mas não existe
- [ ] Integrar Supabase (user fornecerá credenciais) — usar `docs/SUPABASE-MIGRATION.md`
- [ ] Criar página "Associações e Hub" (conforme AUDIENCES-MESSAGING.md, persona Marcos)

### 🟡 Site Técnico
- [ ] Replace placeholder images with real product screenshots
- [ ] Connect form to real webhook (n8n/Zapier)
- [ ] Install GTM container snippet
- [ ] Minify CSS/JS for production
- [ ] WCAG accessibility audit
- [ ] Deploy to Vercel/hosting
- [ ] Migrar `.pp-cta` inline CSS das product pages para `.site-cta` no styles-v2.css (unificar)

### ✅ Concluído
- [x] Criar LP B2B (`lp-empresas.html`) — 12 seções, 12 agentes
- [x] Criar LP B2B2B Canais (`canais.html`) — modelo recorrente, matemática
- [x] Criar páginas: Sobre, FAQ, Pricing, Agentes
- [x] Migrar identidade visual: Poppins → Plus Jakarta Sans, #FDB73F → #D4A017
- [x] SEO meta tags (OG, Twitter Cards) em todas as 19 páginas
- [x] sitemap.xml e robots.txt
- [x] JSON-LD Schema (Organization + WebSite) via seo.js
- [x] Data abstraction layer (OrbitDB) para migração Supabase
- [x] Corrigir parcerias.html (ícones, cores, botões, scroll reveal)
- [x] Atualizar blog e histórias (nav, footer, data-reveal, cores)
- [x] Padronizar CTA final (.site-cta) em TODAS as páginas
- [x] Padronizar closing phrase (.site-closing) em TODAS as páginas
- [x] Padronizar garantia 90 dias (.guarantee-lp) em index, lp-empresas, pricing
- [x] Remover modules-strip de 5 product pages
- [x] Remover "Outros módulos" de 5 product pages
- [x] Redesenhar features grid com efeitos tech/AI em 5 product pages
- [x] Redesenhar CTA card em 5 product pages (.pp-cta)
- [x] Substituir agent grids por Olívia orbital hub em lp-empresas e canais
- [x] Redesenhar "Tensões produtivas" em agentes.html
- [x] Redesenhar "Como funciona" em parcerias.html (fundo escuro, cards glassmorphism)
- [x] Remover caneca de café da seção de garantia
- [x] Centralizar CSS de componentes globais em styles-v2.css (CTA, closing, garantia)
- [x] Cache busting automático com hash MD5 (cache-bust.sh)
- [x] Bump CSS version de ?v=manual para ?v=hash em 21 páginas
