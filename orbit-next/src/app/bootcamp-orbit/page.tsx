import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Bootcamp Canais Orbit — 15/10/2026 | Orbit Gestão',
  description: 'Encontro híbrido para destravar a adoção do Orbit no dia a dia da consultoria. 15 de outubro, 8h30 às 12h30, com Igor Furniel e Christian Hart. Square SC + Zoom.',
  alternates: { canonical: 'https://orbitgestao.com.br/bootcamp-orbit' },
  openGraph: {
    title: 'Bootcamp Canais Orbit — 15/10/2026',
    description: 'Adoção da plataforma, na prática. 15 de outubro, 8h30 às 12h30, em Florianópolis + online ao vivo.',
    url: 'https://orbitgestao.com.br/bootcamp-orbit',
    siteName: 'Orbit Gestão',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/images/bootcamp/og-bootcamp.webp', width: 1200, height: 1500, alt: 'Bootcamp Canais Orbit — 15/10' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bootcamp Canais Orbit — 15/10/2026',
    description: 'Imersão híbrida para canais e leads quentes. 4 horas para acelerar a adoção do Orbit.',
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Bootcamp Canais Orbit — 2ª edição',
  description: 'Encontro híbrido para destravar o uso da plataforma Orbit na operação de consultoria. Conduzido por Igor Furniel e Christian Hart.',
  startDate: '2026-10-15T08:30:00-03:00',
  endDate: '2026-10-15T12:30:00-03:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  location: [
    {
      '@type': 'Place',
      name: 'Centro de Convenções Square SC',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rod. José Carlos Daux, 5500 - Saco Grande',
        postalCode: '88032-005',
        addressLocality: 'Florianópolis',
        addressRegion: 'SC',
        addressCountry: 'BR',
      },
    },
    {
      '@type': 'VirtualLocation',
      url: 'https://orbitgestao.com.br/bootcamp-orbit',
    },
  ],
  organizer: {
    '@type': 'Organization',
    name: 'Orbit Gestão',
    url: 'https://orbitgestao.com.br',
  },
  performer: [
    { '@type': 'Person', name: 'Igor Furniel' },
    { '@type': 'Person', name: 'Christian Hart' },
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Online ao vivo',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: 'https://orbitgestao.com.br/bootcamp-orbit#posto-de-combate',
    },
    {
      '@type': 'Offer',
      name: 'Presencial Florianópolis',
      price: '250',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/LimitedAvailability',
      url: 'https://orbitgestao.com.br/bootcamp-orbit#posto-de-combate',
    },
    {
      '@type': 'Offer',
      name: 'Mentoria presencial em grupo',
      price: '2500',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/LimitedAvailability',
      url: 'https://orbitgestao.com.br/bootcamp-orbit#posto-de-combate',
    },
  ],
  inLanguage: 'pt-BR',
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Bootcamp Canais Orbit', item: 'https://orbitgestao.com.br/bootcamp-orbit' },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageContent />
    </>
  );
}
