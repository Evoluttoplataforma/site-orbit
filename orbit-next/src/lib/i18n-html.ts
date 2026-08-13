/** Dual PT/EN markup. CSS in orbit.css shows one side based on html[lang]. */
export function i18nText(pt: string, en?: string | null): string {
  if (!en) return pt;
  return `<span class="i18n-pt">${pt}</span><span class="i18n-en">${en}</span>`;
}

export function i18nEl(tag: string, pt: string, en?: string | null, attrs = ''): string {
  const extra = attrs ? (attrs.startsWith(' ') ? attrs : ` ${attrs}`) : '';
  if (!en) return `<${tag}${extra}>${pt}</${tag}>`;
  return `<${tag} class="i18n-pt"${extra}>${pt}</${tag}><${tag} class="i18n-en"${extra}>${en}</${tag}>`;
}
