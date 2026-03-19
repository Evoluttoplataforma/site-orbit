/* ORBIT - Init all interactive features */
document.addEventListener('DOMContentLoaded', function() {

  // ═══ LANGUAGE SWITCHER ═══
  document.querySelectorAll('.lang-switch').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var lang = localStorage.getItem('orbit_lang') || 'pt';
      var next = lang === 'pt' ? 'en' : 'pt';
      localStorage.setItem('orbit_lang', next);
      location.reload();
    });
  });

  var lang = localStorage.getItem('orbit_lang') || 'pt';

  // Update switcher UI
  document.querySelectorAll('.lang-switch__label').forEach(function(el) {
    el.textContent = lang === 'pt' ? 'EN' : 'PT';
  });
  document.querySelectorAll('.lang-switch__flag').forEach(function(el) {
    el.textContent = lang === 'pt' ? '🇺🇸' : '🇧🇷';
  });

  if (lang === 'en') {
    applyEnglish();
  }

  // ═══ ORBITAL HUB - Agent click cards ═══
  document.querySelectorAll('.orbit-hub').forEach(function(hub) {
    var nodes = hub.querySelectorAll('.orbit-hub__node');
    nodes.forEach(function(node) {
      node.addEventListener('click', function(e) {
        e.stopPropagation();
        var wasActive = node.classList.contains('orbit-node--active');
        nodes.forEach(function(n) {
          n.classList.remove('orbit-node--active', 'orbit-node--dimmed');
        });
        if (!wasActive) {
          node.classList.add('orbit-node--active');
          nodes.forEach(function(n) {
            if (n !== node) n.classList.add('orbit-node--dimmed');
          });
        }
      });
    });
  });
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.orbit-hub').forEach(function(hub) {
      if (!hub.contains(e.target)) {
        hub.querySelectorAll('.orbit-hub__node').forEach(function(n) {
          n.classList.remove('orbit-node--active', 'orbit-node--dimmed');
        });
      }
    });
  });

  // ═══ ORBITAL HUB LAYOUT (position nodes in circle + SVG lines) ═══
  document.querySelectorAll('.orbit-hub').forEach(function(hub) {
    var TOTAL = 12;
    var nodes = hub.querySelectorAll('.orbit-hub__node');
    var svg = hub.querySelector('.orbit-hub__lines');
    if (!svg || nodes.length === 0) return;

    function layout() {
      var w = hub.offsetWidth;
      var h = hub.offsetHeight;
      if (w === 0 || h === 0) return;
      var cx = w / 2;
      var cy = h / 2;
      var radius = Math.min(w, h) / 2 - 40;
      if (w < 500) radius = Math.min(w, h) / 2 - 30;
      if (radius < 100) radius = 100;
      if (radius > 360) radius = 360;

      svg.setAttribute('width', w);
      svg.setAttribute('height', h);
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      svg.innerHTML = '';

      var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      defs.innerHTML = '<filter id="lineGlow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
      svg.appendChild(defs);

      var hubId = hub.id || 'hub';
      nodes.forEach(function(node, i) {
        var angle = (i / TOTAL) * Math.PI * 2 - Math.PI / 2;
        var nx = cx + Math.cos(angle) * radius;
        var ny = cy + Math.sin(angle) * radius;
        node.style.left = nx + 'px';
        node.style.top = ny + 'px';

        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', cx);
        line.setAttribute('y1', cy);
        line.setAttribute('x2', nx);
        line.setAttribute('y2', ny);
        line.setAttribute('stroke', 'rgba(255,186,26,0.2)');
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('filter', 'url(#lineGlow)');
        svg.appendChild(line);

        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', '3.5');
        circle.setAttribute('fill', '#ffca4a');
        circle.setAttribute('filter', 'url(#lineGlow)');
        var anim = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        anim.setAttribute('dur', '2.5s');
        anim.setAttribute('repeatCount', 'indefinite');
        anim.setAttribute('begin', (i * 0.2) + 's');
        var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('id', 'orbit-path-' + hubId + '-' + i);
        pathEl.setAttribute('d', 'M' + nx + ',' + ny + ' L' + cx + ',' + cy);
        pathEl.setAttribute('fill', 'none');
        defs.appendChild(pathEl);
        var mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
        mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#orbit-path-' + hubId + '-' + i);
        anim.appendChild(mpath);
        circle.appendChild(anim);
        svg.appendChild(circle);
      });
    }

    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        hub.classList.add('orbit-visible');
        layout();
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(hub);

    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (hub.classList.contains('orbit-visible')) layout();
      }, 150);
    });
  });
});

