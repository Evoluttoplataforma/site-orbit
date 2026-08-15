// Documentos legais do Orbit Gestão / Auto Chat — a integração de WhatsApp via
// Meta Cloud API e Twilio.
//
// IMPORTANTE: estes NÃO substituem /politica-privacidade e /termos-de-servico, que
// cobrem a plataforma Orbit como um todo (Evoluum Tecnologia, LGPD, Google
// Workspace). São documentos de escopo específico, exigidos na submissão do app
// na Meta, que precisa de URL pública para política de privacidade e termos.
//
// Ficam como abas de /seguranca-ia por decisão de produto (nao criar pagina nova),
// com deep link: /seguranca-ia#termos e /seguranca-ia#privacidade.
//
// Tipografia espelha /politica-privacidade e /termos-de-servico (maxWidth 820 para
// medida de linha legivel em texto legal), mas em inline style, que e o paradigma
// desta pagina — ela foge do orbit.css de proposito.

// Os e-mails vão entre <!--email_off--> e <!--email_on-->: o Cloudflare tem
// "Email Address Obfuscation" ligado no domínio e reescreve mailto: como
// /cdn-cgi/l/email-protection, exibindo "[email protected]" para quem não executa
// JS. Numa política de privacidade isso esconde justamente o contato do DPO do
// rastreador da Meta, que é quem vai auditar esta página. O marcador desliga a
// ofuscação apenas nesse trecho.

import { i18nEl, i18nText } from '@/lib/i18n-html';

const wrap = 'max-width:820px;margin:0 auto;';
const h1 = 'font-size:clamp(1.7rem,4vw,2.4rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 10px;letter-spacing:-0.01em;';
const stamp = 'color:#8B949E;font-size:0.92rem;margin:0 0 8px;';
const scope = 'background:rgba(45,140,255,0.07);border:1px solid rgba(45,140,255,0.22);border-radius:12px;padding:16px 18px;margin:24px 0 40px;color:#C9D1D9;font-size:0.92rem;line-height:1.6;';
const h2 = 'font-size:1.15rem;font-weight:700;color:#fff;margin:0 0 12px;letter-spacing:-0.01em;';
const num = 'color:#ffba1a;margin-right:8px;';
const p = 'color:#C9D1D9;font-size:1rem;line-height:1.75;margin:0 0 14px;';
const ul = 'list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:10px;';
const li = 'position:relative;padding-left:26px;color:#C9D1D9;font-size:0.98rem;line-height:1.6;';
const bullet = '<span style="position:absolute;left:0;top:2px;color:#ffba1a;">•</span>';
const sec = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:26px 28px;margin:0 0 16px;';
const foot = 'margin:36px 0 0;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);color:#8B949E;font-size:0.92rem;line-height:1.7;';
const ol = 'margin:0 0 14px;padding-left:22px;color:#C9D1D9;font-size:0.98rem;line-height:1.7;display:flex;flex-direction:column;gap:8px;';
const optBadge = 'display:inline-flex;align-items:center;gap:8px;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);color:#ffba1a;font-size:11.5px;font-weight:800;padding:5px 12px;border-radius:100px;text-transform:uppercase;letter-spacing:0.8px;margin:0 0 14px;';
const link = 'color:#ffba1a;font-weight:700;text-decoration:none;';
const st = 'color:#fff;';

function heading(n: string, pt: string, en: string): string {
  return i18nEl('h2', `<span style="${num}">${n}</span>${pt}`, `<span style="${num}">${n}</span>${en}`, `style="${h2}"`);
}

function para(pt: string, en: string, extra = ''): string {
  return i18nEl('p', pt, en, `style="${p}${extra}"`);
}

function item(pt: string, en: string): string {
  return i18nEl('li', `${bullet}${pt}`, `${bullet}${en}`, `style="${li}"`);
}

/** Cabeçalho comum: título, data e a nota de escopo que diferencia dos documentos gerais. */
function docHead(titulo: string, tituloEn: string, data: string, dataEn: string, escopo: string, escopoEn: string): string {
  return `
            ${i18nEl('h1', titulo, tituloEn, `style="${h1}"`)}
            ${i18nEl('p', `Última atualização: ${data}`, `Last updated: ${dataEn}`, `style="${stamp}"`)}
            <div style="${scope}">
                <i class="fas fa-circle-info" style="color:#2D8CFF;margin-right:8px;"></i>${i18nText(escopo, escopoEn)}
            </div>`;
}

