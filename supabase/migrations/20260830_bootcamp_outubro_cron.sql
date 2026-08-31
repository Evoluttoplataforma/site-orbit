-- Lembretes do Bootcamp Canais Orbit de 15/10/2026.
-- Horários do pg_cron em UTC; BRT = UTC-3.

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.unschedule('bootcamp-lembrete-d7')
where exists (select 1 from cron.job where jobname = 'bootcamp-lembrete-d7');
select cron.unschedule('bootcamp-lembrete-d1')
where exists (select 1 from cron.job where jobname = 'bootcamp-lembrete-d1');
select cron.unschedule('bootcamp-dia-evento')
where exists (select 1 from cron.job where jobname = 'bootcamp-dia-evento');
select cron.unschedule('bootcamp-ao-vivo')
where exists (select 1 from cron.job where jobname = 'bootcamp-ao-vivo');

-- D-7 — 08/10 às 09h BRT (12:00 UTC)
select cron.schedule(
  'bootcamp-lembrete-d7',
  '0 12 8 10 *',
  $$
  select case when now() < timestamptz '2026-10-16 00:00:00-03' then
    net.http_post(
      url := 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-bootcamp-email',
      headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g"}'::jsonb,
      body := '{"type":"lembrete_d7"}'::jsonb
    ) is not null
  end;
  $$
);

-- D-1 — 14/10 às 09h BRT (12:00 UTC)
select cron.schedule(
  'bootcamp-lembrete-d1',
  '0 12 14 10 *',
  $$
  select case when now() < timestamptz '2026-10-16 00:00:00-03' then
    net.http_post(
      url := 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-bootcamp-email',
      headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g"}'::jsonb,
      body := '{"type":"lembrete_d1"}'::jsonb
    ) is not null
  end;
  $$
);

-- Manhã do evento — 15/10 às 06h30 BRT (09:30 UTC)
select cron.schedule(
  'bootcamp-dia-evento',
  '30 9 15 10 *',
  $$
  select case when now() < timestamptz '2026-10-16 00:00:00-03' then
    net.http_post(
      url := 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-bootcamp-email',
      headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g"}'::jsonb,
      body := '{"type":"dia_evento"}'::jsonb
    ) is not null
  end;
  $$
);

-- Quinze minutos antes — 15/10 às 08h15 BRT (11:15 UTC)
select cron.schedule(
  'bootcamp-ao-vivo',
  '15 11 15 10 *',
  $$
  select case when now() < timestamptz '2026-10-16 00:00:00-03' then
    net.http_post(
      url := 'https://yfpdrckyuxltvznqfqgh.supabase.co/functions/v1/send-bootcamp-email',
      headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g"}'::jsonb,
      body := '{"type":"ao_vivo"}'::jsonb
    ) is not null
  end;
  $$
);
