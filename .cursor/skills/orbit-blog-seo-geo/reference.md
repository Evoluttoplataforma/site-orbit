# Referência SEO + GEO — Orbit Blog

Ler depois do SKILL.md. Não substitui as regras duras de link e voz.

## Arquitetura que o agente precisa acertar

| Peça | Onde | Notas |
|---|---|---|
| PT publicado | Supabase `blog_articles` (`published=eq.true`) | Prebuild Cloudflare gera `articles.json` daqui. Patch só no JSON local some no próximo deploy. |
| EN | `orbit-next/src/data/articles-en.json` keyed by slug | Campos: `title`, `excerpt`, `content`. Não está no Supabase. |
| Página | `orbit-next/src/app/blog/[slug]/page.tsx` | H1 vem de `article.title` via `i18nEl` (hoje gera dois H1 PT+EN). FAQ via `extractFaqs()`. Related posts por token overlap. |
| Canonical | `orbit-next/src/lib/seo.ts` `articleCanonical()` | `seo_canonical` nulo/relativo/errado cai no fallback `https://orbitgestao.com.br/blog/{slug}`. Deixe nulo. |
| Sitemap | `orbit-next/scripts/sitemap-config.mjs` + fetch-articles | Artigos publicados entram no sitemap. Páginas estáticas só as da lista. |
| Strong na keyword | `fetch-articles.mjs` | Até 3 `<strong>` novos na `seo_keyword` no build. Não encher o CMS de negrito. |
| Cover | `public/images/blog/` | Preferir WebP local. `seo_og_image` nulo usa `cover_url`. |

H1 **não** vai no `content`. O template já injeta. `content` começa em `<p>` ou `<h2>`.

## Checklist por artigo

### Técnico (indexação)

- HTTP live 200, HTTPS, sem `noindex`.
- Canonical auto-referente (null no CMS está correto).
- Slug no `sitemap.xml` após o fetch.
- Cover 200. `og:image` deve ser URL absoluta no HTML gerado (dívida de template se o JSON-LD ainda emitir path relativo — anotar, não “consertar” inventando campo quebrado).
- `seo_og_image` só se o arquivo existir; senão deixar nulo e usar capa.

### On-page (Google)

Alvos, não dogmas. Não force o texto para bater número se a voz quebrar.

| Campo | Alvo | Como obter sem descaracterizar |
|---|---|---|
| `seo_keyword` | 2–4 palavras, a query real | Extraia do tema. Não invente cauda longa que o texto não cobre. |
| `seo_title` | 50–60 chars, keyword no início | Frase do artigo, não slogan de anúncio. |
| Title tag | `seo_title \| Blog Orbit Gestão` | Template. Não duplique a marca no `seo_title`. |
| `title` (H1) | 1 linha limpa, sem espaço duplo | Alinhar à keyword só se o corpo já for sobre isso. |
| `excerpt` | 150–160 chars | Primeira tese + benefício. Keyword natural. Sem reticências de corte feio. |
| Primeiro bloco | Keyword nas ~100 primeiras palavras | Se já está, não insira de novo. |
| Densidade | ~0,5–2% | 17× em 3k palavras (~1,4%) está saudável. Não aumente. |
| H2 | Hierarquia, 1 ideia cada | Não repetir a keyword em metade dos H2. |
| Links internos | 3–8 contextuais | Wrap; allowlist; ver SKILL. |
| Imagens no corpo | 0 é aceitável | Só adicionar se o ficheiro existir em `public/`. Alt descritivo. |
| Listas / passos | Manter se já existem | Não converter prosa boa em lista só por GEO. |
| Slug | Curto, keyword | **Não mudar** em artigo já publicado. Anote o padrão para o *próximo* post. |

### GEO (Citação em ChatGPT, Perplexity, Google AI)

Motores generativos citam trechos autônomos, com entidade clara e Q&A.

- Definição da ideia-mãe no primeiro H2 (já costuma existir — preserve).
- Passos numerados que já estão no texto: não reempacotar.
- FAQ no contrato do template (4–8). Respostas de 2–4 frases, auto-contidas.
- Entidade: 1 link para a página de produto/agente realmente relacionada (`/agentes/indicadores`, `/agentes-de-ia`, `/modulos/financeiro`, etc.) — só se o artigo fala disso.
- Autor: não invente bio. O template já mostra o nome. Não cole um parágrafo “sobre o autor” genérico.
- Números: só os que o artigo já afirma. Proibido “estudos mostram 73%” sem fonte no original.
- `llms.txt`: pilares, não todos os posts.
- Não invente `hreflang`. EN não tem URL própria (é CSS no mesmo HTML).

### Canibalização

Se 2+ artigos disputam a mesma query:

1. Este run: otimize **este** como o papel dele (pilar vs produto vs subtópico).
2. Relatório: slug irmão + papel sugerido (reescrever / canonical cruzado / diferenciar H1).
3. Não reescreva o irmão agora.
4. Canonical cruzado só se for duplicata real e o destino existir na allowlist. Quase nunca. Preferir diferenciar.

## Contrato FAQ (`extractFaqs`)

Em `page.tsx`:

1. Último `<h2>` cujo texto casa `/(perguntas|faq|dúvidas|frequentes)/i`.
2. Pares `<h3>…</h3>` + `<p>` ou `<div>` seguintes até o próximo H2.
3. `q.length < 250`, `a.length >= 20`, ≥2 pares → `FAQPage`.

Quebra silenciosa: espaço extra com `<ul>` entre H3 e P; FAQ no meio do artigo com H2 depois; heading “Dúvidas” sem pares.

## Campos CMS que o agente toca

Tocar: `title`, `excerpt`, `content`, `seo_title`, `seo_keyword`, `updated_at` (now).

Não tocar salvo pedido explícito: `slug`, `published`, `published_at`, `cover_url`, `author`, `category`, `lead_magnet_id`, `cta_banner_*` (CTA do banner só se URL na allowlist e assets existirem).

`seo_canonical`: null.

## Dívidas de template (anotar, não misturar)

Vistas no artigo 73 e provavelmente globais:

- `i18nEl('h1')` emite dois `<h1>`.
- JSON-LD `image` relativo.
- Breadcrumb usa `title` sujo, não `seo_title`.
- `og:image` width/height 1200×630 hardcoded; capas podem ser 1200×670.
- HTML PT+EN no source (crawlers sem CSS veem os dois).

Corrigir em run de código, não na run de artigo.

## Rotas indexáveis úteis (sempre via allowlist)

Preferências de destino, quando o texto já cita o conceito:

- Agente do tema → `/agentes/{slug}`
- Visão dos agentes → `/agentes-de-ia`
- Cluster da dor → `/blog/cluster/{slug}`
- Termo → `/glossario#{termo}`
- Artigo irmão **publicado** → `/blog/{slug}`
- Institucional só se o texto fala da empresa → `/sobre`, `/historias`, `/empresarios`, `/consultores`
- Demo → `https://demonstracao.orbitgestao.com.br/chat`

## Score rápido (relatório)

Peso sugerido: técnico 40 / on-page 35 / GEO 25. Não é nota do Google; é higiene nossa.

P0 típico: H1 quebrado, 0 links, 0 FAQ, schema image relativa (template), canibalização grave.

P1: excerpt curto, slug longo (não mudar), autor magro, `llms.txt`, bilingue no source.

P2: densidade, OG dimensions, CTA banner.
