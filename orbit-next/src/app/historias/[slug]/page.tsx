import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import stories from '@/data/stories.json';
import storiesEn from '@/data/stories-en.json';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';
import { i18nText, i18nEl } from '@/lib/i18n-html';

interface Story {
  id: number;
  slug: string;
  title: string | null;
  subtitle: string | null;
  company_name: string;
  segment: string | null;
  contact_name: string | null;
  contact_role: string | null;
  contact_photo?: string | null;
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
  empresa: 'Empresa',
  consultoria: 'Consultoria',
  servicos: 'Consultoria',
  industria: 'Indústria',
  tecnologia: 'Tecnologia',
  saude: 'Saúde',
  educacao: 'Educação',
  varejo: 'Varejo',
  financeiro: 'Financeiro',
  agronegocio: 'Agronegócio',
  outro: 'Outro',
};

const SEGMENTS_EN: Record<string, string> = {
  empresa: 'Company',
  consultoria: 'Consulting',
  servicos: 'Consulting',
  industria: 'Industry',
  tecnologia: 'Technology',
  saude: 'Healthcare',
  educacao: 'Education',
  varejo: 'Retail',
  financeiro: 'Finance',
  agronegocio: 'Agribusiness',
  outro: 'Other',
};

type StoryEn = {
  title?: string;
  subtitle?: string;
  contact_role?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  testimonial?: string;
};

const STORIES_EN = storiesEn as Record<string, StoryEn>;

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

