export const metadata = {
  title: 'Política de Privacidade — Orbit Gestão',
  description: 'Política de Privacidade e Proteção de Dados da Orbit Gestão — LGPD.',
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
        <p style={stamp}>Última atualização: 15 de agosto de 2026</p>

        <section style={section}>
          <h2 style={h2}>1. Introdução</h2>
          <p style={p}>A Orbit, plataforma de gestão empresarial operada pela <strong style={strong}>Orbit Gestão</strong> (&quot;nós&quot;, &quot;nosso&quot; ou &quot;Orbit&quot;), está comprometida em proteger a privacidade e a segurança dos dados dos nossos usuários. Esta Política de Privacidade descreve de forma transparente como coletamos, usamos, armazenamos, compartilhamos e protegemos suas informações pessoais e corporativas quando você utiliza nossa plataforma, aplicativos, APIs e serviços relacionados (conjuntamente, os &quot;Serviços&quot;). A qualificação completa da Empresa consta das Informações Legais da Plataforma e da tela de aceite dos Termos de Uso v3.0.</p>
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
            <li>Dados gerados pelo uso da IA (Olívia): prompts, respostas e contextos de conversas na plataforma, utilizados para operar e melhorar o serviço contratado (suporte, qualidade e correções). Não incluímos conteúdo obtido via integrações Google (Calendar, Drive, Analytics, Ads) nesse processamento para treinamento ou aprimoramento de modelos de IA. Quando aplicável, dados são tratados de forma agregada ou anonimizada, conforme a seção 2.6.</li>
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
          <p style={p}>Dados obtidos de serviços de terceiros somente quando você conecta a integração na plataforma (por exemplo: Google Calendar, Google Drive, Google Docs, Google Sheets, Google Slides, Google Analytics, Google Ads; WhatsApp Business; e-mail; gateways de pagamento), limitados aos escopos OAuth e permissões que você autorizar em cada provedor.</p>

          <h3 style={h3}>2.6. Dados do Google (Workspace, Analytics e Ads)</h3>
          <p style={p}>Se você conectar sua conta Google, a Orbit acessa dados das APIs do Google apenas para oferecer as funcionalidades que você habilitar, conforme os escopos autorizados:</p>
          <ul style={ul}>
            <li><strong style={strong}>Google Calendar:</strong> exibir e sincronizar eventos de reuniões criadas ou vinculadas no Orbit.</li>
            <li><strong style={strong}>Google Drive / Docs / Sheets / Slides:</strong> permitir seleção de arquivos ou pastas (modelos de propostas, contratos etc.), listar conteúdo de pastas vinculadas pelo usuário, gerar documentos a partir de modelos, e operações técnicas necessárias (cópia, preenchimento de variáveis, exportação) somente nos arquivos que você escolher ou que forem criados/abertos pelo aplicativo no seu Drive.</li>
            <li><strong style={strong}>Google Analytics (GA4):</strong> importar métricas de tráfego e conversão que você configurar nos conectores de Indicadores.</li>
            <li><strong style={strong}>Google Ads:</strong> importar métricas de campanhas (impressões, cliques, custo, conversões etc.) que você configurar nos conectores de Indicadores.</li>
          </ul>
          <p style={p}><strong style={strong}>Não utilizamos dados de usuário do Google para:</strong></p>
          <ul style={ul}>
            <li>publicidade ou remarketing;</li>
            <li>venda ou licenciamento a terceiros;</li>
            <li>criação de perfil para fins não relacionados à funcionalidade do Orbit;</li>
            <li>treinamento, fine-tuning ou melhoria de modelos de IA genéricos (próprios ou de terceiros) com conteúdo de Calendar, Drive, Docs, Sheets, Slides, Analytics ou Ads;</li>
            <li>envio de dados Google a provedores de IA para treinamento de modelos;</li>
            <li>qualquer finalidade diferente de fornecer os recursos de integração que você solicitou.</li>
          </ul>
          <p style={p}>O tratamento segue a Política de Dados do Usuário dos Serviços de API do Google, incluindo os requisitos de Uso Limitado (Limited Use).</p>
          <p style={p}><strong style={strong}>Armazenamento:</strong> mantemos tokens de acesso e metadados mínimos (por exemplo, identificadores de arquivos, IDs de propriedade GA4/conta Ads e e-mail da conta conectada) enquanto a integração estiver ativa.</p>
          <p style={p}><strong style={strong}>Revogação:</strong> você pode desconectar a integração nas configurações do Orbit e revogar o acesso em <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener" style={accent}>https://myaccount.google.com/permissions</a>. Para exclusão de dados relacionados à integração, contate <span style={accent}>contato@orbitgestao.com.br</span>.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>3. Como Utilizamos seus Dados</h2>
          <p style={p}>Os itens abaixo referem-se aos dados da plataforma Orbit. Dados obtidos via Google são tratados exclusivamente conforme a seção 2.6 e não são utilizados para publicidade ou personalização genérica fora das funcionalidades de integração.</p>
          <ul style={ul}>
            <li><strong style={strong}>Prestação dos Serviços</strong>: operar, manter e melhorar a plataforma, incluindo processamento de reuniões, geração de transcrições, execução de automações e entrega de notificações.</li>
            <li><strong style={strong}>Inteligência Artificial</strong>: utilizamos provedores de IA de terceiros relacionados no Anexo IV dos Termos de Uso v3.0 (OpenAI de forma permanente; Google, Perplexity e correlatos somente se a integração for habilitada) para respostas, análises e automações com base em dados que você insere na plataforma ou que já estão no workspace da sua organização no Orbit. O Conteúdo do Cliente não é usado para treinar modelos próprios ou de terceiros. Dados obtidos via OAuth do Google (Calendar, Drive, Docs, Sheets, Slides, Analytics e Ads) não são usados para treinar, fine-tunar ou melhorar modelos de IA genéricos — conforme a seção 2.6.</li>
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
            <li><strong style={strong}>Prestadores de Serviço</strong>: os subprocessadores do Anexo IV dos Termos de Uso v3.0 (essenciais: Supabase, Cloudflare, OpenAI, Evolumeet, ElevenLabs, Twilio, Resend, MailerSend, Stripe; opcionais só se habilitados, inclusive Google, Meta, LinkedIn, Perplexity/Firecrawl/Apify). Sempre para executar o serviço, sem venda de dados e sem uso de dados Google OAuth para treino de modelos.</li>
            <li><strong style={strong}>Canal (white-label)</strong>: quando o acesso é via consultoria autorizada, o Canal trata dados da Organização nos limites do suporte, configuração e acompanhamento (cláusula 5.3 dos Termos). Não é venda de dados.</li>
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
          <p style={p}>As medidas técnicas e organizacionais vigentes estão detalhadas na <a href="/politica-seguranca" style={accent}>Política de Segurança da Informação</a>.</p>
        </section>

        <section style={section}>
          <h2 style={h2}>7. Retenção e Exclusão</h2>
          <ul style={ul}>
            <li><strong style={strong}>Conta ativa</strong>: mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para prestação dos Serviços.</li>
            <li><strong style={strong}>Encerramento</strong>: 30 (trinta) dias de acesso restrito, somente leitura, para exportação; em seguida 60 (sessenta) dias em arquivo recuperável a pedido; depois exclusão ou anonimização, salvo obrigação legal (Termos v3.0, cláusula 15.3).</li>
            <li><strong style={strong}>Gravações de reuniões</strong>: arquivo de mídia retido por 90 (noventa) dias contados da reunião; transcrições e análises permanecem durante a vigência do acesso (Anexo II.5). O administrador pode excluir antes.</li>
            <li><strong style={strong}>Registros de acesso</strong>: 6 (seis) meses, na forma do art. 15 do Marco Civil da Internet.</li>
            <li><strong style={strong}>Integrações Google</strong>: tokens e metadados relacionados são removidos quando você desconecta a integração ou solicita exclusão, conforme seção 2.6.</li>
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
          <p style={p}>Para questões relacionadas ao tratamento de dados pessoais ou para exercer seus direitos previstos na LGPD, entre em contato com a Encarregada. Função nomeada nos Termos de Uso v3.0, com atuação via Templum Consultoria e plataforma DPOnet. Requisições sobre o Conteúdo do Cliente devem ser dirigidas ao Controlador (sua organização); as demais, à Encarregada. Prazo: 15 dias.</p>
          <p style={p}><strong style={strong}>Encarregada:</strong> Jennifer Dantas</p>
          <p style={p}><strong style={strong}>E-mail:</strong> <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a></p>
        </section>

        <section style={section}>
          <h2 style={h2}>11. Alterações nesta Política</h2>
          <p style={p}>Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou na legislação. Notificaremos os usuários sobre alterações significativas via e-mail ou notificação na plataforma. A data da última atualização está no topo desta página.</p>
        </section>

        <p style={{ color: '#484F58', fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: '1px solid #21262d', textAlign: 'center' }}>Orbit Gestão © 2026</p>
      </div>
    </div>
  );
}
