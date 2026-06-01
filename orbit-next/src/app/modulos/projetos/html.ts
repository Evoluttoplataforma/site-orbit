/**
 * Página /modulos/projetos
 * Usa o template padrão de módulo (src/lib/module-page-template.ts).
 */

import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';

const data: PageData = {
  currentSlug: 'projetos',
  isModule: true,

  pill: 'Módulo · Projetos',
  h1Pre: 'Módulo Projetos: gestão integrada',
  h1Highlight: 'com IA',
  h1Post: '.',
  subtitle:
    'Da criação ao encerramento, o módulo opera o ciclo completo, escopo, cronograma, dependências, membros, automações e riscos. <strong>Coordenado pelos agentes do Time Olívia.</strong>',
  heroNote: '⏱️ Gantt + Kanban · Portal do cliente · Riscos por IA',
  heroCtaPrimary: 'QUERO CONHECER PROJETOS',
  heroCtaSecondary: 'Ver 8 funcionalidades',
  heroCredentials: [
    { strong: 'Gantt', label: 'com dependências' },
    { strong: 'Portfólio', label: 'consolidado' },
    { strong: 'Riscos', label: 'antecipados por IA' },
  ],

  funcsBadge: '8 funcionalidades',
  funcsH2Pre: 'O que o módulo de projetos',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'do briefing à entrega',
  funcsIntro:
    'Cada capacidade abaixo é nativa do módulo, conectada aos agentes da Olívia, indicadores e financeiro.',
  funcs: [
    { icon: 'fa-folder-plus', title: 'Criação de projeto', desc: 'Template, escopo, prazos e responsáveis configurados em minutos.' },
    { icon: 'fa-chart-gantt', title: 'Gantt + dependências', desc: 'Cronograma visual com dependências e caminho crítico calculado automaticamente.' },
    { icon: 'fa-users-gear', title: 'Membros e acesso', desc: 'Time interno + convites externos com governança e trilha auditável.' },
    { icon: 'fa-bolt', title: 'Automações', desc: 'Disparo automático de tarefas, notificações e mudanças de fase.' },
    { icon: 'fa-table-columns', title: 'Painel do projeto', desc: 'Status, progresso, riscos e próximos marcos numa visão executiva.' },
    { icon: 'fa-download', title: 'Exportação Gantt', desc: 'PDF e PNG prontos pra apresentação executiva e cliente.' },
    { icon: 'fa-link', title: 'Tarefas conectadas', desc: 'Cada tarefa vinculada a processos, indicadores ou riscos da operação.' },
    { icon: 'fa-clock-rotate-left', title: 'Histórico auditável', desc: 'Tudo registrado, quem mudou o quê, quando e por quê.' },
  ],

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações que o módulo Projetos',
  scenariosH2Highlight: 'desentope',
  scenariosH2Post: 'rápido',
  scenariosIntro:
    'Padrões que se repetem em empresas com vários projetos em paralelo, visibilidade sem virar PMO.',
  scenarios: [
    { tag: 'Portfólio', title: 'Vários projetos em paralelo sem visão consolidada', body: 'O portfólio único mostra status, dependências cruzadas e riscos de todos os projetos numa única tela.' },
    { tag: 'Responsabilidade', title: 'Projeto crítico sem dono claro', body: 'O módulo força definição de RACI por tarefa, ninguém mais "achou que era do outro".' },
    { tag: 'Cliente externo', title: 'Projeto com cliente externo opaco', body: 'Portal do cliente com escopo, marcos e entregas, comunicação centralizada, sem perder informação em e-mail.' },
  ],

  testiH2: 'Quem opera projetos com a Orbit',
  testiIntro: 'PMs e diretores contando o que mudou na rotina.',
  testimonials: [
    { initials: 'LR', quote: '"Tenho 14 projetos rodando em paralelo. Antes era uma planilha por projeto. Hoje vejo o portfólio inteiro numa tela e o risco aparece sozinho."', name: 'Lucas Reis', role: 'PMO · Engesul' },
    { initials: 'TM', quote: '"O portal do cliente mudou minha relação com nossos contratos. Eles param de me ligar pedindo status, abrem o link e veem tudo."', name: 'Tatiana Moreira', role: 'Gerente de Projetos · ProjetaCon' },
    { initials: 'EB', quote: '"O Gantt com dependência cruzando todos os times eliminou uma reunião semanal. A IA me avisa antes do gargalo virar atraso."', name: 'Eduardo Bastos', role: 'Diretor de Operações · BrasilTech' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o módulo Projetos',
  faqIntro: 'As 8 perguntas mais comuns antes de adotar.',
  faqs: [
    { q: 'Substitui Asana ou Monday?', a: 'Para B2B brasileira focada em gestão integrada, sim, e ganha por estar conectado ao financeiro, indicadores e processos sem precisar de Zapier.' },
    { q: 'Tem Kanban e Gantt?', a: 'Sim, os dois, alternáveis na mesma view, com mesma fonte de dados.' },
    { q: 'Posso convidar cliente externo?', a: 'Sim, com governança de permissões e trilha auditável de cada ação.' },
    { q: 'Identifica risco de atraso?', a: 'Sim. A IA cruza progresso, carga de cada membro e dependências pra antecipar gargalo em tempo real.' },
    { q: 'Integra com calendário?', a: 'Sim, Google Calendar e Outlook.' },
    { q: 'Tem template de projeto?', a: 'Sim, configurável por empresa e por tipo de projeto (implantação, evento, obra etc.).' },
    { q: 'Custo do projeto monitorado?', a: 'Sim. Ligado ao centro de custo do módulo financeiro, orçado vs realizado por projeto.' },
    { q: 'Exporta Gantt?', a: 'Sim, PDF e PNG.' },
  ],

  knowledgeIntro: 'Artigos recentes do nosso blog sobre execução, processos e gestão',
  relatedBlogSlugs: [
    'plano-de-acao-executavel',
    'como-mapear-processos-empresa-bpmn',
    'plataforma-treinamento-corporativo',
    'tirar-planejamento-estrategico-do-papel',
    'como-integrar-sistemas-empresa',
    'software-bpms-como-escolher',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Seu portfólio de projetos sob controle em',
  ctaH2Highlight: '30 dias',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o módulo Projetos, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
