# Blog Orbit — Playbook & Contexto

> **Use este documento como contexto persistente para qualquer sessão (Claude Code, Cowork, ou humana) que vá produzir artigos para o blog da Orbit.** Ele captura a estratégia, decisões, padrões e progresso de uma vez. Atualize ao final de cada sprint de produção de artigos.

---

## 1. Por que existe este projeto

A Orbit precisa rankear no Google e ser citada em IAs generativas (ChatGPT, Perplexity, Google AI Overview, Claude) para keywords de gestão empresarial que prospects do ICP buscam. Decisão: **construir um blog SEO + GEO** atacando as dores reais que os vendedores escutam em toda call de venda.

Fonte das dores: análise de 22 transcrições de calls de vendas reais (em `transcrições de vendas/` e `PARA O PEDRO COPY/Transcricoes_completas_PCI/`). De lá saíram **14 dores recorrentes**. Cada dor vira (no mínimo) um artigo.

ICP B2B (corte hard): empresa com **R$500 mil/mês ou mais** de faturamento E **30+ funcionários**. Todo artigo precisa falar pra esse leitor — não pra micro-empresa, não pra freelancer, não pra corporate. Esse é o filtro que decide se um ângulo entra ou não.

---

## 2. As 14 dores (lista mestra)

Ranqueadas por frequência nas calls de vendas. Cada dor é candidata a 1+ artigo.

| # | Dor | Freq. | Módulo Orbit | Status do artigo |
|---|---|---|---|---|
| 1 | Processos manuais, tudo na "mão" | 18/22 | Processos | ✅ **Cluster completo (B + C + A)** |
| 2 | Processos não definidos / desorganizados | 16/22 | Processos (BPMN) | ✅ **Cluster completo (B + C + A)** |
| 3 | Estratégia fica só no papel — não vira execução | 14/22 | Planos de Ação / Olívia | ✅ **Cluster completo (B + C + A)** |
| 4 | Falta de alinhamento e comunicação entre setores | 13/22 | Chat / Processos | ✅ **Cluster completo (B + C + A)** |
| 5 | Múltiplos sistemas que não se integram | 12/22 | Integrações / All-in-one | ✅ **Cluster completo (B + C + A)** |
| 6 | Dificuldade de achar e reter mão de obra qualificada | 11/22 | R&S / RH / Treinamentos | ✅ **Cluster completo (B + C + A)** |
| 7 | Indicadores desconectados da operação | 10/22 | Indicadores / Dashboards | ✅ **Cluster completo (B + C + A)** |
| 8 | Prospecção e follow-up de vendas desorganizados | 10/22 | CRM | ✅ **Cluster completo (B + C + A)** |
| 9 | Gestão de pessoas / capacitação solta do dia a dia | 9/22 | PDI / Treinamentos | ✅ **Cluster completo (B + C + A)** |
| 10 | Consultoria cara que não resolve | 8/22 | Olívia / Estratégia | ✅ **Combinado com Dor 13 — Cluster completo (B + C + A)** |
| 11 | Documentação espalhada, sem governança | 8/22 | Documentação / Workflows | ✅ **Cluster completo (B + C + A)** |
| 12 | Operação não escala — gargalo manual | 7/22 | Automação | ✅ **Cluster completo (B + C + A)** |
| 13 | Ninguém se responsabiliza pelo resultado final | 6/22 | Olívia / Accountability | ✅ **Combinado com Dor 10** |
| 14 | Falta de visão financeira amarrada à operação | 6/22 | Financeiro / Indicadores | ✅ **Cluster completo (B + C + A)** |

**STATUS GERAL: 39 artigos publicados em 13 clusters. Todas as 14 dores cobertas.**

Citações verbatim das calls, agrupadas por dor, estão preservadas no histórico desta análise inicial — se precisar, peça pro Claude reler as transcrições e regenerar.

---

## 3. Estratégia editorial: cluster pillar + cluster pages

Em vez de produzir 14 artigos isolados, organizamos por **clusters de intenção**. O cluster da Dor 1 (processos manuais) virou prova de conceito e tem 3 artigos:

```
        [B] PILLAR PAGE
   "Como organizar processos de uma empresa que cresceu"
                    │
        ┌───────────┴───────────┐
        ↓                       ↓
   [C] Cluster Page         [A] Cluster Page
   (problem-aware / TOFU)   (solution-aware / BOFU)
   "Processos manuais"      "Como automatizar"
        ↓                       ↓
        └──────► CTA pra DEMO ◄──┘
```

