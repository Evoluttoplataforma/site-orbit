import { PageLayout } from '@/components/PageLayout';
import { pageHTML } from '@/app/home-html';
import articles from '@/data/articles.json';
import articlesEnJson from '@/data/articles-en.json';
import { i18nText, i18nEl } from '@/lib/i18n-html';

interface Article {
  title: string;
  slug: string;
  cover_url: string | null;
  category: string | null;
  published_at: string | null;
}

type ArticleEn = { title?: string; excerpt?: string };
const ARTICLES_EN = articlesEnJson as Record<string, ArticleEn>;

const HOME_CATS: Record<string, string> = {
  estrategica: 'Gestão Estratégica',
  processos: 'Processos',
  indicadores: 'Indicadores',
  lideranca: 'Liderança',
  ia: 'IA & Inovação',
  novidades: 'Novidades',
  marketing: 'Marketing',
  'planejamento-estrategico': 'Planejamento',
};

const HOME_CATS_EN: Record<string, string> = {
  estrategica: 'Strategic management',
  processos: 'Processes',
  indicadores: 'KPIs',
  lideranca: 'Leadership',
  ia: 'AI & Innovation',
  novidades: 'News',
  marketing: 'Marketing',
  'planejamento-estrategico': 'Planning',
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderHomeArticlesGrid(): string {
  const recent = [...(articles as Article[])]
    .sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime())
    .slice(0, 3);
  if (recent.length === 0) {
    return `<p style="color:var(--gray-400);text-align:center;width:100%;">${i18nText('Em breve novos artigos serão publicados.', 'New articles will be published soon.')}</p>`;
  }
  return recent.map((a) => {
    const imgSrc = a.cover_url || 'https://placehold.co/400x250/0D1117/ffba1a?text=Orbit+Blog';
    const cat = HOME_CATS[a.category || ''] || a.category || 'Artigo';
    const catEn = HOME_CATS_EN[a.category || ''] || cat;
    const en = ARTICLES_EN[a.slug] || {};
    const alt = escapeHtml(en.title || a.title);
    return `<a href="/blog/${escapeHtml(a.slug)}" class="knowledge-card" style="text-decoration:none;color:inherit;display:block;">
      <div class="knowledge-card__image">
        <img src="${escapeHtml(imgSrc)}" alt="${alt}" width="400" height="250" loading="lazy" decoding="async">
        <span class="knowledge-card__type"><i class="fas fa-file-alt"></i> ${i18nText(escapeHtml(cat), escapeHtml(catEn))}</span>
      </div>
      <div class="knowledge-card__body">
        ${i18nEl('h4', escapeHtml(a.title), en.title ? escapeHtml(en.title) : undefined)}
        <span class="knowledge-card__link">${i18nText('Ler artigo', 'Read article')}</span>
      </div>
    </a>`;
  }).join('');
}

// Injeta os 3 artigos pre-renderizados (server-side, do articles.json gerado no build)
// no lugar do <div id="knowledgeGrid"> vazio. Tira a dependencia de fetch live
// pro Supabase — se o Supabase cair, a secao continua renderizando.
function injectHomeArticles(html: string): string {
  const grid = renderHomeArticlesGrid();
  return html.replace(
    /<div class="knowledge-grid" id="knowledgeGrid">[\s\S]*?<\/div>/,
    `<div class="knowledge-grid" id="knowledgeGrid">${grid}</div>`
  );
}

export function HomeContent() {
  return <PageLayout contentHTML={injectHomeArticles(pageHTML)} />;
}
