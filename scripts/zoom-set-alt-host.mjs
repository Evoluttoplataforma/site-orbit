#!/usr/bin/env node
/**
 * Define host alternativo nas 3 reuniões recorrentes de /treinamentos.
 *
 * POR QUE ISSO É NECESSÁRIO: as reuniões foram criadas com `join_before_host: false`
 * (scripts/zoom-setup-meetings.mjs:176). Sem host alternativo, ninguém além do dono da
 * conta Zoom consegue ABRIR a sala — quem for conduzir a sessão fica travado na porta
 * junto com os inscritos. Host alternativo resolve os dois lados: ele abre a sala e
 * recebe o link de início por e-mail.
 *
 * LIMITE DO ZOOM: host alternativo tem de ser usuário LICENCIADO da mesma conta. E-mail
 * de fora da conta, ou usuário Basic, devolve 400. Por isso o --list existe: confirme o
 * e-mail exato antes de gravar.
 *
 * Lê ZOOM_ACCOUNT_ID / ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET de .env.local.
 * Nunca imprime credenciais.
 *
 *   node scripts/zoom-set-alt-host.mjs --list
 *       lista os usuários da conta (e-mail, tipo, licença) e o estado atual das 3 reuniões
 *
 *   node scripts/zoom-set-alt-host.mjs --email chris@orbitgestao.com.br --dry-run
 *       valida que o e-mail é licenciado e mostra o que faria
 *
 *   node scripts/zoom-set-alt-host.mjs --email chris@orbitgestao.com.br
 *       grava de verdade nas 3 reuniões (série inteira, não ocorrência isolada)
 *
 * Aceita mais de um: --email a@x.com,b@x.com
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

/**
 * IDs das 3 reuniões, espelhando training_sessions.zoom_meeting_id no Supabase.
 * Se a recorrência for recriada (o Zoom limita a 50 ocorrências, ~jul/2027), atualizar.
 */
const MEETINGS = [
  { slug: 'seg-17-tira-duvidas', label: 'Tira Dúvidas — Segunda 17h', id: '85633607601' },
  { slug: 'qua-10-treinamento', label: 'Treinamento — Quarta 10h', id: '86359683367' },
  { slug: 'sex-09-tira-duvidas', label: 'Tira Dúvidas — Sexta 9h', id: '81291446652' },
];

