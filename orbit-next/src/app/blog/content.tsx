'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { pageHTML } from './html';

function BlogInner() {
  const searchParams = useSearchParams();
  const artigo = searchParams.get('artigo');

  // Key forces re-mount when artigo param changes
  return <PageLayout key={artigo || 'list'} contentHTML={pageHTML} />;
}

export function PageContent() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0D1117' }} />}>
      <BlogInner />
    </Suspense>
  );
}
