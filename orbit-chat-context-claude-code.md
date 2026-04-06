# Orbit Chat System — Contexto Completo para Claude Code

## Visão Geral
Sistema de captura de leads via chat interativo (estilo WhatsApp) com agendamento de demonstrações em grupo. O lead conversa com a "Olívia" (atendente IA) que coleta dados progressivamente e agenda uma demonstração via Google Meet.

**Stack**: React 18 + Vite + TypeScript + Tailwind CSS + Supabase (DB + Edge Functions) + Pipedrive CRM + ManyChat (WhatsApp) + Make.com + n8n

---

## 1. FLUXO DO CHAT (15 Steps)

A ordem dos steps é fixa:

| # | Step | Tipo Input | Pergunta |
|---|------|-----------|----------|
| 1 | `name` | Texto livre | "Qual seu nome?" |
| 2 | `whatsapp` | Input com máscara + país | "Qual seu WhatsApp?" |
| 3 | `email` | Texto livre (validação) | "Qual o seu e-mail?" |
| 4 | `empresa` | Texto livre | "Qual o nome da sua empresa?" |
| 5 | `oqueFaz` | Múltipla escolha | "O que a sua empresa faz?" → Consultoria, Indústria, Serviços, Comércio/Varejo, Governo, Outro |
| 6 | `cargo` | Múltipla escolha | "O que você faz na empresa?" → CEO/Diretor, Funcionário, Resp. Qualidade, Consultor, Outro |
| 7 | `softwareGestaoConfirm` | Sim/Não | *(Só aparece se cargo = "Responsável pela Qualidade")* "Você utiliza algum software de gestão?" |
| 8 | `softwareGestao` | Texto livre | *(Só se respondeu "Sim" acima)* "Qual software de gestão?" |
| 9 | `faturamento` | Múltipla escolha | "Qual o faturamento mensal?" → Até R$100 mil/mês, R$100-500 mil, R$500k-1M, Acima de R$1M |
| 10 | `funcionarios` | Múltipla escolha | "Quantos funcionários?" → 1-5, 6-20, 21-50, 51-100, Mais de 100 |
| 11 | `prioridade` | Múltipla escolha | "Qual a prioridade?" → Urgente, Em breve (30 dias), Pesquisando, Só quero conhecer |
| 12 | `preferencia` | Múltipla escolha | *(Só se faturamento > R$100k/mês)* "Demonstração em grupo" ou "Falar com executivo comercial" |
| 13 | `calendar` | Calendário + horário | Seleção de data + horário (CalendarPicker) |
| 14 | `confirmation` | Tela final | Link Meet, countdown, dicas, grupo WhatsApp |
| 15 | `confirmationVendedor` | Tela final alternativa | *(Só se escolheu "Falar com executivo")* Foto + WhatsApp do vendedor atribuído pela roleta |

### Regras de Pulo
- Se `faturamento` = "Até R$100 mil/mês" → pula `preferencia`, vai direto para `calendar`
- Se `cargo` ≠ "Responsável pela Qualidade" → pula `softwareGestaoConfirm` e `softwareGestao`
- Se opções "Outro" em `oqueFaz` ou `cargo` → muda para input de texto livre

---

## 2. CLASSIFICAÇÃO DE LEADS

```typescript
// Consultor: segmento contém "consultoria" OU cargo contém "consultor"
const isConsultor = segmento.toLowerCase().includes("consultoria") || cargo.toLowerCase().includes("consultor");

// Pequeno: faturamento = "Até R$ 100 mil/mês"
const isLowRevenue = faturamento.toLowerCase().includes("até") && faturamento.toLowerCase().includes("100 mil");

// Grande: tudo que não é consultor nem pequeno
```

### Links do Google Meet por Perfil
```
Orbit Pequeno (≤R$100k): https://meet.google.com/efd-bbnc-zfc
Orbit Grande  (>R$100k):  https://meet.google.com/ycz-dosc-znk
Orbit Consultor:          https://meet.google.com/xuc-mrnp-sec
Legacy (fallback):        https://meet.google.com/qpy-himp-cxj
```

---

## 3. REGRAS DE HORÁRIOS (CalendarPicker)

A partir de 06/04/2026: **slot único às 14:00 para TODOS os perfis** (incluindo consultores).

Regras históricas (antes de 06/04):
- Consultores/Consultorias → apenas 18:00
- De 30/03 a 05/04: leads ≤R$100k → 09:00 e 11:00; demais → 14:00 e 17:00
- Antes de 30/03: todos → 17:00

### Vagas por Slot
- **MAX_VAGAS = 8** por horário/dia
- Indicadores de escassez: ≤2 = vermelho "Última vaga!", ≤4 = laranja, >4 = normal
- Slot cheio → desabilitado com "Esgotado"

