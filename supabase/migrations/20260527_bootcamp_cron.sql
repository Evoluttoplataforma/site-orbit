-- ═══════════════════════════════════════════════════════════════
-- Cron dos lembretes do Bootcamp Orbit (13/06/2026 · 09h BRT)
-- Dispara a Edge Function send-bootcamp-email em massa nas datas certas.
-- Horários em UTC (BRT = UTC-3). Guarda de data evita refire em 2027+.
-- ═══════════════════════════════════════════════════════════════

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- URL da função + anon key (mesma usada no frontend; função aceita anon)
-- Body por tipo: lembrete_d1 | dia_evento | ao_vivo

-- Remove jobs antigos (idempotente)
select cron.unschedule('bootcamp-lembrete-d1')  where exists (select 1 from cron.job where jobname = 'bootcamp-lembrete-d1');
select cron.unschedule('bootcamp-dia-evento')   where exists (select 1 from cron.job where jobname = 'bootcamp-dia-evento');
select cron.unschedule('bootcamp-ao-vivo')      where exists (select 1 from cron.job where jobname = 'bootcamp-ao-vivo');

-- D-1 — 12/06 às 09h BRT (12:00 UTC)
select cron.schedule(
  'bootcamp-lembrete-d1',
  '0 12 12 6 *',
  $$
  select case when now() < timestamptz '2026-06-15 00:00:00-03' then
    net.http_post(
      url    := 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-bootcamp-email',
      headers:= '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g"}'::jsonb,
      body   := '{"type":"lembrete_d1"}'::jsonb
    ) is not null
  end;
  $$
);

-- Dia do evento — 13/06 às 07h BRT (10:00 UTC)
select cron.schedule(
  'bootcamp-dia-evento',
  '0 10 13 6 *',
  $$
  select case when now() < timestamptz '2026-06-15 00:00:00-03' then
    net.http_post(
      url    := 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-bootcamp-email',
      headers:= '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g"}'::jsonb,
      body   := '{"type":"dia_evento"}'::jsonb
    ) is not null
  end;
  $$
);

-- Começa em 15 min — 13/06 às 08h45 BRT (11:45 UTC)
select cron.schedule(
  'bootcamp-ao-vivo',
  '45 11 13 6 *',
  $$
  select case when now() < timestamptz '2026-06-15 00:00:00-03' then
    net.http_post(
      url    := 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-bootcamp-email',
      headers:= '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g"}'::jsonb,
      body   := '{"type":"ao_vivo"}'::jsonb
    ) is not null
  end;
  $$
);
