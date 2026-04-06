# Orbit Chat — Pacote Completo para Replicação

## O que é
Sistema de captura de leads via **chat conversacional** (estilo WhatsApp) com agendamento de demonstração integrado. Substitui formulários tradicionais por uma conversa guiada com a assistente "Olívia".

---

## Arquitetura

```
pages/Index.tsx          ← Página principal do chat (orquestrador de todo o fluxo)
components/chat/
  ChatHeader.tsx         ← Header com barra de progresso
  ChatBubble.tsx         ← Bolhas de mensagem (bot e user)
  ChatInput.tsx          ← Input de texto genérico (nome, email, empresa)
  WhatsAppInput.tsx      ← Input de telefone com seletor de país (DDI)
  ChatOptions.tsx        ← Botões de múltipla escolha (segmento, cargo, etc.)
  CalendarPicker.tsx     ← Calendário de agendamento com vagas em tempo real
  ConfirmationScreen.tsx ← Tela final com countdown, link da reunião, Google Calendar
  TypingIndicator.tsx    ← Animação "digitando..."
  copyVariants.ts        ← Variantes de copy A/B (empresas)
  consultorCopyVariants.ts ← Variantes de copy A/B (consultores)
lib/
  phone.ts               ← Normalização de telefone BR
  meeting-link.ts        ← Lógica de atribuição de sala (Google Meet)
  email-validation.ts    ← Validação de email com correção de typos
```

---

## Fluxo do Chat (Steps)

O chat segue uma sequência linear de etapas (`StepType`):

1. **welcome** → Mensagem de boas-vindas
2. **name** → Nome completo (split em nome + sobrenome)
3. **whatsapp** → WhatsApp com DDI (componente com seletor de país)
4. **email** → Email com validação de typos (gmail.con → gmail.com)
5. **empresa** → Nome da empresa
6. **oqueFaz** → Segmento (múltipla escolha: Consultoria, Indústria, Serviços, etc.)
7. **cargo** → Cargo (múltipla escolha: CEO, Funcionário, Consultor, etc.)
8. **softwareGestaoConfirm** → Usa software de gestão? (Sim/Não) — só aparece se cargo = Qualidade
9. **softwareGestao** → Qual software? (input livre)
10. **faturamento** → Faturamento mensal (múltipla escolha: 4 faixas)
11. **funcionarios** → Nº de funcionários (múltipla escolha: 5 faixas)
12. **prioridade** → Urgência (múltipla escolha: 4 opções)
13. **preferencia** → Demonstração em grupo OU falar com executivo (só para faturamento > R$100k)
14. **calendar** → Calendário com horários e vagas
15. **confirmation** → Tela de confirmação com countdown

---

## Lógica de Negócio Importante

### Classificação de Lead (3 tipos)
- **Consultor**: segmento = "Consultoria" OU cargo = "Consultor"
- **Pequeno**: faturamento = "Até R$ 100 mil/mês"
- **Grande**: qualquer outro faturamento

### Salas de Reunião (Google Meet)
Cada tipo de lead vai para uma sala diferente:
- Pequeno: `meet.google.com/efd-bbnc-zfc`
- Grande: `meet.google.com/ycz-dosc-znk`
- Consultor: `meet.google.com/xuc-mrnp-sec`

### Horários
A partir de 06/04/2026: **todos os perfis → 14:00** (slot único).

### Vagas por Horário
Máximo de **8 vagas** por slot. O CalendarPicker consulta o banco em tempo real para mostrar vagas restantes com indicadores de escassez (cores e ícones).

### Limite de Datas
O calendário só permite agendar até o final da semana seguinte (próximo domingo + 7 dias). Feriados brasileiros e fins de semana são bloqueados.

### Preferência (leads de alto faturamento)
Leads com faturamento > R$100k recebem a opção de falar com um executivo comercial ao invés de agendar demonstração em grupo. Se escolherem executivo, o sistema:
- Atribui via round-robin (roleta)
- Mostra foto e nome do executivo
- Gera link direto do WhatsApp

---

## Integrações (Edge Functions / Supabase)

O chat faz chamadas a estas Edge Functions:
1. **Salvar lead no banco** → `supabase.from('leads').insert/update`
2. **sync-lead-make** → Webhook Make.com
3. **sync-lead-crm** → CRM externo
4. **create-pipedrive-lead** → Cria deal no Pipedrive (com notas enriquecidas)
5. **trigger-n8n-call** → Dispara ligação de confirmação via n8n
6. **send-calendar-invite** → Email com convite de calendário (.ics)
7. **tag-manychat** → Aplica tag no ManyChat (agendou-reuniao)
8. **assign-pipedrive-owner** → Atribui dono do deal via roleta

### Tabela `leads` (campos principais)
```
nome, sobrenome, whatsapp, email, empresa, oque_faz, cargo,
faturamento, funcionarios, prioridade, software_gestao,
data_reuniao (ex: "7/4/2026"), horario_reuniao (ex: "14:00"),
status ("parcial" ou "completo"), link_reuniao,
copy_variant, landing_page, origin_page,
pipedrive_deal_id, pipedrive_person_id, pipedrive_org_id,
deseja_contato_vendedor, ligacao_agendada,
utm_source, utm_medium, utm_campaign, utm_content, utm_term,
gclid, fbclid, ttclid, msclkid, gbraid, wbraid, sck, li_fat_id
```

---

## Handoff LP → Chat

A Landing Page coleta nome, email, whatsapp e empresa num formulário, depois redireciona para `/chat` (Index.tsx) passando dados via `sessionStorage`:

```js
sessionStorage.setItem("orbit_lp_data", JSON.stringify({
  nome, sobrenome, email, phone, company, name,
  leadId, pipedriveIds, utmData, copyVariant
}));
```

O chat detecta esses dados e pula direto para a etapa `oqueFaz`.

---

## Copy Variants (Teste A/B)

Existem 5 variantes de copy para empresas (A-E) e 5 para consultores (CA-CE).
Cada sessão recebe uma variante aleatória persistida em `sessionStorage`.
A variante é salva no campo `copy_variant` do lead para análise.

---

## Dependências
- React 18 + TypeScript
- Tailwind CSS (classes semânticas via tokens CSS)
- Lucide React (ícones)
- Supabase JS Client (banco + edge functions)
- Nenhuma lib de UI extra (tudo é componente próprio)

---

## Como usar com Claude Code

1. Copie a pasta `components/chat/` e `lib/` para seu projeto
2. Adapte os imports (`@/integrations/supabase/client` → seu cliente Supabase)
3. Crie a tabela `leads` com os campos listados acima
4. Adapte as Edge Functions para suas integrações (Pipedrive, ManyChat, etc.)
5. Use `pages/Index.tsx` como referência para montar o fluxo na sua página

O componente principal é `Index.tsx` — ele orquestra todo o chat. Os sub-componentes são plug-and-play.
