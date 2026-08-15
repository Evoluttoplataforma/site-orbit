import { I18n } from '@/lib/i18n-react';

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
        <I18n as="a" href="/" style={back} pt="← Voltar para o site" en="← Back to the site" />
        <I18n as="h1" style={h1} pt="Termos de Uso da Plataforma" en="Platform Terms of Use" />
        <I18n
          as="p"
          style={stamp}
          pt="Versão 3.0 — documento vinculante aceito eletronicamente na Plataforma"
          en="Version 3.0 — binding document accepted electronically on the Platform"
        />
        <I18n
          style={p}
          pt={
            <>
              O Cliente e o Usuário aderem aos <strong style={strong}>Termos de Uso da Plataforma Orbit, Versão 3.0</strong>,
              com Anexos I a V, mediante aceite eletrônico na Área de Conformidade (data, hora, IP, versão e
              identificador de integridade). Esta página é o resumo público para due diligence. Em divergência,
              prevalece o texto aceito na Plataforma.
            </>
          }
          en={
            <>
              The Customer and the User adhere to the <strong style={strong}>Orbit Platform Terms of Use, Version 3.0</strong>,
              with Annexes I to V, by electronic acceptance in the Compliance Area (date, time, IP, version and
              integrity identifier). This page is the public summary for due diligence. In case of conflict,
              the text accepted on the Platform prevails.
            </>
          }
        />
        <I18n
          style={p}
          pt="A qualificação da Empresa (razão social, CNPJ e endereço) consta das Informações Legais da Plataforma e da tela de aceite — inclusive quando a interface estiver sob a marca de um Canal."
          en="The Company’s identification (legal name, CNPJ and address) appears in the Platform Legal Information and on the acceptance screen — including when the interface is under a Channel’s brand."
        />

        <section style={section}>
          <I18n as="h2" style={h2} pt="1. Duas formas de contratação" en="1. Two contracting models" />
          <I18n
            style={p}
            pt={
              <>
                A Parte I (uso, segurança, PI e dados) aplica-se a todos. A Parte II (preço, plano, crédito por indisponibilidade) aplica-se só à <strong style={strong}>contratação direta</strong> com a Empresa.
              </>
            }
            en={
              <>
                Part I (use, security, IP and data) applies to everyone. Part II (price, plan, downtime credit) applies only to a <strong style={strong}>direct contract</strong> with the Company.
              </>
            }
          />
          <I18n
            style={p}
            pt={
              <>
                No <strong style={strong}>Acesso via Canal</strong> (consultoria em white-label), as condições comerciais são as do contrato Cliente–Canal.
                A Empresa não é parte nessa relação nem responde pela consultoria. Prevalece o contrato com o Canal nas matérias comerciais;
                estes Termos, no uso da Plataforma, segurança, PI e proteção de dados (cláusula 5.2.3).
              </>
            }
            en={
              <>
                In <strong style={strong}>Access via Channel</strong> (white-label consultancy), commercial terms are those of the Customer–Channel contract.
                The Company is not a party to that relationship and is not liable for the consultancy. The Channel contract prevails on commercial matters;
                these Terms prevail on Platform use, security, IP and data protection (clause 5.2.3).
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="2. Inteligência artificial" en="2. Artificial intelligence" />
          <I18n
            style={p}
            pt="Resultados de IA são probabilísticos e auxiliares; não são parecer profissional. O Cliente revisa antes de decidir. É vedado usá-los como fundamento único de decisão com efeito jurídico sobre pessoas naturais, sem revisão humana (LGPD, art. 20)."
            en="AI results are probabilistic and auxiliary; they are not professional advice. The Customer reviews them before deciding. They may not be used as the sole basis for a decision with legal effect on natural persons, without human review (LGPD, art. 20)."
          />
          <I18n
            style={p}
            pt="A Empresa não utiliza o Conteúdo do Cliente para treinar modelos próprios ou de terceiros. Provedores de IA são contratados em modalidades que vedam essa utilização (cláusula 6.6 e Anexo IV)."
            en="The Company does not use Customer Content to train its own or third-party models. AI providers are contracted under terms that forbid that use (clause 6.6 and Annex IV)."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="3. Dados pessoais" en="3. Personal data" />
          <I18n
            style={p}
            pt="O Cliente é Controlador do Conteúdo da Organização. A Empresa é Operadora. No Acesso via Canal, o Canal é Operador nos limites da cláusula 5.3; se definir finalidade própria, assume Controlador desse tratamento."
            en="The Customer is Controller of Organization Content. The Company is Processor. In Access via Channel, the Channel is Processor within clause 5.3; if it defines its own purpose, it becomes Controller of that processing."
          />
          <I18n
            style={p}
            pt={
              <>
                O Anexo IV tem natureza de acordo de tratamento de dados (DPA). Encarregada:{' '}
                <strong style={strong}>Jennifer Dantas</strong> —{' '}
                <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>
                {' '}(Templum / DPOnet). Requisições: 15 dias.
              </>
            }
            en={
              <>
                Annex IV is a data processing agreement (DPA). Data Protection Officer:{' '}
                <strong style={strong}>Jennifer Dantas</strong> —{' '}
                <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>
                {' '}(Templum / DPOnet). Requests: 15 days.
              </>
            }
          />
          <I18n
            style={p}
            pt="Incidente com risco relevante: comunicação ao Cliente em até 48 horas. Comunicação à ANPD e aos titulares compete ao Controlador, com apoio da Empresa (cláusula 10.7 e art. 48 da LGPD)."
            en="Incident with relevant risk: notice to the Customer within 48 hours. Notice to the ANPD and to data subjects is the Controller’s duty, with Company support (clause 10.7 and LGPD art. 48)."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="4. Disponibilidade" en="4. Availability" />
          <I18n
            style={p}
            pt={
              <>
                Disponibilidade mensal mínima: <strong style={strong}>99,0%</strong> (Anexo III). Manutenção programada: aviso mínimo de 48 horas.
                Exclusões na cláusula 12.2. Crédito por descumprimento na contratação direta: 10% / 25% / 50% da mensalidade proporcional, conforme a faixa do Anexo III — único ressarcimento por indisponibilidade.
                Via Canal, o crédito é devido ao Canal, não diretamente ao Cliente do Canal.
              </>
            }
            en={
              <>
                Minimum monthly availability: <strong style={strong}>99.0%</strong> (Annex III). Scheduled maintenance: at least 48 hours’ notice.
                Exclusions in clause 12.2. Credit for breach on a direct contract: 10% / 25% / 50% of the proportional monthly fee, by Annex III band — the only compensation for downtime.
                Via Channel, credit is due to the Channel, not directly to the Channel’s Customer.
              </>
            }
          />
          <I18n
            style={p}
            pt={
              <>
                Histórico público de infra:{' '}
                <a href="/status" style={accent}>/status</a>.
              </>
            }
            en={
              <>
                Public infrastructure history:{' '}
                <a href="/status" style={accent}>/status</a>.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="5. Responsabilidade" en="5. Liability" />
          <I18n
            style={p}
            pt="Limite agregado em 12 meses: na contratação direta, o valor pago pelo Cliente à Empresa; via Canal, o valor pago à Empresa pela licença que sustenta a Organização (cláusula 13.3). Não há indenização por danos indiretos ou lucros cessantes, ressalvados dolo, fraude, PI, confidencialidade e a obrigação de indenizar da cláusula 8.4."
            en="Aggregate 12-month cap: on a direct contract, the amount the Customer paid the Company; via Channel, the amount paid to the Company for the license that supports the Organization (clause 13.3). There is no indemnity for indirect damages or lost profits, except for willful misconduct, fraud, IP, confidentiality and the indemnity duty in clause 8.4."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="6. Encerramento e retenção" en="6. Termination and retention" />
          <ul style={ul}>
            <I18n as="li" pt="Após o encerramento: 30 dias só leitura para exportar; 60 dias arquivado; depois eliminação ou anonimização, salvo lei (cláusula 15.3)." en="After termination: 30 days read-only to export; 60 days archived; then deletion or anonymization, unless the law requires otherwise (clause 15.3)." />
            <I18n as="li" pt="Gravações de reunião (mídia): 90 dias da reunião (Anexo II.5)." en="Meeting recordings (media): 90 days from the meeting (Annex II.5)." />
            <I18n as="li" pt="Registros de acesso: 6 meses (Marco Civil, art. 15)." en="Access logs: 6 months (Brazilian Internet Civil Framework, art. 15)." />
            <I18n as="li" pt="Exportação disponível ao Cliente sem depender do Canal." en="Export is available to the Customer without depending on the Channel." />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="7. Alterações e foro" en="7. Changes and venue" />
          <I18n
            style={p}
            pt="Alterações: aviso mínimo de 30 dias e novo aceite. Lei brasileira. Foro: Florianópolis/SC."
            en="Changes: at least 30 days’ notice and a new acceptance. Brazilian law. Venue: Florianópolis/SC."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="8. Documentos correlatos" en="8. Related documents" />
          <I18n
            style={p}
            pt={
              <>
                <a href="/politica-privacidade" style={accent}>Política de Privacidade</a>
                {' · '}
                <a href="/politica-seguranca" style={accent}>Política de Segurança da Informação</a>
                {' · '}
                <a href="/seguranca-ia" style={accent}>Central de confiança</a>
              </>
            }
            en={
              <>
                <a href="/politica-privacidade" style={accent}>Privacy Policy</a>
                {' · '}
                <a href="/politica-seguranca" style={accent}>Information Security Policy</a>
                {' · '}
                <a href="/seguranca-ia" style={accent}>Trust Center</a>
              </>
            }
          />
        </section>

        <I18n
          as="p"
          style={{ color: '#484F58', fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: '1px solid #21262d', textAlign: 'center' }}
          pt="Orbit Gestão · Termos de Uso v3.0 · resumo público"
          en="Orbit Gestão · Terms of Use v3.0 · public summary"
        />
      </div>
    </div>
  );
}
