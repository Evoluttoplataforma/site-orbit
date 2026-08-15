import type { Metadata } from 'next';
import { PageContent } from './content';

const TITLE = 'Central de confiança — Segurança, privacidade e IA — Orbit Gestão';
const DESC =
  'Controles de segurança, privacidade (LGPD), backup, resposta a incidentes, subprocessadores e uso de IA da Orbit. Certificações da empresa e da infraestrutura distinguídas com precisão.';

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
