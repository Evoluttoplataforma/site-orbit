import { PageLayout } from '@/components/PageLayout';
import { pageHTML } from '@/app/home-html';
import articles from '@/data/articles.json';
import articlesEnJson from '@/data/articles-en.json';
import { i18nText } from '@/lib/i18n-html';
import { blogCoverHTML } from '@/lib/blog-cover';

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
    const cat = HOME_CATS[a.category || ''] || a.category || 'Artigo';
    const catEn = HOME_CATS_EN[a.category || ''] || cat;
    const en = ARTICLES_EN[a.slug] || {};
    return `<a href="/blog/${escapeHtml(a.slug)}" class="knowledge-card" style="text-decoration:none;color:inherit;display:block;">
      <div class="knowledge-card__image">
        ${blogCoverHTML({
          slug: a.slug,
          titlePt: a.title,
          titleEn: en.title,
          category: a.category || 'estrategica',
          categoryLabelPt: cat,
          categoryLabelEn: catEn,
          size: 'thumb',
          headingTag: 'h4',
        })}
      </div>
      <div class="knowledge-card__body">
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
