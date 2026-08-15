// Central de confiança — controles públicos de segurança, privacidade e continuidade.
//
// Regra desta página: só o que está sustentado por código, política publicada,
// questionário de fornecedor (docs/security no app) ou fato de infra confirmado.
// Não inventar certificado ISO da Orbit, RTO cronometrado nem DPA já assinado.
//
// PT/EN: gêmeos i18n-pt / i18n-en. Não colocar parágrafos no dicionário.

import { i18nEl, i18nText } from '@/lib/i18n-html';

const gold = '#ffba1a';
const muted = '#8B949E';
const text = '#C9D1D9';
const white = '#fff';
const card =
  'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px 26px;';

type BadgeKind = 'live' | 'progress' | 'nda' | 'contract';

function badge(label: string, kind: BadgeKind, labelEn?: string): string {
  const map: Record<BadgeKind, string> = {
    live: 'background:rgba(63,185,80,0.12);color:#3FB950;border:1px solid rgba(63,185,80,0.28);',
    progress: 'background:rgba(255,186,26,0.12);color:#ffba1a;border:1px solid rgba(255,186,26,0.28);',
    nda: 'background:rgba(139,148,158,0.12);color:#C9D1D9;border:1px solid rgba(139,148,158,0.28);',
    contract: 'background:rgba(88,166,255,0.12);color:#58A6FF;border:1px solid rgba(88,166,255,0.28);',
  };
  return `<span class="sia-badge" style="display:inline-flex;align-items:center;${map[kind]}font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;padding:5px 10px;border-radius:100px;white-space:nowrap;">${i18nText(label, labelEn)}</span>`;
}

function kicker(n: string, label: string, labelEn?: string): string {
  return `<span style="display:inline-block;color:${gold};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">${n} — ${i18nText(label, labelEn)}</span>`;
}

function h2(title: string, accent?: string, titleEn?: string, accentEn?: string): string {
  const pt = accent ? `${title} <span style="color:${gold};">${accent}</span>` : title;
  const en = titleEn
    ? (accentEn ? `${titleEn} <span style="color:${gold};">${accentEn}</span>` : titleEn)
    : undefined;
  return i18nEl(
    'h2',
    pt,
    en,
    `style="font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:800;color:${white};line-height:1.2;margin:0 0 16px;"`,
  );
}

