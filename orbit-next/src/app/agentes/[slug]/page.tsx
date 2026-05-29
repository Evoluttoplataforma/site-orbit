import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { AGENTES, AGENTES_INDEX, MODULOS } from '@/data/agentes';
import { renderItemHTML, buildSchemas } from '@/data/agentes-template';

const BASE = 'https://orbitgestao.com.br';
const OG_FALLBACK = '/images/og-image.png';

// Slugs que viraram módulos (redirect 308 pra URL nova)
const LEGACY_REDIRECTS: Record<string, string> = {
  financeiro:    '/modulos/financeiro',
  recrutamento:  '/modulos/recrutamento-selecao',
};

export function generateStaticParams() {
  // Inclui legacy slugs pra SSG buildar a página de redirect também
  const legacy = Object.keys(LEGACY_REDIRECTS).map((slug) => ({ slug }));
  return [...AGENTES_INDEX.map((a) => ({ slug: a.slug })), ...legacy];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (LEGACY_REDIRECTS[slug]) return { title: 'Redirecionando…', robots: { index: false } };
  const a = AGENTES[slug];
  if (!a) return { title: 'Agente não encontrado' };
  const url = `${BASE}/agentes/${slug}`;
  return {
    title: a.metaTitle, description: a.metaDesc, alternates: { canonical: url },
    openGraph: { type: 'website', title: a.metaTitle, description: a.metaDesc, url, locale: 'pt_BR', images: [{ url: OG_FALLBACK, width: 1200, height: 630, alt: a.nome }] },
    twitter: { card: 'summary_large_image', title: a.metaTitle, description: a.metaDesc, images: [OG_FALLBACK] },
  };
}

export default async function AgentePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (LEGACY_REDIRECTS[slug]) redirect(LEGACY_REDIRECTS[slug]);

  // Se alguém acessar /agentes/{slug-de-modulo} (ex: projetos, compras), redireciona pro /modulos
  if (MODULOS[slug]) redirect(`/modulos/${slug}`);

  const a = AGENTES[slug];
  if (!a) notFound();
  const s = buildSchemas(a);

  return (
    <main style={{ width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s.service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s.faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s.breadcrumb) }} />
      <div dangerouslySetInnerHTML={{ __html: renderItemHTML(a) }} />
    </main>
  );
}
