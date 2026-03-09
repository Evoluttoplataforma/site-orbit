# CMS System — Orbit Gestão

## Overview

Custom-built Content Management System for managing blog articles, lead magnets, and users. Single-page application built with vanilla HTML/CSS/JS. All data persisted in `localStorage`.

## Access

| URL | Page | Description |
|-----|------|-------------|
| `acesso/index.html` | Login | Email + password authentication |
| `acesso/painel.html` | Admin Panel | Full CMS interface |

### Default Credentials
- **Email:** `rodrigoosouzaamarketing@gmail.com`
- **Password:** `orbit@2024`

### Authentication Flow
```
Login form → SHA-256 hash (password + '_orbit_salt_2024') via Web Crypto API
→ Compare against db.users[].password
→ Store session in sessionStorage('orbit_session')
→ Redirect to painel.html
```

### Roles
| Role | Permissions |
|------|------------|
| `admin` | Full access: articles, users, lead magnets, all CRUD operations |
| `editor` | Can only manage own articles. No user management access |

## Data Storage

### Key: `orbit_cms` in localStorage

```js
{
  version: 1,
  users: [{
    id: 'usr_xxxxx',        // Unique ID
    name: 'Full Name',
    email: 'email@...',
    password: 'sha256hash',  // SHA-256 of (password + '_orbit_salt_2024')
    role: 'admin' | 'editor'
  }],
  articles: [{
    id: 'art_xxxxx',         // Unique ID (timestamp-based)
    title: 'Article Title',
    slug: 'article-title',   // SEO-friendly URL slug
    content: '<p>HTML...</p>', // Rich HTML content
    category: 'estrategica', // Key from CATEGORIES map
    author: 'Author Name',
    readTime: '5 min',
    metaDesc: 'Meta description...',
    imageUrl: 'https://...',  // External image URL (fallback)
    imageData: 'data:image/...', // Base64 uploaded image (preferred)
    // SEO fields
    seoTitle: 'SEO Title',
    seoCanonical: 'https://...',
    seoKeyword: 'keyword',
    seoOgImage: 'https://...',
    // Lead magnet (references library)
    leadMagnetId: 'lm_xxxxx', // ID from db.leadMagnets[]
    // CTA Banner (mid-article)
    ctaBannerEnabled: '0' | '1',
    ctaBannerTitle: 'Banner title',
    ctaBannerDesc: 'Description',
    ctaBannerCtaText: 'Button text',
    ctaBannerCtaUrl: 'https://...',
    ctaBannerImage: 'data:image/...', // Base64 uploaded image
    // Meta
    status: 'published' | 'draft',
    authorId: 'usr_xxxxx',
    createdAt: 'ISO string',
    updatedAt: 'ISO string'
  }],
  leadMagnets: [{
    id: 'lm_xxxxx',          // Unique ID (timestamp-based)
    type: 'ebook',           // ebook | checklist | planilha | webinar | trial
    title: 'Lead magnet title',
    desc: 'Short description',
    cta: 'Download button text',
    url: 'https://...',       // Link to material (after conversion)
    event: 'download-ebook-x', // RD Station event identifier
    image: 'data:image/...'   // Base64 uploaded image
  }]
}
```

### Categories Map
```js
{
  estrategica: 'Gestao Estrategica',
  processos: 'Processos',
  indicadores: 'Indicadores',
  lideranca: 'Lideranca',
  ia: 'IA & Inovacao'
}
```

## CMS Views

### 1. Dashboard (`view-dashboard`)
- Total articles count
- Published articles count
- Draft articles count
- Total users count
- Quick stats overview

### 2. Artigos (`view-articles`)
- Table: title, category, status (badge), date, actions
- Actions per row: Edit, Duplicate, Delete
- Admin sees all articles; editors see only their own
- Click "Edit" → opens editor view pre-populated
- Status badges: green (published), gray (draft)

### 3. Editor (`view-editor`)
Two-column layout: editor (left, 2fr) + sidebar (right, 1fr)

