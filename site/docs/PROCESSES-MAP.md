# ORBIT — Mapa de Processos

> Este documento mapeia como os documentos de posicionamento, o site, os funis e as operações se conectam. Use como índice operacional para qualquer tarefa.

---

## 1. ARQUITETURA DE DOCUMENTOS

```
docs/
├── BRAND-POSITIONING.md      ← FONTE PRIMÁRIA (bíblia)
│   ├── Quem somos (§1)
│   ├── Posicionamento por público (§2)
│   ├── Ecossistema GSN (§3)
│   ├── 6 Agentes de IA (§4)
│   ├── Proposta de valor B2B + B2B2B (§5)
│   ├── Moat / vantagem defensável (§6)
│   ├── Modelo de receita (§7)
│   ├── Prova social e credenciais (§8)
│   ├── Dados de mercado (§9)
│   ├── Restrições narrativas absolutas (§10) ← LEITURA OBRIGATÓRIA
│   ├── Identidade visual (§11)
│   └── Contato (§12)
│
├── AUDIENCES-MESSAGING.md    ← FONTE DE COPY E PERSONAS
│   ├── Personas: Carlos B2B, Fernanda B2B2B, Marcos Associação (§1)
│   ├── Matriz de mensagens por estágio de funil (§2)
│   ├── Tratamento de objeções B2B + B2B2B (§3)
│   ├── Copy de referência LP B2B — 12 seções (§4)
│   ├── Copy de referência LP B2B2B — 9 seções (§5)
│   ├── Biblioteca de headlines e taglines (§6)
│   └── Framework de conteúdo por plataforma (§7)
│
├── GROWTH-PLAYBOOK.md        ← FONTE DE ESTRATÉGIA
│   ├── Arquitetura de funis B2B + B2B2B (§1)
│   ├── 3 Motores de aquisição de canais (§2)
│   ├── Economia do canal — detalhamento (§3)
│   ├── Pricing atual (§4)
│   ├── Playbook de ativação de canais (§5)
│   ├── KPIs e métricas (§6)
│   ├── Estratégia de conteúdo — 4 pilares (§7)
│   ├── Roadmap 12-18 meses (§8)
│   └── Regras para o agente de Growth (§9)
│
├── GROWTH-COPILOT.md         ← SYSTEM PROMPT DO AGENTE
│   ├── Identidade do copiloto
│   ├── Base de conhecimento (refs → 3 docs acima)
│   ├── Comportamento (sempre/nunca)
│   ├── Escopo de atuação (6 áreas)
│   └── Formato das respostas
│
├── ARCHITECTURE.md           ← TÉCNICO DO SITE
├── DESIGN-SYSTEM.md          ← CSS/COMPONENTES DO SITE
├── CMS.md                    ← SISTEMA CMS/BLOG ADMIN
├── BLOG.md                   ← SISTEMA DE BLOG
└── PROCESSES-MAP.md          ← ESTE ARQUIVO
```

---

## 2. MAPA: DOCUMENTO → PÁGINA DO SITE

| Seção do doc | Doc fonte | Página do site | Status |
|---|---|---|---|
| Hero B2B (headline, sub, CTA, badge) | AUDIENCES §4.1 | `index.html` | ⚠️ DESATUALIZADO — site usa copy legacy |
| Pain points ("Deixa eu adivinhar") | AUDIENCES §4.2 | Nova LP B2B | 🔴 NÃO EXISTE |
| Reframe ("Por que software não resolve") | AUDIENCES §4.3 | Nova LP B2B | 🔴 NÃO EXISTE |
| 6 Agentes de IA (grid) | POSITIONING §4 | Nova LP B2B | 🔴 NÃO EXISTE |
| Como funciona (3 passos) | AUDIENCES §4.5 | Nova LP B2B | 🔴 NÃO EXISTE |
| Social proof / depoimentos | AUDIENCES §4.6 | `index.html` (placeholders) | ⚠️ PLACEHOLDERS |
| Segmentos atendidos | AUDIENCES §4.7 | Nova LP B2B | 🔴 NÃO EXISTE |
| Quem está por trás (founders) | AUDIENCES §4.8 | Nova LP B2B | 🔴 NÃO EXISTE |
| Comparação de custo | AUDIENCES §4.9 | Nova LP B2B | 🔴 NÃO EXISTE |
| Garantia 90 dias | AUDIENCES §4.10 | Nova LP B2B | 🔴 NÃO EXISTE |
| FAQ B2B | AUDIENCES §4.11 | Nova LP B2B | 🔴 NÃO EXISTE |
| CTA final | AUDIENCES §4.12 | Nova LP B2B | 🔴 NÃO EXISTE |
| Hero Canais | AUDIENCES §5.1 | Nova LP Canais | 🔴 NÃO EXISTE |
| Dor do consultor (churn) | AUDIENCES §5.2 | Nova LP Canais | 🔴 NÃO EXISTE |
| Modelo consultoria recorrente | AUDIENCES §5.3 | Nova LP Canais | 🔴 NÃO EXISTE |
| Matemática do canal | AUDIENCES §5.4 + GROWTH §3 | Nova LP Canais | 🔴 NÃO EXISTE |
| Roadmap ("E isso é só o começo") | AUDIENCES §5.7 | Nova LP Canais | 🔴 NÃO EXISTE |
| Páginas de produto (5 módulos) | ARCHITECTURE | `processos.html`, `indicadores.html`, etc. | ⚠️ COPY LEGACY |
| Blog listing | BLOG.md | `blog/index.html` | ✅ FUNCIONAL |
| Blog leitor | BLOG.md | `blog/leitor.html` | ✅ FUNCIONAL |
| Parcerias | — | `parcerias.html` | ⚠️ DESIGN V1 |
| CMS / Admin | CMS.md | `acesso/painel.html` | ✅ FUNCIONAL |

