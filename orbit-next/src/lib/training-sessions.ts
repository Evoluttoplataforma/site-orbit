/**
 * Fonte única da grade de /treinamentos.
 *
 * Antes esta grade estava duplicada em três lugares: o array SESSIONS de
 * treinamentos/content.tsx, o TRAININGS_LOOKUP de obrigado/content.tsx, e
 * strings cravadas no html.ts. Adicionar uma sessão exigia editar os três.
 *
 * A grade também existe na tabela `training_sessions` do Supabase, porque o cron
 * de lembretes precisa de weekday/start_time em SQL e o `zoom_meeting_id` tem de
 * ser editável sem redeploy. Essa duplicação é inevitável (o site é static export,
 * não dá para o browser consultar a tabela na renderização) — mas a edge function
 * `register-training` valida os slugs recebidos contra a tabela, então um
 * desalinhamento falha alto em vez de passar silencioso.
 *
 * AO MUDAR A GRADE: edite aqui E rode o UPDATE/INSERT correspondente em
 * training_sessions. Os slugs têm de bater exatamente.
 */

export type TrainingKind = 'tira-duvidas' | 'treinamento';

export interface TrainingSession {
  slug: string;
  title: string;
  kind: TrainingKind;
  /** Padrão JS getDay(): 0=Dom .. 6=Sáb. O weekly_days do Zoom usa 1=Dom (+1). */
  weekday: number;
  hour: number;
  minute: number;
  durationMin: number;
  icon: string;
  description: string;
}

/** Faixas da agenda que NÃO têm inscrição aqui — levam para a página própria. */
export interface TrainingLiveCard {
  key: string;
  title: string;
  weekday: number;
  hour: number;
  minute: number;
  icon: string;
  description: string;
  href: string;
  note?: string;
  /**
   * 'semanal' = acontece toda semana no mesmo dia.
   * 'pontual' = datas específicas do mês, sem cadência fixa.
   * Importa porque a Live Orbit (terça) NÃO é semanal — anunciar como se fosse
   * seria informação errada na página.
   */
  cadence: 'semanal' | 'pontual';
  /** Rótulo de quando acontece. Substitui o chip de dia+hora quando é pontual. */
  whenLabel: string;
}

export const WEEKDAY_FULL: Record<number, string> = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};

export const WEEKDAY_SHORT: Record<number, string> = {
  0: 'Domingo',
  1: 'Segunda',
  2: 'Terça',
  3: 'Quarta',
  4: 'Quinta',
  5: 'Sexta',
  6: 'Sábado',
};

/** BYDAY do iCalendar, por getDay(). */
const ICAL_BYDAY: Record<number, string> = {
  0: 'SU', 1: 'MO', 2: 'TU', 3: 'WE', 4: 'TH', 5: 'FR', 6: 'SA',
};

/**
 * Fim da recorrência semanal, espelhando training_sessions.recurrence_ends_at no
 * Supabase. O Zoom limita reunião recorrente a 50 ocorrências (~11,5 meses), então a
 * série criada em ago/2026 expira em julho de 2027.
 *
 * Serve para fechar a RRULE dos convites de calendário. Sem UNTIL o evento se repete
 * PARA SEMPRE na agenda de quem adicionou, e o Google manda notificação de cada
 * ocorrência — foi o que gerou enxurrada de e-mail depois da migração.
 *
 * As 3 sessões vencem em datas ligeiramente diferentes (12, 14 e 16/07/2027). Uso a mais
 * CEDO para todas: é melhor o convite terminar 4 dias antes do que sobrar evento na
 * agenda apontando para uma sala que já não existe.
 *
 * ⚠️ Ao recriar a recorrência no Zoom, atualizar esta data junto.
 */
export const RECURRENCE_ENDS_AT = new Date('2027-07-12T20:00:00Z');

// Copy das descrições: NÃO prometer que a dúvida será resolvida ao vivo — isso não
// está sob nosso controle. O que a sessão entrega é resposta e direção. Também
// evitar "sem conteúdo preparado", que vendia o Tira Dúvidas como sessão vazia.
// Ao mudar aqui, atualizar também a coluna description de training_sessions.
const DESC_TIRA_DUVIDAS =
  'Perguntas e respostas ao vivo sobre o uso do Orbit. Você traz o que está travando e sai com o próximo passo claro.';
const DESC_TREINAMENTO =
  'Aula preparada: um módulo ou as novidades da plataforma, destrinchados passo a passo.';

