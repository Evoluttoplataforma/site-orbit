# Agentes de IA — Playbook completo para implementação

> **Para o Claude Code do projeto:** este documento contém TUDO o que você precisa pra criar a página pillar `/agentes-de-ia` + 10 páginas específicas de agentes. Copy pronta, template HTML, schemas, técnicas de SEO/GEO, internal linking. Execute em ordem.

---

## 1. Contexto estratégico

### Por que esse projeto existe

O ChatGPT já cita a Orbit espontaneamente como representante da categoria emergente "AI Operating System for Business" — junto com SAP, Salesforce e Microsoft. A análise de busca real feita por um cliente mostrou que LLMs reconhecem a Orbit como "time de agentes especializados coordenados pela Olívia".

**Problema atual:** a Orbit não tem páginas dedicadas a cada agente, então quem busca "IA para gestão financeira" ou "agente de IA para CRM" não encontra resposta específica — cai na home genérica e desiste.

**Solução:** criar 10 páginas específicas (uma por agente/macro-área) + 1 página pillar — replicando o padrão estrutural que SAP, Salesforce e Microsoft já usam.

### Resultado esperado

- 10 novas páginas indexáveis no Google
- Captura de buscas long-tail de baixa competição
- Multiplicação de signals pra LLMs (ChatGPT, Claude, Perplexity, Gemini)
- Schema.org `Service` em cada página
- Topical authority por área específica

---

## 2. Arquitetura — URLs, arquivos, naming

### Estrutura de URLs

```
/agentes-de-ia               → pillar page (visão geral do "Time Olívia")
/agentes/estrategico         → Agente Estratégico
/agentes/financeiro          → Agente Financeiro
/agentes/comercial           → Agente Comercial
/agentes/processos           → Agente de Processos
/agentes/pessoas             → Agente de Pessoas
/agentes/recrutamento        → Agente de R&S
/agentes/projetos            → Agente de Projetos
/agentes/reunioes            → Agente de Reuniões
/agentes/documentos          → Agente de Documentos
/agentes/riscos              → Agente de Riscos
```

### Estrutura de arquivos

```
public/
├── agentes-de-ia/
│   └── index.html                    ← pillar
└── agentes/
    ├── estrategico/index.html
    ├── financeiro/index.html
    ├── comercial/index.html
    ├── processos/index.html
    ├── pessoas/index.html
    ├── recrutamento/index.html
    ├── projetos/index.html
    ├── reunioes/index.html
    ├── documentos/index.html
    └── riscos/index.html
```

Padrão respeita o Cloudflare Pages (URL friendly, sem `.html` na URL).

### Naming oficial dos agentes

| URL slug | Nome canônico | Cobertura (módulos Orbit) |
|---|---|---|
| `estrategico` | **Agente Estratégico** | Estratégico + Indicadores + Oportunidades |
| `financeiro` | **Agente Financeiro** | Financeiro + Compras + Fornecedores |
| `comercial` | **Agente Comercial** | CRM/Pipelines + Pesquisas |
| `processos` | **Agente de Processos** | Processos + Tarefas + Problemas |
| `pessoas` | **Agente de Pessoas** | Pessoas + PDI + Treinamentos + Departamentos |
| `recrutamento` | **Agente de R&S** | Vagas + Candidatos + Recrutamento |
| `projetos` | **Agente de Projetos** | Projetos |
| `reunioes` | **Agente de Reuniões** | Reuniões |
| `documentos` | **Agente de Documentos** | Documentos + Workflows |
| `riscos` | **Agente de Riscos** | Riscos + Compliance |

**Consistência:** "Agente" + área. Olívia coordena os 10. Usar essa nomenclatura em 100% dos materiais (home, blog, copy, schema).

---

## 3. Template HTML padrão (cada página de agente segue esse layout)

### Estrutura semântica de cada página

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO BÁSICO -->
  <title>{{H1 do agente}} | Orbit Gestão</title>
  <meta name="description" content="{{Meta description específica}}">
  <link rel="canonical" href="https://orbitgestao.com.br/agentes/{{slug}}">

  <!-- OPEN GRAPH -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="{{H1 do agente}}">
  <meta property="og:description" content="{{Meta description}}">
  <meta property="og:image" content="https://orbitgestao.com.br/og/agente-{{slug}}.jpg">
  <meta property="og:url" content="https://orbitgestao.com.br/agentes/{{slug}}">
  <meta property="og:locale" content="pt_BR">

  <!-- TWITTER CARD -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{H1 do agente}}">
  <meta name="twitter:description" content="{{Meta description}}">
  <meta name="twitter:image" content="https://orbitgestao.com.br/og/agente-{{slug}}.jpg">

  <!-- SCHEMA.ORG (3 schemas por página) -->
  <script type="application/ld+json">{{ Service schema }}</script>
  <script type="application/ld+json">{{ FAQPage schema }}</script>
  <script type="application/ld+json">{{ BreadcrumbList schema }}</script>

  <!-- DESIGN SYSTEM -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    :root {
      --bg: #0D1117;
      --gold: #FFBA1A;
      --gold-dark: #E6A200;
      --gold-light: #FFCA4A;
      --text: #F5F5F0;
      --text-muted: rgba(245,245,240,0.7);
      --border: rgba(255,255,255,0.10);
    }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); }
  </style>
</head>

