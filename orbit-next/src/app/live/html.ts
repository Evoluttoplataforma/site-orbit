export const pageHTML = `
    <!-- ═══ LIVE HERO ═══ -->
    <section class="lp-hero" id="hero" style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden;">
        <div class="lp-hero__bg-image" style="opacity:0.25;">
            <img src="/images/fundo-orbit.jpg" alt="" width="1920" height="1080" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:center;">
        </div>
        <div class="lp-hero__glow lp-hero__glow--1"></div>
        <div class="lp-hero__glow lp-hero__glow--2"></div>
        <div class="container" style="max-width:900px;">

            <!-- Recurrence badge -->
            <div style="display:inline-flex;align-items:center;gap:10px;background:rgba(255,186,26,0.12);border:1px solid rgba(255,186,26,0.3);border-radius:100px;padding:8px 20px;margin-bottom:24px;" data-reveal>
                <span style="width:10px;height:10px;background:#ff4444;border-radius:50%;display:inline-block;animation:livePulse 1.5s ease-in-out infinite;"></span>
                <span style="color:#ffba1a;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;">AO VIVO NO YOUTUBE</span>
            </div>

            <!-- Schedule highlight -->
            <div style="display:inline-block;background:linear-gradient(135deg,rgba(255,186,26,0.15),rgba(255,186,26,0.05));border:2px solid rgba(255,186,26,0.4);border-radius:16px;padding:16px 36px;margin-bottom:32px;" data-reveal>
                <span style="color:#ffba1a;font-size:clamp(1.1rem,2.5vw,1.5rem);font-weight:800;letter-spacing:0.5px;">
                    <i class="fa-solid fa-calendar-check" style="margin-right:10px;"></i>TODA TERCA-FEIRA AS 13H
                </span>
            </div>

            <!-- Title -->
            <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:800;color:#fff;line-height:1.15;margin-bottom:20px;" data-reveal>
                A Nova Era da Gest&atilde;o com Time de IA
            </h1>

            <!-- Subtitle -->
            <p style="font-size:clamp(1rem,2.5vw,1.35rem);color:#8B949E;max-width:700px;margin:0 auto 16px;line-height:1.6;" data-reveal>
                Como resolver problemas de <strong style="color:#ffba1a;">gestao e processos com IA</strong>. Uma conversa pratica sobre o que ja e possivel fazer hoje — e como aplicar na sua empresa.
            </p>

            <!-- Apresentadores -->
            <div style="display:flex;align-items:center;justify-content:center;gap:32px;flex-wrap:wrap;margin:24px 0 8px;" data-reveal>
                <div style="display:flex;align-items:center;gap:12px;">
                    <img src="/images/diretor-igor.jpg" alt="Igor Furniel" width="56" height="56" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,186,26,0.4);">
                    <div style="text-align:left;">
                        <span style="color:#fff;font-weight:700;font-size:16px;display:block;line-height:1.3;">Igor Furniel</span>
                        <span style="color:#8B949E;font-size:13px;">CEO Templum & Evolutto</span>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                    <img src="/images/diretor-dani.jpg" alt="Daniela Albuquerque" width="56" height="56" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,186,26,0.4);">
                    <div style="text-align:left;">
                        <span style="color:#fff;font-weight:700;font-size:16px;display:block;line-height:1.3;">Daniela Albuquerque</span>
                        <span style="color:#8B949E;font-size:13px;">Especialista em Processos e Qualidade</span>
                    </div>
                </div>
            </div>

            <!-- Next live info -->
            <div style="display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;margin:32px 0;" data-reveal>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-calendar-day" style="color:#ffba1a;font-size:18px;"></i>
                    <span id="nextLiveDate" style="font-size:18px;font-weight:600;">Proxima terca-feira</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-solid fa-clock" style="color:#ffba1a;font-size:18px;"></i>
                    <span style="font-size:18px;font-weight:600;">13h (horario de Brasilia)</span>
                </div>
                <div style="display:flex;align-items:center;gap:10px;color:#C9D1D9;">
                    <i class="fa-brands fa-youtube" style="color:#ff0000;font-size:20px;"></i>
                    <span style="font-size:18px;font-weight:600;">YouTube</span>
                </div>
            </div>

            <!-- Countdown -->
            <div id="liveCountdown" style="display:flex;justify-content:center;gap:16px;margin:40px 0;" data-reveal>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countDays" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Dias</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countHours" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Horas</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countMinutes" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Minutos</span>
                </div>
                <div style="background:rgba(255,186,26,0.08);border:1px solid rgba(255,186,26,0.2);border-radius:16px;padding:20px 24px;min-width:90px;text-align:center;">
                    <span id="countSeconds" style="font-size:2.5rem;font-weight:800;color:#ffba1a;display:block;line-height:1;">00</span>
                    <span style="font-size:12px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">Segundos</span>
                </div>
            </div>

            <!-- Live now message (hidden until live) -->
            <div id="liveNow" style="display:none;margin:40px 0;">
                <p style="font-size:1.5rem;font-weight:700;color:#3FB950;">
                    <i class="fa-solid fa-circle" style="font-size:12px;animation:livePulse 1.5s ease-in-out infinite;margin-right:8px;"></i>
                    Estamos ao vivo agora!
                </p>
            </div>

            <!-- CTA -->
            <div style="margin-top:8px;" data-reveal>
                <a onclick="document.getElementById('inscreva-se').scrollIntoView({behavior:'smooth'})" class="btn btn-primary btn-lg hero-cta-glow" style="font-size:18px;padding:18px 48px;cursor:pointer;">
                    <i class="fa-brands fa-youtube" style="margin-right:8px;"></i>QUERO PARTICIPAR DA LIVE
                </a>
                <p style="color:#8B949E;font-size:14px;margin-top:16px;">
                    <i class="fa-solid fa-lock" style="margin-right:6px;"></i>Gratuito no YouTube. Inscreva-se para receber o link.
                </p>
            </div>
        </div>
    </section>

    <!-- ═══ OLIVIA + AGENTES (Orbit Hub) ═══ -->
    <section style="padding:80px 0 40px;background:#0D1117;overflow:hidden;">
        <div class="container" style="overflow:hidden;">
            <!-- ═══ ORBITAL: dezenas de agentes ao redor da Olívia ═══ -->
            <div style="margin-top:80px;" id="agentes">
                <!-- Section header -->
                <div style="text-align:center;margin-bottom:24px;" data-reveal>
                    <span class="section-badge section-badge--gold">dezenas de agentes especializados</span>
                    <h3 style="color:#fff;font-size:clamp(1.5rem,3vw,2rem);font-weight:800;margin:16px 0 12px;">Seu time de IA coordenado pela <span style="color:#ffba1a;">Olívia</span></h3>
                    <p style="color:rgba(255,255,255,0.5);font-size:1rem;max-width:560px;margin:0 auto;">Cada agente domina uma área. A Olívia coordena todos, conecta os dados e entrega clareza.</p>
                </div>

                <!-- Orbital container - SVG lines drawn by JS -->
                <div class="orbit-hub" id="orbitHub">
                    <!-- Center: Olívia -->
                    <div class="orbit-hub__center">
                        <div class="orbit-hub__glow"></div>
                        <div class="orbit-hub__photo">
                            <img src="/images/olivia.png" alt="Olívia" width="1200" height="1801" loading="lazy" decoding="async">
                        </div>
                        <div class="orbit-hub__name">Olívia</div>
                        <div class="orbit-hub__role">Coordenadora Geral</div>
                        <div class="orbit-hub__ring orbit-hub__ring--1"></div>
                        <div class="orbit-hub__ring orbit-hub__ring--2"></div>
                        <div class="orbit-hub__ring orbit-hub__ring--3"></div>
                    </div>

                    <!-- SVG connector lines (drawn by JS) -->
                    <svg class="orbit-hub__lines" id="orbitLines"></svg>

                    <!-- 12 Agent nodes positioned in a circle -->
                    <div class="orbit-hub__node" data-idx="0">
                        <div class="orbit-hub__node-icon"><i class="fas fa-compass"></i></div>
                        <div class="orbit-hub__node-label">Estrategista</div>
                        <div class="orbit-hub__node-desc">SWOT, BSC e planejamento estratégico</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente Estrategista</div>
                            <div class="orbit-node-card__text">Analisa o cenário da empresa com SWOT, define OKRs e monta o planejamento estratégico. Cruza dados de todos os outros agentes para alinhar a direção.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>95%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:95%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">SWOT</span><span class="orbit-node-card__tag">BSC</span><span class="orbit-node-card__tag">OKRs</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="1">
                        <div class="orbit-hub__node-icon"><i class="fas fa-diagram-project"></i></div>
                        <div class="orbit-hub__node-label">Processos</div>
                        <div class="orbit-hub__node-desc">Mapeamento, playbooks e automação</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Processos</div>
                            <div class="orbit-node-card__text">Mapeia, documenta e gera instruções de trabalho automaticamente. Reduz retrabalho e garante qualidade em cada execução.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>90%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:90%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Playbooks</span><span class="orbit-node-card__tag">ISO</span><span class="orbit-node-card__tag">Automação</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="2">
                        <div class="orbit-hub__node-icon"><i class="fas fa-user-group"></i></div>
                        <div class="orbit-hub__node-label">Pessoas</div>
                        <div class="orbit-hub__node-desc">Cargos, desempenho e PDIs</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Pessoas</div>
                            <div class="orbit-node-card__text">Cria descrições de cargo, avaliações de desempenho e PDIs personalizados. Identifica gaps de competência e sugere trilhas de desenvolvimento.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>88%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:88%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">360°</span><span class="orbit-node-card__tag">PDI</span><span class="orbit-node-card__tag">Skills</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="3">
                        <div class="orbit-hub__node-icon"><i class="fas fa-graduation-cap"></i></div>
                        <div class="orbit-hub__node-label">Treinamento</div>
                        <div class="orbit-hub__node-desc">Microlearning e trilhas via WhatsApp</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Treinamento</div>
                            <div class="orbit-node-card__text">Treina equipes via WhatsApp com microlearning diário. Adapta conteúdo ao nível de cada colaborador e acompanha engajamento.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>92%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:92%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">WhatsApp</span><span class="orbit-node-card__tag">Micro</span><span class="orbit-node-card__tag">Quiz</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="4">
                        <div class="orbit-hub__node-icon"><i class="fas fa-chart-column"></i></div>
                        <div class="orbit-hub__node-label">Indicadores</div>
                        <div class="orbit-hub__node-desc">KPIs em tempo real e causa raiz</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Indicadores</div>
                            <div class="orbit-node-card__text">Monitora KPIs em tempo real, identifica desvios e sugere hipóteses de causa raiz com IA antes que o problema cresça.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>94%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:94%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">KPIs</span><span class="orbit-node-card__tag">Dashboard</span><span class="orbit-node-card__tag">Alertas</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="5">
                        <div class="orbit-hub__node-icon"><i class="fas fa-magnifying-glass-chart"></i></div>
                        <div class="orbit-hub__node-label">Pesquisa</div>
                        <div class="orbit-hub__node-desc">Clima, formulários e insights</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Pesquisa</div>
                            <div class="orbit-node-card__text">Cria pesquisas de clima, satisfação e NPS. Analisa respostas e entrega insights acionáveis sobre a percepção das equipes.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>82%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:82%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">NPS</span><span class="orbit-node-card__tag">Clima</span><span class="orbit-node-card__tag">Insights</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="6">
                        <div class="orbit-hub__node-icon"><i class="fas fa-shield-halved"></i></div>
                        <div class="orbit-hub__node-label">Riscos</div>
                        <div class="orbit-hub__node-desc">Mitigação e prevenção contínua</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Riscos</div>
                            <div class="orbit-node-card__text">Identifica ameaças antes que virem crises. Monitora indicadores de risco e sugere planos de mitigação preventivos.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>91%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:91%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Prevenção</span><span class="orbit-node-card__tag">PDCA</span><span class="orbit-node-card__tag">Alertas</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="7">
                        <div class="orbit-hub__node-icon"><i class="fas fa-lightbulb"></i></div>
                        <div class="orbit-hub__node-label">Oportunidades</div>
                        <div class="orbit-hub__node-desc">Mercado, parcerias e expansão</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Oportunidades</div>
                            <div class="orbit-node-card__text">Escaneia o mercado, identifica novas oportunidades e cruza com dados internos para sugerir ações de expansão e parcerias.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>87%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:87%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Mercado</span><span class="orbit-node-card__tag">Growth</span><span class="orbit-node-card__tag">Parcerias</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="8">
                        <div class="orbit-hub__node-icon"><i class="fas fa-triangle-exclamation"></i></div>
                        <div class="orbit-hub__node-label">Problemas</div>
                        <div class="orbit-hub__node-desc">Não-conformidades e PDCA</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Problemas</div>
                            <div class="orbit-node-card__text">Registra não-conformidades, aplica PDCA automaticamente e acompanha a resolução até o fechamento com evidências.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>89%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:89%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">PDCA</span><span class="orbit-node-card__tag">5W2H</span><span class="orbit-node-card__tag">NC</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="9">
                        <div class="orbit-hub__node-icon"><i class="fas fa-file-lines"></i></div>
                        <div class="orbit-hub__node-label">Documentos</div>
                        <div class="orbit-hub__node-desc">Padronização e controle</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Documentos</div>
                            <div class="orbit-node-card__text">Padroniza, versiona e controla todos os documentos da empresa. Garante que todos trabalhem com a versão mais recente.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>80%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:80%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Versão</span><span class="orbit-node-card__tag">ISO</span><span class="orbit-node-card__tag">Padrão</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="10">
                        <div class="orbit-hub__node-icon"><i class="fas fa-handshake"></i></div>
                        <div class="orbit-hub__node-label">Vendas</div>
                        <div class="orbit-hub__node-desc">CRM, funil e coaching comercial</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Vendas</div>
                            <div class="orbit-node-card__text">Gerencia o funil comercial, faz coaching da equipe de vendas e identifica oportunidades de upsell e cross-sell com IA.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>93%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:93%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">CRM</span><span class="orbit-node-card__tag">Funil</span><span class="orbit-node-card__tag">Coaching</span></div>
                        </div>
                    </div>
                    <div class="orbit-hub__node" data-idx="11">
                        <div class="orbit-hub__node-icon"><i class="fas fa-video"></i></div>
                        <div class="orbit-hub__node-label">Reuniões</div>
                        <div class="orbit-hub__node-desc">Transcrição e planos de ação</div>
                        <div class="orbit-node-card">
                            <div class="orbit-node-card__status"><i class="fas fa-circle" style="font-size:5px"></i> Ativo 24/7</div>
                            <div class="orbit-node-card__title">Agente de Reuniões</div>
                            <div class="orbit-node-card__text">Transcreve reuniões, extrai decisões e gera planos de ação automaticamente. Nunca mais perca um follow-up.</div>
                            <div class="orbit-node-card__bar"><div class="orbit-node-card__bar-label"><span>Impacto</span><span>86%</span></div><div class="orbit-node-card__bar-track"><div class="orbit-node-card__bar-fill" style="width:86%"></div></div></div>
                            <div class="orbit-node-card__tags"><span class="orbit-node-card__tag">Ata</span><span class="orbit-node-card__tag">Follow-up</span><span class="orbit-node-card__tag">IA</span></div>
                        </div>
                    </div>
                </div>

                <!-- Bottom CTA -->
                <div style="text-align:center;margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.06);" data-reveal>
                    <p style="color:rgba(255,255,255,0.5);font-size:1.1rem;margin-bottom:20px;">Veja tudo isso funcionando <strong style="color:#fff;">ao vivo na live.</strong></p>
                    <a onclick="document.getElementById('inscreva-se').scrollIntoView({behavior:'smooth'})" class="btn btn-primary btn-lg" style="cursor:pointer;"><i class="fa-brands fa-youtube" style="margin-right:8px;"></i>QUERO PARTICIPAR DA LIVE</a>
                </div>

                <script>
                (function() {
                    var hub = document.getElementById('orbitHub');
                    if (!hub) return;

                    var TOTAL = 12;
                    var nodes = hub.querySelectorAll('.orbit-hub__node');
                    var svg = document.getElementById('orbitLines');

                    function layout() {
                        var w = hub.offsetWidth;
                        var h = hub.offsetHeight;
                        var cx = w / 2;
                        var cy = h / 2;
                        /* Radius scales with container — tighter on mobile */
                        var radius = Math.min(w, h) / 2 - 40;
                        if (w < 500) radius = Math.min(w, h) / 2 - 30;
                        if (radius < 80) radius = 80;
                        if (w <= 480 && radius > 140) radius = 140;
                        else if (w <= 768 && radius > 170) radius = 170;
                        else if (radius > 360) radius = 360;

                        svg.setAttribute('width', w);
                        svg.setAttribute('height', h);
                        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
                        svg.innerHTML = '';

                        /* Defs for glow filter and gradient */
                        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                        defs.innerHTML = '<filter id="lineGlow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
                        svg.appendChild(defs);

                        nodes.forEach(function(node, i) {
                            var angle = (i / TOTAL) * Math.PI * 2 - Math.PI / 2;
                            var nx = cx + Math.cos(angle) * radius;
                            var ny = cy + Math.sin(angle) * radius;

                            node.style.left = nx + 'px';
                            node.style.top = ny + 'px';

                            /* Draw line from node to center */
                            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            line.setAttribute('x1', cx);
                            line.setAttribute('y1', cy);
                            line.setAttribute('x2', nx);
                            line.setAttribute('y2', ny);
                            line.setAttribute('stroke', 'rgba(255,186,26,0.2)');
                            line.setAttribute('stroke-width', '1.5');
                            line.setAttribute('filter', 'url(#lineGlow)');
                            svg.appendChild(line);

                            /* Animated dot traveling along line */
                            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                            circle.setAttribute('r', '3.5');
                            circle.setAttribute('fill', '#ffca4a');
                            circle.setAttribute('filter', 'url(#lineGlow)');
                            var anim = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
                            anim.setAttribute('dur', '2.5s');
                            anim.setAttribute('repeatCount', 'indefinite');
                            anim.setAttribute('begin', (i * 0.2) + 's');
                            var path = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
                            /* Create a path element for the motion */
                            var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                            pathEl.setAttribute('id', 'orbit-path-' + i);
                            pathEl.setAttribute('d', 'M' + nx + ',' + ny + ' L' + cx + ',' + cy);
                            pathEl.setAttribute('fill', 'none');
                            defs.appendChild(pathEl);
                            path.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#orbit-path-' + i);
                            anim.appendChild(path);
                            circle.appendChild(anim);
                            svg.appendChild(circle);
                        });
                    }

                    /* Entrance animation on scroll */
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

                    /* Hover to expand agent card */
                    nodes.forEach(function(node) {
                        node.addEventListener('mouseenter', function() {
                            nodes.forEach(function(n) {
                                n.classList.remove('orbit-node--active', 'orbit-node--dimmed');
                            });
                            node.classList.add('orbit-node--active');
                            nodes.forEach(function(n) {
                                if (n !== node) n.classList.add('orbit-node--dimmed');
                            });
                        });
                        node.addEventListener('mouseleave', function() {
                            nodes.forEach(function(n) {
                                n.classList.remove('orbit-node--active', 'orbit-node--dimmed');
                            });
                        });
                    });
                })();
                </script>
            </div>

            <style>
                /* ═══ ORBITAL HUB - 12 agents around Olívia ═══ */
                .orbit-hub {
                    position: relative;
                    width: 100%;
                    max-width: 860px;
                    height: 860px;
                    margin: 0 auto;
                }

                /* SVG connector lines */
                .orbit-hub__lines {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                /* ── CENTER: OLÍVIA ── */
                .orbit-hub__center {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 3;
                }
                .orbit-hub__glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 260px;
                    height: 260px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,186,26,0.2) 0%, rgba(255,186,26,0.05) 50%, transparent 70%);
                    animation: orbit-glow 3.5s ease-in-out infinite;
                    pointer-events: none;
                }
                @keyframes orbit-glow {
                    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
                }
                .orbit-hub__photo {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 4px solid rgba(255,186,26,0.6);
                    overflow: hidden;
                    box-shadow: 0 0 40px rgba(255,186,26,0.4), 0 0 80px rgba(255,186,26,0.15);
                    animation: orbit-photo-breathe 3.5s ease-in-out infinite;
                    position: relative;
                    z-index: 2;
                }
                @keyframes orbit-photo-breathe {
                    0%, 100% { box-shadow: 0 0 40px rgba(255,186,26,0.4), 0 0 80px rgba(255,186,26,0.15); }
                    50% { box-shadow: 0 0 50px rgba(255,186,26,0.6), 0 0 100px rgba(255,186,26,0.25); }
                }
                .orbit-hub__photo img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .orbit-hub__name {
                    color: #ffba1a;
                    font-size: 20px;
                    font-weight: 800;
                    margin-top: 14px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .orbit-hub__role {
                    color: rgba(255,255,255,0.5);
                    font-size: 13px;
                    margin-top: 4px;
                }

                /* Pulsating rings */
                .orbit-hub__ring {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    border: 1.5px solid rgba(255,186,26,0.12);
                    pointer-events: none;
                    animation: orbit-ring 3.5s ease-in-out infinite;
                }
                .orbit-hub__ring--1 {
                    width: 180px; height: 180px;
                    transform: translate(-50%, calc(-50% - 12px));
                }
                .orbit-hub__ring--2 {
                    width: 220px; height: 220px;
                    border-color: rgba(255,186,26,0.07);
                    transform: translate(-50%, calc(-50% - 12px));
                    animation-delay: 0.5s;
                }
                .orbit-hub__ring--3 {
                    width: 264px; height: 264px;
                    border-color: rgba(255,186,26,0.04);
                    transform: translate(-50%, calc(-50% - 12px));
                    animation-delay: 1s;
                }
                @keyframes orbit-ring {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }

                /* ── AGENT NODES ── */
                .orbit-hub__node {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    z-index: 2;
                    cursor: default;
                    transition: transform 0.3s ease;
                    /* Entrance: start invisible */
                    opacity: 0;
                    scale: 0.5;
                }
                .orbit-visible .orbit-hub__node {
                    animation: orbit-node-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
                }
                .orbit-visible .orbit-hub__node[data-idx="0"]  { animation-delay: 0.1s; }
                .orbit-visible .orbit-hub__node[data-idx="1"]  { animation-delay: 0.15s; }
                .orbit-visible .orbit-hub__node[data-idx="2"]  { animation-delay: 0.2s; }
                .orbit-visible .orbit-hub__node[data-idx="3"]  { animation-delay: 0.25s; }
                .orbit-visible .orbit-hub__node[data-idx="4"]  { animation-delay: 0.3s; }
                .orbit-visible .orbit-hub__node[data-idx="5"]  { animation-delay: 0.35s; }
                .orbit-visible .orbit-hub__node[data-idx="6"]  { animation-delay: 0.4s; }
                .orbit-visible .orbit-hub__node[data-idx="7"]  { animation-delay: 0.45s; }
                .orbit-visible .orbit-hub__node[data-idx="8"]  { animation-delay: 0.5s; }
                .orbit-visible .orbit-hub__node[data-idx="9"]  { animation-delay: 0.55s; }
                .orbit-visible .orbit-hub__node[data-idx="10"] { animation-delay: 0.6s; }
                .orbit-visible .orbit-hub__node[data-idx="11"] { animation-delay: 0.65s; }

                @keyframes orbit-node-in {
                    to { opacity: 1; scale: 1; }
                }

                .orbit-hub__node:hover {
                    transform: translate(-50%, -50%) scale(1.12);
                }
                .orbit-hub__node:hover .orbit-hub__node-icon {
                    border-color: #ffba1a;
                    box-shadow: 0 0 24px rgba(255,186,26,0.5);
                    background: linear-gradient(135deg, rgba(255,186,26,0.35), rgba(255,186,26,0.1));
                }

                .orbit-hub__node-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(255,186,26,0.15), rgba(255,186,26,0.04));
                    border: 2px solid rgba(255,186,26,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(4px);
                }
                .orbit-hub__node-icon i {
                    font-size: 20px;
                    color: #ffba1a;
                }
                .orbit-hub__node-label {
                    font-size: 14px;
                    font-weight: 800;
                    color: #fff;
                    white-space: nowrap;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
                }
                .orbit-hub__node-desc {
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(255,255,255,0.7);
                    white-space: nowrap;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
                    margin-top: -2px;
                }

                /* ── AGENT CARD ON CLICK ── */
                .orbit-hub__node { cursor: pointer; }
                .orbit-hub__node.orbit-node--active {
                    transform: translate(-50%, -50%) scale(1.2);
                    z-index: 100;
                }
                .orbit-hub__node.orbit-node--active .orbit-hub__node-icon {
                    border-color: #ffba1a;
                    box-shadow: 0 0 30px rgba(255,186,26,0.6);
                    background: linear-gradient(135deg, rgba(255,186,26,0.4), rgba(255,186,26,0.15));
                }
                .orbit-hub__node.orbit-node--dimmed {
                    opacity: 0.3 !important;
                }
                .orbit-node-card {
                    position: absolute;
                    top: calc(100% + 12px);
                    left: 50%;
                    transform: translateX(-50%) scale(0.9);
                    width: 260px;
                    background: rgba(13,17,23,0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,186,26,0.25);
                    border-radius: 16px;
                    padding: 20px;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 200;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 40px rgba(255,186,26,0.08);
                }
                .orbit-node--active .orbit-node-card {
                    opacity: 1;
                    pointer-events: auto;
                    transform: translateX(-50%) scale(1);
                }
                .orbit-node-card::before {
                    content: '';
                    position: absolute;
                    top: -6px;
                    left: 50%;
                    transform: translateX(-50%) rotate(45deg);
                    width: 10px;
                    height: 10px;
                    background: rgba(13,17,23,0.95);
                    border-left: 1px solid rgba(255,186,26,0.25);
                    border-top: 1px solid rgba(255,186,26,0.25);
                }
                .orbit-node-card__status {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.65rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #22C55E;
                    background: rgba(34,197,94,0.1);
                    border: 1px solid rgba(34,197,94,0.2);
                    padding: 3px 10px;
                    border-radius: 20px;
                    margin-bottom: 12px;
                }
                .orbit-node-card__title {
                    color: #fff;
                    font-size: 0.95rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .orbit-node-card__text {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.8rem;
                    line-height: 1.6;
                    margin-bottom: 14px;
                }
                .orbit-node-card__bar {
                    margin-bottom: 12px;
                }
                .orbit-node-card__bar-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 4px;
                }
                .orbit-node-card__bar-track {
                    width: 100%;
                    height: 4px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 2px;
                    overflow: hidden;
                }
                .orbit-node-card__bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ffba1a, #ffca4a);
                    border-radius: 2px;
                    transition: width 0.6s ease;
                }
                .orbit-node-card__tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }
                .orbit-node-card__tag {
                    font-size: 0.65rem;
                    color: rgba(255,255,255,0.5);
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.06);
                    padding: 3px 8px;
                    border-radius: 4px;
                }
                @media (max-width: 768px) {
                    .orbit-node-card { width: 220px; padding: 16px; }
                }

                /* Olívia entrance */
                .orbit-hub__center {
                    opacity: 0;
                    scale: 0.3;
                }
                .orbit-visible .orbit-hub__center {
                    animation: orbit-center-in 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards;
                }
                @keyframes orbit-center-in {
                    to { opacity: 1; scale: 1; }
                }

                /* SVG lines entrance */
                .orbit-hub__lines {
                    opacity: 0;
                }
                .orbit-visible .orbit-hub__lines {
                    animation: orbit-lines-in 0.8s ease 0.3s forwards;
                }
                @keyframes orbit-lines-in {
                    to { opacity: 1; }
                }

                /* ── MOBILE: keep orbital, just smaller ── */
                @media (max-width: 768px) {
                    .orbit-hub {
                        max-width: 100%;
                        height: 420px;
                    }
                    .orbit-hub__glow { width: 120px; height: 120px; }
                    .orbit-hub__photo { width: 70px; height: 70px; border-width: 3px; }
                    .orbit-hub__name { font-size: 13px; margin-top: 8px; }
                    .orbit-hub__role { font-size: 10px; }
                    .orbit-hub__ring--1 { width: 110px; height: 110px; }
                    .orbit-hub__ring--2 { width: 140px; height: 140px; }
                    .orbit-hub__ring--3 { display: none; }
                    .orbit-hub__node-icon {
                        width: 36px;
                        height: 36px;
                    }
                    .orbit-hub__node-icon i { font-size: 14px; }
                    .orbit-hub__node-label {
                        font-size: 10px;
                    }
                    .orbit-hub__node-desc {
                        display: none;
                    }
                }
                @media (max-width: 480px) {
                    .orbit-hub {
                        height: 360px;
                    }
                    .orbit-hub__photo { width: 56px; height: 56px; }
                    .orbit-hub__glow { width: 90px; height: 90px; }
                    .orbit-hub__name { font-size: 11px; margin-top: 6px; }
                    .orbit-hub__role { font-size: 9px; }
                    .orbit-hub__ring--1 { width: 90px; height: 90px; }
                    .orbit-hub__ring--2 { display: none; }
                    .orbit-hub__node-icon {
                        width: 30px;
                        height: 30px;
                    }
                    .orbit-hub__node-icon i { font-size: 12px; }
                    .orbit-hub__node-label { font-size: 9px; }
                }
            </style>
        </div>
    </section>


    <!-- ═══ QUEM DEVE PARTICIPAR ═══ -->
    <section style="padding:100px 0;background:var(--black-soft);">
        <div class="container" style="max-width:800px;text-align:center;">
            <h2 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:#fff;margin-bottom:16px;" data-reveal>
                Essa live e para voce que...
            </h2>
            <div style="display:flex;flex-direction:column;gap:16px;margin-top:40px;text-align:left;max-width:600px;margin-left:auto;margin-right:auto;">
                <div style="display:flex;align-items:flex-start;gap:14px;" data-reveal>
                    <i class="fa-solid fa-check-circle" style="color:#ffba1a;font-size:20px;margin-top:3px;flex-shrink:0;"></i>
                    <span style="color:#C9D1D9;font-size:17px;line-height:1.6;">E empresario ou gestor e quer ver <strong style="color:#fff;">IA operando gestao de verdade</strong></span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:14px;" data-reveal>
                    <i class="fa-solid fa-check-circle" style="color:#ffba1a;font-size:20px;margin-top:3px;flex-shrink:0;"></i>
                    <span style="color:#C9D1D9;font-size:17px;line-height:1.6;">Quer conhecer a <strong style="color:#ffba1a;">Olivia</strong> e os agentes antes de contratar</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:14px;" data-reveal>
                    <i class="fa-solid fa-check-circle" style="color:#ffba1a;font-size:20px;margin-top:3px;flex-shrink:0;"></i>
                    <span style="color:#C9D1D9;font-size:17px;line-height:1.6;">Busca uma <strong style="color:#fff;">solucao completa</strong>, nao so mais uma ferramenta</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:14px;" data-reveal>
                    <i class="fa-solid fa-check-circle" style="color:#ffba1a;font-size:20px;margin-top:3px;flex-shrink:0;"></i>
                    <span style="color:#C9D1D9;font-size:17px;line-height:1.6;">Quer tirar duvidas <strong style="color:#fff;">ao vivo</strong> com quem criou a plataforma</span>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ FORMULARIO DE INSCRICAO ═══ -->
    <section id="inscreva-se" style="padding:100px 0;background:#0D1117;text-align:center;">
        <div class="container" style="max-width:520px;">
            <h2 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:#fff;margin-bottom:16px;" data-reveal>
                Garanta sua vaga na live
            </h2>
            <p style="color:#8B949E;font-size:1.1rem;margin-bottom:40px;" data-reveal>
                Toda terca-feira as 13h no YouTube. Preencha abaixo para receber o link.
            </p>

            <div class="cta-form-card" data-reveal>
                <div style="text-align:center;margin-bottom:24px;">
                    <h3 style="font-size:22px;font-weight:700;color:#fff;margin-bottom:6px;"><i class="fa-brands fa-youtube" style="color:#ff0000;margin-right:8px;"></i>Inscreva-se gratuitamente</h3>
                    <p style="font-size:14px;color:#8B949E;">Preencha abaixo e receba o link da live no seu e-mail.</p>
                </div>

                <form id="liveForm" class="lead-form" novalidate>
                    <div class="form-group">
                        <label for="live-nome" style="color:#C9D1D9;">Nome completo *</label>
                        <input type="text" id="live-nome" name="nome" placeholder="Seu nome completo" required style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                    </div>
                    <div class="form-group">
                        <label for="live-email" style="color:#C9D1D9;">E-mail *</label>
                        <input type="email" id="live-email" name="email" placeholder="seu@email.com" required style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                    </div>
                    <div class="form-group">
                        <label for="live-telefone" style="color:#C9D1D9;">WhatsApp *</label>
                        <input type="tel" id="live-telefone" name="telefone" placeholder="(00) 00000-0000" required style="color:#000 !important;background:#fff !important;border:1px solid #30363D;">
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg btn-submit hero-cta-glow" style="cursor:pointer;border:none;">
                        <i class="fa-brands fa-youtube" style="margin-right:8px;"></i>QUERO PARTICIPAR DA LIVE
                    </button>
                    <p style="color:#8B949E;font-size:13px;text-align:center;margin-top:8px;">
                        <i class="fa-solid fa-lock" style="margin-right:6px;"></i>Seus dados estao seguros. Nao enviamos spam.
                    </p>
                </form>

                <div id="liveFormSuccess" style="display:none;text-align:center;padding:20px 0;">
                    <div style="width:64px;height:64px;background:rgba(63,185,80,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                        <i class="fa-solid fa-check" style="color:#3FB950;font-size:28px;"></i>
                    </div>
                    <h3 style="color:#fff;font-size:1.5rem;font-weight:700;margin-bottom:12px;">Inscricao confirmada!</h3>
                    <p style="color:var(--gray-500);font-size:16px;">Voce recebera o link da live no seu e-mail e WhatsApp antes do inicio.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Dynamic countdown to next Tuesday 13h BRT -->
    <script>
    (function() {
        function getNextTuesday() {
            var now = new Date();
            var day = now.getDay();
            var daysUntilTuesday = (2 - day + 7) % 7;
            if (daysUntilTuesday === 0) {
                var todayAt13 = new Date(now);
                todayAt13.setHours(14, 0, 0, 0);
                if (now >= todayAt13) daysUntilTuesday = 7;
            }
            var next = new Date(now);
            next.setDate(now.getDate() + daysUntilTuesday);
            next.setHours(13, 0, 0, 0);
            return next;
        }

        function formatDateBR(d) {
            var months = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
            return d.getDate() + ' de ' + months[d.getMonth()] + ', ' + d.getFullYear();
        }

        var target = getNextTuesday();

        var dateEl = document.getElementById('nextLiveDate');
        if (dateEl) dateEl.textContent = formatDateBR(target);

        function updateCountdown() {
            var now = new Date().getTime();
            var diff = target.getTime() - now;

            if (diff <= 0 && diff > -3600000) {
                var countdownEl = document.getElementById('liveCountdown');
                var liveNowEl = document.getElementById('liveNow');
                if (countdownEl) countdownEl.style.display = 'none';
                if (liveNowEl) liveNowEl.style.display = 'block';
                return;
            }

            if (diff <= 0) {
                target = getNextTuesday();
                if (dateEl) dateEl.textContent = formatDateBR(target);
                diff = target.getTime() - now;
            }

            var days = Math.floor(diff / 86400000);
            var hours = Math.floor((diff % 86400000) / 3600000);
            var minutes = Math.floor((diff % 3600000) / 60000);
            var seconds = Math.floor((diff % 60000) / 1000);

            var d = document.getElementById('countDays');
            var h = document.getElementById('countHours');
            var m = document.getElementById('countMinutes');
            var s = document.getElementById('countSeconds');
            if (d) d.textContent = days.toString().padStart(2, '0');
            if (h) h.textContent = hours.toString().padStart(2, '0');
            if (m) m.textContent = minutes.toString().padStart(2, '0');
            if (s) s.textContent = seconds.toString().padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    })();
    </script>

    <!-- Form submit handler -->
    <script>
    (function() {
        if (window.__liveFormInit) return;
        window.__liveFormInit = true;

        var SUPABASE_URL = 'https://tnpzoklepkvktbqouctf.supabase.co';
        var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucHpva2xlcGt2a3RicW91Y3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MjAxNjcsImV4cCI6MjA4NzE5NjE2N30.hXrOhbIm9DnxaItT1e9g6B6d9mhAmeoLKJ2DuHlABFU';

        var form = document.getElementById('liveForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i>Enviando...';

            var formData = new FormData(form);
            var data = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                source: 'live-semanal'
            };

            // Save lead to Supabase
            fetch(SUPABASE_URL + '/rest/v1/live_orbit_leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + SUPABASE_KEY,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(data)
            }).then(function(res) {
                if (!res.ok) throw new Error('Erro ao salvar');
                // Send confirmation email via Edge Function (fire and forget)
                fetch(SUPABASE_URL + '/functions/v1/send-live-confirmation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome: data.nome, email: data.email })
                }).catch(function() {});
                window.location.href = '/live/obrigado';
            }).catch(function(err) {
                console.error('Erro:', err);
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-brands fa-youtube" style="margin-right:8px;"></i>QUERO PARTICIPAR DA LIVE';
                alert('Erro ao enviar. Tente novamente.');
            });
        });
    })();
    </script>

    <style>
    body { overflow-x: hidden !important; }

    [data-reveal], [data-reveal-stagger] {
        opacity: 1 !important;
        transform: none !important;
    }

    @keyframes livePulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
    }

    .cta-form-card {
        border: 1px solid rgba(255,186,26,0.15) !important;
        box-shadow: 0 0 40px rgba(255,186,26,0.05);
    }

    @media (max-width: 768px) {
        .lp-hero .container { padding: 0 20px !important; }
        #liveCountdown { gap: 8px !important; }
        #liveCountdown > div { min-width: 65px !important; padding: 14px 8px !important; }
        #liveCountdown > div > span:first-child { font-size: 1.6rem !important; }
        .cta-form-card { padding: 24px 20px !important; }
        .btn-lg { font-size: 15px !important; padding: 14px 24px !important; }
    }
    @media (max-width: 420px) {
        #liveCountdown > div { min-width: 58px !important; padding: 10px 6px !important; }
        #liveCountdown > div > span:first-child { font-size: 1.3rem !important; }
        #liveCountdown > div > span:last-child { font-size: 10px !important; }
    }
    </style>
`;
