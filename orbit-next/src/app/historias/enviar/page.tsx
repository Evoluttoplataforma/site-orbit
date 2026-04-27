import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Conte sua História | Orbit Gestão',
  description: 'Compartilhe os resultados da sua empresa com a Orbit e ajude outros gestores a verem o que é possível com agentes de IA.',
  alternates: { canonical: 'https://orbitgestao.com.br/historias/enviar' },
  openGraph: {
    title: 'Conte sua História | Orbit Gestão',
    description: 'Envie sua história de transformação com a Orbit.',
    url: 'https://orbitgestao.com.br/historias/enviar',
  },
};

export default function Page() { return <PageContent />; }