<body class="bg-[#0D1117] text-[#F5F5F0] antialiased">

  <!-- BREADCRUMB (importante pra Google) -->
  <nav aria-label="Breadcrumb" class="max-w-7xl mx-auto px-6 py-4 text-sm">
    <ol class="flex items-center gap-2 text-white/60">
      <li><a href="/" class="hover:text-[#FFBA1A]">Início</a></li>
      <li>›</li>
      <li><a href="/agentes-de-ia" class="hover:text-[#FFBA1A]">Agentes de IA</a></li>
      <li>›</li>
      <li class="text-white" aria-current="page">{{Nome do agente}}</li>
    </ol>
  </nav>

  <!-- HERO SECTION -->
  <header class="max-w-7xl mx-auto px-6 pt-12 pb-20">
    <!-- Pill com módulos cobertos -->
    <div class="inline-flex items-center gap-2 bg-[#FFBA1A]/10 border border-[#FFBA1A]/30 text-[#FFBA1A] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-8">
      <i data-lucide="sparkles" class="w-3 h-3"></i>
      Time Olívia · {{Áreas cobertas}}
    </div>

    <!-- H1: PRIMARY KEYWORD GOES HERE -->
    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
      {{H1 completa}}<br>
      <span class="text-[#FFBA1A]">{{Final do H1 com keyword principal}}</span>
    </h1>

    <!-- Subheadline: secondary keywords + benefit -->
    <p class="text-xl md:text-2xl text-white/80 max-w-3xl mb-10 leading-relaxed">
      {{Subheadline completa, 25-40 palavras com 3-5 keywords secundárias}}
    </p>

    <!-- CTA -->
    <div class="flex flex-wrap gap-4 items-center">
      <a href="#demo" class="bg-[#FFBA1A] hover:bg-[#E6A200] text-[#0D1117] font-bold px-8 py-4 rounded-lg transition">
        Ver o {{Nome do agente}} em ação
      </a>
      <a href="#capacidades" class="text-white/80 hover:text-white font-medium px-4 py-4 transition">
        Conheça as capacidades ↓
      </a>
    </div>
  </header>

  <!-- SECTION: O QUE ESSE AGENTE FAZ (6-8 capacidades) -->
  <section id="capacidades" class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">O que o {{Nome do agente}} faz</h2>
    <p class="text-lg text-white/70 max-w-3xl mb-12">{{1-2 frases de contexto}}</p>

    <!-- Grid 2x4 de capacidades -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {{Para cada capacidade (6-8 total):}}
      <article class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FFBA1A]/40 transition">
        <div class="w-10 h-10 bg-[#FFBA1A]/10 border border-[#FFBA1A]/30 rounded-lg flex items-center justify-center mb-4">
          <i data-lucide="{{icon}}" class="w-5 h-5 text-[#FFBA1A]"></i>
        </div>
        <h3 class="text-lg font-bold mb-2">{{Capacidade}}</h3>
        <p class="text-sm text-white/70">{{Descrição 15-25 palavras}}</p>
      </article>
    </div>
  </section>

  <!-- SECTION: COMO OPERA COM OUTROS AGENTES -->
  <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Como o {{Agente}} opera com os outros agentes do Time Olívia</h2>
    <p class="text-lg text-white/70 max-w-3xl mb-12">{{Frase explicativa}}</p>

    <div class="grid md:grid-cols-3 gap-6">
      {{3-4 integrações com outros agentes:}}
      <article class="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div class="text-xs text-[#FFBA1A] font-bold uppercase tracking-wider mb-2">{{Agente A}} + {{Agente B}}</div>
        <h3 class="text-lg font-bold mb-2">{{Caso de uso}}</h3>
        <p class="text-sm text-white/70">{{Descrição 20-30 palavras}}</p>
      </article>
    </div>
  </section>

  <!-- SECTION: CASOS DE USO POR ESTÁGIO DA EMPRESA -->
  <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-12">3 cenários onde o {{Agente}} entrega mais valor</h2>

    <div class="grid md:grid-cols-3 gap-8">
      {{Para cada cenário (3 total):}}
      <article>
        <div class="text-6xl font-extrabold text-[#FFBA1A] mb-4">0{{N}}</div>
        <h3 class="text-xl font-bold mb-3">{{Título do cenário}}</h3>
        <p class="text-white/70">{{Descrição 40-60 palavras}}</p>
      </article>
    </div>
  </section>

  <!-- SECTION: CTA DEMO -->
  <section id="demo" class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <div class="bg-gradient-to-br from-[#FFBA1A]/10 to-transparent border border-[#FFBA1A]/30 rounded-3xl p-10 md:p-16 text-center">
      <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Quer ver o {{Nome do agente}} operando na sua empresa?</h2>
      <p class="text-xl text-white/80 max-w-2xl mx-auto mb-10">
        Demonstração de 30 minutos. Mostramos o {{Agente}} aplicado ao cenário real do seu negócio.
      </p>
      <a href="#demo-form" class="inline-block bg-[#FFBA1A] hover:bg-[#E6A200] text-[#0D1117] font-bold text-lg px-10 py-5 rounded-lg transition">
        Agendar demonstração →
      </a>
      <div class="mt-6 text-sm text-white/60 flex flex-wrap gap-6 justify-center">
        <span>✓ 30 min</span>
        <span>✓ Sem cartão</span>
        <span>✓ Roadmap incluído</span>
      </div>
    </div>
  </section>

  <!-- SECTION: FAQ (importantíssimo pra schema FAQPage) -->
  <section class="max-w-4xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-12 text-center">Perguntas frequentes sobre o {{Nome do agente}}</h2>

    <div class="space-y-4">
      {{Para cada FAQ (8 total):}}
      <details class="bg-white/5 border border-white/10 rounded-xl p-6 group">
        <summary class="font-bold text-lg cursor-pointer flex justify-between items-center">
          {{Pergunta}}
          <i data-lucide="chevron-down" class="w-5 h-5 group-open:rotate-180 transition"></i>
        </summary>
        <p class="mt-4 text-white/70 leading-relaxed">{{Resposta 40-80 palavras}}</p>
      </details>
    </div>
  </section>

  <!-- SECTION: CONTEÚDOS RELACIONADOS (internal linking) -->
  <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-2xl font-bold mb-8">Conteúdos relacionados ao {{Nome do agente}}</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {{Para cada artigo do blog relacionado (4-6 total):}}
      <a href="/blog/{{slug}}" class="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFBA1A]/40 rounded-xl p-6 transition block">
        <div class="text-xs text-[#FFBA1A] uppercase tracking-wider font-bold mb-2">Blog · {{Categoria}}</div>
        <h3 class="font-bold mb-2">{{Título do artigo}}</h3>
        <p class="text-sm text-white/60">{{Descrição curta}}</p>
      </a>
    </div>
  </section>

  <!-- SECTION: OUTROS AGENTES DO TIME (internal linking entre agentes) -->
  <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-2xl font-bold mb-8">Os outros agentes do Time Olívia</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {{Para cada outro agente (9 total — excluir o atual):}}
      <a href="/agentes/{{slug}}" class="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFBA1A]/40 rounded-lg p-4 transition text-center block">
        <i data-lucide="{{icon}}" class="w-6 h-6 text-[#FFBA1A] mx-auto mb-2"></i>
        <div class="font-bold text-sm">{{Nome do agente}}</div>
      </a>
    </div>
  </section>

  <script>lucide.createIcons();</script>
</body>
</html>
```

---

## 4. SEO/GEO checklist — técnicas obrigatórias

Cada página de agente deve ter **TODAS** essas técnicas implementadas:

### On-page SEO

- [ ] `<title>` com keyword principal + brand (60 chars max)
- [ ] `<meta name="description">` (155 chars max, com call-to-action implícito)
- [ ] `<link rel="canonical">` apontando pra URL final
- [ ] H1 único na página com keyword principal
- [ ] H2/H3 hierárquicos com keywords secundárias
- [ ] Image `alt` text descritivo (não vazio, não keyword stuffing)
- [ ] `loading="lazy"` em imagens abaixo da fold
- [ ] URLs amigáveis (sem `.html`, sem query strings)

### Open Graph + Twitter

- [ ] `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`
- [ ] `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] OG image dedicada por agente (1200x630px), salva em `/public/og/agente-{slug}.jpg`

### Schema.org JSON-LD (3 por página)

- [ ] `Service` schema (descreve o agente como serviço)
- [ ] `FAQPage` schema (perguntas frequentes — captura AI Overview)
- [ ] `BreadcrumbList` schema (navegação)

### Estrutura semântica HTML5

- [ ] `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- [ ] `<nav aria-label="Breadcrumb">`
- [ ] `<details>/<summary>` pra FAQ (acessível + SEO-friendly)

### Internal linking

- [ ] Cada agente linka pros outros 9 agentes (cross-linking obrigatório)
- [ ] Cada agente linka pra 4-6 artigos do blog relacionados
- [ ] Cada agente linka pra pillar `/agentes-de-ia`
- [ ] Página pillar linka pras 10 específicas
- [ ] Anchor text descritivo (não "clique aqui")

### Performance (Core Web Vitals)

- [ ] Plus Jakarta Sans com `display=swap`
- [ ] Tailwind CDN via `<script>` (OK pra MVP)
- [ ] Lucide via CDN
- [ ] Lazy loading de imagens
- [ ] Sem JS pesado na hero

### Acessibilidade

- [ ] Contraste WCAG AA (gold no charcoal funciona, validar)
- [ ] `aria-label` em ícones decorativos
- [ ] `aria-current="page"` no breadcrumb atual
- [ ] Hierarquia de heading correta (H1 → H2 → H3)
- [ ] Foco visível em links

### Sitemap e robots

- [ ] Adicionar todas as 11 URLs ao `sitemap.xml`
- [ ] `robots.txt` permitindo indexação (sem disallow)
- [ ] Ping no Google Search Console + Bing Webmaster Tools após publicar

---

## 5. Schema.org JSON-LD — templates exatos

### Template 1: Service (cole no `<head>` de cada agente)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{{Nome do agente}}",
  "alternateName": ["{{Variação 1}}", "{{Variação 2}}"],
  "description": "{{Meta description}}",
  "provider": {
    "@type": "Organization",
    "name": "Orbit Gestão",
    "url": "https://orbitgestao.com.br",
    "sameAs": [
      "https://www.linkedin.com/company/orbit-gestao",
      "https://www.instagram.com/orbitgestao"
    ]
  },
  "serviceType": "AI Operating System for Business — {{Área}}",
  "areaServed": {
    "@type": "Country",
    "name": "Brasil"
  },
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Empresas B2B brasileiras"
  },
  "category": "Business Software with AI Agents",
  "url": "https://orbitgestao.com.br/agentes/{{slug}}",
  "isRelatedTo": [
    { "@type": "Service", "name": "Olívia — IA Coordenadora", "url": "https://orbitgestao.com.br/agentes-de-ia" }
  ]
}
```

### Template 2: FAQPage (cole no `<head>` de cada agente, com as 8 perguntas)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{{Pergunta 1}}",
      "acceptedAnswer": { "@type": "Answer", "text": "{{Resposta 1}}" }
    },
    {
      "@type": "Question",
      "name": "{{Pergunta 2}}",
      "acceptedAnswer": { "@type": "Answer", "text": "{{Resposta 2}}" }
    }
    /* ... 8 perguntas no total */
  ]
}
```

### Template 3: BreadcrumbList (cole no `<head>` de cada agente)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Início",
      "item": "https://orbitgestao.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Agentes de IA",
      "item": "https://orbitgestao.com.br/agentes-de-ia"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{Nome do agente}}",
      "item": "https://orbitgestao.com.br/agentes/{{slug}}"
    }
  ]
}
```

---

## 6. COPY — Página Pillar `/agentes-de-ia`

