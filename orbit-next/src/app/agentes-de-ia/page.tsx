import { Metadata } from 'next';
import { AGENTES_INDEX } from '@/data/agentes';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const BASE = 'https://orbitgestao.com.br';
const URL = `${BASE}/agentes-de-ia`;
const OG = '/images/og-image.png'; // TODO: gerar OG pillar dedicada em /public/og/agentes-de-ia.jpg
const DEMO_URL = 'https://demonstracao.orbitgestao.com.br/chat';

const META_TITLE = 'Time Olívia: 10 agentes de IA que operam sua gestão | Orbit';
const META_DESC = 'Conheça os 10 agentes de IA da Orbit, coordenados pela Olívia. Estratégia, financeiro, comercial, processos, pessoas — cada área tem um especialista digital.';

const FAQS = [
  { q: 'O que é um agente de IA na Orbit?', a: 'Um agente de IA na Orbit é uma camada de inteligência artificial especializada em uma área específica do negócio (financeiro, comercial, processos, etc.). Diferente de chatbot, o agente opera continuamente dentro da plataforma, mantém memória organizacional, executa tarefas sob política da empresa e aprende com a operação real do seu negócio.' },
  { q: 'Quantos agentes a Orbit tem?', a: 'A Orbit tem 10 agentes especialistas — Estratégico, Financeiro, Comercial, Processos, Pessoas, R&S, Projetos, Reuniões, Documentos e Riscos — coordenados pela Olívia, a IA central. Juntos, cobrem 18 módulos funcionais da plataforma.' },
  { q: 'Os agentes substituem minha equipe?', a: 'Não. Os agentes operam o trabalho repetitivo e analítico — preparam decisões, executam tarefas operacionais, geram análises, monitoram indicadores. Sua equipe humana lidera, decide estratégico, conduz negociações, cuida de cultura. Os dois juntos performam mais do que qualquer um isoladamente.' },
  { q: 'Como os agentes operam entre si?', a: 'Pela Olívia. Quando um evento acontece em uma área (venda fechada, processo concluído, candidato aprovado), a Olívia informa os outros agentes relevantes. Isso elimina o trabalho manual de "comunicar áreas" que consome 30-40% do tempo administrativo em empresas com sistemas fragmentados.' },
  { q: 'Quanto tempo até produtividade plena?', a: 'Tipicamente 1–3 meses, dependendo da maturidade dos seus processos. Os agentes começam a entregar valor desde a primeira semana, mas atingem desempenho ótimo quando acumulam 60–90 dias de operação real da sua empresa específica.' },
  { q: 'Como começo a usar?', a: 'Agendando uma demonstração de 30 minutos. Mostramos os agentes operando com cenário real do seu negócio. Você sai com diagnóstico aplicável e estimativa específica de impacto na operação.' },
];

const BLOG_PILLAR = [
  { title: 'AI Operating System for Business: a próxima geração de software de gestão', slug: 'ai-operating-system-business', cat: 'IA' },
  { title: 'IA agentic para CEO e diretoria: apoio à decisão estratégica',                slug: 'ia-agentic-para-ceo-decisao-estrategica', cat: 'IA' },
  { title: 'Orbit vs SAP, Salesforce e Microsoft Dynamics: comparação prática',           slug: 'orbit-vs-sap-salesforce-microsoft', cat: 'IA' },
  { title: 'Plataforma de gestão com IA agentic: alternativa à consultoria',              slug: 'plataforma-gestao-ia-agentic-alternativa-consultoria', cat: 'IA' },
  { title: 'Gestão com IA: como o Orbit muda a administração de PMEs',                    slug: 'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas', cat: 'IA' },
  { title: 'ERP integrado vs plataforma all-in-one: como escolher em 2026',               slug: 'erp-vs-plataforma-all-in-one', cat: 'IA' },
];

