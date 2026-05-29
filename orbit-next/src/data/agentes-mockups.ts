// ═══════════════════════════════════════════════════════════════
// Mockups contextuais por agente/módulo.
// Cada função retorna HTML string com estética coerente (janela
// chrome, conteúdo específico da área). Inline styles porque template
// strings não passam pelo Tailwind v4 do projeto.
// ═══════════════════════════════════════════════════════════════

// ─── helpers ────────────────────────────────────────────────────────
const BASE = {
  win: 'background:#0A0A0C;border:1px solid rgba(255,255,255,0.10);border-radius:14px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,0.45);position:relative;',
  chrome: 'background:#0F1015;padding:11px 16px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,0.08);',
  dot: 'width:10px;height:10px;border-radius:50%;display:inline-block;',
  body: 'padding:20px;font-family:\'Plus Jakarta Sans\',system-ui,sans-serif;color:#E6E8EB;',
  card: 'background:#0F1015;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;',
  label: 'font-size:10px;color:#6E7884;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin:0 0 8px;',
  bigNum: 'font-size:28px;font-weight:800;color:#fff;line-height:1;letter-spacing:-0.02em;',
  goldNum: 'font-size:28px;font-weight:800;color:#ffba1a;line-height:1;letter-spacing:-0.02em;',
  trend: 'font-size:11px;font-weight:700;letter-spacing:0.5px;',
  pill: 'display:inline-block;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;',
};

function chrome(label: string): string {
  return `<div style="${BASE.chrome}">
    <span style="${BASE.dot}background:#ff5f57"></span>
    <span style="${BASE.dot}background:#febc2e"></span>
    <span style="${BASE.dot}background:#28c840"></span>
    <span style="margin-left:10px;font-size:11px;color:#8B949E;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">${label}</span>
    <span style="margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-size:11px;color:#3FB950;font-weight:600;"><span style="width:6px;height:6px;background:#3FB950;border-radius:50%;box-shadow:0 0 8px #3FB950"></span>ao vivo</span>
  </div>`;
}

// Mini gráfico de barras SVG dourado
function bars(values: number[], h = 60): string {
  const max = Math.max(...values);
  const w = 200;
  const gap = 6;
  const bw = (w - gap * (values.length - 1)) / values.length;
  return `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    ${values.map((v, i) => {
      const bh = (v / max) * (h - 6);
      const x = i * (bw + gap);
      const y = h - bh;
      const isLast = i === values.length - 1;
      return `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="2" fill="${isLast ? '#ffba1a' : 'rgba(255,186,26,0.35)'}"/>`;
    }).join('')}
  </svg>`;
}

// Linha de progresso
function progressBar(pct: number): string {
  return `<div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px;overflow:hidden;">
    <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#ffba1a,#ff8c00);border-radius:99px;"></div>
  </div>`;
}

// ─── MOCKUPS por slug ──────────────────────────────────────────────

// ESTRATÉGICO — Plano + SWOT + KPIs
function mockEstrategico(): string {
  return `${chrome('Orbit · Estratégico')}
  <div style="${BASE.body}">
    <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px;">
      <div>
        <p style="${BASE.label}">Plano 2026</p>
        <h3 style="margin:0;color:#fff;font-size:16px;font-weight:700;">Crescer 40% mantendo margem 22%</h3>
      </div>
      <span style="${BASE.pill}background:rgba(63,185,80,0.15);color:#3FB950;">No prazo</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:14px;">
      <div style="${BASE.card}">
        <p style="${BASE.label}">Receita YTD</p>
        <p style="${BASE.goldNum}">R$ 8,4M</p>
        <p style="${BASE.trend}color:#3FB950;margin:6px 0 0;">↑ 18% vs meta</p>
      </div>
      <div style="${BASE.card}">
        <p style="${BASE.label}">Margem trim.</p>
        <p style="${BASE.bigNum}">23,1%</p>
        <p style="${BASE.trend}color:#3FB950;margin:6px 0 0;">↑ 1,1pp vs meta</p>
      </div>
    </div>
    <div style="${BASE.card}padding:12px 14px;">
      <p style="${BASE.label}margin-bottom:10px;">SWOT — quadrantes</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px;">
        <div style="background:rgba(63,185,80,0.08);border-left:2px solid #3FB950;padding:7px 10px;border-radius:0 6px 6px 0;">
          <strong style="color:#3FB950;font-size:9px;letter-spacing:1px;">FORÇAS</strong><br>
          <span style="color:#C9D1D9;">Time consolidado · NPS 67</span>
        </div>
        <div style="background:rgba(255,186,26,0.08);border-left:2px solid #ffba1a;padding:7px 10px;border-radius:0 6px 6px 0;">
          <strong style="color:#ffba1a;font-size:9px;letter-spacing:1px;">OPORTUNIDADES</strong><br>
          <span style="color:#C9D1D9;">Mercado NE · Vertical Saúde</span>
        </div>
        <div style="background:rgba(248,81,73,0.08);border-left:2px solid #F85149;padding:7px 10px;border-radius:0 6px 6px 0;">
          <strong style="color:#F85149;font-size:9px;letter-spacing:1px;">FRAQUEZAS</strong><br>
          <span style="color:#C9D1D9;">Depend. comercial 1 vendedor</span>
        </div>
        <div style="background:rgba(255,255,255,0.04);border-left:2px solid #8B949E;padding:7px 10px;border-radius:0 6px 6px 0;">
          <strong style="color:#8B949E;font-size:9px;letter-spacing:1px;">AMEAÇAS</strong><br>
          <span style="color:#C9D1D9;">Câmbio · Concorrente novo</span>
        </div>
      </div>
    </div>
  </div>`;
}

