// ═══════════════════════════════════════════════════════════════
// Template HTML compartilhado por /agentes/[slug] e /modulos/[slug].
// Usa classes do orbit.css (mesmo padrão das LPs /empresarios).
// Hero com bg-image, big numbers, depoimentos, alternância dark/light.
// ═══════════════════════════════════════════════════════════════

import { Item, AGENTES_INDEX, MODULOS_INDEX } from './agentes';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const DEMO_URL = 'https://demonstracao.orbitgestao.com.br/chat';
const HERO_BG = '/images/hero-bg.avif';

function esc(s: string): string {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Depoimentos genéricos do site (mesmos da home)
const DEPOIMENTOS = [
  { quote: 'Em 3 meses, conseguimos mapear todos os processos críticos e reduzir retrabalho em 40%. O Orbit organizou o que a gente tentava há anos.', name: 'Maria Silva', role: 'Diretora de Operações, TechParts Ltda', av: 'MS' },
  { quote: 'O agente de treinamento via WhatsApp mudou o jogo. A equipe engaja porque não precisa logar em nada. Simples e direto.', name: 'Roberto Costa', role: 'CEO, Grupo Nordeste', av: 'RC' },
  { quote: 'Finalmente tenho KPIs em tempo real. Antes, descobria os problemas na semana seguinte. Agora, atuo no mesmo dia.', name: 'Ana Mendes', role: 'Gerente de Qualidade, FastLog', av: 'AM' },
];

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

    <!-- HERO com background image -->
    <section class="lp-hero" id="hero" style="min-height:auto;padding:140px 0 100px;position:relative;overflow:hidden;">
      <div class="lp-hero__bg-image" style="position:absolute;inset:0;z-index:0;opacity:0.18;">
        <img src="${HERO_BG}" alt="" width="1920" height="1072" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="lp-hero__glow lp-hero__glow--1"></div>
      <div class="lp-hero__glow lp-hero__glow--2"></div>
      <div class="container" style="position:relative;z-index:1;">
        <span class="hero-zoom__badge" data-reveal>
          <i class="${a.fa}" style="margin-right:8px;"></i>${esc(a.pill)}
        </span>
        <h1 class="hero-zoom__title" data-reveal style="margin-top:20px;">
          ${esc(a.h1)} <span class="hero-zoom__title-highlight">${esc(a.h1Highlight)}</span>
        </h1>
        <p class="hero-zoom__subtitle" data-reveal>${esc(a.sub)}</p>
        <div class="hero-zoom__ctas" data-reveal style="margin-top:40px;">
          <a href="${DEMO_URL}" class="btn btn-primary btn-lg hero-cta-glow">VER O ${esc(a.nome).toUpperCase()} EM AÇÃO</a>
          <a href="#capacidades" class="btn btn-ghost btn-lg">Conhecer as capacidades <i class="fas fa-arrow-down"></i></a>
        </div>
        <div class="hero-zoom__credentials" data-reveal style="margin-top:48px;">
          <div class="hero-zoom__credential"><strong>30 anos</strong><span>de metodologia GSN</span></div>
          <div class="hero-zoom__credential-divider"></div>
          <div class="hero-zoom__credential"><strong>8.000+</strong><span>empresas atendidas</span></div>
          <div class="hero-zoom__credential-divider"></div>
          <div class="hero-zoom__credential"><strong>+2.900</strong><span>no Orbit</span></div>
        </div>
      </div>
    </section>

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

    <!-- DEPOIMENTOS (light section) -->
    <section class="testi-section section--light">
      <div class="container">
        <div class="testi-header" data-reveal>
          <div class="testi-badge">Depoimentos</div>
          <h2>Quem usa, recomenda</h2>
          <p>Empresas brasileiras de médio porte transformando a gestão com o Orbit.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-top:48px;">
          ${DEPOIMENTOS.map((d) => `
            <div class="testi-card">
              <p class="testi-quote">"${esc(d.quote)}"</p>
              <div class="testi-author">
                <div class="testi-avatar">${esc(d.av)}</div>
                <div class="testi-info">
                  <div class="testi-name">${esc(d.name)}</div>
                  <div class="testi-role">${esc(d.role)}</div>
                </div>
              </div>
            </div>`).join('')}
        </div>
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

    <!-- BLOG RELACIONADO (dark) -->
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