### Calendário
- Só dias úteis (seg-sex), sem feriados nacionais
- Limite de agendamento: até o final da próxima semana (domingo)
- Feriados 2026 marcados com ponto vermelho

---

## 4. FLUXO DE DADOS E PERSISTÊNCIA

### 4.1 Save Parcial (após email - step 3)
```
Frontend → Supabase DB (leads table) → upsert por email/whatsapp
         → sync-lead-make (fire-and-forget)
         → sync-lead-crm (fire-and-forget)
```

### 4.2 Criação Pipedrive (após empresa - step 4)
```
Frontend → create-pipedrive-lead (action: 'create')
  → Busca pessoa existente por email
  → Se existe: cria NOVO Deal (nunca reutiliza deals)
  → Se não: cria Organization → Person → Deal
  → Pipeline: "Orbit", Stage: primeira (Lead Novo)
  → Nota inicial com dados + UTM
  → Salva IDs no DB (pipedrive_person_id, org_id, deal_id)
  → Tag ManyChat "nao-respondeu-chat-demonstracao" (com delay de 15min)
```

### 4.3 Updates Progressivos (cada resposta)
```
Frontend → Supabase DB update (campo específico)
         → create-pipedrive-lead (action: 'update') → atualiza Person + Deal fields
```

### 4.4 Agendamento Completo (calendar select)
```
Frontend → Supabase DB update (data_reuniao, horario_reuniao, status='completo', link_reuniao)
         → sync-lead-make (re-sync completo)
         → trigger-n8n-call (webhook para ligação de confirmação)
         → create-pipedrive-lead (action: 'update') com date+time
             → Move deal para "Reunião Agendada"
             → Cria atividade "Reunião Online" no Pipedrive
             → Nota completa com Tipo de Lead, Sala, Link Meet
         → send-calendar-invite (email com .ics via Resend)
         → tag-manychat "agendou-reuniao" (remove "nao-respondeu-chat-demonstracao")
         → assign-pipedrive-owner (roleta round-robin)
```

### 4.5 Fluxo Vendedor (se escolheu "Falar com executivo")
```
Frontend → DB update (deseja_contato_vendedor=true)
         → assign-pipedrive-owner (flow: "vendedor") → NÃO move de stage
         → Nota no Pipedrive "Lead solicitou contato com executivo"
         → tag-manychat "foi-falar-com-vendedor"
         → sync-lead-make
         → Exibe tela com foto + WhatsApp do vendedor atribuído
```

---

## 5. EXECUTIVOS / ROLETA DE VENDEDORES

```typescript
const EXECUTIVES = {
  gabriel: { nome: "Gabriel Carvente", foto: "exec-gabriel.png", whatsapp: "5511971999192" },
  gisele: { nome: "Gisele Ferrarezi", foto: "exec-gisele.png", whatsapp: "5548991206282" },
  pedro:  { nome: "Pedro", foto: "exec-pedro.png", whatsapp: "5548996934524" },
  thayane: { nome: "Thayane Torbis", foto: "exec-thayane.png", whatsapp: "5548996934515" },
};

// Roleta no banco: tabela roleta_counter (id=1, current_index)
// Ordem fixa: gisele → pedro → thayane → gisele → ...
const ROLETA_VENDEDORES = [
  "gisele.rocha@templum.com.br",
  "pedro.maia@evolutto.com",
  "thayane.duarte@evolutto.com",
];
```

---

## 6. PIPEDRIVE — CAMPOS CUSTOMIZADOS

### Person Fields
- `Cargo` (varchar)
- `Ramo de Atividade` (varchar) — segmento/oqueFaz

### Deal Fields
- `Qual o faturamento ?` (varchar)
- `Faixa de Funcionários` (varchar) — key fixa: `e3aa6db84dfdf3594d0f75c3aa36b6c6a82a426f`
- `Prioridade` (varchar)
- `Data Reunião` (varchar) — formato "DD/MM/YYYY às HH:mm"
- `UTM Source`, `UTM Medium`, `UTM Campaign`, `UTM Content`, `UTM Term` (varchar)
- `GCLID`, `FBCLID` (varchar)
- `Landing Page`, `Origin Page` (varchar)

### Pipeline
- Nome: `Orbit`
- Stages: Lead Novo → Reunião Agendada → Participou Reunião Grupo → Negociações Iniciadas → Propostas → Testando Pré-análise → ...

### Atividades
- Tipo: `Reunião Virtual` (ou fallback `meeting`)
- Horário UTC: hora local +3h (compensação timezone BRT)
- Duração: 1h

