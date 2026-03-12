# Template: Blog + CMS Client-Side com Claude Code

> Use este documento como guia para criar um site com blog e painel CMS
> 100% client-side (sem backend) em qualquer projeto novo.

---

## PASSO 1 — Criar o CLAUDE.md do projeto

Crie um arquivo `CLAUDE.md` na raiz do projeto com o conteúdo abaixo.
Adapte os campos marcados com `[EDITAR]` para o seu projeto.

```markdown
# CLAUDE.md — [EDITAR: Nome do Projeto]

## Visão Geral
Site + Blog + CMS client-side para [EDITAR: descrição do projeto].
Stack: HTML/CSS/JS puro, sem frameworks, sem build step.

## Brand
- **Nome:** [EDITAR: Nome da marca]
- **Cor primária:** [EDITAR: #hex] (CTAs, destaques)
- **Cor secundária:** [EDITAR: #hex]
- **Background:** [EDITAR: #hex]
- **Fonte:** [EDITAR: nome da font do Google Fonts]
- **Icons:** Font Awesome 6 (cdnjs)

## Estrutura de Arquivos
\```
projeto/
├── CLAUDE.md                 # Contexto para o Claude Code
├── index.html                # Homepage
├── css/
│   └── styles.css            # Design system global
├── js/
│   └── main.js               # JS global (header, scroll, etc.)
├── acesso/
│   ├── index.html            # Tela de login
│   └── painel.html           # CMS admin (CRUD completo)
├── blog/
│   ├── index.html            # Listagem pública de artigos
│   └── leitor.html           # Leitor de artigo (resolve slug)
├── images/
│   └── logo.svg              # Logo
└── vercel.json               # Config de deploy
\```

## Data Model (localStorage)
Chave: `[EDITAR: nome]_cms`

\```js
{
  version: 1,
  users: [{
    id: "usr_" + timestamp,
    name: String,
    email: String,
    password: String,          // SHA-256 com salt
    role: "admin" | "editor",
    createdAt: ISO string
  }],
  articles: [{
    id: "art_" + timestamp,
    title: String,
    slug: String,              // auto-gerado do título
    content: String,           // HTML do editor rich text
    category: String,          // chave da categoria
    author: String,
    readTime: String,          // "5 min"
    metaDesc: String,
    imageUrl: String,          // URL externa (opcional)
    imageData: String,         // base64 data URL (upload)
    status: "published" | "draft",
    createdAt: ISO string,
    updatedAt: ISO string
  }]
}
\```

## Autenticação
- Hash: SHA-256 via Web Crypto API
- Salt: `_[EDITAR: nome]_salt_2024`
- Sessão: sessionStorage (chave `[EDITAR: nome]_session`)
- Admin padrão: [EDITAR: email] / [EDITAR: senha]

## Categorias do Blog
| Chave | Label |
|-------|-------|
| [EDITAR] | [EDITAR] |
| [EDITAR] | [EDITAR] |
| [EDITAR] | [EDITAR] |

## URLs
- Blog listing: `/blog`
- Artigo: `/blog/titulo-do-artigo` (clean URL via Vercel rewrite)
- Login: `/acesso`
- Painel: `/acesso/painel`

## Deploy
Vercel com cleanUrls. vercel.json:
\```json
{
  "cleanUrls": true,
  "rewrites": [
    { "source": "/blog/:slug", "destination": "/blog/leitor" }
  ]
}
\```

## Dev Local
\```bash
python3 -m http.server 8080
# Abrir http://localhost:8080
\```

## Regras para o Claude
- SEMPRE usar o CSS global (css/styles.css), NUNCA criar CSS duplicado
- Imagens via base64 FileReader (max 2MB)
- IDs gerados com: "prefix_" + Date.now() + Math.random()
- Slug: normalizar NFD, remover acentos, lowercase, espaços → hífens
- Cores e fontes HARDCODED nos inline styles (não depender de CSS vars em páginas isoladas)
- Mobile-first: breakpoints em 1024px, 768px, 480px
```

---

## PASSO 2 — Prompt de Kickoff (cole no Claude Code)

Cole este prompt no Claude Code para criar o projeto do zero:

