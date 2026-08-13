# Exemplos

Artigo de referência da auditoria inicial: slug `funcionalidades-do-orbit-gestao-de-indicadores-como-transformar-dados-em-decisoes-melhores-para-sua-empresa`.

## H1

**Antes (CMS):** `Funcionalidades do Orbit  (Gestão de indicadores ): como transformar dados em decisões melhores para sua empresa`

**Bom:** `Gestão por indicadores: como transformar dados em decisões melhores`  
(o corpo já é esse guia; a keyword está no `seo_title`.)

**Ruim:** `Orbit Gestão | Indicadores | KPIs | Dashboard | IA para decidir melhor em 2026`  
(stuffing; muda o artigo para anúncio.)

Não mude o slug neste caso. URL já está no sitemap.

## Link interno (wrap)

**Bom** — a frase já existia:

```html
Gestão por indicadores é uma metodologia de acompanhamento do desempenho
```

```html
<a href="/glossario#kpi">Gestão por indicadores</a> é uma metodologia de acompanhamento do desempenho
```

Destino `/glossario#kpi` só porque o termo `kpi` existe em `glossario/page.tsx`. Para o agente: `/agentes/indicadores` (está no sitemap). Para um irmão publicado: `/blog/como-criar-indicadores-empresa`.

**Ruim**

```html
<a href="/blog/gestao-por-indicadores-guia-2026">Leia também nosso guia completo</a>
```

Esse slug não está em `articles.json` → 404. O validador deve falhar.

**Ruim**

```html
<a href="/indicadores">módulo de indicadores</a>
```

`/indicadores` é 301 legado. Use `/agentes/indicadores`.

**Ruim**

```html
<a href="/agentes/kpis">agente de KPIs</a>
```

Essa rota não existe. A allowlist não tem `/agentes/kpis`.

## FAQ

**Bom** (resposta já está no H2 “O que é gestão por indicadores?”):

```html
<h2>Perguntas frequentes</h2>
<h3>O que é gestão por indicadores?</h3>
<p>É acompanhar o desempenho da empresa com métricas ligadas a objetivos, processos, pessoas e metas — e agir quando o resultado sai do combinado.</p>
```

**Ruim** (fato novo + quebra do parser):

```html
<h2>Perguntas frequentes</h2>
<h3>Quanto custa o Orbit?</h3>
<ul><li>Planos a partir de...</li></ul>
<p>Fale com vendas.</p>
<h2>Conclusão</h2>
```

Preço não está no artigo; `<ul>` entre H3 e P impede o `extractFaqs`; H2 depois mata o recorte da seção.

## Excerpt

**Antes (122 chars):** `Gestão por indicadores para melhorar decisões, acompanhar metas, corrigir desvios e aumentar os resultados da sua empresa.`

**Bom (~155):** `Gestão por indicadores é ligar estratégia, processos e pessoas a metas claras — para decidir com fato, corrigir desvio cedo e parar de acumular relatório inútil.`

**Ruim:** `Descubra agora as funcionalidades incríveis do Orbit Gestão…` (não é o texto; é anúncio.)

## Canibalização (só relatório nesta run)

Irmãos: `funcionalidades-do-orbit-como-transformar-indicadores-em-decisoes-estrategicas` (jul) e `indicadores-de-desempenho-guia-completo-…` (jul).

Esta run: este post vira o pilar “gestão por indicadores”.  
Próximas runs: o de jul/21 vira produto Orbit; o guia de KPI vira “como criar indicadores”. Não editar os três de uma vez.
