# ORBIT — Estratégia de Indexação Editorial

> Framework para indexação no Google Notícias, Google Discover e aba Notícias do Google Search. Aplicável ao blog do Orbit.

---

## 1. AMBIENTES DE DISTRIBUIÇÃO

| Ambiente | Como Entrar |
|---|---|
| Google Search — Aba Notícias | Schema markup + News Sitemap |
| Google Discover | Conteúdo de alta qualidade + Schema |
| App Google Notícias | Publisher Center + verificação editorial |
| Featured Snippets de Notícias | Alta frequência + autoridade de domínio |

---

## 2. CRITÉRIOS DO ALGORITMO (Googlebot News)

| Critério | Peso | Descrição |
|---|---|---|
| E-E-A-T | Alto | Experiência, Especialidade, Autoridade, Confiabilidade |
| Frescor | Alto | Artigos < 48h têm vantagem de indexação |
| Originalidade | Alto | Penaliza conteúdo replicado ou parafraseado |
| Relevância temática | Médio | Consistência no assunto ao longo do tempo |
| Sinais técnicos | Médio | Schema, News Sitemap, Core Web Vitals |

---

## 3. 4 PILARES TÉCNICOS

### Pilar 1 — Schema Markup (NewsArticle)

Cada artigo do blog deve incluir Schema JSON-LD no `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Título do artigo",
  "datePublished": "2026-03-10T08:00:00-03:00",
  "dateModified": "2026-03-10T08:00:00-03:00",
  "author": {
    "@type": "Person",
    "name": "Nome do Especialista"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{PUBLISHER_NAME}}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{PUBLISHER_LOGO_URL}}"
    }
  },
  "image": "{{ARTICLE_IMAGE_URL}}",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ARTICLE_URL}}"
  }
}
```

**Placeholders a configurar:**
- `{{PUBLISHER_NAME}}` — Nome da organização
- `{{PUBLISHER_LOGO_URL}}` — URL do logo (mín. 112x112px)
- `{{ARTICLE_IMAGE_URL}}` — URL da imagem destaque (mín. 1200x630px)
- `{{ARTICLE_URL}}` — URL canônica do artigo

### Pilar 2 — News Sitemap

XML dedicado com artigos das últimas 48h:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>https://site.com.br/blog/titulo-do-artigo</loc>
    <news:news>
      <news:publication>
        <news:name>Nome da Publicação</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>2026-03-10T08:00:00-03:00</news:publication_date>
      <news:title>Título do Artigo</news:title>
    </news:news>
  </url>