// ─── env ───────────────────────────────────────────────────────────────────
function loadEnv() {
  const file = path.join(ROOT, '.env.local');
  if (!fs.existsSync(file)) throw new Error('.env.local não encontrado na raiz do repo');
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) out[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

const env = loadEnv();
const missing = ['ZOOM_ACCOUNT_ID', 'ZOOM_CLIENT_ID', 'ZOOM_CLIENT_SECRET'].filter((k) => !env[k]);
if (missing.length) {
  console.error(`\nFaltando em .env.local: ${missing.join(', ')}\n`);
  process.exit(1);
}

// ─── Zoom ──────────────────────────────────────────────────────────────────
let token = null;
async function getToken() {
  if (token) return token;
  const basic = Buffer.from(`${env.ZOOM_CLIENT_ID}:${env.ZOOM_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(env.ZOOM_ACCOUNT_ID)}`,
    { method: 'POST', headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  const body = await res.text();
  if (!res.ok) {
    console.error(`\nOAuth falhou (HTTP ${res.status}): ${body.slice(0, 300)}`);
    process.exit(1);
  }
  token = JSON.parse(body).access_token;
  console.log('OAuth OK.');
  return token;
}

async function zoom(pathname, init = {}) {
  const t = await getToken();
  const res = await fetch(`https://api.zoom.us/v2${pathname}`, {
    ...init,
    headers: { ...(init.headers || {}), Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' },
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* deixa null */ }
  return { ok: res.ok, status: res.status, json, text };
}

// Zoom devolve type numérico; 1 = Basic (NÃO serve como host alternativo).
const USER_TYPE = { 1: 'Basic', 2: 'Licensed', 3: 'On-prem', 99: 'None' };

/**
 * Lista os usuários da conta. Devolve null (em vez de abortar) quando o app não tem o
 * escopo user:read:list_users:admin — que é o caso hoje.
 *
 * Sem a lista, perdemos só a validação PRÉVIA do e-mail. O Zoom valida de novo no PATCH e
 * devolve 400 se a pessoa não for usuária licenciada da conta, então o pior caso é uma
 * reunião não alterada com erro explícito — não uma configuração errada gravada.
 */
async function listUsers() {
  const r = await zoom('/users?status=active&page_size=300');
  if (r.ok) return r.json?.users || [];
  if (/does not contain scopes/i.test(r.text || '')) {
    console.warn('\n⚠ Sem o escopo user:read:list_users:admin — não consigo listar usuários.');
    console.warn('  Para habilitar: Zoom Marketplace → seu app Server-to-Server → Scopes →');
    console.warn('  adicionar "View all user information" (user:read:list_users:admin).');
    return null;
  }
  console.error(`\nFalha ao listar usuários (HTTP ${r.status}): ${(r.text || '').slice(0, 300)}`);
  process.exit(1);
}

async function getMeeting(id) {
  const r = await zoom(`/meetings/${encodeURIComponent(id)}`);
  if (!r.ok) return null;
  return r.json;
}

// ─── comandos ──────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const emailArg = (() => {
  const i = argv.indexOf('--email');
  return i >= 0 && argv[i + 1] ? argv[i + 1] : null;
})();

async function cmdList() {
  const users = await listUsers();
  if (users) {
    console.log(`\nUsuários ativos na conta (${users.length}):\n`);
    for (const u of users) {
      const t = USER_TYPE[u.type] || `type=${u.type}`;
      const flag = u.type === 2 ? 'pode ser host alternativo' : 'NÃO pode (precisa ser Licensed)';
      const nome = [u.first_name, u.last_name].filter(Boolean).join(' ') || '(sem nome)';
      console.log(`  ${u.email}`);
      console.log(`      ${nome} · ${t} · ${flag}`);
    }
  }

  console.log('\nEstado atual das 3 reuniões:\n');
  for (const m of MEETINGS) {
    const info = await getMeeting(m.id);
    if (!info) { console.log(`  ${m.label} (${m.id}) — falha ao consultar`); continue; }
    const alt = info.settings?.alternative_hosts || '';
    console.log(`  ${m.label} (${m.id})`);
    console.log(`      host: ${info.host_email || '?'}`);
    console.log(`      alternative_hosts: ${alt || '(nenhum)'}`);
    console.log(`      join_before_host: ${info.settings?.join_before_host}`);
  }
  console.log('');
}

async function cmdSet(emails) {
  const users = await listUsers();

  // Valida ANTES de gravar: um e-mail inválido faria o PATCH falhar no meio,
  // deixando parte das reuniões alterada e parte não.
  const problems = [];
  if (users) {
    const byEmail = new Map(users.map((u) => [String(u.email).toLowerCase(), u]));
    for (const e of emails) {
      const u = byEmail.get(e.toLowerCase());
      if (!u) problems.push(`${e} — não é usuário ativo desta conta Zoom`);
      else if (u.type !== 2) problems.push(`${e} — é ${USER_TYPE[u.type] || u.type}, precisa ser Licensed`);
    }
  } else {
    console.warn('  Seguindo sem validação prévia; quem valida é o Zoom no PATCH.\n');
  }
  if (problems.length) {
    console.error('\nNão vou gravar. Problemas:\n');
    for (const p of problems) console.error(`  ✗ ${p}`);
    console.error('\nRode --list para ver os e-mails válidos.');
    console.error('Se a pessoa não tem licença, as opções são dar uma licença a ela ou');
    console.error('transferir a reunião (schedule_for) — decisão de quem administra a conta.\n');
    process.exit(1);
  }

  const value = emails.join(',');
  console.log(`\nHost(s) alternativo(s): ${value}\n`);

  for (const m of MEETINGS) {
    if (DRY) { console.log(`  [dry-run] PATCH ${m.id} (${m.label})`); continue; }
    // Sem occurrence_id de propósito: aplica à SÉRIE inteira.
    const r = await zoom(`/meetings/${encodeURIComponent(m.id)}`, {
      method: 'PATCH',
      body: JSON.stringify({
        settings: {
          alternative_hosts: value,
          // Manda para o host alternativo o e-mail com o link de INÍCIO da reunião.
          alternative_hosts_email_notification: true,
        },
      }),
    });
    if (!r.ok) {
      console.error(`  ✗ ${m.label} (${m.id}) — HTTP ${r.status}: ${(r.text || '').slice(0, 200)}`);
      continue;
    }
    const info = await getMeeting(m.id);
    const got = info?.settings?.alternative_hosts || '(vazio)';
    console.log(`  ✓ ${m.label} (${m.id}) → ${got}`);
  }
  console.log('');
}

if (argv.includes('--list') || !emailArg) {
  if (!emailArg && !argv.includes('--list')) {
    console.log('\nUso: --list  |  --email a@x.com[,b@x.com] [--dry-run]\n');
  }
  await cmdList();
} else {
  await cmdSet(emailArg.split(',').map((s) => s.trim()).filter(Boolean));
}
