/** Dual PT/EN markup. CSS in orbit.css shows one side based on html[lang].
 *  Never put `i18n-pt` on content that has no `i18n-en` twin — EN would hide it. */
export function i18nText(pt: string, en?: string | null): string {
  if (!en) return pt;
  return `<span class="i18n-pt">${pt}</span><span class="i18n-en">${en}</span>`;
}

export function i18nEl(tag: string, pt: string, en?: string | null, attrs = ''): string {
  const extra = attrs.trim();
  const classMatch = extra.match(/\bclass="([^"]*)"/);
  const rest = (classMatch ? extra.replace(classMatch[0], '') : extra).trim();
  const restAttr = rest ? ` ${rest}` : '';
  if (!en) {
    const cls = classMatch ? ` class="${classMatch[1]}"` : '';
    return `<${tag}${cls}${restAttr}>${pt}</${tag}>`;
  }
  const ptClass = classMatch ? ` class="i18n-pt ${classMatch[1]}"` : ' class="i18n-pt"';
  const enClass = classMatch ? ` class="i18n-en ${classMatch[1]}"` : ' class="i18n-en"';
  return `<${tag}${ptClass}${restAttr}>${pt}</${tag}><${tag}${enClass}${restAttr}>${en}</${tag}>`;
}
