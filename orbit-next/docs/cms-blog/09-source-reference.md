# 📜 Source reference — código-fonte verbatim

Este arquivo contém **trechos exatos** do CMS Orbit original (`orbit-next/src/app/acesso/painel/html.ts`). Use como referência fiel quando precisar reproduzir comportamento idêntico.

> ⚠️ Todas as variáveis JS estão dentro de `<script data-painel>` e rodam em escopo isolado via `new Function()`. Não dependem de imports externos além do Font Awesome via CDN.

---

## 1. Constantes e config

```javascript
const STORAGE_KEY = 'orbit_cms';
const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1Ni...'; // anon key
const CATEGORIES = {
    estrategica: 'Gestao Estrategica',
    'planejamento-estrategico': 'Planejamento Estrategico',
    processos: 'Processos',
    indicadores: 'Indicadores',
    lideranca: 'Lideranca',
    ia: 'IA & Inovacao',
    marketing: 'Marketing',
    growth: 'Growth',
    outros: 'Outros'
};
```

**Substituir no projeto cliente:**
- `SUPABASE_URL` → URL do Supabase do cliente
- `SUPABASE_KEY` → anon key do cliente
- `CATEGORIES` → categorias relevantes do blog do cliente

---

## 2. Sessão e autenticação (verbatim)

```javascript
// -- Auth Check (Supabase) --
function getSession() {
    try { return JSON.parse(localStorage.getItem('orbit_supabase_session')) || null; }
    catch(e) { return null; }
}

function saveSession(s) {
    localStorage.setItem('orbit_supabase_session', JSON.stringify(s));
}

// Auto-refresh token if expired (Supabase JWT lasts 1h)
async function refreshToken() {
    if (!session || !session.refresh_token) return false;
    try {
        var res = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=refresh_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY },
            body: JSON.stringify({ refresh_token: session.refresh_token })
        });
        if (!res.ok) return false;
        var data = await res.json();
        if (data.access_token) {
            session.access_token = data.access_token;
            session.refresh_token = data.refresh_token || session.refresh_token;
            saveSession(session);
            return true;
        }
    } catch(e) { console.error('Token refresh failed:', e); }
    return false;
}

// Helper: make authenticated Supabase request with auto-refresh
async function supaFetch(url, options) {
    var opts = Object.assign({}, options);
    opts.headers = Object.assign({}, opts.headers, {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + session.access_token
    });
    var res = await fetch(url, opts);
    if (res.status === 401 && session.refresh_token) {
        var refreshed = await refreshToken();
        if (refreshed) {
            opts.headers['Authorization'] = 'Bearer ' + session.access_token;
            res = await fetch(url, opts);
        }
    }
    return res;
}

var session = getSession();
if (!session || !session.access_token) {
    window.location.href = '/acesso';
}

// Refresh token on load (proactive)
if (session && session.refresh_token) {
    refreshToken();
}

// -- Logout --
function logout() {
    localStorage.removeItem('orbit_supabase_session');
    window.location.href = '/acesso';
}
```

**Sessão salva com este shape:**

```javascript
{
    access_token: "eyJhbGc...",
    refresh_token: "v3KuY...",
    name: "Rodrigo Souza",         // nome do admin (pra exibir no header)
    role: "admin",                  // 'admin' | 'editor'
    user_id: "uuid-do-auth-user"
}
```

> Note: o token expira em 1h. O `supaFetch` refaz a chamada após refresh transparente quando recebe 401.

---

## 3. Navegação entre views (verbatim)

