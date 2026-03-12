# Migração para Supabase

## Passo 1: Criar projeto no Supabase
1. Acesse https://supabase.com e crie um projeto
2. Copie a **Project URL** e **anon public key** (Settings → API)

## Passo 2: Criar as tabelas
Execute este SQL no SQL Editor do Supabase:

```sql
-- Tabela de artigos
CREATE TABLE articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    category TEXT,
    author TEXT,
    author_id TEXT,
    read_time TEXT DEFAULT '5 min',
    meta_desc TEXT,
    image_url TEXT,
    image_data TEXT,
    seo_title TEXT,
    seo_canonical TEXT,
    seo_keyword TEXT,
    seo_og_image TEXT,
    lead_magnet_id TEXT,
    cta_banner_enabled TEXT DEFAULT '0',
    cta_banner_title TEXT,
    cta_banner_desc TEXT,
    cta_banner_cta_text TEXT,
    cta_banner_cta_url TEXT,
    cta_banner_image TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de usuários (perfil)
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de lead magnets
CREATE TABLE lead_magnets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT,
    title TEXT NOT NULL,
    description TEXT,
    cta TEXT,
    url TEXT,
    event TEXT,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de customer stories
CREATE TABLE customer_stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    slug TEXT UNIQUE,
    empresa TEXT,
    nome TEXT,
    cargo TEXT,
    segmento TEXT,
    conteudo TEXT,
    company_logo TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_stories_status ON customer_stories(status);

-- RLS (Row Level Security)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_magnets ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_stories ENABLE ROW LEVEL SECURITY;

-- Políticas: leitura pública para artigos publicados
CREATE POLICY "Artigos publicados são públicos" ON articles
    FOR SELECT USING (status = 'published');

-- Políticas: CRUD total para usuários autenticados
CREATE POLICY "Usuários autenticados gerenciam artigos" ON articles
    FOR ALL USING (auth.role() = 'authenticated');

-- Stories publicadas são públicas
CREATE POLICY "Stories publicadas são públicas" ON customer_stories
    FOR SELECT USING (status = 'published');

-- Inserção pública de stories (formulário de envio)
CREATE POLICY "Qualquer um pode enviar story" ON customer_stories
    FOR INSERT WITH CHECK (true);

-- Autenticados gerenciam stories
CREATE POLICY "Autenticados gerenciam stories" ON customer_stories
    FOR ALL USING (auth.role() = 'authenticated');
```

## Passo 3: Criar usuário admin
No Supabase Dashboard → Authentication → Users → Invite User
- Email: seu-email@dominio.com
- Depois insira na tabela users:
```sql
INSERT INTO users (auth_id, name, email, role)
VALUES ('UUID_DO_AUTH_USER', 'Seu Nome', 'seu-email@dominio.com', 'admin');
```

## Passo 4: Ativar no código
Edite `/js/db-config.js`:
```javascript
var DB_CONFIG = {
    USE_SUPABASE: true,  // ← Mudar para true
    SUPABASE_URL: 'https://SEU-PROJETO.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOi...',
    // ...resto igual
};
```

## Passo 5: Adicionar Supabase JS nas páginas
Nas páginas que usam o banco (painel, blog, leitor), adicionar ANTES do db.js:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="/js/db-config.js"></script>
<script src="/js/db.js"></script>
```

## Passo 6: Migrar dados existentes
Se já tem artigos no localStorage, exporte e importe:
1. No console do browser: `copy(localStorage.getItem('orbit_cms'))`
2. Cole num editor de texto
3. Use o SQL Editor do Supabase para inserir os artigos

## Resultado
- Blog público: qualquer visitante vê os artigos
- CMS: login via Supabase Auth
- Imagens: podem migrar para Supabase Storage depois
- SEO: Google indexa artigos via API pública do Supabase
