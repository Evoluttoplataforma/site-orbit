# 🏗️ Arquitetura

## Visão geral

```
┌────────────────────┐
│   Browser (cliente) │
│                     │
│  /acesso (login)    │
│  /acesso/painel     │ ← SPA single-file
└────────┬────────────┘
         │
         │ HTTPS (REST + Auth)
         ▼
┌─────────────────────┐
│      Supabase       │
│  ┌──────────────┐   │
│  │  PostgREST   │←──│ JWT auto-refresh
│  └──────────────┘   │
│  ┌──────────────┐   │
│  │   GoTrue     │   │ /auth/v1/token
│  │   (Auth)     │   │
│  └──────────────┘   │
│  ┌──────────────┐   │
│  │  PostgreSQL  │   │ tabelas + RLS
│  └──────────────┘   │
└─────────────────────┘
```

**Tudo client-side.** Zero edge functions, zero backend custom. Uma rota Next.js renderiza HTML + JS inline e o JS conversa direto com Supabase.

## Arquivos-chave

### No projeto Next.js

```
src/app/acesso/
  ├── content.tsx          ← 'use client' wrapper
  ├── html.ts              ← HTML+JS da página de LOGIN (~200 linhas)
  ├── page.tsx             ← Server component que renderiza content
  └── painel/
      ├── content.tsx      ← 'use client' wrapper
      ├── html.ts          ← HTML+JS do PAINEL CMS (~3.700 linhas)
      └── page.tsx
```

### Padrão de cada rota

```typescript
// page.tsx
import { PageContent } from './content';
export default function Page() { return <PageContent />; }
```

```typescript
// content.tsx
'use client';
import { useEffect } from 'react';
import { html } from './html';

export function PageContent() {
  useEffect(() => {
    // Executa o JS inline depois do mount
    const scripts = document.querySelectorAll('script[data-painel]');
    scripts.forEach(s => {
      try { new Function(s.textContent || '')(); } catch(e) { console.error(e); }
    });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

```typescript
// html.ts
export const html = `
<aside class="sidebar">...</aside>
<main class="main">...</main>
<style>... CSS ...</style>
<script data-painel>
  // Todo o JS do CMS (~2500 linhas)
  // Auth, fetch supabase, CRUD artigos, etc
</script>
`;
```

## Por que single-file?

**Vantagens:**
- ✅ Zero overhead de build (não precisa de bundler React no CMS)
- ✅ JS roda direto no browser, super rápido
- ✅ Edição instantânea (mudou linha → reload)
- ✅ Não polui a árvore de componentes React

**Desvantagens:**
- ❌ Arquivo gigante (~3700 linhas) — difícil de navegar
- ❌ Sem type safety (JS puro, sem TS no JS inline)
- ❌ Tudo executa no escopo `new Function()` — variáveis não vazam pro escopo global
- ❌ Erros de sintaxe quebram o painel inteiro

**Regra crítica:** se UM erro de JS acontecer no top-level, o CMS inteiro quebra (porque `new Function()` aborta). Sempre testar com `node -c` antes de deploy.

## Fluxo de dados

### Login

```
User → /acesso (form email+senha)
       │
       ├─→ POST supabase.auth.signInWithPassword
       │
       └─→ Recebe { access_token, refresh_token, user }
           │
           ├─→ Salva em localStorage["orbit_session"]
           ├─→ Verifica se email existe em cms_admins (extra check)
           └─→ Redirect → /acesso/painel
```

### Sessão no painel

```
Painel.onload
  │
  ├─→ Lê localStorage["orbit_session"]
  ├─→ Se não tem → redirect /acesso
  ├─→ Carrega user info (cms_admins)
  └─→ Render sidebar + dashboard
```

### Auto-refresh do token

Sempre que faz request via `supaFetch()`:

```javascript
async function supaFetch(url, options) {
  // 1. Tenta com access_token atual
  const res = await fetch(url, { ...options, headers: { Authorization: 'Bearer ' + token } });
  
  // 2. Se 401, tenta refresh
  if (res.status === 401) {
    const newSession = await refreshToken();
    if (newSession) {
      // Retry com novo token
      return fetch(url, { ...options, headers: { Authorization: 'Bearer ' + newSession.access_token } });
    } else {
      logout(); // refresh falhou → logout
    }
  }
  
  return res;
}
```

### CRUD de qualquer entidade (exemplo: artigos)

```javascript
// LIST
const res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles?order=updated_at.desc');
const articles = await res.json();

// CREATE
await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
  body: JSON.stringify({ title, slug, content, ... })
});

// UPDATE
await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles?id=eq.' + id, {
  method: 'PATCH',
  body: JSON.stringify({ ... })
});

// DELETE
await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles?id=eq.' + id, { method: 'DELETE' });
```

## Padrão de UI: Sidebar + Main

```
┌────────────────┬─────────────────────────────────┐
│                │                                  │
│   SIDEBAR      │           MAIN CONTENT           │
│                │                                  │
│  [Logo]        │  ┌──────────────────────────┐   │
│                │  │  Dashboard               │   │
│  • Dashboard   │  │  ─────────────────────   │   │
│  • Artigos     │  │  [Métricas em cards]     │   │
│  • Iscas       │  │  [Tabelas]               │   │
│  • Histórias   │  │                          │   │
│  • Comentários │  └──────────────────────────┘   │
│  • Banners     │                                  │
│  • Email Mkt   │  Cada item da sidebar troca o   │
│  ─────────     │  conteúdo do main via JS         │
│  • Usuários    │  (showView('articles'))          │
│                │                                  │
│  [User info]   │                                  │
│  [Logout]      │                                  │
└────────────────┴─────────────────────────────────┘
```

Sidebar é fixa. `showView(name)` esconde todas as `.view` e mostra a `.view#view-{name}`.

## Roles e permissões

Tabela `cms_admins`:

| role | acesso |
|---|---|
| `admin` | TUDO + tela "Usuários" pra criar/editar outros admins |
| `editor` | Tudo EXCETO "Usuários" (não pode criar outros admins) |

A verificação é feita no JS do painel: ao carregar, busca o user em `cms_admins` e se `role !== 'admin'` esconde o link "Usuários" (`document.getElementById('navUsers').style.display = 'none'`).

**⚠️ Não é segurança de verdade** — é só UI. A segurança real está nas RLS policies do Supabase. Veja `02-database-schema.md`.