### Notas
- `pinned_to_deal_flag: 0` (nunca fixar)
- Nota principal é atualizada (não duplicada) quando scheduling completa
- Formato da nota completa:
```
📋 Lead completo — Reunião agendada

🏷️ Tipo de Lead: {Pequeno|Grande|Consultor}
🚪 Sala: {Orbit Pequeno|Orbit Grande|Orbit Consultor}
🔗 Link da Sala: {meet link}

👤 Nome: ...
📱 WhatsApp: ...
📧 E-mail: ...
🏢 Empresa: ...
💼 Segmento / O que faz: ...
🎯 Cargo: ...
🖥️ Software de Gestão: ... (se houver)
💰 Faturamento: ...
👥 Funcionários: ...
⏰ Prioridade: ...
📅 Reunião: DD/MM/YYYY às HH:mm

--- Tracking ---
🔗 Fonte: ...
📢 Mídia: ...
🎯 Campanha: ...
```

---

## 7. MANYCHAT — INTEGRAÇÃO

### Dual Token (MC1 + MC2)
- `MANYCHAT_API_TOKEN` (principal) — persiste subscriber_id no DB
- `MANYCHAT_API_TOKEN_2` (secundário) — espelho, sem persistência

### Campos Customizados ManyChat
```
Empresa, Segmento, Cargo, Faturamento, Funcionarios (sem acento!),
Prioridade, Data Reuniao, Horario Reuniao, Software Gestao,
UTM Source, UTM Medium, UTM Campaign, Status Reuniao, link_reuniao,
Horário da Reunião Datetime (ISO 8601: YYYY-MM-DDTHH:mm:ss-03:00)
```

### Tags e Conflitos
```typescript
const CONFLICTING_TAGS = {
  "agendou-reuniao": ["nao-respondeu-chat-demonstracao", "nao-entrou-na-reuniao", "recusou-participacao"],
  "nao-entrou-na-reuniao": ["agendou-reuniao", "participou-reuniao", "nao-respondeu-chat-demonstracao"],
  "participou-reuniao": ["agendou-reuniao", "nao-entrou-na-reuniao", "nao-respondeu-chat-demonstracao"],
  "confirmou-participacao": ["nao-respondeu-chat-demonstracao"],
  "foi-falar-com-vendedor": [], // tag especial para pausar automações
};
```

### Fluxo de Busca/Criação de Subscriber
1. Cache DB (manychat_subscriber_id)
2. findBySystemField (email)
3. findByCustomField (Email com field_id)
4. createSubscriber (whatsapp_phone)
5. Se "already exists" → extrai wa_id → busca por phone/empresa
6. Fallback: email creation (para MC2 com restrições)

### Sincronização de Campos
- Sistema (updateSubscriber): nome, sobrenome, email — **NÃO enviar phone** (causa erro consent_phrase)
- Custom (setCustomField com field_id numérico): todos os demais
- Delay: 250ms entre chamadas
- Tags são SEMPRE a última etapa

---

## 8. MAKE.COM

Webhook URL: `https://hook.us1.make.com/dcqw8dhq4lngw8vsgcv3cdfdl2d7pfem`

Envia o objeto lead completo do banco. Fire-and-forget.
Chamado em 3 momentos: save parcial, agendamento completo, fluxo vendedor.

---

## 9. N8N — LIGAÇÃO DE CONFIRMAÇÃO

Webhook URL: `https://webhook.rodriguinhodomarketing.com.br/webhook/salva-supabase`

```json
{
  "lead_name": "Nome Completo",
  "lead_phone": "+5511999999999",
  "call_datetime": "2026-04-06T14:00:00-03:00",
  "subscriber_id": null,
  "deal_id": 12345,
  "link_reuniao": "https://meet.google.com/...",
  "vendedor_phone": "+5519266029722",
  "vendedor_name": "Olivia"
}
```

---

## 10. E-MAIL — CONVITE DE CALENDÁRIO

Via Resend API. Envia:
- HTML formatado com data/hora + link Meet + aviso "use computador"
- Arquivo .ics anexo (METHOD:REQUEST, TRANSP:TRANSPARENT)
- Alarmes: -30min e -10min
- De: `demonstracao@orbitgestao.com.br`

---

## 11. BANCO DE DADOS (Supabase)

### Tabela `leads`
```sql
id (uuid PK), nome, sobrenome, whatsapp, email, empresa,
oque_faz, cargo, software_gestao, faturamento, funcionarios, prioridade,
data_reuniao (text "DD/MM/YYYY"), horario_reuniao (text "HH:mm"),
status ('parcial' | 'completo'), link_reuniao,
pipedrive_person_id, pipedrive_org_id, pipedrive_deal_id,
manychat_subscriber_id, confirmou_participacao, status_reuniao,
lembrete_enviado, ligacao_agendada, ligacao_confirmacao_enviada,
deseja_contato_vendedor, reschedule_token, nps,
copy_variant, landing_page, origin_page,
utm_source, utm_medium, utm_campaign, utm_content, utm_term,
gclid, fbclid, gbraid, ttclid, wbraid, msclkid, li_fat_id, sck,
gad_source, gad_campaignid, apex_session_id, session_attributes_encoded,
created_at
```

