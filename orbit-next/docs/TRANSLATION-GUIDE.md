# Guia de Tradução EN — Orbit Site

## Visão Geral

O site é escrito em **Português (BR)** como idioma principal. A tradução para inglês é feita client-side via a função `applyEnglish()` no arquivo `public/js/orbit-init.js`.

O sistema funciona assim:
1. Usuário clica no botão **EN** no header
2. `localStorage` salva `orbit_lang = 'en'`
3. Na próxima carga, `applyEnglish()` percorre todos os text nodes do DOM e substitui textos PT → EN

---

## Arquitetura do Sistema de Tradução

### Arquivo principal
`public/js/orbit-init.js` → função `applyEnglish()` (linha ~144)

### Componentes do sistema

| Componente | Descrição |
|---|---|
| `var t = { ... }` | Dicionário principal PT → EN |
| `shortKeys` (≤30 chars) | Match **exato** — só traduz quando o texto trimmed do nó é exatamente a chave |
| `longKeys` (>30 chars) | Match por **substring** — traduz ocorrências dentro de textos maiores |
| `shortWords` | Palavras curtas separadas (`não`, `Sim`, `ou`) — match exato adicional |
| `i18nMap` | Traduções via atributo `data-i18n` em elementos HTML |
| `placeholders` | Traduções de placeholders de inputs/textareas |
| `optMap` | Traduções de `<select>` options |

### Fluxo de tradução (ordem de execução)

```
1. translateNode(document.body)     → percorre text nodes, aplica t{}
2. shortWords walker                → traduz palavras curtas isoladas
3. CSS pseudo-elements              → data-label para ::before/::after
4. data-i18n elements               → i18nMap{}
5. page title + lang attribute      → document.title, html[lang]
6. placeholders                     → inputs e textareas
7. select options                   → optMap{}
```

---

## Regras Fundamentais

### 1. NUNCA adicione palavras soltas ao dicionário principal

**ERRADO:**
```js
'empresas': 'companies',
'consultoria': 'consulting firm',
'Agora': 'Now',
```

Isso causa **texto misturado** ("consulting firm em companies") porque faz substring match dentro de frases PT que não têm tradução completa.

**CERTO:**
```js
// Frase completa (>30 chars) — substring match seguro
'Uma consultoria de gestão e ISO com um propósito claro': 'A management and ISO consulting firm with a clear purpose',

// Palavra curta (≤30 chars) — só traduz em match exato
'Empresários': 'Business Owners',  // OK se o nó inteiro é "Empresários"
```

### 2. Threshold de 30 caracteres

- **Chaves ≤ 30 chars**: só fazem match quando o `textContent.trim()` do text node é **exatamente** a chave
- **Chaves > 30 chars**: fazem substring match (são frases completas, seguras)

### 3. Texto dividido por tags HTML

Quando o HTML tem tags inline que dividem o texto:

```html
<h2>Onde <em>tudo</em> começou</h2>
```

Os text nodes são: `"Onde "`, `"tudo"`, `" começou"`. Você precisa de **3 entradas separadas**:

```js
'Onde': 'Where',
'tudo': 'it all',
'começou': 'started',
```

Isso é seguro porque com ≤30 chars, só fazem match exato.

### 4. Organize por seção/página

Use comentários `// ===` para separar seções:

```js
// === SOBRE PAGE - Timeline ===
'1996 — A fundação': '1996 — The founding',
'Nasce o Grupo GSN': 'Grupo GSN is born',
```

### 5. Use `data-i18n` para elementos de navegação

Para nav, footer e elementos que se repetem em todas as páginas:

```html
<span data-i18n="nav.home">Início</span>
```

```js
var i18nMap = {
  'nav.home': 'Home',
};
```

---

## Como Adicionar Traduções

### Checklist

1. **Identifique o texto exato** no HTML (inspecione os text nodes, não o texto visual)
2. **Verifique se já existe** — busque no dicionário antes de adicionar
3. **Escolha o tipo certo**:
   - Texto inteiro de um elemento → chave curta (match exato)
   - Parágrafo ou frase longa → chave longa (substring match)
   - Nav/footer/elementos repetidos → `data-i18n`
   - Placeholder de input → `placeholders{}`
   - Option de select → `optMap{}`
4. **Adicione na seção correta** do dicionário (organizado por página)
5. **Teste visualmente** — recarregue a página em EN e confira
6. **Verifique sintaxe**: `node -c public/js/orbit-init.js`

### Exemplo prático

Suponha que você quer traduzir esta seção:

```html
<section>
  <span class="badge">Nossa Missão</span>
  <h2>Transformar a gestão com <strong>inteligência artificial</strong></h2>
  <p>Acreditamos que toda empresa merece acesso a ferramentas de gestão de classe mundial.</p>
</section>
```

Traduções necessárias:

```js
// Badge — texto curto, match exato
'Nossa Missão': 'Our Mission',

// H2 — dividido pelo <strong>, precisa de fragmentos
'Transformar a gestão com': 'Transform management with',
'inteligência artificial': 'artificial intelligence',

// P — frase longa (>30 chars), substring match
'Acreditamos que toda empresa merece acesso a ferramentas de gestão de classe mundial.': 'We believe every company deserves access to world-class management tools.',
```

---

## Armadilhas Comuns

| Armadilha | Consequência | Solução |
|---|---|---|
| Palavra solta no dicionário (ex: `'gestão': 'management'`) | Troca dentro de frases PT não traduzidas | Use apenas em frases completas |
| Texto não bate com HTML (ex: vírgula vs em dash) | Tradução não é aplicada (falha silenciosa) | Copie o texto exato do HTML |
| Esquecer de escapar apóstrofos | Erro de sintaxe JS | Use `\'` ou aspas duplas |
| Duplicar chave no dicionário | Última ocorrência vence, comportamento imprevisível | Busque antes de adicionar |
| Adicionar tradução para texto gerado por JS | Tradução não funciona (texto renderizado depois) | Use `setTimeout` ou observer |

---

## Validação

```bash
# Verificar sintaxe do JS
node -c public/js/orbit-init.js

# Buscar duplicatas no dicionário
grep -oP "^\s+'[^']+'" public/js/orbit-init.js | sort | uniq -d
```

### Teste visual

1. Abra o site localmente
2. Clique no botão **EN**
3. Navegue por TODAS as páginas
4. Procure por:
   - Texto em PT que deveria estar em EN
   - Texto misturado PT/EN (indica palavra solta no dicionário)
   - Layout quebrado (tradução muito longa expandindo containers)

---

## Estrutura do Dicionário (seções)

```
NAV → HERO → PLATFORM → PARA QUEM → CATEGORY → PAIN POINTS →
REFRAME → OLIVIA → AGENTS → HOW IT WORKS → COST → PRICING →
TESTIMONIALS → GUARANTEE → FAQ → CTA → FOOTER →
LP EMPRESAS → CONSULTORES → PRICING PAGE → AGENTES →
FAQ PAGE → SOBRE → PARCERIAS → BLOG → HISTÓRIAS →
STORY DETAIL → AGENTE ESTRATÉGICO → MARKET DATA
```
