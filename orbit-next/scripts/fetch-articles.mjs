/**
 * Pre-build script: puxa artigos do Supabase e gera articles.json + imagens
 * Roda antes do `next build` via npm script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const IMG_DIR = path.join(ROOT, 'public', 'images', 'blog');

const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const RAW_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ1NjAwNiwiZXhwIjoyMDkwMDMyMDA2fQ.LTZYTuBXAf7cFJrGbo9J_F80VzA_8kbcHiwsTZXRM5Q';
// Strip qualquer whitespace (env vars no Cloudflare podem vir com \n se coladas com quebra de linha)
const SUPABASE_KEY = RAW_KEY.replace(/\s+/g, '');

async function fetchArticles() {
  console.log('📥 Buscando artigos do Supabase...');
  const url = `${SUPABASE_URL}/rest/v1/blog_articles?published=eq.true&order=published_at.desc&select=id,title,slug,content,excerpt,cover_url,category,author,author_avatar,published_at,updated_at,seo_title,seo_canonical,seo_keyword,seo_og_image,lead_magnet_id,cta_banner_enabled,cta_banner_title,cta_banner_desc,cta_banner_cta_text,cta_banner_cta_url,cta_banner_image`;

  const resp = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!resp.ok) {
    const err = await resp.text();
    // Se Supabase estiver fora, usa o articles.json existente como fallback
    if (fs.existsSync(path.join(DATA_DIR, 'articles.json'))) {
      console.log('⚠️  Supabase indisponível, usando articles.json existente como fallback');
      console.log(`   Erro: ${err.slice(0, 200)}`);
      return null; // null = usar fallback
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

  // Só reescreve se o arquivo não existe ou mudou de tamanho
  if (!fs.existsSync(fpath) || fs.statSync(fpath).size !== data.length) {
    fs.writeFileSync(fpath, data);
    console.log(`   📸 ${fname} (${Math.round(data.length / 1024)}KB)`);
  }

  return `/images/blog/${fname}`;
}

/**
 * Aplica <strong> em ocorrencias da seo_keyword (e variacoes de plural) no conteudo.
 * REGRA DE OURO: nao apaga, nao acrescenta nada — so envelopa palavras
 * que JA existem com <strong>...</strong>. Source no Supabase fica intacto.
 *
 * Conservador por design:
 * - Maximo MAX_BOLD_TOTAL negritos novos por artigo (soma keyword + variacoes)
 * - Skip se artigo ja tem >= SKIP_THRESHOLD_STRONG <strong> no original
 * - Lookbehind/lookahead garantem que so pega palavra isolada (nao dentro de tag/href/class)
 * - Filtra ocorrencias dentro de <a>, <strong>, <b>, <em>, <i>, <h1-6>, <code>, <pre>
 * - Variacoes de plural geradas por regras simples e seguras de portugues
 */
const MAX_BOLD_TOTAL = 3;       // total de negritos novos por artigo (keyword + variacoes)
const SKIP_THRESHOLD_STRONG = 8;

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Gera variacoes seguras da keyword (so plural, com regras simples PT)
// Ex: "consultoria recorrente passiva" → ["consultoria recorrente passiva", "consultoria recorrente passivas"]
function generateKeywordVariations(keyword) {
  const out = new Set();
  const trimmed = (keyword || '').trim();
  if (!trimmed) return [];
  out.add(trimmed);

  const words = trimmed.split(/\s+/);
  const lastWord = words[words.length - 1];
  const lastLower = lastWord.toLowerCase();

  // Skip palavras muito curtas ou ja plurais
  if (lastWord.length >= 4 && !lastLower.endsWith('s')) {
    let pluralLast = null;
    if (/[aeiouãéíóú]$/i.test(lastLower)) {
      // Termina em vogal → +s (consultoria→consultorias, agente→agentes)
      pluralLast = lastWord + 's';
    } else if (/[rz]$/i.test(lastLower)) {
      // Termina em r ou z → +es (gestor→gestores, raiz→raizes)
      pluralLast = lastWord + 'es';
    }
    // Outras terminacoes (m, l, ão) tem regras complexas → skip por seguranca
    if (pluralLast) {
      out.add([...words.slice(0, -1), pluralLast].join(' '));
    }
  }

  // Singular se a keyword ja for plural (caso simples: termina em 's' precedida de vogal)
  if (lastWord.length >= 5 && /[aeiou]s$/i.test(lastLower) && !/ss$/i.test(lastLower)) {
    const singularLast = lastWord.slice(0, -1);
    out.add([...words.slice(0, -1), singularLast].join(' '));
  }

  return Array.from(out);
}

// Retorna true se a posicao 'pos' no html esta dentro de uma das tags listadas
function isInsideTag(html, pos, tagNames) {
  const before = html.slice(0, pos);
  for (const tag of tagNames) {
    const openRe = new RegExp(`<${tag}\\b[^>]*>`, 'gi');
    const closeRe = new RegExp(`<\\/${tag}\\s*>`, 'gi');
    const opens = (before.match(openRe) || []).length;
    const closes = (before.match(closeRe) || []).length;
    if (opens > closes) return true;
  }
  return false;
}

