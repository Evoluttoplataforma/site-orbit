# 📰 Blog frontend — como o site público consome os dados

A página `/blog` (lista de artigos) e `/blog/[slug]` (artigo individual) leem direto do Supabase via REST com a `ANON_KEY`. Sem backend custom.

## Estrutura

```
src/app/blog/
  ├── page.tsx          ← lista (server) renderizando content
  ├── content.tsx       ← 'use client' wrapper
  └── html.ts           ← HTML+JS da listagem

src/app/blog/[slug]/
  ├── page.tsx          ← static export precisa generateStaticParams
  ├── content.tsx
  └── html.ts           ← template do artigo
```

**⚠️ Static export + dynamic route:** com Next 16 + `output: 'export'`, rotas dinâmicas precisam de `generateStaticParams()` no `page.tsx` que retorna a lista de slugs no build time:

```typescript
// src/app/blog/[slug]/page.tsx
import { createClient } from '@supabase/supabase-js';

export async function generateStaticParams() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data } = await supabase
    .from('blog_articles')
    .select('slug')
    .eq('published', true);
  return (data || []).map(a => ({ slug: a.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />;
}
```

**Limitação:** novos artigos publicados no CMS **NÃO aparecem automaticamente no site** até o próximo build do Cloudflare. Soluções:

1. **Build hook** — webhook que dispara rebuild quando `blog_articles` tem INSERT/UPDATE com `published=true`. Setup:
   - Cloudflare Pages → Settings → Build & Deploy → Deploy Hooks → Create
   - Cola a URL gerada num webhook do Supabase (Database → Webhooks → New)
   - Trigger: `blog_articles` AFTER INSERT OR UPDATE WHERE published=true

2. **ISR** — não funciona com `output: 'export'`. Precisaria mudar pra SSR.

3. **Client-side rendering** — fazer a lista via `useEffect` + supabase no client. Funciona mas perde SEO.

## Lista do blog (`/blog`)

```javascript
// Pseudo-código do que está em src/app/blog/html.ts
async function loadBlogPosts() {
  const res = await fetch(SUPABASE_URL + '/rest/v1/blog_articles?published=eq.true&order=published_at.desc', {
    headers: { 'apikey': SUPABASE_ANON_KEY }
  });
  const articles = await res.json();
  
  const html = articles.map(a => `
    <article class="blog-card">
      <a href="/blog/${a.slug}">
        <img src="${a.cover_url}" alt="${a.title}">
        <div class="blog-card__category">${a.category}</div>
        <h2>${a.title}</h2>
        <p>${a.excerpt}</p>
        <div class="blog-card__meta">
          <img src="${a.author_avatar}" class="avatar">
          <span>${a.author}</span>
          <time>${formatDate(a.published_at)}</time>
        </div>
      </a>
    </article>
  `).join('');
  
  document.getElementById('blogGrid').innerHTML = html;
}
```

## Artigo individual (`/blog/[slug]`)

```javascript
async function loadArticle(slug) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/blog_articles?slug=eq.' + slug + '&published=eq.true', {
    headers: { 'apikey': SUPABASE_ANON_KEY }
  });
  const articles = await res.json();
  if (!articles.length) {
    document.body.innerHTML = '<h1>Artigo não encontrado</h1>';
    return;
  }
  const a = articles[0];
  
  // Renderiza
  document.getElementById('articleTitle').textContent = a.title;
  document.getElementById('articleCover').src = a.cover_url;
  document.getElementById('articleAuthor').textContent = a.author;
  document.getElementById('articleAvatar').src = a.author_avatar;
  document.getElementById('articleDate').textContent = formatDate(a.published_at);
  document.getElementById('articleContent').innerHTML = a.content; // HTML rich text
  document.getElementById('articleCategory').textContent = a.category;
  
  // SEO meta tags (cliente-side, mas funciona pra crawlers modernos)
  document.title = a.seo_title || a.title;
  setMetaTag('description', a.excerpt);
  setMetaTag('og:title', a.seo_title || a.title);
  setMetaTag('og:description', a.excerpt);
  setMetaTag('og:image', a.seo_og_image || a.cover_url);
  if (a.seo_canonical) {
    document.querySelector('link[rel="canonical"]').href = a.seo_canonical;
  }
  
  // CTA banner customizado (se ativado)
  if (a.cta_banner_enabled) {
    renderCtaBanner(a);
  }
  
  // Lead magnet (se vinculado)
  if (a.lead_magnet_id) {
    loadLeadMagnetCta(a.lead_magnet_id);
  }
  
  // Comentários
  loadComments(a.id);
}
```

