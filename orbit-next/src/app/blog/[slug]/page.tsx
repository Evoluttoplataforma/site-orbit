import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import articles from '@/data/articles.json';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';
import BlogComments from '@/components/blog/BlogComments';

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

// Extrai pares pergunta/resposta de uma seção FAQ no fim do artigo.
// 1) Itera todos os <h2> do artigo
// 2) Acha o ULTIMO h2 cujo texto contem "Perguntas", "FAQ", "Dúvidas", "Frequentes"
// 3) Captura H3+P seguintes ate o proximo h2 (ou ate o fim)
const FAQ_HEADING_RE = /(perguntas|faq|d[úu]vidas|frequentes)/i;
function extractFaqs(html: string): { q: string; a: string }[] {
  if (!html) return [];

  // Acha todos h2 com posicao e texto
  const h2Re = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
  const h2s: { end: number; text: string }[] = [];
  let hm: RegExpExecArray | null;
  while ((hm = h2Re.exec(html)) !== null) {
    h2s.push({ end: hm.index + hm[0].length, text: hm[1].replace(/<[^>]+>/g, '') });
  }

  // Filtra h2s com keywords de FAQ (pega o ULTIMO — geralmente a secao final)
  const faqH2s = h2s.filter((h) => FAQ_HEADING_RE.test(h.text));
  if (faqH2s.length === 0) return [];
  const startIdx = faqH2s[faqH2s.length - 1].end;

  // Acha proximo h2 apos a secao FAQ pra delimitar o fim
  const nextH2 = h2s.find((h) => h.end > startIdx + 1);
  const endIdx = nextH2 ? html.indexOf('<h2', startIdx + 1) : html.length;
  const faqArea = html.slice(startIdx, endIdx);

  const pairs: { q: string; a: string }[] = [];
  const pairRe = /<h3[^>]*>([\s\S]*?)<\/h3>\s*(?:<p[^>]*>([\s\S]*?)<\/p>|<div[^>]*>([\s\S]*?)<\/div>)/gi;
  let m: RegExpExecArray | null;
  while ((m = pairRe.exec(faqArea)) !== null) {
    const q = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const a = (m[2] || m[3] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (q && a && q.length < 250 && a.length >= 20) pairs.push({ q, a });
    if (pairs.length >= 30) break;
  }
  return pairs;
}

// Seleciona artigos relacionados via SCORING de similaridade (não só "mais recentes").
// Score = palavras significativas em comum no slug/titulo + boost de mesma categoria.
// Stop-words PT removidas pra evitar match falso em "de/da/do/para/empresa/como".
const STOPWORDS_PT = new Set([
  'a','o','e','de','da','do','das','dos','em','na','no','nas','nos','para','por','com','sem','sob','sobre',
  'que','qual','quais','quem','quando','como','onde','porque','pois','mas','ou','se','sim','nao','não',
  'um','uma','uns','umas','os','as','seu','sua','seus','suas','sao','são','foi','tem','ja','já','ele','ela',
  'isso','este','esta','isto','esse','essa','aquele','aquela','aquilo','tudo','nada','muito','pouco',
  'empresa','empresas','negocio','negocios','negócio','negócios',
]);

function tokenize(s: string): Set<string> {
  return new Set(
    s.toLowerCase()
      .replace(/[^a-zà-ú0-9\s-]/gi, ' ')
      .replace(/-/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !STOPWORDS_PT.has(w))
  );
}

function similarityScore(a: Article, b: Article): number {
  const tA = tokenize((a.slug || '') + ' ' + (a.title || ''));
  const tB = tokenize((b.slug || '') + ' ' + (b.title || ''));
  let overlap = 0;
  for (const t of tA) if (tB.has(t)) overlap++;
  const sameCategory = a.category && a.category === b.category ? 2 : 0;
  return overlap * 3 + sameCategory;
}

function getRelatedArticles(current: Article, count = 3): Article[] {
  const all = articles as Article[];
  const scored = all
    .filter((a) => a.slug !== current.slug)
    .map((a) => ({ art: a, score: similarityScore(current, a) }))
    // Desempate por data desc pra preferir recentes em caso de score igual
    .sort((x, y) => {
      if (y.score !== x.score) return y.score - x.score;
      return new Date(y.art.published_at || '').getTime() - new Date(x.art.published_at || '').getTime();
    });
  return scored.slice(0, count).map((s) => s.art);
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

  // FAQPage schema — gerado automaticamente quando o artigo tem secao
  // "Perguntas frequentes" ou similar com pares <h3>+<p>. Google mostra
  // rich snippets de Q&A direto na SERP.
  const faqs = extractFaqs(article.content);
  const faqJsonLd = faqs.length >= 2 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

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
          const rExcerpt = (r.excerpt || r.content.replace(/<[^>]*>/g, '').slice(0, 110) + '...').slice(0, 140);
          return `<a href="/blog/${escapeHtml(r.slug)}" class="blog-related__card" role="article">
            <div class="blog-related__img"><img src="${escapeHtml(rImg)}" alt="${escapeHtml(r.title)}" loading="lazy" width="600" height="338"></div>
            <div class="blog-related__body">
              <span class="blog-related__tag">${escapeHtml(rCat)}</span>
              <h3>${escapeHtml(r.title)}</h3>
              <p class="blog-related__excerpt">${escapeHtml(rExcerpt)}</p>
              <div class="blog-related__meta">
                <time datetime="${escapeHtml(rIso)}">${rDate}</time>
                <span class="blog-related__sep">&middot;</span>
                <span><i class="fas fa-clock"></i> ${rMins} min</span>
                <span class="blog-related__arrow">Ler <i class="fas fa-arrow-right"></i></span>
              </div>
            </div>
          </a>`;
        }).join('')}
      </div>
    </section>
    <style>
      .blog-related { margin: 72px 0 40px; padding: 0; }
      .blog-related__head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 28px; padding-bottom: 18px; border-bottom: 2px solid #F3F4F6; flex-wrap: wrap; }
      .blog-related__head h2 { display: flex; align-items: center; gap: 12px; color: #0D1117; font-size: clamp(1.4rem, 2.5vw, 1.7rem); font-weight: 800; margin: 0; letter-spacing: -0.02em; }
      .blog-related__head h2 i { color: #ffba1a; font-size: 1.2rem; }
      .blog-related__see-all { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(255,186,26,0.10); border: 1px solid rgba(255,186,26,0.25); border-radius: 50px; color: #b87a00; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; }
      .blog-related__see-all:hover { background: #ffba1a; color: #0D1117; }
      .blog-related__see-all i { font-size: 11px; transition: transform 0.2s; }
      .blog-related__see-all:hover i { transform: translateX(3px); }
      .blog-related__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
      @media (max-width: 900px) { .blog-related__grid { grid-template-columns: 1fr; gap: 20px; } }
      .blog-related__card { display: flex; flex-direction: column; background: #fff; border: 1px solid #E5E7EB; border-radius: 18px; overflow: hidden; text-decoration: none; color: inherit; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
      .blog-related__card:hover { transform: translateY(-6px); border-color: rgba(255,186,26,0.5); box-shadow: 0 20px 40px rgba(255,186,26,0.10), 0 8px 16px rgba(0,0,0,0.06); }
      .blog-related__img { aspect-ratio: 16/9; overflow: hidden; background: #0D1117; }
      .blog-related__img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s; }
      .blog-related__card:hover .blog-related__img img { transform: scale(1.05); }
      .blog-related__body { padding: 24px 24px 22px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
      .blog-related__tag { display: inline-block; align-self: flex-start; padding: 5px 12px; background: rgba(255,186,26,0.12); border: 1px solid rgba(255,186,26,0.30); border-radius: 50px; color: #b87a00; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; }
      .blog-related__body h3 { color: #0D1117; font-size: 1.08rem; font-weight: 700; line-height: 1.3; margin: 0; letter-spacing: -0.01em; }
      .blog-related__excerpt { color: #4B5563; font-size: 0.92rem; line-height: 1.55; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      .blog-related__meta { display: flex; align-items: center; gap: 8px; color: #6B7280; font-size: 12px; margin-top: auto; padding-top: 12px; border-top: 1px solid #F3F4F6; }
      .blog-related__sep { color: #D1D5DB; }
      .blog-related__meta i { font-size: 10px; }
      .blog-related__arrow { margin-left: auto; color: #ffba1a; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; transition: transform 0.2s; }
      .blog-related__card:hover .blog-related__arrow { transform: translateX(4px); }
      .blog-related__arrow i { font-size: 10px; }
      @media (max-width: 600px) {
        .blog-related { padding: 0 16px; margin: 48px auto 24px; }
        .blog-related__head { margin-bottom: 20px; }
        .blog-related__body { padding: 20px 20px 18px; }
        .blog-related__body h3 { font-size: 1rem; }
      }
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
      ${relatedHTML}
    </div>
  `;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <div dangerouslySetInnerHTML={{ __html: articleHTML }} />
      <BlogComments slug={article.slug} />
      <div dangerouslySetInnerHTML={{ __html: footerHTML }} />
    </>
  );
}
