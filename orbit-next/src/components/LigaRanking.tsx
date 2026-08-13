'use client';

import { useEffect, useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { fetchRanking, fetchMyPositionByEmail, type RankingEntry, type MyPosition } from '@/lib/liga';

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

  // Lookup "minha posição" por e-mail
  const [myEmail, setMyEmail] = useState('');
  const [myLoading, setMyLoading] = useState(false);
  const [myResult, setMyResult] = useState<MyPosition | null>(null);
  const [highlightName, setHighlightName] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    // "Quase ao vivo": polling curto (30s) + refetch imediato ao voltar para a
    // aba. Não faz poll enquanto a aba está oculta (economiza chamadas). Em erro
    // de rede: silencioso, mantém o último estado (não zera a lista). Lista vazia
    // só quando a RPC responde com sucesso sem canais → cai no placeholder.
    const load = async () => {
      try {
        const data = await fetchRanking(10);
        if (active) setEntries(data);
      } catch {
        /* silencioso: mantém último estado */
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') load();
    }, 30 * 1000);
    const onVisible = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      active = false;
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const onMyEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMyEmail(e.target.value);
  }, []);

  const onMyPos = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const email = myEmail.trim().toLowerCase();
    if (!email || myLoading) return;
    setMyLoading(true);
    try {
      const res = await fetchMyPositionByEmail(email);
      setMyResult(res);
      setHighlightName(res.found ? res.nome.toLowerCase() : null);
    } catch {
      /* erro de rede: silencioso — mantém o que já está na tela */
    } finally {
      setMyLoading(false);
    }
  }, [myEmail, myLoading]);

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
              <i className="fas fa-spinner fa-spin"></i>{' '}
              <span className="i18n-pt">Carregando o ranking…</span>
              <span className="i18n-en">Loading the ranking…</span>
            </div>
          ) : entries.length === 0 ? (
            <div className="liga-board__state">
              <span className="i18n-pt">O ranking abre em breve. Inscreva-se para ser um dos primeiros.</span>
              <span className="i18n-en">The ranking opens soon. Sign up to be one of the first.</span>
            </div>
          ) : (
            <ul className="liga-board__list">
              {entries.map((entry) => (
                <li
                  className={`liga-row${highlightName && entry.name.toLowerCase() === highlightName ? ' liga-row--highlight' : ''}`}
                  key={entry.id}
                >
                  <RankBadge position={entry.position} />
                  <Avatar entry={entry} />
                  <div className="liga-row__info">
                    <span className="liga-row__name">{entry.name}</span>
                    {entry.city && <span className="liga-row__city">{entry.city}</span>}
                  </div>
                  <div className="liga-row__score">
                    <span className="liga-row__num">{entry.licensesNew}</span>
                    <span className="liga-row__unit">
                      <span className="i18n-pt">licenças novas</span>
                      <span className="i18n-en">new licenses</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Card "Sua posição" — descubra sua posição pelo e-mail de login do Orbit */}
          <div className="liga-row liga-row--you">
            <div className="liga-mypos__head">
              <span className="liga-rank liga-rank--you"><i className="fas fa-user"></i></span>
              <div className="liga-row__info">
                <span className="liga-row__name">
                  <span className="i18n-pt">Sua posição</span>
                  <span className="i18n-en">Your position</span>
                </span>
                {myResult?.found ? (
                  <span className="liga-mypos__result">
                    <span className="i18n-pt">Você está em {myResult.posicao}º lugar · {myResult.licencas} licenças novas</span>
                    <span className="i18n-en">You are in {myResult.posicao}{myResult.posicao === 1 ? 'st' : myResult.posicao === 2 ? 'nd' : myResult.posicao === 3 ? 'rd' : 'th'} place · {myResult.licencas} new licenses</span>
                  </span>
                ) : (
                  <span className="liga-row__city">
                    <span className="i18n-pt">cresça com o Orbit para aparecer</span>
                    <span className="i18n-en">grow with Orbit to show up</span>
                  </span>
                )}
              </div>
            </div>

            {!myResult?.found && (
              <form className="liga-mypos__form" onSubmit={onMyPos}>
                <input
                  className="liga-mypos__input"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="E-mail que você usa para entrar no Orbit"
                  aria-label="E-mail que você usa para entrar no Orbit"
                  data-i18n-placeholder="liga.email"
                  value={myEmail}
                  onChange={onMyEmailChange}
                />
                <button type="submit" className="lp-btn lp-btn--gold liga-mypos__btn" disabled={myLoading}>
                  {myLoading ? (
                    <>
                      <span className="i18n-pt">Verificando…</span>
                      <span className="i18n-en">Checking…</span>
                    </>
                  ) : (
                    <>
                      <span className="i18n-pt">Ver minha posição</span>
                      <span className="i18n-en">See my position</span>
                    </>
                  )}
                </button>
                {myResult && !myResult.found && (
                  <p className="liga-mypos__error">
                    <span className="i18n-pt">Não encontramos esse e-mail no ranking ainda. Use o e-mail de login do seu Orbit — ou compre suas primeiras licenças para aparecer aqui.</span>
                    <span className="i18n-en">We have not found that email in the ranking yet. Use your Orbit login email — or buy your first licenses to show up here.</span>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* ─── Convite para virar canal ─── */}
        <div className="liga-enroll liga-invite" id="liga-inscricao">
          <h3 className="liga-invite__title">
            <span className="i18n-pt">Seu nome podia estar nessa lista.</span>
            <span className="i18n-en">Your name could be on this list.</span>
          </h3>
          <p className="liga-invite__text">
            <span className="i18n-pt">O ranking é de quem cresce levando o Orbit para seus clientes. Entre para o time e dispute o pódio.</span>
            <span className="i18n-en">The ranking is for those who grow by taking Orbit to their clients. Join the team and compete for the podium.</span>
          </p>
          <a
            className="lp-btn lp-btn--gold liga-invite__btn"
            href="https://demonstracao.orbitgestao.com.br/chat?utm_source=site&utm_medium=programa&utm_campaign=ranking_recompensa_q3&origem=ranking_programa"
            onClick={onCtaClick}
          >
            <span className="i18n-pt">Quero o Orbit para meus clientes</span>
            <span className="i18n-en">I want Orbit for my clients</span>
          </a>
        </div>
      </div>
    </section>
  );
}