</urlset>
```

**Regras:**
- Atualizado automaticamente pelo CMS a cada novo artigo
- Apenas artigos das últimas 48h (remover os mais antigos)
- Submeter no Google Search Console
- URL: `{{DOMAIN}}/news-sitemap.xml`

### Pilar 3 — Google Publisher Center

1. Acessar `publishercenter.google.com` → "Adicionar publicação"
2. Informar URL + nome da publicação
3. Verificar via Google Search Console (DNS ou meta tag)
4. Configurar seções, idioma (pt-BR), categorias
5. Aguardar revisão (1-3 dias úteis)

### Pilar 4 — Sinais Editoriais

| Sinal | Impacto | Implementação |
|---|---|---|
| Página "Sobre" detalhada | Alto | `/sobre` com história, missão, equipe |
| Bio de autores com credenciais | Alto | Foto + nome + título + experiência |
| Política editorial publicada | Médio | `/politica-editorial` com critérios |
| Data/horário visíveis no artigo | Alto | Timestamp no topo do artigo |
| Imagem original de alta qualidade | Alto | Mín. 1200x630px, não stock genérico |
| Links internos + fontes externas | Médio | 2-3 links internos + 1-2 fontes externas |

---

## 4. PLANO DE IMPLEMENTAÇÃO

### Fase 1 — Fundação Técnica (Semanas 1-2)

- [ ] Instalar Schema NewsArticle no template de artigo do CMS
- [ ] Criar e submeter News Sitemap automático
- [ ] Verificar Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Criar página "Sobre" editorial
- [ ] Criar bio de autores/especialistas
- [ ] Publicar política editorial
- [ ] Registrar no Publisher Center
- [ ] Validar Schema com Rich Results Test do Google

### Fase 2 — Lançamento Editorial (Semanas 3-6)

- [ ] Mínimo 3 artigos/semana
- [ ] Cada artigo: 800+ palavras, imagem original, autor nomeado, data visível
- [ ] Monitorar indexação via Search Console semanalmente
- [ ] Validar Schema de cada artigo publicado

### Fase 3 — Escala e Autoridade (Mês 2+)

- [ ] Passar para 5 artigos/semana
- [ ] Link building editorial (parcerias com portais do setor)
- [ ] Mix 70% evergreen / 30% notícias do setor
- [ ] Relatório mensal de performance
- [ ] Testes A/B de headlines para CTR

---

## 5. TIPOS DE CONTEÚDO

| Tipo | Frequência | Objetivo |
|---|---|---|
| Notícia do setor (regulatório, tendências, dados) | 2-3x/semana | Frescor + relevância |
| Artigo educacional (guias, passo-a-passo) | 2-3x/semana | Autoridade + SEO longo prazo |
| Caso de sucesso (resultados reais) | 1x/semana | Prova social + conversão |
| Opinião de especialista | 1x/semana | E-E-A-T + diferenciação |

**REGRA ABSOLUTA:** Nunca publicar conteúdo puramente publicitário — Google desindexa domínio inteiro.

---

## 6. ESTRUTURA PADRÃO DE ARTIGO

```
1. Título com keyword principal (60-80 caracteres)
2. Subtítulo / resumo (1-2 linhas)
3. Imagem destaque original (mín. 1200x630px)
4. Introdução direta — informação principal no 1º parágrafo
5. Seções com H2/H3 (hierarquia correta)
6. Dados, pesquisas ou exemplos concretos
7. CTA contextual (não invasivo — ex: "Saiba como o Orbit resolve isso")
8. Bio do autor com foto
```

### Meta Tags Padrão

```html
<title>{{TITLE}} | {{PUBLISHER_NAME}}</title>
<meta name="description" content="{{DESCRIPTION_155_CHARS}}">
<meta name="author" content="{{AUTHOR_NAME}}">
<link rel="canonical" href="{{ARTICLE_URL}}">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="{{TITLE}}">
<meta property="og:description" content="{{DESCRIPTION}}">
<meta property="og:image" content="{{IMAGE_URL}}">
<meta property="og:url" content="{{ARTICLE_URL}}">
<meta property="article:published_time" content="{{ISO_DATE}}">
<meta property="article:author" content="{{AUTHOR_URL}}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{TITLE}}">
<meta name="twitter:description" content="{{DESCRIPTION}}">
<meta name="twitter:image" content="{{IMAGE_URL}}">
```

---

## 7. KPIs E METAS

| Métrica | 3 meses | 6 meses |
|---|---|---|
| Artigos indexados no Google News | 10+ | 30+ |
| Impressões mensais (Search Console) | 5.000+ | 20.000+ |
| Cliques mensais | 500+ | 3.000+ |
| Posição média | < 10 | < 5 |
| CTR médio | > 3% | > 5% |

---

## 8. CHECKLIST DE VALIDAÇÃO POR ARTIGO

- [ ] Schema NewsArticle válido (Rich Results Test)
- [ ] Artigo no News Sitemap (< 48h)
- [ ] Título 60-80 caracteres com keyword
- [ ] Meta description 120-155 caracteres
- [ ] Imagem destaque 1200x630px mínimo
- [ ] Autor com bio e foto
- [ ] Data e horário visíveis
- [ ] 800+ palavras
- [ ] H1 único + H2/H3 hierárquico
- [ ] Open Graph tags completas
- [ ] 2-3 links internos
- [ ] 1-2 fontes externas confiáveis
- [ ] CTA contextual (não publicitário)
- [ ] Canonical URL configurado

---

*Referência técnica — Orbit 2026*
