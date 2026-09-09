import { I18n } from '@/lib/i18n-react';

export const metadata = {
  title: 'Termos de Uso — Orbit Gestão',
  description:
    'Termos de Uso da Plataforma Orbit Gestão, operada por FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA (CNPJ 65.167.064/0001-27).',
  alternates: { canonical: 'https://orbitgestao.com.br/termos-de-servico' },
};

const wrap = { background: '#0D1117', color: '#C9D1D9', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" } as const;
const container = { maxWidth: 820, margin: '0 auto' } as const;
const back = { color: '#ffba1a', textDecoration: 'none', fontSize: 14, marginBottom: 32, display: 'inline-block' } as const;
const h1 = { fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 } as const;
const stamp = { color: '#8B949E', marginBottom: 16 } as const;
const note = { background: '#1C2333', borderLeft: '3px solid #ffba1a', padding: '16px 20px', borderRadius: '0 12px 12px 0', lineHeight: 1.7, marginBottom: 40 } as const;
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
        <I18n as="h1" style={h1} pt="Termos de Uso da Plataforma Orbit Gestão" en="Orbit Gestão Platform Terms of Use" />
        <I18n as="p" style={stamp} pt="Última atualização: 31 de agosto de 2026" en="Last updated: 31 August 2026" />
        <I18n
          style={note}
          pt={
            <>
              Clientes e usuários da Plataforma também aderem aos <strong style={strong}>Termos de Uso da Plataforma Orbit, Versão 3.0</strong>, com Anexos I a V, mediante aceite eletrônico na Área de Conformidade. Esta página é o texto público. Em divergência entre esta página e o texto aceito na Plataforma ou um contrato específico, prevalece o instrumento contratual ou o aceite aplicável ao ponto de conflito.
            </>
          }
          en={
            <>
              Platform customers and users also adhere to the <strong style={strong}>Orbit Platform Terms of Use, Version 3.0</strong>, with Annexes I to V, by electronic acceptance in the Compliance Area. This page is the public text. If this page conflicts with the text accepted on the Platform or with a specific contract, the contractual instrument or applicable acceptance prevails on the point of conflict.
            </>
          }
        />

        <section style={section}>
          <I18n as="h2" style={h2} pt="1. Identificação" en="1. Identification" />
          <I18n
            style={p}
            pt="Estes Termos de Uso regulam o acesso e a utilização dos serviços disponibilizados pela Orbit Gestão. Para fins destes Termos, a empresa responsável pela Plataforma é:"
            en="These Terms of Use govern access to and use of the services made available by Orbit Gestão. For the purposes of these Terms, the company responsible for the Platform is:"
          />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</strong>
                <br />
                CNPJ: 65.167.064/0001-27
                <br />
                Rodovia Jose Carlos Daux, 5500, Conj. 306, Saco Grande, Florianópolis, Santa Catarina, CEP 88032-005, Brasil.
              </>
            }
            en={
              <>
                <strong style={strong}>FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA</strong>
                <br />
                CNPJ: 65.167.064/0001-27
                <br />
                Rodovia Jose Carlos Daux, 5500, Conj. 306, Saco Grande, Florianópolis, Santa Catarina, CEP 88032-005, Brazil.
              </>
            }
          />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>Orbit Gestão</strong> é a marca comercial utilizada pela Empresa para disponibilização da Plataforma e dos serviços relacionados. Qualificação completa:{' '}
                <a href="/informacoes-legais" style={accent}>Informações Legais</a>.
              </>
            }
            en={
              <>
                <strong style={strong}>Orbit Gestão</strong> is the trade name used by the Company to make the Platform and related services available. Full identification:{' '}
                <a href="/informacoes-legais" style={accent}>Legal Information</a>.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="2. Aceitação dos Termos" en="2. Acceptance of the Terms" />
          <I18n style={p} pt="Ao criar uma conta, acessar ou utilizar a Plataforma, o usuário declara que leu, compreendeu e concorda com estes Termos." en="By creating an account, accessing or using the Platform, the user states that they have read, understood and agree to these Terms." />
          <I18n style={p} pt="Quando a contratação for realizada por uma empresa, consultoria, parceiro ou organização, a pessoa responsável pela contratação declara possuir poderes suficientes para representar a respectiva organização." en="When contracting is carried out by a company, consultancy, partner or organization, the person responsible for contracting states that they have sufficient authority to represent that organization." />
          <I18n style={p} pt="Instrumentos comerciais específicos, propostas, ordens de contratação e contratos poderão complementar estes Termos. Em caso de divergência entre estes Termos e contrato específico celebrado entre as partes, prevalecerá o instrumento contratual aplicável ao ponto de conflito." en="Specific commercial instruments, proposals, purchase orders and contracts may supplement these Terms. If these Terms conflict with a specific contract between the parties, the applicable contractual instrument prevails on the point of conflict." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="3. Sobre a Plataforma" en="3. About the Platform" />
          <I18n style={p} pt="O Orbit é uma plataforma de gestão empresarial que utiliza recursos de inteligência artificial, agentes especializados, automações e ferramentas de gestão para apoiar diferentes atividades empresariais." en="Orbit is a business management platform that uses artificial intelligence, specialized agents, automations and management tools to support different business activities." />
          <I18n style={p} pt="A Plataforma poderá contemplar recursos relacionados a áreas como planejamento estratégico, processos, indicadores, projetos, tarefas, pessoas, treinamentos, reuniões, riscos, problemas, oportunidades, documentos, recrutamento, comercial e outras áreas disponibilizadas pela Orbit." en="The Platform may include features related to areas such as strategic planning, processes, indicators, projects, tasks, people, training, meetings, risks, problems, opportunities, documents, recruiting, sales and other areas made available by Orbit." />
          <I18n style={p} pt="Funcionalidades poderão ser incluídas, modificadas, substituídas ou descontinuadas conforme evolução tecnológica e operacional da Plataforma." en="Features may be added, modified, replaced or discontinued as the Platform evolves technologically and operationally." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="4. Agentes de inteligência artificial" en="4. Artificial intelligence agents" />
          <I18n style={p} pt="A Plataforma utiliza agentes e recursos de inteligência artificial capazes de interpretar informações, gerar conteúdos, organizar dados, estruturar ações, apresentar recomendações, executar determinadas rotinas, orientar usuários e automatizar etapas de trabalho." en="The Platform uses agents and artificial intelligence features capable of interpreting information, generating content, organizing data, structuring actions, presenting recommendations, running certain routines, guiding users and automating work steps." />
          <I18n style={p} pt="Os resultados gerados por inteligência artificial podem apresentar erros, limitações, interpretações incompletas ou informações inadequadas ao contexto específico do usuário. Os agentes não substituem o julgamento profissional, técnico, jurídico, financeiro, médico, contábil ou de outras áreas regulamentadas quando esse julgamento for necessário." en="Results generated by artificial intelligence may contain errors, limitations, incomplete interpretations or information inadequate to the user’s specific context. The agents do not replace professional, technical, legal, financial, medical, accounting or other regulated judgment when that judgment is required." />
          <I18n style={p} pt="O cliente permanece responsável pelas decisões empresariais tomadas a partir das informações fornecidas pela Plataforma. É vedado usar resultados de IA como fundamento único de decisão com efeito jurídico sobre pessoas naturais, sem revisão humana (LGPD, art. 20). A Empresa não utiliza o Conteúdo do Cliente para treinar modelos próprios ou de terceiros." en="The customer remains responsible for business decisions taken on the basis of information provided by the Platform. AI results may not be used as the sole basis for a decision with legal effect on natural persons without human review (LGPD, art. 20). The Company does not use Customer Content to train its own or third-party models." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="5. Cadastro e acesso" en="5. Registration and access" />
          <I18n style={p} pt="Para utilização da Plataforma, poderá ser necessário criar uma conta. O usuário compromete-se a fornecer informações verdadeiras, atualizadas e completas, e é responsável pela segurança de suas credenciais." en="Use of the Platform may require creating an account. The user undertakes to provide true, up-to-date and complete information and is responsible for the security of their credentials." />
          <I18n style={p} pt="Não é permitido compartilhar credenciais de forma incompatível com o plano contratado ou permitir utilização não autorizada da conta. A Orbit poderá utilizar mecanismos de autenticação e segurança adicionais." en="Sharing credentials in a manner incompatible with the contracted plan, or allowing unauthorized use of the account, is not permitted. Orbit may use additional authentication and security mechanisms." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="6. Responsabilidades do usuário" en="6. User responsibilities" />
          <I18n style={p} pt="Ao utilizar a Plataforma, o usuário compromete-se a respeitar a legislação aplicável; utilizar os Serviços exclusivamente para fins legítimos; não inserir conteúdo ilícito; não realizar tentativa de invasão; não interferir na infraestrutura; não explorar vulnerabilidades; não utilizar a Plataforma para fraude; não violar direitos de terceiros; não realizar engenharia reversa quando proibida por lei ou contrato; não utilizar indevidamente dados pessoais; e não utilizar os Serviços para desenvolvimento de atividades ilícitas." en="When using the Platform, the user undertakes to comply with applicable law; use the Services solely for legitimate purposes; not enter unlawful content; not attempt intrusion; not interfere with the infrastructure; not exploit vulnerabilities; not use the Platform for fraud; not infringe third-party rights; not reverse-engineer where prohibited by law or contract; not misuse personal data; and not use the Services to carry out unlawful activities." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="7. Dados e informações inseridos pelo cliente" en="7. Data and information entered by the customer" />
          <I18n style={p} pt="O cliente permanece responsável pelas informações que inserir, importar, integrar ou disponibilizar à Plataforma, e declara possuir os direitos, bases legais, autorizações ou demais fundamentos necessários para utilização dessas informações." en="The customer remains responsible for information they enter, import, integrate or make available to the Platform, and states that they have the rights, legal bases, authorizations or other grounds required to use that information." />
          <I18n style={p} pt="Quando o cliente inserir dados pessoais pertencentes a terceiros, será responsável por observar a legislação aplicável e garantir legitimidade para o respectivo tratamento. A Orbit tratará as informações conforme sua Política de Privacidade, contratos aplicáveis e legislação vigente. O Cliente é Controlador do Conteúdo da Organização; a Empresa é Operadora, salvo quando a lei ou o contrato dispuser de modo diverso." en="When the customer enters personal data belonging to third parties, they are responsible for observing applicable law and ensuring a legitimate basis for that processing. Orbit will process the information in accordance with its Privacy Policy, applicable contracts and current law. The Customer is Controller of Organization Content; the Company is Processor, unless law or contract provides otherwise." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="8. Propriedade dos dados do cliente" en="8. Ownership of customer data" />
          <I18n style={p} pt="Os dados empresariais inseridos pelo cliente continuam pertencendo ao cliente ou aos respectivos titulares. A contratação do Orbit não transfere à Empresa a propriedade sobre conteúdos, metodologias, documentos ou informações empresariais pertencentes ao cliente. O cliente concede à Orbit apenas as permissões necessárias para processar essas informações com a finalidade de prestar os Serviços." en="Business data entered by the customer continue to belong to the customer or to the respective rights holders. Contracting Orbit does not transfer to the Company ownership of content, methodologies, documents or business information belonging to the customer. The customer grants Orbit only the permissions needed to process that information for the purpose of providing the Services." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="9. Propriedade intelectual do Orbit" en="9. Orbit intellectual property" />
          <I18n style={p} pt="Pertencem à Orbit ou aos respectivos titulares os direitos relacionados a marca Orbit, identidade visual, software, código, arquitetura tecnológica, interfaces, agentes, modelos, fluxos, documentação, materiais, elementos gráficos, metodologias proprietárias da Plataforma e demais ativos protegidos por propriedade intelectual." en="Rights relating to the Orbit brand, visual identity, software, code, technology architecture, interfaces, agents, models, flows, documentation, materials, graphic elements, proprietary Platform methodologies and other assets protected by intellectual property belong to Orbit or to the respective rights holders." />
          <I18n style={p} pt="A contratação dos Serviços concede ao cliente apenas o direito de utilização previsto no plano ou contrato aplicável. Nenhuma disposição destes Termos implica cessão de propriedade intelectual." en="Contracting the Services grants the customer only the right of use provided in the applicable plan or contract. Nothing in these Terms constitutes an assignment of intellectual property." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="10. Metodologias pertencentes aos clientes" en="10. Customer methodologies" />
          <I18n style={p} pt="Consultorias, parceiros e clientes poderão utilizar metodologias, documentos, frameworks, fluxos e conhecimentos próprios dentro da Plataforma. Esses ativos continuam pertencendo aos respectivos titulares. A Orbit não adquire propriedade sobre a metodologia do cliente em razão de sua configuração ou utilização dentro da infraestrutura da Plataforma." en="Consultancies, partners and customers may use their own methodologies, documents, frameworks, flows and knowledge within the Platform. Those assets continue to belong to the respective rights holders. Orbit does not acquire ownership of the customer’s methodology by reason of its configuration or use within the Platform infrastructure." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="11. White label" en="11. White label" />
          <I18n style={p} pt="A Orbit poderá disponibilizar modalidades que permitam a personalização da experiência com marca, logotipo, identidade visual, domínio, metodologia, conteúdos, jornadas e configurações próprias do cliente ou parceiro." en="Orbit may offer arrangements that allow the experience to be customized with brand, logo, visual identity, domain, methodology, content, journeys and settings belonging to the customer or partner." />
          <I18n style={p} pt="A utilização do modelo white label não implica transferência da propriedade intelectual da infraestrutura Orbit. As condições comerciais, limites técnicos e responsabilidades de cada parte serão definidos no contrato aplicável. No acesso via Canal (consultoria em white-label), as condições comerciais são as do contrato Cliente–Canal; a Empresa não é parte nessa relação nem responde pela consultoria." en="Use of the white-label model does not transfer intellectual property in the Orbit infrastructure. Commercial terms, technical limits and each party’s responsibilities are defined in the applicable contract. In access via Channel (white-label consultancy), commercial terms are those of the Customer–Channel contract; the Company is not a party to that relationship and is not liable for the consultancy." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="12. Integrações com terceiros" en="12. Third-party integrations" />
          <I18n style={p} pt="A Plataforma poderá permitir conexão com serviços externos. A disponibilidade e funcionamento dessas integrações podem depender dos respectivos fornecedores. A Orbit não controla integralmente serviços, APIs, políticas ou sistemas operados por terceiros. Alterações realizadas pelos fornecedores externos poderão impactar integrações existentes." en="The Platform may allow connection to external services. Availability and operation of those integrations may depend on the respective providers. Orbit does not fully control services, APIs, policies or systems operated by third parties. Changes made by external providers may affect existing integrations." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="13. Disponibilidade" en="13. Availability" />
          <I18n style={p} pt="A Orbit busca manter a Plataforma disponível e operacional. Entretanto, poderão ocorrer interrupções relacionadas a manutenção, atualizações, falhas técnicas, fornecedores, serviços de terceiros, eventos de força maior, incidentes de segurança ou necessidade de proteção da infraestrutura." en="Orbit seeks to keep the Platform available and operational. Interruptions may nevertheless occur in connection with maintenance, updates, technical failures, providers, third-party services, force majeure, security incidents or the need to protect the infrastructure." />
          <I18n
            style={p}
            pt={
              <>
                Condições específicas de disponibilidade ou suporte deverão observar o contrato aplicável. Na contratação direta, a disponibilidade mensal mínima de referência é de <strong style={strong}>99,0%</strong> (Anexo III dos Termos v3.0). Histórico público:{' '}
                <a href="/status" style={accent}>/status</a>.
              </>
            }
            en={
              <>
                Specific availability or support conditions are those in the applicable contract. On a direct contract, the reference minimum monthly availability is <strong style={strong}>99.0%</strong> (Annex III of Terms v3.0). Public history:{' '}
                <a href="/status" style={accent}>/status</a>.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="14. Evolução da Plataforma" en="14. Evolution of the Platform" />
          <I18n style={p} pt="O Orbit é uma plataforma tecnológica em evolução contínua. A Empresa poderá adicionar funcionalidades, alterar interfaces, aprimorar agentes, modificar fluxos, atualizar modelos de inteligência artificial, alterar integrações, corrigir funcionalidades e descontinuar recursos. Sempre que alterações relevantes afetarem materialmente uma contratação vigente, serão observadas as obrigações contratuais e legais aplicáveis." en="Orbit is a technology platform in continuous evolution. The Company may add features, change interfaces, improve agents, modify flows, update AI models, change integrations, fix features and discontinue resources. Whenever material changes affect an existing contract, the applicable contractual and legal obligations will be observed." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="15. Planos, preços e cobrança" en="15. Plans, prices and billing" />
          <I18n style={p} pt="Valores, licenças, condições de pagamento, períodos contratados, quantidade de usuários, organizações, serviços adicionais e demais condições comerciais serão aquelas estabelecidas na proposta, pedido, contrato ou plano aceito pelo cliente. O website poderá apresentar valores promocionais ou condições específicas que poderão ser alterados ao longo do tempo." en="Fees, licences, payment terms, contracted periods, number of users, organizations, additional services and other commercial conditions are those set out in the proposal, order, contract or plan accepted by the customer. The website may present promotional prices or specific conditions that may change over time." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="16. Suspensão de acesso" en="16. Suspension of access" />
          <I18n style={p} pt="A Orbit poderá suspender ou limitar o acesso quando houver inadimplência prevista contratualmente, risco de segurança, utilização ilícita, violação destes Termos, utilização capaz de prejudicar a Plataforma, ordem de autoridade competente, ou outros motivos previstos contratualmente ou em lei. Quando possível e adequado, o cliente será comunicado sobre a situação." en="Orbit may suspend or limit access in the event of contractually provided default, a security risk, unlawful use, breach of these Terms, use capable of harming the Platform, an order from a competent authority, or other reasons provided contractually or by law. Where possible and appropriate, the customer will be notified." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="17. Encerramento" en="17. Termination" />
          <I18n style={p} pt="As regras de cancelamento, rescisão, renovação, aviso prévio, exportação de dados e encerramento da contratação serão aquelas previstas no respectivo contrato ou plano comercial. O encerramento do acesso não elimina obrigações anteriores existentes entre as partes." en="Rules on cancellation, termination, renewal, notice, data export and end of the contract are those set out in the respective contract or commercial plan. Ending access does not eliminate prior obligations between the parties." />
          <I18n style={p} pt="Após o encerramento, na forma dos Termos v3.0: 30 dias só leitura para exportar; 60 dias arquivado; depois eliminação ou anonimização, salvo lei. Gravações de reunião (mídia): 90 dias da reunião. Registros de acesso: 6 meses (Marco Civil, art. 15)." en="After termination, as in Terms v3.0: 30 days read-only to export; 60 days archived; then deletion or anonymization, unless the law requires otherwise. Meeting recordings (media): 90 days from the meeting. Access logs: 6 months (Brazilian Internet Civil Framework, art. 15)." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="18. Confidencialidade" en="18. Confidentiality" />
          <I18n style={p} pt="Informações confidenciais disponibilizadas entre as partes deverão ser protegidas e utilizadas exclusivamente para as finalidades da relação contratual. Obrigações adicionais de confidencialidade poderão constar de contrato específico." en="Confidential information made available between the parties must be protected and used solely for the purposes of the contractual relationship. Additional confidentiality obligations may appear in a specific contract." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="19. Proteção de dados" en="19. Data protection" />
          <I18n
            style={p}
            pt={
              <>
                O tratamento de dados pessoais relacionado à utilização da Plataforma está sujeito à nossa{' '}
                <a href="/politica-privacidade" style={accent}>Política de Privacidade</a> e à legislação aplicável. Quando necessário, poderão ser celebrados instrumentos específicos relacionados ao tratamento de dados. Encarregada:{' '}
                <strong style={strong}>Jennifer Dantas</strong> —{' '}
                <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>
                {' '}(Templum / DPOnet). Requisições: 15 dias.
              </>
            }
            en={
              <>
                Processing of personal data in connection with use of the Platform is subject to our{' '}
                <a href="/politica-privacidade" style={accent}>Privacy Policy</a> and applicable law. Where necessary, specific instruments relating to data processing may be entered into. Data Protection Officer:{' '}
                <strong style={strong}>Jennifer Dantas</strong> —{' '}
                <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>
                {' '}(Templum / DPOnet). Requests: 15 days.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="20. Segurança" en="20. Security" />
          <I18n
            style={p}
            pt={
              <>
                A Orbit adota medidas destinadas à proteção da infraestrutura e das informações processadas, detalhadas na{' '}
                <a href="/politica-seguranca" style={accent}>Política de Segurança da Informação</a>. O cliente também possui responsabilidades relacionadas à segurança, incluindo proteção de credenciais, gestão de permissões, controle de usuários, configuração adequada de integrações e utilização responsável da Plataforma.
              </>
            }
            en={
              <>
                Orbit adopts measures to protect the infrastructure and processed information, detailed in the{' '}
                <a href="/politica-seguranca" style={accent}>Information Security Policy</a>. The customer also has security-related responsibilities, including protecting credentials, managing permissions, controlling users, configuring integrations properly and using the Platform responsibly.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="21. Limitações relacionadas à inteligência artificial" en="21. Limitations relating to artificial intelligence" />
          <I18n style={p} pt="O usuário reconhece que sistemas de inteligência artificial são probabilísticos e podem produzir resultados incorretos. A Orbit não garante que todo conteúdo produzido por agentes será exato, completo, livre de erros, adequado a uma decisão específica ou compatível com toda legislação ou norma aplicável ao contexto do cliente. Informações relevantes deverão ser revisadas antes de sua utilização em decisões críticas." en="The user acknowledges that artificial intelligence systems are probabilistic and may produce incorrect results. Orbit does not warrant that all content produced by agents will be accurate, complete, error-free, suitable for a specific decision or compatible with every law or rule applicable to the customer’s context. Material information must be reviewed before use in critical decisions." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="22. Responsabilidade" en="22. Liability" />
          <I18n style={p} pt="Cada parte será responsável pelos danos que causar quando configurados os requisitos previstos na legislação e nos instrumentos contratuais aplicáveis. Nenhuma disposição destes Termos pretende excluir direitos ou responsabilidades que não possam ser afastados pela legislação. Limites adicionais de responsabilidade poderão ser previstos no respectivo contrato comercial." en="Each party is liable for the damage it causes when the requirements of applicable law and contractual instruments are met. Nothing in these Terms is intended to exclude rights or liabilities that cannot be excluded by law. Additional liability limits may be set out in the respective commercial contract." />
          <I18n style={p} pt="Na contratação direta, o limite agregado em 12 meses é, em regra, o valor pago pelo Cliente à Empresa no período, na forma dos Termos v3.0, ressalvados dolo, fraude, PI, confidencialidade e obrigações que a lei não permita limitar." en="On a direct contract, the aggregate 12-month cap is, as a rule, the amount the Customer paid the Company in the period, as in Terms v3.0, except for willful misconduct, fraud, IP, confidentiality and obligations that the law does not allow to be limited." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="23. Serviços de terceiros" en="23. Third-party services" />
          <I18n style={p} pt="Determinadas funcionalidades poderão depender de tecnologias ou serviços fornecidos por terceiros. A Orbit não será responsável por indisponibilidades ou alterações causadas exclusivamente por fornecedores externos fora de seu controle razoável, sem prejuízo das obrigações que legal ou contratualmente lhe sejam aplicáveis." en="Certain features may depend on technologies or services provided by third parties. Orbit is not responsible for unavailability or changes caused solely by external providers outside its reasonable control, without prejudice to obligations that apply to it by law or contract." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="24. Alterações destes Termos" en="24. Changes to these Terms" />
          <I18n style={p} pt="Estes Termos poderão ser atualizados para refletir mudanças legais, regulatórias, novas funcionalidades, alterações operacionais, evoluções tecnológicas ou mudanças na estrutura dos Serviços. A data da última atualização será indicada nesta página. Alterações materiais na contratação vigente observam o aviso e o aceite previstos nos Termos v3.0." en="These Terms may be updated to reflect legal or regulatory changes, new features, operational changes, technological developments or changes in the structure of the Services. The date of the last update will be shown on this page. Material changes to an existing contract observe the notice and acceptance provided in Terms v3.0." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="25. Legislação aplicável" en="25. Governing law" />
          <I18n style={p} pt="Estes Termos serão interpretados de acordo com as leis da República Federativa do Brasil. Eventuais questões relacionadas ao foro competente deverão observar a legislação e o instrumento contratual aplicável. Na ausência de foro contratual específico, fica eleito o foro de Florianópolis/SC." en="These Terms are interpreted in accordance with the laws of the Federative Republic of Brazil. Questions relating to venue shall observe applicable law and the contractual instrument. In the absence of a specific contractual venue, the courts of Florianópolis/SC are elected." />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="26. Contato" en="26. Contact" />
          <I18n style={p} pt="Dúvidas relacionadas aos Termos de Uso podem ser encaminhadas para:" en="Questions relating to the Terms of Use may be sent to:" />
          <I18n
            style={p}
            pt={
              <>
                <strong style={strong}>Orbit Gestão</strong>
                <br />
                FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA
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
                <strong style={strong}>Orbit Gestão</strong>
                <br />
                FURNIEL DESENVOLVIMENTO DE SOFTWARE LTDA
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
          <I18n as="h2" style={h2} pt="Documentos correlatos" en="Related documents" />
          <I18n
            style={p}
            pt={
              <>
                <a href="/informacoes-legais" style={accent}>Informações Legais</a>
                {' · '}
                <a href="/politica-privacidade" style={accent}>Política de Privacidade</a>
                {' · '}
                <a href="/politica-seguranca" style={accent}>Política de Segurança da Informação</a>
                {' · '}
                <a href="/seguranca-ia" style={accent}>Central de confiança</a>
              </>
            }
            en={
              <>
                <a href="/informacoes-legais" style={accent}>Legal Information</a>
                {' · '}
                <a href="/politica-privacidade" style={accent}>Privacy Policy</a>
                {' · '}
                <a href="/politica-seguranca" style={accent}>Information Security Policy</a>
                {' · '}
                <a href="/seguranca-ia" style={accent}>Trust Center</a>
              </>
            }
          />
        </section>
      </div>
    </div>
  );
}