```javascript
function showView(viewName) {
    // Check permission
    if (viewName === 'users' && session.role !== 'admin') {
        toast('Acesso restrito a administradores.', 'error');
        return;
    }

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));

    const view = document.getElementById('view-' + viewName);
    if (view) view.classList.add('active');

    const navLink = document.querySelector('.sidebar-nav a[data-view="' + viewName + '"]');
    if (navLink) navLink.classList.add('active');

    // Refresh data
    if (viewName === 'dashboard') refreshDashboard();
    if (viewName === 'articles') refreshArticles();
    if (viewName === 'users') refreshUsers();
    if (viewName === 'leadmagnets') refreshLeadMagnets();
    if (viewName === 'stories') refreshStories();
    if (viewName === 'comments') refreshComments();
    if (viewName === 'banners') refreshBanners();
    if (viewName === 'emailmkt') refreshEmailMkt();
    if (viewName === 'storyeditor') {
        if (!document.getElementById('storyEditId').value) {
            clearStoryEditor();
        }
    }
    if (viewName === 'editor') {
        populateLeadMagnetDropdown();
        // Only clear if not editing
        if (!document.getElementById('articleId').value) {
            clearEditor();
        }
    }

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}
```

---

## 4. Toast (notificação) — verbatim

```javascript
function toast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const el = document.createElement('div');
    el.className = 'toast toast--' + type;
    const icon = type === 'success' ? 'fa-check-circle' 
               : type === 'error' ? 'fa-exclamation-circle' 
               : 'fa-info-circle';
    el.innerHTML = '<i class="fas ' + icon + '" style="color:var(--' + type + ')"></i> ' + message;
    container.appendChild(el);
    setTimeout(() => { el.remove(); }, 3500);
}
```

E no HTML:
```html
<div id="toastContainer" style="position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;"></div>
```

---

## 5. Sidebar HTML (verbatim, simplificado)

```html
<aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
        <img src="/images/logo-orbit-white.png" alt="Orbit">
    </div>

    <nav class="sidebar-nav">
        <a href="#" class="active" data-view="dashboard" onclick="showView('dashboard')">
            <i class="fas fa-chart-line"></i> Dashboard
        </a>
        <a href="#" data-view="articles" onclick="showView('articles')">
            <i class="fas fa-newspaper"></i> Artigos
        </a>
        <a href="#" data-view="leadmagnets" onclick="showView('leadmagnets')">
            <i class="fas fa-magnet"></i> Iscas Digitais
        </a>
        <a href="#" data-view="stories" onclick="showView('stories')">
            <i class="fas fa-trophy"></i> Histórias
        </a>
        <a href="#" data-view="comments" onclick="showView('comments')">
            <i class="fas fa-comments"></i> Comentários
        </a>
        <a href="#" data-view="banners" onclick="showView('banners')">
            <i class="fas fa-bullhorn"></i> Banners
        </a>
        <a href="#" data-view="emailmkt" onclick="showView('emailmkt')">
            <i class="fas fa-envelope"></i> Email Mkt
        </a>
        <div class="nav-divider"></div>
        <a href="#" data-view="users" onclick="showView('users')" id="navUsers" style="display:none;">
            <i class="fas fa-user-shield"></i> Usuários
        </a>
    </nav>

    <div class="sidebar-user">
        <div class="sidebar-user__avatar" id="userAvatar">--</div>
        <div class="sidebar-user__info">
            <div class="sidebar-user__name" id="userName">--</div>
            <div class="sidebar-user__role" id="userRole">--</div>
        </div>
        <button class="sidebar-user__logout" onclick="logout()" title="Sair">
            <i class="fas fa-sign-out-alt"></i>
        </button>
    </div>
</aside>

<button class="mobile-sidebar-toggle" onclick="toggleSidebar()">
    <i class="fas fa-bars"></i>
</button>
```

---

## 6. Inicialização da UI (verbatim)

