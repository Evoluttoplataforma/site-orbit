# 🗄️ Schema do banco — DDL completa

Todas as tabelas e RLS policies que o CMS usa. Roda esse SQL no Supabase do cliente novo (SQL Editor) e ele tá pronto pra receber o CMS.

## Tabelas

### `cms_admins` — usuários do painel

```sql
CREATE TABLE public.cms_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'editor', -- 'admin' ou 'editor'
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.cms_admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_read" ON public.cms_admins FOR SELECT TO anon USING (true);
CREATE POLICY "authenticated_full_access" ON public.cms_admins FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

**⚠️ Importante:** o usuário precisa primeiro ser criado em `auth.users` (via Supabase Auth — `signUp` ou painel admin do Supabase) E depois ter o `id` (mesmo UUID) inserido em `cms_admins`. Os dois IDs devem bater.

### `blog_articles` — posts do blog

```sql
CREATE TABLE public.blog_articles (
  id bigserial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  content text, -- HTML rich text
  cover_url text, -- data URL ou URL externa
  category text NOT NULL,
  author text NOT NULL,
  author_avatar text, -- data URL ou URL
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Lead magnet vinculado (opcional)
  lead_magnet_id integer,
  
  -- CTA banner customizado por artigo
  cta_banner_enabled boolean DEFAULT false,
  cta_banner_title text,
  cta_banner_desc text,
  cta_banner_cta_text text,
  cta_banner_cta_url text,
  cta_banner_image text, -- data URL
  
  -- SEO
  seo_title text,
  seo_canonical text,
  seo_keyword text,
  seo_og_image text
);

CREATE INDEX idx_blog_articles_published ON public.blog_articles(published, published_at DESC);
CREATE INDEX idx_blog_articles_slug ON public.blog_articles(slug);
CREATE INDEX idx_blog_articles_category ON public.blog_articles(category);

ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published articles" 
  ON public.blog_articles FOR SELECT TO anon 
  USING (published = true);

CREATE POLICY "Authenticated full access" 
  ON public.blog_articles FOR ALL TO authenticated 
  USING (true) WITH CHECK (true);

-- Trigger pra updated_at automático
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_articles_updated_at
  BEFORE UPDATE ON public.blog_articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

### `lead_magnets` — iscas digitais (PDFs, etc)

