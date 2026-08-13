#!/usr/bin/env node
/**
 * Cria (ou inspeciona) as 3 reuniões recorrentes de /treinamentos no Zoom.
 *
 * Lê ZOOM_ACCOUNT_ID / ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET de .env.local.
 * Nunca imprime credenciais — só IDs de reunião e links de acesso.
 *
 *   node scripts/zoom-setup-meetings.mjs --check    # valida o token e lista o que já existe
 *   node scripts/zoom-setup-meetings.mjs --dry-run  # mostra o que criaria
 *   node scripts/zoom-setup-meetings.mjs            # cria de verdade
 *
 * Ao final imprime o UPDATE de training_sessions para gravar os IDs.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const TZ = 'America/Sao_Paulo';

// ─── grade (tem de bater com src/lib/training-sessions.ts e training_sessions) ──
const SESSIONS = [
  {
    slug: 'seg-17-tira-duvidas',
    topic: 'Tira Dúvidas Orbit — Segunda 17h',
    agenda:
      'Sessão semanal de tira dúvidas da Orbit. Sem conteúdo preparado: traga sua dúvida ou o caso que quer resolver.',
    weekdayJs: 1,
    hour: 17,
    minute: 0,
  },
  {
    slug: 'qua-10-treinamento',
    topic: 'Treinamento Orbit — Quarta 10h',
    agenda:
      'Aula semanal passo a passo de um módulo, tema ou das novidades da plataforma Orbit.',
    weekdayJs: 3,
    hour: 10,
    minute: 0,
  },
  {
    slug: 'sex-09-tira-duvidas',
    topic: 'Tira Dúvidas Orbit — Sexta 9h',
    agenda:
      'Sessão semanal de tira dúvidas da Orbit. Sem conteúdo preparado: traga sua dúvida ou o caso que quer resolver.',
    weekdayJs: 5,
    hour: 9,
    minute: 0,
  },
];

const DURATION_MIN = 60;
const END_TIMES = 50; // máximo do Zoom para recorrente com hora fixa

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
  console.error(`\nFaltando em .env.local: ${missing.join(', ')}`);
  console.error('Adicione as 3 linhas do app Server-to-Server OAuth e rode de novo.\n');
  process.exit(1);
}

// ─── datas em BRT ──────────────────────────────────────────────────────────
const FMT = new Intl.DateTimeFormat('en-US', {
  timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
});
function brtParts(at) {
  const p = {};
  for (const x of FMT.formatToParts(at)) if (x.type !== 'literal') p[x.type] = x.value;
  return { y: +p.year, m: +p.month, d: +p.day, hh: +p.hour, mm: +p.minute, dateStr: `${p.year}-${p.month}-${p.day}` };
}
/** Próxima data (local BRT) do dia da semana pedido, já considerando o horário. */
function nextDateForWeekday(weekdayJs, hour, minute) {
  const now = brtParts(new Date());
  for (let i = 0; i < 8; i++) {
    const probe = new Date(Date.UTC(now.y, now.m - 1, now.d + i, 12, 0, 0));
    const pb = brtParts(probe);
    const dow = new Date(Date.UTC(pb.y, pb.m - 1, pb.d)).getUTCDay();
    if (dow !== weekdayJs) continue;
    if (i === 0 && (now.hh * 60 + now.mm) >= hour * 60 + minute) continue; // hoje já passou
    return pb.dateStr;
  }
  throw new Error('não achei a próxima data');
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
    if (res.status === 400) console.error('Verifique o Account ID. Confira também se o app está ATIVADO no marketplace.');
    if (res.status === 401) console.error('Client ID ou Client Secret incorretos.');
    process.exit(1);
  }
  const j = JSON.parse(body);
  token = j.access_token;
  console.log('OAuth OK.');
  console.log(`  escopos do app: ${j.scope || '(não informado)'}`);
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

/**
 * Lista reuniões agendadas — usado só para não criar duplicata.
 * Exige o escopo meeting:read:list_meetings:admin, que é opcional: sem ele o
 * script segue, apenas sem essa rede de proteção.
 */
async function listExisting() {
  const r = await zoom('/users/me/meetings?type=scheduled&page_size=300');
  if (!r.ok) {
    const noScope = /does not contain scopes/i.test(r.text || '');
    if (noScope) {
      console.log('\n[aviso] Sem o escopo meeting:read:list_meetings:admin — pulando a checagem de duplicatas.');
      console.log('        Criar/inscrever funciona normalmente; só não consigo detectar reunião pré-existente.');
      return null; // null = não foi possível verificar
    }
    console.error(`\nNão consegui listar reuniões (HTTP ${r.status}): ${r.text.slice(0, 300)}`);
    process.exit(1);
  }
  return r.json?.meetings || [];
}