export const TRAINING_SESSIONS: TrainingSession[] = [
  {
    slug: 'seg-17-tira-duvidas',
    title: 'Tira Dúvidas',
    kind: 'tira-duvidas',
    weekday: 1,
    hour: 17,
    minute: 0,
    durationMin: 60,
    icon: 'fa-comments',
    description: DESC_TIRA_DUVIDAS,
  },
  {
    slug: 'qua-10-treinamento',
    title: 'Treinamento',
    kind: 'treinamento',
    weekday: 3,
    hour: 10,
    minute: 0,
    durationMin: 60,
    icon: 'fa-graduation-cap',
    description: DESC_TREINAMENTO,
  },
  {
    slug: 'sex-09-tira-duvidas',
    title: 'Tira Dúvidas',
    kind: 'tira-duvidas',
    weekday: 5,
    hour: 9,
    minute: 0,
    durationMin: 60,
    icon: 'fa-comments',
    description: DESC_TIRA_DUVIDAS,
  },
];

export const TRAINING_LIVE_CARDS: TrainingLiveCard[] = [
  {
    key: 'live-negocios',
    title: 'Live de Negócios',
    weekday: 4,
    hour: 18,
    minute: 0,
    icon: 'fa-handshake',
    description: 'Como escalar sua consultoria com o Orbit, com Christian Hart.',
    href: '/live/chris',
    note: 'Somente canais',
    cadence: 'semanal',
    whenLabel: 'Toda quinta · 18h',
  },
  {
    key: 'live-orbit',
    title: 'Live Orbit',
    weekday: 2,
    hour: 13,
    minute: 0,
    icon: 'fa-video',
    description: 'Gestão com time de IA, ao vivo. Acontece em datas pontuais do mês.',
    href: '/live',
    cadence: 'pontual',
    whenLabel: 'Próxima edição em definição',
  },
];

export const TRAINING_BY_SLUG: Record<string, TrainingSession> = Object.fromEntries(
  TRAINING_SESSIONS.map((s) => [s.slug, s])
);

/** Slugs da grade antiga, para links/bookmarks não quebrarem a página de obrigado. */
export const LEGACY_SLUG_MAP: Record<string, string> = {
  'clientes-seg-14': 'seg-17-tira-duvidas',
  'clientes-qua-10': 'qua-10-treinamento',
  'consultorias-qua-13': 'qua-10-treinamento',
  'consultorias-sex-10': 'sex-09-tira-duvidas',
};

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** '17h' ou '17h30' */
export function timeLabel(s: TrainingSession | TrainingLiveCard): string {
  return s.minute ? `${pad2(s.hour)}h${pad2(s.minute)}` : `${s.hour}h`;
}

/** 'Segunda · 17h' */
export function slotLabel(s: TrainingSession | TrainingLiveCard): string {
  return `${WEEKDAY_SHORT[s.weekday]} · ${timeLabel(s)}`;
}

export function icalByDay(weekday: number): string {
  return ICAL_BYDAY[weekday];
}

export function isValidSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(TRAINING_BY_SLUG, slug);
}

/**
 * Resolve a lista de slugs do query string `?t=a,b,c`, aceitando slugs legados
 * e descartando desconhecidos. Sem duplicatas.
 */
export function parseSlugs(csv: string | null): TrainingSession[] {
  if (!csv) return [];
  const seen = new Set<string>();
  const out: TrainingSession[] = [];
  for (const raw of csv.split(',')) {
    const key = raw.trim();
    if (!key) continue;
    const slug = isValidSlug(key) ? key : LEGACY_SLUG_MAP[key];
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push(TRAINING_BY_SLUG[slug]);
  }
  return out;
}

/**
 * Próxima ocorrência da sessão, em horário local do browser.
 *
 * Diferente do getNextOccurrences antigo, que cortava em 18h fixo independente do
 * horário da sessão — numa quarta às 15h ele ainda oferecia "hoje" para a sessão
 * das 10h, que já havia passado. Aqui o corte é o próprio horário de início.
 */
export function nextOccurrence(s: TrainingSession, from: Date = new Date()): Date {
  const d = new Date(from);
  let diff = (s.weekday - d.getDay() + 7) % 7;
  if (diff === 0) {
    const startedMin = s.hour * 60 + s.minute;
    const nowMin = d.getHours() * 60 + d.getMinutes();
    if (nowMin >= startedMin) diff = 7;
  }
  d.setDate(d.getDate() + diff);
  d.setHours(s.hour, s.minute, 0, 0);
  return d;
}

/** 'YYYY-MM-DD' a partir dos componentes locais (não usa toISOString, que aplica UTC). */
export function toDateISO(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** '4 de agosto' */
export function longDateLabel(d: Date): string {
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  return `${d.getDate()} de ${months[d.getMonth()]}`;
}