// PROCESSOS — Diagrama BPMN simples + tarefas
function mockProcessos(): string {
  return `${chrome('Orbit · Processos · BPMN')}
  <div style="${BASE.body}">
    <p style="${BASE.label}margin-bottom:10px;">Processo: Onboarding cliente — v3.2</p>
    <div style="${BASE.card}padding:18px;">
      <svg viewBox="0 0 320 80" width="100%" height="80">
        <circle cx="20" cy="40" r="12" fill="rgba(63,185,80,0.2)" stroke="#3FB950" stroke-width="2"/>
        <rect x="50" y="22" width="55" height="36" rx="6" fill="rgba(255,186,26,0.10)" stroke="#ffba1a" stroke-width="1.5"/>
        <rect x="125" y="22" width="55" height="36" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
        <polygon points="200,40 220,28 240,40 220,52" fill="rgba(255,186,26,0.10)" stroke="#ffba1a" stroke-width="1.5"/>
        <rect x="255" y="22" width="55" height="36" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
        <circle cx="20" cy="40" r="4" fill="#3FB950"/>
        <line x1="33" y1="40" x2="50" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
        <line x1="105" y1="40" x2="125" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
        <line x1="180" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
        <line x1="240" y1="40" x2="255" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
        <text x="77" y="44" text-anchor="middle" font-size="9" fill="#ffba1a" font-weight="600">Coletar</text>
        <text x="152" y="44" text-anchor="middle" font-size="9" fill="#8B949E">Validar</text>
        <text x="220" y="44" text-anchor="middle" font-size="8" fill="#ffba1a" font-weight="600">OK?</text>
        <text x="282" y="44" text-anchor="middle" font-size="9" fill="#8B949E">Ativar</text>
      </svg>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px;">
      <div style="${BASE.card}padding:10px;text-align:center;">
        <p style="${BASE.label}font-size:9px;margin-bottom:4px;">SLA</p>
        <p style="font-size:18px;font-weight:800;color:#fff;margin:0;">7d</p>
      </div>
      <div style="${BASE.card}padding:10px;text-align:center;">
        <p style="${BASE.label}font-size:9px;margin-bottom:4px;">Tx erro</p>
        <p style="font-size:18px;font-weight:800;color:#3FB950;margin:0;">2,1%</p>
      </div>
      <div style="${BASE.card}padding:10px;text-align:center;">
        <p style="${BASE.label}font-size:9px;margin-bottom:4px;">Versão</p>
        <p style="font-size:18px;font-weight:800;color:#ffba1a;margin:0;">3.2</p>
      </div>
    </div>
  </div>`;
}

