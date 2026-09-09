-- Masterclass Consultores (quinta 18h) no mesmo catálogo de /treinamentos.
-- A inscrição acontece em /live/chris; o cron de lembretes lê training_sessions.
insert into public.training_sessions
  (slug, title, kind, description, weekday, start_time, duration_min,
   zoom_meeting_id, zoom_join_url, recurrence_ends_at, active, sort_order)
values
  ('qui-18-masterclass', 'Masterclass Consultores', 'treinamento',
   'Live semanal para consultores com Christian Hart. Toda quinta às 18h.',
   4, '18:00', 60,
   '83446076289', 'https://us06web.zoom.us/j/83446076289',
   '2027-08-05T21:00:00Z', true, 10)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  weekday = excluded.weekday,
  start_time = excluded.start_time,
  zoom_meeting_id = excluded.zoom_meeting_id,
  zoom_join_url = excluded.zoom_join_url,
  recurrence_ends_at = excluded.recurrence_ends_at,
  active = true,
  updated_at = now();
