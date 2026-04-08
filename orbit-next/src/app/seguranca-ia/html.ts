// Página: Segurança & Inteligência Artificial
export const pageHTML = `
    <!-- ═══ HERO ═══ -->
    <section class="lp-hero" id="hero">
        <div class="lp-hero__glow lp-hero__glow--1"></div>
        <div class="lp-hero__glow lp-hero__glow--2"></div>
        <div class="container">
            <span class="hero-zoom__badge" data-reveal>Segurança & IA</span>

            <h1 class="hero-zoom__title" data-reveal>
                Sua empresa na era da IA — com<br>
                <span class="hero-zoom__title-highlight">segurança e transparência</span>
            </h1>

            <p class="hero-zoom__subtitle" data-reveal>
                Sabemos que adotar inteligência artificial levanta dúvidas legítimas.
                Aqui respondemos tudo: <strong style="color:#ffba1a;">quais IAs usamos</strong>, o que fazemos com seus dados e como sua informação está protegida.
            </p>

            <div class="hero-zoom__ctas" data-reveal style="margin-top:40px;">
                <a href="#provedores" class="btn btn-primary btn-lg hero-cta-glow">VER COMO FUNCIONA</a>
                <a href="#cta-final" class="btn btn-ghost btn-lg">FALAR COM TI</a>
            </div>
        </div>
    </section>

    <!-- ═══ SEÇÃO 1 — Quais IAs usamos ═══ -->
    <section class="lp-section lp-section--dark" id="provedores">
        <div class="container">
            <div class="lp-section__header" data-reveal>
                <span class="lp-section__badge">01 — Provedores</span>
                <h2 class="lp-section__title">As IAs por trás do <span class="highlight">Orbit</span></h2>
                <p class="lp-section__subtitle">
                    O Orbit utiliza múltiplos modelos de inteligência artificial de três provedores líderes mundiais,
                    cada um selecionado para a tarefa em que é melhor.
                </p>
            </div>

            <div class="cards-grid cards-grid--3" data-reveal-stagger>
                <!-- Google Gemini -->
                <div class="feature-card">
                    <div class="feature-card__icon"><i class="fab fa-google"></i></div>
                    <h3 class="feature-card__title">Google Gemini</h3>
                    <p class="feature-card__desc">
                        Utilizado no Cérebro (assistente principal de chat), análise de imagens, geração de projetos,
                        pesquisa de mercado e automações em tempo real.
                    </p>
                    <div class="feature-card__tag">
                        <strong>Modelos:</strong> Gemini Flash + Gemini Pro
                    </div>
                </div>

                <!-- OpenAI -->
                <div class="feature-card">
                    <div class="feature-card__icon"><i class="fas fa-brain"></i></div>
                    <h3 class="feature-card__title">OpenAI</h3>
                    <p class="feature-card__desc">
                        Utilizado para geração de processos, instruções de trabalho, refinamento de planejamento estratégico,
                        análise de currículos, PDI, transcrição de áudio e síntese de voz.
                    </p>
                    <div class="feature-card__tag">
                        <strong>Modelos:</strong> GPT-4o · GPT-4.1 · Whisper
                    </div>
                </div>

                <!-- Perplexity -->
                <div class="feature-card">
                    <div class="feature-card__icon"><i class="fas fa-magnifying-glass-chart"></i></div>
                    <h3 class="feature-card__title">Perplexity</h3>
                    <p class="feature-card__desc">
                        Utilizado para pesquisa de inteligência de mercado com acesso à internet em tempo real,
                        buscando tendências, concorrentes e oportunidades para o setor da empresa.
                    </p>
                    <div class="feature-card__tag">
                        <strong>Modelo:</strong> Sonar Pro
                    </div>
                </div>
            </div>

            <p class="section-note" data-reveal>
                <i class="fas fa-circle-info"></i> Cada modelo é acionado automaticamente conforme a tarefa — o usuário não precisa escolher nem configurar nada.
            </p>
        </div>
    </section>

    <!-- ═══ SEÇÃO 2 — De onde a IA tira informações ═══ -->
    <section class="lp-section" id="contexto">
        <div class="container">
            <div class="lp-section__header" data-reveal>
                <span class="lp-section__badge">02 — Contexto</span>
                <h2 class="lp-section__title">A IA fala sobre a sua empresa,<br><span class="highlight">não sobre empresas genéricas</span></h2>
                <p class="lp-section__subtitle">
                    A plataforma monta automaticamente um contexto completo com os dados reais da sua organização cadastrados.
                </p>
            </div>

            <div class="two-col-grid" data-reveal>
                <div class="info-card">
                    <h3 class="info-card__title"><i class="fas fa-chess-king"></i> Dados estratégicos</h3>
                    <ul class="check-list">
                        <li>Missão, visão e valores</li>
                        <li>Análise SWOT</li>
                        <li>Balanced Scorecard (BSC)</li>
                        <li>Objetivos estratégicos</li>
                        <li>Política de qualidade</li>
                    </ul>
                </div>

                <div class="info-card">
                    <h3 class="info-card__title"><i class="fas fa-cogs"></i> Dados operacionais</h3>
                    <ul class="check-list">
                        <li>Tarefas e projetos ativos</li>
                        <li>Indicadores e metas</li>
                        <li>Riscos e problemas em aberto</li>
                        <li>Membros da equipe e departamentos</li>
                        <li>Processos documentados</li>
                        <li>Reuniões e atas</li>
                        <li>Leads do CRM</li>
                        <li>Vagas de recrutamento</li>
                    </ul>
                </div>
            </div>

            <p class="section-note" data-reveal>
                Quanto mais completa a plataforma, mais precisa e contextualizada será a resposta da IA.
                <strong style="color:#ffba1a;">Ela não inventa — ela analisa o que você construiu.</strong>
            </p>
        </div>
    </section>

    <!-- ═══ SEÇÃO 3 — A IA aprende? ═══ -->
    <section class="lp-section lp-section--dark" id="aprendizado">
        <div class="container">
            <div class="lp-section__header" data-reveal>
                <span class="lp-section__badge">03 — Evolução</span>
                <h2 class="lp-section__title">Suas recomendações evoluem conforme<br>sua empresa <span class="highlight">cresce</span></h2>
                <p class="lp-section__subtitle">
                    O modelo de IA em si não é treinado com seus dados — o modelo base permanece o mesmo.
                    O que evolui é o <strong>contexto disponível</strong>.
                </p>
            </div>

            <div class="cards-grid cards-grid--2" data-reveal-stagger>
                <div class="evolution-card">
                    <div class="evolution-card__icon"><i class="fas fa-clipboard-check"></i></div>
                    <h4>Com processos documentados</h4>
                    <p>A IA gera checklists alinhados com seus procedimentos reais.</p>
                </div>

                <div class="evolution-card">
                    <div class="evolution-card__icon"><i class="fas fa-chart-line"></i></div>
                    <h4>Com histórico de indicadores</h4>
                    <p>A IA identifica tendências e sugere ações corretivas.</p>
                </div>

                <div class="evolution-card">
                    <div class="evolution-card__icon"><i class="fas fa-bullseye"></i></div>
                    <h4>Com SWOT e objetivos cadastrados</h4>
                    <p>A IA avalia alinhamento estratégico em cada recomendação.</p>
                </div>

                <div class="evolution-card">
                    <div class="evolution-card__icon"><i class="fas fa-shield-alt"></i></div>
                    <h4>Com histórico de problemas resolvidos</h4>
                    <p>A IA reconhece padrões e faz recomendações preventivas.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ SEÇÃO 4 — Fluxo de dados ═══ -->
    <section class="lp-section" id="fluxo-dados">
        <div class="container">
            <div class="lp-section__header" data-reveal>
                <span class="lp-section__badge">04 — Transparência</span>
                <h2 class="lp-section__title">Transparência total sobre o<br><span class="highlight">fluxo de dados</span></h2>
                <p class="lp-section__subtitle">
                    Sim — para que a IA consiga responder sobre a sua empresa, os dados organizacionais são enviados aos provedores
                    de IA no momento de cada requisição. Esse é o padrão de qualquer assistente de IA do mercado
                    (incluindo ChatGPT Enterprise, Microsoft Copilot e Google Workspace AI).
                </p>
            </div>

            <div class="info-card" data-reveal style="max-width:800px;margin:0 auto;">
                <h3 class="info-card__title"><i class="fas fa-lock"></i> O que garantimos</h3>
                <ul class="check-list">
                    <li><strong>Sem treinamento com seus dados:</strong> os provedores que utilizamos (Google e OpenAI) possuem contratos corporativos que proíbem o uso de dados de clientes para treinamento de modelos.</li>
                    <li><strong>Sem venda nem compartilhamento:</strong> o Orbit não vende nem compartilha dados além dos provedores necessários para o funcionamento do sistema.</li>
                    <li><strong>Criptografia em trânsito:</strong> todos os dados trafegam com TLS 1.3 obrigatoriamente.</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- ═══ SEÇÃO 5 — Controle de alucinação ═══ -->
    <section class="lp-section lp-section--dark" id="alucinacao">
        <div class="container">
            <div class="lp-section__header" data-reveal>
                <span class="lp-section__badge">05 — Confiabilidade</span>
                <h2 class="lp-section__title">Como evitamos que a IA<br><span class="highlight">invente informações</span></h2>
            </div>

            <div class="info-card" data-reveal style="max-width:800px;margin:0 auto;">
                <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin-bottom:24px;">
                    O Cérebro opera com <strong style="color:#ffba1a;">regras explícitas de comportamento</strong>: ele é instruído a basear suas
                    respostas <strong>exclusivamente nos dados reais da organização</strong> e a informar claramente quando não há dados suficientes
                    para uma recomendação.
                </p>
                <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin-bottom:24px;">
                    Existe uma <strong>regra de prioridade crítica</strong> no sistema que exige que a IA liste os dados reais antes de qualquer análise ou sugestão.
                </p>
                <div style="background:rgba(255,186,26,0.08);border-left:3px solid #ffba1a;padding:16px 20px;border-radius:8px;">
                    <p style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;">
                        <i class="fas fa-info-circle" style="color:#ffba1a;margin-right:8px;"></i>
                        Para funcionalidades que exigem maior precisão (geração de documentos, relatórios, políticas),
                        utilizamos modelos mais robustos da família <strong>GPT-4 e Gemini Pro</strong>, calibrados para menor variação nas respostas.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ SEÇÃO 6 — Segurança em camadas ═══ -->
    <section class="lp-section" id="seguranca">
        <div class="container">
            <div class="lp-section__header" data-reveal>
                <span class="lp-section__badge">06 — Segurança</span>
                <h2 class="lp-section__title">Sua informação protegida em<br><span class="highlight">cada camada</span></h2>
            </div>

            <div class="cards-grid cards-grid--3" data-reveal-stagger>
                <div class="security-card">
                    <div class="security-card__icon"><i class="fas fa-database"></i></div>
                    <h4>Criptografia em repouso</h4>
                    <p>Todos os dados armazenados são criptografados com <strong>AES-256</strong> pela plataforma Supabase.</p>
                </div>

                <div class="security-card">
                    <div class="security-card__icon"><i class="fas fa-lock"></i></div>
                    <h4>Criptografia em trânsito</h4>
                    <p>Toda comunicação usa <strong>TLS 1.3</strong> obrigatoriamente — sem exceção.</p>
                </div>

                <div class="security-card">
                    <div class="security-card__icon"><i class="fas fa-users-slash"></i></div>
                    <h4>Isolamento por empresa</h4>
                    <p>Cada organização opera em ambiente completamente isolado via <strong>Row Level Security (RLS)</strong>. Nenhuma empresa acessa dados de outra.</p>
                </div>

                <div class="security-card">
                    <div class="security-card__icon"><i class="fas fa-user-shield"></i></div>
                    <h4>Controle de acesso granular</h4>
                    <p><strong>RBAC com 4 níveis</strong> hierárquicos (super_admin, channel_admin, org_admin, member) e suporte a MFA.</p>
                </div>

                <div class="security-card">
                    <div class="security-card__icon"><i class="fas fa-certificate"></i></div>
                    <h4>Infraestrutura certificada</h4>
                    <p>Roda sobre <strong>Supabase + AWS</strong>, com certificações <strong>SOC 2 Tipo II</strong> e <strong>ISO 27001</strong>.</p>
                </div>

                <div class="security-card">
                    <div class="security-card__icon"><i class="fas fa-clipboard-list"></i></div>
                    <h4>Auditoria contínua</h4>
                    <p>Todas as operações administrativas são registradas em <strong>log de auditoria rastreável</strong>.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ SEÇÃO 7 — LGPD ═══ -->
    <section class="lp-section lp-section--dark" id="lgpd">
        <div class="container">
            <div class="lp-section__header" data-reveal>
                <span class="lp-section__badge">07 — Conformidade</span>
                <h2 class="lp-section__title">Em conformidade com a <span class="highlight">LGPD</span></h2>
                <p class="lp-section__subtitle">
                    A plataforma respeita integralmente a Lei Geral de Proteção de Dados.
                    Como titular dos seus dados, você tem direito a:
                </p>
            </div>

            <div class="info-card" data-reveal style="max-width:800px;margin:0 auto;">
                <ul class="check-list">
                    <li><strong>Acesso</strong> aos seus dados pessoais</li>
                    <li><strong>Correção</strong> de dados incompletos ou desatualizados</li>
                    <li><strong>Exclusão</strong> dos seus dados</li>
                    <li><strong>Revogação de consentimento</strong> a qualquer momento</li>
                    <li><strong>Portabilidade</strong> dos dados</li>
                </ul>
                <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
                    <p style="color:#8B949E;font-size:0.9rem;margin:0 0 8px;">Para exercer qualquer direito ou tirar dúvidas:</p>
                    <a href="mailto:contato@orbitprocessos.com" style="color:#ffba1a;font-weight:700;font-size:1.05rem;text-decoration:none;">
                        <i class="fas fa-envelope" style="margin-right:8px;"></i>contato@orbitprocessos.com
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ SEÇÃO 8 — Integrações ═══ -->
    <section class="lp-section" id="integracoes">
        <div class="container">
            <div class="lp-section__header" data-reveal>
                <span class="lp-section__badge">08 — Integrações</span>
                <h2 class="lp-section__title">Orbit se conecta com seus<br><span class="highlight">sistemas existentes</span></h2>
            </div>

            <div class="info-card" data-reveal style="max-width:800px;margin:0 auto;">
                <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin-bottom:20px;">
                    A plataforma possui um módulo nativo de <strong style="color:#ffba1a;">Conectores de API</strong> que permite integrar
                    sistemas externos via HTTP (GET, POST, PUT, DELETE), com suporte a autenticação por:
                </p>
                <ul class="check-list">
                    <li>Bearer Token</li>
                    <li>Basic Auth</li>
                    <li>API Key</li>
                </ul>
                <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin-top:20px;">
                    Sistemas como <strong>ponto eletrônico, ERP</strong> e outras ferramentas corporativas que disponibilizem uma API
                    podem ser conectados para alimentar automaticamente os dados da plataforma.
                </p>
                <div style="background:rgba(255,186,26,0.08);border-left:3px solid #ffba1a;padding:16px 20px;border-radius:8px;margin-top:24px;">
                    <p style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;">
                        <i class="fas fa-cloud" style="color:#ffba1a;margin-right:8px;"></i>
                        A solução é <strong>100% SaaS</strong> — acessada via navegador, sem necessidade de instalação,
                        acesso à rede interna ou VPN do cliente.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ CTA FINAL ═══ -->
    <section class="lp-cta-final" id="cta-final">
        <div class="lp-cta-final__glow"></div>
        <div class="container">
            <div class="lp-cta-final__content" data-reveal>
                <h2 class="lp-cta-final__title">Ainda tem dúvidas técnicas?</h2>
                <p class="lp-cta-final__subtitle">
                    Nossa equipe pode agendar uma conversa com o time de TI da sua empresa para detalhar a arquitetura,
                    controles de segurança e responder qualquer questionamento técnico.
                </p>
                <a href="/chat" class="btn-gold">FALAR COM NOSSA EQUIPE</a>
            </div>
        </div>
    </section>

    <!-- Estilos específicos da página -->
    <style>
        .feature-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            padding: 32px 28px;
            transition: all 0.3s;
        }
        .feature-card:hover {
            border-color: rgba(255,186,26,0.3);
            transform: translateY(-4px);
        }
        .feature-card__icon {
            width: 56px; height: 56px;
            border-radius: 14px;
            background: rgba(255,186,26,0.12);
            display: flex; align-items: center; justify-content: center;
            color: #ffba1a;
            font-size: 26px;
            margin-bottom: 20px;
        }
        .feature-card__title {
            color: #fff; font-size: 1.35rem; font-weight: 800;
            margin: 0 0 12px;
        }
        .feature-card__desc {
            color: #8B949E; font-size: 0.95rem; line-height: 1.6;
            margin: 0 0 20px;
        }
        .feature-card__tag {
            padding-top: 16px;
            border-top: 1px solid rgba(255,255,255,0.06);
            color: #C9D1D9;
            font-size: 0.85rem;
        }
        .feature-card__tag strong { color: #ffba1a; }

        .info-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            padding: 32px;
        }
        .info-card__title {
            display: flex; align-items: center; gap: 12px;
            color: #fff; font-size: 1.25rem; font-weight: 800;
            margin: 0 0 20px;
        }
        .info-card__title i { color: #ffba1a; }

        .check-list {
            list-style: none; padding: 0; margin: 0;
            display: flex; flex-direction: column; gap: 12px;
        }
        .check-list li {
            position: relative;
            padding-left: 28px;
            color: #C9D1D9;
            font-size: 0.95rem;
            line-height: 1.6;
        }
        .check-list li::before {
            content: '\\f00c';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            position: absolute;
            left: 0; top: 2px;
            color: #ffba1a;
        }

        .two-col-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            max-width: 1000px;
            margin: 0 auto;
        }
        @media (max-width: 768px) {
            .two-col-grid { grid-template-columns: 1fr; }
        }

        .cards-grid {
            display: grid;
            gap: 24px;
            max-width: 1100px;
            margin: 0 auto;
        }
        .cards-grid--2 { grid-template-columns: repeat(2, 1fr); }
        .cards-grid--3 { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
            .cards-grid--2, .cards-grid--3 { grid-template-columns: 1fr; }
        }

        .evolution-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 14px;
            padding: 24px 28px;
            display: flex;
            gap: 18px;
            align-items: flex-start;
        }
        .evolution-card__icon {
            width: 44px; height: 44px;
            border-radius: 10px;
            background: rgba(255,186,26,0.12);
            color: #ffba1a;
            display: flex; align-items: center; justify-content: center;
            font-size: 18px;
            flex-shrink: 0;
        }
        .evolution-card h4 {
            color: #fff; font-size: 1rem; font-weight: 700;
            margin: 0 0 6px;
        }
        .evolution-card p {
            color: #8B949E; font-size: 0.9rem; line-height: 1.55;
            margin: 0;
        }

        .security-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 14px;
            padding: 28px 24px;
            transition: all 0.3s;
        }
        .security-card:hover {
            border-color: rgba(255,186,26,0.3);
            transform: translateY(-2px);
        }
        .security-card__icon {
            width: 48px; height: 48px;
            border-radius: 12px;
            background: rgba(255,186,26,0.12);
            color: #ffba1a;
            display: flex; align-items: center; justify-content: center;
            font-size: 20px;
            margin-bottom: 16px;
        }
        .security-card h4 {
            color: #fff; font-size: 1.05rem; font-weight: 800;
            margin: 0 0 10px;
        }
        .security-card p {
            color: #8B949E; font-size: 0.9rem; line-height: 1.55;
            margin: 0;
        }

        .section-note {
            text-align: center;
            color: #8B949E;
            font-size: 0.95rem;
            margin: 40px auto 0;
            max-width: 700px;
            line-height: 1.6;
        }
        .section-note i { color: #ffba1a; margin-right: 6px; }
    </style>
`;
