import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Treinamentos Orbit — 10 módulos semanais ao vivo',
  description: 'Aprenda a operar a Orbit com 10 treinamentos semanais ao vivo no YouTube — Pessoas, Estratégia, Processos, Indicadores, Documentos, CRM, Riscos, Tarefas e Financeiro.',
  alternates: { canonical: 'https://orbitgestao.com.br/treinamentos' },
  openGraph: {
    title: 'Treinamentos Orbit — 10 módulos semanais ao vivo',
    description: 'Aprenda a operar a Orbit com 10 treinamentos ao vivo, toda semana.',
    url: 'https://orbitgestao.com.br/treinamentos',
  },
};

export default function TreinamentosPage() {
  return <PageContent />;
}
