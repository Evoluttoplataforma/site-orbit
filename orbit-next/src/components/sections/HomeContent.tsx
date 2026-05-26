import { PageLayout } from '@/components/PageLayout';
import { pageHTML } from '@/app/home-html';
import articles from '@/data/articles.json';

interface Article {
  title: string;
  slug: string;
  cover_url: string | null;
  category: string | null;
  published_at: string | null;
}

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

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderHomeArticlesGrid(): string {
  const recent = [...(articles as Article[])]
    .sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime())
    .slice(0, 3);
  if (recent.length === 0) return '<p style="color:var(--gray-400);text-align:center;width:100%;">Em breve novos artigos serão publicados.</p>';
  return recent.map((a) => {
    const imgSrc = a.cover_url || 'https://placehold.co/400x250/0D1117/ffba1a?text=Orbit+Blog';
    const cat = HOME_CATS[a.category || ''] || a.category || 'Artigo';
    return `<a href="/blog/${escapeHtml(a.slug)}" class="knowledge-card" style="text-decoration:none;color:inherit;display:block;">
      <div class="knowledge-card__image">
        <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(a.title)}" width="400" height="250" loading="lazy" decoding="async">
        <span class="knowledge-card__type"><i class="fas fa-file-alt"></i> ${escapeHtml(cat)}</span>
      </div>
      <div class="knowledge-card__body">
        <h4>${escapeHtml(a.title)}</h4>
        <span class="knowledge-card__link">Ler artigo</span>
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
