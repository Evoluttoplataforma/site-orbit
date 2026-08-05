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
const link = 'color:#ffba1a;font-weight:700;text-decoration:none;';
const st = 'color:#fff;';

/** Cabeçalho comum: título, data e a nota de escopo que diferencia dos documentos gerais. */
function docHead(titulo: string, data: string, escopo: string): string {
  return `
            <h1 style="${h1}">${titulo}</h1>
            <p style="${stamp}">Última atualização: ${data}</p>
            <div style="${scope}">
                <i class="fas fa-circle-info" style="color:#2D8CFF;margin-right:8px;"></i>${escopo}
            </div>`;
}

const ESCOPO_COMUM =
  'Este documento trata especificamente do <strong style="color:#fff;">Auto Chat</strong>, ' +
  'nossa integração de atendimento via WhatsApp Business (Meta Cloud API e Twilio). ' +
  'Para a plataforma Orbit como um todo, consulte os ' +
  `<a href="/termos-de-servico" style="${link}">Termos de Serviço</a> e a ` +
  `<a href="/politica-privacidade" style="${link}">Política de Privacidade</a> gerais.`;

// ─── TERMOS DE SERVIÇO ──────────────────────────────────────────────────────
export const termosHTML = `
        <div style="${wrap}">
${docHead('Termos de Serviço — Auto Chat', '05 de agosto de 2026', ESCOPO_COMUM)}

            <p style="${p}">
                Estes Termos de Serviço regem o uso do software e dos serviços prestados pela
                Orbit Gestão / Auto Chat. Ao conectar sua conta do WhatsApp Business ou utilizar
                nossa plataforma, você concorda integralmente com as condições abaixo.
            </p>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">01</span>Descrição dos serviços</h2>
                <p style="${p}margin-bottom:0;">
                    A Orbit Gestão / Auto Chat fornece uma plataforma SaaS de gestão comercial,
                    automação e atendimento multicanal, utilizando integrações oficiais com a
                    <strong style="${st}">Meta Cloud API (WhatsApp)</strong> e provedores de
                    telecomunicações como a <strong style="${st}">Twilio</strong>.
                </p>
            </div>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">02</span>Cumprimento das políticas da Meta / WhatsApp</h2>
                <p style="${p}">
                    O usuário compromete-se a utilizar a integração em estrita conformidade com as
                    Políticas Comerciais da Meta e os Termos do WhatsApp Business.
                    É expressamente proibido:
                </p>
                <ul style="${ul}margin-bottom:0;">
                    <li style="${li}">${bullet}O envio de mensagens não solicitadas (SPAM) ou sem o consentimento prévio (<em>opt-in</em>) do destinatário.</li>
                    <li style="${li}">${bullet}O uso da plataforma para a divulgação de conteúdos ilícitos, fraudulentos, preconceituosos, ofensivos ou que violem os direitos de terceiros.</li>
                    <li style="${li}">${bullet}Práticas de disparo massivo abusivo que violem os limites operacionais (<em>Messaging Tiers</em>) estabelecidos pela Meta.</li>
                </ul>
            </div>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">03</span>Isenção de responsabilidade por bloqueios</h2>
                <p style="${p}margin-bottom:0;">
                    A plataforma Orbit Gestão atua como fornecedora da tecnologia de software e ponte
                    de integração. A responsabilidade pela qualidade do banco de dados de contatos e
                    pelo conteúdo das mensagens é <strong style="${st}">exclusivamente do usuário
                    final</strong>. A Orbit Gestão não se responsabiliza por eventuais suspensões,
                    bloqueios de números ou restrições impostas pela Meta decorrentes da violação das
                    regras de uso da API pelo usuário.
                </p>
            </div>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">04</span>Cancelamento e desconexão de canais</h2>
                <p style="${p}margin-bottom:0;">
                    O usuário pode desconectar sua conta do WhatsApp Business a qualquer momento
                    através do painel da plataforma. A Orbit Gestão reserva-se o direito de suspender
                    ou encerrar o acesso do usuário caso seja identificada violação grave destes
                    Termos ou das políticas da Meta.
                </p>
            </div>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">05</span>Propriedade intelectual</h2>
                <p style="${p}margin-bottom:0;">
                    Todo o código, marcas, interfaces e funcionalidades da plataforma são de
                    propriedade exclusiva da Orbit Gestão. A concessão de acesso ao software não
                    implica transferência de direitos de propriedade intelectual.
                </p>
            </div>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">06</span>Foro e legislação aplicável</h2>
                <p style="${p}margin-bottom:0;">
                    Estes termos são regidos pelas leis da República Federativa do Brasil, em especial
                    pelo Marco Civil da Internet (Lei nº 12.965/2014) e pelo Código Civil Brasileiro.
                    Qualquer disputa será submetida ao foro da comarca da sede da empresa.
                </p>
            </div>

            <p style="${foot}">
                Em caso de dúvidas sobre estes Termos, entre em contato pelo e-mail
                <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->.
            </p>
        </div>`;

