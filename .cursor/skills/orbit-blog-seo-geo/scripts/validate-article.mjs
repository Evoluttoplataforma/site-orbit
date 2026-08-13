#!/usr/bin/env node
/**
 * Valida um artigo Orbit contra SEO/GEO mínimo + allowlist de links.
 * Exit 1 se houver href fora da allowlist, img quebrada, FAQ inválida ou H1 no content.
 *
 *   node .cursor/skills/orbit-blog-seo-geo/scripts/validate-article.mjs --slug <slug>
 *   node .cursor/skills/orbit-blog-seo-geo/scripts/validate-article.mjs --id 73
 *   node .cursor/skills/orbit-blog-seo-geo/scripts/validate-article.mjs --print-allowlist
 *   node .cursor/skills/orbit-blog-seo-geo/scripts/validate-article.mjs --slug X --checked-external=https://...
 */
import fs from 'node:fs';
import path from 'node:path';
import { buildAllowlist, resolveHref, NEXT_ROOT, ORIGIN } from './allowlist.mjs';

const args = process.argv.slice(2);
function flag(name) {
  const p = `--${name}`;
  const idx = args.findIndex((a) => a === p || a.startsWith(`${p}=`));
  if (idx < 0) return null;
  const hit = args[idx];
  if (hit.startsWith(`${p}=`)) return hit.slice(p.length + 1);
  const next = args[idx + 1];
  if (next && !next.startsWith('--')) return next;
  return true;
}

const printAllowlist = flag('print-allowlist');
const slugArg = flag('slug');
const idArg = flag('id');
const checkedExternal = args
  .filter((a) => a.startsWith('--checked-external='))
  .map((a) => a.slice('--checked-external='.length));

const allow = buildAllowlist();

if (printAllowlist) {
  const list = [...allow.paths].sort();
  for (const p of list) console.log(p);
  console.error(`# ${list.length} paths + ${allow.extraAbs.size} abs + ${allow.gloss.size} glossário`);
  process.exit(0);
}

if (!slugArg && !idArg) {
  console.error('Uso: --slug <slug> | --id <n> | --print-allowlist');
  process.exit(2);
}

const articles = allow.articles;
const article = slugArg
  ? articles.find((a) => a.slug === slugArg)
  : articles.find((a) => String(a.id) === String(idArg));

if (!article) {
  console.error('Artigo não encontrado em articles.json (não publicado ou slug/id errado).');
  process.exit(1);
}

const enPath = path.join(NEXT_ROOT, 'src/data/articles-en.json');
const enAll = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const en = enAll[article.slug] || null;

const errors = [];
const warnings = [];
function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

const html = article.content || '';
const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const words = text ? text.split(/\s+/).length : 0;
const keyword = (article.seo_keyword || '').trim();

