# 🎯 Prompt pronto pra Claude Code recriar tudo

Cola este prompt inteiro no Claude Code (junto com os outros arquivos desta pasta) para que ele recrie o CMS completo no projeto novo do cliente.

---

## PROMPT PARA O CLAUDE CODE

```
Eu preciso que você crie um CMS de blog/conteúdo idêntico ao do projeto Orbit Gestão neste 
novo projeto do cliente.

Estou anexando 8 arquivos de documentação que descrevem TUDO sobre o CMS original:

- README.md — overview
- 01-architecture.md — stack, fluxo de dados, padrões de arquivos
- 02-database-schema.md — DDL completa de todas as tabelas + RLS policies
- 03-auth.md — sistema de login com auto-refresh JWT
- 04-cms-features.md — cada uma das 8 telas do painel detalhada
- 05-blog-frontend.md — como o blog público consome os dados
- 06-recreation-prompt.md — este arquivo
- 07-styles-and-ui.md — CSS classes e padrões visuais
- 08-rich-editor.md — editor de texto rico

LEIA TODOS antes de começar. São a referência completa.

## O que você precisa fazer

### 1. Setup do banco

Pegue o DDL inteiro do arquivo `02-database-schema.md` e rode no Supabase do cliente:
- Cria as 6 tabelas (cms_admins, blog_articles, lead_magnets, customer_stories, 
  blog_comments, site_banners)
- Habilita RLS em todas
- Cria as policies (anon read public, authenticated full access)
- Cria o trigger `set_updated_at()` e aplica em todas as tabelas
- Cria os índices

Use o Management API ou MCP se tiver acesso. Senão, gere o SQL pro user colar no SQL Editor.

### 2. Criar primeiro admin

Pergunte ao usuário:
- Email do primeiro admin
- Senha
- Nome

Crie via Supabase Auth API + INSERT em cms_admins.
**ATENÇÃO:** o id em cms_admins DEVE ser o mesmo UUID gerado pelo auth.users.

### 3. Criar as rotas Next.js

```
src/app/acesso/
  ├── content.tsx     ('use client')
  ├── html.ts         (HTML+JS da página de login - ~200 linhas)
  └── page.tsx
src/app/acesso/painel/
  ├── content.tsx     ('use client')
  ├── html.ts         (HTML+JS do painel CMS - ~3700 linhas)
  └── page.tsx
```

Padrão de cada rota:

```typescript
// page.tsx
import { PageContent } from './content';
export default function Page() { return <PageContent />; }

// content.tsx
'use client';
import { useEffect } from 'react';
import { html } from './html';