```javascript
async function initUI() {
    if (!session) return;

    var initials = session.name.split(' ')
        .map(function(w) { return w[0]; })
        .join('').toUpperCase().slice(0, 2);
    document.getElementById('userAvatar').textContent = initials;
    document.getElementById('userName').textContent = session.name;
    document.getElementById('userRole').textContent = session.role === 'admin' ? 'Admin Full' : 'Editor';

    // Show users nav for admins only
    if (session.role === 'admin') {
        document.getElementById('navUsers').style.display = 'flex';
    }

    // Load data from Supabase
    await refreshArticles();
    await refreshUsers();
    await refreshLeadMagnets();
    refreshStories();
    refreshDashboard();

    // Populate category dropdown with categories from existing articles
    var existingCats = {};
    supabaseArticles.forEach(function(a) {
        if (a.category && !CATEGORIES[a.category]) existingCats[a.category] = a.category;
    });
    var catSelect = document.getElementById('articleCategory');
    var customOpt = catSelect ? catSelect.querySelector('option[value="__custom__"]') : null;
    Object.keys(existingCats).forEach(function(cat) {
        CATEGORIES[cat] = cat.charAt(0).toUpperCase() + cat.slice(1);
        var opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = CATEGORIES[cat];
        if (customOpt) catSelect.insertBefore(opt, customOpt);
    });
}
```

---

## 7. Listagem de artigos (verbatim)

```javascript
var supabaseArticles = [];

async function refreshArticles() {
    try {
        var res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles?order=updated_at.desc', {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + session.access_token }
        });
        if (res.ok) supabaseArticles = await res.json();
    } catch(e) { supabaseArticles = []; }

    var tbody = document.getElementById('articlesTableBody');
    var emptyEl = document.getElementById('articlesEmpty');

    if (supabaseArticles.length === 0) {
        tbody.innerHTML = '';
        emptyEl.style.display = 'block';
        return;
    }

    emptyEl.style.display = 'none';

    tbody.innerHTML = supabaseArticles.map(function(a) {
        var thumb = a.cover_url || 'https://placehold.co/48x36/0D1117/ffba1a?text=.';
        var statusLabel = a.published ? 'Publicado' : 'Rascunho';
        var statusClass = a.published ? 'published' : 'draft';
        return '<tr>' +
            '<td><div class="article-title-cell"><img class="article-thumb" src="' + escapeHtml(thumb) + '" alt=""><span>' + escapeHtml(a.title) + '</span></div></td>' +
            '<td>' + escapeHtml(a.author) + '</td>' +
            '<td>' + (CATEGORIES[a.category] || a.category) + '</td>' +
            '<td><span class="badge badge-' + statusClass + '">' + statusLabel + '</span></td>' +
            '<td>' + formatDate(a.updated_at) + '</td>' +
            '<td><div class="actions-cell">' +
                '<button class="btn btn-secondary btn-icon btn-sm" onclick="editArticle(' + a.id + ')" title="Editar"><i class="fas fa-edit"></i></button>' +
                '<button class="btn btn-danger btn-icon btn-sm" onclick="confirmDeleteArticle(' + a.id + ')" title="Excluir"><i class="fas fa-trash"></i></button>' +
            '</div></td>' +
        '</tr>';
    }).join('');
}
```

**Helpers necessários:**

```javascript
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatDate(iso) {
    if (!iso) return '-';
    var d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
```

---

## 8. Editar artigo: carregar dados no editor (verbatim)

