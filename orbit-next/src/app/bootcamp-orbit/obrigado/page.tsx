import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Alistamento Confirmado — Bootcamp Orbit 13/06/2026',
  description: 'Sua inscrição no Bootcamp Orbit foi confirmada. Veja os próximos passos da operação.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://orbitgestao.com.br/bootcamp-orbit/obrigado' },
};

export default function Page() {
  return <PageContent />;
}