function esc(s: string): string {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const metadata: Metadata = {
  title: META_TITLE, description: META_DESC, alternates: { canonical: URL },
  openGraph: { type: 'website', title: META_TITLE, description: META_DESC, url: URL, locale: 'pt_BR', images: [{ url: OG, width: 1200, height: 630, alt: 'Time Olívia — 10 agentes de IA da Orbit' }] },
  twitter: { card: 'summary_large_image', title: META_TITLE, description: META_DESC, images: [OG] },
};

export default function AgentesPillarPage() {
  const cards = AGENTES_INDEX.map((a) => `
    <a href="/agentes/${esc(a.slug)}" class="agent-card" style="text-decoration:none;display:block;">
      <div class="agent-card__icon"><i class="${a.fa}"></i></div>
      <h3>${esc(a.nome)}</h3>
      <p>${esc(a.descCurta)}</p>
      <span style="display:inline-flex;align-items:center;gap:6px;color:#ffba1a;font-weight:700;font-size:0.9rem;margin-top:12px;">
        Ver agente <i class="fas fa-arrow-right"></i>
      </span>
    </a>`).join('');

  const blogCards = BLOG_PILLAR.map((b) => `
    <a href="/blog/${esc(b.slug)}" class="agent-card" style="text-decoration:none;display:block;">
      <div style="font-size:11px;color:#ffba1a;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">Blog · ${esc(b.cat)}</div>
      <h3>${esc(b.title)}</h3>
    </a>`).join('');

  const faqHtml = FAQS.map((f) => `
    <details class="faq-item">
      <summary>${esc(f.q)}</summary>
      <div class="faq-item__answer"><p>${esc(f.a)}</p></div>
    </details>`).join('');

  const pageHTML = `
    ${headerHTML}

    <!-- BREADCRUMB -->
    <section class="lp-section" style="background:#0D1117;padding:100px 0 0;">
      <div class="container">
        <nav aria-label="Breadcrumb" style="font-size:14px;color:#8B949E;">
          <a href="/" style="color:#8B949E;text-decoration:none;">Início</a> ›
          <span style="color:#fff;">Agentes de IA</span>
        </nav>
      </div>
    </section>

    <!-- HERO -->
    <section class="lp-hero" id="hero" style="min-height:auto;padding:48px 0 100px;">
      <div class="lp-hero__glow lp-hero__glow--1"></div>
      <div class="lp-hero__glow lp-hero__glow--2"></div>
      <div class="container">
        <span class="hero-zoom__badge" data-reveal>
          <i class="fa-solid fa-wand-magic-sparkles" style="margin-right:8px;"></i>O Time Olívia
        </span>
        <h1 class="hero-zoom__title" data-reveal style="margin-top:20px;">
          10 agentes de IA especialistas <span class="hero-zoom__title-highlight">que operam a sua gestão 24/7.</span>
        </h1>
        <p class="hero-zoom__subtitle" data-reveal>A Olívia é a IA coordenadora central da Orbit. Por trás dela, 10 agentes especialistas cuidam de cada área da sua empresa — estratégia, financeiro, comercial, processos, pessoas, recrutamento, projetos, reuniões, documentos e riscos. <strong style="color:#fff;">Você decide. Eles executam.</strong></p>
        <div class="hero-zoom__ctas" data-reveal style="margin-top:40px;">
          <a href="${DEMO_URL}" class="btn btn-primary btn-lg hero-cta-glow">CONHECER OS 10 AGENTES EM DEMO</a>
          <a href="#agentes" class="btn btn-ghost btn-lg">Ver agente por agente <i class="fas fa-arrow-down"></i></a>
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- INTRO -->
    <section class="lp-section lp-section--dark">
      <div class="container" style="max-width:900px;">
        <p data-reveal style="color:#C9D1D9;font-size:1.15rem;line-height:1.75;margin:0 0 18px;">
          A Orbit é uma plataforma brasileira de gestão empresarial construída sobre uma nova categoria de software: o <strong style="color:#fff;">AI Operating System for Business</strong>. Em vez de um único sistema genérico que tenta cobrir tudo, a Orbit reúne 10 agentes de IA — cada um especialista em sua área — coordenados por uma IA central, a Olívia.
        </p>
        <p data-reveal style="color:#C9D1D9;font-size:1.15rem;line-height:1.75;margin:0;">
          Cada agente entende profundamente o seu domínio, opera em tempo real dentro da plataforma e aprende com a operação da sua empresa. A Olívia conecta os agentes entre si, mantém memória organizacional cumulativa e garante que decisões em uma área conversem com as outras.
        </p>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- GRID 10 AGENTES -->
    <section class="lp-section lp-section--dark" id="agentes">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Os 10 agentes</span>
          <h2>Cada área da sua empresa com <span class="highlight">um agente especialista</span></h2>
          <p>Clica em qualquer agente pra ver capacidades, integrações com os outros, casos de uso e perguntas frequentes.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;margin-top:48px;">${cards}</div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- POR QUE UM TIME DE AGENTES -->
    <section class="lp-section lp-section--dark">
      <div class="container" style="max-width:900px;">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Por que um time?</span>
          <h2>Por que dividir em <span class="highlight">10 agentes</span> em vez de um único assistente?</h2>
        </div>
        <div style="margin-top:36px;color:#C9D1D9;font-size:1.1rem;line-height:1.75;">
          <p data-reveal style="margin-bottom:18px;">Software de gestão tradicional foi pensado pra ser usado por humanos: você abre o sistema, navega menus, preenche campos, gera relatórios.</p>
          <p data-reveal style="margin-bottom:18px;">A nova geração de plataformas inverte essa lógica. Os agentes de IA fazem o trabalho operacional — você só decide.</p>
          <p data-reveal style="margin-bottom:18px;"><strong style="color:#fff;">Especialização.</strong> Cada agente entende profundamente sua área. O Agente Financeiro sabe contabilidade brasileira, ciclo de pagamento PIX e boleto, regimes tributários nacionais. O Agente Comercial entende funil B2B, qualificação BANT, métricas de pipeline.</p>
          <p data-reveal style="margin-bottom:18px;"><strong style="color:#fff;">Memória contextual.</strong> Cada agente acumula histórico da sua empresa especificamente. O Agente de R&amp;S lembra do perfil de candidatos contratados que deram certo. Em 12 meses, ele opera como um head de RH que conhece sua empresa há anos.</p>
          <p data-reveal style="margin-bottom:18px;"><strong style="color:#fff;">Coordenação pela Olívia.</strong> A Olívia mantém visão sistêmica. Venda fechada? Ela informa o Agente Financeiro pra preparar fatura, o Agente de Processos pra disparar onboarding, e o Agente de Documentos pra gerar contrato. Sem você coordenar manualmente.</p>
          <p data-reveal style="margin-bottom:18px;"><strong style="color:#fff;">Decisão humana protegida.</strong> Os agentes executam dentro de políticas que você define. Não tomam decisões críticas sem aprovação. Você lidera — eles trabalham junto com seu time humano, 24 horas por dia.</p>
          <p data-reveal style="margin-bottom:0;">É exatamente o que SAP, Salesforce e Microsoft estão construindo globalmente. Nós construímos pra realidade brasileira — sobre <strong style="color:#fff;">30 anos de metodologia consolidada do Grupo GSN</strong> (Templum &amp; Evolutto).</p>
        </div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- FAQ -->
    <section class="faq-section section--light" id="faq">
      <div class="container">
        <div class="section-header" data-reveal>
          <h2>Perguntas frequentes sobre o Time Olívia</h2>
        </div>
        <div class="faq-list">${faqHtml}</div>
      </div>
    </section>

    <hr class="glow-divider">

    <!-- BLOG RELACIONADO -->
    <section class="lp-section lp-section--dark">
      <div class="container">
        <div class="lp-header" data-reveal>
          <span class="lp-badge lp-badge--gold">Conteúdo estratégico</span>
          <h2>Sobre <span class="highlight">AI Operating System for Business</span></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:40px;">${blogCards}</div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="lp-cta-final" id="contato-form">
      <div class="lp-cta-final__glow"></div>
      <div class="container">
        <h2 data-reveal>Conheça o <span class="text-gold">Time Olívia</span> operando na sua empresa</h2>
        <p data-reveal>30 minutos. Mostramos os 10 agentes aplicados ao cenário real do seu negócio.</p>
        <div data-reveal>
          <a href="${DEMO_URL}" class="btn-gold">AGENDAR DEMONSTRAÇÃO</a>
        </div>
        <div class="lp-cta-final__stats" data-reveal>
          <div class="lp-cta-final__stat"><strong>30 anos</strong><span>de experiência</span></div>
          <div class="lp-cta-final__stat"><strong>8.000+</strong><span>empresas</span></div>
          <div class="lp-cta-final__stat"><strong>+2.900</strong><span>no Orbit</span></div>
        </div>
      </div>
    </section>

    ${footerHTML}
  `;

  const serviceSchema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: 'Time Olívia — 10 agentes de IA',
    alternateName: ['Agentes de IA Orbit', 'Time de Agentes de IA', 'AI Operating System Orbit'],
    description: META_DESC,
    provider: { '@type': 'Organization', name: 'Orbit Gestão', url: BASE, sameAs: ['https://www.linkedin.com/company/orbit-gestao', 'https://www.instagram.com/orbitgestao'] },
    serviceType: 'AI Operating System for Business',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    audience: { '@type': 'BusinessAudience', audienceType: 'Empresas B2B brasileiras' },
    category: 'Business Software with AI Agents',
    url: URL,
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Agentes especialistas',
      itemListElement: AGENTES_INDEX.map((a, i) => ({
        '@type': 'Offer', position: i + 1,
        itemOffered: { '@type': 'Service', name: a.nome, url: `${BASE}/agentes/${a.slug}` },
      })),
    },
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Agentes de IA', item: URL },
    ],
  };

  return (
    <main style={{ width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div dangerouslySetInnerHTML={{ __html: pageHTML }} />
    </main>
  );
}
