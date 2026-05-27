-- ═══════════════════════════════════════════════════════════════
-- Pagamentos do Bootcamp (presencial) — alimentado pelo webhook da Stripe
-- ═══════════════════════════════════════════════════════════════
create table if not exists bootcamp_pagamentos (
  id                bigint generated always as identity primary key,
  email             text not null,
  nome              text,
  amount_total      integer,          -- em centavos (Stripe)
  currency          text,
  stripe_session_id text unique,      -- evita duplicar o mesmo pagamento
  status            text default 'paid',
  created_at        timestamptz default now()
);

create index if not exists idx_bootcamp_pag_email on bootcamp_pagamentos (lower(email));

-- RLS ligado sem policies → apenas service_role (Edge Functions) acessa.
alter table bootcamp_pagamentos enable row level security;
