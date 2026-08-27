#!/usr/bin/env node
/**
 * Cria a reunião pontual do Bootcamp Orbit (15/10 8h30, 4h).
 * Mesmo molde dos treinamentos: registro obrigatório, auto-approve, e-mail do Zoom.
 *
 *   node scripts/zoom-create-bootcamp.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const TZ = 'America/Sao_Paulo';

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

const payload = {
  topic: 'Bootcamp Orbit — Imersão Canais',
  agenda: 'Encontro híbrido para destravar a adoção do Orbit. 15 de outubro, 8h30 às 12h30. Online via esta reunião.',
  type: 2,
  start_time: '2026-10-15T08:30:00',
  timezone: TZ,
  duration: 240,
  settings: {
    approval_type: 0,
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
const publicJoin = `https://us06web.zoom.us/j/${j.id}`;
const created = {
  topic: j.topic,
  id: String(j.id),
  join_url: publicJoin,
  start: payload.start_time,
};
console.log(`Criada: ${created.topic}`);
console.log(`  meeting_id : ${created.id}`);
console.log(`  join_url   : ${created.join_url}`);
fs.writeFileSync(path.join(ROOT, 'scripts', '.zoom-bootcamp.json'), JSON.stringify(created, null, 2));
console.log('IDs salvos em scripts/.zoom-bootcamp.json');