**Meta title (60 chars):**
```
Time Olívia: 10 agentes de IA que operam sua gestão | Orbit
```

**Meta description (155 chars):**
```
Conheça os 10 agentes de IA da Orbit, coordenados pela Olívia. Estratégia, financeiro, comercial, processos, pessoas — cada área tem um especialista digital.
```

**H1:**
```
Time Olívia: 10 agentes de IA especialistas
que operam a sua gestão 24/7.
```

**Subheadline:**
```
A Olívia é a IA coordenadora central da Orbit. Por trás dela, 10 agentes especialistas cuidam de cada área da sua empresa — estratégia, financeiro, comercial, processos, pessoas, recrutamento, projetos, reuniões, documentos e riscos. Você decide. Eles executam.
```

**Bloco de introdução (60-100 palavras):**
```
A Orbit é uma plataforma brasileira de gestão empresarial construída sobre uma nova categoria de software: o AI Operating System for Business. Em vez de um único sistema genérico que tenta cobrir tudo, a Orbit reúne 10 agentes de IA — cada um especialista em sua área — coordenados por uma IA central, a Olívia.

Cada agente entende profundamente o seu domínio, opera em tempo real dentro da plataforma e aprende com a operação da sua empresa. A Olívia conecta os agentes entre si, mantém memória organizacional cumulativa e garante que decisões em uma área conversem com as outras.
```

**Grid dos 10 agentes (cards):**

Cada card tem:
- Ícone Lucide
- Nome do agente
- 1 frase de descrição (15-25 palavras)
- Botão "Ver agente →"

Conteúdo dos 10 cards:

| Agente | Ícone Lucide | Descrição |
|---|---|---|
| Agente Estratégico | `compass` | Cuida do plano estratégico, indicadores, SWOT e oportunidades — transformando estratégia em execução diária. |
| Agente Financeiro | `wallet` | Coordena contas a pagar, contas a receber, fluxo de caixa, DRE e orçamento — em tempo real. |
| Agente Comercial | `trending-up` | Opera o CRM completo — pipeline, leads, automações, formulários e relatórios de vendas. |
| Agente de Processos | `git-branch` | Mapeia, executa e otimiza processos da empresa — incluindo tarefas, problemas operacionais e instruções de trabalho. |
| Agente de Pessoas | `users` | Cuida de colaboradores, cargos, organograma, PDI, treinamentos e departamentos. |
| Agente de R&S | `user-plus` | Recrutamento e seleção completos — vagas, candidatos, triagem de CV por IA, etapas e relatórios. |
| Agente de Projetos | `kanban-square` | Cria, executa e monitora projetos — com Gantt, dependências, membros e automações. |
| Agente de Reuniões | `calendar` | Organiza pauta, registra atas, extrai tarefas e gerencia ações pós-reunião. |
| Agente de Documentos | `file-text` | Gerencia repositório de documentos, workflows de aprovação e ciclo de vida da informação. |
| Agente de Riscos | `shield-alert` | Identifica, classifica e monitora riscos — com plano de ação e responsáveis nomeados. |

**Seção "Por que um time de agentes?" (300 palavras):**
```
Software de gestão tradicional foi pensado pra ser usado por humanos: você abre o sistema, navega menus, preenche campos, gera relatórios.

A nova geração de plataformas inverte essa lógica. Os agentes de IA fazem o trabalho operacional — você só decide.

Por que dividir em 10 agentes em vez de um único "assistente"?

Especialização. Cada agente entende profundamente sua área. O Agente Financeiro sabe contabilidade brasileira, ciclo de pagamento PIX e boleto, regimes tributários nacionais. O Agente Comercial entende funil B2B, qualificação BANT, métricas de pipeline. Esse conhecimento profundo é impossível de obter com agente genérico.

Memória contextual. Cada agente acumula histórico da sua empresa especificamente. O Agente de R&S lembra do perfil de candidatos contratados que deram certo, dos critérios que funcionaram, do tempo médio de fechamento por vaga. Em 12 meses, ele opera como um head de RH que conhece sua empresa há anos.

Coordenação pela Olívia. A Olívia mantém visão sistêmica. Quando o Agente Comercial fecha contrato grande, ela informa o Agente Financeiro pra preparar fatura, o Agente de Processos pra disparar onboarding, e o Agente de Documentos pra gerar contrato. Sem você precisar coordenar manualmente.

Decisão humana protegida. Os agentes executam dentro de políticas que você define. Eles não tomam decisões críticas sem aprovação. Você lidera — eles trabalham junto com o seu time humano, 24 horas por dia.

É exatamente o que SAP, Salesforce e Microsoft estão construindo globalmente. Nós construímos pra realidade brasileira — sobre 30 anos de metodologia consolidada do Grupo GSN.
```

**FAQ pillar (6 perguntas):**

1. **O que é um agente de IA na Orbit?**
   Um agente de IA na Orbit é uma camada de inteligência artificial especializada em uma área específica do negócio (financeiro, comercial, processos, etc.). Diferente de chatbot, o agente opera continuamente dentro da plataforma, mantém memória organizacional, executa tarefas sob política da empresa e aprende com a operação real do seu negócio.

2. **Quantos agentes a Orbit tem?**
   A Orbit tem 10 agentes especialistas — Estratégico, Financeiro, Comercial, Processos, Pessoas, R&S, Projetos, Reuniões, Documentos e Riscos — coordenados pela Olívia, a IA central. Juntos, cobrem 18 módulos funcionais da plataforma.

3. **Os agentes substituem minha equipe?**
   Não. Os agentes operam o trabalho repetitivo e analítico — preparam decisões, executam tarefas operacionais, geram análises, monitoram indicadores. Sua equipe humana lidera, decide estratégico, conduz negociações, cuida de cultura. Os dois juntos performam mais do que qualquer um isoladamente.

4. **Como os agentes operam entre si?**
   Pela Olívia. Quando um evento acontece em uma área (venda fechada, processo concluído, candidato aprovado), a Olívia informa os outros agentes relevantes. Isso elimina o trabalho manual de "comunicar áreas" que consome 30-40% do tempo administrativo em empresas com sistemas fragmentados.

5. **Quanto tempo até produtividade plena?**
   Tipicamente 1-3 meses, dependendo da maturidade dos seus processos. Os agentes começam a entregar valor desde a primeira semana, mas atingem desempenho ótimo quando acumulam 60-90 dias de operação real da sua empresa específica.

6. **Como começo a usar?**
   Agendando uma demonstração de 30 minutos. Mostramos os agentes operando com cenário real do seu negócio. Você sai com diagnóstico aplicável e estimativa específica de impacto na operação.

**CTA pillar:**
```
[Botão] Conhecer os 10 agentes em demo guiada
[Botão secundário] Ver agente por agente ↓
```

---

## 7. COPY — As 10 páginas específicas de agente

> **Padrão por página:** meta title, meta description, H1, subheadline, 6-8 capacidades, 3-4 integrações com outros agentes, 3 casos de uso, FAQ com 8 perguntas, 4-6 links blog relacionados.

### 7.1 — Agente Estratégico

**Meta title:** `Agente Estratégico: planejamento e indicadores operados por IA | Orbit`
**Meta description:** `Planejamento estratégico, SWOT, indicadores e oportunidades — o Agente Estratégico da Orbit transforma plano de gaveta em execução semanal monitorada.`

**H1:** `Agente Estratégico: planejamento e execução estratégica operados por IA`
**Subheadline:** `Tire o planejamento do PDF. O Agente Estratégico da Orbit opera o ciclo completo — visão, objetivos, SWOT, indicadores, plano de ação e revisão — coordenado pela Olívia, junto com a sua liderança.`

**Áreas cobertas (pill):** `Estratégico · Indicadores · Oportunidades`

**Capacidades (8):**
1. **Missão, Visão e Valores** (`compass`) — Documenta e mantém vivo o norte estratégico, citado nas decisões diárias.
2. **Análise SWOT** (`grid-3x3`) — Estrutura e atualiza forças, fraquezas, oportunidades e ameaças com base em dado real da operação.
3. **Objetivos Estratégicos** (`target`) — Desdobra prioridades em metas trimestrais com responsável e indicador.
4. **Indicadores em tempo real** (`activity`) — Conecta KPIs aos dados operacionais. Sem planilha, sem atraso.
5. **Dashboards executivos** (`bar-chart-3`) — Visão consolidada da empresa pronta pra reunião de board.
6. **Plano de Ação** (`list-checks`) — Cada objetivo vira plano com prazo, dono e prioridade.
7. **Oportunidades** (`lightbulb`) — Repositório central de oportunidades estratégicas identificadas pelo time e pela IA.
8. **Revisão estratégica** (`refresh-cw`) — Cadência semanal de revisão com sugestões automáticas de ajuste.

