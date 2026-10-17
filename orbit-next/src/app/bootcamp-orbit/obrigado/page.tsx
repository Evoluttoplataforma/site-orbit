import type { Metadata } from 'next';

const DEST = 'https://live.orbitgestao.com.br/';

export const metadata: Metadata = {
  title: 'Imersão Orbit',
  robots: { index: false, follow: false },
  alternates: { canonical: DEST },
};

export default function Page() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0D1117', color: '#fff', fontFamily: 'sans-serif', padding: 24, textAlign: 'center' }}>
      <meta httpEquiv="refresh" content={`0;url=${DEST}`} />
      <p>
        A imersão está em outro endereço.{' '}
        <a href={DEST} style={{ color: '#ffba1a' }}>Entrar na imersão</a>
      </p>
    </main>
  );
}
