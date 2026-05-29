'use client';

import { useEffect, useMemo, useState } from 'react';

const SB_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
const SB_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

interface Comment {
  id: number;
  name: string | null;
  comment: string | null;
  created_at: string | null;
  is_admin_reply: boolean | null;
  parent_id: number | null;
}

function initials(nome: string | null): string {
  const p = (nome || '').trim().split(/\s+/).filter(Boolean);
  if (!p.length) return '?';
  return (p[0][0] + (p[1]?.[0] || '')).toUpperCase();
}

function fmtDate(s: string | null): string {
  if (!s) return '';
  try {
    return new Date(s).toLocaleString('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return s;
  }
}

export default function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [texto, setTexto] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [erro, setErro] = useState('');

  async function load() {
    setLoading(true);
    try {
      const url = `${SB_URL}/rest/v1/blog_comments?article_slug=eq.${encodeURIComponent(slug)}&status=eq.approved&select=id,name,comment,created_at,is_admin_reply,parent_id&order=created_at.asc&limit=500`;
      const resp = await fetch(url, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } });
      if (resp.ok) setComments((await resp.json()) as Comment[]);
    } catch { /* ignora */ } finally { setLoading(false); }
  }
  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [slug]);

  // Agrupa por parent
  const { topLevel, repliesByParent } = useMemo(() => {
    const top: Comment[] = [];
    const reps: Record<number, Comment[]> = {};
    for (const c of comments) {
      if (c.parent_id == null) top.push(c);
      else (reps[c.parent_id] ||= []).push(c);
    }
    // top: mais novos primeiro
    top.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
    // replies: mais antigos primeiro (ordem cronológica da conversa)
    for (const k of Object.keys(reps)) reps[+k].sort((a, b) => (a.created_at || '').localeCompare(b.created_at || ''));
    return { topLevel: top, repliesByParent: reps };
  }, [comments]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setPosting(true);
    try {
      const resp = await fetch(`${SB_URL}/functions/v1/post-blog-comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
        body: JSON.stringify({ article_slug: slug, name: nome, email, comment: texto, website }),
      });
      const json = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(json.error || `Erro HTTP ${resp.status}`);
      setPosted(true);
      setNome(''); setEmail(''); setTexto('');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha ao enviar');
    } finally {
      setPosting(false);
    }
  }

  return (
    <section className="bc-comments" style={{ background: '#0A0E13', padding: '64px 24px 96px', borderTop: '1px solid #1B232D' }}>
      <style>{`
        .bc-comments { color: #C9D1D9; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .bc-comments__inner { max-width: 760px; margin: 0 auto; }
        .bc-comments h2 { font-size: 24px; font-weight: 800; color: #fff; margin: 0 0 28px; display: flex; align-items: center; gap: 12px; }
        .bc-comments h2 .count { color: #8B949E; font-weight: 500; font-size: 18px; }
        .bc-c { display: flex; gap: 14px; margin: 0 0 22px; }
        .bc-c__av { width: 42px; height: 42px; border-radius: 50%; flex: 0 0 auto; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; color: #0D1117; background: #ffba1a; }
        .bc-c__av--reply { background: linear-gradient(135deg,#ffba1a,#ff8c00); border: 2px solid #ffba1a; }
        .bc-c__body { flex: 1; min-width: 0; }
        .bc-c__head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; margin-bottom: 4px; }
        .bc-c__name { color: #fff; font-weight: 700; font-size: 15px; }
        .bc-c__date { color: #6E7884; font-size: 12.5px; }
        .bc-c__badge { background: rgba(255,186,26,0.16); color: #ffba1a; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; }
        .bc-c__text { color: #C9D1D9; font-size: 15px; line-height: 1.65; white-space: pre-wrap; word-wrap: break-word; margin: 0; }
        .bc-replies { margin: 14px 0 0 56px; padding-left: 18px; border-left: 2px solid #1B232D; }
        .bc-form { background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent); border: 1px solid #1B232D; border-radius: 14px; padding: 26px; margin-top: 36px; }
        .bc-form h3 { font-size: 18px; font-weight: 700; color: #fff; margin: 0 0 18px; }
        .bc-form .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .bc-form label { display: block; font-size: 12.5px; color: #8B949E; margin: 0 0 6px; font-weight: 600; }
        .bc-form input, .bc-form textarea {
          width: 100%; box-sizing: border-box; padding: 11px 14px; background: rgba(255,255,255,0.04);
          border: 1px solid #232D38; border-radius: 8px; color: #fff; font-size: 14.5px; outline: none;
          font-family: inherit;
        }
        .bc-form textarea { resize: vertical; min-height: 110px; line-height: 1.55; }
        .bc-form input:focus, .bc-form textarea:focus { border-color: #ffba1a; }
        .bc-form .submit-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; }
        .bc-form button { background: #ffba1a; color: #0D1117; font-weight: 800; font-size: 14.5px; letter-spacing: .5px; padding: 12px 28px; border-radius: 8px; border: none; cursor: pointer; }
        .bc-form button:disabled { opacity: 0.55; cursor: wait; }
        .bc-form .note { font-size: 12px; color: #6E7884; }
        .bc-msg { padding: 12px 14px; border-radius: 8px; margin-top: 14px; font-size: 14px; }
        .bc-msg--ok { background: rgba(63,185,80,0.10); border: 1px solid rgba(63,185,80,0.35); color: #3FB950; }
        .bc-msg--err { background: rgba(248,81,73,0.10); border: 1px solid rgba(248,81,73,0.35); color: #F0654A; }
        .bc-honeypot { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
        @media (max-width: 640px) {
          .bc-form .row { grid-template-columns: 1fr; }
          .bc-replies { margin-left: 14px; padding-left: 14px; }
        }
      `}</style>
      <div className="bc-comments__inner">
        <h2>Comentários <span className="count">{!loading && `(${topLevel.length})`}</span></h2>

        {loading ? (
          <p style={{ color: '#6E7884', textAlign: 'center', padding: '32px 0' }}>Carregando…</p>
        ) : topLevel.length === 0 ? (
          <p style={{ color: '#6E7884', padding: '12px 0 8px' }}>Seja o primeiro a comentar.</p>
        ) : (
          topLevel.map((c) => {
            const reps = repliesByParent[c.id] || [];
            return (
              <div key={c.id}>
                <div className="bc-c">
                  <div className="bc-c__av">{initials(c.name)}</div>
                  <div className="bc-c__body">
                    <div className="bc-c__head">
                      <span className="bc-c__name">{c.name || 'Anônimo'}</span>
                      <span className="bc-c__date">· {fmtDate(c.created_at)}</span>
                    </div>
                    <p className="bc-c__text">{c.comment}</p>
                  </div>
                </div>
                {reps.length > 0 && (
                  <div className="bc-replies">
                    {reps.map((r) => (
                      <div key={r.id} className="bc-c">
                        <div className="bc-c__av bc-c__av--reply">OG</div>
                        <div className="bc-c__body">
                          <div className="bc-c__head">
                            <span className="bc-c__name">{r.name || 'Orbit Gestão'}</span>
                            <span className="bc-c__badge">Equipe Orbit</span>
                            <span className="bc-c__date">· {fmtDate(r.created_at)}</span>
                          </div>
                          <p className="bc-c__text">{r.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Formulário */}
        <form className="bc-form" onSubmit={submit}>
          <h3>Deixe seu comentário</h3>
          <div className="row">
            <div>
              <label htmlFor="bc-nome">Nome</label>
              <input id="bc-nome" type="text" required maxLength={100} value={nome} onChange={(e) => setNome(e.target.value)} disabled={posting || posted} />
            </div>
            <div>
              <label htmlFor="bc-email">Email <span style={{ color: '#6E7884', fontWeight: 400 }}>(não é publicado)</span></label>
              <input id="bc-email" type="email" required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} disabled={posting || posted} />
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <label htmlFor="bc-texto">Comentário</label>
            <textarea id="bc-texto" required maxLength={5000} value={texto} onChange={(e) => setTexto(e.target.value)} disabled={posting || posted} />
          </div>
          {/* Honeypot — invisível pro humano */}
          <div className="bc-honeypot" aria-hidden="true">
            <label htmlFor="bc-website">Website</label>
            <input id="bc-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div className="submit-row">
            <span className="note">Comentário entra em moderação antes de aparecer.</span>
            <button type="submit" disabled={posting || posted || !nome || !email || !texto}>
              {posting ? 'Enviando…' : posted ? 'Enviado ✓' : 'Publicar comentário'}
            </button>
          </div>
          {posted && <div className="bc-msg bc-msg--ok">✅ Seu comentário foi enviado pra moderação. Assim que aprovarmos, ele aparece aqui.</div>}
          {erro && <div className="bc-msg bc-msg--err">⚠ {erro}</div>}
        </form>
      </div>
    </section>
  );
}