**Integrações com outros agentes (4):**
- **Estratégico + Financeiro** → impacto orçamentário de cada objetivo estratégico calculado em tempo real
- **Estratégico + Comercial** → meta de receita conectada ao pipeline e cobertura
- **Estratégico + Pessoas** → competências necessárias pra cada objetivo mapeadas em PDIs
- **Estratégico + Indicadores** → cada objetivo monitorado por KPIs vivos, não por planilha mensal

**Casos de uso (3):**
1. **Empresa em crescimento que cresceu sem estratégia clara** — Agente conduz construção do plano em 30 dias e estabelece ritmo de execução semanal.
2. **Empresa madura com plano que não sai do papel** — Agente reativa cadência de revisão, conecta indicadores e responsabiliza donos.
3. **Empresa preparando captação ou venda** — Agente prepara narrativa estratégica com indicadores que investidores e compradores procuram.

**FAQ (8):**
1. O Agente Estratégico substitui consultor de estratégia? — Não. Consultor traz visão externa pontual. Agente opera execução contínua. São complementares.
2. Como o Agente conecta estratégia com operação? — Cada objetivo do plano vira meta de indicador, que puxa dado da operação real. Conexão automática.
3. Que metodologia o Agente usa? — A Orbit aplica a metodologia consolidada do Grupo GSN, refinada em 30 anos e mais de 8.000 empresas atendidas.
4. Quem revisa o plano: o agente ou a liderança? — A liderança revisa em ritual semanal de 30-45 min. O agente prepara: status, desvios, sugestões.
5. Posso usar OKR no Agente Estratégico? — Sim. OKR, BSC ou framework próprio. O Agente é agnóstico de metodologia.
6. Como funciona a análise SWOT na Orbit? — Quadrantes editáveis colaborativamente, com recomendações estratégicas geradas pela IA baseadas no contexto da sua empresa.
7. O Agente identifica oportunidades sozinho? — Sim. Cruza indicadores, mercado e contexto pra sugerir oportunidades estratégicas no repositório central.
8. Em quanto tempo vejo resultado? — Plano executável em 30 dias. Cadência sustentável em 60 dias. Impacto em indicadores estratégicos em 90 dias.

**Blog relacionado (6 links):**
- Como tirar o planejamento estratégico do papel
- Por que 70% dos planejamentos estratégicos morrem no terceiro mês
- Plano de ação executável
- Como criar indicadores que conectam com a operação
- IA agentic para CEO: apoio à decisão estratégica
- AI Operating System for Business

---

### 7.2 — Agente Financeiro

**Meta title:** `Agente Financeiro: contas, fluxo de caixa e DRE operados por IA | Orbit`
**Meta description:** `Contas a pagar, contas a receber, fluxo de caixa, DRE em tempo real e insights da Olívia. O Agente Financeiro opera sua gestão financeira 24/7.`

**H1:** `Agente Financeiro: gestão financeira operada 24/7 pela Olívia`
**Subheadline:** `Contas a pagar, contas a receber, fluxo de caixa, DRE em tempo real, conciliação bancária, orçamento, compras, fornecedores e insights estratégicos — coordenados pelo Agente Financeiro, validados pelo seu CFO.`

**Áreas cobertas (pill):** `Financeiro · Compras · Fornecedores`

**Capacidades (8):**
1. **Contas a pagar** (`arrow-up-circle`) — Lança, aprova, paga e concilia com workflow auditável.
2. **Contas a receber** (`arrow-down-circle`) — Emite, monitora inadimplência e dispara cobrança automática.
3. **Fluxo de caixa projetado** (`waves`) — Projeção dinâmica de 30/60/90 dias atualizada em tempo real.
4. **DRE em tempo real** (`file-bar-chart`) — Resultado provável do mês atualizado a cada lançamento, não no fechamento.
5. **Orçamento** (`pie-chart`) — Comparativo orçado vs realizado por centro de custo, com alertas de desvio.
6. **Compras + RFQ** (`shopping-bag`) — Pedidos, cotações, aprovações e workflows integrados ao financeiro.
7. **Fornecedores** (`truck`) — Cadastro, contratos, histórico e avaliação de fornecedores.
8. **Insights da Olívia** (`brain`) — Anomalias detectadas, sugestões de otimização, alertas de risco de caixa.

**Integrações com outros agentes (4):**
- **Financeiro + Comercial** → comissões e previsão de receita conectadas ao pipeline
- **Financeiro + Estratégico** → impacto financeiro de cada objetivo estratégico calculado em tempo real
- **Financeiro + Compras** → workflow de aprovação ligado ao orçamento e centro de custo
- **Financeiro + Documentos** → contratos e NFs ancorados aos lançamentos correspondentes

**Casos de uso (3):**
1. **Empresa que vende muito mas o caixa aperta** — Agente expõe descompasso entre receita reconhecida e dinheiro recebido, antecipa crise de liquidez.
2. **Empresa fechando o mês na última semana** — Agente mantém DRE em tempo real, fechamento contábil vira validação, não descoberta.
3. **Empresa com inadimplência crescente** — Agente detecta padrão precoce de atraso e dispara cobrança automatizada antes de virar perda.

**FAQ (8):**
1. O Agente Financeiro substitui o contador? — Não. Contador continua responsável pelo fechamento oficial. Agente opera a gestão financeira diária — onde contador não tem capacidade nem deveria operar.
2. Como funciona a DRE em tempo real? — Cada venda, custo, despesa lança no sistema. Agente atualiza DRE imediatamente. Você vê resultado provável do mês em qualquer dia.
3. O Agente concilia com banco automaticamente? — Sim, via Open Finance e integrações bancárias. Conciliação que levava 3 dias por mês acontece em tempo real.
4. Como detecta inadimplência precoce? — Padrão de comportamento de cliente — atraso crescente, mudança de ritmo de pagamento — comparado ao histórico. Alerta semanas antes do default.
5. Posso configurar regras de aprovação? — Sim. Limite de valor, hierarquia, exceções, escalonamento — tudo configurável.
6. O Agente atende empresa do Simples? — Sim. Simples Nacional, Lucro Presumido, Lucro Real, MEI — tropicalizado pro regime brasileiro.
7. Como integra com ERP existente? — Via API e conectores. Agente pode operar em paralelo ao ERP ou substituir parte das funções financeiras.
8. Em quanto tempo vejo resultado? — DRE em tempo real disponível em 30 dias. Redução de inadimplência mensurável em 60-90 dias.

**Blog relacionado (6 links):**
- Gestão financeira integrada
- Por que sua empresa vende muito e ainda assim falta dinheiro no caixa
- DRE em tempo real: o guia completo
- Como criar indicadores que conectam com a operação
- ERP integrado vs plataforma all-in-one
- IA agentic para CEO

---

### 7.3 — Agente Comercial

**Meta title:** `Agente Comercial: CRM e pipeline operados por IA | Orbit`
**Meta description:** `Pipeline, leads, automações, formulários, relatórios. O Agente Comercial da Orbit opera o ciclo completo de vendas B2B — coordenado pela Olívia.`

**H1:** `Agente Comercial: CRM e operação de vendas B2B operados por IA`
**Subheadline:** `Pipeline de leads, qualificação, atividades, automações, formulários de captura, dashboards comerciais e insights de pipeline. O Agente Comercial da Orbit opera todo o ciclo de vendas — sem depender do humor do vendedor.`

**Áreas cobertas (pill):** `CRM/Pipelines · Pesquisas`

**Capacidades (8):**
1. **Pipeline de leads** (`git-branch`) — Funil configurável por equipe, com estágios, scores e SLAs.
2. **Detalhes do lead** (`user-search`) — Ficha completa com histórico, atividades, documentos e contexto enriquecido por IA.
3. **Automações de CRM** (`zap`) — Disparo automático de tarefas, e-mails e mudanças de estágio com base em regras.
4. **Web Forms** (`form-input`) — Formulários de captura plugáveis em site e LP com criação de lead automática.
5. **API + Webhooks** (`code`) — Integração nativa com qualquer fonte de lead externa.
6. **Relatórios comerciais** (`bar-chart`) — Conversão por etapa, ticket médio, ciclo de vendas, cobertura de pipeline.
7. **Provedores de assinatura** (`pen-tool`) — Integração com DocuSign, ClickSign etc. pra fechamento sem fricção.
8. **AI Pipeline Insights** (`brain`) — Olívia identifica oportunidades em risco, prioriza atividade do dia, sugere ações.

