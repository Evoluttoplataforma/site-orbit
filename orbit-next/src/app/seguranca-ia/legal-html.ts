// Documentos legais do Orbit Gestão para apps Meta:
//   Auto Chat — WhatsApp via Meta Cloud API e Twilio
//   Auto Ads  — Marketing API (Facebook e Instagram Ads)
//
// IMPORTANTE: estes NÃO substituem /politica-privacidade e /termos-de-servico, que
// cobrem a plataforma Orbit como um todo (Evoluum Tecnologia, LGPD, Google
// Workspace). São documentos de escopo específico, exigidos na submissão do app
// na Meta, que precisa de URL pública para política de privacidade e termos.
//
// Ficam como abas de /seguranca-ia por decisão de produto (nao criar pagina nova).
// Deep links Auto Chat: /seguranca-ia#termos, #privacidade, #exclusao-dados
// Deep links Auto Ads:  /seguranca-ia#termos-auto-ads, #privacidade-auto-ads,
//                       #exclusao-auto-ads (campo "User data deletion" na Meta).
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

function subh(pt: string, en: string): string {
  return i18nEl(
    'h3',
    pt,
    en,
    `style="font-size:0.98rem;font-weight:700;color:#fff;margin:18px 0 10px;letter-spacing:-0.01em;"`,
  );
}

const sep = '<div style="height:1px;background:rgba(255,255,255,0.08);margin:56px 0 48px;"></div>';

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

// ─── AUTO ADS (Meta Marketing API) ──────────────────────────────────────────
// Uma aba só: termos + privacidade + exclusão, no mesmo padrão visual do Auto Chat.
// A Meta exige heading visível "Política de Privacidade — Auto Ads" e URL pública
// HTTP 200 (https://orbitgestao.com.br/seguranca-ia). Exclusão: #exclusao-auto-ads.
//
// Privacy Policy URL:     https://orbitgestao.com.br/seguranca-ia
// User data deletion:     https://orbitgestao.com.br/seguranca-ia#exclusao-auto-ads
// Data deletion callback: Edge Function meta-data-deletion (não exibir a URL da API aqui)

const ESCOPO_ADS =
  'Este documento trata especificamente do <strong style="color:#fff;">Auto Ads</strong>, ' +
  'a integração da Orbit Gestão com a Marketing API da Meta (Facebook e Instagram Ads), ' +
  'disponível em Mercado → Anúncios. Para a plataforma Orbit como um todo, consulte os ' +
  `<a href="/termos-de-servico" style="${link}">Termos de Serviço</a> e a ` +
  `<a href="/politica-privacidade" style="${link}">Política de Privacidade</a> gerais. ` +
  'Para WhatsApp / Auto Chat, consulte os ' +
  `<a href="#termos" data-sia-goto="termos" style="${link}">documentos específicos</a> nesta mesma página.`;

const ESCOPO_ADS_EN =
  'This document covers specifically <strong style="color:#fff;">Auto Ads</strong>, ' +
  'Orbit Gestão’s integration with Meta’s Marketing API (Facebook and Instagram Ads), ' +
  'available under Market → Ads. For the Orbit platform as a whole, see the general ' +
  `<a href="/termos-de-servico" style="${link}">Terms of Service</a> and ` +
  `<a href="/politica-privacidade" style="${link}">Privacy Policy</a>. ` +
  'For WhatsApp / Auto Chat, see the ' +
  `<a href="#termos" data-sia-goto="termos" style="${link}">specific documents</a> on this same page.`;

const ESCOPO_ADS_PRIV =
  'Este documento é a política de privacidade do aplicativo Meta <strong style="color:#fff;">“Auto Ads”</strong>, ' +
  'operado pela Orbit Gestão. Descreve quais informações coletamos via Facebook Login for Business e Marketing API, ' +
  'para que as usamos, com quem as compartilhamos e como solicitar a exclusão. Não é a política de privacidade da Meta. ' +
  `Para a plataforma Orbit em geral, consulte a <a href="/politica-privacidade" style="${link}">Política de Privacidade</a> geral. ` +
  `Para WhatsApp, consulte a <a href="#privacidade" data-sia-goto="privacidade" style="${link}">Política de Privacidade — Auto Chat</a> nesta mesma página.`;