```javascript
function editArticle(id) {
    var article = supabaseArticles.find(function(a) { return a.id === id || a.id === Number(id); });
    if (!article) return;

    document.getElementById('articleId').value = article.id;
    document.getElementById('articleTitleInput').value = article.title;
    document.getElementById('articleSlug').value = article.slug;
    document.getElementById('slugPreview').textContent = article.slug;
    document.getElementById('richEditor').innerHTML = article.content || '';
    document.getElementById('articleCategory').value = article.category;
    document.getElementById('articleAuthor').value = article.author || '';
    document.getElementById('authorAvatarData').value = article.author_avatar || '';
    if (article.author_avatar) {
        document.getElementById('authorAvatarPreview').innerHTML = '<img src="' + article.author_avatar + '" style="width:100%;height:100%;object-fit:cover;">';
    } else {
        document.getElementById('authorAvatarPreview').innerHTML = '<i class="fas fa-user" style="color:var(--gray-400);"></i>';
    }
    updateReadTime();
    document.getElementById('articleMetaDesc').value = article.excerpt || '';
    document.getElementById('metaCharCount').textContent = (article.excerpt || '').length;
    document.getElementById('articleImageUrl').value = article.cover_url || '';
    document.getElementById('articleImageData').value = '';
    document.getElementById('editorTitle').textContent = 'Editar Artigo';

    // SEO fields (snake_case from Supabase)
    document.getElementById('seoTitle').value = article.seo_title || '';
    document.getElementById('seoTitleCount').textContent = (article.seo_title || '').length;
    document.getElementById('seoCanonical').value = article.seo_canonical || '';
    document.getElementById('seoKeyword').value = article.seo_keyword || '';
    document.getElementById('seoOgImage').value = article.seo_og_image || '';

    // Lead magnet dropdown
    populateLeadMagnetDropdown();
    document.getElementById('leadMagnetSelect').value = article.lead_magnet_id || '';

    // CTA banner (snake_case from Supabase)
    document.getElementById('ctaBannerEnabled').value = article.cta_banner_enabled ? '1' : '0';
    document.getElementById('ctaBannerTitle').value = article.cta_banner_title || '';
    document.getElementById('ctaBannerDesc').value = article.cta_banner_desc || '';
    document.getElementById('ctaBannerCtaText').value = article.cta_banner_cta_text || 'Agendar demonstração';
    document.getElementById('ctaBannerCtaUrl').value = article.cta_banner_cta_url || '/chat';
    document.getElementById('ctaBannerImageData').value = article.cta_banner_image || '';
    if (article.cta_banner_image) {
        document.getElementById('ctaBannerImagePreview').innerHTML = '<img src="' + article.cta_banner_image + '" style="max-width:100%;border-radius:8px;">';
    } else {
        document.getElementById('ctaBannerImagePreview').innerHTML = '';
    }
    previewFeaturedImage();
    updateSeoScore();

    showView('editor');
}
```

---

## 9. Salvar artigo — função completa (verbatim)

