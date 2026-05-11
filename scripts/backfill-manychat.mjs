/**
 * Backfill one-shot: envia todos os leads existentes (live-chris + live-semanal)
 * pro ManyChat via Edge Function subscribe-manychat-live.
 * Roda em batches de 5 concorrentes pra respeitar rate limit.
 */

const SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SB_KEY_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';
const SB_KEY_SVC = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ1NjAwNiwiZXhwIjoyMDkwMDMyMDA2fQ.LTZYTuBXAf7cFJrGbo9J_F80VzA_8kbcHiwsTZXRM5Q';

const SOURCES = ['live-chris', 'live-semanal'];
const BATCH_SIZE = 5;

async function fetchLeads() {
  const sources = SOURCES.map(s => `"${s}"`).join(',');
  const url = `${SB_URL}/rest/v1/live_orbit_leads?source=in.(${sources})&select=id,nome,email,telefone,source,chosen_date&order=created_at.asc`;
  const resp = await fetch(url, {
    headers: { apikey: SB_KEY_SVC, Authorization: `Bearer ${SB_KEY_SVC}` },
  });
  if (!resp.ok) throw new Error(`fetch leads: ${resp.status} ${await resp.text()}`);
  return resp.json();
}

async function sendOne(lead) {
  const resp = await fetch(`${SB_URL}/functions/v1/subscribe-manychat-live`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SB_KEY_ANON}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      source: lead.source,
      chosen_date: lead.chosen_date,
    }),
  });
  const data = await resp.json().catch(() => null);
  return { status: resp.status, data, lead };
}

function summarize(results) {
  const ok = results.filter(r => r.status === 200 && r.data?.success).length;
  const failed = results.filter(r => !(r.status === 200 && r.data?.success));
  return { ok, failed };
}

async function main() {
  console.log('📥 Buscando leads...');
  const leads = await fetchLeads();
  console.log(`✅ ${leads.length} leads encontrados\n`);

  const bySource = leads.reduce((acc, l) => {
    acc[l.source] = (acc[l.source] || 0) + 1;
    return acc;
  }, {});
  for (const [src, n] of Object.entries(bySource)) {
    console.log(`   ${src}: ${n}`);
  }
  console.log('');

  const results = [];
  for (let i = 0; i < leads.length; i += BATCH_SIZE) {
    const batch = leads.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(sendOne));
    results.push(...batchResults);
    const progress = `${i + batch.length}/${leads.length}`;
    const { ok } = summarize(results);
    process.stdout.write(`\r⚙️  ${progress}  (sucesso: ${ok})`);
  }
  console.log('\n');

  const { ok, failed } = summarize(results);
  console.log(`✅ Sucesso: ${ok}`);
  console.log(`❌ Falhas:  ${failed.length}`);

  if (failed.length) {
    console.log('\nPrimeiras 10 falhas:');
    for (const f of failed.slice(0, 10)) {
      const reason = f.data?.error || f.data?.step || f.status;
      console.log(`   [${f.lead.id}] ${f.lead.nome} | ${f.lead.telefone} | ${f.lead.source} → ${JSON.stringify(reason)}`);
    }
  }
}

main().catch(e => {
  console.error('❌', e);
  process.exit(1);
});
