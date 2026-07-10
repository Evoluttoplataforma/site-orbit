'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchRanking, type RankingEntry } from '@/lib/liga';

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

  useEffect(() => {
    let active = true;
    fetchRanking(5)
      .then((data) => { if (active) setEntries(data); })
      .catch(() => { if (active) setEntries([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const scrollToEnroll = useCallback(() => {
    document.getElementById('liga-inscricao')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const onCtaClick = useCallback(() => {
    // click_ranking_cta: EXCLUSIVO do GA4. Sem preventDefault — a navegacao segue
    // normal e o forwarder global (layout.tsx) reescreve o href antes do unload.
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...a: unknown[]) => void }).gtag('event', 'click_ranking_cta', { program: 'recompensa_q3', location: 'programa' });
    }
  }, []);

  return (
    <section className="lp-section lp-section--dark liga-ranking">
      <div className="lp-container liga-ranking__wrap">
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

          {/* Linha "Sua posição" — clicável, rola até a inscrição */}
          <div
            className="liga-row liga-row--you"
            role="button"
            tabIndex={0}
            onClick={scrollToEnroll}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToEnroll(); } }}
          >
            <span className="liga-rank liga-rank--you"><i className="fas fa-user"></i></span>
            <div className="liga-row__info">
              <span className="liga-row__name">Sua posição</span>
              <span className="liga-row__city">cresça com o Orbit para aparecer</span>
            </div>
            <div className="liga-row__score">
              <span className="liga-row__num">—</span>
            </div>
          </div>
        </div>

        {/* ─── Convite para virar canal ─── */}
        <div className="liga-enroll liga-invite" id="liga-inscricao">
          <h3 className="liga-invite__title">Seu nome podia estar nessa lista.</h3>
          <p className="liga-invite__text">
            O ranking é de quem cresce levando o Orbit para seus clientes. Entre para o time e dispute o pódio.
          </p>
          <a
            className="lp-btn lp-btn--gold liga-invite__btn"
            href="https://demonstracao.orbitgestao.com.br/chat?utm_source=site&utm_medium=programa&utm_campaign=ranking_recompensa_q3&origem=ranking_programa"
            onClick={onCtaClick}
          >
            Quero o Orbit para meus clientes
          </a>
        </div>
      </div>
    </section>
  );
}
