# Agentes de IA — Playbook para implementação no Claude Code

> **Para o Claude Code do projeto:** este documento contém TUDO o que você precisa pra criar a página pillar `/agentes-de-ia` + 12 páginas de agentes + 4 páginas de módulos. Copy pronta, template HTML, schemas, técnicas de SEO/GEO, internal linking. Execute em ordem.

---

## 1. Contexto estratégico

### Por que esse projeto existe

O ChatGPT já cita a Orbit espontaneamente como representante da categoria emergente "AI Operating System for Business" — junto com SAP, Salesforce e Microsoft. A análise de busca real feita por um cliente mostrou que LLMs reconhecem a Orbit como "time de agentes especializados coordenados pela Olívia".

**Problema atual:** a Orbit não tem páginas dedicadas a cada agente, então quem busca "IA para gestão de indicadores", "agente de IA para CRM" ou "IA para pesquisa de clima" não encontra resposta específica — cai na home genérica e desiste.

**Solução:** criar 12 páginas específicas (uma por agente) + 4 páginas de módulos + 1 página pillar — replicando o padrão estrutural que SAP, Salesforce e Microsoft já usam.

### Estrutura final

- 1 página pillar: `/agentes-de-ia`
- 12 páginas de agentes: `/agentes/{slug}`
- 4 páginas de módulos: `/modulos/{slug}`
- **Total: 17 páginas novas**

---

## 2. Arquitetura — URLs, arquivos, naming

### Estrutura de URLs e arquivos

```
public/
├── agentes-de-ia/
│   └── index.html                              ← pillar
├── agentes/
│   ├── estrategico/index.html                  ← Agente Estratégico
│   ├── processos/index.html                    ← Agente de Processos
│   ├── pessoas/index.html                      ← Agente de Pessoas
│   ├── indicadores/index.html                  ← Agente de Indicadores
│   ├── riscos/index.html                       ← Agente de Riscos
│   ├── treinamento/index.html                  ← Agente de Treinamento
│   ├── oportunidades/index.html                ← Agente de Oportunidades
│   ├── documentos/index.html                   ← Agente de Documentos
│   ├── comercial/index.html                    ← Agente Comercial
│   ├── problemas-operacionais/index.html       ← Agente de Problemas
│   ├── reunioes/index.html                     ← Agente de Reuniões
│   └── pesquisas/index.html                    ← Agente de Pesquisas
└── modulos/
    ├── financeiro/index.html                   ← Módulo Financeiro
    ├── recrutamento-selecao/index.html         ← Módulo R&S
    ├── projetos/index.html                     ← Módulo Projetos
    └── compras/index.html                      ← Módulo Compras
```

### Os 12 agentes oficiais

| # | URL slug | Nome canônico | Cobertura |
|---|---|---|---|
| 1 | `estrategico` | **Agente Estratégico** | Plano estratégico, missão/visão/valores, SWOT, objetivos |
| 2 | `processos` | **Agente de Processos** | Mapeamento BPMN, instruções de trabalho, execução |
| 3 | `pessoas` | **Agente de Pessoas** | Colaboradores, cargos, organograma, PDI, departamentos |
| 4 | `indicadores` | **Agente de Indicadores** | KPIs, dashboards, conectores, alertas |
| 5 | `riscos` | **Agente de Riscos** | Catálogo, matriz, planos de ação, compliance |
| 6 | `treinamento` | **Agente de Treinamento** | Trilhas formais, microlearning, certificações |
| 7 | `oportunidades` | **Agente de Oportunidades** | Identificação, classificação, repositório central |
| 8 | `documentos` | **Agente de Documentos** | Repositório, workflows, versionamento, assinaturas |
| 9 | `comercial` | **Agente Comercial** | CRM, pipeline, leads, automações, vendas B2B |
| 10 | `problemas-operacionais` | **Agente de Problemas Operacionais** | RCA, hipóteses, planos de ação, resolução |
| 11 | `reunioes` | **Agente de Reuniões** | Pauta, atas, transcrição, extração de tarefas |
| 12 | `pesquisas` | **Agente de Pesquisas** | Clima, satisfação, engajamento, análise por IA |

**Olívia = IA coordenadora central**, orquestra os 12 (não conta como agente próprio).

### Os 4 módulos adicionais

| URL slug | Nome canônico | Função |
|---|---|---|
| `financeiro` | **Módulo Financeiro** | Contas a pagar/receber, fluxo de caixa, DRE, orçamento, conciliação |
| `recrutamento-selecao` | **Módulo Recrutamento e Seleção** | Vagas, candidatos, triagem CV por IA, etapas, scorecards |
| `projetos` | **Módulo Projetos** | Gantt, dependências, membros, automações |
| `compras` | **Módulo Compras** | Pedidos, RFQ, fornecedores, workflows |

---

## 3. Template HTML padrão (usado em TODAS as páginas)

> A página pillar `/agentes-de-ia/index.html` já existe como referência funcional. Replicar o mesmo padrão estrutural pras 16 páginas restantes (12 agentes + 4 módulos), mudando o conteúdo conforme as seções 7 e 8 abaixo.

### Estrutura semântica padrão por página

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO BÁSICO -->
  <title>{{H1 do agente}} | Orbit Gestão</title>
  <meta name="description" content="{{Meta description específica}}">
  <link rel="canonical" href="https://orbitgestao.com.br/{{tipo}}/{{slug}}">

  <!-- OPEN GRAPH -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="{{H1 do agente}}">
  <meta property="og:description" content="{{Meta description}}">
  <meta property="og:image" content="https://orbitgestao.com.br/og/{{tipo}}-{{slug}}.jpg">
  <meta property="og:url" content="https://orbitgestao.com.br/{{tipo}}/{{slug}}">
  <meta property="og:locale" content="pt_BR">

  <!-- TWITTER CARD -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{H1 do agente}}">
  <meta name="twitter:description" content="{{Meta description}}">
  <meta name="twitter:image" content="https://orbitgestao.com.br/og/{{tipo}}-{{slug}}.jpg">

  <!-- SCHEMA.ORG (3 schemas por página) -->
  <script type="application/ld+json">{{ Service schema }}</script>
  <script type="application/ld+json">{{ FAQPage schema }}</script>
  <script type="application/ld+json">{{ BreadcrumbList schema }}</script>

  <!-- DESIGN SYSTEM (mesmo da pillar e demais LPs) -->
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
    html { scroll-behavior: smooth; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); }
  </style>
</head>

<body class="bg-[#0D1117] text-[#F5F5F0] antialiased">

  <!-- BREADCRUMB -->
  <nav aria-label="Breadcrumb" class="max-w-7xl mx-auto px-6 py-4 text-sm">
    <ol class="flex items-center gap-2 text-white/60">
      <li><a href="/" class="hover:text-[#FFBA1A]">Início</a></li>
      <li>›</li>
      <li><a href="/agentes-de-ia" class="hover:text-[#FFBA1A]">Agentes de IA</a></li>
      <li>›</li>
      <li class="text-white" aria-current="page">{{Nome do agente}}</li>
    </ol>
  </nav>

  <!-- HERO -->
  <header class="max-w-7xl mx-auto px-6 pt-12 pb-20">
    <div class="inline-flex items-center gap-2 bg-[#FFBA1A]/10 border border-[#FFBA1A]/30 text-[#FFBA1A] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-8">
      <i data-lucide="sparkles" class="w-3 h-3"></i>
      Time Olívia · {{Áreas cobertas}}
    </div>

    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
      {{H1 com keyword principal}}<br>
      <span class="text-[#FFBA1A]">{{Final em destaque}}</span>
    </h1>

    <p class="text-xl md:text-2xl text-white/80 max-w-3xl mb-10 leading-relaxed">
      {{Subheadline com keywords secundárias}}
    </p>

    <div class="flex flex-wrap gap-4 items-center">
      <a href="#demo" class="bg-[#FFBA1A] hover:bg-[#E6A200] text-[#0D1117] font-bold px-8 py-4 rounded-lg transition">
        Ver o {{Nome}} em ação
      </a>
      <a href="#capacidades" class="text-white/80 hover:text-white font-medium px-4 py-4 transition">
        Conheça as capacidades ↓
      </a>
    </div>
  </header>

  <!-- 1. O QUE FAZ (8 capacidades em grid 4x2) -->
  <section id="capacidades" class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">O que o {{Nome}} faz</h2>
    <p class="text-lg text-white/70 max-w-3xl mb-12">{{1-2 frases de contexto}}</p>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- 8 cards de capacidade, cada um com icon + título + descrição 15-25 palavras -->
    </div>
  </section>

  <!-- 2. INTEGRAÇÕES (4 cards explicando combinação com outros agentes) -->
  <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-12">Como o {{Nome}} opera com os outros agentes</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <!-- 4 cards: "Agente A + Agente B → caso de uso" -->
    </div>
  </section>

  <!-- 3. CENÁRIOS DE USO (3 cenários numerados) -->
  <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-12">3 cenários onde o {{Nome}} entrega mais valor</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <!-- 3 cards numerados (01, 02, 03) com título + descrição 40-60 palavras -->
    </div>
  </section>

  <!-- 4. CTA DEMO -->
  <section id="demo" class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <div class="bg-gradient-to-br from-[#FFBA1A]/10 to-transparent border border-[#FFBA1A]/30 rounded-3xl p-10 md:p-16 text-center">
      <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Quer ver o {{Nome}} operando na sua empresa?</h2>
      <p class="text-xl text-white/80 max-w-2xl mx-auto mb-10">
        Demonstração de 30 minutos com cenário real do seu negócio.
      </p>
      <a href="#demo-form" class="inline-block bg-[#FFBA1A] hover:bg-[#E6A200] text-[#0D1117] font-bold text-lg px-10 py-5 rounded-lg transition">
        Agendar demonstração →
      </a>
    </div>
  </section>

  <!-- 5. FAQ (8 perguntas via <details>) -->
  <section class="max-w-4xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-12 text-center">Perguntas frequentes sobre o {{Nome}}</h2>
    <div class="space-y-4">
      <!-- 8 details/summary com pergunta + resposta 40-80 palavras -->
    </div>
  </section>

  <!-- 6. CONTEÚDOS RELACIONADOS (6 links blog) -->
  <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-2xl font-bold mb-8">Conteúdos relacionados ao {{Nome}}</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 6 cards de artigos do blog correspondentes -->
    </div>
  </section>

  <!-- 7. OUTROS AGENTES (11 cards cruzados — todos exceto o atual) -->
  <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
    <h2 class="text-2xl font-bold mb-8">Os outros agentes do Time Olívia</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- 11 cards pequenos com ícone + nome -->
    </div>
  </section>

  <script>lucide.createIcons();</script>
