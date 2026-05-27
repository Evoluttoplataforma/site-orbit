'use client';

import { useState } from 'react';

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
  total_online: number;
  total_presencial: number;
  total: number;
}

function fmtDate(s: string | null): string {
  if (!s) return '—';
  try {
    return new Date(s).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return s;
  }
}

function toCSV(leads: Lead[], modo: string): string {
  const head = ['Nome', 'Email', 'WhatsApp', 'Consultoria', 'Modalidade', 'Inscrição'];
  const esc = (v: string) => `"${(v || '').replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [l.nome || '', l.email || '', l.telefone || '', l.empresa || '', modo, fmtDate(l.created_at)].map(esc).join(',')
  );
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

  const wrap: React.CSSProperties = { minHeight: '100vh', background: '#0A0E13', color: '#E6E8EB', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", padding: '32px 20px' };

  if (!data) {
    return (
      <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={entrar} style={{ width: '100%', maxWidth: 380, background: '#0F1410', border: '1px solid #4B5320', borderRadius: 14, padding: 32 }}>
          <div style={{ fontSize: 30, textAlign: 'center', marginBottom: 8 }}>🎖️</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, textAlign: 'center', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>Recrutas · Bootcamp</h1>
          <p style={{ color: '#8B7355', fontSize: 13, textAlign: 'center', margin: '0 0 22px' }}>Acesso restrito · inserir senha</p>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            autoFocus
            style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #4B5320', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
          />
          {erro && <p style={{ color: '#C73E1D', fontSize: 13, margin: '12px 0 0' }}>⚠ {erro}</p>}
          <button
            type="submit"
            disabled={loading || !senha}
            style={{ width: '100%', marginTop: 16, padding: '13px', borderRadius: 8, border: 'none', background: '#ffba1a', color: '#0A0E13', fontWeight: 800, fontSize: 15, textTransform: 'uppercase', letterSpacing: 1, cursor: loading ? 'wait' : 'pointer', opacity: loading || !senha ? 0.6 : 1 }}
          >
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <style>{`
        .rec-tablewrap { border: 1px solid #21262d; border-radius: 10px; overflow-x: auto; }
        .rec-table { width: 100%; border-collapse: collapse; min-width: 640px; }
        .rec-table th { text-align: left; padding: 10px 12px; font-size: 11px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #21262d; white-space: nowrap; background: transparent; }
        .rec-table tbody tr { background: transparent !important; }
        .rec-table td { padding: 11px 12px; font-size: 14px; border-bottom: 1px solid #161B22; background: transparent !important; }
        @media (max-width: 720px) {
          .rec-tablewrap { border: none; overflow-x: visible; }
          .rec-table { min-width: 0; display: block; }
          .rec-table thead { display: none; }
          .rec-table tbody { display: block; }
          .rec-table tbody tr { display: block; background: #0F1410 !important; border: 1px solid #21262d; border-radius: 10px; margin-bottom: 10px; }
          .rec-table td { display: flex; justify-content: space-between; align-items: baseline; gap: 14px; border: none; border-bottom: 1px solid #161B22; padding: 9px 14px; font-size: 13.5px; text-align: right; }
          .rec-table tr td:last-child { border-bottom: none; }
          .rec-table td::before { content: attr(data-label); color: #8B7355; font-size: 10.5px; text-transform: uppercase; letter-spacing: 1px; text-align: left; flex: 0 0 auto; }
          .rec-table td[data-label="#"] { display: none; }
          .rec-table td[data-label=""]::before { content: none; }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>🎖️ Recrutas · Bootcamp Orbit</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <Stat label="Total" value={data.total} color="#fff" />
            <Stat label="Online" value={data.total_online} color="#3FB950" />
            <Stat label="Presencial" value={data.total_presencial} color="#ffba1a" />
          </div>
        </div>

        <Tabela
          titulo="📡 Online ao vivo (grátis)"
          cor="#3FB950"
          leads={data.online}
          onCSV={() => download('bootcamp-online.csv', toCSV(data.online, 'Online'))}
        />
        <div style={{ height: 36 }} />
        <Tabela
          titulo="🪖 Presencial · Floripa (R$150)"
          cor="#ffba1a"
          leads={data.presencial}
          onCSV={() => download('bootcamp-presencial.csv', toCSV(data.presencial, 'Presencial'))}
        />
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ background: '#0F1410', border: '1px solid #21262d', borderRadius: 10, padding: '8px 16px', textAlign: 'center', minWidth: 78 }}>
      <div style={{ fontSize: 24, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, color: '#8B7355', textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function Tabela({ titulo, cor, leads, onCSV }: { titulo: string; cor: string; leads: Lead[]; onCSV: () => void }) {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: cor }}>{titulo} <span style={{ color: '#6B7339' }}>· {leads.length}</span></h2>
        <button onClick={onCSV} disabled={!leads.length} style={{ background: 'transparent', border: `1px solid ${cor}`, color: cor, borderRadius: 7, padding: '7px 14px', fontSize: 13, fontWeight: 700, cursor: leads.length ? 'pointer' : 'not-allowed', opacity: leads.length ? 1 : 0.4 }}>
          ⬇ Exportar CSV
        </button>
      </div>
      <div className="rec-tablewrap">
        <table className="rec-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>WhatsApp</th>
              <th>Consultoria</th>
              <th>Inscrição</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr><td data-label="" style={{ color: '#6B7339', textAlign: 'center' }} colSpan={6}>Nenhum inscrito ainda.</td></tr>
            ) : (
              leads.map((l, i) => (
                <tr key={(l.email || '') + i}>
                  <td data-label="#" style={{ color: '#6B7339' }}>{i + 1}</td>
                  <td data-label="Nome" style={{ fontWeight: 600 }}>{l.nome || '—'}</td>
                  <td data-label="Email" style={{ wordBreak: 'break-all' }}>{l.email || '—'}</td>
                  <td data-label="WhatsApp">{l.telefone || '—'}</td>
                  <td data-label="Consultoria">{l.empresa || '—'}</td>
                  <td data-label="Inscrição" style={{ color: '#8B949E' }}>{fmtDate(l.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
