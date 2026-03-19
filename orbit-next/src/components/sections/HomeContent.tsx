'use client';

import { PageLayout } from '@/components/PageLayout';
import { pageHTML } from '@/app/home-html';

export function HomeContent() {
  return <PageLayout contentHTML={pageHTML} />;
}