```javascript
async function saveArticle(status) {
    var title = document.getElementById('articleTitleInput').value.trim();
    var slug = document.getElementById('articleSlug').value.trim();
    var content = document.getElementById('richEditor').innerHTML;
    var category = document.getElementById('articleCategory').value;
    if (category === '__custom__') {
        category = document.getElementById('customCategoryInput').value.trim().toLowerCase()
            .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        if (!category) { toast('Informe o nome da categoria.', 'error'); return; }
        var label = document.getElementById('customCategoryInput').value.trim();
        CATEGORIES[category] = label;
        var opt = document.createElement('option');
        opt.value = category;
        opt.textContent = label;
        document.getElementById('articleCategory').insertBefore(opt, document.querySelector('#articleCategory option[value="__custom__"]'));
        document.getElementById('articleCategory').value = category;
        document.getElementById('customCategoryWrapper').style.display = 'none';
    }
    var author = document.getElementById('articleAuthor').value.trim() || session.name;
    var metaDesc = document.getElementById('articleMetaDesc').value.trim();
    var imageUrl = document.getElementById('articleImageUrl').value.trim();
    var imageData = document.getElementById('articleImageData').value;
    var articleId = document.getElementById('articleId').value;

    if (!title) { toast('Informe o titulo do artigo.', 'error'); return; }
    if (!category) { toast('Selecione uma categoria.', 'error'); return; }
    if (!content || content === '<p>Comece a escrever seu artigo aqui...</p>') {
        toast('Escreva o conteudo do artigo.', 'error'); return;
    }

    var now = new Date().toISOString();
    var finalSlug = slug || generateSlugFromTitle(title);
    var coverUrl = imageData || imageUrl || '';
    var isPublished = status === 'published';

    var leadMagnetId = document.getElementById('leadMagnetSelect').value || null;
    var ctaBannerEnabled = document.getElementById('ctaBannerEnabled').value === '1';
    var ctaBannerTitle = document.getElementById('ctaBannerTitle').value.trim();
    var ctaBannerDesc = document.getElementById('ctaBannerDesc').value.trim();
    var ctaBannerCtaText = document.getElementById('ctaBannerCtaText').value.trim();
    var ctaBannerCtaUrl = document.getElementById('ctaBannerCtaUrl').value.trim();
    var ctaBannerImage = document.getElementById('ctaBannerImageData').value;
    var seoTitleVal = document.getElementById('seoTitle').value.trim();
    var seoCanonical = document.getElementById('seoCanonical').value.trim();
    var seoKeyword = document.getElementById('seoKeyword').value.trim();
    var seoOgImage = document.getElementById('seoOgImage').value.trim();

    var articleData = {
        title: title,
        slug: finalSlug,
        content: content,
        excerpt: metaDesc || null,
        cover_url: coverUrl || null,
        category: category,
        author: author,
        published: isPublished,
        published_at: isPublished ? now : null,
        updated_at: now,
        author_avatar: document.getElementById('authorAvatarData').value || null,
        lead_magnet_id: leadMagnetId ? Number(leadMagnetId) : null,
        cta_banner_enabled: ctaBannerEnabled,
        cta_banner_title: ctaBannerTitle || null,
        cta_banner_desc: ctaBannerDesc || null,
        cta_banner_cta_text: ctaBannerCtaText || 'Agendar demonstração',
        cta_banner_cta_url: ctaBannerCtaUrl || '/chat',
        cta_banner_image: ctaBannerImage || null,
        seo_title: seoTitleVal || null,
        seo_canonical: seoCanonical || null,
        seo_keyword: seoKeyword || null,
        seo_og_image: seoOgImage || null
    };

    try {
        var res;
        if (articleId) {
            // Update existing
            res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles?id=eq.' + articleId, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
                body: JSON.stringify(articleData)
            });
        } else {
            // Create new
            res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
                body: JSON.stringify(articleData)
            });
        }

        if (!res.ok) {
            var err = await res.text();
            console.error('Supabase error:', res.status, err);
            if (res.status === 401 || res.status === 403) {
                toast('Sessao expirada. Faca login novamente.', 'error');
                setTimeout(function() { window.location.href = '/acesso'; }, 2000);
            } else {
                toast('Erro ao salvar: ' + (err || res.status), 'error');
            }
            return;
        }

        toast(isPublished ? 'Artigo publicado!' : 'Rascunho salvo!');
        clearEditor();
        showView('articles');
    } catch(e) {
        console.error(e);
        toast('Erro ao salvar artigo.', 'error');
    }
}
```

---

## 10. Slug generator (verbatim)

```javascript
function generateSlugFromTitle(title) {
    return title
        .toLowerCase()
        .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
        .replace(/[^a-z0-9\\s-]/g, '')
        .replace(/\\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 200);
}

// Slug ao vivo enquanto digita o título
function generateSlug() {
    const title = document.getElementById('articleTitleInput').value;
    const slug = generateSlugFromTitle(title);
    document.getElementById('articleSlug').value = slug;
    document.getElementById('slugPreview').textContent = slug || 'titulo-do-artigo';
}
```

Wire-up no input do título:
```html
<input type="text" id="articleTitleInput" oninput="generateSlug();updateReadTime();updateSeoScore();" />
```

---

## 11. Toolbar do rich editor (verbatim do HTML)