const ESCOPO_COMUM =
  'Este documento trata especificamente do <strong style="color:#fff;">Auto Chat</strong>, ' +
  'nossa integração de atendimento via WhatsApp Business (Meta Cloud API e Twilio). ' +
  'Para a plataforma Orbit como um todo, consulte os ' +
  `<a href="/termos-de-servico" style="${link}">Termos de Serviço</a> e a ` +
  `<a href="/politica-privacidade" style="${link}">Política de Privacidade</a> gerais.`;

const ESCOPO_COMUM_EN =
  'This document covers specifically <strong style="color:#fff;">Auto Chat</strong>, ' +
  'our customer-service integration via WhatsApp Business (Meta Cloud API and Twilio). ' +
  'For the Orbit platform as a whole, see the general ' +
  `<a href="/termos-de-servico" style="${link}">Terms of Service</a> and ` +
  `<a href="/politica-privacidade" style="${link}">Privacy Policy</a>.`;

// ─── TERMOS DE SERVIÇO ──────────────────────────────────────────────────────
export const termosHTML = `
        <div style="${wrap}">
${docHead('Termos de Serviço — Auto Chat', 'Terms of Service — Auto Chat', '05 de agosto de 2026', '5 August 2026', ESCOPO_COMUM, ESCOPO_COMUM_EN)}

            ${para(
              'Estes Termos de Serviço regem o uso do software e dos serviços prestados pela Orbit Gestão / Auto Chat. Ao conectar sua conta do WhatsApp Business ou utilizar nossa plataforma, você concorda integralmente com as condições abaixo.',
              'These Terms of Service govern use of the software and services provided by Orbit Gestão / Auto Chat. By connecting your WhatsApp Business account or using our platform, you fully agree to the conditions below.',
            )}

            <div style="${sec}">
                ${heading('01', 'Descrição dos serviços', 'Description of the services')}
                ${para(
                  `A Orbit Gestão / Auto Chat fornece uma plataforma SaaS de gestão comercial, automação e atendimento multicanal, utilizando integrações oficiais com a <strong style="${st}">Meta Cloud API (WhatsApp)</strong> e provedores de telecomunicações como a <strong style="${st}">Twilio</strong>.`,
                  `Orbit Gestão / Auto Chat provides a SaaS platform for commercial management, automation and multichannel customer service, using official integrations with the <strong style="${st}">Meta Cloud API (WhatsApp)</strong> and telecommunications providers such as <strong style="${st}">Twilio</strong>.`,
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('02', 'Cumprimento das políticas da Meta / WhatsApp', 'Compliance with Meta / WhatsApp policies')}
                ${para(
                  'O usuário compromete-se a utilizar a integração em estrita conformidade com as Políticas Comerciais da Meta e os Termos do WhatsApp Business. É expressamente proibido:',
                  'The user undertakes to use the integration in strict compliance with Meta’s Commerce Policies and the WhatsApp Business Terms. The following are expressly prohibited:',
                )}
                <ul style="${ul}margin-bottom:0;">
                    ${item('O envio de mensagens não solicitadas (SPAM) ou sem o consentimento prévio (<em>opt-in</em>) do destinatário.', 'Sending unsolicited messages (SPAM) or messages without the recipient’s prior consent (<em>opt-in</em>).')}
                    ${item('O uso da plataforma para a divulgação de conteúdos ilícitos, fraudulentos, preconceituosos, ofensivos ou que violem os direitos de terceiros.', 'Using the platform to disseminate unlawful, fraudulent, discriminatory or offensive content, or content that violates third-party rights.')}
                    ${item('Práticas de disparo massivo abusivo que violem os limites operacionais (<em>Messaging Tiers</em>) estabelecidos pela Meta.', 'Abusive mass-messaging practices that violate the operational limits (<em>Messaging Tiers</em>) set by Meta.')}
                </ul>
            </div>

            <div style="${sec}">
                ${heading('03', 'Isenção de responsabilidade por bloqueios', 'Disclaimer for blocks and suspensions')}
                ${para(
                  `A plataforma Orbit Gestão atua como fornecedora da tecnologia de software e ponte de integração. A responsabilidade pela qualidade do banco de dados de contatos e pelo conteúdo das mensagens é <strong style="${st}">exclusivamente do usuário final</strong>. A Orbit Gestão não se responsabiliza por eventuais suspensões, bloqueios de números ou restrições impostas pela Meta decorrentes da violação das regras de uso da API pelo usuário.`,
                  `The Orbit Gestão platform acts as the software-technology provider and integration bridge. Responsibility for the quality of the contact database and for message content is <strong style="${st}">exclusively the end user’s</strong>. Orbit Gestão is not liable for suspensions, number blocks or restrictions imposed by Meta as a result of the user’s violation of the API rules.`,
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('04', 'Cancelamento e desconexão de canais', 'Cancellation and channel disconnection')}
                ${para(
                  'O usuário pode desconectar sua conta do WhatsApp Business a qualquer momento através do painel da plataforma. A Orbit Gestão reserva-se o direito de suspender ou encerrar o acesso do usuário caso seja identificada violação grave destes Termos ou das políticas da Meta.',
                  'The user may disconnect their WhatsApp Business account at any time through the platform dashboard. Orbit Gestão reserves the right to suspend or terminate the user’s access if a serious violation of these Terms or of Meta’s policies is identified.',
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('05', 'Propriedade intelectual', 'Intellectual property')}
                ${para(
                  'Todo o código, marcas, interfaces e funcionalidades da plataforma são de propriedade exclusiva da Orbit Gestão. A concessão de acesso ao software não implica transferência de direitos de propriedade intelectual.',
                  'All code, trademarks, interfaces and features of the platform are the exclusive property of Orbit Gestão. Granting access to the software does not transfer intellectual-property rights.',
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('06', 'Foro e legislação aplicável', 'Venue and governing law')}
                ${para(
                  'Estes termos são regidos pelas leis da República Federativa do Brasil, em especial pelo Marco Civil da Internet (Lei nº 12.965/2014) e pelo Código Civil Brasileiro. Qualquer disputa será submetida ao foro da comarca da sede da empresa.',
                  'These terms are governed by the laws of the Federative Republic of Brazil, in particular the Brazilian Internet Civil Framework (Law No. 12,965/2014) and the Brazilian Civil Code. Any dispute will be submitted to the courts of the company’s headquarters district.',
                  'margin-bottom:0;',
                )}
            </div>

            ${i18nEl(
              'p',
              `Em caso de dúvidas sobre estes Termos, entre em contato pelo e-mail <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->.`,
              `If you have questions about these Terms, contact us at <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->.`,
              `style="${foot}"`,
            )}
        </div>`;

