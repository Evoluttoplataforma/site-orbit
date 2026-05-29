// ═══════════════════════════════════════════════════════════════
// Template HTML compartilhado por /agentes/[slug] e /modulos/[slug].
// Usa classes do orbit.css (mesmo padrão das LPs /empresarios).
// Hero com bg-image, big numbers, depoimentos, alternância dark/light.
// ═══════════════════════════════════════════════════════════════

import { Item, AGENTES_INDEX, MODULOS_INDEX } from './agentes';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';
import { getMockup } from './agentes-mockups';
import articles from './articles.json';

interface BlogArticle {
  title: string;
  slug: string;
  cover_url: string | null;
  category: string | null;
}
const ARTICLES_BY_SLUG: Record<string, BlogArticle> = Object.fromEntries(
  (articles as BlogArticle[]).map((a) => [a.slug, a])
);
const CAT_LABELS: Record<string, string> = {
  estrategica: 'Gestão Estratégica', processos: 'Processos', indicadores: 'Indicadores',
  lideranca: 'Liderança', ia: 'IA & Inovação', novidades: 'Novidades', marketing: 'Marketing',
  'planejamento-estrategico': 'Planejamento',
};

const DEMO_URL = 'https://demonstracao.orbitgestao.com.br/chat';
const HERO_BG = '/images/hero-bg.avif';

