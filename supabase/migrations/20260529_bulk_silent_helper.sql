-- ═══════════════════════════════════════════════════════════════
-- bulk_update_blog_articles_silent: aplica N UPDATEs sem disparar
-- o webhook do Cloudflare (que escuta a tabela blog_articles).
--
-- Como: pausa todos os triggers de "user" (incluindo o do webhook)
-- pela duração da função, faz os UPDATEs, e religa.
--
-- Uso (via PostgREST RPC):
--   POST /rest/v1/rpc/bulk_update_blog_articles_silent
--   { "updates": [{ "id": 1, "content": "<p>..." }, ...] }
--
-- Quando o objetivo é que o site rebuilde DEPOIS do bulk, dispare
-- 1 deploy manual (commit no repo OU chamada ao Cloudflare Deploy
-- Hook) — em vez de N.
-- ═══════════════════════════════════════════════════════════════

create or replace function public.bulk_update_blog_articles_silent(updates jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  item       jsonb;
  n_updated  integer := 0;
begin
  if updates is null or jsonb_typeof(updates) <> 'array' then
    raise exception 'updates deve ser um array JSON';
  end if;

  -- Pausa triggers de usuário (webhook é trigger de usuário em PostgreSQL).
  alter table public.blog_articles disable trigger user;

  for item in select * from jsonb_array_elements(updates)
  loop
    update public.blog_articles
       set content    = item->>'content',
           updated_at = now()
     where id = (item->>'id')::bigint;
    if found then n_updated := n_updated + 1; end if;
  end loop;

  -- Religa triggers.
  alter table public.blog_articles enable trigger user;

  return n_updated;
exception when others then
  -- Garante que triggers reativem mesmo em caso de erro
  alter table public.blog_articles enable trigger user;
  raise;
end;
$$;

-- Permite chamar via service_role (anon não pode — segurança).
revoke all on function public.bulk_update_blog_articles_silent(jsonb) from public;
revoke all on function public.bulk_update_blog_articles_silent(jsonb) from anon, authenticated;
grant execute on function public.bulk_update_blog_articles_silent(jsonb) to service_role;