function applySeoBolding(article) {
  const keyword = (article.seo_keyword || '').trim();
  if (!keyword || !article.content) return 0;

  // Skip se ja tem suficiente negrito
  const existingStrongOpens = (article.content.match(/<strong\b/gi) || []).length;
  if (existingStrongOpens >= SKIP_THRESHOLD_STRONG) return 0;

  const variations = generateKeywordVariations(keyword);
  const protectedTags = ['a', 'strong', 'b', 'em', 'i', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre'];

  let additions = 0;
  let html = article.content;

  // Itera variacoes em ordem (keyword principal primeiro, depois plural/singular)
  for (const variant of variations) {
    if (additions >= MAX_BOLD_TOTAL) break;
    if (!html.toLowerCase().includes(variant.toLowerCase())) continue;

    const re = new RegExp(
      `(?<=^|[\\s>(\\["'])(${escapeRegex(variant)})(?=$|[\\s<(),.!?;:\\]'"])`,
      'gi'
    );

    const matches = [];
    let m;
    while ((m = re.exec(html)) !== null) {
      matches.push({ index: m.index, length: m[1].length, text: m[1] });
      if (matches.length >= 20) break;
    }

    // Filtra matches em regioes protegidas e ja-boldadas (apos passagens anteriores)
    const safeMatches = matches.filter((mm) => !isInsideTag(html, mm.index, protectedTags));
    if (safeMatches.length === 0) continue;

    // Quota desta variacao: pelo menos 1, ate sobrar espaco no total
    const quota = Math.min(safeMatches.length, MAX_BOLD_TOTAL - additions);
    const toApply = safeMatches.slice(0, quota).sort((a, b) => b.index - a.index);

    for (const mm of toApply) {
      html = html.slice(0, mm.index) + `<strong>${mm.text}</strong>` + html.slice(mm.index + mm.length);
      additions++;
    }
  }

  article.content = html;
  return additions;
}

function processArticles(articles) {
  console.log(`📝 Processando ${articles.length} artigos...`);

  fs.mkdirSync(IMG_DIR, { recursive: true });
  fs.mkdirSync(DATA_DIR, { recursive: true });

  let totalBolded = 0;
  for (const a of articles) {
    // Cover
    if (a.cover_url && a.cover_url.startsWith('data:image')) {
      const url = extractBase64Image(a.cover_url, `cover-${a.id}`);
      if (url) a.cover_url = url;
    }

    // Avatar
    if (a.author_avatar && a.author_avatar.startsWith('data:image')) {
      const url = extractBase64Image(a.author_avatar, `avatar-${a.id}`);
      if (url) a.author_avatar = url;
    }

    // Inline images in content
    let imgCount = 0;
    a.content = (a.content || '').replace(
      /data:image\/(\w+);base64,([A-Za-z0-9+/=]+)/g,
      (match) => {
        imgCount++;
        const url = extractBase64Image(match, `inline-${a.id}-${imgCount}`);
        return url || match;
      }
    );

    // SEO: aplica <strong> na keyword principal (max 2 por artigo)
    const bolded = applySeoBolding(a);
    if (bolded > 0) {
      totalBolded += bolded;
      console.log(`   🔤 #${a.id}: +${bolded} <strong> na keyword "${a.seo_keyword}"`);
    }
  }
  console.log(`   ✨ ${totalBolded} negritos SEO aplicados no total`);

  return articles;
}

function generateSitemap(articles) {
  console.log('🗺️  Gerando sitemap...');
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    ['/', '1.0', 'weekly'],
    ['/empresarios', '1.0', 'weekly'],
    ['/consultores', '1.0', 'weekly'],
    ['/sobre', '0.8', 'monthly'],
    ['/faq', '0.7', 'monthly'],
    ['/blog', '0.9', 'weekly'],
    ['/historias', '0.7', 'weekly'],
    ['/historias/enviar', '0.5', 'monthly'],
    ['/seguranca-ia', '0.6', 'monthly'],
    ['/live', '0.8', 'weekly'],
    ['/treinamentos', '0.8', 'weekly'],
    ['/politica-privacidade', '0.3', 'yearly'],
    ['/termos-de-servico', '0.3', 'yearly'],
  ];

  const urls = pages.map(
    ([p, priority, freq]) => `  <url>
    <loc>https://orbitgestao.com.br${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  );

  for (const a of articles) {
    const pubDate = (a.published_at || today).slice(0, 10);
    urls.push(`  <url>
    <loc>https://orbitgestao.com.br/blog/${a.slug}</loc>
    <lastmod>${pubDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), sitemap);
  console.log(`   ${pages.length} páginas + ${articles.length} artigos = ${pages.length + articles.length} URLs`);
}

async function main() {
  console.log('🚀 fetch-articles — Pre-build script\n');

  const articles = await fetchArticles();

  if (articles === null) {
    // Fallback: Supabase indisponível, usar dados existentes
    console.log('\n✅ Usando dados existentes (Supabase offline)');
    return;
  }

  const processed = processArticles(articles);

  // Salvar JSON
  fs.writeFileSync(
    path.join(DATA_DIR, 'articles.json'),
    JSON.stringify(processed, null, 2),
    'utf-8'
  );
  console.log(`\n💾 articles.json salvo (${articles.length} artigos)`);

  // Gerar sitemap
  generateSitemap(processed);

  console.log('\n✅ Pronto! Build pode continuar.');
}

main().catch((err) => {
  console.error('❌ Erro no fetch-articles:', err.message);
  // Não falha o build — usa dados existentes como fallback
  if (fs.existsSync(path.join(DATA_DIR, 'articles.json'))) {
    console.log('⚠️  Usando articles.json existente como fallback');
    process.exit(0);
  }
  process.exit(1);
});
