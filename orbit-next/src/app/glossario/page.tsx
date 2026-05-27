import { Metadata } from 'next';
import { headerHTML } from '@/components/shared-header';
import { footerHTML } from '@/components/shared-footer';

interface Term {
  term: string;            // Nome do termo (titulo)
  slug: string;            // anchor: /glossario#bpmn
  short: string;           // definicao em 1 frase (~80-120 chars)
  full: string;            // definicao expandida em 2-4 frases
  relatedArticle?: string; // slug do artigo no blog que aprofunda
}

const TERMS: Term[] = [
  {
    term: 'BPMN',
    slug: 'bpmn',
    short: 'Business Process Model and Notation — padrão visual internacional para desenhar processos de negócio.',
    full: 'BPMN (Business Process Model and Notation) é a notação gráfica padrão pra representar processos empresariais com símbolos claros: tarefas, decisões, eventos, papéis. É a "linguagem comum" entre área de negócio e TI. Permite documentar processos de um jeito que qualquer pessoa entende, mesmo sem conhecimento técnico.',
    relatedArticle: 'como-mapear-processos-empresa-bpmn',
  },
  {
    term: 'BPMS',
    slug: 'bpms',
    short: 'Business Process Management System — plataforma que executa processos modelados em BPMN.',
    full: 'BPMS é o software que pega o desenho do processo (em BPMN) e faz ele rodar de verdade: aciona pessoas, valida etapas, mede tempo, dispara automações. Diferente de uma ferramenta de fluxograma (só desenho), o BPMS executa, monitora e melhora.',
    relatedArticle: 'software-bpms-como-escolher',
  },
  {
    term: 'CRM',
    slug: 'crm',
    short: 'Customer Relationship Management — sistema que centraliza informações, interações e oportunidades de cada cliente.',
    full: 'CRM organiza tudo que importa sobre cliente num lugar só: contatos, histórico de conversas, propostas, contratos, estágio no funil. Sem CRM, o conhecimento mora na cabeça do vendedor — e some quando ele sai. Com CRM, a empresa vê pipeline, taxa de conversão e previsibilidade de receita.',
    relatedArticle: 'crm-empresa-b2b-como-escolher',
  },
  {
    term: 'KPI',
    slug: 'kpi',
    short: 'Key Performance Indicator — indicador-chave que mede o desempenho de uma área ou processo.',
    full: 'KPI é o número que diz se algo está funcionando ou não. Bom KPI tem 3 características: é mensurável (número, não opinião), é acionável (alguém pode mudar) e tem dono claro. Sem isso, vira "métrica de vaidade": número bonito no dashboard que ninguém usa pra decidir nada.',
    relatedArticle: 'como-criar-indicadores-empresa',
  },
  {
    term: 'OKR',
    slug: 'okr',
    short: 'Objectives and Key Results — framework de gestão de metas usado por Google, Intel e milhares de empresas.',
    full: 'OKR conecta Objetivo (qualitativo, inspirador) a 3-5 Key Results (quantitativos, mensuráveis). Diferente do KPI tradicional, é ciclo curto (trimestral) e força foco — você não tem 20 OKRs, tem 3. Bem implementado, alinha empresa inteira numa direção comum.',
    relatedArticle: 'plano-de-acao-executavel',
  },
  {
    term: 'SWOT',
    slug: 'swot',
    short: 'Análise estratégica de Strengths, Weaknesses, Opportunities, Threats (forças, fraquezas, oportunidades, ameaças).',
    full: 'SWOT é a ferramenta clássica de diagnóstico estratégico. Mapeia fatores internos (forças e fraquezas) e externos (oportunidades e ameaças) da empresa. Bem feito, vira input pra escolhas reais; mal feito, vira slide bonito que ninguém usa.',
    relatedArticle: 'tirar-planejamento-estrategico-do-papel',
  },
  {
    term: 'BSC',
    slug: 'bsc',
    short: 'Balanced Scorecard — modelo de gestão que conecta estratégia a 4 perspectivas: financeira, cliente, processos, aprendizado.',
    full: 'Criado por Kaplan e Norton, o BSC traduz visão e estratégia em objetivos mensuráveis em quatro perspectivas equilibradas. Evita a armadilha de medir só finanças (resultado) e ignorar causas (processos, pessoas, clientes).',
    relatedArticle: 'como-criar-indicadores-empresa',
  },
  {
    term: 'POP',
    slug: 'pop',
    short: 'Procedimento Operacional Padrão — documento que descreve passo a passo como uma atividade deve ser executada.',
    full: 'POP é o "manual de operação" de um processo: quem faz, em que ordem, com que insumos, qual o resultado esperado. Garante que duas pessoas executando a mesma tarefa entreguem qualidade equivalente. Sem POP, você depende da memória das pessoas — e o conhecimento sai junto com elas.',
    relatedArticle: 'como-organizar-processos-empresa-cresceu-rapido',
  },
  {
    term: 'PDCA',
    slug: 'pdca',
    short: 'Plan-Do-Check-Act — ciclo de melhoria contínua de processos, criado por Deming.',
    full: 'PDCA é o jeito mais simples de melhorar qualquer processo: Planeja, Faz, Confere se deu certo, Ajusta. Roda em ciclo. É a base de toda gestão da qualidade desde os anos 1950.',
    relatedArticle: 'como-organizar-processos-empresa-cresceu-rapido',
  },
  {
    term: 'PDI',
    slug: 'pdi',
    short: 'Plano de Desenvolvimento Individual — plano de carreira e capacitação personalizado por colaborador.',
    full: 'PDI estrutura o crescimento profissional de cada pessoa: onde está hoje, onde quer chegar, que conhecimentos/competências precisa adquirir, quais ações vai tomar e em que prazo. Ferramenta de retenção: profissional sem PDI sente que não tem futuro e sai pra concorrência.',
    relatedArticle: 'pdi-funcionarios-como-criar',
  },
  {
    term: 'DRE',
    slug: 'dre',
    short: 'Demonstração do Resultado do Exercício — relatório contábil que mostra receita, custos, despesas e lucro de um período.',
    full: 'DRE é o "raio-X financeiro" da empresa: quanto entrou, quanto custou pra fazer, quanto sobrou. Tradicionalmente sai mensal, 15-30 dias depois do mês fechar. Com gestão integrada, vira tempo real — você vê hoje o impacto de cada venda na margem.',
    relatedArticle: 'dre-tempo-real',
  },
  {
    term: 'ERP',
    slug: 'erp',
    short: 'Enterprise Resource Planning — sistema integrado que gerencia recursos da empresa: finanças, estoque, vendas, RH, etc.',
    full: 'ERP centraliza dados operacionais num único sistema, evitando planilhas duplicadas e dados desconectados. Tradicional (SAP, Totvs) é robusto mas pesado e custoso de implantar. Alternativas modernas (plataformas all-in-one) entregam funcionalidade similar com onboarding em semanas, não meses.',
    relatedArticle: 'erp-vs-plataforma-all-in-one',
  },
  {
    term: 'LMS',
    slug: 'lms',
    short: 'Learning Management System — plataforma que organiza treinamentos, trilhas de aprendizado e certificações corporativas.',
    full: 'LMS é onde a capacitação corporativa vive: vídeos, exercícios, quizzes, trilhas de carreira, certificações. Bom LMS conecta com PDI e mede aprendizado real (não só "view count"). Sem LMS, treinamento vira PDF no Drive que ninguém abre.',
    relatedArticle: 'plataforma-treinamento-corporativo',
  },
  {
    term: 'CAC',
    slug: 'cac',
    short: 'Custo de Aquisição de Cliente — quanto a empresa gasta em marketing e vendas para ganhar 1 cliente novo.',
    full: 'CAC = (gasto total em marketing + vendas) / (clientes novos no período). É o número que junto com LTV define se o negócio escala saudável. CAC subindo + LTV estagnado = aviso de problema sério no modelo.',
    relatedArticle: 'como-organizar-prospeccao-vendas-b2b',
  },
  {
    term: 'LTV',
    slug: 'ltv',
    short: 'Lifetime Value — receita total que um cliente gera durante todo o tempo que fica como cliente.',
    full: 'LTV mede valor real de cada cliente. Sem LTV, você não sabe quanto pode gastar pra adquirir (CAC) sem queimar margem. Empresas que crescem saudável miram LTV/CAC de pelo menos 3x — abaixo disso, está pagando pra trabalhar.',
    relatedArticle: 'como-criar-indicadores-empresa',
  },
  {
    term: 'NPS',
    slug: 'nps',
    short: 'Net Promoter Score — métrica de satisfação que mede se cliente recomendaria a empresa (0 a 10).',
    full: 'NPS é a pergunta única: "de 0 a 10, qual a chance de você recomendar nossa empresa?". Promotores (9-10), Neutros (7-8), Detratores (0-6). NPS = % Promotores - % Detratores. Empresas com NPS alto crescem mais por indicação e gastam menos em aquisição.',
  },
  {
    term: 'Funil de vendas',
    slug: 'funil-vendas',
    short: 'Visualização do percurso do lead, da primeira interação até o fechamento da venda.',
    full: 'Funil mostra quantos leads você tem em cada etapa (atração → qualificação → proposta → negociação → fechamento) e a taxa de conversão entre etapas. Diagnostica gargalos: se você tem mil leads e fecha 5, o problema não é falta de leads — é qualificação ou proposta.',
    relatedArticle: 'como-organizar-prospeccao-vendas-b2b',
  },
  {
    term: 'Pipeline',
    slug: 'pipeline',
    short: 'Conjunto de oportunidades comerciais ativas em diferentes estágios do funil.',
    full: 'Pipeline saudável tem volume suficiente em cada estágio pra prever vendas dos próximos meses. Regra prática: pipeline 3-4x maior que a meta de vendas, porque nem tudo fecha. Sem pipeline visível (geralmente no CRM), previsibilidade é zero.',
    relatedArticle: 'crm-empresa-b2b-como-escolher',
  },
  {
    term: 'Agente de IA',
    slug: 'agente-ia',
    short: 'Software baseado em IA que executa tarefas autonomamente, com objetivo claro e ferramentas para agir.',
    full: 'Agente de IA não é só um chatbot — ele toma decisões, usa ferramentas (sistemas, APIs) e completa tarefas multi-etapa sem supervisão constante. Em gestão, o agente analisa indicador, dispara plano de ação, atualiza CRM, notifica responsável. É a virada de "IA que responde" pra "IA que executa".',
    relatedArticle: 'plataforma-gestao-ia-agentic-alternativa-consultoria',
  },
  {
    term: 'IA agentic',
    slug: 'ia-agentic',
    short: 'Categoria de IA composta por agentes autônomos que executam tarefas em vez de só responder perguntas.',
    full: 'IA agentic é a próxima evolução dos LLMs. Em vez de chat (você pergunta, ele responde), são agentes que entendem objetivo, planejam passos, usam ferramentas e executam. Na Orbit, é a Olívia: agente central que coordena 20 sub-agentes especializados (processos, vendas, finanças, etc).',
    relatedArticle: 'plataforma-gestao-ia-agentic-alternativa-consultoria',
  },
  {
    term: 'Knowledge base',
    slug: 'knowledge-base',
    short: 'Repositório centralizado de documentação, procedimentos e conhecimento da empresa.',
    full: 'Knowledge base resolve o problema de "ninguém acha o documento crítico quando precisa". Centraliza POPs, contratos, políticas, treinamentos, FAQ interno. Boa knowledge base tem busca semântica, controle de versão e permissão por área.',
    relatedArticle: 'knowledge-base-corporativo-como-escolher',
  },
  {
    term: 'All-in-one',
    slug: 'all-in-one',
    short: 'Categoria de software que integra múltiplos módulos (CRM, finanças, processos, RH) numa única plataforma.',
    full: 'All-in-one se opõe à stack fragmentada (CRM + ERP + BI + RH separados). Vantagem: dados unificados, sem integração quebrada, custo total menor. Desvantagem: cada módulo pode ser menos especialista que a ferramenta dedicada. Pra empresa de médio porte, vale na maioria dos casos.',
    relatedArticle: 'erp-vs-plataforma-all-in-one',
  },
  {
    term: 'Ramp-up',
    slug: 'ramp-up',
    short: 'Período entre contratar uma pessoa e ela atingir produtividade plena.',
    full: 'Ramp-up típico em empresa sem processo: 90-120 dias. Com processo bem documentado (POPs, vídeos, checklists), cai pra 30-45 dias. Cada dia a menos de ramp-up vale dinheiro real: equivale a salário pago sem entrega proporcional.',
    relatedArticle: 'como-organizar-processos-empresa-cresceu-rapido',
  },
  {
    term: 'Workflow',
    slug: 'workflow',
    short: 'Fluxo automatizado de tarefas que segue regras pré-definidas.',
    full: 'Workflow é o processo "rodando" no software: cliente assina contrato → cria pasta no Drive → manda email pra equipe → abre task de onboarding. Sem workflow, alguém precisa lembrar de cada passo. Com workflow, o sistema executa sozinho.',
    relatedArticle: 'como-automatizar-processos-empresa',
  },
  {
    term: 'Stack fragmentada',
    slug: 'stack-fragmentada',
    short: 'Conjunto de ferramentas separadas que não conversam entre si, gerando retrabalho e dados inconsistentes.',
    full: 'Stack fragmentada é o cenário típico de empresa em crescimento: 5-12 ferramentas (CRM, ERP, planilha, helpdesk, WhatsApp, BI) que precisam ser alimentadas separadamente. Custo invisível: tempo gasto copiando dado entre sistemas + decisões em cima de números que não batem.',
    relatedArticle: 'sistemas-nao-conversam-custo',
  },
];