// PESSOAS — Organograma + cards
function mockPessoas(): string {
  return `${chrome('Orbit · Pessoas')}
  <div style="${BASE.body}">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px;">
      <div><p style="${BASE.label}">Colaboradores</p><p style="${BASE.bigNum}">142</p></div>
      <div><p style="${BASE.label}">Engajamento</p><p style="${BASE.goldNum}">82</p></div>
      <div><p style="${BASE.label}">Turnover 12m</p><p style="${BASE.bigNum}">8,4%</p></div>
    </div>
    <div style="${BASE.card}margin-bottom:10px;">
      <p style="${BASE.label}margin-bottom:8px;">Time Comercial · 24 pessoas</p>
      <div style="display:flex;gap:-4px;margin-bottom:8px;">
        ${['MR','JS','AC','BL','RP','TH'].map((i, n) => `<div style="width:28px;height:28px;border-radius:50%;background:${['#ffba1a','#3FB950','#58A6FF','#F85149','#A371F7','#FF7B72'][n]};border:2px solid #0A0A0C;display:flex;align-items:center;justify-content:center;color:#0A0A0C;font-size:10px;font-weight:800;margin-left:${n === 0 ? '0' : '-8px'};">${i}</div>`).join('')}
        <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.08);border:2px solid #0A0A0C;display:flex;align-items:center;justify-content:center;color:#8B949E;font-size:10px;font-weight:700;margin-left:-8px;">+18</div>
      </div>
      <p style="font-size:11px;color:#C9D1D9;margin:0;">Líder: <strong style="color:#fff;">Mariana Rocha</strong> · 6 em PDI ativo</p>
    </div>
    <div style="${BASE.card}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#ffba1a,#ff8c00);display:flex;align-items:center;justify-content:center;color:#0A0A0C;font-weight:800;font-size:13px;">LS</div>
        <div style="flex:1;">
          <p style="margin:0;color:#fff;font-weight:700;font-size:13px;">Lucas Silva</p>
          <p style="margin:0;color:#8B949E;font-size:11px;">Analista Comercial · PDI 72%</p>
        </div>
        <span style="${BASE.pill}background:rgba(63,185,80,0.15);color:#3FB950;">No plano</span>
      </div>
      ${progressBar(72)}
    </div>
  </div>`;
}

// INDICADORES — Dashboard com KPIs e gráfico
function mockIndicadores(): string {
  return `${chrome('Orbit · Indicadores')}
  <div style="${BASE.body}">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;">
      <div style="${BASE.card}">
        <p style="${BASE.label}">Receita Mês</p>
        <p style="${BASE.goldNum}">R$ 1,2M</p>
        <p style="${BASE.trend}color:#3FB950;margin:6px 0 0;">↑ 8% MoM</p>
      </div>
      <div style="${BASE.card}">
        <p style="${BASE.label}">NPS</p>
        <p style="${BASE.bigNum}">67</p>
        <p style="${BASE.trend}color:#3FB950;margin:6px 0 0;">↑ 4 pts</p>
      </div>
      <div style="${BASE.card}">
        <p style="${BASE.label}">CAC</p>
        <p style="${BASE.bigNum}">R$ 850</p>
        <p style="${BASE.trend}color:#F85149;margin:6px 0 0;">↑ 5% vs meta</p>
      </div>
    </div>
    <div style="${BASE.card}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <p style="${BASE.label}margin:0;">Receita × Meta — últimos 7</p>
        <span style="font-size:11px;color:#3FB950;font-weight:700;">+18%</span>
      </div>
      ${bars([45, 62, 58, 73, 68, 81, 92])}
    </div>
  </div>`;
}

