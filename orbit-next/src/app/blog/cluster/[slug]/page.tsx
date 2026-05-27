import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import articles from '@/data/articles.json';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_url: string | null;
  category: string | null;
  author: string | null;
  published_at: string | null;
}

interface Cluster {
  slug: string;
  pain: string;          // "Dor X" do playbook
  title: string;         // titulo do hub
  intro: string;         // ~200-300 palavras
  articleSlugs: [string, string, string]; // [B pillar, C tofu, A bofu]
}

// 13 clusters do playbook (Dor 10 + 13 combinados)
const CLUSTERS: Cluster[] = [
  {
    slug: 'processos-manuais',
    pain: 'Dor 1',
    title: 'Processos manuais que travam o crescimento',
    intro: 'Toda empresa que cresce passa por um momento em que o jeito improvisado de fazer as coisas — planilha aqui, WhatsApp ali, conhecimento na cabeça de quem está há mais tempo — deixa de funcionar. Dados recentes mostram que processos manuais respondem por 61% do retrabalho e 43% dos atrasos em projetos nas empresas brasileiras de médio porte. Nesta seção, três artigos cobrem o ciclo completo: como reconhecer o problema, como organizar processos sem parar a operação, e como automatizar quando o mapeamento já está pronto.',
    articleSlugs: ['como-organizar-processos-empresa-cresceu-rapido', 'processos-manuais-empresa', 'como-automatizar-processos-empresa'],
  },
  {
    slug: 'processos-bpmn',
    pain: 'Dor 2',
    title: 'Processos definidos que ninguém segue',
    intro: 'Documentar processo não é o mesmo que ter processo vivo. A maioria das empresas brasileiras tem manuais que ninguém lê, fluxogramas que ninguém consulta e POPs que envelheceram em meses. Mapear processos com método (BPMN), garantir adesão da equipe e escolher a plataforma certa de BPMS são os três pilares que separam empresa "documentada" de empresa "padronizada na prática".',
    articleSlugs: ['como-mapear-processos-empresa-bpmn', 'ninguem-segue-processo-empresa', 'software-bpms-como-escolher'],
  },
  {
    slug: 'estrategia-execucao',
    pain: 'Dor 3',
    title: 'Estratégia que vira execução de verdade',
    intro: '70% dos planejamentos estratégicos morrem antes do terceiro mês. A causa raiz raramente é a qualidade do plano — é a desconexão entre o que foi planejado e o que o time executa no dia a dia. Os três artigos deste cluster mostram por que isso acontece, como tirar o planejamento do papel e como estruturar planos de ação que conectam estratégia, processos e indicadores numa única operação.',
    articleSlugs: ['planejamento-estrategico-morre-terceiro-mes', 'tirar-planejamento-estrategico-do-papel', 'plano-de-acao-executavel'],
  },
  {
    slug: 'comunicacao-entre-setores',
    pain: 'Dor 4',
    title: 'Comunicação que alinha setores',
    intro: 'Vendas promete o que operações não cumpre. Marketing gera lead que vendas reclama da qualidade. Financeiro descobre na sexta um pedido que entrou na segunda. A falta de alinhamento entre setores não é problema de "gente que não se entende" — é falta de processo de comunicação estruturada. Aqui você vê a causa-raiz, as ferramentas certas e como integrar vendas, marketing e operações de verdade.',
    articleSlugs: ['comunicacao-entre-setores-empresa', 'plataformas-comunicacao-corporativa', 'vendas-marketing-operacoes-conflito'],
  },
  {
    slug: 'sistemas-integracao',
    pain: 'Dor 5',
    title: 'Sistemas que conversam (ou não)',
    intro: 'A empresa média B2B brasileira tem entre 5 e 12 ferramentas que não conversam: CRM, ERP, planilha de financeiro, WhatsApp do time, helpdesk, BI, etc. Cada integração quebrada é um ponto onde dado se perde, decisão fica no chute e o time copia informação de um sistema para outro. Este cluster cobre o custo real da fragmentação, os caminhos pra integrar e a decisão estratégica entre ERP integrado vs plataforma all-in-one.',
    articleSlugs: ['como-integrar-sistemas-empresa', 'sistemas-nao-conversam-custo', 'erp-vs-plataforma-all-in-one'],
  },
  {
    slug: 'rh-talentos',
    pain: 'Dor 6',
    title: 'Atrair e reter talentos qualificados',
    intro: 'O custo de perder um profissional bom passa de 3x o salário anual, contando recrutamento, queda de produtividade durante o ramp-up do substituto e perda de conhecimento institucional. Apesar disso, a maioria das empresas brasileiras de médio porte não tem processo estruturado de retenção, plano de carreira claro, nem ferramenta dedicada a RH. Aqui você vê os 3 ângulos: por que talentos saem, como mantê-los e qual software dá sustentação.',
    articleSlugs: ['como-reter-talentos-empresa', 'perder-talentos-para-concorrentes', 'software-rh-como-escolher'],
  },
  {
    slug: 'indicadores',
    pain: 'Dor 7',
    title: 'Indicadores que conectam com a operação',
    intro: 'Empresa com KPI bonito no dashboard mas decisão tomada por chute é a regra, não a exceção. Indicadores morrem quando são desconectados do processo que os gera, quando ninguém é responsável pela ação que eles deveriam disparar, e quando o dashboard vira "relatório que ninguém abre". Esses três artigos cobrem por que isso acontece, como criar KPIs vivos e que dashboard escolher pra empresa em 2026.',
    articleSlugs: ['como-criar-indicadores-empresa', 'indicadores-nao-refletem-realidade', 'dashboard-gestao-empresarial'],
  },
  {
    slug: 'vendas-crm',
    pain: 'Dor 8',
    title: 'Vendas e CRM com método',
    intro: 'Prospecção que depende da memória do vendedor, follow-up que cai no esquecimento, CRM que ninguém preenche. A consequência é pipeline opaco, previsibilidade zero e churn comercial alto. Esta seção cobre por que o vendedor não usa o CRM, como organizar prospecção e follow-up B2B sem virar vigilante, e como escolher o CRM certo pra empresa de médio porte.',
    articleSlugs: ['como-organizar-prospeccao-vendas-b2b', 'vendedor-nao-preenche-crm', 'crm-empresa-b2b-como-escolher'],
  },
  {
    slug: 'gestao-pessoas-capacitacao',
    pain: 'Dor 9',
    title: 'Gestão de pessoas e capacitação contínua',
    intro: 'Treinamento corporativo tradicional acontece uma vez por ano, ninguém aplica o conteúdo, e o conhecimento se perde em três meses. PDI fica esquecido no Drive. A capacitação real precisa estar conectada ao dia a dia da empresa, com micro-aprendizado e responsáveis claros. Aqui você vê como criar PDI que pega, por que treinamento corporativo não vira mudança real, e qual plataforma de LMS escolher.',
    articleSlugs: ['pdi-funcionarios-como-criar', 'treinamento-corporativo-nao-funciona', 'plataforma-treinamento-corporativo'],
  },
  {
    slug: 'consultoria-accountability',
    pain: 'Dor 10 + 13',
    title: 'Consultoria, mentoria e quem responde pelo resultado',
    intro: 'Empresas investem fortunas em consultoria e mentoria, mas o resultado prático fica aquém — porque consultor entrega slide e vai embora, e ninguém na empresa fica responsável pela execução. Aqui você vê por que isso é estrutural, qual a diferença entre imersão, mentoria e consultoria, e como uma alternativa baseada em IA agentic resolve o problema da accountability.',
    articleSlugs: ['consultoria-empresarial-nao-resolve', 'imersao-mentoria-consultoria-resultado', 'plataforma-gestao-ia-agentic-alternativa-consultoria'],
  },
  {
    slug: 'documentacao',
    pain: 'Dor 11',
    title: 'Documentação centralizada e fácil de encontrar',
    intro: 'Documento crítico mora em pastas do Drive de pessoas diferentes, planilhas com versões duplicadas, e-mails antigos. Quando alguém precisa, perde 30 minutos procurando — e às vezes nem acha. Centralizar documentação não é luxo: é o que viabiliza qualidade, compliance e velocidade. Esses três artigos cobrem o problema, a solução estrutural e qual knowledge base escolher.',
    articleSlugs: ['como-centralizar-documentacao-empresa', 'encontrar-documento-empresa', 'knowledge-base-corporativo-como-escolher'],
  },
  {
    slug: 'operacao-escalavel',
    pain: 'Dor 12',
    title: 'Operação que escala sem dobrar equipe',
    intro: 'Crescer faturamento dobrando a folha de pagamento não é crescer — é estourar margem. Empresa que escala bem é a que aumenta receita por funcionário, não a que contrata mais gente. Esses três artigos cobrem as causas estruturais de operações que não escalam, como crescer sem dobrar equipe e qual plataforma sustenta esse crescimento.',
    articleSlugs: ['como-escalar-empresa-sem-dobrar-equipe', 'operacao-nao-escala-causas', 'plataforma-gestao-escalavel'],
  },
  {
    slug: 'financeiro-integrado',
    pain: 'Dor 14',
    title: 'Visão financeira amarrada à operação',
    intro: 'Vendas estouram a meta mas o caixa fecha negativo. DRE chega 30 dias depois do mês fechar. Cada área tem sua planilha e o número nunca bate. Visão financeira em tempo real só existe quando finanças está integrado à operação real — não isolado num ERP separado. Esses três artigos cobrem por que isso acontece, como ter DRE em tempo real e como integrar gestão financeira ao resto do negócio.',
    articleSlugs: ['gestao-financeira-integrada-empresa', 'vendas-boas-caixa-negativo', 'dre-tempo-real'],
  },
];