```
Crie um site completo com blog e CMS client-side. Leia o CLAUDE.md
para contexto do projeto.

## FASE 1: Fundação (criar nesta ordem)

### 1.1 CSS Global (css/styles.css)
Design system completo com:
- Reset básico (box-sizing, margin 0)
- Variáveis CSS (:root) com as cores e fonts do CLAUDE.md
- Header fixo (72px) com logo + nav + hamburger mobile
- Dropdown menu (hover desktop, click mobile)
- Sistema de botões (.btn-primary, .btn-outline, .btn-dark)
- Grid container (max-width 1200px, padding 24px)
- Cards (border-radius 16px, shadow, hover translateY)
- Footer (4 colunas: brand, contato, links, links)
- Scroll reveal ([data-reveal] opacity 0→1 com IntersectionObserver)
- Mobile menu (overlay, slide-in)
- Back to top button
- Responsive breakpoints (1024, 768, 480)

### 1.2 Homepage (index.html)
- Header com nav
- Hero section (título + subtítulo + CTA)
- 3-4 seções de conteúdo alternando claro/escuro
- Footer completo
- Mobile menu
- JS: header scroll, dropdown, back-to-top, scroll reveal

### 1.3 vercel.json
{
  "cleanUrls": true,
  "rewrites": [
    { "source": "/blog/:slug", "destination": "/blog/leitor" }
  ]
}

## FASE 2: CMS

### 2.1 Login (acesso/index.html)
- Card centralizado com logo, email, senha, botão entrar
- Auth com SHA-256 + salt via Web Crypto API
- Criar DB inicial no localStorage se não existir (com user admin padrão)
- Redireciona para painel.html após login
- Sessão em sessionStorage

### 2.2 Painel CMS (acesso/painel.html)
Sidebar + área de conteúdo. Views:

**Dashboard:**
- Cards com contadores (total artigos, publicados, rascunhos, usuários)

**Lista de Artigos:**
- Tabela com: título, categoria, status (badge), data, ações
- Ações: editar, duplicar, excluir (com confirmação)
- Filtro por status (todos, publicados, rascunhos)
- Botão "Novo Artigo"

**Editor de Artigo:**
- Campo: título (gera slug automaticamente)
- Campo: categoria (dropdown)
- Upload de imagem cover (drag & drop zone + file input, max 2MB, base64)
- Editor rich text com toolbar:
  - Bold, Italic, Underline
  - H2, H3
  - Lista ordenada, Lista não-ordenada
  - Link (prompt URL)
  - Inserir imagem (upload base64)
  - Limpar formatação
- Campos SEO: meta description, tempo de leitura
- Toggle: publicar ou salvar como rascunho
- Preview do artigo
- Botões: Salvar, Publicar, Cancelar

**Gerenciar Usuários (só admin):**
- Lista de usuários
- Criar novo (nome, email, senha, role)
- Excluir (não pode excluir a si mesmo)

### Padrões do CMS:
- Navegação entre views via hash ou variável JS (sem reload)
- Validação de sessão no load (redireciona para login se não autenticado)
- Confirmação antes de excluir qualquer item
- Feedback visual: toast/snackbar para ações (salvo, excluído, erro)
- Todos os dados em localStorage sob a chave do CLAUDE.md

## FASE 3: Blog Público

### 3.1 Listagem (blog/index.html)
- Hero com título e subtítulo
- Filtros por categoria (pill buttons)
- Grid de cards (imagem, tag categoria, título, preview, data, "Ler mais")
- Lê artigos publicados do localStorage
- Empty state quando não há artigos
- Responsivo (3 cols → 2 → 1)

### 3.2 Leitor (blog/leitor.html)
- Resolve slug da URL: window.location.pathname.split('/blog/')[1]
- Busca artigo no localStorage pelo slug
- Layout: imagem cover full-width → conteúdo centralizado (max 720px)
- Header: categoria badge, título, autor, data, tempo de leitura
- Conteúdo HTML renderizado
- Barra de progresso de leitura (scroll-based)
- Artigos relacionados no final (mesma categoria)
- 404 state se artigo não encontrado
- Share buttons (copiar link, WhatsApp, LinkedIn)

## Regras gerais:
- Sem frameworks, sem npm, sem build
- Código limpo, bem indentado
- Nomes de classes BEM-like (bloco__elemento--modificador)
- JS vanilla, sem jQuery
- Todas as páginas linkam o CSS global
- Mesma estrutura de header/footer em todas as páginas
- Funciona offline após primeiro acesso (tudo no browser)
```

---

## PASSO 3 — Prompts de Iteração

Depois de criado, use estes prompts para refinar:

### Design
```
Olhe o screenshot [colar imagem]. Melhore o visual:
- As cores estão fracas, preciso de mais contraste
- Adicione efeitos de hover nos cards
- Os ícones precisam ser mais impactantes
```

### Novo conteúdo
```
Crie uma página de [nome] seguindo o mesmo design system
do site. Use o header/footer da homepage como referência.
Seções: [listar seções desejadas]
```

### CMS features
```
Adicione ao CMS a funcionalidade de [descrever].
Use o mesmo padrão de dados do localStorage.
A view deve seguir o estilo das views existentes no painel.
```

### Bug fix
```
Na página [nome], o [descrever problema].
Leia o arquivo e corrija.
```

---

## PASSO 4 — Quando escalar para backend

Quando o localStorage não for mais suficiente (muitos dados, multi-user, SEO):

### Migração para Supabase (mais simples)
```
Migre o CMS de localStorage para Supabase:
1. Crie as tabelas (users, articles) no Supabase
2. Substitua getDB()/saveDB() por chamadas fetch à API
3. Use Supabase Auth no lugar do SHA-256 manual
4. Migre imagens de base64 para Supabase Storage
5. Mantenha a mesma interface do painel
```

### Migração para Firebase
```
Migre o CMS de localStorage para Firebase:
1. Firestore para articles e users
2. Firebase Auth para login
3. Firebase Storage para imagens
4. Mantenha toda a UI existente
```

---

## Checklist de Qualidade

- [ ] Login funciona com user padrão
- [ ] Criar artigo com imagem funciona
- [ ] Artigo aparece na listagem pública após publicar
- [ ] URL /blog/slug-do-artigo abre o artigo correto
- [ ] Editor rich text: bold, italic, headings, listas, links
- [ ] Mobile: hamburger menu funciona
- [ ] Mobile: cards responsivos
- [ ] Scroll reveal anima ao aparecer
- [ ] Back to top funciona
- [ ] Excluir artigo pede confirmação
- [ ] Usuário editor não vê menu de usuários
- [ ] Limpar localStorage e recarregar cria DB padrão