// ─── POLÍTICA DE PRIVACIDADE ────────────────────────────────────────────────
export const privacidadeHTML = `
        <div style="${wrap}">
${docHead('Política de Privacidade — Auto Chat', '05 de agosto de 2026', ESCOPO_COMUM)}

            <p style="${p}">
                A Orbit Gestão / Auto Chat ("Nós", "Nosso" ou "Plataforma") está comprometida com a
                proteção da privacidade e dos dados pessoais de seus usuários. Esta Política de
                Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações
                ao utilizar nossos serviços e integrações com a Meta Cloud API (WhatsApp Business) e Twilio.
            </p>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">01</span>Informações que coletamos</h2>
                <p style="${p}">
                    Para a prestação de nossos serviços de automação e gestão de atendimento via
                    WhatsApp, coletamos as seguintes categorias de dados:
                </p>
                <ul style="${ul}margin-bottom:0;">
                    <li style="${li}">${bullet}<strong style="${st}">Dados de cadastro:</strong> nome, endereço de e-mail, número de telefone e dados da empresa.</li>
                    <li style="${li}">${bullet}<strong style="${st}">Credenciais e tokens de integração:</strong> tokens de acesso concedidos via Meta SDK (OAuth), ID da Conta do WhatsApp Business (WABA ID), ID do Número de Telefone (Phone Number ID) e identificadores da Twilio.</li>
                    <li style="${li}">${bullet}<strong style="${st}">Dados de comunicação e mensageria:</strong> conteúdo das mensagens enviadas e recebidas via integração do WhatsApp, metadados de envio, horários e status de entrega.</li>
                </ul>
            </div>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">02</span>Finalidade do tratamento de dados</h2>
                <p style="${p}">Os dados coletados são utilizados exclusivamente para:</p>
                <ul style="${ul}margin-bottom:0;">
                    <li style="${li}">${bullet}Viabilizar a conexão técnica entre a sua conta e a infraestrutura oficial do WhatsApp Cloud API.</li>
                    <li style="${li}">${bullet}Permitir o envio, recebimento, gestão e automação de mensagens pelo painel da plataforma.</li>
                    <li style="${li}">${bullet}Prestar suporte técnico e operacional ao usuário.</li>
                    <li style="${li}">${bullet}Garantir a segurança, auditoria e prevenção contra fraudes na utilização de nossos sistemas.</li>
                </ul>
            </div>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">03</span>Compartilhamento de dados com terceiros</h2>
                <p style="${p}">
                    A Orbit Gestão <strong style="${st}">não vende, aluga ou comercializa</strong> dados
                    pessoais de seus usuários com terceiros para fins publicitários. Os dados são
                    compartilhados estritamente com os provedores de infraestrutura necessários para a
                    operação do serviço:
                </p>
                <ul style="${ul}margin-bottom:0;">
                    <li style="${li}">${bullet}<strong style="${st}">Meta Platforms, Inc.</strong> — provedor da API oficial do WhatsApp Business.</li>
                    <li style="${li}">${bullet}<strong style="${st}">Twilio Inc.</strong> — provedor de serviços de telecomunicações e verificação de linhas.</li>
                </ul>
            </div>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">04</span>Armazenamento e segurança das informações</h2>
                <p style="${p}margin-bottom:0;">
                    Adotamos medidas técnicas e organizacionais rigorosas para proteger seus dados,
                    incluindo o uso de <strong style="${st}">criptografia no armazenamento de tokens
                    de acesso</strong> e nas comunicações via HTTPS/TLS. Mantemos os dados armazenados
                    apenas pelo período necessário para cumprir as finalidades descritas ou obrigações legais.
                </p>
            </div>

            <div style="${sec}">
                <h2 style="${h2}"><span style="${num}">05</span>Direitos do titular e exclusão de dados</h2>
                <p style="${p}">
                    Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e as diretrizes da
                    Meta, você possui o direito de:
                </p>
                <ul style="${ul}margin-bottom:0;">
                    <li style="${li}">${bullet}Acessar, corrigir ou atualizar seus dados pessoais.</li>
                    <li style="${li}">${bullet}Revogar a autorização de acesso ao seu WhatsApp Business a qualquer momento, pelo seu painel na Meta ou no nosso sistema.</li>
                    <li style="${li}">${bullet}Solicitar a exclusão definitiva de seus dados e credenciais de nossos servidores.</li>
                </ul>
            </div>

            <p style="${foot}">
                Para solicitar a exclusão de dados ou tirar dúvidas sobre esta política, entre em
                contato com nosso Encarregado de Proteção de Dados (DPO) pelo e-mail
                <!--email_off--><a href="mailto:suporte@orbitgestao.com.br" style="${link}">suporte@orbitgestao.com.br</a><!--email_on-->.
            </p>
        </div>`;
