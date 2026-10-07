-- Mentoria de Adoção: sala do Meet distinta da Consolidação.
-- Card público continua sem o URL; só e-mail / obrigado / ficha.

update public.training_sessions
set zoom_join_url = 'https://meet.google.com/mzv-hpim-aeq',
    updated_at = now()
where slug = 'qua-18-mentoria-adocao';

update public.training_registrations
set zoom_join_url = 'https://meet.google.com/mzv-hpim-aeq'
where session_slug = 'qua-18-mentoria-adocao'
  and coalesce(zoom_join_url, '') <> 'https://meet.google.com/mzv-hpim-aeq';