</body>
</html>
```

---

## 4. SEO/GEO checklist obrigatório (por página)

### On-page SEO
- [ ] `<title>` com keyword principal + brand (60 chars max)
- [ ] `<meta name="description">` (155 chars max)
- [ ] `<link rel="canonical">` apontando pra URL final
- [ ] H1 único com keyword principal
- [ ] H2/H3 hierárquicos com keywords secundárias
- [ ] Image alt text descritivo
- [ ] URLs amigáveis (sem .html, sem query strings)

### Open Graph + Twitter Card
- [ ] OG image dedicada por página (1200x630px) em `/public/og/`
- [ ] Tags og:type, og:title, og:description, og:image, og:url, og:locale
- [ ] Tags twitter:card, twitter:title, twitter:description, twitter:image

### Schema.org JSON-LD (3 por página)
- [ ] `Service` schema
- [ ] `FAQPage` schema
- [ ] `BreadcrumbList` schema

### Estrutura semântica
- [ ] HTML5: header, main, nav, section, article
- [ ] `<nav aria-label="Breadcrumb">`
- [ ] `<details>/<summary>` na FAQ (SEO + acessível)
- [ ] `aria-current="page"` no breadcrumb atual

### Internal linking obrigatório
- [ ] Cada agente linka pros outros 11 agentes (cross-links)
- [ ] Cada agente linka pra 4-6 artigos do blog
- [ ] Cada agente linka pra página pillar `/agentes-de-ia`
- [ ] Cada módulo linka pros 12 agentes principais
- [ ] Página pillar linka pras 12 + 4 páginas

### Performance
- [ ] Plus Jakarta Sans com `display=swap`
- [ ] Lazy loading em imagens
- [ ] Sem JS pesado na hero

### Acessibilidade
- [ ] Contraste WCAG AA validado
- [ ] aria-label em ícones decorativos
- [ ] Hierarquia de heading correta (H1 → H2 → H3)
- [ ] Foco visível em todos os links

### Sitemap e indexação
- [ ] Adicionar 17 URLs ao `sitemap.xml`
- [ ] Ping no Google Search Console + Bing Webmaster Tools

---

## 5. Schema.org JSON-LD — templates exatos

### Service (cole no `<head>` de cada agente/módulo)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{{Nome do agente/módulo}}",
  "alternateName": ["{{Variação 1}}", "{{Variação 2}}"],
  "description": "{{Meta description}}",
  "provider": {
    "@type": "Organization",
    "name": "Orbit Gestão",
    "url": "https://orbitgestao.com.br"
  },
  "serviceType": "AI Operating System for Business — {{Área}}",
  "areaServed": { "@type": "Country", "name": "Brasil" },
  "audience": { "@type": "BusinessAudience", "audienceType": "Empresas B2B brasileiras" },
  "category": "Business Software with AI Agents",
  "url": "https://orbitgestao.com.br/{{tipo}}/{{slug}}",
  "isRelatedTo": [
    { "@type": "Service", "name": "Olívia — IA Coordenadora", "url": "https://orbitgestao.com.br/agentes-de-ia" }
  ]
}
```

