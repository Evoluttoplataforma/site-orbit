// Central de confiança — controles públicos de segurança, privacidade e continuidade.
//
// Regra desta página: só o que está sustentado por código, política publicada,
// questionário de fornecedor (docs/security no app) ou fato de infra confirmado.
// Não inventar certificado ISO da Orbit, RTO cronometrado nem DPA já assinado.

const gold = '#ffba1a';
const muted = '#8B949E';
const text = '#C9D1D9';
const white = '#fff';
const card =
  'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px 26px;';

type BadgeKind = 'live' | 'progress' | 'nda' | 'contract';

function badge(label: string, kind: BadgeKind): string {
  const map: Record<BadgeKind, string> = {
    live: 'background:rgba(63,185,80,0.12);color:#3FB950;border:1px solid rgba(63,185,80,0.28);',
    progress: 'background:rgba(255,186,26,0.12);color:#ffba1a;border:1px solid rgba(255,186,26,0.28);',
    nda: 'background:rgba(139,148,158,0.12);color:#C9D1D9;border:1px solid rgba(139,148,158,0.28);',
    contract: 'background:rgba(88,166,255,0.12);color:#58A6FF;border:1px solid rgba(88,166,255,0.28);',
  };
  return `<span class="sia-badge" style="display:inline-flex;align-items:center;${map[kind]}font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;padding:5px 10px;border-radius:100px;white-space:nowrap;">${label}</span>`;
}

function kicker(n: string, label: string): string {
  return `<span style="display:inline-block;color:${gold};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">${n} — ${label}</span>`;
}

function h2(title: string, accent?: string): string {
  const rest = accent
    ? `${title} <span style="color:${gold};">${accent}</span>`
    : title;
  return `<h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:800;color:${white};line-height:1.2;margin:0 0 16px;">${rest}</h2>`;
}

function p(html: string): string {
  return `<p style="font-size:1.02rem;color:${muted};line-height:1.7;margin:0 0 18px;max-width:820px;">${html}</p>`;
}

function section(
  id: string,
  alt: boolean,
  inner: string,
): string {
  const bg = alt ? '#0a0e13' : '#0D1117';
  return `
    <section id="${id}" style="background:${bg};padding:88px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="max-width:1100px;margin:0 auto;">
            ${inner}
        </div>
    </section>`;
}

const tocItems: { href: string; n: string; title: string; status: string; kind: BadgeKind }[] = [
  { href: '#sia-certificacoes', n: '01', title: 'Certificações e escopo', status: 'Em implementação', kind: 'progress' },
  { href: '/politica-seguranca', n: '02', title: 'Política de Segurança da Informação', status: 'Vigente', kind: 'live' },
  { href: '#sia-pentest', n: '03', title: 'Pentest independente', status: 'HOUS3 · atestado público', kind: 'nda' },
  { href: '#sia-backup', n: '04', title: 'Backup e continuidade', status: 'PITR · restore testado', kind: 'live' },
  { href: '#sia-sla', n: '05', title: 'Disponibilidade e suporte', status: '99,0% · /status', kind: 'live' },
  { href: '#sia-incidentes', n: '06', title: 'Resposta a incidentes (LGPD art. 48)', status: '48 h ao cliente', kind: 'live' },
  { href: '#sia-dpa', n: '07', title: 'DPA e Encarregado (DPO)', status: 'Anexo IV · DPO nomeada', kind: 'live' },
  { href: '#sia-canal', n: '08', title: 'Canal e white-label', status: 'Termos v3.0', kind: 'live' },
  { href: '#sia-subprocessadores', n: '09', title: 'Subprocessadores e transferências', status: 'Anexo IV', kind: 'live' },
  { href: '#sia-retencao', n: '10', title: 'Retenção, portabilidade e descarte', status: '30 + 60 dias', kind: 'live' },
  { href: '#sia-financeiro', n: '11', title: 'Controles do módulo financeiro', status: 'No produto', kind: 'live' },
];

function statusRow(): string {
  const items = [
    { label: 'Dados no Brasil', sub: 'AWS São Paulo · sa-east-1' },
    { label: 'ISO 27001 / 27701', sub: 'SGSI em implementação' },
    { label: 'Pentest independente', sub: 'HOUS3 PTaaS · atestado público' },
    { label: 'DPO nomeado', sub: 'Templum · DPOnet' },
    { label: 'Isolamento por org', sub: 'RLS no PostgreSQL' },
  ];
  return `
    <div class="sia-status" style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;max-width:1100px;margin:36px auto 0;">
      ${items
        .map(
          (it) => `
        <div style="${card}padding:18px 16px;text-align:left;">
          <div style="color:${white};font-size:0.92rem;font-weight:800;margin:0 0 6px;">${it.label}</div>
          <div style="color:${muted};font-size:0.8rem;line-height:1.45;">${it.sub}</div>
        </div>`,
        )
        .join('')}
    </div>`;
}

