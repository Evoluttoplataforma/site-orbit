import { Metadata } from 'next';
import articles from '@/data/articles.json';
import articlesEnJson from '@/data/articles-en.json';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';
import { ORG_ID, WEBSITE_ID } from '@/lib/seo';
import { i18nText, i18nEl } from '@/lib/i18n-html';

export const metadata: Metadata = {
  title: 'Blog — Orbit Gestão',
  description: 'Artigos e insights sobre gestão estratégica com inteligência artificial para empresas que querem resultados reais.',
  openGraph: {
    title: 'Blog — Orbit Gestão',
    description: 'Artigos e insights sobre gestão estratégica com IA.',
    url: 'https://orbitgestao.com.br/blog',
    siteName: 'Orbit Gestão',
    type: 'website',
    locale: 'pt_BR',
  },
  alternates: { canonical: 'https://orbitgestao.com.br/blog' },
};

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_url: string | null;
  category: string | null;
  author: string | null;
  author_avatar: string | null;
  published_at: string | null;
}

const CATEGORIES: Record<string, string> = {
  estrategica: 'Estratégia',
  operacional: 'Operacional',
  tecnologia: 'Tecnologia',
  novidades: 'Novidades',
  cultura: 'Cultura',
  financeiro: 'Financeiro',
  ia: 'IA',
  marketing: 'Marketing',
  indicadores: 'Indicadores',
  'planejamento-estrategico': 'Planejamento',
};

const CATEGORIES_EN: Record<string, string> = {
  estrategica: 'Strategy',
  operacional: 'Operations',
  tecnologia: 'Technology',
  novidades: 'News',
  cultura: 'Culture',
  financeiro: 'Finance',
  ia: 'AI',
  marketing: 'Marketing',
  indicadores: 'KPIs',
  'planejamento-estrategico': 'Planning',
};

type ArticleEn = { title?: string; excerpt?: string };
const ARTICLES_EN = articlesEnJson as Record<string, ArticleEn>;

function humanizeCategory(slug: string): string {
  if (CATEGORIES[slug]) return CATEGORIES[slug];
  return slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

function formatDate(dateStr: string | null, locale = 'pt-BR'): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
}

function readTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getInitials(name: string | null): string {
  if (!name) return 'O';
  return name.split(' ').map((n) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

function truncate(html: string, len: number): string {
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > len ? text.slice(0, len) + '...' : text;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function BlogPage() {
  const all = articles as Article[];
  const sorted = [...all].sort(
    (a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime()
  );

  // Categorias usadas + contagem
  const catCounts: Record<string, number> = {};
  for (const a of sorted) {
    const k = a.category || 'sem-categoria';
    catCounts[k] = (catCounts[k] || 0) + 1;
  }
  const categoriesUsed = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);

  const filterBarHTML = `
    <div class="blog-filters">
      <div class="blog-filters__row">
        <div class="blog-search">
          <i class="fas fa-search"></i>
          <input id="blogSearch" type="search" placeholder="Buscar artigos pelo título..." data-i18n-placeholder="blog.search" autocomplete="off">
        </div>
        <div class="blog-sort-wrap">
          <i class="fas fa-arrow-down-wide-short"></i>
          <select id="blogSort" aria-label="Ordenar">
            <option value="recent" data-i18n="blog.newest">Mais recentes</option>
            <option value="oldest" data-i18n="blog.oldest">Mais antigos</option>
            <option value="az">A — Z</option>
          </select>
        </div>
      </div>
      <div class="blog-cats">
        <button type="button" class="blog-cat-chip is-active" data-cat="all">${i18nText('Todos', 'All')} <span>${sorted.length}</span></button>
        ${categoriesUsed
          .map(([slug, count]) => `<button type="button" class="blog-cat-chip" data-cat="${escapeHtml(slug)}">${i18nText(escapeHtml(humanizeCategory(slug)), escapeHtml(CATEGORIES_EN[slug] || humanizeCategory(slug)))} <span>${count}</span></button>`)
          .join('')}
      </div>
    </div>
  `;

  const RECENT_COUNT = 6;
  const sectionHeaderHTML = `
    <div class="blog-section-head" id="blogSectionHead">
      <h2><i class="fas fa-bolt"></i> ${i18nText('Artigos recentes', 'Recent articles')}</h2>
      <p>${i18nText('O que postamos ultimamente — atualizado toda vez que sai conteúdo novo.', 'What we posted lately — updated every time new content goes out.')}</p>
    </div>
  `;
  const moreCount = sorted.length - RECENT_COUNT;
  const moreButtonHTML = sorted.length > RECENT_COUNT ? `
    <div class="blog-more-wrap" id="blogMoreWrap">
      <button type="button" id="blogMoreBtn" class="blog-more-btn">
        <i class="fas fa-arrow-down"></i>
        ${i18nText(`Ver mais ${moreCount} artigo${moreCount > 1 ? 's' : ''}`, `See ${moreCount} more article${moreCount > 1 ? 's' : ''}`)}
      </button>
    </div>
  ` : '';

  const cardsHTML = sorted
    .map((a, i) => {
      const cat = a.category || 'sem-categoria';
      const catLabel = humanizeCategory(cat);
      const en = ARTICLES_EN[a.slug] || {};
      const preview = a.excerpt || truncate(a.content, 140);
      const previewEn = en.excerpt || preview;
      const date = formatDate(a.published_at);
      const dateEn = formatDate(a.published_at, 'en-US');
      const mins = readTime(a.content);
      const initials = getInitials(a.author);
      const imgSrc = a.cover_url || '/images/og-image.png';
      const ts = a.published_at ? new Date(a.published_at).getTime() : 0;
      const titleLower = (a.title + ' ' + (en.title || '')).toLowerCase();

      const hiddenMore = i >= RECENT_COUNT ? '1' : '0';
      const isoDate = a.published_at || '';
      return `<a href="/blog/${escapeHtml(a.slug)}" class="blog-card blog-card--animate" role="article" data-category="${escapeHtml(cat)}" data-title-lower="${escapeHtml(titleLower)}" data-date-ts="${ts}" data-title-az="${escapeHtml(titleLower)}" data-hidden-more="${hiddenMore}" style="animation-delay:${i * 80}ms;text-decoration:none;color:inherit;display:block;">
        <div class="blog-card__image">
          <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(en.title || a.title)}" loading="lazy" width="600" height="340">
          <span class="blog-card__tag">${i18nText(escapeHtml(catLabel), escapeHtml(CATEGORIES_EN[cat] || catLabel))}</span>
        </div>
        <div class="blog-card__body">
          ${i18nEl('h3', escapeHtml(a.title), en.title ? escapeHtml(en.title) : undefined)}
          ${i18nEl('p', escapeHtml(preview), en.excerpt ? escapeHtml(previewEn) : undefined)}
          <div class="blog-card__footer">
            <div class="blog-card__author">
              ${a.author_avatar
                ? `<img src="${escapeHtml(a.author_avatar)}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0;" alt="">`
                : `<div class="blog-card__avatar">${initials}</div>`}
              <div class="blog-card__author-info">
                <span class="blog-card__author-name">${escapeHtml(a.author || 'Equipe Orbit')}</span>
                <time class="blog-card__date" datetime="${escapeHtml(isoDate)}">${i18nText(date, dateEn)}</time>
              </div>
            </div>
            <span class="blog-card__read-time"><i class="fas fa-clock"></i> ${mins} min</span>
          </div>
        </div>
      </a>`;
    })
    .join('');

  const emptyStateHTML = `
    <div class="blog-empty" id="blogEmpty" style="display:none;">
      <i class="fas fa-search"></i>
      <h3>Nenhum artigo encontrado</h3>
      <p>Tente outra busca ou limpe os filtros.</p>
      <button type="button" id="blogClearFilters" class="btn btn-outline">Limpar filtros</button>
    </div>
  `;

  const filterStylesHTML = `
    <style>
      .blog-filters { max-width: 1200px; margin: 0 auto 28px; padding: 0 20px; }
      .blog-filters__row { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
      .blog-search { flex: 1; min-width: 240px; position: relative; }
      .blog-search i { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #6B7280; font-size: 14px; pointer-events: none; }
      .blog-search input { width: 100%; padding: 14px 18px 14px 44px; background: #fff; border: 1px solid #E5E7EB; border-radius: 50px; color: #0D1117; font-size: 14px; font-family: inherit; transition: all 0.2s; box-sizing: border-box; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
      .blog-search input::placeholder { color: #9CA3AF; }
      .blog-search input:focus { outline: none; border-color: #ffba1a; box-shadow: 0 0 0 3px rgba(255,186,26,0.15); }
      .blog-sort-wrap { position: relative; min-width: 180px; }
      .blog-sort-wrap i { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #ff8c00; font-size: 13px; pointer-events: none; z-index: 1; }
      .blog-sort-wrap select { width: 100%; padding: 14px 36px 14px 42px; background: #fff; border: 1px solid #E5E7EB; border-radius: 50px; color: #0D1117; font-size: 14px; font-family: inherit; font-weight: 600; cursor: pointer; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%236B7280' d='M5 6L0 0h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 18px center; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
      .blog-sort-wrap select:focus { outline: none; border-color: #ffba1a; box-shadow: 0 0 0 3px rgba(255,186,26,0.15); }
      .blog-sort-wrap select option { background: #fff; color: #0D1117; }
      .blog-cats { display: flex; flex-wrap: wrap; gap: 8px; }
      .blog-cat-chip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #fff; border: 1px solid #E5E7EB; border-radius: 50px; color: #374151; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
      .blog-cat-chip:hover { border-color: #ffba1a; color: #0D1117; transform: translateY(-1px); }
      .blog-cat-chip span { display: inline-flex; align-items: center; justify-content: center; min-width: 22px; height: 22px; padding: 0 7px; background: #F3F4F6; border-radius: 50px; font-size: 11px; font-weight: 700; color: #6B7280; }
      .blog-cat-chip.is-active { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); border-color: transparent; color: #0D1117; box-shadow: 0 6px 18px rgba(255,186,26,0.28); }
      .blog-cat-chip.is-active span { background: rgba(13,17,23,0.18); color: #0D1117; }
      .blog-section-head { max-width: 1200px; margin: 0 auto 22px; padding: 0 20px; }
      .blog-section-head h2 { display: flex; align-items: center; gap: 10px; color: #0D1117; font-size: 1.5rem; font-weight: 800; margin: 0 0 4px; letter-spacing: -0.01em; }
      .blog-section-head h2 i { color: #ffba1a; font-size: 1.1rem; }
      .blog-section-head p { color: #6B7280; font-size: 0.95rem; margin: 0; }
      .blog-more-wrap { max-width: 1200px; margin: 36px auto 0; padding: 0 20px; text-align: center; }
      .blog-more-btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 32px; background: #0D1117; color: #fff; border: none; border-radius: 50px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.25s; font-family: inherit; box-shadow: 0 8px 22px rgba(13,17,23,0.18); }
      .blog-more-btn:hover { background: linear-gradient(135deg, #ffba1a 0%, #ff8c00 100%); color: #0D1117; transform: translateY(-2px); box-shadow: 0 12px 28px rgba(255,186,26,0.32); }
      .blog-more-btn i { transition: transform 0.2s; }
      .blog-more-btn:hover i { transform: translateY(3px); }
      /* Cards alem do RECENT_COUNT ficam ocultos visualmente quando o grid esta colapsado,
         mas ainda presentes no HTML para crawlers (Google/GPTBot/ClaudeBot/PerplexityBot). */
      .blog-grid.is-collapsed .blog-card[data-hidden-more="1"] { display: none !important; }
      .blog-empty { max-width: 480px; margin: 60px auto; padding: 40px 24px; text-align: center; background: #fff; border: 1px dashed #E5E7EB; border-radius: 20px; }
      .blog-empty i { font-size: 38px; color: #9CA3AF; margin-bottom: 16px; display: block; }
      .blog-empty h3 { color: #0D1117; font-size: 18px; margin: 0 0 6px; }
      .blog-empty p { color: #6B7280; font-size: 14px; margin: 0 0 18px; }
      @media (max-width: 600px) {
        .blog-filters__row { flex-direction: column; }
        .blog-search, .blog-sort-wrap { min-width: 0; width: 100%; }
      }
    </style>
  `;

  const filterScriptHTML = `
    <script>
      (function() {
        var grid = document.querySelector('.blog-grid');
        var search = document.getElementById('blogSearch');
        var sortSel = document.getElementById('blogSort');
        var empty = document.getElementById('blogEmpty');
        var clearBtn = document.getElementById('blogClearFilters');
        var moreWrap = document.getElementById('blogMoreWrap');
        var moreBtn = document.getElementById('blogMoreBtn');
        var sectionHead = document.getElementById('blogSectionHead');
        var chips = document.querySelectorAll('.blog-cat-chip');
        if (!grid || !search || !sortSel) return;

        var cards = Array.prototype.slice.call(grid.querySelectorAll('.blog-card'));
        var state = { cat: 'all', q: '', expanded: false };

        function isFiltering() {
          return state.cat !== 'all' || state.q.trim().length > 0;
        }

        function applyFilters() {
          var q = state.q.trim().toLowerCase();
          var filtering = isFiltering();
          var visible = 0;

          // Quando filtra ou expande, tira o is-collapsed (libera todos pra filtragem visual)
          var shouldCollapse = !filtering && !state.expanded;
          if (shouldCollapse) {
            grid.classList.add('is-collapsed');
          } else {
            grid.classList.remove('is-collapsed');
          }

          cards.forEach(function(c) {
            var cat = c.getAttribute('data-category') || '';
            var title = c.getAttribute('data-title-lower') || '';
            var hiddenMore = c.getAttribute('data-hidden-more') === '1';
            var matchCat = state.cat === 'all' || cat === state.cat;
            var matchQ = !q || title.indexOf(q) !== -1;
            var matchSearch = matchCat && matchQ;

            if (shouldCollapse) {
              // Modo coleted: CSS .is-collapsed esconde data-hidden-more. Limpa inline.
              c.style.display = '';
              if (!hiddenMore) visible++;
            } else {
              // Modo aberto/filtrando: per-card display baseado em match
              c.style.display = matchSearch ? 'block' : 'none';
              if (matchSearch) visible++;
            }
          });
          if (empty) empty.style.display = visible === 0 ? 'block' : 'none';

          // Header "Artigos recentes" so faz sentido sem filtros ativos
          if (sectionHead) sectionHead.style.display = filtering ? 'none' : 'block';

          // Botao "Ver mais" so aparece quando: sem filtros + nao expandido + ha cards escondidos
          if (moreWrap) {
            var showMore = !filtering && !state.expanded && cards.some(function(c) { return c.getAttribute('data-hidden-more') === '1'; });
            moreWrap.style.display = showMore ? 'block' : 'none';
          }
        }

        function applySort() {
          var mode = sortSel.value;
          var sorted = cards.slice().sort(function(a, b) {
            if (mode === 'az') {
              return (a.getAttribute('data-title-az') || '').localeCompare(b.getAttribute('data-title-az') || '');
            }
            var ta = parseInt(a.getAttribute('data-date-ts') || '0', 10);
            var tb = parseInt(b.getAttribute('data-date-ts') || '0', 10);
            return mode === 'oldest' ? ta - tb : tb - ta;
          });
          sorted.forEach(function(c) { grid.appendChild(c); });
          // Ordenacao manual = considera expandido para evitar mostrar so 6 fora de ordem
          if (sortSel.value !== 'recent') state.expanded = true;
          applyFilters();
        }

        // Atualiza URL com state atual (history.pushState) — filtros viram shareable URLs.
        // Sem reload, sem nova navegacao Next; so o querystring muda.
        function syncUrl() {
          try {
            var params = new URLSearchParams();
            if (state.cat && state.cat !== 'all') params.set('cat', state.cat);
            if (state.q && state.q.trim()) params.set('q', state.q.trim());
            var qs = params.toString();
            var newUrl = window.location.pathname + (qs ? '?' + qs : '');
            if (newUrl !== window.location.pathname + window.location.search) {
              window.history.replaceState(null, '', newUrl);
            }
          } catch (e) {}
        }

        chips.forEach(function(chip) {
          chip.addEventListener('click', function() {
            chips.forEach(function(c) { c.classList.remove('is-active'); });
            chip.classList.add('is-active');
            state.cat = chip.getAttribute('data-cat') || 'all';
            applyFilters();
            syncUrl();
          });
        });

        var t;
        search.addEventListener('input', function() {
          clearTimeout(t);
          t = setTimeout(function() { state.q = search.value; applyFilters(); syncUrl(); }, 120);
        });

        sortSel.addEventListener('change', applySort);

        if (moreBtn) {
          moreBtn.addEventListener('click', function() {
            state.expanded = true;
            applyFilters();
          });
        }

        if (clearBtn) {
          clearBtn.addEventListener('click', function() {
            state.cat = 'all'; state.q = ''; state.expanded = false;
            search.value = '';
            sortSel.value = 'recent';
            chips.forEach(function(c) {
              c.classList.toggle('is-active', c.getAttribute('data-cat') === 'all');
            });
            applySort();
            syncUrl();
          });
        }

        // Le ?q= e ?cat= da URL pra integrar com SearchAction (Google sitelinks searchbox)
        try {
          var params = new URLSearchParams(window.location.search);
          var qParam = params.get('q');
          var catParam = params.get('cat');
          var changed = false;
          if (qParam) { search.value = qParam; state.q = qParam; changed = true; }
          if (catParam) {
            var matchChip = null;
            chips.forEach(function(c) { if (c.getAttribute('data-cat') === catParam) matchChip = c; });
            if (matchChip) {
              chips.forEach(function(c) { c.classList.remove('is-active'); });
              matchChip.classList.add('is-active');
              state.cat = catParam;
              changed = true;
            }
          }
          if (changed) applyFilters();
        } catch (e) {}
      })();
    </script>
  `;

  const blogListJSON = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Orbit Gestão',
    description: 'Artigos sobre gestão estratégica com inteligência artificial.',
    url: 'https://orbitgestao.com.br/blog',
    // Referencia a Organization/WebSite ancorados no layout raiz.
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    blogPost: sorted.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      url: `https://orbitgestao.com.br/blog/${a.slug}`,
      datePublished: a.published_at,
      author: { '@type': 'Person', name: a.author || 'Equipe Orbit' },
      image: a.cover_url || '/images/og-image.png',
    })),
  };

  const pageHTML = `
    ${headerHTML}
    ${filterStylesHTML}
    <section class="blog-hero">
      <div class="blog-hero__bg">
        <div class="blog-hero__glow blog-hero__glow--1"></div>
        <div class="blog-hero__glow blog-hero__glow--2"></div>
      </div>
      <div class="container">
        <div class="blog-hero__badge"><i class="fas fa-lightbulb"></i> Conhecimento & Estratégia</div>
        <h1>Amplie seus <span>conhecimentos</span></h1>
        <p>Artigos e insights sobre gestão estratégica para empresas que querem resultados reais.</p>
      </div>
    </section>
    <section class="blog-grid-section">
      ${filterBarHTML}
      ${sectionHeaderHTML}
      <div class="blog-grid${sorted.length > RECENT_COUNT ? ' is-collapsed' : ''}">${cardsHTML}</div>
      ${emptyStateHTML}
      ${moreButtonHTML}
    </section>
    ${filterScriptHTML}
    <section class="site-cta">
      <div class="site-cta__particles"><span></span><span></span><span></span><span></span></div>
      <div class="container">
        <div class="site-cta__card">
          <div class="site-cta__icon"><i class="fas fa-rocket"></i></div>
          <h2>Pronto para transformar sua gestão?</h2>
          <p>Conheça o time de IA que executa a estratégia da sua empresa.</p>
          <div class="site-cta__buttons">
            <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary btn-lg">Conhecer o Time de IA</a>
          </div>
        </div>
      </div>
    </section>
    ${footerHTML}
  `;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJSON) }} />
      <div dangerouslySetInnerHTML={{ __html: pageHTML }} />
    </>
  );
}
