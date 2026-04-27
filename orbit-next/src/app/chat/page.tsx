import { ChatPage } from './content';

export const metadata = {
  title: 'Agende sua Demonstração | Orbit Gestão',
  description: 'Converse com a Olívia e agende uma demonstração do Orbit em poucos minutos.',
  alternates: { canonical: 'https://orbitgestao.com.br/chat' },
};

export default function Page() {
  return (
    <>
      <h1 style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        Agende sua demonstração com a Orbit Gestão
      </h1>
      <ChatPage />
    </>
  );
}