// RISCOS — Matriz heatmap
function mockRiscos(): string {
  const cells = [
    [{ c: '#F85149', n: 1 }, { c: '#F85149', n: 0 }, { c: '#ff8c00', n: 2 }, { c: '#ffba1a', n: 1 }],
    [{ c: '#F85149', n: 2 }, { c: '#ff8c00', n: 3 }, { c: '#ffba1a', n: 1 }, { c: '#3FB950', n: 0 }],
    [{ c: '#ff8c00', n: 1 }, { c: '#ffba1a', n: 4 }, { c: '#3FB950', n: 2 }, { c: '#3FB950', n: 1 }],
    [{ c: '#ffba1a', n: 0 }, { c: '#3FB950', n: 3 }, { c: '#3FB950', n: 5 }, { c: '#3FB950', n: 2 }],
  ];
  return `${chrome('Orbit · Riscos')}
  <div style="${BASE.body}">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;">
      <div><p style="${BASE.label}">Riscos ativos</p><p style="${BASE.bigNum}">28</p></div>
      <div><p style="${BASE.label}">Críticos</p><p style="font-size:28px;font-weight:800;color:#F85149;line-height:1;">3</p></div>
      <div><p style="${BASE.label}">Mitigados (90d)</p><p style="${BASE.goldNum}">12</p></div>
    </div>
    <div style="${BASE.card}">
      <p style="${BASE.label}margin-bottom:10px;">Matriz Probabilidade × Impacto</p>
      <div style="display:grid;grid-template-columns:auto repeat(4,1fr);gap:3px;align-items:center;">
        <div></div>
        ${['Baixo','Médio','Alto','Crítico'].map((l) => `<div style="font-size:9px;color:#6E7884;text-align:center;text-transform:uppercase;letter-spacing:1px;font-weight:600;">${l}</div>`).join('')}
        ${cells.map((row, i) => {
          const labels = ['Muito Alta', 'Alta', 'Média', 'Baixa'];
          return `<div style="font-size:9px;color:#6E7884;text-transform:uppercase;letter-spacing:1px;font-weight:600;padding-right:8px;text-align:right;">${labels[i]}</div>${row.map((c) => `<div style="background:${c.c};opacity:${c.n > 0 ? 0.65 + c.n * 0.05 : 0.15};border-radius:4px;height:30px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:13px;">${c.n || ''}</div>`).join('')}`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

// TREINAMENTO — Trilha de curso com progresso
function mockTreinamento(): string {
  const cursos = [
    { t: 'Onboarding Comercial', p: 100, c: '#3FB950', m: 'Concluído' },
    { t: 'Gestão de Pipeline · BANT', p: 65, c: '#ffba1a', m: 'Em andamento' },
    { t: 'Negociação Avançada', p: 32, c: '#ffba1a', m: 'Em andamento' },
    { t: 'Liderança de Time', p: 0, c: '#8B949E', m: 'Próximo' },
  ];
  return `${chrome('Orbit · Treinamento')}
  <div style="${BASE.body}">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
      <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#ffba1a,#ff8c00);display:flex;align-items:center;justify-content:center;color:#0A0A0C;font-weight:800;">JM</div>
      <div style="flex:1;">
        <p style="margin:0;color:#fff;font-weight:700;">João Mendes</p>
        <p style="margin:0;font-size:11px;color:#8B949E;">Trilha Comercial 2026 · 4 cursos</p>
      </div>
      <div style="text-align:right;">
        <p style="${BASE.goldNum}font-size:22px;">49%</p>
        <p style="font-size:10px;color:#8B949E;margin:0;">progresso total</p>
      </div>
    </div>
    ${cursos.map((c) => `
      <div style="${BASE.card}margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <p style="margin:0;color:#fff;font-size:12px;font-weight:600;">${c.t}</p>
          <span style="font-size:10px;color:${c.c};font-weight:700;">${c.m} · ${c.p}%</span>
        </div>
        <div style="background:rgba(255,255,255,0.06);border-radius:99px;height:5px;overflow:hidden;">
          <div style="width:${c.p}%;height:100%;background:${c.c};border-radius:99px;"></div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

// OPORTUNIDADES — Matriz impacto × esforço + lista
function mockOportunidades(): string {
  const opps = [
    { t: 'Expansão NE — Recife', i: 'Alto', e: 'Médio', score: 87, c: '#3FB950' },
    { t: 'Vertical Saúde', i: 'Alto', e: 'Alto', score: 72, c: '#ffba1a' },
    { t: 'Plano Self-service', i: 'Médio', e: 'Baixo', score: 68, c: '#ffba1a' },
    { t: 'Integração WhatsApp', i: 'Médio', e: 'Médio', score: 54, c: '#8B949E' },
  ];
  return `${chrome('Orbit · Oportunidades')}
  <div style="${BASE.body}">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;">
      <div><p style="${BASE.label}">Capturadas (90d)</p><p style="${BASE.bigNum}">47</p></div>
      <div><p style="${BASE.label}">Priorizadas</p><p style="${BASE.goldNum}">12</p></div>
      <div><p style="${BASE.label}">Em validação</p><p style="${BASE.bigNum}">4</p></div>
    </div>
    <p style="${BASE.label}margin-bottom:8px;">Top oportunidades — score IA</p>
    ${opps.map((o) => `
      <div style="${BASE.card}margin-bottom:8px;display:flex;align-items:center;gap:12px;">
        <div style="width:38px;height:38px;border-radius:8px;background:${o.c};opacity:0.15;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid ${o.c}40;"><span style="color:${o.c};font-weight:800;font-size:14px;">${o.score}</span></div>
        <div style="flex:1;min-width:0;">
          <p style="margin:0;color:#fff;font-size:12px;font-weight:600;">${o.t}</p>
          <p style="margin:2px 0 0;color:#8B949E;font-size:10px;">Impacto ${o.i} · Esforço ${o.e}</p>
        </div>
      </div>
    `).join('')}
  </div>`;
}

// DOCUMENTOS — Árvore + busca
function mockDocumentos(): string {
  return `${chrome('Orbit · Documentos')}
  <div style="${BASE.body}">
    <div style="${BASE.card}margin-bottom:12px;display:flex;align-items:center;gap:10px;padding:12px 14px;">
      <i class="fa-solid fa-magnifying-glass" style="color:#ffba1a;"></i>
      <span style="font-size:12px;color:#C9D1D9;flex:1;">"última versão do contrato com TechParts"</span>
      <span style="${BASE.pill}background:rgba(255,186,26,0.15);color:#ffba1a;">Olívia</span>
    </div>
    <div style="${BASE.card}">
      <p style="${BASE.label}margin-bottom:10px;">3 resultados — ordenados por relevância</p>
      ${[
        { t: 'Contrato_TechParts_v4_assinado.pdf', d: 'Comercial · 12/04/2026 · Aprovado', i: 'fa-file-pdf', c: '#F85149' },
        { t: 'Aditivo_TechParts_2025.docx', d: 'Jurídico · 22/11/2025 · v2', i: 'fa-file-word', c: '#58A6FF' },
        { t: 'Termo_Confidencialidade_TechParts.pdf', d: 'Jurídico · 04/03/2024', i: 'fa-file-pdf', c: '#F85149' },
      ].map((d) => `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid rgba(255,255,255,0.04);">
          <i class="fa-solid ${d.i}" style="color:${d.c};font-size:18px;"></i>
          <div style="flex:1;min-width:0;">
            <p style="margin:0;color:#fff;font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${d.t}</p>
            <p style="margin:2px 0 0;color:#8B949E;font-size:10px;">${d.d}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// COMERCIAL — Pipeline Kanban
function mockComercial(): string {
  const stages = [
    { n: 'Prospecção', c: 12, v: 'R$ 240k', col: '#8B949E' },
    { n: 'Demo', c: 8, v: 'R$ 380k', col: '#58A6FF' },
    { n: 'Proposta', c: 5, v: 'R$ 520k', col: '#ffba1a' },
    { n: 'Negociação', c: 3, v: 'R$ 410k', col: '#3FB950' },
  ];
  return `${chrome('Orbit · Comercial')}
  <div style="${BASE.body}">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;">
      <div><p style="${BASE.label}">Pipeline ativo</p><p style="${BASE.goldNum}">R$ 1,55M</p></div>
      <div><p style="${BASE.label}">Conv. mês</p><p style="${BASE.bigNum}">34%</p></div>
      <div><p style="${BASE.label}">Fechamentos</p><p style="font-size:28px;font-weight:800;color:#3FB950;line-height:1;">8</p></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
      ${stages.map((s) => `
        <div style="background:#0F1015;border:1px solid rgba(255,255,255,0.08);border-top:3px solid ${s.col};border-radius:8px;padding:10px 8px;text-align:center;">
          <p style="${BASE.label}font-size:8px;margin-bottom:6px;">${s.n}</p>
          <p style="font-size:18px;font-weight:800;color:#fff;margin:0;">${s.c}</p>
          <p style="font-size:10px;color:${s.col};font-weight:700;margin:4px 0 0;">${s.v}</p>
        </div>
      `).join('')}
    </div>
    <div style="${BASE.card}margin-top:12px;">
      <p style="${BASE.label}margin-bottom:6px;">🧠 Olívia · top sugestão</p>
      <p style="margin:0;color:#fff;font-size:12px;line-height:1.5;">Tecno Brasil <strong style="color:#ffba1a;">R$ 145k</strong> · 22 dias sem contato — risco de perder pra concorrente. <span style="color:#ffba1a;font-weight:700;">Acionar agora →</span></p>
    </div>
  </div>`;
}

// PROBLEMAS OPERACIONAIS — Ishikawa + lista
function mockProblemas(): string {
  return `${chrome('Orbit · Problemas')}
  <div style="${BASE.body}">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px;">
      <div><p style="${BASE.label}">Abertos</p><p style="${BASE.bigNum}">14</p></div>
      <div><p style="${BASE.label}">Resolvidos 30d</p><p style="${BASE.goldNum}">22</p></div>
      <div><p style="${BASE.label}">SLA médio</p><p style="${BASE.bigNum}">4,2d</p></div>
    </div>
    <div style="${BASE.card}margin-bottom:10px;">
      <p style="${BASE.label}margin-bottom:10px;">RCA · "Atraso recorrente em entrega"</p>
      <svg viewBox="0 0 280 80" width="100%" height="80">
        <line x1="20" y1="40" x2="240" y2="40" stroke="#ffba1a" stroke-width="2"/>
        <polygon points="240,40 250,35 260,40 250,45" fill="#ffba1a"/>
        <rect x="260" y="30" width="20" height="20" rx="3" fill="rgba(255,186,26,0.2)" stroke="#ffba1a"/>
        <line x1="60" y1="40" x2="50" y2="10" stroke="rgba(255,255,255,0.3)"/>
        <line x1="120" y1="40" x2="110" y2="10" stroke="rgba(255,255,255,0.3)"/>
        <line x1="180" y1="40" x2="170" y2="10" stroke="rgba(255,255,255,0.3)"/>
        <line x1="60" y1="40" x2="70" y2="72" stroke="rgba(255,255,255,0.3)"/>
        <line x1="120" y1="40" x2="130" y2="72" stroke="rgba(255,255,255,0.3)"/>
        <line x1="180" y1="40" x2="190" y2="72" stroke="rgba(255,255,255,0.3)"/>
        <text x="45" y="8" font-size="9" fill="#C9D1D9">Pessoas</text>
        <text x="105" y="8" font-size="9" fill="#C9D1D9">Método</text>
        <text x="165" y="8" font-size="9" fill="#C9D1D9">Material</text>
        <text x="65" y="80" font-size="9" fill="#C9D1D9">Ambiente</text>
        <text x="125" y="80" font-size="9" fill="#C9D1D9">Máquina</text>
        <text x="185" y="80" font-size="9" fill="#C9D1D9">Medição</text>
      </svg>
    </div>
    <div style="${BASE.card}">
      <p style="${BASE.label}margin-bottom:6px;">🧠 Hipótese rank 1 — Olívia</p>
      <p style="margin:0;color:#fff;font-size:12px;line-height:1.5;">Pico de demanda 3ª-feira excede capacidade da equipe logística (3 motoristas pra 18+ rotas). <span style="color:#ffba1a;font-weight:700;">Análise: 0,89 confiança</span></p>
    </div>
  </div>`;
}

// REUNIÕES — Pauta + ações
function mockReunioes(): string {
  return `${chrome('Orbit · Reuniões')}
  <div style="${BASE.body}">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;">
      <div>
        <p style="${BASE.label}">Comitê Executivo</p>
        <p style="margin:0;color:#fff;font-weight:700;font-size:14px;">Quinta · 14h00 · 1h</p>
      </div>
      <span style="${BASE.pill}background:rgba(255,186,26,0.15);color:#ffba1a;">Pauta IA</span>
    </div>
    <p style="${BASE.label}margin-bottom:8px;">Pauta — 4 itens · 60min</p>
    ${[
      { t: 'Revisão Q1 — desvios estratégicos', m: 15, r: 'CEO' },
      { t: 'Decisão expansão Recife (Go/No-Go)', m: 20, r: 'COO' },
      { t: 'Risco crítico #4 — depend. fornecedor', m: 15, r: 'CFO' },
      { t: 'NPS Q1 + plano de ação', m: 10, r: 'CMO' },
    ].map((p, i) => `
      <div style="${BASE.card}margin-bottom:6px;display:flex;align-items:center;gap:10px;padding:10px 12px;">
        <span style="width:22px;height:22px;border-radius:5px;background:rgba(255,186,26,0.12);color:#ffba1a;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,186,26,0.3);">${i + 1}</span>
        <p style="margin:0;color:#fff;font-size:12px;font-weight:500;flex:1;">${p.t}</p>
        <span style="font-size:10px;color:#8B949E;">${p.r} · ${p.m}min</span>
      </div>
    `).join('')}
    <div style="${BASE.card}margin-top:12px;">
      <p style="${BASE.label}margin-bottom:4px;">🧠 Olívia detectou</p>
      <p style="margin:0;color:#fff;font-size:11px;line-height:1.5;">Item #2 conecta a riscos #4 e oportunidade Recife — sugiro juntar pra economizar 12min.</p>
    </div>
  </div>`;
}

// PESQUISAS — Gauge eNPS + chart
function mockPesquisas(): string {
  return `${chrome('Orbit · Pesquisas')}
  <div style="${BASE.body}">
    <div style="${BASE.card}padding:18px;margin-bottom:12px;text-align:center;">
      <p style="${BASE.label}margin-bottom:6px;">Pesquisa de Clima Q1 — 142 respostas (94%)</p>
      <svg viewBox="0 0 200 110" width="160" height="100">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="14"/>
        <path d="M 20 100 A 80 80 0 0 1 145 32" fill="none" stroke="#3FB950" stroke-width="14" stroke-linecap="round"/>
        <text x="100" y="80" text-anchor="middle" font-size="36" font-weight="800" fill="#fff">82</text>
        <text x="100" y="98" text-anchor="middle" font-size="9" fill="#8B949E">eNPS</text>
      </svg>
      <p style="margin:0;color:#3FB950;font-size:12px;font-weight:700;">↑ 14 pts vs trim. anterior</p>
    </div>
    <p style="${BASE.label}margin-bottom:8px;">Por área</p>
    ${[
      { a: 'Engenharia', s: 88, c: '#3FB950' },
      { a: 'Comercial', s: 76, c: '#ffba1a' },
      { a: 'Operações', s: 71, c: '#ffba1a' },
      { a: 'Financeiro', s: 89, c: '#3FB950' },
    ].map((d) => `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
        <span style="font-size:11px;color:#C9D1D9;width:90px;">${d.a}</span>
        <div style="flex:1;background:rgba(255,255,255,0.06);border-radius:99px;height:8px;overflow:hidden;">
          <div style="width:${d.s}%;height:100%;background:${d.c};border-radius:99px;"></div>
        </div>
        <span style="font-size:11px;color:#fff;font-weight:700;width:30px;text-align:right;">${d.s}</span>
      </div>
    `).join('')}
  </div>`;
}

// MÓDULO FINANCEIRO — DRE/Runway (mais próximo do design-system)
function mockFinanceiro(): string {
  return `${chrome('Orbit · Financeiro')}
  <div style="${BASE.body}">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;">
      <div style="${BASE.card}">
        <p style="${BASE.label}">Saldo Total</p>
        <p style="${BASE.bigNum}">R$ 4,2M</p>
        <p style="${BASE.trend}color:#3FB950;margin:6px 0 0;">+12,5%</p>
      </div>
      <div style="${BASE.card}">
        <p style="${BASE.label}">Burn mensal</p>
        <p style="${BASE.bigNum}">R$ 850k</p>
        <p style="${BASE.trend}color:#F85149;margin:6px 0 0;">+3% MoM</p>
      </div>
      <div style="${BASE.card}border:1px solid rgba(255,186,26,0.35);">
        <p style="${BASE.label}color:#ffba1a;">Runway</p>
        <p style="${BASE.goldNum}">19m</p>
        <p style="${BASE.trend}color:#ffba1a;margin:6px 0 0;">acima da meta</p>
      </div>
    </div>
    <div style="${BASE.card}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <p style="${BASE.label}margin:0;">Receita × Despesa — últimos 6</p>
        <span style="font-size:11px;color:#3FB950;font-weight:700;">Margem 23,1%</span>
      </div>
      ${bars([48, 55, 62, 58, 68, 75])}
    </div>
  </div>`;
}

// MÓDULO R&S — Pipeline candidatos
function mockRS(): string {
  return `${chrome('Orbit · R&S')}
  <div style="${BASE.body}">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;">
      <div><p style="${BASE.label}">Vagas abertas</p><p style="${BASE.bigNum}">7</p></div>
      <div><p style="${BASE.label}">Candidatos</p><p style="${BASE.goldNum}">214</p></div>
      <div><p style="${BASE.label}">Tempo médio</p><p style="${BASE.bigNum}">22d</p></div>
    </div>
    <p style="${BASE.label}margin-bottom:8px;">Vaga: Analista Sênior CRM · 56 candidatos</p>
    ${[
      { n: 'Ana Beatriz Costa', s: 94, m: 'Top match · forte em pipeline', c: '#3FB950' },
      { n: 'Rafael Tavares', s: 87, m: '5 anos B2B · forte em automação', c: '#3FB950' },
      { n: 'Camila Rocha', s: 76, m: 'Foco em outbound · sem ATS', c: '#ffba1a' },
    ].map((c) => `
      <div style="${BASE.card}margin-bottom:6px;display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#ffba1a,#ff8c00);display:flex;align-items:center;justify-content:center;color:#0A0A0C;font-weight:800;font-size:12px;">${c.n.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
        <div style="flex:1;min-width:0;">
          <p style="margin:0;color:#fff;font-size:12px;font-weight:600;">${c.n}</p>
          <p style="margin:2px 0 0;color:#8B949E;font-size:10px;">${c.m}</p>
        </div>
        <div style="text-align:right;flex-shrink:0;">
          <p style="margin:0;font-size:18px;font-weight:800;color:${c.c};line-height:1;">${c.s}</p>
          <p style="margin:2px 0 0;font-size:9px;color:#8B949E;text-transform:uppercase;letter-spacing:1px;">score IA</p>
        </div>
      </div>
    `).join('')}
  </div>`;
}

// MÓDULO PROJETOS — Gantt
function mockProjetos(): string {
  const tasks = [
    { n: 'Discovery + escopo', s: 0, w: 18, c: '#3FB950', d: 'Concluído' },
    { n: 'Setup técnico', s: 15, w: 22, c: '#3FB950', d: 'Concluído' },
    { n: 'Dev sprint 1-3', s: 30, w: 35, c: '#ffba1a', d: 'Em curso · 68%' },
    { n: 'UAT cliente', s: 55, w: 18, c: '#8B949E', d: 'Próximo' },
    { n: 'Go-live + handover', s: 70, w: 18, c: '#8B949E', d: 'Planejado' },
  ];
  return `${chrome('Orbit · Projetos · Gantt')}
  <div style="${BASE.body}">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;">
      <div>
        <p style="${BASE.label}">Projeto Genesis · Cliente TechParts</p>
        <p style="margin:0;color:#fff;font-weight:700;font-size:14px;">Implementação Orbit</p>
      </div>
      <div style="text-align:right;">
        <p style="${BASE.goldNum}font-size:22px;">52%</p>
        <p style="font-size:10px;color:#8B949E;margin:0;">do escopo</p>
      </div>
    </div>
    <div style="${BASE.card}">
      ${tasks.map((t) => `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style="width:140px;font-size:11px;color:#C9D1D9;">${t.n}</div>
          <div style="flex:1;background:rgba(255,255,255,0.04);height:18px;border-radius:4px;position:relative;">
            <div style="position:absolute;left:${t.s}%;width:${t.w}%;height:100%;background:${t.c};border-radius:4px;${t.c === '#ffba1a' ? 'background:linear-gradient(90deg,#ffba1a,#ff8c00);' : ''}"></div>
          </div>
          <div style="width:80px;font-size:10px;color:#8B949E;text-align:right;">${t.d}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// MÓDULO COMPRAS — RFQ comparison
function mockCompras(): string {
  return `${chrome('Orbit · Compras · RFQ')}
  <div style="${BASE.body}">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;">
      <div>
        <p style="${BASE.label}">RFQ #2467 · TI Notebooks (12un)</p>
        <p style="margin:0;color:#fff;font-weight:700;font-size:14px;">3 propostas recebidas</p>
      </div>
      <span style="${BASE.pill}background:rgba(255,186,26,0.15);color:#ffba1a;">Aguarda decisão</span>
    </div>
    ${[
      { n: 'Dell Brasil', v: 'R$ 142.800', p: 7, e: 5, badge: 'Melhor preço · score IA 89', c: '#3FB950' },
      { n: 'Lenovo Latam', v: 'R$ 156.200', p: 5, e: 5, badge: 'Garantia premium', c: '#ffba1a' },
      { n: 'TechParts Distrib.', v: 'R$ 148.500', p: 12, e: 4, badge: 'Atraso histórico', c: '#F85149' },
    ].map((c, i) => `
      <div style="${BASE.card}margin-bottom:8px;border-left:3px solid ${c.c};">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
          <p style="margin:0;color:#fff;font-weight:700;font-size:13px;">${i + 1}. ${c.n}</p>
          <span style="font-size:16px;font-weight:800;color:${c.c};">${c.v}</span>
        </div>
        <div style="display:flex;gap:14px;font-size:10px;color:#8B949E;">
          <span><strong style="color:#fff;">Prazo:</strong> ${c.p} dias</span>
          <span><strong style="color:#fff;">Avaliação:</strong> ${c.e}★</span>
        </div>
        <p style="margin:6px 0 0;font-size:11px;color:${c.c};font-weight:600;">${c.badge}</p>
      </div>
    `).join('')}
  </div>`;
}

// Mapeamento slug → função
export function getMockup(slug: string): string {
  const map: Record<string, () => string> = {
    estrategico: mockEstrategico,
    processos: mockProcessos,
    pessoas: mockPessoas,
    indicadores: mockIndicadores,
    riscos: mockRiscos,
    treinamento: mockTreinamento,
    oportunidades: mockOportunidades,
    documentos: mockDocumentos,
    comercial: mockComercial,
    'problemas-operacionais': mockProblemas,
    reunioes: mockReunioes,
    pesquisas: mockPesquisas,
    financeiro: mockFinanceiro,
    'recrutamento-selecao': mockRS,
    projetos: mockProjetos,
    compras: mockCompras,
  };
  const fn = map[slug];
  return fn ? fn() : mockEstrategico();
}
