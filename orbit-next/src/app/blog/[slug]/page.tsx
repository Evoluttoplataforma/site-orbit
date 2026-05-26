import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import articles from '@/data/articles.json';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

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
  updated_at: string | null;
  seo_title: string | null;
  seo_keyword: string | null;
  seo_og_image: string | null;
  seo_canonical: string | null;
}

const CATEGORIES: Record<string, string> = {
  estrategica: 'Estratégia',
  operacional: 'Operacional',
  tecnologia: 'Tecnologia',
  novidades: 'Novidades',
  cultura: 'Cultura',
  financeiro: 'Financeiro',
};

function getArticle(slug: string): Article | undefined {
  return (articles as Article[]).find((a) => a.slug === slug);
}

export function generateStaticParams() {
  return (articles as Article[]).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Artigo não encontrado' };

  const title = (article.seo_title || article.title) + ' | Blog Orbit Gestão';
  const description = article.excerpt || article.content.replace(/<[^>]*>/g, '').slice(0, 160);
  const image = article.seo_og_image || article.cover_url || '/images/og-image.png';
  const url = `https://orbitgestao.com.br/blog/${article.slug}`;
  const author = article.author || 'Equipe Orbit';

  return {
    title,
    description,
    authors: [{ name: author }],
    keywords: article.seo_keyword || undefined,
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Orbit Gestão',
      locale: 'pt_BR',
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.published_at || undefined,
      authors: [author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: article.seo_canonical || url,
    },
  };
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function readTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getInitials(name: string | null): string {
  if (!name) return 'O';
  return name.split(' ').map((n) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Seleciona 3 artigos relacionados: mesma categoria primeiro, depois mais recentes
function getRelatedArticles(current: Article, count = 3): Article[] {
  const all = articles as Article[];
  const others = all.filter((a) => a.slug !== current.slug);
  const sameCategory = others.filter((a) => a.category && a.category === current.category);
  const sortByDate = (arr: Article[]) =>
    [...arr].sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime());

  const picked: Article[] = sortByDate(sameCategory).slice(0, count);
  if (picked.length < count) {
    const remaining = sortByDate(others.filter((a) => !picked.includes(a)));
    picked.push(...remaining.slice(0, count - picked.length));
  }
  return picked;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const categoryLabel = CATEGORIES[article.category || ''] || article.category || 'Artigo';
  const date = formatDate(article.published_at);
  const mins = readTime(article.content);
  const initials = getInitials(article.author);
  const author = article.author || 'Equipe Orbit';
  const seoUrl = article.seo_canonical || `https://orbitgestao.com.br/blog/${article.slug}`;
  const seoImage = article.seo_og_image || article.cover_url || '/images/og-image.png';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.seo_title || article.title,
    description: article.excerpt || article.content.replace(/<[^>]*>/g, '').slice(0, 160),
    image: seoImage,
    author: { '@type': 'Person', name: author },
    publisher: {
      '@type': 'Organization',
      name: 'Orbit Gestão',
      logo: { '@type': 'ImageObject', url: 'https://orbitgestao.com.br/images/logo-orbit-white.png' },
    },
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    mainEntityOfPage: { '@type': 'WebPage', '@id': seoUrl },
    wordCount: article.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    articleSection: categoryLabel,
    inLanguage: 'pt-BR',
    ...(article.seo_keyword ? { keywords: article.seo_keyword } : {}),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://orbitgestao.com.br/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: seoUrl },
    ],
  };

  const related = getRelatedArticles(article, 3);
  const relatedHTML = related.length > 0 ? `
    <section class="blog-related" aria-label="Artigos relacionados">
      <div class="blog-related__head">
        <h2><i class="fas fa-newspaper"></i> Continue lendo</h2>
        <a href="/blog" class="blog-related__see-all">Ver todos <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="blog-related__grid">
        ${related.map((r) => {
          const rCat = CATEGORIES[r.category || ''] || r.category || 'Artigo';
          const rImg = r.cover_url || '/images/og-image.png';
          const rDate = formatDate(r.published_at);
          const rIso = r.published_at || '';
          const rMins = readTime(r.content);
          return `<a href="/blog/${escapeHtml(r.slug)}" class="blog-related__card" role="article">
            <div class="blog-related__img"><img src="${escapeHtml(rImg)}" alt="${escapeHtml(r.title)}" loading="lazy" width="400" height="220"></div>
            <div class="blog-related__body">
              <span class="blog-related__tag">${escapeHtml(rCat)}</span>
              <h3>${escapeHtml(r.title)}</h3>
              <div class="blog-related__meta">
                <time datetime="${escapeHtml(rIso)}">${rDate}</time>
                <span>&middot;</span>
                <span><i class="fas fa-clock"></i> ${rMins} min</span>
              </div>
            </div>
          </a>`;
        }).join('')}
      </div>
    </section>
    <style>
      .blog-related { max-width: 1100px; margin: 56px auto 24px; padding: 0 20px; }
      .blog-related__head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; flex-wrap: wrap; }
      .blog-related__head h2 { display: flex; align-items: center; gap: 10px; color: #0D1117; font-size: 1.5rem; font-weight: 800; margin: 0; letter-spacing: -0.01em; }
      .blog-related__head h2 i { color: #ffba1a; font-size: 1.1rem; }
      .blog-related__see-all { display: inline-flex; align-items: center; gap: 6px; color: #ffba1a; font-size: 14px; font-weight: 700; text-decoration: none; }
      .blog-related__see-all:hover { color: #ff8c00; }
      .blog-related__see-all i { font-size: 11px; transition: transform 0.2s; }
      .blog-related__see-all:hover i { transform: translateX(3px); }
      .blog-related__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
      @media (max-width: 900px) { .blog-related__grid { grid-template-columns: 1fr; } }
      .blog-related__card { display: flex; flex-direction: column; background: #fff; border: 1px solid #E5E7EB; border-radius: 16px; overflow: hidden; text-decoration: none; color: inherit; transition: all 0.25s; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
      .blog-related__card:hover { transform: translateY(-3px); border-color: #ffba1a; box-shadow: 0 14px 30px rgba(0,0,0,0.10); }
      .blog-related__img { aspect-ratio: 16/9; overflow: hidden; background: #F3F4F6; }
      .blog-related__img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
      .blog-related__card:hover .blog-related__img img { transform: scale(1.04); }
      .blog-related__body { padding: 18px 18px 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
      .blog-related__tag { display: inline-block; align-self: flex-start; padding: 4px 10px; background: rgba(255,186,26,0.12); border: 1px solid rgba(255,186,26,0.30); border-radius: 50px; color: #b87a00; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
      .blog-related__body h3 { color: #0D1117; font-size: 1rem; font-weight: 700; line-height: 1.35; margin: 0; letter-spacing: -0.01em; }
      .blog-related__meta { display: flex; align-items: center; gap: 8px; color: #6B7280; font-size: 12px; margin-top: auto; }
      .blog-related__meta i { font-size: 10px; }
    </style>
  ` : '';

  const articleHTML = `
    ${headerHTML}
    <div class="blog-article" style="padding-top:100px;">
      <a href="/blog" class="blog-article__back"><i class="fas fa-arrow-left"></i> Voltar ao Blog</a>
      <div class="blog-article__layout">
        <article class="blog-article__main">
          ${article.cover_url ? `<img class="blog-article__cover" src="${article.cover_url}" alt="${article.title}" width="1200" height="630" loading="eager">` : ''}
          <span class="blog-article__category">${categoryLabel}</span>
          <h1 class="blog-article__title">${article.title}</h1>
          <div class="blog-article__meta">
            <div class="blog-article__meta-author">
              ${article.author_avatar
                ? `<img src="${article.author_avatar}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;" alt="${author}">`
                : `<div class="blog-card__avatar">${initials}</div>`}
              <span>${author}</span>
            </div>
            <span><i class="fas fa-calendar-alt"></i> ${date}</span>
            <span><i class="fas fa-clock"></i> ${mins} min de leitura</span>
          </div>
          <div class="blog-article-content">${article.content}</div>
          ${relatedHTML}
          <div class="blog-article__bottom-cta">
            <a href="/blog" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Voltar ao Blog</a>
          </div>
        </article>
        <aside class="blog-article__sidebar">
          <div class="blog-article__sidebar-sticky">
            <div class="blog-sidebar-card">
              <p class="blog-sidebar-card__label">Escrito por</p>
              <div class="blog-sidebar-card__author">
                ${article.author_avatar
                  ? `<img src="${article.author_avatar}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;" alt="${author}">`
                  : `<div class="blog-card__avatar blog-card__avatar--lg">${initials}</div>`}
                <div>
                  <p class="blog-sidebar-card__name">${author}</p>
                  <p class="blog-sidebar-card__role">Equipe Orbit</p>
                </div>
              </div>
            </div>
            <div class="blog-sidebar-cta">
              <div class="blog-sidebar-cta__icon"><i class="fas fa-robot"></i></div>
              <h3>Conheça o Time de IA</h3>
              <p>Dezenas de agentes especializados que operam a gestão da sua empresa 24/7.</p>
              <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary" style="width:100%;text-align:center;">Agendar demonstração</a>
            </div>
            <div class="blog-sidebar-card">
              <p class="blog-sidebar-card__label">Compartilhar</p>
              <div class="blog-sidebar-share">
                <a href="https://www.instagram.com/orbitgestao/" target="_blank" class="blog-share-btn blog-share-btn--instagram" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <button class="blog-share-btn blog-share-btn--copy" onclick="navigator.clipboard.writeText(location.href)" aria-label="Copiar link"><i class="fas fa-link"></i></button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    ${footerHTML}
  `;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div dangerouslySetInnerHTML={{ __html: articleHTML }} />
    </>
  );
}
