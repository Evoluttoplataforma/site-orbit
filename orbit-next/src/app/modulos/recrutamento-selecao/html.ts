/**
 * Página /modulos/recrutamento-selecao
 * Usa o template padrão de módulo (src/lib/module-page-template.ts).
 */

import { buildModulePageHTML, type PageData } from '@/lib/module-page-template';

const data: PageData = {
  currentSlug: 'recrutamento-selecao',
  isModule: true,

  pill: 'Módulo · R&S',
  h1Pre: 'Módulo R&S: do anúncio à contratação',
  h1Highlight: 'com IA',
  h1Post: '.',
  subtitle:
    'Da abertura de vaga ao fechamento, o módulo opera o ciclo completo, descrição inteligente, triagem de CV por IA, etapas seletivas, scorecards e banco de talentos. <strong>Coordenado pelos agentes do Time Olívia.</strong>',
  heroNote: '⏱️ Redução de 30-50% no tempo de fechamento de vagas',
  heroCtaPrimary: 'QUERO CONHECER O R&S',
  heroCtaSecondary: 'Ver 8 funcionalidades',
  heroCredentials: [
    { strong: '30-50%', label: 'menos tempo por vaga' },
    { strong: 'Triagem', label: 'de CV por IA' },
    { strong: 'Portal', label: 'do candidato' },
  ],

  funcsBadge: '8 funcionalidades',
  funcsH2Pre: 'O que o módulo R&S',
  funcsH2Highlight: 'opera',
  funcsH2Post: 'do início ao fim',
  funcsIntro:
    'Cada capacidade abaixo é nativa do módulo, conectada aos agentes da Olívia, ao módulo de Pessoas e à PDI.',
  funcs: [
    { icon: 'fa-file-circle-plus', title: 'Descrição de vaga por IA', desc: 'IA gera descrição completa a partir de perfil, requisitos e cultura, pronta pra publicar.' },
    { icon: 'fa-people-group', title: 'Pipeline de candidatos', desc: 'Estágios configuráveis por vaga, com scorecards específicos de cada etapa.' },
    { icon: 'fa-brain', title: 'Triagem de CV por IA', desc: 'Análise automática de aderência ao perfil, 200 CVs viram top 20 em segundos.' },
    { icon: 'fa-user-check', title: 'Análise individual', desc: 'Score, justificativa e perguntas sugeridas pra entrevista de cada candidato.' },
    { icon: 'fa-microphone', title: 'Entrevistas', desc: 'Agendamento, roteiro, notas e scorecard preenchidos pelo time.' },
    { icon: 'fa-envelope', title: 'Comunicação automática', desc: 'Status, próximos passos e feedback enviados sem precisar acionar o time.' },
    { icon: 'fa-chart-bar', title: 'Relatórios de R&S', desc: 'Tempo de fechamento, conversão por etapa e fonte de cada candidato.' },
    { icon: 'fa-bookmark', title: 'Banco de talentos', desc: 'Candidatos qualificados ficam classificados pra vagas similares no futuro.' },
  ],

  scenariosBadge: 'Cenários reais',
  scenariosH2Pre: 'Três situações que o R&S',
  scenariosH2Highlight: 'destrava sozinho',
  scenariosH2Post: '',
  scenariosIntro:
    'Padrões que se repetem em empresas que contratam por urgência, estruturados sem precisar virar empresa de RH.',
  scenarios: [
    { tag: 'Processo', title: 'R&S sem processo, contratando por urgência', body: 'O módulo estrutura o ciclo, define scorecards e reduz tempo médio em 30-40% sem aumentar o time.' },
    { tag: 'Triagem', title: 'Tempo gasto triando CV é absurdo', body: 'A IA reduz 200 CVs ao top 20 em segundos, com justificativa por candidato pra você validar.' },
    { tag: 'Engajamento', title: 'Candidato bom perdido por demora', body: 'Comunicação automática mantém o candidato engajado entre etapas, sem ele desistir pra concorrente.' },
  ],

  testiH2: 'Quem opera o R&S com a Orbit',
  testiIntro: 'Líderes de RH e gestores contando o que mudou na prática.',
  testimonials: [
    { initials: 'JS', quote: '"Antes a gente lia 200 currículos por vaga. Hoje a IA entrega top 20 com justificativa. Cortou pela metade o tempo gasto antes da entrevista."', name: 'Juliana Souza', role: 'Coordenadora de RH · GrupoNorte' },
    { initials: 'FA', quote: '"Reduzi o tempo de fechamento de vaga sênior de 60 dias pra 28. E sem perder a qualidade, o scorecard padronizou a decisão."', name: 'Felipe Araújo', role: 'Head de Pessoas · Tecno Brasil' },
    { initials: 'RM', quote: '"O banco de talentos pagou sozinho. Vaga aberta hoje já tem 3 candidatos qualificados de processos anteriores no shortlist."', name: 'Rita Martins', role: 'Diretora de RH · Logística Sul' },
  ],

  faqBadge: 'Perguntas frequentes',
  faqH2: 'Sobre o módulo R&S',
  faqIntro: 'As 8 perguntas mais comuns antes de implementar.',
  faqs: [
    { q: 'Substitui Gupy ou Kenoby?', a: 'Para B2B brasileira de médio porte focada em gestão integrada, sim, com vantagem em integração com o restante da operação (Pessoas, Indicadores, Financeiro).' },
    { q: 'A IA discrimina candidatos?', a: 'Não. A IA avalia aderência técnica e comportamental ao perfil definido pelo time, sem usar atributos sensíveis (raça, gênero, idade).' },
    { q: 'Como a triagem funciona?', a: 'A IA compara o CV ao perfil definido na vaga e gera um score de aderência, com justificativa textual por candidato.' },
    { q: 'Posso definir scorecard de entrevista?', a: 'Sim. Scorecards são configuráveis por cargo e por etapa, cada vaga pode ter o seu.' },
    { q: 'Integra com LinkedIn?', a: 'Sim. Importação de vagas e perfis suportada.' },
    { q: 'O candidato vê o status dele?', a: 'Sim. Portal do candidato com transparência sobre etapa atual, próximos passos e feedback.' },
    { q: 'Tem banco de talentos?', a: 'Sim. Candidatos qualificados ficam classificados para vagas similares no futuro.' },
    { q: 'Reduz tempo de fechamento em quanto?', a: '30% a 50% em 60-90 dias, dependendo do volume de vagas e do perfil.' },
  ],

  knowledgeIntro: 'Artigos recentes do nosso blog sobre Recrutamento, Pessoas e Gestão',
  // Artigos reais do articles.json com afinidade R&S/pessoas
  relatedBlogSlugs: [
    'como-reter-talentos-empresa',
    'software-rh-como-escolher',
    'treinamento-corporativo-nao-funciona',
    'plataforma-treinamento-corporativo',
    'gestao-com-ia-como-o-orbit-muda-a-forma-de-administrar-micro-e-pequenas-empresas',
    'erp-vs-plataforma-all-in-one',
  ],

  ctaBadge: 'Conheça o time de IA',
  ctaH2Pre: 'Sua próxima contratação fecha em',
  ctaH2Highlight: 'metade do tempo',
  ctaH2Post: '.',
  ctaIntro: 'Conheça o módulo R&S, a Olívia e os outros agentes em uma conversa de 2 minutos.',
  ctaButton: 'QUERO CONHECER O TIME DE IA',
};

export const pageHTML = buildModulePageHTML(data);
