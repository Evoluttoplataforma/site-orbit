@AGENTS.md

# Orbit Site — Guia de Desenvolvimento

## Stack
- Next.js (ver AGENTS.md para notas sobre a versão)
- HTML/CSS/JS puro para as páginas (server-rendered como strings)
- Sem frameworks CSS — CSS customizado em `orbit.css`

## Arquivos Principais

| Arquivo | Descrição |
|---|---|
| `src/app/orbit.css` | CSS global — NUNCA duplicar estilos inline |
| `public/js/orbit-init.js` | JS global — interações, tradução EN, animações |
| `public/js/main-v2.js` | JS auxiliar |
| `src/app/home-html.ts` | HTML da home page |
| `src/app/empresarios/html.ts` | Página empresários |
| `src/app/consultores/html.ts` | Página consultores |
| `src/app/sobre/html.ts` | Página sobre |
| `src/app/preco/html.ts` | Página preços |
| `src/components/shared-header.ts` | Header/nav compartilhado |

## Design System

- **Fonte única**: Plus Jakarta Sans (ver `docs/TYPOGRAPHY.md`)
- **Cores**: preto `#000` + dourado `#ffba1a`
- **Ícones**: Font Awesome 6 Solid
- **Logo**: `images/logo-orbit-white.png`

## Tradução EN

O site é bilíngue PT/EN. A tradução é client-side via `applyEnglish()` em `orbit-init.js`.

**Leia `docs/TRANSLATION-GUIDE.md` antes de mexer em traduções.**

Regras críticas:
- Chaves ≤30 chars → match **exato** (texto completo do nó)
- Chaves >30 chars → match por **substring** (frases completas)
- **NUNCA** adicione palavras soltas ao dicionário (ex: `'empresas': 'companies'`)
- Tags HTML dividem text nodes — adicione fragmentos separados
- Verifique sintaxe: `node -c public/js/orbit-init.js`

## Comandos

```bash
# Dev server
npm run dev

# Verificar JS
node -c public/js/orbit-init.js

# Buscar duplicatas de tradução
grep -oP "^\s+'[^']+'" public/js/orbit-init.js | sort | uniq -d
```

## Documentação

- `docs/TRANSLATION-GUIDE.md` — Sistema de tradução EN (processo e boas práticas)
- `docs/TYPOGRAPHY.md` — Tipografia e fontes (padrão e regras)
