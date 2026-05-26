/**
 * Publica artigos do cluster da Dor 1 (Processos) no Supabase.
 *
 * Lê .md de `ideias de artigos pci/`, converte markdown → HTML,
 * extrai frontmatter + schemas JSON-LD, faz upsert por slug.
 *
 * Idempotente: rodar várias vezes não duplica. Slugs novos = INSERT;
 * slugs existentes = PATCH (atualiza content/metadados).
 *
 * Uso:  node supabase/scripts/publish-cluster-articles.mjs
 *
 * NÃO altera nada se o Supabase não responder. Build local depois
 * puxa de articles.json e renderiza estaticamente.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const MD_DIR = path.join(REPO_ROOT, 'ideias de artigos pci');

const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ1NjAwNiwiZXhwIjoyMDkwMDMyMDA2fQ.LTZYTuBXAf7cFJrGbo9J_F80VzA_8kbcHiwsTZXRM5Q'
).replace(/\s+/g, '');

// Configura cada artigo: arquivo .md + metadados Supabase que nao vem no frontmatter
// (category/keyword sao MAPEADOS aqui pra mantermos consistencia com taxonomy do CMS)
const ARTICLES = [
  {
    file: 'como-organizar-processos-empresa-cresceu-rapido.md',
    category: 'estrategica',                 // PILLAR B (ja no ar, este script faz PATCH)
    seo_keyword: 'organizar processos',
    cover_url: '/images/blog/cover-23.svg',
  },
  {
    file: 'processos-manuais-empresa.md',
    category: 'estrategica',                 // TOFU C
    seo_keyword: 'processos manuais',
    cover_url: '/images/blog/cover-24.svg',
  },
  {
    file: 'como-automatizar-processos-empresa.md',
    category: 'estrategica',                 // BOFU A
    seo_keyword: 'automatizar processos',
    cover_url: '/images/blog/cover-25.svg',
  },
];

// URLs reais dos artigos do cluster (pra substituir placeholders `(#)` por links internos reais).
// Quando outras dores virarem artigo, adicionar aqui.
const INTERNAL_LINK_MAP = {
  // Variacoes de texto → URL final
  'Como organizar os processos de uma empresa que cresceu rápido (sem virar caos)': '/blog/como-organizar-processos-empresa-cresceu-rapido',
  'Como organizar os processos de uma empresa que cresceu rápido': '/blog/como-organizar-processos-empresa-cresceu-rapido',
  'Por que processos manuais estão travando o crescimento da sua empresa (e como sair desse ciclo)': '/blog/processos-manuais-empresa',
  'Por que processos manuais estão travando o crescimento da sua empresa': '/blog/processos-manuais-empresa',
  'Como automatizar processos da empresa: o guia completo': '/blog/como-automatizar-processos-empresa',
  'Como automatizar processos da empresa: o guia decisivo': '/blog/como-automatizar-processos-empresa',
  'Como automatizar processos da empresa': '/blog/como-automatizar-processos-empresa',
};

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/i);
    if (!kv) continue;
    const key = kv[1].trim();
    let val = kv[2].trim();
    // Remove aspas
    val = val.replace(/^["'](.*)["']$/, '$1');
    meta[key] = val;
  }
  return { meta, body: m[2] };
}

function stripJsonBlocks(body) {
  // Remove blocos ```json``` (schemas vão pro Supabase como string separada se quisermos,
  // mas o page.tsx ja gera Article + FAQPage automaticamente, entao podemos descartar)
  return body.replace(/```json\s*\n[\s\S]*?\n```/g, '').trim();
}

function removeFirstH1(body) {
  // Frontmatter title já vai como title; remove primeiro # heading do markdown
  return body.replace(/^#\s+.+?\n/, '');
}

function substituteInternalLinks(markdown) {
  // Substitui [Texto](#) por [Texto](URL_REAL) quando texto bate com INTERNAL_LINK_MAP
  return markdown.replace(/\[([^\]]+)\]\(#\)/g, (match, label) => {
    // Trim e normaliza espacos pra comparacao mais robusta
    const labelNorm = label.replace(/\s+/g, ' ').trim();
    for (const [key, url] of Object.entries(INTERNAL_LINK_MAP)) {
      if (labelNorm === key || labelNorm.startsWith(key.slice(0, 50))) {
        return `[${label}](${url})`;
      }
    }
    // Nao bateu — mantém placeholder (artigo futuro nao publicado)
    return match;
  });
}

function markdownToHtml(markdown) {
  // Configura marked: GFM tables, breaks moderate
  marked.setOptions({
    gfm: true,
    breaks: false,
    mangle: false,
    headerIds: false,
  });
  return marked.parse(markdown);
}

async function upsertArticle(art) {
  const filePath = path.join(MD_DIR, art.file);
  if (!fs.existsSync(filePath)) {
    console.log(`   ⚠️  ${art.file}: arquivo nao encontrado, pulando.`);
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { meta, body } = parseFrontmatter(raw);

  let markdown = stripJsonBlocks(body);
  markdown = removeFirstH1(markdown);
  markdown = substituteInternalLinks(markdown);
  const contentHtml = markdownToHtml(markdown);

  const payload = {
    title: meta.title,
    slug: meta.slug,
    excerpt: meta.meta_description,
    content: contentHtml,
    category: art.category,
    author: meta.author || 'Equipe Orbit',
    published: true,
    published_at: meta.published_at ? `${meta.published_at}T12:00:00.000Z` : new Date().toISOString(),
    updated_at: meta.updated_at ? `${meta.updated_at}T12:00:00.000Z` : new Date().toISOString(),
    seo_title: meta.meta_title,
    seo_canonical: meta.canonical ? meta.canonical.replace('https://orbitgestao.com.br/blog/', '') : meta.slug,
    seo_keyword: art.seo_keyword,
    cover_url: art.cover_url,
  };

  // Checa se existe
  const checkResp = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_articles?slug=eq.${encodeURIComponent(payload.slug)}&select=id`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!checkResp.ok) throw new Error(`Check failed: HTTP ${checkResp.status}`);
  const existing = await checkResp.json();
  const existingId = existing.length > 0 ? existing[0].id : null;

  let resp;
  if (existingId) {
    console.log(`   📝 ${art.file} → PATCH (id=${existingId})`);
    resp = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles?id=eq.${existingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
    });
  } else {
    console.log(`   ✨ ${art.file} → INSERT`);
    resp = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
    });
  }

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Upsert failed: HTTP ${resp.status} — ${err.slice(0, 300)}`);
  }
  const result = await resp.json();
  const id = result[0].id;
  const wordCount = contentHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`      ✅ id=${id}, slug=${payload.slug}, ~${wordCount} palavras HTML`);
  return result[0];
}

async function main() {
  console.log('🚀 Publicando cluster Dor 1 (Processos) no Supabase...\n');
  const results = [];
  for (const art of ARTICLES) {
    try {
      const r = await upsertArticle(art);
      if (r) results.push(r);
    } catch (err) {
      console.error(`   ❌ ${art.file}: ${err.message}`);
    }
  }
  console.log(`\n🎉 ${results.length}/${ARTICLES.length} artigos publicados.`);
  console.log('\nURLs:');
  for (const r of results) {
    console.log(`  https://orbitgestao.com.br/blog/${r.slug}`);
  }
  console.log('\nProximos passos:');
  console.log('  1. npm run build       # puxa do Supabase + gera HTML estatico');
  console.log('  2. git commit + push   # Cloudflare rebuilda em ~2 min');
}

main().catch((err) => {
  console.error('\n❌ Erro fatal:', err.message);
  process.exit(1);
});
