// Liga Orbit · Canais — camada de dados isolada.
//
// Ranking e "minha posição" vêm de RPCs públicas (somente leitura) no Supabase
// MKT (projeto yfpdrckyuxltvznqfqgh), via o client compartilhado `supabaseMkt`
// (mesmo usado por chat/leads/banners) — a anon key já vive nesse client.
// Inscrição por token ainda é mock (Edge Function futura do Igor).

import { supabaseMkt } from '@/lib/supabase-mkt';

export type RankingEntry = {
  position: number;
  id: string;
  name: string;
  photoUrl: string | null;
  city: string | null;
  licensesNew: number;
};

/**
 * Top N do ranking público, ordenado por licenças novas (desc).
 * Fonte: RPC `ranking_canais` (já retorna `canais` ordenado por licencas desc).
 * Em erro, propaga a exceção — quem chama decide manter o último estado.
 */
export async function fetchRanking(limit = 10): Promise<RankingEntry[]> {
  const { data, error } = await supabaseMkt.rpc('ranking_canais', {});
  if (error) throw error;
  const canais = (data?.canais ?? []) as Array<{ nome: string; licencas: number; novo: number; exp: number }>;
  return canais.slice(0, limit).map((c, i) => ({
    position: i + 1,
    id: `${i}-${c.nome}`,
    name: c.nome,
    photoUrl: null,
    city: null,
    licensesNew: c.licencas,
  }));
}

export type MyPosition =
  | { found: true; posicao: number; nome: string; licencas: number; total: number }
  | { found: false; motivo?: string };

/**
 * Posição do canal a partir do e-mail de login do Orbit.
 * Fonte: RPC `minha_posicao_canal` ({ p_email }). Em erro, propaga a exceção.
 */
export async function fetchMyPositionByEmail(email: string): Promise<MyPosition> {
  const { data, error } = await supabaseMkt.rpc('minha_posicao_canal', {
    p_email: email.trim().toLowerCase(),
  });
  if (error) throw error;
  const row = (Array.isArray(data) ? data[0] : data) as
    | { encontrado?: boolean; posicao?: number; nome?: string; licencas?: number; total?: number; motivo?: string }
    | null;
  if (row?.encontrado) {
    return { found: true, posicao: row.posicao ?? 0, nome: row.nome ?? '', licencas: row.licencas ?? 0, total: row.total ?? 0 };
  }
  return { found: false, motivo: row?.motivo };
}

/**
 * Inscreve um canal no programa. O token do Orbit é validado SERVER-SIDE
 * (Edge Function) — o front nunca calcula placar nem confia no que o usuário digita.
 * MOCK agora — retorna { ok: true }.
 */
export async function submitEnrollment(p: {
  name: string;
  email: string;
  phone: string;
  token: string;
}): Promise<{ ok: true }> {
  // TODO(Igor): substituir pelo real:
  // const { data, error } = await supabaseMkt.functions.invoke('liga-enroll', {
  //   body: { name: p.name, email: p.email, phone: p.phone, token: p.token, consent: true },
  // });
  // A Edge Function 'liga-enroll' valida o token no Orbit, grava a inscrição
  // com o consentimento e retorna a posição atual. NUNCA calcular placar aqui.
  // if (error) throw error;
  // return data;
  void p; // evita "unused" enquanto é mock
  return { ok: true };
}

/**
 * Posição atual do canal dono do token. Resolvida SERVER-SIDE.
 * MOCK agora — retorna null (posição ainda não revelada).
 */
export async function fetchMyPosition(token: string): Promise<RankingEntry | null> {
  // TODO(Igor): substituir pelo real (via Edge Function, valida token no Orbit):
  // const { data, error } = await supabaseMkt.functions.invoke('liga-my-position', {
  //   body: { token },
  // });
  // if (error) throw error;
  // return data ?? null;
  void token;
  return null;
}