```sql
CREATE TABLE public.lead_magnets (
  id bigserial PRIMARY KEY,
  type text NOT NULL, -- 'pdf', 'video', 'webinar', 'ebook', etc
  title text NOT NULL,
  description text,
  cta_text text,
  cta_url text,
  file_url text, -- data URL do PDF ou URL externa
  cover_url text, -- imagem de capa
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.lead_magnets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active" 
  ON public.lead_magnets FOR SELECT TO anon 
  USING (active = true);

CREATE POLICY "Allow anon insert on lead_magnets" 
  ON public.lead_magnets FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated insert on lead_magnets" 
  ON public.lead_magnets FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Auth full access" 
  ON public.lead_magnets FOR ALL TO authenticated 
  USING (true) WITH CHECK (true);

CREATE TRIGGER lead_magnets_updated_at
  BEFORE UPDATE ON public.lead_magnets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

### `customer_stories` — case studies

```sql
CREATE TABLE public.customer_stories (
  id bigserial PRIMARY KEY,
  slug text UNIQUE,
  company_name text NOT NULL,
  segment text,
  contact_name text,
  contact_role text,
  challenge text, -- HTML rich text: o problema
  solution text, -- HTML rich text: como resolveu
  results text, -- HTML rich text: KPIs/resultados
  testimonial text, -- depoimento curto
  logo_url text,
  cover_url text,
  status text DEFAULT 'draft', -- 'draft' ou 'published'
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_stories_status ON public.customer_stories(status, published_at DESC);

ALTER TABLE public.customer_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published" 
  ON public.customer_stories FOR SELECT TO anon 
  USING (status = 'published');

CREATE POLICY "anon_full_access" 
  ON public.customer_stories FOR ALL TO anon 
  USING (true) WITH CHECK (true);

CREATE POLICY "authenticated_full_access" 
  ON public.customer_stories FOR ALL TO authenticated 
  USING (true) WITH CHECK (true);

CREATE TRIGGER customer_stories_updated_at
  BEFORE UPDATE ON public.customer_stories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

### `blog_comments` — comentários moderados

```sql
CREATE TABLE public.blog_comments (
  id serial PRIMARY KEY,
  article_id integer NOT NULL REFERENCES public.blog_articles(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  comment text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_comments_article ON public.blog_comments(article_id, status);
CREATE INDEX idx_comments_status ON public.blog_comments(status, created_at DESC);

ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit comments" 
  ON public.blog_comments FOR INSERT TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Public can read approved comments" 
  ON public.blog_comments FOR SELECT TO anon, authenticated 
  USING (status = 'approved');

CREATE POLICY "Authenticated full access" 
  ON public.blog_comments FOR ALL TO authenticated 
  USING (true) WITH CHECK (true);

CREATE TRIGGER blog_comments_updated_at
  BEFORE UPDATE ON public.blog_comments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

### `site_banners` — banners do site (popups, top bars)

```sql
CREATE TABLE public.site_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  cta_text text,
  cta_url text,
  image_data text, -- data URL (opcional)
  
  -- Modo de exibição
  display_mode text NOT NULL DEFAULT 'banner', -- 'banner' (top/bottom bar) ou 'popup'
  position text NOT NULL DEFAULT 'below-header', -- 'above-header', 'below-header', 'floating-bottom', 'popup-center', 'popup-side'
  
  -- Comportamento
  dismissible boolean NOT NULL DEFAULT true,
  
  -- Estilo
  bg_color text,
  text_color text,
  
  -- Agendamento
  start_date timestamptz,
  end_date timestamptz,
  active boolean NOT NULL DEFAULT true,
  
  -- Ordem (quando múltiplos ativos na mesma posição)
  priority integer NOT NULL DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_banners_active ON public.site_banners(active, position, priority DESC);

ALTER TABLE public.site_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active banners" 
  ON public.site_banners FOR SELECT 
  USING (
    active = true 
    AND (start_date IS NULL OR start_date <= now()) 
    AND (end_date IS NULL OR end_date >= now())
  );

CREATE POLICY "Authenticated users full access" 
  ON public.site_banners FOR ALL 
  USING (auth.role() = 'authenticated') 
  WITH CHECK (auth.role() = 'authenticated');

CREATE TRIGGER site_banners_updated_at
  BEFORE UPDATE ON public.site_banners
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

## Resumo das policies

| Tabela | Anônimo (público do site) | Autenticado (CMS) |
|---|---|---|
| `blog_articles` | SELECT só `published=true` | TUDO |
| `blog_comments` | INSERT (qualquer) + SELECT só `status='approved'` | TUDO |
| `cms_admins` | SELECT (pra checar role) | TUDO |
| `customer_stories` | SELECT só `status='published'` | TUDO |
| `lead_magnets` | INSERT + SELECT só `active=true` | TUDO |
| `site_banners` | SELECT só ativos no período | TUDO |

## Setup inicial pós-criação

1. **Criar primeiro admin:**
   - Vai no painel Supabase → Authentication → Add User → email + senha
   - Copia o `id` (UUID) gerado
   - Roda no SQL Editor:
     ```sql
     INSERT INTO cms_admins (id, email, name, role)
     VALUES ('UUID-COPIADO', 'admin@cliente.com', 'Nome do Admin', 'admin');
     ```

2. **Configurar Auth → Email:**
   - Settings → Auth → desativa "Confirm email" (pra não precisar verificação)
   - Ou configura SMTP se quiser email de boas-vindas

3. **Configurar Storage (se for usar uploads grandes):**
   - O CMS atual usa data URL (base64) embutido — funciona até ~5MB por imagem
   - Se quiser arquivos maiores, criar bucket `blog-assets` e migrar uploads pra storage
