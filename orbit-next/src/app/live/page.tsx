import type { Metadata } from 'next';
import { PageContent } from './content';

// Agenda pausada em 29/07/2026: title e description não anunciam mais dia/hora nem
// inscrição aberta (é o snippet que aparece na busca). Mantidas as palavras-chave
// "Live" + "Gestão com IA" para não perder o ranking já conquistado da URL.
export const metadata: Metadata = {
  title: 'Live de Gestão com IA | Orbit',
  description: 'Live gratuita sobre gestão operada por agentes de IA. A próxima edição está sendo definida — nova data e tema em breve.',
  alternates: { canonical: 'https://orbitgestao.com.br/live' },
  openGraph: {
    title: 'Live de Gestão com IA | Orbit',
    description: 'Live gratuita sobre gestão com agentes de IA. Próxima edição em definição.',
    url: 'https://orbitgestao.com.br/live',
  },
};

export default function Page() { return <PageContent />; }
