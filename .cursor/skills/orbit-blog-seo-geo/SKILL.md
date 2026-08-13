---
name: orbit-blog-seo-geo
description: Audits and surgically improves Orbit Gestão blog articles for SEO and GEO without rewriting voice or inventing URLs. Use when correcting blog posts, indexação orgânica, FAQ schema, internal links, meta tags, cannibalization, or the article-by-article SEO/GEO pass.
---

# Orbit Blog SEO + GEO

Corrige **um artigo por vez**. Fonte de verdade PT: Supabase `blog_articles`. EN: `orbit-next/src/data/articles-en.json`. Deploy Cloudflare sobrescreve `articles.json` a partir do Supabase **sem** o sidecar EN.

Leia [reference.md](reference.md) e [voice.md](voice.md) antes de editar. Exemplos em [examples.md](examples.md).

## Não negociável (copie à risca)

1. **jamais criar links que deem 404.** Todo `href` novo precisa estar na allowlist gerada pelo script. Se não está na lista, o link não existe. Não invente slug, âncora, agente, cluster ou artigo “óbvio”.
2. **não descaracterizar artigos.** Edição cirúrgica. Preservar tese, exemplos, tom consultivo e estrutura. Proibido reescrever o texto só para “ficar mais SEO”.
3. Um artigo por run. Não abra lote. Não mude slug publicado. Não commite a menos que o usuário peça.

Se o validador falhar, a correção **não está pronta**.

## Workflow

Copie e marque:

```
Artigo:
- [ ] 1. Identificar (id / slug / live)
- [ ] 2. Snapshot (campos CMS + EN + canibalização)
- [ ] 3. Auditoria (checklist em reference.md)
- [ ] 4. Plano cirúrgico (o que muda / o que NÃO muda)
- [ ] 5. Aplicar PT no Supabase + EN no sidecar + imagens só se o arquivo existir
- [ ] 6. Validar (script exit 0)
- [ ] 7. Relatório curto ao usuário
```

### 1. Identificar

- “último” / “artigo 1” = primeiro de `articles.json` ordenado por `published_at` desc.
- Confirme `published=true` e URL live `https://orbitgestao.com.br/blog/{slug}`.

### 2. Snapshot

Leia o registro em `orbit-next/src/data/articles.json` e o sidecar EN. Anote: `id`, `title`, `seo_title`, `seo_keyword`, `excerpt`, `slug`, `cover_url`, `category`, `author`, `cta_banner_*`, `seo_canonical`.

Liste artigos com tokens de título/slug sobrepostos (canibalização). **Não edite os irmãos nesta run** — só registre a ação sugerida.

### 3. Auditoria

Checklist completo: [reference.md](reference.md). Não precisa canvas a cada artigo; um bloco no relatório basta.

### 4. Plano cirúrgico

Antes de gravar, a lista de mudanças cabe em 8 linhas. Cada item precisa ser:

- correção de higiene (espaço duplo, pontuação, excerpt curto), **ou**
- wrap de âncora em frase **já existente**, **ou**
- FAQ cujas respostas já estão no artigo, **ou**
- meta (`seo_title` / `excerpt` / `seo_keyword`) extraída do próprio texto.

Se a mudança exige parágrafo novo de produto, estatística nova ou “lição” que o artigo não ensina → **não faça**.

### 5. Aplicar

**PT (obrigatório no Supabase):** `title`, `excerpt`, `content`, `seo_title`, `seo_keyword`. `seo_canonical` deixe `null` (o template monta a URL certa). Não altere `slug`, `published_at`, `cover_url` (salvo arquivo quebrado).

Use MCP Supabase (`execute_sql`) no projeto `yfpdrckyuxltvznqfqgh`. Depois sincronize o JSON local:

```bash
cd orbit-next && node scripts/fetch-articles.mjs
```

