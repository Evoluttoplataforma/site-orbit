# Orbit Gestao — Site Institucional

## Projeto
Site institucional da Orbit Gestao (plataforma de gestao com IA).
Repositorio: `Evoluttoplataforma/site-orbit` no GitHub.
Deploy: Cloudflare Pages (static export).

## Stack
- **Next.js 16** + React 19 + TypeScript
- **Static export**: `output: 'export'` no next.config.ts
- **Tailwind CSS v4** + CSS customizado em `orbit.css` (~17k linhas)
- **Supabase** (projeto `yfpdrckyuxltvznqfqgh`) — blog, CMS, banners, leads
- **next-intl** — i18n (PT/EN), client-side via `LocaleProvider`
- **Framer Motion** — animacoes

## Estrutura
```
orbit-next/              <- Projeto Next.js (rodar comandos aqui)
  src/app/               <- Paginas (App Router)
  src/components/        <- Componentes React + HTML strings
  public/js/             <- JS vanilla (orbit-init.js, main-v2.js, banner.js)
  messages/              <- pt.json, en.json (traducoes)
```

## Arquitetura Hibrida
- **Paginas**: `page.tsx` -> `content.tsx` ('use client') -> `html.ts` (HTML string)
- **PageLayout.tsx**: injeta `shared-header.ts` + contentHTML via `dangerouslySetInnerHTML`
- **Blog/Historias**: montam header apos React mount (mounted state)
- **CMS** (`/acesso/painel`): html.ts monolitico com JS inline, executa via `new Function()`

## Regras Criticas

### Event Handlers
- **NUNCA** adicionar handlers diretos em elementos do HTML string
- Usar **event delegation** no `document` (padrao do main-v2.js)
- Handlers duplicados causam toggle duplo (abre+fecha = nada acontece)

### CMS (painel/html.ts)
- Todo o JS roda dentro de `new Function()()` — escopo local
- `window.xxx = xxx` no final exporta funcoes para onclick handlers
- Se QUALQUER erro ocorrer antes dos exports, TODO o painel quebra
- **NUNCA** colocar codigo que executa no load fora de funcoes
- Apenas `var` declarations e `function` definitions sao seguros no top-level

### Traducao EN
- Client-side via `applyEnglish()` em orbit-init.js
- Chaves <=30 chars = match exato; >30 chars = match substring
- **NUNCA** adicionar palavras soltas ao dicionario

### Banners
- Frontend: `banner.js` busca banners ativos do Supabase (anon key, RLS filtrado)
- CMS: CRUD em painel/html.ts (tab "Banners")
- Posicoes: above-header, below-header, floating-bottom, popup-center, popup-side
- Dismiss salvo em sessionStorage (volta ao reabrir browser)

## Comandos
```bash
cd orbit-next
npm run dev          # Dev server
npm run build        # Build static export
node -c public/js/orbit-init.js   # Verificar sintaxe JS
```

## Design System
- **Cores**: preto #0D1117 + dourado #ffba1a
- **Fonte**: Plus Jakarta Sans
- **Icones**: Font Awesome 6
- **Logo**: public/images/logo-orbit-white.png

## Supabase (MKT ORBIT)
- **Tables**: blog_articles, lead_magnets, customer_stories, cms_admins, site_banners, blog_comments, leads
- **Auth**: Supabase Auth (email/password) + cms_admins table
- **Anon key**: usado no frontend para leitura publica (RLS)

## Deploy
- Push para `main` -> Cloudflare Pages builda automaticamente
- Sempre fazer `npm run build` local antes de push para validar