const CATEGORIES_LABEL: Record<string, string> = {
  estrategica: 'Estratégia',
  operacional: 'Operacional',
  tecnologia: 'Tecnologia',
  novidades: 'Novidades',
  cultura: 'Cultura',
  financeiro: 'Financeiro',
  ia: 'IA',
  marketing: 'Marketing',
  indicadores: 'Indicadores',
  'planejamento-estrategico': 'Planejamento',
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function readTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function generateStaticParams() {
  return CLUSTERS.map((c) => ({ slug: c.slug }));
}

function getCluster(slug: string): Cluster | undefined {
  return CLUSTERS.find((c) => c.slug === slug);
}

function getClusterArticles(cluster: Cluster): Article[] {
  const all = articles as Article[];
  return cluster.articleSlugs
    .map((s) => all.find((a) => a.slug === s))
    .filter((a): a is Article => !!a);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getCluster(slug);
  if (!cluster) return { title: 'Cluster não encontrado' };
  const title = `${cluster.title} | Orbit Gestão`;
  const description = cluster.intro.slice(0, 158);
  const url = `https://orbitgestao.com.br/blog/cluster/${cluster.slug}`;
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'Orbit Gestão',
      locale: 'pt_BR',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: cluster.title }],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: url },
  };
}

export default async function ClusterHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cluster = getCluster(slug);
  if (!cluster) notFound();

  const clusterArticles = getClusterArticles(cluster);
  const url = `https://orbitgestao.com.br/blog/cluster/${cluster.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cluster.title,
    description: cluster.intro,
    url,
    inLanguage: 'pt-BR',
    isPartOf: { '@type': 'Blog', name: 'Blog Orbit Gestão', url: 'https://orbitgestao.com.br/blog' },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: clusterArticles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://orbitgestao.com.br/blog/${a.slug}`,
        name: a.title,
      })),
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://orbitgestao.com.br/blog' },
      { '@type': 'ListItem', position: 3, name: cluster.title, item: url },
    ],
  };

  const cardsHTML = clusterArticles.map((a, i) => {
    const role = i === 0 ? 'Pillar — comece por aqui' : i === 1 ? 'Diagnóstico / Problema' : 'Solução / BOFU';
    const cat = CATEGORIES_LABEL[a.category || ''] || a.category || 'Artigo';
    const img = a.cover_url || '/images/og-image.png';
    const mins = readTime(a.content);
    const excerpt = a.excerpt || a.content.replace(/<[^>]*>/g, '').slice(0, 140);
    return `<a href="/blog/${escapeHtml(a.slug)}" class="cluster-card" role="article">
      <div class="cluster-card__img"><img src="${escapeHtml(img)}" alt="${escapeHtml(a.title)}" loading="lazy" width="600" height="315"></div>
      <div class="cluster-card__body">
        <span class="cluster-card__role">${role}</span>
        <span class="cluster-card__tag">${escapeHtml(cat)}</span>
        <h3>${escapeHtml(a.title)}</h3>
        <p>${escapeHtml(excerpt)}</p>
        <span class="cluster-card__cta">Ler artigo <i class="fas fa-arrow-right"></i> <small>${mins} min</small></span>
      </div>
    </a>`;
  }).join('');

  const pageHTML = `
    ${headerHTML}
    <style>
      .cluster-hero { max-width: 1100px; margin: 0 auto; padding: 100px 24px 36px; }
      .cluster-hero__breadcrumb { color: #6B7280; font-size: 13px; margin-bottom: 18px; }
      .cluster-hero__breadcrumb a { color: #ffba1a; text-decoration: none; }
      .cluster-hero__breadcrumb a:hover { text-decoration: underline; }
      .cluster-hero__pain { display: inline-block; padding: 5px 12px; background: rgba(255,186,26,0.12); border: 1px solid rgba(255,186,26,0.35); border-radius: 50px; color: #b87a00; font-size: 11px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 18px; }
      .cluster-hero h1 { color: #0D1117; font-size: clamp(1.8rem, 4vw, 2.4rem); font-weight: 800; line-height: 1.18; letter-spacing: -0.025em; margin: 0 0 18px; }
      .cluster-hero__intro { color: #374151; font-size: 1.08rem; line-height: 1.7; max-width: 780px; margin: 0; }
      .cluster-grid { max-width: 1100px; margin: 0 auto; padding: 32px 24px 64px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      @media (max-width: 900px) { .cluster-grid { grid-template-columns: 1fr; gap: 18px; } }
      .cluster-card { display: flex; flex-direction: column; background: #fff; border: 1px solid #E5E7EB; border-radius: 16px; overflow: hidden; text-decoration: none; color: inherit; transition: all 0.25s; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
      .cluster-card:hover { transform: translateY(-4px); border-color: #ffba1a; box-shadow: 0 18px 36px rgba(0,0,0,0.10); }
      .cluster-card__img { aspect-ratio: 16/9; background: #F3F4F6; overflow: hidden; }
      .cluster-card__img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
      .cluster-card:hover .cluster-card__img img { transform: scale(1.04); }
      .cluster-card__body { padding: 20px 20px 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
      .cluster-card__role { display: inline-block; align-self: flex-start; padding: 4px 10px; background: rgba(13,17,23,0.06); border-radius: 50px; color: #1A1D23; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; }
      .cluster-card__tag { display: inline-block; align-self: flex-start; padding: 3px 10px; background: rgba(255,186,26,0.12); border: 1px solid rgba(255,186,26,0.3); border-radius: 50px; color: #b87a00; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
      .cluster-card__body h3 { color: #0D1117; font-size: 1.1rem; font-weight: 700; line-height: 1.3; margin: 0; letter-spacing: -0.01em; }
      .cluster-card__body p { color: #4B5563; font-size: 0.95rem; line-height: 1.55; margin: 0; flex: 1; }
      .cluster-card__cta { display: inline-flex; align-items: center; gap: 8px; color: #ffba1a; font-weight: 700; font-size: 0.92rem; margin-top: auto; }
      .cluster-card__cta small { color: #9CA3AF; font-weight: 500; margin-left: auto; }
      .cluster-cta-strip { max-width: 1100px; margin: 0 auto; padding: 24px; background: linear-gradient(135deg, rgba(255,186,26,0.07), rgba(255,186,26,0.02)); border: 1px solid rgba(255,186,26,0.25); border-radius: 20px; text-align: center; margin-bottom: 64px; }
      .cluster-cta-strip h2 { color: #0D1117; font-size: 1.4rem; font-weight: 800; margin: 0 0 8px; }
      .cluster-cta-strip p { color: #4B5563; font-size: 1rem; margin: 0 0 18px; }
      .cluster-cta-strip a { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #ffba1a, #ff8c00); color: #0D1117; border-radius: 50px; font-weight: 800; text-decoration: none; transition: transform 0.2s; }
      .cluster-cta-strip a:hover { transform: translateY(-2px); }
    </style>
    <section class="cluster-hero">
      <div class="cluster-hero__breadcrumb"><a href="/">Home</a> · <a href="/blog">Blog</a> · ${escapeHtml(cluster.title)}</div>
      <span class="cluster-hero__pain">${escapeHtml(cluster.pain)} · Cluster temático</span>
      <h1>${escapeHtml(cluster.title)}</h1>
      <p class="cluster-hero__intro">${escapeHtml(cluster.intro)}</p>
    </section>
    <section class="cluster-grid">${cardsHTML}</section>
    <section class="cluster-cta-strip">
      <h2>Quer resolver isso na sua empresa?</h2>
      <p>Em 30 minutos a Orbit mostra como organizar tudo numa plataforma só, operada por IA.</p>
      <a href="https://demonstracao.orbitgestao.com.br/chat">Agendar demonstração →</a>
    </section>
    ${footerHTML}
  `;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div dangerouslySetInnerHTML={{ __html: pageHTML }} />
    </>
  );
}

// Export pra ser usado em outras paginas (sitemap, etc)
export { CLUSTERS };