function p(html: string, en?: string): string {
  return i18nEl(
    'p',
    html,
    en,
    `style="font-size:1.02rem;color:${muted};line-height:1.7;margin:0 0 18px;max-width:820px;"`,
  );
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

function twin(pt: string, en: string): string {
  return `<div class="i18n-pt">${pt}</div><div class="i18n-en">${en}</div>`;
}

const tocItems: { href: string; n: string; title: string; titleEn: string; status: string; statusEn: string; kind: BadgeKind }[] = [
  { href: '#sia-certificacoes', n: '01', title: 'Certificações e escopo', titleEn: 'Certifications and scope', status: 'Em implementação', statusEn: 'In progress', kind: 'progress' },
  { href: '/politica-seguranca', n: '02', title: 'Política de Segurança da Informação', titleEn: 'Information Security Policy', status: 'Vigente', statusEn: 'In force', kind: 'live' },
  { href: '#sia-pentest', n: '03', title: 'Pentest independente', titleEn: 'Independent pentest', status: 'HOUS3 · atestado público', statusEn: 'HOUS3 · public attestation', kind: 'nda' },
  { href: '#sia-backup', n: '04', title: 'Backup e continuidade', titleEn: 'Backup and continuity', status: 'PITR · restore testado', statusEn: 'PITR · restore tested', kind: 'live' },
  { href: '#sia-sla', n: '05', title: 'Disponibilidade e suporte', titleEn: 'Availability and support', status: '99,0% · /status', statusEn: '99.0% · /status', kind: 'live' },
  { href: '#sia-incidentes', n: '06', title: 'Resposta a incidentes (LGPD art. 48)', titleEn: 'Incident response (LGPD art. 48)', status: '48 h ao cliente', statusEn: '48 h to the customer', kind: 'live' },
  { href: '#sia-dpa', n: '07', title: 'DPA e Encarregado (DPO)', titleEn: 'DPA and Data Protection Officer', status: 'Anexo IV · DPO nomeada', statusEn: 'Annex IV · DPO appointed', kind: 'live' },
  { href: '#sia-canal', n: '08', title: 'Canal e white-label', titleEn: 'Channel and white-label', status: 'Termos v3.0', statusEn: 'Terms v3.0', kind: 'live' },
  { href: '#sia-subprocessadores', n: '09', title: 'Subprocessadores e transferências', titleEn: 'Sub-processors and transfers', status: 'Anexo IV', statusEn: 'Annex IV', kind: 'live' },
  { href: '#sia-retencao', n: '10', title: 'Retenção, portabilidade e descarte', titleEn: 'Retention, portability and disposal', status: '30 + 60 dias', statusEn: '30 + 60 days', kind: 'live' },
  { href: '#sia-financeiro', n: '11', title: 'Controles do módulo financeiro', titleEn: 'Finance module controls', status: 'No produto', statusEn: 'In the product', kind: 'live' },
];

function statusRow(): string {
  const items = [
    { label: 'Dados no Brasil', labelEn: 'Data in Brazil', sub: 'AWS São Paulo · sa-east-1', subEn: 'AWS São Paulo · sa-east-1' },
    { label: 'ISO 27001 / 27701', labelEn: 'ISO 27001 / 27701', sub: 'SGSI em implementação', subEn: 'ISMS in progress' },
    { label: 'Pentest independente', labelEn: 'Independent pentest', sub: 'HOUS3 PTaaS · atestado público', subEn: 'HOUS3 PTaaS · public attestation' },
    { label: 'DPO nomeado', labelEn: 'DPO appointed', sub: 'Templum · DPOnet', subEn: 'Templum · DPOnet' },
    { label: 'Isolamento por org', labelEn: 'Per-org isolation', sub: 'RLS no PostgreSQL', subEn: 'RLS on PostgreSQL' },
  ];
  return `
    <div class="sia-status" style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;max-width:1100px;margin:36px auto 0;">
      ${items
        .map(
          (it) => `
        <div style="${card}padding:18px 16px;text-align:left;">
          <div style="color:${white};font-size:0.92rem;font-weight:800;margin:0 0 6px;">${i18nText(it.label, it.labelEn)}</div>
          <div style="color:${muted};font-size:0.8rem;line-height:1.45;">${i18nText(it.sub, it.subEn)}</div>
        </div>`,
        )
        .join('')}
    </div>`;
}

function packTable(): string {
  const rows: [string, string, string, string, string, string, BadgeKind][] = [
    ['Certificado ISO/IEC 27001 da Orbit', 'Orbit ISO/IEC 27001 certificate', 'Não emitido — SGSI em implementação com a Templum', 'Not issued — ISMS in progress with Templum', 'Quando o certificado for emitido', 'When the certificate is issued', 'progress'],
    ['SOC 2 Tipo II da Orbit', 'Orbit SOC 2 Type II', 'Não possuímos. SOC 2 Tipo II e ISO 27001 cobrem a infraestrutura (Supabase / AWS)', 'We do not hold one. SOC 2 Type II and ISO 27001 cover the infrastructure (Supabase / AWS)', 'Não reivindicar como certificação nossa', 'Do not claim it as our certification', 'progress'],
    ['Política de Segurança da Informação aprovada', 'Approved Information Security Policy', 'Vigente — <a href="/politica-seguranca" style="color:' + gold + ';font-weight:700;">política pública</a>', 'In force — <a href="/politica-seguranca" style="color:' + gold + ';font-weight:700;">public policy</a>', 'Documento público', 'Public document', 'live'],
    ['Atestado PTaaS (HOUS3)', 'PTaaS attestation (HOUS3)', 'Vigente — HOUS3-2026-0002; o badge nesta página lê o status em tempo real. Relatório técnico completo sob NDA', 'In force — HOUS3-2026-0002; the badge on this page reads status in real time. Full technical report under NDA', '<a href="https://www.hous3.com.br/v/orb26-p9n4" target="_blank" rel="noopener noreferrer" style="color:' + gold + ';font-weight:700;">Página de verificação</a>', '<a href="https://www.hous3.com.br/v/orb26-p9n4" target="_blank" rel="noopener noreferrer" style="color:' + gold + ';font-weight:700;">Verification page</a>', 'live'],
    ['Política de backup e continuidade', 'Backup and continuity policy', 'PITR ativo (WAL 2 min, 7 dias, São Paulo); restore completo periódico para projeto novo — último ciclo documentado: jul/2026, COMPLETED', 'PITR on (WAL 2 min, 7 days, São Paulo); periodic full restore to a new project — last documented cycle: Jul/2026, COMPLETED', 'RTO de failover in-place ainda não cronometrado', 'In-place failover RTO not yet timed', 'live'],
    ['SLA de disponibilidade e suporte', 'Availability and support SLA', '99,0% mensal (Anexo III dos Termos v3.0); crédito na contratação direta; status em /status', '99.0% monthly (Annex III of Terms v3.0); credit on direct contracts; status at /status', 'Página pública /status', 'Public /status page', 'live'],
    ['Plano de resposta a incidentes', 'Incident response plan', 'Cliente em até 48 h (cláusula 10.7); ANPD compete ao controlador, com apoio da Orbit', 'Customer within 48 h (clause 10.7); ANPD notice is the controller’s duty, with Orbit support', 'Playbook interno sob NDA', 'Internal playbook under NDA', 'nda'],
    ['Contrato de tratamento (DPA)', 'Data processing agreement (DPA)', 'Anexo IV dos Termos de Uso v3.0 — aceite eletrônico na Plataforma', 'Annex IV of Terms of Use v3.0 — electronic acceptance on the Platform', 'Documento vinculante já aceito', 'Binding document already accepted', 'contract'],
    ['Lista de subprocessadores', 'Sub-processor list', 'Anexo IV (essenciais e opcionais), nesta página', 'Annex IV (essential and optional), on this page', 'Atualização com aviso de 30 dias se essencial/nova jurisdição', '30-day notice if essential or a new jurisdiction', 'live'],
    ['Política de retenção e descarte', 'Retention and disposal policy', '30 dias só leitura + 60 arquivado (cláusula 15.3); gravações 90 dias (Anexo II.5)', '30 days read-only + 60 archived (clause 15.3); recordings 90 days (Annex II.5)', 'Termos v3.0', 'Terms v3.0', 'live'],
    ['Trilha de auditoria financeira', 'Financial audit trail', 'Controles no produto, descritos abaixo', 'In-product controls, described below', 'Evidência de configuração da org sob NDA', 'Org configuration evidence under NDA', 'live'],
  ];
  return `
    <div class="sia-table-wrap">
      <table class="sia-table">
        <thead>
          <tr>
            <th>${i18nText('Artefato pedido em due diligence', 'Artifact requested in due diligence')}</th>
            <th>${i18nText('Situação hoje', 'Status today')}</th>
            <th>${i18nText('Como entregamos', 'How we deliver')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              ([a, aEn, b, bEn, c, cEn, k]) => `
            <tr>
              <td style="color:${white};font-weight:700;">${i18nText(a, aEn)}</td>
              <td>${i18nText(b, bEn)}</td>
              <td>${i18nText(c, cEn)}</td>
              <td>${badge(
                k === 'live'
                  ? 'Público'
                  : k === 'nda'
                    ? 'Sob NDA'
                    : k === 'contract'
                      ? 'Contrato'
                      : 'Em curso',
                k,
                k === 'live'
                  ? 'Public'
                  : k === 'nda'
                    ? 'Under NDA'
                    : k === 'contract'
                      ? 'Contract'
                      : 'In progress',
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
            <p style="color:${gold};font-size:12px;font-weight:800;letter-spacing:2.2px;text-transform:uppercase;margin:0 0 18px;">${i18nText('Central de confiança · Orbit Gestão', 'Trust Center · Orbit Gestão')}</p>
            ${i18nEl(
              'h1',
              `Segurança, privacidade e continuidade<br><span style="color:${gold};">da plataforma Orbit</span>`,
              `Security, privacy and continuity<br><span style="color:${gold};">of the Orbit platform</span>`,
              `style="font-size:clamp(2rem,5vw,3.35rem);font-weight:800;color:${white};line-height:1.15;margin:0 0 22px;letter-spacing:-0.02em;"`,
            )}
            ${i18nEl(
              'p',
              'Controles de segurança, privacidade e continuidade da Orbit. O que já está em produção, o que está em implementação no SGSI (ISO/IEC 27001 e 27701) e o que é entregue sob confidencialidade. Certificações da nuvem não são apresentadas como se fossem da Orbit.',
              'Orbit security, privacy and continuity controls. What is already in production, what is being implemented in the ISMS (ISO/IEC 27001 and 27701), and what is delivered under confidentiality. Cloud certifications are not presented as if they belonged to Orbit.',
              `style="font-size:clamp(1rem,1.6vw,1.18rem);color:${muted};line-height:1.65;max-width:740px;margin:0 auto 32px;"`,
            )}
            <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
                <a href="#sia-indice" style="display:inline-flex;align-items:center;gap:8px;background:${gold};color:#0D1117;font-weight:800;font-size:15px;padding:16px 32px;border-radius:50px;text-decoration:none;letter-spacing:0.4px;box-shadow:0 8px 24px rgba(255,186,26,0.3);">
                    ${i18nText('VER CONTROLES', 'SEE CONTROLS')} <i class="fas fa-arrow-down"></i>
                </a>
                <a href="#sia-documentos" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:${white};border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:15px;padding:16px 32px;border-radius:50px;text-decoration:none;">
                    ${i18nText('DOCUMENTOS SOB NDA', 'NDA DOCUMENTS')}
                </a>
            </div>
        </div>
        ${statusRow()}
    </section>

    ${section(
      'sia-indice',
      true,
      `
            ${kicker('00', 'Índice', 'Index')}
            ${h2('Como a Orbit', 'protege sua operação', 'How Orbit', 'protects your operation')}
            ${p(
              'Cada item declara o status com precisão — inclusive o que ainda não está certificado.',
              'Each item states status precisely — including what is not yet certified.',
            )}
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;">
              ${tocItems
                .map(
                  (it) => `
                <a class="sia-toc-card" href="${it.href}" style="${card}padding:20px 18px;text-decoration:none;display:block;transition:border-color .18s,background .18s;">
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px;">
                    <span style="color:${gold};font-size:12px;font-weight:800;letter-spacing:1px;">${it.n}</span>
                    ${badge(it.status, it.kind, it.statusEn)}
                  </div>
                  <div style="color:${white};font-weight:800;font-size:0.98rem;line-height:1.35;">${i18nText(it.title, it.titleEn)}</div>
                </a>`,
                )
                .join('')}
            </div>
            ${i18nEl(
              'p',
              `Orbit Gestão · infraestrutura Supabase sobre AWS, região <strong style="color:${white};">sa-east-1 (São Paulo)</strong>.`,
              `Orbit Gestão · Supabase infrastructure on AWS, region <strong style="color:${white};">sa-east-1 (São Paulo)</strong>.`,
              `style="margin:22px 0 0;color:${muted};font-size:0.88rem;line-height:1.55;"`,
            )}
      `,
    )}

    ${section(
      'sia-certificacoes',
      false,
      `
            ${kicker('01', 'Certificações', 'Certifications')}
            ${h2('O que é nosso, o que é da', 'infraestrutura', 'What is ours, what belongs to', 'infrastructure')}
            ${p(
              'Certificação da operação e certificação do data center são coisas distintas. A Orbit trata as duas com o mesmo rigor de linguagem.',
              'Certifying the operation and certifying the data center are different things. Orbit treats both with the same precision of language.',
            )}
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:22px;">
              <div style="${card}">
                <div style="margin-bottom:12px;">${badge('Orbit · operador', 'progress', 'Orbit · operator')}</div>
                ${i18nEl('h3', 'ISO/IEC 27001 e 27701', 'ISO/IEC 27001 and 27701', `style="color:${white};font-size:1.15rem;font-weight:800;margin:0 0 10px;"`)}
                ${i18nEl(
                  'p',
                  `Programa de Sistema de Gestão de Segurança da Informação e de privacidade em implementação, com consultoria independente da <strong style="color:${white};">Templum</strong>. O certificado ainda não foi emitido. Não publicamos percentual interno de avanço.`,
                  `Information Security and privacy management system program in progress, with independent consulting from <strong style="color:${white};">Templum</strong>. The certificate has not been issued yet. We do not publish an internal completion percentage.`,
                  `style="color:${text};font-size:0.95rem;line-height:1.65;margin:0;"`,
                )}
              </div>
              <div style="${card}">
                <div style="margin-bottom:12px;">${badge('Supabase / AWS', 'live')}</div>
                ${i18nEl('h3', 'SOC 2 Tipo II e ISO 27001', 'SOC 2 Type II and ISO 27001', `style="color:${white};font-size:1.15rem;font-weight:800;margin:0 0 10px;"`)}
                ${i18nEl(
                  'p',
                  `Cobrem a plataforma gerenciada de banco, autenticação, armazenamento e funções serverless, e os data centers AWS. <strong style="color:${white};">Não substituem</strong> a certificação da operação da Orbit.`,
                  `They cover the managed database, authentication, storage and serverless functions platform, and AWS data centers. They <strong style="color:${white};">do not replace</strong> certification of Orbit’s own operation.`,
                  `style="color:${text};font-size:0.95rem;line-height:1.65;margin:0;"`,
                )}
              </div>
            </div>
            ${i18nEl(
              'p',
              `Referências públicas dos provedores: <a href="https://supabase.com/security" target="_blank" rel="noopener noreferrer" style="color:${gold};">supabase.com/security</a> · <a href="https://aws.amazon.com/compliance/programs/" target="_blank" rel="noopener noreferrer" style="color:${gold};">aws.amazon.com/compliance</a>. Cópias de certificados da nuvem não são apresentados como se fossem da Orbit.`,
              `Public provider references: <a href="https://supabase.com/security" target="_blank" rel="noopener noreferrer" style="color:${gold};">supabase.com/security</a> · <a href="https://aws.amazon.com/compliance/programs/" target="_blank" rel="noopener noreferrer" style="color:${gold};">aws.amazon.com/compliance</a>. Copies of cloud certificates are not presented as if they belonged to Orbit.`,
              `style="color:${muted};font-size:0.92rem;line-height:1.6;margin:0;"`,
            )}
      `,
    )}

    ${section(
      'sia-psi',
      true,
      `
            ${kicker('02', 'Política', 'Policy')}
            ${h2('Política de Segurança da Informação', 'vigente', 'Information Security Policy', 'in force')}
            ${p(
              'A PSI da Orbit Gestão está publicada. Define governança, classificação, acesso, criptografia, continuidade, subprocessadores e resposta a incidentes. A certificação ISO/IEC 27001 permanece em implementação — a política não depende do certificado para vigorar.',
              'The Orbit Gestão ISP is published. It defines governance, classification, access, encryption, continuity, sub-processors and incident response. ISO/IEC 27001 certification remains in progress — the policy does not depend on the certificate to be in force.',
            )}
            <ul class="sia-list">
              ${i18nEl('li', 'Row Level Security (RLS) em todas as tabelas de dados da aplicação, com isolamento por organização.', 'Row Level Security (RLS) on every application data table, with isolation by organization.')}
              ${i18nEl('li', 'RBAC com papéis de plataforma (super_admin, channel_admin, org_admin, member) e privilégios granulares por módulo.', 'RBAC with platform roles (super_admin, channel_admin, org_admin, member) and granular privileges per module.')}
              ${i18nEl('li', 'MFA disponível; MFA obrigatório nos consoles administrativos da infraestrutura e no repositório de código.', 'MFA available; MFA required on infrastructure admin consoles and the code repository.')}
              ${i18nEl('li', 'Edge Functions com verificação de JWT por padrão; exceções inventariadas e com gate próprio (cron, webhook, endpoint público declarado).', 'Edge Functions with JWT verification by default; exceptions inventoried and gated on their own (cron, webhook, declared public endpoint).')}
              ${i18nEl('li', 'Segredos fora do código-fonte; chaves de integração armazenadas criptografadas.', 'Secrets kept out of source; integration keys stored encrypted.')}
              ${i18nEl('li', 'Revisão de código antes de produção; suíte de testes de contrato de segurança no CI.', 'Code review before production; security contract test suite in CI.')}
            </ul>
            <p style="margin:22px 0 0;"><a href="/politica-seguranca" style="display:inline-flex;align-items:center;gap:8px;background:${gold};color:#0D1117;font-weight:800;font-size:14px;padding:14px 24px;border-radius:50px;text-decoration:none;">${i18nText('LER A POLÍTICA COMPLETA', 'READ THE FULL POLICY')} <i class="fas fa-arrow-right"></i></a></p>
      `,
    )}

    ${section(
      'sia-pentest',
      false,
      `
            ${kicker('03', 'Pentest')}
            ${h2('Teste de intrusão por', 'terceiro independente', 'Intrusion testing by an', 'independent third party')}
            ${p(
              'O relatório completo não é público — contém detalhe que não deve circular fora de NDA. O atestado PTaaS da HOUS3 é público e atualiza o status em tempo real.',
              'The full report is not public — it contains detail that must not circulate outside an NDA. The HOUS3 PTaaS attestation is public and updates status in real time.',
            )}
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
                <tr><th>${i18nText('Executor', 'Executor')}</th><td>${i18nText('HOUS3 Digital — teste de intrusão independente (PTaaS)', 'HOUS3 Digital — independent intrusion test (PTaaS)')}</td></tr>
                <tr><th>${i18nText('Atestado público', 'Public attestation')}</th><td>HOUS3-2026-0002 · <a href="https://www.hous3.com.br/v/orb26-p9n4" target="_blank" rel="noopener noreferrer" style="color:${gold};font-weight:700;">${i18nText('verificar em hous3.com.br', 'verify at hous3.com.br')}</a></td></tr>
                <tr><th>${i18nText('Escopo', 'Scope')}</th><td>${i18nText('Aplicação web e API (white-box), inclusive a camada de autenticação da plataforma Orbit', 'Web application and API (white-box), including the Orbit platform authentication layer')}</td></tr>
                <tr><th>${i18nText('Resultado material', 'Material result')}</th><td>${i18nText('Não houve vazamento de dados entre organizações nem quebra do isolamento multi-tenant (RLS/RBAC resistiram ao teste)', 'No data leak between organizations and no break of multi-tenant isolation (RLS/RBAC held under test)')}</td></tr>
                <tr><th>${i18nText('Tratamento', 'Remediation')}</th><td>${i18nText('Achados de resiliência da autenticação e da configuração web foram remediados no mesmo mês, com plano formal de fechamento', 'Authentication resilience and web configuration findings were remediated in the same month, with a formal closure plan')}</td></tr>
                <tr><th>${i18nText('Frequência', 'Frequency')}</th><td>${i18nText('Pentest externo mensal pela HOUS3, com reteste após remediação, somado a validação interna contínua (revisão de código, testes automatizados, inventário de endpoints)', 'Monthly external pentest by HOUS3, with retest after remediation, plus continuous internal validation (code review, automated tests, endpoint inventory)')}</td></tr>
              </table>
            </div>
            ${i18nEl(
              'p',
              'Sumário executivo e relatório técnico: sob NDA, no pacote de due diligence. Não publicamos vetores, payloads nem lista de achados em página aberta.',
              'Executive summary and technical report: under NDA, in the due-diligence pack. We do not publish vectors, payloads or a findings list on an open page.',
              `style="color:${muted};font-size:0.92rem;line-height:1.6;margin:0;"`,
            )}
      `,
    )}

    ${section(
      'sia-backup',
      true,
      `
            ${kicker('04', 'Continuidade', 'Continuity')}
            ${h2('Backup, restauração e', 'continuidade', 'Backup, restore and', 'continuity')}
            ${p(
              'Produção Orbit Gestão no Supabase, AWS São Paulo (<strong style="color:#fff;">sa-east-1</strong>). Point-in-Time Recovery (PITR) está <strong style="color:#fff;">ativo</strong>: as alterações do banco são gravadas no WAL a cada 2 minutos, com janela de recuperação de 7 dias. Criptografia AES-256 em repouso e TLS 1.3 em trânsito.',
              'Orbit Gestão production on Supabase, AWS São Paulo (<strong style="color:#fff;">sa-east-1</strong>). Point-in-Time Recovery (PITR) is <strong style="color:#fff;">on</strong>: database changes are written to WAL every 2 minutes, with a 7-day recovery window. AES-256 at rest and TLS 1.3 in transit.',
            )}
            <div style="${card}margin-bottom:20px;">
              ${i18nEl('h4', 'O que são RPO e RTO', 'What RPO and RTO mean', `style="color:${white};margin:0 0 14px;font-size:1rem;"`)}
              <table class="sia-kv">
                <tr><th>RPO</th><td><strong style="color:${white};">Recovery Point Objective</strong> — ${i18nText('quanto dado você pode perder. É o atraso máximo entre a última cópia boa e o momento da falha.', 'how much data you can lose. It is the maximum lag between the last good copy and the moment of failure.')}</td></tr>
                <tr><th>RTO</th><td><strong style="color:${white};">Recovery Time Objective</strong> — ${i18nText('em quanto tempo o serviço volta. É o relógio do restore até a aplicação responder de novo.', 'how long until the service is back. It is the restore clock until the application responds again.')}</td></tr>
              </table>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-bottom:20px;">
              <div style="${card}">
                ${i18nEl('h4', 'RPO do banco', 'Database RPO', `style="color:${white};margin:0 0 8px;font-size:0.98rem;"`)}
                ${i18nEl(
                  'p',
                  `<strong style="color:${white};">2 minutos</strong> no pior caso. A Supabase arquiva o WAL nesse intervalo (ou antes, se o volume de transações encher o arquivo). Fonte: configuração PITR da conta de produção e <a href="https://supabase.com/docs/guides/platform/backups" target="_blank" rel="noopener noreferrer" style="color:${gold};">documentação do provedor</a>.`,
                  `<strong style="color:${white};">2 minutes</strong> in the worst case. Supabase archives WAL on that interval (or sooner if transaction volume fills the file). Source: production PITR configuration and <a href="https://supabase.com/docs/guides/platform/backups" target="_blank" rel="noopener noreferrer" style="color:${gold};">provider documentation</a>.`,
                  `style="color:${text};font-size:0.9rem;line-height:1.6;margin:0;"`,
                )}
              </div>
              <div style="${card}">
                ${i18nEl('h4', 'Janela PITR', 'PITR window', `style="color:${white};margin:0 0 8px;font-size:0.98rem;"`)}
                ${i18nEl(
                  'p',
                  `<strong style="color:${white};">7 dias</strong> de recuperação pontual (qualquer instante dentro da janela). A janela visível no Dashboard acompanha o fuso de Brasília. É possível ampliar a retenção no add-on PITR; hoje está em 7 dias.`,
                  `<strong style="color:${white};">7 days</strong> of point-in-time recovery (any instant inside the window). The window shown in the Dashboard follows Brasília time. Retention can be extended on the PITR add-on; today it is 7 days.`,
                  `style="color:${text};font-size:0.9rem;line-height:1.6;margin:0;"`,
                )}
              </div>
              <div style="${card}">
                ${i18nEl('h4', 'RTO', 'RTO', `style="color:${white};margin:0 0 8px;font-size:0.98rem;"`)}
                ${i18nEl(
                  'p',
                  `Restore PITR <strong style="color:${white};">no mesmo projeto</strong> deixa a produção inacessível enquanto corre. A duração depende do tamanho do banco — a Supabase não publica um número fixo, e nós não inventamos um. O RTO contratual de failover entra no plano de DR do SGSI depois de teste cronometrado nesse caminho.`,
                  `A PITR restore <strong style="color:${white};">on the same project</strong> makes production unavailable while it runs. Duration depends on database size — Supabase does not publish a fixed number, and we do not invent one. Contractual failover RTO enters the ISMS DR plan after a timed test on that path.`,
                  `style="color:${text};font-size:0.9rem;line-height:1.6;margin:0;"`,
                )}
              </div>
            </div>
            <div style="${card}margin-bottom:20px;">
              ${i18nEl('h4', 'Testes periódicos de restauração completa', 'Periodic full restore tests', `style="color:${white};margin:0 0 14px;font-size:1rem;"`)}
              ${i18nEl(
                'p',
                `A Orbit exercita o backup de ponta a ponta restaurando o banco para um <strong style="color:${white};">projeto Supabase novo</strong> — não sobrescreve a produção. É o teste completo de que o PITR gera um datastore utilizável, sem o downtime do restore in-place.`,
                `Orbit exercises backup end to end by restoring the database to a <strong style="color:${white};">new Supabase project</strong> — it does not overwrite production. That is the full test that PITR produces a usable datastore, without in-place restore downtime.`,
                `style="color:${text};font-size:0.95rem;line-height:1.65;margin:0 0 14px;"`,
              )}
              <table class="sia-kv">
                <tr><th>${i18nText('Método', 'Method')}</th><td>${i18nText('Restore to new project (PITR), no Dashboard de produção', 'Restore to new project (PITR), from the production Dashboard')}</td></tr>
                <tr><th>${i18nText('Frequência', 'Frequency')}</th><td>${i18nText('Testes periódicos completos da cadeia de backup e restauração', 'Periodic full tests of the backup and restore chain')}</td></tr>
                <tr><th>${i18nText('Último ciclo documentado', 'Last documented cycle')}</th><td>${i18nText('3 de julho de 2026, 00:44:57 UTC (2 de julho, 21:44:57, Brasília) — restauração', '3 July 2026, 00:44:57 UTC (2 July, 21:44:57, Brasília) — restore')} <strong style="color:${white};">backup orbit</strong>, status <strong style="color:${white};">COMPLETED</strong></td></tr>
                <tr><th>${i18nText('O que isso prova', 'What this proves')}</th><td>${i18nText('A cópia PITR restaura com sucesso para um ambiente isolado. Não é o relógio de um failover da produção, e não substitui o RTO contratual ainda não cronometrado.', 'The PITR copy restores successfully to an isolated environment. It is not the clock of a production failover, and it does not replace the contractual RTO that is not yet timed.')}</td></tr>
              </table>
            </div>
            <div style="${card}margin-bottom:16px;">
              ${i18nEl('h4', 'O que o PITR não cobre', 'What PITR does not cover', `style="color:${white};margin:0 0 10px;font-size:1rem;"`)}
              ${i18nEl(
                'p',
                `Objetos do <strong style="color:${white};">Storage</strong> (arquivos) <strong style="color:${white};">não entram</strong> no backup do banco. O PostgreSQL guarda só metadados. Restaurar um ponto antigo <strong style="color:${white};">não recupera arquivos apagados</strong> depois daquele ponto.`,
                `<strong style="color:${white};">Storage</strong> objects (files) <strong style="color:${white};">are not included</strong> in the database backup. PostgreSQL keeps metadata only. Restoring an older point <strong style="color:${white};">does not recover files deleted</strong> after that point.`,
                `style="color:${text};font-size:0.95rem;line-height:1.65;margin:0 0 10px;"`,
              )}
              ${i18nEl(
                'p',
                'Com PITR ligado, a granularidade do WAL (a cada 2 minutos) substitui o snapshot diário tradicional.',
                'With PITR on, WAL granularity (every 2 minutes) replaces the traditional daily snapshot.',
                `style="color:${text};font-size:0.95rem;line-height:1.65;margin:0;"`,
              )}
            </div>
      `,
    )}

    ${section(
      'sia-sla',
      false,
      `
            ${kicker('05', 'SLA')}
            ${h2('99,0% de disponibilidade', 'mensal', '99.0% monthly', 'availability')}
            ${p(
              'O compromisso vinculante está no <strong style="color:#fff;">Termos de Uso v3.0, Anexo III</strong>, aceito na Plataforma: disponibilidade mensal mínima de <strong style="color:#fff;">99,0%</strong>. A fórmula é (tempo do mês − indisponibilidade não programada) ÷ tempo do mês. Degradação que não impeça o uso não conta. Esta página pública não promete percentual acima do contrato.',
              'The binding commitment is in the <strong style="color:#fff;">Terms of Use v3.0, Annex III</strong>, accepted on the Platform: minimum monthly availability of <strong style="color:#fff;">99.0%</strong>. The formula is (time in the month − unplanned downtime) ÷ time in the month. Degradation that does not prevent use does not count. This public page does not promise a percentage above the contract.',
            )}
            <ul class="sia-list">
              ${i18nEl('li', `<strong style="color:${white};">O que entra:</strong> impossibilidade de acesso ou de uso das funcionalidades essenciais da Plataforma, apurada pelos sistemas de monitoramento da Empresa.`, `<strong style="color:${white};">What counts:</strong> inability to access or use essential Platform features, as measured by the Company’s monitoring systems.`)}
              ${i18nEl('li', `<strong style="color:${white};">O que não entra (cláusula 12.2):</strong> manutenção programada avisada com no mínimo 48 horas; manutenção emergencial de falha crítica ou vulnerabilidade; força maior, caso fortuito e ataques cibernéticos; falha de infraestrutura, conectividade, telecom ou energia; indisponibilidade ou limitação de provedores de IA; falha de dispositivo, rede ou integração do cliente; suspensões previstas nos Termos.`, `<strong style="color:${white};">What does not count (clause 12.2):</strong> scheduled maintenance announced at least 48 hours ahead; emergency maintenance for a critical failure or vulnerability; force majeure, act of God and cyber attacks; infrastructure, connectivity, telecom or power failure; unavailability or limits of AI providers; failure of the customer’s device, network or integration; suspensions provided in the Terms.`)}
              ${i18nEl('li', `<strong style="color:${white};">Crédito (contratação direta):</strong> único ressarcimento por indisponibilidade, aplicado de ofício na fatura seguinte — 10% se o mês ficar entre 95,0% e 99,0%; 25% entre 90,0% e 95,0%; 50% abaixo de 90,0% (Anexo III e cláusula 24). Não há indenização adicional por lucros cessantes.`, `<strong style="color:${white};">Credit (direct contract):</strong> the only compensation for downtime, applied automatically on the next invoice — 10% if the month is between 95.0% and 99.0%; 25% between 90.0% and 95.0%; 50% below 90.0% (Annex III and clause 24). There is no extra indemnity for lost profits.`)}
              ${i18nEl('li', `<strong style="color:${white};">Acesso via Canal:</strong> o crédito, quando devido, é da Empresa ao Canal. O cliente do Canal dirige pretensão comercial ao Canal, não à Orbit.`, `<strong style="color:${white};">Access via Channel:</strong> credit, when due, is from the Company to the Channel. The Channel’s customer directs commercial claims to the Channel, not to Orbit.`)}
              ${i18nEl('li', `<strong style="color:${white};">Suporte:</strong> contratação direta — primeira resposta em 72 horas úteis. Via Canal — primeiro nível pelo Canal (cláusulas 5.2.4 e III.3).`, `<strong style="color:${white};">Support:</strong> direct contract — first response in 72 business hours. Via Channel — first level by the Channel (clauses 5.2.4 and III.3).`)}
              ${i18nEl('li', `<strong style="color:${white};">Responsabilidade:</strong> limitada ao valor pago à Empresa nos 12 meses anteriores (cláusula 13.3), com as exceções de dolo, fraude, PI e confidencialidade.`, `<strong style="color:${white};">Liability:</strong> limited to the amount paid to the Company in the prior 12 months (clause 13.3), with exceptions for willful misconduct, fraud, IP and confidentiality.`)}
            </ul>
            <p style="margin:22px 0 0;"><a href="/status" style="display:inline-flex;align-items:center;gap:8px;background:${gold};color:#0D1117;font-weight:800;font-size:14px;padding:14px 24px;border-radius:50px;text-decoration:none;">${i18nText('VER STATUS E HISTÓRICO', 'SEE STATUS AND HISTORY')} <i class="fas fa-arrow-right"></i></a></p>
      `,
    )}

    ${section(
      'sia-incidentes',
      true,
      `
            ${kicker('06', 'Incidentes', 'Incidents')}
            ${h2('Resposta a incidentes e', 'art. 48 da LGPD', 'Incident response and', 'LGPD art. 48')}
            ${p(
              'Fluxo alinhado à cláusula 10.7 dos Termos de Uso v3.0. O playbook interno (contatos, runbooks, evidência forense) permanece sob NDA.',
              'Flow aligned with clause 10.7 of Terms of Use v3.0. The internal playbook (contacts, runbooks, forensic evidence) remains under NDA.',
            )}
            <ol class="sia-ol">
              ${i18nEl('li', `<strong style="color:${white};">Detecção e contenção.</strong> Identificação pela equipe técnica; contenção imediata (revogação de sessões/tokens, isolamento de acesso).`, `<strong style="color:${white};">Detection and containment.</strong> Identification by the technical team; immediate containment (session/token revocation, access isolation).`)}
              ${i18nEl('li', `<strong style="color:${white};">Acionamento interno.</strong> Equipe responsável acionada em até <strong style="color:${white};">1 hora</strong> para incidentes classificados como críticos.`, `<strong style="color:${white};">Internal escalation.</strong> The responsible team is engaged within <strong style="color:${white};">1 hour</strong> for incidents classified as critical.`)}
              ${i18nEl('li', `<strong style="color:${white};">Notificação ao Cliente.</strong> Comunicação ao Controlador no contato designado em até <strong style="color:${white};">48 horas</strong> do conhecimento do fato, com as informações disponíveis (cláusula 10.7.1). A comunicação não implica, por si, reconhecimento de culpa.`, `<strong style="color:${white};">Customer notice.</strong> Communication to the Controller at the designated contact within <strong style="color:${white};">48 hours</strong> of becoming aware of the fact, with the information available (clause 10.7.1). The notice does not, by itself, imply admission of fault.`)}
              ${i18nEl('li', `<strong style="color:${white};">ANPD e titulares (art. 48 da LGPD).</strong> A comunicação à Autoridade e aos titulares compete ao <strong style="color:${white};">Controlador</strong>, com o apoio da Orbit (cláusula 10.7.2). A Orbit não substitui o cliente nessa obrigação.`, `<strong style="color:${white};">ANPD and data subjects (LGPD art. 48).</strong> Notice to the Authority and to data subjects is the <strong style="color:${white};">Controller’s</strong> duty, with Orbit support (clause 10.7.2). Orbit does not replace the customer in that obligation.`)}
              ${i18nEl('li', `<strong style="color:${white};">Conteúdo.</strong> Natureza do incidente, dados potencialmente afetados, contenção e próximos passos.`, `<strong style="color:${white};">Content.</strong> Nature of the incident, data potentially affected, containment and next steps.`)}
              ${i18nEl('li', `<strong style="color:${white};">Pós-incidente.</strong> Causa raiz, medidas preventivas e registro para o SGSI.`, `<strong style="color:${white};">Post-incident.</strong> Root cause, preventive measures and a record for the ISMS.`)}
            </ol>
      `,
    )}

    ${section(
      'sia-dpa',
      false,
      `
            ${kicker('07', 'Privacidade', 'Privacy')}
            ${h2('Operador, DPA e', 'Encarregado (DPO)', 'Processor, DPA and', 'Data Protection Officer')}
            ${p(
              'Na prestação do SaaS, a organização cliente é, em regra, a <strong style="color:#fff;">controladora</strong> dos dados que insere na Orbit (clientes, colaboradores, documentos, financeiro). A Orbit Gestão atua como <strong style="color:#fff;">operadora</strong>, nos termos da LGPD, tratando esses dados sob instrução do cliente para executar o contrato.',
              'In the SaaS service, the customer organization is, as a rule, the <strong style="color:#fff;">controller</strong> of the data it enters in Orbit (customers, employees, documents, finance). Orbit Gestão acts as <strong style="color:#fff;">processor</strong> under the LGPD, processing that data on the customer’s instructions to perform the contract.',
            )}
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:8px 0 20px;">
              <div style="${card}">
                ${i18nEl('h4', 'Encarregada (DPO)', 'Data Protection Officer', `style="color:${white};margin:0 0 8px;"`)}
                ${i18nEl(
                  'p',
                  `Nomeada nos Termos de Uso v3.0, cláusula 10.6.2, com atuação via <strong style="color:${white};">Templum</strong> e plataforma <a href="https://dponet.com.br/" target="_blank" rel="noopener noreferrer" style="color:${gold};">DPOnet</a>. Prazo de resposta a requisições: 15 dias.`,
                  `Appointed in Terms of Use v3.0, clause 10.6.2, acting through <strong style="color:${white};">Templum</strong> and the <a href="https://dponet.com.br/" target="_blank" rel="noopener noreferrer" style="color:${gold};">DPOnet</a> platform. Response time for requests: 15 days.`,
                  `style="color:${text};font-size:0.92rem;line-height:1.65;margin:0 0 12px;"`,
                )}
                <p style="margin:0 0 8px;"><strong style="color:${white};">Jennifer Dantas</strong></p>
                <p style="margin:0;"><!--email_off--><a href="mailto:jennifer.dantas@templum.com.br" style="color:${gold};font-weight:700;">jennifer.dantas@templum.com.br</a><!--email_on--></p>
              </div>
              <div style="${card}">
                ${i18nEl('h4', 'DPA (acordo de tratamento)', 'DPA (data processing agreement)', `style="color:${white};margin:0 0 8px;"`)}
                ${i18nEl(
                  'p',
                  `O Anexo IV dos Termos de Uso v3.0 <strong style="color:${white};">tem natureza de acordo de tratamento de dados</strong> e é aceito eletronicamente na Plataforma, com o corpo dos Termos. Instruções do controlador, subprocessadores, segurança, incidente e eliminação ao término já estão nesse anexo — não é minuta futura.`,
                  `Annex IV of Terms of Use v3.0 <strong style="color:${white};">is a data processing agreement</strong> and is accepted electronically on the Platform together with the Terms. Controller instructions, sub-processors, security, incidents and deletion at the end are already in that annex — it is not a future draft.`,
                  `style="color:${text};font-size:0.92rem;line-height:1.65;margin:0;"`,
                )}
              </div>
            </div>
            ${i18nEl(
              'p',
              `Documentos públicos correlatos: <a href="/politica-seguranca" style="color:${gold};">Política de Segurança da Informação</a> · <a href="/politica-privacidade" style="color:${gold};">Política de Privacidade</a> · <a href="/termos-de-servico" style="color:${gold};">Termos de Uso (resumo público)</a>. O documento vinculante é o aceite v3.0 na Área de Conformidade da Plataforma.`,
              `Related public documents: <a href="/politica-seguranca" style="color:${gold};">Information Security Policy</a> · <a href="/politica-privacidade" style="color:${gold};">Privacy Policy</a> · <a href="/termos-de-servico" style="color:${gold};">Terms of Use (public summary)</a>. The binding document is the v3.0 acceptance in the Platform Compliance Area.`,
              `style="color:${muted};font-size:0.92rem;line-height:1.6;margin:0;"`,
            )}
      `,
    )}

    ${section(
      'sia-canal',
      true,
      `
            ${kicker('08', 'Canal', 'Channel')}
            ${h2('White-label e consultorias', '(Acesso via Canal)', 'White-label and consultancies', '(Access via Channel)')}
            ${p(
              'A Plataforma pode ser apresentada sob a marca e o método de um Canal — consultoria autorizada a usar o Orbit como infraestrutura para prestar serviço a terceiros. Isso está na cláusula 5 dos Termos v3.0. Os Termos de uso da Plataforma vigoram mesmo quando a interface não diz “Orbit”.',
              'The Platform may be presented under a Channel’s brand and method — a consultancy authorized to use Orbit as infrastructure to serve third parties. That is in clause 5 of Terms v3.0. The Platform Terms apply even when the interface does not say “Orbit”.',
            )}
            <ul class="sia-list">
              ${i18nEl('li', `<strong style="color:${white};">Quem é quem.</strong> O Cliente da consultoria é Controlador dos dados da Organização. A Orbit é Operadora. O Canal é Operador quando trata dados em nome do Cliente (configuração, suporte, acompanhamento de implantação). Se o Canal definir finalidade própria, assume Controlador desse tratamento e responde sozinho por ele (cláusula 10.1.1).`, `<strong style="color:${white};">Who is who.</strong> The consultancy’s Customer is Controller of the Organization’s data. Orbit is Processor. The Channel is Processor when it processes data on the Customer’s behalf (configuration, support, implementation follow-up). If the Channel defines its own purpose, it becomes Controller of that processing and is solely responsible for it (clause 10.1.1).`)}
              ${i18nEl('li', `<strong style="color:${white};">Acesso do Canal à Organização.</strong> O Cliente concorda que o Canal acessa os dados só para configurar agentes com o método da consultoria, prestar suporte e acompanhar o uso. É vedado ao Canal exportar, comercializar, treinar modelos ou usar os dados para outra finalidade (cláusula 5.3).`, `<strong style="color:${white};">Channel access to the Organization.</strong> The Customer agrees the Channel accesses data only to configure agents with the consultancy’s method, provide support and follow usage. The Channel may not export, sell, train models or use the data for another purpose (clause 5.3).`)}
              ${i18nEl('li', `<strong style="color:${white};">Isolamento.</strong> Organizações continuam isoladas entre si no banco. A exceção expressa é o acesso do Canal à Organização do seu Cliente, na forma da cláusula 5.3 — não o acesso de um cliente a outro.`, `<strong style="color:${white};">Isolation.</strong> Organizations remain isolated from each other in the database. The express exception is the Channel’s access to its Customer’s Organization under clause 5.3 — not one customer accessing another.`)}
              ${i18nEl('li', `<strong style="color:${white};">Comercial e suporte.</strong> Preço, SLA prometido pelo Canal e suporte de primeiro nível são do contrato Cliente–Canal. A Orbit não é parte nessa relação e não responde pela consultoria. Demandas do cliente do Canal vão ao Canal; a Orbit presta suporte técnico ao Canal (cláusula 5.2).`, `<strong style="color:${white};">Commercial and support.</strong> Price, SLA promised by the Channel and first-level support are in the Customer–Channel contract. Orbit is not a party to that relationship and is not liable for the consultancy. Claims from the Channel’s customer go to the Channel; Orbit provides technical support to the Channel (clause 5.2).`)}
              ${i18nEl('li', `<strong style="color:${white};">Licença.</strong> A Organização do Cliente via Canal depende da licença do Canal com a Orbit. Se essa licença cair, aplica-se o regime de continuidade da cláusula 16.3 (a Orbit pode, sem obrigação, assumir a Organização em contratação direta).`, `<strong style="color:${white};">License.</strong> The Customer’s Organization via Channel depends on the Channel’s license with Orbit. If that license ends, the continuity regime in clause 16.3 applies (Orbit may, without obligation, take over the Organization on a direct contract).`)}
              ${i18nEl('li', `<strong style="color:${white};">Metodologia.</strong> O método e os conteúdos do Canal configurados na Organização continuam do Canal; o Conteúdo do Cliente continua do Cliente (cláusulas 9.3 e 9.6).`, `<strong style="color:${white};">Methodology.</strong> The Channel’s method and content configured in the Organization remain the Channel’s; Customer Content remains the Customer’s (clauses 9.3 and 9.6).`)}
            </ul>
      `,
    )}

    ${section(
      'sia-subprocessadores',
      false,
      `
            ${kicker('09', 'Subprocessadores', 'Sub-processors')}
            ${h2('Quem trata dados, onde, e', 'em que base', 'Who processes data, where, and', 'on what basis')}
            ${p(
              'Lista do <strong style="color:#fff;">Anexo IV</strong> dos Termos de Uso v3.0. Não vendemos dados. Inclusão de subprocessador essencial ou de nova jurisdição é comunicada com antecedência mínima de 30 dias (IV.4.1).',
              'List from <strong style="color:#fff;">Annex IV</strong> of Terms of Use v3.0. We do not sell data. Adding an essential sub-processor or a new jurisdiction is communicated at least 30 days in advance (IV.4.1).',
            )}
            ${i18nEl('h4', 'Essenciais (permanentes)', 'Essential (permanent)', `style="color:${white};margin:0 0 12px;font-size:1rem;"`)}
            <div class="sia-table-wrap" style="margin-bottom:20px;">
              <table class="sia-table">
                <thead>
                  <tr>
                    <th>${i18nText('Subprocessador', 'Sub-processor')}</th>
                    <th>${i18nText('Finalidade', 'Purpose')}</th>
                    <th>${i18nText('Local do tratamento', 'Processing location')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style="color:${white};font-weight:700;">Supabase</td><td>${i18nText('Banco, autenticação, arquivos e funções (infra AWS sa-east-1)', 'Database, authentication, files and functions (AWS sa-east-1 infra)')}</td><td>${i18nText('Brasil — sa-east-1', 'Brazil — sa-east-1')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Cloudflare</td><td>${i18nText('CDN, DNS e proteção de borda', 'CDN, DNS and edge protection')}</td><td>${i18nText('Roteamento global; conteúdo hospedado no Brasil', 'Global routing; content hosted in Brazil')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">OpenAI</td><td>${i18nText('Processamento das interações com os agentes de IA', 'Processing of interactions with AI agents')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Evolumeet</td><td>${i18nText('Captura, gravação e transcrição de reuniões', 'Meeting capture, recording and transcription')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">ElevenLabs</td><td>${i18nText('Síntese e reconhecimento de voz nos agentes conversacionais', 'Speech synthesis and recognition in conversational agents')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Twilio</td><td>${i18nText('Mensagens por WhatsApp e SMS', 'WhatsApp and SMS messaging')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Resend</td><td>${i18nText('E-mail transacional', 'Transactional email')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">MailerSend</td><td>${i18nText('E-mail transacional e institucional', 'Transactional and institutional email')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Stripe</td><td>${i18nText('Pagamentos e assinaturas (contratação direta)', 'Payments and subscriptions (direct contract)')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                </tbody>
              </table>
            </div>
            ${i18nEl('h4', 'Opcionais (só se o Cliente habilitar)', 'Optional (only if the Customer enables them)', `style="color:${white};margin:0 0 12px;font-size:1rem;"`)}
            <div class="sia-table-wrap" style="margin-bottom:20px;">
              <table class="sia-table">
                <thead>
                  <tr>
                    <th>${i18nText('Integração', 'Integration')}</th>
                    <th>${i18nText('Finalidade', 'Purpose')}</th>
                    <th>${i18nText('Local do tratamento', 'Processing location')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style="color:${white};font-weight:700;">Google</td><td>${i18nText('Autenticação federada, agenda e integração publicitária', 'Federated authentication, calendar and ads integration')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Meta</td><td>${i18nText('WhatsApp Business e integração publicitária', 'WhatsApp Business and ads integration')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">LinkedIn</td><td>${i18nText('Autenticação e divulgação de vagas', 'Authentication and job posting')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">Perplexity, Firecrawl e Apify</td><td>${i18nText('Pesquisa de mercado e enriquecimento de dados públicos', 'Market research and public-data enrichment')}</td><td>${i18nText('Estados Unidos', 'United States')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">${i18nText('Instituições financeiras', 'Financial institutions')}</td><td>${i18nText('Conciliação e importação de extratos', 'Reconciliation and statement import')}</td><td>${i18nText('Brasil', 'Brazil')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">${i18nText('Provedores de documentos fiscais', 'Tax document providers')}</td><td>${i18nText('Emissão de notas fiscais', 'Invoice issuance')}</td><td>${i18nText('Brasil', 'Brazil')}</td></tr>
                </tbody>
              </table>
            </div>
            <div style="${card}">
              ${i18nEl('h4', 'IA, treinamento e transferência internacional', 'AI, training and international transfer', `style="color:${white};margin:0 0 10px;"`)}
              ${i18nEl(
                'p',
                'O Conteúdo do Cliente não é usado para treinar, ajustar ou aperfeiçoar modelos da Orbit ou de terceiros (cláusula 6.6 e IV.2.3). Os provedores de IA são contratados em modalidades que vedam essa utilização. Banco e arquivos permanecem no Brasil; inferência de IA, gravação, mensageria, e-mail e pagamento ocorrem, no todo ou em parte, nos EUA (IV.5) — transferência com cláusulas contratuais (LGPD, art. 33).',
                'Customer Content is not used to train, fine-tune or improve Orbit or third-party models (clause 6.6 and IV.2.3). AI providers are contracted under terms that forbid that use. Database and files stay in Brazil; AI inference, recording, messaging, email and payment occur, in whole or in part, in the US (IV.5) — transfer with contractual clauses (LGPD, art. 33).',
                `style="color:${text};font-size:0.95rem;line-height:1.65;margin:0 0 12px;"`,
              )}
              ${i18nEl(
                'p',
                'Integração Google habilitada pelo Cliente segue Uso Limitado da Política de Privacidade. O Cliente, como Controlador, informa os titulares da transferência (IV.5.3).',
                'Google integration enabled by the Customer follows Limited Use under the Privacy Policy. The Customer, as Controller, informs data subjects of the transfer (IV.5.3).',
                `style="color:${text};font-size:0.95rem;line-height:1.65;margin:0;"`,
              )}
            </div>
      `,
    )}

    ${section(
      'sia-retencao',
      true,
      `
            ${kicker('10', 'Ciclo de vida', 'Lifecycle')}
            ${h2('Retenção, portabilidade e', 'descarte', 'Retention, portability and', 'disposal')}
            ${p(
              'Fonte: cláusulas 15 e Anexo II.5 dos <a href="/termos-de-servico" style="color:' + gold + ';font-weight:700;">Termos de Uso v3.0</a>.',
              'Source: clauses 15 and Annex II.5 of the <a href="/termos-de-servico" style="color:' + gold + ';font-weight:700;">Terms of Use v3.0</a>.',
            )}
            <ul class="sia-list">
              ${i18nEl('li', `<strong style="color:${white};">Durante a vigência:</strong> Conteúdo do Cliente disponível na Organização. Gravações de reunião (arquivo de mídia): 90 dias da data da reunião; transcrições e análises permanecem enquanto o acesso vigorar. A Empresa notifica 7 dias antes da eliminação programada de gravações.`, `<strong style="color:${white};">During the term:</strong> Customer Content available in the Organization. Meeting recordings (media file): 90 days from the meeting date; transcripts and analyses remain while access is in force. The Company notifies 7 days before scheduled deletion of recordings.`)}
              ${i18nEl('li', `<strong style="color:${white};">Após o encerramento (15.3):</strong> 30 dias de acesso restrito, só leitura, para exportar em formato aberto; em seguida 60 dias arquivado, recuperável a pedido; depois eliminação ou anonimização, salvo obrigação legal. No Acesso via Canal, esses prazos contam da comunicação do encerramento; a exportação é feita direto ao Cliente, sem depender do Canal.`, `<strong style="color:${white};">After termination (15.3):</strong> 30 days of restricted read-only access to export in an open format; then 60 days archived, recoverable on request; then deletion or anonymization, unless a legal duty applies. In Access via Channel, those periods run from notice of termination; export goes directly to the Customer, without depending on the Channel.`)}
              ${i18nEl('li', `<strong style="color:${white};">Registros de acesso:</strong> 6 meses, na forma do art. 15 do Marco Civil da Internet (cláusula 11.4).`, `<strong style="color:${white};">Access logs:</strong> 6 months, under art. 15 of the Brazilian Internet Civil Framework (clause 11.4).`)}
              ${i18nEl('li', `<strong style="color:${white};">Direitos do titular:</strong> requisições sobre o Conteúdo do Cliente vão ao Controlador. Sobre dados de que a Empresa é Controladora — à Encarregada, em 15 dias.`, `<strong style="color:${white};">Data-subject rights:</strong> requests about Customer Content go to the Controller. About data for which the Company is Controller — to the DPO, within 15 days.`)}
            </ul>
      `,
    )}

    ${section(
      'sia-financeiro',
      false,
      `
            ${kicker('11', 'Financeiro', 'Finance')}
            ${h2('Trilha de auditoria, segregação e', 'matriz de acessos', 'Audit trail, segregation and', 'access matrix')}
            ${p(
              'Controles implementados no módulo financeiro da plataforma — não são uma promessa futura. A matriz efetiva de cada cliente é a que o administrador da organização configura.',
              'Controls implemented in the platform finance module — not a future promise. Each customer’s effective matrix is the one the organization administrator configures.',
            )}
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:18px;">
              <div style="${card}">
                ${i18nEl('h4', 'Trilha de auditoria', 'Audit trail', `style="color:${white};margin:0 0 8px;"`)}
                ${i18nEl(
                  'p',
                  `Toda inserção, alteração e exclusão nas entidades financeiras cobertas (contas a pagar e a receber, parcelas, fornecedores, plano de contas, centros de custo, transferências bancárias) gera registro automático: quem, quando, o quê, valores anteriores e posteriores. Usuários da aplicação <strong style="color:${white};">não conseguem gravar, editar ou apagar</strong> essa trilha — a escrita ocorre só por trigger no banco; políticas de RLS bloqueiam INSERT/UPDATE/DELETE diretos.`,
                  `Every insert, change and delete on covered finance entities (payables and receivables, installments, vendors, chart of accounts, cost centers, bank transfers) creates an automatic record: who, when, what, prior and later values. Application users <strong style="color:${white};">cannot write, edit or delete</strong> that trail — writes happen only via a database trigger; RLS policies block direct INSERT/UPDATE/DELETE.`,
                  `style="color:${text};font-size:0.92rem;line-height:1.65;margin:0;"`,
                )}
              </div>
              <div style="${card}">
                ${i18nEl('h4', 'Fechamento de período', 'Period close', `style="color:${white};margin:0 0 8px;"`)}
                ${i18nEl(
                  'p',
                  `Snapshots mensais com totais e <strong style="color:${white};">hash de integridade</strong>. Depois de fechado, o snapshot não pode ser alterado nem excluído pelo usuário autenticado (UPDATE/DELETE bloqueados por política).`,
                  `Monthly snapshots with totals and an <strong style="color:${white};">integrity hash</strong>. After close, the snapshot cannot be changed or deleted by an authenticated user (UPDATE/DELETE blocked by policy).`,
                  `style="color:${text};font-size:0.92rem;line-height:1.65;margin:0;"`,
                )}
              </div>
              <div style="${card}">
                ${i18nEl('h4', 'Segregação de funções', 'Segregation of duties', `style="color:${white};margin:0 0 8px;"`)}
                ${i18nEl(
                  'p',
                  `Privilégios distintos para visualizar, lançar, editar, <strong style="color:${white};">aprovar</strong> e <strong style="color:${white};">dar baixa</strong>. Quem lança não precisa ser quem aprova; quem aprova não precisa ser quem concilia o banco. Alçadas de aprovação são configuráveis. A segregação efetiva depende de o administrador não acumular todos os privilégios na mesma pessoa.`,
                  `Distinct privileges to view, post, edit, <strong style="color:${white};">approve</strong> and <strong style="color:${white};">settle</strong>. The person who posts need not be the person who approves; the person who approves need not be the person who reconciles the bank. Approval thresholds are configurable. Effective segregation depends on the administrator not stacking every privilege on the same person.`,
                  `style="color:${text};font-size:0.92rem;line-height:1.65;margin:0;"`,
                )}
              </div>
            </div>
            <div class="sia-table-wrap">
              <table class="sia-table">
                <thead>
                  <tr>
                    <th>${i18nText('Família de privilégio', 'Privilege family')}</th>
                    <th>${i18nText('O que separa', 'What it separates')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style="color:${white};font-weight:700;">${i18nText('Visualizar', 'View')}</td><td>${i18nText('Dashboard, contas a pagar, contas a receber, DRE, fluxo de caixa, orçamento, conciliação — cada um com privilégio próprio', 'Dashboard, payables, receivables, P&amp;L, cash flow, budget, reconciliation — each with its own privilege')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">${i18nText('Lançar / editar / excluir', 'Post / edit / delete')}</td><td>${i18nText('Criar e alterar títulos, separado da aprovação e da baixa bancária', 'Create and change entries, separate from approval and bank settlement')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">${i18nText('Aprovar', 'Approve')}</td><td>${i18nText('Aprovar pagamentos, contas a receber e versões de orçamento, segundo alçada', 'Approve payments, receivables and budget versions, by threshold')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">${i18nText('Baixar / conciliar', 'Settle / reconcile')}</td><td>${i18nText('Registrar pagamento ou recebimento no banco; executar conciliação; transferências internas', 'Record a payment or receipt at the bank; run reconciliation; internal transfers')}</td></tr>
                  <tr><td style="color:${white};font-weight:700;">${i18nText('Configurar', 'Configure')}</td><td>${i18nText('Regras de aprovação, fornecedores, plano de contas, escopos por centro de custo / conta / fornecedor / cliente, integrações ERP, NFS-e / NF-e', 'Approval rules, vendors, chart of accounts, scopes by cost center / account / vendor / customer, ERP integrations, NFS-e / NF-e')}</td></tr>
                </tbody>
              </table>
            </div>
            ${i18nEl(
              'p',
              'A trilha é append-only na camada da aplicação. Administradores de infraestrutura com credencial de serviço do banco podem, como em qualquer SaaS, operar o datastore — esse acesso é restrito, MFA e registrado. Não descrevemos isso como WORM criptográfico tipo gravador fiscal.',
              'The trail is append-only at the application layer. Infrastructure administrators with a database service credential can, as in any SaaS, operate the datastore — that access is restricted, MFA-protected and logged. We do not describe this as cryptographic WORM like a fiscal recorder.',
              `style="color:${muted};font-size:0.88rem;line-height:1.55;margin:16px 0 0;"`,
            )}
      `,
    )}

    ${section(
      'sia-documentos',
      false,
      `
            ${kicker('Due diligence', 'Pacote', 'Pack')}
            ${h2('O que é público e o que', 'vai sob NDA', 'What is public and what', 'goes under NDA')}
            ${p(
              'Um comitê de segurança não deveria receber um PDF de produto. A tabela é o mapa honesto do pacote. O Termos de Uso v3.0, aceito na Plataforma, prevalece sobre qualquer resumo desta página.',
              'A security committee should not receive a product PDF. The table is the honest map of the pack. Terms of Use v3.0, accepted on the Platform, prevails over any summary on this page.',
            )}
            ${packTable()}
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:28px;">
              <a href="mailto:contato@orbitgestao.com.br?subject=Due%20diligence%20de%20seguranca%20%E2%80%94%20pacote%20NDA" style="display:inline-flex;align-items:center;gap:8px;background:${gold};color:#0D1117;font-weight:800;font-size:15px;padding:16px 28px;border-radius:50px;text-decoration:none;">
                ${i18nText('SOLICITAR PACOTE SOB NDA', 'REQUEST NDA PACK')} <i class="fas fa-envelope"></i>
              </a>
              <a href="/politica-seguranca" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:${white};border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:15px;padding:16px 28px;border-radius:50px;text-decoration:none;">
                ${i18nText('POLÍTICA DE SEGURANÇA', 'SECURITY POLICY')}
              </a>
              <a href="/politica-privacidade" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:${white};border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:15px;padding:16px 28px;border-radius:50px;text-decoration:none;">
                ${i18nText('POLÍTICA DE PRIVACIDADE', 'PRIVACY POLICY')}
              </a>
              <a href="/termos-de-servico" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:${white};border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:15px;padding:16px 28px;border-radius:50px;text-decoration:none;">
                ${i18nText('TERMOS DE SERVIÇO', 'TERMS OF SERVICE')}
              </a>
            </div>
      `,
    )}
`;