- **B (pillar)** = framework completo, mid-funnel, ICP-fit altíssimo. KD ~5/10. Probabilidade de top 5 em 3-4 meses.
- **C (TOFU)** = problem-first, otimizado pra AI Overview. KD ~6/10. Chance de aparecer em AI search em 4-8 semanas.
- **A (BOFU)** = solution-aware, alta intenção comercial. KD ~8/10 (TOTVS, Pipefy dominam). Bottom-funnel, conversão alta.

**Para as outras 13 dores**, replicar a mesma lógica: identificar 1-3 ângulos por dor (TOFU + MOFU + BOFU), mapear ângulo principal (pillar), produzir cluster.

---

## 4. Status atual de produção

### Cluster da Dor 1 (Processos manuais)

- ✅ **Artigo B (PILLAR)** — `public/blog/como-organizar-processos-empresa-cresceu-rapido.md`
  - Keyword: `como organizar processos empresa que cresceu`
  - 3.344 palavras corpo + 579 FAQ
  - Schema Article + FAQPage prontos
  - 5 external links (Drucker, Convenia, Exame, Orbit)
  - 5 internal link placeholders (pra C, A, e 3 futuros)

- ✅ **Artigo C (TOFU)** — `public/blog/processos-manuais-empresa.md`
  - Keyword: `processos manuais empresa` + `sair do operacional`
  - 2.522 palavras corpo + 520 FAQ
  - Otimizado pra AI Overview (definition-first, frases declarativas, dados específicos)
  - Schema Article + FAQPage prontos

- ✅ **Artigo A (BOFU)** — `public/blog/como-automatizar-processos-empresa.md`
  - Keyword: `como automatizar processos da empresa`
  - 2.655 palavras corpo + 512 FAQ
  - Foco bottom-funnel: decisão entre 4 caminhos (DIY, no-code, BPMS+IA, custom), tabela comparativa, cálculo de ROI concreto, papel da IA agentic
  - Gap atacado: TOTVS desfocado, Pipefy em inglês, ChecklistFácil vertical errado
  - Schema Article + FAQPage prontos

### Cluster da Dor 7 (Indicadores)

- ✅ **Artigo Pillar (B)** — `public/blog/como-criar-indicadores-empresa.md`
  - Keyword: `como criar indicadores de desempenho empresa`
  - 3.009 palavras corpo + 471 FAQ
  - Gap atacado: ninguém integra indicador com operação real, ninguém aborda "indicador morto vs vivo", ninguém traz tabela dos 5 KPIs essenciais por área
  - Schema Article + FAQPage prontos

- ✅ **Artigo TOFU (C)** — `public/blog/indicadores-nao-refletem-realidade.md`
  - Keyword: `indicadores não refletem realidade` + `indicadores errados`
  - 2.154 palavras corpo + ~450 FAQ
  - Otimizado pra AI Overview (definition-first, 5 sintomas + 4 causas + autoteste de 6 perguntas)
  - Schema Article + FAQPage prontos

- ✅ **Artigo BOFU (A)** — `public/blog/dashboard-gestao-empresarial.md`
  - Keyword: `dashboard de gestão empresarial`
  - 2.383 palavras corpo + ~500 FAQ
  - Decision-frame: 4 caminhos (planilha, BI puro, ERP, plataforma integrada com IA), 8 elementos essenciais, 5 dashboards essenciais por nível
  - Schema Article + FAQPage prontos

### Pendente

- 12 outras dores (Dor 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14)
- Próximo cluster sugerido: Dor 14 (Financeiro) ou Dor 8 (CRM/Vendas) ou Dor 10+13 (Consultoria/Accountability) — ver Seção 9

---

## 5. Convenções de produção (não desviar sem motivo forte)

### Formato e localização

- **Formato:** Markdown (`.md`), um arquivo por artigo.
- **Pasta:** `/public/blog/`
- **Naming:** kebab-case, focado em keyword principal. Ex: `como-organizar-processos-empresa-cresceu-rapido.md`
- **Frontmatter YAML obrigatório:** title, slug, meta_title, meta_description, canonical, author, published_at, updated_at, category, tags, hero_image, reading_time.

### Estrutura SEO

