import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Bootcamp Orbit — Imersão Canais 13/06/2026 | Orbit Gestão',
  description: 'Imersão de 4 horas, 100% mão na massa, para canais e consultorias clientes Orbit. Acelere a adoção do Orbit Gestão e blinde sua operação para o 2º semestre de 2026.',
  alternates: { canonical: 'https://orbitgestao.com.br/bootcamp-orbit' },
  openGraph: {
    title: 'Bootcamp Orbit — Imersão Canais 13/06/2026',
    description: 'Atração, conversão, produtização, precificação e atendimento — 4h mão na massa em Florianópolis + online ao vivo.',
    url: 'https://orbitgestao.com.br/bootcamp-orbit',
    siteName: 'Orbit Gestão',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Bootcamp Orbit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bootcamp Orbit — Imersão Canais 13/06/2026',
    description: 'Imersão híbrida exclusiva para canais Orbit. 4 horas mão na massa.',
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Bootcamp Orbit — Imersão Canais',
  description: 'Imersão híbrida de 4 horas para canais e consultorias clientes Orbit Gestão. Atração, conversão, produtização, precificação e atendimento.',
  startDate: '2026-06-13T09:00:00-03:00',
  endDate: '2026-06-13T13:00:00-03:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  location: [
    {
      '@type': 'Place',
      name: 'Square SC',
      address: {
        '@type': 'PostalAddress',
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
      url: 'https://orbitgestao.com.br/bootcamp-orbit#inscricao',
    },
    {
      '@type': 'Offer',
      name: 'Presencial Florianópolis',
      price: '150',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/LimitedAvailability',
      url: 'https://orbitgestao.com.br/bootcamp-orbit#inscricao',
    },
  ],
  inLanguage: 'pt-BR',
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Bootcamp Orbit', item: 'https://orbitgestao.com.br/bootcamp-orbit' },
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
