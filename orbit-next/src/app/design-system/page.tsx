import type { Metadata } from 'next';
import { PageContent } from './content';

export const metadata: Metadata = {
  title: 'Design System — Orbit Gestão',
  description: 'Living design system + pattern library do site da Orbit Gestão.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PageContent />;
}