function extractFaqs(source) {
  const FAQ_HEADING_RE = /(perguntas|faq|d[úu]vidas|frequentes)/i;
  const h2Re = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
  const h2s = [];
  let hm;
  while ((hm = h2Re.exec(source)) !== null) {
    h2s.push({ end: hm.index + hm[0].length, text: hm[1].replace(/<[^>]+>/g, ''), index: hm.index });
  }
  const faqH2s = h2s.filter((h) => FAQ_HEADING_RE.test(h.text));
  if (faqH2s.length === 0) return [];
  const last = faqH2s[faqH2s.length - 1];
  const next = h2s.find((h) => h.index > last.index);
  if (next) {
    // H2 depois da FAQ quebra o recorte no template; tratar como erro de contrato
    fail(`FAQ tem H2 depois ("${next.text.replace(/\s+/g, ' ').trim()}"). O template ignora ou corta a seção.`);
  }
  const faqArea = source.slice(last.end, next ? next.index : source.length);
  const pairs = [];
  const pairRe = /<h3[^>]*>([\s\S]*?)<\/h3>\s*(?:<p[^>]*>([\s\S]*?)<\/p>|<div[^>]*>([\s\S]*?)<\/div>)/gi;
  let m;
  while ((m = pairRe.exec(faqArea)) !== null) {
    const q = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const a = (m[2] || m[3] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (q && a && q.length < 250 && a.length >= 20) pairs.push({ q, a });
  }
  return pairs;
}

// --- H1 no content (o template já injeta) ---
if (/<h1\b/i.test(html)) fail('content contém <h1>. Remova — o H1 vem de article.title no template.');

// --- Title higiene ---
const title = article.title || '';
if (/\s{2,}/.test(title)) fail(`title com espaço duplo: ${JSON.stringify(title)}`);
if (/\s[)\]]/.test(title) || /[\(\[]\s/.test(title)) warn(`title com espaço grudado em parêntese: ${title}`);
if (title.length > 90) warn(`title longo (${title.length} chars). H1 deve caber em uma linha.`);

const seoTitle = article.seo_title || '';
if (!seoTitle) warn('seo_title vazio — a tag title cai no H1.');
else {
  if (seoTitle.length > 62) warn(`seo_title ${seoTitle.length} chars (alvo 50–60).`);
  if (keyword && !seoTitle.toLowerCase().includes(keyword.toLowerCase())) {
    warn(`seo_title não contém a keyword "${keyword}".`);
  }
}

const excerpt = article.excerpt || '';
if (!excerpt) warn('excerpt vazio.');
else if (excerpt.length < 140 || excerpt.length > 170) {
  warn(`excerpt ${excerpt.length} chars (alvo 150–160).`);
}

if (!keyword) warn('seo_keyword vazio.');

if (article.seo_canonical) {
  warn(`seo_canonical preenchido (${article.seo_canonical}). Preferir null e deixar o template montar.`);
}

if (words < 800) warn(`corpo curto (${words} palavras).`);

if (keyword) {
  const re = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const hits = (text.match(re) || []).length;
  const density = (hits * keyword.split(/\s+/).length) / Math.max(words, 1) * 100;
  if (density > 2.5) fail(`keyword stuffing: densidade ${density.toFixed(2)}% (${hits} ocorrências).`);
}

// --- Links ---
const hrefs = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
const seen = new Map();
for (const href of hrefs) {
  const r = resolveHref(href);
  if (r.kind === 'skip') continue;
  if (r.kind === 'invalid') {
    fail(`href inválido: ${href}`);
    continue;
  }
  if (r.kind === 'external') {
    const ok = allow.extraAbs.has(r.href.replace(/\/$/, '') ) || allow.extraAbs.has(r.href) || checkedExternal.includes(r.href);
    if (!ok) fail(`link externo fora da allowlist (rode curl -sI e passe --checked-external=): ${href}`);
    continue;
  }
  const p = r.path;
  const base = p.split('#')[0];
  if (allow.noindex.has(base)) {
    fail(`link para página noindex: ${href}`);
    continue;
  }
  if (allow.redirectSources.has(base)) {
    fail(`link para origem de 301 (use o destino canônico): ${href}`);
    continue;
  }
  const pathOk = allow.paths.has(p) || allow.paths.has(base);
  if (!pathOk) fail(`404 / destino inexistente: ${href}`);
  seen.set(base, (seen.get(base) || 0) + 1);
}
for (const [p, n] of seen) {
  if (n > 2) warn(`URL ${p} aparece ${n}× no corpo (máx. sugerido: 2).`);
}

if (hrefs.length === 0) warn('zero <a> no corpo — on-page/GEO fraco (3–8 links contextuais).');

// --- Imagens ---
for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
  const attrs = m[1];
  const src = (attrs.match(/\bsrc=["']([^"']+)["']/) || [])[1];
  const alt = attrs.match(/\balt=["']([^"']*)["']/);
  if (!src) {
    fail('img sem src');
    continue;
  }
  if (src.startsWith('/')) {
    const filePath = path.join(NEXT_ROOT, 'public', src.replace(/^\//, ''));
    if (!fs.existsSync(filePath) && !allow.publicFiles.has(src.split('?')[0])) {
      fail(`img 404 (arquivo ausente em public): ${src}`);
    }
  } else if (src.startsWith('http')) {
    if (!checkedExternal.includes(src)) {
      warn(`img remota não verificada: ${src} (passe --checked-external= se 200)`);
    }
  } else {
    fail(`img src inválido: ${src}`);
  }
  if (!alt) warn(`img sem alt: ${src}`);
}

if (article.cover_url && article.cover_url.startsWith('/')) {
  const coverFile = path.join(NEXT_ROOT, 'public', article.cover_url.replace(/^\//, ''));
  if (!fs.existsSync(coverFile)) fail(`cover_url 404: ${article.cover_url}`);
}

if (article.cta_banner_enabled) {
  const cta = article.cta_banner_cta_url;
  if (cta) {
    const r = resolveHref(cta);
    if (r.kind === 'internal') {
      const base = r.path.split('#')[0];
      if (!allow.paths.has(base) && !allow.paths.has(r.path)) fail(`cta_banner_cta_url 404: ${cta}`);
    } else if (r.kind === 'external') {
      const ok = allow.extraAbs.has(r.href) || allow.extraAbs.has(r.href.replace(/\/$/, '')) || checkedExternal.includes(r.href);
      if (!ok) fail(`cta_banner_cta_url externo não allowlisted: ${cta}`);
    }
  }
}

// --- FAQ ---
const faqs = extractFaqs(html);
if (faqs.length < 2) warn(`FAQ ausente ou <2 pares (template não emite FAQPage). Achados: ${faqs.length}.`);

// --- EN sidecar ---
if (!en || !en.content) warn('sidecar EN ausente — crawlers/EN users ficam só com PT.');
else if (html.length > 500 && Math.abs((en.content || '').length - html.length) / html.length > 0.45) {
  warn('EN content muito diferente em tamanho do PT — revisar se a tradução acompanhou o diff.');
}

const report = {
  id: article.id,
  slug: article.slug,
  url: `${ORIGIN}/blog/${article.slug}`,
  words,
  links: hrefs.length,
  faqs: faqs.length,
  hasEn: !!(en && en.content),
  seo_keyword: keyword || null,
  errors,
  warnings,
};

console.log(JSON.stringify(report, null, 2));
if (errors.length) {
  console.error(`\nFAIL ${errors.length} erro(s), ${warnings.length} aviso(s).`);
  process.exit(1);
}
console.error(`\nPASS 0 erros, ${warnings.length} aviso(s).`);
process.exit(0);