## Comentários

```javascript
async function loadComments(articleId) {
  const res = await fetch(
    SUPABASE_URL + '/rest/v1/blog_comments?article_id=eq.' + articleId + 
    '&status=eq.approved&order=created_at.desc',
    { headers: { 'apikey': SUPABASE_ANON_KEY }}
  );
  const comments = await res.json();
  renderComments(comments);
}

async function submitComment(articleId, name, email, comment) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/blog_comments', {
    method: 'POST',
    headers: { 
      'apikey': SUPABASE_ANON_KEY,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      article_id: articleId,
      name, email, comment,
      status: 'pending' // sempre pending — admin aprova depois
    })
  });
  if (res.ok) {
    showMessage('Comentário enviado! Aguardando aprovação.');
  }
}
```

## Iscas digitais (CTA do artigo)

```javascript
async function loadLeadMagnetCta(id) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/lead_magnets?id=eq.' + id + '&active=eq.true', {
    headers: { 'apikey': SUPABASE_ANON_KEY }
  });
  const magnets = await res.json();
  if (!magnets.length) return;
  
  const m = magnets[0];
  const html = `
    <div class="lead-magnet-card">
      <img src="${m.cover_url}">
      <h3>${m.title}</h3>
      <p>${m.description}</p>
      <a href="${m.cta_url}" class="btn-primary">${m.cta_text}</a>
    </div>
  `;
  document.getElementById('leadMagnetSlot').innerHTML = html;
}
```

## Banners site-wide

`public/js/banner.js` é um script global que roda em **todas** as páginas:

```javascript
(function() {
  // Busca banners ativos no Supabase
  fetch(SUPABASE_URL + '/rest/v1/site_banners?active=eq.true&order=priority.desc', {
    headers: { 'apikey': SUPABASE_ANON_KEY }
  })
  .then(r => r.json())
  .then(banners => {
    banners.forEach(b => {
      // Filtros adicionais (start_date, end_date)
      const now = new Date();
      if (b.start_date && new Date(b.start_date) > now) return;
      if (b.end_date && new Date(b.end_date) < now) return;
      
      // Verifica se foi dispensado nesta sessão
      if (sessionStorage.getItem('banner_dismissed_' + b.id)) return;
      
      renderBanner(b);
    });
  });
  
  function renderBanner(b) {
    const div = document.createElement('div');
    div.className = 'site-banner site-banner--' + b.position;
    div.innerHTML = `
      ${b.image_data ? `<img src="${b.image_data}">` : ''}
      <div class="banner-content">
        <h3>${b.title}</h3>
        <p>${b.description || ''}</p>
        ${b.cta_text ? `<a href="${b.cta_url}" class="btn">${b.cta_text}</a>` : ''}
      </div>
      ${b.dismissible ? '<button class="banner-close">×</button>' : ''}
    `;
    if (b.bg_color) div.style.background = b.bg_color;
    if (b.text_color) div.style.color = b.text_color;
    
    // Position
    if (b.position === 'above-header') document.body.insertBefore(div, document.body.firstChild);
    else if (b.position === 'floating-bottom') { div.style.position = 'fixed'; div.style.bottom = '0'; document.body.appendChild(div); }
    else if (b.position === 'popup-center') showAsModal(div);
    // ... etc
    
    if (b.dismissible) {
      div.querySelector('.banner-close').onclick = () => {
        sessionStorage.setItem('banner_dismissed_' + b.id, '1');
        div.remove();
      };
    }
  }
})();
```

Esse script é incluído no `layout.tsx` global:

```typescript
<script src="/js/banner.js" defer />
```
