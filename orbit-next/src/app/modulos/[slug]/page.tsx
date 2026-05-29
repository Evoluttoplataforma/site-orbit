import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { MODULOS, MODULOS_INDEX, AGENTES } from '@/data/agentes';
import { renderItemHTML, buildSchemas } from '@/data/agentes-template';

const BASE = 'https://orbitgestao.com.br';
const OG_FALLBACK = '/images/og-image.png';

export function generateStaticParams() {
  return MODULOS_INDEX.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MODULOS[slug];
  if (!m) return { title: 'Módulo não encontrado' };
  const url = `${BASE}/modulos/${slug}`;
  return {
    title: m.metaTitle, description: m.metaDesc, alternates: { canonical: url },
    openGraph: { type: 'website', title: m.metaTitle, description: m.metaDesc, url, locale: 'pt_BR', images: [{ url: OG_FALLBACK, width: 1200, height: 630, alt: m.nome }] },
    twitter: { card: 'summary_large_image', title: m.metaTitle, description: m.metaDesc, images: [OG_FALLBACK] },
  };
}

export default async function ModuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Se alguém acessar /modulos/{slug-de-agente}, redireciona pro /agentes
  if (AGENTES[slug]) redirect(`/agentes/${slug}`);

  const m = MODULOS[slug];
  if (!m) notFound();
  const s = buildSchemas(m);

  return (
    <main style={{ width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s.service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s.faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s.breadcrumb) }} />
      <div dangerouslySetInnerHTML={{ __html: renderItemHTML(m) }} />
    </main>
  );
}
