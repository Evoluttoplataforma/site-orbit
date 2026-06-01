/**
 * generate-og-agents.mjs
 * Gera OG images (1200×630) para os 17 endpoints novos:
 *   - 1 pillar  /agentes-de-ia    → public/og/agentes-de-ia.jpg
 *   - 12 agentes /agentes/<slug>  → public/og/agente-<slug>.jpg
 *   - 4 módulos /modulos/<slug>   → public/og/modulo-<slug>.jpg
 *
 * Usa puppeteer + template HTML estático com a identidade visual da Orbit.
 * Roda no prebuild via npm script — só executa se o JPG ainda não existir
 * (ou se OG_REGENERATE=1).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'og');

const FORCE = process.env.OG_REGENERATE === '1';

const AGENTS = [
  { slug: 'estrategico', name: 'Agente Estratégico', subtitle: 'Planejamento e execução estratégica operados por IA', icon: 'M12 2L2 7v10l10 5 10-5V7L12 2z M12 12L2 7m10 5l10-5m-10 5v10' },
  { slug: 'processos', name: 'Agente de Processos', subtitle: 'BPMN, instruções de trabalho e execução operados por IA' },
  { slug: 'pessoas', name: 'Agente de Pessoas', subtitle: 'RH estratégico, PDI e organograma operados por IA' },
  { slug: 'indicadores', name: 'Agente de Indicadores', subtitle: 'KPIs e dashboards em tempo real operados por IA' },
  { slug: 'riscos', name: 'Agente de Riscos', subtitle: 'Governança de risco operacional, regulatório e estratégico por IA' },
  { slug: 'treinamento', name: 'Agente de Treinamento', subtitle: 'Capacitação aplicada operada por IA — do conteúdo à aplicação' },
  { slug: 'oportunidades', name: 'Agente de Oportunidades', subtitle: 'Descoberta e priorização de oportunidades por IA' },
  { slug: 'documentos', name: 'Agente de Documentos', subtitle: 'Governança documental e busca semântica operadas por IA' },
  { slug: 'comercial', name: 'Agente Comercial', subtitle: 'CRM e pipeline de vendas B2B operados por IA' },
  { slug: 'problemas-operacionais', name: 'Agente de Problemas', subtitle: 'Análise de causa raiz operada por IA com 5 Porquês e Ishikawa' },
  { slug: 'reunioes', name: 'Agente de Reuniões', subtitle: 'Pauta, ata e ações operadas por IA com extração automática' },
  { slug: 'pesquisas', name: 'Agente de Pesquisas', subtitle: 'Clima, NPS e engajamento operados por IA' },
];

const MODULES = [
  { slug: 'financeiro', name: 'Módulo Financeiro', subtitle: 'Contas, fluxo de caixa e DRE em tempo real' },
  { slug: 'recrutamento-selecao', name: 'Módulo R&S', subtitle: 'Recrutamento e seleção com triagem de CV por IA' },
  { slug: 'projetos', name: 'Módulo Projetos', subtitle: 'Gantt, dependências e execução por IA' },
  { slug: 'compras', name: 'Módulo Compras', subtitle: 'Pedidos, RFQ e fornecedores integrados' },
];

const PILLAR = {
  slug: 'agentes-de-ia',
  name: 'Time Olívia',
  subtitle: '12 agentes de IA que operam a sua gestão 24/7',
  pill: 'Plataforma Orbit',
};

function buildHTML({ pill, title, subtitle, isPillar }) {
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; font-family:'Plus Jakarta Sans',system-ui,sans-serif; background:#0D1117; color:#fff; position:relative; overflow:hidden; }
  .bg-glow-1 { position:absolute; top:-200px; right:-100px; width:600px; height:600px; background:radial-gradient(circle, rgba(255,186,26,0.18) 0%, transparent 70%); }
  .bg-glow-2 { position:absolute; bottom:-200px; left:-100px; width:500px; height:500px; background:radial-gradient(circle, rgba(255,186,26,0.10) 0%, transparent 70%); }
  .container { position:relative; padding:80px 90px; height:100%; display:flex; flex-direction:column; justify-content:space-between; z-index:1; }
  .header { display:flex; align-items:center; gap:18px; }
  .logo { font-size:42px; font-weight:800; letter-spacing:-0.02em; }
  .logo b { color:#ffba1a; }
  .logo-dot { width:18px; height:18px; background:#ffba1a; border-radius:50%; }
  .pill { display:inline-block; padding:8px 18px; background:rgba(255,186,26,0.12); border:1px solid rgba(255,186,26,0.40); border-radius:50px; color:#ffba1a; font-size:14px; font-weight:700; letter-spacing:0.4px; text-transform:uppercase; margin-bottom:24px; max-width:fit-content; }
  .title { font-size:${isPillar ? '76px' : '60px'}; font-weight:800; line-height:1.05; letter-spacing:-0.02em; margin-bottom:24px; max-width:1020px; }
  .title b { color:#ffba1a; }
  .subtitle { font-size:24px; line-height:1.45; color:#C9D1D9; max-width:920px; font-weight:500; }
  .footer { display:flex; align-items:center; justify-content:space-between; }
  .credentials { display:flex; gap:32px; color:#8B949E; font-size:15px; font-weight:600; }
  .credentials span b { color:#fff; font-weight:800; }
  .badge-corner { background:linear-gradient(135deg,#ffba1a,#ffca4a); color:#0D1117; padding:14px 22px; border-radius:12px; font-weight:800; font-size:15px; letter-spacing:0.3px; box-shadow:0 12px 30px rgba(255,186,26,0.35); }
</style></head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="container">
    <div class="header">
      <div class="logo-dot"></div>
      <div class="logo">orb<b>it</b></div>
    </div>
    <div class="body">
      <div class="pill">${pill}</div>
      <h1 class="title">${title}</h1>
      <p class="subtitle">${subtitle}</p>
    </div>
    <div class="footer">
      <div class="credentials">
        <span><b>30 anos</b> · metodologia GSN</span>
        <span><b>8.000+</b> · empresas atendidas</span>
        <span><b>12 agentes</b> · operando 24/7</span>
      </div>
      <div class="badge-corner">orbitgestao.com.br</div>
    </div>
  </div>
</body></html>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const ALL = [
    { slug: PILLAR.slug, html: buildHTML({ pill: PILLAR.pill, title: `Time Olívia: <b>12 agentes de IA</b>`, subtitle: PILLAR.subtitle, isPillar: true }), outName: 'agentes-de-ia' },
    ...AGENTS.map(a => ({ slug: a.slug, html: buildHTML({ pill: 'Time Olívia · Agente', title: a.name, subtitle: a.subtitle }), outName: `agente-${a.slug}` })),
    ...MODULES.map(m => ({ slug: m.slug, html: buildHTML({ pill: 'Plataforma Orbit · Módulo', title: m.name, subtitle: m.subtitle }), outName: `modulo-${m.slug}` })),
  ];

  // Pula tudo se todos já existem e FORCE=0
  const missing = ALL.filter(p => !fs.existsSync(path.join(OUT_DIR, `${p.outName}.jpg`)));
  if (missing.length === 0 && !FORCE) {
    console.log(`✅ OG images já existem em public/og/ (${ALL.length} arquivos) — pulando.`);
    console.log(`   Pra regerar, rode: OG_REGENERATE=1 node scripts/generate-og-agents.mjs`);
    return;
  }
  const toGenerate = FORCE ? ALL : missing;

  console.log(`🎨 Gerando ${toGenerate.length} OG images (1200×630)...`);
  const puppeteer = (await import('puppeteer')).default;
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  for (const p of toGenerate) {
    await page.setContent(p.html, { waitUntil: 'domcontentloaded' });
    // Espera fonte carregar (se conseguir)
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await new Promise(r => setTimeout(r, 400));
    const outPath = path.join(OUT_DIR, `${p.outName}.jpg`);
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 88, clip: { x: 0, y: 0, width: 1200, height: 630 } });
    console.log(`  ✓ ${p.outName}.jpg`);
  }
  await browser.close();
  console.log(`\n✅ ${toGenerate.length} OG images geradas em public/og/`);
}

main().catch(err => {
  console.error('❌ Erro:', err.message);
  process.exit(0); // não quebrar o build se puppeteer faltar
});
