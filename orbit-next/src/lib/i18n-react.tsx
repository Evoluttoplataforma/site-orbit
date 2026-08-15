import type { CSSProperties, ElementType, ReactNode } from 'react';

/** Dual PT/EN React nodes. CSS shows one side from html[lang]. */
export function I18n({
  as: Tag = 'p',
  pt,
  en,
  style,
  ...rest
}: {
  as?: ElementType;
  pt: ReactNode;
  en: ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
}) {
  return (
    <>
      <Tag className="i18n-pt" style={style} {...rest}>
        {pt}
      </Tag>
      <Tag className="i18n-en" style={style} {...rest}>
        {en}
      </Tag>
    </>
  );
}