// ─── POLÍTICA DE PRIVACIDADE ────────────────────────────────────────────────
export const privacidadeHTML = `
        <div style="${wrap}">
${docHead('Política de Privacidade — Auto Chat', 'Privacy Policy — Auto Chat', '05 de agosto de 2026', '5 August 2026', ESCOPO_COMUM, ESCOPO_COMUM_EN)}

            ${para(
              'A Orbit Gestão / Auto Chat ("Nós", "Nosso" ou "Plataforma") está comprometida com a proteção da privacidade e dos dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações ao utilizar nossos serviços e integrações com a Meta Cloud API (WhatsApp Business) e Twilio.',
              'Orbit Gestão / Auto Chat ("We", "Our" or "Platform") is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, store and protect your information when you use our services and integrations with the Meta Cloud API (WhatsApp Business) and Twilio.',
            )}

            <div style="${sec}">
                ${heading('01', 'Informações que coletamos', 'Information we collect')}
                ${para(
                  'Para a prestação de nossos serviços de automação e gestão de atendimento via WhatsApp, coletamos as seguintes categorias de dados:',
                  'To provide our WhatsApp automation and customer-service management services, we collect the following categories of data:',
                )}
                <ul style="${ul}margin-bottom:0;">
                    ${item(`<strong style="${st}">Dados de cadastro:</strong> nome, endereço de e-mail, número de telefone e dados da empresa.`, `<strong style="${st}">Registration data:</strong> name, e-mail address, phone number and company data.`)}
                    ${item(`<strong style="${st}">Credenciais e tokens de integração:</strong> tokens de acesso concedidos via Meta SDK (OAuth), ID da Conta do WhatsApp Business (WABA ID), ID do Número de Telefone (Phone Number ID) e identificadores da Twilio.`, `<strong style="${st}">Credentials and integration tokens:</strong> access tokens granted via the Meta SDK (OAuth), WhatsApp Business Account ID (WABA ID), Phone Number ID and Twilio identifiers.`)}
                    ${item(`<strong style="${st}">Dados de comunicação e mensageria:</strong> conteúdo das mensagens enviadas e recebidas via integração do WhatsApp, metadados de envio, horários e status de entrega.`, `<strong style="${st}">Communication and messaging data:</strong> content of messages sent and received via the WhatsApp integration, send metadata, timestamps and delivery status.`)}
                </ul>
            </div>

            <div style="${sec}">
                ${heading('02', 'Finalidade do tratamento de dados', 'Purpose of processing')}
                ${para('Os dados coletados são utilizados exclusivamente para:', 'The data collected are used exclusively to:')}
                <ul style="${ul}margin-bottom:0;">
                    ${item('Viabilizar a conexão técnica entre a sua conta e a infraestrutura oficial do WhatsApp Cloud API.', 'Enable the technical connection between your account and the official WhatsApp Cloud API infrastructure.')}
                    ${item('Permitir o envio, recebimento, gestão e automação de mensagens pelo painel da plataforma.', 'Allow sending, receiving, managing and automating messages through the platform dashboard.')}
                    ${item('Prestar suporte técnico e operacional ao usuário.', 'Provide technical and operational support to the user.')}
                    ${item('Garantir a segurança, auditoria e prevenção contra fraudes na utilização de nossos sistemas.', 'Ensure security, audit and fraud prevention in the use of our systems.')}
                </ul>
            </div>

            <div style="${sec}">
                ${heading('03', 'Compartilhamento de dados com terceiros', 'Sharing data with third parties')}
                ${para(
                  `A Orbit Gestão <strong style="${st}">não vende, aluga ou comercializa</strong> dados pessoais de seus usuários com terceiros para fins publicitários. Os dados são compartilhados estritamente com os provedores de infraestrutura necessários para a operação do serviço:`,
                  `Orbit Gestão <strong style="${st}">does not sell, rent or commercialize</strong> users’ personal data to third parties for advertising. Data are shared strictly with the infrastructure providers required to operate the service:`,
                )}
                <ul style="${ul}margin-bottom:0;">
                    ${item(`<strong style="${st}">Meta Platforms, Inc.</strong> — provedor da API oficial do WhatsApp Business.`, `<strong style="${st}">Meta Platforms, Inc.</strong> — provider of the official WhatsApp Business API.`)}
                    ${item(`<strong style="${st}">Twilio Inc.</strong> — provedor de serviços de telecomunicações e verificação de linhas.`, `<strong style="${st}">Twilio Inc.</strong> — telecommunications and line-verification provider.`)}
                </ul>
            </div>

            <div style="${sec}">
                ${heading('04', 'Armazenamento e segurança das informações', 'Storage and information security')}
                ${para(
                  `Adotamos medidas técnicas e organizacionais rigorosas para proteger seus dados, incluindo o uso de <strong style="${st}">criptografia no armazenamento de tokens de acesso</strong> e nas comunicações via HTTPS/TLS. Mantemos os dados armazenados apenas pelo período necessário para cumprir as finalidades descritas ou obrigações legais.`,
                  `We adopt strict technical and organizational measures to protect your data, including <strong style="${st}">encryption of stored access tokens</strong> and of communications over HTTPS/TLS. We keep data stored only for as long as needed to fulfill the purposes described or legal obligations.`,
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('05', 'Direitos do titular e exclusão de dados', 'Data-subject rights and data deletion')}
                ${para(
                  'Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e as diretrizes da Meta, você possui o direito de:',
                  'In accordance with the Brazilian General Data Protection Law (LGPD) and Meta’s guidelines, you have the right to:',
                )}
                <ul style="${ul}margin-bottom:0;">
                    ${item('Acessar, corrigir ou atualizar seus dados pessoais.', 'Access, correct or update your personal data.')}
                    ${item('Revogar a autorização de acesso ao seu WhatsApp Business a qualquer momento, pelo seu painel na Meta ou no nosso sistema.', 'Revoke authorization to access your WhatsApp Business at any time, through your Meta dashboard or our system.')}
                    ${item('Solicitar a exclusão definitiva de seus dados e credenciais de nossos servidores.', 'Request permanent deletion of your data and credentials from our servers.')}
                </ul>
            </div>

            ${i18nEl(
              'p',
              `Para solicitar a exclusão de dados ou tirar dúvidas sobre esta política, entre em contato com nosso Encarregado de Proteção de Dados (DPO) pelo e-mail <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->. Para o passo a passo de remoção, veja <a href="#exclusao-dados" data-sia-goto="exclusao" style="${link}">Exclusão de Dados</a>.`,
              `To request data deletion or ask questions about this policy, contact our Data Protection Officer (DPO) at <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->. For the removal steps, see <a href="#exclusao-dados" data-sia-goto="exclusao" style="${link}">Data Deletion</a>.`,
              `style="${foot}"`,
            )}
        </div>`;