```html
<div class="rich-editor-wrapper">
    <div class="rich-editor-toolbar">
        <button onclick="execCmd('bold')" title="Negrito"><i class="fas fa-bold"></i></button>
        <button onclick="execCmd('italic')" title="Italico"><i class="fas fa-italic"></i></button>
        <button onclick="execCmd('underline')" title="Sublinhado"><i class="fas fa-underline"></i></button>
        <div class="toolbar-divider"></div>
        <button onclick="execCmd('formatBlock','h2')" title="Titulo H2">H2</button>
        <button onclick="execCmd('formatBlock','h3')" title="Titulo H3">H3</button>
        <button onclick="execCmd('formatBlock','p')" title="Paragrafo">P</button>
        <div class="toolbar-divider"></div>
        <button onclick="execCmd('insertUnorderedList')" title="Lista"><i class="fas fa-list-ul"></i></button>
        <button onclick="execCmd('insertOrderedList')" title="Lista numerada"><i class="fas fa-list-ol"></i></button>
        <button onclick="insertBlockquote()" title="Citacao"><i class="fas fa-quote-left"></i></button>
        <div class="toolbar-divider"></div>
        <button onclick="insertLink()" title="Link"><i class="fas fa-link"></i></button>
        <button onclick="insertImageFromFile()" title="Upload imagem"><i class="fas fa-image"></i></button>
        <button onclick="insertImage()" title="Imagem por URL"><i class="fas fa-globe"></i></button>
        <div class="toolbar-divider"></div>
        <button onclick="execCmd('removeFormat')" title="Limpar formatacao"><i class="fas fa-eraser"></i></button>
    </div>
    <div class="rich-editor" id="richEditor" contenteditable="true"></div>
</div>
```

```javascript
function execCmd(cmd, value) {
    document.getElementById('richEditor').focus();
    document.execCommand(cmd, false, value || null);
}

function insertBlockquote() {
    execCmd('formatBlock', 'blockquote');
}

function insertLink() {
    var url = prompt('URL do link:');
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    execCmd('createLink', url);
}

function insertImage() {
    var url = prompt('URL da imagem:');
    if (!url) return;
    execCmd('insertImage', url);
}

function insertImageFromFile() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function() {
        var file = input.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            toast('Imagem maior que 2MB.', 'error');
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            execCmd('insertImage', e.target.result);
        };
        reader.readAsDataURL(file);
    };
    input.click();
}
```

---

## 12. Image upload (avatar do autor) — padrão reusável

```javascript
function handleAuthorAvatarUpload(event) {
    var file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
        toast('Imagem maior que 2MB.', 'error');
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var dataUrl = e.target.result;
        document.getElementById('authorAvatarData').value = dataUrl;
        document.getElementById('authorAvatarPreview').innerHTML = 
            '<img src="' + dataUrl + '" style="width:100%;height:100%;object-fit:cover;">';
    };
    reader.readAsDataURL(file);
}

function removeAuthorAvatar() {
    document.getElementById('authorAvatarData').value = '';
    document.getElementById('authorAvatarPreview').innerHTML = 
        '<i class="fas fa-user" style="color:var(--gray-400);"></i>';
}
```

HTML:
```html
<div id="authorAvatarPreview" style="width:48px;height:48px;border-radius:50%;background:var(--gray-100);overflow:hidden;">
    <i class="fas fa-user"></i>
</div>
<input type="file" id="authorAvatarInput" accept="image/*" onchange="handleAuthorAvatarUpload(event)" hidden>
<input type="hidden" id="authorAvatarData">
<button onclick="document.getElementById('authorAvatarInput').click()">Upload</button>
<button onclick="removeAuthorAvatar()">Remover</button>
```

---

## 13. Tempo de leitura ao vivo (verbatim)

```javascript
function updateReadTime() {
    var content = document.getElementById('richEditor').innerText || '';
    var words = content.trim().split(/\\s+/).filter(Boolean);
    var wordCount = words.length;
    var readTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 wpm
    document.getElementById('articleWordCount').textContent = wordCount;
    document.getElementById('articleReadTimeValue').textContent = readTime + ' min';
}
```

Wire-up:
```html
<div class="rich-editor" id="richEditor" contenteditable="true" oninput="updateReadTime();updateSeoScore();"></div>
```

---

## 14. Duplicar artigo (verbatim)