- 1 H1 (= title)
- 5–17 H2 (em forma de pergunta sempre que natural — bom pra GEO)
- H3 dentro dos H2 onde fizer sentido
- Meta title: até 60 caracteres
- Meta description: até 160 caracteres
- URL slug curto, sem stopwords

### Estrutura GEO (AI search optimization)

- **Definition-first**: primeiro parágrafo responde a pergunta principal direto
- **Frases declarativas**: evitar enrolação, ser categórico
- **Dados específicos com fonte e ano**: ex. "61% (Convenia, 2024)"
- **Listas e bullets** em pontos certos (LLMs amam)
- **Tabelas comparativas** quando houver decisão de comprar / formato / quando-usar
- **FAQ no final** com schema FAQPage (alimenta tanto Google quanto AI Overview)
- **Citações de autoridades**: Drucker, Hammer, Deming, Pareto, Lencioni — LLMs reconhecem esses nomes como ancoragem confiável

### Tom de voz

- B2B, profissional, mas com voz e personalidade (não corporate morto)
- Brasileiro, vocabulário direto (sem anglicismo gratuito)
- Frases curtas. Parágrafos de 2-4 linhas. Sem rodeio.
- Negrito em pontos-chave (1-2 por seção, não mais)
- Pode usar "você" — leitor é o gestor / dono
- Evitar: "no mundo de hoje", "cada vez mais", "no cenário atual", clichês de blog
- Dados sempre que possível — não generalização

### Internal linking

- Todo artigo do cluster linka pros outros do cluster (B↔C, B↔A)
- Todo artigo linka pro pillar do cluster (se não for o pillar)
- Pillar linka pros cluster pages
- Quando outras dores virarem artigo, adicionar cross-links ao cluster
- Use placeholders `[Texto](#)` para artigos ainda não publicados — depois substituir pela URL real

### CTA

- CTA primário sempre: **agendamento de demonstração** (evento `demo_agendada`, valor R$800 no GA4)
- Localização do CTA: 1 no final do corpo (antes do FAQ) + 1 secundário no meio do artigo se passar de 2.500 palavras
- Texto: específico ao artigo, não genérico. Conectar com a dor que o leitor acabou de reconhecer.
- Placeholder atual: `[Agendar demonstração →](#demo-form)`. Substituir pela URL real do form quando existir.

### Schema markup

