export const metadata = {
  title: 'Termos de Serviço — Orbit Gestão',
  description: 'Termos de Serviço da Orbit (Evoluum Tecnologia Ltda.) — condições gerais de uso da plataforma.',
};

const wrap = { background: '#0D1117', color: '#C9D1D9', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" } as const;
const container = { maxWidth: 820, margin: '0 auto' } as const;
const back = { color: '#ffba1a', textDecoration: 'none', fontSize: 14, marginBottom: 32, display: 'inline-block' } as const;
const h1 = { fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 } as const;
const stamp = { color: '#8B949E', marginBottom: 40 } as const;
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
        <h1 style={h1}>Termos de Serviço</h1>
        <p style={stamp}>Última atualização: 20 de maio de 2026</p>

        <section style={section}>
          <h2 style={h2}>1. Aceitação dos Termos</h2>
          <p style={p}>Estes Termos de Serviço (&quot;Termos&quot;) regulam o uso da plataforma Orbit, desenvolvida e operada pela <strong style={strong}>Evoluum Tecnologia Ltda.</strong> (&quot;nós&quot;, &quot;Orbit&quot;), incluindo seus aplicativos, APIs, integrações e serviços relacionados (conjuntamente, os &quot;Serviços&quot;).</p>
          <p style={p}>Ao criar uma conta, contratar um plano ou utilizar os Serviços de qualquer forma, você (&quot;Usuário&quot;) declara ter lido, compreendido e aceitado estes Termos, bem como nossa <a href="/politica-privacidade" style={accent}>Política de Privacidade</a>. Se você não concorda com qualquer disposição, não utilize a Orbit.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>2. Descrição do Serviço</h2>
          <p style={p}>A Orbit é uma plataforma SaaS de gestão empresarial operada por inteligência artificial. Disponibiliza módulos como mapeamento de processos, indicadores e KPIs, gestão de tarefas, reuniões, documentos, compras, pessoas, auditorias, automações e a IA coordenadora &quot;Olívia&quot;.</p>
          <p style={p}>Os Serviços são contínuos e podem ser atualizados, ampliados, modificados ou descontinuados a qualquer momento, com aviso prévio razoável quando as alterações afetarem funcionalidades contratadas.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>3. Cadastro e Conta</h2>
          <ul style={ul}>
            <li>Para utilizar os Serviços é necessário criar uma conta com dados verdadeiros, completos e atualizados.</li>
            <li>O Usuário é responsável por manter a confidencialidade de suas credenciais e por toda atividade realizada em sua conta.</li>
            <li>É obrigatório ter no mínimo 18 anos e capacidade legal para contratar.</li>
            <li>Contas corporativas são vinculadas a uma organização (CNPJ); o administrador da conta concede e revoga acessos de outros usuários da mesma organização.</li>
            <li>Notifique-nos imediatamente em caso de uso não autorizado da sua conta.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>4. Uso Aceitável</h2>
          <p style={p}>Ao utilizar a Orbit, você concorda em <strong style={strong}>não</strong>:</p>
          <ul style={ul}>
            <li>Violar leis aplicáveis ou direitos de terceiros (incluindo propriedade intelectual e privacidade).</li>
            <li>Acessar áreas ou dados aos quais não tenha permissão expressa.</li>
            <li>Tentar realizar engenharia reversa, decompilar, contornar limites técnicos ou medidas de segurança.</li>
            <li>Utilizar os Serviços para enviar spam, malware ou conteúdo ofensivo, discriminatório, ilegal ou enganoso.</li>
            <li>Sobrecarregar, interferir ou prejudicar a operação da plataforma (denial-of-service, scraping abusivo, etc.).</li>
            <li>Revender, sublicenciar ou disponibilizar os Serviços a terceiros sem autorização contratual específica.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>5. Planos, Assinatura e Pagamento</h2>
          <ul style={ul}>
            <li>Os Serviços são oferecidos por meio de planos de assinatura com cobrança recorrente, conforme proposta comercial ou condições publicadas no site.</li>
            <li>Os valores podem ser ajustados periodicamente, mediante comunicação prévia de pelo menos 30 (trinta) dias.</li>
            <li>O pagamento é processado por gateways parceiros (cartão de crédito, boleto ou PIX). Em caso de inadimplência, o acesso à plataforma poderá ser suspenso após notificação.</li>
            <li>O Usuário pode cancelar a assinatura a qualquer momento; o cancelamento entra em vigor ao fim do ciclo de faturamento já pago, sem direito a reembolso proporcional de períodos não utilizados, salvo disposição contratual em contrário.</li>
            <li>Períodos de teste gratuito (&quot;trial&quot;), quando aplicáveis, são limitados em tempo e funcionalidades, e podem ser encerrados a qualquer momento.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>6. Propriedade Intelectual</h2>
          <p style={p}>Todos os direitos sobre a plataforma Orbit, incluindo código-fonte, design, marcas, logos, conteúdo editorial, agentes de IA, metodologias e documentação, pertencem à <strong style={strong}>Evoluum Tecnologia Ltda.</strong> ou aos seus licenciadores.</p>
          <p style={p}>Os dados inseridos pelo Usuário (&quot;Conteúdo do Cliente&quot;) permanecem de sua propriedade. Ao usar a Orbit, você nos concede uma licença limitada, não exclusiva e mundial para processar esse conteúdo exclusivamente para fins de prestação dos Serviços contratados.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>7. Disponibilidade do Serviço</h2>
          <p style={p}>Buscamos manter a Orbit disponível 24/7, mas não garantimos disponibilidade ininterrupta. Eventuais janelas de manutenção programada serão comunicadas com antecedência. Indisponibilidades por caso fortuito, força maior ou ações de terceiros (provedores de nuvem, ataques) não geram direito a indenização.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>8. Limitação de Responsabilidade</h2>
          <p style={p}>Na máxima extensão permitida em lei, a Orbit não se responsabiliza por:</p>
          <ul style={ul}>
            <li>Decisões tomadas pelo Usuário com base em insights, automações ou sugestões da IA — você é o responsável final pelas decisões da sua empresa.</li>
            <li>Perdas, danos indiretos, lucros cessantes, perda de dados ou impactos reputacionais decorrentes do uso ou impossibilidade de uso da plataforma.</li>
            <li>Falhas ou comportamentos de integrações de terceiros (Google Calendar, WhatsApp, gateways de pagamento, etc.).</li>
          </ul>
          <p style={p}>A responsabilidade total da Orbit por quaisquer reclamações relacionadas a estes Termos fica limitada ao valor efetivamente pago pelo Usuário nos últimos 12 (doze) meses anteriores ao evento gerador.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>9. Dados Pessoais e Privacidade</h2>
          <p style={p}>O tratamento de dados pessoais segue nossa <a href="/politica-privacidade" style={accent}>Política de Privacidade</a> e a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). O Usuário é responsável por garantir que possui base legal para inserir dados pessoais de terceiros (clientes, colaboradores, fornecedores) na plataforma.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>10. Suspensão e Encerramento</h2>
          <ul style={ul}>
            <li>Podemos suspender ou encerrar o acesso à conta em caso de violação destes Termos, inadimplência, atividade fraudulenta ou ordem legal.</li>
            <li>O Usuário pode encerrar sua conta a qualquer momento pelas configurações da plataforma ou solicitando ao suporte.</li>
            <li>Após o encerramento, os dados serão mantidos por até 90 (noventa) dias e, em seguida, excluídos ou anonimizados, conforme a Política de Privacidade.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>11. Alterações nos Termos</h2>
          <p style={p}>Podemos atualizar estes Termos periodicamente. Alterações materiais serão comunicadas por e-mail ou aviso na plataforma com antecedência mínima de 15 (quinze) dias. O uso continuado após a vigência da nova versão implica aceitação das mudanças.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>12. Lei Aplicável e Foro</h2>
          <p style={p}>Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de Florianópolis/SC, com renúncia a qualquer outro, por mais privilegiado que seja, para dirimir controvérsias decorrentes destes Termos.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>13. Contato</h2>
          <p style={p}>Dúvidas sobre estes Termos podem ser enviadas para:</p>
          <p style={p}><strong style={strong}>E-mail:</strong> <span style={accent}>contato@orbitgestao.com.br</span></p>
        </section>

        <p style={{ color: '#484F58', fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: '1px solid #21262d', textAlign: 'center' }}>Orbit — Evoluum Tecnologia Ltda. © 2026</p>
      </div>
    </div>
  );
}