function nl2br(str: string | null | undefined): string {
  return escapeHtml(str).replace(/\n/g, '<br>');
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

  const en = STORIES_EN[story.slug] || {};
  const segLabel = SEGMENTS[story.segment || ''] || story.segment || 'História de Sucesso';
  const segLabelEn = SEGMENTS_EN[story.segment || ''] || segLabel;
  const headline = story.title || story.company_name;
  const headlineEn = en.title || headline;
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

  const contactPhoto = (story as any).contact_photo || null;
  const heroLogo = contactPhoto
    ? `<img src="${escapeHtml(contactPhoto)}" alt="${escapeHtml(story.contact_name || '')}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;object-position:center top;display:block;margin:0 auto 24px;border:3px solid rgba(255,186,26,0.4);" loading="eager">`
    : story.logo_url
      ? `<img src="${story.logo_url}" alt="${escapeHtml(story.company_name)}" style="max-width:140px;max-height:80px;object-fit:contain;display:block;margin:0 auto 24px;" loading="eager">`
      : `<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,186,26,0.15);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;"><span style="color:#ffba1a;font-weight:800;font-size:1.5rem;">${initials}</span></div>`;

  const subtitleHTML = story.subtitle
    ? i18nEl('p', escapeHtml(story.subtitle), en.subtitle ? escapeHtml(en.subtitle) : undefined, 'style="font-size:1.15rem;line-height:1.6;color:#5A6069;max-width:720px;margin:24px auto 0;text-align:center;"')
    : '';

  const contactLine = '';

  const breadcrumbHTML = `
    <nav style="max-width:920px;margin:32px auto 0;padding:0 24px;font-size:0.9rem;color:#6B7280;" aria-label="Breadcrumb">
      <a href="/" style="color:#6B7280;text-decoration:none;">Home</a>
      <span style="margin:0 8px;">/</span>
      <a href="/historias" style="color:#6B7280;text-decoration:none;">${i18nText('Histórias', 'Stories')}</a>
      <span style="margin:0 8px;">/</span>
      <span style="color:#1A1D23;">${escapeHtml(story.company_name)}</span>
    </nav>`;

  const articleHTML = `
    ${headerHTML}
    <div class="blog-article" style="padding-top:100px;">
      <a href="/historias" class="blog-article__back"><i class="fas fa-arrow-left"></i> ${i18nText('Voltar às Histórias', 'Back to Stories')}</a>

      <header style="max-width:920px;margin:48px auto 0;padding:0 24px;text-align:center;">
        ${heroLogo}
        ${i18nEl('h1', escapeHtml(headline), escapeHtml(headlineEn), 'style="font-size:clamp(2rem,4.5vw,3.2rem);line-height:1.15;font-weight:800;color:#1A1D23;margin:0;letter-spacing:-0.02em;"')}
        ${segLabel ? `<div style="margin-top:20px;"><span style="display:inline-block;padding:8px 18px;border-radius:999px;background:rgba(255,186,26,0.12);color:#b8860b;font-size:0.85rem;font-weight:600;border:1px solid rgba(255,186,26,0.4);">${i18nText(escapeHtml(segLabel), escapeHtml(segLabelEn))}</span></div>` : ''}
        ${subtitleHTML}
        ${contactLine}
      </header>

      ${breadcrumbHTML}

      <div class="blog-article__layout" style="margin-top:48px;">
        <article class="blog-article__main">
          <div class="blog-article-content">
            ${story.challenge ? `<h2 style="color:#ffba1a;"><i class="fas fa-triangle-exclamation" style="margin-right:8px;"></i>${i18nText('O Desafio', 'The Challenge')}</h2>${i18nEl('p', nl2br(story.challenge), en.challenge ? nl2br(en.challenge) : undefined)}` : ''}
            ${story.solution ? `<h2 style="color:#ffba1a;"><i class="fas fa-lightbulb" style="margin-right:8px;"></i>${i18nText('A Solução', 'The Solution')}</h2>${i18nEl('p', nl2br(story.solution), en.solution ? nl2br(en.solution) : undefined)}` : ''}
            ${story.results ? `<h2 style="color:#22C55E;"><i class="fas fa-chart-line" style="margin-right:8px;"></i>${i18nText('Os Resultados', 'The Results')}</h2>${i18nEl('p', nl2br(story.results), en.results ? nl2br(en.results) : undefined)}` : ''}
            ${story.testimonial ? `<blockquote style="border-left:3px solid #ffba1a;padding:16px 20px;margin:32px 0;background:rgba(255,186,26,0.05);border-radius:0 12px 12px 0;">${i18nEl('p', '“' + escapeHtml(story.testimonial.replace(/^[“”"]+/, '').replace(/[”"”]+$/, '')) + '”', en.testimonial ? '“' + escapeHtml(en.testimonial.replace(/^[“”"]+/, '').replace(/[”"”]+$/, '')) + '”' : undefined, 'style="font-style:italic;line-height:1.8;font-size:1.1rem;"')}<footer style="margin-top:16px;font-size:0.9rem;color:#8B949E;">— ${escapeHtml(story.contact_name)}${story.contact_role ? ', ' + i18nText(escapeHtml(story.contact_role), escapeHtml(en.contact_role || story.contact_role)) : ''}</footer></blockquote>` : ''}
          </div>

          <div class="blog-article__bottom-cta">
            <a href="/historias" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> ${i18nText('Voltar às Histórias', 'Back to Stories')}</a>
            <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary" style="margin-left:12px;"><i class="fas fa-rocket"></i> ${i18nText('Agende uma demonstração', 'Book a demo')}</a>
          </div>
        </article>

        <aside class="blog-article__sidebar">
          <div class="blog-article__sidebar-sticky">
            <div class="blog-sidebar-card">
              <p class="blog-sidebar-card__label">${i18nText(escapeHtml(segLabel), escapeHtml(segLabelEn))}</p>
              <div class="blog-sidebar-card__author">
                ${contactPhoto
                  ? `<img src="${escapeHtml(contactPhoto)}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;object-position:center top;" alt="${escapeHtml(story.contact_name || '')}">`
                  : story.logo_url
                    ? `<img src="${story.logo_url}" style="width:48px;height:48px;border-radius:12px;object-fit:cover;" alt="${escapeHtml(story.company_name)}">`
                    : ''}
                <div>
                  <p class="blog-sidebar-card__name">${escapeHtml(story.contact_name || '')}</p>
                  <p style="font-size:0.85rem;color:#6B7280;margin:2px 0 0;">${escapeHtml(story.company_name)}</p>
                </div>
              </div>
            </div>
            <div class="blog-sidebar-cta">
              <div class="blog-sidebar-cta__icon"><i class="fas fa-rocket"></i></div>
              ${i18nEl('h3', 'Quer transformar a gestão da sua empresa?', 'Want to transform your company\'s management?')}
              ${i18nEl('p', 'Agende uma demonstração e veja como a Orbit pode ajudar você a alcançar os mesmos resultados.', 'Book a demo and see how Orbit can help you reach the same results.')}
              <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary" style="width:100%;text-align:center;">${i18nText('Agende uma demonstração', 'Book a demo')}</a>
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