function packTable(): string {
  const rows: [string, string, string, BadgeKind][] = [
    ['Certificado ISO/IEC 27001 da Orbit', 'Não emitido — SGSI em implementação com a Templum', 'Quando o certificado for emitido', 'progress'],
    ['SOC 2 Tipo II da Orbit', 'Não possuímos. SOC 2 Tipo II e ISO 27001 cobrem a infraestrutura (Supabase / AWS)', 'Não reivindicar como certificação nossa', 'progress'],
    ['Política de Segurança da Informação aprovada', 'Vigente — <a href="/politica-seguranca" style="color:' + gold + ';font-weight:700;">política pública</a>', 'Documento público', 'live'],
    ['Atestado PTaaS (HOUS3)', 'Vigente — HOUS3-2026-0002; o badge nesta página lê o status em tempo real. Relatório técnico completo sob NDA', '<a href="https://www.hous3.com.br/v/orb26-p9n4" target="_blank" rel="noopener noreferrer" style="color:' + gold + ';font-weight:700;">Página de verificação</a>', 'live'],
    ['Política de backup e continuidade', 'PITR ativo (WAL 2 min, 7 dias, São Paulo); restore completo periódico para projeto novo — último ciclo documentado: jul/2026, COMPLETED', 'RTO de failover in-place ainda não cronometrado', 'live'],
    ['SLA de disponibilidade e suporte', '99,0% mensal (Anexo III dos Termos v3.0); crédito na contratação direta; status em /status', 'Página pública /status', 'live'],
    ['Plano de resposta a incidentes', 'Cliente em até 48 h (cláusula 10.7); ANPD compete ao controlador, com apoio da Orbit', 'Playbook interno sob NDA', 'nda'],
    ['Contrato de tratamento (DPA)', 'Anexo IV dos Termos de Uso v3.0 — aceite eletrônico na Plataforma', 'Documento vinculante já aceito', 'contract'],
    ['Lista de subprocessadores', 'Anexo IV (essenciais e opcionais), nesta página', 'Atualização com aviso de 30 dias se essencial/nova jurisdição', 'live'],
    ['Política de retenção e descarte', '30 dias só leitura + 60 arquivado (cláusula 15.3); gravações 90 dias (Anexo II.5)', 'Termos v3.0', 'live'],
    ['Trilha de auditoria financeira', 'Controles no produto, descritos abaixo', 'Evidência de configuração da org sob NDA', 'live'],
  ];
  return `
    <div class="sia-table-wrap">
      <table class="sia-table">
        <thead>
          <tr>
            <th>Artefato pedido em due diligence</th>
            <th>Situação hoje</th>
            <th>Como entregamos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              ([a, b, c, k]) => `
            <tr>
              <td style="color:${white};font-weight:700;">${a}</td>
              <td>${b}</td>
              <td>${c}</td>
              <td>${badge(
                k === 'live'
                  ? 'Público'
                  : k === 'nda'
                    ? 'Sob NDA'
                    : k === 'contract'
                      ? 'Contrato'
                      : 'Em curso',
                k,
              )}</td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    </div>`;
}

export const trustHTML = `
    <!-- ═══ HERO — Central de confiança ═══ -->
    <section class="sia-hero" style="position:relative;background:#0D1117;padding:72px 24px 56px;text-align:center;overflow:hidden;">
        <div style="position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(255,186,26,0.12) 0%,transparent 60%);pointer-events:none;"></div>
        <div style="position:relative;max-width:880px;margin:0 auto;">
            <p style="color:${gold};font-size:12px;font-weight:800;letter-spacing:2.2px;text-transform:uppercase;margin:0 0 18px;">Central de confiança · Orbit Gestão</p>
            <h1 style="font-size:clamp(2rem,5vw,3.35rem);font-weight:800;color:${white};line-height:1.15;margin:0 0 22px;letter-spacing:-0.02em;">
                Segurança, privacidade e continuidade<br>
                <span style="color:${gold};">da plataforma Orbit</span>
            </h1>
            <p style="font-size:clamp(1rem,1.6vw,1.18rem);color:${muted};line-height:1.65;max-width:740px;margin:0 auto 32px;">
                Controles de segurança, privacidade e continuidade da Orbit. O que já está em produção,
                o que está em implementação no SGSI (ISO/IEC 27001 e 27701) e o que é entregue sob confidencialidade.
                Certificações da nuvem não são apresentadas como se fossem da Orbit.
            </p>
            <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
                <a href="#sia-indice" style="display:inline-flex;align-items:center;gap:8px;background:${gold};color:#0D1117;font-weight:800;font-size:15px;padding:16px 32px;border-radius:50px;text-decoration:none;letter-spacing:0.4px;box-shadow:0 8px 24px rgba(255,186,26,0.3);">
                    VER CONTROLES <i class="fas fa-arrow-down"></i>
                </a>
                <a href="#sia-documentos" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:${white};border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:15px;padding:16px 32px;border-radius:50px;text-decoration:none;">
                    DOCUMENTOS SOB NDA
                </a>
            </div>
        </div>
        ${statusRow()}
    </section>

    ${section(
      'sia-indice',
      true,
      `
            ${kicker('00', 'Índice')}
            ${h2('Como a Orbit', 'protege sua operação')}
            ${p('Cada item declara o status com precisão — inclusive o que ainda não está certificado.')}
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;">
              ${tocItems
                .map(
                  (it) => `
                <a class="sia-toc-card" href="${it.href}" style="${card}padding:20px 18px;text-decoration:none;display:block;transition:border-color .18s,background .18s;">
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px;">
                    <span style="color:${gold};font-size:12px;font-weight:800;letter-spacing:1px;">${it.n}</span>
                    ${badge(it.status, it.kind)}
                  </div>
                  <div style="color:${white};font-weight:800;font-size:0.98rem;line-height:1.35;">${it.title}</div>
                </a>`,
                )
                .join('')}
            </div>
            <p style="margin:22px 0 0;color:${muted};font-size:0.88rem;line-height:1.55;">Orbit Gestão · infraestrutura Supabase sobre AWS, região <strong style="color:${white};">sa-east-1 (São Paulo)</strong>.</p>
      `,
    )}

    ${section(
      'sia-certificacoes',
      false,
      `
            ${kicker('01', 'Certificações')}
            ${h2('O que é nosso, o que é da', 'infraestrutura')}
            ${p('Certificação da operação e certificação do data center são coisas distintas. A Orbit trata as duas com o mesmo rigor de linguagem.')}
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:22px;">
              <div style="${card}">
                <div style="margin-bottom:12px;">${badge('Orbit · operador', 'progress')}</div>
                <h3 style="color:${white};font-size:1.15rem;font-weight:800;margin:0 0 10px;">ISO/IEC 27001 e 27701</h3>
                <p style="color:${text};font-size:0.95rem;line-height:1.65;margin:0;">Programa de Sistema de Gestão de Segurança da Informação e de privacidade em implementação, com consultoria independente da <strong style="color:${white};">Templum</strong>. O certificado ainda não foi emitido. Não publicamos percentual interno de avanço.</p>
              </div>
              <div style="${card}">
                <div style="margin-bottom:12px;">${badge('Supabase / AWS', 'live')}</div>
                <h3 style="color:${white};font-size:1.15rem;font-weight:800;margin:0 0 10px;">SOC 2 Tipo II e ISO 27001</h3>
                <p style="color:${text};font-size:0.95rem;line-height:1.65;margin:0;">Cobrem a plataforma gerenciada de banco, autenticação, armazenamento e funções serverless, e os data centers AWS. <strong style="color:${white};">Não substituem</strong> a certificação da operação da Orbit.</p>
              </div>
            </div>
            <p style="color:${muted};font-size:0.92rem;line-height:1.6;margin:0;">Referências públicas dos provedores: <a href="https://supabase.com/security" target="_blank" rel="noopener noreferrer" style="color:${gold};">supabase.com/security</a> · <a href="https://aws.amazon.com/compliance/programs/" target="_blank" rel="noopener noreferrer" style="color:${gold};">aws.amazon.com/compliance</a>. Cópias de certificados da nuvem não são apresentados como se fossem da Orbit.</p>
      `,
    )}

    ${section(
      'sia-psi',
      true,
      `
            ${kicker('02', 'Política')}
            ${h2('Política de Segurança da Informação', 'vigente')}
            ${p('A PSI da Orbit Gestão está publicada. Define governança, classificação, acesso, criptografia, continuidade, subprocessadores e resposta a incidentes. A certificação ISO/IEC 27001 permanece em implementação — a política não depende do certificado para vigorar.')}
            <ul class="sia-list">
              <li>Row Level Security (RLS) em todas as tabelas de dados da aplicação, com isolamento por organização.</li>
              <li>RBAC com papéis de plataforma (super_admin, channel_admin, org_admin, member) e privilégios granulares por módulo.</li>
              <li>MFA disponível; MFA obrigatório nos consoles administrativos da infraestrutura e no repositório de código.</li>
              <li>Edge Functions com verificação de JWT por padrão; exceções inventariadas e com gate próprio (cron, webhook, endpoint público declarado).</li>
              <li>Segredos fora do código-fonte; chaves de integração armazenadas criptografadas.</li>
              <li>Revisão de código antes de produção; suíte de testes de contrato de segurança no CI.</li>
            </ul>
            <p style="margin:22px 0 0;"><a href="/politica-seguranca" style="display:inline-flex;align-items:center;gap:8px;background:${gold};color:#0D1117;font-weight:800;font-size:14px;padding:14px 24px;border-radius:50px;text-decoration:none;">LER A POLÍTICA COMPLETA <i class="fas fa-arrow-right"></i></a></p>
      `,
    )}

    ${section(
      'sia-pentest',
      false,
      `
            ${kicker('03', 'Pentest')}
            ${h2('Teste de intrusão por', 'terceiro independente')}
            ${p('O relatório completo não é público — contém detalhe que não deve circular fora de NDA. O atestado PTaaS da HOUS3 é público e atualiza o status em tempo real.')}
            <p style="margin:0 0 22px;">
              <a href="https://www.hous3.com.br/v/orb26-p9n4" target="_blank" rel="noopener noreferrer" style="display:inline-block;">
                <img
                  src="https://www.hous3.com.br/badge/orb26-p9n4.svg?v=info&amp;t=dark"
                  alt="HOUS3 PTaaS – Orbit Gestão"
                  width="490"
                  height="88"
                  style="max-width:100%;height:auto;display:block;"
                />
              </a>
            </p>
            <div style="${card}margin-bottom:18px;">
              <table class="sia-kv">
                <tr><th>Executor</th><td>HOUS3 Digital — teste de intrusão independente (PTaaS)</td></tr>
                <tr><th>Atestado público</th><td>HOUS3-2026-0002 · <a href="https://www.hous3.com.br/v/orb26-p9n4" target="_blank" rel="noopener noreferrer" style="color:${gold};font-weight:700;">verificar em hous3.com.br</a></td></tr>
                <tr><th>Escopo</th><td>Aplicação web e API (white-box), inclusive a camada de autenticação da plataforma Orbit</td></tr>
                <tr><th>Resultado material</th><td>Não houve vazamento de dados entre organizações nem quebra do isolamento multi-tenant (RLS/RBAC resistiram ao teste)</td></tr>
                <tr><th>Tratamento</th><td>Achados de resiliência da autenticação e da configuração web foram remediados no mesmo mês, com plano formal de fechamento</td></tr>
                <tr><th>Frequência</th><td>Pentest externo mensal pela HOUS3, com reteste após remediação, somado a validação interna contínua (revisão de código, testes automatizados, inventário de endpoints)</td></tr>
              </table>
            </div>
            <p style="color:${muted};font-size:0.92rem;line-height:1.6;margin:0;">Sumário executivo e relatório técnico: sob NDA, no pacote de due diligence. Não publicamos vetores, payloads nem lista de achados em página aberta.</p>
      `,
    )}

    ${section(
      'sia-backup',
      true,
      `
            ${kicker('04', 'Continuidade')}
            ${h2('Backup, restauração e', 'continuidade')}
            ${p('Produção Orbit Gestão no Supabase, AWS São Paulo (<strong style="color:#fff;">sa-east-1</strong>). Point-in-Time Recovery (PITR) está <strong style="color:#fff;">ativo</strong>: as alterações do banco são gravadas no WAL a cada 2 minutos, com janela de recuperação de 7 dias. Criptografia AES-256 em repouso e TLS 1.3 em trânsito.')}
            <div style="${card}margin-bottom:20px;">
              <h4 style="color:${white};margin:0 0 14px;font-size:1rem;">O que são RPO e RTO</h4>
              <table class="sia-kv">
                <tr><th>RPO</th><td><strong style="color:${white};">Recovery Point Objective</strong> — quanto dado você pode perder. É o atraso máximo entre a última cópia boa e o momento da falha.</td></tr>
                <tr><th>RTO</th><td><strong style="color:${white};">Recovery Time Objective</strong> — em quanto tempo o serviço volta. É o relógio do restore até a aplicação responder de novo.</td></tr>
              </table>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-bottom:20px;">
              <div style="${card}">
                <h4 style="color:${white};margin:0 0 8px;font-size:0.98rem;">RPO do banco</h4>
                <p style="color:${text};font-size:0.9rem;line-height:1.6;margin:0;"><strong style="color:${white};">2 minutos</strong> no pior caso. A Supabase arquiva o WAL nesse intervalo (ou antes, se o volume de transações encher o arquivo). Fonte: configuração PITR da conta de produção e <a href="https://supabase.com/docs/guides/platform/backups" target="_blank" rel="noopener noreferrer" style="color:${gold};">documentação do provedor</a>.</p>
              </div>
              <div style="${card}">
                <h4 style="color:${white};margin:0 0 8px;font-size:0.98rem;">Janela PITR</h4>
                <p style="color:${text};font-size:0.9rem;line-height:1.6;margin:0;"><strong style="color:${white};">7 dias</strong> de recuperação pontual (qualquer instante dentro da janela). A janela visível no Dashboard acompanha o fuso de Brasília. É possível ampliar a retenção no add-on PITR; hoje está em 7 dias.</p>
              </div>
              <div style="${card}">
                <h4 style="color:${white};margin:0 0 8px;font-size:0.98rem;">RTO</h4>
                <p style="color:${text};font-size:0.9rem;line-height:1.6;margin:0;">Restore PITR <strong style="color:${white};">no mesmo projeto</strong> deixa a produção inacessível enquanto corre. A duração depende do tamanho do banco — a Supabase não publica um número fixo, e nós não inventamos um. O RTO contratual de failover entra no plano de DR do SGSI depois de teste cronometrado nesse caminho.</p>
              </div>
            </div>
            <div style="${card}margin-bottom:20px;">
              <h4 style="color:${white};margin:0 0 14px;font-size:1rem;">Testes periódicos de restauração completa</h4>
              <p style="color:${text};font-size:0.95rem;line-height:1.65;margin:0 0 14px;">A Orbit exercita o backup de ponta a ponta restaurando o banco para um <strong style="color:${white};">projeto Supabase novo</strong> — não sobrescreve a produção. É o teste completo de que o PITR gera um datastore utilizável, sem o downtime do restore in-place.</p>
              <table class="sia-kv">
                <tr><th>Método</th><td>Restore to new project (PITR), no Dashboard de produção</td></tr>
                <tr><th>Frequência</th><td>Testes periódicos completos da cadeia de backup e restauração</td></tr>
                <tr><th>Último ciclo documentado</th><td>3 de julho de 2026, 00:44:57 UTC (2 de julho, 21:44:57, Brasília) — restauração <strong style="color:${white};">backup orbit</strong>, status <strong style="color:${white};">COMPLETED</strong></td></tr>
                <tr><th>O que isso prova</th><td>A cópia PITR restaura com sucesso para um ambiente isolado. Não é o relógio de um failover da produção, e não substitui o RTO contratual ainda não cronometrado.</td></tr>
              </table>
            </div>
            <div style="${card}margin-bottom:16px;">
              <h4 style="color:${white};margin:0 0 10px;font-size:1rem;">O que o PITR não cobre</h4>
              <p style="color:${text};font-size:0.95rem;line-height:1.65;margin:0 0 10px;">Objetos do <strong style="color:${white};">Storage</strong> (arquivos) <strong style="color:${white};">não entram</strong> no backup do banco. O PostgreSQL guarda só metadados. Restaurar um ponto antigo <strong style="color:${white};">não recupera arquivos apagados</strong> depois daquele ponto.</p>
              <p style="color:${text};font-size:0.95rem;line-height:1.65;margin:0;">Com PITR ligado, a granularidade do WAL (a cada 2 minutos) substitui o snapshot diário tradicional.</p>
            </div>
      `,
    )}

    ${section(
      'sia-sla',
      false,
      `
            ${kicker('05', 'SLA')}
            ${h2('99,0% de disponibilidade', 'mensal')}
            ${p('O compromisso vinculante está no <strong style="color:#fff;">Termos de Uso v3.0, Anexo III</strong>, aceito na Plataforma: disponibilidade mensal mínima de <strong style="color:#fff;">99,0%</strong>. A fórmula é (tempo do mês − indisponibilidade não programada) ÷ tempo do mês. Degradação que não impeça o uso não conta. Esta página pública não promete percentual acima do contrato.')}
            <ul class="sia-list">
              <li><strong style="color:${white};">O que entra:</strong> impossibilidade de acesso ou de uso das funcionalidades essenciais da Plataforma, apurada pelos sistemas de monitoramento da Empresa.</li>
              <li><strong style="color:${white};">O que não entra (cláusula 12.2):</strong> manutenção programada avisada com no mínimo 48 horas; manutenção emergencial de falha crítica ou vulnerabilidade; força maior, caso fortuito e ataques cibernéticos; falha de infraestrutura, conectividade, telecom ou energia; indisponibilidade ou limitação de provedores de IA; falha de dispositivo, rede ou integração do cliente; suspensões previstas nos Termos.</li>
              <li><strong style="color:${white};">Crédito (contratação direta):</strong> único ressarcimento por indisponibilidade, aplicado de ofício na fatura seguinte — 10% se o mês ficar entre 95,0% e 99,0%; 25% entre 90,0% e 95,0%; 50% abaixo de 90,0% (Anexo III e cláusula 24). Não há indenização adicional por lucros cessantes.</li>
              <li><strong style="color:${white};">Acesso via Canal:</strong> o crédito, quando devido, é da Empresa ao Canal. O cliente do Canal dirige pretensão comercial ao Canal, não à Orbit.</li>
              <li><strong style="color:${white};">Suporte:</strong> contratação direta — primeira resposta em 72 horas úteis. Via Canal — primeiro nível pelo Canal (cláusulas 5.2.4 e III.3).</li>
              <li><strong style="color:${white};">Responsabilidade:</strong> limitada ao valor pago à Empresa nos 12 meses anteriores (cláusula 13.3), com as exceções de dolo, fraude, PI e confidencialidade.</li>
            </ul>
            <p style="margin:22px 0 0;"><a href="/status" style="display:inline-flex;align-items:center;gap:8px;background:${gold};color:#0D1117;font-weight:800;font-size:14px;padding:14px 24px;border-radius:50px;text-decoration:none;">VER STATUS E HISTÓRICO <i class="fas fa-arrow-right"></i></a></p>
      `,
    )}

    ${section(
      'sia-incidentes',
      true,
      `
            ${kicker('06', 'Incidentes')}
            ${h2('Resposta a incidentes e', 'art. 48 da LGPD')}
            ${p('Fluxo alinhado à cláusula 10.7 dos Termos de Uso v3.0. O playbook interno (contatos, runbooks, evidência forense) permanece sob NDA.')}
            <ol class="sia-ol">
              <li><strong style="color:${white};">Detecção e contenção.</strong> Identificação pela equipe técnica; contenção imediata (revogação de sessões/tokens, isolamento de acesso).</li>
              <li><strong style="color:${white};">Acionamento interno.</strong> Equipe responsável acionada em até <strong style="color:${white};">1 hora</strong> para incidentes classificados como críticos.</li>
              <li><strong style="color:${white};">Notificação ao Cliente.</strong> Comunicação ao Controlador no contato designado em até <strong style="color:${white};">48 horas</strong> do conhecimento do fato, com as informações disponíveis (cláusula 10.7.1). A comunicação não implica, por si, reconhecimento de culpa.</li>
              <li><strong style="color:${white};">ANPD e titulares (art. 48 da LGPD).</strong> A comunicação à Autoridade e aos titulares compete ao <strong style="color:${white};">Controlador</strong>, com o apoio da Orbit (cláusula 10.7.2). A Orbit não substitui o cliente nessa obrigação.</li>
              <li><strong style="color:${white};">Conteúdo.</strong> Natureza do incidente, dados potencialmente afetados, contenção e próximos passos.</li>
              <li><strong style="color:${white};">Pós-incidente.</strong> Causa raiz, medidas preventivas e registro para o SGSI.</li>
            </ol>
      `,
    )}

    ${section(
      'sia-dpa',
      false,
      `
            ${kicker('07', 'Privacidade')}
            ${h2('Operador, DPA e', 'Encarregado (DPO)')}
            ${p('Na prestação do SaaS, a organização cliente é, em regra, a <strong style="color:#fff;">controladora</strong> dos dados que insere na Orbit (clientes, colaboradores, documentos, financeiro). A Orbit Gestão atua como <strong style="color:#fff;">operadora</strong>, nos termos da LGPD, tratando esses dados sob instrução do cliente para executar o contrato.')}
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:8px 0 20px;">
              <div style="${card}">
                <h4 style="color:${white};margin:0 0 8px;">Encarregada (DPO)</h4>
                <p style="color:${text};font-size:0.92rem;line-height:1.65;margin:0 0 12px;">Nomeada nos Termos de Uso v3.0, cláusula 10.6.2, com atuação via <strong style="color:${white};">Templum</strong> e plataforma <a href="https://dponet.com.br/" target="_blank" rel="noopener noreferrer" style="color:${gold};">DPOnet</a>. Prazo de resposta a requisições: 15 dias.</p>
                <p style="margin:0 0 8px;"><strong style="color:${white};">Jennifer Dantas</strong></p>
                <p style="margin:0;"><!--email_off--><a href="mailto:jennifer.dantas@templum.com.br" style="color:${gold};font-weight:700;">jennifer.dantas@templum.com.br</a><!--email_on--></p>
              </div>
              <div style="${card}">
                <h4 style="color:${white};margin:0 0 8px;">DPA (acordo de tratamento)</h4>
                <p style="color:${text};font-size:0.92rem;line-height:1.65;margin:0;">O Anexo IV dos Termos de Uso v3.0 <strong style="color:${white};">tem natureza de acordo de tratamento de dados</strong> e é aceito eletronicamente na Plataforma, com o corpo dos Termos. Instruções do controlador, subprocessadores, segurança, incidente e eliminação ao término já estão nesse anexo — não é minuta futura.</p>
              </div>
            </div>
            <p style="color:${muted};font-size:0.92rem;line-height:1.6;margin:0;">Documentos públicos correlatos: <a href="/politica-seguranca" style="color:${gold};">Política de Segurança da Informação</a> · <a href="/politica-privacidade" style="color:${gold};">Política de Privacidade</a> · <a href="/termos-de-servico" style="color:${gold};">Termos de Uso (resumo público)</a>. O documento vinculante é o aceite v3.0 na Área de Conformidade da Plataforma.</p>
      `,
    )}

    ${section(
      'sia-canal',
      true,
      `
            ${kicker('08', 'Canal')}
            ${h2('White-label e consultorias', '(Acesso via Canal)')}
            ${p('A Plataforma pode ser apresentada sob a marca e o método de um Canal — consultoria autorizada a usar o Orbit como infraestrutura para prestar serviço a terceiros. Isso está na cláusula 5 dos Termos v3.0. Os Termos de uso da Plataforma vigoram mesmo quando a interface não diz “Orbit”.')}
            <ul class="sia-list">
              <li><strong style="color:${white};">Quem é quem.</strong> O Cliente da consultoria é Controlador dos dados da Organização. A Orbit é Operadora. O Canal é Operador quando trata dados em nome do Cliente (configuração, suporte, acompanhamento de implantação). Se o Canal definir finalidade própria, assume Controlador desse tratamento e responde sozinho por ele (cláusula 10.1.1).</li>
              <li><strong style="color:${white};">Acesso do Canal à Organização.</strong> O Cliente concorda que o Canal acessa os dados só para configurar agentes com o método da consultoria, prestar suporte e acompanhar o uso. É vedado ao Canal exportar, comercializar, treinar modelos ou usar os dados para outra finalidade (cláusula 5.3).</li>
              <li><strong style="color:${white};">Isolamento.</strong> Organizações continuam isoladas entre si no banco. A exceção expressa é o acesso do Canal à Organização do seu Cliente, na forma da cláusula 5.3 — não o acesso de um cliente a outro.</li>
              <li><strong style="color:${white};">Comercial e suporte.</strong> Preço, SLA prometido pelo Canal e suporte de primeiro nível são do contrato Cliente–Canal. A Orbit não é parte nessa relação e não responde pela consultoria. Demandas do cliente do Canal vão ao Canal; a Orbit presta suporte técnico ao Canal (cláusula 5.2).</li>
              <li><strong style="color:${white};">Licença.</strong> A Organização do Cliente via Canal depende da licença do Canal com a Orbit. Se essa licença cair, aplica-se o regime de continuidade da cláusula 16.3 (a Orbit pode, sem obrigação, assumir a Organização em contratação direta).</li>
              <li><strong style="color:${white};">Metodologia.</strong> O método e os conteúdos do Canal configurados na Organização continuam do Canal; o Conteúdo do Cliente continua do Cliente (cláusulas 9.3 e 9.6).</li>
            </ul>
      `,
    )}

    ${section(
      'sia-subprocessadores',
      false,
      `
            ${kicker('09', 'Subprocessadores')}
            ${h2('Quem trata dados, onde, e', 'em que base')}
            ${p('Lista do <strong style="color:#fff;">Anexo IV</strong> dos Termos de Uso v3.0. Não vendemos dados. Inclusão de subprocessador essencial ou de nova jurisdição é comunicada com antecedência mínima de 30 dias (IV.4.1).')}
            <h4 style="color:${white};margin:0 0 12px;font-size:1rem;">Essenciais (permanentes)</h4>
            <div class="sia-table-wrap" style="margin-bottom:20px;">
              <table class="sia-table">
                <thead>
                  <tr>
                    <th>Subprocessador</th>
                    <th>Finalidade</th>
                    <th>Local do tratamento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style="color:${white};font-weight:700;">Supabase</td><td>Banco, autenticação, arquivos e funções (infra AWS sa-east-1)</td><td>Brasil — sa-east-1</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Cloudflare</td><td>CDN, DNS e proteção de borda</td><td>Roteamento global; conteúdo hospedado no Brasil</td></tr>
                  <tr><td style="color:${white};font-weight:700;">OpenAI</td><td>Processamento das interações com os agentes de IA</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Evolumeet</td><td>Captura, gravação e transcrição de reuniões</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">ElevenLabs</td><td>Síntese e reconhecimento de voz nos agentes conversacionais</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Twilio</td><td>Mensagens por WhatsApp e SMS</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Resend</td><td>E-mail transacional</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">MailerSend</td><td>E-mail transacional e institucional</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Stripe</td><td>Pagamentos e assinaturas (contratação direta)</td><td>Estados Unidos</td></tr>
                </tbody>
              </table>
            </div>
            <h4 style="color:${white};margin:0 0 12px;font-size:1rem;">Opcionais (só se o Cliente habilitar)</h4>
            <div class="sia-table-wrap" style="margin-bottom:20px;">
              <table class="sia-table">
                <thead>
                  <tr>
                    <th>Integração</th>
                    <th>Finalidade</th>
                    <th>Local do tratamento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style="color:${white};font-weight:700;">Google</td><td>Autenticação federada, agenda e integração publicitária</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Meta</td><td>WhatsApp Business e integração publicitária</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">LinkedIn</td><td>Autenticação e divulgação de vagas</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Perplexity, Firecrawl e Apify</td><td>Pesquisa de mercado e enriquecimento de dados públicos</td><td>Estados Unidos</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Instituições financeiras</td><td>Conciliação e importação de extratos</td><td>Brasil</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Provedores de documentos fiscais</td><td>Emissão de notas fiscais</td><td>Brasil</td></tr>
                </tbody>
              </table>
            </div>
            <div style="${card}">
              <h4 style="color:${white};margin:0 0 10px;">IA, treinamento e transferência internacional</h4>
              <p style="color:${text};font-size:0.95rem;line-height:1.65;margin:0 0 12px;">O Conteúdo do Cliente não é usado para treinar, ajustar ou aperfeiçoar modelos da Orbit ou de terceiros (cláusula 6.6 e IV.2.3). Os provedores de IA são contratados em modalidades que vedam essa utilização. Banco e arquivos permanecem no Brasil; inferência de IA, gravação, mensageria, e-mail e pagamento ocorrem, no todo ou em parte, nos EUA (IV.5) — transferência com cláusulas contratuais (LGPD, art. 33).</p>
              <p style="color:${text};font-size:0.95rem;line-height:1.65;margin:0;">Integração Google habilitada pelo Cliente segue Uso Limitado da Política de Privacidade. O Cliente, como Controlador, informa os titulares da transferência (IV.5.3).</p>
            </div>
      `,
    )}

    ${section(
      'sia-retencao',
      true,
      `
            ${kicker('10', 'Ciclo de vida')}
            ${h2('Retenção, portabilidade e', 'descarte')}
            ${p('Fonte: cláusulas 15 e Anexo II.5 dos <a href="/termos-de-servico" style="color:' + gold + ';font-weight:700;">Termos de Uso v3.0</a>.')}
            <ul class="sia-list">
              <li><strong style="color:${white};">Durante a vigência:</strong> Conteúdo do Cliente disponível na Organização. Gravações de reunião (arquivo de mídia): 90 dias da data da reunião; transcrições e análises permanecem enquanto o acesso vigorar. A Empresa notifica 7 dias antes da eliminação programada de gravações.</li>
              <li><strong style="color:${white};">Após o encerramento (15.3):</strong> 30 dias de acesso restrito, só leitura, para exportar em formato aberto; em seguida 60 dias arquivado, recuperável a pedido; depois eliminação ou anonimização, salvo obrigação legal. No Acesso via Canal, esses prazos contam da comunicação do encerramento; a exportação é feita direto ao Cliente, sem depender do Canal.</li>
              <li><strong style="color:${white};">Registros de acesso:</strong> 6 meses, na forma do art. 15 do Marco Civil da Internet (cláusula 11.4).</li>
              <li><strong style="color:${white};">Direitos do titular:</strong> requisições sobre o Conteúdo do Cliente vão ao Controlador. Sobre dados de que a Empresa é Controladora — à Encarregada, em 15 dias.</li>
            </ul>
      `,
    )}

    ${section(
      'sia-financeiro',
      false,
      `
            ${kicker('11', 'Financeiro')}
            ${h2('Trilha de auditoria, segregação e', 'matriz de acessos')}
            ${p('Controles implementados no módulo financeiro da plataforma — não são uma promessa futura. A matriz efetiva de cada cliente é a que o administrador da organização configura.')}
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:18px;">
              <div style="${card}">
                <h4 style="color:${white};margin:0 0 8px;">Trilha de auditoria</h4>
                <p style="color:${text};font-size:0.92rem;line-height:1.65;margin:0;">Toda inserção, alteração e exclusão nas entidades financeiras cobertas (contas a pagar e a receber, parcelas, fornecedores, plano de contas, centros de custo, transferências bancárias) gera registro automático: quem, quando, o quê, valores anteriores e posteriores. Usuários da aplicação <strong style="color:${white};">não conseguem gravar, editar ou apagar</strong> essa trilha — a escrita ocorre só por trigger no banco; políticas de RLS bloqueiam INSERT/UPDATE/DELETE diretos.</p>
              </div>
              <div style="${card}">
                <h4 style="color:${white};margin:0 0 8px;">Fechamento de período</h4>
                <p style="color:${text};font-size:0.92rem;line-height:1.65;margin:0;">Snapshots mensais com totais e <strong style="color:${white};">hash de integridade</strong>. Depois de fechado, o snapshot não pode ser alterado nem excluído pelo usuário autenticado (UPDATE/DELETE bloqueados por política).</p>
              </div>
              <div style="${card}">
                <h4 style="color:${white};margin:0 0 8px;">Segregação de funções</h4>
                <p style="color:${text};font-size:0.92rem;line-height:1.65;margin:0;">Privilégios distintos para visualizar, lançar, editar, <strong style="color:${white};">aprovar</strong> e <strong style="color:${white};">dar baixa</strong>. Quem lança não precisa ser quem aprova; quem aprova não precisa ser quem concilia o banco. Alçadas de aprovação são configuráveis. A segregação efetiva depende de o administrador não acumular todos os privilégios na mesma pessoa.</p>
              </div>
            </div>
            <div class="sia-table-wrap">
              <table class="sia-table">
                <thead>
                  <tr>
                    <th>Família de privilégio</th>
                    <th>O que separa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style="color:${white};font-weight:700;">Visualizar</td><td>Dashboard, contas a pagar, contas a receber, DRE, fluxo de caixa, orçamento, conciliação — cada um com privilégio próprio</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Lançar / editar / excluir</td><td>Criar e alterar títulos, separado da aprovação e da baixa bancária</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Aprovar</td><td>Aprovar pagamentos, contas a receber e versões de orçamento, segundo alçada</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Baixar / conciliar</td><td>Registrar pagamento ou recebimento no banco; executar conciliação; transferências internas</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Configurar</td><td>Regras de aprovação, fornecedores, plano de contas, escopos por centro de custo / conta / fornecedor / cliente, integrações ERP, NFS-e / NF-e</td></tr>
                </tbody>
              </table>
            </div>
            <p style="color:${muted};font-size:0.88rem;line-height:1.55;margin:16px 0 0;">A trilha é append-only na camada da aplicação. Administradores de infraestrutura com credencial de serviço do banco podem, como em qualquer SaaS, operar o datastore — esse acesso é restrito, MFA e registrado. Não descrevemos isso como WORM criptográfico tipo gravador fiscal.</p>
      `,
    )}

    ${section(
      'sia-documentos',
      false,
      `
            ${kicker('Due diligence', 'Pacote')}
            ${h2('O que é público e o que', 'vai sob NDA')}
            ${p('Um comitê de segurança não deveria receber um PDF de produto. A tabela é o mapa honesto do pacote. O Termos de Uso v3.0, aceito na Plataforma, prevalece sobre qualquer resumo desta página.')}
            ${packTable()}
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:28px;">
              <a href="mailto:contato@orbitgestao.com.br?subject=Due%20diligence%20de%20seguranca%20%E2%80%94%20pacote%20NDA" style="display:inline-flex;align-items:center;gap:8px;background:${gold};color:#0D1117;font-weight:800;font-size:15px;padding:16px 28px;border-radius:50px;text-decoration:none;">
                SOLICITAR PACOTE SOB NDA <i class="fas fa-envelope"></i>
              </a>
              <a href="/politica-seguranca" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:${white};border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:15px;padding:16px 28px;border-radius:50px;text-decoration:none;">
                POLÍTICA DE SEGURANÇA
              </a>
              <a href="/politica-privacidade" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:${white};border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:15px;padding:16px 28px;border-radius:50px;text-decoration:none;">
                POLÍTICA DE PRIVACIDADE
              </a>
              <a href="/termos-de-servico" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:${white};border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:15px;padding:16px 28px;border-radius:50px;text-decoration:none;">
                TERMOS DE SERVIÇO
              </a>
            </div>
      `,
    )}
`;