function esc(s: string): string {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function renderItemHTML(a: Item): string {
  // Outros itens do mesmo tipo (cross-link) + items do tipo oposto (rodapé)
  const proprios = a.tipo === 'agentes' ? AGENTES_INDEX : MODULOS_INDEX;
  const outros = proprios.filter((x) => x.slug !== a.slug);
  const oposto = a.tipo === 'agentes' ? MODULOS_INDEX : AGENTES_INDEX;
  const opostoTipo = a.tipo === 'agentes' ? 'modulos' : 'agentes';
  const opostoLabel = a.tipo === 'agentes' ? '4 módulos integrados' : '12 agentes do Time Olívia';
  const pillarBack = `<a href="/agentes-de-ia" style="color:#ffba1a;font-weight:700;text-decoration:none;">Veja o time completo na visão geral <i class="fas fa-arrow-right"></i></a>`;

  return `
    ${headerHTML}

    <!-- HERO com background image + mockup contextual -->
    <section class="lp-hero" id="hero" style="min-height:auto;padding:140px 0 100px;position:relative;overflow:hidden;">
      <div class="lp-hero__bg-image" style="position:absolute;inset:0;z-index:0;opacity:0.18;">
        <img src="${HERO_BG}" alt="" width="1920" height="1072" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="lp-hero__glow lp-hero__glow--1"></div>
      <div class="lp-hero__glow lp-hero__glow--2"></div>
      <div class="container" style="position:relative;z-index:1;">
        <div class="agent-hero-grid">
          <div>
            <span class="hero-zoom__badge" data-reveal>
              <i class="${a.fa}" style="margin-right:8px;"></i>${esc(a.pill)}
            </span>
            <h1 class="hero-zoom__title" data-reveal style="margin-top:20px;text-align:left;">
              ${esc(a.h1)} <span class="hero-zoom__title-highlight">${esc(a.h1Highlight)}</span>
            </h1>
            <p class="hero-zoom__subtitle" data-reveal style="text-align:left;margin-left:0;">${esc(a.sub)}</p>
            <div class="hero-zoom__ctas" data-reveal style="margin-top:36px;justify-content:flex-start;">
              <a href="${DEMO_URL}" class="btn btn-primary btn-lg hero-cta-glow">VER EM AÇÃO</a>
              <a href="#capacidades" class="btn btn-ghost btn-lg">Capacidades <i class="fas fa-arrow-down"></i></a>
            </div>
            <div class="hero-zoom__credentials" data-reveal style="margin-top:40px;justify-content:flex-start;">
              <div class="hero-zoom__credential"><strong>30 anos</strong><span>metodologia GSN</span></div>
              <div class="hero-zoom__credential-divider"></div>
              <div class="hero-zoom__credential"><strong>8.000+</strong><span>empresas</span></div>
              <div class="hero-zoom__credential-divider"></div>
              <div class="hero-zoom__credential"><strong>+2.900</strong><span>no Orbit</span></div>
            </div>
          </div>
          <div class="agent-hero-mockup" data-reveal>
            ${getMockup(a.slug)}
          </div>
        </div>
      </div>
    </section>
    <style>
      .agent-hero-grid { display:grid; grid-template-columns: 1fr 1.05fr; gap:48px; align-items:center; }
      .agent-hero-mockup { width:100%; max-width:560px; justify-self:end; }
      @media (max-width: 980px) {
        .agent-hero-grid { grid-template-columns: 1fr; gap:40px; }
        .agent-hero-mockup { justify-self:center; max-width:520px; }
        .agent-hero-grid h1, .agent-hero-grid p, .agent-hero-grid .hero-zoom__ctas, .agent-hero-grid .hero-zoom__credentials { text-align:center !important; justify-content:center !important; }
        .agent-hero-grid .hero-zoom__subtitle { margin-left:auto !important; margin-right:auto !important; }
      }
    </style>

    <hr class="glow-divider">

    <!-- CAPACIDADES (dark) -->
    <section class="lp-section lp-section--dark" id="capacidades">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Capacidades</span>
          <h2>O que o ${esc(a.nome)} <span class="highlight">faz</span></h2>
          <p>Capacidades que ${a.tipo === 'agentes' ? 'o agente' : 'o módulo'} executa por padrão, sem você precisar configurar do zero.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin-top:48px;">
          ${a.capacidades.map((c) => `
            <article class="agent-card">
              <div class="agent-card__icon"><i class="${c.fa}"></i></div>
              <h3>${esc(c.titulo)}</h3>
              <p>${esc(c.desc)}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>

    ${a.integracoes ? `
    <hr class="glow-divider">

    <!-- INTEGRAÇÕES (dark — só agentes) -->
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
    </section>` : ''}

    <hr class="glow-divider">

    <!-- CASOS DE USO (dark) -->
    <section class="lp-section lp-section--dark">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Onde entrega mais valor</span>
          <h2>3 cenários onde o ${esc(a.nome)} <span class="highlight">faz diferença</span></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px;margin-top:56px;">
          ${a.casos.map((c, i) => `
            <article style="text-align:left;">
              <div style="font-size:5rem;font-weight:800;color:#ffba1a;line-height:1;margin-bottom:18px;">0${i + 1}</div>
              <h3 style="font-size:1.3rem;font-weight:700;color:#fff;margin:0 0 14px;line-height:1.3;">${esc(c.titulo)}</h3>
              <p style="color:#C9D1D9;line-height:1.65;margin:0;">${esc(c.desc)}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- DEPOIMENTOS EM VÍDEO (mesma da home) -->
    <section class="depo-section" style="padding:80px 20px;background:linear-gradient(180deg,#0D1117 0%,#161B22 100%);position:relative;overflow:hidden;">
      <div class="container" style="text-align:center;margin-bottom:48px;">
        <span class="section-badge" style="display:inline-block;padding:6px 14px;background:rgba(255,186,26,0.10);border:1px solid rgba(255,186,26,0.25);border-radius:50px;color:#ffba1a;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px;">Quem já usa</span>
        <h2 style="font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;color:#fff;line-height:1.15;letter-spacing:-0.02em;margin:0 0 14px;">Empresários que viram o <span style="color:#ffba1a;">Orbit transformar</span> a operação</h2>
        <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.6;max-width:680px;margin:0 auto;">Quatro consultorias brasileiras contam, em primeira pessoa, o que mudou depois de implantar a Orbit.</p>
      </div>
      <div class="depo-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-width:1200px;margin:0 auto;">
        <div class="depo-card">
          <div class="depo-card__video"><iframe src="https://player.vimeo.com/video/1194123078?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
          <div class="depo-card__info"><h3>Lucineia Pedrosa</h3><p>Econtech Consultoria</p></div>
        </div>
        <div class="depo-card">
          <div class="depo-card__video"><iframe src="https://player.vimeo.com/video/1194124564?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
          <div class="depo-card__info"><h3>Hygor Limar</h3><p>Potencialize Resultados</p></div>
        </div>
        <div class="depo-card">
          <div class="depo-card__video"><iframe src="https://player.vimeo.com/video/1194125389?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
          <div class="depo-card__info"><h3>Bruno Lozano</h3><p>Ritual de Gestão</p></div>
        </div>
        <div class="depo-card">
          <div class="depo-card__video"><iframe src="https://player.vimeo.com/video/1194126879?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
          <div class="depo-card__info"><h3>Rogério Menossi</h3><p>Time Produtivo</p></div>
        </div>
      </div>
      <div style="text-align:center;margin-top:36px;">
        <a href="/historias" style="display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:rgba(255,186,26,0.10);border:1px solid rgba(255,186,26,0.30);color:#ffba1a;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;transition:all 0.2s;">Ver todas as histórias de clientes <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </section>

    <!-- FAQ (light section continua) -->
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

    <!-- BLOG RELACIONADO — knowledge-card com imagem (mesmo padrão da home) -->
    <section class="knowledge-section section--light">
      <div class="container">
        <div class="section-header" data-reveal>
          <h2>Amplie seus <span class="highlight">conhecimentos sobre ${esc(a.nome)}</span></h2>
          <p style="color:var(--gray-400);margin-top:8px;font-size:0.95rem;">Artigos recentes selecionados pelo time editorial</p>
        </div>
        <div class="knowledge-grid">
          ${a.blog.slice(0, 3).map((b) => {
            const real = ARTICLES_BY_SLUG[b.slug];
            const cover = real?.cover_url || 'https://placehold.co/400x250/0D1117/ffba1a?text=Orbit+Blog';
            const title = real?.title || b.title;
            const cat = (real?.category && CAT_LABELS[real.category]) || b.cat;
            return `
            <a href="/blog/${esc(b.slug)}" class="knowledge-card" style="text-decoration:none;color:inherit;display:block;">
              <div class="knowledge-card__image">
                <img src="${esc(cover)}" alt="${esc(title)}" width="400" height="250" loading="lazy" decoding="async">
                <span class="knowledge-card__type"><i class="fas fa-file-alt"></i> ${esc(cat)}</span>
              </div>
              <div class="knowledge-card__body">
                <h4>${esc(title)}</h4>
                <span class="knowledge-card__link">Ler artigo</span>
              </div>
            </a>`;
          }).join('')}
        </div>
        <div style="text-align:center;margin-top:36px;">
          <a href="/blog" class="btn btn-dark btn-lg">Ver todos os artigos</a>
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- OUTROS DO MESMO TIPO (dark) -->
    <section class="lp-section lp-section--dark">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">${a.tipo === 'agentes' ? 'Time Olívia' : 'Módulos Orbit'}</span>
          <h2>${a.tipo === 'agentes' ? 'Os outros agentes do' : 'Os outros'} <span class="highlight">${a.tipo === 'agentes' ? 'time' : 'módulos'}</span></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-top:40px;">
          ${outros.map((o) => `
            <a href="/${a.tipo}/${esc(o.slug)}" class="agent-card" style="text-decoration:none;display:block;text-align:center;padding:28px 16px;">
              <i class="${o.fa}" style="font-size:1.8rem;color:#ffba1a;margin-bottom:12px;display:block;"></i>
              <div style="font-weight:700;font-size:0.95rem;color:#fff;">${esc(o.nome)}</div>
            </a>`).join('')}
        </div>
        <div style="text-align:center;margin-top:40px;" data-reveal>${pillarBack}</div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- CROSS-TIPO (dark, mais discreto) -->
    <section class="lp-section lp-section--dark" style="padding:60px 0 80px;">
      <div class="container">
        <div data-reveal style="text-align:center;margin-bottom:32px;">
          <span class="lp-badge lp-badge--gold">${a.tipo === 'agentes' ? 'Módulos integrados' : 'Agentes coordenadores'}</span>
          <h2 style="font-size:1.5rem;margin-top:14px;">${esc(opostoLabel)}</h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;">
          ${oposto.map((o) => `
            <a href="/${opostoTipo}/${esc(o.slug)}" class="agent-card" style="text-decoration:none;display:block;text-align:center;padding:18px 12px;">
              <i class="${o.fa}" style="font-size:1.4rem;color:#ffba1a;margin-bottom:8px;display:block;"></i>
              <div style="font-weight:700;font-size:0.85rem;color:#fff;">${esc(o.nome)}</div>
            </a>`).join('')}
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="lp-cta-final" id="contato-form">
      <div class="lp-cta-final__glow"></div>
      <div class="container">
        <h2 data-reveal>Quer ver o <span class="text-gold">${esc(a.nome)}</span> operando na sua empresa?</h2>
        <p data-reveal>Demonstração de 30 minutos. Mostramos ${a.tipo === 'agentes' ? 'o agente' : 'o módulo'} aplicado ao cenário real do seu negócio.</p>
        <div data-reveal>
          <a href="${DEMO_URL}" class="btn-gold">AGENDAR DEMONSTRAÇÃO</a>
        </div>
        <div class="lp-cta-final__stats" data-reveal>
          <div class="lp-cta-final__stat"><strong>30 anos</strong><span>de metodologia GSN</span></div>
          <div class="lp-cta-final__stat"><strong>8.000+</strong><span>empresas</span></div>
          <div class="lp-cta-final__stat"><strong>+2.900</strong><span>no Orbit</span></div>
        </div>
      </div>
    </section>

    ${footerHTML}
  `;
}

export function buildSchemas(a: Item) {
  const BASE = 'https://orbitgestao.com.br';
  const url = `${BASE}/${a.tipo}/${a.slug}`;
  return {
    service: {
      '@context': 'https://schema.org', '@type': 'Service',
      name: a.nome, alternateName: a.alternateNames, description: a.metaDesc,
      provider: { '@type': 'Organization', name: 'Orbit Gestão', url: BASE, sameAs: ['https://www.linkedin.com/company/orbit-gestao', 'https://www.instagram.com/orbitgestao'] },
      serviceType: `AI Operating System for Business — ${a.pill}`,
      areaServed: { '@type': 'Country', name: 'Brasil' },
      audience: { '@type': 'BusinessAudience', audienceType: 'Empresas B2B brasileiras' },
      category: 'Business Software with AI Agents', url,
      isRelatedTo: [{ '@type': 'Service', name: 'Olívia — IA Coordenadora', url: `${BASE}/agentes-de-ia` }],
    },
    faq: {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: a.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    breadcrumb: {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Agentes de IA', item: `${BASE}/agentes-de-ia` },
        { '@type': 'ListItem', position: 3, name: a.nome, item: url },
      ],
    },
  };
}
