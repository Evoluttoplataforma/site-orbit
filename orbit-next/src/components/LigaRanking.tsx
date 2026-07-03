'use client';

import { useEffect, useState, useCallback, type ChangeEvent, type FormEvent } from 'react';
import { fetchRanking, submitEnrollment, type RankingEntry } from '@/lib/liga';

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function RankBadge({ position }: { position: number }) {
  if (position === 1) return <span className="liga-rank liga-rank--gold"><i className="fas fa-trophy"></i></span>;
  if (position === 2) return <span className="liga-rank liga-rank--silver"><i className="fas fa-medal"></i></span>;
  if (position === 3) return <span className="liga-rank liga-rank--bronze"><i className="fas fa-medal"></i></span>;
  return <span className="liga-rank">{position}</span>;
}

function Avatar({ entry }: { entry: RankingEntry }) {
  if (entry.photoUrl) {
    return <img className="liga-avatar" src={entry.photoUrl} alt={entry.name} loading="lazy" />;
  }
  return <span className="liga-avatar liga-avatar--initials">{initials(entry.name)}</span>;
}

export function LigaRanking() {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: '', email: '', phone: '', token: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetchRanking(5)
      .then((data) => { if (active) setEntries(data); })
      .catch(() => { if (active) setEntries([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const onChange = useCallback((field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  }, []);

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await submitEnrollment(form);
      if (res.ok) setSubmitted(true);
      else setError('Não foi possível concluir a inscrição. Tente novamente.');
    } catch {
      setError('Não foi possível concluir a inscrição. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }, [form, submitting]);

  return (
    <section className="lp-section lp-section--light liga-ranking">
      <div className="lp-container liga-ranking__grid">
        {/* ─── Lista do ranking ─── */}
        <div className="liga-board">
          {loading ? (
            <div className="liga-board__state">
              <i className="fas fa-spinner fa-spin"></i> Carregando o ranking…
            </div>
          ) : entries.length === 0 ? (
            <div className="liga-board__state">
              O ranking abre em breve. Inscreva-se para ser um dos primeiros.
            </div>
          ) : (
            <ul className="liga-board__list">
              {entries.map((entry) => (
                <li className="liga-row" key={entry.id}>
                  <RankBadge position={entry.position} />
                  <Avatar entry={entry} />
                  <div className="liga-row__info">
                    <span className="liga-row__name">{entry.name}</span>
                    {entry.city && <span className="liga-row__city">{entry.city}</span>}
                  </div>
                  <div className="liga-row__score">
                    <span className="liga-row__num">{entry.licensesNew}</span>
                    <span className="liga-row__unit">licenças novas</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Linha "Sua posição" */}
          <div className="liga-row liga-row--you">
            <span className="liga-rank liga-rank--you"><i className="fas fa-user"></i></span>
            <div className="liga-row__info">
              <span className="liga-row__name">Sua posição</span>
              <span className="liga-row__city">inscreva-se para revelar</span>
            </div>
            <div className="liga-row__score">
              <span className="liga-row__num">—</span>
            </div>
          </div>
        </div>

        {/* ─── Card de inscrição ─── */}
        <div className="liga-enroll">
          {submitted ? (
            <div className="liga-enroll__success">
              <i className="fas fa-circle-check"></i>
              <h3>Você está no ranking!</h3>
              <p>Recebemos sua inscrição. Em breve seu placar aparece aqui, puxado direto das suas licenças ativas no Orbit.</p>
            </div>
          ) : (
            <form className="liga-enroll__form" onSubmit={onSubmit}>
              <h3 className="liga-enroll__title">Entrar no ranking</h3>
              <p className="liga-enroll__hint">Seu token puxa suas licenças ativas automaticamente.</p>

              <label className="liga-field">
                <span>Nome</span>
                <input type="text" value={form.name} onChange={onChange('name')} required autoComplete="name" />
              </label>
              <label className="liga-field">
                <span>E-mail</span>
                <input type="email" value={form.email} onChange={onChange('email')} required autoComplete="email" />
              </label>
              <label className="liga-field">
                <span>Telefone</span>
                <input type="tel" value={form.phone} onChange={onChange('phone')} required autoComplete="tel" />
              </label>
              <label className="liga-field">
                <span>Token do Orbit</span>
                <input type="text" value={form.token} onChange={onChange('token')} required />
              </label>

              {error && <p className="liga-enroll__error">{error}</p>}

              <button type="submit" className="lp-btn lp-btn--gold liga-enroll__btn" disabled={submitting}>
                {submitting ? 'Enviando…' : 'Entrar no ranking'}
              </button>

              <p className="liga-enroll__consent">
                Ao entrar, você autoriza exibir nome e foto no ranking público.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
