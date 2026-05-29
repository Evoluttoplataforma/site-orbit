/**
 * Publica 3 artigos novos no blog Supabase (2026-05-29):
 *   - IA agentic para CEO/diretoria
 *   - AI Operating System for Business
 *   - Orbit vs SAP/Salesforce/Microsoft
 *
 * - Lê os .md de ../../ideias de artigos pci/
 * - Converte markdown → HTML com marked
 * - Faz link-build interno (inline contextual + cross-link entre os 3)
 * - Mapeia frontmatter → schema blog_articles (categoria/autor válidos)
 * - Upsert via service_role REST (idempotente por slug)
 *
 * Uso: node supabase/scripts/publish-3-articles-2026-05-29.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "../../orbit-next/node_modules/marked/lib/marked.esm.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../");
const SRC_DIR = path.join(REPO, "ideias de artigos pci");

const SUPABASE_URL = "https://yfpdrckyuxltvznqfqgh.supabase.co";
const SUPABASE_KEY = (
  process.env.SUPABASE_SERVICE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ1NjAwNiwiZXhwIjoyMDkwMDMyMDA2fQ.LTZYTuBXAf7cFJrGbo9J_F80VzA_8kbcHiwsTZXRM5Q"
).replace(/\s+/g, "");

// ═══ Os 3 artigos novos com mapeamento p/ schema do banco ═══
const ARTICLES = [
  {
    file: "ia-agentic-para-ceo-decisao-estrategica.md",
    slug: "ia-agentic-para-ceo-decisao-estrategica",
    category: "ia",
    seo_keyword: "ia agentic para ceo",
  },
  {
    file: "ai-operating-system-business.md",
    slug: "ai-operating-system-business",
    category: "ia",
    seo_keyword: "ai operating system for business",
  },
  {
    file: "orbit-vs-sap-salesforce-microsoft.md",
    slug: "orbit-vs-sap-salesforce-microsoft",
    category: "ia",
    seo_keyword: "orbit vs sap salesforce microsoft",
  },
];

// ═══ Link-build: anchor text → slug (1ª ocorrência por artigo) ═══
// Inclui cross-link entre os 3 novos (cluster) + links pra artigos reais já no banco.
const LINK_MAP = [
  // cross-link entre os 3 novos
  { re: /\bIA agentic para CEO\b/i,                     slug: "ia-agentic-para-ceo-decisao-estrategica" },
  { re: /\bAI Operating System for Business\b/i,        slug: "ai-operating-system-business" },
  { re: /\bAI Operating System\b/i,                     slug: "ai-operating-system-business" },
  { re: /\bOrbit vs SAP\b/i,                            slug: "orbit-vs-sap-salesforce-microsoft" },
  // artigos existentes no banco (verificados)
  { re: /\bIA agentic\b/i,                              slug: "plataforma-gestao-ia-agentic-alternativa-consultoria" },
  { re: /\balternativa[s]? à consultoria\b/i,           slug: "plataforma-gestao-ia-agentic-alternativa-consultoria" },
  { re: /\bconsultoria empresarial\b/i,                 slug: "consultoria-empresarial-nao-resolve" },
  { re: /\bERP\b/,                                       slug: "erp-vs-plataforma-all-in-one" },
  { re: /\bautomatizar processos\b/i,                   slug: "como-automatizar-processos-empresa" },
  { re: /\bprocessos manuais\b/i,                       slug: "processos-manuais-empresa" },
  { re: /\borganizar (os )?processos\b/i,               slug: "como-organizar-processos-empresa-cresceu-rapido" },
  { re: /\bplataforma de gestão escalável\b/i,          slug: "plataforma-gestao-escalavel" },
  { re: /\bgestão com IA\b/i,                           slug: "gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas" },
  { re: /\bplano de ação\b/i,                           slug: "plano-de-acao-executavel" },
  { re: /\bplanejamento estratégico\b/i,                slug: "tirar-planejamento-estrategico-do-papel" },
  { re: /\bindicadores\b/i,                             slug: "como-criar-indicadores-empresa" },
];

// ═══ Parse frontmatter YAML simples ═══
function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*?)\s*$/);
    if (!kv) continue;
    let v = kv[2];
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    fm[kv[1]] = v;
  }
  return { fm, body: m[2] };
}

// ═══ Injeta links internos no HTML (1ª ocorrência por phrase, fora de tags <a>) ═══
function injectInternalLinks(html, currentSlug) {
  let out = html;
  for (const { re, slug } of LINK_MAP) {
    if (slug === currentSlug) continue; // não auto-linkar
    const flags = re.flags.includes("g") ? re.flags : re.flags + "";
    const r = new RegExp(re.source, flags);
    let replaced = false;
    out = out.replace(r, (match, ...args) => {
      if (replaced) return match;
      const offset = typeof args[args.length - 2] === "number" ? args[args.length - 2] : args[args.length - 1];
      const before = out.slice(Math.max(0, offset - 200), offset);
      const after = out.slice(offset, offset + 300);
      // pula se já estiver dentro de um <a ...> aberto, dentro de heading, ou em link
      const openA = (before.match(/<a\s/g) || []).length;
      const closeA = (before.match(/<\/a>/g) || []).length;
      if (openA > closeA) return match;
      if (/<h[1-6][^>]*>$/.test(before)) return match;
      if (/^<\/a>/.test(after)) return match;
      replaced = true;
      return `<a href="/blog/${slug}">${match}</a>`;
    });
  }
  return out;
}

// ═══ Adiciona bloco "Leituras relacionadas" no final do content ═══
function appendRelatedBlock(html, currentSlug) {
  const related = [
    { slug: "plataforma-gestao-ia-agentic-alternativa-consultoria", title: "Plataforma de gestão com IA agentic: alternativa à consultoria" },
    { slug: "gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas", title: "Gestão com IA no Orbit: como muda a administração de PMEs" },
    { slug: "erp-vs-plataforma-all-in-one", title: "ERP vs plataforma all-in-one: como escolher em 2026" },
    { slug: "ia-agentic-para-ceo-decisao-estrategica", title: "IA agentic para CEO: apoio à decisão estratégica" },
    { slug: "ai-operating-system-business", title: "AI Operating System for Business: a próxima geração" },
    { slug: "orbit-vs-sap-salesforce-microsoft", title: "Orbit vs SAP, Salesforce, Microsoft Dynamics" },
  ].filter((r) => r.slug !== currentSlug).slice(0, 4);

  const items = related.map((r) => `<li><a href="/blog/${r.slug}">${r.title}</a></li>`).join("");
  return `${html}\n<h2>Leituras relacionadas</h2>\n<ul>${items}</ul>`;
}

// ═══ Converte um arquivo MD em registro pro banco ═══
function buildArticleRecord({ file, slug, category, seo_keyword }) {
  const raw = fs.readFileSync(path.join(SRC_DIR, file), "utf-8");
  const { fm, body } = parseFrontmatter(raw);

  marked.setOptions({ headerIds: false, mangle: false });
  let html = marked.parse(body);
  html = injectInternalLinks(html, slug);
  html = appendRelatedBlock(html, slug);

  const today = new Date().toISOString();
  return {
    title: fm.title,
    slug,
    category,
    author: "Rodrigo Souza",
    author_avatar: "/images/blog/avatar-rodrigo.webp",
    published: true,
    published_at: (fm.published_at ? new Date(fm.published_at).toISOString() : today),
    updated_at: today,
    excerpt: fm.meta_description || "",
    content: html,
    cover_url: `/images/blog/cover-${slug}.svg`,
    seo_title: fm.meta_title || fm.title,
    seo_canonical: slug,
    seo_keyword,
  };
}

// ═══ Upsert via service_role REST (idempotente por slug) ═══
async function upsertArticle(rec) {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles?on_conflict=slug`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(rec),
  });
  const ok = resp.ok;
  const json = await resp.json().catch(() => ({}));
  return { ok, status: resp.status, json };
}

// ═══ Main ═══
const results = [];
for (const meta of ARTICLES) {
  process.stdout.write(`▶ ${meta.slug} … `);
  try {
    const rec = buildArticleRecord(meta);
    const r = await upsertArticle(rec);
    results.push({ slug: meta.slug, ok: r.ok, status: r.status, html_size: rec.content.length });
    console.log(r.ok ? `OK (HTTP ${r.status}, ${rec.content.length} chars)` : `FALHOU (HTTP ${r.status}) ${JSON.stringify(r.json).slice(0, 200)}`);
  } catch (err) {
    console.log(`ERRO ${err.message}`);
    results.push({ slug: meta.slug, ok: false, error: err.message });
  }
}
console.log("\n=== RESUMO ===");
console.table(results);
