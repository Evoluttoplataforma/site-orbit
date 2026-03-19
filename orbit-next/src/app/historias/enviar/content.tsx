'use client';
import { PageLayout } from '@/components/PageLayout';
import { pageHTML } from './html';
export function PageContent() { return <PageLayout contentHTML={pageHTML} />; }
