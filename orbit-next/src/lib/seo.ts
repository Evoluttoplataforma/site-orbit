export const SITE_ORIGIN = 'https://orbitgestao.com.br';

/** @id das entidades ancoradas no JSON-LD do layout raiz (src/app/layout.tsx). */
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

/**
 * Canonical de artigo do blog.
 *
 * O campo seo_canonical vem do CMS e historicamente foi gravado errado: 45 dos 63
 * artigos tinham valor relativo (so o slug), que resolvia contra metadataBase e
 * perdia o /blog/, apontando para URLs 301/404; e um apontava para um dominio
 * placeholder. Isso contradizia o sitemap.xml e fazia o Google descartar o
 * canonical declarado.
 *
 * Aqui so confiamos em seo_canonical se for URL absoluta, no dominio oficial e
 * sob /blog/. Qualquer outro valor cai no canonical derivado do slug — que é
 * exatamente o que o sitemap.xml declara.
 */
export function articleCanonical(
  slug: string,
  seoCanonical?: string | null,
  knownSlugs?: ReadonlySet<string>,
): string {
  const fallback = `${SITE_ORIGIN}/blog/${slug}`;
  const raw = (seoCanonical ?? '').trim();
  if (!raw) return fallback;

  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return fallback; // relativo
  }
  if (u.origin !== SITE_ORIGIN) return fallback; // outro dominio

  const path = u.pathname.replace(/\/+$/, ''); // normaliza barra final
  if (!path.startsWith('/blog/')) return fallback; // fora do blog

  const target = path.slice('/blog/'.length);
  if (!target) return fallback;

  // Apontar para OUTRO artigo so vale se ele existir de fato no build. Havia um
  // caso apontando para /blog/orbit-compras-financeiro, que e 404 — canonical
  // para URL inexistente faz o Google desindexar a pagina.
  if (target !== slug && !knownSlugs?.has(target)) return fallback;

  return `${SITE_ORIGIN}${path}`;
}
