import type { Metadata } from 'next';
import { PageContent } from './content';

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

export default function Page() {
  return <PageContent />;
}
