import { I18n } from '@/lib/i18n-react';

export const metadata = {
  title: 'Política de Segurança da Informação — Orbit Gestão',
  description:
    'Política de Segurança da Informação da Orbit Gestão: governança, controles técnicos, privacidade (LGPD), continuidade e resposta a incidentes.',
  alternates: { canonical: 'https://orbitgestao.com.br/politica-seguranca' },
};

const wrap = { background: '#0D1117', color: '#C9D1D9', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" } as const;
const container = { maxWidth: 820, margin: '0 auto' } as const;
const back = { color: '#ffba1a', textDecoration: 'none', fontSize: 14, marginBottom: 32, display: 'inline-block' } as const;
const h1 = { fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 } as const;
const stamp = { color: '#8B949E', marginBottom: 16 } as const;
const meta = { color: '#8B949E', marginBottom: 40, fontSize: 14, lineHeight: 1.6 } as const;
const h2 = { fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12, marginTop: 8 } as const;
const h3 = { fontSize: 17, fontWeight: 700, color: '#fff', margin: '20px 0 8px' } as const;
const p = { lineHeight: 1.7, marginBottom: 12 } as const;
const ul = { paddingLeft: 24, lineHeight: 1.9, marginBottom: 12 } as const;
const ol = { paddingLeft: 24, lineHeight: 1.9, marginBottom: 12 } as const;
const section = { marginBottom: 32 } as const;
const strong = { color: '#fff' } as const;
const accent = { color: '#ffba1a' } as const;

export default function Page() {
  return (
    <div style={wrap}>
      <div style={container}>
        <I18n as="a" href="/seguranca-ia" style={back} pt="← Central de confiança" en="← Trust Center" />
        <I18n as="h1" style={h1} pt="Política de Segurança da Informação" en="Information Security Policy" />
        <I18n
          as="p"
          style={stamp}
          pt="Versão 1.0 · Vigente desde 15 de agosto de 2026"
          en="Version 1.0 · In force since 15 August 2026"
        />
        <I18n
          as="p"
          style={meta}
          pt={
            <>
              Emitida pela <strong style={strong}>Orbit Gestão</strong>, operadora da plataforma SaaS Orbit.
              Revisão: no mínimo anual, ou quando houver mudança material de arquitetura, subprocessador ou obrigação legal.
              Canal: <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
            </>
          }
          en={
            <>
              Issued by <strong style={strong}>Orbit Gestão</strong>, operator of the Orbit SaaS platform.
              Review: at least annually, or upon a material change in architecture, sub-processor or legal obligation.
              Channel: <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
            </>
          }
        />

        <section style={section}>
          <I18n as="h2" style={h2} pt="1. Objetivo" en="1. Purpose" />
          <I18n
            style={p}
            pt="Esta Política de Segurança da Informação (PSI) estabelece os princípios, responsabilidades e controles que a Orbit Gestão aplica para proteger a confidencialidade, a integridade e a disponibilidade das informações da plataforma e dos dados que o cliente confia ao serviço."
            en="This Information Security Policy (ISP) sets out the principles, responsibilities and controls that Orbit Gestão applies to protect the confidentiality, integrity and availability of platform information and of the data the customer entrusts to the service."
          />
          <I18n
            style={p}
            pt={
              <>
                A PSI atende, no que couber, à Lei nº 13.709/2018 (LGPD), em especial os arts. 46 a 49 (segurança e
                boas práticas) e o art. 48 (comunicação de incidente); à Lei nº 12.965/2014 (Marco Civil da Internet),
                no que se aplica a registros de acesso; e às boas práticas das normas ISO/IEC 27001:2022 e ISO/IEC 27701,
                usadas como referência do Sistema de Gestão de Segurança da Informação (SGSI) em implementação.
                A Orbit <strong style={strong}>não afirma</strong> possuir certificado ISO 27001 ou 27701 emitido.
              </>
            }
            en={
              <>
                This Policy complies, as applicable, with Law No. 13,709/2018 (LGPD), in particular arts. 46 to 49 (security and
                good practices) and art. 48 (incident notification); with Law No. 12,965/2014 (Brazilian Internet Civil Framework),
                as it applies to access logs; and with the good practices of ISO/IEC 27001:2022 and ISO/IEC 27701,
                used as a reference for the Information Security Management System (ISMS) being implemented.
                Orbit <strong style={strong}>does not claim</strong> to hold an issued ISO 27001 or 27701 certificate.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="2. Abrangência" en="2. Scope" />
          <I18n style={p} pt="Esta política aplica-se a:" en="This policy applies to:" />
          <ul style={ul}>
            <I18n as="li" pt="colaboradores, contratados e prestadores com acesso a sistemas, código ou dados da Orbit;" en="employees, contractors and service providers with access to Orbit systems, code or data;" />
            <I18n as="li" pt="ambientes de produção, homologação e desenvolvimento da plataforma;" en="production, staging and development environments of the platform;" />
            <I18n as="li" pt="dados de conta, dados da organização cliente e registros técnicos necessários à operação e à segurança;" en="account data, customer organization data and technical records necessary for operation and security;" />
            <I18n as="li" pt="subprocessadores utilizados para executar o serviço contratado." en="sub-processors used to perform the contracted service." />
          </ul>
          <I18n
            style={p}
            pt="Não cobre a segurança dos dispositivos, redes ou contas do cliente fora da plataforma, nem a configuração interna que o administrador da organização fizer no produto (privilégios, MFA dos usuários finais, alçadas)."
            en="It does not cover the security of the customer’s devices, networks or accounts outside the platform, nor the internal configuration that the organization’s administrator makes in the product (privileges, end-user MFA, approval thresholds)."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="3. Princípios" en="3. Principles" />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Mínimo privilégio.</strong> Acesso só ao necessário para a função.
                </>
              }
              en={
                <>
                  <strong style={strong}>Least privilege.</strong> Access only as needed for the role.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Isolamento multi-tenant.</strong> Dados de uma organização não são visíveis a outra, ressalvado o acesso do Canal à Organização do seu Cliente (cláusula 5.3 dos Termos v3.0).
                </>
              }
              en={
                <>
                  <strong style={strong}>Multi-tenant isolation.</strong> Data of one organization is not visible to another, except for the Channel’s access to its Customer’s Organization (clause 5.3 of the Terms v3.0).
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Defesa em profundidade.</strong> Controles se sobrepõem (identidade, autorização no banco, borda, revisão de código).
                </>
              }
              en={
                <>
                  <strong style={strong}>Defence in depth.</strong> Controls overlap (identity, database authorization, edge, code review).
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Não inventar evidência.</strong> Certificação ISO da Orbit e RTO cronometrado só são afirmados quando existirem. O DPA vigente é o Anexo IV dos Termos v3.0.
                </>
              }
              en={
                <>
                  <strong style={strong}>Do not invent evidence.</strong> Orbit ISO certification and a timed RTO are stated only when they exist. The current DPA is Annex IV of the Terms v3.0.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Privacidade desde a concepção.</strong> A Orbit atua, em regra, como operadora dos dados que o cliente insere.
                </>
              }
              en={
                <>
                  <strong style={strong}>Privacy by design.</strong> Orbit acts, as a rule, as Processor of the data the customer enters.
                </>
              }
            />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="4. Governança e responsabilidades" en="4. Governance and responsibilities" />
          <I18n as="h3" style={h3} pt="4.1. Orbit Gestão" en="4.1. Orbit Gestão" />
          <I18n
            style={p}
            pt="A diretoria da Orbit Gestão é responsável por esta política, pelos recursos do SGSI e pela publicação da Central de confiança. Não há, nesta versão, cargo público de CISO nominado; a operação de segurança é exercida pela equipe técnica e pela diretoria, com consultoria independente."
            en="Orbit Gestão’s board is responsible for this policy, for ISMS resources and for publication of the Trust Center. In this version there is no publicly named CISO role; security operations are performed by the technical team and the board, with independent consultancy."
          />
          <I18n as="h3" style={h3} pt="4.2. Encarregado (DPO)" en="4.2. Data Protection Officer" />
          <I18n
            style={p}
            pt={
              <>
                A Encarregada de Proteção de Dados é <strong style={strong}>Jennifer Dantas</strong>, com atuação via Templum Consultoria e plataforma{' '}
                <a href="https://dponet.com.br/" target="_blank" rel="noopener noreferrer" style={accent}>DPOnet</a>
                {' '}(Termos v3.0, cláusula 10.6.2):{' '}
                <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>.
                Prazo de resposta: 15 dias.
              </>
            }
            en={
              <>
                The Data Protection Officer is <strong style={strong}>Jennifer Dantas</strong>, acting through Templum Consultoria and the{' '}
                <a href="https://dponet.com.br/" target="_blank" rel="noopener noreferrer" style={accent}>DPOnet</a>
                {' '}platform (Terms v3.0, clause 10.6.2):{' '}
                <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>.
                Response period: 15 days.
              </>
            }
          />
          <I18n as="h3" style={h3} pt="4.3. Cliente (controlador)" en="4.3. Customer (controller)" />
          <I18n
            style={p}
            pt="A organização cliente é, em regra, a controladora dos dados que insere (clientes, colaboradores, documentos, financeiro). Cabe a ela base legal para o tratamento, gestão de usuários e privilégios no workspace, e o contato designado para notificações de incidente."
            en="The customer organization is, as a rule, the Controller of the data it enters (customers, employees, documents, finance). It is responsible for the legal basis for processing, for managing users and privileges in the workspace, and for the designated contact for incident notifications."
          />
          <I18n as="h3" style={h3} pt="4.4. Colaboradores e prestadores" en="4.4. Employees and contractors" />
          <I18n
            style={p}
            pt="Contas são nominais. É vedado compartilhar credenciais, contornar controles de acesso ou expor dados de cliente fora do necessário à função. Vulnerabilidades devem ser reportadas pelo canal desta política."
            en="Accounts are named. Sharing credentials, circumventing access controls or exposing customer data beyond what is necessary for the role is prohibited. Vulnerabilities must be reported through the channel in this policy."
          />
          <I18n as="h3" style={h3} pt="4.5. Canal (white-label)" en="4.5. Channel (white-label)" />
          <I18n
            style={p}
            pt="Quando o Cliente acessa por intermédio de um Canal, o Canal trata dados da Organização só para configuração, suporte e acompanhamento (cláusula 5.3). É vedado ao Canal treinar modelos, exportar ou comercializar esses dados. O suporte de primeiro nível é do Canal."
            en="When the Customer accesses through a Channel, the Channel processes Organization data only for configuration, support and monitoring (clause 5.3). The Channel is prohibited from training models, exporting or commercializing that data. First-level support is provided by the Channel."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="5. Classificação da informação" en="5. Information classification" />
          <I18n style={p} pt="A informação tratada na operação classifica-se, no mínimo, em:" en="Information processed in the operation is classified, at a minimum, as:" />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Pública.</strong> Conteúdo deste site, Central de confiança e políticas publicadas.
                </>
              }
              en={
                <>
                  <strong style={strong}>Public.</strong> Content of this website, Trust Center and published policies.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Interna.</strong> Runbooks, configurações e código sem dado de cliente.
                </>
              }
              en={
                <>
                  <strong style={strong}>Internal.</strong> Runbooks, configurations and code without customer data.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Confidencial.</strong> Dados da organização no SaaS, credenciais, chaves, relatórios de pentest, playbooks de incidente.
                </>
              }
              en={
                <>
                  <strong style={strong}>Confidential.</strong> Organization data in the SaaS, credentials, keys, pentest reports, incident playbooks.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Restrita.</strong> Segredos de infraestrutura, dumps, evidência forense e pacote sob NDA.
                </>
              }
              en={
                <>
                  <strong style={strong}>Restricted.</strong> Infrastructure secrets, dumps, forensic evidence and the package under NDA.
                </>
              }
            />
          </ul>
          <I18n
            style={p}
            pt="Relatórios completos de teste de intrusão e playbooks internos não são públicos. Circulam sob confidencialidade, no pacote de due diligence."
            en="Full penetration-test reports and internal playbooks are not public. They circulate under confidentiality, in the due-diligence package."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="6. Controle de acesso" en="6. Access control" />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Isolamento por organização.</strong> Row Level Security (RLS) no PostgreSQL em tabelas de dados da aplicação.
                </>
              }
              en={
                <>
                  <strong style={strong}>Isolation by organization.</strong> Row Level Security (RLS) in PostgreSQL on application data tables.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>RBAC.</strong> Papéis de plataforma (super_admin, channel_admin, org_admin, member) e privilégios granulares por módulo, configuráveis pelo administrador da organização.
                </>
              }
              en={
                <>
                  <strong style={strong}>RBAC.</strong> Platform roles (super_admin, channel_admin, org_admin, member) and granular privileges by module, configurable by the organization’s administrator.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Autenticação.</strong> Sessão autenticada na aplicação. MFA disponível aos usuários; MFA obrigatório nos consoles administrativos da infraestrutura e no repositório de código.
                </>
              }
              en={
                <>
                  <strong style={strong}>Authentication.</strong> Authenticated session in the application. MFA available to users; MFA mandatory on infrastructure administrative consoles and on the code repository.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Borda.</strong> Edge Functions com verificação de JWT por padrão; exceções inventariadas, com gate próprio (cron, webhook, endpoint público declarado).
                </>
              }
              en={
                <>
                  <strong style={strong}>Edge.</strong> Edge Functions with JWT verification by default; inventoried exceptions, with their own gate (cron, webhook, declared public endpoint).
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Ciclo de vida da conta.</strong> Concessão pelo vínculo com a organização; revogação no desligamento ou na perda do vínculo.
                </>
              }
              en={
                <>
                  <strong style={strong}>Account lifecycle.</strong> Grant through the link with the organization; revocation upon termination or loss of that link.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Privilégio de serviço.</strong> Credencial de serviço do banco é restrita, com MFA e registro. Não é descrita como mídia WORM fiscal.
                </>
              }
              en={
                <>
                  <strong style={strong}>Service privilege.</strong> The database service credential is restricted, with MFA and logging. It is not described as fiscal WORM media.
                </>
              }
            />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="7. Criptografia" en="7. Encryption" />
          <ul style={ul}>
            <I18n as="li" pt="Em trânsito: TLS 1.3." en="In transit: TLS 1.3." />
            <I18n as="li" pt="Em repouso: AES-256 no datastore de produção (Supabase / AWS)." en="At rest: AES-256 on the production datastore (Supabase / AWS)." />
            <I18n as="li" pt="Segredos fora do código-fonte; chaves de integração armazenadas criptografadas." en="Secrets kept out of source code; integration keys stored encrypted." />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="8. Segurança da aplicação e da operação" en="8. Application and operations security" />
          <ul style={ul}>
            <I18n as="li" pt="Revisão de código antes de produção." en="Code review before production." />
            <I18n as="li" pt="Suíte de testes de contrato de segurança no CI." en="Security contract test suite in CI." />
            <I18n
              as="li"
              pt="Logs de aplicação e API, auditoria de banco, trilha administrativa e métricas de Edge Functions, com acesso restrito. Registros de acesso a aplicações de internet: 6 meses (Marco Civil, art. 15)."
              en="Application and API logs, database audit, administrative trail and Edge Functions metrics, with restricted access. Internet application access logs: 6 months (Brazilian Internet Civil Framework, art. 15)."
            />
            <I18n
              as="li"
              pt={
                <>
                  Teste de intrusão por terceiro independente (<strong style={strong}>HOUS3</strong>), em rotina mensal,
                  sobre aplicação web e API (white-box), inclusive autenticação. Achados são tratados com plano de fechamento.
                  Atestado público HOUS3-2026-0002 em{' '}
                  <a href="https://www.hous3.com.br/v/orb26-p9n4" target="_blank" rel="noopener noreferrer" style={accent}>
                    hous3.com.br/v/orb26-p9n4
                  </a>
                  . O relatório completo permanece sob NDA; não se publicam vetores nem payloads.
                </>
              }
              en={
                <>
                  Penetration testing by an independent third party (<strong style={strong}>HOUS3</strong>), on a monthly routine,
                  covering the web application and API (white-box), including authentication. Findings are handled with a closure plan.
                  Public attestation HOUS3-2026-0002 at{' '}
                  <a href="https://www.hous3.com.br/v/orb26-p9n4" target="_blank" rel="noopener noreferrer" style={accent}>
                    hous3.com.br/v/orb26-p9n4
                  </a>
                  . The full report remains under NDA; vectors and payloads are not published.
                </>
              }
            />
            <I18n
              as="li"
              pt="Último ciclo documentado na Central de confiança: agosto de 2026. Resultado material comunicado: não houve vazamento entre organizações nem quebra do isolamento multi-tenant no teste."
              en="Last cycle documented in the Trust Center: August 2026. Material result communicated: there was no leakage between organizations and no breach of multi-tenant isolation in the test."
            />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="9. Continuidade, backup e disponibilidade" en="9. Continuity, backup and availability" />
          <I18n
            style={p}
            pt={
              <>
                Produção na região AWS <strong style={strong}>sa-east-1 (São Paulo)</strong>, via Supabase.
                Point-in-Time Recovery (PITR) ativo: WAL arquivado a cada 2 minutos; janela de recuperação de 7 dias
                (fuso de Brasília).
              </>
            }
            en={
              <>
                Production in AWS region <strong style={strong}>sa-east-1 (São Paulo)</strong>, via Supabase.
                Point-in-Time Recovery (PITR) enabled: WAL archived every 2 minutes; 7-day recovery window
                (Brasília time zone).
              </>
            }
          />
          <ul style={ul}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>RPO do banco:</strong> 2 minutos no pior caso.
                </>
              }
              en={
                <>
                  <strong style={strong}>Database RPO:</strong> 2 minutes in the worst case.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>RTO:</strong> restore PITR no mesmo projeto deixa a produção inacessível;
                  a duração depende do tamanho do banco. A Orbit não publica um RTO cronometrado de failover até o
                  teste formal de DR do SGSI nesse caminho.
                </>
              }
              en={
                <>
                  <strong style={strong}>RTO:</strong> a PITR restore in the same project makes production inaccessible;
                  duration depends on database size. Orbit does not publish a timed failover RTO until a
                  formal ISMS DR test of that path.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Testes periódicos de restauração completa:</strong> a cadeia de backup é
                  exercitada restaurando o banco para um projeto Supabase novo (sem sobrescrever a produção). Último
                  ciclo documentado: 3 de julho de 2026, 00:44:57 UTC — restauração &quot;backup orbit&quot;, status
                  COMPLETED. Isso prova que o PITR gera um datastore utilizável; não substitui o RTO de failover.
                </>
              }
              en={
                <>
                  <strong style={strong}>Periodic full restoration tests:</strong> the backup chain is
                  exercised by restoring the database to a new Supabase project (without overwriting production). Last
                  documented cycle: 3 July 2026, 00:44:57 UTC — &quot;backup orbit&quot; restoration, status
                  COMPLETED. This proves that PITR produces a usable datastore; it does not replace a failover RTO.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Storage:</strong> arquivos no Storage não entram no backup do PostgreSQL.
                  Restaurar um ponto antigo não recupera objetos apagados depois daquele ponto.
                </>
              }
              en={
                <>
                  <strong style={strong}>Storage:</strong> files in Storage are not included in the PostgreSQL backup.
                  Restoring an older point does not recover objects deleted after that point.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Disponibilidade:</strong> compromisso vinculante de 99,0% mensal (Termos v3.0, Anexo III),
                  com as exclusões da cláusula 12.2. Na contratação direta há crédito de serviço nas faixas do Anexo III.
                  Via Canal, o crédito é devido ao Canal. Status da infraestrutura em{' '}
                  <a href="/status" style={accent}>orbitgestao.com.br/status</a>.
                </>
              }
              en={
                <>
                  <strong style={strong}>Availability:</strong> binding monthly commitment of 99.0% (Terms v3.0, Annex III),
                  with the exclusions in clause 12.2. On a direct contract there is service credit in the Annex III bands.
                  Via Channel, credit is due to the Channel. Infrastructure status at{' '}
                  <a href="/status" style={accent}>orbitgestao.com.br/status</a>.
                </>
              }
            />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="10. Subprocessadores e transferências" en="10. Sub-processors and transfers" />
          <I18n
            style={p}
            pt={
              <>
                Dados da organização são enviados a subprocessadores somente para executar o serviço. A Orbit não vende dados.
                A lista vigente é o Anexo IV dos Termos de Uso v3.0, também publicada na{' '}
                <a href="/seguranca-ia#sia-subprocessadores" style={accent}>Central de confiança</a>
                : essenciais (Supabase, Cloudflare, OpenAI, Evolumeet, ElevenLabs, Twilio, Resend, MailerSend, Stripe)
                e opcionais só se o Cliente habilitar (Google, Meta, LinkedIn, Perplexity/Firecrawl/Apify, instituições
                financeiras e emissores fiscais).
              </>
            }
            en={
              <>
                Organization data is sent to sub-processors only to perform the service. Orbit does not sell data.
                The current list is Annex IV of the Terms of Use v3.0, also published in the{' '}
                <a href="/seguranca-ia#sia-subprocessadores" style={accent}>Trust Center</a>
                : essential (Supabase, Cloudflare, OpenAI, Evolumeet, ElevenLabs, Twilio, Resend, MailerSend, Stripe)
                and optional only if the Customer enables them (Google, Meta, LinkedIn, Perplexity/Firecrawl/Apify, financial
                institutions and tax issuers).
              </>
            }
          />
          <I18n
            style={p}
            pt="Inferência de IA na requisição envia o contexto necessário à tarefa. O Conteúdo do Cliente não treina modelos da Orbit nem de terceiros (cláusula 6.6). Banco e arquivos no Brasil; IA, gravação, mensageria, e-mail e pagamento, no todo ou em parte, nos EUA, com cláusulas contratuais (LGPD, art. 33; Anexo IV.5)."
            en="AI inference on the request sends the context necessary for the task. Customer Content does not train Orbit or third-party models (clause 6.6). Database and files in Brazil; AI, recording, messaging, email and payment, in whole or in part, in the United States, with contractual clauses (LGPD, art. 33; Annex IV.5)."
          />
          <I18n
            style={p}
            pt={
              <>
                Dados obtidos via OAuth do Google seguem Uso Limitado, conforme a{' '}
                <a href="/politica-privacidade" style={accent}>Política de Privacidade</a>, e não são enviados a
                provedores de IA para treino.
              </>
            }
            en={
              <>
                Data obtained via Google OAuth follows Limited Use, as set out in the{' '}
                <a href="/politica-privacidade" style={accent}>Privacy Policy</a>, and is not sent to
                AI providers for training.
              </>
            }
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="11. Privacidade e papel de operador" en="11. Privacy and processor role" />
          <I18n
            style={p}
            pt="O tratamento de dados pessoais segue a Política de Privacidade. Bases típicas: execução de contrato (LGPD, art. 7º, V), obrigação legal quando couber, consentimento para gravações e integrações opcionais, e legítimo interesse para segurança da plataforma, com balanceamento de direitos."
            en="Processing of personal data follows the Privacy Policy. Typical bases: performance of a contract (LGPD, art. 7, V), legal obligation where applicable, consent for recordings and optional integrations, and legitimate interest for platform security, with a balancing of rights."
          />
          <I18n
            style={p}
            pt="Após o encerramento: 30 dias só leitura para exportar e 60 dias arquivado, depois eliminação ou anonimização, salvo obrigação legal (cláusula 15.3). Gravações de reunião (mídia): 90 dias da reunião. Direitos do titular sobre o Conteúdo do Cliente exercem-se perante o Controlador; os demais, perante a Encarregada."
            en="After termination: 30 days read-only to export and 60 days archived, then deletion or anonymization, unless a legal obligation applies (clause 15.3). Meeting recordings (media): 90 days from the meeting. Data-subject rights over Customer Content are exercised vis-à-vis the Controller; other rights, vis-à-vis the DPO."
          />
          <I18n
            style={p}
            pt="O acordo de tratamento (DPA) é o Anexo IV dos Termos de Uso v3.0, aceito eletronicamente na Plataforma."
            en="The data processing agreement (DPA) is Annex IV of the Terms of Use v3.0, accepted electronically on the Platform."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="12. Resposta a incidentes" en="12. Incident response" />
          <I18n
            style={p}
            pt="Incidente de segurança que envolva dados pessoais segue o fluxo publicado. O playbook interno (contatos, runbooks, evidência) permanece sob NDA."
            en="A security incident involving personal data follows the published flow. The internal playbook (contacts, runbooks, evidence) remains under NDA."
          />
          <ol style={ol}>
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Detecção e contenção.</strong> Identificação técnica; contenção imediata (revogação de sessões/tokens, isolamento).
                </>
              }
              en={
                <>
                  <strong style={strong}>Detection and containment.</strong> Technical identification; immediate containment (revocation of sessions/tokens, isolation).
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Acionamento interno.</strong> Equipe responsável em até 1 hora para incidentes classificados como críticos.
                </>
              }
              en={
                <>
                  <strong style={strong}>Internal escalation.</strong> Responsible team within 1 hour for incidents classified as critical.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Notificação ao Cliente.</strong> Comunicação ao Controlador em até 48 horas do
                  conhecimento do fato (cláusula 10.7.1). A comunicação à ANPD e aos titulares compete ao Controlador,
                  com apoio da Orbit (cláusula 10.7.2 e art. 48 da LGPD).
                </>
              }
              en={
                <>
                  <strong style={strong}>Notice to the Customer.</strong> Communication to the Controller within 48 hours of
                  becoming aware of the fact (clause 10.7.1). Communication to the ANPD and to data subjects is the Controller’s duty,
                  with Orbit’s support (clause 10.7.2 and LGPD art. 48).
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Conteúdo.</strong> Natureza, dados potencialmente afetados, contenção e próximos passos, ao administrador da organização e ao Encarregado, quando aplicável.
                </>
              }
              en={
                <>
                  <strong style={strong}>Content.</strong> Nature, potentially affected data, containment and next steps, to the organization’s administrator and to the DPO, where applicable.
                </>
              }
            />
            <I18n
              as="li"
              pt={
                <>
                  <strong style={strong}>Pós-incidente.</strong> Causa raiz, medidas preventivas e registro para o SGSI.
                </>
              }
              en={
                <>
                  <strong style={strong}>Post-incident.</strong> Root cause, preventive measures and record for the ISMS.
                </>
              }
            />
          </ol>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="13. Controles do módulo financeiro" en="13. Finance module controls" />
          <I18n
            style={p}
            pt="No produto: trilha de auditoria append-only por trigger de banco (INSERT/UPDATE/DELETE diretos bloqueados por RLS); snapshots de fechamento com hash de integridade; segregação de funções por privilégio (visualizar, lançar, aprovar, baixar). A segregação efetiva depende de o administrador da organização não acumular todos os privilégios na mesma pessoa."
            en="In the product: append-only audit trail via database trigger (direct INSERT/UPDATE/DELETE blocked by RLS); closing snapshots with an integrity hash; segregation of duties by privilege (view, post, approve, settle). Effective segregation depends on the organization’s administrator not concentrating all privileges in the same person."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="14. Ambiente físico e pessoal" en="14. Physical and personnel environment" />
          <I18n
            style={p}
            pt="A produção não é hospedada em data center próprio da Orbit; opera na nuvem AWS (sa-east-1) sob responsabilidade do provedor. Escritórios e equipamentos locais não hospedam o banco de produção. Acesso a consoles e ao código exige conta nominal e MFA, conforme a seção 6."
            en="Production is not hosted in an Orbit-owned data center; it runs on AWS cloud (sa-east-1) under the provider’s responsibility. Local offices and equipment do not host the production database. Access to consoles and to the code requires a named account and MFA, as set out in section 6."
          />
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="15. Uso aceitável e divulgação responsável" en="15. Acceptable use and responsible disclosure" />
          <ul style={ul}>
            <I18n as="li" pt="É vedado tentar contornar RLS, RBAC, autenticação ou isolamento entre organizações." en="Attempting to circumvent RLS, RBAC, authentication or isolation between organizations is prohibited." />
            <I18n as="li" pt="É vedado publicar ou revender dados de cliente obtidos no exercício da função." en="Publishing or reselling customer data obtained in the course of the role is prohibited." />
            <I18n
              as="li"
              pt={
                <>
                  Falhas de segurança devem ser comunicadas a{' '}
                  <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
                  {' '}antes de divulgação pública. Esta política não institui bug bounty.
                </>
              }
              en={
                <>
                  Security flaws must be reported to{' '}
                  <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
                  {' '}before public disclosure. This policy does not establish a bug bounty.
                </>
              }
            />
          </ul>
        </section>

        <section style={section}>
          <I18n as="h2" style={h2} pt="16. Revisão, vigência e documentos relacionados" en="16. Review, validity and related documents" />
          <I18n
            style={p}
            pt="Esta versão 1.0 entra em vigor na data do carimbo acima. Revisão no mínimo a cada 12 meses, ou antes, se mudar arquitetura material, subprocessador relevante, obrigação legal ou resultado de incidente/pentest que exija alteração de controle."
            en="This version 1.0 takes effect on the date of the stamp above. Review at least every 12 months, or earlier if there is a material architecture change, a relevant sub-processor, a legal obligation, or an incident/pentest result that requires a control change."
          />
          <ul style={ul}>
            <I18n
              as="li"
              pt={<a href="/politica-privacidade" style={accent}>Política de Privacidade</a>}
              en={<a href="/politica-privacidade" style={accent}>Privacy Policy</a>}
            />
            <I18n
              as="li"
              pt={<a href="/termos-de-servico" style={accent}>Termos de Serviço</a>}
              en={<a href="/termos-de-servico" style={accent}>Terms of Service</a>}
            />
            <I18n
              as="li"
              pt={
                <>
                  <a href="/seguranca-ia" style={accent}>Central de confiança</a> (controles, subprocessadores, SLA, incidentes)
                </>
              }
              en={
                <>
                  <a href="/seguranca-ia" style={accent}>Trust Center</a> (controls, sub-processors, SLA, incidents)
                </>
              }
            />
          </ul>
          <I18n
            style={p}
            pt="Em caso de conflito entre o resumo da Central de confiança e esta PSI, prevalece o texto desta política, salvo se os Termos de Serviço dispuserem de forma mais específica sobre disponibilidade ou responsabilidade."
            en="In case of conflict between the Trust Center summary and this Policy, the text of this policy prevails, unless the Terms of Service provide more specifically on availability or liability."
          />
        </section>

        <I18n
          as="p"
          style={{ color: '#484F58', fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: '1px solid #21262d', textAlign: 'center' }}
          pt="Orbit Gestão · Política de Segurança da Informação v1.0 · 15 de agosto de 2026"
          en="Orbit Gestão · Information Security Policy v1.0 · 15 August 2026"
        />
      </div>
    </div>
  );
}