**Left Column:**
- Article title input (auto-generates slug on input)
- Slug field with preview
- Category dropdown
- Author name
- Read time
- Rich text editor (contentEditable div)
  - Toolbar: bold, italic, underline, strikethrough, headings (H2/H3), link, image (URL/file), lists, quote, code, alignment, horizontal rule, undo/redo
  - Max 2MB per inline image

**Right Column (sidebar cards):**
1. **Featured Image** — Tab switcher (Upload / URL). Drag & drop zone or file picker. Preview.
2. **SEO & Schema** — SEO title (60 char limit), canonical URL, focus keyword, OG image. Score bar with checklist.
3. **Lead Magnet** — Dropdown to select from library. Link to "Iscas Digitais" view.
4. **CTA Banner** — Enable/disable toggle. Title, description, CTA text, CTA URL, image upload.
5. **Publish buttons** — Publicar, Salvar rascunho, Pre-visualizar, Exportar HTML.

### 4. Iscas Digitais (`view-leadmagnets`)
- Table: type (badge), title, description, CTA text, actions (edit/delete)
- "Nova Isca" button opens modal
- Modal fields: type dropdown, title, description, CTA text, URL, image upload (drag & drop)
- Data stored in `db.leadMagnets[]`
- Referenced by articles via `leadMagnetId`

### 5. Usuarios (`view-users`) — Admin Only
- Table: name, email, role, actions
- Modal for create/edit user
- Fields: name, email, role, password
- Cannot delete self

## Image Upload Pattern

Used in 4 places: featured image, lead magnet modal, CTA banner, inline editor images.

```js
// 1. File input + drag & drop zone
<div class="image-upload-area" id="dropZoneId">
    <input type="file" accept="image/*" onchange="handleUpload(event)">
    <i class="fas fa-cloud-upload-alt"></i>
    <p>Arraste uma imagem ou clique para selecionar</p>
    <span class="upload-hint">JPG, PNG ou WebP (max 2MB)</span>
</div>

// 2. Validation: max 2MB, must be image/*
// 3. FileReader.readAsDataURL(file) → base64 string
// 4. Store in hidden input or data model
// 5. Show preview in .image-preview container
```

## Key Functions (painel.html)

| Function | Description |
|----------|-------------|
| `getDB()` / `setDB(db)` | Read/write `orbit_cms` from localStorage |
| `showView(name)` | Switch between views, refresh data |
| `refreshDashboard()` | Update dashboard stats |
| `refreshArticles()` | Render articles table |
| `refreshLeadMagnets()` | Render lead magnets table |
| `refreshUsers()` | Render users table |
| `editArticle(id)` | Load article into editor |
| `saveArticle(status)` | Save/update article |
| `duplicateArticle(id)` | Clone article as draft |
| `clearEditor()` | Reset all editor fields |
| `generateSlug()` | Auto-generate slug from title |
| `openLeadMagnetModal()` | Open lead magnet create/edit modal |
| `saveLeadMagnet()` | Save lead magnet to library |
| `populateLeadMagnetDropdown()` | Fill article editor dropdown with library items |
| `handleImageUpload(event)` | Featured image upload handler |
| `handleLmImageUpload(event)` | Lead magnet image upload handler |
| `handleCtaBannerImageUpload(event)` | CTA banner image upload handler |
| `updateSeoScore()` | Recalculate SEO score checklist |
| `hashPassword(password)` | SHA-256 hash with salt |
| `toast(message, type)` | Show notification toast |

## Backwards Compatibility

### Lead Magnets Migration
Old articles may have per-article lead magnet fields:
```js
// Old format (deprecated)
article.leadMagnetEnabled, article.leadMagnetType, article.leadMagnetTitle, etc.

// New format (current)
article.leadMagnetId → references db.leadMagnets[].id
```

`leitor.html` handles both: first checks `leadMagnetId`, then falls back to old per-article fields.