### Tabela `roleta_counter`
```sql
id (int PK default 1), current_index (int default 0)
```

### Upsert Logic
- Mutex guard (`savingLeadRef`) no frontend
- Busca existente por `email` OU `whatsapp` (últimos dígitos)
- Se existe: UPDATE. Se não: INSERT.
- Server-side fallback na edge function se client falhar

---

## 12. LP → CHAT HANDOFF

A Landing Page (`/` ou `/consultoria`) coleta nome, email, whatsapp, empresa via formulário e salva em `sessionStorage("orbit_lp_data")`:

```json
{
  "nome": "João",
  "sobrenome": "Silva",
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "+5511999999999",
  "company": "Empresa X",
  "leadId": "uuid",
  "pipedriveIds": { "person_id": 123, "org_id": 456, "deal_id": 789 },
  "utmData": { "utm_source": "google", ... },
  "copyVariant": "A"
}
```

Se o chat detecta `orbit_lp_data`, pula os 4 primeiros steps (nome, whatsapp, email, empresa) e vai direto para `oqueFaz`.

---

## 13. A/B TESTING (Copy Variants)

### Empresas (5 variantes: A-E)
Rotação aleatória por sessão. Salva em `sessionStorage("hero_copy_variant")`.

### Consultores (5 variantes: CA-CE)
Foco em "Full White Label" e "Recorrência PASSIVA". Salva em `sessionStorage("consultor_copy_variant")`.

---

## 14. VALIDAÇÕES

### E-mail
- Regex básico
- Correção automática de typos de domínio (gmail.con → gmail.com, etc.)
- Validação de TLD

### Telefone
- Normalização: remove tudo que não é dígito
- Se > 11 dígitos e começa com "55" → remove código de país
- Limita a 11 dígitos
- Prefixo final: +55

---

## 15. TELA DE CONFIRMAÇÃO

Após agendamento:
- ✅ Ícone de sucesso + "Prontinho, {nome}!"
- Countdown (dias, horas, min, seg) até a demonstração
- Botão "Adicionar ao Google Agenda" (link direto)
- Botão "Baixar para outro calendário" (.ics download)
- Botão "Entrar no grupo do WhatsApp":
  - Consultor: https://chat.whatsapp.com/JnvD7U2BpdI0Tr4oWNMyuu
  - Empresa: https://chat.whatsapp.com/GsAH5Ve8PGh5QIPFLjPYkN?mode=gi_t
- Link da reunião copiável
- Dicas: usar computador, convidar sócios, preparar checklist

---

## 16. SECRETS NECESSÁRIOS (Edge Functions)

```
PIPEDRIVE_API_TOKEN
MANYCHAT_API_TOKEN
MANYCHAT_API_TOKEN_2
RESEND_API_KEY
SUPABASE_URL (auto)
SUPABASE_SERVICE_ROLE_KEY (auto)
SUPABASE_ANON_KEY (auto)
```

---

## 17. EDGE FUNCTIONS (Resumo)

| Function | Propósito |
|----------|-----------|
| `create-pipedrive-lead` | CRUD Pipedrive (create/update/reschedule/sync/search/repair) |
| `assign-pipedrive-owner` | Roleta round-robin de vendedores |
| `tag-manychat` | Tag/sync ManyChat (dual token, batch, sync-from-pipedrive) |
| `sync-lead-make` | Webhook Make.com |
| `trigger-n8n-call` | Webhook n8n para ligação |
| `send-calendar-invite` | Email .ics via Resend |
| `sync-lead-crm` | CRM externo (fire-and-forget) |

---

## 18. COMPONENTES REACT

```
src/pages/Index.tsx           — Orquestrador principal do chat (state machine)
src/components/chat/
  ChatHeader.tsx              — Header com progress bar
  ChatBubble.tsx              — Bolha de mensagem (bot/user)
  ChatInput.tsx               — Input de texto livre
  ChatOptions.tsx             — Botões de múltipla escolha
  WhatsAppInput.tsx           — Input WhatsApp com máscara
  CalendarPicker.tsx          — Calendário + slots de horário
  ConfirmationScreen.tsx      — Tela final de confirmação
  TypingIndicator.tsx         — Animação "digitando..."
  copyVariants.ts             — A/B testing empresas
  consultorCopyVariants.ts    — A/B testing consultores
src/lib/
  meeting-link.ts             — Resolução de link Meet por perfil
  phone.ts                    — Normalização de telefone BR
  email-validation.ts         — Validação + autocorreção de e-mail
```
