/**
 * Reverso do link-articles-to-agentes.mjs.
 * Remove TODOS os blocos <aside data-agent-link="...">...</aside> inseridos
 * antes (os 33 artigos linkando pras páginas /agentes/* que foram removidas).
 *
 * Para evitar flood no Cloudflare Pages deploy hook, faz UMA chamada UPDATE
 * com PostgreSQL regex via PostgREST (todas as rows num único request quando
 * possível — quando não, batch pequeno).
 *
 * Uso: node supabase/scripts/unlink-articles-from-agentes.mjs
 */

const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SUPABASE_KEY = (
  process.env.SUPABASE_SERVICE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ1NjAwNiwiZXhwIjoyMDkwMDMyMDA2fQ.LTZYTuBXAf7cFJrGbo9J_F80VzA_8kbcHiwsTZXRM5Q'
).replace(/\s+/g, '');

// Regex: pega o <aside ...data-agent-link...>...</aside> inteiro, incluindo
// o \n que costuma vir logo após (pra não deixar linha em branco órfã).
const ASIDE_RE = /\n?<aside[^>]*data-agent-link[\s\S]*?<\/aside>\n?/g;

async function fetchDirty() {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_articles?select=id,slug,content&content=like.*data-agent-link*`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!r.ok) throw new Error(`Fetch falhou: ${r.status} ${await r.text()}`);
  return r.json();
}

async function disableTriggers() {
  // Tenta via RPC silent existente. Se não existir, desabilita via PATCH numa
  // session config (não rola via PostgREST) — então vamos só pedir cuidado:
  // o webhook vai disparar mas o user já avisou pra evitar isso.
  // Plano B: usar a função silent_bulk_update_blog_articles se existir.
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/silent_bulk_update_blog_articles`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updates: [] }),
  });
  return r.ok || r.status === 400; // 400 = função existe mas payload vazio
}

async function bulkSilentUpdate(updates) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/silent_bulk_update_blog_articles`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updates }),
  });
  if (!r.ok) throw new Error(`Silent RPC falhou: ${r.status} ${await r.text()}`);
  return r.json();
}

async function patchOne(id, content) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json', Prefer: 'return=minimal',
    },
    body: JSON.stringify({ content }),
  });
  if (!r.ok) throw new Error(`PATCH ${id} falhou: ${r.status}`);
}

(async () => {
  console.log('Buscando artigos sujos...');
  const arts = await fetchDirty();
  console.log(`Encontrados: ${arts.length}`);
  if (arts.length === 0) { console.log('Nada a fazer.'); return; }

  const updates = arts.map((a) => {
    const cleaned = (a.content || '').replace(ASIDE_RE, '');
    const removed = a.content.length - cleaned.length;
    return { id: a.id, slug: a.slug, content: cleaned, removed };
  });

  updates.forEach((u) => console.log(`  - ${u.slug}: -${u.removed} bytes`));

  // Tenta silent RPC primeiro; se a RPC ainda não existir, cai pra PATCH
  // individual (33 chamadas — Cloudflare vai sofrer mas o user já validou
  // que quer remover urgentemente).
  console.log('\nTentando silent RPC...');
  const hasSilent = await disableTriggers();

  if (hasSilent) {
    console.log('RPC silent disponível — chamada única.');
    await bulkSilentUpdate(updates.map((u) => ({ id: u.id, content: u.content })));
    console.log(`✅ ${updates.length} artigos atualizados silenciosamente.`);
  } else {
    console.log('Silent RPC não existe. Fallback: PATCH individual (vai trigar webhook).');
    let n = 0;
    for (const u of updates) {
      await patchOne(u.id, u.content);
      n++;
      process.stdout.write(`\r  ${n}/${updates.length}`);
    }
    console.log(`\n✅ ${n} artigos atualizados.`);
  }
})().catch((e) => { console.error(e); process.exit(1); });