**Integrações com outros agentes (4):**
- **Comercial + Financeiro** → venda fechada dispara fatura e atualiza projeção de caixa
- **Comercial + Documentos** → contrato e proposta gerados automaticamente com dados do lead
- **Comercial + Processos** → onboarding de cliente disparado quando venda fecha
- **Comercial + Estratégico** → meta de receita conectada ao pipeline em tempo real

**Casos de uso (3):**
1. **Vendedor não preenche CRM** — Agente captura atividade automaticamente (e-mails, ligações sincronizadas), reduz preenchimento manual em 60%.
2. **Pipeline imprevisível** — Agente projeta cenários de fechamento com confiança estatística, antecipa risco de não bater meta em 8-12 semanas.
3. **Liderança comercial gasta sexta inteira gerando relatório** — Agente entrega relatório semanal pronto, com análise causal de desvios.

**FAQ (8):**
1. Substitui o RD Station ou HubSpot? — Para empresa B2B brasileira de médio porte, sim — com vantagem em integração nativa com financeiro, processos e indicadores.
2. Como integra com WhatsApp? — Conectores nativos com WhatsApp Business API e plataformas de mensageria.
3. O Agente qualifica leads sozinho? — Sim, com base em ICP definido pela empresa. Cruza dados públicos, aplica score, atribui ao vendedor certo.
4. Posso ter múltiplos pipelines? — Sim. Pipelines diferentes por produto, segmento, time, geografia. Sem limite.
5. Como funciona a comissão? — Comissão amarrada ao registro no CRM. Agente calcula automaticamente baseado em regras configuradas.
6. Integra com marketing? — Sim. Web forms, automações, atribuição multi-touch — tudo nativo no Agente Comercial.
7. Tem aplicativo mobile? — Sim. Vendedor opera em campo com mobile-first.
8. Quanto tempo de adoção real? — Aderência sobe de 30-50% pra 80-90% em 60-90 dias com a redução de fricção de preenchimento via IA.

**Blog relacionado (6 links):**
- Como organizar a prospecção e o follow-up de vendas
- Por que seu vendedor não preenche o CRM
- CRM para empresa B2B: como escolher em 2026
- Por que vendas, marketing e operações vivem em conflito
- Como criar indicadores que conectam com a operação
- Plano de ação executável

---

### 7.4 — Agente de Processos

**Meta title:** `Agente de Processos: BPMN e workflow operados por IA | Orbit`
**Meta description:** `Mapeamento, execução e otimização de processos da empresa. O Agente de Processos da Orbit transforma processo manual em workflow inteligente coordenado pela Olívia.`

**H1:** `Agente de Processos: BPMN, instruções de trabalho e tarefas operados por IA`
**Subheadline:** `Mapeie processos em BPMN, gere instruções de trabalho, distribua tarefas, monitore execução, identifique gargalos e proponha otimização — tudo coordenado pelo Agente de Processos junto com a Olívia.`

**Áreas cobertas (pill):** `Processos · Tarefas · Problemas`

**Capacidades (8):**
1. **Mapeamento BPMN** (`workflow`) — Editor visual BPMN 2.0 com geração assistida por IA.
2. **Instruções de Trabalho** (`book-open`) — POPs versionados, vinculados ao processo correspondente.
3. **Ciclo de Vida da Informação** (`recycle`) — Política de criação, revisão, arquivamento e descarte.
4. **Execução de processos** (`play-circle`) — Cada processo roda como workflow com responsável, prazo, indicador.
5. **Painel de tarefas** (`check-square`) — Visão consolidada de todas tarefas, prazos, prioridades.
6. **Problemas operacionais** (`alert-triangle`) — Repositório de RCA com hipóteses, ações, resolução.
7. **AI Generate Processes** (`brain`) — Olívia entrevista o time e gera mapeamento BPMN inicial.
8. **AI Generate BPMN** (`zap`) — Atualização e refinamento de diagrama automaticamente.

**Integrações com outros agentes (4):**
- **Processos + Comercial** → fechamento de venda dispara processo de onboarding
- **Processos + Financeiro** → workflow de aprovação financeira ligado a processo
- **Processos + Documentos** → POPs vinculados aos processos correspondentes
- **Processos + Indicadores** → cada processo gera KPI de SLA, taxa de erro, tempo de execução

**Casos de uso (3):**
1. **Empresa cresceu rápido sem processo padronizado** — Agente entrevista time, gera mapeamento BPMN inicial, ancora execução em sistema em 30 dias.
2. **Processo existe em PDF mas ninguém segue** — Agente leva o POP pra dentro do workflow operacional, time vê passo a passo enquanto executa.
3. **Empresa com gargalo recorrente em processo específico** — Agente identifica etapa que mais atrasa, propõe automação ou redesenho.

**FAQ (8):**
1. Preciso saber BPMN pra usar? — Não. Agente gera o diagrama por entrevista conversacional. Você revisa.
2. Substitui Bizagi ou Camunda? — Para empresa B2B brasileira de médio porte, sim. Para processos super-complexos de empresa grande, complementa.
3. Como aderência aos processos sobe? — Processo executado dentro do sistema (não PDF). Time vê próximo passo enquanto trabalha.
4. Posso versionar processos? — Sim. Cada versão é histórico auditável, com data de revisão e responsável.
5. Identifica gargalo automaticamente? — Sim. Cruza dados de execução e identifica etapas com tempo médio ou taxa de erro alta.
6. Funciona pra processo industrial? — Bom pra processo administrativo, comercial, financeiro, RH. Processo industrial pesado pode complementar com MES dedicado.
7. Cria checklist automaticamente? — Sim. AI Generate Checklist transforma instrução em checklist executável.
8. Tempo até primeiro processo no ar? — 7-14 dias por processo crítico.

**Blog relacionado (6 links):**
- Como mapear processos da empresa usando BPMN
- Por que ninguém na empresa segue processo definido
- Software de BPMS: como escolher
- Como organizar os processos de uma empresa que cresceu rápido
- Por que processos manuais estão travando o crescimento
- Como automatizar processos da empresa

---

### 7.5 — Agente de Pessoas

**Meta title:** `Agente de Pessoas: RH, PDI e treinamentos operados por IA | Orbit`
**Meta description:** `Colaboradores, cargos, organograma, PDI, treinamentos. O Agente de Pessoas opera a gestão de RH estratégico junto com seu time, coordenado pela Olívia.`

**H1:** `Agente de Pessoas: RH, desenvolvimento e cultura operados por IA`
**Subheadline:** `Colaboradores, cargos, organograma, planos de desenvolvimento, treinamentos, localidades e departamentos. O Agente de Pessoas opera o RH estratégico — enquanto sua equipe foca em cultura, liderança e conversas difíceis.`

**Áreas cobertas (pill):** `Pessoas · PDI · Treinamentos · Departamentos`

**Capacidades (8):**
1. **Colaboradores** (`users`) — Cadastro completo, ciclo de vida e histórico de cada pessoa.
2. **Cargos e Organograma** (`network`) — Estrutura organizacional viva, com responsabilidades e níveis.
3. **PDI (visão gestor)** (`target`) — Plano de desenvolvimento por colaborador, com metas, prazos e revisão.
4. **PDI (visão colaborador)** (`book`) — Cada pessoa acessa seu plano, atualiza progresso, registra aprendizado.
5. **Treinamentos** (`graduation-cap`) — Trilhas formais, microlearning, certificações.
6. **Departamentos** (`building-2`) — Estrutura por área, com líder, integrantes e KPIs.
7. **Localidades** (`map-pin`) — Multi-unidade, multi-país, com regras locais.
8. **Generate PDI Recommendation** (`brain`) — Olívia sugere PDI baseado em perfil, performance e aspiração.

**Integrações com outros agentes (4):**
- **Pessoas + Estratégico** → competências necessárias por objetivo estratégico mapeadas em PDIs
- **Pessoas + R&S** → perfil de contratação vincula ao cargo e à trilha de desenvolvimento
- **Pessoas + Processos** → responsabilidade em processo vinculada a colaborador específico
- **Pessoas + Reuniões** → ações de pessoas registradas em reuniões 1:1 ficam rastreáveis

**Casos de uso (3):**
1. **Empresa perdendo talento sem entender por quê** — Agente cruza sinais (engajamento, feedback, atividade) e identifica risco de saída 60-90 dias antes.
2. **PDI virou ritual anual de RH** — Agente conduz cadência trimestral viva, sugere ações, mede execução.
3. **Empresa multi-unidade sem visão consolidada de RH** — Agente entrega dashboard único: turnover, eNPS, headcount por unidade.

