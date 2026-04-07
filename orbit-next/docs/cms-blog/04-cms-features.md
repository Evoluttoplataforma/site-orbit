# 🎛️ Features do CMS — tela por tela

Cada item da sidebar = uma `view` no JS. `showView('articles')` esconde todas as views e mostra a `view#view-articles`.

## 1. Dashboard

**O que mostra:** cards com métricas + tabela de últimos artigos.

```
┌─────────────────────────────────────────┐
│  📊 Dashboard                            │
├─────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │  12  │ │  45  │ │  3   │ │ 128  │  │
│  │Posts │ │Leads │ │Comm. │ │Stori-│  │
│  │publ. │ │ mês  │ │pend. │ │ es   │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                          │
│  Últimos artigos publicados              │
│  ┌──────────────────────────────────┐  │
│  │ Título    | Autor   | Data       │  │
│  │ ───────────────────────────────  │  │
│  │ Como ...  | Rodrigo | 07/04/2026 │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Queries usadas:**

```javascript
// Contadores
const articlesRes = await supaFetch(URL + '/rest/v1/blog_articles?published=eq.true&select=count', {
  headers: { 'Prefer': 'count=exact' }
});
const total = articlesRes.headers.get('Content-Range').split('/')[1];

// Últimos artigos
const recent = await supaFetch(URL + '/rest/v1/blog_articles?order=updated_at.desc&limit=5');
```

## 2. Artigos (CRUD completo)

**A tela mais complexa do CMS.** Tem 2 modos: lista e editor.

### Modo lista

Tabela com colunas: Status (rascunho/publicado) | Título | Autor | Categoria | Data | Ações (editar/duplicar/excluir).

Botão "Novo artigo" → entra no editor.

### Modo editor

Form com seções:

#### Conteúdo principal
- **Título** (text, gera slug automático)
- **Slug** (auto-gerado, editável)
- **Resumo** (textarea, max 300 chars)
- **Categoria** (select com opções pré-definidas — pode ser ENUM ou texto livre)
- **Capa** (upload imagem ou URL)
- **Conteúdo** (rich text editor — ver `08-rich-editor.md`)

#### Autoria
- **Nome do autor** (default = nome do user logado)
- **Avatar do autor** (upload imagem)

#### CTA Banner por artigo (opcional)
- Toggle "Mostrar banner CTA neste artigo"
- **Título do banner**
- **Descrição**
- **Texto do botão** (default: "Agendar demonstração")
- **URL do botão** (default: `/chat`)
- **Imagem** (opcional)

#### SEO
- **Title SEO** (override do title meta)
- **URL canônica**
- **Keyword principal**
- **OG Image** (override da capa pra redes sociais)

#### Ações
- **Salvar como rascunho** (`published = false`)
- **Publicar** (`published = true`, seta `published_at = now()`)
- **Cancelar** (volta pra lista)

### JS principal

```javascript
async function loadArticles() {
  const res = await supaFetch(URL + '/rest/v1/blog_articles?order=updated_at.desc');
  const articles = await res.json();
  renderArticlesTable(articles);
}

