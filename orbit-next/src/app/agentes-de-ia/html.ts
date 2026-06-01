/**
 * Página Pillar /agentes-de-ia
 * Lista os 12 agentes + 4 módulos da plataforma, seguindo o design system §4.5
 * (wrapper .pg-dark + alternância dark/light + bloco de blog real).
 */

import articlesData from '@/data/articles.json';

type Article = { slug: string; title: string; category: string; cover_url: string | null };

const AGENTES: Array<{ slug: string; name: string; icon: string; desc: string }> = [
  { slug: 'estrategico', name: 'Estratégico', icon: 'fa-compass', desc: 'Missão, visão, SWOT, objetivos e plano de ação, execução semanal.' },
  { slug: 'processos', name: 'Processos', icon: 'fa-diagram-project', desc: 'BPMN, POPs e execução com SLA monitorado em tempo real.' },
  { slug: 'pessoas', name: 'Pessoas', icon: 'fa-users', desc: 'RH estratégico, PDI, organograma e cultura, multi-unidade.' },
  { slug: 'indicadores', name: 'Indicadores', icon: 'fa-chart-line', desc: 'KPIs em tempo real, drill-down e alertas inteligentes no celular.' },
  { slug: 'riscos', name: 'Riscos', icon: 'fa-shield-halved', desc: 'Matriz de risco, plano de ação e detecção emergente pela Olívia.' },
  { slug: 'treinamento', name: 'Treinamento', icon: 'fa-graduation-cap', desc: 'Trilhas formais, microlearning e aprendizagem aplicada ao processo.' },
  { slug: 'oportunidades', name: 'Oportunidades', icon: 'fa-lightbulb', desc: 'Captura, análise de viabilidade e priorização conectadas ao plano.' },
  { slug: 'documentos', name: 'Documentos', icon: 'fa-folder-tree', desc: 'Repositório, versionamento, assinatura digital e busca semântica.' },
  { slug: 'comercial', name: 'Comercial', icon: 'fa-code-branch', desc: 'CRM, pipeline, WhatsApp Business e insights de pipeline por IA.' },
  { slug: 'problemas-operacionais', name: 'Problemas Operacionais', icon: 'fa-triangle-exclamation', desc: 'RCA com 5 Porquês, Ishikawa e hipóteses geradas pela Olívia.' },
  { slug: 'reunioes', name: 'Reuniões', icon: 'fa-microphone-lines', desc: 'Pauta, transcrição PT-BR, extração de tarefas e ata automática.' },
  { slug: 'pesquisas', name: 'Pesquisas', icon: 'fa-clipboard-list', desc: 'Clima, eNPS, NPS e geração automática de plano de ação.' },
];

const MODULOS: Array<{ slug: string; name: string; icon: string; desc: string }> = [
  { slug: 'financeiro', name: 'Financeiro', icon: 'fa-building-columns', desc: 'Contas, fluxo de caixa projetado, DRE em tempo real e Open Finance.' },
  { slug: 'recrutamento-selecao', name: 'Recrutamento e Seleção', icon: 'fa-user-plus', desc: 'Vagas, triagem de CV por IA, scorecards e banco de talentos.' },
  { slug: 'projetos', name: 'Projetos', icon: 'fa-chart-gantt', desc: 'Gantt, dependências, portal do cliente e riscos antecipados.' },
  { slug: 'compras', name: 'Compras', icon: 'fa-bag-shopping', desc: 'Pedidos, RFQ multifornecedor, fornecedores e integração financeira.' },
];

// 6 artigos estratégicos do blog real
const RELATED_SLUGS = [
  'tirar-planejamento-estrategico-do-papel',
  'plano-de-acao-executavel',
  'indicadores-nao-refletem-realidade',
  'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas',
  'imersao-mentoria-consultoria-resultado',
  'erp-vs-plataforma-all-in-one',
];

const CATEGORY_LABEL: Record<string, string> = {
  estrategica: 'Gestão estratégica',
  indicadores: 'Indicadores',
  'planejamento-estrategico': 'Planejamento estratégico',
  ia: 'IA & Gestão',
};

const articles = articlesData as Article[];
const relatedBlog = RELATED_SLUGS.map(s => articles.find(a => a.slug === s)).filter((a): a is Article => Boolean(a));

const agenteCards = AGENTES.map(a => `
  <a href="/agentes/${a.slug}" class="agent-card" style="text-decoration:none;color:inherit;display:block;">
    <div class="agent-card__icon"><i class="fa-solid ${a.icon}"></i></div>
    <h3>${a.name}</h3>
    <p>${a.desc}</p>
  </a>`).join('');

const moduloCards = MODULOS.map(m => `
  <a href="/modulos/${m.slug}" class="agent-card" style="text-decoration:none;color:inherit;display:block;">
    <div class="agent-card__icon" style="background:linear-gradient(135deg,#ffba1a,#ffca4a);"><i class="fa-solid ${m.icon}"></i></div>
    <h3>${m.name}</h3>
    <p>${m.desc}</p>
  </a>`).join('');

