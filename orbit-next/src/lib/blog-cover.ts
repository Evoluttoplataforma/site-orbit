import { i18nEl, i18nText } from '@/lib/i18n-html';
import coversJson from '@/data/blog-covers.json';

type CoverMeta = { hl?: string; hlEn?: string };
const COVERS = coversJson as Record<string, CoverMeta>;

export type BlogCoverSize = 'hero' | 'card' | 'thumb';

const MOTIFS: Record<string, string> = {
  ia: `<svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="18" stroke="#ffba1a" stroke-width="1.4"/><circle cx="60" cy="60" r="4" fill="#ffba1a"/><circle cx="28" cy="38" r="5" stroke="#ffba1a" stroke-width="1.2"/><circle cx="92" cy="36" r="5" stroke="#ffba1a" stroke-width="1.2"/><circle cx="24" cy="78" r="5" stroke="#ffba1a" stroke-width="1.2"/><circle cx="96" cy="80" r="5" stroke="#ffba1a" stroke-width="1.2"/><circle cx="60" cy="18" r="4" stroke="#ffba1a" stroke-width="1.2"/><circle cx="60" cy="102" r="4" stroke="#ffba1a" stroke-width="1.2"/><path d="M42 52 32 42M78 52 88 40M44 70 28 76M76 70 92 78M60 42V22M60 78v20" stroke="#ffba1a" stroke-width="1" opacity=".7"/></svg>`,
  estrategica: `<svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="46" stroke="#ffba1a" stroke-width="1" opacity=".35"/><circle cx="60" cy="60" r="30" stroke="#ffba1a" stroke-width="1.2" opacity=".55"/><circle cx="60" cy="60" r="14" stroke="#ffba1a" stroke-width="1.6"/><circle cx="60" cy="60" r="4" fill="#ffba1a"/><circle cx="90" cy="38" r="3.5" fill="#ffba1a"/></svg>`,
  indicadores: `<svg viewBox="0 0 120 120" fill="none"><path d="M22 88h76" stroke="#ffba1a" stroke-width="1.2" opacity=".4"/><rect x="28" y="58" width="12" height="30" rx="2" fill="#ffba1a" opacity=".35"/><rect x="48" y="40" width="12" height="48" rx="2" fill="#ffba1a" opacity=".55"/><rect x="68" y="28" width="12" height="60" rx="2" fill="#ffba1a"/><path d="M30 52l20-16 20 8 22-22" stroke="#ffba1a" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  marketing: `<svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="38" stroke="#ffba1a" stroke-width="1.2" opacity=".35"/><circle cx="60" cy="60" r="24" stroke="#ffba1a" stroke-width="1.3" opacity=".55"/><circle cx="60" cy="60" r="10" stroke="#ffba1a" stroke-width="1.6"/><circle cx="60" cy="60" r="3.5" fill="#ffba1a"/><path d="M78 42l22-16" stroke="#ffba1a" stroke-width="1.6" stroke-linecap="round"/><path d="M88 26l12 4-8 10" stroke="#ffba1a" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  'planejamento-estrategico': `<svg viewBox="0 0 120 120" fill="none"><path d="M60 16l18 36 40 6-29 28 7 40-36-19-36 19 7-40L2 58l40-6z" stroke="#ffba1a" stroke-width="1.4" fill="#ffba1a" fill-opacity=".06"/><circle cx="60" cy="58" r="8" stroke="#ffba1a" stroke-width="1.4"/></svg>`,
  novidades: `<svg viewBox="0 0 120 120" fill="none"><path d="M60 14v20M60 86v20M14 60h20M86 60h20M28 28l14 14M78 78l14 14M92 28L78 42M42 78L28 92" stroke="#ffba1a" stroke-width="1.5" stroke-linecap="round"/><circle cx="60" cy="60" r="16" stroke="#ffba1a" stroke-width="1.6"/><circle cx="60" cy="60" r="5" fill="#ffba1a"/></svg>`,
  financeiro: `<svg viewBox="0 0 120 120" fill="none"><path d="M18 86c16-28 28-20 40-40 12 8 18 4 44-28" stroke="#ffba1a" stroke-width="2" stroke-linecap="round"/><path d="M82 18h20v20" stroke="#ffba1a" stroke-width="1.6" stroke-linejoin="round"/><circle cx="58" cy="46" r="3.5" fill="#ffba1a"/></svg>`,
  operacional: `<svg viewBox="0 0 120 120" fill="none"><path d="M60 22v16M60 82v16M22 60h16M82 60h16M34 34l12 12M74 74l12 12M86 34L74 46M46 74L34 86" stroke="#ffba1a" stroke-width="1.3" stroke-linecap="round"/><circle cx="60" cy="60" r="18" stroke="#ffba1a" stroke-width="1.6"/><circle cx="60" cy="60" r="7" stroke="#ffba1a" stroke-width="1.4"/></svg>`,
  cultura: `<svg viewBox="0 0 120 120" fill="none"><circle cx="44" cy="42" r="12" stroke="#ffba1a" stroke-width="1.5"/><circle cx="76" cy="42" r="12" stroke="#ffba1a" stroke-width="1.5"/><circle cx="60" cy="70" r="12" stroke="#ffba1a" stroke-width="1.5"/><path d="M28 92c2-14 10-20 16-20M92 92c-2-14-10-20-16-20M44 98c4-12 12-16 16-16s12 4 16 16" stroke="#ffba1a" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  tecnologia: `<svg viewBox="0 0 120 120" fill="none"><rect x="38" y="38" width="44" height="44" rx="6" stroke="#ffba1a" stroke-width="1.5"/><path d="M60 38V22M60 98V82M38 60H22M98 60H82M44 44l-12-12M76 76l12 12M76 44l12-12M44 76L32 88" stroke="#ffba1a" stroke-width="1.2" stroke-linecap="round"/><circle cx="60" cy="60" r="6" fill="#ffba1a"/></svg>`,
};

function motifFor(category: string): string {
  return MOTIFS[category] || MOTIFS.estrategica;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wrapHighlight(title: string, highlight?: string): string {
  if (!highlight) return escapeHtml(title);
  const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx < 0) return escapeHtml(title);
  return (
    escapeHtml(title.slice(0, idx)) +
    `<em>${escapeHtml(title.slice(idx, idx + highlight.length))}</em>` +
    escapeHtml(title.slice(idx + highlight.length))
  );
}

function autoHighlight(title: string): string | undefined {
  const colon = title.indexOf(':');
  if (colon > 6 && colon <= 40) return title.slice(0, colon).trim();
  if (colon > 0) {
    const after = title.slice(colon + 1).trim();
    if (after.length >= 8 && after.length <= 48) return after;
    if (after.length > 48) {
      const cut = after.slice(0, 42).lastIndexOf(' ');
      if (cut > 12) return after.slice(0, cut);
    }
  }
  const words = title.replace(/[()]/g, '').split(/\s+/);
  if (words.length >= 6) return words.slice(1, 5).join(' ');
  return undefined;
}

export function getCoverMeta(slug: string): CoverMeta {
  return COVERS[slug] || {};
}

export function blogCoverHTML(opts: {
  slug: string;
  titlePt: string;
  titleEn?: string | null;
  category: string;
  categoryLabelPt: string;
  categoryLabelEn: string;
  size: BlogCoverSize;
  headingTag?: 'h1' | 'h3' | 'h4' | 'p';
}): string {
  const meta = getCoverMeta(opts.slug);
  const hlPt = meta.hl || autoHighlight(opts.titlePt);
  const hlEn = meta.hlEn || (opts.titleEn ? autoHighlight(opts.titleEn) : undefined);
  const tag = opts.headingTag || (opts.size === 'hero' ? 'h1' : 'h3');
  const titlePt = wrapHighlight(opts.titlePt, hlPt);
  const titleEn = opts.titleEn ? wrapHighlight(opts.titleEn, hlEn) : undefined;
  const cat = (opts.category || 'estrategica').replace(/[^a-z0-9-]/gi, '');

  return `<div class="blog-cover blog-cover--${opts.size} blog-cover--${escapeHtml(cat)}">
    <div class="blog-cover__glow" aria-hidden="true"></div>
    <div class="blog-cover__motif" aria-hidden="true">${motifFor(cat)}</div>
    <span class="blog-cover__tag">${i18nText(escapeHtml(opts.categoryLabelPt), escapeHtml(opts.categoryLabelEn))}</span>
    ${i18nEl(tag, titlePt, titleEn, 'class="blog-cover__title"')}
    <div class="blog-cover__foot">
      <span class="blog-cover__brand"><span class="blog-cover__ring" aria-hidden="true"></span> Orbit Gestão</span>
    </div>
  </div>`;
}
