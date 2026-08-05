import type { Metadata } from 'next';
import { PageContent } from './content';

const TITLE = 'Segurança & IA, Termos e Privacidade — Orbit Gestão';
const DESC =
  'Transparência sobre quais IAs usamos e como protegemos seus dados, além dos Termos de Serviço e da Política de Privacidade do Auto Chat, nossa integração de WhatsApp.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  // A página não tinha canonical, diferente de praticamente todas as outras. Passa a
  // ter porque é a URL declarada na submissão do app na Meta — precisa ser estável.
  alternates: { canonical: 'https://orbitgestao.com.br/seguranca-ia' },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: 'https://orbitgestao.com.br/seguranca-ia',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
};

export default function Page() {
  return <PageContent />;
}