const blogCards = relatedBlog.map(a => {
  const img = a.cover_url || '/images/og-image.png';
  const label = CATEGORY_LABEL[a.category] || a.category || 'Artigo';
  const t = a.title.replace(/"/g, '&quot;');
  return `
    <a href="/blog/${a.slug}" class="knowledge-card">
      <div class="knowledge-card__image">
        <img src="${img}" alt="${t}" width="400" height="250" loading="lazy">
        <span class="knowledge-card__type"><i class="fas fa-file-alt"></i> ${label}</span>
      </div>
      <div class="knowledge-card__body">
        <h4>${a.title}</h4>
        <span class="knowledge-card__link">Ler artigo</span>
      </div>
    </a>`;
}).join('');

export const pageHTML = `
<style>
  .pg-dark { background: #0D1117; color: #C9D1D9; }
  .pg-dark .section-dark { background: #0D1117; }
  .pg-dark .section-dark-soft { background: #161B22; }
  .pg-dark .section--light { color: var(--light-text); }
  .pg-dark .section--light h2,
  .pg-dark .section--light h3,
  .pg-dark .section--light h4 { color: var(--light-text); }
  .pg-dark .section--light p,
  .pg-dark .section--light li { color: var(--light-text-secondary); }
  /* Agent/Module cards dentro de section--light: bg branco + texto escuro
     (igual home, sobrescreve o default escuro da .agent-card) */
  .pg-dark .section--light .agent-card {
    background: #fff !important;
    border: 1px solid rgba(0,0,0,0.08) !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    transition: all 0.25s;
  }
  .pg-dark .section--light .agent-card:hover {
    border-color: rgba(255,186,26,0.45) !important;
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.10);
  }
  .pg-dark .section--light .agent-card h3 { color: #1A1D23 !important; }
  .pg-dark .section--light .agent-card p { color: #5A6069 !important; }
</style>

<div class="pg-dark">

<!-- §0 HERO -->
<section class="hero-zoom" id="hero">
  <div class="hero-zoom__bg-image"></div>
  <div class="hero-zoom__bg">
    <div class="hero-zoom__glow hero-zoom__glow--1"></div>
    <div class="hero-zoom__glow hero-zoom__glow--2"></div>
  </div>
  <div class="container">
    <div class="hero-zoom__header">
      <span class="hero-zoom__badge">Construído sobre 30 anos de metodologia GSN, agora operado por IA</span>
      <h1 class="hero-zoom__title">
        Time Olívia: <span class="hero-zoom__title-highlight">12 agentes de IA</span> que operam a sua gestão 24/7.
      </h1>
      <p class="hero-zoom__subtitle">A Olívia é a IA coordenadora central da Orbit. Por trás dela, <strong>12 agentes especialistas cuidam de cada área da sua empresa</strong>, coordenados, integrados e construídos sobre a metodologia consolidada do Grupo GSN. Você decide. Eles executam.</p>
      <div class="hero-zoom__ctas">
        <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary btn-lg hero-cta-glow">QUERO CONHECER O TIME DE IA</a>
        <a href="#agentes" class="btn btn-ghost btn-lg">Ver os 12 agentes <i class="fas fa-arrow-down"></i></a>
      </div>
      <p class="hero-zoom__note">⏱️ 2 min · 100% gratuito · Sem compromisso</p>
      <div class="hero-zoom__credentials">
        <div class="hero-zoom__credential"><strong>30 anos</strong><span>metodologia GSN</span></div>
        <div class="hero-zoom__credential-divider"></div>
        <div class="hero-zoom__credential"><strong>8.000+</strong><span>empresas atendidas</span></div>
        <div class="hero-zoom__credential-divider"></div>
        <div class="hero-zoom__credential"><strong>12 agentes</strong><span>operando 24/7</span></div>
      </div>
    </div>
  </div>
</section>

<hr class="glow-divider">

<!-- §1 OS 12 AGENTES (dark) -->
<section class="section-padded section-dark" id="agentes" style="padding:80px 0;">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-badge section-badge--gold">Time Olívia</span>
      <h2>Os 12 agentes que <span class="highlight">operam a sua gestão</span></h2>
      <p>Cada agente é especialista em uma área, coordenado pela Olívia, integrado aos outros e construído sobre 30 anos de metodologia GSN.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin-top:48px;">
      ${agenteCards}
    </div>
  </div>
</section>

<!-- §2 OS 4 MÓDULOS (light) -->
<section class="section--light section-padded" id="modulos" style="padding:80px 0;">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-badge section-badge--gold">Módulos da plataforma</span>
      <h2>Os 4 módulos que <span class="highlight">conectam tudo</span></h2>
      <p>Módulos operacionais que conversam nativamente com os agentes, Financeiro, R&S, Projetos e Compras.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin-top:48px;">
      ${moduloCards}
    </div>
  </div>
</section>

<!-- §3 VÍDEOS DE DEPOIMENTOS (dark) -->
<section class="depo-section" id="videos" style="padding:80px 20px;background:linear-gradient(180deg,#0D1117 0%,#161B22 100%);position:relative;overflow:hidden;">
  <div class="container" style="text-align:center;margin-bottom:48px;">
    <span class="section-badge section-badge--gold" style="margin-bottom:18px;">Quem já usa</span>
    <h2 style="color:#fff;line-height:1.15;letter-spacing:-0.02em;">Empresários que viram o <span class="highlight">Orbit transformar</span> a operação</h2>
    <p style="color:#C9D1D9;max-width:680px;margin:14px auto 0;">Quatro consultorias brasileiras contam o que mudou depois de implantar a Orbit.</p>
  </div>
  <div class="depo-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-width:1200px;margin:0 auto;">
    <div class="depo-card"><div class="depo-card__video"><iframe src="https://player.vimeo.com/video/1194123078?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div><div class="depo-card__info"><h3>Lucineia Pedrosa</h3><p>Econtech Consultoria</p></div></div>
    <div class="depo-card"><div class="depo-card__video"><iframe src="https://player.vimeo.com/video/1194124564?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div><div class="depo-card__info"><h3>Hygor Limar</h3><p>Potencialize Resultados</p></div></div>
    <div class="depo-card"><div class="depo-card__video"><iframe src="https://player.vimeo.com/video/1194125389?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div><div class="depo-card__info"><h3>Bruno Lozano</h3><p>Ritual de Gestão</p></div></div>
    <div class="depo-card"><div class="depo-card__video"><iframe src="https://player.vimeo.com/video/1194126879?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div><div class="depo-card__info"><h3>Rogério Menossi</h3><p>Time Produtivo</p></div></div>
  </div>
  <div style="text-align:center;margin-top:36px;">
    <a href="/historias" style="display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:rgba(255,186,26,0.10);border:1px solid rgba(255,186,26,0.30);color:#ffba1a;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;">Ver todas as histórias <i class="fa-solid fa-arrow-right"></i></a>
  </div>
  <style>
    .depo-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; overflow:hidden; transition:all 0.25s; }
    .depo-card:hover { border-color:rgba(255,186,26,0.45); transform:translateY(-3px); box-shadow:0 12px 28px rgba(0,0,0,0.40); }
    .depo-card__video { aspect-ratio:9/16; width:100%; background:#000; display:block; }
    .depo-card__video iframe { width:100%; height:100%; border:0; display:block; }
    .depo-card__info { padding:14px 16px 16px; border-top:1px solid rgba(255,255,255,0.08); }
    .depo-card__info h3 { color:#fff; font-size:0.95rem; font-weight:700; margin:0 0 3px; letter-spacing:-0.005em; }
    .depo-card__info p { color:#ffba1a; font-size:12px; font-weight:600; margin:0; letter-spacing:0.3px; }
    @media (max-width:1024px) { .depo-grid { grid-template-columns:repeat(2,1fr) !important; } }
    @media (max-width:560px) { .depo-grid { grid-template-columns:1fr !important; max-width:340px; } }
  </style>
</section>

<!-- §4 CONTEÚDO BLOG (light) -->
<section class="knowledge-section section--light" id="conteudo">
  <div class="container">
    <div class="section-header" data-reveal>
      <h2>Amplie seus <span class="highlight">conhecimentos</span></h2>
      <p style="margin-top:8px;font-size:0.95rem;">Artigos recentes do nosso blog sobre gestão com IA e os agentes</p>
    </div>
    <div class="knowledge-grid">
      ${blogCards}
    </div>
    <div style="text-align:center;margin-top:36px;">
      <a href="/blog" class="btn btn-dark btn-lg">Ver todos os artigos</a>
    </div>
  </div>
</section>

<!-- §5 CTA FINAL (dark) -->
<section class="cta-section section-dark" style="padding:100px 0;text-align:center;">
  <div class="container">
    <div class="section-header" data-reveal style="max-width:760px;margin:0 auto;">
      <span class="hero-zoom__badge">Conheça o time de IA</span>
      <h2>Sua gestão operada por IA começa em <span class="highlight">2 minutos</span>.</h2>
      <p>Converse com a Olívia. Conheça o time. Sem compromisso.</p>
    </div>
    <div style="margin-top:36px;">
      <a href="https://demonstracao.orbitgestao.com.br/chat" class="btn btn-primary btn-lg hero-cta-glow">QUERO CONHECER O TIME DE IA</a>
    </div>
  </div>
</section>

</div>
`;
