import { Metadata } from 'next';
import { AGENTES_INDEX } from '@/data/agentes';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const BASE = 'https://orbitgestao.com.br';
const URL = `${BASE}/agentes-de-ia`;
const OG = '/images/og-image.png'; // TODO: gerar OG pillar dedicada em /public/og/agentes-de-ia.jpg

const META_TITLE = 'Time Olívia: 10 agentes de IA que operam sua gestão | Orbit';
const META_DESC = 'Conheça os 10 agentes de IA da Orbit, coordenados pela Olívia. Estratégia, financeiro, comercial, processos, pessoas — cada área tem um especialista digital.';

const FAQS = [
  { q: 'O que é um agente de IA na Orbit?',
    a: 'Um agente de IA na Orbit é uma camada de inteligência artificial especializada em uma área específica do negócio (financeiro, comercial, processos, etc.). Diferente de chatbot, o agente opera continuamente dentro da plataforma, mantém memória organizacional, executa tarefas sob política da empresa e aprende com a operação real do seu negócio.' },
  { q: 'Quantos agentes a Orbit tem?',
    a: 'A Orbit tem 10 agentes especialistas — Estratégico, Financeiro, Comercial, Processos, Pessoas, R&S, Projetos, Reuniões, Documentos e Riscos — coordenados pela Olívia, a IA central. Juntos, cobrem 18 módulos funcionais da plataforma.' },
  { q: 'Os agentes substituem minha equipe?',
    a: 'Não. Os agentes operam o trabalho repetitivo e analítico — preparam decisões, executam tarefas operacionais, geram análises, monitoram indicadores. Sua equipe humana lidera, decide estratégico, conduz negociações, cuida de cultura. Os dois juntos performam mais do que qualquer um isoladamente.' },
  { q: 'Como os agentes operam entre si?',
    a: 'Pela Olívia. Quando um evento acontece em uma área (venda fechada, processo concluído, candidato aprovado), a Olívia informa os outros agentes relevantes. Isso elimina o trabalho manual de "comunicar áreas" que consome 30-40% do tempo administrativo em empresas com sistemas fragmentados.' },
  { q: 'Quanto tempo até produtividade plena?',
    a: 'Tipicamente 1–3 meses, dependendo da maturidade dos seus processos. Os agentes começam a entregar valor desde a primeira semana, mas atingem desempenho ótimo quando acumulam 60–90 dias de operação real da sua empresa específica.' },
  { q: 'Como começo a usar?',
    a: 'Agendando uma demonstração de 30 minutos. Mostramos os agentes operando com cenário real do seu negócio. Você sai com diagnóstico aplicável e estimativa específica de impacto na operação.' },
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
  title: META_TITLE,
  description: META_DESC,
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    title: META_TITLE,
    description: META_DESC,
    url: URL,
    locale: 'pt_BR',
    images: [{ url: OG, width: 1200, height: 630, alt: 'Time Olívia — 10 agentes de IA da Orbit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESC,
    images: [OG],
  },
};

export default function AgentesPillarPage() {
  const cards = AGENTES_INDEX.map((a) => `
    <a href="/agentes/${esc(a.slug)}" class="group bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-[#FFBA1A]/40 rounded-2xl p-6 transition block">
      <div class="w-12 h-12 bg-[#FFBA1A]/10 border border-[#FFBA1A]/30 rounded-xl flex items-center justify-center mb-5">
        <i class="${a.fa} text-[#FFBA1A] text-xl"></i>
      </div>
      <h3 class="text-xl font-bold mb-2 group-hover:text-[#FFBA1A] transition">${esc(a.nome)}</h3>
      <p class="text-sm text-white/70 leading-relaxed mb-4">${esc(a.descCurta)}</p>
      <span class="text-[#FFBA1A] text-sm font-semibold inline-flex items-center gap-1">
        Ver agente <i class="fa-solid fa-arrow-right"></i>
      </span>
    </a>`).join('');

  const blogCards = BLOG_PILLAR.map((b) => `
    <a href="/blog/${esc(b.slug)}" class="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFBA1A]/40 rounded-xl p-6 transition block">
      <div class="text-xs text-[#FFBA1A] uppercase tracking-wider font-bold mb-2">Blog · ${esc(b.cat)}</div>
      <h3 class="font-bold">${esc(b.title)}</h3>
    </a>`).join('');

  const faqHtml = FAQS.map((f) => `
    <details class="bg-white/5 border border-white/10 rounded-xl p-6 group">
      <summary class="font-bold text-lg cursor-pointer flex justify-between items-center gap-4">
        ${esc(f.q)}
        <i class="fa-solid fa-chevron-down text-[#FFBA1A] transition group-open:rotate-180"></i>
      </summary>
      <p class="mt-4 text-white/70 leading-relaxed">${esc(f.a)}</p>
    </details>`).join('');

  const pageHTML = `
    ${headerHTML}

    <main class="bg-[#0D1117] text-[#F5F5F0]" style="font-family:'Plus Jakarta Sans',system-ui,sans-serif;padding-top:100px;">

      <!-- BREADCRUMB -->
      <nav aria-label="Breadcrumb" class="max-w-7xl mx-auto px-6 py-4 text-sm">
        <ol class="flex items-center gap-2 text-white/60">
          <li><a href="/" class="hover:text-[#FFBA1A]">Início</a></li>
          <li>›</li>
          <li class="text-white" aria-current="page">Agentes de IA</li>
        </ol>
      </nav>

      <!-- HERO -->
      <header class="max-w-7xl mx-auto px-6 pt-8 pb-20">
        <div class="inline-flex items-center gap-2 bg-[#FFBA1A]/10 border border-[#FFBA1A]/30 text-[#FFBA1A] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-8">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          O Time Olívia
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
          Time Olívia: 10 agentes de IA especialistas <span class="text-[#FFBA1A]">que operam a sua gestão 24/7.</span>
        </h1>
        <p class="text-xl md:text-2xl text-white/80 max-w-3xl mb-10 leading-relaxed">
          A Olívia é a IA coordenadora central da Orbit. Por trás dela, 10 agentes especialistas cuidam de cada área da sua empresa — estratégia, financeiro, comercial, processos, pessoas, recrutamento, projetos, reuniões, documentos e riscos. Você decide. Eles executam.
        </p>
        <div class="flex flex-wrap gap-4 items-center">
          <a href="https://demonstracao.orbitgestao.com.br/chat" class="bg-[#FFBA1A] hover:bg-[#E6A200] text-[#0D1117] font-bold px-8 py-4 rounded-lg transition">
            Conhecer os 10 agentes em demo guiada
          </a>
          <a href="#agentes" class="text-white/80 hover:text-white font-medium px-4 py-4 transition">
            Ver agente por agente ↓
          </a>
        </div>
      </header>

      <!-- INTRO -->
      <section class="max-w-4xl mx-auto px-6 py-12 border-t border-white/10">
        <p class="text-lg text-white/80 leading-relaxed mb-6">
          A Orbit é uma plataforma brasileira de gestão empresarial construída sobre uma nova categoria de software: o <strong class="text-white">AI Operating System for Business</strong>. Em vez de um único sistema genérico que tenta cobrir tudo, a Orbit reúne 10 agentes de IA — cada um especialista em sua área — coordenados por uma IA central, a Olívia.
        </p>
        <p class="text-lg text-white/80 leading-relaxed">
          Cada agente entende profundamente o seu domínio, opera em tempo real dentro da plataforma e aprende com a operação da sua empresa. A Olívia conecta os agentes entre si, mantém memória organizacional cumulativa e garante que decisões em uma área conversem com as outras.
        </p>
      </section>

      <!-- GRID 10 AGENTES -->
      <section id="agentes" class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-12">Os 10 agentes do Time Olívia</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">${cards}</div>
      </section>

      <!-- POR QUE UM TIME DE AGENTES -->
      <section class="max-w-4xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-8">Por que um time de agentes?</h2>
        <div class="space-y-6 text-white/80 leading-relaxed text-lg">
          <p>Software de gestão tradicional foi pensado pra ser usado por humanos: você abre o sistema, navega menus, preenche campos, gera relatórios.</p>
          <p>A nova geração de plataformas inverte essa lógica. Os agentes de IA fazem o trabalho operacional — você só decide.</p>
          <p class="text-white font-bold">Por que dividir em 10 agentes em vez de um único "assistente"?</p>
          <p><strong class="text-white">Especialização.</strong> Cada agente entende profundamente sua área. O Agente Financeiro sabe contabilidade brasileira, ciclo de pagamento PIX e boleto, regimes tributários nacionais. O Agente Comercial entende funil B2B, qualificação BANT, métricas de pipeline. Esse conhecimento profundo é impossível de obter com agente genérico.</p>
          <p><strong class="text-white">Memória contextual.</strong> Cada agente acumula histórico da sua empresa especificamente. O Agente de R&S lembra do perfil de candidatos contratados que deram certo, dos critérios que funcionaram, do tempo médio de fechamento por vaga. Em 12 meses, ele opera como um head de RH que conhece sua empresa há anos.</p>
          <p><strong class="text-white">Coordenação pela Olívia.</strong> A Olívia mantém visão sistêmica. Quando o Agente Comercial fecha contrato grande, ela informa o Agente Financeiro pra preparar fatura, o Agente de Processos pra disparar onboarding, e o Agente de Documentos pra gerar contrato. Sem você precisar coordenar manualmente.</p>
          <p><strong class="text-white">Decisão humana protegida.</strong> Os agentes executam dentro de políticas que você define. Eles não tomam decisões críticas sem aprovação. Você lidera — eles trabalham junto com o seu time humano, 24 horas por dia.</p>
          <p>É exatamente o que SAP, Salesforce e Microsoft estão construindo globalmente. Nós construímos pra realidade brasileira — sobre <strong class="text-white">30 anos de metodologia consolidada do Grupo GSN</strong> (Templum &amp; Evolutto).</p>
        </div>
      </section>

      <!-- FAQ PILLAR -->
      <section class="max-w-4xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-12 text-center">Perguntas frequentes sobre o Time Olívia</h2>
        <div class="space-y-4">${faqHtml}</div>
      </section>

      <!-- BLOG RELACIONADO -->
      <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-2xl font-bold mb-8">Conteúdos sobre AI Operating System for Business</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">${blogCards}</div>
      </section>

      <!-- CTA FINAL -->
      <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div class="bg-gradient-to-br from-[#FFBA1A]/10 to-transparent border border-[#FFBA1A]/30 rounded-3xl p-10 md:p-16 text-center">
          <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Conheça o Time Olívia operando na sua empresa</h2>
          <p class="text-xl text-white/80 max-w-2xl mx-auto mb-10">30 minutos. Mostramos os agentes aplicados ao cenário real do seu negócio.</p>
          <a href="https://demonstracao.orbitgestao.com.br/chat" class="inline-block bg-[#FFBA1A] hover:bg-[#E6A200] text-[#0D1117] font-bold text-lg px-10 py-5 rounded-lg transition">
            Agendar demonstração →
          </a>
        </div>
      </section>

    </main>

    ${footerHTML}
  `;

  // SCHEMAS
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Time Olívia — 10 agentes de IA',
    alternateName: ['Agentes de IA Orbit', 'Time de Agentes de IA', 'AI Operating System Orbit'],
    description: META_DESC,
    provider: {
      '@type': 'Organization',
      name: 'Orbit Gestão',
      url: BASE,
      sameAs: ['https://www.linkedin.com/company/orbit-gestao', 'https://www.instagram.com/orbitgestao'],
    },
    serviceType: 'AI Operating System for Business',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    audience: { '@type': 'BusinessAudience', audienceType: 'Empresas B2B brasileiras' },
    category: 'Business Software with AI Agents',
    url: URL,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Agentes especialistas',
      itemListElement: AGENTES_INDEX.map((a, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: a.nome, url: `${BASE}/agentes/${a.slug}` },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
