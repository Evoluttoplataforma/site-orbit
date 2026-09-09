import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Inscrição recebida — Bootcamp Canais Orbit 15/10/2026',
  description: 'Recebemos sua inscrição no Bootcamp Canais Orbit. Veja os próximos passos para a modalidade escolhida.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://orbitgestao.com.br/bootcamp-orbit/obrigado' },
};

export default function Page() {
  return <PageContent />;
}
