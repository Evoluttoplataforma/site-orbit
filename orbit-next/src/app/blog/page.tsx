import { Metadata } from 'next';
import articles from '@/data/articles.json';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

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
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
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
  const sorted = [...(articles as Article[])].sort(
    (a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime()
  );

  const cardsHTML = sorted
    .map((a, i) => {
      const catLabel = CATEGORIES[a.category || ''] || a.category || 'Artigo';
      const preview = a.excerpt || truncate(a.content, 140);
      const date = formatDate(a.published_at);
      const mins = readTime(a.content);
      const initials = getInitials(a.author);
      const imgSrc = a.cover_url || '/images/og-image.png';

      return `<a href="/blog/${escapeHtml(a.slug)}" class="blog-card blog-card--animate" style="animation-delay:${i * 80}ms;text-decoration:none;color:inherit;display:block;">
        <div class="blog-card__image">
          <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(a.title)}" loading="lazy" width="600" height="340">
          <span class="blog-card__tag">${escapeHtml(catLabel)}</span>
        </div>
        <div class="blog-card__body">
          <h3>${escapeHtml(a.title)}</h3>
          <p>${escapeHtml(preview)}</p>
          <div class="blog-card__footer">
            <div class="blog-card__author">
              ${a.author_avatar
                ? `<img src="${escapeHtml(a.author_avatar)}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0;" alt="">`
                : `<div class="blog-card__avatar">${initials}</div>`}
              <div class="blog-card__author-info">
                <span class="blog-card__author-name">${escapeHtml(a.author || 'Equipe Orbit')}</span>
                <span class="blog-card__date">${date}</span>
              </div>
            </div>
            <span class="blog-card__read-time"><i class="fas fa-clock"></i> ${mins} min</span>
          </div>
        </div>
      </a>`;
    })
    .join('');

  const blogListJSON = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Orbit Gestão',
    description: 'Artigos sobre gestão estratégica com inteligência artificial.',
    url: 'https://orbitgestao.com.br/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Orbit Gestão',
      logo: { '@type': 'ImageObject', url: 'https://orbitgestao.com.br/images/logo-orbit-white.png' },
    },
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
      <div class="blog-grid">${cardsHTML}</div>
    </section>
    <section class="site-cta">
      <div class="site-cta__particles"><span></span><span></span><span></span><span></span></div>
      <div class="container">
        <div class="site-cta__card">
          <div class="site-cta__icon"><i class="fas fa-rocket"></i></div>
          <h2>Pronto para transformar sua gestão?</h2>
          <p>Conheça o time de IA que executa a estratégia da sua empresa.</p>
          <div class="site-cta__buttons">
            <a href="/chat" class="btn btn-primary btn-lg">Conhecer o Time de IA</a>
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
