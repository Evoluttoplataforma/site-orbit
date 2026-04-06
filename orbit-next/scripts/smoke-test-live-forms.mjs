#!/usr/bin/env node
// Smoke test: valida que o payload dos forms /live e /live/rd
// é aceito pela tabela live_orbit_leads no Supabase.
// Detecta divergência entre código e schema (caso PGRST204).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const FILES = [
  { name: '/live', path: join(ROOT, 'src/app/live/html.ts') },
  { name: '/live/rd', path: join(ROOT, 'src/app/live/rd/html.ts') },
];

// Extrai o objeto `data = { ... };` do JS dentro do html.ts
function extractPayloadKeys(source) {
  const match = source.match(/var data = \{([\s\S]*?)\};/);
  if (!match) throw new Error('Não encontrei o objeto `var data = {...}` no arquivo');
  const body = match[1];
  // Pega só os nomes das chaves (antes do `:`)
  const keys = [...body.matchAll(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/gm)].map(m => m[1]);
  return keys;
}

function buildTestPayload(keys) {
  const stamp = Date.now();
  const defaults = {
    nome: `smoke-test-${stamp}`,
    email: `smoke-test-${stamp}@orbit.test`,
    telefone: '11999999999',
    source: 'smoke-test',
    chosen_date: '2099-12-31',
  };
  const payload = {};
  for (const k of keys) {
    payload[k] = defaults[k] !== undefined ? defaults[k] : null;
  }
  return payload;
}

const SUPABASE_URL = 'https://tnpzoklepkvktbqouctf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucHpva2xlcGt2a3RicW91Y3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MjAxNjcsImV4cCI6MjA4NzE5NjE2N30.hXrOhbIm9DnxaItT1e9g6B6d9mhAmeoLKJ2DuHlABFU';

async function testForm({ name, path }) {
  const source = readFileSync(path, 'utf8');
  const keys = extractPayloadKeys(source);
  const payload = buildTestPayload(keys);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/live_orbit_leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Form ${name} REJEITADO pelo Supabase (HTTP ${res.status}):\n  ${body}\n  Campos enviados: ${keys.join(', ')}`
    );
  }
  // Rows ficam marcados com source='smoke-test' para limpeza posterior

  console.log(`OK ${name} (${keys.length} campos validados)`);
}

let failed = false;
for (const f of FILES) {
  try {
    await testForm(f);
  } catch (err) {
    failed = true;
    console.error(`FAIL ${f.name}: ${err.message}`);
  }
}

if (failed) {
  console.error('\nSmoke test FALHOU. Algum campo do form não existe na tabela live_orbit_leads.');
  process.exit(1);
}
console.log('\nTodos os forms OK.');
