#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.trimStart().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);
const token = env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error('SUPABASE_ACCESS_TOKEN ausente em .env.local');
  process.exit(1);
}
const sql = fs.readFileSync(
  path.join(ROOT, 'supabase/migrations/20260823_masterclass_session.sql'),
  'utf8'
);
const res = await fetch(
  'https://api.supabase.com/v1/projects/yfpdrckyuxltvznqfqgh/database/query',
  {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  }
);
const text = await res.text();
if (!res.ok) {
  console.error('SQL falhou', res.status, text.slice(0, 400));
  process.exit(1);
}
console.log('training_sessions: qui-18-masterclass gravada.');
