// Página: Central de confiança + documentos Auto Chat (Meta).
// Tudo com inline styles + classes únicas (prefixo sia-) pra escapar do reset agressivo do orbit.css
//
// Aba 1: due diligence alinhada ao Termos de Uso v3.0 (aceite na Plataforma).
// Abas 2–4: documentos legais do Auto Chat, exigidos na submissão do app na Meta.
//
// Deep link: /seguranca-ia#termos e /seguranca-ia#privacidade abrem a aba direto.
// Isso importa porque um revisor da Meta que receba a URL precisa cair no
// documento, não na aba 1.
//
// Os painéis estão TODOS no HTML estático (só ocultos por style inline), então
// rastreador que não executa JS enxerga o conteúdo inteiro. O <noscript> abaixo
// revela todos, para o caso de JS desligado.
import { termosHTML, privacidadeHTML, exclusaoHTML } from './legal-html';
import { trustHTML } from './trust-html';

// O "· Auto Chat" existe para não confundir com /termos-de-servico e
// /politica-privacidade, que cobrem a plataforma toda. A aba de exclusão não leva o
// sufixo porque não há documento geral concorrente — e com 4 abas, rótulo curto ajuda.
const tabs = [
  { id: 'seguranca', label: 'Central de confiança', icon: 'fa-shield-halved' },
  { id: 'termos', label: 'Termos · Auto Chat', icon: 'fa-file-contract' },
  { id: 'privacidade', label: 'Privacidade · Auto Chat', icon: 'fa-user-shield' },
  { id: 'exclusao', label: 'Exclusão de Dados', icon: 'fa-trash-can' },
];

// Hash de cada aba. 'exclusao-dados' é mais explícito na URL que vai no formulário
// da Meta (campo "Data Deletion Instructions URL").
const HASHES: Record<string, string> = {
  termos: 'termos',
  privacidade: 'privacidade',
  exclusao: 'exclusao-dados',
};

const tabBar = tabs
  .map(
    (t, i) => `<button type="button" class="sia-tab${i === 0 ? ' is-active' : ''}" data-sia-tab="${t.id}"
                        role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" aria-controls="sia-panel-${t.id}">
                    <i class="fas ${t.icon}"></i><span>${t.label}</span>
                </button>`
  )
  .join('\n                ');