### FAQPage (com as 8 perguntas)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "{{Pergunta 1}}", "acceptedAnswer": { "@type": "Answer", "text": "{{Resposta 1}}" } }
    /* 8 perguntas */
  ]
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://orbitgestao.com.br" },
    { "@type": "ListItem", "position": 2, "name": "Agentes de IA", "item": "https://orbitgestao.com.br/agentes-de-ia" },
    { "@type": "ListItem", "position": 3, "name": "{{Nome}}", "item": "https://orbitgestao.com.br/{{tipo}}/{{slug}}" }
  ]
}
```

---

## 6. COPY — Página Pillar `/agentes-de-ia`

> **Já existe implementada em `public/agentes-de-ia/index.html`.** Usar como referência funcional e visual. Se precisar refazer, copy abaixo.

**Meta title (60 chars):** `Time Olívia: 12 agentes de IA que operam sua gestão | Orbit Gestão`

**Meta description (155 chars):** `Conheça os 12 agentes de IA da Orbit, coordenados pela Olívia. Estratégico, processos, pessoas, indicadores, riscos, treinamento, oportunidades e mais.`

**H1:** `Time Olívia: 12 agentes de IA que operam a sua gestão 24/7.`

**Pill:** `Construído sobre 30 anos de metodologia GSN — agora operado por IA`

**Subheadline:** `A Olívia é a IA coordenadora central da Orbit. Por trás dela, 12 agentes especialistas cuidam de cada área da sua empresa — coordenados, integrados e construídos sobre a metodologia consolidada do Grupo GSN. Você decide. Eles executam.`

**Stats no hero:**
- 30 anos de metodologia GSN
- 8.000+ empresas atendidas
- 12 agentes de IA

**Grid dos 12 agentes:** ver seção 7 abaixo (descrições curtas pra cards).

**Grid dos 4 módulos:** ver seção 8 abaixo.

---

## 7. COPY — As 12 páginas de agentes

> **Padrão por página:** meta tags + H1 + subheadline + 8 capacidades + 4 integrações + 3 cenários + 8 FAQs + 6 links blog.
> **Pra cada agente abaixo,** Claude Code precisa: criar `public/agentes/{slug}/index.html` seguindo o template da seção 3, preencher com a copy específica abaixo, configurar os 3 schemas JSON-LD.

---

### 7.1 — Agente Estratégico

**URL:** `/agentes/estrategico`
**Meta title:** `Agente Estratégico: planejamento e execução operados por IA | Orbit`
**Meta description:** `Plano estratégico, missão/visão/valores, SWOT e objetivos — o Agente Estratégico transforma plano de gaveta em execução semanal monitorada pela Olívia.`

**H1:** `Agente Estratégico: planejamento e execução estratégica operados por IA`
**Subheadline:** `Tire o planejamento do PDF. O Agente Estratégico opera o ciclo completo — missão, visão, valores, SWOT, objetivos, plano de ação e revisão — coordenado pela Olívia, junto com a sua liderança.`

**Pill:** `Time Olívia · Estratégia`

**8 capacidades:**
1. **Missão, Visão e Valores** (`compass`) — Documenta e mantém vivo o norte estratégico, citado nas decisões diárias.
2. **Análise SWOT** (`grid-3x3`) — Estrutura forças, fraquezas, oportunidades e ameaças com base em dado real da operação.
3. **Objetivos Estratégicos** (`target`) — Desdobra prioridades em metas trimestrais com responsável e indicador.
4. **Plano de Ação** (`list-checks`) — Cada objetivo vira plano com prazo, dono e prioridade — auditável.
5. **Política & Escopo** (`scroll`) — Documenta governança estratégica e escopo decisório.
6. **Revisão estratégica** (`refresh-cw`) — Cadência periódica de revisão com sugestões automáticas de ajuste.
7. **Recomendações da IA** (`brain`) — A Olívia sugere ajustes estratégicos baseados em desempenho e contexto.
8. **Dashboard estratégico** (`layout-dashboard`) — Visão consolidada pronta pra reunião de board e comitê.

**4 integrações:**
- **Estratégico + Indicadores** → cada objetivo do plano vira KPI monitorado em tempo real
- **Estratégico + Oportunidades** → oportunidades estratégicas identificadas viram input do próximo ciclo
- **Estratégico + Pessoas** → competências necessárias por objetivo mapeadas em PDIs do time
- **Estratégico + Reuniões** → comitê executivo registra decisões diretamente conectadas ao plano

**3 cenários:**
1. **Empresa em crescimento sem estratégia clara** — Agente conduz construção do plano em 30 dias e estabelece ritmo de execução semanal.
2. **Empresa madura com plano que não sai do papel** — Agente reativa cadência de revisão, conecta indicadores e responsabiliza donos.
3. **Empresa preparando captação ou venda** — Agente prepara narrativa estratégica com indicadores que investidores e compradores procuram.

**8 FAQs:**
1. O Agente Estratégico substitui consultor de estratégia? — Não. Consultor traz visão externa pontual. Agente opera execução contínua. São complementares.
2. Como o Agente conecta estratégia com operação? — Cada objetivo do plano vira meta de indicador, que puxa dado da operação real. Conexão automática.
3. Que metodologia o Agente usa? — A Orbit aplica a metodologia consolidada do Grupo GSN, refinada em 30 anos e mais de 8.000 empresas.
4. Quem revisa o plano? — A liderança revisa em ritual periódico. O Agente prepara: status, desvios, sugestões.
5. Posso usar OKR no Agente Estratégico? — Sim. OKR, BSC ou framework próprio. O Agente é agnóstico de metodologia.
6. Como funciona a SWOT na Orbit? — Quadrantes editáveis colaborativamente, com recomendações estratégicas geradas pela IA.
7. O Agente identifica oportunidades sozinho? — Sim, em conjunto com o Agente de Oportunidades. Cruza indicadores e contexto.
8. Em quanto tempo vejo resultado? — Plano executável em 30 dias. Cadência sustentável em 60 dias. Impacto em indicadores em 90 dias.

**6 links blog:**
- Como tirar o planejamento estratégico do papel
- Por que 70% dos planejamentos estratégicos morrem no terceiro mês
- Plano de ação executável
- Como criar indicadores que conectam com a operação
- IA agentic para CEO
- AI Operating System for Business

---

### 7.2 — Agente de Processos

**URL:** `/agentes/processos`
**Meta title:** `Agente de Processos: BPMN e instruções de trabalho operados por IA | Orbit`
**Meta description:** `Mapeamento BPMN, execução, instruções de trabalho e ciclo de vida da informação. O Agente de Processos da Orbit transforma processo manual em workflow inteligente.`

**H1:** `Agente de Processos: BPMN, instruções de trabalho e execução operados por IA`
**Subheadline:** `Mapeie processos em BPMN, gere instruções de trabalho, distribua tarefas e monitore execução em tempo real — tudo coordenado pelo Agente de Processos junto com a Olívia.`

**Pill:** `Time Olívia · Processos`

**8 capacidades:**
1. **Mapeamento BPMN** (`workflow`) — Editor visual BPMN 2.0 com geração assistida por IA.
2. **Instruções de Trabalho** (`book-open`) — POPs versionados, vinculados ao processo correspondente.
3. **Ciclo de Vida da Informação** (`recycle`) — Política de criação, revisão, arquivamento e descarte.
4. **Execução de processos** (`play-circle`) — Cada processo roda como workflow com responsável e prazo.
5. **AI Generate Processes** (`brain`) — Olívia entrevista o time e gera mapeamento BPMN inicial.
6. **AI Generate BPMN** (`zap`) — Atualização e refinamento de diagrama automaticamente.
7. **Tarefas conectadas** (`check-square`) — Tarefas geradas a partir dos processos com SLA.
8. **Histórico e versionamento** (`history`) — Cada versão do processo é auditável.

**4 integrações:**
- **Processos + Comercial** → fechamento de venda dispara processo de onboarding
- **Processos + Documentos** → POPs vinculados aos processos correspondentes
- **Processos + Indicadores** → cada processo gera KPI de SLA, taxa de erro, tempo de execução
- **Processos + Problemas Operacionais** → exceções viram problemas analisados pela RCA

**3 cenários:**
1. **Empresa cresceu rápido sem processo padronizado** — Agente entrevista time, gera BPMN inicial, ancora execução em sistema em 30 dias.
2. **Processo existe em PDF mas ninguém segue** — Agente leva o POP pra dentro do workflow operacional, time vê passo a passo enquanto executa.
3. **Empresa com gargalo recorrente em processo específico** — Agente identifica etapa que mais atrasa, propõe automação ou redesenho.

**8 FAQs:**
1. Preciso saber BPMN pra usar? — Não. Agente gera o diagrama por entrevista conversacional. Você revisa.
2. Substitui Bizagi ou Camunda? — Para B2B brasileira de médio porte, sim. Para processos super-complexos de empresa grande, complementa.
3. Como aderência aos processos sobe? — Processo executado dentro do sistema (não PDF). Time vê próximo passo enquanto trabalha.
4. Posso versionar processos? — Sim. Cada versão é histórico auditável, com data de revisão e responsável.
5. Identifica gargalo automaticamente? — Sim. Cruza dados de execução e identifica etapas com tempo médio ou taxa de erro alta.
6. Funciona pra processo industrial? — Bom pra processo administrativo, comercial, financeiro, RH. Industrial pesado pode complementar com MES.
7. Cria checklist automaticamente? — Sim. AI Generate Checklist transforma instrução em checklist executável.
8. Tempo até primeiro processo no ar? — 7-14 dias por processo crítico.

**6 links blog:**
- Como mapear processos da empresa usando BPMN
- Por que ninguém na empresa segue processo definido
- Software de BPMS: como escolher
- Como organizar os processos de uma empresa que cresceu rápido
- Por que processos manuais estão travando o crescimento
- Como automatizar processos da empresa

---

### 7.3 — Agente de Pessoas

**URL:** `/agentes/pessoas`
**Meta title:** `Agente de Pessoas: RH, PDI e organograma operados por IA | Orbit`
**Meta description:** `Colaboradores, cargos, organograma, PDI e departamentos. O Agente de Pessoas opera a gestão de RH estratégico junto com seu time, coordenado pela Olívia.`

**H1:** `Agente de Pessoas: RH, desenvolvimento e cultura operados por IA`
**Subheadline:** `Colaboradores, cargos, organograma, departamentos, PDI do gestor e do colaborador. O Agente de Pessoas opera o RH estratégico — enquanto sua equipe foca em cultura, liderança e conversas difíceis.`

**Pill:** `Time Olívia · Pessoas`

**8 capacidades:**
1. **Colaboradores** (`users`) — Cadastro completo, ciclo de vida e histórico.
2. **Cargos e Organograma** (`network`) — Estrutura organizacional viva, com responsabilidades.
3. **PDI (visão gestor)** (`target`) — Plano de desenvolvimento por colaborador, com metas e revisão.
4. **PDI (visão colaborador)** (`book`) — Cada pessoa acessa seu plano, atualiza progresso, registra aprendizado.
5. **Departamentos** (`building-2`) — Estrutura por área, com líder, integrantes e KPIs.
6. **Localidades** (`map-pin`) — Multi-unidade, multi-país, com regras locais.
7. **Generate PDI Recommendation** (`brain`) — Olívia sugere PDI baseado em perfil, performance e aspiração.
8. **Avaliação de competências** (`star`) — Skills, gaps, planejamento de evolução.

**4 integrações:**
- **Pessoas + Estratégico** → competências necessárias por objetivo estratégico mapeadas em PDIs
- **Pessoas + Treinamento** → PDIs alimentam trilhas de aprendizado individualizadas
- **Pessoas + Processos** → responsabilidade em processo vinculada a colaborador específico
- **Pessoas + Reuniões** → ações de 1:1 registradas em reuniões viram tarefas no PDI

**3 cenários:**
1. **Empresa perdendo talento sem entender por quê** — Agente cruza sinais (engajamento, feedback, atividade) e identifica risco de saída antes.
2. **PDI virou ritual anual de RH** — Agente conduz cadência periódica viva, sugere ações, mede execução.
3. **Empresa multi-unidade sem visão consolidada de RH** — Agente entrega dashboard único: turnover, eNPS, headcount por unidade.

**8 FAQs:**
1. Substitui Convenia ou Gupy? — Para B2B de médio porte focada em RH estratégico (não só folha), sim — com vantagem em integração.
2. Como detecta risco de saída? — Combina indicadores comportamentais com padrão histórico de desligamentos.
3. Funciona pra empresa multi-unidade? — Sim, com regras de visibilidade e governança por unidade.
4. Tem app pra colaborador? — Sim. PDI, organograma, departamentos — mobile-first.
5. Integra com folha de pagamento? — Sim, via API e conectores.
6. Quem cria o PDI? — Líder e colaborador cocriam. Agente sugere conteúdo baseado em perfil.
7. Como mede o engajamento? — Combina dados do Agente de Reuniões, Pesquisas e atividade nas plataformas.
8. Tempo até redução de turnover? — 6-12 meses com PDI vivo e ritual de 1:1 instituído.

**6 links blog:**
- Como reter talentos qualificados na sua empresa
- Por que sua empresa perde os melhores talentos
- Software de RH para empresa B2B: como escolher
- Como criar PDI que efetivamente funciona
- Por que treinamento corporativo não vira mudança real
- Plataforma de treinamento corporativo

---

### 7.4 — Agente de Indicadores

**URL:** `/agentes/indicadores`
**Meta title:** `Agente de Indicadores: KPIs e dashboards operados por IA | Orbit`
**Meta description:** `Crie, conecte e monitore KPIs em tempo real. Dashboards executivos, alertas inteligentes e insights da Olívia. O Agente de Indicadores opera a gestão por dados.`

**H1:** `Agente de Indicadores: KPIs e dashboards operados por IA em tempo real`
**Subheadline:** `Cada indicador conectado à operação real. Dashboards atualizados automaticamente. Alertas quando algo desvia. O Agente de Indicadores transforma planilha morta em ferramenta de gestão viva.`

**Pill:** `Time Olívia · Indicadores`

**8 capacidades:**
1. **Indicadores configuráveis** (`activity`) — Crie qualquer KPI com fórmula, periodicidade e meta.
2. **Conectores** (`plug`) — Puxe dado direto de CRM, financeiro, processos, RH, sistemas externos.
3. **Dashboards executivos** (`layout-dashboard`) — Visões customizáveis por papel, área, projeto.
4. **Alertas automáticos** (`bell-ring`) — Notificação quando KPI desvia da meta ou da faixa esperada.
5. **Drill-down** (`zoom-in`) — Clique no número e veja a origem na operação.
6. **Comparação histórica** (`history`) — vs mês anterior, ano anterior, meta, benchmark.
7. **Insights da Olívia** (`brain`) — Anomalias detectadas, sugestões de ação contextual.
8. **Mobile-first** (`smartphone`) — Acompanhe os principais indicadores no celular.

**4 integrações:**
- **Indicadores + Estratégico** → cada objetivo do plano vira KPI monitorado
- **Indicadores + Processos** → SLA, taxa de erro e tempo de execução de cada processo
- **Indicadores + Comercial** → conversão por etapa, ticket médio, ciclo de venda
- **Indicadores + Financeiro** → DRE em tempo real, fluxo de caixa, margem por linha

**3 cenários:**
1. **Empresa com indicadores no Excel atualizados todo mês** — Agente conecta dados diretamente da operação, atualização passa a ser em tempo real.
2. **Liderança não confia nos números** — Cada indicador tem trilha auditável até a transação original.
3. **CEO quer ver a empresa inteira em uma tela** — Dashboard executivo consolida indicadores estratégicos, financeiros, comerciais, operacionais.

**8 FAQs:**
1. Substitui Power BI ou Tableau? — Para B2B brasileira de médio porte focada em gestão integrada, sim — com vantagem em conexão nativa.
2. Os indicadores são realmente tempo real? — Sim. Eventos da operação atualizam os KPIs instantaneamente.
3. Posso criar qualquer indicador? — Sim. Fórmula customizável, fontes múltiplas, periodicidades.
4. Tem alertas no celular? — Sim. App mobile com notificações inteligentes.
5. Como evito "vanity metrics"? — Olívia sugere KPIs conectados a decisão real, não vaidade.
6. Posso compartilhar dashboards externos? — Sim. Links públicos auditáveis e revogáveis.
7. Integra com Power BI? — Sim, exporta dado pra Power BI/Tableau quando necessário.
8. Tempo até primeiros KPIs em tempo real? — 7-14 dias dos KPIs críticos.

**6 links blog:**
- Como criar indicadores que conectam com a operação
- Por que seus indicadores não mostram a realidade da empresa
- Dashboard de gestão empresarial: como escolher
- Plano de ação executável
- Como tirar o planejamento estratégico do papel
- IA agentic para CEO

---

### 7.5 — Agente de Riscos

**URL:** `/agentes/riscos`
**Meta title:** `Agente de Riscos: identificação e mitigação operadas por IA | Orbit`
**Meta description:** `Identificação, classificação, plano de ação e monitoramento de riscos. O Agente de Riscos opera governança operacional, financeira, regulatória coordenado pela Olívia.`

**H1:** `Agente de Riscos: gestão de risco operada por IA`
**Subheadline:** `Identifica, classifica, prioriza e monitora riscos operacionais, financeiros, regulatórios e estratégicos. O Agente de Riscos opera a governança de risco — com plano de ação, responsável nomeado e revisão periódica.`

**Pill:** `Time Olívia · Riscos`

**8 capacidades:**
1. **Repositório de riscos** (`shield-alert`) — Catálogo central por categoria, área e impacto.
2. **Matriz de risco** (`grid`) — Probabilidade × impacto, com priorização visual.
3. **Plano de ação** (`list-checks`) — Ação mitigatória, responsável, prazo, indicador.
4. **Monitoramento contínuo** (`activity`) — Status do risco atualizado conforme operação.
5. **Relatórios de risco** (`file-text`) — Visão executiva pra board e compliance.
6. **Vinculação a processos** (`link`) — Risco amarrado ao processo onde se manifesta.
7. **Aprovações de risco** (`check-circle`) — Trilha auditável de quem aceitou risco e por quê.
8. **Detecção por Olívia** (`brain`) — IA identifica padrões de risco emergente.

**4 integrações:**
- **Riscos + Processos** → riscos vinculados aos processos onde se manifestam
- **Riscos + Indicadores** → riscos críticos monitorados como KPIs vivos
- **Riscos + Estratégico** → riscos críticos viram pauta de comitê executivo
- **Riscos + Documentos** → evidências e relatórios anexados de forma auditável

**3 cenários:**
1. **Empresa cresceu sem mapear riscos** — Agente conduz mapeamento inicial em 30 dias com sessão estruturada.
2. **Compliance regulatório virou requisito** — Agente entrega trilha auditável para LGPD, ISO, normas setoriais.
3. **Board exige relatório de risco trimestral** — Agente gera relatório executivo pronto, com matriz e plano de ação.

**8 FAQs:**
1. Funciona pra LGPD? — Sim. Riscos de privacidade, plano de ação, evidências, auditoria.
2. Atende ISO 9001/ISO 27001? — Sim. Estrutura compatível com requisitos das normas.
3. Como a IA detecta risco emergente? — Cruza indicadores operacionais e identifica padrões anômalos.
4. Tem matriz de risco visual? — Sim. Probabilidade × impacto, configurável.
5. Posso aceitar risco com aprovação documentada? — Sim. Trilha auditável de aceitação consciente.
6. Riscos viram tarefas? — Plano de ação vira tarefas no painel de cada responsável.
7. Quem revisa o catálogo? — Liderança em ritual periódico, com proposta de ajuste pelo Agente.
8. Tempo até mapeamento inicial? — 30-45 dias com sessões estruturadas por área.

**6 links blog:**
- Como organizar os processos de uma empresa que cresceu rápido
- Como criar indicadores que conectam com a operação
- Por que processos manuais estão travando o crescimento
- Como mapear processos da empresa usando BPMN
- ERP integrado vs plataforma all-in-one
- AI Operating System for Business

---

### 7.6 — Agente de Treinamento

**URL:** `/agentes/treinamento`
**Meta title:** `Agente de Treinamento: LMS e aprendizagem aplicada operados por IA | Orbit`
**Meta description:** `Trilhas formais, microlearning, certificações, acompanhamento de aprendizagem aplicada. O Agente de Treinamento conecta capacitação à operação real.`

**H1:** `Agente de Treinamento: capacitação aplicada operada por IA`
**Subheadline:** `Trilhas formais, microlearning, certificações e gestão de aprendizagem aplicada. O Agente de Treinamento garante que o conhecimento vire mudança comportamental — não certificado guardado na gaveta.`

**Pill:** `Time Olívia · Treinamento`

**8 capacidades:**
1. **Trilhas formais** (`graduation-cap`) — Cursos estruturados com módulos, avaliações, certificação.
2. **Microlearning** (`zap`) — Conteúdo curto, contextual, just-in-time.
3. **Certificações** (`award`) — Registro auditável de qualificações.
4. **Matrículas em massa** (`users-2`) — Atribuição automática por cargo, área, PDI.
5. **Progresso individual** (`trending-up`) — Acompanhamento por colaborador.
6. **Avaliações** (`clipboard-check`) — Quiz, prova, recuperação, certificação condicionada.
7. **Mídia mista** (`play`) — Vídeo, texto, áudio, screencast — múltiplos formatos.
8. **Aplicação prática** (`tool`) — Conecta o que foi aprendido ao projeto/processo real.

**4 integrações:**
- **Treinamento + Pessoas** → PDI alimenta trilha de aprendizado personalizada
- **Treinamento + Indicadores** → KPI de progresso de capacitação no dashboard executivo
- **Treinamento + Processos** — POP da empresa vira material de treinamento automático
- **Treinamento + R&S** → onboarding com trilha customizada pra novo colaborador

**3 cenários:**
1. **Treinamento isolado virou evento sem aplicação** — Agente conecta cada treinamento a projeto/processo onde será aplicado.
2. **Empresa quer escalar conhecimento de especialistas** — Agente captura conhecimento tácito em trilhas reproduzíveis.
3. **Onboarding de novos colaboradores demora 90+ dias** — Agente acelera adoção em 30-45 dias com microlearning aplicado.

**8 FAQs:**
1. Substitui LMS dedicado tipo Moodle/TalentLMS? — Para B2B brasileira focada em aprendizagem aplicada, sim. Para volume massivo de cursos, complementa.
2. Tem certificação reconhecida? — Sim. Certificados auditáveis, downloadáveis, com QR de verificação.
3. Suporta microlearning? — Sim, com pílulas de 5-15 minutos contextuais.
4. Funciona mobile? — Sim, mobile-first.
5. Como mede aplicação real? — Liga aprendizado a comportamento no processo/projeto, não só conclusão de curso.
6. Pode importar conteúdo SCORM? — Sim, conectores pra padrões SCORM/xAPI.
7. Permite trilha customizada? — Sim, por cargo, área, PDI, projeto.
8. Tempo até primeira trilha publicada? — 7-14 dias por trilha estruturada.

**6 links blog:**
- Por que treinamento corporativo não vira mudança real
- Plataforma de treinamento corporativo: como escolher
- Como criar PDI que efetivamente funciona
- Como reter talentos qualificados
- Por que sua empresa perde os melhores talentos
- Software de RH para empresa B2B

---

### 7.7 — Agente de Oportunidades

**URL:** `/agentes/oportunidades`
**Meta title:** `Agente de Oportunidades: identificação e priorização por IA | Orbit`
**Meta description:** `Identifica, classifica e gerencia oportunidades estratégicas — vindas do mercado, do seu time ou descobertas pela IA. Conectado ao plano estratégico da empresa.`

**H1:** `Agente de Oportunidades: descoberta e priorização operadas por IA`
**Subheadline:** `Ideias e oportunidades aparecem em todo lugar — mercado, clientes, time, dados. O Agente de Oportunidades captura, classifica, prioriza e conecta ao plano estratégico — sem deixar nada cair no esquecimento.`

**Pill:** `Time Olívia · Oportunidades`

**8 capacidades:**
1. **Captura central** (`lightbulb`) — Qualquer pessoa do time pode registrar oportunidade detectada.
2. **Classificação automática** (`tags`) — Por área, impacto, esforço, prioridade.
3. **Análise de viabilidade** (`scale`) — Custo, benefício, risco estimados pela IA.
4. **Priorização** (`flag`) — Matriz de impacto × esforço, com priorização visual.
5. **Conexão estratégica** (`link`) — Vincula a objetivo do plano e ao centro de custo.
6. **Plano de validação** (`flask`) — Protótipo, MVP, experimento — registrável.
7. **Acompanhamento** (`trending-up`) — Status do ciclo: descoberta, análise, decisão, execução.
8. **Insights da Olívia** (`brain`) — Sugestões de oportunidade baseadas em dado da operação.

**4 integrações:**
- **Oportunidades + Estratégico** → oportunidades viraram objetivos no próximo ciclo estratégico
- **Oportunidades + Indicadores** → KPIs definem se oportunidade vale ser priorizada
- **Oportunidades + Comercial** → oportunidades de upsell/cross-sell vindas do CRM
- **Oportunidades + Pesquisas** → feedback de cliente e clima vira oportunidade priorizada

**3 cenários:**
1. **Oportunidades que aparecem se perdem em reuniões** — Agente centraliza captura em um único repositório com priorização.
2. **Empresa não sabe diferenciar oportunidade boa de ruim** — Análise de viabilidade automática prioriza pelo dado.
3. **CEO quer ouvir do time sem perder ideia** — Qualquer colaborador captura, sistema valida e organiza.

**8 FAQs:**
1. Como Olívia descobre oportunidades sozinha? — Cruza dados de mercado, performance, feedback, padrões emergentes.
2. Posso categorizar oportunidades? — Sim, por área, projeto, segmento, impacto, esforço.
3. Quem decide priorização? — Liderança decide, com base em matriz e dados gerados pelo Agente.
4. Conecta com plano de ação? — Sim. Oportunidade aprovada vira ação no plano estratégico.
5. Posso ter banco de oportunidades futuras? — Sim. Repositório de oportunidades que não foram priorizadas no momento.
6. Integra com CRM? — Sim. Oportunidades comerciais sincronizam com pipeline do Agente Comercial.
7. Como evita pulverizar foco? — Priorização força escolha consciente entre o que entra no plano e o que fica em backlog.
8. Tempo até processo estabelecido? — 30-45 dias com cadência periódica de revisão.

**6 links blog:**
- Como tirar o planejamento estratégico do papel
- Plano de ação executável
- Como criar indicadores que conectam com a operação
- AI Operating System for Business
- IA agentic para CEO
- Orbit vs SAP, Salesforce e Microsoft

---

### 7.8 — Agente de Documentos

**URL:** `/agentes/documentos`
**Meta title:** `Agente de Documentos: repositório e workflows operados por IA | Orbit`
**Meta description:** `Repositório centralizado, workflows de aprovação, versionamento, assinaturas digitais. O Agente de Documentos opera governança documental coordenada pela Olívia.`

**H1:** `Agente de Documentos: governança documental operada por IA`
**Subheadline:** `Repositório centralizado, workflows de aprovação, versionamento, assinaturas digitais e busca semântica. O Agente de Documentos opera a governança documental — coordenado pela Olívia.`

**Pill:** `Time Olívia · Documentos`

**8 capacidades:**
1. **Repositório centralizado** (`folder-tree`) — Estrutura hierárquica configurável por área e tipo.
2. **Categorias** (`tags`) — Classificação por tipo de documento, com políticas específicas.
3. **Workflows de aprovação** (`git-pull-request`) — Fluxo configurável de revisão e aprovação.
4. **Versionamento** (`history`) — Histórico completo de versões com data, autor e diff.
5. **Aprovações** (`check`) — Trilha auditável de quem aprovou e quando.
6. **Assinatura digital** (`pen-tool`) — Integração nativa com provedores de assinatura jurídica.
7. **Compartilhamento público** (`share-2`) — Links públicos auditáveis e revogáveis.
8. **Busca semântica** (`search`) — Pergunte em linguagem natural — Olívia encontra.

**4 integrações:**
- **Documentos + Comercial** → propostas e contratos gerados com dados do CRM
- **Documentos + Processos** → POPs vinculados aos processos correspondentes
- **Documentos + Riscos** → evidências e relatórios anexados de forma auditável
- **Documentos + R&S** → ofertas, NDA, contratos de admissão gerenciados

**3 cenários:**
1. **Documentos espalhados em Drive + e-mail + WhatsApp** — Agente migra pra hub único com estrutura hierárquica clara.
2. **Time gasta horas procurando documento** — Busca semântica reduz tempo em 80%.
3. **Auditoria fiscal vai começar** — Agente garante trilha completa de aprovação, versionamento e compliance.

**8 FAQs:**
1. Substitui Notion ou Confluence? — Para B2B brasileira que quer documentação integrada à operação, sim — com vantagem em workflows nativos.
2. Tem busca semântica? — Sim. Olívia entende perguntas em linguagem natural e retorna o documento relevante.
3. Como assinatura digital funciona? — Integração nativa com DocuSign, ClickSign, Adobe Sign.
4. Tem versionamento? — Sim. Histórico completo com diff entre versões.
5. Posso compartilhar externamente? — Sim. Link público com auditoria, revogável.
6. Workflow tem prazo? — Sim. SLA por etapa, com escalonamento.
7. Suporta OCR de PDF? — Sim. PDFs e imagens viram texto pesquisável.
8. Quanto tempo pra consolidar? — 3-6 meses pra empresa de médio porte, em fases.

**6 links blog:**
- Como centralizar a documentação da empresa
- Por que sua empresa não encontra documento crítico quando precisa
- Knowledge base corporativo: como escolher
- Como organizar os processos de uma empresa que cresceu rápido
- Como integrar sistemas empresariais
- Como mapear processos da empresa usando BPMN

---

### 7.9 — Agente Comercial

**URL:** `/agentes/comercial`
**Meta title:** `Agente Comercial: CRM e pipeline de vendas operados por IA | Orbit`
**Meta description:** `Pipeline, leads, automações, formulários, relatórios. O Agente Comercial opera o ciclo completo de vendas B2B — coordenado pela Olívia.`

**H1:** `Agente Comercial: CRM e operação de vendas B2B operados por IA`
**Subheadline:** `Pipeline de leads, qualificação, atividades, automações, formulários, dashboards comerciais e insights de pipeline. O Agente Comercial opera todo o ciclo de vendas — sem depender do humor do vendedor.`

**Pill:** `Time Olívia · Comercial`

**8 capacidades:**
1. **Pipeline de leads** (`git-branch`) — Funil configurável por equipe, com estágios e SLAs.
2. **Detalhes do lead** (`user-search`) — Ficha completa com histórico, atividades, contexto enriquecido.
3. **Automações de CRM** (`zap`) — Disparo de tarefas, e-mails e mudanças de estágio por regras.
4. **Web Forms** (`form-input`) — Formulários de captura plugáveis em site e LP.
5. **API + Webhooks** (`code`) — Integração nativa com qualquer fonte de lead externa.
6. **Relatórios comerciais** (`bar-chart`) — Conversão, ticket médio, ciclo, cobertura de pipeline.
7. **Provedores de assinatura** (`pen-tool`) — Integração com DocuSign, ClickSign etc.
8. **AI Pipeline Insights** (`brain`) — Olívia prioriza atividade, identifica risco, sugere ação.

**4 integrações:**
- **Comercial + Financeiro** → venda fechada dispara fatura e atualiza projeção de caixa
- **Comercial + Documentos** → contrato e proposta gerados automaticamente
- **Comercial + Processos** → onboarding disparado quando venda fecha
- **Comercial + Indicadores** → meta de receita conectada ao pipeline em tempo real

**3 cenários:**
1. **Vendedor não preenche CRM** — Agente captura atividade automaticamente, reduz preenchimento manual em 60%.
2. **Pipeline imprevisível** — Agente projeta cenários, antecipa risco em 8-12 semanas.
3. **Liderança comercial gasta sexta inteira gerando relatório** — Agente entrega relatório semanal pronto com análise causal.

**8 FAQs:**
1. Substitui RD Station ou HubSpot? — Para B2B brasileira de médio porte, sim — com vantagem em integração nativa.
2. Como integra com WhatsApp? — Conectores nativos com WhatsApp Business API.
3. Qualifica leads sozinho? — Sim, com base em ICP. Cruza dados públicos, aplica score.
4. Posso ter múltiplos pipelines? — Sim. Por produto, segmento, time, geografia.
5. Como comissão funciona? — Amarrada ao registro. Agente calcula baseado em regras.
6. Integra com marketing? — Sim. Web forms, automações, atribuição multi-touch.
7. Tem mobile? — Sim. Vendedor opera em campo com mobile-first.
8. Adoção real em quanto tempo? — 80-90% em 60-90 dias com redução de fricção.

**6 links blog:**
- Como organizar a prospecção e o follow-up de vendas
- Por que seu vendedor não preenche o CRM
- CRM para empresa B2B: como escolher em 2026
- Por que vendas, marketing e operações vivem em conflito
- Como criar indicadores que conectam com a operação
- Plano de ação executável

---

### 7.10 — Agente de Problemas Operacionais

**URL:** `/agentes/problemas-operacionais`
**Meta title:** `Agente de Problemas: RCA e resolução operadas por IA | Orbit`
**Meta description:** `Registra, analisa causa raiz e gerencia resolução de problemas operacionais — com hipóteses geradas pela Olívia e plano de ação rastreável.`

**H1:** `Agente de Problemas Operacionais: análise de causa raiz e resolução operadas por IA`
**Subheadline:** `Cada problema operacional registrado, classificado, analisado por hipóteses e resolvido com plano de ação rastreável. O Agente de Problemas transforma reclamação em melhoria contínua.`

**Pill:** `Time Olívia · Problemas`

**8 capacidades:**
1. **Repositório de problemas** (`alert-triangle`) — Catálogo central por área, processo, impacto.
2. **Categorização** (`tags`) — Por tipo, severidade, recorrência, área.
3. **Hipóteses de causa raiz** (`brain`) — Olívia gera hipóteses ranqueadas para análise.
4. **Análise estruturada** (`microscope`) — 5 Porquês, Ishikawa, Pareto integrados.
5. **Plano de ação** (`list-checks`) — Ação corretiva, responsável, prazo, indicador.
6. **Acompanhamento** (`activity`) — Status do problema: registro, análise, ação, resolução.
7. **Relatório executivo** (`file-text`) — Visão consolidada para liderança.
8. **Vinculação a processos** (`link`) — Problema amarrado ao processo onde se manifestou.

**4 integrações:**
- **Problemas + Processos** → problema recorrente em processo dispara redesenho
- **Problemas + Indicadores** → KPI de problemas ativos e tempo de resolução
- **Problemas + Riscos** → problema recorrente vira risco mapeado
- **Problemas + Reuniões** → reunião de melhoria contínua puxa problemas pendentes

**3 cenários:**
1. **Cliente reclama do mesmo problema várias vezes** — Agente identifica padrão recorrente, força análise estruturada de causa raiz.
2. **Empresa não consegue diferenciar sintoma de causa** — Olívia sugere hipóteses ranqueadas, time valida com dado.
3. **Decisões viram resolução superficial** — Plano de ação amarrado a indicador garante que problema não volte.

**8 FAQs:**
1. Substitui ferramenta de qualidade tipo Qualyteam? — Para B2B brasileira focada em melhoria contínua, sim — com vantagem em integração.
2. Suporta metodologia 5 Porquês? — Sim, com Ishikawa, Pareto e outras técnicas estruturadas.
3. Olívia gera hipóteses? — Sim. Baseado em dado do processo e histórico de problemas similares.
4. Conecta com não conformidade? — Sim. Problemas viram NCs auditáveis quando relevante.
5. Tempo de resolução é monitorado? — Sim, com SLA por categoria e responsável.
6. Posso registrar problema do cliente externo? — Sim. Origem do problema é classificável (interno, cliente, fornecedor, regulação).
7. Como mede recorrência? — Histórico permite análise de padrão por área, processo, fonte.
8. Tempo até processo estabelecido? — 30-45 dias com ritual periódico de análise.

**6 links blog:**
- Como mapear processos da empresa usando BPMN
- Por que ninguém na empresa segue processo definido
- Como organizar os processos de uma empresa que cresceu rápido
- Como criar indicadores que conectam com a operação
- Por que processos manuais estão travando o crescimento
- Plano de ação executável

---

### 7.11 — Agente de Reuniões

**URL:** `/agentes/reunioes`
**Meta title:** `Agente de Reuniões: pauta, atas e ações operadas por IA | Orbit`
**Meta description:** `Pauta, atas, ações pós-reunião, transcrição com IA, extração automática de tarefas. O Agente de Reuniões transforma reunião em execução rastreável.`

**H1:** `Agente de Reuniões: pauta, ata e ações operadas por IA`
**Subheadline:** `Pauta colaborativa, transcrição inteligente, extração automática de decisões e ações, encaminhamento por responsável. O Agente de Reuniões transforma horas de discussão em execução rastreável.`

**Pill:** `Time Olívia · Reuniões`

**8 capacidades:**
1. **Pauta colaborativa** (`list`) — Itens, tempos, responsáveis montada antes da reunião.
2. **Repositório de reuniões** (`folder`) — Histórico por série, time, projeto.
3. **Transcrição com IA** (`mic-2`) — Áudio vira texto automaticamente em PT-BR.
4. **Chat com transcrição** (`message-circle`) — Pergunte ao Agente sobre o que foi discutido.
5. **Extração de tarefas** (`check-circle`) — IA identifica ações decididas e cria tarefa.
6. **Ações em massa** (`layers`) — Múltiplas ações gerenciadas em painel único.
7. **Decisões registradas** (`scale`) — Toda decisão fica rastreável com contexto.
8. **Encaminhamento automático** (`send`) — Ata enviada, ações criadas no painel de tarefas.

**4 integrações:**
- **Reuniões + Pessoas** → ações de 1:1 vinculadas ao PDI do colaborador
- **Reuniões + Estratégico** → reuniões de comitê conectadas ao plano
- **Reuniões + Problemas** → reuniões de melhoria puxam problemas pendentes
- **Reuniões + Oportunidades** → oportunidades discutidas viram registros priorizados

**3 cenários:**
1. **Reuniões viram conversa sem execução** — Agente extrai decisões e ações, cria tarefas, acompanha execução.
2. **Time perde tempo lembrando o que ficou combinado** — Repositório central pesquisável.
3. **CEO quer revisar histórico de decisão estratégica** — Chat com transcrição responde "quando discutimos X?"

**8 FAQs:**
1. Substitui Fellow ou Otter? — Para B2B brasileira focada em gestão integrada, sim.
2. Como transcrição funciona? — Áudio processado por IA vira texto pesquisável em PT-BR.
3. Posso editar a ata? — Sim. Ata gerada é rascunho. Time revisa e aprova.
4. As ações criadas vão pra onde? — Painel de tarefas do responsável + calendário.
5. Reuniões recorrentes? — Sim. Séries com pauta padrão e histórico.
6. Funciona com Google Meet e Zoom? — Sim, via integração ou upload.
7. Tem chat com transcrição? — Sim. Pergunte sobre o que foi discutido.
8. Redução de reuniões sem ação? — 60-90 dias com ritual instituído.

**6 links blog:**
- Como resolver a falta de comunicação entre setores
- Por que vendas, marketing e operações vivem em conflito
- Plataformas para alinhar setores: como escolher
- Como tirar o planejamento estratégico do papel
- Por que 70% dos planejamentos estratégicos morrem
- Plano de ação executável

---

### 7.12 — Agente de Pesquisas

**URL:** `/agentes/pesquisas`
**Meta title:** `Agente de Pesquisas: clima, satisfação e engajamento por IA | Orbit`
**Meta description:** `Pesquisas de clima organizacional, satisfação e engajamento — com análise por IA e geração de plano de ação automático. Operado pela Olívia.`

**H1:** `Agente de Pesquisas: clima, satisfação e engajamento operados por IA`
**Subheadline:** `Pesquisas de clima organizacional, satisfação interna, eNPS, NPS de cliente e estudo de engajamento — com análise por IA, identificação de padrão e geração automática de plano de ação.`

**Pill:** `Time Olívia · Pesquisas`

**8 capacidades:**
1. **Criação de pesquisas** (`clipboard-list`) — Templates ou customizada, múltiplos formatos.
2. **Séries de pesquisa** (`layers`) — Cadência periódica configurável.
3. **Distribuição automática** (`send`) — Envio por e-mail, link, mobile.
4. **Lembretes inteligentes** (`bell`) — Re-engajamento de respondentes pendentes.
5. **Análise por IA** (`brain`) — Olívia interpreta resposta aberta e categoriza padrão.
6. **Visão consolidada** (`bar-chart-2`) — Dashboards com filtragem por área, cargo, tempo.
7. **Geração de plano** (`list-checks`) — Insights viram plano de ação atribuído a responsável.
8. **Histórico comparativo** (`history`) — Evolução de clima e engajamento ao longo do tempo.

**4 integrações:**
- **Pesquisas + Pessoas** → eNPS conecta a turnover e engajamento do time
- **Pesquisas + Oportunidades** → feedback de cliente vira oportunidade priorizada
- **Pesquisas + Indicadores** → eNPS e NPS são KPIs vivos no dashboard executivo
- **Pesquisas + Problemas** → padrão recorrente em pesquisa vira problema mapeado

**3 cenários:**
1. **Clima organizacional caindo sem causa clara** — Agente cruza pesquisa de clima com indicadores comportamentais e identifica padrão.
2. **NPS de cliente é número solto sem ação** — Análise automática categoriza feedback e gera plano de ação por categoria.
3. **CEO quer ouvir o time sem viés de hierarquia** — Pesquisa anônima estruturada com análise de IA.

**8 FAQs:**
1. Substitui SurveyMonkey ou Typeform? — Para B2B brasileira focada em pesquisa organizacional + cliente integrada à gestão, sim.
2. Tem análise de texto aberto? — Sim. Olívia categoriza e identifica padrão em respostas abertas.
3. Pesquisas anônimas funcionam? — Sim, com anonimização garantida e auditável.
4. Suporta NPS, eNPS, CSAT? — Sim, com templates prontos para cada metodologia.
5. Quantas pesquisas posso rodar simultaneamente? — Ilimitado.
6. Como envia? — E-mail, link público, mobile push.
7. Tem benchmark de mercado? — Sim, comparação com padrão da indústria quando disponível.
8. Tempo até primeira pesquisa em campo? — 7-14 dias.

**6 links blog:**
- Como reter talentos qualificados
- Por que sua empresa perde os melhores talentos
- Como criar PDI que efetivamente funciona
- Por que vendas, marketing e operações vivem em conflito
- Como resolver a falta de comunicação entre setores
- Como criar indicadores que conectam com a operação

---

## 8. COPY — As 4 páginas de módulos

### 8.1 — Módulo Financeiro

**URL:** `/modulos/financeiro`
**Meta title:** `Módulo Financeiro Orbit: contas, fluxo de caixa, DRE em tempo real`
**Meta description:** `Contas a pagar, contas a receber, fluxo de caixa, DRE em tempo real, orçamento e conciliação bancária. O módulo financeiro da Orbit conectado aos agentes de IA.`

**H1:** `Módulo Financeiro: contas, fluxo de caixa e DRE em tempo real`
**Subheadline:** `Contas a pagar, contas a receber, fluxo de caixa projetado, DRE em tempo real, orçamento, conciliação bancária e insights da Olívia. Coordenado pelos agentes do Time Olívia.`

**Pill:** `Módulo · Financeiro`

**8 funcionalidades:**
1. **Contas a pagar** (`arrow-up-circle`) — Lança, aprova, paga e concilia.
2. **Contas a receber** (`arrow-down-circle`) — Emite, monitora inadimplência e dispara cobrança.
3. **Fluxo de caixa projetado** (`waves`) — 30/60/90 dias atualizado em tempo real.
4. **DRE em tempo real** (`file-bar-chart`) — Resultado provável atualizado a cada lançamento.
5. **Orçamento** (`pie-chart`) — Orçado vs realizado por centro de custo.
6. **Conciliação bancária** (`landmark`) — Open Finance e integrações bancárias nativas.
7. **Centros de custo** (`folders`) — Estrutura configurável por área, projeto, produto.
8. **Insights da Olívia** (`brain`) — Anomalias detectadas, sugestões de otimização.

**3 cenários:**
1. **Empresa vende muito mas o caixa aperta** — Sistema expõe descompasso, antecipa crise de liquidez.
2. **Empresa fechando o mês na última semana** — DRE em tempo real torna fechamento contábil em validação, não descoberta.
3. **Inadimplência crescente** — Detecção precoce dispara cobrança antes do default.

**8 FAQs:**
1. Substitui Conta Azul ou Omie? — Para B2B brasileira de médio porte focada em gestão integrada, sim. Para microempresa, são mais leves.
2. Como funciona a DRE em tempo real? — Lançamentos atualizam DRE instantaneamente. Você vê resultado provável em qualquer dia.
3. Concilia com banco automaticamente? — Sim, via Open Finance e integrações bancárias.
4. Detecta inadimplência precoce? — Sim. Padrão de comportamento alerta semanas antes.
5. Regras de aprovação? — Sim. Limite de valor, hierarquia, escalonamento.
6. Atende Simples? — Sim. Simples Nacional, Lucro Presumido, Lucro Real, MEI.
7. Integra com ERP? — Via API e conectores.
8. Tempo até DRE em tempo real? — 30 dias.

**6 links blog:**
- Gestão financeira integrada
- Por que sua empresa vende muito e ainda assim falta dinheiro
- DRE em tempo real: o guia completo
- Como criar indicadores que conectam com a operação
- ERP integrado vs plataforma all-in-one
- IA agentic para CEO

---

### 8.2 — Módulo Recrutamento e Seleção

**URL:** `/modulos/recrutamento-selecao`
**Meta title:** `Módulo R&S Orbit: recrutamento e seleção com triagem de CV por IA`
**Meta description:** `Vagas, candidatos, triagem de CV por IA, etapas seletivas, scorecards, banco de talentos. O módulo de R&S da Orbit conectado aos agentes.`

**H1:** `Módulo Recrutamento e Seleção: do anúncio à contratação com IA`
**Subheadline:** `Da abertura de vaga ao fechamento, o módulo R&S da Orbit opera o ciclo completo — descrição inteligente, triagem de CV por IA, etapas seletivas, scorecards, banco de talentos.`

**Pill:** `Módulo · R&S`

**8 funcionalidades:**
1. **Geração de descrição de vaga** (`file-plus`) — IA cria descrição completa.
2. **Pipeline de candidatos** (`users-2`) — Estágios configuráveis com scorecards.
3. **Triagem de CV por IA** (`brain`) — Análise automática de aderência.
4. **Análise individual** (`user-check`) — Score, justificativa, perguntas sugeridas.
5. **Entrevistas** (`mic`) — Agendamento, roteiro, notas, scorecard.
6. **Comunicação automática** (`mail`) — Status, próximos passos, feedback.
7. **Relatórios de R&S** (`bar-chart-3`) — Tempo de fechamento, conversão, fonte.
8. **Banco de talentos** (`bookmark`) — Candidatos qualificados pra vagas futuras.

**3 cenários:**
1. **R&S sem processo, contratando por urgência** — Sistema estrutura ciclo, reduz tempo médio em 30-40%.
2. **Tempo gasto triando CV é absurdo** — IA reduz 200 CVs pra top 20 em segundos.
3. **Candidato bom perdido por demora** — Comunicação automática mantém candidato engajado.

**8 FAQs:**
1. Substitui Gupy ou Kenoby? — Para B2B de médio porte, sim — com vantagem em integração.
2. A IA discrimina candidatos? — Não. Avalia aderência técnica e comportamental ao perfil.
3. Como triagem funciona? — IA compara CV ao perfil definido e gera score.
4. Posso definir scorecard de entrevista? — Sim, configurável por cargo.
5. Integra com LinkedIn? — Sim.
6. O candidato vê o status dele? — Sim. Portal de candidato com transparência.
7. Tem banco de talentos? — Sim, classificados para vagas similares.
8. Reduz tempo de fechamento em quanto? — 30-50% em 60-90 dias.

**6 links blog:**
- Como reter talentos qualificados
- Por que sua empresa perde os melhores talentos
- Software de RH para empresa B2B: como escolher
- Como criar PDI que efetivamente funciona
- Por que treinamento corporativo não vira mudança real
- AI Operating System for Business

---

### 8.3 — Módulo Projetos

**URL:** `/modulos/projetos`
**Meta title:** `Módulo Projetos Orbit: Gantt, dependências e execução por IA`
**Meta description:** `Crie, execute e monitore projetos com Gantt, dependências, membros, automações. O módulo de Projetos da Orbit conectado aos agentes de IA.`

**H1:** `Módulo Projetos: gestão de projetos integrada com IA`
**Subheadline:** `Da criação ao encerramento, o módulo Projetos opera o ciclo completo — escopo, cronograma, dependências, membros, automações, riscos. Coordenado pelos agentes do Time Olívia.`

**Pill:** `Módulo · Projetos`

**8 funcionalidades:**
1. **Criação de projeto** (`folder-plus`) — Template, escopo, prazos, responsáveis.
2. **Gantt + dependências** (`gantt-chart`) — Cronograma visual com dependências.
3. **Membros e acesso** (`users-cog`) — Time interno + convites externos com governança.
4. **Automações** (`zap`) — Disparo de tarefas, notificações, mudanças de fase.
5. **Painel do projeto** (`layout-dashboard`) — Status, progresso, riscos, próximos marcos.
6. **Exportação Gantt** (`download`) — PDF/PNG pra apresentação executiva.
7. **Tarefas conectadas** (`link`) — Vinculadas a processos, indicadores, riscos.
8. **Histórico** (`history`) — Auditável.

**3 cenários:**
1. **Vários projetos em paralelo sem visão consolidada** — Portfólio único com status, dependências, riscos.
2. **Projeto crítico sem dono claro** — Força definição de RACI por tarefa.
3. **Projeto com cliente externo** — Portal de cliente com escopo, marcos, entregas.

**8 FAQs:**
1. Substitui Asana ou Monday? — Para B2B brasileira focada em gestão integrada, sim.
2. Tem Kanban e Gantt? — Sim, ambos.
3. Posso convidar cliente externo? — Sim, com governança auditável.
4. Identifica risco de atraso? — Sim, cruzando progresso, carga e dependências.
5. Integra com calendário? — Sim, Google e Outlook.
6. Tem template? — Sim, configurável por empresa.
7. Custo do projeto monitorado? — Sim, ligado ao centro de custo.
8. Exporta Gantt? — Sim, PDF e PNG.

**6 links blog:**
- Plano de ação executável
- Como organizar os processos de uma empresa que cresceu rápido
- Como criar indicadores que conectam com a operação
- Como tirar o planejamento estratégico do papel
- Como integrar sistemas empresariais
- AI Operating System for Business

---

### 8.4 — Módulo Compras

**URL:** `/modulos/compras`
**Meta title:** `Módulo Compras Orbit: pedidos, RFQ e fornecedores integrados`
**Meta description:** `Pedidos de compra, cotações (RFQ), fornecedores, workflows e aprovações. O módulo de Compras da Orbit conectado aos agentes de IA.`

**H1:** `Módulo Compras: processo de compras integrado com IA`
**Subheadline:** `Pedidos de compra, cotações (RFQ), fornecedores, workflows de aprovação e relatórios. O módulo de Compras opera o ciclo completo integrado ao financeiro e aos agentes do Time Olívia.`

**Pill:** `Módulo · Compras`

**8 funcionalidades:**
1. **Pedidos de compra** (`shopping-bag`) — Solicitação, aprovação, recebimento.
2. **Cotações (RFQ)** (`mail-check`) — Múltiplos fornecedores, comparação automática.
3. **Fornecedores** (`truck`) — Cadastro, contratos, histórico, avaliação.
4. **Workflows de aprovação** (`git-pull-request`) — Configurável por valor e área.
5. **Aprovações** (`check`) — Trilha auditável.
6. **Relatórios** (`bar-chart`) — Por fornecedor, categoria, centro de custo.
7. **Items configuráveis** (`package`) — Catálogo de produtos/serviços.
8. **Integração financeira** (`link`) — Conecta ao módulo financeiro automaticamente.

**3 cenários:**
1. **Compras sem governança** — Workflow obriga aprovação por valor, com trilha auditável.
2. **Cotações por e-mail são caos** — RFQ centralizado compara propostas automaticamente.
3. **Empresa não sabe se está pagando preço bom** — Histórico de cotação e fornecedor mostra benchmark.

**8 FAQs:**
1. Substitui Mercado Eletrônico ou Conformidade? — Para B2B brasileira de médio porte, sim — com integração nativa.
2. Como RFQ funciona? — Solicita cotação a múltiplos fornecedores, compara automaticamente.
3. Fornecedor tem portal? — Sim, com acesso restrito.
4. Workflow tem alçada? — Sim, por valor e área.
5. Integra com financeiro? — Sim, contas a pagar criadas automaticamente.
6. Suporta cadastro nacional? — Sim, com SINTEGRA e Receita Federal.
7. Aprovação tem SLA? — Sim, com escalonamento.
8. Tempo até processo estabelecido? — 30 dias.

**6 links blog:**
- Gestão financeira integrada
- Como organizar os processos de uma empresa que cresceu rápido
- ERP integrado vs plataforma all-in-one
- Como integrar sistemas empresariais
- Como criar indicadores que conectam com a operação
- AI Operating System for Business

---

## 9. Cross-linking matrix

### Cada página de agente linka pra:
- **Os outros 11 agentes** (seção "Outros agentes do Time Olívia")
- **A página pillar** `/agentes-de-ia` (breadcrumb + link prosa)
- **4 módulos relevantes** (rodapé)
- **6 artigos do blog** (seção "Conteúdos relacionados")
- **Home** `/` (breadcrumb)

### Cada página de módulo linka pra:
- **Os 12 agentes principais** (rodapé)
- **A página pillar** `/agentes-de-ia`
- **Os outros 3 módulos**
- **6 artigos do blog relevantes**
- **Home** `/`

### Página pillar linka pra:
- **12 agentes** (grid principal)
- **4 módulos** (seção secundária)
- **6 artigos estratégicos do blog**
- **Home, blog index, contato**

### Atualização nos 42 artigos do blog

Adicionar 1-2 links pra páginas de agente/módulo correspondentes:

| Cluster do blog | Agente/módulo relacionado |
|---|---|
| Dor 1 (Processos) | Agente de Processos + Agente de Problemas |
| Dor 7 (Indicadores) | Agente de Indicadores |
| Dor 14 (Financeiro) | Módulo Financeiro + Agente de Indicadores |
| Dor 8 (CRM) | Agente Comercial |
| Dor 10+13 (Consultoria) | Pillar dos agentes |
| Dor 5 (Sistemas) | Pillar + AI OS for Business |
| Dor 3 (Estratégia) | Agente Estratégico + Agente de Oportunidades |
| Dor 4 (Comunicação) | Agente de Reuniões |
| Dor 6 (Talentos) | Agente de Pessoas + Módulo R&S |
| Dor 9 (PDI/Treinamento) | Agente de Pessoas + Agente de Treinamento |
| Dor 2 (Mapear processos) | Agente de Processos |
| Dor 12 (Escala) | Pillar + AI OS for Business |
| Dor 11 (Documentação) | Agente de Documentos |
| Cluster GEO | Pillar + Agente Estratégico |

---

## 10. Checklist de implementação pra Claude Code

### Fase 1 — Setup e pillar (1-2 dias) ✅ JÁ FEITO

- [x] Página pillar `/agentes-de-ia/index.html` já criada — usar como referência funcional
- [ ] Gerar OG image pillar (1200x630px) em `/public/og/agentes-de-ia.jpg`
- [ ] Adicionar pillar ao `sitemap.xml`
- [ ] Adicionar link "Agentes de IA" no header/navegação da home
- [ ] Testar schemas com Google Rich Results Test

### Fase 2 — 12 páginas de agentes (4-6 dias)

Para cada agente listado na Seção 7:
- [ ] Criar pasta `/public/agentes/{slug}/`
- [ ] Implementar `index.html` seguindo template (Seção 3) + copy (Seção 7)
- [ ] Implementar 3 schemas JSON-LD (Service, FAQPage, BreadcrumbList) com dados específicos
- [ ] Gerar OG image específica (1200x630px) em `/public/og/agente-{slug}.jpg`
- [ ] Adicionar ao `sitemap.xml`
- [ ] Validar acessibilidade (contraste, foco, aria)
- [ ] Testar schemas no Google Rich Results Test

### Fase 3 — 4 páginas de módulos (2 dias)

Para cada módulo listado na Seção 8:
- [ ] Criar pasta `/public/modulos/{slug}/`
- [ ] Implementar `index.html` seguindo template adaptado pra módulo
- [ ] Implementar 3 schemas JSON-LD
- [ ] Gerar OG image (1200x630px) em `/public/og/modulo-{slug}.jpg`
- [ ] Adicionar ao `sitemap.xml`

### Fase 4 — Cross-linking (1 dia)

- [ ] Adicionar "Outros agentes" em cada uma das 12 páginas de agente (11 links cruzados cada)
- [ ] Adicionar "Conteúdos relacionados" com 6 links do blog em cada agente
- [ ] Adicionar grid de 4 módulos no rodapé de cada agente
- [ ] Adicionar grid de 12 agentes no rodapé de cada módulo
- [ ] Atualizar os 42 artigos do blog com 1-2 links pras páginas relevantes (ver matriz Seção 9)
- [ ] Atualizar a home com seção "Time Olívia" linkando pra pillar

### Fase 5 — Publicação e indexação (1 dia)

- [ ] Publicar no Cloudflare Pages
- [ ] Submeter sitemap atualizado no Google Search Console
- [ ] Submeter sitemap no Bing Webmaster Tools
- [ ] Solicitar indexação manual de cada uma das 17 páginas no GSC
- [ ] Compartilhar pillar nas redes sociais Orbit
- [ ] Monitorar Search Console por 7-14 dias

### Fase 6 — Pós-publicação

- [ ] Verificar AI Overview do Google em buscas relacionadas (a cada 2 semanas)
- [ ] Testar no ChatGPT/Claude/Perplexity buscas como "agente de IA para gestão financeira", "Orbit Gestão agente comercial"
- [ ] Iterar copy onde CTR no SERP estiver fraco
- [ ] Considerar criar artigos de blog adicionais reforçando cada agente

---

## 11. Notas finais

### Design system (mesmo das LPs existentes)

- **Cores:** background `#0D1117`, gold primário `#FFBA1A`, gold dark `#E6A200`, gold light `#FFCA4A`, text `#F5F5F0`, text muted `rgba(245,245,240,0.7)`, border `rgba(255,255,255,0.10)`
- **Tipografia:** Plus Jakarta Sans, pesos 400/500/600/700/800
- **Ícones:** Lucide (preferencial)
- **Tema:** Escuro por padrão. Referência visual: `public/agentes-de-ia/index.html` (já criada) e `public/pessoas-variant-a/index.html`
- **Layout:** `max-w-7xl`, padding `px-6`, gaps responsivos
- **Bordas:** `border border-white/10`, hover `border-[#FFBA1A]/40`