// ─── INSTRUÇÕES PARA EXCLUSÃO DE DADOS ──────────────────────────────────────
// Campo obrigatório na submissão da Meta ("Data Deletion Instructions URL").
// URL: /seguranca-ia#exclusao-dados
//
// O documento de origem trazia igor@orbitgestao.com.br, divergindo do suporte@ usado
// nos outros dois. Unificado em suporte@orbitgestao.com.br por decisão do time
// (05/08/2026): caixa compartilhada não depende de uma pessoa estar disponível, e a
// mesma página não pode indicar dois endereços para o mesmo cargo de DPO.
//
// ⚠️ A caixa suporte@orbitgestao.com.br PRECISA existir e ser monitorada. Este é o
// canal de exclusão de dados declarado à Meta — se ele devolver erro, é pior do que
// um endereço errado: reprova a submissão e deixa o canal de DPO inacessível para
// efeito de LGPD.
export const exclusaoHTML = `
        <div style="${wrap}">
${docHead(
  'Instruções para Exclusão de Dados',
  'Data Deletion Instructions',
  '05 de agosto de 2026',
  '5 August 2026',
  'Este documento explica como remover seus dados do <strong style="color:#fff;">Auto Chat</strong>, nossa integração de atendimento via WhatsApp Business e Facebook. Veja também a <a href="#privacidade" data-sia-goto="privacidade" style="' +
    link +
    '">Política de Privacidade</a> do Auto Chat.',
  'This document explains how to remove your data from <strong style="color:#fff;">Auto Chat</strong>, our customer-service integration via WhatsApp Business and Facebook. See also the Auto Chat <a href="#privacidade" data-sia-goto="privacidade" style="' +
    link +
    '">Privacy Policy</a>.',
)}

            ${para(
              'A Orbit Gestão / Auto Chat valoriza a privacidade dos seus usuários e cumpre rigorosamente as diretrizes da LGPD (Lei Geral de Proteção de Dados) e as políticas da Meta.',
              'Orbit Gestão / Auto Chat values its users’ privacy and strictly follows the LGPD (Brazilian General Data Protection Law) and Meta’s policies.',
            )}
            ${para(
              `Se você conectou sua conta do WhatsApp Business ou perfil do Facebook à nossa plataforma e deseja remover seus dados, siga <strong style="${st}">uma</strong> das opções abaixo:`,
              `If you connected your WhatsApp Business account or Facebook profile to our platform and want to remove your data, follow <strong style="${st}">one</strong> of the options below:`,
            )}

            <div style="${sec}">
                <span style="${optBadge}"><i class="fas fa-sliders"></i>${i18nText('Opção 1 — pelo painel', 'Option 1 — from the dashboard')}</span>
                ${i18nEl('h2', 'Exclusão automática pelo painel da plataforma', 'Automatic deletion from the platform dashboard', `style="${h2}"`)}
                <ol style="${ol}">
                    ${i18nEl('li', 'Faça login na sua conta no painel da Orbit Gestão (<a href="https://app.orbitgestao.com.br" target="_blank" rel="noopener" style="' + link + '">app.orbitgestao.com.br</a>).', 'Sign in to your Orbit Gestão dashboard account (<a href="https://app.orbitgestao.com.br" target="_blank" rel="noopener" style="' + link + '">app.orbitgestao.com.br</a>).')}
                    ${i18nEl('li', 'Acesse o menu <strong style="' + st + '">Configurações &gt; Integrações &gt; WhatsApp SDR</strong>.', 'Open the menu <strong style="' + st + '">Settings &gt; Integrations &gt; WhatsApp SDR</strong>.')}
                    ${i18nEl('li', 'Clique no botão <strong style="' + st + '">Desconectar Canal</strong> ou <strong style="' + st + '">Cancelar / Abandonar Setup</strong>.', 'Click <strong style="' + st + '">Disconnect Channel</strong> or <strong style="' + st + '">Cancel / Abandon Setup</strong>.')}
                    ${i18nEl('li', 'Confirme a desconexão.', 'Confirm the disconnection.')}
                </ol>
                ${para(
                  `Todos os tokens de acesso (<code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;font-size:0.9em;">system_user_access_token</code>), WABA IDs e identificadores salvos serão revogados e <strong style="${st}">excluídos imediatamente</strong> dos nossos servidores de banco de dados.`,
                  `All access tokens (<code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;font-size:0.9em;">system_user_access_token</code>), WABA IDs and stored identifiers will be revoked and <strong style="${st}">deleted immediately</strong> from our database servers.`,
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                <span style="${optBadge}"><i class="fab fa-facebook"></i>${i18nText('Opção 2 — pelo Facebook', 'Option 2 — from Facebook')}</span>
                ${i18nEl('h2', 'Revogação de permissões via Facebook', 'Revoking permissions via Facebook', `style="${h2}"`)}
                ${para(
                  'Você também pode remover o acesso da nossa aplicação diretamente pelas configurações da sua conta do Facebook:',
                  'You can also remove our application’s access directly from your Facebook account settings:',
                )}
                <ol style="${ol}">
                    ${i18nEl('li', 'Acesse o seu perfil no Facebook e vá em <strong style="' + st + '">Configurações e Privacidade &gt; Configurações</strong>.', 'Open your Facebook profile and go to <strong style="' + st + '">Settings &amp; privacy &gt; Settings</strong>.')}
                    ${i18nEl('li', 'No menu lateral, clique em <strong style="' + st + '">Integrações de Negócios</strong> ou <strong style="' + st + '">Aplicativos e Sites</strong>.', 'In the side menu, click <strong style="' + st + '">Business integrations</strong> or <strong style="' + st + '">Apps and websites</strong>.')}
                    ${i18nEl('li', 'Procure pelo aplicativo <strong style="' + st + '">Auto Chat</strong> ou <strong style="' + st + '">Orbit Gestão</strong>.', 'Look for the <strong style="' + st + '">Auto Chat</strong> or <strong style="' + st + '">Orbit Gestão</strong> app.')}
                    ${i18nEl('li', 'Clique em <strong style="' + st + '">Remover</strong> para revogar todo e qualquer acesso da plataforma às suas informações.', 'Click <strong style="' + st + '">Remove</strong> to revoke any and all platform access to your information.')}
                </ol>
                ${para(
                  `Após o recebimento da notificação de exclusão enviada pela Meta, nosso servidor processará o apagamento definitivo dos metadados associados à sua conta <strong style="${st}">em até 48 horas</strong>.`,
                  `After receiving the deletion notification sent by Meta, our server will permanently erase the metadata associated with your account <strong style="${st}">within 48 hours</strong>.`,
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                <span style="${optBadge}"><i class="fas fa-envelope"></i>${i18nText('Opção 3 — pelo DPO', 'Option 3 — via the DPO')}</span>
                ${i18nEl('h2', 'Solicitação direta via suporte / DPO', 'Direct request via support / DPO', `style="${h2}"`)}
                ${para(
                  'Caso deseje solicitar a exclusão total da sua conta e do histórico de dados em nossos bancos de dados, envie um e-mail para o nosso Encarregado de Proteção de Dados:',
                  'If you want to request full deletion of your account and data history from our databases, e-mail our Data Protection Officer:',
                )}
                <ul style="${ul}">
                    ${item(`<strong style="${st}">E-mail:</strong> <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->`, `<strong style="${st}">E-mail:</strong> <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->`)}
                    ${item(`<strong style="${st}">Assunto:</strong> "Solicitação de Exclusão de Dados - [Nome da sua Empresa]"`, `<strong style="${st}">Subject:</strong> "Data Deletion Request - [Your Company Name]"`)}
                    ${item(`<strong style="${st}">Informações necessárias:</strong> e-mail de cadastro na plataforma e número do WhatsApp associado.`, `<strong style="${st}">Required information:</strong> the e-mail registered on the platform and the associated WhatsApp number.`)}
                </ul>
                ${para(
                  `Após a validação da solicitação, responderemos <strong style="${st}">em até 5 dias úteis</strong> confirmando a eliminação definitiva de todos os seus dados armazenados em nossos sistemas.`,
                  `After validating the request, we will reply <strong style="${st}">within 5 business days</strong> confirming the permanent deletion of all your data stored in our systems.`,
                  'margin-bottom:0;',
                )}
            </div>
        </div>`;