const ESCOPO_ADS_PRIV_EN =
  'This document is the privacy policy of the Meta application <strong style="color:#fff;">“Auto Ads”</strong>, ' +
  'operated by Orbit Gestão. It describes what information we collect via Facebook Login for Business and the Marketing API, ' +
  'why we use it, with whom we share it, and how to request deletion. It is not Meta’s privacy policy. ' +
  `For the Orbit platform as a whole, see the general <a href="/politica-privacidade" style="${link}">Privacy Policy</a>. ` +
  `For WhatsApp, see <a href="#privacidade" data-sia-goto="privacidade" style="${link}">Privacy Policy — Auto Chat</a> on this same page.`;

function adsToc(): string {
  const items: { href: string; pt: string; en: string }[] = [
    { href: '#termos-auto-ads', pt: 'Termos de Serviço', en: 'Terms of Service' },
    { href: '#privacidade-auto-ads', pt: 'Política de Privacidade', en: 'Privacy Policy' },
    { href: '#exclusao-auto-ads', pt: 'Exclusão de Dados', en: 'Data Deletion' },
  ];
  return `<nav aria-label="Documentos Auto Ads / Auto Ads documents" style="display:flex;gap:10px;flex-wrap:wrap;margin:0 0 44px;">
                ${items
                  .map(
                    (it) =>
                      `<a class="sia-toc-card" href="${it.href}" style="flex:1;min-width:160px;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px 16px;color:#C9D1D9;font-size:0.92rem;font-weight:700;">${i18nText(it.pt, it.en)}</a>`,
                  )
                  .join('\n                ')}
            </nav>`;
}

