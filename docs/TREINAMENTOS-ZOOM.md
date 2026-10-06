# /treinamentos — inscrição única (Zoom + Google Meet)

Como funciona, o que falta ligar, e o que fazer quando algo quebrar.

## O que a página faz

A pessoa marca uma ou mais sessões, preenche 4 campos e recebe o link da sala
**uma vez, valendo para as próximas ocorrências**. Tira dúvidas entra no Zoom
(registro via API). Mentorias de canais entram no Google Meet (sala da tabela,
enviada só depois da inscrição). Lembrete 1 dia antes e 1 hora antes — exceto
as mentorias quinzenais de quinta, que ainda não têm âncora de semana.

| Dia | Sessão | Hora | Sala | Cadência |
|---|---|---|---|---|
| Segunda | Tira Dúvidas | 17h | Zoom | Semanal |
| Sexta | Tira Dúvidas | 09h | Zoom | Semanal |
| Quarta | Mentoria de Adoção | 18h | Google Meet | Semanal |
| Quinta | Mentoria de Consolidação | 18h | Google Meet | A cada 15 dias |
| Quinta | Mentoria de Expansão | 18h | Google Meet | A cada 15 dias |

`/live/chris` (Masterclass) foi substituída por essas mentorias: 301 para
`/treinamentos`. O link do Meet **não** vai no card público — só no e-mail e
na página de obrigado depois do cadastro.

Quarta 10h (Treinamento Zoom) saiu da grade. Desativar `qua-10-treinamento` e
`qui-18-masterclass` no banco **depois** do deploy do site, senão a página
atual em produção quebra a inscrição de quarta.

### Por que reunião e não webinar

Webinar do Zoom manda lembrete automático, mas a plateia não tem microfone nem
câmera. Tira-dúvidas exige conversa, então usamos **reunião** — e o lembrete é
nosso, em `send-training-reminders`. Essa é a razão de existir aquela function.

## Peças

| Peça | Onde | Papel |
|---|---|---|
| Grade (frontend) | `orbit-next/src/lib/training-sessions.ts` | Fonte única para grade, modal, obrigado e `.ics` |
| Grade (banco) | tabela `training_sessions` | `zoom_meeting_id` + base do cron de lembrete |
| Links de agenda | `orbit-next/src/lib/calendar-links.ts` | Google/Outlook/`.ics`, com recorrência semanal |
| Página | `orbit-next/src/app/treinamentos/{page,content,html}` | Checkboxes, sem seletor de data |
| Obrigado | `.../treinamentos/obrigado/content.tsx` | Um bloco por sessão, `join_url` pessoal via `sessionStorage` |
| Inscrição | `supabase/functions/register-training` | Lead + upsert + Zoom + CRM (link + tags) + ManyChat + e-mail |
| Cliente Zoom | `supabase/functions/_shared/zoom.ts` | OAuth S2S, `addMeetingRegistrant`, `createWeeklyMeeting` |
| Lembretes | `supabase/functions/send-training-reminders` | d1 e h1, claim-then-send |
| Descadastro | `supabase/functions/training-unsubscribe` | `?r=<registration_id>` |
| Deploy | `scripts/deploy-training-zoom.ps1` | Secrets + as 3 functions + `_shared` |

**A grade existe em dois lugares de propósito** (o site é static export, o browser
não consulta a tabela ao renderizar; e o cron precisa de `weekday`/`start_time` em
SQL). Ao mudar a grade, edite os dois — os slugs têm de bater. `register-training`
valida os slugs recebidos contra a tabela, então desalinhamento falha alto.

## Ligar a integração (o que ainda falta)

### 1. App Server-to-Server OAuth no Zoom

Em `marketplace.zoom.us` → Develop → Build App → **Server-to-Server OAuth**.
Escopos: `meeting:write:registrant:admin` e `meeting:read:meeting:admin`
(mais `meeting:write:admin` se quiser que eu crie as reuniões pela API).
Para o Bootcamp (webinar): `webinar:write:registrant:admin` e
`webinar:read:list_registrants:admin`.

Anote **Account ID**, **Client ID** e **Client Secret**.

### 2. Preencher `.env.local` (na raiz do repositório, fora do git)

```
ZOOM_ACCOUNT_ID=...
ZOOM_CLIENT_ID=...
ZOOM_CLIENT_SECRET=...
CRON_SECRET=<string longa e aleatória>
RATE_SALT=<string longa e aleatória>
MAILERSEND_API_KEY=...        # a mesma que as outras send-* já usam
```

### 3. Deploy

```powershell
.\scripts\deploy-training-zoom.ps1
```

Sem as credenciais do Zoom o deploy funciona, mas a integração fica **desligada em
modo seguro**: o lead é gravado, as inscrições ficam `zoom_status='pending'`, e o
usuário vê a página de confirmação normalmente. Nada é perdido — o cron de retry
registra tudo quando as credenciais chegarem.