export const pageHTML = `
<div class="sia-page" style="background:#0D1117;color:#C9D1D9;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif;">

    <style>
      .sia-tabs-wrap { background:#0D1117; padding:104px 24px 0; }
      .sia-tabs { max-width:1200px; margin:0 auto; display:flex; gap:6px; flex-wrap:wrap; border-bottom:1px solid rgba(255,255,255,0.10); }
      .sia-tab { display:inline-flex; align-items:center; gap:9px; padding:14px 20px; background:none; border:none; border-bottom:2px solid transparent; margin-bottom:-1px; color:#8B949E; font-family:inherit; font-size:14px; font-weight:700; cursor:pointer; border-radius:10px 10px 0 0; transition:color .18s, background .18s, border-color .18s; }
      .sia-tab i { font-size:13px; }
      .sia-tab:hover { color:#C9D1D9; background:rgba(255,255,255,0.03); }
      .sia-tab.is-active { color:#ffba1a; border-bottom-color:#ffba1a; background:rgba(255,186,26,0.06); }
      .sia-tab:focus-visible { outline:2px solid #ffba1a; outline-offset:2px; }
      .sia-doc { padding:56px 24px 100px; }
      .sia-table-wrap { overflow-x:auto; border:1px solid rgba(255,255,255,0.08); border-radius:14px; }
      .sia-table { width:100%; border-collapse:collapse; font-size:0.9rem; line-height:1.5; }
      .sia-table th { text-align:left; color:#8B949E; font-size:11px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); }
      .sia-table td { color:#C9D1D9; padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.06); vertical-align:top; }
      .sia-table tr:last-child td { border-bottom:none; }
      .sia-page table tbody tr:hover,
      .sia-page .sia-table tr:hover,
      .sia-page .sia-kv tr:hover {
        background: rgba(255,255,255,0.045) !important;
      }
      .sia-page .sia-table tr:hover td,
      .sia-page table tbody tr:hover td { color:#C9D1D9 !important; }
      .sia-page .sia-table tr:hover td:first-child { color:#fff !important; }
      .sia-page a.sia-toc-card {
        display:block;
        text-decoration:none;
        background: rgba(255,255,255,0.03) !important;
      }
      .sia-page a.sia-toc-card:hover,
      .sia-page a.sia-toc-card:focus-visible {
        background: rgba(255,255,255,0.055) !important;
        border-color: rgba(255,186,26,0.38) !important;
        color: #fff !important;
      }
      .sia-kv { width:100%; border-collapse:collapse; }
      .sia-kv th { text-align:left; color:#8B949E; font-size:0.8rem; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; padding:10px 0; width:160px; vertical-align:top; }
      .sia-kv td { color:#C9D1D9; padding:10px 0; line-height:1.55; }
      .sia-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; }
      .sia-list li { position:relative; padding-left:28px; color:#C9D1D9; font-size:0.98rem; line-height:1.6; }
      .sia-list li::before { content:''; position:absolute; left:0; top:8px; width:8px; height:8px; border-radius:50%; background:#ffba1a; }
      .sia-ol { margin:0; padding-left:22px; display:flex; flex-direction:column; gap:14px; color:#C9D1D9; font-size:0.98rem; line-height:1.65; }
      .sia-ol li::marker { color:#ffba1a; font-weight:800; }
      @media (max-width:900px) {
        .sia-status { grid-template-columns:repeat(2,minmax(0,1fr)) !important; }
      }
      @media (max-width:640px) {
        .sia-tabs-wrap { padding:96px 14px 0; }
        .sia-tab { padding:12px 13px; font-size:12.5px; gap:7px; flex:1 1 auto; justify-content:center; }
        .sia-tab i { font-size:12px; }
        .sia-doc { padding:36px 18px 72px; }
        .sia-status { grid-template-columns:1fr !important; }
        .sia-kv th { display:block; padding-bottom:0; width:auto; }
        .sia-kv td { display:block; padding-top:4px; }
      }
    </style>
    <noscript><style>[data-sia-panel]{display:block !important}</style></noscript>

    <!-- ═══ ABAS ═══ -->
    <div class="sia-tabs-wrap">
        <div class="sia-tabs" role="tablist" aria-label="Seções e documentos">
                ${tabBar}
        </div>
    </div>

    <!-- ═══ ABA 1 — Central de confiança ═══ -->
    <div data-sia-panel="seguranca" id="sia-panel-seguranca" role="tabpanel" style="display:block;">

${trustHTML}

    <!-- ═══ CTA FINAL ═══ -->
    <section id="sia-cta" style="position:relative;background:#0D1117;padding:120px 24px;border-top:1px solid rgba(255,255,255,0.06);overflow:hidden;">
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(255,186,26,0.12) 0%,transparent 60%);pointer-events:none;"></div>

        <div style="position:relative;max-width:760px;margin:0 auto;text-align:center;">
            <h2 style="font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;color:#fff;line-height:1.2;margin:0 0 18px;">
                Precisa de evidências sob confidencialidade?
            </h2>
            <p style="font-size:1.1rem;color:#C9D1D9;line-height:1.65;margin:0 0 36px;">
                O atestado PTaaS da HOUS3 é público nesta página. Relatório técnico de pentest e evidências de controle vão sob NDA. O DPA é o Anexo IV dos Termos v3.0, já aceito na Plataforma.
            </p>
            <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
                <a href="mailto:contato@orbitgestao.com.br?subject=Due%20diligence%20de%20seguranca%20%E2%80%94%20pacote%20NDA" style="display:inline-flex;align-items:center;gap:10px;background:#ffba1a;color:#0D1117;font-weight:800;font-size:16px;padding:18px 38px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;box-shadow:0 12px 32px rgba(255,186,26,0.35);">
                    SOLICITAR PACOTE SOB NDA <i class="fas fa-envelope"></i>
                </a>
                <a href="https://demonstracao.orbitgestao.com.br/chat" style="display:inline-flex;align-items:center;gap:10px;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,0.2);font-weight:700;font-size:16px;padding:18px 38px;border-radius:50px;text-decoration:none;">
                    FALAR COM O TIME TÉCNICO
                </a>
            </div>
        </div>
    </section>

    </div><!-- /aba 1 -->

    <!-- ═══ ABA 2 — Termos de Serviço · Auto Chat ═══ -->
    <div data-sia-panel="termos" id="sia-panel-termos" role="tabpanel" style="display:none;">
        <div class="sia-doc">
${termosHTML}
        </div>
    </div>

    <!-- ═══ ABA 3 — Política de Privacidade · Auto Chat ═══ -->
    <div data-sia-panel="privacidade" id="sia-panel-privacidade" role="tabpanel" style="display:none;">
        <div class="sia-doc">
${privacidadeHTML}
        </div>
    </div>

    <!-- ═══ ABA 4 — Instruções para Exclusão de Dados ═══ -->
    <div data-sia-panel="exclusao" id="sia-panel-exclusao" role="tabpanel" style="display:none;">
        <div class="sia-doc">
${exclusaoHTML}
        </div>
    </div>

    <script>
    (function () {
        var tabs = document.querySelectorAll('[data-sia-tab]');
        var panels = document.querySelectorAll('[data-sia-panel]');
        if (!tabs.length || !panels.length) return;

        var valid = {};
        panels.forEach(function (pn) { valid[pn.getAttribute('data-sia-panel')] = true; });

        function show(name) {
            if (!valid[name]) return false;
            panels.forEach(function (pn) {
                pn.style.display = pn.getAttribute('data-sia-panel') === name ? 'block' : 'none';
            });
            tabs.forEach(function (tb) {
                var on = tb.getAttribute('data-sia-tab') === name;
                tb.classList.toggle('is-active', on);
                tb.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            return true;
        }

        // hash da URL -> id do painel, e o inverso
        var HASH_OF = ${JSON.stringify(HASHES)};
        var PANEL_OF = {};
        Object.keys(HASH_OF).forEach(function (k) { PANEL_OF[HASH_OF[k]] = k; });

        function goTo(name) {
            if (!show(name)) return;
            try {
                var hash = HASH_OF[name];
                // replaceState em vez de pushState: o botao voltar deve sair da
                // pagina, nao percorrer as abas.
                history.replaceState(null, '', hash ? location.pathname + '#' + hash : location.pathname);
            } catch (err) { /* file:// bloqueia history */ }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        tabs.forEach(function (tb) {
            tb.addEventListener('click', function () { goTo(tb.getAttribute('data-sia-tab')); });
        });

        // Links de um documento para outro (data-sia-goto) trocam de aba em vez de
        // pular para uma ancora que nao existe no painel visivel.
        document.querySelectorAll('[data-sia-goto]').forEach(function (a) {
            a.addEventListener('click', function (ev) {
                ev.preventDefault();
                goTo(a.getAttribute('data-sia-goto'));
            });
        });

        // Deep link. Sem rolar a pagina: o proprio navegador ja tenta posicionar
        // pelo hash, e forcar scroll aqui brigaria com isso.
        var h = (location.hash || '').replace('#', '').toLowerCase();
        if (PANEL_OF[h]) show(PANEL_OF[h]);
        else if (h.indexOf('sia-') === 0) show('seguranca');
    })();
    </script>

</div>
`;