export const autoAdsHTML = `
        <div style="${wrap}">
            ${adsToc()}
        </div>

        <div id="termos-auto-ads" style="${wrap}">
${docHead('Termos de Serviço — Auto Ads', 'Terms of Service — Auto Ads', '19 de agosto de 2026', '19 August 2026', ESCOPO_ADS, ESCOPO_ADS_EN)}

            ${para(
              'Estes Termos regem o uso do Auto Ads. Ao clicar em <em>Conectar</em> no modal Contas de anúncios ou ao publicar um criativo no Meta, você concorda com as condições abaixo.',
              'These Terms govern use of Auto Ads. By clicking <em>Connect</em> in the Ad accounts dialog or by publishing a creative to Meta, you agree to the conditions below.',
            )}

            <div style="${sec}">
                ${heading('01', 'Descrição dos serviços', 'Description of the services')}
                ${para(
                  'O Auto Ads permite que a organização cliente, na plataforma Orbit (<a href="https://app.orbitgestao.com.br" target="_blank" rel="noopener" style="' +
                    link +
                    '">app.orbitgestao.com.br</a>):',
                  'Auto Ads lets the customer organization, on the Orbit platform (<a href="https://app.orbitgestao.com.br" target="_blank" rel="noopener" style="' +
                    link +
                    '">app.orbitgestao.com.br</a>):',
                )}
                <ul style="${ul}">
                    ${item('conecte, uma vez, a conta de anúncios, a Página e o Instagram Business da organização, via <em>Facebook Login for Business</em>;', 'connect, once, the organization’s ad account, Page and Instagram Business account via <em>Facebook Login for Business</em>;')}
                    ${item('publique ou agende criativos (imagem ou carrossel) na Marketing API, em regra <em>pausados</em>;', 'publish or schedule creatives (image or carousel) through the Marketing API, typically <em>paused</em>;')}
                    ${item('consulte o status da publicação e pause/ative anúncios já criados.', 'read publication status and pause/activate ads already created.')}
                </ul>
                ${para(
                  'Não faz parte deste app: post orgânico no feed da Página ou do Instagram, mensagens diretas, catálogo de produtos, WhatsApp, nem o servidor MCP de anúncios da Meta.',
                  'This app does <em>not</em> include: organic posts on the Page or Instagram feed, direct messages, product catalog, WhatsApp, or Meta’s ads MCP server.',
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('02', 'Cumprimento das políticas da Meta', 'Compliance with Meta policies')}
                ${para(
                  'O usuário compromete-se a usar a integração em conformidade com os Termos da Plataforma da Meta, as Políticas Comerciais, as Políticas de Publicidade e as regras da Marketing API. É expressamente proibido:',
                  'The user undertakes to use the integration in compliance with Meta Platform Terms, Commerce Policies, Advertising Policies and Marketing API rules. The following are expressly prohibited:',
                )}
                <ul style="${ul}margin-bottom:0;">
                    ${item('publicar conteúdo ilícito, enganoso, discriminatório ou que viole direitos de terceiros;', 'publishing unlawful, misleading or discriminatory content, or content that violates third-party rights;')}
                    ${item('usar a conexão para anunciar em contas, Páginas ou Instagram que o usuário não esteja autorizado a gerir;', 'using the connection to advertise on ad accounts, Pages or Instagram accounts the user is not authorized to manage;')}
                    ${item('contornar limites, sandboxes ou restrições de acesso da Meta.', 'circumventing Meta limits, sandboxes or access restrictions.')}
                </ul>
            </div>

            <div style="${sec}">
                ${heading('03', 'Isenção', 'Disclaimer')}
                ${para(
                  `A Orbit Gestão fornece o software e a ponte com a Graph API. A responsabilidade pelo conteúdo do anúncio, destino (landing page), orçamento, categorias especiais, pagamento da conta de anúncios e cumprimento das políticas da Meta é <strong style="${st}">do usuário / da organização cliente</strong>. A Orbit não se responsabiliza por rejeição de anúncio, suspensão de conta ou cobrança no Ads Manager decorrentes do uso da API pelo cliente.`,
                  `Orbit Gestão provides the software and the Graph API bridge. Responsibility for ad content, destination (landing page), budget, special ad categories, ad-account billing and compliance with Meta policies is <strong style="${st}">the user’s / customer organization’s</strong>. Orbit is not liable for ad rejection, account suspension or Ads Manager charges arising from the customer’s use of the API.`,
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('04', 'Cancelamento e desconexão', 'Cancellation and disconnection')}
                ${para(
                  'O usuário pode desconectar o Meta a qualquer momento em <em>Mercado → Anúncios → Contas de anúncios</em>. A Orbit pode suspender a integração se houver violação grave destes Termos ou das políticas da Meta.',
                  'The user may disconnect Meta at any time under <em>Market → Ads → Ad accounts</em>. Orbit may suspend the integration if there is a serious violation of these Terms or of Meta’s policies.',
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('05', 'Propriedade intelectual', 'Intellectual property')}
                ${para(
                  'Código, marcas e interfaces da Orbit permanecem da Orbit Gestão. Criativos, textos e mídias que o cliente envia à Meta continuam do cliente (ou de quem detém os direitos). IDs de campanha/anúncio gerados pela Meta pertencem ao ecossistema Meta, associados à conta de anúncios do cliente.',
                  'Orbit code, trademarks and interfaces remain Orbit Gestão’s. Creatives, copy and media the customer sends to Meta remain the customer’s (or the rights holder’s). Campaign/ad IDs generated by Meta belong to the Meta ecosystem, tied to the customer’s ad account.',
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('06', 'Foro e legislação', 'Venue and governing law')}
                ${para(
                  'Leis da República Federativa do Brasil, inclusive LGPD (Lei nº 13.709/2018) e Marco Civil da Internet (Lei nº 12.965/2014). Foro da comarca da sede da Orbit Gestão.',
                  'Laws of the Federative Republic of Brazil, including the LGPD (Law No. 13,709/2018) and the Brazilian Internet Civil Framework (Law No. 12,965/2014). Courts of Orbit Gestão’s headquarters district.',
                  'margin-bottom:0;',
                )}
            </div>

            ${i18nEl(
              'p',
              `Dúvidas: <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->.`,
              `Questions: <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->.`,
              `style="${foot}"`,
            )}
        </div>

        ${sep}

        <div id="privacidade-auto-ads" style="${wrap}">
${docHead('Política de Privacidade — Auto Ads', 'Privacy Policy — Auto Ads', '19 de agosto de 2026', '19 August 2026', ESCOPO_ADS_PRIV, ESCOPO_ADS_PRIV_EN)}

            ${para(
              `A organização cliente é, em regra, a <strong style="${st}">controladora</strong> dos dados de marketing que trata na Orbit. A Orbit Gestão atua como <strong style="${st}">operadora</strong> (LGPD) para executar o contrato SaaS. A Meta Platforms, Inc. trata dados conforme os próprios termos quando você autoriza o Login e quando anúncios são criados na sua conta.`,
              `The customer organization is, as a rule, the <strong style="${st}">controller</strong> of the marketing data it processes in Orbit. Orbit Gestão acts as <strong style="${st}">processor</strong> (LGPD) to perform the SaaS contract. Meta Platforms, Inc. processes data under its own terms when you authorize Login and when ads are created in your account.`,
            )}

            <div style="${sec}">
                ${heading('01', 'Informações que coletamos', 'Information we collect')}
                ${para(
                  'Coletamos apenas o necessário para conectar a organização e publicar/gerir anúncios <em>a pedido do usuário autenticado na Orbit</em>:',
                  'We collect only what is required to connect the organization and publish/manage ads <em>at the request of the user signed in to Orbit</em>:',
                )}
                ${subh('Dados de quem autoriza (Facebook Login for Business)', 'Data of the person who authorizes (Facebook Login for Business)')}
                <ul style="${ul}">
                    ${item('identificador do usuário Facebook (user_id);', 'Facebook user identifier (user_id);')}
                    ${item('nome público associado à conta (public_profile);', 'public name associated with the account (public_profile);')}
                    ${item('lista de Páginas que o usuário gerencia (pages_show_list);', 'list of Pages the user manages (pages_show_list);')}
                    ${item('dados de engajamento da Página na medida em que a API os devolve para validar o ativo (pages_read_engagement);', 'Page engagement data to the extent the API returns it to validate the asset (pages_read_engagement);')}
                    ${item('Instagram Business vinculado à Página escolhida (instagram_basic: id e username);', 'Instagram Business account linked to the chosen Page (instagram_basic: id and username);')}
                    ${item('negócios / portfólio de negócios visíveis ao usuário (business_management);', 'businesses / business portfolios visible to the user (business_management);')}
                    ${item('contas de anúncios visíveis (ads_read);', 'visible ad accounts (ads_read);')}
                    ${item('permissões concedidas (escopos) e data da conexão.', 'granted permissions (scopes) and connection date.')}
                </ul>
                ${subh('Credenciais e ativos escolhidos pela organização', 'Credentials and assets chosen by the organization')}
                <ul style="${ul}">
                    ${item('token de acesso (system-user ou de usuário) emitido pela Meta — armazenado só no servidor, <em>nunca</em> no navegador;', 'access token (system-user or user) issued by Meta — stored only on the server, <em>never</em> in the browser;')}
                    ${item('ID e nome da conta de anúncios selecionada;', 'ID and name of the selected ad account;')}
                    ${item('ID e nome da Página selecionada;', 'ID and name of the selected Page;')}
                    ${item('ID e username do Instagram Business, se houver;', 'Instagram Business ID and username, if any;')}
                    ${item('identificador do negócio cliente, quando a Meta o envia;', 'client-business identifier, when Meta sends it;')}
                    ${item('status da conexão (ativa, expirada, desconectada, erro).', 'connection status (active, expired, disconnected, error).')}
                </ul>
                ${subh('Dados de publicação (quando o usuário publica ou agenda um criativo)', 'Publication data (when the user publishes or schedules a creative)')}
                <ul style="${ul}">
                    ${item('textos e mídias do criativo já existentes na Orbit (título, copy, imagens do anúncio);', 'copy and media of the creative already stored in Orbit (title, body, ad images);')}
                    ${item('URL de destino (landing page Orbit ou URL informada);', 'destination URL (Orbit landing page or a URL the user provides);')}
                    ${item('objetivo (tráfego), orçamento diário, data/hora de agendamento, status (pausado, agendado, ativo);', 'objective (traffic), daily budget, schedule timestamp, status (paused, scheduled, active);')}
                    ${item('IDs devolvidos pela Meta (campanha, conjunto, criativo, anúncio).', 'IDs returned by Meta (campaign, ad set, creative, ad).')}
                </ul>
                ${subh('O que este app não coleta', 'What this app does not collect')}
                <ul style="${ul}">
                    ${item('conteúdo do feed pessoal do Facebook;', 'content from the user’s personal Facebook feed;')}
                    ${item('lista de amigos;', 'friends lists;')}
                    ${item('mensagens do Instagram ou do Messenger;', 'Instagram or Messenger messages;')}
                    ${item('catálogo de produtos / Pixel, salvo se uma versão futura for contratada e esta política for atualizada;', 'product catalog / Pixel, unless a future version is contracted and this policy is updated;')}
                    ${item('dados de contas de anúncios de terceiros sem autorização do Login for Business.', 'data from third-party ad accounts without Login for Business authorization.')}
                </ul>
                ${para(
                  'Dados de cadastro da Orbit (e-mail, organização, papel) já existem na conta SaaS e seguem a Política de Privacidade geral da plataforma.',
                  'Orbit account data (e-mail, organization, role) already exist on the SaaS account and follow the platform’s general Privacy Policy.',
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('02', 'Como processamos e para que finalidade', 'How we process data and for what purpose')}
                ${para('Usamos essas informações <em>exclusivamente</em> para:', 'We use this information <em>exclusively</em> to:')}
                <ul style="${ul}">
                    ${item('estabelecer e manter a conexão técnica da organização com a Marketing API;', 'establish and maintain the technical connection of the organization with the Marketing API;')}
                    ${item('mostrar no painel qual conta, Página e Instagram estão vinculados;', 'show in the dashboard which ad account, Page and Instagram are linked;')}
                    ${item('criar, pausar, ativar ou agendar anúncios <em>somente quando o usuário dispara a ação</em> na Orbit;', 'create, pause, activate or schedule ads <em>only when the user triggers the action</em> in Orbit;')}
                    ${item('gravar o status da publicação e o link para o Ads Manager;', 'record publication status and the link to Ads Manager;')}
                    ${item('sincronizar status já existentes (job de sincronização), sem criar campanha nova por conta própria;', 'sync already existing statuses (sync job), without creating a new campaign on its own;')}
                    ${item('prestar suporte técnico à organização;', 'provide technical support to the organization;')}
                    ${item('segurança, auditoria, prevenção a abuso e cumprimento de obrigação legal.', 'security, audit, abuse prevention and compliance with a legal duty.')}
                </ul>
                ${para(
                  'Não usamos dados do Auto Ads para anunciar a Orbit para o usuário, para treinar modelos de IA da Orbit ou de terceiros, nem para vender listas. O conteúdo do cliente <em>não</em> é usado para treinar modelos (cláusula 6.6 dos Termos da plataforma).',
                  'We do not use Auto Ads data to advertise Orbit to the user, to train Orbit or third-party AI models, or to sell lists. Customer content is <em>not</em> used to train models (clause 6.6 of the platform Terms).',
                )}
                ${para(
                  'Base legal (LGPD): execução de contrato (prestação do SaaS) e, no Login, o consentimento dado na tela da Meta. A organização cliente, como controladora, é responsável por ter base legal perante os titulares que eventualmente apareçam em criativos ou páginas de destino.',
                  'Legal basis (LGPD): performance of contract (SaaS) and, at Login, consent given on Meta’s screen. The customer organization, as controller, is responsible for having a legal basis towards data subjects who may appear in creatives or landing pages.',
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('03', 'Compartilhamento com terceiros', 'Sharing with third parties')}
                ${para(
                  `A Orbit Gestão <strong style="${st}">não vende, aluga ou comercializa</strong> esses dados para publicidade de terceiros.`,
                  `Orbit Gestão <strong style="${st}">does not sell, rent or commercialize</strong> this data for third-party advertising.`,
                )}
                ${para('Compartilhamento estritamente operacional:', 'Operational sharing only:')}
                <ul style="${ul}">
                    ${item('<strong style="' + st + '">Meta Platforms, Inc.</strong> — Login for Business e Marketing API (criação e gestão de anúncios na conta que você escolheu). Tratamento nos Estados Unidos, segundo os termos da Meta.', '<strong style="' + st + '">Meta Platforms, Inc.</strong> — Login for Business and Marketing API (creating and managing ads in the account you chose). Processing in the United States, under Meta’s terms.')}
                    ${item('<strong style="' + st + '">Supabase / AWS (sa-east-1, São Paulo)</strong> — banco e funções onde o token e os metadados da conexão ficam armazenados.', '<strong style="' + st + '">Supabase / AWS (sa-east-1, São Paulo)</strong> — database and functions where the token and connection metadata are stored.')}
                    ${item('<strong style="' + st + '">Canal (consultoria white-label)</strong>, se a organização acessa a Orbit via Canal, somente nos limites dos Termos v3.0 (configuração e suporte — sem exportar ou revender).', '<strong style="' + st + '">Channel (white-label consultancy)</strong>, if the organization accesses Orbit via Channel, only within the limits of Terms v3.0 (configuration and support — no export or resale).')}
                </ul>
                ${para(
                  'Não enviamos o token de acesso ao navegador. Chamadas à Graph API saem das Edge Functions da Orbit.',
                  'We do not send the access token to the browser. Graph API calls originate from Orbit Edge Functions.',
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                ${heading('04', 'Armazenamento, segurança e retenção', 'Storage, security and retention')}
                <ul style="${ul}margin-bottom:0;">
                    ${item('Produção no Brasil (AWS São Paulo, sa-east-1), com TLS em trânsito.', 'Production in Brazil (AWS São Paulo, sa-east-1), with TLS in transit.')}
                    ${item('Token e identificadores da conexão ficam na tabela da organização, isolados por RLS; acesso de escrita pelo backend autenticado.', 'The token and connection identifiers sit in the organization table, isolated by RLS; writes go through the authenticated backend.')}
                    ${item('Retenção: enquanto a conexão estiver ativa e o contrato da organização vigorar. Após desconexão, o token é anulado imediatamente. Metadados de publicação (IDs de campanha na Meta) podem permanecer para histórico do criativo na Orbit até exclusão da organização ou pedido de apagamento.', 'Retention: while the connection is active and the organization contract is in force. After disconnect, the token is cleared immediately. Publication metadata (Meta campaign IDs) may remain for creative history in Orbit until the organization is deleted or an erasure request is made.')}
                    ${item('Após encerramento da conta Orbit: 30 dias só leitura + 60 dias arquivo, depois eliminação ou anonimização, salvo obrigação legal (Termos v3.0, cláusula 15.3).', 'After Orbit account termination: 30 days read-only + 60 days archive, then deletion or anonymization, unless a legal duty applies (Terms v3.0, clause 15.3).')}
                    ${item('Campanhas e anúncios <em>já criados na Meta</em> continuam na conta de anúncios do cliente até o cliente apagá-los no Ads Manager. Desconectar o Auto Ads não apaga sozinho o histórico no Ads Manager.', 'Campaigns and ads <em>already created on Meta</em> remain in the customer’s ad account until the customer deletes them in Ads Manager. Disconnecting Auto Ads does not by itself delete Ads Manager history.')}
                </ul>
            </div>

            <div style="${sec}">
                ${heading('05', 'Direitos do titular e exclusão de dados', 'Data-subject rights and data deletion')}
                ${para(
                  `Em conformidade com a LGPD e as <a href="https://developers.facebook.com/documentation/development/terms-and-policies/privacy-policy" target="_blank" rel="noopener noreferrer" style="${link}">expectativas de privacidade da Meta</a>, você pode:`,
                  `In accordance with the LGPD and <a href="https://developers.facebook.com/documentation/development/terms-and-policies/privacy-policy" target="_blank" rel="noopener noreferrer" style="${link}">Meta’s privacy-policy expectations</a>, you may:`,
                )}
                <ul style="${ul}">
                    ${item('acessar, corrigir ou atualizar dados da conexão pelo painel Orbit (Contas de anúncios);', 'access, correct or update connection data through the Orbit dashboard (Ad accounts);')}
                    ${item('revogar o Login em <em>Contas de anúncios → Desconectar</em>, ou em Facebook → Configurações → Integrações de negócios, app <strong style="' + st + '">Auto Ads</strong>;', 'revoke Login under <em>Ad accounts → Disconnect</em>, or in Facebook → Settings → Business integrations, app <strong style="' + st + '">Auto Ads</strong>;')}
                    ${item('solicitar exclusão definitiva do token e dos identificadores nos servidores da Orbit.', 'request permanent deletion of the token and identifiers on Orbit’s servers.')}
                </ul>
                ${para(
                  `Pedidos sobre criativos e dados de marketing da organização: ao <strong style="${st}">administrador da organização</strong> (controlador). Pedidos sobre dados de que a Orbit é controladora: à Encarregada (DPO).`,
                  `Requests about creatives and the organization’s marketing data: to the <strong style="${st}">organization administrator</strong> (controller). Requests about data for which Orbit is controller: to the DPO.`,
                )}
                <ul style="${ul}margin-bottom:0;">
                    ${item('<strong style="' + st + '">Encarregada (DPO):</strong> Jennifer Dantas — <!--email_off--><a href="mailto:jennifer.dantas@templum.com.br" style="' + link + '">jennifer.dantas@templum.com.br</a><!--email_on-->', '<strong style="' + st + '">Data Protection Officer (DPO):</strong> Jennifer Dantas — <!--email_off--><a href="mailto:jennifer.dantas@templum.com.br" style="' + link + '">jennifer.dantas@templum.com.br</a><!--email_on-->')}
                    ${item('<strong style="' + st + '">Suporte:</strong> <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="' + link + '">suporte@orbitgestao.com.br</a><!--email_on-->', '<strong style="' + st + '">Support:</strong> <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="' + link + '">suporte@orbitgestao.com.br</a><!--email_on-->')}
                    ${item('Prazo de resposta a requisições à DPO: 15 dias.', 'Response time for DPO requests: 15 days.')}
                </ul>
            </div>

            ${i18nEl(
              'p',
              `Passo a passo: ver <a href="#exclusao-auto-ads" style="${link}">Instruções para Exclusão de Dados — Auto Ads</a> abaixo.`,
              `Step-by-step: see <a href="#exclusao-auto-ads" style="${link}">Data Deletion Instructions — Auto Ads</a> below.`,
              `style="${foot}"`,
            )}
        </div>

        ${sep}

        <div id="exclusao-auto-ads" style="${wrap}">
${docHead(
  'Instruções para Exclusão de Dados — Auto Ads',
  'Data Deletion Instructions — Auto Ads',
  '19 de agosto de 2026',
  '19 August 2026',
  'Este documento explica como remover os dados do <strong style="color:#fff;">Auto Ads</strong> (conexão Meta Ads na Orbit). Veja também a <a href="#privacidade-auto-ads" style="' +
    link +
    '">Política de Privacidade — Auto Ads</a>.',
  'This document explains how to remove <strong style="color:#fff;">Auto Ads</strong> data (the Meta Ads connection in Orbit). See also <a href="#privacidade-auto-ads" style="' +
    link +
    '">Privacy Policy — Auto Ads</a>.',
)}

            <div style="${sec}">
                <span style="${optBadge}"><i class="fas fa-sliders"></i>${i18nText('Opção 1 — pelo painel Orbit', 'Option 1 — from the Orbit dashboard')}</span>
                ${i18nEl('h2', 'Exclusão pelo painel da plataforma', 'Deletion from the platform dashboard', `style="${h2}"`)}
                <ol style="${ol}">
                    ${i18nEl('li', 'Entre em <a href="https://app.orbitgestao.com.br" target="_blank" rel="noopener" style="' + link + '">https://app.orbitgestao.com.br</a>.', 'Sign in at <a href="https://app.orbitgestao.com.br" target="_blank" rel="noopener" style="' + link + '">https://app.orbitgestao.com.br</a>.')}
                    ${i18nEl('li', 'Abra <strong style="' + st + '">Mercado → Anúncios</strong>.', 'Open <strong style="' + st + '">Market → Ads</strong>.')}
                    ${i18nEl('li', 'Clique na engrenagem <strong style="' + st + '">Contas de anúncios</strong>.', 'Click the <strong style="' + st + '">Ad accounts</strong> gear.')}
                    ${i18nEl('li', 'Em Meta Ads, clique em <strong style="' + st + '">Desconectar</strong>.', 'Under Meta Ads, click <strong style="' + st + '">Disconnect</strong>.')}
                    ${i18nEl('li', 'Confirme.', 'Confirm.')}
                </ol>
                ${para(
                  `O token de acesso é <strong style="${st}">apagado imediatamente</strong>. IDs de Página, Instagram e conta de anúncios deixam de ficar associados à organização. Anúncios já existentes no Ads Manager <strong style="${st}">não</strong> são apagados automaticamente.`,
                  `The access token is <strong style="${st}">deleted immediately</strong>. Page, Instagram and ad-account IDs are no longer associated with the organization. Ads already in Ads Manager are <strong style="${st}">not</strong> deleted automatically.`,
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                <span style="${optBadge}"><i class="fab fa-facebook"></i>${i18nText('Opção 2 — pelo Facebook', 'Option 2 — from Facebook')}</span>
                ${i18nEl('h2', 'Revogação no Facebook', 'Revocation on Facebook', `style="${h2}"`)}
                <ol style="${ol}">
                    ${i18nEl('li', 'Facebook → <strong style="' + st + '">Configurações e privacidade → Configurações</strong>.', 'Facebook → <strong style="' + st + '">Settings &amp; privacy → Settings</strong>.')}
                    ${i18nEl('li', '<strong style="' + st + '">Integrações de negócios</strong> (ou <strong style="' + st + '">Aplicativos e sites</strong>).', '<strong style="' + st + '">Business integrations</strong> (or <strong style="' + st + '">Apps and websites</strong>).')}
                    ${i18nEl('li', 'Localize o aplicativo <strong style="' + st + '">Auto Ads</strong>.', 'Find the <strong style="' + st + '">Auto Ads</strong> app.')}
                    ${i18nEl('li', 'Clique em <strong style="' + st + '">Remover</strong>.', 'Click <strong style="' + st + '">Remove</strong>.')}
                </ol>
                ${para(
                  `A Meta envia um pedido assinado ao nosso callback (meta-data-deletion). Processamos o apagamento do token e dos identificadores ligados àquele user_id <strong style="${st}">em até 48 horas</strong>.`,
                  `Meta sends a signed request to our callback (meta-data-deletion). We erase the token and identifiers tied to that user_id <strong style="${st}">within 48 hours</strong>.`,
                  'margin-bottom:0;',
                )}
            </div>

            <div style="${sec}">
                <span style="${optBadge}"><i class="fas fa-envelope"></i>${i18nText('Opção 3 — DPO / suporte', 'Option 3 — DPO / support')}</span>
                ${i18nEl('h2', 'Solicitação direta', 'Direct request', `style="${h2}"`)}
                <ul style="${ul}">
                    ${item('<strong style="' + st + '">E-mail:</strong> <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="' + link + '">suporte@orbitgestao.com.br</a><!--email_on--> e/ou <!--email_off--><a href="mailto:jennifer.dantas@templum.com.br" style="' + link + '">jennifer.dantas@templum.com.br</a><!--email_on-->', '<strong style="' + st + '">E-mail:</strong> <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="' + link + '">suporte@orbitgestao.com.br</a><!--email_on--> and/or <!--email_off--><a href="mailto:jennifer.dantas@templum.com.br" style="' + link + '">jennifer.dantas@templum.com.br</a><!--email_on-->')}
                    ${item('<strong style="' + st + '">Assunto:</strong> Solicitação de Exclusão de Dados — Auto Ads — [Nome da empresa]', '<strong style="' + st + '">Subject:</strong> Data Deletion Request — Auto Ads — [Company name]')}
                    ${item('Informe: e-mail da conta Orbit e, se possível, nome da Página ou ID da conta de anúncios.', 'Include: the Orbit account e-mail and, if possible, the Page name or ad-account ID.')}
                </ul>
                ${para(
                  `Após validar, confirmamos a eliminação <strong style="${st}">em até 5 dias úteis</strong>.`,
                  `After validation, we confirm deletion <strong style="${st}">within 5 business days</strong>.`,
                  'margin-bottom:0;',
                )}
            </div>
        </div>`;
