export const metadata = {
  title: 'Termos de Uso — Orbit Gestão',
  description:
    'Resumo público dos Termos de Uso da Plataforma Orbit, Versão 3.0. O documento vinculante é o aceite eletrônico na Área de Conformidade.',
};

const wrap = { background: '#0D1117', color: '#C9D1D9', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" } as const;
const container = { maxWidth: 820, margin: '0 auto' } as const;
const back = { color: '#ffba1a', textDecoration: 'none', fontSize: 14, marginBottom: 32, display: 'inline-block' } as const;
const h1 = { fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 } as const;
const stamp = { color: '#8B949E', marginBottom: 16 } as const;
const h2 = { fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12, marginTop: 8 } as const;
const p = { lineHeight: 1.7, marginBottom: 12 } as const;
const ul = { paddingLeft: 24, lineHeight: 1.9, marginBottom: 12 } as const;
const section = { marginBottom: 32 } as const;
const strong = { color: '#fff' } as const;
const accent = { color: '#ffba1a' } as const;

export default function Page() {
  return (
    <div style={wrap}>
      <div style={container}>
        <a href="/" style={back}>← Voltar para o site</a>
        <h1 style={h1}>Termos de Uso da Plataforma</h1>
        <p style={stamp}>Versão 3.0 — documento vinculante aceito eletronicamente na Plataforma</p>
        <p style={p}>
          O Cliente e o Usuário aderem aos <strong style={strong}>Termos de Uso da Plataforma Orbit, Versão 3.0</strong>,
          com Anexos I a V, mediante aceite eletrônico na Área de Conformidade (data, hora, IP, versão e
          identificador de integridade). Esta página é o resumo público para due diligence. Em divergência,
          prevalece o texto aceito na Plataforma.
        </p>
        <p style={p}>
          A qualificação da Empresa (razão social, CNPJ e endereço) consta das Informações Legais da Plataforma
          e da tela de aceite — inclusive quando a interface estiver sob a marca de um Canal.
        </p>

        <section style={section}>
          <h2 style={h2}>1. Duas formas de contratação</h2>
          <p style={p}>A Parte I (uso, segurança, PI e dados) aplica-se a todos. A Parte II (preço, plano, crédito por indisponibilidade) aplica-se só à <strong style={strong}>contratação direta</strong> com a Empresa.</p>
          <p style={p}>
            No <strong style={strong}>Acesso via Canal</strong> (consultoria em white-label), as condições comerciais são as do contrato Cliente–Canal.
            A Empresa não é parte nessa relação nem responde pela consultoria. Prevalece o contrato com o Canal nas matérias comerciais;
            estes Termos, no uso da Plataforma, segurança, PI e proteção de dados (cláusula 5.2.3).
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>2. Inteligência artificial</h2>
          <p style={p}>Resultados de IA são probabilísticos e auxiliares; não são parecer profissional. O Cliente revisa antes de decidir. É vedado usá-los como fundamento único de decisão com efeito jurídico sobre pessoas naturais, sem revisão humana (LGPD, art. 20).</p>
          <p style={p}>A Empresa não utiliza o Conteúdo do Cliente para treinar modelos próprios ou de terceiros. Provedores de IA são contratados em modalidades que vedam essa utilização (cláusula 6.6 e Anexo IV).</p>
        </section>

        <section style={section}>
          <h2 style={h2}>3. Dados pessoais</h2>
          <p style={p}>O Cliente é Controlador do Conteúdo da Organização. A Empresa é Operadora. No Acesso via Canal, o Canal é Operador nos limites da cláusula 5.3; se definir finalidade própria, assume Controlador desse tratamento.</p>
          <p style={p}>
            O Anexo IV tem natureza de acordo de tratamento de dados (DPA). Encarregada:{' '}
            <strong style={strong}>Jennifer Dantas</strong> —{' '}
            <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>
            {' '}(Templum / DPOnet). Requisições: 15 dias.
          </p>
          <p style={p}>Incidente com risco relevante: comunicação ao Cliente em até 48 horas. Comunicação à ANPD e aos titulares compete ao Controlador, com apoio da Empresa (cláusula 10.7 e art. 48 da LGPD).</p>
        </section>

        <section style={section}>
          <h2 style={h2}>4. Disponibilidade</h2>
          <p style={p}>
            Disponibilidade mensal mínima: <strong style={strong}>99,0%</strong> (Anexo III). Manutenção programada: aviso mínimo de 48 horas.
            Exclusões na cláusula 12.2. Crédito por descumprimento na contratação direta: 10% / 25% / 50% da mensalidade proporcional, conforme a faixa do Anexo III — único ressarcimento por indisponibilidade.
            Via Canal, o crédito é devido ao Canal, não diretamente ao Cliente do Canal.
          </p>
          <p style={p}>
            Histórico público de infra:{' '}
            <a href="/status" style={accent}>/status</a>.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>5. Responsabilidade</h2>
          <p style={p}>Limite agregado em 12 meses: na contratação direta, o valor pago pelo Cliente à Empresa; via Canal, o valor pago à Empresa pela licença que sustenta a Organização (cláusula 13.3). Não há indenização por danos indiretos ou lucros cessantes, ressalvados dolo, fraude, PI, confidencialidade e a obrigação de indenizar da cláusula 8.4.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>6. Encerramento e retenção</h2>
          <ul style={ul}>
            <li>Após o encerramento: 30 dias só leitura para exportar; 60 dias arquivado; depois eliminação ou anonimização, salvo lei (cláusula 15.3).</li>
            <li>Gravações de reunião (mídia): 90 dias da reunião (Anexo II.5).</li>
            <li>Registros de acesso: 6 meses (Marco Civil, art. 15).</li>
            <li>Exportação disponível ao Cliente sem depender do Canal.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>7. Alterações e foro</h2>
          <p style={p}>Alterações: aviso mínimo de 30 dias e novo aceite. Lei brasileira. Foro: Florianópolis/SC.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>8. Documentos correlatos</h2>
          <p style={p}>
            <a href="/politica-privacidade" style={accent}>Política de Privacidade</a>
            {' · '}
            <a href="/politica-seguranca" style={accent}>Política de Segurança da Informação</a>
            {' · '}
            <a href="/seguranca-ia" style={accent}>Central de confiança</a>
          </p>
        </section>

        <p style={{ color: '#484F58', fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: '1px solid #21262d', textAlign: 'center' }}>
          Orbit Gestão · Termos de Uso v3.0 · resumo público
        </p>
      </div>
    </div>
  );
}