**FAQ (8):**
1. Substitui Convenia ou Gupy? — Para empresa B2B de médio porte focada em RH estratégico (não só folha), sim — com vantagem em integração com financeiro, estratégia e indicadores.
2. Como detecta risco de saída? — Combina indicadores comportamentais (engajamento em reuniões, atividade, feedback, performance) com padrão histórico de desligamentos.
3. Funciona pra empresa multi-unidade? — Sim, com regras de visibilidade e governança por unidade.
4. Tem app pra colaborador? — Sim. PDI, treinamentos, organograma — mobile-first.
5. Integra com folha de pagamento? — Sim, via API e conectores.
6. Quem cria o PDI? — Líder e colaborador cocriam. Agente sugere conteúdo baseado em perfil e aspiração.
7. Os treinamentos são gravados ou ao vivo? — Ambos. Suporta cursos próprios, vídeos, certificações externas, microlearning.
8. Em quanto tempo vejo redução de turnover? — 6-12 meses com PDI vivo e ritual de 1:1 instituído.

**Blog relacionado (6 links):**
- Como reter talentos qualificados na sua empresa
- Por que sua empresa perde os melhores talentos
- Software de RH para empresa B2B: como escolher
- Como criar PDI que efetivamente funciona
- Por que treinamento corporativo não vira mudança real
- Plataforma de treinamento corporativo

---

### 7.6 — Agente de R&S

**Meta title:** `Agente de R&S: recrutamento e seleção operados por IA | Orbit`
**Meta description:** `Vagas, candidatos, triagem de CV por IA, etapas seletivas, relatórios. O Agente de R&S opera o ciclo de recrutamento completo coordenado pela Olívia.`

**H1:** `Agente de R&S: recrutamento e seleção operados por um especialista digital`
**Subheadline:** `Da abertura de vaga ao fechamento, o Agente de R&S da Orbit opera o ciclo completo — descrição inteligente da vaga, triagem de CV por IA, etapas seletivas, scorecards, comunicação com candidato — tudo coordenado pela Olívia, junto com o seu time de RH.`

**Áreas cobertas (pill):** `Vagas · Candidatos · Recrutamento`

**Capacidades (8):**
1. **Geração de descrição de vaga** (`file-plus`) — IA cria descrição completa a partir do cargo + perfil desejado.
2. **Pipeline de candidatos** (`users-2`) — Estágios configuráveis, scorecards, decisões.
3. **Triagem de CV por IA** (`brain`) — Análise automática de aderência ao perfil da vaga.
4. **Análise individual** (`user-check`) — Score por candidato, justificativa, perguntas sugeridas pra entrevista.
5. **Entrevistas** (`mic`) — Agendamento, roteiro, notas, scorecard pós-entrevista.
6. **Comunicação automática** (`mail`) — Status, próximos passos, feedback — sem deixar candidato no escuro.
7. **Relatórios de R&S** (`bar-chart-3`) — Tempo de fechamento, conversão por etapa, fonte de candidato.
8. **Banco de talentos** (`bookmark`) — Candidatos qualificados que não fecharam ficam para vagas futuras.

**Integrações com outros agentes (4):**
- **R&S + Pessoas** → candidato aprovado vira colaborador com trilha de PDI inicial
- **R&S + Estratégico** → vagas críticas ligadas a objetivos estratégicos da empresa
- **R&S + Financeiro** → custo de R&S monitorado em centro de custo
- **R&S + Documentos** → propostas, NDA, contratos gerados automaticamente

**Casos de uso (3):**
1. **R&S sem processo, contratando por urgência** — Agente estrutura ciclo padronizado, reduz tempo médio de fechamento em 30-40%.
2. **Tempo gasto triando CV é absurdo** — Agente reduz 200 CVs pra top 20 em segundos, com justificativa.
3. **Candidato bom é perdido por demora de comunicação** — Agente automatiza comunicação por estágio, mantém candidato engajado.

**FAQ (8):**
1. Substitui Gupy ou Kenoby? — Para empresa B2B brasileira de médio porte, sim — com vantagem em integração com PDI, organograma e financeiro.
2. A IA discrimina candidatos? — Não. Agente avalia aderência técnica e comportamental ao perfil. Critérios são auditáveis e ajustáveis.
3. Como triagem de CV funciona? — Olívia compara CV ao perfil definido na vaga (skills, experiência, comportamento) e gera score de aderência.
4. Posso definir scorecard de entrevista? — Sim. Critérios configuráveis por cargo, com pesos.
5. Integra com LinkedIn? — Sim, via importação de candidatos e integração com sourcing.
6. O candidato vê o status dele? — Sim. Portal de candidato com transparência sobre próximos passos.
7. Tem banco de talentos? — Sim. Candidatos bons que não fecharam ficam classificados pra próximas vagas similares.
8. Reduz tempo de fechamento em quanto? — Tipicamente 30-50% no ciclo médio em 60-90 dias de uso.

**Blog relacionado (6 links):**
- Como reter talentos qualificados
- Por que sua empresa perde os melhores talentos
- Software de RH para empresa B2B: como escolher
- Como criar PDI que efetivamente funciona
- Por que treinamento corporativo não vira mudança real
- AI Operating System for Business

---

### 7.7 — Agente de Projetos

**Meta title:** `Agente de Projetos: Gantt, dependências e execução operados por IA | Orbit`
**Meta description:** `Crie, execute e monitore projetos com Gantt, dependências, membros, automações. O Agente de Projetos opera o ciclo completo coordenado pela Olívia.`

**H1:** `Agente de Projetos: gestão de projetos operada por IA`
**Subheadline:** `Da criação ao encerramento, o Agente de Projetos da Orbit opera o ciclo completo — escopo, cronograma, dependências, membros, automações, riscos. Coordenado pela Olívia, integrado com tudo na empresa.`

**Áreas cobertas (pill):** `Projetos`

**Capacidades (8):**
1. **Criação de projeto** (`folder-plus`) — Template, escopo, prazos, responsáveis, orçamento.
2. **Gantt + dependências** (`gantt-chart`) — Cronograma visual com dependências entre tarefas.
3. **Membros e acesso** (`users-cog`) — Time interno + convites externos, com expiração e governança.
4. **Automações de projeto** (`zap`) — Disparo de tarefas, notificações, mudanças de fase automatizadas.
5. **Painel do projeto** (`layout-dashboard`) — Visão consolidada: status, progresso, riscos, próximos marcos.
6. **Suspender/reativar membros** (`user-x`) — Controle granular durante mudanças de equipe.
7. **Exportação Gantt** (`download`) — PDF/PNG pra apresentação executiva.
8. **Tarefas conectadas** (`link`) — Tarefas do projeto vinculadas a processos, indicadores, riscos.

**Integrações com outros agentes (4):**
- **Projetos + Estratégico** → projetos vinculados a objetivos estratégicos da empresa
- **Projetos + Financeiro** → orçamento e custo real do projeto monitorados em centro de custo
- **Projetos + Pessoas** → alocação de membros respeitando carga, skill e PDI
- **Projetos + Riscos** → riscos do projeto registrados e monitorados no Agente de Riscos

**Casos de uso (3):**
1. **Empresa rodando vários projetos em paralelo, sem visão consolidada** — Agente entrega portfólio único com status, dependências e riscos.
2. **Projeto crítico sem dono claro** — Agente força definição de RACI por tarefa.
3. **Projeto com cliente externo precisando de governança** — Agente entrega portal de cliente com escopo, marcos, entregas.

**FAQ (8):**
1. Substitui Asana ou Monday? — Para empresa B2B brasileira focada em gestão integrada (não só projetos), sim — com vantagem em conexão com financeiro, processos e pessoas.
2. Tem Kanban e Gantt? — Sim, ambos. Gantt com dependências e caminho crítico, Kanban por fase ou time.
3. Posso convidar cliente externo? — Sim. Convites externos com expiração, acesso controlado, governança auditável.
4. Como o Agente identifica risco de atraso? — Cruza progresso real vs cronograma, carga dos membros e dependências.
5. Integra com calendário? — Sim. Tarefas e marcos sincronizam com Google Calendar, Outlook.
6. Tem template de projeto? — Sim. Templates por tipo de projeto, configuráveis pela empresa.
7. Como custo do projeto é monitorado? — Lançamentos do financeiro vinculados ao centro de custo do projeto.
8. Posso exportar Gantt? — Sim. PDF e PNG, prontos pra apresentação executiva.

**Blog relacionado (6 links):**
- Plano de ação executável
- Como organizar os processos de uma empresa que cresceu rápido
- Como criar indicadores que conectam com a operação
- Como tirar o planejamento estratégico do papel
- Como integrar sistemas empresariais
- AI Operating System for Business