### 4. Criar as 3 reuniões recorrentes

Pela API (`createWeeklyMeeting` em `_shared/zoom.ts` já tem os parâmetros certos)
ou no painel do Zoom com: recorrente semanal, **registro obrigatório**, aprovação
automática, e "inscritos participam de qualquer ocorrência".

⚠️ **`weekly_days` do Zoom usa 1=Domingo**, deslocado +1 do `getDay()` do JS:
Segunda = `'2'`, Quarta = `'4'`, Sexta = `'6'`. Errar aqui cria no dia errado.

Depois grave os IDs:

```sql
update training_sessions set zoom_meeting_id = '...', zoom_join_url = '...',
       recurrence_ends_at = '2027-07-01T00:00:00Z'
 where slug = 'seg-17-tira-duvidas';
-- idem para qua-10-treinamento e sex-09-tira-duvidas
```

### 5. Só então agendar os crons

As credenciais dos crons ficam no **Vault do Supabase**, não no comando do job —
diferente dos crons do bootcamp, que cravam a anon key literal no SQL.
`ALTER DATABASE ... SET` não funciona no Supabase (sem superusuário), por isso Vault.

```sql
select vault.create_secret('<anon key>',    'mkt_anon_key');
select vault.create_secret('<CRON_SECRET>', 'training_cron_secret');
```
O `CRON_SECRET` tem de ser **o mesmo valor** do secret da edge function, senão o
cron leva 403. Depois aplique `supabase/migrations/20260802_training_reminders_cron.sql`,
que cria o helper `public.vault_secret()` e agenda os 4 jobs.

Para rotacionar depois:
```sql
update vault.secrets set secret = '<novo valor>' where name = 'training_cron_secret';
```
e atualize o `.env.local` + rode `deploy-training-zoom.ps1 -SecretsOnly`.

Antes de agendar, teste à mão:
```bash
# alvo sem enviar nada
curl -X POST .../functions/v1/send-training-reminders \
  -H 'x-cron-secret: ...' -H 'Content-Type: application/json' \
  -d '{"dry_run":true,"now":"2026-08-04T13:05:00Z"}'
```

## ManyChat (confirmação + lembrete com link individual)

A API só cria o contato, grava o campo e aplica a tag. A mensagem em si é um
fluxo no canvas. Sem o canvas, o WhatsApp não sai.

**Campos custom (criar uma vez, nomes exatos):**

| Campo | Uso |
|---|---|
| `link_individual_zoom` | `join_url` pessoal. Placeholder no fluxo. |
| `origem-evento` | "Masterclass Consultores" / "Bootcamp" / "Treinamento" |
| `nome-do-evento` | título da sessão |
| `data-e-horario-da-live` | datetime da próxima ocorrência (já existia) |

**Tags aplicadas na inscrição:**

| Tag | Quem recebe |
|---|---|
| `confirmacao-inscricao` | todo mundo, na hora — dispara o fluxo de "inscrição confirmada" |
| `masterclass-consultores` | legado `/live/chris` (encerrada) |
| `bootcamp` | `/bootcamp-orbit` |
| `treinamento` | aula (legado quarta 10h) |
| `tira-duvidas` | segunda 17h / sexta 9h |
| `mentoria` | Adoção / Consolidação / Expansão |
| slug da sessão | `qua-18-mentoria-adocao`, `seg-17-tira-duvidas`, etc. |

**Dois fluxos no canvas:**

1. **Confirmação** — gatilho: tag `confirmacao-inscricao` adicionada. Texto com
   `{{origem-evento}}` e botão/URL `{{link_individual_zoom}}`.
2. **Perto da sessão** — gatilho: `data-e-horario-da-live` (1h antes, ou o delay
   que já usam nas lives). Mesmo campo de link. Segmentar pela tag de origem se
   o texto mudar entre masterclass, bootcamp e treinamento.

O CRM grava o mesmo link em `cf_evento_link_individual_do_zoom` e nas notas do
card. Um card por pessoa no funil Treinamento: nova inscrição (masterclass,
bootcamp, live) atualiza o existente.

## Runbook

### Alguém não recebeu o link

```sql
select session_slug, zoom_status, zoom_error, zoom_attempts, zoom_join_url
from training_registrations where email = 'pessoa@empresa.com';
```
- `pending` → o cron de retry pega em até 30 min. Para forçar:
  `POST register-training {"mode":"retry_pending"}` com `x-cron-secret`.
- `failed` + `zoom_error_kind='permanent'` → normalmente e-mail que o Zoom rejeitou.
  Corrija o e-mail e reinscreva.
