/**
 * Link-build reverso: artigo do blog → página do agente correspondente.
 *
 * Para cada artigo no blog_articles, se houver agente mapeado em
 * BLOG_TO_AGENTE (data/agentes.ts), insere 1 CTA inline contextual
 * APÓS o primeiro <p> do content, com anchor descritivo apontando pro
 * /agentes/{slug}. Idempotente (detecta marca 'data-agent-link') —
 * pode rodar várias vezes.
 *
 * Uso: node supabase/scripts/link-articles-to-agentes.mjs
 */

const SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SUPABASE_KEY = (
  process.env.SUPABASE_SERVICE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ1NjAwNiwiZXhwIjoyMDkwMDMyMDA2fQ.LTZYTuBXAf7cFJrGbo9J_F80VzA_8kbcHiwsTZXRM5Q'
).replace(/\s+/g, '');

// Mapeamento manual (cópia de data/agentes.ts BLOG_TO_AGENTE — script é standalone)
const BLOG_TO_AGENTE = {
  'tirar-planejamento-estrategico-do-papel':              'estrategico',
  'planejamento-estrategico-morre-terceiro-mes':          'estrategico',
  'plano-de-acao-executavel':                             'estrategico',
  'gestao-financeira-integrada-empresa':                  'financeiro',
  'vendas-boas-caixa-negativo':                           'financeiro',
  'dre-tempo-real':                                       'financeiro',
  'como-organizar-prospeccao-vendas-b2b':                 'comercial',
  'vendedor-nao-preenche-crm':                            'comercial',
  'crm-empresa-b2b-como-escolher':                        'comercial',
  'vendas-marketing-operacoes-conflito':                  'comercial',
  'como-mapear-processos-empresa-bpmn':                   'processos',
  'ninguem-segue-processo-empresa':                       'processos',
  'software-bpms-como-escolher':                          'processos',
  'como-organizar-processos-empresa-cresceu-rapido':      'processos',
  'processos-manuais-empresa':                            'processos',
  'como-automatizar-processos-empresa':                   'processos',
  'como-reter-talentos-empresa':                          'pessoas',
  'perder-talentos-para-concorrentes':                    'pessoas',
  'software-rh-como-escolher':                            'pessoas',
  'pdi-funcionarios-como-criar':                          'pessoas',
  'treinamento-corporativo-nao-funciona':                 'pessoas',
  'plataforma-treinamento-corporativo':                   'pessoas',
  'comunicacao-entre-setores-empresa':                    'reunioes',
  'plataformas-comunicacao-corporativa':                  'reunioes',
  'como-centralizar-documentacao-empresa':                'documentos',
  'encontrar-documento-empresa':                          'documentos',
  'knowledge-base-corporativo-como-escolher':             'documentos',
  'como-integrar-sistemas-empresa':                       'documentos',
  'como-criar-indicadores-empresa':                       'estrategico',
  'indicadores-nao-refletem-realidade':                   'estrategico',
  'ia-agentic-para-ceo-decisao-estrategica':              'estrategico',
  'ai-operating-system-business':                         'estrategico',
  'orbit-vs-sap-salesforce-microsoft':                    'estrategico',
};

const AGENTE_LABEL = {
  estrategico:  'Agente Estratégico',
  financeiro:   'Agente Financeiro',
  comercial:    'Agente Comercial',
  processos:    'Agente de Processos',
  pessoas:      'Agente de Pessoas',
  recrutamento: 'Agente de R&S',
  projetos:     'Agente de Projetos',
  reunioes:     'Agente de Reuniões',
  documentos:   'Agente de Documentos',
  riscos:       'Agente de Riscos',
};

function buildCTA(agente) {
  const url = `/agentes/${agente}`;
  const nome = AGENTE_LABEL[agente];
  return `<aside data-agent-link="${agente}" style="background:linear-gradient(135deg,rgba(255,186,26,0.08),rgba(255,186,26,0.02));border:1px solid rgba(255,186,26,0.3);border-left:3px solid #ffba1a;border-radius:0 12px 12px 0;padding:18px 22px;margin:28px 0;">
<p style="margin:0;color:#1A1D23;font-size:0.95rem;line-height:1.55;">🤖 <strong>Veja na prática:</strong> o <a href="${url}" style="color:#D4960A;font-weight:700;text-decoration:underline;">${nome} da Orbit</a> opera essa rotina junto com o seu time — coordenado pela Olívia.</p>
</aside>`;
}

