import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AGENTES, AGENTES_INDEX, Agente } from '@/data/agentes';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

const BASE = 'https://orbitgestao.com.br';
const OG_FALLBACK = '/images/og-image.png'; // TODO: gerar OG dedicada por agente (1200x630) em /public/og/agente-{slug}.jpg

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
      type: 'website',
      title: a.metaTitle,
      description: a.metaDesc,
      url,
      locale: 'pt_BR',
      images: [{ url: OG_FALLBACK, width: 1200, height: 630, alt: a.nome }],
    },
    twitter: {
      card: 'summary_large_image',
      title: a.metaTitle,
      description: a.metaDesc,
      images: [OG_FALLBACK],
    },
  };
}

function renderAgenteHTML(a: Agente): string {
  const url = `${BASE}/agentes/${a.slug}`;
  const outros = AGENTES_INDEX.filter((x) => x.slug !== a.slug);

  return `
    ${headerHTML}

    <main class="bg-[#0D1117] text-[#F5F5F0]" style="font-family:'Plus Jakarta Sans',system-ui,sans-serif;padding-top:100px;">

      <!-- BREADCRUMB -->
      <nav aria-label="Breadcrumb" class="max-w-7xl mx-auto px-6 py-4 text-sm">
        <ol class="flex items-center gap-2 text-white/60">
          <li><a href="/" class="hover:text-[#FFBA1A]">Início</a></li>
          <li>›</li>
          <li><a href="/agentes-de-ia" class="hover:text-[#FFBA1A]">Agentes de IA</a></li>
          <li>›</li>
          <li class="text-white" aria-current="page">${esc(a.nome)}</li>
        </ol>
      </nav>

      <!-- HERO -->
      <header class="max-w-7xl mx-auto px-6 pt-8 pb-20">
        <div class="inline-flex items-center gap-2 bg-[#FFBA1A]/10 border border-[#FFBA1A]/30 text-[#FFBA1A] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-8">
          <i class="${a.fa}"></i>
          Time Olívia · ${esc(a.pill)}
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
          ${esc(a.h1)} <span class="text-[#FFBA1A]">${esc(a.h1Highlight)}</span>
        </h1>
        <p class="text-xl md:text-2xl text-white/80 max-w-3xl mb-10 leading-relaxed">${esc(a.sub)}</p>
        <div class="flex flex-wrap gap-4 items-center">
          <a href="https://demonstracao.orbitgestao.com.br/chat" class="bg-[#FFBA1A] hover:bg-[#E6A200] text-[#0D1117] font-bold px-8 py-4 rounded-lg transition">
            Ver o ${esc(a.nome)} em ação
          </a>
          <a href="#capacidades" class="text-white/80 hover:text-white font-medium px-4 py-4 transition">
            Conheça as capacidades ↓
          </a>
        </div>
      </header>

      <!-- CAPACIDADES -->
      <section id="capacidades" class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-4">O que o ${esc(a.nome)} faz</h2>
        <p class="text-lg text-white/70 max-w-3xl mb-12">Capacidades que o agente executa por padrão, sem você precisar configurar do zero.</p>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${a.capacidades.map((c) => `
            <article class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FFBA1A]/40 transition">
              <div class="w-10 h-10 bg-[#FFBA1A]/10 border border-[#FFBA1A]/30 rounded-lg flex items-center justify-center mb-4">
                <i class="${c.fa} text-[#FFBA1A]"></i>
              </div>
              <h3 class="text-lg font-bold mb-2">${esc(c.titulo)}</h3>
              <p class="text-sm text-white/70">${esc(c.desc)}</p>
            </article>`).join('')}
        </div>
      </section>

      <!-- INTEGRAÇÕES COM OUTROS AGENTES -->
      <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Como o ${esc(a.nome)} opera com os outros agentes do Time Olívia</h2>
        <p class="text-lg text-white/70 max-w-3xl mb-12">A Olívia conecta os agentes — o evento de uma área dispara ações nas outras automaticamente.</p>
        <div class="grid md:grid-cols-2 gap-6">
          ${a.integracoes.map((i) => `
            <article class="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div class="text-xs text-[#FFBA1A] font-bold uppercase tracking-wider mb-2">${esc(i.par)}</div>
              <h3 class="text-lg font-bold mb-2">${esc(i.caso)}</h3>
              <p class="text-sm text-white/70">${esc(i.desc)}</p>
            </article>`).join('')}
        </div>
      </section>

      <!-- CASOS DE USO -->
      <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-12">3 cenários onde o ${esc(a.nome)} entrega mais valor</h2>
        <div class="grid md:grid-cols-3 gap-8">
          ${a.casos.map((c, i) => `
            <article>
              <div class="text-6xl font-extrabold text-[#FFBA1A] mb-4">0${i + 1}</div>
              <h3 class="text-xl font-bold mb-3">${esc(c.titulo)}</h3>
              <p class="text-white/70">${esc(c.desc)}</p>
            </article>`).join('')}
        </div>
      </section>

      <!-- CTA DEMO -->
      <section id="demo" class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div class="bg-gradient-to-br from-[#FFBA1A]/10 to-transparent border border-[#FFBA1A]/30 rounded-3xl p-10 md:p-16 text-center">
          <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Quer ver o ${esc(a.nome)} operando na sua empresa?</h2>
          <p class="text-xl text-white/80 max-w-2xl mx-auto mb-10">Demonstração de 30 minutos. Mostramos o ${esc(a.nome)} aplicado ao cenário real do seu negócio.</p>
          <a href="https://demonstracao.orbitgestao.com.br/chat" class="inline-block bg-[#FFBA1A] hover:bg-[#E6A200] text-[#0D1117] font-bold text-lg px-10 py-5 rounded-lg transition">
            Agendar demonstração →
          </a>
          <div class="mt-6 text-sm text-white/60 flex flex-wrap gap-6 justify-center">
            <span>✓ 30 min</span><span>✓ Sem cartão</span><span>✓ Roadmap incluído</span>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="max-w-4xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-3xl md:text-4xl font-extrabold mb-12 text-center">Perguntas frequentes sobre o ${esc(a.nome)}</h2>
        <div class="space-y-4">
          ${a.faqs.map((f) => `
            <details class="bg-white/5 border border-white/10 rounded-xl p-6 group">
              <summary class="font-bold text-lg cursor-pointer flex justify-between items-center gap-4">
                ${esc(f.q)}
                <i class="fa-solid fa-chevron-down text-[#FFBA1A] transition group-open:rotate-180"></i>
              </summary>
              <p class="mt-4 text-white/70 leading-relaxed">${esc(f.a)}</p>
            </details>`).join('')}
        </div>
      </section>

      <!-- BLOG RELACIONADO -->
      <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-2xl font-bold mb-8">Conteúdos relacionados ao ${esc(a.nome)}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${a.blog.map((b) => `
            <a href="/blog/${esc(b.slug)}" class="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFBA1A]/40 rounded-xl p-6 transition block">
              <div class="text-xs text-[#FFBA1A] uppercase tracking-wider font-bold mb-2">Blog · ${esc(b.cat)}</div>
              <h3 class="font-bold mb-2">${esc(b.title)}</h3>
            </a>`).join('')}
        </div>
      </section>

      <!-- OUTROS AGENTES -->
      <section class="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 class="text-2xl font-bold mb-8">Os outros agentes do Time Olívia</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          ${outros.map((o) => `
            <a href="/agentes/${esc(o.slug)}" class="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFBA1A]/40 rounded-lg p-4 transition text-center block">
              <i class="${o.fa} text-[#FFBA1A] text-2xl mb-2 block"></i>
              <div class="font-bold text-sm">${esc(o.nome)}</div>
            </a>`).join('')}
        </div>
        <div class="mt-8 text-center">
          <a href="/agentes-de-ia" class="inline-flex items-center gap-2 text-[#FFBA1A] hover:text-[#FFCA4A] font-semibold">
            <i class="fa-solid fa-arrow-right"></i> Veja o time completo na pillar
          </a>
        </div>
      </section>

    </main>

    ${footerHTML}
  `;
}