// Agrupa por inicial pra navegação A-Z
const grouped: Record<string, Term[]> = {};
for (const t of TERMS) {
  const letter = t.term[0].toUpperCase();
  if (!grouped[letter]) grouped[letter] = [];
  grouped[letter].push(t);
}
const letters = Object.keys(grouped).sort();

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const metadata: Metadata = {
  title: 'Glossário de Gestão Empresarial | Orbit Gestão',
  description: 'Glossário com 25 termos essenciais de gestão empresarial: BPMN, KPI, OKR, CRM, ERP, LMS, PDCA, agente de IA e mais. Definições objetivas e cross-link pros artigos completos.',
  alternates: { canonical: 'https://orbitgestao.com.br/glossario' },
  openGraph: {
    title: 'Glossário de Gestão Empresarial | Orbit Gestão',
    description: '25 termos essenciais de gestão empresarial explicados de forma direta.',
    url: 'https://orbitgestao.com.br/glossario',
    type: 'website',
    siteName: 'Orbit Gestão',
    locale: 'pt_BR',
  },
};

// JSON-LD DefinedTermSet — Google entende como glossário tópico
const definedTermSet = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Glossário de Gestão Empresarial — Orbit',
  description: 'Termos essenciais de gestão empresarial, indicadores, processos, vendas e IA aplicada à gestão.',
  url: 'https://orbitgestao.com.br/glossario',
  inLanguage: 'pt-BR',
  hasDefinedTerm: TERMS.map((t) => ({
    '@type': 'DefinedTerm',
    '@id': `https://orbitgestao.com.br/glossario#${t.slug}`,
    name: t.term,
    description: t.short,
    inDefinedTermSet: 'https://orbitgestao.com.br/glossario',
    ...(t.relatedArticle ? { url: `https://orbitgestao.com.br/blog/${t.relatedArticle}` } : {}),
  })),
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orbitgestao.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Glossário', item: 'https://orbitgestao.com.br/glossario' },
  ],
};