### Tom de voz

- B2B profissional, direto, sem corporativismo morto
- Frases curtas. Parágrafos de 2-4 linhas. Sem rodeio.
- "Você" sempre (leitor é gestor/CEO)
- Negrito em pontos-chave (1-2 por seção)
- Evitar "no mundo de hoje", "cada vez mais", "no cenário atual"
- Evitar emoji

### Consistência

- Sempre "Olívia" com acento agudo
- Sempre "Time Olívia" como termo do grupo de agentes
- Sempre "Agente {Nome}" como nomenclatura individual
- Sempre "Módulo {Nome}" pros 4 módulos (não chamar de agente)
- "Orbit Gestão" como marca completa
- "Grupo GSN" com "G" maiúsculo

### Anti-padrões

- ❌ NÃO citar valores de ICP em número (R$500k, número de funcionários)
- ❌ NÃO comparar com concorrentes nomeados nas páginas de agente (deixar isso pro artigo `Orbit vs SAP/Salesforce/Microsoft` no blog)
- ❌ NÃO usar stock photo de pessoas sorrindo
- ❌ NÃO adicionar texto nas imagens geradas
- ❌ NÃO usar gradientes ou efeitos glow (manter flat design)

### Quando tiver dúvida

Consultar:
- `public/agentes-de-ia/index.html` — referência funcional da pillar
- `docs/BLOG_PLAYBOOK.md` — convenções do blog
- `CLAUDE.md` — contexto geral do projeto
- `public/pessoas-variant-a/index.html` — referência visual de LP existente

**Boa execução.**
