// Origem da inscrição na aba Eventos (funil Treinamento do CRM).
// Tags iguais no CRM e no ManyChat. WhatsApp, por enquanto, só Masterclass:
// a tag confirmacao-masterclass dispara o fluxo; bootcamp e treino não entram.

export const CRM_JOIN_URL_FIELD = "cf_evento_link_individual_do_zoom";
export const CRM_ORIGEM_FIELD = "cf_origem_evento";

// Nomes REAIS da conta ManyChat (page/getCustomFields em 2026-09-03).
// link_individual_zoom / origem-evento / nome-do-evento NÃO existem lá.
export const MANYCHAT_JOIN_URL_FIELD = "link_reuniao";
export const MANYCHAT_ORIGEM_FIELD = "CRM - Origem";
export const MANYCHAT_EVENTO_FIELD = "nome-do-evento";
export const MANYCHAT_DATETIME_FIELD = "data-e-horario-da-live";
export const MANYCHAT_DATA_FIELD = "data-live";
export const MANYCHAT_HORARIO_FIELD = "horario-live";
/** Tag que dispara o fluxo WhatsApp da Masterclass Consultores. Só ela. */
export const MANYCHAT_TAG_CONFIRMACAO_MASTERCLASS = "confirmacao-masterclass";

export type OriginKind =
  | "masterclass-consultores"
  | "bootcamp"
  | "treinamento"
  | "tira-duvidas"
  | "mentoria";

export const ORIGIN_LABEL: Record<OriginKind, string> = {
  "masterclass-consultores": "Masterclass Consultores",
  bootcamp: "Bootcamp",
  treinamento: "Treinamento",
  "tira-duvidas": "Tira Dúvidas",
  mentoria: "Mentoria de canais",
};

export type SessionLike = {
  slug: string;
  title?: string;
  kind?: string;
};

function unique(xs: string[]): string[] {
  return [...new Set(xs.filter(Boolean))];
}

/** source do CRM: começa com "treinamento" para cair no funil Treinamento. */
export function crmSourceFor(origin: OriginKind): string {
  if (origin === "masterclass-consultores") return "treinamento-masterclass";
  if (origin === "bootcamp") return "treinamento-bootcamp";
  if (origin === "tira-duvidas") return "treinamento-tira-duvidas";
  if (origin === "mentoria") return "treinamento-mentoria";
  return "treinamento-semanal";
}

export function originFromSessions(sessions: SessionLike[]): {
  origin: OriginKind;
  originLabel: string;
  tags: string[];
  primaryTitle: string;
} {
  const slugs = sessions.map((s) => s.slug);
  const hasMaster = slugs.some((s) => s.includes("masterclass"));
  const hasTreino = sessions.some(
    (s) => s.kind === "treinamento" || s.slug.includes("treinamento"),
  );
  const hasTira = sessions.some(
    (s) => s.kind === "tira-duvidas" || s.slug.includes("tira-duvidas"),
  );
  const hasMentoria = sessions.some(
    (s) => s.kind === "mentoria" || s.slug.includes("mentoria"),
  );

  let origin: OriginKind = "treinamento";
  if (hasMaster) origin = "masterclass-consultores";
  else if (hasMentoria) origin = "mentoria";
  else if (hasTreino) origin = "treinamento";
  else if (hasTira) origin = "tira-duvidas";

  const tags: string[] = ["clientes", origin];
  if (hasMaster) tags.push("masterclass");
  if (hasTreino) tags.push("treinamento");
  if (hasTira) tags.push("tira-duvidas");
  if (hasMentoria) tags.push("mentoria");
  tags.push(...slugs);

  return {
    origin,
    originLabel: ORIGIN_LABEL[origin],
    tags: unique(tags),
    primaryTitle: sessions[0]?.title || ORIGIN_LABEL[origin],
  };
}

export function bootcampTags(modo: string): string[] {
  return unique(["clientes", "bootcamp", "bootcamp-orbit", modo]);
}

export function linksNote(
  items: Array<{ title: string; url: string }>,
): string {
  const valid = items.filter((i) => i.url);
  if (!valid.length) return "";
  return (
    "Link individual:\n" +
    valid.map((i) => `- ${i.title}: ${i.url}`).join("\n")
  );
}
