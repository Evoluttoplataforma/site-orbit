/**
 * Fonte única das páginas estáticas do sitemap.
 *
 * Antes esta lista existia duplicada em fetch-articles.mjs e fetch-stories.mjs, com
 * conteúdo divergente. Como os dois escrevem o MESMO public/sitemap.xml e fetch-stories
 * roda depois no prebuild, a lista dele sobrescrevia a outra — e o sitemap publicado
 * perdia /treinamentos, /bootcamp-orbit, /glossario, /termos-de-servico e as 13 páginas
 * de cluster, ao mesmo tempo que listava /preco e /parcerias, que são redirect 301
 * (ver public/_redirects) e o Search Console reporta como erro.
 *
 * Ao adicionar uma página nova ao site, adicione aqui — e somente aqui.
 * Rotas noindex (/live/igor, /live/rd, /programa, /design-system, /bootcamp-orbit/recrutas,
 * /treinamentos/obrigado e as demais páginas de obrigado) ficam de fora de propósito.
 */

// [caminho, priority, changefreq]
export const SITEMAP_PAGES = [
  ['/', '1.0', 'weekly'],
  ['/empresarios', '1.0', 'weekly'],
  ['/consultores', '1.0', 'weekly'],
  ['/sobre', '0.8', 'monthly'],
  ['/faq', '0.7', 'monthly'],
  ['/blog', '0.9', 'weekly'],
  ['/glossario', '0.7', 'monthly'],
  ['/historias', '0.7', 'weekly'],
  ['/historias/enviar', '0.5', 'monthly'],
  ['/seguranca-ia', '0.6', 'monthly'],
  ['/live', '0.8', 'weekly'],
  ['/treinamentos', '0.8', 'weekly'],
  ['/bootcamp-orbit', '0.9', 'weekly'],
  ['/politica-privacidade', '0.3', 'yearly'],
  ['/termos-de-servico', '0.3', 'yearly'],
  // ─── Plataforma: pillar + 12 agentes + 4 módulos ───
  ['/agentes-de-ia', '0.95', 'weekly'],
  ['/agentes/estrategico', '0.9', 'monthly'],
  ['/agentes/processos', '0.9', 'monthly'],
  ['/agentes/pessoas', '0.9', 'monthly'],
  ['/agentes/indicadores', '0.9', 'monthly'],
  ['/agentes/riscos', '0.85', 'monthly'],
  ['/agentes/treinamento', '0.85', 'monthly'],
  ['/agentes/oportunidades', '0.85', 'monthly'],
  ['/agentes/documentos', '0.85', 'monthly'],
  ['/agentes/comercial', '0.9', 'monthly'],
  ['/agentes/problemas-operacionais', '0.85', 'monthly'],
  ['/agentes/reunioes', '0.85', 'monthly'],
  ['/agentes/pesquisas', '0.85', 'monthly'],
  ['/modulos/financeiro', '0.9', 'monthly'],
  ['/modulos/recrutamento-selecao', '0.85', 'monthly'],
  ['/modulos/projetos', '0.85', 'monthly'],
  ['/modulos/compras', '0.85', 'monthly'],
];

// 13 hub pages por cluster (uma por dor do playbook) — rota /blog/cluster/[slug]
export const CLUSTER_SLUGS = [
  'processos-manuais', 'processos-bpmn', 'estrategia-execucao', 'comunicacao-entre-setores',
  'sistemas-integracao', 'rh-talentos', 'indicadores', 'vendas-crm',
  'gestao-pessoas-capacitacao', 'consultoria-accountability', 'documentacao',
  'operacao-escalavel', 'financeiro-integrado',
];

/** Monta um bloco <url> do sitemap. */
export function sitemapUrl(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>https://orbitgestao.com.br${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}
