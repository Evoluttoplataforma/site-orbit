export const metadata = {
  title: 'Política de Privacidade — Orbit Gestão',
  description: 'Política de Privacidade e Proteção de Dados da Orbit (Evoluum Tecnologia Ltda.) — LGPD.',
};

const wrap = { background: '#0D1117', color: '#C9D1D9', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" } as const;
const container = { maxWidth: 820, margin: '0 auto' } as const;
const back = { color: '#ffba1a', textDecoration: 'none', fontSize: 14, marginBottom: 32, display: 'inline-block' } as const;
const h1 = { fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 } as const;
const stamp = { color: '#8B949E', marginBottom: 40 } as const;
const h2 = { fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12, marginTop: 8 } as const;
const h3 = { fontSize: 17, fontWeight: 700, color: '#fff', margin: '20px 0 8px' } as const;
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
        <h1 style={h1}>Política de Privacidade</h1>
        <p style={stamp}>Última atualização: 6 de maio de 2026</p>

        <section style={section}>
          <h2 style={h2}>1. Introdução</h2>
          <p style={p}>A Orbit, plataforma de gestão empresarial desenvolvida pela <strong style={strong}>Evoluum Tecnologia Ltda.</strong> (&quot;nós&quot;, &quot;nosso&quot; ou &quot;Orbit&quot;), está comprometida em proteger a privacidade e a segurança dos dados dos nossos usuários. Esta Política de Privacidade descreve de forma transparente como coletamos, usamos, armazenamos, compartilhamos e protegemos suas informações pessoais e corporativas quando você utiliza nossa plataforma, aplicativos, APIs e serviços relacionados (conjuntamente, os &quot;Serviços&quot;).</p>
          <p style={p}>Ao utilizar os Serviços da Orbit, você concorda com as práticas descritas nesta política. Caso não concorde, não utilize nossos Serviços.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>2. Dados que Coletamos</h2>

          <h3 style={h3}>2.1. Dados de Cadastro e Conta</h3>
          <ul style={ul}>
            <li>Nome completo, e-mail corporativo, telefone, cargo e departamento.</li>
            <li>Dados da organização: razão social, CNPJ, endereço, setor de atuação e porte.</li>
            <li>Credenciais de acesso e preferências de configuração da conta.</li>
          </ul>

          <h3 style={h3}>2.2. Dados de Uso da Plataforma</h3>
          <ul style={ul}>
            <li>Logs de atividades, interações com módulos (processos, tarefas, indicadores, reuniões, documentos, compras, pessoas etc.).</li>
            <li>Configurações personalizadas, automações criadas e permissões de usuários.</li>
            <li>Dados gerados pelo uso da IA (Olívia): prompts, respostas e contextos de conversas, utilizados para melhoria contínua do serviço, sempre de forma anonimizada.</li>
          </ul>

          <h3 style={h3}>2.3. Dados de Reuniões e Comunicações</h3>
          <ul style={ul}>
            <li><strong style={strong}>Gravações de áudio/vídeo</strong>: quando autorizado pelo organizador, reuniões integradas ao Orbit podem ser gravadas e armazenadas via parceiros especializados (ex: Evolumeet).</li>
            <li><strong style={strong}>Transcrições</strong>: conversas transcritas a partir de gravações, com o objetivo de gerar atas, extrair tarefas e insights.</li>
            <li><strong style={strong}>Mensagens</strong>: comunicações internas via chat, comentários em tarefas, notificações e mensagens de suporte.</li>
          </ul>

          <h3 style={h3}>2.4. Dados Técnicos</h3>
          <ul style={ul}>
            <li>Endereço IP, tipo de navegador, sistema operacional, identificadores de dispositivo, cookies e dados de localização aproximada.</li>
            <li>Dados de diagnóstico e performance da aplicação.</li>
          </ul>

          <h3 style={h3}>2.5. Dados de Integrações</h3>
          <ul style={ul}>
            <li>Dados de serviços terceiros conectados pelo usuário (Google Calendar, WhatsApp Business, e-mail via MailerSend, gateways de pagamento etc.), limitados ao escopo de permissão concedido.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>3. Como Utilizamos seus Dados</h2>
          <ul style={ul}>
            <li><strong style={strong}>Prestação dos Serviços</strong>: operar, manter e melhorar a plataforma, incluindo processamento de reuniões, geração de transcrições, execução de automações e entrega de notificações.</li>
            <li><strong style={strong}>Inteligência Artificial</strong>: treinar e aprimorar modelos de IA para fornecer respostas, análises e automações contextualizadas. Nunca utilizamos dados pessoais sensíveis ou identificáveis para treinamento de modelos de terceiros sem consentimento explícito.</li>
            <li><strong style={strong}>Comunicações</strong>: enviar avisos técnicos, atualizações de segurança, newsletters (com opção de descadastro) e alertas de uso.</li>
            <li><strong style={strong}>Segurança e Conformidade</strong>: prevenir fraudes, detectar abusos, cumprir obrigações legais e regulatórias.</li>
            <li><strong style={strong}>Análises Agregadas</strong>: gerar estatísticas anônimas sobre uso da plataforma para aprimoramento do produto.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>4. Base Legal</h2>
          <p style={p}>Tratamos seus dados com base nas seguintes hipóteses legais da LGPD:</p>
          <ul style={ul}>
            <li><strong style={strong}>Execução de contrato</strong>: para fornecer os Serviços contratados.</li>
            <li><strong style={strong}>Consentimento</strong>: para gravações de reuniões, integrações opcionais e comunicações de marketing.</li>
            <li><strong style={strong}>Cumprimento de obrigação legal ou regulatória</strong>: para retenção fiscal e atendimento a ordens judiciais.</li>
            <li><strong style={strong}>Legítimo interesse</strong>: para segurança da plataforma, prevenção de fraudes e melhoria do serviço, sempre com balanceamento de direitos.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>5. Compartilhamento de Dados</h2>
          <p style={p}><strong style={strong}>Não vendemos seus dados.</strong> Podemos compartilhar informações com:</p>
          <ul style={ul}>
            <li><strong style={strong}>Prestadores de Serviço</strong>: infraestrutura de nuvem (Supabase), processamento de pagamentos (Stripe/Paddle), transcrição de áudio (Evolumeet), envio de e-mail (MailerSend), sincronização de calendário (Google) e outras integrações, sempre sob contratos de confidencialidade e processamento de dados.</li>
            <li><strong style={strong}>Parceiros de Canal (White-Label)</strong>: quando sua organização está vinculada a um canal parceiro, dados de contato e métricas de uso podem ser compartilhados para fins de suporte e gestão de licenças.</li>
            <li><strong style={strong}>Obrigação Legal</strong>: quando exigido por lei, ordem judicial ou autoridade competente.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>6. Segurança dos Dados</h2>
          <p style={p}>Adotamos medidas técnicas e organizacionais rigorosas:</p>
          <ul style={ul}>
            <li>Criptografia em trânsito (TLS 1.3) e em repouso (AES-256).</li>
            <li>Controle de acesso baseado em função (RBAC) e autenticação multifator (MFA).</li>
            <li>Monitoramento contínuo, detecção de intrusões e auditorias periódicas.</li>
            <li>Backups automatizados com criptografia e planos de recuperação de desastres.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>7. Retenção e Exclusão</h2>
          <ul style={ul}>
            <li><strong style={strong}>Conta ativa</strong>: mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para prestação dos Serviços.</li>
            <li><strong style={strong}>Cancelamento</strong>: após o encerramento da conta, seus dados serão mantidos por até 90 (noventa) dias para possível recuperação, e então excluídos ou anonimizados, salvo obrigação legal de retenção.</li>
            <li><strong style={strong}>Gravações de reuniões</strong>: armazenadas pelo período definido pelo plano contratado ou conforme configuração da organização, podendo ser excluídas a qualquer momento pelo administrador.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>8. Direitos do Titular</h2>
          <p style={p}>Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
          <ul style={ul}>
            <li>Confirmar a existência de tratamento de seus dados.</li>
            <li>Acessar seus dados pessoais.</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
            <li>Anonimizar, bloquear ou eliminar dados desnecessários, excessivos ou tratados em desconformidade.</li>
            <li>Portar seus dados a outro fornecedor de serviço ou produto.</li>
            <li>Eliminar dados pessoais tratados com base no consentimento.</li>
            <li>Revogar o consentimento a qualquer momento.</li>
            <li>Opor-se ao tratamento fundamentado em legítimo interesse.</li>
            <li>Revisar decisões automatizadas, incluindo perfilamento.</li>
          </ul>
          <p style={p}>Para exercer seus direitos, entre em contato pelo e-mail indicado na seção 10.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>9. Cookies e Tecnologias de Rastreamento</h2>
          <p style={p}>Utilizamos cookies e tecnologias similares para:</p>
          <ul style={ul}>
            <li>Autenticação e manutenção de sessão.</li>
            <li>Memorizar preferências de idioma e personalização.</li>
            <li>Análise de uso e performance da plataforma.</li>
            <li>Segurança e prevenção a fraudes.</li>
          </ul>
          <p style={p}>Você pode gerenciar cookies através das configurações do seu navegador. Desabilitar cookies essenciais pode impactar o funcionamento da plataforma.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>10. Contato e Encarregado de Dados (DPO)</h2>
          <p style={p}>Para questões relacionadas ao tratamento de dados pessoais ou para exercer seus direitos previstos na LGPD, entre em contato com nosso Encarregado de Dados:</p>
          <p style={p}><strong style={strong}>E-mail:</strong> <span style={accent}>contato@orbitgestao.com.br</span></p>
        </section>

        <section style={section}>
          <h2 style={h2}>11. Alterações nesta Política</h2>
          <p style={p}>Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou na legislação. Notificaremos os usuários sobre alterações significativas via e-mail ou notificação na plataforma. A data da última atualização está no topo desta página.</p>
        </section>

        <p style={{ color: '#484F58', fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: '1px solid #21262d', textAlign: 'center' }}>Orbit — Evoluum Tecnologia Ltda. © 2026</p>
      </div>
    </div>
  );
}
