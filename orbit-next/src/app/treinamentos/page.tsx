import type { Metadata } from 'next';
import { PageContent } from './content';

const TITLE = 'Treinamentos e mentorias Orbit — ao vivo toda semana';
const DESC =
  'Tira dúvidas no Zoom (segunda 17h e sexta 9h) e mentorias de canais no Google Meet (quarta e quinta 18h). Inscreva-se uma vez e receba o link no e-mail.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: 'https://orbitgestao.com.br/treinamentos' },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: 'https://orbitgestao.com.br/treinamentos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
  },
};

export default function TreinamentosPage() {
  return <PageContent />;
}
