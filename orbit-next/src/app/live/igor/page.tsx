import type { Metadata } from 'next';
import { PageContent } from './content';

// Snapshot arquivado da Live Quinzenal do Igor (terça 13h), congelado em 29/07/2026
// quando a agenda foi pausada e /live passou a exibir aviso de "próxima edição em
// definição". Mantido noindex, fora do sitemap e fora do header — serve para reativar
// a versão anterior ou comparar com a próxima edição.
export const metadata: Metadata = {
  title: '[Arquivo] Live Quinzenal de Gestão com IA | Orbit',
  description: 'Versão arquivada da Live Quinzenal (terça 13h). Referência interna — não é a agenda vigente.',
  alternates: { canonical: 'https://orbitgestao.com.br/live/igor' },
  robots: { index: false, follow: false },
  openGraph: {
    title: '[Arquivo] Live Quinzenal de Gestão com IA | Orbit',
    description: 'Versão arquivada da Live Quinzenal. Referência interna.',
    url: 'https://orbitgestao.com.br/live/igor',
  },
};

export default function LiveIgorArquivoPage() { return <PageContent />; }
