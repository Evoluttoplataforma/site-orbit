-- Lembretes de treinamento duplicados: fecha a brecha do claim.
--
-- SINTOMA OBSERVADO (02/08/2026): marco.oliveira@orbitgestao.com.br recebeu
-- treinamento_d1_qua-10-treinamento e treinamento_h1_qua-10-treinamento DUAS VEZES cada,
-- com ~80 minutos de intervalo. Confirmado em email_logs.
--
-- CAUSA: send-training-reminders/index.ts:304-317 faz, nesta ordem:
--   1. sendOne()  -> envia pelo MailerSend E grava em email_logs
--   2. update training_reminders set status = 'sent'
-- Se o isolate morre entre 1 e 2 (deploy, timeout, OOM), a linha continua 'pending'. O
-- anti-join abaixo reivindicava qualquer 'pending' com claimed_at mais velho que 15 min,
-- então o tick seguinte reenviava um e-mail que JÁ tinha saído.
--
-- CORREÇÃO: além da condição de claim, não reivindicar quando já existe registro de
-- ENVIO BEM-SUCEDIDO em email_logs para o mesmo (destinatário, tipo) na janela da
-- ocorrência. email_logs é escrito dentro do sendOne, no mesmo passo do envio, então é a
-- evidência mais confiável de "esse e-mail saiu" que existe no banco.
--
-- Por que não marcar 'sent' ANTES de enviar (o caminho mais curto): isso troca duplicata
-- por lembrete PERDIDO — se o envio falhasse, a linha ficaria 'sent' sem e-mail nenhum.
-- Perder o lembrete de 1 hora significa a pessoa perder a sessão; receber dois é
-- irritante. Entre os dois erros, escolho o irritante.
--
-- A janela de 36h cobre a ocorrência atual sem alcançar a da semana anterior (7 dias
-- atrás), e o email_type carrega o kind ('d1'/'h1'), então d1 nunca bloqueia h1.

-- Torna o anti-join barato: uma linha de email_logs por destinatário/tipo recente.
create index if not exists email_logs_recipient_type_idx
  on public.email_logs (lower(recipient_email), email_type, created_at desc)
  where success;

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
      -- Guarda contra reenvio: esse e-mail já saiu com sucesso para essa pessoa.
      and not exists (
        select 1 from email_logs el
        where lower(el.recipient_email) = lower(r.email)
          and el.email_type = 'treinamento_' || p_kind || '_' || p_slug
          and el.success
          and el.created_at > now() - interval '36 hours'
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
