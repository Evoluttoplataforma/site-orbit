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

const TARGETS = [
  {
    label: 'MKT ORBIT',
    url: 'https://yfpdrckyuxltvznqfqgh.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g',
  },
];

async function testForm({ name, path }) {
  const source = readFileSync(path, 'utf8');
  const keys = extractPayloadKeys(source);
  const payload = buildTestPayload(keys);

  for (const target of TARGETS) {
    const res = await fetch(`${target.url}/rest/v1/live_orbit_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: target.key,
        Authorization: `Bearer ${target.key}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `Form ${name} REJEITADO em ${target.label} (HTTP ${res.status}):\n  ${body}\n  Campos enviados: ${keys.join(', ')}`
      );
    }
    console.log(`  OK ${name} -> ${target.label}`);
  }
  console.log(`PASS ${name} (${keys.length} campos x ${TARGETS.length} destinos)`);
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