export function PageContent() {
  useEffect(() => {
    // Executa <script data-painel> inline
    const scripts = document.querySelectorAll('script[data-painel]');
    scripts.forEach(s => {
      try { new Function(s.textContent || '')(); } catch(e) { console.error(e); }
    });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

### 4. Implementar as 8 telas do painel

Veja `04-cms-features.md` pra detalhes de cada tela. Em ordem de prioridade:

1. **Dashboard** (mais simples — só queries de SELECT count)
2. **Artigos** (CRUD completo + rich editor + SEO + CTA banner)
3. **Iscas Digitais** (CRUD com upload de PDF como data URL)
4. **Histórias de Clientes** (CRUD com 3 áreas rich text)
5. **Comentários** (lista + moderação)
6. **Banners** (CRUD com 5 posições)
7. **Email Marketing** (read-only + export CSV)
8. **Usuários** (apenas role admin vê — CRUD de cms_admins via Auth API)

Pra cada tela:
- Cria a section HTML em `painel/html.ts`
- Adiciona os event listeners no `<script data-painel>`
- Usa `supaFetch()` (helper com auto-refresh) pra todas as chamadas
- Lista os dados em `<table class="data-table">`
- Form de criar/editar como modal ou inline
- Confirmação antes de delete

### 5. Implementar o sistema de auth

Veja `03-auth.md`. Componentes:

- Login form (`/acesso`) → `signInWithPassword` → valida em `cms_admins` → salva sessão
- `getSession()` / `saveSession()` em localStorage
- `refreshAccessToken()` automático
- `supaFetch(url, options)` wrapper que faz refresh transparente
- `logout()` que revoga token

### 6. Implementar o rich editor

Veja `08-rich-editor.md`. Toolbar com:
- Bold / Italic / Underline
- H2 / H3 / Quote
- Lista ordenada / Lista
- Link / Imagem inline
- Limpar formatação

Tudo via `document.execCommand()` (deprecated mas funciona em todos os browsers ainda).

### 7. Implementar o blog frontend

Veja `05-blog-frontend.md`. Cria:

- `/blog` (listagem de artigos publicados)
- `/blog/[slug]` (artigo individual com `generateStaticParams`)

Comentários, lead magnet CTA, banners site-wide.

### 8. Configurar Cloudflare Pages build hook

(Se o cliente usa Cloudflare Pages com static export)

Cria deploy hook + Supabase webhook que dispara rebuild quando `blog_articles` 
muda. Veja `05-blog-frontend.md` seção "Limitação".

## Cores e branding

Pergunte ao usuário antes de começar:

- Cor primária do cliente (vai substituir o `#ffba1a` gold do Orbit)
- Cor de fundo (substituir `#0D1117`)
- Logo (URL ou arquivo)
- Nome do cliente

Substitua em todas as classes CSS e templates. Veja `07-styles-and-ui.md` pra 
mapa completo das cores usadas.

## Critérios de qualidade

- ✅ Todo CRUD funcional (criar, editar, deletar, listar)
- ✅ Auto-refresh de token funciona (não precisa relogar a cada hora)
- ✅ Editor rico salva HTML válido
- ✅ Imagens upload funcionam (data URL ou Storage)
- ✅ Mobile responsivo (sidebar vira drawer no mobile)
- ✅ RLS policies impedem acesso não autorizado (testar com curl + token errado)
- ✅ Validação de admin no login (não-admin recebe erro)
- ✅ Build do Next passa (`npm run build`)
- ✅ Static export funciona (`output: 'export'`)

## Validação final

Depois de tudo pronto:

1. Roda `npm run build` — deve passar sem erro
2. Cria 1 artigo de teste no painel
3. Publica
4. Vai em `/blog` e confirma que aparece
5. Clica e abre `/blog/{slug}` — confirma que renderiza
6. Cria 1 banner — confirma que aparece no site
7. Cria 1 lead magnet — confirma que aparece como CTA num artigo

Se tudo isso funciona, o CMS tá completo.

## Como me pedir ajuda

Se você (Claude Code) tiver dúvida sobre alguma feature específica, **leia o arquivo 
correspondente desta pasta** antes de perguntar:

- Dúvida sobre tabela X? → `02-database-schema.md`
- Dúvida sobre login? → `03-auth.md`
- Dúvida sobre tela Y? → `04-cms-features.md`
- Dúvida sobre como o blog público consome? → `05-blog-frontend.md`
- Dúvida sobre cor/CSS? → `07-styles-and-ui.md`
- Dúvida sobre o editor de texto? → `08-rich-editor.md`

Só pergunte ao user se NADA dos arquivos cobrir o que você precisa.
```

---

## ⚙️ Como usar este prompt

1. Abre o Claude Code no projeto novo do cliente
2. Cria a pasta `docs/cms-blog/` no projeto
3. Copia TODOS os arquivos `01-` até `08-` desta pasta pra lá
4. Cola o prompt acima no chat do Claude Code
5. Anexa os 8 arquivos como contexto
6. Deixa o Claude Code rodar — ele vai fazer perguntas sobre branding/cores antes de começar

**Tempo estimado:** 1-3 horas pro Claude Code recriar tudo, dependendo da complexidade do branding e do quão familiar ele tá com Supabase.
