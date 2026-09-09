#!/usr/bin/env node
/**
 * Cria a reunião recorrente da Masterclass Chris (quinta 18h).
 * Mesmo molde de zoom-setup-meetings.mjs — registro obrigatório, 1h, BRT.
 *
 *   node scripts/zoom-create-masterclass.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const TZ = 'America/Sao_Paulo';
const SESSION = {
  slug: 'qui-18-masterclass',
  topic: 'Masterclass Consultores — Christian Hart',
  agenda:
    'Live semanal para consultores. Toda quinta às 18h, com Christian Hart (Diretor de Canais — Grupo GSN).',
  weekdayJs: 4,
  hour: 18,
  minute: 0,
};

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
  console.error(`Faltando em .env.local: ${missing.join(', ')}`);
  process.exit(1);
}

const FMT = new Intl.DateTimeFormat('en-US', {
  timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
});
function brtParts(at) {
  const p = {};
  for (const x of FMT.formatToParts(at)) if (x.type !== 'literal') p[x.type] = x.value;
  return { y: +p.year, m: +p.month, d: +p.day, hh: +p.hour, mm: +p.minute, dateStr: `${p.year}-${p.month}-${p.day}` };
}
function nextDateForWeekday(weekdayJs, hour, minute) {
  const now = brtParts(new Date());
  for (let i = 0; i < 8; i++) {
    const probe = new Date(Date.UTC(now.y, now.m - 1, now.d + i, 12, 0, 0));
    const pb = brtParts(probe);
    const dow = new Date(Date.UTC(pb.y, pb.m - 1, pb.d)).getUTCDay();
    if (dow !== weekdayJs) continue;
    if (i === 0 && (now.hh * 60 + now.mm) >= hour * 60 + minute) continue;
    return pb.dateStr;
  }
  throw new Error('não achei a próxima data');
}

async function getToken() {
  const basic = Buffer.from(`${env.ZOOM_CLIENT_ID}:${env.ZOOM_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(env.ZOOM_ACCOUNT_ID)}`,
    { method: 'POST', headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  const body = await res.text();
  if (!res.ok) {
    console.error(`OAuth falhou (HTTP ${res.status}): ${body.slice(0, 200)}`);
    process.exit(1);
  }
  return JSON.parse(body).access_token;
}

const token = await getToken();
console.log('OAuth OK.');

const firstDate = nextDateForWeekday(SESSION.weekdayJs, SESSION.hour, SESSION.minute);
const pad = (n) => String(n).padStart(2, '0');
const payload = {
  topic: SESSION.topic,
  agenda: SESSION.agenda,
  type: 8,
  start_time: `${firstDate}T${pad(SESSION.hour)}:${pad(SESSION.minute)}:00`,
  timezone: TZ,
  duration: 60,
  recurrence: {
    type: 2,
    repeat_interval: 1,
    weekly_days: String(SESSION.weekdayJs + 1),
    end_times: 50,
  },
  settings: {
    approval_type: 0,
    registration_type: 1,
    registrants_confirmation_email: true,
    registrants_email_notification: true,
    join_before_host: false,
    waiting_room: false,
    host_video: true,
    participant_video: false,
    mute_upon_entry: true,
    audio: 'both',
    auto_recording: 'none',
  },
};

const res = await fetch('https://api.zoom.us/v2/users/me/meetings', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
const text = await res.text();
if (!res.ok) {
  console.error(`Falha ao criar reunião (HTTP ${res.status}): ${text.slice(0, 400)}`);
  process.exit(1);
}
const j = JSON.parse(text);
const occ = j.occurrences || [];
const created = {
  slug: SESSION.slug,
  id: String(j.id),
  join_url: j.join_url,
  topic: j.topic,
  first: occ[0]?.start_time || payload.start_time,
  last: occ[occ.length - 1]?.start_time || null,
  count: occ.length,
};
console.log(`Criada: ${created.topic}`);
console.log(`  meeting_id : ${created.id}`);
console.log(`  join_url   : ${created.join_url}`);
console.log(`  ocorrências: ${created.count}  (1ª ${created.first} · última ${created.last})`);
fs.writeFileSync(path.join(ROOT, 'scripts', '.zoom-masterclass.json'), JSON.stringify(created, null, 2));
console.log('IDs salvos em scripts/.zoom-masterclass.json');
