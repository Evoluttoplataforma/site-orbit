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
        <a href="/seguranca-ia" style={back}>← Central de confiança</a>
        <h1 style={h1}>Política de Segurança da Informação</h1>
        <p style={stamp}>Versão 1.0 · Vigente desde 15 de agosto de 2026</p>
        <p style={meta}>
          Emitida pela <strong style={strong}>Orbit Gestão</strong>, operadora da plataforma SaaS Orbit.
          Revisão: no mínimo anual, ou quando houver mudança material de arquitetura, subprocessador ou obrigação legal.
          Canal: <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
        </p>

        <section style={section}>
          <h2 style={h2}>1. Objetivo</h2>
          <p style={p}>
            Esta Política de Segurança da Informação (PSI) estabelece os princípios, responsabilidades e controles
            que a Orbit Gestão aplica para proteger a confidencialidade, a integridade e a disponibilidade das
            informações da plataforma e dos dados que o cliente confia ao serviço.
          </p>
          <p style={p}>
            A PSI atende, no que couber, à Lei nº 13.709/2018 (LGPD), em especial os arts. 46 a 49 (segurança e
            boas práticas) e o art. 48 (comunicação de incidente); à Lei nº 12.965/2014 (Marco Civil da Internet),
            no que se aplica a registros de acesso; e às boas práticas das normas ISO/IEC 27001:2022 e ISO/IEC 27701,
            usadas como referência do Sistema de Gestão de Segurança da Informação (SGSI) em implementação.
            A Orbit <strong style={strong}>não afirma</strong> possuir certificado ISO 27001 ou 27701 emitido.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>2. Abrangência</h2>
          <p style={p}>Esta política aplica-se a:</p>
          <ul style={ul}>
            <li>colaboradores, contratados e prestadores com acesso a sistemas, código ou dados da Orbit;</li>
            <li>ambientes de produção, homologação e desenvolvimento da plataforma;</li>
            <li>dados de conta, dados da organização cliente e registros técnicos necessários à operação e à segurança;</li>
            <li>subprocessadores utilizados para executar o serviço contratado.</li>
          </ul>
          <p style={p}>
            Não cobre a segurança dos dispositivos, redes ou contas do cliente fora da plataforma, nem a configuração
            interna que o administrador da organização fizer no produto (privilégios, MFA dos usuários finais, alçadas).
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>3. Princípios</h2>
          <ul style={ul}>
            <li><strong style={strong}>Mínimo privilégio.</strong> Acesso só ao necessário para a função.</li>
            <li><strong style={strong}>Isolamento multi-tenant.</strong> Dados de uma organização não são visíveis a outra, ressalvado o acesso do Canal à Organização do seu Cliente (cláusula 5.3 dos Termos v3.0).</li>
            <li><strong style={strong}>Defesa em profundidade.</strong> Controles se sobrepõem (identidade, autorização no banco, borda, revisão de código).</li>
            <li><strong style={strong}>Não inventar evidência.</strong> Certificação ISO da Orbit e RTO cronometrado só são afirmados quando existirem. O DPA vigente é o Anexo IV dos Termos v3.0.</li>
            <li><strong style={strong}>Privacidade desde a concepção.</strong> A Orbit atua, em regra, como operadora dos dados que o cliente insere.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>4. Governança e responsabilidades</h2>
          <h3 style={h3}>4.1. Orbit Gestão</h3>
          <p style={p}>
            A diretoria da Orbit Gestão é responsável por esta política, pelos recursos do SGSI e pela publicação
            da Central de confiança. Não há, nesta versão, cargo público de CISO nominado; a operação de segurança
            é exercida pela equipe técnica e pela diretoria, com consultoria independente.
          </p>
          <h3 style={h3}>4.2. Encarregado (DPO)</h3>
          <p style={p}>
            A Encarregada de Proteção de Dados é <strong style={strong}>Jennifer Dantas</strong>, com atuação via Templum Consultoria e plataforma{' '}
            <a href="https://dponet.com.br/" target="_blank" rel="noopener noreferrer" style={accent}>DPOnet</a>
            {' '}(Termos v3.0, cláusula 10.6.2):{' '}
            <a href="mailto:jennifer.dantas@templum.com.br" style={accent}>jennifer.dantas@templum.com.br</a>.
            Prazo de resposta: 15 dias.
          </p>
          <h3 style={h3}>4.3. Cliente (controlador)</h3>
          <p style={p}>
            A organização cliente é, em regra, a controladora dos dados que insere (clientes, colaboradores,
            documentos, financeiro). Cabe a ela base legal para o tratamento, gestão de usuários e privilégios
            no workspace, e o contato designado para notificações de incidente.
          </p>
          <h3 style={h3}>4.4. Colaboradores e prestadores</h3>
          <p style={p}>
            Contas são nominais. É vedado compartilhar credenciais, contornar controles de acesso ou expor dados
            de cliente fora do necessário à função. Vulnerabilidades devem ser reportadas pelo canal desta política.
          </p>
          <h3 style={h3}>4.5. Canal (white-label)</h3>
          <p style={p}>
            Quando o Cliente acessa por intermédio de um Canal, o Canal trata dados da Organização só para
            configuração, suporte e acompanhamento (cláusula 5.3). É vedado ao Canal treinar modelos, exportar
            ou comercializar esses dados. O suporte de primeiro nível é do Canal.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>5. Classificação da informação</h2>
          <p style={p}>A informação tratada na operação classifica-se, no mínimo, em:</p>
          <ul style={ul}>
            <li><strong style={strong}>Pública.</strong> Conteúdo deste site, Central de confiança e políticas publicadas.</li>
            <li><strong style={strong}>Interna.</strong> Runbooks, configurações e código sem dado de cliente.</li>
            <li><strong style={strong}>Confidencial.</strong> Dados da organização no SaaS, credenciais, chaves, relatórios de pentest, playbooks de incidente.</li>
            <li><strong style={strong}>Restrita.</strong> Segredos de infraestrutura, dumps, evidência forense e pacote sob NDA.</li>
          </ul>
          <p style={p}>
            Relatórios completos de teste de intrusão e playbooks internos não são públicos. Circulam sob
            confidencialidade, no pacote de due diligence.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>6. Controle de acesso</h2>
          <ul style={ul}>
            <li><strong style={strong}>Isolamento por organização.</strong> Row Level Security (RLS) no PostgreSQL em tabelas de dados da aplicação.</li>
            <li><strong style={strong}>RBAC.</strong> Papéis de plataforma (super_admin, channel_admin, org_admin, member) e privilégios granulares por módulo, configuráveis pelo administrador da organização.</li>
            <li><strong style={strong}>Autenticação.</strong> Sessão autenticada na aplicação. MFA disponível aos usuários; MFA obrigatório nos consoles administrativos da infraestrutura e no repositório de código.</li>
            <li><strong style={strong}>Borda.</strong> Edge Functions com verificação de JWT por padrão; exceções inventariadas, com gate próprio (cron, webhook, endpoint público declarado).</li>
            <li><strong style={strong}>Ciclo de vida da conta.</strong> Concessão pelo vínculo com a organização; revogação no desligamento ou na perda do vínculo.</li>
            <li><strong style={strong}>Privilégio de serviço.</strong> Credencial de serviço do banco é restrita, com MFA e registro. Não é descrita como mídia WORM fiscal.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>7. Criptografia</h2>
          <ul style={ul}>
            <li>Em trânsito: TLS 1.3.</li>
            <li>Em repouso: AES-256 no datastore de produção (Supabase / AWS).</li>
            <li>Segredos fora do código-fonte; chaves de integração armazenadas criptografadas.</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>8. Segurança da aplicação e da operação</h2>
          <ul style={ul}>
            <li>Revisão de código antes de produção.</li>
            <li>Suíte de testes de contrato de segurança no CI.</li>
            <li>Logs de aplicação e API, auditoria de banco, trilha administrativa e métricas de Edge Functions, com acesso restrito. Registros de acesso a aplicações de internet: 6 meses (Marco Civil, art. 15).</li>
            <li>
              Teste de intrusão por terceiro independente (<strong style={strong}>HOUS3</strong>), em rotina mensal,
              sobre aplicação web e API (white-box), inclusive autenticação. Achados são tratados com plano de fechamento.
              Atestado público HOUS3-2026-0002 em{' '}
              <a href="https://www.hous3.com.br/v/orb26-p9n4" target="_blank" rel="noopener noreferrer" style={accent}>
                hous3.com.br/v/orb26-p9n4
              </a>
              . O relatório completo permanece sob NDA; não se publicam vetores nem payloads.
            </li>
            <li>
              Último ciclo documentado na Central de confiança: agosto de 2026. Resultado material comunicado:
              não houve vazamento entre organizações nem quebra do isolamento multi-tenant no teste.
            </li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>9. Continuidade, backup e disponibilidade</h2>
          <p style={p}>
            Produção na região AWS <strong style={strong}>sa-east-1 (São Paulo)</strong>, via Supabase.
            Point-in-Time Recovery (PITR) ativo: WAL arquivado a cada 2 minutos; janela de recuperação de 7 dias
            (fuso de Brasília).
          </p>
          <ul style={ul}>
            <li><strong style={strong}>RPO do banco:</strong> 2 minutos no pior caso.</li>
            <li>
              <strong style={strong}>RTO:</strong> restore PITR no mesmo projeto deixa a produção inacessível;
              a duração depende do tamanho do banco. A Orbit não publica um RTO cronometrado de failover até o
              teste formal de DR do SGSI nesse caminho.
            </li>
            <li>
              <strong style={strong}>Testes periódicos de restauração completa:</strong> a cadeia de backup é
              exercitada restaurando o banco para um projeto Supabase novo (sem sobrescrever a produção). Último
              ciclo documentado: 3 de julho de 2026, 00:44:57 UTC — restauração &quot;backup orbit&quot;, status
              COMPLETED. Isso prova que o PITR gera um datastore utilizável; não substitui o RTO de failover.
            </li>
            <li>
              <strong style={strong}>Storage:</strong> arquivos no Storage não entram no backup do PostgreSQL.
              Restaurar um ponto antigo não recupera objetos apagados depois daquele ponto.
            </li>
            <li>
              <strong style={strong}>Disponibilidade:</strong> compromisso vinculante de 99,0% mensal (Termos v3.0, Anexo III),
              com as exclusões da cláusula 12.2. Na contratação direta há crédito de serviço nas faixas do Anexo III.
              Via Canal, o crédito é devido ao Canal. Status da infraestrutura em{' '}
              <a href="/status" style={accent}>orbitgestao.com.br/status</a>.
            </li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>10. Subprocessadores e transferências</h2>
          <p style={p}>
            Dados da organização são enviados a subprocessadores somente para executar o serviço. A Orbit não vende dados.
            A lista vigente é o Anexo IV dos Termos de Uso v3.0, também publicada na{' '}
            <a href="/seguranca-ia#sia-subprocessadores" style={accent}>Central de confiança</a>
            : essenciais (Supabase, Cloudflare, OpenAI, Evolumeet, ElevenLabs, Twilio, Resend, MailerSend, Stripe)
            e opcionais só se o Cliente habilitar (Google, Meta, LinkedIn, Perplexity/Firecrawl/Apify, instituições
            financeiras e emissores fiscais).
          </p>
          <p style={p}>
            Inferência de IA na requisição envia o contexto necessário à tarefa. O Conteúdo do Cliente não treina
            modelos da Orbit nem de terceiros (cláusula 6.6). Banco e arquivos no Brasil; IA, gravação, mensageria,
            e-mail e pagamento, no todo ou em parte, nos EUA, com cláusulas contratuais (LGPD, art. 33; Anexo IV.5).
          </p>
          <p style={p}>
            Dados obtidos via OAuth do Google seguem Uso Limitado, conforme a{' '}
            <a href="/politica-privacidade" style={accent}>Política de Privacidade</a>, e não são enviados a
            provedores de IA para treino.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>11. Privacidade e papel de operador</h2>
          <p style={p}>
            O tratamento de dados pessoais segue a Política de Privacidade. Bases típicas: execução de contrato
            (LGPD, art. 7º, V), obrigação legal quando couber, consentimento para gravações e integrações opcionais,
            e legítimo interesse para segurança da plataforma, com balanceamento de direitos.
          </p>
          <p style={p}>
            Após o encerramento: 30 dias só leitura para exportar e 60 dias arquivado, depois eliminação ou
            anonimização, salvo obrigação legal (cláusula 15.3). Gravações de reunião (mídia): 90 dias da reunião.
            Direitos do titular sobre o Conteúdo do Cliente exercem-se perante o Controlador; os demais, perante a Encarregada.
          </p>
          <p style={p}>
            O acordo de tratamento (DPA) é o Anexo IV dos Termos de Uso v3.0, aceito eletronicamente na Plataforma.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>12. Resposta a incidentes</h2>
          <p style={p}>
            Incidente de segurança que envolva dados pessoais segue o fluxo publicado. O playbook interno
            (contatos, runbooks, evidência) permanece sob NDA.
          </p>
          <ol style={ol}>
            <li><strong style={strong}>Detecção e contenção.</strong> Identificação técnica; contenção imediata (revogação de sessões/tokens, isolamento).</li>
            <li><strong style={strong}>Acionamento interno.</strong> Equipe responsável em até 1 hora para incidentes classificados como críticos.</li>
            <li>
              <strong style={strong}>Notificação ao Cliente.</strong> Comunicação ao Controlador em até 48 horas do
              conhecimento do fato (cláusula 10.7.1). A comunicação à ANPD e aos titulares compete ao Controlador,
              com apoio da Orbit (cláusula 10.7.2 e art. 48 da LGPD).
            </li>
            <li><strong style={strong}>Conteúdo.</strong> Natureza, dados potencialmente afetados, contenção e próximos passos, ao administrador da organização e ao Encarregado, quando aplicável.</li>
            <li><strong style={strong}>Pós-incidente.</strong> Causa raiz, medidas preventivas e registro para o SGSI.</li>
          </ol>
        </section>

        <section style={section}>
          <h2 style={h2}>13. Controles do módulo financeiro</h2>
          <p style={p}>
            No produto: trilha de auditoria append-only por trigger de banco (INSERT/UPDATE/DELETE diretos bloqueados
            por RLS); snapshots de fechamento com hash de integridade; segregação de funções por privilégio
            (visualizar, lançar, aprovar, baixar). A segregação efetiva depende de o administrador da organização
            não acumular todos os privilégios na mesma pessoa.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>14. Ambiente físico e pessoal</h2>
          <p style={p}>
            A produção não é hospedada em data center próprio da Orbit; opera na nuvem AWS (sa-east-1) sob
            responsabilidade do provedor. Escritórios e equipamentos locais não hospedam o banco de produção.
            Acesso a consoles e ao código exige conta nominal e MFA, conforme a seção 6.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>15. Uso aceitável e divulgação responsável</h2>
          <ul style={ul}>
            <li>É vedado tentar contornar RLS, RBAC, autenticação ou isolamento entre organizações.</li>
            <li>É vedado publicar ou revender dados de cliente obtidos no exercício da função.</li>
            <li>
              Falhas de segurança devem ser comunicadas a {' '}
              <a href="mailto:contato@orbitgestao.com.br" style={accent}>contato@orbitgestao.com.br</a>
              {' '}antes de divulgação pública. Esta política não institui bug bounty.
            </li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={h2}>16. Revisão, vigência e documentos relacionados</h2>
          <p style={p}>
            Esta versão 1.0 entra em vigor na data do carimbo acima. Revisão no mínimo a cada 12 meses, ou antes,
            se mudar arquitetura material, subprocessador relevante, obrigação legal ou resultado de incidente/pentest
            que exija alteração de controle.
          </p>
          <ul style={ul}>
            <li><a href="/politica-privacidade" style={accent}>Política de Privacidade</a></li>
            <li><a href="/termos-de-servico" style={accent}>Termos de Serviço</a></li>
            <li><a href="/seguranca-ia" style={accent}>Central de confiança</a> (controles, subprocessadores, SLA, incidentes)</li>
          </ul>
          <p style={p}>
            Em caso de conflito entre o resumo da Central de confiança e esta PSI, prevalece o texto desta política,
            salvo se os Termos de Serviço dispuserem de forma mais específica sobre disponibilidade ou responsabilidade.
          </p>
        </section>

        <p style={{ color: '#484F58', fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: '1px solid #21262d', textAlign: 'center' }}>
          Orbit Gestão · Política de Segurança da Informação v1.0 · 15 de agosto de 2026
        </p>
      </div>
    </div>
  );
}
