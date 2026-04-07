# 🎨 Estilos e UI patterns

CSS sem framework — só variáveis CSS + classes utilitárias. Pra adaptar pra outro cliente, basta trocar as cores das variáveis.

## Variáveis CSS (raiz)

```css
:root {
  /* Cores principais (TROCAR PARA O CLIENTE) */
  --primary: #ffba1a;          /* Cor de destaque (botões, links, badges) */
  --primary-dark: #e6a200;
  --primary-light: rgba(255, 186, 26, 0.1);
  
  --bg: #0D1117;               /* Background principal (escuro) */
  --bg-elevated: #161B22;      /* Cards, modals */
  --bg-hover: #21262D;         /* Hover states */
  
  --text: #C9D1D9;             /* Texto principal */
  --text-bright: #ffffff;      /* Títulos */
  --text-muted: #8B949E;       /* Texto secundário */
  --text-dim: #6e7681;         /* Texto desabilitado */
  
  --border: #30363D;           /* Bordas */
  --border-light: rgba(255, 255, 255, 0.08);
  
  --success: #56D364;
  --warning: #fb923c;
  --error: #F85149;
  --info: #58A6FF;
  
  /* Outras */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-400: #9ca3af;
  
  /* Spacing & sizing */
  --sidebar-width: 240px;
  --header-height: 64px;
  --radius: 8px;
  --radius-lg: 12px;
  --shadow: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.3);
}
```

## Layout principal

```css
body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  margin: 0;
}

.sidebar {
  position: fixed;
  left: 0; top: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--bg-elevated);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.main {
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  padding: 32px;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
  }
  .sidebar.open { transform: translateX(0); }
  .main { margin-left: 0; padding: 16px; }
  .mobile-sidebar-toggle { display: block; position: fixed; top: 16px; right: 16px; z-index: 200; }
}
```

## Sidebar

```css
.sidebar-logo {
  padding: 24px 20px;
  border-bottom: 1px solid var(--border);
}
.sidebar-logo img { width: 100%; max-width: 140px; }

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}

.sidebar-nav a:hover {
  background: var(--bg-hover);
  color: var(--text-bright);
}

.sidebar-nav a.active {
  background: var(--primary-light);
  color: var(--primary);
  border-left: 3px solid var(--primary);
}

.sidebar-nav a i {
  width: 20px;
  text-align: center;
}

.nav-divider {
  height: 1px;
  background: var(--border);
  margin: 12px 20px;
}

.sidebar-user {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-user__avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.sidebar-user__info { flex: 1; min-width: 0; }
.sidebar-user__name { font-size: 14px; font-weight: 600; color: var(--text-bright); }
.sidebar-user__role { font-size: 11px; color: var(--text-muted); text-transform: uppercase; }

.sidebar-user__logout {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
}
.sidebar-user__logout:hover { background: var(--bg-hover); color: var(--error); }
```

## Cards / panels

```css
.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card-header h2 {
  margin: 0;
  font-size: 18px;
  color: var(--text-bright);
}

.metric-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-card__value {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-bright);
  font-variant-numeric: tabular-nums;
}

.metric-card__label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}
```

## Tabelas

```css
.table-wrapper {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-responsive { overflow-x: auto; }

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 14px 16px;
  background: var(--bg-hover);
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border);
}

td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  font-size: 14px;
}

tr:hover td { background: var(--bg-hover); }
tr:last-child td { border-bottom: none; }
```

## Forms

```css
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-bright);
  margin-bottom: 6px;
}

.form-group .hint {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 6px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="url"],
input[type="number"],
input[type="date"],
input[type="datetime-local"],
textarea,
select {
  width: 100%;
  padding: 12px 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-bright);
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.15s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--primary);
}

textarea { min-height: 100px; resize: vertical; }
```

## Botões

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.btn-primary {
  background: var(--primary);
  color: var(--bg);
}
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-1px); }

.btn-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}
.btn-outline:hover { background: var(--bg-hover); border-color: var(--text-muted); }

.btn-danger {
  background: var(--error);
  color: white;
}

.btn-sm { padding: 6px 12px; font-size: 12px; }
```

## Image upload area

```css
.image-upload-area {
  border: 2px dashed var(--border);
  border-radius: var(--radius-lg);
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.image-upload-area:hover {
  border-color: var(--primary);
  background: var(--primary-light);
}

.image-upload-area input[type="file"] {
  display: none;
}

.image-upload-area i {
  font-size: 32px;
  color: var(--text-muted);
}

.image-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.image-tab {
  background: none;
  border: none;
  padding: 10px 16px;
  color: var(--text-muted);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-weight: 600;
}

.image-tab.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}
```

## Status badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-success { background: rgba(86,211,100,0.15); color: var(--success); }
.badge-warning { background: rgba(251,146,60,0.15); color: var(--warning); }
.badge-error { background: rgba(248,81,73,0.15); color: var(--error); }
.badge-muted { background: var(--bg-hover); color: var(--text-muted); }
```

## Cores que precisam mudar pra outro cliente

Map de search-and-replace:

| Cor Orbit | O que é | Substitui por... |
|---|---|---|
| `#ffba1a` | Primary (gold) | Cor do cliente |
| `#0D1117` | BG dark | Cor de fundo do cliente |
| `#161B22` | BG elevated | Cor de card |
| `#C9D1D9` | Texto principal | Cor de texto |
| `#ffffff` | Texto bright | Mantém ou ajusta contraste |

**Dica:** rodar uma busca global pelo hex `#ffba1a` no painel/html.ts e trocar tudo de uma vez.

## Font Awesome

O CMS usa Font Awesome 6 (CDN). Inclui no HTML:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

Ícones usados (lista parcial):
- `fa-newspaper` (artigos)
- `fa-magnet` (lead magnets)
- `fa-users` (usuários, histórias)
- `fa-comments` (comentários)
- `fa-bullhorn` (banners)
- `fa-envelope` (email mkt)
- `fa-cog` (configurações)
- `fa-sign-out-alt` (logout)
- `fa-edit`, `fa-trash`, `fa-eye`, `fa-eye-slash` (CRUD actions)
