// Página: Segurança & Inteligência Artificial
// Tudo com inline styles + classes únicas (prefixo sia-) pra escapar do reset agressivo do orbit.css
export const pageHTML = `
<div class="sia-page" style="background:#0D1117;color:#C9D1D9;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;">

    <!-- ═══ HERO ═══ -->
    <section class="sia-hero" style="position:relative;background:#0D1117;padding:140px 24px 100px;text-align:center;overflow:hidden;">
        <div style="position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(255,186,26,0.12) 0%,transparent 60%);pointer-events:none;"></div>
        <div style="position:absolute;bottom:-100px;right:-100px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,186,26,0.06) 0%,transparent 60%);pointer-events:none;"></div>

        <div style="position:relative;max-width:900px;margin:0 auto;">
            <span style="display:inline-block;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);color:#ffba1a;font-size:13px;font-weight:700;padding:8px 18px;border-radius:100px;text-transform:uppercase;letter-spacing:1px;margin-bottom:24px;">
                <i class="fas fa-shield-halved" style="margin-right:6px;"></i> Segurança & IA
            </span>

            <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 24px;letter-spacing:-0.02em;">
                Sua empresa na era da IA — com<br>
                <span style="color:#ffba1a;">segurança e transparência</span>
            </h1>

            <p style="font-size:clamp(1rem,1.6vw,1.2rem);color:#8B949E;line-height:1.6;max-width:720px;margin:0 auto 40px;">
                Sabemos que adotar inteligência artificial levanta dúvidas legítimas. Aqui respondemos tudo:
                <strong style="color:#ffba1a;">quais IAs usamos</strong>, o que fazemos com seus dados e como sua informação está protegida.
            </p>

            <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
                <a href="#sia-provedores" style="display:inline-flex;align-items:center;gap:8px;background:#ffba1a;color:#0D1117;font-weight:800;font-size:15px;padding:16px 32px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;box-shadow:0 8px 24px rgba(255,186,26,0.3);">
                    VER COMO FUNCIONA <i class="fas fa-arrow-down"></i>
                </a>
                <a href="#sia-cta" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:15px;padding:16px 32px;border-radius:50px;text-decoration:none;">
                    FALAR COM TI
                </a>
            </div>
        </div>
    </section>

    <!-- ═══ §01 — Provedores ═══ -->
    <section id="sia-provedores" style="background:#0D1117;padding:100px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="max-width:1200px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:60px;">
                <span style="display:inline-block;color:#ffba1a;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">01 — Provedores</span>
                <h2 style="font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 16px;">As IAs por trás do <span style="color:#ffba1a;">Orbit</span></h2>
                <p style="font-size:1.05rem;color:#8B949E;line-height:1.6;max-width:720px;margin:0 auto;">
                    O Orbit utiliza múltiplos modelos de inteligência artificial de três provedores líderes mundiais,
                    cada um selecionado para a tarefa em que é melhor.
                </p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;max-width:1100px;margin:0 auto;">
                <!-- Google Gemini -->
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:32px 28px;transition:all 0.3s;">
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(66,133,244,0.12);color:#4285F4;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:20px;">
                        <i class="fab fa-google"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.3rem;font-weight:800;margin:0 0 12px;">Google Gemini</h3>
                    <p style="color:#8B949E;font-size:0.95rem;line-height:1.65;margin:0 0 20px;">
                        Utilizado no Cérebro (assistente principal de chat), análise de imagens, geração de projetos,
                        pesquisa de mercado e automações em tempo real.
                    </p>
                    <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);color:#C9D1D9;font-size:0.85rem;">
                        <strong style="color:#4285F4;">Modelos:</strong> Gemini Flash + Gemini Pro
                    </div>
                </div>

                <!-- OpenAI -->
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:32px 28px;">
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(16,163,127,0.12);color:#10A37F;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:20px;">
                        <i class="fas fa-brain"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.3rem;font-weight:800;margin:0 0 12px;">OpenAI</h3>
                    <p style="color:#8B949E;font-size:0.95rem;line-height:1.65;margin:0 0 20px;">
                        Geração de processos, instruções de trabalho, refinamento de planejamento estratégico,
                        análise de currículos, PDI, transcrição de áudio e síntese de voz.
                    </p>
                    <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);color:#C9D1D9;font-size:0.85rem;">
                        <strong style="color:#10A37F;">Modelos:</strong> GPT-4o · GPT-4.1 · Whisper
                    </div>
                </div>

                <!-- Perplexity -->
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:32px 28px;">
                    <div style="width:56px;height:56px;border-radius:14px;background:rgba(32,178,170,0.12);color:#20B2AA;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:20px;">
                        <i class="fas fa-magnifying-glass-chart"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.3rem;font-weight:800;margin:0 0 12px;">Perplexity</h3>
                    <p style="color:#8B949E;font-size:0.95rem;line-height:1.65;margin:0 0 20px;">
                        Pesquisa de inteligência de mercado com acesso à internet em tempo real, buscando tendências,
                        concorrentes e oportunidades para o setor da empresa.
                    </p>
                    <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);color:#C9D1D9;font-size:0.85rem;">
                        <strong style="color:#20B2AA;">Modelo:</strong> Sonar Pro
                    </div>
                </div>
            </div>

            <p style="text-align:center;color:#8B949E;font-size:0.95rem;margin:50px auto 0;max-width:680px;line-height:1.6;">
                <i class="fas fa-circle-info" style="color:#ffba1a;margin-right:8px;"></i>
                Cada modelo é acionado automaticamente conforme a tarefa — o usuário não precisa escolher nem configurar nada.
            </p>
        </div>
    </section>

    <!-- ═══ §02 — Contexto ═══ -->
    <section id="sia-contexto" style="background:#0a0e13;padding:100px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="max-width:1200px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:60px;">
                <span style="display:inline-block;color:#ffba1a;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">02 — Contexto</span>
                <h2 style="font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 16px;">A IA fala sobre a sua empresa,<br><span style="color:#ffba1a;">não sobre empresas genéricas</span></h2>
                <p style="font-size:1.05rem;color:#8B949E;line-height:1.6;max-width:720px;margin:0 auto;">
                    A plataforma monta automaticamente um contexto completo com os dados reais da sua organização cadastrados.
                </p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;max-width:900px;margin:0 auto;">
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:32px;">
                    <h3 style="display:flex;align-items:center;gap:12px;color:#fff;font-size:1.15rem;font-weight:800;margin:0 0 24px;">
                        <i class="fas fa-chess-king" style="color:#ffba1a;font-size:20px;"></i> Dados estratégicos
                    </h3>
                    <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px;">
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Missão, visão e valores</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Análise SWOT</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Balanced Scorecard (BSC)</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Objetivos estratégicos</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Política de qualidade</li>
                    </ul>
                </div>

                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:32px;">
                    <h3 style="display:flex;align-items:center;gap:12px;color:#fff;font-size:1.15rem;font-weight:800;margin:0 0 24px;">
                        <i class="fas fa-cogs" style="color:#ffba1a;font-size:20px;"></i> Dados operacionais
                    </h3>
                    <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px;">
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Tarefas e projetos ativos</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Indicadores e metas</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Riscos e problemas em aberto</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Membros da equipe e departamentos</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Processos documentados</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Reuniões e atas</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Leads do CRM</li>
                        <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.95rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Vagas de recrutamento</li>
                    </ul>
                </div>
            </div>

            <p style="text-align:center;color:#C9D1D9;font-size:1rem;margin:50px auto 0;max-width:760px;line-height:1.65;">
                Quanto mais completa a plataforma, mais precisa e contextualizada será a resposta da IA.
                <strong style="color:#ffba1a;">Ela não inventa — ela analisa o que você construiu.</strong>
            </p>
        </div>
    </section>

    <!-- ═══ §03 — Evolução ═══ -->
    <section id="sia-evolucao" style="background:#0D1117;padding:100px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="max-width:1200px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:60px;">
                <span style="display:inline-block;color:#ffba1a;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">03 — Evolução</span>
                <h2 style="font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 16px;">Suas recomendações evoluem conforme<br>sua empresa <span style="color:#ffba1a;">cresce</span></h2>
                <p style="font-size:1.05rem;color:#8B949E;line-height:1.6;max-width:720px;margin:0 auto;">
                    O modelo de IA em si não é treinado com seus dados — o modelo base permanece o mesmo.
                    O que evolui é o <strong style="color:#fff;">contexto disponível</strong>.
                </p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;max-width:900px;margin:0 auto;">
                ${[
                  { icon: 'fa-clipboard-check', title: 'Com processos documentados', desc: 'A IA gera checklists alinhados com seus procedimentos reais.' },
                  { icon: 'fa-chart-line', title: 'Com histórico de indicadores', desc: 'A IA identifica tendências e sugere ações corretivas.' },
                  { icon: 'fa-bullseye', title: 'Com SWOT e objetivos cadastrados', desc: 'A IA avalia alinhamento estratégico em cada recomendação.' },
                  { icon: 'fa-shield-alt', title: 'Com histórico de problemas resolvidos', desc: 'A IA reconhece padrões e faz recomendações preventivas.' },
                ].map(c => `
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px 26px;display:flex;gap:18px;align-items:flex-start;">
                    <div style="width:44px;height:44px;border-radius:10px;background:rgba(255,186,26,0.12);color:#ffba1a;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;"><i class="fas ${c.icon}"></i></div>
                    <div>
                        <h4 style="color:#fff;font-size:1rem;font-weight:700;margin:0 0 6px;">${c.title}</h4>
                        <p style="color:#8B949E;font-size:0.9rem;line-height:1.55;margin:0;">${c.desc}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- ═══ §04 — Fluxo de dados ═══ -->
    <section id="sia-fluxo" style="background:#0a0e13;padding:100px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="max-width:1200px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:60px;">
                <span style="display:inline-block;color:#ffba1a;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">04 — Transparência</span>
                <h2 style="font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 16px;">Transparência total sobre o<br><span style="color:#ffba1a;">fluxo de dados</span></h2>
                <p style="font-size:1.05rem;color:#8B949E;line-height:1.65;max-width:780px;margin:0 auto;">
                    Sim — para que a IA consiga responder sobre a sua empresa, os dados organizacionais são enviados aos provedores
                    de IA no momento de cada requisição. Esse é o padrão de qualquer assistente de IA do mercado
                    (incluindo ChatGPT Enterprise, Microsoft Copilot e Google Workspace AI).
                </p>
            </div>

            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:36px;max-width:780px;margin:0 auto;">
                <h3 style="display:flex;align-items:center;gap:12px;color:#fff;font-size:1.2rem;font-weight:800;margin:0 0 24px;">
                    <i class="fas fa-lock" style="color:#ffba1a;"></i> O que garantimos
                </h3>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:18px;">
                    <li style="position:relative;padding-left:32px;color:#C9D1D9;font-size:0.98rem;line-height:1.6;">
                        <span style="position:absolute;left:0;top:2px;color:#ffba1a;font-size:18px;">✓</span>
                        <strong style="color:#fff;">Sem treinamento com seus dados:</strong> os provedores que utilizamos (Google e OpenAI) possuem contratos corporativos que proíbem o uso de dados de clientes para treinamento de modelos.
                    </li>
                    <li style="position:relative;padding-left:32px;color:#C9D1D9;font-size:0.98rem;line-height:1.6;">
                        <span style="position:absolute;left:0;top:2px;color:#ffba1a;font-size:18px;">✓</span>
                        <strong style="color:#fff;">Sem venda nem compartilhamento:</strong> o Orbit não vende nem compartilha dados além dos provedores necessários para o funcionamento do sistema.
                    </li>
                    <li style="position:relative;padding-left:32px;color:#C9D1D9;font-size:0.98rem;line-height:1.6;">
                        <span style="position:absolute;left:0;top:2px;color:#ffba1a;font-size:18px;">✓</span>
                        <strong style="color:#fff;">Criptografia em trânsito:</strong> todos os dados trafegam com TLS 1.3 obrigatoriamente.
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <!-- ═══ §05 — Alucinação ═══ -->
    <section id="sia-alucinacao" style="background:#0D1117;padding:100px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="max-width:1200px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:60px;">
                <span style="display:inline-block;color:#ffba1a;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">05 — Confiabilidade</span>
                <h2 style="font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 16px;">Como evitamos que a IA<br><span style="color:#ffba1a;">invente informações</span></h2>
            </div>

            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:40px;max-width:780px;margin:0 auto;">
                <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin:0 0 24px;">
                    O Cérebro opera com <strong style="color:#ffba1a;">regras explícitas de comportamento</strong>: ele é instruído a basear suas
                    respostas <strong style="color:#fff;">exclusivamente nos dados reais da organização</strong> e a informar claramente quando não há dados suficientes
                    para uma recomendação.
                </p>
                <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin:0 0 24px;">
                    Existe uma <strong style="color:#fff;">regra de prioridade crítica</strong> no sistema que exige que a IA liste os dados reais antes de qualquer análise ou sugestão.
                </p>
                <div style="background:rgba(255,186,26,0.08);border-left:3px solid #ffba1a;padding:18px 22px;border-radius:8px;">
                    <p style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;">
                        <i class="fas fa-info-circle" style="color:#ffba1a;margin-right:8px;"></i>
                        Para funcionalidades que exigem maior precisão (geração de documentos, relatórios, políticas),
                        utilizamos modelos mais robustos da família <strong style="color:#fff;">GPT-4 e Gemini Pro</strong>, calibrados para menor variação nas respostas.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ §06 — Segurança ═══ -->
    <section id="sia-seguranca" style="background:#0a0e13;padding:100px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="max-width:1200px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:60px;">
                <span style="display:inline-block;color:#ffba1a;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">06 — Segurança</span>
                <h2 style="font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 16px;">Sua informação protegida em<br><span style="color:#ffba1a;">cada camada</span></h2>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;max-width:1100px;margin:0 auto;">
                ${[
                  { icon: 'fa-database', title: 'Criptografia em repouso', desc: 'Todos os dados armazenados são criptografados com <strong style="color:#fff;">AES-256</strong> pela plataforma Supabase.' },
                  { icon: 'fa-lock', title: 'Criptografia em trânsito', desc: 'Toda comunicação usa <strong style="color:#fff;">TLS 1.3</strong> obrigatoriamente — sem exceção.' },
                  { icon: 'fa-users-slash', title: 'Isolamento por empresa', desc: 'Cada organização opera em ambiente completamente isolado via <strong style="color:#fff;">Row Level Security (RLS)</strong>. Nenhuma empresa acessa dados de outra.' },
                  { icon: 'fa-user-shield', title: 'Controle de acesso granular', desc: '<strong style="color:#fff;">RBAC com 4 níveis</strong> hierárquicos (super_admin, channel_admin, org_admin, member) e suporte a MFA.' },
                  { icon: 'fa-certificate', title: 'Infraestrutura certificada', desc: 'Roda sobre <strong style="color:#fff;">Supabase + AWS</strong>, com certificações <strong style="color:#fff;">SOC 2 Tipo II</strong> e <strong style="color:#fff;">ISO 27001</strong>.' },
                  { icon: 'fa-clipboard-list', title: 'Auditoria contínua', desc: 'Todas as operações administrativas são registradas em <strong style="color:#fff;">log de auditoria rastreável</strong>.' },
                ].map(c => `
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:30px 26px;">
                    <div style="width:48px;height:48px;border-radius:12px;background:rgba(255,186,26,0.12);color:#ffba1a;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:18px;">
                        <i class="fas ${c.icon}"></i>
                    </div>
                    <h4 style="color:#fff;font-size:1.05rem;font-weight:800;margin:0 0 10px;">${c.title}</h4>
                    <p style="color:#8B949E;font-size:0.92rem;line-height:1.6;margin:0;">${c.desc}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- ═══ §07 — LGPD ═══ -->
    <section id="sia-lgpd" style="background:#0D1117;padding:100px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="max-width:1200px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:60px;">
                <span style="display:inline-block;color:#ffba1a;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">07 — Conformidade</span>
                <h2 style="font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 16px;">Em conformidade com a <span style="color:#ffba1a;">LGPD</span></h2>
                <p style="font-size:1.05rem;color:#8B949E;line-height:1.6;max-width:720px;margin:0 auto;">
                    A plataforma respeita integralmente a Lei Geral de Proteção de Dados.
                    Como titular dos seus dados, você tem direito a:
                </p>
            </div>

            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:36px;max-width:780px;margin:0 auto;">
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px;">
                    <li style="position:relative;padding-left:32px;color:#C9D1D9;font-size:0.98rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;font-size:18px;">✓</span><strong style="color:#fff;">Acesso</strong> aos seus dados pessoais</li>
                    <li style="position:relative;padding-left:32px;color:#C9D1D9;font-size:0.98rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;font-size:18px;">✓</span><strong style="color:#fff;">Correção</strong> de dados incompletos ou desatualizados</li>
                    <li style="position:relative;padding-left:32px;color:#C9D1D9;font-size:0.98rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;font-size:18px;">✓</span><strong style="color:#fff;">Exclusão</strong> dos seus dados</li>
                    <li style="position:relative;padding-left:32px;color:#C9D1D9;font-size:0.98rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;font-size:18px;">✓</span><strong style="color:#fff;">Revogação de consentimento</strong> a qualquer momento</li>
                    <li style="position:relative;padding-left:32px;color:#C9D1D9;font-size:0.98rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;font-size:18px;">✓</span><strong style="color:#fff;">Portabilidade</strong> dos dados</li>
                </ul>
                <div style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
                    <p style="color:#8B949E;font-size:0.9rem;margin:0 0 10px;">Para exercer qualquer direito ou tirar dúvidas:</p>
                    <a href="mailto:contato@orbitprocessos.com" style="color:#ffba1a;font-weight:700;font-size:1.05rem;text-decoration:none;">
                        <i class="fas fa-envelope" style="margin-right:8px;"></i>contato@orbitprocessos.com
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ §08 — Integrações ═══ -->
    <section id="sia-integracoes" style="background:#0a0e13;padding:100px 24px;border-top:1px solid rgba(255,255,255,0.06);">
        <div style="max-width:1200px;margin:0 auto;">
            <div style="text-align:center;margin-bottom:60px;">
                <span style="display:inline-block;color:#ffba1a;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">08 — Integrações</span>
                <h2 style="font-size:clamp(1.8rem,3.5vw,2.5rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 16px;">Orbit se conecta com seus<br><span style="color:#ffba1a;">sistemas existentes</span></h2>
            </div>

            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:36px;max-width:780px;margin:0 auto;">
                <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin:0 0 22px;">
                    A plataforma possui um módulo nativo de <strong style="color:#ffba1a;">Conectores de API</strong> que permite integrar
                    sistemas externos via HTTP (GET, POST, PUT, DELETE), com suporte a autenticação por:
                </p>
                <ul style="list-style:none;padding:0;margin:0 0 22px;display:flex;flex-direction:column;gap:12px;">
                    <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.98rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Bearer Token</li>
                    <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.98rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>Basic Auth</li>
                    <li style="position:relative;padding-left:28px;color:#C9D1D9;font-size:0.98rem;line-height:1.5;"><span style="position:absolute;left:0;top:1px;color:#ffba1a;">✓</span>API Key</li>
                </ul>
                <p style="color:#C9D1D9;font-size:1.05rem;line-height:1.7;margin:0 0 24px;">
                    Sistemas como <strong style="color:#fff;">ponto eletrônico, ERP</strong> e outras ferramentas corporativas que disponibilizem uma API
                    podem ser conectados para alimentar automaticamente os dados da plataforma.
                </p>
                <div style="background:rgba(255,186,26,0.08);border-left:3px solid #ffba1a;padding:18px 22px;border-radius:8px;">
                    <p style="color:#C9D1D9;font-size:0.95rem;line-height:1.6;margin:0;">
                        <i class="fas fa-cloud" style="color:#ffba1a;margin-right:8px;"></i>
                        A solução é <strong style="color:#fff;">100% SaaS</strong> — acessada via navegador, sem necessidade de instalação,
                        acesso à rede interna ou VPN do cliente.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ CTA FINAL ═══ -->
    <section id="sia-cta" style="position:relative;background:#0D1117;padding:120px 24px;border-top:1px solid rgba(255,255,255,0.06);overflow:hidden;">
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(255,186,26,0.12) 0%,transparent 60%);pointer-events:none;"></div>

        <div style="position:relative;max-width:760px;margin:0 auto;text-align:center;">
            <h2 style="font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 18px;">
                Ainda tem dúvidas técnicas?
            </h2>
            <p style="font-size:1.1rem;color:#C9D1D9;line-height:1.65;margin:0 0 36px;">
                Nossa equipe pode agendar uma conversa com o time de TI da sua empresa para detalhar a arquitetura,
                controles de segurança e responder qualquer questionamento técnico.
            </p>
            <a href="/chat" style="display:inline-flex;align-items:center;gap:10px;background:#ffba1a;color:#0D1117;font-weight:800;font-size:16px;padding:18px 38px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;box-shadow:0 12px 32px rgba(255,186,26,0.35);">
                FALAR COM NOSSA EQUIPE <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </section>

</div>
`;
