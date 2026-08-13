-- ═══════════════════════════════════════════════════════════════════════════
-- Crons de /treinamentos
--
-- ⚠️  NAO APLICAR ANTES DE:
--     1. criar as 3 reuniões no Zoom e gravar zoom_meeting_id em training_sessions
--     2. definir os secrets da function (deploy-training-zoom.ps1)
--     3. gravar os 2 segredos no Vault (abaixo)
--
--     Sem isso os jobs rodam a cada 10 min e só acumulam erro 403.
--
-- Diferente dos crons do bootcamp (20260527_bootcamp_cron.sql), que cravam a anon
-- key literal no comando, aqui as credenciais vêm do Vault do Supabase — então
-- este arquivo pode ser commitado sem vazar nada.
--
-- ALTER DATABASE ... SET não funciona no Supabase (sem superusuário), por isso
-- Vault e não configuração de banco.
--
-- Gravar UMA VEZ (com os valores reais, fora deste arquivo):
--   select vault.create_secret('<anon key>',    'mkt_anon_key');
--   select vault.create_secret('<CRON_SECRET>', 'training_cron_secret');
-- O CRON_SECRET tem de ser o MESMO valor do secret da edge function.
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Lê um segredo do Vault. Existe para o comando do cron não precisar de acesso
-- direto ao schema vault e para manter o SQL do job legível.
create or replace function public.vault_secret(p_name text)
returns text
language sql
security definer
set search_path = vault, public
as $$
  select decrypted_secret from vault.decrypted_secrets where name = p_name limit 1;
$$;
revoke all on function public.vault_secret(text) from anon, authenticated;

-- idempotente
select cron.unschedule('training-reminders')     where exists (select 1 from cron.job where jobname = 'training-reminders');
select cron.unschedule('training-zoom-retry')    where exists (select 1 from cron.job where jobname = 'training-zoom-retry');
select cron.unschedule('training-zoom-health')   where exists (select 1 from cron.job where jobname = 'training-zoom-health');
select cron.unschedule('training-ratelimit-gc')  where exists (select 1 from cron.job where jobname = 'training-ratelimit-gc');

-- ─── lembretes: a cada 10 min ──────────────────────────────────────────────
-- A function faz o window matching (d1 ~24h antes, h1 ~1h antes) e o claim
-- atômico, então rodar de 10 em 10 min é seguro: tick repetido não reenvia.
select cron.schedule(
  'training-reminders',
  '*/10 * * * *',
  $$
  select net.http_post(
    url     := 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-training-reminders',
    headers := jsonb_build_object(
      'Content-Type',   'application/json',
      'apikey',         public.vault_secret('mkt_anon_key'),
      'Authorization',  'Bearer ' || public.vault_secret('mkt_anon_key'),
      'x-cron-secret',  public.vault_secret('training_cron_secret')
    ),
    body    := '{"kind":"both","limit":200}'::jsonb,
    timeout_milliseconds := 120000
  );
  $$
);

-- ─── retry das inscrições que não chegaram ao Zoom: a cada 30 min ──────────
-- Cobre Zoom fora do ar, 429, e o período em que a integração ficou desligada.
select cron.schedule(
  'training-zoom-retry',
  '*/30 * * * *',
  $$
  select net.http_post(
    url     := 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/register-training',
    headers := jsonb_build_object(
      'Content-Type',   'application/json',
      'apikey',         public.vault_secret('mkt_anon_key'),
      'Authorization',  'Bearer ' || public.vault_secret('mkt_anon_key'),
      'x-cron-secret',  public.vault_secret('training_cron_secret')
    ),
    body    := '{"mode":"retry_pending","limit":50}'::jsonb,
    timeout_milliseconds := 120000
  );
  $$
);

-- ─── saúde da recorrência: diário às 12:00 UTC (09h BRT) ───────────────────
-- Reunião recorrente do Zoom tem no máximo 50 ocorrências: uma sessão semanal
-- expira em ~11,5 meses. Se expirar sem ninguém notar, POST /registrants passa a
-- dar 404 e as inscrições ficam 'pending' — a página segue dizendo "confirmado"
-- e ninguém recebe link. Este job grava um WARNING no log do Postgres.
select cron.schedule(
  'training-zoom-health',
  '0 12 * * *',
  $$
  do $health$
  declare r record;
  begin
    for r in
      select slug, recurrence_ends_at
      from public.training_sessions
      where active
        and (recurrence_ends_at is null or recurrence_ends_at < now() + interval '56 days')
    loop
      raise warning '[training-zoom-health] sessao % com recorrencia acabando/ausente: %',
        r.slug, coalesce(r.recurrence_ends_at::text, 'NAO DEFINIDA');
    end loop;
  end
  $health$;
  $$
);

-- ─── limpeza do rate limit: diário 04:30 UTC ───────────────────────────────
select cron.schedule(
  'training-ratelimit-gc',
  '30 4 * * *',
  $$ delete from public.rate_limit_hits where hit_at < now() - interval '2 days' $$
);
