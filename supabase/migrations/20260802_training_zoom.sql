-- ═══════════════════════════════════════════════════════════════════════════
-- /treinamentos: migração Google Meet → Zoom com inscrição única
--
-- A pessoa se inscreve UMA vez, é registrada no Zoom via API em cada sessão que
-- marcar, e passa a receber lembrete antes de cada ocorrência semanal.
--
-- live_orbit_leads NÃO muda: continua 1 linha por inscrito. send-live-reminders
-- deduplica por e-mail globalmente e live-crm-sync (cron ativo) lê dela — mexer
-- no shape quebraria os dois. O estado por sessão vive em training_registrations.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1) Catálogo de sessões ────────────────────────────────────────────────
-- zoom_meeting_id fica AQUI, não em env var: renovar a recorrência (que expira
-- em ~11,5 meses, limite de 50 ocorrências do Zoom) vira UPDATE, sem redeploy.
create table if not exists public.training_sessions (
  slug               text primary key,
  title              text not null,
  kind               text not null check (kind in ('tira-duvidas','treinamento')),
  description        text,
  weekday            smallint not null check (weekday between 0 and 6),  -- 1=Seg (JS getDay)
  start_time         time not null,
  duration_min       smallint not null default 60,
  timezone           text not null default 'America/Sao_Paulo',
  zoom_meeting_id    text,
  zoom_join_url      text,
  recurrence_ends_at timestamptz,
  active             boolean not null default true,
  sort_order         smallint not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on column public.training_sessions.weekday is
  'Dia da semana no padrão JS getDay(): 0=Dom .. 6=Sáb. ATENÇÃO: o weekly_days da API do Zoom usa 1=Dom, ou seja +1.';
comment on column public.training_sessions.recurrence_ends_at is
  'Fim da recorrência no Zoom. O cron training-zoom-health alerta quando estiver perto.';

-- ─── 2) Inscrições (1:N com a pessoa) ──────────────────────────────────────
-- Tabela própria porque o join_url do Zoom é por par (pessoa, reunião): é uma
-- entidade de junção. Colunas zoom_join_url_1..3 seriam 1:N em colunas.
create table if not exists public.training_registrations (
  id           uuid primary key default gen_random_uuid(),
  lead_id      bigint references public.live_orbit_leads(id) on delete set null,
  session_slug text not null references public.training_sessions(slug),

  nome     text not null,
  email    text not null,
  telefone text,
  empresa  text,

  -- estado da chamada ao Zoom
  zoom_status text not null default 'pending'
    check (zoom_status in ('pending','registered','failed','skipped')),
  zoom_registrant_id  text,
  zoom_participant_id text,
  zoom_join_url       text,
  zoom_error          text,
  zoom_error_kind     text check (zoom_error_kind in ('retryable','permanent')),
  zoom_attempts       smallint not null default 0,
  zoom_registered_at  timestamptz,

  -- lembretes
  reminders_enabled boolean not null default true,
  unsubscribed_at   timestamptz,
  bounce_count      smallint not null default 0,

  -- rastreio
  source       text,
  landing_page text,
  referrer     text,
  session_id   text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  utm_term     text,
  gclid        text,
  fbclid       text,
  ip_hash      text,  -- sha256(ip + salt); nunca IP cru (LGPD)

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- é o que torna o double-submit inofensivo
  constraint training_registrations_email_session_uniq unique (email, session_slug)
);

create index if not exists training_registrations_retry_idx
  on public.training_registrations (session_slug)
  where zoom_status in ('pending','failed');

create index if not exists training_registrations_sendable_idx
  on public.training_registrations (session_slug, created_at)
  where reminders_enabled and unsubscribed_at is null and zoom_status = 'registered';

create index if not exists training_registrations_email_idx
  on public.training_registrations (email);

-- ─── 3) Controle de lembretes ──────────────────────────────────────────────
-- O unique abaixo é o que garante um lembrete só por (pessoa, ocorrência, tipo),
-- mesmo com o cron rodando a cada 10 min e pegando a mesma janela em 2-3 ticks.
create table if not exists public.training_reminders (
  id              uuid primary key default gen_random_uuid(),
  registration_id uuid not null references public.training_registrations(id) on delete cascade,
  session_slug    text not null,
  occurrence_date date not null,  -- data LOCAL BRT da ocorrência
  kind            text not null check (kind in ('d1','h1')),
  status          text not null default 'pending' check (status in ('pending','sent','failed')),
  attempts   smallint not null default 0,
  message_id text,
  error      text,
  claimed_at timestamptz not null default now(),
  sent_at    timestamptz,
  constraint training_reminders_uniq unique (registration_id, occurrence_date, kind)
);

comment on column public.training_reminders.occurrence_date is
  'Data LOCAL de São Paulo. Derivar de toISOString() erra entre 21h e meia-noite, quando o UTC já virou o dia.';

