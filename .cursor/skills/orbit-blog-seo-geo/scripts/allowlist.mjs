/**
 * Allowlist de destinos 200 (indexáveis) do site Orbit.
 * Usado pelo validador — jamais inventar href fora desta lista.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITEMAP_PAGES, CLUSTER_SLUGS } from '../../../../orbit-next/scripts/sitemap-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(__dirname, '../../../..');
export const NEXT_ROOT = path.join(REPO_ROOT, 'orbit-next');
export const ORIGIN = 'https://orbitgestao.com.br';

const NOINDEX = new Set([
  '/acesso',
  '/acesso/painel',
  '/apresentacao',
  '/experiencias',
  '/experiencias/canal',
  '/programa',
  '/design-system',
  '/live/igor',
  '/live/rd',
  '/live/obrigado',
  '/live/chris/obrigado',
  '/live/rd/obrigado',
  '/obrigado',
  '/treinamentos/obrigado',
  '/bootcamp-orbit/obrigado',
  '/bootcamp-orbit/recrutas',
]);

const EXTRA_ABS = new Set([
  'https://demonstracao.orbitgestao.com.br/chat',
  'https://app.orbitgestao.com.br',
  'https://app.orbitgestao.com.br/',
  'https://www.instagram.com/orbitgestao/',
  'https://www.youtube.com/@Orbit.Gestão',
  'https://www.youtube.com/@Orbit.Gest%C3%A3o',
]);

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(NEXT_ROOT, rel), 'utf8'));
}

function normalizePath(p) {
  if (!p) return '';
  const noHash = p.split('#')[0];
  const noQuery = noHash.split('?')[0];
  if (noQuery.length > 1 && noQuery.endsWith('/')) return noQuery.slice(0, -1);
  return noQuery || '/';
}

function parseGlossarioAnchors() {
  const src = fs.readFileSync(path.join(NEXT_ROOT, 'src/app/glossario/page.tsx'), 'utf8');
  const anchors = new Set();
  for (const m of src.matchAll(/slug:\s*'([^']+)'/g)) anchors.add(m[1]);
  return anchors;
}

function parseRedirects() {
  const raw = fs.readFileSync(path.join(NEXT_ROOT, 'public/_redirects'), 'utf8');
  const sources = new Set();
  const destinations = new Set();
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const parts = t.split(/\s+/);
    if (parts.length < 2) continue;
    const from = parts[0];
    const to = parts[1];
    if (from.startsWith('/') && !from.includes('*')) sources.add(normalizePath(from));
    if (to.startsWith('/')) destinations.add(normalizePath(to));
  }
  return { sources, destinations };
}

export function buildAllowlist() {
  const paths = new Set();
  for (const [p] of SITEMAP_PAGES) paths.add(normalizePath(p));
  for (const c of CLUSTER_SLUGS) paths.add(`/blog/cluster/${c}`);

  const articles = readJson('src/data/articles.json');
  for (const a of articles) {
    if (a.slug) paths.add(`/blog/${a.slug}`);
  }

  const stories = readJson('src/data/stories.json');
  for (const s of stories) {
    if (s.slug) paths.add(`/historias/${s.slug}`);
  }

  const gloss = parseGlossarioAnchors();
  paths.add('/glossario');
  for (const g of gloss) paths.add(`/glossario#${g}`);

  const { sources: redirectSources, destinations } = parseRedirects();
  for (const d of destinations) {
    if (d.startsWith('http')) continue;
    paths.add(d);
  }

  for (const n of NOINDEX) paths.delete(n);

  const publicFiles = new Set();
  const blogImg = path.join(NEXT_ROOT, 'public/images/blog');
  if (fs.existsSync(blogImg)) {
    for (const f of fs.readdirSync(blogImg)) publicFiles.add(`/images/blog/${f}`);
  }

  return {
    paths,
    gloss,
    redirectSources,
    noindex: NOINDEX,
    extraAbs: EXTRA_ABS,
    articleSlugs: new Set(articles.map((a) => a.slug).filter(Boolean)),
    storySlugs: new Set(stories.map((s) => s.slug).filter(Boolean)),
    publicFiles,
    articles,
  };
}

export function resolveHref(href) {
  const raw = (href || '').trim();
  if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) {
    return { kind: 'skip', href: raw };
  }
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    try {
      const u = new URL(raw);
      if (u.origin === ORIGIN) {
        return { kind: 'internal', href: raw, path: `${normalizePath(u.pathname)}${u.hash || ''}` };
      }
      return { kind: 'external', href: raw };
    } catch {
      return { kind: 'invalid', href: raw };
    }
  }
  if (raw.startsWith('/')) {
    const [pathPart, hash] = raw.split('#');
    const p = normalizePath(pathPart);
    return { kind: 'internal', href: raw, path: hash ? `${p}#${hash}` : p };
  }
  return { kind: 'invalid', href: raw };
}

export { normalizePath, NOINDEX };