---

## 3. MAPA: FUNIL → AÇÃO → DOCUMENTO DE REFERÊNCIA

### Funil B2B Direto (Empresas)

| Estágio | Ação | Doc de referência | Seção |
|---|---|---|---|
| **TOPO** — Awareness | Criar anúncio pain-first | AUDIENCES §2 (Matriz B2B → Awareness) | Ângulos: §2 item "Ângulos de awareness" |
| **TOPO** — Awareness | Criar post LinkedIn autoridade | GROWTH §7 (Pilar 1: Autoridade) | + POSITIONING §9 (dados de mercado) |
| **TOPO** — Awareness | Criar Reel Instagram dor | GROWTH §7 (Pilar 2: Identificação) | + AUDIENCES §1 (dores do Carlos) |
| **MEIO** — Consideração | Criar email nurturing | AUDIENCES §7 (Framework email) | Sequência pós-captura |
| **MEIO** — Consideração | Criar conteúdo de agentes | POSITIONING §4 (6 agentes) | + AUDIENCES §2 (ângulos consideração) |
| **FUNDO** — Decisão | Criar LP B2B | AUDIENCES §4 (copy completa) | 12 seções em ordem |
| **FUNDO** — Decisão | Tratar objeção | AUDIENCES §3 (tabela objeções B2B) | Resposta + prova |
| **FUNDO** — Decisão | Script de demo | POSITIONING §4-5 + AUDIENCES §3 | Agentes + proposta de valor + objeções |
| **PÓS-VENDA** — Retenção | Email follow-up | AUDIENCES §7 (sequência pós-demo) | Recap → Objeções → Case → Oferta |

### Funil B2B2B Via Canais (Consultores)

| Estágio | Ação | Doc de referência | Seção |
|---|---|---|---|
| **TOPO** — Awareness | Live "Morte da consultoria artesanal" | GROWTH §2 (Motor 2: Eventos) | + AUDIENCES §2 (ângulos awareness canais) |
| **TOPO** — Awareness | Outbound consultores | GROWTH §2 (Motor 1: Outbound) | Prospecção LinkedIn/telefone |
| **MEIO** — Qualificação | Qualificar por tipo (consultor/associação/mentoria) | GROWTH §1 (Funil B2B2B → Meio) | Perguntas por tipo |
| **FUNDO** — Decisão | Apresentar matemática do canal | GROWTH §3 (Economia do canal) | + AUDIENCES §5.4 |
| **FUNDO** — Decisão | Criar LP Canais | AUDIENCES §5 (copy completa) | 9 seções em ordem |
| **FUNDO** — Decisão | Tratar objeção de canal | AUDIENCES §3 (tabela objeções B2B2B) | Resposta + prova |
| **PÓS-ATIVAÇÃO** — Ramp-up | Onboarding canal (10 clientes/90 dias) | GROWTH §5 (Playbook ativação) | Semana a semana |
| **MULTIPLICAÇÃO** | Parceria com associação | GROWTH §2 (Motor 3: Parcerias) | AMCHAM, FIEP, ABCO |

---

## 4. MAPA: PERSONA → CONTEÚDO → PLATAFORMA

### Carlos (Empresário B2B)

| O que criar | Plataforma | Tom | Doc de referência |
|---|---|---|---|
| Post dor/identificação | Instagram Reels | Empático, provocativo | AUDIENCES §1 (dores) |
| Post autoridade + dados | LinkedIn | Confiante, com dados | POSITIONING §9 + GROWTH §7 Pilar 1 |
| Anúncio pain-first | Meta Ads | Provocativo, direto | AUDIENCES §2 (ângulos awareness) |
| Anúncio comparação custo | Meta/Google Ads | Matemático, ancorado | POSITIONING §4 (custo agentes vs. humanos) |
| Email nurturing | Email | Consultivo, advisor | AUDIENCES §7 (sequências email) |
| Insight do dia | WhatsApp | Direto, pessoal | GROWTH §7 Pilar 1 (Alpha Daily) |
| LP de conversão | Site | Anti-software, confiante | AUDIENCES §4 (12 seções) |