create index if not exists training_reminders_occurrence_idx
  on public.training_reminders (occurrence_date desc, kind);
create index if not exists training_reminders_stale_idx
  on public.training_reminders (claimed_at) where status = 'pending';

-- ─── 4) Rate limit ─────────────────────────────────────────────────────────
-- Tabela separada porque, com o unique de training_registrations, alguém
-- martelando o MESMO e-mail não cria linhas novas lá — contar inscrições
-- subestimaria o abuso.
create table if not exists public.rate_limit_hits (
  bucket_key text not null,
  scope      text not null,
  hit_at     timestamptz not null default now()
);
create index if not exists rate_limit_hits_lookup_idx
  on public.rate_limit_hits (scope, bucket_key, hit_at desc);

-- ─── 5) RLS: leitura pública só do catálogo; escrita só por service_role ────
alter table public.training_sessions      enable row level security;
alter table public.training_registrations enable row level security;
alter table public.training_reminders     enable row level security;
alter table public.rate_limit_hits        enable row level security;

drop policy if exists "anon read active sessions" on public.training_sessions;
create policy "anon read active sessions" on public.training_sessions
  for select to anon, authenticated using (active);

drop policy if exists "auth read registrations" on public.training_registrations;
create policy "auth read registrations" on public.training_registrations
  for select to authenticated using (true);

drop policy if exists "auth read reminders" on public.training_reminders;
create policy "auth read reminders" on public.training_reminders
  for select to authenticated using (true);

-- Sem policy de INSERT/UPDATE em nenhuma: service_role bypassa RLS, anon não escreve.

-- ─── 6) Seed da grade nova ─────────────────────────────────────────────────
insert into public.training_sessions
  (slug, title, kind, description, weekday, start_time, sort_order) values
  ('seg-17-tira-duvidas', 'Tira Dúvidas', 'tira-duvidas',
   'Você traz a dúvida e a gente resolve ao vivo. Sem conteúdo preparado — a sessão é sua.',
   1, '17:00', 1),
  ('qua-10-treinamento',  'Treinamento',  'treinamento',
   'Aula passo a passo de um módulo, tema ou das novidades da plataforma.',
   3, '10:00', 2),
  ('sex-09-tira-duvidas', 'Tira Dúvidas', 'tira-duvidas',
   'Você traz a dúvida e a gente resolve ao vivo. Sem conteúdo preparado — a sessão é sua.',
   5, '09:00', 3)
on conflict (slug) do nothing;

-- ─── 7) RPC de claim atômico ───────────────────────────────────────────────
-- Reivindica destinatários ANTES de enviar e devolve só o que este chamador
-- reivindicou. Crash entre claim e envio deixa 'pending', e depois de 15 min
-- outro tick reivindica de novo.
--
-- O `not exists` vem ANTES do limit de propósito: com o limit antes do
-- anti-join, um lote inteiro pode vir já-reivindicado e o envio para.
create or replace function public.claim_training_reminders(
  p_slug  text,
  p_date  date,
  p_kind  text,
  p_limit int default 200
) returns table (
  reminder_id     uuid,
  registration_id uuid,
  nome            text,
  email           text,
  join_url        text
)
language sql
security definer
set search_path = public
as $$
  with cand as (
    select r.id, r.nome, r.email, r.zoom_join_url
    from training_registrations r
    where r.session_slug = p_slug
      and r.zoom_status = 'registered'
      and r.reminders_enabled
      and r.unsubscribed_at is null
      and r.bounce_count < 2
      and not exists (
        select 1 from training_reminders m
        where m.registration_id = r.id
          and m.occurrence_date = p_date
          and m.kind = p_kind
          and (m.status <> 'pending' or m.claimed_at > now() - interval '15 minutes')
      )
    order by r.created_at
    limit p_limit
  ),
  claimed as (
    insert into training_reminders
      (registration_id, session_slug, occurrence_date, kind, status, claimed_at)
    select c.id, p_slug, p_date, p_kind, 'pending', now() from cand c
    on conflict (registration_id, occurrence_date, kind) do update
      set claimed_at = now(), attempts = training_reminders.attempts + 1
      where training_reminders.status = 'pending'
    returning id, registration_id
  )
  select cl.id, cl.registration_id, c.nome, c.email, c.zoom_join_url
  from claimed cl
  join cand c on c.id = cl.registration_id;
$$;

revoke all on function public.claim_training_reminders(text, date, text, int) from anon, authenticated;

-- ─── 8) Trigger de updated_at ──────────────────────────────────────────────
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists training_sessions_touch on public.training_sessions;
create trigger training_sessions_touch before update on public.training_sessions
  for each row execute function public.touch_updated_at();

drop trigger if exists training_registrations_touch on public.training_registrations;
create trigger training_registrations_touch before update on public.training_registrations
  for each row execute function public.touch_updated_at();
