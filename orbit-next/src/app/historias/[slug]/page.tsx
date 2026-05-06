import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import stories from '@/data/stories.json';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

interface Story {
  id: number;
  slug: string;
  title: string | null;
  subtitle: string | null;
  company_name: string;
  segment: string | null;
  contact_name: string | null;
  contact_role: string | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  testimonial: string | null;
  logo_url: string | null;
  cover_url: string | null;
  published_at: string | null;
  updated_at: string | null;
}

const SEGMENTS: Record<string, string> = {
  industria: 'Indústria',
  servicos: 'Serviços',
  tecnologia: 'Tecnologia',
  saude: 'Saúde',
  educacao: 'Educação',
  varejo: 'Varejo',
  financeiro: 'Financeiro',
  agronegocio: 'Agronegócio',
  outro: 'Outro',
};

function getStory(slug: string): Story | undefined {
  return (stories as Story[]).find((s) => s.slug === slug);
}

function escapeHtml(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getInitials(name: string | null | undefined): string {
  if (!name) return 'O';
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function generateStaticParams() {
  return (stories as Story[]).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: 'História não encontrada' };

  const headline = story.title || `${story.company_name}: História de Sucesso`;
  const title = `${headline} | Histórias Orbit Gestão`;
  const description = story.subtitle || (story.challenge || '').slice(0, 160);
  const image = story.cover_url || story.logo_url || '/images/og-image.png';
  const url = `https://orbitgestao.com.br/historias/${story.slug}`;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Orbit Gestão',
      locale: 'pt_BR',
      images: [{ url: image, width: 1200, height: 630, alt: headline }],
      publishedTime: story.published_at || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const segLabel = SEGMENTS[story.segment || ''] || story.segment || 'História de Sucesso';
  const headline = story.title || story.company_name;
  const initials = getInitials(story.company_name);
  const seoUrl = `https://orbitgestao.com.br/historias/${story.slug}`;
  const seoImage = story.cover_url || story.logo_url || '/images/og-image.png';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Histórias', item: 'https://orbitgestao.com.br/historias' },
      { '@type': 'ListItem', position: 3, name: headline, item: seoUrl },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: story.subtitle || (story.challenge || '').slice(0, 160),
    image: seoImage,
    author: { '@type': 'Organization', name: story.company_name },
    publisher: {
      '@type': 'Organization',
      name: 'Orbit Gestão',
      logo: { '@type': 'ImageObject', url: 'https://orbitgestao.com.br/images/logo-orbit-white.png' },
    },
    datePublished: story.published_at,
    dateModified: story.updated_at || story.published_at,
    mainEntityOfPage: { '@type': 'WebPage', '@id': seoUrl },
    inLanguage: 'pt-BR',
  };

  const heroLogo = story.logo_url
    ? `<img src="${story.logo_url}" alt="${escapeHtml(story.company_name)}" style="max-width:140px;max-height:80px;object-fit:contain;display:block;margin:0 auto 24px;" loading="eager">`
    : `<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,186,26,0.15);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;"><span style="color:#ffba1a;font-weight:800;font-size:1.5rem;">${initials}</span></div>`;

  const subtitleHTML = story.subtitle
    ? `<p style="font-size:1.15rem;line-height:1.6;color:#8B949E;max-width:720px;margin:24px auto 0;text-align:center;">${escapeHtml(story.subtitle)}</p>`
    : '';

  const contactLine =
    story.contact_name || story.contact_role
      ? `<p style="margin-top:32px;font-size:0.95rem;color:#8B949E;text-align:center;">${escapeHtml(story.contact_name)}${story.contact_role ? ' — ' + escapeHtml(story.contact_role) : ''}</p>`
      : '';

  const breadcrumbHTML = `
    <nav style="max-width:920px;margin:32px auto 0;padding:0 24px;font-size:0.9rem;color:#8B949E;" aria-label="Breadcrumb">
      <a href="/" style="color:#8B949E;text-decoration:none;">Home</a>
      <span style="margin:0 8px;">/</span>
      <a href="/historias" style="color:#8B949E;text-decoration:none;">Histórias</a>
      <span style="margin:0 8px;">/</span>
      <span style="color:#fff;">${escapeHtml(story.company_name)}</span>
    </nav>`;

  const articleHTML = `
    ${headerHTML}
    <div class="blog-article" style="padding-top:100px;">
      <a href="/historias" class="blog-article__back"><i class="fas fa-arrow-left"></i> Voltar às Histórias</a>

      <header style="max-width:920px;margin:48px auto 0;padding:0 24px;text-align:center;">
        ${heroLogo}
        <h1 style="font-size:clamp(2rem,4.5vw,3.2rem);line-height:1.15;font-weight:800;color:#fff;margin:0;letter-spacing:-0.02em;">${escapeHtml(headline)}</h1>
        ${segLabel ? `<div style="margin-top:20px;"><span style="display:inline-block;padding:8px 18px;border-radius:999px;background:rgba(255,186,26,0.12);color:#ffba1a;font-size:0.85rem;font-weight:600;border:1px solid rgba(255,186,26,0.3);">${escapeHtml(segLabel)}</span></div>` : ''}
        ${subtitleHTML}
        ${contactLine}
      </header>

      ${breadcrumbHTML}

      <div class="blog-article__layout" style="margin-top:48px;">
        <article class="blog-article__main">
          <div class="blog-article-content">
            ${story.challenge ? `<h2 style="color:#ffba1a;"><i class="fas fa-triangle-exclamation" style="margin-right:8px;"></i>O Desafio</h2><p>${escapeHtml(story.challenge)}</p>` : ''}
            ${story.solution ? `<h2 style="color:#ffba1a;"><i class="fas fa-lightbulb" style="margin-right:8px;"></i>A Solução</h2><p>${escapeHtml(story.solution)}</p>` : ''}
            ${story.results ? `<h2 style="color:#22C55E;"><i class="fas fa-chart-line" style="margin-right:8px;"></i>Os Resultados</h2><p>${escapeHtml(story.results)}</p>` : ''}
            ${story.testimonial ? `<blockquote style="border-left:3px solid #ffba1a;padding:16px 20px;margin:32px 0;background:rgba(255,186,26,0.05);border-radius:0 12px 12px 0;"><p style="font-style:italic;line-height:1.8;font-size:1.1rem;">"${escapeHtml(story.testimonial)}"</p><footer style="margin-top:12px;font-size:0.9rem;color:#8B949E;">— ${escapeHtml(story.contact_name)}${story.contact_role ? ', ' + escapeHtml(story.contact_role) : ''}${story.company_name ? ' na ' + escapeHtml(story.company_name) : ''}</footer></blockquote>` : ''}
          </div>

          <div class="blog-article__bottom-cta">
            <a href="/historias" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Voltar às Histórias</a>
            <a href="/historias/enviar" class="btn btn-primary" style="margin-left:12px;"><i class="fas fa-pen"></i> Conte sua história</a>
          </div>
        </article>

        <aside class="blog-article__sidebar">
          <div class="blog-article__sidebar-sticky">
            <div class="blog-sidebar-card">
              <p class="blog-sidebar-card__label">Empresa</p>
              <div class="blog-sidebar-card__author">
                ${story.logo_url
                  ? `<img src="${story.logo_url}" style="width:48px;height:48px;border-radius:12px;object-fit:cover;" alt="${escapeHtml(story.company_name)}">`
                  : `<div class="blog-card__avatar blog-card__avatar--lg">${initials}</div>`}
                <div>
                  <p class="blog-sidebar-card__name">${escapeHtml(story.company_name)}</p>
                  <p class="blog-sidebar-card__role">${escapeHtml(segLabel)}</p>
                </div>
              </div>
            </div>
            <div class="blog-sidebar-cta">
              <div class="blog-sidebar-cta__icon"><i class="fas fa-star"></i></div>
              <h3>Sua empresa também pode ser destaque</h3>
              <p>Compartilhe sua experiência com a Orbit e inspire outros empresários.</p>
              <a href="/historias/enviar" class="btn btn-primary" style="width:100%;text-align:center;">Contar minha história</a>
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
