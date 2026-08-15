import type { Metadata } from 'next';
import { StatusClient } from './StatusClient';

const TITLE = 'Status e disponibilidade — Orbit Gestão';
const DESC =
  'Status ao vivo da infraestrutura (Supabase / AWS São Paulo) e registro público de intercorrências da plataforma Orbit. Compromisso de 99,0% mensal (Termos v3.0).';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: 'https://orbitgestao.com.br/status' },
  openGraph: { title: TITLE, description: DESC, url: 'https://orbitgestao.com.br/status', type: 'website' },
};

export default function Page() {
  return <StatusClient />;
}