async function createMeeting(s) {
  const firstDate = nextDateForWeekday(s.weekdayJs, s.hour, s.minute);
  const pad = (n) => String(n).padStart(2, '0');
  const payload = {
    topic: s.topic,
    agenda: s.agenda,
    type: 8, // recorrente com hora fixa
    start_time: `${firstDate}T${pad(s.hour)}:${pad(s.minute)}:00`,
    timezone: TZ,
    duration: DURATION_MIN,
    recurrence: {
      type: 2,               // semanal
      repeat_interval: 1,
      weekly_days: String(s.weekdayJs + 1), // ⚠ Zoom usa 1=Domingo
      end_times: END_TIMES,
    },
    settings: {
      approval_type: 0,                    // automático — o join_url volta na hora
      registration_type: 1,                // inscrito participa de qualquer ocorrência
      registrants_confirmation_email: true,
      registrants_email_notification: true,
      join_before_host: false,             // só entra depois do host abrir
      waiting_room: false,
      host_video: true,
      participant_video: false,
      mute_upon_entry: true,
      audio: 'both',
      auto_recording: 'none',
    },
  };

  if (process.argv.includes('--dry-run')) {
    console.log(`\n[dry-run] criaria "${s.topic}"`);
    console.log(`  1ª ocorrência: ${firstDate} ${pad(s.hour)}:${pad(s.minute)} (${TZ})`);
    console.log(`  weekly_days=${payload.recurrence.weekly_days}  end_times=${END_TIMES}`);
    return null;
  }

  const r = await zoom('/users/me/meetings', { method: 'POST', body: JSON.stringify(payload) });
  if (!r.ok) {
    console.error(`\nFalha ao criar "${s.topic}" (HTTP ${r.status}): ${r.text.slice(0, 400)}`);
    if (r.status === 403) console.error('Sem escopo meeting:write:admin, ou o plano não permite registro em reunião.');
    return null;
  }
  const occ = r.json?.occurrences || [];
  return {
    slug: s.slug,
    id: String(r.json.id),
    join_url: r.json.join_url,
    topic: r.json.topic,
    first: occ[0]?.start_time || payload.start_time,
    last: occ[occ.length - 1]?.start_time || null,
    count: occ.length,
  };
}

// ─── main ──────────────────────────────────────────────────────────────────
const checkOnly = process.argv.includes('--check');

console.log('\n=== Zoom · setup das reuniões de /treinamentos ===\n');
await getToken();

const existing = await listExisting();
if (existing === null) {
  console.log('\n(checagem de duplicatas indisponível)');
} else {
  console.log(`\nReuniões agendadas na conta: ${existing.length}`);
}
const already = (existing || []).filter((m) => /Tira D[úu]vidas Orbit|Treinamento Orbit/i.test(m.topic || ''));
if (already.length) {
  console.log('\nJá existem reuniões com nome de treinamento:');
  for (const m of already) console.log(`  [${m.id}] ${m.topic}  (type=${m.type})`);
  if (!checkOnly && !process.argv.includes('--force')) {
    console.log('\nParando para não duplicar. Se quiser criar de novo mesmo assim, use --force.');
    console.log('Se estas são as certas, me passe os IDs e eu gravo em training_sessions.\n');
    process.exit(0);
  }
}

if (checkOnly) {
  console.log('\n--check concluído: token válido e escopos suficientes para listar.');
  console.log('Rode sem --check para criar as 3 reuniões.\n');
  process.exit(0);
}

const created = [];
for (const s of SESSIONS) {
  const r = await createMeeting(s);
  if (r) {
    created.push(r);
    console.log(`\nCriada: ${r.topic}`);
    console.log(`  meeting_id : ${r.id}`);
    console.log(`  join_url   : ${r.join_url}`);
    console.log(`  ocorrências: ${r.count}  (1ª ${r.first} · última ${r.last})`);
  }
}

if (created.length) {
  console.log('\n\n=== SQL para gravar em training_sessions ===\n');
  for (const c of created) {
    const ends = c.last ? `'${c.last}'` : 'null';
    console.log(
      `update training_sessions set zoom_meeting_id='${c.id}', zoom_join_url='${c.join_url}', recurrence_ends_at=${ends} where slug='${c.slug}';`
    );
  }
  console.log('');
  fs.writeFileSync(
    path.join(ROOT, 'scripts', '.zoom-meetings.json'),
    JSON.stringify(created, null, 2)
  );
  console.log('IDs salvos em scripts/.zoom-meetings.json\n');
}