export default async function AgentePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AGENTES[slug];
  if (!a) notFound();
  const url = `${BASE}/agentes/${slug}`;

  // ═══ JSON-LD SCHEMAS (3 por página) ═══
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: a.nome,
    alternateName: a.alternateNames,
    description: a.metaDesc,
    provider: {
      '@type': 'Organization',
      name: 'Orbit Gestão',
      url: BASE,
      sameAs: ['https://www.linkedin.com/company/orbit-gestao', 'https://www.instagram.com/orbitgestao'],
    },
    serviceType: `AI Operating System for Business — ${a.pill}`,
    areaServed: { '@type': 'Country', name: 'Brasil' },
    audience: { '@type': 'BusinessAudience', audienceType: 'Empresas B2B brasileiras' },
    category: 'Business Software with AI Agents',
    url,
    isRelatedTo: [{ '@type': 'Service', name: 'Olívia — IA Coordenadora', url: `${BASE}/agentes-de-ia` }],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: a.faqs.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Agentes de IA', item: `${BASE}/agentes-de-ia` },
      { '@type': 'ListItem', position: 3, name: a.nome, item: url },
    ],
  };

  return (
    <main style={{ width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div dangerouslySetInnerHTML={{ __html: renderAgenteHTML(a) }} />
    </main>
  );
}