function generateSlug(title) {
  return title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function saveArticle(status) {
  const article = {
    title: document.getElementById('articleTitle').value,
    slug: document.getElementById('articleSlug').value,
    excerpt: document.getElementById('articleExcerpt').value,
    content: document.getElementById('richEditor').innerHTML,
    cover_url: document.getElementById('coverImageData').value,
    category: document.getElementById('articleCategory').value,
    author: document.getElementById('articleAuthor').value,
    author_avatar: document.getElementById('authorAvatarData').value,
    cta_banner_enabled: document.getElementById('ctaBannerEnabled').checked,
    cta_banner_title: document.getElementById('ctaBannerTitle').value,
    // ... etc
    seo_title: document.getElementById('seoTitle').value,
    seo_canonical: document.getElementById('seoCanonical').value,
    seo_keyword: document.getElementById('seoKeyword').value,
    seo_og_image: document.getElementById('seoOgImage').value,
    published: status === 'published',
    published_at: status === 'published' ? new Date().toISOString() : null
  };
  
  const articleId = document.getElementById('articleId').value;
  if (articleId) {
    // UPDATE
    await supaFetch(URL + '/rest/v1/blog_articles?id=eq.' + articleId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    });
  } else {
    // CREATE
    await supaFetch(URL + '/rest/v1/blog_articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: JSON.stringify(article)
    });
  }
  
  showView('articles');
  loadArticles();
}
```

## 3. Iscas Digitais (lead magnets)

**O que faz:** cadastrar PDFs/recursos pra usar como CTA nos artigos.

Form simples:
- **Tipo** (`pdf`, `ebook`, `webinar`, `template`, `checklist`)
- **Título**
- **Descrição**
- **Texto do CTA** ("Baixar grátis")
- **URL do CTA** (link pro form de captura ou direto pro arquivo)
- **Arquivo** (upload PDF — vira data URL)
- **Capa** (imagem)
- **Ativo** (toggle)

Tabela: lista todos com ações editar/excluir.

**Como é usado:** ao criar/editar um artigo, o user pode vincular uma isca digital (`lead_magnet_id`). O frontend do blog mostra a CTA da isca no rodapé do artigo.

## 4. Histórias de Clientes

CRUD de case studies. Form:
- **Nome da empresa**
- **Slug** (auto)
- **Segmento**
- **Nome do contato + cargo**
- **Logo** (upload)
- **Capa** (upload)
- **Desafio** (rich text)
- **Solução** (rich text)
- **Resultados** (rich text — KPIs em destaque)
- **Depoimento** (textarea — citação curta)
- **Status** (`draft` | `published`)

Lista com filtro por status. Botão "Publicar" rápido.

## 5. Comentários do Blog

**Tela de moderação.** Lista todos os comentários com filtro por status:
- 🟡 Pendentes (default)
- 🟢 Aprovados
- 🔴 Rejeitados

Cada linha mostra: nome, email, comentário (truncado), artigo, data. Ações: ✅ Aprovar / ❌ Rejeitar / 🗑️ Excluir.

```javascript
async function moderateComment(id, newStatus) {
  await supaFetch(URL + '/rest/v1/blog_comments?id=eq.' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  });
  loadComments();
}
```

## 6. Banners do Site

**A tela mais visual.** Permite criar banners que aparecem em qualquer página do site.

### Form

- **Título** (texto principal)
- **Descrição**
- **Texto do CTA** + **URL do CTA**
- **Imagem** (opcional)
- **Modo de exibição:** `banner` (barra) ou `popup`
- **Posição:**
  - `above-header` — barra acima do menu
  - `below-header` — barra abaixo do menu
  - `floating-bottom` — barra fixa no bottom
  - `popup-center` — popup central com overlay
  - `popup-side` — popup lateral discreto
- **Cores** (bg color + text color via color picker)
- **Dispensável** (toggle — se true, mostra X pra fechar)
- **Agendamento** (start_date + end_date opcionais)
- **Prioridade** (number — quando múltiplos ativos na mesma posição)
- **Ativo** (toggle)

### Como é consumido pelo site

O frontend tem um JS (`public/js/banner.js`) que roda em todas as páginas:

```javascript
// Pseudo-código
async function loadActiveBanners() {
  const res = await fetch(SUPABASE_URL + '/rest/v1/site_banners?active=eq.true&order=priority.desc', {
    headers: { 'apikey': SUPABASE_ANON_KEY }
  });
  const banners = await res.json();
  banners.forEach(renderBanner);
}

function renderBanner(b) {
  // Cria div com posição absoluta/fixed conforme b.position
  // Aplica cores, conteúdo, listener de dismiss
  // Salva dismissed em sessionStorage pra não reaparecer na sessão
}
```

## 7. Email Marketing

**Tela read-only.** Lista de leads do form principal do site (tabela `leads` ou similar do projeto). Filtros por:
- Período (date range)
- Status do lead
- UTM source

Ações:
- **Exportar CSV** (gera no client com `URL.createObjectURL(blob)`)
- **Buscar por email/nome**

Não tem CRUD aqui — é só pra visualização e export.

## 8. Usuários (apenas admin)

**Tela escondida pra editores.** Lista de admins do CMS.

Tabela:
- Nome | Email | Role | Criado em | Ações

Form de criar:
- Nome
- Email
- Senha (não armazenada, vira o auth.users)
- Role (admin/editor)

Form de editar:
- Nome (editável)
- Role (editável)
- Resetar senha (envia email via Supabase Auth)
- Excluir admin

```javascript
async function deleteAdmin(id) {
  if (!confirm('Tem certeza?')) return;
  // 1. Remove de cms_admins
  await supaFetch(URL + '/rest/v1/cms_admins?id=eq.' + id, { method: 'DELETE' });
  // 2. Remove do auth.users (precisa service role — não dá pelo client)
  //    Alternativa: deixar no auth.users mas sem entrada em cms_admins
  //    → user existe mas não consegue logar no painel (validação no login)
  loadUsers();
}
```

## Image upload (usado em vários lugares)

```javascript
function handleImageUpload(input, previewElId, dataElId) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert('Imagem maior que 5MB');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    document.getElementById(previewElId).innerHTML = `<img src="${dataUrl}" style="max-width:100%;">`;
    document.getElementById(dataElId).value = dataUrl;
  };
  reader.readAsDataURL(file);
}
```

**Limitação:** data URL fica armazenado no banco como TEXT. Imagens grandes deixam a tabela pesada. Pra produção real, vale migrar pra Storage do Supabase com bucket público.