function injectCTA(html, agente) {
  // idempotente — já tem o CTA desse agente? pula
  if (html.includes(`data-agent-link="${agente}"`)) return { html, changed: false, reason: 'já tem' };
  // remove CTAs de outros agentes (caso o mapping mude) — só remove o aside marcado
  html = html.replace(/<aside data-agent-link="[^"]+"[\s\S]*?<\/aside>\s*/g, '');
  // injeta APÓS o primeiro </p> do content
  const m = html.match(/<\/p>/i);
  if (!m) return { html, changed: false, reason: 'sem <p>' };
  const idx = m.index + m[0].length;
  const cta = buildCTA(agente);
  return { html: html.slice(0, idx) + '\n' + cta + html.slice(idx), changed: true, reason: 'injetado' };
}

// ─── fetch all + update ───
const today = new Date().toISOString();

async function fetchArticles() {
  const slugs = Object.keys(BLOG_TO_AGENTE).map((s) => `"${s}"`).join(',');
  const url = `${SUPABASE_URL}/rest/v1/blog_articles?slug=in.(${slugs})&select=id,slug,content&limit=200`;
  const resp = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
  if (!resp.ok) throw new Error(`Falha ao listar: HTTP ${resp.status}`);
  return await resp.json();
}

// SILENT BULK UPDATE — usa a RPC bulk_update_blog_articles_silent
// pra pausar o webhook do Cloudflare durante o bulk (1 UPDATE = 1 webhook
// senão; com 33 artigos viraria 33 deploys na fila do Cloudflare).
async function silentBulkUpdate(updates) {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/rpc/bulk_update_blog_articles_silent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({ updates }),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`RPC silent_bulk falhou (HTTP ${resp.status}): ${txt.slice(0, 300)}`);
  }
  return await resp.json(); // retorna nº atualizados
}

console.log('▶ Buscando artigos mapeados…');
const articles = await fetchArticles();
console.log(`  ${articles.length} achados\n`);

// 1) Processa TODOS em memória (sem tocar no banco ainda)
const updates = [];
const results = [];
for (const a of articles) {
  const agente = BLOG_TO_AGENTE[a.slug];
  if (!agente) continue;
  const { html, changed, reason } = injectCTA(a.content || '', agente);
  if (!changed) {
    results.push({ slug: a.slug, agente, status: reason });
    continue;
  }
  updates.push({ id: a.id, content: html });
  results.push({ slug: a.slug, agente, status: 'queued' });
}

// 2) Manda TUDO numa única RPC silent (0 webhooks disparados)
if (updates.length === 0) {
  console.log('Nada pra atualizar.');
} else {
  console.log(`▶ ${updates.length} artigos pra atualizar — chamando RPC silent (pausa o webhook)…`);
  try {
    const n = await silentBulkUpdate(updates);
    console.log(`✅ ${n} atualizados em modo silencioso (0 deploys disparados).`);
    for (const r of results) if (r.status === 'queued') r.status = 'OK';
  } catch (err) {
    console.error('❌ Falha na RPC silent:', err.message);
    console.error('   → Migration aplicada? Rode supabase/migrations/20260529_bulk_silent_helper.sql no SQL Editor.');
    for (const r of results) if (r.status === 'queued') r.status = 'FALHOU';
  }
}
console.log();
console.table(results);
const okCount = results.filter((r) => r.status === 'OK').length;
const skipCount = results.filter((r) => r.status === 'já tem').length;
const failCount = results.filter((r) => r.status === 'FALHOU').length;
console.log(`\n✅ ${okCount} atualizados · ${skipCount} já tinham · ${failCount} falharam`);
console.log('\nℹ️  Nenhum deploy foi disparado. Se precisa que o site reflita agora, faça um commit/push qualquer pra triggar 1 build único.');