```javascript
async function duplicateArticle(id) {
    var article = supabaseArticles.find(function(a) { return a.id === id || a.id === Number(id); });
    if (!article) return;

    try {
        var res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + session.access_token,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                title: article.title + ' (copia)',
                slug: article.slug + '-copia-' + Date.now(),
                content: article.content,
                excerpt: article.excerpt,
                cover_url: article.cover_url,
                category: article.category,
                author: article.author,
                published: false,
                published_at: null
            })
        });
        if (res.ok) {
            await refreshArticles();
            refreshDashboard();
            toast('Artigo duplicado como rascunho.');
        } else { toast('Erro ao duplicar.', 'error'); }
    } catch(e) { toast('Erro ao duplicar.', 'error'); }
}
```

---

## 15. Confirmação antes de deletar (padrão reusável)

```javascript
function confirmDeleteArticle(id) {
    var article = supabaseArticles.find(function(a) { return a.id === id; });
    if (!article) return;
    if (!confirm('Tem certeza que deseja excluir "' + article.title + '"?')) return;
    deleteArticle(id);
}

async function deleteArticle(id) {
    try {
        var res = await supaFetch(SUPABASE_URL + '/rest/v1/blog_articles?id=eq.' + id, {
            method: 'DELETE'
        });
        if (res.ok) {
            await refreshArticles();
            refreshDashboard();
            toast('Artigo excluído.');
        } else {
            toast('Erro ao excluir.', 'error');
        }
    } catch(e) {
        toast('Erro ao excluir.', 'error');
    }
}
```

---

## 16. Onload — startup do painel

```javascript
// Final do <script data-painel>:
initUI();
showView('dashboard');
```

---

## ⚠️ Notas pro Claude Code que vai recriar

1. **`new Function()` scope** — TODO o JS roda dentro de `new Function()` quando o script é executado. Variáveis declaradas como `var` ficam locais (não escapam). Pra que `onclick="showView('articles')"` funcione, **você precisa exportar** as funções pro `window`:

   ```javascript
   // Final do script:
   window.showView = showView;
   window.editArticle = editArticle;
   window.saveArticle = saveArticle;
   window.duplicateArticle = duplicateArticle;
   window.confirmDeleteArticle = confirmDeleteArticle;
   window.deleteArticle = deleteArticle;
   window.execCmd = execCmd;
   window.insertLink = insertLink;
   window.insertImage = insertImage;
   window.insertImageFromFile = insertImageFromFile;
   window.insertBlockquote = insertBlockquote;
   window.handleAuthorAvatarUpload = handleAuthorAvatarUpload;
   window.removeAuthorAvatar = removeAuthorAvatar;
   window.logout = logout;
   window.toggleSidebar = toggleSidebar;
   window.generateSlug = generateSlug;
   window.updateReadTime = updateReadTime;
   window.toast = toast;
   // ... TODAS as funções referenciadas em onclick=
   ```

   **Se esquecer alguma**, o botão correspondente vai dar `Uncaught ReferenceError` no console.

2. **Erro de sintaxe quebra TUDO** — uma vírgula errada no top do script aborta o `new Function()` antes de chegar nos `window.x = x` finais. Resultado: painel inteiro não funciona. **Sempre roda `node -c arquivo.js` (extraindo o script) antes de fazer commit**, ou cria um smoke test.

3. **`escapeHtml` é obrigatório** em qualquer coisa que vem do banco e vai pro DOM via `innerHTML`. Senão tem XSS.

4. **`supaFetch` usa o `session` global** declarado no top do script. Não passa session como argumento. Mantém esse padrão pra simplicidade.

5. **Snake_case nos campos do banco** — Supabase/Postgres usa snake_case (`cover_url`, `published_at`). O JS no painel usa o mesmo. NÃO converta pra camelCase no client (ia complicar sem benefício).

6. **Datas:** sempre salva `updated_at: new Date().toISOString()` manualmente no payload, mesmo tendo trigger no banco. Isso porque o trigger só funciona em UPDATE com PATCH+ — se você usar `Prefer: return=minimal`, o trigger continua funcionando, mas é mais explícito mandar do client.

7. **`Prefer: return=minimal`** em todos os POST/PATCH/DELETE — economiza banda e o painel só refaz o `refreshArticles()` depois.