- `skipped` → bateu o teto de 200 inscrições em 24h naquela sessão (proteção contra
  inundar a reunião). Verifique se é tráfego real; se for, suba `DAILY_SESSION_CAP`.

### Lembrete não saiu

```sql
select session_slug, occurrence_date, kind, status, attempts, error, sent_at
from training_reminders order by claimed_at desc limit 30;
```
- Nada na tabela → o cron não rodou (`select * from cron.job_run_details order by start_time desc limit 10`)
  ou nenhuma ocorrência caiu na janela.
- `pending` velho → o envio morreu no meio; após 15 min o próximo tick reivindica de novo.
- `failed` com `HTTP 429` → rate limit do MailerSend (~100/h no plano atual). A cauda
  sai nos ticks seguintes, com atraso. Se virar rotina, suba o plano.

### A recorrência expirou (o risco silencioso)

Reunião recorrente do Zoom tem no máximo **50 ocorrências** — uma sessão semanal
dura ~11,5 meses. Quando expira, o registro passa a dar 404 e as inscrições ficam
`pending`, mas a página continua dizendo "confirmado".

O cron `training-zoom-health` grava `WARNING` no log do Postgres quando faltarem
menos de 8 semanas. Para renovar: crie a recorrência nova no Zoom e faça
`update training_sessions set zoom_meeting_id=..., recurrence_ends_at=...`.
Não precisa redeploy — é por isso que o ID está em tabela e não em env var.

Se a renovação anual incomodar, a alternativa é reunião recorrente **sem hora
fixa** (`type: 3`), que não expira; perde-se a lista de datas no e-mail de
confirmação do Zoom, mas nossos lembretes já carregam a agenda.

### Mudar a grade

1. `orbit-next/src/lib/training-sessions.ts` (slug, dia, hora, descrição)
2. `insert`/`update` em `training_sessions` com o **mesmo slug**
3. Criar a reunião no Zoom e gravar `zoom_meeting_id`
4. `npm run build` e conferir a página

Para desativar uma sessão sem apagar histórico: `update training_sessions set
active = false where slug = '...'` e remover de `TRAINING_SESSIONS`.

## Detalhes que não são óbvios

- **O remetente é `noreply@orbitgestao.com.br`, COM "i".** Este item dizia o oposto —
  que o domínio sem "i" (`orbtgestao.com.br`) "não é typo" e era escolha anti-spam.
  Estava errado e o efeito era o inverso do pretendido: o Gmail marcava as mensagens
  com "o endereço do remetente contém caracteres incomuns que talvez sejam usados para
  imitar endereços reais". Corrigido em 05/08/2026 nas 6 functions via `ORBIT_FROM_EMAIL`.
  Ver `supabase/EMAILS-LIVE.md:12-21`. **Não voltar para o domínio sem "i".**
- **Não passar `occurrence_ids`** ao registrar. Com `registration_type=1` o registro
  já vale para a série; passar o parâmetro escopa a ocorrências específicas.
- **Não editar as 3 reuniões pela UI do Zoom.** Mudar recorrência ou tipo de
  registro pode invalidar os `join_url` já distribuídos.
- **`occurrence_date` é data local de São Paulo.** Derivar de `toISOString()` erra
  entre 21h e meia-noite, quando o UTC já virou o dia.
- **A página nunca foi traduzida para EN.** Nenhuma string dela está no dicionário
  de `orbit-init.js` — nem antes desta mudança. Se for traduzir, traduza a página
  inteira; parcial fica pior que nada.
- **E-mail de confirmação na inscrição é nosso** (`register-training` via MailerSend),
  com o `join_url` pessoal. O Zoom ainda manda o e-mail dele também. Perto da sessão
  o cron `send-training-reminders` reenvia o mesmo link (d1 e h1).
- **WhatsApp:** `register-training` cria o contato no ManyChat, grava
  `link_individual_zoom` e aplica a tag de origem + `confirmacao-inscricao`.
  O canvas do ManyChat é que envia a mensagem — ver seção ManyChat abaixo.
- **`last_name` sempre vai no cadastro do inscrito, mesmo vazio** (`_shared/zoom.ts`).
  A conta exige o campo: omiti-lo devolve 400 code 300, classificado `permanent`, então o
  retry nunca reprocessa. Isso silenciou 10 inscrições de gente que digitou só o primeiro
  nome entre 03 e 10/08/2026 — elas ficaram sem link nenhum e sem ninguém saber.
- **Host das 3 reuniões: `igor@evolutto.com.br`**, com `join_before_host: false`. Quem for
  conduzir precisa ser host alternativo, senão a sala não abre e os inscritos ficam
  esperando: `node scripts/zoom-set-alt-host.mjs --list` (o app Zoom ainda não tem o escopo
  `user:read:list_users:admin`, então a listagem de usuários não funciona).
