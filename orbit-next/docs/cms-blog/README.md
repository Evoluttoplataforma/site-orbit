# 📚 CMS de Blog & Conteúdo — Orbit Gestão

Documentação completa do CMS construído pra gerenciar blog, lead magnets, histórias de cliente, banners, comentários e leads do site.

## 📂 Conteúdo desta pasta

| Arquivo | O que tem |
|---|---|
| `README.md` | Este arquivo — overview |
| `01-architecture.md` | Stack, fluxo de dados, arquivos-chave |
| `02-database-schema.md` | DDL completa de todas as tabelas + RLS |
| `03-auth.md` | Sistema de login, refresh token, roles |
| `04-cms-features.md` | Cada tela do painel: o que faz e como |
| `05-blog-frontend.md` | Como o blog público consome os dados |
| `06-recreation-prompt.md` | Prompt pronto pra colar no Claude Code recriar tudo |
| `07-styles-and-ui.md` | Padrões visuais (CSS classes reutilizáveis) |
| `08-rich-editor.md` | Editor de texto rico (toolbar + formatação) |
| `09-source-reference.md` | Trechos verbatim do `painel/html.ts` original (auth, supaFetch, saveArticle, slug, image upload, etc) |

## 🎯 Para que serve esta documentação

Esta pasta foi criada para que outro **Claude Code** (ou qualquer dev) consiga **recriar este CMS de zero** num projeto novo (cliente diferente, branding diferente), mantendo a mesma estrutura, features e qualidade.

## 🚀 Quick start (TL;DR)

O CMS é uma SPA single-file (~3.700 linhas) renderizada como HTML string + JS inline em `src/app/acesso/painel/html.ts`. Consome dados via REST do Supabase (auto-refresh de token JWT) e tem 8 telas principais:

1. **Dashboard** — métricas (artigos publicados, leads, etc)
2. **Artigos** — CRUD de blog posts com editor rich-text + SEO + CTA banner por artigo
3. **Iscas Digitais** (lead magnets) — PDFs/recursos baixáveis
4. **Histórias de Clientes** — case studies
5. **Comentários do Blog** — moderação
6. **Banners do Site** — popups e top bars com 5 posições
7. **Email Marketing** — lista de leads do form principal
8. **Usuários** (apenas admin) — gerencia quem acessa o CMS

## ✨ Diferenciais do CMS

- **Zero build step** — JS inline + Supabase REST direto
- **Auto-refresh JWT** — sessão nunca expira sem aviso
- **Image upload** — converte para base64 + data URL (sem storage extra)
- **Rich editor próprio** — sem TinyMCE/CKEditor, ~300 linhas
- **SEO completo por artigo** — title, canonical, keyword, og:image
- **CTA banner por artigo** — cada post pode ter sua call-to-action customizada
- **Banners site-wide** — 5 posições (above-header, below-header, floating, popup-center, popup-side)
- **Roles granulares** — admin/editor com permissões diferentes

## 🧱 Stack

- **Frontend:** HTML + JS vanilla, renderizado via `dangerouslySetInnerHTML` em rota Next.js
- **Backend:** Supabase (PostgREST + Auth)
- **Hospedagem:** Cloudflare Pages (static export do Next)
- **Sem dependências React no CMS** — tudo JS puro
- **Estilo:** CSS customizado (sem Tailwind) com variáveis CSS

## 🔗 Próximo passo

Lê [`06-recreation-prompt.md`](./06-recreation-prompt.md) — é um prompt pronto pra colar no Claude Code junto com os outros arquivos desta pasta. Ele vai recriar tudo no projeto do cliente.
