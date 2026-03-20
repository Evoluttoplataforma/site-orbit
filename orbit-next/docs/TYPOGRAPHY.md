# Tipografia — Orbit Site

## Fonte Padrão

**Plus Jakarta Sans** — única fonte do projeto em todas as páginas e painéis.

```css
font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Carregamento

- **Global**: importada via `globals.css` (Google Fonts)
- **Weights disponíveis**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- **Preload**: configurado em `layout.tsx`

### Fontes auxiliares (uso restrito)

| Fonte | Uso | Onde |
|---|---|---|
| `SF Mono`, `Fira Code` | Blocos de código/monospace | `orbit.css` (code blocks) |
| `Font Awesome 6 Free` | Ícones | CDN global |

---

## Regras

### 1. NUNCA use outra fonte

Não adicione Poppins, Inter, Roboto, Georgia ou qualquer outra fonte. Todo o site usa Plus Jakarta Sans.

### 2. NUNCA declare `font-family` inline

```html
<!-- ERRADO -->
<p style="font-family: Arial, sans-serif;">Texto</p>

<!-- CERTO — herda do body -->
<p>Texto</p>
```

### 3. Use os weights corretos

| Weight | Uso |
|---|---|
| 400 | Corpo de texto, parágrafos |
| 500 | Labels, captions, texto secundário com destaque |
| 600 | Subtítulos, botões, badges |
| 700 | Títulos h2-h3, destaques |
| 800 | Títulos h1, hero headings |

### 4. Tamanhos de referência (home page)

| Elemento | Tamanho | Weight |
|---|---|---|
| Hero h1 | `clamp(36px, 5vw, 64px)` | 800 |
| Section h2 | `clamp(28px, 4vw, 42px)` | 700-800 |
| Section h3 | `clamp(20px, 2.5vw, 24px)` | 600-700 |
| Body text | `16px` | 400 |
| Small/caption | `14px` | 400-500 |
| Badge | `0.85rem` | 600 |
| Button | `1rem` | 600 |

---

## Histórico

- **Mar 2026**: Padronização completa — removido Poppins (admin panel) e Georgia (outlier isolado), tudo unificado em Plus Jakarta Sans.
