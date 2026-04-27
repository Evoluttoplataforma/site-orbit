import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Para Consultores | Orbit — Tecnologia para Escalar sua Consultoria',
  description: 'Plataforma para consultores empresariais oferecerem gestão operada por IA aos clientes. Receita recorrente sem aumentar a equipe.',
  alternates: { canonical: 'https://orbitgestao.com.br/consultores' },
  openGraph: {
    title: 'Para Consultores | Orbit Gestão',
    description: 'Escale sua consultoria com agentes de IA que executam a gestão dos seus clientes.',
    url: 'https://orbitgestao.com.br/consultores',
  },
};

export default function Page() {
  return <PageContent />;
}
