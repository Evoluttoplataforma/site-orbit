import type { Metadata } from 'next';
import { PageContent } from './content';
import { agentSeo } from './html';
import {
  buildAgentBreadcrumb,
  buildAgentService,
  buildAgentFaqSchema,
  buildAgentHowToSchema,
  buildAgentSpeakableSchema,
} from '@/lib/agent-page-helpers';

export const metadata: Metadata = {
  title: agentSeo.title,
  description: agentSeo.description,
  alternates: { canonical: `https://orbitgestao.com.br/agentes/${agentSeo.slug}` },
  openGraph: {
    title: agentSeo.ogTitle,
    description: agentSeo.ogDescription,
    url: `https://orbitgestao.com.br/agentes/${agentSeo.slug}`,
    images: [{ url: `https://orbitgestao.com.br/og/agente-${agentSeo.slug}.jpg`, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAgentBreadcrumb(agentSeo)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAgentService(agentSeo)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAgentFaqSchema(agentSeo)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAgentHowToSchema(agentSeo)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAgentSpeakableSchema(agentSeo)) }} />
      <PageContent />
    </>
  );
}
