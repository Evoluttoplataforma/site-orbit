/**
 * Pre-build script: puxa histórias de clientes do Supabase e gera stories.json + imagens
 * Roda após fetch-articles via npm script (atualiza sitemap pra incluir histórias)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITEMAP_PAGES, CLUSTER_SLUGS, sitemapUrl } from './sitemap-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const IMG_DIR = path.join(ROOT, 'public', 'images', 'stories');

const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const RAW_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ1NjAwNiwiZXhwIjoyMDkwMDMyMDA2fQ.LTZYTuBXAf7cFJrGbo9J_F80VzA_8kbcHiwsTZXRM5Q';
const SUPABASE_KEY = RAW_KEY.replace(/\s+/g, '');

async function fetchStories() {
  console.log('📥 Buscando histórias do Supabase...');
  const url = `${SUPABASE_URL}/rest/v1/customer_stories?status=eq.published&order=published_at.desc&select=id,slug,title,subtitle,company_name,segment,contact_name,contact_role,challenge,solution,results,testimonial,logo_url,cover_url,contact_photo,published_at,updated_at`;

  const resp = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!resp.ok) {
    const err = await resp.text();
    if (fs.existsSync(path.join(DATA_DIR, 'stories.json'))) {
      console.log('⚠️  Supabase indisponível, usando stories.json existente como fallback');
      console.log(`   Erro: ${err.slice(0, 200)}`);
      return null;
    }
    throw new Error(`Supabase error: ${resp.status} — ${err.slice(0, 200)}`);
  }

  return await resp.json();
}

function extractBase64Image(base64Str, filename) {
  const match = base64Str.match(/^data:image\/(\w+);base64,(.+)/s);
  if (!match) return null;

  const ext = match[1].replace('jpeg', 'jpg');
  const data = Buffer.from(match[2], 'base64');
  const fname = `${filename}.${ext}`;
  const fpath = path.join(IMG_DIR, fname);

  if (!fs.existsSync(fpath) || fs.statSync(fpath).size !== data.length) {
    fs.writeFileSync(fpath, data);
    console.log(`   📸 ${fname} (${Math.round(data.length / 1024)}KB)`);
  }

  return `/images/stories/${fname}`;
}

function slugify(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function processStories(stories) {
  console.log(`📝 Processando ${stories.length} histórias...`);

  fs.mkdirSync(IMG_DIR, { recursive: true });
  fs.mkdirSync(DATA_DIR, { recursive: true });

  const seenSlugs = new Set();
  for (const s of stories) {
    if (s.logo_url && s.logo_url.startsWith('data:image')) {
      const url = extractBase64Image(s.logo_url, `logo-${s.id}`);
      if (url) s.logo_url = url;
    }
    if (s.cover_url && s.cover_url.startsWith('data:image')) {
      const url = extractBase64Image(s.cover_url, `cover-${s.id}`);
      if (url) s.cover_url = url;
    }

    // Garante slug único baseado no nome da empresa
    let baseSlug = slugify(s.slug || s.company_name || `historia-${s.id}`);
    if (!baseSlug) baseSlug = `historia-${s.id}`;
    let finalSlug = baseSlug;
    let i = 2;
    while (seenSlugs.has(finalSlug)) {
      finalSlug = `${baseSlug}-${i++}`;
    }
    seenSlugs.add(finalSlug);
    s.slug = finalSlug;
  }

  return stories;
}

function regenerateSitemap(stories) {
  console.log('🗺️  Atualizando sitemap com histórias...');
  const today = new Date().toISOString().split('T')[0];

  let articles = [];
  const articlesPath = path.join(DATA_DIR, 'articles.json');
  if (fs.existsSync(articlesPath)) {
    try {
      articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
    } catch {
      articles = [];
    }
  }

  // Este script roda DEPOIS de fetch-articles e sobrescreve o sitemap inteiro, então
  // precisa reemitir tudo: páginas + artigos + clusters + histórias. A lista de páginas
  // e de clusters vem de scripts/sitemap-config.mjs (fonte única).
  const urls = SITEMAP_PAGES.map(([p, priority, freq]) => sitemapUrl(p, today, freq, priority));

  for (const a of articles) {
    const pubDate = (a.published_at || today).slice(0, 10);
    urls.push(sitemapUrl(`/blog/${a.slug}`, pubDate, 'monthly', '0.8'));
  }

  for (const cs of CLUSTER_SLUGS) {
    urls.push(sitemapUrl(`/blog/cluster/${cs}`, today, 'monthly', '0.7'));
  }

  for (const s of stories) {
    const pubDate = (s.published_at || today).slice(0, 10);
    urls.push(sitemapUrl(`/historias/${s.slug}`, pubDate, 'monthly', '0.7'));
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), sitemap);
  console.log(
    `   ${SITEMAP_PAGES.length} páginas + ${articles.length} artigos + ${CLUSTER_SLUGS.length} clusters + ${stories.length} histórias = ${urls.length} URLs`
  );
}

async function main() {
  console.log('🚀 fetch-stories — Pre-build script\n');

  const stories = await fetchStories();

  if (stories === null) {
    console.log('\n✅ Usando dados existentes (Supabase offline)');
    return;
  }

  const processed = processStories(stories);

  fs.writeFileSync(
    path.join(DATA_DIR, 'stories.json'),
    JSON.stringify(processed, null, 2),
    'utf-8'
  );
  console.log(`\n💾 stories.json salvo (${processed.length} histórias)`);

  regenerateSitemap(processed);

  console.log('\n✅ Pronto!');
}

main().catch((err) => {
  console.error('❌ Erro no fetch-stories:', err.message);
  if (fs.existsSync(path.join(DATA_DIR, 'stories.json'))) {
    console.log('⚠️  Usando stories.json existente como fallback');
    process.exit(0);
  }
  // Sem dados ainda → cria stories.json vazio pra build não quebrar
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, 'stories.json'), '[]', 'utf-8');
  console.log('⚠️  Criado stories.json vazio');
  process.exit(0);
});