// ═══ ENGLISH TRANSLATIONS ═══
function applyEnglish() {
  var t = {
    // === NAV ===
    'Início': 'Home',
    'Agentes de IA': 'AI Agents',
    'Para quem': 'For whom',
    'Planos': 'Plans',
    'Conteúdo': 'Resources',
    'Empresa': 'Company',
    'Entrar': 'Login',
    'Conhecer o Time de IA': 'Meet the AI Team',
    'Todos os Agentes': 'All Agents',
    'Conheça os 12 especialistas': 'Meet the 12 specialists',
    'Olívia': 'Olívia',
    'Coordenadora Geral de IA': 'General AI Coordinator',
    'Empresários': 'Business Owners',
    'Time de IA para sua empresa': 'AI team for your company',
    'Consultores': 'Consultants',
    'Modelo de canais B2B2B': 'B2B2B channel model',
    'Blog': 'Blog',
    'Artigos e insights': 'Articles & insights',
    'Histórias de Clientes': 'Customer Stories',
    'Cases de sucesso': 'Success cases',
    'FAQ': 'FAQ',
    'Perguntas frequentes': 'Frequently asked questions',
    'Sobre Nós': 'About Us',
    '30 anos de história': '30 years of history',
    'Seja Parceiro': 'Become a Partner',
    'Programa de canais': 'Channel program',
    'Canais B2B2B': 'B2B2B Channels',
    'Para consultores e mentores': 'For consultants & mentors',
    'Menu': 'Menu',
    'Navegação': 'Navigation',
    'Planos e Preços': 'Plans & Pricing',
    'Fale Conosco': 'Contact Us',

    // === HERO ===
    '30 anos de gestão empresarial. Agora com IA.': '30 years of business management. Now with AI.',
    'Sua empresa não precisa de mais ferramentas.': "Your company doesn't need more tools.",
    'time de IA': 'AI team',
    'executa.': 'executes.',
    'organiza.': 'organizes.',
    'decide.': 'decides.',
    'opera 24/7.': 'operates 24/7.',
    'nunca para.': 'never stops.',
    'QUERO CONHECER O TIME DE IA': 'MEET THE AI TEAM',
    'Ver os 12 agentes': 'See the 12 agents',
    '⏱️ 2 min • 100% gratuito • Sem compromisso': '⏱️ 2 min • 100% free • No commitment',
    '30 anos': '30 years',
    'de experiência': 'of experience',
    '8.000+': '8,000+',
    'empresas atendidas': 'companies served',
    '2.206': '2,206',
    'no Orbit': 'on Orbit',

    // === PLATFORM ===
    'Uma plataforma.': 'One platform.',
    'Tudo conectado.': 'Everything connected.',
    '5 módulos. 12 agentes. Uma Olívia que conecta tudo - e traduz dados em decisão.': '5 modules. 12 agents. One Olívia who connects it all - and turns data into decisions.',
    'Orbit Processos': 'Orbit Processes',
    'Padronize e otimize seus processos críticos': 'Standardize and optimize your critical processes',
    'Orbit Indicadores': 'Orbit Indicators',
    'KPIs em tempo real com dashboards inteligentes': 'Real-time KPIs with intelligent dashboards',
    'Orbit Tarefas': 'Orbit Tasks',
    'Alinhe tarefas à estratégia e aos objetivos': 'Align tasks to strategy and objectives',
    'Orbit Competências': 'Orbit Skills',
    'Desenvolva o potencial do seu time': "Develop your team's full potential",
    'Orbit Auditorias': 'Orbit Audits',
    'Conformidade e qualidade nos processos': 'Compliance and quality in processes',
    'Orbit IA': 'Orbit AI',
    'Olívia + 12 agentes que operam sua gestão': 'Olívia + 12 agents that operate your management',
    'Saiba mais': 'Learn more',
    'Conhecer a Olívia': 'Meet Olívia',
    'Processos': 'Processes',
    'Indicadores': 'Indicators',
    'Tarefas': 'Tasks',
    'Competências': 'Skills',
    'Auditorias': 'Audits',
    'Mapeamento visual de processos': 'Visual process mapping',
    'Instruções de trabalho automáticas': 'Automatic work instructions',
    'Monitoramento em tempo real': 'Real-time monitoring',
    'Integração com ISO e normas': 'ISO and standards integration',
    'Dashboards personalizáveis': 'Customizable dashboards',
    'Alertas automáticos de desvio': 'Automatic deviation alerts',
    'OKRs e BSC integrados': 'Integrated OKRs and BSC',
    'Hipóteses de causa raiz com IA': 'AI-powered root cause hypotheses',
    'Kanban e lista de tarefas': 'Kanban and task lists',
    'Vínculo com objetivos estratégicos': 'Link to strategic objectives',
    'Cronogramas e dependências': 'Timelines and dependencies',
    'Notificações inteligentes': 'Smart notifications',
    'Matriz de competências': 'Competency matrix',
    'Avaliações 360°': '360° evaluations',
    'PDI automatizado com IA': 'AI-powered development plans',
    'Analytics de desempenho': 'Performance analytics',
    'Checklists automatizados': 'Automated checklists',
    'Planos de ação corretiva': 'Corrective action plans',
    'Histórico de conformidade': 'Compliance history',
    'Relatórios de auditoria': 'Audit reports',
    'Olívia coordena e prioriza ações': 'Olívia coordinates and prioritizes actions',
    '12 agentes com personalidade e cargo funcional': '12 agents with personality and functional roles',
    'Tensões produtivas geram melhores decisões': 'Productive tensions generate better decisions',
    'Consultoria recorrente passiva: opera 24/7': 'Recurring passive consulting: operates 24/7',
    'O Agente de Processos mapeia, documenta e gera instruções de trabalho automaticamente. Reduza retrabalho e garanta qualidade em cada execução.': 'The Process Agent maps, documents, and automatically generates work instructions. Reduce rework and guarantee quality in every execution.',
    'O Agente de Indicadores monitora seus KPIs, identifica desvios e sugere ações corretivas antes que o problema cresça.': 'The Indicators Agent monitors your KPIs, identifies deviations, and suggests corrective actions before problems grow.',
    'Mantenha a equipe sincronizada com visibilidade total do progresso em direção aos objetivos estratégicos.': 'Keep your team synchronized with full visibility of progress toward strategic objectives.',
    'O Agente de Pessoas cria descrições de cargo, avaliações de desempenho e PDIs personalizados automaticamente.': 'The People Agent automatically creates job descriptions, performance evaluations, and personalized development plans.',
    'Mantenha compliance total, reduza riscos e garanta que seus processos estejam sempre alinhados aos padrões regulatórios.': 'Maintain full compliance, reduce risks, and ensure your processes are always aligned with regulatory standards.',
    'A Olívia é a Coordenadora Geral: conecta dados de todos os módulos, lidera os 12 agentes especializados e traduz complexidade em clareza. Construídos sobre 30 anos de experiência do Grupo GSN.': "Olívia is the General Coordinator: she connects data from all modules, leads the 12 specialized agents, and translates complexity into clarity. Built on 30 years of experience from GSN Group.",

    // === PARA QUEM ===
    'Para quem é o Orbit': 'Who is Orbit for',
    'Encontre seu caminho': 'Find your path',
    'Ferramentas demais e gestão de menos? Um time de IA opera sua empresa 24/7.': 'Too many tools and too little management? An AI team operates your company 24/7.',
    'Ver como funciona': 'See how it works',
    'Pare de vender projeto. Venda operação com receita recorrente e white-label.': 'Stop selling projects. Sell operations with recurring revenue and white-label.',
    'Modelo de canais': 'Channel model',
    'Fale conosco': 'Talk to us',

    // === CATEGORY ===
    'UMA NOVA CATEGORIA': 'A NEW CATEGORY',
    'Gestão Operada por IA com': 'AI-Operated Management with',
    'Consultoria Recorrente Passiva': 'Recurring Passive Consulting',
    'Diferente de ferramentas ou chatbots, os agentes do Orbit trabalham de forma autônoma após a configuração. A gestão continua acontecendo mesmo sem intervenção humana constante.': "Unlike tools or chatbots, Orbit's agents work autonomously after setup. Management continues happening without constant human intervention.",
    'das empresas usam IA agentic': 'of companies use agentic AI',
    'estão experimentando': 'are experimenting',
    'mais qualidade com IA': 'more quality with AI',

    // === PAIN POINTS ===
    'Isso te parece familiar?': 'Does this sound familiar?',
    'Deixa eu adivinhar:': 'Let me guess:',
    'Você planeja o crescimento, mas não faz ideia se a operação está seguindo o script.': "You plan growth, but have no idea if operations are following the script.",
    '"Parece que sou o único que se importa com essa empresa."': '"It feels like I\'m the only one who cares about this company."',
    '"Não tenho controle quando não estou presente."': '"I have no control when I\'m not there."',
    '"Já tentei delegar, mas tudo sai errado."': '"I\'ve tried delegating, but everything goes wrong."',
    '"Minha equipe só apaga incêndio."': '"My team only puts out fires."',
    '"Ninguém veste a camisa."': '"Nobody is committed."',
    '"Vivo no sobe e desce do faturamento."': '"I live with constant revenue fluctuations."',
    '"Eu entendo. E é exatamente isso que resolvo. Me dá 7 dias."': '"I understand. And that\'s exactly what I solve. Give me 7 days."',

    // === REFRAME ===
    'E se o problema não fosse falta de método?': "What if the problem wasn't lack of method?",
    'Por que software sozinho não resolve': "Why software alone doesn't solve it",
    'Você já tentou. ERP, planilha, Trello, consultoria. E continua apagando incêndio.': "You've tried it. ERP, spreadsheets, Trello, consulting. Yet you still put out fires.",
    'Comprou software': 'Bought software',
    'Precisa alimentar manualmente. Ninguém alimenta. Vira shelfware.': 'Needs manual data entry. Nobody does it. It becomes shelfware.',
    'Contratou consultoria': 'Hired consulting',
    'Consultor vai embora. Conhecimento sai pela porta. Tudo volta ao caos.': 'Consultant leaves. Knowledge walks out the door. Everything goes back to chaos.',
    'Montou planilha': 'Created a spreadsheet',
    'Fica obsoleta em 2 semanas. Não escala. Ninguém confia nos dados.': "It's obsolete in 2 weeks. Doesn't scale. Nobody trusts the data.",
    'Resultado: o ciclo se repete.': 'Result: the cycle repeats.',
    'Mais uma ferramenta abandonada. Mais dinheiro desperdiçado.': 'Another abandoned tool. More money wasted.',
    'E se existisse outro caminho?': 'What if there was another way?',
    '12 agentes de IA trabalham por você': '12 AI agents work for you',
    'Mapeiam processos, monitoram indicadores, treinam equipes. Sem parar.': 'Map processes, monitor indicators, train teams. Non-stop.',
    'Você valida e decide': 'You validate and decide',
    'Sem alimentar ferramenta. Sem depender de consultor. Dados prontos para ação.': 'No tool feeding. No consultant dependency. Data ready for action.',
    'Aprovado': 'Approved',
    'Ajustado': 'Adjusted',
    'Funciona 24/7, mesmo sem você': 'Works 24/7, even without you',
    'Consultoria recorrente passiva. A operação não para quando o projeto acaba.': "Recurring passive consulting. Operations don't stop when the project ends.",
    'Operando agora': 'Operating now',
    'Produtividade': 'Productivity',
    'Retrabalho': 'Rework',
    'Mês 1': 'Month 1',
    'Resultado: gestão que opera com você, não por você.': 'Result: management that operates with you, not for you.',
    'Um time de IA que nunca para. Custo de 1 funcionário. ROI desde o mês 1.': 'An AI team that never stops. Cost of 1 employee. ROI from month 1.',

    // === OLIVIA ===
    'Conheça a líder do time': 'Meet the team leader',
    'Olívia, sua': 'Olívia, your',
    'Coordenadora de IA': 'AI Coordinator',
    'Coordena 12 agentes': 'Coordinates 12 agents',
    'Conecta todos os dados': 'Connects all data',
    'Traduz em decisão': 'Translates into decisions',
    '12 agentes especializados': '12 specialized agents',
    'Coordenadora Geral': 'General Coordinator',
    'Seu time de IA coordenado pela': 'Your AI team coordinated by',
    'Cada agente domina uma área. A Olívia coordena todos, conecta os dados e entrega clareza.': 'Each agent masters an area. Olívia coordinates all, connects the data, and delivers clarity.',
    '12 especialistas. 1 coordenadora.': '12 specialists. 1 coordinator.',
    'Custo de 1 funcionário.': 'Cost of 1 employee.',
    'Quero meu time de IA': 'I want my AI team',
    'Olívia é a especialista em IA do Orbit e a voz do sistema para sua empresa. Ela coordena os 12 agentes, conecta dados de todos os departamentos e traduz complexidade em clareza para a tomada de decisão.': "Olívia is Orbit's AI expert and the system's voice for your company. She coordinates the 12 agents, connects data from all departments, and translates complexity into clarity for decision-making.",
    'Quando o Agente de Riscos detecta uma ameaça, é a Olívia que cruza com o Agente de Oportunidades e apresenta o cenário completo. Humana o suficiente para criar vínculo. Inteligente o suficiente para gerar valor real.': 'When the Risk Agent detects a threat, Olívia crosses it with the Opportunities Agent and presents the complete picture. Human enough to create connection. Smart enough to generate real value.',
    '"Bom dia! Analisei os dados da semana. Três pontos precisam da sua atenção: margem caiu 2%, o time comercial bateu recorde, e temos uma oportunidade no segmento B que ninguém está olhando. Vamos resolver?"': '"Good morning! I analyzed this week\'s data. Three points need your attention: margin dropped 2%, the sales team hit a record, and we have an opportunity in segment B that nobody\'s looking at. Shall we solve it?"',
    '- Olívia, Coordenadora Geral': '- Olívia, General Coordinator',

    // === AGENTS ===
    'Estrategista': 'Strategist',
    'SWOT, BSC e planejamento estratégico': 'SWOT, BSC and strategic planning',
    'Ativo 24/7': 'Active 24/7',
    'Agente Estrategista': 'Strategist Agent',
    'Analisa o cenário da empresa com SWOT, define OKRs e monta o planejamento estratégico. Cruza dados de todos os outros agentes para alinhar a direção.': 'Analyzes company scenario with SWOT, defines OKRs and builds strategic planning. Crosses data from all other agents to align direction.',
    'Impacto': 'Impact',
    'Agente de Processos': 'Process Agent',
    'Mapeamento, playbooks e automação': 'Mapping, playbooks and automation',
    'Mapeia, documenta e gera instruções de trabalho automaticamente. Reduz retrabalho e garante qualidade em cada execução.': 'Maps, documents and automatically generates work instructions. Reduces rework and guarantees quality in every execution.',
    'Pessoas': 'People',
    'Cargos, desempenho e PDIs': 'Roles, performance and development plans',
    'Agente de Pessoas': 'People Agent',
    'Cria descrições de cargo, avaliações de desempenho e PDIs personalizados. Identifica gaps de competência e sugere trilhas de desenvolvimento.': 'Creates job descriptions, performance evaluations and personalized development plans. Identifies competency gaps and suggests development paths.',
    'Treinamento': 'Training',
    'Microlearning e trilhas via WhatsApp': 'Microlearning and paths via WhatsApp',
    'Agente de Treinamento': 'Training Agent',
    'Treina equipes via WhatsApp com microlearning diário. Adapta conteúdo ao nível de cada colaborador e acompanha engajamento.': "Trains teams via WhatsApp with daily microlearning. Adapts content to each team member's level and tracks engagement.",
    'KPIs em tempo real e causa raiz': 'Real-time KPIs and root cause',
    'Agente de Indicadores': 'Indicators Agent',
    'Monitora KPIs em tempo real, identifica desvios e sugere hipóteses de causa raiz com IA antes que o problema cresça.': 'Monitors KPIs in real time, identifies deviations and suggests AI-powered root cause hypotheses before problems grow.',
    'Pesquisa': 'Research',
    'Clima, formulários e insights': 'Climate, surveys and insights',
    'Agente de Pesquisa': 'Research Agent',
    'Cria pesquisas de clima, satisfação e NPS. Analisa respostas e entrega insights acionáveis sobre a percepção das equipes.': 'Creates climate, satisfaction and NPS surveys. Analyzes responses and delivers actionable insights about team perception.',
    'Riscos': 'Risks',
    'Mitigação e prevenção contínua': 'Mitigation and continuous prevention',
    'Agente de Riscos': 'Risk Agent',
    'Identifica ameaças antes que virem crises. Monitora indicadores de risco e sugere planos de mitigação preventivos.': 'Identifies threats before they become crises. Monitors risk indicators and suggests preventive mitigation plans.',
    'Oportunidades': 'Opportunities',
    'Mercado, parcerias e expansão': 'Market, partnerships and expansion',
    'Agente de Oportunidades': 'Opportunities Agent',
    'Escaneia o mercado, identifica novas oportunidades e cruza com dados internos para sugerir ações de expansão e parcerias.': 'Scans the market, identifies new opportunities and crosses with internal data to suggest expansion and partnership actions.',
    'Problemas': 'Problems',
    'Não-conformidades e PDCA': 'Non-conformities and PDCA',
    'Agente de Problemas': 'Problems Agent',
    'Registra não-conformidades, aplica PDCA automaticamente e acompanha a resolução até o fechamento com evidências.': 'Records non-conformities, automatically applies PDCA and tracks resolution until closure with evidence.',
    'Documentos': 'Documents',
    'Padronização e controle': 'Standardization and control',
    'Agente de Documentos': 'Documents Agent',
    'Padroniza, versiona e controla todos os documentos da empresa. Garante que todos trabalhem com a versão mais recente.': 'Standardizes, versions and controls all company documents. Ensures everyone works with the latest version.',
    'Vendas': 'Sales',
    'CRM, funil e coaching comercial': 'CRM, sales funnel and commercial coaching',
    'Agente de Vendas': 'Sales Agent',
    'Gerencia o funil comercial, faz coaching da equipe de vendas e identifica oportunidades de upsell e cross-sell com IA.': 'Manages the sales funnel, coaches the sales team and identifies upsell and cross-sell opportunities with AI.',
    'Reuniões': 'Meetings',
    'Transcrição e planos de ação': 'Transcription and action plans',
    'Agente de Reuniões': 'Meetings Agent',
    'Transcreve reuniões, extrai decisões e gera planos de ação automaticamente. Nunca mais perca um follow-up.': 'Transcribes meetings, extracts decisions and automatically generates action plans. Never miss a follow-up again.',

    // === HOW IT WORKS ===
    'Simples e rápido': 'Simple and quick',
    'Como funciona': 'How it works',
    'Da ativação à operação completa em poucos dias. Sem instalação, sem complexidade.': 'From activation to full operation in just a few days. No installation, no complexity.',
    '5 min': '5 min',
    'Cadastre sua empresa': 'Register your company',
    'Preencha os dados básicos e os agentes já começam a entender seu negócio.': 'Fill in the basic information and the agents start understanding your business.',
    'Empresa': 'Company',
    'Minha Empresa LTDA': 'My Company LTDA',
    'Setor': 'Industry',
    'Tecnologia': 'Technology',
    'Objetivo': 'Objective',
    'Escalar operações': 'Scale operations',
    '1 tarde': '1 afternoon',
    '12 agentes constroem tudo': '12 agents build everything',
    'O time de IA mapeia processos, cria planejamento estratégico, estrutura indicadores e muito mais - tudo ao mesmo tempo.': "The AI team maps processes, creates strategic planning, structures indicators and much more-all at the same time.",
    'Mapeamento de 14 processos concluído': '14 processes mapping completed',
    '23 indicadores estruturados': '23 structured indicators',
    'Planejamento estratégico gerado': 'Strategic planning generated',
    'Descrições de cargo em andamento...': 'Job descriptions in progress...',
    'Olívia ativada - coordenando agentes': 'Olívia activated - coordinating agents',
    '7 dias': '7 days',
    '87% validado': '87% validated',
    'Operação ativada - para sempre': 'Operation activated - forever',
    'Consultoria recorrente passiva: os agentes trabalham 24 horas por dia, 7 dias por semana. A operação não para quando o projeto acaba.': "Recurring passive consulting: agents work 24 hours a day, 7 days a week. Operations don't stop when the project ends.",
    'Operando': 'Operating',
    'Agentes ativos': 'Active agents',

    // === COST ===
    'Quanto custa': 'How much does it cost',
    // Short words - only translate when they are the ENTIRE text node content
    // (handled separately below)
    'ter um time estratégico?': 'to have a strategic team?',
    'Compare o custo de montar esse time manualmente versus usar o Orbit.': 'Compare the cost of building this team manually versus using Orbit.',
    'Montar esse time manualmente': 'Building this team manually',
    'Com o Orbit': 'With Orbit',
    'Consultor estratégico': 'Strategic consultant',
    'Analista de processos': 'Process analyst',
    'Analista DHO': 'HR analyst',
    'Coord. T&D': 'T&D Coordinator',
    'Analista BI': 'BI analyst',
    'Analista de dados': 'Data analyst',
    'Analista de riscos': 'Risk analyst',
    'Analista de inteligência': 'Intelligence analyst',
    'Analista de melhoria': 'Improvement analyst',
    'Analista documentação': 'Documentation analyst',
    'Consultor comercial': 'Commercial consultant',
    'Assistente executivo': 'Executive assistant',
    'Total estimado': 'Estimated total',
    'A partir de': 'Starting from',
    'Incluso': 'Included',
    'Plataforma completa': 'Complete platform',
    'Suporte e onboarding': 'Support and onboarding',
    'Treinamento via WhatsApp': 'WhatsApp training',
    'Monitoramento 24/7': '24/7 monitoring',
    'Coordenado pela Olívia (IA)': 'Coordinated by Olívia (AI)',
    'Sem contratação CLT': 'No employee contracts',
    'Operação imediata': 'Immediate operation',
    'Ver planos completos': 'See full plans',
    'Economia de até 99% vs. time tradicional': 'Savings up to 99% vs. traditional team',
    'R$ 997/mês vs. R$ 108-204k/mês em salários e consultorias': 'R$ 997/month vs. R$ 108-204k/month in salaries and consulting',

    // === PRICING ===
    'Planos que cabem na sua operação': 'Plans that fit your operation',
    'Escolha o plano ideal para o momento da sua empresa. Sem fidelidade, sem surpresas.': "Choose the ideal plan for your company's moment. No commitment, no surprises.",
    'Mensal': 'Monthly',
    'Anual': 'Annual',
    'Starter': 'Starter',
    'Ideal para começar': 'Ideal to start',
    'Equivale a R$ 33/dia - menos que um almoço': 'Equals R$ 33/day-less than a lunch',
    '3 agentes de IA': '3 AI agents',
    'Até 30 usuários': 'Up to 30 users',
    'Dashboards básicos': 'Basic dashboards',
    'Suporte por email': 'Email support',
    'Começar agora': 'Start now',
    'Advanced': 'Advanced',
    'O mais escolhido': 'The most chosen',
    '12 agentes de IA': '12 AI agents',
    'Usuários ilimitados': 'Unlimited users',
    'Onboarding dedicado': 'Dedicated onboarding',
    'Olívia como coordenadora': 'Olívia as coordinator',
    'Escolher Advanced': 'Choose Advanced',
    'Garantia 90 dias ou seu dinheiro de volta': '90-day guarantee or your money back',
    'Pro': 'Pro',
    'Para empresas em expansão': 'For expanding companies',
    'ROI médio em 30 dias': 'Average ROI in 30 days',
    '12 agentes + customização': '12 agents + customization',
    'API e integrações': 'API and integrations',
    'Gerente de sucesso': 'Success manager',
    'SLA prioritário': 'Priority SLA',
    'Escolher Pro': 'Choose Pro',
    'Time humano equivalente': 'Equivalent human team',
    'R$ 35.000+/mês (5 profissionais CLT)': 'R$ 35,000+/month (5 employees)',
    'Orbit Advanced': 'Orbit Advanced',
    'R$ 1.950/mês - 12 agentes 24/7': 'R$ 1,950/month-12 agents 24/7',

    // === TESTIMONIALS ===
    'Depoimentos': 'Testimonials',
    'Quem usa, recomenda': 'Those who use it, recommend it',
    'Veja como empresas como a sua estão transformando a gestão com o Orbit.': 'See how companies like yours are transforming management with Orbit.',
    'Diretora de Operações, TechParts Ltda': 'Director of Operations, TechParts Ltda',
    'CEO, Grupo Nordeste': 'CEO, Nordeste Group',
    'Gerente de Qualidade, FastLog': 'Quality Manager, FastLog',
    'CEO, Construtora Horizonte': 'CEO, Horizonte Construction',
    'Gerente de Qualidade, Indústria Max': 'Quality Manager, Max Industry',
    'Diretor Comercial, VentureLog': 'Commercial Director, VentureLog',
    'COO, Rede Sabor & Cia': 'COO, Sabor & Cia Network',
    'Fundador, RN Distribuidora': 'Founder, RN Distributor',
    'Head de RH, Grupo Solar': 'Head of HR, Solar Group',

    // === GUARANTEE ===
    'Termo de Garantia': 'Guarantee Terms',
    'Orbit Gestão - 90 dias': 'Orbit Management - 90 days',
    'Assinatura': 'Signature',
    'Assinado digitalmente': 'Digitally signed',
    'Garantido': 'Guaranteed',
    'Risco Zero': 'Zero Risk',
    'Garantia de 90 dias': '90-day guarantee',
    'Se em 90 dias o Orbit não gerar resultado mensurável na sua empresa, devolvemos 100% do seu investimento. Sem burocracia, sem letras miúdas.': "If Orbit doesn't generate measurable results in your company within 90 days, we return 100% of your investment. No bureaucracy, no fine print.",
    'Resultados mensuráveis em até 90 dias': 'Measurable results within 90 days',
    'Devolução integral sem questionamentos': 'Full refund without questions',
    'Sem contrato de fidelidade': 'No lock-in contract',
    'Cancele quando quiser': 'Cancel anytime',
    'QUERO TESTAR SEM RISCO': 'TRY RISK-FREE',

    // === CONSULTANT BANNER ===
    'Pare de vender projeto. Comece a vender operação.': 'Stop selling projects. Start selling operations.',
    'Consultores, mentores e associações': 'Consultants, mentors and associations',
    'Ofereça um time de IA aos seus clientes ou associados. Receita recorrente, white-label, sem investimento em tecnologia. Consultoria recorrente passiva: os agentes continuam trabalhando após o projeto.': "Offer an AI team to your clients or members. Recurring revenue, white-label, no technology investment. Recurring passive consulting: agents keep working after the project.",
    'Conhecer programa de canais': 'Learn about the channel program',
    'por mês, por cliente': 'per month, per client',
    'margem operacional': 'operational margin',
    'churn próximo de zero': 'near-zero churn',

    // === MANIFESTO ===
    'Manifesto': 'Manifesto',
    'O mundo não precisa de mais ferramentas.': "The world doesn't need more tools.",
    'Precisa de operação.': 'It needs operation.',

    // === FAQ ===
    'O que é o Orbit?': 'What is Orbit?',
    'O Orbit é uma plataforma de gestão empresarial com 12 agentes de IA especializados. Não é mais um software que você precisa alimentar - são agentes que constroem e operam a gestão da sua empresa, 24/7.': "Orbit is a business management platform with 12 specialized AI agents. It's not another software you need to feed-they're agents that build and operate your company's management, 24/7.",
    'Para quem é indicado?': 'Who is it recommended for?',
    'Para empresas de 5 a 100+ funcionários, de qualquer segmento, que querem profissionalizar a gestão sem depender exclusivamente de consultoria ou software que ninguém usa.': 'For companies with 5 to 100+ employees, in any industry, that want to professionalize management without relying exclusively on consulting or unused software.',
    'Quanto tempo leva para começar?': 'How long does it take to start?',
    'Cadastro em 5 minutos. Planejamento e processos em 1 tarde. Operação completa rodando em 7 dias.': 'Registration in 5 minutes. Planning and processes in 1 afternoon. Full operation running in 7 days.',
    'É mais um software de gestão?': 'Is it just another management software?',
    'Não. Software é ferramenta vazia que espera ser alimentada. O Orbit tem agentes de IA que fazem o trabalho pesado - você valida e decide.': "No. Software is an empty tool waiting to be fed. Orbit has AI agents that do the heavy lifting-you validate and decide.",
    'Funciona para o meu segmento?': 'Does it work for my industry?',
    'Sim. Em 30 anos, já atendemos 8.000+ empresas de todos os segmentos. Gestão é universal. O que muda é o conteúdo - e é exatamente isso que a IA personaliza.': "Yes. In 30 years, we've served 8,000+ companies across all industries. Management is universal. What changes is the content-and that's exactly what AI personalizes.",
    'Meu time vai precisar aprender a usar?': 'Will my team need to learn how to use it?',
    'Seu time nem precisa logar. Processos e treinamentos chegam pelo WhatsApp - que todo mundo já usa.': "Your team doesn't even need to log in. Processes and training come via WhatsApp-which everyone already uses.",
    'E se não funcionar?': "What if it doesn't work?",
    'Garantia de 90 dias. Se não gerar resultado, devolvemos seu investimento. Sem letras miúdas.': "90-day guarantee. If it doesn't generate results, we return your investment. No fine print.",

    // === CTA FORM ===
    'Pronto para montar seu time de IA?': 'Ready to build your AI team?',
    'Agende uma demonstração gratuita e veja os agentes trabalhando com a SUA empresa.': 'Schedule a free demo and see the agents working with YOUR company.',
    'Demonstração com dados da sua empresa': "Demo with your company's data",
    'Setup + onboarding guiado incluso': 'Setup + guided onboarding included',
    'Garantia de 90 dias - risco zero': '90-day guarantee-zero risk',
    'Plano anual com 20% de economia': 'Annual plan with 20% savings',
    'Conheça o time de IA': 'Meet the AI team',
    'Preencha e entraremos em contato em até 24h.': "Fill in and we'll contact you within 24 hours.",
    'Nome completo *': 'Full name *',
    'E-mail corporativo *': 'Corporate email *',
    'WhatsApp *': 'WhatsApp *',
    'Cargo': 'Position',
    'Enviando...': 'Sending...',
    'Recebemos seu contato!': 'We received your contact!',
    'Nosso time entrará em contato em até 24 horas úteis.': 'Our team will get back to you within 24 business hours.',

    // === KNOWLEDGE ===
    'Amplie seus conhecimentos': 'Expand your knowledge',
    'Artigos recentes do nosso blog sobre gestão estratégica': 'Recent articles from our blog on strategic management',
    'Ver todos os artigos': 'See all articles',
    'Artigo': 'Article',
    '5 Passos para Transformar sua Estratégia em Ação': '5 Steps to Turn Your Strategy Into Action',
    'Ler artigo': 'Read article',
    'Ebook': 'Ebook',
    'Guia Completo de Gestão Estratégica para PMEs': 'Complete Guide to Strategic Management for SMEs',
    'Webinar': 'Webinar',
    'Como a IA Melhora a Tomada de Decisão Empresarial': 'How AI Improves Business Decision Making',

    // === CTA SECTION ===
    'Pronto para conhecer o Orbit?': 'Ready to meet Orbit?',
    'Agende uma demonstração e veja os agentes trabalhando com a sua empresa.': 'Schedule a demo and see the agents working with your company.',
    'Falar com Especialista': 'Talk to a Specialist',

    // === CLOSING ===
    'Orbit é o time de gestão que sua empresa sempre precisou.': 'Orbit is the management team your company always needed.',
    'E que nunca para de trabalhar.': 'And it never stops working.',

    // === FOOTER ===
    'Plataforma de gestão com IA. Contrate um time que executa.': 'AI-powered management platform. Hire a team that executes.',
    'Contato': 'Contact',
    'Plataforma': 'Platform',
    '© 2026 Orbit - Grupo GSN. Todos os direitos reservados.': '© 2026 Orbit - Grupo GSN. All rights reserved.',

    // === TESTIMONIAL QUOTES ===
    'Em 3 meses, conseguimos mapear todos os processos críticos e reduzir retrabalho em 40%. O Orbit organizou o que a gente tentava há anos.': 'In 3 months, we managed to map all critical processes and reduce rework by 40%. Orbit organized what we had been trying for years.',
    'O agente de treinamento via WhatsApp mudou o jogo. A equipe engaja porque não precisa logar em nada. Simples e direto.': "The WhatsApp training agent changed the game. The team engages because they don't need to log in. Simple and direct.",
    'Finalmente tenho KPIs em tempo real. Antes, descobria os problemas na semana seguinte. Agora, atuo no mesmo dia.': 'Finally I have real-time KPIs. Before, I found out about problems the following week. Now, I act the same day.',
    'O Orbit é como ter um consultor 24/7. Os agentes de IA identificam problemas antes que virem crises. Mudou completamente nossa forma de gerir.': 'Orbit is like having a 24/7 consultant. The AI agents identify problems before they become crises. It completely changed how we manage.',
    'Reduzimos o tempo de auditoria de 2 semanas para 3 dias. Os checklists automáticos e planos de ação são incríveis.': 'We reduced audit time from 2 weeks to 3 days. The automated checklists and action plans are amazing.',
    'Minha equipe ficou autônoma. O agente de tarefas cobra follow-up, prioriza por impacto estratégico e ninguém esquece mais nada.': 'My team became autonomous. The tasks agent follows up, prioritizes by strategic impact, and nothing gets forgotten.',
    'Implantamos em 15 dias e já vimos resultado no primeiro mês. O suporte é excepcional - sempre presentes quando precisamos.': 'We implemented in 15 days and saw results in the first month. The support is exceptional - always there when we need.',
    'Antes eu gastava R$ 18 mil/mês com consultoria pontual. Agora pago uma fração e tenho um time de IA que nunca para.': "Before I spent R$ 18k/month on occasional consulting. Now I pay a fraction and have an AI team that never stops.",
    'A gestão por competências transformou nosso RH. Identificamos gaps, criamos trilhas de desenvolvimento e a rotatividade caiu 35%.': 'Competency management transformed our HR. We identified gaps, created development paths, and turnover dropped 35%.',

    // === MISSING FROM SCREENSHOTS ===
    'Precisa de um': 'It needs an',
    // 'que': 'that', // REMOVED - breaks other phrases
    'Encontre': 'Find',
    'seu caminho': 'your path',
    'Associações e Hubs': 'Associations & Hubs',
    'Transforme sua associação de hub de eventos em hub de operação para cada associado.': 'Transform your association from an events hub into an operations hub for each member.',
    'Por que software sozinho': 'Why software alone',
    'não resolve': "doesn't solve it",
    'O que você já tentou': 'What you\'ve already tried',
    'Você valida, a Olívia aprende': 'You validate, Olívia learns',
    'Revise cada entrega, ajuste o que quiser. A IA adapta ao contexto real da sua empresa - e fica mais inteligente a cada feedback.': 'Review every delivery, adjust whatever you want. The AI adapts to your company\'s real context - and gets smarter with every feedback.',
    'Revisão - Processos': 'Review - Processes',
    'Fluxo de vendas': 'Sales flow',
    'Onboarding de clientes': 'Client onboarding',
    'Gestão financeira': 'Financial management',
    'Treinamento do time': 'Team training',
    'APPROVED': 'APPROVED',
    'ADJUSTED': 'ADJUSTED',
    '87% validated': '87% validated',
    'Orbit - Configuração': 'Orbit - Setup',
    'Durante anos as empresas compraram software esperando resolver problemas de gestão. Compraram CRM. Compraram ERP. Compraram plataformas de produtividade. Mas': 'For years, companies bought software hoping to solve management problems. They bought CRM. They bought ERP. They bought productivity platforms. But',
    'ferramentas não geram gestão.': "tools don't generate management.",
    'Gestão acontece quando dados se conectam, decisões são tomadas e processos são executados continuamente.': 'Management happens when data connects, decisions are made, and processes execute continuously.',
    'Nós provamos, em 30 anos de consultoria e 10 anos de plataforma, que gestão digitalizada escala. Agora, damos o próximo passo.': "We've proven, in 30 years of consulting and 10 years of platform, that digitalized management scales. Now, we're taking the next step.",
    'O Orbit nasce para resolver isso. Não criando mais uma ferramenta. Mas criando': 'Orbit is born to solve this. Not by creating another tool. But by creating',
    'um time.': 'a team.',
    'Um time de agentes de inteligência artificial conectados que operam a gestão da empresa continuamente. Liderados pela Olívia. Cada um com sua especialidade. Todos trabalhando com os mesmos dados.': 'A team of connected AI agents that continuously operate company management. Led by Olívia. Each with their specialty. All working with the same data.',
    'E quando o projeto acaba, eles não param. Continuam executando. Continuam aprendendo. Continuam gerando resultado.': "And when the project ends, they don't stop. They keep executing. They keep learning. They keep generating results.",
    'Isso é consultoria recorrente passiva.': "That's recurring passive consulting.",
    'Essa é a nova categoria. Gestão Operada por IA.': 'This is the new category. AI-Operated Management.',
    'Orbit não é software. É o time de gestão que sua empresa sempre precisou.': "Orbit is not software. It's the management team your company always needed.",
    'Robôs inteligentes trabalhando de forma desconectada.': 'Smart robots working disconnected.',
    'Pronto para montar seu': 'Ready to build your',
    'time de IA': 'AI team',
    'Amplie seus': 'Expand your',
    'conhecimentos': 'knowledge',
    '5 Passos para Transformar sua Estratégia em Ação': '5 Steps to Turn Your Strategy Into Action',
    'Guia Completo de Gestão Estratégica para PMEs': 'Complete Guide to Strategic Management for SMEs',
    'Como a IA Melhora a Tomada de Decisão Empresarial': 'How AI Improves Business Decision Making',
    'Ler artigo': 'Read article',
    'Artigo': 'Article',
    'Seu nome completo': 'Your full name',
    'seu@empresa.com': 'your@company.com',
    'Nome da sua empresa': 'Your company name',
    'Alinhe tarefas à sua estratégia e objetivos': 'Align tasks to your strategy and objectives',
    'Desenvolva o potencial máximo do time': "Develop your team's full potential",
    'Garantia de conformidade e qualidade': 'Compliance and quality guarantee',
    'Conheça nossas soluções': 'Meet our solutions',
    'Módulos integrados que cobrem toda a gestão da sua empresa': "Integrated modules covering all your company's management",
    'Padronize e otimize seus processos críticos': 'Standardize and optimize your critical processes',
    'KPIs em tempo real com dashboards inteligentes': 'Real-time KPIs with intelligent dashboards',
    'Alinhe tarefas à sua estratégia e objetivos': 'Align tasks to your strategy and objectives',
    'R$ 997/mês': 'R$ 997/month',
    'R$ 108-204k/mês': 'R$ 108-204k/month',
    '/mês': '/month',
    'R$ 8-12k/mês': 'R$ 8-12k/month',
    'R$ 6-10k/mês': 'R$ 6-10k/month',
    'R$ 7-12k/mês': 'R$ 7-12k/month',
    'R$ 8-15k/mês': 'R$ 8-15k/month',
    'R$ 7-10k/mês': 'R$ 7-10k/month',
    'R$ 5-8k/mês': 'R$ 5-8k/month',
    'R$ 10-15k/mês': 'R$ 10-15k/month',
    'R$ 30-80k/proj': 'R$ 30-80k/project',
    'Orbit - Olívia': 'Orbit - Olívia',

    // === FRAGMENTED TEXT (split by inline tags) ===
    'Gestão Operada por IA com consultoria recorrente passiva. 12 agentes especializados constroem e operam a gestão da sua empresa - trabalhando 24/7, mesmo quando o projeto acaba.': 'AI-Operated Management with recurring passive consulting. 12 specialized agents build and operate your company\'s management - working 24/7, even after the project ends.',
    'consultoria recorrente passiva': 'recurring passive consulting',
    'Conheça os módulos onde os': 'Meet the modules where',
    'agentes operam': 'agents operate',
    'Gestão Operada por IA com': 'AI-Operated Management with',
    'UMA NOVA CATEGORIA': 'A NEW CATEGORY',
    'Uma nova categoria': 'A new category',
    'MANIFESTO': 'MANIFESTO',
    'Precisa de operação.': 'It needs operation.',
    'Orbit não é software. É o time de gestão que sua empresa sempre precisou.': "Orbit is not software. It's the management team your company always needed.",
    'Essa é a nova categoria.': 'This is the new category.',
    'Gestão Operada por IA.': 'AI-Operated Management.',
    'ferramentas não geram gestão.': "tools don't generate management.",
    'Robôs inteligentes trabalhando de forma desconectada.': 'Smart robots working disconnected.',
    'um time.': 'a team.',
    'Isso é consultoria recorrente passiva.': "That's recurring passive consulting.",
    'A primeira geração de inteligência artificial trouxe robôs inteligentes. Mas isolados. Marketing conversa com uma IA. Vendas com outra. RH com outra.': 'The first generation of AI brought smart robots. But isolated. Marketing talks to one AI. Sales to another. HR to another.',
    'Durante anos as empresas compraram software esperando resolver problemas de gestão. Compraram CRM. Compraram ERP. Compraram plataformas de produtividade. Mas': 'For years, companies bought software hoping to solve management problems. They bought CRM. They bought ERP. They bought productivity platforms. But',
    'Nós provamos, em 30 anos de consultoria e 10 anos de plataforma, que gestão digitalizada escala. Agora, damos o próximo passo.': "We've proven, in 30 years of consulting and 10 years of platform, that digitalized management scales. Now, we take the next step.",
    'O Orbit nasce para resolver isso. Não criando mais uma ferramenta. Mas criando': 'Orbit is born to solve this. Not by creating another tool. But by creating',
    'Um time de agentes de inteligência artificial conectados que operam a gestão da empresa continuamente. Liderados pela Olívia. Cada um com sua especialidade. Todos trabalhando com os mesmos dados.': 'A team of connected AI agents that continuously operate company management. Led by Olívia. Each with their specialty. All working with the same data.',
    'E quando o projeto acaba, eles não param. Continuam executando. Continuam aprendendo. Continuam gerando resultado.': "And when the project ends, they don't stop. They keep executing. They keep learning. They keep generating results.",
    'Gestão acontece quando dados se conectam, decisões são tomadas e processos são executados continuamente.': 'Management happens when data connects, decisions are made, and processes execute continuously.',
    'R$ 250': 'R$ 250',
    '~90%': '~90%',
    'próximo de zero': 'near zero',

    // === LP EMPRESAS (lp-empresas.html) ===
    'Sua empresa não precisa de mais ferramentas. Precisa de um time de IA.': "Your company doesn't need more tools. It needs an AI team.",
    'Contrate um': 'Hire an',
    'que executa exatamente o que sua empresa precisa para crescer.': 'that executes exactly what your company needs to grow.',
    'Não é mais um software. São 12 agentes de IA especializados - liderados pela': "It's not another software. They're 12 specialized AI agents - led by",
    ', a Coordenadora Geral de IA - que constroem e operam a gestão da sua empresa. Planejamento, processos, treinamento, indicadores - trabalhando 24/7.': ", the General AI Coordinator - that build and operate your company's management. Planning, processes, training, indicators - working 24/7.",
    'QUERO RESOLVER ISSO': 'I WANT TO SOLVE THIS',
    'O problema real': 'The real problem',
    'Você já tentou. ERP, planilha, Trello, consultoria. E continua apagando incêndio. Apenas 11% das empresas usam IA agentic em produção. As outras 89% ainda estão presas nesse ciclo.': "You've tried. ERP, spreadsheets, Trello, consulting. And you still put out fires. Only 11% of companies use agentic AI in production. The other 89% are still stuck in this cycle.",
    'Como funciona com Orbit': 'How it works with Orbit',
    'Sem alimentar ferramenta. Sem depender de consultor. Dados prontos para ação.': 'No tool feeding. No consultant dependency. Data ready for action.',
    'Consultoria recorrente passiva. A operação não para quando o projeto acaba.': "Recurring passive consulting. Operations don't stop when the project ends.",
    'Resultado: gestão que opera com você, não por você.': 'Result: management that operates with you, not for you.',
    'Um time de IA que nunca para. Custo de 1 funcionário. ROI desde o mês 1.': 'An AI team that never stops. Cost of 1 employee. ROI from month 1.',
    'Constrói o planejamento estratégico da sua empresa. SWOT, BSC, objetivos, planos de ação - tudo em uma tarde.': 'Builds your company\'s strategic planning. SWOT, BSC, objectives, action plans - all in one afternoon.',
    'Diagnóstico estratégico': 'Strategic diagnosis',
    'Definição de objetivos e metas': 'Objectives and goals definition',
    'Planos de ação estruturados': 'Structured action plans',
    'Análise SWOT automatizada': 'Automated SWOT analysis',
    'Equivalente humano': 'Human equivalent',
    'Dir. de Estratégia': 'Director of Strategy',
    'O visionário pragmático. Sempre olhando 6, 12, 18 meses à frente, mas com os pés nos dados de hoje.': 'The pragmatic visionary. Always looking 6, 12, 18 months ahead, but with feet firmly on today\'s data.',
    'Quem nos viu crescer': 'Those who watched us grow',
    'Indústria': 'Industry',
    'Comércio': 'Retail',
    'Tecnologia': 'Technology',
    'Saúde': 'Healthcare',
    'Processos padronizados': 'Standardized processes',
    'KPIs em tempo real': 'Real-time KPIs',
    'Treinamento via WhatsApp': 'WhatsApp training',
    'Planejamento estratégico': 'Strategic planning',
    'Gestão de compliance': 'Compliance management',
    'Controle de custos': 'Cost control',
    'Gestão de estoque': 'Inventory management',
    'Sprint de vendas': 'Sales sprint',
    'Segurança do paciente': 'Patient safety',
    'Acreditação hospitalar': 'Hospital accreditation',
    'Quem está por trás': 'Who is behind it',
    'A liderança de 30 anos de gestão empresarial': '30 years of business management leadership',
    'Diretora de Operações': 'Director of Operations',
    'Diretor de Produto': 'Product Director',
    'Diretor de Vendas': 'Sales Director',
    'Diretor de Tecnologia': 'Technology Director',
    'Time humano': 'Human team',
    'Time Orbit (IA)': 'Orbit Team (AI)',
    'Investimento mensal:': 'Monthly investment:',
    'Disponibilidade:': 'Availability:',
    'Setup:': 'Setup:',
    'Risco:': 'Risk:',
    'Horário comercial': 'Business hours',
    'Garantia 90 dias': '90-day guarantee',
    '30-90 dias de contratação': '30-90 days to hire',
    'Zero CLT': 'No payroll',
    'Rescisões, processos': 'Terminations, lawsuits',
    'Risco zero': 'Zero risk',
    'Setup incluído': 'Setup included',
    'R$ 80-180k/mês': 'R$ 80-180k/month',
    'Pronto para contratar seu time de IA?': 'Ready to hire your AI team?',
    'Agende uma demonstração gratuita. Setup incluso. Garantia de 90 dias.': 'Schedule a free demo. Setup included. 90-day guarantee.',
    'QUERO MEU TIME DE IA': 'I WANT MY AI TEAM',
    'Nenhuma contratação': 'No hiring needed',
    'Operação em 7 dias': 'Operation in 7 days',

    // === CONSULTORES (consultores.html) ===
    '30+ consultorias já são recorrentes com o Orbit': '30+ consultancies are already recurring with Orbit',
    'Pare de vender projeto. Comece a vender operação.': 'Stop selling projects. Start selling operations.',
    'Seja uma plataforma de funcionários de IA para os seus clientes.': 'Become an AI employees platform for your clients.',
    'Transforme consultoria pontual em operação recorrente. Seus clientes ficam, sua receita cresce, seus agentes trabalham 24/7.': 'Transform one-time consulting into recurring operations. Your clients stay, your revenue grows, your agents work 24/7.',
    'QUERO SER UMA PLATAFORMA DE IA PARA MEUS CLIENTES': 'I WANT TO BE AN AI PLATFORM FOR MY CLIENTS',
    '2 min': '2 min',
    '100% gratuito': '100% free',
    'Sem compromisso': 'No commitment',
    'Reconhece esse ciclo?': 'Recognize this cycle?',
    '"Quando o projeto acaba, o cliente vai embora."': '"When the project ends, the client leaves."',
    '"Minha receita depende 100% da minha agenda."': '"My revenue depends 100% on my schedule."',
    '"O mercado está comoditizando o que eu faço."': '"The market is commoditizing what I do."',
    '"Não consigo escalar sem contratar gente."': '"I can\'t scale without hiring people."',
    '"Fico refém da próxima venda."': '"I\'m hostage to the next sale."',
    '"Eu entendo. Com o Orbit, seus clientes operam com IA - e você ganha receita recorrente."': '"I understand. With Orbit, your clients operate with AI - and you earn recurring revenue."',
    'QUERO SAIR DESSE CICLO': 'I WANT TO BREAK THIS CYCLE',
    'churn estrutural': 'structural churn',
    'O novo modelo': 'The new model',
    'Modelo anterior': 'Previous model',
    'Modelo Orbit': 'Orbit model',
    'Vende projeto': 'Sell project',
    'Entrega': 'Deliver',
    'Cliente sai': 'Client leaves',
    'Vende de novo': 'Sell again',
    'Implanta com IA': 'Deploy with AI',
    'Agentes operam 24/7': 'Agents operate 24/7',
    'Cliente fica': 'Client stays',
    'Receita recorrente': 'Recurring revenue',
    'Ciclo de churn: repete infinitamente': 'Churn cycle: repeats infinitely',
    'Crescimento contínuo com receita previsível': 'Continuous growth with predictable revenue',
    'A matemática do canal': 'The channel math',
    'Receita por cliente': 'Revenue per client',
    'Margem operacional': 'Operational margin',
    'Custo de tecnologia': 'Technology cost',
    'Cenário': 'Scenario',
    'Receita mensal': 'Monthly revenue',
    'Custo zero de tecnologia': 'Zero technology cost',
    '10 clientes': '10 clients',
    '20 clientes': '20 clients',
    '50 clientes': '50 clients',
    'Receita anual': 'Annual revenue',
    'Nota: valores estimados. Receita real depende do plano contratado pelo cliente.': 'Note: estimated values. Actual revenue depends on the plan chosen by the client.',
    'O que você oferece aos seus clientes': 'What you offer your clients',
    'Benefícios exclusivos': 'Exclusive benefits',
    'White-label disponível': 'White-label available',
    'Dashboard do parceiro': 'Partner dashboard',
    'Materiais de venda prontos': 'Ready-made sales materials',
    'Suporte dedicado ao canal': 'Dedicated channel support',
    'Treinamento e certificação': 'Training and certification',
    'Comissão recorrente vitalícia': 'Lifetime recurring commission',
    'Roadmap': 'Roadmap',
    'Lançamento': 'Launch',
    'Plataforma disponível para canais com white-label básico e primeiros 12 agentes.': 'Platform available for channels with basic white-label and first 12 agents.',
    'Expansão': 'Expansion',
    'Agentes customizáveis por vertical, marketplace de templates e API para integrações.': 'Customizable agents by vertical, template marketplace and API for integrations.',
    'Escala': 'Scale',
    'Ecossistema completo com certificações avançadas, co-branding e funcionalidades enterprise.': 'Complete ecosystem with advanced certifications, co-branding and enterprise features.',
    'Pronto para ter receita recorrente real?': 'Ready for real recurring revenue?',
    'Cada dia fora é receita que você não está gerando. Comece agora.': 'Every day out is revenue you\'re not generating. Start now.',
    'QUERO SER PLATAFORMA DE IA': 'I WANT TO BE AN AI PLATFORM',

    // === PRICING (pricing.html) ===
    'Investimento': 'Investment',
    'Quanto custa montar seu time de IA?': 'How much does it cost to build your AI team?',
    'Uma fração do custo de um time humano. Setup + onboarding inclusos.': 'A fraction of the cost of a human team. Setup + onboarding included.',
    '12 especialistas': '12 specialists',
    'Olívia coordenadora': 'Olívia coordinator',
    'Setup + onboarding': 'Setup + onboarding',
    'Garantia 90 dias ou dinheiro de volta': '90-day guarantee or money back',
    'Equivale a R$ 66/dia - um café por funcionário': 'Equals R$ 66/day - a coffee per employee',
    'Canais de receita recorrente': 'Recurring revenue channels',
    'É consultor, mentor ou associação? Ofereça o Orbit aos seus clientes com white-label e ganhe receita recorrente.': 'Are you a consultant, mentor or association? Offer Orbit to your clients with white-label and earn recurring revenue.',
    'de receita por cliente/mês': 'revenue per client/month',
    'de margem': 'margin',
    'Conhecer o modelo de canais': 'Learn about the channel model',
    'Posso trocar de plano?': 'Can I switch plans?',
    'Sim! Você pode fazer upgrade ou downgrade a qualquer momento. A diferença é calculada proporcionalmente.': 'Yes! You can upgrade or downgrade at any time. The difference is calculated proportionally.',
    'Tem contrato de fidelidade?': 'Is there a lock-in contract?',
    'Não. Todos os planos são sem fidelidade. Cancele quando quiser, sem multa.': 'No. All plans have no lock-in. Cancel anytime, no penalty.',
    'O que acontece após os 90 dias de garantia?': 'What happens after the 90-day guarantee?',
    'Você continua usando normalmente. A garantia é apenas para dar segurança de que vai funcionar. Após 90 dias, cancele quando quiser.': 'You keep using it normally. The guarantee is just to assure you it works. After 90 days, cancel whenever you want.',
    'Inclui suporte?': 'Does it include support?',
    'Sim! Todos os planos incluem suporte. O Advanced tem onboarding dedicado e o Pro inclui um gerente de sucesso.': 'Yes! All plans include support. Advanced has dedicated onboarding and Pro includes a success manager.',
    'Comece a operar com IA': 'Start operating with AI',

    // === AGENTES (agentes.html) ===
    '12 Agentes Especializados': '12 Specialized Agents',
    'Seu time de IA. Sempre disponível.': 'Your AI team. Always available.',
    'Cada agente é um especialista. Trabalham 24h por dia, 7 dias por semana. Não tiram férias. Não pedem aumento. E custam uma fração de um time humano.': "Each agent is a specialist. They work 24 hours a day, 7 days a week. They don't take vacations. They don't ask for raises. And they cost a fraction of a human team.",
    'agentes': 'agents',
    'disponibilidade': 'availability',
    '/mês economizados': '/month saved',
    'A líder do time': 'The team leader',
    'Tensões produtivas': 'Productive tensions',
    'Os agentes foram desenhados com personalidades complementares que geram confronto de ideias - e decisões melhores.': 'The agents were designed with complementary personalities that generate idea confrontation - and better decisions.',
    'Cautela': 'Caution',
    'Ação': 'Action',
    'O Agente de Riscos identifica ameaças e sugere prudência. O de Oportunidades empurra para a ação. A Olívia arbitra.': 'The Risk Agent identifies threats and suggests caution. The Opportunities Agent pushes for action. Olívia arbitrates.',
    'Apagar incêndio': 'Firefighting',
    'Redesenhar': 'Redesign',
    'O Agente de Problemas resolve não-conformidades. O de Processos redesenha o fluxo para que não aconteça de novo.': 'The Problems Agent resolves non-conformities. The Process Agent redesigns the flow so it doesn\'t happen again.',
    'Dado': 'Data',
    'Visão': 'Vision',
    'O Agente de Indicadores confronta os números. O Estrategista questiona a visão. Juntos, calibram a direção.': 'The Indicators Agent confronts the numbers. The Strategist questions the vision. Together, they calibrate direction.',
    'Custo do time humano equivalente': 'Cost of the equivalent human team',
    'Os 12 agentes do Orbit substituem profissionais que custariam entre R$ 80-180k/mês em salários e consultorias.': "Orbit's 12 agents replace professionals that would cost between R$ 80-180k/month in salaries and consulting.",

    // === FAQ (faq.html) ===
    'Central de Ajuda': 'Help Center',
    'Perguntas Frequentes': 'Frequently Asked Questions',
    'Tudo que você precisa saber sobre o Orbit, nossos agentes de IA e como funciona.': 'Everything you need to know about Orbit, our AI agents and how it works.',
    'Sobre o Orbit': 'About Orbit',
    'O que é o Orbit?': 'What is Orbit?',
    'O Orbit é uma plataforma de gestão empresarial com 12 agentes de IA integrados. Não é mais um software - são agentes especializados que constroem e operam a gestão da sua empresa. Planejamento, processos, treinamento, indicadores - trabalhando 24/7.': "Orbit is a business management platform with 12 integrated AI agents. It's not just software - they're specialized agents that build and operate your company's management. Planning, processes, training, indicators - working 24/7.",
    'Para quem é indicado?': 'Who is it for?',
    'Para empresas de 5 a 100+ funcionários, faturamento de R$ 500k a R$ 20M/ano, de qualquer segmento. Em 30 anos, já atendemos 8.000+ empresas de todos os setores.': 'For companies with 5 to 100+ employees, revenue from R$ 500k to R$ 20M/year, in any industry. In 30 years, we have served 8,000+ companies across all sectors.',
    'É mais um software?': 'Is it just another software?',
    'Não. Software é ferramenta vazia que espera ser alimentada. O Orbit tem agentes de IA que fazem o trabalho pesado. Você valida e decide - não alimenta.': "No. Software is an empty tool that waits to be fed. Orbit has AI agents that do the heavy lifting. You validate and decide - you don't feed it.",
    'Funciona pro meu segmento?': 'Does it work for my industry?',
    'Sim. Gestão por processos e indicadores é universal. O que muda é o conteúdo - e a IA personaliza para cada empresa.': 'Yes. Management by processes and indicators is universal. What changes is the content - and AI personalizes it for each company.',
    'Quem é Olívia?': 'Who is Olívia?',
    'Olívia é a Coordenadora Geral de IA do Orbit - a líder do time de 12 agentes. Ela conecta dados de todos os departamentos, coordena a atuação dos agentes e traduz a complexidade em clareza para a tomada de decisão. Dentro do produto, Olívia é a especialista no seu negócio específico e o seu ponto de contato principal com o sistema.': "Olívia is Orbit's General AI Coordinator - the leader of the 12-agent team. She connects data from all departments, coordinates agent actions and translates complexity into clarity for decision-making. Within the product, Olívia is the expert on your specific business and your main point of contact with the system.",
    'O que é Gestão Operada por IA?': 'What is AI-Operated Management?',
    'Gestão Operada por IA é uma nova categoria onde um time de agentes de inteligência artificial executa continuamente as funções de gestão de uma empresa. Diferente de ferramentas ou chatbots, os agentes do Orbit trabalham de forma autônoma após a configuração - isso é consultoria recorrente passiva: a gestão continua acontecendo mesmo sem intervenção humana constante. Apenas 11% das empresas utilizam IA agentic em produção (Deloitte, 2025), o que significa que quem adotar agora está na vanguarda.': "AI-Operated Management is a new category where a team of AI agents continuously executes a company's management functions. Unlike tools or chatbots, Orbit's agents work autonomously after setup - this is recurring passive consulting: management keeps happening even without constant human intervention. Only 11% of companies use agentic AI in production (Deloitte, 2025), which means those who adopt now are at the forefront.",
    'Como os 12 agentes trabalham juntos?': 'How do the 12 agents work together?',
    'Os agentes foram desenhados com personalidades complementares que geram tensões produtivas. O Agente de Riscos debate com o de Oportunidades (cautela vs. ação). O de Problemas trabalha com o de Processos (apagar incêndio vs. redesenhar). O de Indicadores confronta o Estrategista (dado vs. visão). A Olívia orquestra essas dinâmicas, resolve conflitos e traduz para o empresário o que o time está fazendo - e por quê.': 'The agents were designed with complementary personalities that generate productive tensions. The Risk Agent debates with Opportunities (caution vs. action). Problems works with Processes (firefighting vs. redesign). Indicators confronts the Strategist (data vs. vision). Olívia orchestrates these dynamics, resolves conflicts and translates for the business owner what the team is doing - and why.',
    'Implementação': 'Implementation',
    'Quanto tempo leva?': 'How long does it take?',
    'Cadastro em 5 minutos. Planejamento e processos em 1 tarde. Operação completa em 7 dias.': 'Registration in 5 minutes. Planning and processes in 1 afternoon. Full operation in 7 days.',
    'Meu time vai precisar aprender?': 'Will my team need to learn?',
    'Seu time nem precisa logar. Processos e treinamentos chegam pelo WhatsApp - que todo mundo já usa.': "Your team doesn't even need to log in. Processes and training come via WhatsApp - which everyone already uses.",
    'Preciso de infraestrutura de TI?': 'Do I need IT infrastructure?',
    'Não. O Orbit roda 100% na nuvem. Só precisa de internet.': 'No. Orbit runs 100% in the cloud. You just need internet.',
    'Quanto custa?': 'How much does it cost?',
    'O investimento varia conforme o tamanho da empresa. Temos planos a partir de R$ 997/mês. O time humano equivalente custaria R$ 80-180k/mês.': 'The investment varies based on company size. We have plans starting at R$ 997/month. The equivalent human team would cost R$ 80-180k/month.',
    'Tem plano anual?': 'Is there an annual plan?',
    'Sim. O plano anual tem 20% de desconto sobre o mensal.': 'Yes. The annual plan has a 20% discount over the monthly plan.',
    'E se não funcionar?': "What if it doesn't work?",
    'Garantia de 90 dias. Se não gerar resultado, devolvemos seu investimento. Risco zero.': "90-day guarantee. If it doesn't generate results, we return your investment. Zero risk.",
    'Para Consultores / Canais': 'For Consultants / Channels',
    'Posso oferecer o Orbit aos meus clientes?': 'Can I offer Orbit to my clients?',
    'Sim! Temos um programa de canais com receita recorrente de ~R$ 250/mês por cliente, margem de ~90% e custo zero de tecnologia.': 'Yes! We have a channel program with recurring revenue of ~R$ 250/month per client, ~90% margin and zero technology cost.',
    'Vou poder criar meus próprios agentes?': 'Will I be able to create my own agents?',
    'Sim. O roadmap inclui ferramentas para que canais configurem agentes específicos para suas verticais.': 'Yes. The roadmap includes tools for channels to configure specific agents for their verticals.',
    'É white-label?': 'Is it white-label?',
    'Sim. Sua marca, seu relacionamento, seus clientes. O Orbit é a infraestrutura.': 'Yes. Your brand, your relationship, your clients. Orbit is the infrastructure.',
    'O que é consultoria recorrente passiva?': 'What is recurring passive consulting?',
    'É o modelo onde agentes de IA continuam executando as tarefas de gestão de forma autônoma após a configuração inicial do projeto. Diferente da consultoria tradicional - onde o consultor entrega o projeto e o cliente não mantém -, os agentes do Orbit garantem operação contínua. Para o consultor, isso significa receita recorrente real: o cliente continua pagando porque a gestão continua funcionando. É a solução para o churn estrutural da consultoria.': "It's the model where AI agents continue executing management tasks autonomously after the initial project setup. Unlike traditional consulting - where the consultant delivers the project and the client doesn't maintain it -, Orbit's agents ensure continuous operation. For the consultant, this means real recurring revenue: the client keeps paying because management keeps working. It's the solution for structural consulting churn.",
    'Não encontrou sua resposta?': "Didn't find your answer?",
    'Fale com nosso time e tire todas as suas dúvidas.': 'Talk to our team and clear all your doubts.',
    'Falar com o Time': 'Talk to the Team',

    // === SOBRE (sobre.html) ===
    'Sobre o Orbit': 'About Orbit',
    '30 anos de gestão empresarial.': '30 years of business management.',
    'de gestão empresarial.': 'of business management.',
    'de gestão empresarial': 'of business management',
    'Agora com IA.': 'Now with AI.',
    'O Orbit nasceu do Grupo GSN, o maior grupo de consultoria em gestão e ISO do Brasil. Nossa missão: transformar a gestão empresarial com agentes de IA especializados.': "Orbit was born from Grupo GSN, Brazil's largest management and ISO consulting group. Our mission: transform business management with specialized AI agents.",
    'Anos de experiência': 'Years of experience',
    'Empresas atendidas': 'Companies served',
    'Empresas no Orbit': 'Companies on Orbit',
    'De satisfação': 'Satisfaction',
    'Consultorias parceiras': 'Partner consultancies',
    'Agentes de IA especializados': 'Specialized AI agents',
    'Nossa Trajetória': 'Our Journey',
    'Uma história de': 'A story of',
    'transformação': 'transformation',
    'De consultoria presencial a plataforma com IA - cada passo construiu o que somos hoje.': 'From in-person consulting to AI platform - each step built what we are today.',
    'Há 30 anos': '30 years ago',
    'O início': 'The beginning',
    'Grupo GSN nasce como consultoria de gestão e ISO, levando profissionalização para empresas de todos os portes e segmentos do Brasil.': 'Grupo GSN is born as a management and ISO consulting firm, bringing professionalization to companies of all sizes and industries in Brazil.',
    '8.000+ empresas depois': '8,000+ companies later',
    'Liderança nacional': 'National leadership',
    'O Grupo GSN se consolida como o maior grupo de consultoria em gestão do Brasil, com uma rede de mais de 30 consultorias parceiras.': "Grupo GSN consolidates as Brazil's largest management consulting group, with a network of over 30 partner consultancies.",
    'A evolução': 'The evolution',
    'Do presencial ao digital': 'From in-person to digital',
    'A plataforma é digitalizada, passando a atender milhares de empresas de forma escalável sem perder a essência consultiva.': 'The platform is digitalized, now serving thousands of companies in a scalable way without losing the consulting essence.',
    '2026 - O Orbit': '2026 - Orbit',
    'IA integrada à gestão': 'AI integrated into management',
    '12 agentes de IA especializados são integrados à plataforma. Consultoria recorrente, automatizada e acessível para qualquer empresa.': '12 specialized AI agents are integrated into the platform. Recurring, automated and accessible consulting for any company.',
    '"A consultoria não morre - ela evolui. O que antes exigia um consultor presencial, agora um agente de IA executa 24/7."': '"Consulting doesn\'t die - it evolves. What once required an in-person consultant, now an AI agent executes 24/7."',
    'Grupo GSN': 'Grupo GSN',
    'Como tudo se conecta': 'How it all connects',
    'O ecossistema completo do Grupo GSN': "Grupo GSN's complete ecosystem",
    'Plataforma central SaaS com 12 agentes de IA especializados em gestão empresarial.': 'Central SaaS platform with 12 AI agents specialized in business management.',
    'CONVERSÃO': 'CONVERSION',
    'Consultoria de gestão e conformidade. A expertise humana por trás de 30 anos de mercado.': 'Management and compliance consulting. The human expertise behind 30 years of market experience.',
    'OPERAÇÃO': 'OPERATIONS',
    'Comunidade de mentoria e consultores. Rede colaborativa de especialistas em gestão.': 'Mentoring and consulting community. Collaborative network of management experts.',
    'RETENÇÃO': 'RETENTION',
    'Eventos e imersões de aquisição. Experiências presenciais de alto impacto para empresários.': 'Acquisition events and immersions. High-impact in-person experiences for business owners.',
    'AQUISIÇÃO': 'ACQUISITION',
    'Liderança': 'Leadership',
    'A equipe que construiu 30 anos de história em gestão': 'The team that built 30 years of management history',
    'Sede: Square SC, Florianópolis - SC': 'Headquarters: Square SC, Florianópolis - SC',

    // === PARCERIAS (parcerias.html) ===
    'Programa de Parcerias': 'Partnership Program',
    'Mais receita para sua': 'More revenue for your',
    'consultoria': 'consulting firm',
    'Junte-se ao programa de parcerias da Orbit Gestão e ofereça soluções de gestão integrada aos seus clientes. Receita recorrente, suporte dedicado e treinamento completo.': "Join Orbit Gestão's partnership program and offer integrated management solutions to your clients. Recurring revenue, dedicated support and complete training.",
    'Quero ser Parceiro': 'I Want to be a Partner',
    'Ver planos': 'See plans',
    'Clientes ativos': 'Active clients',
    'Comissão recorrente': 'Recurring commission',
    'Parceiros ativos': 'Active partners',
    'Anos de mercado': 'Years in market',
    'Por que se tornar parceiro?': 'Why become a partner?',
    'Oferecemos uma oportunidade real de crescimento para consultores e agências': 'We offer a real growth opportunity for consultants and agencies',
    'Receita Recorrente': 'Recurring Revenue',
    'Comissões mensais por cada cliente indicado. Estrutura transparente e competitiva de remuneração.': 'Monthly commissions for each referred client. Transparent and competitive compensation structure.',
    'Inovação Contínua': 'Continuous Innovation',
    'Acesso prioritário a novas funcionalidades. Seja o primeiro a oferecer novidades aos seus clientes.': 'Priority access to new features. Be the first to offer innovations to your clients.',
    'Suporte Dedicado': 'Dedicated Support',
    'Conta de sucesso dedicada, materiais de marketing exclusivos e prioridade no atendimento.': 'Dedicated success account, exclusive marketing materials and priority support.',
    'Treinamento e Certificação': 'Training and Certification',
    'Programa de capacitação completo. Certificação oficial de especialista Orbit para sua equipe.': 'Complete training program. Official Orbit specialist certification for your team.',
    'Comunidade de Parceiros': 'Partner Community',
    'Rede exclusiva de consultores e agências. Partilhe conhecimentos e boas práticas.': 'Exclusive network of consultants and agencies. Share knowledge and best practices.',
    'Oportunidades de Negócio': 'Business Opportunities',
    'Acesso a prospectos qualificados. Oportunidades pré-selecionadas para seu perfil.': 'Access to qualified prospects. Pre-selected opportunities for your profile.',
    'Quatro passos simples para começar a gerar receita recorrente': 'Four simple steps to start generating recurring revenue',
    'Cadastre sua empresa': 'Register your company',
    'Preencha o formulário de parceria com informações da sua empresa e comece imediatamente.': "Fill in the partnership form with your company's information and start immediately.",
    'Capacitação completa': 'Full training',
    'Participe da capacitação e aprenda tudo sobre nossas soluções, argumentação comercial e cases de sucesso.': 'Participate in training and learn everything about our solutions, sales arguments and success cases.',
    'Indique e acompanhe': 'Refer and track',
    'Indique clientes e ofereça nossas soluções como parte do seu portfólio. Acompanhe cada etapa em tempo real.': 'Refer clients and offer our solutions as part of your portfolio. Track each step in real time.',
    'Receita recorrente - todo mês': 'Recurring revenue - every month',
    'Ganhe comissões mensais por cada cliente ativo. Quanto mais indica, mais cresce sua receita passiva.': 'Earn monthly commissions for each active client. The more you refer, the more your passive income grows.',
    '1 semana': '1 week',
    'contínuo': 'ongoing',
    'recorrente': 'recurring',
    'Concluído': 'Completed',
    'Em andamento': 'In progress',
    '75% concluído': '75% completed',
    'Argumentação comercial': 'Sales argumentation',
    'Cases de sucesso': 'Success cases',
    'Ativado': 'Activated',
    'Proposta enviada': 'Proposal sent',
    'Comissão': 'Commission',
    'Margem recorrente': 'Recurring margin',
    'Enviar cadastro': 'Submit registration',
    'Nome': 'Name',
    'E-mail': 'Email',
    'Telefone': 'Phone',
    'Área de atuação': 'Field of expertise',
    'Tipo de parceria': 'Partnership type',
    'Número de clientes': 'Number of clients',
    'Mensagem': 'Message',
    'Enviar': 'Submit',
    'Obrigado!': 'Thank you!',
    'Enviado com sucesso!': 'Sent successfully!',

    // === BLOG (blog/index.html) ===
    'Conhecimento & Estratégia': 'Knowledge & Strategy',
    'conhecimentos': 'knowledge',
    'Artigos e insights sobre gestão estratégica para empresas que querem resultados reais.': 'Articles and insights on strategic management for companies that want real results.',
    'Todos': 'All',
    'Gestão Estratégica': 'Strategic Management',
    'IA & Inovação': 'AI & Innovation',
    'Nenhum artigo encontrado nesta categoria.': 'No articles found in this category.',
    'Em breve novos conteúdos serão publicados.': 'New content will be published soon.',
    'Pronto para transformar sua gestão?': 'Ready to transform your management?',
    'Conheça o time de IA que executa a estratégia da sua empresa.': "Meet the AI team that executes your company's strategy.",
    'Leia Mais': 'Read More',

    // === AGENTES PAGE - Agent quotes ===
    'Você está crescendo 12% ao trimestre, mas sua estrutura de custos vai travar o crescimento em 8 meses. Precisamos falar sobre isso agora.': "You're growing 12% per quarter, but your cost structure will block growth in 8 months. We need to talk about this now.",
    'Esse processo tem 4 etapas que não agregam valor. Vamos cortar para 3 e ganhar 22 horas/mês.': "This process has 4 steps that add no value. Let's cut to 3 and gain 22 hours/month.",
    'O turnover do comercial subiu 18% no trimestre. Não é salário - é a falta de clareza nas metas.': "Sales turnover went up 18% this quarter. It's not salary - it's the lack of clarity in goals.",
    'Três vendedores erraram o mesmo passo da negociação esta semana. Não é falta de vontade - é falta de treino. Montei uma trilha de 45 minutos que resolve isso.': "Three salespeople made the same negotiation mistake this week. It's not lack of will - it's lack of training. I built a 45-minute path that fixes this.",
    'Margem bruta caiu 3,2 pontos em fevereiro. Não é sazonal - o custo de matéria-prima subiu acima do repasse. Se não corrigir agora, março compromete o trimestre.': "Gross margin dropped 3.2 points in February. It's not seasonal - raw material cost rose above pass-through. If not corrected now, March compromises the quarter.",
    'Pipeline saudável, mas 40% das oportunidades paradas há mais de 15 dias. Vou atacar as 5 maiores hoje.': "Healthy pipeline, but 40% of opportunities stalled for over 15 days. I'll tackle the 5 biggest today.",
    'Três concorrentes seus mudaram o modelo de precificação nos últimos 60 dias. Todos foram para assinatura. Tem uma janela aqui que vale investigar.': 'Three of your competitors changed their pricing model in the last 60 days. All went to subscription. There is a window here worth investigating.',
    'De novo essa falha no processo de entrega. Terceira vez no mês. Já corrigi - mas da próxima, vou escalar pro Processos redesenhar o fluxo inteiro.': "Again this delivery process failure. Third time this month. Already fixed - but next time, I'll escalate to Processes to redesign the entire flow.",
    'Essa expansão é atraente, mas o fluxo de caixa não aguenta os dois primeiros meses. Vamos montar um plano B antes.': "This expansion is attractive, but cash flow can't handle the first two months. Let's build a plan B first.",
    'A ata da reunião de ontem já está organizada com decisões, responsáveis e prazos. E encontrei que essa mesma decisão foi tomada em setembro e não executada.': "Yesterday's meeting minutes are already organized with decisions, responsible parties and deadlines. And I found that this same decision was made in September and never executed.",
    'A reunião de segunda durou 47 minutos. Foram tomadas 3 decisões, 2 tinham responsável claro. A terceira ficou em aberto - estou cobrando agora.': "Monday's meeting lasted 47 minutes. 3 decisions were made, 2 had clear ownership. The third remained open - I'm following up now.",
    'A Orquestradora': 'The Orchestrator',
    'Analisa formulários, pesquisas de clima organizacional e gera insights acionáveis.': 'Analyzes surveys, organizational climate research and generates actionable insights.',
    'Analisa mercado, portfólio de produtos e parcerias para identificar oportunidades de crescimento e diversificação.': 'Analyzes market, product portfolio and partnerships to identify growth and diversification opportunities.',
    'Análise de causa raiz (Ishikawa, 5 Porquês)': 'Root cause analysis (Ishikawa, 5 Whys)',
    'Análise de formulários': 'Survey analysis',
    'Análise de mercado e tendências': 'Market and trend analysis',
    'Avaliação de desempenho': 'Performance evaluation',
    'Ações corretivas proativas': 'Proactive corrective actions',
    'Coaching comercial com IA': 'AI-powered sales coaching',
    'Conexão entre documentos relacionados': 'Connection between related documents',
    'Conteúdo personalizado': 'Personalized content',
    'Controle de versões': 'Version control',
    'Acompanhamento de eficácia': 'Effectiveness tracking',
    'Acompanhamento de follow-ups': 'Follow-up tracking',
    'Acompanhamento de funil de vendas': 'Sales funnel tracking',
    'Decisões baseadas em dados': 'Data-driven decisions',
    'Descrição de cargos com IA': 'AI-powered job descriptions',
    'Documentação sempre atualizada': 'Always updated documentation',
    'Auditorias automatizadas': 'Automated audits',
    'Conformidade contínua': 'Continuous compliance',
    'Analista de documentação': 'Documentation analyst',
    'Analista sênior de processos': 'Senior process analyst',
    '12 agentes especializados, setup incluso, garantia de 90 dias. Trabalhando 24/7.': '12 specialized agents, setup included, 90-day guarantee. Working 24/7.',
    '12 especialistas. 24/7.': '12 specialists. 24/7.',
    'Ativar agentes': 'Activate agents',
    'Dúvidas': 'Questions',

    // === CONSULTORES PAGE - additional missing ===
    'Sell project → entrega → cliente sai → precisa vender de novo. O inimigo não é a concorrência. É o': 'Sell project → deliver → client leaves → need to sell again. The enemy is not the competition. It is',
    'Vende projeto → entrega → cliente sai → precisa vender de novo. O inimigo não é a concorrência. É o': 'Sell project → deliver → client leaves → need to sell again. The enemy is not the competition. It is',
    'Modelo de negócio': 'Business model',
    'Ganhe recorrência com IA trabalhando pelo seu cliente.': 'Earn recurring revenue with AI working for your client.',
    'Ganhe recorrência com IA': 'Earn recurring revenue with AI',
    'trabalhando pelo seu cliente.': 'working for your client.',
    'Pare de depender de novos projetos. With Orbit, agents continuam executando - e você ganha receita recurring real.': 'Stop depending on new projects. With Orbit, agents keep executing - and you earn real recurring revenue.',
    'Pare de depender de novos projetos.': 'Stop depending on new projects.',
    'você ganha receita': 'you earn revenue',
    'real.': 'real.',
    'Modelo Tradicional': 'Traditional Model',
    'Modelo com Orbit': 'Model with Orbit',
    'Recomendado': 'Recommended',
    'Projeto pontual': 'One-time project',
    'Escopo fechado, prazo curto, entrega única': 'Fixed scope, short deadline, single delivery',
    'Deliver e encerramento': 'Delivery and closure',
    'Delivere encerramento': 'Delivery and closure',
    'Sem operação contínua, cliente para de pagar': 'Without continuous operation, client stops paying',
    'Precisa vender um novo projeto para faturar': 'Needs to sell a new project to earn',
    'Receita instável, ciclo de venda eterno': 'Unstable revenue, eternal sales cycle',
    'Receita caindo': 'Revenue dropping',
    'Prazo: 30 dias': 'Deadline: 30 days',
    'Projeto + ativação de agents': 'Project + agent activation',
    'Projeto + ativação de agentes': 'Project + agent activation',
    'Mesmo escopo, mas agora com IA embutida': 'Same scope, but now with embedded AI',
    'Operação contínua com IA': 'Continuous operation with AI',
    'Receita crescente': 'Growing revenue',
    'Receita previsível, margem ~90%, crescimento composto': 'Predictable revenue, ~90% margin, compound growth',
    'Expansion natural': 'Natural expansion',
    'Expansão natural': 'Natural expansion',
    'Sem venda nova': 'No new sale',
    'Activated agents': 'Activated agents',
    'Cliente continua pagando porque agentes continuam trabalhando.': 'Client keeps paying because agents keep working.',
    'Você ganha receita recurring real. Isso é': 'You earn real recurring revenue. This is',
    'Você ganha receita recorrente real. Isso é': 'You earn real recurring revenue. This is',
    'O CEO da IBM Consulting declarou que consulting firms devem agir como empresas de software para sobreviver à era da IA. A IBM já desenvolveu mais de 5.000 agents digitais.': 'The CEO of IBM Consulting stated that consulting firms must act like software companies to survive the AI era. IBM has already developed over 5,000 digital agents.',
    'O CEO da IBM Consulting declarou': 'The CEO of IBM Consulting stated',
    'consulting firms devem agir como empresas de software para sobreviver à era da IA. A IBM já desenvolveu mais de 5.000 agents digitais.': 'consulting firms must act like software companies to survive the AI era. IBM has already developed over 5,000 digital agents.',
    'margin para você': 'margin for you',
    'custo de tecnologia': 'technology cost',
    'Clientes': 'Clients',
    'Receita Monthly': 'Monthly Revenue',
    'Receita Annual': 'Annual Revenue',
    'Receita Mensal': 'Monthly Revenue',
    'Receita Anual': 'Annual Revenue',
    '/ano': '/year',
    'R$ 2.500/month': 'R$ 2,500/month',
    'R$ 6.250/month': 'R$ 6,250/month',
    'R$ 12.500/month': 'R$ 12,500/month',
    'R$ 25.000/month': 'R$ 25,000/month',
    'R$ 30.000/ano': 'R$ 30,000/year',
    'R$ 75.000/ano': 'R$ 75,000/year',
    'R$ 150.000/ano': 'R$ 150,000/year',
    'R$ 300.000/ano': 'R$ 300,000/year',
    'Além da recorrência, você ganha na implementação (projeto único por cliente).': 'Besides recurring revenue, you earn on implementation (one-time project per client).',
    'O time que você oferece ao seu cliente': 'The team you offer your client',
    'O time': 'The team',
    'você oferece ao seu cliente': 'you offer your client',
    'Coordenados pela Olívia.': 'Coordinated by Olívia.',
    'O que você ganha como parceiro': 'What you earn as a partner',
    'Receita que não depende da sua agenda.': 'Revenue that does not depend on your schedule.',
    'Receita que': 'Revenue that',
    'não depende da sua agenda.': "does not depend on your schedule.",
    'Sua marca, seu relacionamento. O cliente é seu do início ao fim.': 'Your brand, your relationship. The client is yours from start to finish.',
    'Sua marca, seu relacionamento.': 'Your brand, your relationship.',
    'O cliente é seu do início ao fim.': 'The client is yours from start to finish.',
    'Lock-in Natural': 'Natural Lock-in',
    'Zero Investimento': 'Zero Investment',
    'O Grupo GSN opera toda a plataforma. Você não paga nada pela tecnologia.': "Grupo GSN operates the entire platform. You don't pay anything for the technology.",
    'O Grupo GSN opera toda a plataforma.': 'Grupo GSN operates the entire platform.',
    'Você não paga nada pela tecnologia.': "You don't pay anything for the technology.",
    'Suporte Dedicado': 'Dedicated Support',
    'Onboarding, materiais de venda, treinamento e suporte técnico inclusos.': 'Onboarding, sales materials, training and technical support included.',
    'Roadmap de Agentes': 'Agent Roadmap',
    'Em breve, agents customizáveis para suas verticais específicas.': 'Soon, customizable agents for your specific verticals.',
    'Em breve, agentes customizáveis para suas verticais específicas.': 'Soon, customizable agents for your specific verticals.',
    'E isso é só o começo': "And this is just the beginning",
    'O futuro: agents customizáveis': 'The future: customizable agents',
    'O futuro: agentes customizáveis': 'The future: customizable agents',
    'Em breve, você poderá criar agents específicos para suas verticais. Sua metodologia, operacionalizada por IA.': 'Soon, you will be able to create specific agents for your verticals. Your methodology, operationalized by AI.',
    'Em breve, você poderá criar agentes específicos para suas verticais. Sua metodologia, operacionalizada por IA.': 'Soon, you will be able to create specific agents for your verticals. Your methodology, operationalized by AI.',
    'Agora': 'Now',
    'Configurador de Agentes': 'Agent Configurator',
    'VERTICAL': 'VERTICAL',
    'Consultoria financeira': 'Financial consulting',
    'MÉTODO': 'METHOD',
    'Sua metodologia própria': 'Your own methodology',
    'Gerar agente': 'Generate agent',
    'Marketplace de agents. Crie, publique e monetize seus próprios agents.': 'Agent marketplace. Create, publish and monetize your own agents.',
    'Marketplace de agentes. Crie, publique e monetize seus próprios agentes.': 'Agent marketplace. Create, publish and monetize your own agents.',
    'por Você': 'by You',
    'por Parceiro': 'by Partner',
    'por Comunidade': 'by Community',
    'Perguntas frequentes': 'Frequently asked questions',
    'Quanto eu realmente ganho?': 'How much do I really earn?',
    'Vou perder o controle do cliente?': 'Will I lose control of the client?',
    'Meus clientes são pequenos, vão pagar?': 'Are my clients too small to pay?',
    'E se o Orbit não atender minha metodologia?': "What if Orbit doesn't fit my methodology?",
    'Qual o investimento?': 'What is the investment?',
    'Pronto para ter receita recorrente real?': 'Ready for real recurring revenue?',
    'Pronto para ter receita': 'Ready for',
    'recorrente real?': 'real recurring revenue?',
    'canais ativos': 'active channels',
    'empresas': 'companies',
    'anos of experience': 'years of experience',
    'anos de experiência': 'years of experience',

    // === CONSULTORES PAGE - specific ===
    'A matemática que muda tudo': 'The math that changes everything',
    'Churn inevitável': 'Inevitable churn',
    'Ciclo eterno': 'Eternal cycle',
    'Começar do zero': 'Start from scratch',
    'Cliente opera no software. Quanto mais usa, mais depende. Churn próximo de zero.': 'Client operates on the software. The more they use, the more they depend. Near-zero churn.',
    'Cliente paga mensalidade porque IA continua trabalhando': 'Client pays monthly because AI keeps working',
    'Cliente recebe o material e o contrato acaba': 'Client receives the material and the contract ends',
    'Agentes continuam executando depois que você termina.': 'Agents keep executing after you finish.',
    'Cliente continua pagando porque agentes continuam trabalhando. Você ganha receita recorrente real. Isso é consultoria recorrente passiva.': 'Client keeps paying because agents keep working. You earn real recurring revenue. This is recurring passive consulting.',
    'Agentes seguem executando após a entrega': 'Agents keep executing after delivery',
    'Ativar novos agentes = upsell sem venda nova': 'Activating new agents = upsell without new sale',
    'Cada agente trabalha 24/7. Não tira férias. Não pede aumento.': "Each agent works 24/7. Doesn't take vacations. Doesn't ask for raises.",
    '12 agentes especializados prontos para operar nos seus clientes.': '12 specialized agents ready to operate in your clients.',
    'Agentes configuráveis por vertical. Você adapta à sua metodologia.': 'Configurable agents by vertical. You adapt to your methodology.',
    '30+ consultorias já estão ganhando com IA. Sua vez.': "30+ consultancies are already earning with AI. It's your turn.",
    'Agente Financeiro': 'Financial Agent',
    'Agente Industrial': 'Industrial Agent',
    'Agente Varejo': 'Retail Agent',
    'Agentes ativados': 'Activated agents',
    'Ativo agora': 'Active now',
    '100 clientes': '100 clients',
    '25 clientes': '25 clients',
    '12 meses': '12 months',
    '6 meses': '6 months',
    '+3 agentes': '+3 agents',
    '+R$ 600/mês': '+R$ 600/month',
    '/mês por cliente ativado': '/month per activated client',
    '12 agentes operando': '12 agents operating',
    '24/7 operando': '24/7 operating',
    '12 agentes especializados.': '12 specialized agents.',
    'Coordenados pela Olívia.': 'Coordinated by Olívia.',

    // === PRICING PAGE - specific ===
    'Escolha seu plano': 'Choose your plan',
    'Mais popular': 'Most popular',
    'Sem fidelidade, sem surpresas. Escolha o plano ideal para o momento da sua empresa.': "No lock-in, no surprises. Choose the ideal plan for your company's moment.",
    'Custo de 1 analista Jr. - entrega de um time inteiro': 'Cost of 1 Jr. analyst - delivers an entire team',
    'Como funciona o plano anual?': 'How does the annual plan work?',
    '20% de economia no valor mensal, com pagamento à vista ou parcelado.': '20% savings on the monthly value, with lump sum or installment payment.',
    'Posso mudar de plano?': 'Can I switch plans?',
    'Sim, upgrade ou downgrade a qualquer momento. Sem burocracia.': 'Yes, upgrade or downgrade at any time. No bureaucracy.',
    'E se eu cancelar?': 'What if I cancel?',
    'Sem multa. Garantia de 90 dias. Se não gerar resultado, devolvemos seu investimento.': "No penalty. 90-day guarantee. If it doesn't generate results, we return your investment.",
    'Preciso de cartão de crédito?': 'Do I need a credit card?',
    'Aceitamos cartão, boleto e PIX. Flexibilidade total para você.': 'We accept card, bank slip and PIX. Total flexibility for you.',
    'Setup e onboarding estão inclusos em todos os planos. Você não paga nada a mais para começar.': "Setup and onboarding are included in all plans. You don't pay anything extra to start.",
    'Para consultores e canais': 'For consultants and channels',
    'Modelo especial de pricing para quem quer oferecer o Orbit aos seus clientes. Receita recorrente, margem alta, sem custo de tecnologia.': 'Special pricing model for those who want to offer Orbit to their clients. Recurring revenue, high margin, no technology cost.',
    'Preço especial para canais': 'Special pricing for channels',
    'R$ 250/mês por cliente ativado': 'R$ 250/month per activated client',
    'Revenda com alta rentabilidade': 'Resale with high profitability',
    'Sem infraestrutura, sem manutenção': 'No infrastructure, no maintenance',
    'Custo zero de tech': 'Zero tech cost',
    'Conhecer o programa de canais': 'Learn about the channel program',
    'Quanto custa não ter um time estratégico?': "How much does it cost to not have a strategic team?",
    'Coord. TD': 'T&D Coordinator',
    'Comece a operar com IA': 'Start operating with AI',
    'de receita por cliente/mês': 'revenue per client/month',
    'de margem': 'margin',

    // === PARCERIAS PAGE - specific ===
    'Enviar Solicitação': 'Submit Request',
    'Concordo em receber comunicações sobre o programa de parcerias da Orbit Gestão': 'I agree to receive communications about the Orbit Gestão partnership program',
    'Entraremos em contato em breve para discutir as oportunidades de parceria.': "We'll get in touch soon to discuss partnership opportunities.",
    'Empresa *': 'Company *',
    'E-mail *': 'Email *',
    'Apresentação completa do programa': 'Complete program presentation',
    'Análise personalizada do seu perfil': 'Personalized analysis of your profile',
    'Definição do nível ideal de parceria': 'Definition of the ideal partnership level',
    'Acesso à comunidade exclusiva': 'Access to the exclusive community',
    'Acesso à plataforma Orbit': 'Access to Orbit platform',
    'Consultoria empresarial': 'Business consulting',
    'Conta dedicada': 'Dedicated account',
    'Conta dedicada de sucesso': 'Dedicated success account',
    'Customizado': 'Customized',
    'Cliente 1 - Tech Solutions': 'Client 1 - Tech Solutions',
    'Cliente 2 - Grupo Nova': 'Client 2 - Grupo Nova',
    'Cliente 3 - Logística BR': 'Client 3 - Logística BR',
    '+R$ 4.800/mês': '+R$ 4,800/month',
    '12 Agentes de IA': '12 AI Agents',
    '1 semana': '1 week',
    'contínuo': 'continuous',
    'recorrente': 'recurring',
    'Concluído': 'Completed',
    'Em andamento': 'In progress',
    '75% concluído': '75% completed',
    'Argumentação comercial': 'Sales argumentation',
    'Ativado': 'Activated',
    'Proposta enviada': 'Proposal sent',
    'Comissão': 'Commission',
    'Margem recorrente': 'Recurring margin',
    'Enviar cadastro': 'Submit registration',
    'Nome': 'Name',
    'E-mail': 'Email',
    'Telefone': 'Phone',
    'Área de atuação': 'Field of expertise',
    'Tipo de parceria': 'Partnership type',
    'Número de clientes': 'Number of clients',
    'Mensagem': 'Message',
    'Enviar': 'Submit',
    'Obrigado!': 'Thank you!',
    'Enviado com sucesso!': 'Sent successfully!',
    'Consultoria Acme LTDA': 'Acme Consulting LTDA',

    // === PARCERIAS PAGE - additional missing ===
    'Níveis de Parceria': 'Partnership Levels',
    'Escolha o nível que melhor se adequa ao seu modelo de negócio': 'Choose the level that best fits your business model',
    'Escolha o nível': 'Choose the level',
    'que melhor se adequa ao seu modelo de negócio': 'that best fits your business model',
    'Indicador': 'Indicator',
    'Silver': 'Silver',
    'Gold': 'Gold',
    'Ideal para consultores independentes que desejam complementar seus serviços': 'Ideal for independent consultants who want to complement their services',
    'Ideal para consultores independentes': 'Ideal for independent consultants',
    'desejam complementar seus serviços': 'want to complement their services',
    'Para agências e consultores em crescimento': 'For growing agencies and consultants',
    'Para agências': 'For agencies',
    'consultores em crescimento': 'growing consultants',
    'Para agências que desejam máxima integração': 'For agencies that want maximum integration',
    'desejam máxima integração': 'want maximum integration',
    'de comissão recurring': 'recurring commission',
    'de comissão recorrente': 'recurring commission',
    'de comissão': 'commission',
    'Acesso à plataforma Orbit': 'Access to Orbit platform',
    'Suporte por email': 'Email support',
    'Materiais de marketing básicos': 'Basic marketing materials',
    'Relatórios de performance': 'Performance reports',
    'Conta dedicada': 'Dedicated account',
    'Prioridade em funcionalidades': 'Feature priority',
    'Tudo do plano Indicador': 'Everything in the Indicator plan',
    'Tudo do plano Silver': 'Everything in the Silver plan',
    'Materiais de marketing premium': 'Premium marketing materials',
    'Training mensal': 'Monthly training',
    'Prioridade em desenvolvimento': 'Development priority',
    'Integração customizada': 'Custom integration',
    'Suporte 24/7 prioritário': 'Priority 24/7 support',
    'Opportunities exclusivas': 'Exclusive opportunities',
    'Oportunidades exclusivas': 'Exclusive opportunities',
    'Saber Mais': 'Learn More',
    'Quero ser Silver': 'I want to be Silver',
    'Quero ser Gold': 'I want to be Gold',
    'Solicite sua': 'Request your',
    'Parceria': 'Partnership',
    'Solicite sua Parceria': 'Request your Partnership',
    'Preencha o formulário e nossa equipe entrará em contato para discutir as melhores oportunidades para o seu negócio.': "Fill in the form and our team will get in touch to discuss the best opportunities for your business.",
    'Onboarding e treinamento inclusos': 'Onboarding and training included',
    'Sem taxa de adesão ou custo fixo': 'No membership fee or fixed cost',
    'Preencha seus dados': 'Fill in your details',
    'Seu nome': 'Your name',
    'seu@email.com': 'your@email.com',
    'Nível de interesse': 'Interest level',
    'Selecione um nível': 'Select a level',
    'Conte-nos sobre sua empresa e sua proposta...': 'Tell us about your company and your proposal...',
    'Submit Rethatst': 'Submit Request',
    'Enviar Solicitação': 'Submit Request',
    'O agente de treinamento via WhatsApp mudou o jogo. A equipe engaja porthat not precisa logar em nada. Simples e direto.': "The WhatsApp training agent changed the game. The team engages because they don't need to log in. Simple and direct.",
    'O agente de treinamento via WhatsApp mudou o jogo. A equipe engaja porque não precisa logar em nada.': "The WhatsApp training agent changed the game. The team engages because they don't need to log in.",
    'O Orbit é como ter um consultor 24/7. Os agentes de IA identificam problemas antes que virem crises.': 'Orbit is like having a 24/7 consultant. The AI agents identify problems before they become crises.',
    'Implantamos em 15 dias e já vimos resultado no primeiro mês. O suporte é excepcional.': 'We implemented in 15 days and saw results in the first month. The support is exceptional.',
    'Reduzimos o tempo de auditoria de 2 semanas para 3 dias. Os checklists automáticos são incríveis.': 'We reduced audit time from 2 weeks to 3 days. The automated checklists are amazing.',
    'Minha equipe ficou autônoma. O agente de tarefas cobra follow-up e ninguém esquece mais nada.': 'My team became autonomous. The tasks agent follows up and nothing gets forgotten.',
    'A gestão por competências transformou nosso RH. A rotatividade caiu 35%.': 'Competency management transformed our HR. Turnover dropped 35%.',
    'agents de IA identificam problemas antes': 'AI agents identify problems before',
    'Implantamos em 15 dias e já vimos resultado no primeiro mês. O suporte é excepcional - sempre presentes quando precisamos.': 'We implemented in 15 days and saw results in the first month. The support is exceptional - always there when we need.',
    'RECOMENDADO': 'RECOMMENDED',
    'Quatro passos simples para começar a gerar receita recorrente': 'Four simple steps to start generating recurring revenue',

    // === SOBRE PAGE - specific ===
    'Uma história de transformação': 'A story of transformation',
    'Alpha Club': 'Alpha Club',
    'Templum': 'Templum',
    'Christian': 'Christian',
    'Daniela': 'Daniela',
    'Igor': 'Igor',
    'Omar': 'Omar',
    'Rodrigo': 'Rodrigo',

    // === HISTÓRIAS ===
    'HISTÓRIAS DE SUCESSO': 'SUCCESS STORIES',
    'Descubra como nossos clientes': 'Discover how our clients',
    'transformaram': 'transformed',
    'sua gestão': 'their management',
    'Conheça as histórias reais de empresas que alcançaram resultados extraordinários com a Orbit Gestão.': 'Discover real stories of companies that achieved extraordinary results with Orbit Management.',
    'Todos': 'All',
    'Em breve teremos histórias incríveis': 'Amazing stories coming soon',
    'Estamos reunindo os melhores cases de sucesso dos nossos clientes. Volte em breve!': "We're gathering our best client success cases. Come back soon!",
    'Conte sua história': 'Tell your story',
    'Conte sua hist': 'Tell your sto',
    'CONTE SUA HISTÓRIA': 'TELL YOUR STORY',
    'Sua empresa também pode ser destaque': 'Your company can also be featured',
    'Compartilhe sua experiência com a Orbit Gestão e inspire outras empresas a transformarem sua gestão.': 'Share your experience with Orbit Management and inspire other companies to transform their management.',
    'Agendar demonstração': 'Schedule a demo',

    // === OBRIGADO ===
    'Recebemos seu': 'We received your',
    'contato!': 'contact!',
    'Nosso time de consultores entrará em contato em até': 'Our team of consultants will contact you within',
    '24 horas úteis': '24 business hours',
    'para agendar sua demonstração personalizada.': 'to schedule your personalized demo.',
    'Análise do perfil': 'Profile analysis',
    'Vamos entender o momento da sua empresa.': "We'll understand your company's current situation.",
    'Demo personalizada': 'Personalized demo',
    'Demonstração focada nas suas necessidades.': 'Demo focused on your needs.',
    'Proposta sob medida': 'Custom proposal',
    'Plano de implantação adequado ao seu negócio.': 'Implementation plan tailored to your business.',
    'Voltar ao site': 'Back to site',
    'Explorar conteúdos': 'Explore content',

    // === AGENTE ESTRATÉGICO PAGE ===
    'Agente Estratégico': 'Strategic Agent',
    'Sua empresa não precisa de mais estratégia.': "Your company doesn't need more strategy.",
    'Precisa de estratégia sendo': 'It needs strategy being',
    'executada todos os dias.': 'executed every day.',
    'Enquanto você planeja, ajusta e reprioriza... nada realmente muda na operação. O Orbit transforma decisões em execução contínua.': "While you plan, adjust and reprioritize... nothing really changes in operations. Orbit transforms decisions into continuous execution.",
    'Reuniões viram plano automaticamente': 'Meetings become plans automatically',
    'Prioridades deixam de depender de você': 'Priorities stop depending on you',
    'A estratégia passa a rodar todos os dias': 'Strategy starts running every day',
    'Ver demonstração': 'See demo',
    'Veja como isso funcionaria na sua empresa.': 'See how this would work in your company.',
    'Planejamento estratégico não resolve o problema da sua empresa.': "Strategic planning doesn't solve your company's problem.",
    'Você já definiu metas. Já fez reuniões. Já alinhou direção.': "You've already set goals. Already had meetings. Already aligned direction.",
    'E mesmo assim... nada muda.': 'And yet... nothing changes.',
    'Porque o problema nunca foi saber o que fazer.': 'Because the problem was never knowing what to do.',
    'A estratégia não chega na operação': "Strategy doesn't reach operations",
    'Metas que ninguém acompanha': 'Goals nobody tracks',
    'Decisões que não viram ação': "Decisions that don't become action",
    'Prioridades mudam toda semana': 'Priorities change every week',
    'Cada área segue um caminho': 'Each area follows a different path',
    'Tudo depende de você': 'Everything depends on you',
    'Ela precisa de': 'It needs',
    'execução estratégica contínua.': 'continuous strategic execution.',
    'Prova real': 'Real proof',
    'Veja o que acontece depois de uma decisão': 'See what happens after a decision',
    'Você não precisa organizar nada. O Orbit transforma automaticamente em estrutura estratégica.': "You don't need to organize anything. Orbit automatically transforms it into strategic structure.",
    'Você não analisa cenário. O sistema já organiza tudo.': "You don't analyze scenarios. The system already organizes everything.",
    'Classifica, prioriza e estrutura automaticamente o que realmente impacta sua empresa.': 'Automatically classifies, prioritizes and structures what really impacts your company.',
    'A análise vira direcionamento claro.': 'Analysis becomes clear direction.',
    'Você sabe exatamente para onde ir.': 'You know exactly where to go.',
    'A estratégia deixa de ser ideia': 'Strategy stops being just an idea',
    'E vira plano estruturado com lógica clara. Com justificativa, direcionamento e organização completa.': 'And becomes a structured plan with clear logic. With justification, direction and complete organization.',
    'E o mais importante:': 'And most importantly:',
    'começa a ser executado': 'it starts being executed',
    'Nada fica parado. Cada decisão vira ação com responsável e prazo.': 'Nothing stays idle. Every decision becomes action with an owner and deadline.',
    'Tudo está conectado': 'Everything is connected',
    'Metas, estratégia e execução deixam de ser separados. Agora fazem parte do mesmo fluxo.': 'Goals, strategy and execution stop being separate. They are now part of the same flow.',
    'Antes vs Depois': 'Before vs After',
    'ANTES': 'BEFORE',
    'DEPOIS': 'AFTER',
    'Você define a estratégia': 'You define the strategy',
    'O time interpreta': 'The team interprets',
    'Nada é acompanhado': 'Nothing is tracked',
    'Estratégia vira estrutura': 'Strategy becomes structure',
    'Estrutura vira plano': 'Structure becomes plan',
    'Plano vira execução': 'Plan becomes execution',
    'Execução é acompanhada automaticamente': 'Execution is tracked automatically',
    'Para fazer isso manualmente, você precisaria de:': 'To do this manually, you would need:',
    'Diretor estratégico': 'Strategic director',
    'Analistas': 'Analysts',
    'Acompanhamento diário': 'Daily tracking',
    'Controle constante': 'Constant control',
    'Agora isso acontece automaticamente.': 'Now this happens automatically.',
    'Veja isso acontecendo na prática': 'See this happening in practice',
    'Vídeo demonstrando fluxo real': 'Video showing real workflow',
    'Veja sua estratégia sendo': 'See your strategy being',
    'executada': 'executed',
    'Em poucos minutos você entende como isso se aplica à sua empresa.': 'In a few minutes you understand how this applies to your company.',
    'Quero ver o Orbit funcionando': 'I want to see Orbit working',

    // === MISC ===
    'Conheça os 12': 'Meet the 12',
    'agentes de IA': 'AI agents',
    'Cada agente é um especialista. Trabalhando 24/7 para sua empresa.': 'Each agent is a specialist. Working 24/7 for your company.',
    'Conheça os módulos onde os agentes operam': 'Meet the modules where agents operate',
    'A plataforma Orbit integra 5 módulos + IA. Os agentes trabalham dentro deles.': 'The Orbit platform integrates 5 modules + AI. Agents work within them.',
    'Prevenção': 'Prevention',
    'Mercado': 'Market',
    'Versão': 'Version',
    'Padrão': 'Standard',
    'Funil': 'Funnel',
    'Ata': 'Minutes',
    'Automação': 'Automation',
    'Insights': 'Insights',
    'Clima': 'Climate',
    'NPS': 'NPS',
    'Conheça nossas soluções': 'Meet our solutions',
    'Módulos integrados que cobrem toda a gestão da sua empresa': 'Integrated modules covering all your company management',
    'RECOMENDADO': 'RECOMMENDED',
  };

  // Sort keys by length (longest first) to avoid partial replacements
  var keys = Object.keys(t).sort(function(a, b) { return b.length - a.length; });

  // Replace text in all text nodes AND innerHTML for elements with mixed content
  function translateNode(el) {
    // Skip script/style tags
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;

    // For elements with children, recurse
    if (el.childNodes) {
      for (var i = 0; i < el.childNodes.length; i++) {
        var child = el.childNodes[i];
        if (child.nodeType === 3 && child.textContent.trim()) {
          // Text node: do replacements
          var txt = child.textContent;
          keys.forEach(function(k) {
            if (txt.indexOf(k) !== -1) {
              txt = txt.split(k).join(t[k]);
            }
          });
          child.textContent = txt;
        } else if (child.nodeType === 1) {
          translateNode(child);
        }
      }
    }
  }
  translateNode(document.body);

  // Translate short words that are the ENTIRE text content of an element
  // These can't go in the main dictionary because they'd corrupt longer phrases
  var shortWords = {
    'não': 'not',
    'Não': 'No',
    'Sim': 'Yes',
    'ou': 'or',
  };
  var walker2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  var n2;
  while (n2 = walker2.nextNode()) {
    var trimmed = n2.textContent ? n2.textContent.trim() : '';
    if (shortWords[trimmed]) {
      n2.textContent = n2.textContent.replace(trimmed, shortWords[trimmed]);
    }
  }

  // Also translate CSS ::before/::after content via data attributes
  document.querySelectorAll('.cost-card--orbit').forEach(function(el) {
    el.setAttribute('data-label', 'RECOMMENDED');
    el.style.setProperty('--before-content', '"RECOMMENDED"');
  });

  // Also handle data-i18n elements
  var i18nMap = {
    'nav.home': 'Home', 'nav.plans': 'Plans', 'nav.login': 'Login',
    'nav.cta': 'Meet the AI Team', 'nav.platform': 'Platform',
    'nav.agents_menu': 'AI Agents',
    'nav.for_who': 'For whom', 'nav.content': 'Resources', 'nav.company': 'Company',
    'footer.tagline': 'AI-powered management platform. Hire a team that executes.',
    'footer.contact': 'Contact', 'footer.platform': 'Platform',
    'footer.content': 'Resources', 'footer.company': 'Company',
    'footer.rights': '© 2026 Orbit - Grupo GSN. All rights reserved.',
    'footer.agents': 'AI Agents', 'footer.plans': 'Plans & Pricing',
    'footer.stories': 'Customer Stories', 'footer.about': 'About Us',
    'footer.partners': 'Become a Partner', 'footer.channels': 'B2B2B Channels',
    'mobile.title': 'Menu', 'mobile.nav': 'Navigation',
    'mobile.plans': 'Plans & Pricing', 'mobile.contact': 'Contact Us',
    'mobile.platform': 'Platform', 'mobile.content': 'Resources', 'mobile.company': 'Company',
    'nav.agents': 'AI Agents', 'nav.agents.sub': '12 specialists 24/7',
    'nav.processes': 'Processes', 'nav.processes.sub': 'Mapping & automation',
    'nav.indicators': 'Indicators', 'nav.indicators.sub': 'KPIs & dashboards',
    'nav.tasks': 'Tasks', 'nav.tasks.sub': 'Strategic Kanban',
    'nav.skills': 'Skills', 'nav.skills.sub': 'People management',
    'nav.audits': 'Audits', 'nav.audits.sub': 'Compliance & quality',
    'nav.businesses': 'Business Owners', 'nav.businesses.sub': 'AI team for your company',
    'nav.consultants': 'Consultants', 'nav.consultants.sub': 'B2B2B channel model',
    'nav.blog': 'Blog', 'nav.blog.sub': 'Articles & insights',
    'nav.stories': 'Customer Stories', 'nav.stories.sub': 'Success cases',
    'nav.faq': 'FAQ', 'nav.faq.sub': 'Frequently asked questions',
    'nav.about': 'About Us', 'nav.about.sub': '30 years of history',
    'nav.partners': 'Become a Partner', 'nav.partners.sub': 'Channel program',
    'nav.channels': 'B2B2B Channels', 'nav.channels.sub': 'For consultants & mentors',
  };
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (key && i18nMap[key]) el.textContent = i18nMap[key];
  });

  // Update page title and lang
  document.title = 'Orbit - Hire an AI team that executes';
  document.documentElement.lang = 'en';

  // Update placeholder attributes
  var placeholders = {
    'Nome completo': 'Full name',
    'E-mail corporativo': 'Corporate email',
    'WhatsApp': 'WhatsApp',
    'Sua empresa': 'Your company',
    'Seu cargo': 'Your position',
    'Seu nome': 'Your name',
    'seu@email.com': 'your@email.com',
    'Conte-nos sobre sua empresa e sua proposta...': 'Tell us about your company and your proposal...',
    'Your company': 'Your company',
    'Nome da sua empresa': 'Your company name',
    'seu@empresa.com': 'your@company.com',
  };

  // Also translate select options
  document.querySelectorAll('select option').forEach(function(opt) {
    var optText = opt.textContent.trim();
    var optMap = {
      'Selecione um nível': 'Select a level',
      'Indicador': 'Indicator',
      'Silver': 'Silver',
      'Gold': 'Gold',
      'Consultoria empresarial': 'Business consulting',
      'Agência de marketing': 'Marketing agency',
      'Mentoria': 'Mentoring',
      'Outro': 'Other',
    };
    if (optMap[optText]) opt.textContent = optMap[optText];
  });
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(function(el) {
    var ph = el.getAttribute('placeholder');
    for (var pt in placeholders) {
      if (ph && ph.indexOf(pt) !== -1) {
        el.setAttribute('placeholder', ph.replace(pt, placeholders[pt]));
      }
    }
  });
}
