// Liga Orbit · Canais — camada de dados isolada.
//
// AGORA: tudo mock, para o front funcionar sem back-end.
// DEPOIS (Igor): trocar cada função pela integração real indicada nos TODO.
//   - Leitura pública do ranking: view `liga_ranking_public` no Supabase MKT
//     (projeto yfpdrckyuxltvznqfqgh) — reusar o client `supabaseMkt` de
//     `@/lib/supabase-mkt` (mesmo usado por chat/leads/banners).
//   - Inscrição e "minha posição": Edge Functions que validam o token no Orbit
//     SERVER-SIDE. O placar NUNCA é calculado a partir do input do formulário.
//
// import { supabaseMkt } from '@/lib/supabase-mkt'; // TODO(Igor): habilitar

export type RankingEntry = {
  position: number;
  id: string;
  name: string;
  photoUrl: string | null;
  city: string | null;
  licensesNew: number;
};

// Métrica oficial = licenças novas líquidas (ativações - churn) desde 2026-07-01,
// medidas pelo próprio Orbit (assinaturas pagas). Aqui é só ilustrativo.
const MOCK_RANKING: RankingEntry[] = [
  { position: 1, id: 'canal-01', name: 'Consultoria Vértice', photoUrl: null, city: 'São Paulo · SP', licensesNew: 14 },
  { position: 2, id: 'canal-02', name: 'Nexo Gestão', photoUrl: null, city: 'Belo Horizonte · MG', licensesNew: 11 },
  { position: 3, id: 'canal-03', name: 'Órbita Consultores', photoUrl: null, city: 'Curitiba · PR', licensesNew: 9 },
  { position: 4, id: 'canal-04', name: 'Prisma Partners', photoUrl: null, city: 'Porto Alegre · RS', licensesNew: 7 },
  { position: 5, id: 'canal-05', name: 'Alavanca Digital', photoUrl: null, city: 'Recife · PE', licensesNew: 6 },
];

/**
 * Top N do ranking público, ordenado por licenças novas (desc).
 * MOCK agora — retorna dados de exemplo.
 */
export async function fetchRanking(limit = 5): Promise<RankingEntry[]> {
  // TODO(Igor): substituir pelo real:
  // const { data, error } = await supabaseMkt
  //   .from('liga_ranking_public')
  //   .select('*')
  //   .order('licenses_new', { ascending: false })
  //   .limit(limit);
  // if (error) throw error;
  // return (data ?? []).map((row, i) => ({
  //   position: i + 1,
  //   id: String(row.id),
  //   name: row.name,
  //   photoUrl: row.photo_url ?? null,
  //   city: row.city ?? null,
  //   licensesNew: row.licenses_new,
  // }));
  return MOCK_RANKING.slice(0, limit);
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
