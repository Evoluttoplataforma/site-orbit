# Sistema de E-mails da Live — Documentação

## Visão Geral

Sistema automático de e-mails para a live semanal da Orbit Gestão usando **MailerSend** + **Supabase Edge Functions**.

- **Live**: Toda **terça-feira às 13h BRT**
- **YouTube**: https://www.youtube.com/@orbitgestao/live
- **Página de inscrição**: https://orbitgestao.com.br/live
- **Remetente**: noreply@orbtgestao.com.br (domínio sem "i" para proteção anti-spam)

---

## Fluxo de E-mails

| Quando | Tipo | Assunto | Link no botão |
|--------|------|---------|---------------|
| Ao se cadastrar | `convite_agendamento` | Inscrição Confirmada — Live Orbit Gestão | /live |
| Segunda-feira (dia anterior) | `convite` | Amanhã tem Live — A Nova Era da Gestão com Time de IA | /live |
| Terça 12:45 BRT | `reminder_15min` | Começa em 15 minutos — Live Orbit Gestão | YouTube Live |
| Terça 13:00 BRT | `ao_vivo` | 🔴 ESTAMOS AO VIVO — Entre agora! | YouTube Live |
| Terça 17:00 BRT (4h após) | `proxima_live` | Próxima terça tem Live — Garanta sua vaga | /live |

---

## Edge Functions (Supabase)

### Projeto: MKT Orbit (`yfpdrckyuxltvznqfqgh`)

### 1. `send-live-confirmation`
- **Trigger**: Chamada pelo frontend quando lead se cadastra
- **Endpoint**: `POST /functions/v1/send-live-confirmation`
- **Body**: `{ "nome": "...", "email": "..." }`
- **Ação**: Envia e-mail de confirmação de inscrição

### 2. `send-live-reminders`
- **Trigger**: Chamada por cron ou manualmente
- **Endpoint**: `POST /functions/v1/send-live-reminders`
- **Body**: `{ "type": "convite|reminder_15min|ao_vivo|proxima_live", "offset": 0, "limit": 50 }`
- **Ação**: Envia e-mail do tipo especificado para toda a base de leads
- **Paginação**: Use `offset` e `limit` para envio em lotes (default: 50)
- **Teste**: Adicione `"test": true` para ver contagem sem enviar

#### Exemplo: Disparo manual do convite
```bash
# Ver quantos leads tem
curl -X POST 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-live-reminders' \
  -H 'Content-Type: application/json' \
  -d '{"type": "convite", "test": true}'

# Enviar para os primeiros 50
curl -X POST 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-live-reminders' \
  -H 'Content-Type: application/json' \
  -d '{"type": "convite", "offset": 0, "limit": 50}'

# Enviar os próximos 50
curl -X POST 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-live-reminders' \
  -H 'Content-Type: application/json' \
  -d '{"type": "convite", "offset": 50, "limit": 50}'
```

---

## Secrets (Supabase)

| Secret | Descrição |
|--------|-----------|
| `MAILERSEND_API_KEY` | API key do MailerSend (`mlsn.806...`) |
| `ORBIT_URL` | URL do Supabase onde estão os leads |
| `ORBIT_SERVICE_KEY` | Service role key para ler leads (bypass RLS) |

> `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` são automáticos do projeto.

---

## Cron Jobs (configurar no Supabase Dashboard)

No Supabase Dashboard > Database > Extensions > habilitar `pg_cron` e `pg_net`.

Depois, criar os cron jobs via SQL Editor:

```sql
-- Lembrete 15 minutos antes (terça 12:45 BRT = 15:45 UTC)
SELECT cron.schedule(
  'live-reminder-15min',
  '45 15 * * 2',
  $$SELECT net.http_post(
    'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-live-reminders',
    '{"type": "reminder_15min", "limit": 500}'::jsonb,
    headers := '{"Content-Type": "application/json"}'::jsonb
  )$$
);

-- Estamos ao vivo (terça 13:00 BRT = 16:00 UTC)
SELECT cron.schedule(
  'live-ao-vivo',
  '0 16 * * 2',
  $$SELECT net.http_post(
    'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-live-reminders',
    '{"type": "ao_vivo", "limit": 500}'::jsonb,
    headers := '{"Content-Type": "application/json"}'::jsonb
  )$$
);

-- Convite próxima live (terça 17:00 BRT = 20:00 UTC)
SELECT cron.schedule(
  'live-proxima',
  '0 20 * * 2',
  $$SELECT net.http_post(
    'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-live-reminders',
    '{"type": "proxima_live", "limit": 500}'::jsonb,
    headers := '{"Content-Type": "application/json"}'::jsonb
  )$$
);

-- Convite véspera (segunda 10:00 BRT = 13:00 UTC)
SELECT cron.schedule(
  'live-convite-vespera',
  '0 13 * * 1',
  $$SELECT net.http_post(
    'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-live-reminders',
    '{"type": "convite", "limit": 500}'::jsonb,
    headers := '{"Content-Type": "application/json"}'::jsonb
  )$$
);
```

### Verificar cron jobs:
```sql
SELECT * FROM cron.job;
```

### Remover um cron:
```sql
SELECT cron.unschedule('nome-do-job');
```

---

## Tabelas Relevantes

### `live_orbit_leads`
Leads cadastrados para a live. Campos principais: `nome`, `email`, `telefone`, `chosen_date`, UTMs.

### `email_logs`
Log de todos os e-mails enviados. Campos:
- `email_type`: tipo do e-mail (convite, reminder_15min, ao_vivo, proxima_live)
- `recipient_email`, `recipient_name`
- `success`: boolean
- `error_message`: mensagem de erro se falhou
- `resend_id`: ID do MailerSend para tracking

---

## Rate Limits (MailerSend)

- **Plano atual**: ~100 emails/hora (rate limit global por API key)
- **Se bloqueado**: HTTP 429, retry-after em segundos
- **Solução**: Enviar em lotes de 50 com offset, ou fazer upgrade do plano

---

## Arquivos

```
supabase/
  supabase/
    functions/
      send-live-confirmation/index.ts  — Email ao se cadastrar
      send-live-reminders/index.ts     — Todos os emails scheduled
    config.toml
```

## Deploy

```bash
cd /Users/rodrigosouza/DEV/site-orbit/supabase
supabase functions deploy send-live-confirmation --no-verify-jwt
supabase functions deploy send-live-reminders --no-verify-jwt
```

## Troubleshooting

1. **Emails não chegam**: Verificar `email_logs` no Supabase Dashboard
2. **Rate limit**: Esperar 1h ou fazer upgrade MailerSend
3. **Edge Function timeout**: Usar offset/limit menores (max 50)
4. **Leads não aparecem**: Verificar RLS policies + usar service_role key