export default function GlossarioPage() {
  const indexHTML = letters.map((l) =>
    `<a href="#letter-${l}" class="gloss-index__letter">${l}</a>`
  ).join('');

  const sectionsHTML = letters.map((l) => {
    const items = grouped[l].map((t) => `
      <article id="${t.slug}" class="gloss-term">
        <h3>${escapeHtml(t.term)}</h3>
        <p class="gloss-term__short">${escapeHtml(t.short)}</p>
        <p class="gloss-term__full">${escapeHtml(t.full)}</p>
        ${t.relatedArticle ? `<a href="/blog/${escapeHtml(t.relatedArticle)}" class="gloss-term__link">Ler artigo completo sobre ${escapeHtml(t.term)} <i class="fas fa-arrow-right"></i></a>` : ''}
      </article>
    `).join('');
    return `<section id="letter-${l}" class="gloss-section">
      <h2 class="gloss-section__title">${l}</h2>
      ${items}
    </section>`;
  }).join('');

  const pageHTML = `
    ${headerHTML}
    <style>
      .gloss-hero { max-width: 980px; margin: 0 auto; padding: 100px 24px 24px; }
      .gloss-hero__breadcrumb { color: #6B7280; font-size: 13px; margin-bottom: 18px; }
      .gloss-hero__breadcrumb a { color: #ffba1a; text-decoration: none; }
      .gloss-hero__breadcrumb a:hover { text-decoration: underline; }
      .gloss-hero h1 { color: #0D1117; font-size: clamp(1.8rem, 4vw, 2.4rem); font-weight: 800; letter-spacing: -0.025em; margin: 0 0 16px; line-height: 1.2; }
      .gloss-hero p { color: #4B5563; font-size: 1.05rem; line-height: 1.7; margin: 0; max-width: 720px; }
      .gloss-index { max-width: 980px; margin: 0 auto; padding: 0 24px 24px; display: flex; flex-wrap: wrap; gap: 8px; border-bottom: 1px solid #E5E7EB; padding-bottom: 24px; }
      .gloss-index__letter { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: #F3F4F6; color: #0D1117; font-weight: 700; text-decoration: none; transition: all 0.2s; }
      .gloss-index__letter:hover { background: #ffba1a; color: #0D1117; }
      .gloss-body { max-width: 980px; margin: 0 auto; padding: 32px 24px 64px; }
      .gloss-section { margin-bottom: 48px; }
      .gloss-section__title { color: #ffba1a; font-size: 2.2rem; font-weight: 900; letter-spacing: -0.03em; margin: 0 0 24px; padding-bottom: 12px; border-bottom: 2px solid rgba(255,186,26,0.25); }
      .gloss-term { padding: 24px 0; border-bottom: 1px solid #E5E7EB; }
      .gloss-term:last-child { border-bottom: none; }
      .gloss-term h3 { color: #0D1117; font-size: 1.4rem; font-weight: 800; margin: 0 0 10px; letter-spacing: -0.015em; }
      .gloss-term__short { color: #1A1D23; font-size: 1.02rem; font-weight: 600; line-height: 1.55; margin: 0 0 12px; }
      .gloss-term__full { color: #4B5563; font-size: 0.98rem; line-height: 1.7; margin: 0 0 14px; }
      .gloss-term__link { display: inline-flex; align-items: center; gap: 8px; color: #ffba1a; font-size: 0.92rem; font-weight: 700; text-decoration: none; }
      .gloss-term__link:hover { color: #ff8c00; gap: 12px; }
      .gloss-cta-strip { max-width: 980px; margin: 0 auto 64px; padding: 24px; background: linear-gradient(135deg, rgba(255,186,26,0.07), rgba(255,186,26,0.02)); border: 1px solid rgba(255,186,26,0.25); border-radius: 20px; text-align: center; }
      .gloss-cta-strip h2 { color: #0D1117; font-size: 1.3rem; font-weight: 800; margin: 0 0 8px; }
      .gloss-cta-strip p { color: #4B5563; font-size: 1rem; margin: 0 0 18px; }
      .gloss-cta-strip a { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #ffba1a, #ff8c00); color: #0D1117; border-radius: 50px; font-weight: 800; text-decoration: none; transition: transform 0.2s; }
      .gloss-cta-strip a:hover { transform: translateY(-2px); }
      @media (max-width: 600px) {
        .gloss-section__title { font-size: 1.8rem; }
        .gloss-term h3 { font-size: 1.2rem; }
      }
    </style>
    <section class="gloss-hero">
      <div class="gloss-hero__breadcrumb"><a href="/">Home</a> · Glossário</div>
      <h1>Glossário de Gestão Empresarial</h1>
      <p>${TERMS.length} termos essenciais de gestão empresarial — de BPMN a IA agentic. Cada definição em 1 frase pra resposta rápida + explicação aprofundada + link pro artigo completo.</p>
    </section>
    <nav class="gloss-index" aria-label="Índice alfabético">${indexHTML}</nav>
    <div class="gloss-body">${sectionsHTML}</div>
    <section class="gloss-cta-strip">
      <h2>Quer aplicar esses conceitos na prática?</h2>
      <p>Em 30 minutos a Orbit mostra como organizar processos, indicadores, finanças e CRM numa plataforma só.</p>
      <a href="https://demonstracao.orbitgestao.com.br/chat">Agendar demonstração →</a>
    </section>
    ${footerHTML}
  `;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div dangerouslySetInnerHTML={{ __html: pageHTML }} />
    </>
  );
}
