/**
 * Publica TODOS os artigos da pasta `ideias de artigos pci/` no Supabase.
 *
 * Lê .md, converte markdown → HTML, extrai frontmatter, faz upsert por slug.
 * Auto-detecta category e cross-linking. Auto-gera cover SVG por artigo
 * baseado no slug → /public/images/blog/cover-{slug}.svg.
 *
 * Idempotente: rodar várias vezes não duplica. Slugs novos = INSERT;
 * slugs existentes = PATCH (atualiza content/metadados).
 *
 * Uso:  cd orbit-next && node scripts/publish-cluster-articles.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const MD_DIR = path.join(REPO_ROOT, 'ideias de artigos pci');
const COVERS_DIR = path.join(__dirname, '..', 'public', 'images', 'blog');

const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ1NjAwNiwiZXhwIjoyMDkwMDMyMDA2fQ.LTZYTuBXAf7cFJrGbo9J_F80VzA_8kbcHiwsTZXRM5Q'
).replace(/\s+/g, '');

const DEMO_CTA_URL = 'https://demonstracao.orbitgestao.com.br/chat';

// Detecta category baseado em keywords do slug/titulo (mapeia pras 6 do CMS)
function detectCategory(slug, title) {
  const s = (slug + ' ' + title).toLowerCase();
  if (/indicador|kpi|dashboard|metricas|metrica/.test(s)) return 'indicadores';
  if (/planejamento[- ]estrategico|estrategia/.test(s)) return 'planejamento-estrategico';
  if (/marketing|prospec(c|ç)/.test(s)) return 'marketing';
  if (/(\bia\b|inteligencia artificial|olivia|agente)/.test(s)) return 'ia';
  return 'estrategica'; // default
}

// Auto-gera seo_keyword a partir do slug (limpando palavras genéricas)
function autoKeyword(slug) {
  return slug.replace(/-/g, ' ').replace(/\b(como|por|que|para|empresa|de|em|do|da|no|na|os|as)\b/gi, ' ').replace(/\s+/g, ' ').trim();
}

// Gera um SVG cover bonito pra um artigo a partir do titulo + tag categoria
function generateCoverSvg(title, categoryLabel) {
  // Quebra titulo em até 4 linhas com ~22 chars max sem cortar palavras
  const words = title.split(' ');
  const lines = [];
  let curr = '';
  const MAX = 22;
  for (const w of words) {
    if ((curr + ' ' + w).trim().length <= MAX) {
      curr = (curr + ' ' + w).trim();
    } else {
      if (curr) lines.push(curr);
      curr = w;
    }
    if (lines.length === 3) break;
  }
  if (curr && lines.length < 4) lines.push(curr);
  // Se sobrou texto, adiciona "..." na ultima linha
  const consumed = lines.join(' ').length;
  if (consumed < title.length - 2 && lines.length === 4) {
    lines[3] = lines[3].slice(0, MAX - 1) + '…';
  }
  // Destaca 1 palavra-chave em dourado (a 2ª linha geralmente é o termo central)
  const goldLineIdx = Math.min(1, lines.length - 1);

  const tagWidth = Math.max(120, categoryLabel.length * 11 + 30);
  const tagX = (tagWidth - 18) / 2; // approx center

  const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const linesSvg = lines.map((line, i) => {
    const y = 240 + i * 66;
    const fill = i === goldLineIdx ? 'url(#gold)' : '#ffffff';
    return `  <text x="80" y="${y}" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="56" font-weight="800" fill="${fill}" letter-spacing="-1">${escape(line)}</text>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${escape(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0D1117"/>
      <stop offset="1" stop-color="#161B22"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.7">
      <stop offset="0" stop-color="#ffba1a" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#ffba1a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffba1a"/>
      <stop offset="1" stop-color="#ff8c00"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#ffffff" fill-opacity="0.04"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(80, 100)">
    <rect rx="22" ry="22" width="${tagWidth}" height="44" fill="#ffba1a" fill-opacity="0.12" stroke="#ffba1a" stroke-opacity="0.35"/>
    <text x="${tagWidth / 2}" y="29" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffba1a" text-anchor="middle" letter-spacing="2">${escape(categoryLabel.toUpperCase())}</text>
  </g>
${linesSvg}
  <g transform="translate(80, 552)">
    <circle cx="14" cy="14" r="14" fill="url(#gold)"/>
    <circle cx="14" cy="14" r="6" fill="#0D1117"/>
    <text x="42" y="20" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="800" fill="#ffffff" letter-spacing="-0.5">Orbit Gestão</text>
  </g>
  <rect x="0" y="624" width="1200" height="6" fill="url(#gold)"/>
</svg>
`;
}

const CATEGORY_LABELS = {
  estrategica: 'Estratégia',
  indicadores: 'Indicadores',
  marketing: 'Marketing',
  ia: 'IA',
  'planejamento-estrategico': 'Planejamento',
  novidades: 'Novidades',
};

// ───────────── Auto-carrega TODOS os .md da pasta ─────────────
function loadAllArticles() {
  const files = fs.readdirSync(MD_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'BLOG_PLAYBOOK.md')
    .sort();
  return files.map((file) => {
    const txt = fs.readFileSync(path.join(MD_DIR, file), 'utf-8');
    const m = txt.match(/^---\n([\s\S]*?)\n---/);
    const meta = {};
    if (m) {
      for (const line of m[1].split('\n')) {
        const kv = line.match(/^([a-z_]+):\s*(.*)$/i);
        if (!kv) continue;
        meta[kv[1].trim()] = kv[2].trim().replace(/^["'](.*)["']$/, '$1');
      }
    }
    const slug = meta.slug || file.replace(/\.md$/, '');
    const title = meta.title || slug;
    const category = detectCategory(slug, title);
    return {
      file,
      slug,
      title,
      category,
      seo_keyword: autoKeyword(slug),
      cover_url: `/images/blog/cover-${slug}.svg`,
      _meta: meta,
    };
  });
}

const ARTICLES = loadAllArticles();
console.log(`📚 ${ARTICLES.length} artigos detectados em ${MD_DIR}\n`);

// ───────────── Internal links: auto-popula com todos os titulos ─────────────
const INTERNAL_LINK_MAP = {};
for (const art of ARTICLES) {
  const url = `/blog/${art.slug}`;
  // Título completo + variantes (sem subtitulo após ":") + sem "(...)"
  INTERNAL_LINK_MAP[art.title] = url;
  const noParen = art.title.replace(/\s*\([^)]*\)\s*$/, '').trim();
  if (noParen !== art.title) INTERNAL_LINK_MAP[noParen] = url;
  const beforeColon = art.title.split(':')[0].trim();
  if (beforeColon !== art.title && beforeColon.length > 15) INTERNAL_LINK_MAP[beforeColon] = url;
}

// ───────────── Markdown helpers ─────────────
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/i);
    if (!kv) continue;
    const key = kv[1].trim();
    let val = kv[2].trim().replace(/^["'](.*)["']$/, '$1');
    meta[key] = val;
  }
  return { meta, body: m[2] };
}

function stripJsonBlocks(body) {
  // Pega "## Schema markup", "## Schema", "## Markup" — qualquer header no fim
  // seguido de blocos json. Cobre variacoes do playbook.
  let out = body.replace(/##\s+Schema(\s+markup)?[\s\S]*$/i, '').trim();
  // Tambem pega ```json``` orfaos no meio do documento
  out = out.replace(/```json\s*\n[\s\S]*?\n```/g, '').trim();
  return out;
}

// Autor default e avatar pros artigos sem author especifico no frontmatter
const DEFAULT_AUTHOR = 'Rodrigo Souza';
const DEFAULT_AUTHOR_AVATAR = '/images/blog/avatar-rodrigo.webp';

function humanizeText(body) {
  let out = body.replace(/\s—\s/g, ', ');
  out = out.replace(/\s–\s/g, ', ');
  out = out.replace(/—/g, '-');
  out = out.replace(/–/g, '-');
  return out;
}

function removeFirstH1(body) {
  return body.replace(/^#\s+.+?\n/, '');
}

function substituteInternalLinks(markdown) {
  let out = markdown.replace(/\]\(#(?:demo[-_]?form|form[-_]?demo|agendar|chat|demo)\)/gi, `](${DEMO_CTA_URL})`);
  out = out.replace(/\[([^\]]+)\]\(#\)/g, (match, label) => {
    const labelNorm = label.replace(/\s+/g, ' ').trim();
    for (const [key, url] of Object.entries(INTERNAL_LINK_MAP)) {
      if (labelNorm === key || (key.length > 20 && labelNorm.startsWith(key.slice(0, 50)))) {
        return `[${label}](${url})`;
      }
    }
    return match;
  });
  return out;
}

function markdownToHtml(markdown) {
  marked.setOptions({ gfm: true, breaks: false, mangle: false, headerIds: false });
  let html = marked.parse(markdown);
  html = html.replace(/<table([^>]*)>/g, '<div class="table-wrap"><table$1>');
  html = html.replace(/<\/table>/g, '</table></div>');
  return html;
}

// ───────────── Cover SVG generation ─────────────
function ensureCoverExists(art) {
  const filePath = path.join(COVERS_DIR, `cover-${art.slug}.svg`);
  if (fs.existsSync(filePath)) return;
  const label = CATEGORY_LABELS[art.category] || 'Gestão';
  const svg = generateCoverSvg(art.title, label);
  fs.mkdirSync(COVERS_DIR, { recursive: true });
  fs.writeFileSync(filePath, svg, 'utf-8');
}

// ───────────── Upsert no Supabase ─────────────
async function upsertArticle(art) {
  const filePath = path.join(MD_DIR, art.file);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { meta, body } = parseFrontmatter(raw);

  let markdown = stripJsonBlocks(body);
  markdown = removeFirstH1(markdown);
  markdown = humanizeText(markdown);
  markdown = substituteInternalLinks(markdown);
  const contentHtml = markdownToHtml(markdown);

  ensureCoverExists(art);

  // Author: usa o do frontmatter SO SE nao for "Equipe Orbit" (placeholder generico)
  // Caso contrario, usa Rodrigo Souza + avatar dele
  const frontmatterAuthor = (meta.author || '').trim();
  const isGenericAuthor = !frontmatterAuthor || /equipe orbit/i.test(frontmatterAuthor);
  const finalAuthor = isGenericAuthor ? DEFAULT_AUTHOR : frontmatterAuthor;
  const finalAvatar = isGenericAuthor ? DEFAULT_AUTHOR_AVATAR : null;

  const payload = {
    title: humanizeText(meta.title || art.title),
    slug: meta.slug || art.slug,
    excerpt: humanizeText(meta.meta_description || ''),
    content: contentHtml,
    category: art.category,
    author: finalAuthor,
    ...(finalAvatar ? { author_avatar: finalAvatar } : {}),
    published: true,
    published_at: meta.published_at ? `${meta.published_at}T12:00:00.000Z` : new Date().toISOString(),
    updated_at: meta.updated_at ? `${meta.updated_at}T12:00:00.000Z` : new Date().toISOString(),
    seo_title: humanizeText(meta.meta_title || ''),
    // Deixa NULL de proposito: src/lib/seo.ts::articleCanonical() deriva o canonical
    // correto do slug (https://orbitgestao.com.br/blog/<slug>), que e exatamente o
    // que o sitemap.xml declara. Antes este campo era gravado com o prefixo do
    // dominio REMOVIDO, sobrando so o slug — canonical relativo que resolvia para a
    // raiz do dominio (301/404) e contradizia o sitemap. Nao reintroduzir.
    seo_canonical: null,
    seo_keyword: art.seo_keyword,
    cover_url: art.cover_url,
  };

  const checkResp = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_articles?slug=eq.${encodeURIComponent(payload.slug)}&select=id`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!checkResp.ok) throw new Error(`Check failed: HTTP ${checkResp.status}`);
  const existing = await checkResp.json();
  const existingId = existing.length > 0 ? existing[0].id : null;

  const action = existingId ? 'PATCH' : 'INSERT';
  const resp = existingId
    ? await fetch(`${SUPABASE_URL}/rest/v1/blog_articles?id=eq.${existingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, Prefer: 'return=representation' },
        body: JSON.stringify(payload),
      })
    : await fetch(`${SUPABASE_URL}/rest/v1/blog_articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, Prefer: 'return=representation' },
        body: JSON.stringify(payload),
      });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Upsert failed: HTTP ${resp.status} — ${err.slice(0, 200)}`);
  }
  const result = await resp.json();
  const id = result[0].id;
  console.log(`   ${action === 'PATCH' ? '📝' : '✨'} ${art.slug} → ${action} (id=${id})`);
  return result[0];
}

async function main() {
  console.log('🚀 Publicando artigos no Supabase...\n');
  let success = 0;
  let failed = 0;
  for (const art of ARTICLES) {
    try {
      const r = await upsertArticle(art);
      if (r) success++;
    } catch (err) {
      console.error(`   ❌ ${art.file}: ${err.message}`);
      failed++;
    }
  }
  console.log(`\n🎉 ${success}/${ARTICLES.length} artigos publicados. ${failed > 0 ? `❌ ${failed} falhas.` : ''}`);
  console.log('\nProximos passos:');
  console.log('  1. npm run build       # puxa do Supabase + gera HTML estatico');
  console.log('  2. git commit + push   # Cloudflare rebuilda');
}

main().catch((err) => {
  console.error('\n❌ Erro fatal:', err.message);
  process.exit(1);
});