---

### 7.8 — Agente de Reuniões

**Meta title:** `Agente de Reuniões: pauta, atas e ações operadas por IA | Orbit`
**Meta description:** `Pauta, atas, ações pós-reunião, transcrição com IA, extração automática de tarefas. O Agente de Reuniões transforma reunião em execução.`

**H1:** `Agente de Reuniões: pauta, ata e ações operados por IA`
**Subheadline:** `Pauta colaborativa, transcrição inteligente, extração automática de decisões e ações, encaminhamento por responsável. O Agente de Reuniões transforma horas de discussão em execução rastreável.`

**Áreas cobertas (pill):** `Reuniões · Ações`

**Capacidades (8):**
1. **Pauta colaborativa** (`list`) — Itens, tempos, responsáveis — montada antes da reunião.
2. **Repositório de reuniões** (`folder`) — Histórico completo por série, time, projeto.
3. **Transcrição com IA** (`mic-2`) — Áudio vira texto automaticamente.
4. **Chat com transcrição** (`message-circle`) — Pergunte ao Agente sobre o que foi discutido.
5. **Extração de tarefas** (`check-circle`) — IA identifica ações decididas e cria tarefa pra responsável.
6. **Ações em massa** (`layers`) — Múltiplas ações de reunião gerenciadas em painel único.
7. **Decisões registradas** (`scale`) — Toda decisão fica rastreável com contexto.
8. **Encaminhamento automático** (`send`) — Ata enviada por e-mail, ações criadas no painel de tarefas.

**Integrações com outros agentes (4):**
- **Reuniões + Pessoas** → ações de 1:1 vinculadas ao PDI do colaborador
- **Reuniões + Projetos** → reuniões de projeto registradas com escopo e marcos
- **Reuniões + Estratégico** → reuniões de comitê executivo conectadas ao plano
- **Reuniões + Processos** → reuniões recorrentes integradas a processos da empresa

**Casos de uso (3):**
1. **Reuniões viram conversa sem execução** — Agente extrai decisões e ações, cria tarefas automaticamente, acompanha execução.
2. **Time perde tempo lembrando o que ficou combinado** — Repositório central pesquisável, com transcrição e contexto.
3. **CEO quer revisar histórico de uma decisão estratégica** — Chat com transcrição permite perguntar "quando discutimos X?" e obter resposta com contexto.

**FAQ (8):**
1. Substitui Fellow ou Otter? — Para empresa B2B brasileira focada em gestão integrada, sim — com vantagem em conexão com tarefas, projetos e estratégia.
2. Como funciona a transcrição? — Áudio é processado por IA e vira texto pesquisável. Em português brasileiro.
3. Posso editar a ata gerada? — Sim. Ata gerada é rascunho. Time revisa, aprova, distribui.
4. As ações criadas vão pra onde? — Pro painel de tarefas do responsável + integração com calendário.
5. Reuniões recorrentes funcionam? — Sim. Séries de reuniões com pauta padrão e histórico de execução.
6. Funciona com Google Meet e Zoom? — Sim, via integração ou upload de gravação.
7. Tem chat com a transcrição? — Sim. Pergunte ao Agente sobre o que foi discutido em qualquer reunião.
8. Em quanto tempo vejo redução de "reunião sem ação"? — Tipicamente 60-90 dias com o ritual instituído.

**Blog relacionado (6 links):**
- Como resolver a falta de comunicação entre setores
- Por que vendas, marketing e operações vivem em conflito
- Plataformas para alinhar setores: como escolher
- Como tirar o planejamento estratégico do papel
- Por que 70% dos planejamentos estratégicos morrem
- Plano de ação executável

---

### 7.9 — Agente de Documentos

**Meta title:** `Agente de Documentos: repositório e workflows operados por IA | Orbit`
**Meta description:** `Repositório centralizado, workflows de aprovação, ciclo de vida da informação, assinaturas digitais. O Agente de Documentos opera a governança documental.`

**H1:** `Agente de Documentos: governança documental operada por IA`
**Subheadline:** `Repositório centralizado, workflows de aprovação, versionamento, assinaturas digitais e ciclo de vida da informação. O Agente de Documentos opera a governança documental — coordenado pela Olívia.`

**Áreas cobertas (pill):** `Documentos · Workflows`

**Capacidades (8):**
1. **Repositório centralizado** (`folder-tree`) — Estrutura hierárquica configurável por área e tipo.
2. **Categorias** (`tags`) — Classificação por tipo de documento, com políticas específicas.
3. **Workflows de aprovação** (`git-pull-request`) — Fluxo configurável de revisão e aprovação.
4. **Versionamento** (`history`) — Histórico completo de versões com data, autor e diff.
5. **Aprovações de documentos** (`check`) — Trilha auditável de quem aprovou e quando.
6. **Assinatura digital** (`pen-tool`) — Integração nativa com provedores de assinatura jurídica.
7. **Compartilhamento público** (`share-2`) — Links públicos auditáveis e revogáveis.
8. **Busca semântica** (`search`) — Pergunte em linguagem natural — Olívia encontra o documento.

**Integrações com outros agentes (4):**
- **Documentos + Comercial** → propostas e contratos gerados com dados do CRM
- **Documentos + Financeiro** → NFs e comprovantes ancorados aos lançamentos
- **Documentos + Processos** → POPs vinculados aos processos correspondentes
- **Documentos + R&S** → ofertas, NDA, contratos de admissão gerenciados

**Casos de uso (3):**
1. **Documentos espalhados em Drive + e-mail + WhatsApp** — Agente migra pra hub único com estrutura hierárquica clara.
2. **Time gasta horas procurando documento** — Busca semântica em linguagem natural reduz tempo de busca em 80%.
3. **Auditoria fiscal vai começar** — Agente garante trilha completa de aprovação, versionamento e compliance.

**FAQ (8):**
1. Substitui Notion ou Confluence? — Para empresa B2B brasileira que quer documentação integrada à operação, sim — com vantagem em workflows nativos com financeiro, processos, RH.
2. Tem busca semântica? — Sim. Olívia entende perguntas em linguagem natural e retorna o documento relevante com contexto.
3. Como assinatura digital funciona? — Integração nativa com DocuSign, ClickSign, Adobe Sign e provedores brasileiros.
4. Tem versionamento? — Sim. Histórico completo com diff entre versões.
5. Posso compartilhar documento externo? — Sim. Link público com auditoria de acesso, revogável a qualquer momento.
6. Workflow de aprovação tem prazo? — Sim. SLA por etapa, com escalonamento se estourar.
7. Suporta OCR de PDF? — Sim. PDFs e imagens viram texto pesquisável.
8. Quanto tempo pra consolidar documentação? — 3-6 meses pra empresa de médio porte, em fases.

**Blog relacionado (6 links):**
- Como centralizar a documentação da empresa
- Por que sua empresa não encontra documento crítico quando precisa
- Knowledge base corporativo: como escolher
- Como organizar os processos de uma empresa que cresceu rápido
- Como integrar sistemas empresariais
- Como mapear processos da empresa usando BPMN

---

### 7.10 — Agente de Riscos

**Meta title:** `Agente de Riscos: identificação e mitigação operados por IA | Orbit`
**Meta description:** `Identificação, classificação e mitigação de riscos — operacionais, financeiros, regulatórios. O Agente de Riscos opera governança coordenada pela Olívia.`

**H1:** `Agente de Riscos: gestão de risco operada por IA`
**Subheadline:** `Identifica, classifica, prioriza e monitora riscos operacionais, financeiros, regulatórios e estratégicos. O Agente de Riscos opera a governança de risco — com plano de ação, responsável nomeado e revisão periódica.`

**Áreas cobertas (pill):** `Riscos · Compliance`

**Capacidades (8):**
1. **Repositório de riscos** (`shield-alert`) — Catálogo central por categoria, área e impacto.
2. **Matriz de risco** (`grid`) — Probabilidade × impacto, com priorização visual.
3. **Plano de ação** (`list-checks`) — Ação mitigatória, responsável, prazo, indicador.
4. **Monitoramento contínuo** (`activity`) — Status do risco atualizado conforme operação.
5. **Relatórios de risco** (`file-text`) — Visão executiva pra board e compliance.
6. **Vinculação a processos** (`link`) — Risco amarrado ao processo onde se manifesta.
7. **Aprovações de risco** (`check-circle`) — Trilha auditável de quem aceitou risco e por quê.
8. **Detecção por Olívia** (`brain`) — IA identifica padrões de risco emergente baseados em operação.

