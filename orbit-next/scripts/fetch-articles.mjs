/**
 * Pre-build script: puxa artigos do Supabase e gera articles.json + imagens
 * Roda antes do `next build` via npm script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

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

// ═══════════════════════════════════════════════════════════════
// OTIMIZACAO DE IMAGEM (Sharp): redimensiona + converte pra WebP
// ═══════════════════════════════════════════════════════════════
// Inputs: base64 (data:image/...) OU buffer
// Outputs: WebP otimizado em /images/blog/{filename}.webp
// - Max width 1200px (preserva aspect ratio)
// - Quality 80 (sweet spot tamanho × qualidade)
// - SVG passa direto (vetorial, ja otimo)
// - GIF preservado (animacao)
// - Cache: nao reprocessa se .webp ja existe e tamanho do source nao mudou
const MAX_IMAGE_WIDTH = 1200;
const WEBP_QUALITY = 80;

async function optimizeAndSaveImage(buffer, filename, sourceType) {
  // SVG: salva direto sem processar
  if (sourceType === 'svg' || sourceType === 'svg+xml') {
    const fname = `${filename}.svg`;
    const fpath = path.join(IMG_DIR, fname);
    if (!fs.existsSync(fpath) || fs.statSync(fpath).size !== buffer.length) {
      fs.writeFileSync(fpath, buffer);
      console.log(`   🎨 ${fname} (${Math.round(buffer.length / 1024)}KB, SVG)`);
    }
    return `/images/blog/${fname}`;
  }

  // GIF: preserva (Sharp perde animacao)
  if (sourceType === 'gif') {
    const fname = `${filename}.gif`;
    const fpath = path.join(IMG_DIR, fname);
    if (!fs.existsSync(fpath) || fs.statSync(fpath).size !== buffer.length) {
      fs.writeFileSync(fpath, buffer);
      console.log(`   🎬 ${fname} (${Math.round(buffer.length / 1024)}KB, GIF preservado)`);
    }
    return `/images/blog/${fname}`;
  }

  // PNG/JPG/WEBP/etc → otimiza pra WebP
  const fname = `${filename}.webp`;
  const fpath = path.join(IMG_DIR, fname);
  const sizeMarker = path.join(IMG_DIR, `.${filename}.size`);
  const sourceSize = buffer.length;

  // Cache: skip se ja processado mesma origem
  if (fs.existsSync(fpath) && fs.existsSync(sizeMarker)) {
    const cached = parseInt(fs.readFileSync(sizeMarker, 'utf-8'), 10);
    if (cached === sourceSize) {
      return `/images/blog/${fname}`;
    }
  }

  try {
    const meta = await sharp(buffer).metadata();
    const needsResize = (meta.width || 0) > MAX_IMAGE_WIDTH;

    let pipeline = sharp(buffer).rotate(); // auto-orient via EXIF
    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true });
    }
    const optimized = await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();

    fs.writeFileSync(fpath, optimized);
    fs.writeFileSync(sizeMarker, String(sourceSize));

    const reduction = Math.round((1 - optimized.length / sourceSize) * 100);
    console.log(`   📸 ${fname} (${Math.round(sourceSize / 1024)}KB → ${Math.round(optimized.length / 1024)}KB, -${reduction}%${needsResize ? `, resized to ${MAX_IMAGE_WIDTH}px` : ''})`);
    return `/images/blog/${fname}`;
  } catch (err) {
    // Fallback: se sharp falhar (formato exotico, corrompido, etc), salva original
    console.warn(`   ⚠️  ${filename}: sharp falhou (${err.message.slice(0, 60)}), salvando original`);
    const ext = sourceType === 'jpeg' ? 'jpg' : sourceType;
    const fbFname = `${filename}.${ext}`;
    fs.writeFileSync(path.join(IMG_DIR, fbFname), buffer);
    return `/images/blog/${fbFname}`;
  }
}

// Compat wrapper: API legada (sincrona) → async optimized
// Retorna Promise — chamadores precisam usar await
async function extractBase64Image(base64Str, filename) {
  const match = base64Str.match(/^data:image\/([a-z+]+);base64,(.+)/is);
  if (!match) return null;
  const sourceType = match[1].toLowerCase();
  const buffer = Buffer.from(match[2], 'base64');
  return await optimizeAndSaveImage(buffer, filename, sourceType);
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

async function processArticles(articles) {
  console.log(`📝 Processando ${articles.length} artigos...`);

  fs.mkdirSync(IMG_DIR, { recursive: true });
  fs.mkdirSync(DATA_DIR, { recursive: true });

  let totalBolded = 0;
  for (const a of articles) {
    // Cover (base64 → WebP otimizado)
    if (a.cover_url && a.cover_url.startsWith('data:image')) {
      const url = await extractBase64Image(a.cover_url, `cover-${a.id}`);
      if (url) a.cover_url = url;
    }

    // Avatar (base64 → WebP otimizado)
    if (a.author_avatar && a.author_avatar.startsWith('data:image')) {
      const url = await extractBase64Image(a.author_avatar, `avatar-${a.id}`);
      if (url) a.author_avatar = url;
    }

    // Inline images in content: precisa coletar todos primeiro (replace nao suporta async)
    // depois fazer replace sync usando o mapa pre-computado
    const inlineMatches = [...(a.content || '').matchAll(/data:image\/[a-z+]+;base64,[A-Za-z0-9+/=]+/g)];
    if (inlineMatches.length > 0) {
      const replacements = new Map();
      let imgCount = 0;
      for (const m of inlineMatches) {
        if (replacements.has(m[0])) continue; // dedupe — mesmo base64 = mesma imagem
        imgCount++;
        const url = await extractBase64Image(m[0], `inline-${a.id}-${imgCount}`);
        replacements.set(m[0], url || m[0]);
      }
      // Aplica todas as substituicoes (sem async dentro do replace)
      a.content = a.content.replace(
        /data:image\/[a-z+]+;base64,[A-Za-z0-9+/=]+/g,
        (match) => replacements.get(match) || match
      );
    }

    // SEO: aplica <strong> na keyword principal (max 3 por artigo)
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
    ['/glossario', '0.7', 'monthly'],
    ['/historias', '0.7', 'weekly'],
    ['/historias/enviar', '0.5', 'monthly'],
    ['/seguranca-ia', '0.6', 'monthly'],
    ['/live', '0.8', 'weekly'],
    ['/treinamentos', '0.8', 'weekly'],
    ['/bootcamp-orbit', '0.9', 'weekly'],
    ['/agentes-de-ia', '0.95', 'monthly'],
    // 12 agentes
    ['/agentes/estrategico',           '0.85', 'monthly'],
    ['/agentes/processos',             '0.85', 'monthly'],
    ['/agentes/pessoas',               '0.85', 'monthly'],
    ['/agentes/indicadores',           '0.85', 'monthly'],
    ['/agentes/riscos',                '0.85', 'monthly'],
    ['/agentes/treinamento',           '0.85', 'monthly'],
    ['/agentes/oportunidades',         '0.85', 'monthly'],
    ['/agentes/documentos',            '0.85', 'monthly'],
    ['/agentes/comercial',             '0.85', 'monthly'],
    ['/agentes/problemas-operacionais','0.85', 'monthly'],
    ['/agentes/reunioes',              '0.85', 'monthly'],
    ['/agentes/pesquisas',             '0.85', 'monthly'],
    // 4 módulos
    ['/modulos/financeiro',            '0.80', 'monthly'],
    ['/modulos/recrutamento-selecao',  '0.80', 'monthly'],
    ['/modulos/projetos',              '0.80', 'monthly'],
    ['/modulos/compras',               '0.80', 'monthly'],
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

  // 13 hub pages por cluster (uma por dor do playbook)
  const clusterSlugs = [
    'processos-manuais', 'processos-bpmn', 'estrategia-execucao', 'comunicacao-entre-setores',
    'sistemas-integracao', 'rh-talentos', 'indicadores', 'vendas-crm',
    'gestao-pessoas-capacitacao', 'consultoria-accountability', 'documentacao',
    'operacao-escalavel', 'financeiro-integrado',
  ];
  for (const cs of clusterSlugs) {
    urls.push(`  <url>
    <loc>https://orbitgestao.com.br/blog/cluster/${cs}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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

  const processed = await processArticles(articles);

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
