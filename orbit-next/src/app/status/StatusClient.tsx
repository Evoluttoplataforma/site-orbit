'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ORBIT_INCIDENTS } from './orbit-incidents';

const GOLD = '#ffba1a';
const MUTED = '#8B949E';
const TEXT = '#C9D1D9';
const WHITE = '#fff';
const SUMMARY_URL = 'https://status.supabase.com/api/v2/summary.json';
const INCIDENTS_URL = 'https://status.supabase.com/api/v2/incidents.json';
const DAYS = 30;

const WATCH = [
  { id: 'sa-east-1', label: 'AWS São Paulo (sa-east-1)' },
  { id: 'database', label: 'Banco (Postgres / API)' },
  { id: 'auth', label: 'Autenticação' },
  { id: 'api gateway', label: 'API Gateway' },
  { id: 'storage', label: 'Storage' },
  { id: 'edge functions', label: 'Edge Functions' },
  { id: 'realtime', label: 'Realtime' },
  { id: 'connection pooler', label: 'Connection pooler' },
];

const OTHER_REGION =
  /\b(us-east|us-west|eu-|ap-|ca-central|ohio|frankfurt|tokyo|sydney|london|mumbai|singapore)\b/i;
const SKIP_TITLE =
  /\b(dashboard|management api|analytics|mcp|studio|log ingestion|branch environment)\b/i;

type SpComponent = { id: string; name: string; status: string; group?: boolean };
type SpIncident = {
  id: string;
  name: string;
  status: string;
  impact: string;
  shortlink: string;
  started_at: string;
  resolved_at: string | null;
  components?: { id: string; name: string }[];
};
type SpSummary = {
  status: { indicator: string; description: string };
  components: SpComponent[];
  incidents: SpIncident[];
};

function card(extra?: CSSProperties): CSSProperties {
  return {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: '22px 20px',
    ...extra,
  };
}

function fmt(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function lastDays(): Date[] {
  const out: Date[] = [];
  const now = new Date();
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    out.push(d);
  }
  return out;
}

function statusLabel(s: string): { text: string; color: string } {
  const v = (s || '').toLowerCase();
  if (v === 'operational' || v === 'none') return { text: 'Operacional', color: '#3FB950' };
  if (v === 'degraded_performance' || v === 'minor') return { text: 'Degradação', color: GOLD };
  if (v === 'partial_outage' || v === 'major') return { text: 'Indisponibilidade parcial', color: '#F0883E' };
  if (v === 'major_outage' || v === 'critical') return { text: 'Indisponibilidade', color: '#F85149' };
  if (v === 'identified' || v === 'investigating' || v === 'monitoring')
    return { text: s, color: GOLD };
  if (v === 'resolved') return { text: 'Resolvido', color: '#3FB950' };
  return { text: s || '—', color: MUTED };
}

function overlapsWindow(inc: SpIncident): boolean {
  const start = new Date(inc.started_at).getTime();
  const end = inc.resolved_at ? new Date(inc.resolved_at).getTime() : Date.now();
  const from = Date.now() - DAYS * 86400000;
  return start <= Date.now() && end >= from;
}

function relevantIncident(inc: SpIncident): boolean {
  if (!overlapsWindow(inc)) return false;
  const comps = (inc.components || []).map((c) => c.name).join(' ');
  const blob = `${inc.name} ${comps}`;
  if (OTHER_REGION.test(blob) && !/sa-east|americas|multiple region/i.test(blob)) return false;
  if (SKIP_TITLE.test(blob) && !/auth|jwt|database|api gateway|storage|edge function|realtime|pooler/i.test(blob))
    return false;
  const watches = WATCH.some((w) => blob.toLowerCase().includes(w.id));
  return watches || /jwt|authentication|auth /i.test(blob);
}

function incidentTouchesDay(inc: { startedAt: string; resolvedAt: string | null }, day: Date): boolean {
  const start = new Date(inc.startedAt).getTime();
  const end = inc.resolvedAt ? new Date(inc.resolvedAt).getTime() : Date.now();
  const from = Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate());
  const to = from + 86400000 - 1;
  return start <= to && end >= from;
}

