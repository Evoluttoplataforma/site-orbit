-- ═══════════════════════════════════════════════════════════════
-- Blog comments: threading (reply do admin) + denormaliza slug
--
-- Antes: id, article_id, name, email, phone, comment, status, ...
-- Depois: + parent_id (reply do admin), is_admin_reply, article_slug
--
-- INSERT do público continua bloqueado pra anon — vai pela Edge Function
-- post-blog-comment (que usa service role + valida + notifica por email).
-- SELECT anon continua só pra status='approved'.
-- ═══════════════════════════════════════════════════════════════

-- 1. Novas colunas
alter table blog_comments add column if not exists parent_id      bigint references blog_comments(id) on delete cascade;
alter table blog_comments add column if not exists is_admin_reply boolean default false not null;
alter table blog_comments add column if not exists article_slug   text;

-- 2. Backfill article_slug nos registros existentes (via join com blog_articles)
update blog_comments c
  set article_slug = a.slug
  from blog_articles a
  where c.article_id = a.id and c.article_slug is null;

-- 3. Indexes para listagem rápida no público (por slug + status + data)
create index if not exists idx_blog_comments_slug_status on blog_comments (article_slug, status, created_at desc);
create index if not exists idx_blog_comments_parent      on blog_comments (parent_id);

-- 4. RLS — garantido ON; policies abaixo
alter table blog_comments enable row level security;

-- 4a. Anon: lê só os aprovados
drop policy if exists "anon read approved comments" on blog_comments;
create policy "anon read approved comments" on blog_comments
  for select to anon
  using (status = 'approved');

-- 4b. Anon: INSERT permanece bloqueado (sem policy). Frontend usa
--      a Edge Function post-blog-comment, que entra pela service_role.
--      service_role bypassa RLS automaticamente — não precisa policy.
