import { I18n } from '@/lib/i18n-react';

export const metadata = {
  title: 'Política de Privacidade — Orbit Gestão',
  description:
    'Política de Privacidade da Orbit Gestão, operada por FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA (CNPJ 65.167.064/0001-27). LGPD, dados, IA e direitos dos titulares.',
  alternates: { canonical: 'https://orbitgestao.com.br/politica-privacidade' },
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
        <I18n as="a" href="/" style={back} pt="← Voltar para o site" en="← Back to the site" />
        <I18n as="h1" style={h1} pt="Política de Privacidade" en="Privacy Policy" />
        <I18n as="p" style={stamp} pt="Última atualização: 31 de agosto de 2026" en="Last updated: 31 August 2026" />

        <section style={section}>
          <I18n as="h2" style={h2} pt="1. Introdução" en="1. Introduction" />
          <I18n
            style={p}
            pt={
              <>
                A <strong style={strong}>Orbit Gestão</strong> é uma plataforma de gestão empresarial operada por{' '}
                <strong style={strong}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</strong>, inscrita no CNPJ sob nº{' '}
                <strong style={strong}>65.167.064/0001-27</strong>, com sede na Rodovia Jose Carlos Daux, 5500, Conj. 306,
                Saco Grande, Florianópolis, Santa Catarina, CEP 88032-005, Brasil, doravante denominada “Orbit”,
                “Empresa”, “nós” ou “nosso”.
              </>
            }
            en={
              <>
                <strong style={strong}>Orbit Gestão</strong> is a business management platform operated by{' '}
                <strong style={strong}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</strong>, registered under CNPJ{' '}
                <strong style={strong}>65.167.064/0001-27</strong>, with registered office at Rodovia Jose Carlos Daux,
                5500, Conj. 306, Saco Grande, Florianópolis, Santa Catarina, CEP 88032-005, Brazil, hereinafter “Orbit”,
                “Company”, “we” or “our”.
              </>
            }
          />
          <I18n
            style={p}
            pt="Orbit Gestão é a marca comercial utilizada por FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA para a disponibilização dos Serviços. A qualificação completa consta das Informações Legais e da tela de aceite dos Termos de Uso v3.0."
            en="Orbit Gestão is the trade name used by FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA to make the Services available. Full legal identification appears in Legal Information and on the Terms of Use v3.0 acceptance screen."
          />
          <I18n
            style={p}
            pt={
              <>
                A Orbit está comprometida com a privacidade, proteção e segurança das informações tratadas em seus
                websites, plataformas, aplicações, APIs, integrações e demais serviços relacionados. Esta Política
                explica quais dados podem ser coletados, como podem ser utilizados, armazenados, compartilhados e
                protegidos, além dos direitos dos titulares. Detalhes societários:{' '}
                <a href="/informacoes-legais" style={accent}>Informações Legais</a>.
              </>
            }
            en={
              <>
                Orbit is committed to the privacy, protection and security of information processed through its
                websites, platforms, applications, APIs, integrations and related services. This Policy explains what
                data may be collected, how they may be used, stored, shared and protected, and the rights of data
                subjects. Corporate details:{' '}
                <a href="/informacoes-legais" style={accent}>Legal Information</a>.
              </>
            }
          />
          <I18n
            style={p}
            pt="Ao utilizar nossos Serviços, o usuário declara estar ciente das práticas descritas nesta Política. Caso não concorde, não utilize nossos Serviços."
            en="By using our Services, the user acknowledges the practices described in this Policy. If you do not agree, do not use our Services."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="1.1. Aplicação desta Política" en="1.1. Scope of this Policy" />
          <I18n
            style={p}
            pt="Esta Política se aplica aos dados pessoais tratados por meio de: site orbitgestao.com.br; plataforma Orbit Gestão; aplicativos e interfaces relacionadas; formulários; canais de atendimento; integrações; APIs; serviços vinculados à operação da plataforma; e ambientes disponibilizados por consultorias, parceiros e canais que utilizem a infraestrutura Orbit em modelo white label."
            en="This Policy applies to personal data processed through: the website orbitgestao.com.br; the Orbit Gestão platform; related applications and interfaces; forms; support channels; integrations; APIs; services linked to platform operations; and environments made available by consultancies, partners and channels that use Orbit infrastructure in a white-label model."
          />
          <I18n
            style={p}
            pt="Quando determinado ambiente utilizar identidade visual de uma consultoria ou parceiro, poderão existir responsabilidades adicionais estabelecidas entre a Orbit, o parceiro e o cliente final, conforme os contratos aplicáveis."
            en="When an environment uses a consultancy’s or partner’s visual identity, additional responsibilities may exist among Orbit, the partner and the end customer, as set out in the applicable contracts."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="2. Dados que Coletamos" en="2. Data We Collect" />

          <I18n as="h3" style={h3} pt="2.1. Dados de Cadastro e Conta" en="2.1. Account and registration data" />
          <ul style={ul}>
            <I18n as="li" pt="Nome completo, e-mail corporativo, telefone, cargo e departamento." en="Full name, corporate e-mail, telephone, job title and department." />
            <I18n as="li" pt="Dados da organização: razão social, CNPJ, endereço, setor de atuação e porte." en="Organization data: legal name, CNPJ, address, industry and company size." />
            <I18n as="li" pt="Credenciais de acesso e preferências de configuração da conta." en="Access credentials and account configuration preferences." />
          </ul>

          <I18n as="h3" style={h3} pt="2.2. Dados de Uso da Plataforma" en="2.2. Platform usage data" />
          <ul style={ul}>
            <I18n as="li" pt="Logs de atividades, interações com módulos (processos, tarefas, indicadores, reuniões, documentos, compras, pessoas etc.)." en="Activity logs, interactions with modules (processes, tasks, indicators, meetings, documents, procurement, people, etc.)." />
            <I18n as="li" pt="Configurações personalizadas, automações criadas e permissões de usuários." en="Custom settings, automations created and user permissions." />
            <I18n
              as="li"
              pt="Dados gerados pelo uso da IA (Olívia): prompts, respostas e contextos de conversas na plataforma, utilizados para operar e melhorar o serviço contratado (suporte, qualidade e correções). Não incluímos conteúdo obtido via integrações Google (Calendar, Drive, Analytics, Ads) nesse processamento para treinamento ou aprimoramento de modelos de IA. Quando aplicável, dados são tratados de forma agregada ou anonimizada, conforme a seção 2.6."
              en="Data generated by use of the AI (Olívia): prompts, responses and conversation contexts on the platform, used to operate and improve the contracted service (support, quality and corrections). We do not include content obtained via Google integrations (Calendar, Drive, Analytics, Ads) in that processing for training or improvement of AI models. Where applicable, data are processed in aggregated or anonymized form, as described in section 2.6."
            />
          </ul>

          <I18n as="h3" style={h3} pt="2.3. Dados de Reuniões e Comunicações" en="2.3. Meeting and communication data" />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Gravações de áudio/vídeo</strong>: quando autorizado pelo organizador, reuniões integradas ao Orbit podem ser gravadas e armazenadas via parceiros especializados (ex: Evolumeet).
                </>
              }
              en={
                <>
                  <strong style={strong}>Audio/video recordings</strong>: when authorized by the organizer, meetings integrated with Orbit may be recorded and stored via specialized partners (e.g. Evolumeet).
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Transcrições</strong>: conversas transcritas a partir de gravações, com o objetivo de gerar atas, extrair tarefas e insights.
                </>
              }
              en={
                <>
                  <strong style={strong}>Transcripts</strong>: conversations transcribed from recordings, for the purpose of generating minutes, extracting tasks and insights.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Mensagens</strong>: comunicações internas via chat, comentários em tarefas, notificações e mensagens de suporte.
                </>
              }
              en={
                <>
                  <strong style={strong}>Messages</strong>: internal communications via chat, comments on tasks, notifications and support messages.
                </>
              }
            />
          </ul>

          <I18n as="h3" style={h3} pt="2.4. Dados Técnicos" en="2.4. Technical data" />
          <ul style={ul}>
            <I18n as="li" pt="Endereço IP, tipo de navegador, sistema operacional, identificadores de dispositivo, cookies e dados de localização aproximada." en="IP address, browser type, operating system, device identifiers, cookies and approximate location data." />
            <I18n as="li" pt="Dados de diagnóstico e performance da aplicação." en="Application diagnostic and performance data." />
          </ul>

          <I18n as="h3" style={h3} pt="2.5. Dados de Integrações" en="2.5. Integration data" />
          <I18n
            style={p}
            pt="Dados obtidos de serviços de terceiros somente quando você conecta a integração na plataforma (por exemplo: Google Calendar, Google Drive, Google Docs, Google Sheets, Google Slides, Google Analytics, Google Ads; WhatsApp Business; e-mail; gateways de pagamento), limitados aos escopos OAuth e permissões que você autorizar em cada provedor."
            en="Data obtained from third-party services only when you connect the integration on the platform (for example: Google Calendar, Google Drive, Google Docs, Google Sheets, Google Slides, Google Analytics, Google Ads; WhatsApp Business; e-mail; payment gateways), limited to the OAuth scopes and permissions you authorize with each provider."
          />

          <I18n as="h3" style={h3} pt="2.6. Dados do Google (Workspace, Analytics e Ads)" en="2.6. Google data (Workspace, Analytics and Ads)" />
          <I18n
            style={p}
            pt="Se você conectar sua conta Google, a Orbit acessa dados das APIs do Google apenas para oferecer as funcionalidades que você habilitar, conforme os escopos autorizados:"
            en="If you connect your Google account, Orbit accesses Google API data solely to provide the features you enable, in accordance with the authorized scopes:"
          />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Google Calendar:</strong> exibir e sincronizar eventos de reuniões criadas ou vinculadas no Orbit.
                </>
              }
              en={
                <>
                  <strong style={strong}>Google Calendar:</strong> display and synchronize events of meetings created or linked in Orbit.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Google Drive / Docs / Sheets / Slides:</strong> permitir seleção de arquivos ou pastas (modelos de propostas, contratos etc.), listar conteúdo de pastas vinculadas pelo usuário, gerar documentos a partir de modelos, e operações técnicas necessárias (cópia, preenchimento de variáveis, exportação) somente nos arquivos que você escolher ou que forem criados/abertos pelo aplicativo no seu Drive.
                </>
              }
              en={
                <>
                  <strong style={strong}>Google Drive / Docs / Sheets / Slides:</strong> allow selection of files or folders (proposal templates, contracts, etc.), list contents of folders linked by the user, generate documents from templates, and perform the technical operations required (copying, variable substitution, export) only on files you choose or that are created/opened by the application in your Drive.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Google Analytics (GA4):</strong> importar métricas de tráfego e conversão que você configurar nos conectores de Indicadores.
                </>
              }
              en={
                <>
                  <strong style={strong}>Google Analytics (GA4):</strong> import traffic and conversion metrics that you configure in the Indicators connectors.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Google Ads:</strong> importar métricas de campanhas (impressões, cliques, custo, conversões etc.) que você configurar nos conectores de Indicadores.
                </>
              }
              en={
                <>
                  <strong style={strong}>Google Ads:</strong> import campaign metrics (impressions, clicks, cost, conversions, etc.) that you configure in the Indicators connectors.
                </>
              }
            />
          </ul>
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>Não utilizamos dados de usuário do Google para:</strong>
              </>
            }
            en={
              <>
                <strong style={strong}>We do not use Google user data for:</strong>
              </>
            }
          />
          <ul style={ul}>
            <I18n as="li" pt="publicidade ou remarketing;" en="advertising or remarketing;" />
            <I18n as="li" pt="venda ou licenciamento a terceiros;" en="sale or licensing to third parties;" />
            <I18n as="li" pt="criação de perfil para fins não relacionados à funcionalidade do Orbit;" en="profiling for purposes unrelated to Orbit functionality;" />
            <I18n
              as="li"
              pt="treinamento, fine-tuning ou melhoria de modelos de IA genéricos (próprios ou de terceiros) com conteúdo de Calendar, Drive, Docs, Sheets, Slides, Analytics ou Ads;"
              en="training, fine-tuning or improvement of generic AI models (our own or third-party) with content from Calendar, Drive, Docs, Sheets, Slides, Analytics or Ads;"
            />
            <I18n as="li" pt="envio de dados Google a provedores de IA para treinamento de modelos;" en="sending Google data to AI providers for model training;" />
            <I18n as="li" pt="qualquer finalidade diferente de fornecer os recursos de integração que você solicitou." en="any purpose other than providing the integration features you requested." />
          </ul>
          <I18n
            style={p}
            pt="O tratamento segue a Política de Dados do Usuário dos Serviços de API do Google, incluindo os requisitos de Uso Limitado (Limited Use)."
            en="Processing follows the Google API Services User Data Policy, including the Limited Use requirements."
          />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>Armazenamento:</strong> mantemos tokens de acesso e metadados mínimos (por exemplo, identificadores de arquivos, IDs de propriedade GA4/conta Ads e e-mail da conta conectada) enquanto a integração estiver ativa.
              </>
            }
            en={
              <>
                <strong style={strong}>Storage:</strong> we retain access tokens and minimum metadata (for example, file identifiers, GA4 property/Ads account IDs and the connected account e-mail) while the integration remains active.
              </>
            }
          />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>Revogação:</strong> você pode desconectar a integração nas configurações do Orbit e revogar o acesso em <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener" style={accent}>https://myaccount.google.com/permissions</a>. Para exclusão de dados relacionados à integração, contate <span style={accent}>contato@orbitgestao.com.br</span>.
              </>
            }
            en={
              <>
                <strong style={strong}>Revocation:</strong> you may disconnect the integration in Orbit settings and revoke access at <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener" style={accent}>https://myaccount.google.com/permissions</a>. To request deletion of data related to the integration, contact <span style={accent}>contato@orbitgestao.com.br</span>.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="3. Como Utilizamos seus Dados" en="3. How We Use Your Data" />
          <I18n
            style={p}
            pt="Os itens abaixo referem-se aos dados da plataforma Orbit. Dados obtidos via Google são tratados exclusivamente conforme a seção 2.6 e não são utilizados para publicidade ou personalização genérica fora das funcionalidades de integração."
            en="The items below refer to Orbit platform data. Data obtained via Google are processed exclusively as described in section 2.6 and are not used for advertising or generic personalization outside the integration features."
          />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Prestação dos Serviços</strong>: operar, manter e melhorar a plataforma, incluindo processamento de reuniões, geração de transcrições, execução de automações e entrega de notificações.
                </>
              }
              en={
                <>
                  <strong style={strong}>Provision of the Services</strong>: operate, maintain and improve the platform, including meeting processing, generation of transcripts, execution of automations and delivery of notifications.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Inteligência Artificial</strong>: utilizamos provedores de IA de terceiros relacionados no Anexo IV dos Termos de Uso v3.0 (OpenAI de forma permanente; Google, Perplexity e correlatos somente se a integração for habilitada) para respostas, análises e automações com base em dados que você insere na plataforma ou que já estão no workspace da sua organização no Orbit. O Conteúdo do Cliente não é usado para treinar modelos próprios ou de terceiros. Dados obtidos via OAuth do Google (Calendar, Drive, Docs, Sheets, Slides, Analytics e Ads) não são usados para treinar, fine-tunar ou melhorar modelos de IA genéricos — conforme a seção 2.6.
                </>
              }
              en={
                <>
                  <strong style={strong}>Artificial Intelligence</strong>: we use third-party AI providers listed in Annex IV of the Terms of Use v3.0 (OpenAI on a standing basis; Google, Perplexity and related providers only if the integration is enabled) for responses, analyses and automations based on data you enter on the platform or that already reside in your organization&apos;s workspace in Orbit. Customer Content is not used to train our own or third-party models. Data obtained via Google OAuth (Calendar, Drive, Docs, Sheets, Slides, Analytics and Ads) are not used to train, fine-tune or improve generic AI models — as described in section 2.6.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Comunicações</strong>: enviar avisos técnicos, atualizações de segurança, newsletters (com opção de descadastro) e alertas de uso.
                </>
              }
              en={
                <>
                  <strong style={strong}>Communications</strong>: send technical notices, security updates, newsletters (with an unsubscribe option) and usage alerts.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Segurança e Conformidade</strong>: prevenir fraudes, detectar abusos, cumprir obrigações legais e regulatórias.
                </>
              }
              en={
                <>
                  <strong style={strong}>Security and Compliance</strong>: prevent fraud, detect abuse, and comply with legal and regulatory obligations.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Análises Agregadas</strong>: gerar estatísticas anônimas sobre uso da plataforma para aprimoramento do produto.
                </>
              }
              en={
                <>
                  <strong style={strong}>Aggregated Analytics</strong>: generate anonymous statistics on platform usage for product improvement.
                </>
              }
            />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="4. Base Legal" en="4. Legal Basis" />
          <I18n
            style={p}
            pt="Tratamos seus dados com base nas seguintes hipóteses legais da LGPD:"
            en="We process your data on the following legal bases under the LGPD:"
          />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Execução de contrato</strong>: para fornecer os Serviços contratados.
                </>
              }
              en={
                <>
                  <strong style={strong}>Performance of a contract</strong>: to provide the contracted Services.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Consentimento</strong>: para gravações de reuniões, integrações opcionais e comunicações de marketing.
                </>
              }
              en={
                <>
                  <strong style={strong}>Consent</strong>: for meeting recordings, optional integrations and marketing communications.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Cumprimento de obrigação legal ou regulatória</strong>: para retenção fiscal e atendimento a ordens judiciais.
                </>
              }
              en={
                <>
                  <strong style={strong}>Compliance with a legal or regulatory obligation</strong>: for tax retention and compliance with court orders.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Legítimo interesse</strong>: para segurança da plataforma, prevenção de fraudes e melhoria do serviço, sempre com balanceamento de direitos.
                </>
              }
              en={
                <>
                  <strong style={strong}>Legitimate interest</strong>: for platform security, fraud prevention and service improvement, always with a balancing of rights.
                </>
              }
            />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="5. Compartilhamento de Dados" en="5. Data Sharing" />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>Não vendemos seus dados.</strong> Podemos compartilhar informações com:
              </>
            }
            en={
              <>
                <strong style={strong}>We do not sell your data.</strong> We may share information with:
              </>
            }
          />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Prestadores de Serviço</strong>: os subprocessadores do Anexo IV dos Termos de Uso v3.0 (essenciais: Supabase, Cloudflare, OpenAI, Evolumeet, ElevenLabs, Twilio, Resend, MailerSend, Stripe; opcionais só se habilitados, inclusive Google, Meta, LinkedIn, Perplexity/Firecrawl/Apify). Sempre para executar o serviço, sem venda de dados e sem uso de dados Google OAuth para treino de modelos.
                </>
              }
              en={
                <>
                  <strong style={strong}>Service Providers</strong>: the subprocessors in Annex IV of the Terms of Use v3.0 (essential: Supabase, Cloudflare, OpenAI, Evolumeet, ElevenLabs, Twilio, Resend, MailerSend, Stripe; optional only if enabled, including Google, Meta, LinkedIn, Perplexity/Firecrawl/Apify). Always to perform the service, with no sale of data and no use of Google OAuth data for model training.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Canal (white-label)</strong>: quando o acesso é via consultoria autorizada, o Canal trata dados da Organização nos limites do suporte, configuração e acompanhamento (cláusula 5.3 dos Termos). Não é venda de dados.
                </>
              }
              en={
                <>
                  <strong style={strong}>Channel (white-label)</strong>: when access is via an authorized consultancy, the Channel processes Organization data within the limits of support, configuration and follow-up (clause 5.3 of the Terms). This is not a sale of data.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Obrigação Legal</strong>: quando exigido por lei, ordem judicial ou autoridade competente.
                </>
              }
              en={
                <>
                  <strong style={strong}>Legal Obligation</strong>: when required by law, court order or competent authority.
                </>
              }
            />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="5.1. Transferência internacional de dados" en="5.1. International data transfers" />
          <I18n
            style={p}
            pt="Determinados fornecedores tecnológicos utilizados pela Orbit poderão possuir infraestrutura localizada fora do Brasil. Nessas situações, dados poderão ser tratados ou armazenados internacionalmente, observadas as medidas previstas na legislação aplicável para proteção das informações."
            en="Certain technology providers used by Orbit may have infrastructure located outside Brazil. In those cases, data may be processed or stored internationally, subject to the measures required by applicable law to protect the information."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="6. Segurança dos Dados" en="6. Data Security" />
          <I18n
            style={p}
            pt="Adotamos medidas técnicas e organizacionais rigorosas:"
            en="We adopt rigorous technical and organizational measures:"
          />
          <ul style={ul}>
            <I18n as="li" pt="Criptografia em trânsito (TLS 1.3) e em repouso (AES-256)." en="Encryption in transit (TLS 1.3) and at rest (AES-256)." />
            <I18n as="li" pt="Controle de acesso baseado em função (RBAC) e autenticação multifator (MFA)." en="Role-based access control (RBAC) and multi-factor authentication (MFA)." />
            <I18n as="li" pt="Monitoramento contínuo, detecção de intrusões e auditorias periódicas." en="Continuous monitoring, intrusion detection and periodic audits." />
            <I18n as="li" pt="Backups automatizados com criptografia e planos de recuperação de desastres." en="Automated encrypted backups and disaster-recovery plans." />
          </ul>
          <I18n
            style={p}
            pt={
              <>
                As medidas técnicas e organizacionais vigentes estão detalhadas na <a href="/politica-seguranca" style={accent}>Política de Segurança da Informação</a>.
              </>
            }
            en={
              <>
                The applicable technical and organizational measures are detailed in the <a href="/politica-seguranca" style={accent}>Information Security Policy</a>.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="7. Retenção e Exclusão" en="7. Retention and Deletion" />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Conta ativa</strong>: mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para prestação dos Serviços.
                </>
              }
              en={
                <>
                  <strong style={strong}>Active account</strong>: we retain your data while your account remains active or as necessary to provide the Services.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Encerramento</strong>: 30 (trinta) dias de acesso restrito, somente leitura, para exportação; em seguida 60 (sessenta) dias em arquivo recuperável a pedido; depois exclusão ou anonimização, salvo obrigação legal (Termos v3.0, cláusula 15.3).
                </>
              }
              en={
                <>
                  <strong style={strong}>Termination</strong>: 30 (thirty) days of restricted, read-only access for export; then 60 (sixty) days in recoverable archive upon request; thereafter deletion or anonymization, except where a legal obligation applies (Terms v3.0, clause 15.3).
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Gravações de reuniões</strong>: arquivo de mídia retido por 90 (noventa) dias contados da reunião; transcrições e análises permanecem durante a vigência do acesso (Anexo II.5). O administrador pode excluir antes.
                </>
              }
              en={
                <>
                  <strong style={strong}>Meeting recordings</strong>: media files retained for 90 (ninety) days from the meeting; transcripts and analyses remain for the duration of access (Annex II.5). The administrator may delete them earlier.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Registros de acesso</strong>: 6 (seis) meses, na forma do art. 15 do Marco Civil da Internet.
                </>
              }
              en={
                <>
                  <strong style={strong}>Access logs</strong>: 6 (six) months, pursuant to art. 15 of the Brazilian Internet Civil Framework (Marco Civil da Internet).
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Integrações Google</strong>: tokens e metadados relacionados são removidos quando você desconecta a integração ou solicita exclusão, conforme seção 2.6.
                </>
              }
              en={
                <>
                  <strong style={strong}>Google integrations</strong>: related tokens and metadata are removed when you disconnect the integration or request deletion, as described in section 2.6.
                </>
              }
            />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="8. Direitos do Titular" en="8. Data-Subject Rights" />
          <I18n
            style={p}
            pt="Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:"
            en="Under the Brazilian General Data Protection Law (LGPD), you have the right to:"
          />
          <ul style={ul}>
            <I18n as="li" pt="Confirmar a existência de tratamento de seus dados." en="Confirm the existence of processing of your data." />
            <I18n as="li" pt="Acessar seus dados pessoais." en="Access your personal data." />
            <I18n as="li" pt="Corrigir dados incompletos, inexatos ou desatualizados." en="Rectify incomplete, inaccurate or outdated data." />
            <I18n as="li" pt="Anonimizar, bloquear ou eliminar dados desnecessários, excessivos ou tratados em desconformidade." en="Anonymize, block or erase data that are unnecessary, excessive or processed in non-compliance." />
            <I18n as="li" pt="Portar seus dados a outro fornecedor de serviço ou produto." en="Port your data to another service or product provider." />
            <I18n as="li" pt="Eliminar dados pessoais tratados com base no consentimento." en="Erase personal data processed on the basis of consent." />
            <I18n as="li" pt="Revogar o consentimento a qualquer momento." en="Withdraw consent at any time." />
            <I18n as="li" pt="Opor-se ao tratamento fundamentado em legítimo interesse." en="Object to processing based on legitimate interest." />
            <I18n as="li" pt="Revisar decisões automatizadas, incluindo perfilamento." en="Review automated decisions, including profiling." />
          </ul>
          <I18n
            style={p}
            pt="Para exercer seus direitos, entre em contato pelo e-mail indicado na seção 10."
            en="To exercise your rights, contact us at the e-mail address indicated in section 10."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="9. Cookies e Tecnologias de Rastreamento" en="9. Cookies and Tracking Technologies" />
          <I18n
            style={p}
            pt="Utilizamos cookies e tecnologias similares para:"
            en="We use cookies and similar technologies to:"
          />
          <ul style={ul}>
            <I18n as="li" pt="Autenticação e manutenção de sessão." en="Authenticate and maintain the session." />
            <I18n as="li" pt="Memorizar preferências de idioma e personalização." en="Remember language and personalization preferences." />
            <I18n as="li" pt="Análise de uso e performance da plataforma." en="Analyze platform usage and performance." />
            <I18n as="li" pt="Segurança e prevenção a fraudes." en="Security and fraud prevention." />
          </ul>
          <I18n
            style={p}
            pt="Você pode gerenciar cookies através das configurações do seu navegador. Desabilitar cookies essenciais pode impactar o funcionamento da plataforma."
            en="You may manage cookies through your browser settings. Disabling essential cookies may affect the operation of the platform."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="10. Contato e Encarregado de Dados (DPO)" en="10. Contact and Data Protection Officer" />
          <I18n
            style={p}
            pt="Para questões relacionadas ao tratamento de dados pessoais ou para exercer seus direitos previstos na LGPD, entre em contato com a Encarregada. Função nomeada nos Termos de Uso v3.0, com atuação via Templum Consultoria e plataforma DPOnet. Requisições sobre o Conteúdo do Cliente devem ser dirigidas ao Controlador (sua organização); as demais, à Encarregada. Prazo: 15 dias."
            en="For matters relating to the processing of personal data or to exercise your rights under the LGPD, contact the Data Protection Officer. The role is appointed in the Terms of Use v3.0, acting via Templum Consultoria and the DPOnet platform. Requests concerning Customer Content must be directed to the Controller (your organization); all others, to the DPO. Deadline: 15 days."
          />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>Encarregada:</strong> Jennifer Dantas
              </>
            }
            en={
              <>
                <strong style={strong}>Data Protection Officer:</strong> Jennifer Dantas
              </>
            }
          />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>E-mail:</strong> <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>
              </>
            }
            en={
              <>
                <strong style={strong}>E-mail:</strong> <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>
              </>
            }
          />
          <I18n
            style={p}
            pt="Para dúvidas institucionais relacionadas a esta Política ou ao tratamento de dados pela Orbit:"
            en="For institutional questions related to this Policy or to Orbit’s processing of data:"
          />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>Orbit Gestão</strong> — FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA
                <br />
                CNPJ: 65.167.064/0001-27
                <br />
                Rodovia Jose Carlos Daux, 5500, Conj. 306, Saco Grande, Florianópolis, SC, CEP 88032-005, Brasil.
                <br />
                E-mail: <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
                <br />
                Telefone: +55 (48) 99824-6863
              </>
            }
            en={
              <>
                <strong style={strong}>Orbit Gestão</strong> — FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA
                <br />
                CNPJ: 65.167.064/0001-27
                <br />
                Rodovia Jose Carlos Daux, 5500, Conj. 306, Saco Grande, Florianópolis, SC, CEP 88032-005, Brazil.
                <br />
                E-mail: <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
                <br />
                Telephone: +55 (48) 99824-6863
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="10.1. Dados inseridos pelos clientes" en="10.1. Data entered by customers" />
          <I18n
            style={p}
            pt="Empresas clientes, consultorias e parceiros poderão inserir dados relacionados aos seus próprios colaboradores, clientes, fornecedores ou demais pessoas. Nessas situações, a responsabilidade pelo fundamento jurídico para coleta e utilização dessas informações poderá pertencer ao cliente ou parceiro que determinou sua inserção na plataforma. A Orbit poderá atuar como operadora de dados em determinados tratamentos realizados em nome dos clientes, conforme previsto contratualmente e de acordo com a legislação aplicável."
            en="Customer companies, consultancies and partners may enter data relating to their own employees, customers, suppliers or other persons. In those situations, responsibility for the legal basis for collecting and using that information may lie with the customer or partner that determined its insertion into the platform. Orbit may act as a data processor for certain processing carried out on behalf of customers, as provided contractually and in accordance with applicable law."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="10.2. Ambientes white label" en="10.2. White-label environments" />
          <I18n
            style={p}
            pt="O Orbit permite que determinados clientes, consultorias ou canais disponibilizem a experiência da plataforma utilizando sua própria identidade visual. A utilização de uma marca diferente na interface não significa necessariamente que a infraestrutura tecnológica tenha sido desenvolvida ou operada pela marca apresentada ao usuário. Quando aplicável, a infraestrutura dos Serviços permanece sendo fornecida pela Orbit Gestão, operada por FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA, observadas as responsabilidades estabelecidas contratualmente entre as partes."
            en="Orbit allows certain customers, consultancies or channels to offer the platform experience using their own visual identity. Use of a different brand in the interface does not necessarily mean that the technology infrastructure was developed or operated by the brand shown to the user. Where applicable, the Services infrastructure continues to be provided by Orbit Gestão, operated by FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA, subject to the responsibilities established contractually among the parties."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="10.3. Crianças e adolescentes" en="10.3. Children and adolescents" />
          <I18n
            style={p}
            pt="Os Serviços Orbit são destinados principalmente a empresas, profissionais e organizações. Não direcionamos nossos serviços intencionalmente a crianças. Caso sejam tratados dados relacionados a crianças ou adolescentes dentro de ambientes empresariais, caberá às partes envolvidas observar as exigências legais aplicáveis."
            en="Orbit Services are intended primarily for companies, professionals and organizations. We do not intentionally direct our services to children. If data relating to children or adolescents are processed within business environments, the parties involved must observe the applicable legal requirements."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="11. Alterações nesta Política" en="11. Changes to This Policy" />
          <I18n
            style={p}
            pt="Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou na legislação. Notificaremos os usuários sobre alterações significativas via e-mail ou notificação na plataforma. A data da última atualização está no topo desta página."
            en="We may update this Privacy Policy periodically to reflect changes in our practices or in applicable law. We will notify users of material changes by e-mail or by notification on the platform. The date of the last update appears at the top of this page."
          />
        </section>

        <I18n
          as="p"
          style={{ color: '#484F58', fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: '1px solid #21262d', textAlign: 'center' }}
          pt="Orbit Gestão © 2026"
          en="Orbit Gestão © 2026"
        />
      </div>
    </div>
  );
}
