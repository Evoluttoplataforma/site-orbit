'use client';

import { useMemo, useState } from 'react';

const SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SB_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

interface Lead {
  nome: string | null;
  email: string | null;
  telefone: string | null;
  empresa: string | null;
  source: string | null;
  created_at: string | null;
}
interface Data {
  online: Lead[];
  presencial: Lead[];
  mentoria?: Lead[];
  waitlist?: Lead[];
  total_online: number;
  total_presencial: number;
  total_mentoria?: number;
  total_waitlist?: number;
  payment_tracking?: 'unavailable';
  total: number;
}

// Esconde leads de teste/sintéticos (domínio reservado example.com)
const isTest = (l: Lead) => /@example\.com$/i.test((l.email || '').trim());

function fmtDate(s: string | null): string {
  if (!s) return '—';
  try {
    return new Date(s).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return s;
  }
}
function initials(nome: string | null): string {
  const p = (nome || '').trim().split(/\s+/).filter(Boolean);
  if (!p.length) return '?';
  return (p[0][0] + (p[1]?.[0] || '')).toUpperCase();
}
function toCSV(leads: Lead[], modo: string): string {
  const head = ['Nome', 'Email', 'WhatsApp', 'Consultoria', 'Modalidade', 'Inscrição'];
  const esc = (v: string) => `"${(v || '').replace(/"/g, '""')}"`;
  const rows = leads.map((l) => [l.nome || '', l.email || '', l.telefone || '', l.empresa || '', modo, fmtDate(l.created_at)].map(esc).join(','));
  return [head.join(','), ...rows].join('\n');
}
function download(filename: string, content: string) {
  const blob = new Blob(['﻿' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function PageContent() {
  const [senha, setSenha] = useState('');
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [q, setQ] = useState('');

  async function entrar(e?: React.FormEvent) {
    e?.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const resp = await fetch(`${SB_URL}/functions/v1/bootcamp-recrutas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
        body: JSON.stringify({ senha }),
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || `Erro HTTP ${resp.status}`);
      setData(json as Data);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha ao carregar');
    } finally {
      setLoading(false);
    }
  }

  // dados limpos (sem teste) + filtro de busca
  const view = useMemo(() => {
    if (!data) return null;
    const clean = (arr: Lead[]) => arr.filter((l) => !isTest(l));
    const term = q.trim().toLowerCase();
    const match = (l: Lead) =>
      !term ||
      [l.nome, l.email, l.empresa, l.telefone].some((v) => (v || '').toLowerCase().includes(term));
    const online = clean(data.online);
    const presencial = clean(data.presencial);
    const mentoria = clean(data.mentoria || []);
    const waitlist = clean(data.waitlist || []);
    return {
      online: online.filter(match),
      presencial: presencial.filter(match),
      mentoria: mentoria.filter(match),
      waitlist: waitlist.filter(match),
      total_online: online.length,
      total_presencial: presencial.length,
      total_mentoria: mentoria.length,
      total_waitlist: waitlist.length,
      physicalSeats: presencial.length + mentoria.length,
    };
  }, [data, q]);

  const css = `
    .rec-shell { min-height: 100vh; background: radial-gradient(1200px 600px at 80% -10%, rgba(255,186,26,0.06), transparent 60%), #080B10; color: #E6E8EB; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    .rec-inner { max-width: 1180px; margin: 0 auto; padding: 28px 22px 60px; }
    .rec-topbar { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between; margin-bottom: 26px; }
    .rec-brand { display: flex; align-items: center; gap: 14px; }
    .rec-brand__badge { width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg,#3D4127,#0A0E13); border: 1px solid #4B5320; display: flex; align-items: center; justify-content: center; font-size: 22px; }
    .rec-brand__t { font-size: 20px; font-weight: 800; margin: 0; letter-spacing: .5px; }
    .rec-brand__s { font-size: 12.5px; color: #7C8794; margin: 2px 0 0; font-family: 'JetBrains Mono', monospace; letter-spacing: .5px; }
    .rec-actions { display: flex; gap: 10px; }
    .rec-ibtn { display: inline-flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.04); border: 1px solid #232D38; color: #C9D1D9; border-radius: 9px; padding: 9px 15px; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: .15s; }
    .rec-ibtn:hover { border-color: #ffba1a; color: #ffba1a; }
    .rec-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 26px; }
    .rec-stat { position: relative; background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0)); border: 1px solid #1B232D; border-radius: 14px; padding: 18px 18px; overflow: hidden; }
    .rec-stat__ico { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 12px; }
    .rec-stat__n { font-size: 30px; font-weight: 800; line-height: 1; }
    .rec-stat__l { font-size: 11px; color: #7C8794; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 7px; }
    .rec-search { position: relative; margin-bottom: 22px; }
    .rec-search input { width: 100%; box-sizing: border-box; padding: 13px 16px 13px 42px; background: rgba(255,255,255,0.04); border: 1px solid #232D38; border-radius: 11px; color: #fff; font-size: 14.5px; outline: none; }
    .rec-search input:focus { border-color: #ffba1a; }
    .rec-search i { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #5C6672; }
    .rec-panel { background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent); border: 1px solid #1B232D; border-radius: 16px; padding: 18px 18px 8px; margin-bottom: 22px; }
    .rec-phead { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 0 4px; }
    .rec-ptitle { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 700; margin: 0; }
    .rec-pill { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
    .rec-csv { display: inline-flex; align-items: center; gap: 6px; background: transparent; border-radius: 8px; padding: 7px 13px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: .15s; }
    .rec-csv:disabled { opacity: .35; cursor: not-allowed; }
    .rec-table { width: 100%; border-collapse: collapse; }
    .rec-table th { text-align: left; padding: 11px 12px; font-size: 10.5px; color: #6E7884; text-transform: uppercase; letter-spacing: 1.2px; border-bottom: 1px solid #1B232D; white-space: nowrap; background: transparent; }
    .rec-table tbody tr { background: transparent !important; transition: background .12s; }
    .rec-table tbody tr:hover { background: rgba(255,255,255,0.025) !important; }
    .rec-table td { padding: 12px; font-size: 14px; border-bottom: 1px solid #131A22; background: transparent !important; vertical-align: middle; }
    .rec-recruta { display: flex; align-items: center; gap: 11px; }
    .rec-av { width: 34px; height: 34px; border-radius: 50%; flex: 0 0 auto; display: flex; align-items: center; justify-content: center; font-size: 12.5px; font-weight: 800; color: #0A0E13; }
    .rec-recruta__nome { font-weight: 600; line-height: 1.2; }
    .rec-recruta__mail { font-size: 12px; color: #7C8794; }
    .rec-wa { color: #C9D1D9; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
    .rec-notice { margin: -8px 0 22px; padding: 13px 16px; border: 1px solid rgba(255,186,26,0.35); background: rgba(255,186,26,0.08); color: #C9D1D9; border-radius: 10px; font-size: 13px; line-height: 1.5; }
    .rec-empty { text-align: center; color: #5C6672; padding: 26px 12px; font-size: 14px; }
    @media (max-width: 760px) {
      .rec-stats { grid-template-columns: repeat(2, 1fr); }
      .rec-table thead { display: none; }
      .rec-table, .rec-table tbody, .rec-table tr, .rec-table td { display: block; }
      .rec-table tbody tr { background: #0F141A !important; border: 1px solid #1B232D; border-radius: 12px; margin-bottom: 10px; padding: 4px 2px; }
      .rec-table td { display: flex; justify-content: space-between; align-items: center; gap: 14px; border-bottom: 1px solid #131A22; text-align: right; padding: 10px 14px; }
      .rec-table tr td:last-child { border-bottom: none; }
      .rec-table td::before { content: attr(data-label); color: #6E7884; font-size: 10.5px; text-transform: uppercase; letter-spacing: 1px; text-align: left; flex: 0 0 auto; }
      .rec-table td[data-label="#"] { display: none; }
      .rec-table td[data-label=""]::before { content: none; }
      .rec-recruta { justify-content: flex-end; }
    }
  `;

  // ─── Gate de senha ───
  if (!view) {
    return (
      <div className="rec-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <style>{css}</style>
        <form onSubmit={entrar} style={{ width: '100%', maxWidth: 380, background: 'linear-gradient(180deg, rgba(255,255,255,0.03), transparent)', border: '1px solid #1B232D', borderRadius: 18, padding: 34 }}>
          <div style={{ width: 54, height: 54, margin: '0 auto 16px', borderRadius: 14, background: 'linear-gradient(135deg,#3D4127,#0A0E13)', border: '1px solid #4B5320', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🎖️</div>
          <h1 style={{ fontSize: 19, fontWeight: 800, textAlign: 'center', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>Painel de Recrutas</h1>
          <p style={{ color: '#7C8794', fontSize: 13, textAlign: 'center', margin: '0 0 22px' }}>Acesso restrito · Bootcamp Canais Orbit</p>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha de acesso" autoFocus
            style={{ width: '100%', padding: '13px 15px', borderRadius: 10, border: '1px solid #232D38', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
          {erro && <p style={{ color: '#F0654A', fontSize: 13, margin: '12px 0 0' }}>⚠ {erro}</p>}
          <button type="submit" disabled={loading || !senha}
            style={{ width: '100%', marginTop: 16, padding: 14, borderRadius: 10, border: 'none', background: '#ffba1a', color: '#0A0E13', fontWeight: 800, fontSize: 15, textTransform: 'uppercase', letterSpacing: 1, cursor: loading ? 'wait' : 'pointer', opacity: loading || !senha ? 0.55 : 1 }}>
            {loading ? 'Verificando…' : 'Acessar painel'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="rec-shell">
      <style>{css}</style>
      <div className="rec-inner">
        <div className="rec-topbar">
          <div className="rec-brand">
            <div className="rec-brand__badge">🎖️</div>
            <div>
              <h1 className="rec-brand__t">Painel de Recrutas</h1>
              <p className="rec-brand__s">BOOTCAMP CANAIS ORBIT · 15 OUT 2026 · 08H30 BRT</p>
            </div>
          </div>
          <div className="rec-actions">
            <button className="rec-ibtn" onClick={() => entrar()} disabled={loading}><i className="fa-solid fa-rotate" />{loading ? 'Atualizando…' : 'Atualizar'}</button>
            <button className="rec-ibtn" onClick={() => { setData(null); setSenha(''); }}><i className="fa-solid fa-arrow-right-from-bracket" />Sair</button>
          </div>
        </div>

        <div className="rec-stats">
          <StatCard ico="📡" bg="rgba(63,185,80,0.14)" fg="#3FB950" n={view.total_online} label="Online (grátis)" />
          <StatCard ico="🪖" bg="rgba(255,186,26,0.14)" fg="#ffba1a" n={view.total_presencial} label="Presencial (inscritos)" />
          <StatCard ico="⭐" bg="rgba(45,140,255,0.14)" fg="#2D8CFF" n={view.total_mentoria} label="Mentoria" />
          <StatCard ico="🎟️" bg="rgba(255,186,26,0.14)" fg="#ffba1a" n={`${view.physicalSeats}/40`} label="Vagas físicas ocupadas" />
          <StatCard ico="⏳" bg="rgba(240,101,74,0.14)" fg="#F0654A" n={view.total_waitlist} label="Lista de espera" />
        </div>

        <div className="rec-notice">
          <strong>Pagamentos não exibidos:</strong> o checkout acontece dentro do Orbit e este repositório ainda não recebe uma confirmação autenticada dessa fonte. Nenhuma inscrição é marcada como paga ou usada para calcular receita neste painel.
        </div>

        <div className="rec-search">
          <i className="fa-solid fa-magnifying-glass" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome, email, WhatsApp ou consultoria…" />
        </div>

        <Painel titulo="Online ao vivo" sub="grátis" ico="📡" cor="#3FB950" leads={view.online} onCSV={() => download('bootcamp-online.csv', toCSV(view.online, 'Online'))} />
        <Painel titulo="Presencial · Floripa" sub="R$250" ico="🪖" cor="#ffba1a" leads={view.presencial} onCSV={() => download('bootcamp-presencial.csv', toCSV(view.presencial, 'Presencial'))} />
        <Painel titulo="Mentoria presencial" sub="R$2.500" ico="⭐" cor="#2D8CFF" leads={view.mentoria} onCSV={() => download('bootcamp-mentoria.csv', toCSV(view.mentoria, 'Mentoria'))} />
        <Painel titulo="Lista de espera presencial" sub="40 vagas preenchidas" ico="⏳" cor="#F0654A" leads={view.waitlist} onCSV={() => download('bootcamp-lista-espera.csv', toCSV(view.waitlist, 'Lista de espera'))} />
      </div>
    </div>
  );
}

function StatCard({ ico, bg, fg, n, label }: { ico: string; bg: string; fg: string; n: number | string; label: string }) {
  return (
    <div className="rec-stat">
      <div className="rec-stat__ico" style={{ background: bg }}>{ico}</div>
      <div className="rec-stat__n" style={{ color: fg }}>{n}</div>
      <div className="rec-stat__l">{label}</div>
    </div>
  );
}

function Painel({ titulo, sub, ico, cor, leads, onCSV }: { titulo: string; sub: string; ico: string; cor: string; leads: Lead[]; onCSV: () => void }) {
  const cols = 5;
  return (
    <div className="rec-panel">
      <div className="rec-phead">
        <h2 className="rec-ptitle"><span>{ico}</span> {titulo} <span style={{ color: '#5C6672', fontWeight: 500, fontSize: 13 }}>· {sub}</span>
          <span className="rec-pill" style={{ background: `${cor}22`, color: cor }}>{leads.length}</span>
        </h2>
        <button className="rec-csv" onClick={onCSV} disabled={!leads.length} style={{ border: `1px solid ${cor}`, color: cor }}>
          <i className="fa-solid fa-download" /> Exportar CSV
        </button>
      </div>
      <table className="rec-table">
        <thead>
          <tr><th>#</th><th>Recruta</th><th>WhatsApp</th><th>Consultoria</th><th>Inscrição</th></tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr><td data-label="" className="rec-empty" colSpan={cols}>Nenhum inscrito ainda.</td></tr>
          ) : (
            leads.map((l, i) => (
              <tr key={(l.email || '') + i}>
                <td data-label="#" style={{ color: '#5C6672' }}>{i + 1}</td>
                <td data-label="Recruta">
                  <div className="rec-recruta">
                    <div className="rec-av" style={{ background: cor }}>{initials(l.nome)}</div>
                    <div>
                      <div className="rec-recruta__nome">{l.nome || '—'}</div>
                      <div className="rec-recruta__mail">{l.email || '—'}</div>
                    </div>
                  </div>
                </td>
                <td data-label="WhatsApp"><span className="rec-wa">{l.telefone || '—'}</span></td>
                <td data-label="Consultoria">{l.empresa || '—'}</td>
                <td data-label="Inscrição" style={{ color: '#8B949E', whiteSpace: 'nowrap' }}>{fmtDate(l.created_at)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