### Fernanda (Consultora B2B2B)

| O que criar | Plataforma | Tom | Doc de referência |
|---|---|---|---|
| Post provocação consultoria | LinkedIn | Provocativo, direto | AUDIENCES §2 (ângulos awareness canais) |
| Live recorrente | LinkedIn/YouTube | Autoridade + números | GROWTH §2 Motor 2 |
| Anúncio matemática | Meta Ads | Matemático, confiante | GROWTH §3 (economia do canal) |
| Email sequência canal | Email | Consultivo | AUDIENCES §7 (sequência: Matemática → Cases → Roadmap → SCE) |
| LP Canais | Site | Direto, matemático | AUDIENCES §5 (9 seções) |

### Marcos (Associação B2B2B)

| O que criar | Plataforma | Tom | Doc de referência |
|---|---|---|---|
| Proposta formal | Documento/deck | Corporativo, com números | POSITIONING §5 (proposta para associações) + GROWTH §3 |
| Apresentação executiva | Reunião presencial | Consultivo, estratégico | GROWTH §2 Motor 3 |

---

## 5. KPIs POR PROCESSO

| Processo | KPI principal | KPI secundário | Doc de referência |
|---|---|---|---|
| Aquisição B2B (ads) | Leads capturados/semana | CAC | GROWTH §6 |
| Demonstração B2B | Taxa de show na demo | Taxa demo → cliente | GROWTH §6 |
| Aquisição canais (outbound) | Novos canais/semana | — | GROWTH §6 |
| Aquisição canais (eventos) | Leads de lives/SCE | Conversão live → canal | GROWTH §6 |
| Ativação de canais | Canais ativados (≥10 clientes) | Tempo para ativação | GROWTH §5-6 |
| Retenção clientes | Churn mensal | NPS | GROWTH §6 |
| Conteúdo orgânico | Engajamento/alcance | Pipeline gerado por orgânico | GROWTH §7 |
| Revenue | MRR total | Split B2B vs. B2B2B | GROWTH §6 |

---

## 6. PENDÊNCIAS CRÍTICAS (AÇÃO NECESSÁRIA)

| # | Pendência | Impacto | Responsável sugerido | Doc de referência |
|---|---|---|---|---|
| 1 | Criar LP B2B com novo posicionamento | 🔴 Sem LP, funil B2B não converte | Growth + Dev | AUDIENCES §4 |
| 2 | Criar LP B2B2B Canais | 🔴 Sem LP, canais não convertem | Growth + Dev | AUDIENCES §5 |
| 3 | Coletar depoimentos reais | 🔴 Prova social é placeholder | Growth + CS | AUDIENCES §4.6 |
| 4 | Definir pricing final agentes | 🟡 Pricing parcial nos docs | Produto + Comercial | GROWTH §4 |
| 5 | Migrar identidade visual do site | 🟡 Site usa Poppins/#FDB73F, novo é Plus Jakarta/#D4A017 | Dev | POSITIONING §11 |
| 6 | Atualizar homepage hero/copy | 🟡 Copy atual é legacy | Growth + Dev | AUDIENCES §4.1 |
| 7 | Atualizar páginas de produto (5 módulos) | 🟡 Copy e conceito desatualizados | Growth + Dev | POSITIONING §4 |
| 8 | Fechar parcerias com associações | 🟡 FIEP prioridade imediata | Comercial | GROWTH §2 Motor 3 |
| 9 | Conectar formulário a webhook | 🟡 Form não envia para CRM | Dev | ARCHITECTURE |
| 10 | Instalar GTM container | 🟡 Tracking parcial | Dev | ARCHITECTURE |

---

## 7. FLUXO DE TRABALHO: COMO USAR ESTE MAPA

```
1. RECEBO UMA TAREFA DE GROWTH
   ↓
2. IDENTIFICO: É B2B ou B2B2B?
   → AUDIENCES §1 (personas)
   ↓
3. IDENTIFICO: Qual estágio do funil?
   → Seção 3 deste doc (Funil → Ação → Doc)
   ↓
4. IDENTIFICO: Qual plataforma?
   → Seção 4 deste doc (Persona → Conteúdo → Plataforma)
   ↓
5. LEIO O DOC DE REFERÊNCIA indicado
   → POSITIONING / AUDIENCES / GROWTH
   ↓
6. VERIFICO AS RESTRIÇÕES NARRATIVAS
   → POSITIONING §10 (nunca dizer X, Y, Z)
   ↓
7. PRODUZO A PEÇA
   → Seguindo tom, linguagem e formato do GROWTH-COPILOT.md
   ↓
8. VALIDO CONTRA O POSICIONAMENTO
   → POSITIONING §2 (posicionamento por público)
```

---

*Última atualização: Março 2026*
*Referências: BRAND-POSITIONING.md, AUDIENCES-MESSAGING.md, GROWTH-PLAYBOOK.md, GROWTH-COPILOT.md*
