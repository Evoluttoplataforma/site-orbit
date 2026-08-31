import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Recrutas — Bootcamp Canais Orbit (Interno)',
  description: 'Painel interno de inscritos no Bootcamp Canais Orbit.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PageContent />;
}
