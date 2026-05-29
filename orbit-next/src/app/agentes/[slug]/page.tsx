import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AGENTES, AGENTES_INDEX, Agente } from '@/data/agentes';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const BASE = 'https://orbitgestao.com.br';
const OG_FALLBACK = '/images/og-image.png'; // TODO: gerar OG dedicada por agente (1200x630) em /public/og/agente-{slug}.jpg
const DEMO_URL = 'https://demonstracao.orbitgestao.com.br/chat';

function esc(s: string): string {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function generateStaticParams() {
  return AGENTES_INDEX.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = AGENTES[slug];
  if (!a) return { title: 'Agente não encontrado' };
  const url = `${BASE}/agentes/${slug}`;
  return {
    title: a.metaTitle,
    description: a.metaDesc,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', title: a.metaTitle, description: a.metaDesc, url, locale: 'pt_BR',
      images: [{ url: OG_FALLBACK, width: 1200, height: 630, alt: a.nome }],
    },
    twitter: { card: 'summary_large_image', title: a.metaTitle, description: a.metaDesc, images: [OG_FALLBACK] },
  };
}

function renderHTML(a: Agente): string {
  const outros = AGENTES_INDEX.filter((x) => x.slug !== a.slug);

  return `
    ${headerHTML}

    <!-- BREADCRUMB -->
    <section class="lp-section" style="background:#0D1117;padding:100px 0 0;">
      <div class="container">
        <nav aria-label="Breadcrumb" style="font-size:14px;color:#8B949E;">
          <a href="/" style="color:#8B949E;text-decoration:none;">Início</a> ›
          <a href="/agentes-de-ia" style="color:#8B949E;text-decoration:none;">Agentes de IA</a> ›
          <span style="color:#fff;">${esc(a.nome)}</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="lp-hero" id="hero" style="min-height:auto;padding:48px 0 100px;">
      <div class="lp-hero__glow lp-hero__glow--1"></div>
      <div class="lp-hero__glow lp-hero__glow--2"></div>
      <div class="container">
        <span class="hero-zoom__badge" data-reveal>
          <i class="${a.fa}" style="margin-right:8px;"></i>Time Olívia · ${esc(a.pill)}
        </span>
        <h1 class="hero-zoom__title" data-reveal style="margin-top:20px;">
          ${esc(a.h1)} <span class="hero-zoom__title-highlight">${esc(a.h1Highlight)}</span>
        </h1>
        <p class="hero-zoom__subtitle" data-reveal>${esc(a.sub)}</p>
        <div class="hero-zoom__ctas" data-reveal style="margin-top:40px;">
          <a href="${DEMO_URL}" class="btn btn-primary btn-lg hero-cta-glow">VER O ${esc(a.nome).toUpperCase()} EM AÇÃO</a>
          <a href="#capacidades" class="btn btn-ghost btn-lg">Conhecer as capacidades <i class="fas fa-arrow-down"></i></a>
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- CAPACIDADES -->
    <section class="lp-section lp-section--dark" id="capacidades">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Capacidades</span>
          <h2>O que o ${esc(a.nome)} <span class="highlight">faz</span></h2>
          <p>Capacidades que o agente executa por padrão, sem você precisar configurar do zero.</p>
        </div>
        <div class="agents-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin-top:48px;">
          ${a.capacidades.map((c) => `
            <article class="agent-card">
              <div class="agent-card__icon"><i class="${c.fa}"></i></div>
              <h3>${esc(c.titulo)}</h3>
              <p>${esc(c.desc)}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- INTEGRAÇÕES -->
    <section class="lp-section lp-section--dark">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Integrações no Time Olívia</span>
          <h2>Como o ${esc(a.nome)} <span class="highlight">opera com os outros agentes</span></h2>
          <p>A Olívia conecta os agentes — o evento de uma área dispara ações nas outras automaticamente.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-top:48px;">
          ${a.integracoes.map((i) => `
            <article class="agent-card">
              <div style="font-size:11px;color:#ffba1a;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">${esc(i.par)}</div>
              <h3>${esc(i.caso)}</h3>
              <p>${esc(i.desc)}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- CASOS DE USO -->
    <section class="lp-section lp-section--dark">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Onde entrega mais valor</span>
          <h2>3 cenários onde o ${esc(a.nome)} <span class="highlight">faz diferença</span></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px;margin-top:56px;">
          ${a.casos.map((c, i) => `
            <article style="text-align:left;">
              <div style="font-size:4rem;font-weight:800;color:#ffba1a;line-height:1;margin-bottom:18px;">0${i + 1}</div>
              <h3 style="font-size:1.3rem;font-weight:700;color:#fff;margin:0 0 14px;line-height:1.3;">${esc(c.titulo)}</h3>
              <p style="color:#C9D1D9;line-height:1.65;margin:0;">${esc(c.desc)}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- FAQ -->
    <section class="faq-section section--light" id="faq">
      <div class="container">
        <div class="section-header" data-reveal>
          <h2>Perguntas frequentes sobre o ${esc(a.nome)}</h2>
        </div>
        <div class="faq-list">
          ${a.faqs.map((f) => `
            <details class="faq-item">
              <summary>${esc(f.q)}</summary>
              <div class="faq-item__answer"><p>${esc(f.a)}</p></div>
            </details>`).join('')}
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- BLOG RELACIONADO -->
    <section class="lp-section lp-section--dark">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Leitura recomendada</span>
          <h2>Conteúdos relacionados ao <span class="highlight">${esc(a.nome)}</span></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:40px;">
          ${a.blog.map((b) => `
            <a href="/blog/${esc(b.slug)}" class="agent-card" style="text-decoration:none;display:block;">
              <div style="font-size:11px;color:#ffba1a;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">Blog · ${esc(b.cat)}</div>
              <h3>${esc(b.title)}</h3>
            </a>`).join('')}
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- OUTROS AGENTES -->
    <section class="lp-section lp-section--dark">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Time Olívia</span>
          <h2>Os outros agentes do <span class="highlight">time</span></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-top:40px;">
          ${outros.map((o) => `
            <a href="/agentes/${esc(o.slug)}" class="agent-card" style="text-decoration:none;display:block;text-align:center;padding:24px 16px;">
              <i class="${o.fa}" style="font-size:1.8rem;color:#ffba1a;margin-bottom:12px;display:block;"></i>
              <div style="font-weight:700;font-size:0.95rem;color:#fff;">${esc(o.nome)}</div>
            </a>`).join('')}
        </div>
        <div style="text-align:center;margin-top:40px;" data-reveal>
          <a href="/agentes-de-ia" style="color:#ffba1a;font-weight:700;text-decoration:none;">
            Veja o time completo na visão geral <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="lp-cta-final" id="contato-form">
      <div class="lp-cta-final__glow"></div>
      <div class="container">
        <h2 data-reveal>Quer ver o <span class="text-gold">${esc(a.nome)}</span> operando na sua empresa?</h2>
        <p data-reveal>Demonstração de 30 minutos. Mostramos o ${esc(a.nome)} aplicado ao cenário real do seu negócio.</p>
        <div data-reveal>
          <a href="${DEMO_URL}" class="btn-gold">AGENDAR DEMONSTRAÇÃO</a>
        </div>
        <div class="lp-cta-final__stats" data-reveal>
          <div class="lp-cta-final__stat"><strong>30 min</strong><span>de duração</span></div>
          <div class="lp-cta-final__stat"><strong>Sem cartão</strong><span>100% gratuito</span></div>
          <div class="lp-cta-final__stat"><strong>Roadmap incluído</strong><span>aplicável ao seu negócio</span></div>
        </div>
      </div>
    </section>

    ${footerHTML}
  `;
}

export default async function AgentePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AGENTES[slug];
  if (!a) notFound();
  const url = `${BASE}/agentes/${slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: a.nome, alternateName: a.alternateNames, description: a.metaDesc,
    provider: {
      '@type': 'Organization', name: 'Orbit Gestão', url: BASE,
      sameAs: ['https://www.linkedin.com/company/orbit-gestao', 'https://www.instagram.com/orbitgestao'],
    },
    serviceType: `AI Operating System for Business — ${a.pill}`,
    areaServed: { '@type': 'Country', name: 'Brasil' },
    audience: { '@type': 'BusinessAudience', audienceType: 'Empresas B2B brasileiras' },
    category: 'Business Software with AI Agents', url,
    isRelatedTo: [{ '@type': 'Service', name: 'Olívia — IA Coordenadora', url: `${BASE}/agentes-de-ia` }],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: a.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Agentes de IA', item: `${BASE}/agentes-de-ia` },
      { '@type': 'ListItem', position: 3, name: a.nome, item: url },
    ],
  };

  return (
    <main style={{ width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div dangerouslySetInnerHTML={{ __html: renderHTML(a) }} />
    </main>
  );
}
