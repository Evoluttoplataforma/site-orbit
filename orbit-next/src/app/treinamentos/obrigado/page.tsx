import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Inscrição confirmada — Treinamentos Orbit',
  description: 'Sua inscrição no treinamento Orbit foi confirmada.',
  robots: { index: false, follow: false },
};

export default function TreinamentosObrigadoPage() {
  return <PageContent />;
}
