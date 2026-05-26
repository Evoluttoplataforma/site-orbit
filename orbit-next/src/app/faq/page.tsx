import type { Metadata } from 'next';
import { PageContent } from './content';
import { pageHTML } from './html';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes | Orbit Gestão',
  description: 'Tire dúvidas sobre gestão operada por IA, planos, segurança, LGPD, implementação e suporte da Orbit.',
  alternates: { canonical: 'https://orbitgestao.com.br/faq' },
  openGraph: {
    title: 'Perguntas Frequentes | Orbit Gestão',
    description: 'Dúvidas sobre como funciona a gestão com agentes de IA da Orbit.',
    url: 'https://orbitgestao.com.br/faq',
  },
};

// Extrai Q&A do pageHTML para gerar FAQPage JSON-LD
// (Google rich snippets + citações por GPT/Claude/Perplexity)
function extractFaqs(html: string): { q: string; a: string }[] {
  const items: { q: string; a: string }[] = [];
  const blockRe = /<button class="faq-question">([\s\S]*?)<span class="faq-icon">[\s\S]*?<div class="faq-answer-inner">([\s\S]*?)<\/div>/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(html)) !== null) {
    const q = m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const a = m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (q && a) items.push({ q, a });
  }
  return items;
}

const FAQS = extractFaqs(pageHTML);
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://orbitgestao.com.br/faq' },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageContent />
    </>
  );
}