**EN:** se title/excerpt/content PT mudaram, atualize o mesmo slug em `articles-en.json`. Não adicione palavras soltas em `orbit-init.js`.

**Template (`page.tsx`):** dívida de site (dois H1, JSON-LD com imagem relativa) **não** se mistura nesta run, a menos que o usuário peça correção de código. Anote no relatório.

**`llms.txt`:** só acrescente se o artigo for pilar (≥1500 palavras, guia) e ainda não estiver listado. Máximo ~15 URLs de blog. Não despeje o acervo.

### 6. Validar (obrigatório)

```bash
node .cursor/skills/orbit-blog-seo-geo/scripts/validate-article.mjs --slug <slug>
```

Exit 0 = pode reportar. Exit 1 = corrija e rode de novo.

Links externos fora da allowlist: só depois de `curl -sI` retornar **200** e passando `--checked-external=<url>` no validador.

### 7. Relatório

```
Artigo: {id} {slug}
Score antes → depois (técnico / on-page / GEO)
Mudou: (bullets)
Não mudou e por quê: (voz, slug, exemplos)
Canibalização: (irmãos + ação futura)
Validador: PASS
Dívida de template: (se houver)
```

## Edições permitidas vs proibidas

| Permitido | Proibido |
|---|---|
| Limpar title (espaços, `) :`) | Reescrever o artigo “do zero” |
| `seo_title` 50–60 chars com a keyword no início | Keyword stuffing (>2% ou H2 repetindo a frase) |
| Excerpt 150–160 chars, tese do próprio texto | Meta description genérica / inventada |
| Wrap de 3–8 âncoras em frases existentes | “Clique aqui”, “leia também”, bloco de links no fim |
| FAQ no contrato HTML do template, 4–8 pares | FAQ com fato novo ou H2 depois da seção |
| Alt em `<img>` que já existe | `<img src>` para arquivo que não está em `public/` |
| Alinhar H1 à keyword **se** o corpo já é sobre isso | Mudar o ângulo (produto ↔ guia genérico) sem o usuário pedir |
| Traduzir o que mudou no EN | Dicionário i18n com palavra solta |

## Links — regra dura

1. Rode o validador **antes** de inserir links se tiver dúvida; a allowlist está no stderr/stdout do script com `--print-allowlist`.
2. Preferir destino canônico. Não usar origens de 301 em `_redirects` (`/preco`, `/parcerias`, `/indicadores`, slugs de blog sem `/blog/`).
3. Nunca apontar para noindex: `/acesso`, `/programa`, `/design-system`, `/live/igor`, `/live/rd`, páginas `/obrigado`, `/bootcamp-orbit/recrutas`.
4. Não linkar artigo que não está em `articles.json` (não publicado = 404 no static export).
5. Glossário só com âncora real: `/glossario#kpi` (termo tem que existir em `glossario/page.tsx`).
6. CTA padrão do site: `https://demonstracao.orbitgestao.com.br/chat` — não `/chat`.
7. Mesma URL no máximo 2 vezes no corpo. Âncora descritiva, nunca a URL crua no meio da frase sem necessidade.
8. Se o melhor destino não está na allowlist, **não crie o link**.

## FAQ — contrato do template

O schema `FAQPage` só nasce se `extractFaqs()` achar ≥2 pares. Formato obrigatório, **no fim do `content`**, sem H2 depois:

```html
<h2>Perguntas frequentes</h2>
<h3>Pergunta em linguagem de busca?</h3>
<p>Resposta autônoma, ≥20 caracteres, já sustentada pelo artigo.</p>
```

H3 imediatamente seguido de `<p>` ou `<div>`. Sem lista/imagem entre os dois. Perguntas devem ser extraíveis do próprio texto (definições, passos, erros comuns).

## Stop

- Validador vermelho.
- Artigo sem EN sidecar e você alterou o PT: crie/atualize EN na mesma run.
- Usuário não pediu commit → não commite.
- Dúvida se um href existe → não insira.