- Sempre incluir 2 blocos JSON-LD ao final do .md (em code block ```json):
  - `Article` (com headline, description, image, author, publisher, datePublished, dateModified, mainEntityOfPage)
  - `FAQPage` (com todas as perguntas do FAQ do artigo)
- Quando o .md for convertido pra HTML, esses JSONs vão pro `<head>` como `<script type="application/ld+json">`

---

## 6. Pesquisa antes de cada artigo

Para cada novo artigo, rodar o método (foi assim com B e C):

1. **Identificar 3 ângulos candidatos** (TOFU/MOFU/BOFU) para a dor.
2. **Pesquisar SERP em PT-BR** via WebSearch — mapear top 10, AI Overview, People Also Ask.
3. **Analisar top 3-5 concorrentes** via web_fetch — contagem de palavras, estrutura H2/H3, gaps de conteúdo, schema, internal linking.
4. **Mapear keyword + LSI** — Google Ads Keyword Planner (já conectado) dá volume real; complementar com autocomplete e PAA.
5. **Propor ângulo final** ao Rodrigo se for novo cluster. Se for continuação de cluster existente, seguir o plano editorial dele.
6. **Escrever** seguindo convenções acima.
7. **QA final**: contagem de palavras (target 2.500–3.500), headers hierárquicos, external links válidos, internal links placeholders, schema válido, alinhamento com ICP B2B.

---

## 7. Concorrentes principais já mapeados (PT-BR, gestão / processos)

| Domínio | DR estimado | Força no nicho | Notas |
|---|---|---|---|
| TOTVS | 70+ | Alta | Dominante em "automatização" / ERP |
| Pipefy | 65+ | Alta | Forte em "processo / workflow" |
| DocuSign | 75+ | Média | Genérico, conteúdo em massa |
| Zendesk | 80+ | Média | Forte em CX, mediano em processos |
| RD Station | 75+ | Alta | Forte em marketing/vendas |
| Sebrae | 88 | Alta | Dominante em PME/micro, fraco no ICP 30+ |
| Exame | 85 | Média | Casos reais, não how-to |
| Conrado Adolpho | 60+ | Média | PME pequena / self-employment |
| TaskRush | 35-40 | Média | Conteúdo profundo (3500+ palavras), bom benchmark |
| Convenia | 50 | Alta | Forte em RH |
| Sischef | 30 | Baixa | Vertical foodservice — não compete no ICP |
| Lecom, Heflo, Pipefy BR | 35-50 | Média | Concorrentes diretos em "processos / BPMS" |

**Gap competitivo recorrente**: ninguém escreve pro ICP B2B 30+ funcionários com R$500k+/mês com profundidade. Todos miram PME pequena (Sebrae, Conrado) ou self-employment, ou são genéricos demais (TOTVS, DocuSign). **Aí está o espaço da Orbit.**

---

## 8. Diferenciais Orbit que precisam aparecer (sem soar venda)

Quando relevante para o artigo, mencionar de forma natural:

- **20 módulos integrados** (Processos, CRM, Financeiro, Indicadores, RH, Receitas, Operações, etc.)
- **Olívia** — agente de IA central, mapeia processo por entrevista, gera doc automática, monitora execução
- **3.045+ clientes** brasileiros — prova social robusta
- **All-in-one** (vs. concorrentes fragmentados)
- **Foco em ICP B2B brasileiro** — empresa de R$500k+/mês

Não falar de preço, plano ou comparativo direto com concorrente nomeado (regra anti-confronto). Comparar SEMPRE com categoria genérica ("plataformas fragmentadas", "consultoria tradicional").

---

## 9. Próximos passos sugeridos

Ordem de prioridade pra produção:

1. **Fechar cluster da Dor 1** → escrever Artigo A (BOFU "Como automatizar processos da empresa") — keyword duro, mas fecha o cluster e dá fundo de funil
2. **Atacar Dor 7 (Indicadores)** ou **Dor 14 (Financeiro)** — alta relevância pro ICP e baixa competição em PT-BR
3. **Atacar Dor 8 (CRM/Vendas)** — categoria competitiva mas com volume gigante
4. **Atacar Dores 10 + 13 (Consultoria/Accountability)** — gap competitivo grande, perfeito pra ângulo Olívia
5. Sequenciar as demais por intenção comercial vs. volume

A cada cluster fechado (3 artigos), atualizar este playbook com:
- Links efetivos publicados (substituir placeholders)
- Dados de SERP atualizados
- Aprendizados sobre o que funcionou (e o que não)

---

## 10. Stack de ferramentas usada (zero custo)

- **Google Ads Keyword Planner** (já conectado via MCP) — volume real de busca
- **WebSearch** — SERP ao vivo, AI Overview, People Also Ask
- **web_fetch** — análise de artigo concorrente, contagem, estrutura
- **Ahrefs Free Tools** (via web_fetch) — DR, top backlinks (limitado)
- **AnswerThePublic / Also Asked** (via web_fetch) — perguntas reais
- **Google Trends** — sazonalidade
- **Claude in Chrome** — sites JS-heavy

Ahrefs/Semrush pagos NÃO estão conectados (tentativa de OAuth do Ahrefs falhou — bug do plugin). Operamos 100% grátis com os recursos acima. Quando o Ahrefs for conectado no futuro, integrar Domain Rating, Keyword Difficulty e Content Gap automatizado.

---

## 11. Arquivos relacionados neste repositório

- `CLAUDE.md` — contexto persistente geral do projeto Orbit
- `Orbit_Playbook_Estrategico.docx` — estratégia completa (não alterar)
- `Orbit_Copy_LPs.docx` / `Orbit_Copy_LPs_v2.docx` — copy das 8 LPs (referência de tom de voz)
- `TRACKING.md` — sistema de tracking (analytics.js, form.js) — relevante pro CTA
- `transcrições de vendas/` — 60+ transcrições brutas de calls (fonte das 14 dores)
- `PARA O PEDRO COPY/Transcricoes_completas_PCI/` — 7 transcrições em .txt
- `public/blog/` — onde os artigos do blog vivem

---

## 12. Regra de ouro

**Antes de produzir qualquer artigo novo, verificar:** (1) se a dor escolhida está na lista das 14, (2) se o ângulo casa com ICP B2B 30+ funcionários, (3) se vai gerar internal link para um cluster existente ou começar um novo cluster. Sem essas 3 confirmações, não escrever.
