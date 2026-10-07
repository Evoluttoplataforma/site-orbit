-- Grade /treinamentos: tira dúvidas no Zoom + mentorias de canais no Meet.
-- kind passa a aceitar 'mentoria'. As salas do Meet ficam em zoom_join_url
-- (sem zoom_meeting_id) — o card público NÃO renderiza esse URL.
--
-- NÃO desativa qua-10-treinamento nem qui-18-masterclass aqui: a página em
-- produção ainda usa esses slugs. Desativar só depois do deploy do site.

alter table public.training_sessions
  drop constraint if exists training_sessions_kind_check;

alter table public.training_sessions
  add constraint training_sessions_kind_check
  check (kind in ('tira-duvidas', 'treinamento', 'mentoria'));

alter table public.training_sessions
  add column if not exists cadence text not null default 'weekly';

alter table public.training_sessions
  drop constraint if exists training_sessions_cadence_check;

alter table public.training_sessions
  add constraint training_sessions_cadence_check
  check (cadence in ('weekly', 'biweekly'));

insert into public.training_sessions
  (slug, title, kind, description, weekday, start_time, duration_min,
   zoom_meeting_id, zoom_join_url, recurrence_ends_at, active, sort_order, cadence)
values
  (
    'qua-18-mentoria-adocao',
    'Mentoria de Adoção',
    'mentoria',
    'Comece certo. Tenha quem já fez para te guiar. Mentoria para conquistar seu primeiro cliente, colocar a plataforma em operação e gerar os primeiros resultados.',
    3, '18:00', 60, null,
    'https://meet.google.com/mzv-hpim-aeq',
    '2027-07-12 20:00:00+00', true, 4, 'weekly'
  ),
  (
    'qui-18-mentoria-consolidacao',
    'Mentoria de Consolidação',
    'mentoria',
    'Valide seu método. Transforme resultado em consistência. Mentoria para estruturar sua operação, validar seu método e consolidar o uso do Consultor Digital.',
    4, '18:00', 60, null,
    'https://meet.google.com/kyg-fxhf-poe',
    '2027-07-12 20:00:00+00', true, 5, 'biweekly'
  ),
  (
    'qui-18-mentoria-expansao',
    'Mentoria de Expansão',
    'mentoria',
    'Amplie seus resultados. Escale o que já funciona. Mentoria para expandir sua operação, aumentar o ROI e transformar resultados em crescimento recorrente.',
    4, '18:00', 60, null,
    'https://meet.google.com/xpk-iosz-ntz',
    '2027-07-12 20:00:00+00', true, 6, 'biweekly'
  )
on conflict (slug) do update set
  title = excluded.title,
  kind = excluded.kind,
  description = excluded.description,
  weekday = excluded.weekday,
  start_time = excluded.start_time,
  duration_min = excluded.duration_min,
  zoom_meeting_id = excluded.zoom_meeting_id,
  zoom_join_url = excluded.zoom_join_url,
  recurrence_ends_at = excluded.recurrence_ends_at,
  active = excluded.active,
  sort_order = excluded.sort_order,
  cadence = excluded.cadence,
  updated_at = now();
