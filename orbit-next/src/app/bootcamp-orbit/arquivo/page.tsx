import type { Metadata } from 'next';
import { PageContent } from '../content';

export const metadata: Metadata = {
  title: 'Arquivo — Bootcamp Canais Orbit 15/10/2026',
  description: 'Cópia da página do Bootcamp Canais Orbit que saiu do ar. Só para consulta.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          background: '#111',
          color: '#ffba1a',
          textAlign: 'center',
          padding: '8px 16px',
          fontFamily: 'sans-serif',
          fontSize: 13,
          lineHeight: 1.4,
        }}
      >
        Arquivo da página de 15/10, fora do ar. Inscrições desligadas.
      </div>
      <PageContent />
    </>
  );
}