export function StatusClient() {
  const [summary, setSummary] = useState<SpSummary | null>(null);
  const [incidents, setIncidents] = useState<SpIncident[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sRes, iRes] = await Promise.all([fetch(SUMMARY_URL), fetch(INCIDENTS_URL)]);
        if (!sRes.ok || !iRes.ok) throw new Error('Falha ao consultar status.supabase.com');
        const sJson = (await sRes.json()) as SpSummary;
        const iJson = (await iRes.json()) as { incidents: SpIncident[] };
        if (cancelled) return;
        setSummary(sJson);
        setIncidents(iJson.incidents || []);
        setFetchedAt(new Date().toISOString());
      } catch {
        if (!cancelled) setError('Não foi possível ler o status público da infraestrutura neste momento.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const components = useMemo(() => {
    const list = summary?.components || [];
    return WATCH.map((w) => {
      const hit = list.find((c) => !c.group && c.name.toLowerCase() === w.id);
      return { ...w, status: hit?.status || 'unknown' };
    });
  }, [summary]);

  const infraIncidents = useMemo(() => incidents.filter(relevantIncident), [incidents]);
  const days = lastDays();

  const dayState = days.map((d) => {
    const orbit = ORBIT_INCIDENTS.filter((i) =>
      incidentTouchesDay({ startedAt: i.startedAt, resolvedAt: i.resolvedAt }, d),
    );
    const infra = infraIncidents.filter((i) =>
      incidentTouchesDay({ startedAt: i.started_at, resolvedAt: i.resolved_at }, d),
    );
    return { d, orbit, infra };
  });

  const banner = (() => {
    const sa = components.find((c) => c.id === 'sa-east-1');
    const indicator = summary?.status.indicator || 'none';
    if (error) return { color: MUTED, text: error };
    if (!summary) return { color: MUTED, text: 'Consultando status.supabase.com…' };
    if (indicator === 'critical' || indicator === 'major')
      return {
        color: '#F85149',
        text: `Infraestrutura: ${summary.status.description}. Região sa-east-1: ${statusLabel(sa?.status || '').text}.`,
      };
    if (indicator === 'minor' || sa?.status !== 'operational')
      return {
        color: GOLD,
        text: `Infraestrutura: ${summary.status.description}. Região da Orbit (sa-east-1): ${statusLabel(sa?.status || '').text}. Incidente do provedor não confirma, por si só, impacto na sua organização.`,
      };
    return {
      color: '#3FB950',
      text: 'Infraestrutura em São Paulo (sa-east-1): operacional segundo o provedor. Sem intercorrência Orbit publicada.',
    };
  })();

  return (
    <div
      style={{
        background: '#0D1117',
        color: TEXT,
        minHeight: '100vh',
        padding: '60px 20px 80px',
        fontFamily: "'Plus Jakarta Sans', Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <a href="/seguranca-ia#sia-sla" style={{ color: GOLD, textDecoration: 'none', fontSize: 14, display: 'inline-block', marginBottom: 32 }}>
          ← Central de confiança
        </a>
        <p style={{ color: GOLD, fontSize: 12, fontWeight: 800, letterSpacing: 2.2, textTransform: 'uppercase', margin: '0 0 12px' }}>
          Disponibilidade
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: WHITE, margin: '0 0 12px' }}>Status da plataforma</h1>
        <p style={{ color: MUTED, lineHeight: 1.7, marginBottom: 28, maxWidth: 760 }}>
          Compromisso publicado nos Termos de Uso v3.0: <strong style={{ color: WHITE }}>99,0% de disponibilidade mensal</strong> das funcionalidades essenciais.
          Esta página não inventa um percentual medido por sonda da Orbit — esse histórico próprio ainda não existe.
          O que há de fonte pública e auditável é o status da infraestrutura (Supabase / AWS São Paulo), consultado ao vivo.
        </p>

        <div style={{ ...card(), borderColor: `${banner.color}44`, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: banner.color, display: 'inline-block' }} />
            <strong style={{ color: WHITE }}>Agora</strong>
          </div>
          <p style={{ margin: 0, lineHeight: 1.65, color: TEXT }}>{banner.text}</p>
          {fetchedAt && (
            <p style={{ margin: '10px 0 0', color: MUTED, fontSize: 12 }}>
              Atualizado {fmt(fetchedAt)} (Brasília) · fonte{' '}
              <a href="https://status.supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>
                status.supabase.com
              </a>
            </p>
          )}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: WHITE, margin: '8px 0 14px' }}>Componentes da infra (ao vivo)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10, marginBottom: 32 }}>
          {components.map((c) => {
            const st = statusLabel(c.status);
            return (
              <div key={c.id} style={card({ padding: '16px 16px' })}>
                <div style={{ color: MUTED, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{c.label}</div>
                <div style={{ color: st.color, fontWeight: 800, fontSize: 14 }}>{st.text}</div>
              </div>
            );
          })}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: WHITE, margin: '8px 0 8px' }}>Últimos 30 dias</h2>
        <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>
          Cada quadrado é um dia civil (UTC). Cinza: sem incidente publicado. Dourado: incidente de infra no recorte da
          Orbit (região ou serviço de runtime). Vermelho: intercorrência confirmada da aplicação Orbit.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {dayState.map(({ d, orbit, infra }) => {
            const bg = orbit.length ? '#F85149' : infra.length ? GOLD : 'rgba(255,255,255,0.08)';
            const title = [
              d.toISOString().slice(0, 10),
              orbit.length ? `Orbit: ${orbit.map((i) => i.title).join('; ')}` : '',
              infra.length ? `Infra: ${infra.map((i) => i.name).join('; ')}` : 'sem incidente publicado',
            ]
              .filter(Boolean)
              .join(' — ');
            return (
              <span
                key={dayKey(d)}
                title={title}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: bg,
                  display: 'inline-block',
                }}
              />
            );
          })}
        </div>
        <p style={{ color: MUTED, fontSize: 12, margin: '0 0 32px' }}>
          {ORBIT_INCIDENTS.length} intercorrência(s) Orbit · {infraIncidents.length} incidente(s) de infra no recorte · não é uptime percentual.
        </p>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: WHITE, margin: '8px 0 14px' }}>Intercorrências Orbit</h2>
        {ORBIT_INCIDENTS.length === 0 ? (
          <div style={{ ...card(), marginBottom: 32 }}>
            <p style={{ margin: 0, lineHeight: 1.65 }}>
              Nenhuma intercorrência da aplicação Orbit foi publicada neste período. Quando houver, entra aqui com horário
              de início, término e o que foi afetado — não um gráfico verde inventado.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {ORBIT_INCIDENTS.map((i) => (
              <div key={i.id} style={card()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                  <strong style={{ color: WHITE }}>{i.title}</strong>
                  <span style={{ color: statusLabel(i.resolvedAt ? 'resolved' : i.severity).color, fontWeight: 800, fontSize: 12, textTransform: 'uppercase' }}>
                    {i.resolvedAt ? 'Resolvido' : 'Em curso'}
                  </span>
                </div>
                <p style={{ margin: 0, color: MUTED, fontSize: 13 }}>
                  {fmt(i.startedAt)}
                  {i.resolvedAt ? ` → ${fmt(i.resolvedAt)}` : ' → em curso'}
                </p>
                <p style={{ margin: '8px 0 0', lineHeight: 1.6 }}>{i.summary}</p>
              </div>
            ))}
          </div>
        )}

        <h2 style={{ fontSize: 22, fontWeight: 700, color: WHITE, margin: '8px 0 8px' }}>Incidentes da infraestrutura (30 dias)</h2>
        <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>
          Recorte: Auth, banco, API, Storage, Edge Functions, Realtime, pooler e região sa-east-1. Incidentes só de outra
          região ou só do Dashboard do provedor ficam de fora. Texto e horário são do Statuspage da Supabase.
        </p>
        {infraIncidents.length === 0 && !error && summary && (
          <p style={{ color: MUTED }}>Nenhum incidente nesse recorte nos últimos 30 dias, segundo o provedor.</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
          {infraIncidents.map((i) => {
            const st = statusLabel(i.status);
            return (
              <div key={i.id} style={card()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                  <strong style={{ color: WHITE }}>{i.name}</strong>
                  <span style={{ color: st.color, fontWeight: 800, fontSize: 12, textTransform: 'uppercase' }}>{st.text}</span>
                </div>
                <p style={{ margin: 0, color: MUTED, fontSize: 13 }}>
                  {fmt(i.started_at)}
                  {i.resolved_at ? ` → ${fmt(i.resolved_at)}` : ' → em curso'}
                  {' · '}
                  {(i.components || []).map((c) => c.name).join(', ') || 'componente não informado'}
                </p>
                <p style={{ margin: '10px 0 0' }}>
                  <a href={i.shortlink || 'https://status.supabase.com'} target="_blank" rel="noopener noreferrer" style={{ color: GOLD, fontWeight: 700, fontSize: 13 }}>
                    Ver no status da Supabase
                  </a>
                </p>
              </div>
            );
          })}
        </div>

        <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.65 }}>
          SLA, exclusões e responsabilidade:{' '}
          <a href="/seguranca-ia#sia-sla" style={{ color: GOLD }}>
            Central de confiança
          </a>{' '}
          e{' '}
          <a href="/termos-de-servico" style={{ color: GOLD }}>
            Termos de Uso
          </a>
          . Intercorrência da aplicação: contato@orbitgestao.com.br.
        </p>
      </div>
    </div>
  );
}