**Integrações com outros agentes (4):**
- **Riscos + Financeiro** → riscos financeiros (inadimplência, fluxo de caixa) monitorados em tempo real
- **Riscos + Processos** → riscos vinculados ao processo onde se manifestam
- **Riscos + Projetos** → riscos do projeto registrados no plano de ação
- **Riscos + Estratégico** → riscos críticos viram pauta de comitê executivo

**Casos de uso (3):**
1. **Empresa cresceu sem mapear riscos** — Agente conduz mapeamento inicial em 30 dias com sessão estruturada por área.
2. **Compliance regulatório virou requisito** — Agente entrega trilha auditável pra LGPD, ISO, normas setoriais.
3. **Conselho/board exige relatório de risco trimestral** — Agente gera relatório executivo pronto, com matriz e plano de ação.

**FAQ (8):**
1. Funciona pra LGPD? — Sim. Riscos de privacidade, plano de ação, evidências, auditoria.
2. Atende ISO 9001/ISO 27001? — Sim. Estrutura compatível com requisitos das normas.
3. Como a IA detecta risco emergente? — Cruza indicadores operacionais e identifica padrões anômalos antes de virar crise.
4. Tem matriz de risco visual? — Sim. Probabilidade × impacto, configurável.
5. Posso aceitar risco com aprovação documentada? — Sim. Trilha auditável de aceitação consciente.
6. Riscos viram tarefas? — Plano de ação vira tarefas no painel de cada responsável.
7. Quem revisa o catálogo? — Liderança em ritual trimestral, com proposta de ajuste pelo Agente.
8. Em quanto tempo tenho mapeamento inicial? — 30-45 dias com sessões estruturadas por área.

**Blog relacionado (6 links):**
- Como organizar os processos de uma empresa que cresceu rápido
- Como criar indicadores que conectam com a operação
- Por que processos manuais estão travando o crescimento
- Como mapear processos da empresa usando BPMN
- Como integrar sistemas empresariais
- ERP integrado vs plataforma all-in-one

---

## 8. Cross-linking matrix (obrigatório)

### Cada página de agente linka pra:

**1. Os outros 9 agentes** (seção "Outros agentes do Time Olívia" — grid no rodapé)

**2. A pillar `/agentes-de-ia`** (breadcrumb + link em prosa: "veja o time completo")

**3. 4-6 artigos do blog relacionados** (seção "Conteúdos relacionados")

**4. A home `/`** (breadcrumb)

### Página pillar linka pra:

**1. Os 10 agentes específicos** (grid principal)

**2. 6-8 artigos do blog estratégicos** (incluindo "AI Operating System for Business", "IA agentic para CEO", "Orbit vs SAP/Salesforce/Microsoft")

**3. Home, blog index, contato** (navegação)

### Artigos do blog devem ser ATUALIZADOS pra linkar pras páginas de agente correspondentes:

| Artigo | Agente correspondente |
|---|---|
| Como tirar o planejamento estratégico do papel | Agente Estratégico |
| Gestão financeira integrada | Agente Financeiro |
| Como organizar a prospecção e o follow-up de vendas | Agente Comercial |
| Como mapear processos da empresa usando BPMN | Agente de Processos |
| Como reter talentos qualificados | Agente de Pessoas |
| Software de RH para empresa B2B | Agente de R&S |
| Como resolver a falta de comunicação entre setores | Agente de Reuniões |
| Como centralizar a documentação da empresa | Agente de Documentos |

Para os 42 artigos do blog, fazer pass de revisão adicionando 1-2 links pra página de agente correspondente.

---

## 9. Checklist de implementação para Claude Code

### Fase 1 — Setup e pillar (1-2 dias)

- [ ] Criar pasta `/public/agentes-de-ia/` e `/public/agentes/`
- [ ] Implementar `/public/agentes-de-ia/index.html` (pillar) seguindo template + copy desta seção
- [ ] Gerar OG image pillar (1200x630px) salvar em `/public/og/agentes-de-ia.jpg`
- [ ] Adicionar pillar ao sitemap.xml
- [ ] Adicionar link "Agentes de IA" no header/navegação da home
- [ ] Testar renderização e schemas com Google Rich Results Test

### Fase 2 — As 10 páginas específicas (3-5 dias)

Para cada um dos 10 agentes:
- [ ] Criar pasta `/public/agentes/{slug}/`
- [ ] Implementar `/public/agentes/{slug}/index.html` seguindo template + copy
- [ ] Implementar 3 schemas JSON-LD (Service, FAQPage, BreadcrumbList) com dados específicos
- [ ] Gerar OG image específica (1200x630px) salvar em `/public/og/agente-{slug}.jpg`
- [ ] Validar contraste, acessibilidade, foco visível
- [ ] Adicionar ao sitemap.xml
- [ ] Testar schemas no Google Rich Results Test

### Fase 3 — Cross-linking (1 dia)

- [ ] Adicionar seção "Conteúdos relacionados" em cada agente (4-6 links pro blog)
- [ ] Adicionar seção "Outros agentes do Time Olívia" em cada agente (9 links cruzados)
- [ ] Atualizar os 42 artigos do blog adicionando 1-2 links pras páginas de agente relevantes
- [ ] Atualizar a home com seção "Conheça o Time Olívia" linkando pra pillar

### Fase 4 — Publicação e indexação (1 dia)

- [ ] Publicar no Cloudflare Pages
- [ ] Submeter sitemap atualizado no Google Search Console
- [ ] Submeter sitemap no Bing Webmaster Tools
- [ ] Solicitar indexação manual de cada uma das 11 páginas no GSC
- [ ] Compartilhar pillar nas redes sociais Orbit (LinkedIn, Instagram) — gera primeiros backlinks sociais
- [ ] Monitorar Search Console por 7-14 dias pra ver primeiras impressões

### Fase 5 — Pós-publicação (semanas seguintes)

- [ ] Verificar AI Overview do Google em buscas relacionadas (a cada 2 semanas)
- [ ] Testar no ChatGPT/Claude/Perplexity buscas como "agente de IA para gestão financeira", "Orbit Gestão agente financeiro" — confirmar se citações começam a aparecer
- [ ] Iterar copy onde indicadores de CTR no SERP estiverem fracos
- [ ] Considerar criar artigos de blog adicionais reforçando cada agente

---

## 10. Notas finais pro Claude Code

### Design system

- **Cores:** background `#0D1117`, gold primário `#FFBA1A`, gold dark `#E6A200`, gold light `#FFCA4A`, text `#F5F5F0`, text muted `rgba(245,245,240,0.7)`, border `rgba(255,255,255,0.10)`
- **Tipografia:** Plus Jakarta Sans, pesos 400/500/600/700/800
- **Ícones:** Lucide (preferencial) + Font Awesome quando necessário
- **Tema:** Escuro por padrão. As páginas de agente seguem o tema das LPs existentes (`public/processos-variant-a/index.html` etc. como referência).
- **Espaçamentos:** `max-w-7xl`, padding `px-6`, gaps responsivos
- **Bordas:** `border border-white/10`, hover `border-[#FFBA1A]/40`

### Tom de voz

- B2B profissional, direto, sem corporativismo morto
- Frases curtas. Parágrafos de 2-4 linhas. Sem rodeio.
- "Você" sempre (o leitor é gestor/CEO)
- Negrito em pontos-chave (1-2 por seção, no máximo)
- Evitar "no mundo de hoje", "cada vez mais", "no cenário atual"
- Evitar emoji (exceto se cliente pedir explicitamente)

### Consistência

- Sempre escrever "Olívia" com acento agudo
- Sempre "Time Olívia" como termo do grupo de agentes
- Sempre "Agente {Nome}" como nomenclatura individual
- "Orbit Gestão" como marca completa (vs "Orbit" coloquial)
- "Grupo GSN" com "G" maiúsculo

### Anti-padrões

- ❌ Não citar valores de ICP em número (R$500k, número de funcionários)
- ❌ Não comparar com concorrentes nomeados nas páginas de agente (deixar isso pro artigo `Orbit vs SAP/Salesforce/Microsoft` no blog)
- ❌ Não usar stock photo de pessoas sorrindo em escritório
- ❌ Não adicionar texto nas imagens geradas
- ❌ Não usar gradientes ou efeitos glow (manter flat design)

### Quando tiver dúvida

Consultar:
- `docs/BLOG_PLAYBOOK.md` — convenções do blog
- `CLAUDE.md` — contexto geral do projeto
- `public/pessoas-variant-a/index.html` — referência visual de LP existente

**Boa execução. Manda bala.**
