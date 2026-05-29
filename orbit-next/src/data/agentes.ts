// ═══════════════════════════════════════════════════════════════
// Dados dos 10 agentes + pillar — fonte única de copy.
// Usado por /agentes/[slug] (dynamic) e /agentes-de-ia (pillar).
// Mapeamento de copy 1:1 com AGENTES_DE_IA_PLAYBOOK.md.
// Ícones Lucide do playbook → Font Awesome (já carregado no projeto).
// ═══════════════════════════════════════════════════════════════

export interface Capacidade {
  fa: string;        // ícone Font Awesome
  titulo: string;
  desc: string;
}

export interface Integracao {
  par: string;       // ex: "Estratégico + Financeiro"
  caso: string;      // título do caso
  desc: string;      // 20–30 palavras
}

export interface CasoUso {
  titulo: string;
  desc: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface BlogRel {
  title: string;
  slug: string;
  cat: string;
}

export interface Agente {
  slug: string;
  nome: string;             // "Agente Estratégico"
  pill: string;             // "Estratégico · Indicadores · Oportunidades"
  fa: string;               // ícone principal Font Awesome
  metaTitle: string;
  metaDesc: string;
  h1: string;               // antes do highlight
  h1Highlight: string;      // dourado (fim do H1)
  sub: string;
  alternateNames: string[]; // pra Service schema
  capacidades: Capacidade[];
  integracoes: Integracao[];
  casos: CasoUso[];         // 3
  faqs: FAQ[];              // 8
  blog: BlogRel[];          // 4–6
}

// ═══ AGENTES (índice na sidebar/cards do pillar) ═══
export const AGENTES_INDEX: { slug: string; nome: string; fa: string; descCurta: string }[] = [
  { slug: 'estrategico',  nome: 'Agente Estratégico',     fa: 'fa-solid fa-compass',           descCurta: 'Cuida do plano estratégico, indicadores, SWOT e oportunidades — transformando estratégia em execução diária.' },
  { slug: 'financeiro',   nome: 'Agente Financeiro',      fa: 'fa-solid fa-wallet',            descCurta: 'Coordena contas a pagar, contas a receber, fluxo de caixa, DRE e orçamento — em tempo real.' },
  { slug: 'comercial',    nome: 'Agente Comercial',       fa: 'fa-solid fa-arrow-trend-up',    descCurta: 'Opera o CRM completo — pipeline, leads, automações, formulários e relatórios de vendas.' },
  { slug: 'processos',    nome: 'Agente de Processos',    fa: 'fa-solid fa-diagram-project',   descCurta: 'Mapeia, executa e otimiza processos da empresa — incluindo tarefas, problemas operacionais e instruções de trabalho.' },
  { slug: 'pessoas',      nome: 'Agente de Pessoas',      fa: 'fa-solid fa-users',             descCurta: 'Cuida de colaboradores, cargos, organograma, PDI, treinamentos e departamentos.' },
  { slug: 'recrutamento', nome: 'Agente de R&S',          fa: 'fa-solid fa-user-plus',         descCurta: 'Recrutamento e seleção completos — vagas, candidatos, triagem de CV por IA, etapas e relatórios.' },
  { slug: 'projetos',     nome: 'Agente de Projetos',     fa: 'fa-solid fa-table-columns',     descCurta: 'Cria, executa e monitora projetos — com Gantt, dependências, membros e automações.' },
  { slug: 'reunioes',     nome: 'Agente de Reuniões',     fa: 'fa-solid fa-calendar-days',     descCurta: 'Organiza pauta, registra atas, extrai tarefas e gerencia ações pós-reunião.' },
  { slug: 'documentos',   nome: 'Agente de Documentos',   fa: 'fa-solid fa-file-lines',        descCurta: 'Gerencia repositório de documentos, workflows de aprovação e ciclo de vida da informação.' },
  { slug: 'riscos',       nome: 'Agente de Riscos',       fa: 'fa-solid fa-shield-halved',     descCurta: 'Identifica, classifica e monitora riscos — com plano de ação e responsáveis nomeados.' },
];

// ═══ AGENTES (copy completa) ═══
export const AGENTES: Record<string, Agente> = {
  // ─────────────────────── 7.1 Agente Estratégico ───────────────────────
  estrategico: {
    slug: 'estrategico',
    nome: 'Agente Estratégico',
    pill: 'Estratégico · Indicadores · Oportunidades',
    fa: 'fa-solid fa-compass',
    metaTitle: 'Agente Estratégico: planejamento e indicadores operados por IA | Orbit',
    metaDesc: 'Planejamento estratégico, SWOT, indicadores e oportunidades — o Agente Estratégico da Orbit transforma plano de gaveta em execução semanal monitorada.',
    h1: 'Agente Estratégico: planejamento e execução estratégica',
    h1Highlight: 'operados por IA',
    sub: 'Tire o planejamento do PDF. O Agente Estratégico da Orbit opera o ciclo completo — visão, objetivos, SWOT, indicadores, plano de ação e revisão — coordenado pela Olívia, junto com a sua liderança.',
    alternateNames: ['Agente de Estratégia', 'IA Estratégica', 'Planejamento por IA'],
    capacidades: [
      { fa: 'fa-solid fa-compass',         titulo: 'Missão, Visão e Valores',  desc: 'Documenta e mantém vivo o norte estratégico, citado nas decisões diárias.' },
      { fa: 'fa-solid fa-table-cells',     titulo: 'Análise SWOT',             desc: 'Estrutura e atualiza forças, fraquezas, oportunidades e ameaças com base em dado real da operação.' },
      { fa: 'fa-solid fa-bullseye',        titulo: 'Objetivos Estratégicos',   desc: 'Desdobra prioridades em metas trimestrais com responsável e indicador.' },
      { fa: 'fa-solid fa-chart-line',      titulo: 'Indicadores em tempo real',desc: 'Conecta KPIs aos dados operacionais. Sem planilha, sem atraso.' },
      { fa: 'fa-solid fa-chart-bar',       titulo: 'Dashboards executivos',    desc: 'Visão consolidada da empresa pronta pra reunião de board.' },
      { fa: 'fa-solid fa-list-check',      titulo: 'Plano de Ação',            desc: 'Cada objetivo vira plano com prazo, dono e prioridade.' },
      { fa: 'fa-solid fa-lightbulb',       titulo: 'Oportunidades',            desc: 'Repositório central de oportunidades estratégicas identificadas pelo time e pela IA.' },
      { fa: 'fa-solid fa-arrows-rotate',   titulo: 'Revisão estratégica',      desc: 'Cadência semanal de revisão com sugestões automáticas de ajuste.' },
    ],
    integracoes: [
      { par: 'Estratégico + Financeiro', caso: 'Impacto orçamentário automático',     desc: 'Impacto orçamentário de cada objetivo estratégico calculado em tempo real, com alertas de desvio orçado vs realizado.' },
      { par: 'Estratégico + Comercial',  caso: 'Meta amarrada ao pipeline',           desc: 'Meta de receita conectada ao pipeline e cobertura — projeção dinâmica de fechamento por trimestre.' },
      { par: 'Estratégico + Pessoas',    caso: 'Competências por objetivo',           desc: 'Competências necessárias pra cada objetivo mapeadas em PDIs dos colaboradores responsáveis.' },
      { par: 'Estratégico + Indicadores',caso: 'KPIs vivos por objetivo',             desc: 'Cada objetivo monitorado por KPIs vivos, não por planilha mensal — atualização contínua.' },
    ],
    casos: [
      { titulo: 'Empresa em crescimento sem estratégia clara',     desc: 'Agente conduz construção do plano em 30 dias e estabelece ritmo de execução semanal com revisões e ajustes baseados em dado real da operação.' },
      { titulo: 'Empresa madura com plano que não sai do papel',   desc: 'Agente reativa cadência de revisão, conecta indicadores e responsabiliza donos — o plano deixa de ser PDF anual e vira execução semanal monitorada.' },
      { titulo: 'Empresa preparando captação ou venda',            desc: 'Agente prepara narrativa estratégica com indicadores que investidores e compradores procuram — visão consolidada, com histórico de execução.' },
    ],
    faqs: [
      { q: 'O Agente Estratégico substitui consultor de estratégia?',    a: 'Não. Consultor traz visão externa pontual. Agente opera execução contínua. São complementares — o consultor desenha, o agente executa e mantém vivo.' },
      { q: 'Como o Agente conecta estratégia com operação?',             a: 'Cada objetivo do plano vira meta de indicador, que puxa dado da operação real. Conexão automática, sem dupla digitação.' },
      { q: 'Que metodologia o Agente usa?',                              a: 'A Orbit aplica a metodologia consolidada do Grupo GSN (Templum & Evolutto), refinada em 30 anos e mais de 8.000 empresas atendidas.' },
      { q: 'Quem revisa o plano: o agente ou a liderança?',              a: 'A liderança revisa em ritual semanal de 30–45 min. O agente prepara: status, desvios, sugestões. Decisão é humana.' },
      { q: 'Posso usar OKR no Agente Estratégico?',                      a: 'Sim. OKR, BSC ou framework próprio. O Agente é agnóstico de metodologia.' },
      { q: 'Como funciona a análise SWOT na Orbit?',                     a: 'Quadrantes editáveis colaborativamente, com recomendações estratégicas geradas pela IA baseadas no contexto da sua empresa.' },
      { q: 'O Agente identifica oportunidades sozinho?',                 a: 'Sim. Cruza indicadores, mercado e contexto pra sugerir oportunidades estratégicas no repositório central.' },
      { q: 'Em quanto tempo vejo resultado?',                            a: 'Plano executável em 30 dias. Cadência sustentável em 60 dias. Impacto em indicadores estratégicos em 90 dias.' },
    ],
    blog: [
      { title: 'Como tirar o planejamento estratégico do papel',                          slug: 'tirar-planejamento-estrategico-do-papel', cat: 'Estratégia' },
      { title: 'Por que 70% dos planejamentos estratégicos morrem no terceiro mês',       slug: 'planejamento-estrategico-morre-terceiro-mes', cat: 'Estratégia' },
      { title: 'Plano de ação executável',                                                slug: 'plano-de-acao-executavel', cat: 'Estratégia' },
      { title: 'Como criar indicadores que conectam com a operação',                      slug: 'como-criar-indicadores-empresa', cat: 'Indicadores' },
      { title: 'IA agentic para CEO: apoio à decisão estratégica',                        slug: 'ia-agentic-para-ceo-decisao-estrategica', cat: 'IA' },
      { title: 'AI Operating System for Business',                                        slug: 'ai-operating-system-business', cat: 'IA' },
    ],
  },

  // ─────────────────────── 7.2 Agente Financeiro ───────────────────────
  financeiro: {
    slug: 'financeiro',
    nome: 'Agente Financeiro',
    pill: 'Financeiro · Compras · Fornecedores',
    fa: 'fa-solid fa-wallet',
    metaTitle: 'Agente Financeiro: contas, fluxo de caixa e DRE operados por IA | Orbit',
    metaDesc: 'Contas a pagar, contas a receber, fluxo de caixa, DRE em tempo real e insights da Olívia. O Agente Financeiro opera sua gestão financeira 24/7.',
    h1: 'Agente Financeiro: gestão financeira',
    h1Highlight: 'operada 24/7 pela Olívia',
    sub: 'Contas a pagar, contas a receber, fluxo de caixa, DRE em tempo real, conciliação bancária, orçamento, compras, fornecedores e insights estratégicos — coordenados pelo Agente Financeiro, validados pelo seu CFO.',
    alternateNames: ['IA Financeira', 'Agente de Gestão Financeira', 'CFO Digital'],
    capacidades: [
      { fa: 'fa-solid fa-circle-up',         titulo: 'Contas a pagar',           desc: 'Lança, aprova, paga e concilia com workflow auditável.' },
      { fa: 'fa-solid fa-circle-down',       titulo: 'Contas a receber',         desc: 'Emite, monitora inadimplência e dispara cobrança automática.' },
      { fa: 'fa-solid fa-water',             titulo: 'Fluxo de caixa projetado', desc: 'Projeção dinâmica de 30/60/90 dias atualizada em tempo real.' },
      { fa: 'fa-solid fa-file-invoice',      titulo: 'DRE em tempo real',        desc: 'Resultado provável do mês atualizado a cada lançamento, não no fechamento.' },
      { fa: 'fa-solid fa-chart-pie',         titulo: 'Orçamento',                desc: 'Comparativo orçado vs realizado por centro de custo, com alertas de desvio.' },
      { fa: 'fa-solid fa-bag-shopping',      titulo: 'Compras + RFQ',            desc: 'Pedidos, cotações, aprovações e workflows integrados ao financeiro.' },
      { fa: 'fa-solid fa-truck',             titulo: 'Fornecedores',             desc: 'Cadastro, contratos, histórico e avaliação de fornecedores.' },
      { fa: 'fa-solid fa-brain',             titulo: 'Insights da Olívia',       desc: 'Anomalias detectadas, sugestões de otimização, alertas de risco de caixa.' },
    ],
    integracoes: [
      { par: 'Financeiro + Comercial',    caso: 'Comissão e previsão de receita',    desc: 'Comissões e previsão de receita conectadas ao pipeline em tempo real — projeção do mês baseada em fechamento estimado.' },
      { par: 'Financeiro + Estratégico',  caso: 'Impacto financeiro por objetivo',   desc: 'Impacto financeiro de cada objetivo estratégico calculado em tempo real, com alertas de desvio orçamentário.' },
      { par: 'Financeiro + Compras',      caso: 'Aprovação ligada ao orçamento',     desc: 'Workflow de aprovação ligado ao orçamento e centro de custo — bloqueio automático se estourar limite.' },
      { par: 'Financeiro + Documentos',   caso: 'Contratos e NFs ancorados',         desc: 'Contratos e NFs ancorados aos lançamentos correspondentes — trilha auditável completa.' },
    ],
    casos: [
      { titulo: 'Empresa que vende muito mas o caixa aperta',     desc: 'Agente expõe descompasso entre receita reconhecida e dinheiro recebido, antecipa crise de liquidez com projeção de 30/60/90 dias.' },
      { titulo: 'Empresa fechando o mês na última semana',        desc: 'Agente mantém DRE em tempo real — fechamento contábil vira validação, não descoberta. Resultado disponível em qualquer dia do mês.' },
      { titulo: 'Empresa com inadimplência crescente',            desc: 'Agente detecta padrão precoce de atraso e dispara cobrança automatizada antes de virar perda — comportamento do cliente comparado ao histórico.' },
    ],
    faqs: [
      { q: 'O Agente Financeiro substitui o contador?',                 a: 'Não. Contador continua responsável pelo fechamento oficial. Agente opera a gestão financeira diária — onde contador não tem capacidade nem deveria operar.' },
      { q: 'Como funciona a DRE em tempo real?',                        a: 'Cada venda, custo, despesa lança no sistema. Agente atualiza DRE imediatamente. Você vê resultado provável do mês em qualquer dia.' },
      { q: 'O Agente concilia com banco automaticamente?',              a: 'Sim, via Open Finance e integrações bancárias. Conciliação que levava 3 dias por mês acontece em tempo real.' },
      { q: 'Como detecta inadimplência precoce?',                       a: 'Padrão de comportamento de cliente — atraso crescente, mudança de ritmo de pagamento — comparado ao histórico. Alerta semanas antes do default.' },
      { q: 'Posso configurar regras de aprovação?',                     a: 'Sim. Limite de valor, hierarquia, exceções, escalonamento — tudo configurável.' },
      { q: 'O Agente atende empresa do Simples?',                       a: 'Sim. Simples Nacional, Lucro Presumido, Lucro Real, MEI — tropicalizado pro regime brasileiro.' },
      { q: 'Como integra com ERP existente?',                           a: 'Via API e conectores. Agente pode operar em paralelo ao ERP ou substituir parte das funções financeiras.' },
      { q: 'Em quanto tempo vejo resultado?',                           a: 'DRE em tempo real disponível em 30 dias. Redução de inadimplência mensurável em 60–90 dias.' },
    ],
    blog: [
      { title: 'Gestão financeira integrada',                                          slug: 'gestao-financeira-integrada-empresa', cat: 'Estratégia' },
      { title: 'Por que sua empresa vende muito e ainda assim falta dinheiro no caixa',slug: 'vendas-boas-caixa-negativo', cat: 'Estratégia' },
      { title: 'DRE em tempo real',                                                    slug: 'dre-tempo-real', cat: 'Estratégia' },
      { title: 'Como criar indicadores que conectam com a operação',                   slug: 'como-criar-indicadores-empresa', cat: 'Indicadores' },
      { title: 'ERP integrado vs plataforma all-in-one',                               slug: 'erp-vs-plataforma-all-in-one', cat: 'IA' },
      { title: 'IA agentic para CEO',                                                  slug: 'ia-agentic-para-ceo-decisao-estrategica', cat: 'IA' },
    ],
  },

  // ─────────────────────── 7.3 Agente Comercial ───────────────────────
  comercial: {
    slug: 'comercial',
    nome: 'Agente Comercial',
    pill: 'CRM/Pipelines · Pesquisas',
    fa: 'fa-solid fa-arrow-trend-up',
    metaTitle: 'Agente Comercial: CRM e pipeline operados por IA | Orbit',
    metaDesc: 'Pipeline, leads, automações, formulários, relatórios. O Agente Comercial da Orbit opera o ciclo completo de vendas B2B — coordenado pela Olívia.',
    h1: 'Agente Comercial: CRM e operação de vendas B2B',
    h1Highlight: 'operados por IA',
    sub: 'Pipeline de leads, qualificação, atividades, automações, formulários de captura, dashboards comerciais e insights de pipeline. O Agente Comercial da Orbit opera todo o ciclo de vendas — sem depender do humor do vendedor.',
    alternateNames: ['IA Comercial', 'Agente de Vendas', 'CRM com IA'],
    capacidades: [
      { fa: 'fa-solid fa-diagram-project', titulo: 'Pipeline de leads',       desc: 'Funil configurável por equipe, com estágios, scores e SLAs.' },
      { fa: 'fa-solid fa-user-tag',        titulo: 'Detalhes do lead',        desc: 'Ficha completa com histórico, atividades, documentos e contexto enriquecido por IA.' },
      { fa: 'fa-solid fa-bolt',            titulo: 'Automações de CRM',       desc: 'Disparo automático de tarefas, e-mails e mudanças de estágio com base em regras.' },
      { fa: 'fa-solid fa-pen-to-square',   titulo: 'Web Forms',               desc: 'Formulários de captura plugáveis em site e LP com criação de lead automática.' },
      { fa: 'fa-solid fa-code',            titulo: 'API + Webhooks',          desc: 'Integração nativa com qualquer fonte de lead externa.' },
      { fa: 'fa-solid fa-chart-bar',       titulo: 'Relatórios comerciais',   desc: 'Conversão por etapa, ticket médio, ciclo de vendas, cobertura de pipeline.' },
      { fa: 'fa-solid fa-pen-fancy',       titulo: 'Provedores de assinatura',desc: 'Integração com DocuSign, ClickSign etc. pra fechamento sem fricção.' },
      { fa: 'fa-solid fa-brain',           titulo: 'AI Pipeline Insights',    desc: 'Olívia identifica oportunidades em risco, prioriza atividade do dia, sugere ações.' },
    ],
    integracoes: [
      { par: 'Comercial + Financeiro',  caso: 'Venda dispara fatura',          desc: 'Venda fechada dispara fatura e atualiza projeção de caixa automaticamente — sem digitação dupla.' },
      { par: 'Comercial + Documentos',  caso: 'Contratos gerados sozinhos',    desc: 'Contrato e proposta gerados automaticamente com dados do lead — assinatura digital integrada.' },
      { par: 'Comercial + Processos',   caso: 'Onboarding automático',         desc: 'Onboarding de cliente disparado quando venda fecha — workflow padronizado, sem esquecimento.' },
      { par: 'Comercial + Estratégico', caso: 'Meta ao pipeline em tempo real',desc: 'Meta de receita conectada ao pipeline em tempo real — projeção dinâmica de fechamento por trimestre.' },
    ],
    casos: [
      { titulo: 'Vendedor não preenche CRM',                            desc: 'Agente captura atividade automaticamente (e-mails, ligações sincronizadas), reduz preenchimento manual em 60% — aderência sobe de 30% pra 90%.' },
      { titulo: 'Pipeline imprevisível',                                desc: 'Agente projeta cenários de fechamento com confiança estatística, antecipa risco de não bater meta em 8–12 semanas — antes de ser tarde.' },
      { titulo: 'Liderança comercial gasta sexta inteira gerando relatório', desc: 'Agente entrega relatório semanal pronto, com análise causal de desvios — liderança usa o tempo pra ação, não pra Excel.' },
    ],
    faqs: [
      { q: 'Substitui o RD Station ou HubSpot?',                a: 'Para empresa B2B brasileira de médio porte, sim — com vantagem em integração nativa com financeiro, processos e indicadores.' },
      { q: 'Como integra com WhatsApp?',                         a: 'Conectores nativos com WhatsApp Business API e plataformas de mensageria.' },
      { q: 'O Agente qualifica leads sozinho?',                  a: 'Sim, com base em ICP definido pela empresa. Cruza dados públicos, aplica score, atribui ao vendedor certo.' },
      { q: 'Posso ter múltiplos pipelines?',                     a: 'Sim. Pipelines diferentes por produto, segmento, time, geografia. Sem limite.' },
      { q: 'Como funciona a comissão?',                          a: 'Comissão amarrada ao registro no CRM. Agente calcula automaticamente baseado em regras configuradas.' },
      { q: 'Integra com marketing?',                             a: 'Sim. Web forms, automações, atribuição multi-touch — tudo nativo no Agente Comercial.' },
      { q: 'Tem aplicativo mobile?',                             a: 'Sim. Vendedor opera em campo com mobile-first.' },
      { q: 'Quanto tempo de adoção real?',                       a: 'Aderência sobe de 30–50% pra 80–90% em 60–90 dias com a redução de fricção de preenchimento via IA.' },
    ],
    blog: [
      { title: 'Como organizar a prospecção e o follow-up de vendas',           slug: 'como-organizar-prospeccao-vendas-b2b', cat: 'Estratégia' },
      { title: 'Por que seu vendedor não preenche o CRM',                       slug: 'vendedor-nao-preenche-crm', cat: 'Estratégia' },
      { title: 'CRM para empresa B2B: como escolher em 2026',                   slug: 'crm-empresa-b2b-como-escolher', cat: 'Estratégia' },
      { title: 'Por que vendas, marketing e operações vivem em conflito',       slug: 'vendas-marketing-operacoes-conflito', cat: 'Estratégia' },
      { title: 'Como criar indicadores que conectam com a operação',            slug: 'como-criar-indicadores-empresa', cat: 'Indicadores' },
      { title: 'Plano de ação executável',                                      slug: 'plano-de-acao-executavel', cat: 'Estratégia' },
    ],
  },

  // ─────────────────────── 7.4 Agente de Processos ───────────────────────
  processos: {
    slug: 'processos',
    nome: 'Agente de Processos',
    pill: 'Processos · Tarefas · Problemas',
    fa: 'fa-solid fa-diagram-project',
    metaTitle: 'Agente de Processos: BPMN e workflow operados por IA | Orbit',
    metaDesc: 'Mapeamento, execução e otimização de processos da empresa. O Agente de Processos da Orbit transforma processo manual em workflow inteligente coordenado pela Olívia.',
    h1: 'Agente de Processos: BPMN, instruções de trabalho e tarefas',
    h1Highlight: 'operados por IA',
    sub: 'Mapeie processos em BPMN, gere instruções de trabalho, distribua tarefas, monitore execução, identifique gargalos e proponha otimização — tudo coordenado pelo Agente de Processos junto com a Olívia.',
    alternateNames: ['IA de Processos', 'Agente BPMN', 'Workflow com IA'],
    capacidades: [
      { fa: 'fa-solid fa-diagram-project',     titulo: 'Mapeamento BPMN',           desc: 'Editor visual BPMN 2.0 com geração assistida por IA.' },
      { fa: 'fa-solid fa-book-open',           titulo: 'Instruções de Trabalho',    desc: 'POPs versionados, vinculados ao processo correspondente.' },
      { fa: 'fa-solid fa-recycle',             titulo: 'Ciclo de Vida da Informação',desc: 'Política de criação, revisão, arquivamento e descarte.' },
      { fa: 'fa-solid fa-circle-play',         titulo: 'Execução de processos',     desc: 'Cada processo roda como workflow com responsável, prazo, indicador.' },
      { fa: 'fa-solid fa-square-check',        titulo: 'Painel de tarefas',         desc: 'Visão consolidada de todas tarefas, prazos, prioridades.' },
      { fa: 'fa-solid fa-triangle-exclamation',titulo: 'Problemas operacionais',    desc: 'Repositório de RCA com hipóteses, ações, resolução.' },
      { fa: 'fa-solid fa-brain',               titulo: 'AI Generate Processes',     desc: 'Olívia entrevista o time e gera mapeamento BPMN inicial.' },
      { fa: 'fa-solid fa-bolt',                titulo: 'AI Generate BPMN',          desc: 'Atualização e refinamento de diagrama automaticamente.' },
    ],
    integracoes: [
      { par: 'Processos + Comercial',  caso: 'Onboarding ao fechar venda',    desc: 'Fechamento de venda dispara processo de onboarding padronizado — sem esquecer etapa, com indicadores de SLA.' },
      { par: 'Processos + Financeiro', caso: 'Aprovação no fluxo',            desc: 'Workflow de aprovação financeira ligado a processo — autorização documentada, com trilha auditável.' },
      { par: 'Processos + Documentos', caso: 'POPs vinculados',               desc: 'POPs vinculados aos processos correspondentes — colaborador vê instrução enquanto executa, não em PDF separado.' },
      { par: 'Processos + Indicadores',caso: 'KPI por processo',              desc: 'Cada processo gera KPI de SLA, taxa de erro, tempo de execução — visibilidade contínua sem planilha.' },
    ],
    casos: [
      { titulo: 'Empresa cresceu rápido sem processo padronizado', desc: 'Agente entrevista time, gera mapeamento BPMN inicial, ancora execução em sistema em 30 dias — sem precisar consultor externo.' },
      { titulo: 'Processo existe em PDF mas ninguém segue',        desc: 'Agente leva o POP pra dentro do workflow operacional — time vê passo a passo enquanto executa, em vez de buscar manual.' },
      { titulo: 'Empresa com gargalo recorrente',                  desc: 'Agente identifica etapa que mais atrasa, propõe automação ou redesenho — análise causal com base em dados de execução.' },
    ],
    faqs: [
      { q: 'Preciso saber BPMN pra usar?',                  a: 'Não. Agente gera o diagrama por entrevista conversacional. Você revisa.' },
      { q: 'Substitui Bizagi ou Camunda?',                  a: 'Para empresa B2B brasileira de médio porte, sim. Para processos super-complexos de empresa grande, complementa.' },
      { q: 'Como aderência aos processos sobe?',            a: 'Processo executado dentro do sistema (não PDF). Time vê próximo passo enquanto trabalha.' },
      { q: 'Posso versionar processos?',                    a: 'Sim. Cada versão é histórico auditável, com data de revisão e responsável.' },
      { q: 'Identifica gargalo automaticamente?',           a: 'Sim. Cruza dados de execução e identifica etapas com tempo médio ou taxa de erro alta.' },
      { q: 'Funciona pra processo industrial?',             a: 'Bom pra processo administrativo, comercial, financeiro, RH. Processo industrial pesado pode complementar com MES dedicado.' },
      { q: 'Cria checklist automaticamente?',               a: 'Sim. AI Generate Checklist transforma instrução em checklist executável.' },
      { q: 'Tempo até primeiro processo no ar?',            a: '7–14 dias por processo crítico.' },
    ],
    blog: [
      { title: 'Como mapear processos da empresa usando BPMN',                  slug: 'como-mapear-processos-empresa-bpmn', cat: 'Estratégia' },
      { title: 'Por que ninguém na empresa segue processo definido',            slug: 'ninguem-segue-processo-empresa', cat: 'Estratégia' },
      { title: 'Software de BPMS: como escolher',                                slug: 'software-bpms-como-escolher', cat: 'Estratégia' },
      { title: 'Como organizar os processos de uma empresa que cresceu rápido', slug: 'como-organizar-processos-empresa-cresceu-rapido', cat: 'Estratégia' },
      { title: 'Por que processos manuais estão travando o crescimento',        slug: 'processos-manuais-empresa', cat: 'Estratégia' },
      { title: 'Como automatizar processos da empresa',                          slug: 'como-automatizar-processos-empresa', cat: 'Estratégia' },
    ],
  },

  // ─────────────────────── 7.5 Agente de Pessoas ───────────────────────
  pessoas: {
    slug: 'pessoas',
    nome: 'Agente de Pessoas',
    pill: 'Pessoas · PDI · Treinamentos · Departamentos',
    fa: 'fa-solid fa-users',
    metaTitle: 'Agente de Pessoas: RH, PDI e treinamentos operados por IA | Orbit',
    metaDesc: 'Colaboradores, cargos, organograma, PDI, treinamentos. O Agente de Pessoas opera a gestão de RH estratégico junto com seu time, coordenado pela Olívia.',
    h1: 'Agente de Pessoas: RH, desenvolvimento e cultura',
    h1Highlight: 'operados por IA',
    sub: 'Colaboradores, cargos, organograma, planos de desenvolvimento, treinamentos, localidades e departamentos. O Agente de Pessoas opera o RH estratégico — enquanto sua equipe foca em cultura, liderança e conversas difíceis.',
    alternateNames: ['IA de Pessoas', 'Agente de RH', 'Gestão de Pessoas com IA'],
    capacidades: [
      { fa: 'fa-solid fa-users',           titulo: 'Colaboradores',            desc: 'Cadastro completo, ciclo de vida e histórico de cada pessoa.' },
      { fa: 'fa-solid fa-sitemap',         titulo: 'Cargos e Organograma',     desc: 'Estrutura organizacional viva, com responsabilidades e níveis.' },
      { fa: 'fa-solid fa-bullseye',        titulo: 'PDI (visão gestor)',       desc: 'Plano de desenvolvimento por colaborador, com metas, prazos e revisão.' },
      { fa: 'fa-solid fa-book',            titulo: 'PDI (visão colaborador)',  desc: 'Cada pessoa acessa seu plano, atualiza progresso, registra aprendizado.' },
      { fa: 'fa-solid fa-graduation-cap',  titulo: 'Treinamentos',             desc: 'Trilhas formais, microlearning, certificações.' },
      { fa: 'fa-solid fa-building',        titulo: 'Departamentos',            desc: 'Estrutura por área, com líder, integrantes e KPIs.' },
      { fa: 'fa-solid fa-location-dot',    titulo: 'Localidades',              desc: 'Multi-unidade, multi-país, com regras locais.' },
      { fa: 'fa-solid fa-brain',           titulo: 'Generate PDI Recommendation',desc: 'Olívia sugere PDI baseado em perfil, performance e aspiração.' },
    ],
    integracoes: [
      { par: 'Pessoas + Estratégico', caso: 'Competências por objetivo',     desc: 'Competências necessárias por objetivo estratégico mapeadas em PDIs — desenvolvimento alinhado à estratégia.' },
      { par: 'Pessoas + R&S',         caso: 'Contratação vira trilha',       desc: 'Perfil de contratação vincula ao cargo e à trilha de desenvolvimento — onboarding com PDI pronto.' },
      { par: 'Pessoas + Processos',   caso: 'Responsável por processo',      desc: 'Responsabilidade em processo vinculada a colaborador específico — accountability claro, sem ambiguidade.' },
      { par: 'Pessoas + Reuniões',    caso: 'Ações de 1:1 rastreáveis',      desc: 'Ações de pessoas registradas em reuniões 1:1 ficam rastreáveis — feedback contínuo virou execução.' },
    ],
    casos: [
      { titulo: 'Empresa perdendo talento sem entender por quê',  desc: 'Agente cruza sinais (engajamento, feedback, atividade) e identifica risco de saída 60–90 dias antes — tempo de agir.' },
      { titulo: 'PDI virou ritual anual de RH',                   desc: 'Agente conduz cadência trimestral viva, sugere ações, mede execução — PDI sai do papel e entra na rotina.' },
      { titulo: 'Empresa multi-unidade sem visão consolidada',    desc: 'Agente entrega dashboard único: turnover, eNPS, headcount por unidade — comparativo entre filiais com 1 clique.' },
    ],
    faqs: [
      { q: 'Substitui Convenia ou Gupy?',                a: 'Para empresa B2B de médio porte focada em RH estratégico (não só folha), sim — com vantagem em integração com financeiro, estratégia e indicadores.' },
      { q: 'Como detecta risco de saída?',                a: 'Combina indicadores comportamentais (engajamento em reuniões, atividade, feedback, performance) com padrão histórico de desligamentos.' },
      { q: 'Funciona pra empresa multi-unidade?',         a: 'Sim, com regras de visibilidade e governança por unidade.' },
      { q: 'Tem app pra colaborador?',                    a: 'Sim. PDI, treinamentos, organograma — mobile-first.' },
      { q: 'Integra com folha de pagamento?',             a: 'Sim, via API e conectores.' },
      { q: 'Quem cria o PDI?',                            a: 'Líder e colaborador cocriam. Agente sugere conteúdo baseado em perfil e aspiração.' },
      { q: 'Os treinamentos são gravados ou ao vivo?',    a: 'Ambos. Suporta cursos próprios, vídeos, certificações externas, microlearning.' },
      { q: 'Em quanto tempo vejo redução de turnover?',   a: '6–12 meses com PDI vivo e ritual de 1:1 instituído.' },
    ],
    blog: [
      { title: 'Como reter talentos qualificados na sua empresa',  slug: 'como-reter-talentos-empresa', cat: 'Estratégia' },
      { title: 'Por que sua empresa perde os melhores talentos',   slug: 'perder-talentos-para-concorrentes', cat: 'Estratégia' },
      { title: 'Software de RH para empresa B2B: como escolher',   slug: 'software-rh-como-escolher', cat: 'Estratégia' },
      { title: 'Como criar PDI que efetivamente funciona',         slug: 'pdi-funcionarios-como-criar', cat: 'Estratégia' },
      { title: 'Por que treinamento corporativo não vira mudança', slug: 'treinamento-corporativo-nao-funciona', cat: 'Estratégia' },
      { title: 'Plataforma de treinamento corporativo',            slug: 'plataforma-treinamento-corporativo', cat: 'Estratégia' },
    ],
  },

  // ─────────────────────── 7.6 Agente de R&S ───────────────────────
  recrutamento: {
    slug: 'recrutamento',
    nome: 'Agente de R&S',
    pill: 'Vagas · Candidatos · Recrutamento',
    fa: 'fa-solid fa-user-plus',
    metaTitle: 'Agente de R&S: recrutamento e seleção operados por IA | Orbit',
    metaDesc: 'Vagas, candidatos, triagem de CV por IA, etapas seletivas, relatórios. O Agente de R&S opera o ciclo de recrutamento completo coordenado pela Olívia.',
    h1: 'Agente de R&S: recrutamento e seleção',
    h1Highlight: 'operados por um especialista digital',
    sub: 'Da abertura de vaga ao fechamento, o Agente de R&S da Orbit opera o ciclo completo — descrição inteligente da vaga, triagem de CV por IA, etapas seletivas, scorecards, comunicação com candidato — tudo coordenado pela Olívia, junto com o seu time de RH.',
    alternateNames: ['IA de Recrutamento', 'Agente de Seleção', 'ATS com IA'],
    capacidades: [
      { fa: 'fa-solid fa-file-circle-plus', titulo: 'Geração de descrição de vaga',desc: 'IA cria descrição completa a partir do cargo + perfil desejado.' },
      { fa: 'fa-solid fa-people-group',     titulo: 'Pipeline de candidatos',     desc: 'Estágios configuráveis, scorecards, decisões.' },
      { fa: 'fa-solid fa-brain',            titulo: 'Triagem de CV por IA',       desc: 'Análise automática de aderência ao perfil da vaga.' },
      { fa: 'fa-solid fa-user-check',       titulo: 'Análise individual',         desc: 'Score por candidato, justificativa, perguntas sugeridas pra entrevista.' },
      { fa: 'fa-solid fa-microphone',       titulo: 'Entrevistas',                desc: 'Agendamento, roteiro, notas, scorecard pós-entrevista.' },
      { fa: 'fa-solid fa-envelope',         titulo: 'Comunicação automática',     desc: 'Status, próximos passos, feedback — sem deixar candidato no escuro.' },
      { fa: 'fa-solid fa-chart-bar',        titulo: 'Relatórios de R&S',          desc: 'Tempo de fechamento, conversão por etapa, fonte de candidato.' },
      { fa: 'fa-solid fa-bookmark',         titulo: 'Banco de talentos',          desc: 'Candidatos qualificados que não fecharam ficam para vagas futuras.' },
    ],
    integracoes: [
      { par: 'R&S + Pessoas',     caso: 'Onboarding com PDI inicial',  desc: 'Candidato aprovado vira colaborador com trilha de PDI inicial — sem ruptura entre seleção e desenvolvimento.' },
      { par: 'R&S + Estratégico', caso: 'Vagas críticas estratégicas', desc: 'Vagas críticas ligadas a objetivos estratégicos da empresa — priorização baseada em impacto.' },
      { par: 'R&S + Financeiro',  caso: 'Custo em centro de custo',    desc: 'Custo de R&S monitorado em centro de custo — visibilidade do orçamento por contratação.' },
      { par: 'R&S + Documentos',  caso: 'Propostas e contratos prontos',desc: 'Propostas, NDA, contratos gerados automaticamente — fechamento ágil.' },
    ],
    casos: [
      { titulo: 'R&S sem processo, contratando por urgência', desc: 'Agente estrutura ciclo padronizado, reduz tempo médio de fechamento em 30–40% — processo consistente em todas as vagas.' },
      { titulo: 'Tempo gasto triando CV é absurdo',           desc: 'Agente reduz 200 CVs pra top 20 em segundos, com justificativa — recrutador foca em entrevistas, não em screening.' },
      { titulo: 'Candidato bom é perdido por demora',         desc: 'Agente automatiza comunicação por estágio, mantém candidato engajado — taxa de aceitação sobe.' },
    ],
    faqs: [
      { q: 'Substitui Gupy ou Kenoby?',                       a: 'Para empresa B2B brasileira de médio porte, sim — com vantagem em integração com PDI, organograma e financeiro.' },
      { q: 'A IA discrimina candidatos?',                      a: 'Não. Agente avalia aderência técnica e comportamental ao perfil. Critérios são auditáveis e ajustáveis.' },
      { q: 'Como triagem de CV funciona?',                     a: 'Olívia compara CV ao perfil definido na vaga (skills, experiência, comportamento) e gera score de aderência.' },
      { q: 'Posso definir scorecard de entrevista?',           a: 'Sim. Critérios configuráveis por cargo, com pesos.' },
      { q: 'Integra com LinkedIn?',                            a: 'Sim, via importação de candidatos e integração com sourcing.' },
      { q: 'O candidato vê o status dele?',                    a: 'Sim. Portal de candidato com transparência sobre próximos passos.' },
      { q: 'Tem banco de talentos?',                           a: 'Sim. Candidatos bons que não fecharam ficam classificados pra próximas vagas similares.' },
      { q: 'Reduz tempo de fechamento em quanto?',             a: 'Tipicamente 30–50% no ciclo médio em 60–90 dias de uso.' },
    ],
    blog: [
      { title: 'Como reter talentos qualificados',                  slug: 'como-reter-talentos-empresa', cat: 'Estratégia' },
      { title: 'Por que sua empresa perde os melhores talentos',    slug: 'perder-talentos-para-concorrentes', cat: 'Estratégia' },
      { title: 'Software de RH para empresa B2B: como escolher',    slug: 'software-rh-como-escolher', cat: 'Estratégia' },
      { title: 'Como criar PDI que efetivamente funciona',          slug: 'pdi-funcionarios-como-criar', cat: 'Estratégia' },
      { title: 'Por que treinamento corporativo não vira mudança',  slug: 'treinamento-corporativo-nao-funciona', cat: 'Estratégia' },
      { title: 'AI Operating System for Business',                  slug: 'ai-operating-system-business', cat: 'IA' },
    ],
  },

  // ─────────────────────── 7.7 Agente de Projetos ───────────────────────
  projetos: {
    slug: 'projetos',
    nome: 'Agente de Projetos',
    pill: 'Projetos',
    fa: 'fa-solid fa-table-columns',
    metaTitle: 'Agente de Projetos: Gantt, dependências e execução operados por IA | Orbit',
    metaDesc: 'Crie, execute e monitore projetos com Gantt, dependências, membros, automações. O Agente de Projetos opera o ciclo completo coordenado pela Olívia.',
    h1: 'Agente de Projetos: gestão de projetos',
    h1Highlight: 'operada por IA',
    sub: 'Da criação ao encerramento, o Agente de Projetos da Orbit opera o ciclo completo — escopo, cronograma, dependências, membros, automações, riscos. Coordenado pela Olívia, integrado com tudo na empresa.',
    alternateNames: ['IA de Projetos', 'Project Management com IA', 'Gantt automatizado'],
    capacidades: [
      { fa: 'fa-solid fa-folder-plus',         titulo: 'Criação de projeto',        desc: 'Template, escopo, prazos, responsáveis, orçamento.' },
      { fa: 'fa-solid fa-chart-gantt',         titulo: 'Gantt + dependências',      desc: 'Cronograma visual com dependências entre tarefas.' },
      { fa: 'fa-solid fa-users-gear',          titulo: 'Membros e acesso',          desc: 'Time interno + convites externos, com expiração e governança.' },
      { fa: 'fa-solid fa-bolt',                titulo: 'Automações de projeto',     desc: 'Disparo de tarefas, notificações, mudanças de fase automatizadas.' },
      { fa: 'fa-solid fa-table-cells-large',   titulo: 'Painel do projeto',         desc: 'Visão consolidada: status, progresso, riscos, próximos marcos.' },
      { fa: 'fa-solid fa-user-xmark',          titulo: 'Suspender/reativar membros',desc: 'Controle granular durante mudanças de equipe.' },
      { fa: 'fa-solid fa-download',            titulo: 'Exportação Gantt',          desc: 'PDF/PNG pra apresentação executiva.' },
      { fa: 'fa-solid fa-link',                titulo: 'Tarefas conectadas',        desc: 'Tarefas do projeto vinculadas a processos, indicadores, riscos.' },
    ],
    integracoes: [
      { par: 'Projetos + Estratégico', caso: 'Projeto vinculado ao objetivo', desc: 'Projetos vinculados a objetivos estratégicos da empresa — todo projeto tem propósito mapeado.' },
      { par: 'Projetos + Financeiro',  caso: 'Custo no centro de custo',      desc: 'Orçamento e custo real do projeto monitorados em centro de custo — desvio detectado cedo.' },
      { par: 'Projetos + Pessoas',     caso: 'Alocação inteligente',          desc: 'Alocação de membros respeitando carga, skill e PDI — sem sobrecarregar quem já está em outro projeto.' },
      { par: 'Projetos + Riscos',      caso: 'Risco do projeto rastreado',    desc: 'Riscos do projeto registrados e monitorados no Agente de Riscos — governança contínua.' },
    ],
    casos: [
      { titulo: 'Empresa rodando vários projetos em paralelo',  desc: 'Agente entrega portfólio único com status, dependências e riscos — visão executiva pra reunião de diretoria.' },
      { titulo: 'Projeto crítico sem dono claro',                desc: 'Agente força definição de RACI por tarefa — accountability documentada, decisão escalonada quando necessário.' },
      { titulo: 'Projeto com cliente externo',                   desc: 'Agente entrega portal de cliente com escopo, marcos, entregas — governança auditável durante todo o projeto.' },
    ],
    faqs: [
      { q: 'Substitui Asana ou Monday?',                  a: 'Para empresa B2B brasileira focada em gestão integrada (não só projetos), sim — com vantagem em conexão com financeiro, processos e pessoas.' },
      { q: 'Tem Kanban e Gantt?',                         a: 'Sim, ambos. Gantt com dependências e caminho crítico, Kanban por fase ou time.' },
      { q: 'Posso convidar cliente externo?',             a: 'Sim. Convites externos com expiração, acesso controlado, governança auditável.' },
      { q: 'Como o Agente identifica risco de atraso?',   a: 'Cruza progresso real vs cronograma, carga dos membros e dependências.' },
      { q: 'Integra com calendário?',                     a: 'Sim. Tarefas e marcos sincronizam com Google Calendar, Outlook.' },
      { q: 'Tem template de projeto?',                    a: 'Sim. Templates por tipo de projeto, configuráveis pela empresa.' },
      { q: 'Como custo do projeto é monitorado?',         a: 'Lançamentos do financeiro vinculados ao centro de custo do projeto.' },
      { q: 'Posso exportar Gantt?',                       a: 'Sim. PDF e PNG, prontos pra apresentação executiva.' },
    ],
    blog: [
      { title: 'Plano de ação executável',                                       slug: 'plano-de-acao-executavel', cat: 'Estratégia' },
      { title: 'Como organizar os processos de uma empresa que cresceu rápido',  slug: 'como-organizar-processos-empresa-cresceu-rapido', cat: 'Estratégia' },
      { title: 'Como criar indicadores que conectam com a operação',             slug: 'como-criar-indicadores-empresa', cat: 'Indicadores' },
      { title: 'Como tirar o planejamento estratégico do papel',                 slug: 'tirar-planejamento-estrategico-do-papel', cat: 'Estratégia' },
      { title: 'Como integrar sistemas empresariais',                            slug: 'como-integrar-sistemas-empresa', cat: 'Estratégia' },
      { title: 'AI Operating System for Business',                               slug: 'ai-operating-system-business', cat: 'IA' },
    ],
  },

  // ─────────────────────── 7.8 Agente de Reuniões ───────────────────────
  reunioes: {
    slug: 'reunioes',
    nome: 'Agente de Reuniões',
    pill: 'Reuniões · Ações',
    fa: 'fa-solid fa-calendar-days',
    metaTitle: 'Agente de Reuniões: pauta, atas e ações operadas por IA | Orbit',
    metaDesc: 'Pauta, atas, ações pós-reunião, transcrição com IA, extração automática de tarefas. O Agente de Reuniões transforma reunião em execução.',
    h1: 'Agente de Reuniões: pauta, ata e ações',
    h1Highlight: 'operados por IA',
    sub: 'Pauta colaborativa, transcrição inteligente, extração automática de decisões e ações, encaminhamento por responsável. O Agente de Reuniões transforma horas de discussão em execução rastreável.',
    alternateNames: ['IA de Reuniões', 'Agente de Atas', 'Transcrição por IA'],
    capacidades: [
      { fa: 'fa-solid fa-list',             titulo: 'Pauta colaborativa',    desc: 'Itens, tempos, responsáveis — montada antes da reunião.' },
      { fa: 'fa-solid fa-folder',           titulo: 'Repositório de reuniões',desc: 'Histórico completo por série, time, projeto.' },
      { fa: 'fa-solid fa-microphone-lines', titulo: 'Transcrição com IA',    desc: 'Áudio vira texto automaticamente.' },
      { fa: 'fa-solid fa-comment',          titulo: 'Chat com transcrição',  desc: 'Pergunte ao Agente sobre o que foi discutido.' },
      { fa: 'fa-solid fa-circle-check',     titulo: 'Extração de tarefas',   desc: 'IA identifica ações decididas e cria tarefa pra responsável.' },
      { fa: 'fa-solid fa-layer-group',      titulo: 'Ações em massa',        desc: 'Múltiplas ações de reunião gerenciadas em painel único.' },
      { fa: 'fa-solid fa-scale-balanced',   titulo: 'Decisões registradas',  desc: 'Toda decisão fica rastreável com contexto.' },
      { fa: 'fa-solid fa-paper-plane',      titulo: 'Encaminhamento automático',desc: 'Ata enviada por e-mail, ações criadas no painel de tarefas.' },
    ],
    integracoes: [
      { par: 'Reuniões + Pessoas',    caso: '1:1 ligado ao PDI',        desc: 'Ações de 1:1 vinculadas ao PDI do colaborador — desenvolvimento contínuo, feedback que vira execução.' },
      { par: 'Reuniões + Projetos',   caso: 'Reunião de projeto',       desc: 'Reuniões de projeto registradas com escopo e marcos — histórico de decisões ancorado ao projeto.' },
      { par: 'Reuniões + Estratégico',caso: 'Comitê conectado ao plano',desc: 'Reuniões de comitê executivo conectadas ao plano — pauta automática baseada em desvios estratégicos.' },
      { par: 'Reuniões + Processos',  caso: 'Reunião recorrente',       desc: 'Reuniões recorrentes integradas a processos da empresa — pauta padronizada, sem improviso.' },
    ],
    casos: [
      { titulo: 'Reuniões viram conversa sem execução',                desc: 'Agente extrai decisões e ações, cria tarefas automaticamente, acompanha execução — sem precisar de scribe humano.' },
      { titulo: 'Time perde tempo lembrando o que ficou combinado',    desc: 'Repositório central pesquisável, com transcrição e contexto — busca em linguagem natural.' },
      { titulo: 'CEO quer revisar histórico de decisão estratégica',   desc: 'Chat com transcrição permite perguntar "quando discutimos X?" e obter resposta com contexto — memória organizacional pesquisável.' },
    ],
    faqs: [
      { q: 'Substitui Fellow ou Otter?',                             a: 'Para empresa B2B brasileira focada em gestão integrada, sim — com vantagem em conexão com tarefas, projetos e estratégia.' },
      { q: 'Como funciona a transcrição?',                           a: 'Áudio é processado por IA e vira texto pesquisável. Em português brasileiro.' },
      { q: 'Posso editar a ata gerada?',                             a: 'Sim. Ata gerada é rascunho. Time revisa, aprova, distribui.' },
      { q: 'As ações criadas vão pra onde?',                         a: 'Pro painel de tarefas do responsável + integração com calendário.' },
      { q: 'Reuniões recorrentes funcionam?',                        a: 'Sim. Séries de reuniões com pauta padrão e histórico de execução.' },
      { q: 'Funciona com Google Meet e Zoom?',                       a: 'Sim, via integração ou upload de gravação.' },
      { q: 'Tem chat com a transcrição?',                            a: 'Sim. Pergunte ao Agente sobre o que foi discutido em qualquer reunião.' },
      { q: 'Em quanto tempo vejo redução de "reunião sem ação"?',    a: 'Tipicamente 60–90 dias com o ritual instituído.' },
    ],
    blog: [
      { title: 'Como resolver a falta de comunicação entre setores',         slug: 'comunicacao-entre-setores-empresa', cat: 'Estratégia' },
      { title: 'Por que vendas, marketing e operações vivem em conflito',    slug: 'vendas-marketing-operacoes-conflito', cat: 'Estratégia' },
      { title: 'Plataformas para alinhar setores: como escolher',            slug: 'plataformas-comunicacao-corporativa', cat: 'Estratégia' },
      { title: 'Como tirar o planejamento estratégico do papel',             slug: 'tirar-planejamento-estrategico-do-papel', cat: 'Estratégia' },
      { title: 'Por que 70% dos planejamentos estratégicos morrem',          slug: 'planejamento-estrategico-morre-terceiro-mes', cat: 'Estratégia' },
      { title: 'Plano de ação executável',                                   slug: 'plano-de-acao-executavel', cat: 'Estratégia' },
    ],
  },

  // ─────────────────────── 7.9 Agente de Documentos ───────────────────────
  documentos: {
    slug: 'documentos',
    nome: 'Agente de Documentos',
    pill: 'Documentos · Workflows',
    fa: 'fa-solid fa-file-lines',
    metaTitle: 'Agente de Documentos: repositório e workflows operados por IA | Orbit',
    metaDesc: 'Repositório centralizado, workflows de aprovação, ciclo de vida da informação, assinaturas digitais. O Agente de Documentos opera a governança documental.',
    h1: 'Agente de Documentos: governança documental',
    h1Highlight: 'operada por IA',
    sub: 'Repositório centralizado, workflows de aprovação, versionamento, assinaturas digitais e ciclo de vida da informação. O Agente de Documentos opera a governança documental — coordenado pela Olívia.',
    alternateNames: ['IA de Documentos', 'Agente de GED', 'Gestão Documental com IA'],
    capacidades: [
      { fa: 'fa-solid fa-folder-tree',          titulo: 'Repositório centralizado',  desc: 'Estrutura hierárquica configurável por área e tipo.' },
      { fa: 'fa-solid fa-tags',                 titulo: 'Categorias',                desc: 'Classificação por tipo de documento, com políticas específicas.' },
      { fa: 'fa-solid fa-code-pull-request',    titulo: 'Workflows de aprovação',    desc: 'Fluxo configurável de revisão e aprovação.' },
      { fa: 'fa-solid fa-clock-rotate-left',    titulo: 'Versionamento',             desc: 'Histórico completo de versões com data, autor e diff.' },
      { fa: 'fa-solid fa-check',                titulo: 'Aprovações de documentos', desc: 'Trilha auditável de quem aprovou e quando.' },
      { fa: 'fa-solid fa-pen-fancy',            titulo: 'Assinatura digital',        desc: 'Integração nativa com provedores de assinatura jurídica.' },
      { fa: 'fa-solid fa-share-nodes',          titulo: 'Compartilhamento público',  desc: 'Links públicos auditáveis e revogáveis.' },
      { fa: 'fa-solid fa-magnifying-glass',     titulo: 'Busca semântica',           desc: 'Pergunte em linguagem natural — Olívia encontra o documento.' },
    ],
    integracoes: [
      { par: 'Documentos + Comercial', caso: 'Proposta com dados do CRM',  desc: 'Propostas e contratos gerados com dados do CRM — sem digitação manual, com versionamento automático.' },
      { par: 'Documentos + Financeiro',caso: 'NFs ancoradas ao lançamento',desc: 'NFs e comprovantes ancorados aos lançamentos — trilha auditável pronta pra fiscal.' },
      { par: 'Documentos + Processos', caso: 'POPs no processo',           desc: 'POPs vinculados aos processos correspondentes — colaborador acessa instrução enquanto executa.' },
      { par: 'Documentos + R&S',       caso: 'NDA, oferta, contrato',      desc: 'Ofertas, NDA, contratos de admissão gerenciados — onboarding sem improviso documental.' },
    ],
    casos: [
      { titulo: 'Documentos espalhados em Drive + email + WhatsApp',  desc: 'Agente migra pra hub único com estrutura hierárquica clara — busca semântica encontra qualquer arquivo em segundos.' },
      { titulo: 'Time gasta horas procurando documento',              desc: 'Busca semântica em linguagem natural reduz tempo de busca em 80% — pergunte como falaria com colega.' },
      { titulo: 'Auditoria fiscal vai começar',                       desc: 'Agente garante trilha completa de aprovação, versionamento e compliance — auditor pede, sistema entrega.' },
    ],
    faqs: [
      { q: 'Substitui Notion ou Confluence?',          a: 'Para empresa B2B brasileira que quer documentação integrada à operação, sim — com vantagem em workflows nativos com financeiro, processos, RH.' },
      { q: 'Tem busca semântica?',                     a: 'Sim. Olívia entende perguntas em linguagem natural e retorna o documento relevante com contexto.' },
      { q: 'Como assinatura digital funciona?',         a: 'Integração nativa com DocuSign, ClickSign, Adobe Sign e provedores brasileiros.' },
      { q: 'Tem versionamento?',                        a: 'Sim. Histórico completo com diff entre versões.' },
      { q: 'Posso compartilhar documento externo?',     a: 'Sim. Link público com auditoria de acesso, revogável a qualquer momento.' },
      { q: 'Workflow de aprovação tem prazo?',          a: 'Sim. SLA por etapa, com escalonamento se estourar.' },
      { q: 'Suporta OCR de PDF?',                       a: 'Sim. PDFs e imagens viram texto pesquisável.' },
      { q: 'Quanto tempo pra consolidar documentação?', a: '3–6 meses pra empresa de médio porte, em fases.' },
    ],
    blog: [
      { title: 'Como centralizar a documentação da empresa',                       slug: 'como-centralizar-documentacao-empresa', cat: 'Estratégia' },
      { title: 'Por que sua empresa não encontra documento crítico quando precisa',slug: 'encontrar-documento-empresa', cat: 'Estratégia' },
      { title: 'Knowledge base corporativo: como escolher',                         slug: 'knowledge-base-corporativo-como-escolher', cat: 'Estratégia' },
      { title: 'Como organizar os processos de uma empresa que cresceu rápido',     slug: 'como-organizar-processos-empresa-cresceu-rapido', cat: 'Estratégia' },
      { title: 'Como integrar sistemas empresariais',                               slug: 'como-integrar-sistemas-empresa', cat: 'Estratégia' },
      { title: 'Como mapear processos da empresa usando BPMN',                      slug: 'como-mapear-processos-empresa-bpmn', cat: 'Estratégia' },
    ],
  },

  // ─────────────────────── 7.10 Agente de Riscos ───────────────────────
  riscos: {
    slug: 'riscos',
    nome: 'Agente de Riscos',
    pill: 'Riscos · Compliance',
    fa: 'fa-solid fa-shield-halved',
    metaTitle: 'Agente de Riscos: identificação e mitigação operados por IA | Orbit',
    metaDesc: 'Identificação, classificação e mitigação de riscos — operacionais, financeiros, regulatórios. O Agente de Riscos opera governança coordenada pela Olívia.',
    h1: 'Agente de Riscos: gestão de risco',
    h1Highlight: 'operada por IA',
    sub: 'Identifica, classifica, prioriza e monitora riscos operacionais, financeiros, regulatórios e estratégicos. O Agente de Riscos opera a governança de risco — com plano de ação, responsável nomeado e revisão periódica.',
    alternateNames: ['IA de Risco', 'Agente de Compliance', 'GRC com IA'],
    capacidades: [
      { fa: 'fa-solid fa-shield-halved',  titulo: 'Repositório de riscos',     desc: 'Catálogo central por categoria, área e impacto.' },
      { fa: 'fa-solid fa-grip',           titulo: 'Matriz de risco',           desc: 'Probabilidade × impacto, com priorização visual.' },
      { fa: 'fa-solid fa-list-check',     titulo: 'Plano de ação',             desc: 'Ação mitigatória, responsável, prazo, indicador.' },
      { fa: 'fa-solid fa-chart-line',     titulo: 'Monitoramento contínuo',    desc: 'Status do risco atualizado conforme operação.' },
      { fa: 'fa-solid fa-file-lines',     titulo: 'Relatórios de risco',       desc: 'Visão executiva pra board e compliance.' },
      { fa: 'fa-solid fa-link',           titulo: 'Vinculação a processos',    desc: 'Risco amarrado ao processo onde se manifesta.' },
      { fa: 'fa-solid fa-circle-check',   titulo: 'Aprovações de risco',       desc: 'Trilha auditável de quem aceitou risco e por quê.' },
      { fa: 'fa-solid fa-brain',          titulo: 'Detecção por Olívia',       desc: 'IA identifica padrões de risco emergente baseados em operação.' },
    ],
    integracoes: [
      { par: 'Riscos + Financeiro', caso: 'Risco financeiro em tempo real', desc: 'Riscos financeiros (inadimplência, fluxo de caixa) monitorados em tempo real — alertas antes de virar crise.' },
      { par: 'Riscos + Processos',  caso: 'Risco no processo',              desc: 'Riscos vinculados ao processo onde se manifestam — mitigação atacando a raiz, não o sintoma.' },
      { par: 'Riscos + Projetos',   caso: 'Risco do projeto registrado',    desc: 'Riscos do projeto registrados no plano de ação — governança contínua durante a execução.' },
      { par: 'Riscos + Estratégico',caso: 'Risco crítico no comitê',        desc: 'Riscos críticos viram pauta de comitê executivo — decisão informada pela liderança.' },
    ],
    casos: [
      { titulo: 'Empresa cresceu sem mapear riscos',         desc: 'Agente conduz mapeamento inicial em 30 dias com sessão estruturada por área — catálogo central pronto pra revisão executiva.' },
      { titulo: 'Compliance regulatório virou requisito',     desc: 'Agente entrega trilha auditável pra LGPD, ISO, normas setoriais — documentação e evidências organizadas pra auditor.' },
      { titulo: 'Conselho/board exige relatório trimestral',  desc: 'Agente gera relatório executivo pronto, com matriz e plano de ação — sem ninguém montar deck.' },
    ],
    faqs: [
      { q: 'Funciona pra LGPD?',                                   a: 'Sim. Riscos de privacidade, plano de ação, evidências, auditoria.' },
      { q: 'Atende ISO 9001/ISO 27001?',                           a: 'Sim. Estrutura compatível com requisitos das normas.' },
      { q: 'Como a IA detecta risco emergente?',                   a: 'Cruza indicadores operacionais e identifica padrões anômalos antes de virar crise.' },
      { q: 'Tem matriz de risco visual?',                          a: 'Sim. Probabilidade × impacto, configurável.' },
      { q: 'Posso aceitar risco com aprovação documentada?',       a: 'Sim. Trilha auditável de aceitação consciente.' },
      { q: 'Riscos viram tarefas?',                                a: 'Plano de ação vira tarefas no painel de cada responsável.' },
      { q: 'Quem revisa o catálogo?',                              a: 'Liderança em ritual trimestral, com proposta de ajuste pelo Agente.' },
      { q: 'Em quanto tempo tenho mapeamento inicial?',            a: '30–45 dias com sessões estruturadas por área.' },
    ],
    blog: [
      { title: 'Como organizar os processos de uma empresa que cresceu rápido', slug: 'como-organizar-processos-empresa-cresceu-rapido', cat: 'Estratégia' },
      { title: 'Como criar indicadores que conectam com a operação',            slug: 'como-criar-indicadores-empresa', cat: 'Indicadores' },
      { title: 'Por que processos manuais estão travando o crescimento',        slug: 'processos-manuais-empresa', cat: 'Estratégia' },
      { title: 'Como mapear processos da empresa usando BPMN',                  slug: 'como-mapear-processos-empresa-bpmn', cat: 'Estratégia' },
      { title: 'Como integrar sistemas empresariais',                            slug: 'como-integrar-sistemas-empresa', cat: 'Estratégia' },
      { title: 'ERP integrado vs plataforma all-in-one',                         slug: 'erp-vs-plataforma-all-in-one', cat: 'IA' },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// MAPEAMENTO blog-slug → agente (pra link-build reverso)
// Baseado na tabela explícita do playbook seção 8.
// ═══════════════════════════════════════════════════════════════
export const BLOG_TO_AGENTE: Record<string, string> = {
  'tirar-planejamento-estrategico-do-papel':              'estrategico',
  'planejamento-estrategico-morre-terceiro-mes':          'estrategico',
  'plano-de-acao-executavel':                             'estrategico',
  'gestao-financeira-integrada-empresa':                  'financeiro',
  'vendas-boas-caixa-negativo':                           'financeiro',
  'dre-tempo-real':                                       'financeiro',
  'como-organizar-prospeccao-vendas-b2b':                 'comercial',
  'vendedor-nao-preenche-crm':                            'comercial',
  'crm-empresa-b2b-como-escolher':                        'comercial',
  'vendas-marketing-operacoes-conflito':                  'comercial',
  'como-mapear-processos-empresa-bpmn':                   'processos',
  'ninguem-segue-processo-empresa':                       'processos',
  'software-bpms-como-escolher':                          'processos',
  'como-organizar-processos-empresa-cresceu-rapido':      'processos',
  'processos-manuais-empresa':                            'processos',
  'como-automatizar-processos-empresa':                   'processos',
  'como-reter-talentos-empresa':                          'pessoas',
  'perder-talentos-para-concorrentes':                    'pessoas',
  'software-rh-como-escolher':                            'pessoas',
  'pdi-funcionarios-como-criar':                          'pessoas',
  'treinamento-corporativo-nao-funciona':                 'pessoas',
  'plataforma-treinamento-corporativo':                   'pessoas',
  'comunicacao-entre-setores-empresa':                    'reunioes',
  'plataformas-comunicacao-corporativa':                  'reunioes',
  'como-centralizar-documentacao-empresa':                'documentos',
  'encontrar-documento-empresa':                          'documentos',
  'knowledge-base-corporativo-como-escolher':             'documentos',
  'como-integrar-sistemas-empresa':                       'documentos',
  'como-criar-indicadores-empresa':                       'estrategico',
  'indicadores-nao-refletem-realidade':                   'estrategico',
  'ia-agentic-para-ceo-decisao-estrategica':              'estrategico',
  'ai-operating-system-business':                         'estrategico',
  'orbit-vs-sap-salesforce-microsoft':                    'estrategico',
};
