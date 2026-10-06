// ManyChat: cria o contato de WhatsApp, grava o join_url pessoal e aplica as
// tags. WhatsApp, por enquanto, só a Masterclass Consultores — a tag de
// confirmação é passada pelo caller, não é compartilhada com bootcamp/treino.
import {
  MANYCHAT_DATA_FIELD,
  MANYCHAT_DATETIME_FIELD,
  MANYCHAT_EVENTO_FIELD,
  MANYCHAT_HORARIO_FIELD,
  MANYCHAT_JOIN_URL_FIELD,
  MANYCHAT_ORIGEM_FIELD,
} from "./origin.ts";

const BASE = "https://api.manychat.com/fb";

export type ManyChatSubscribeInput = {
  nome: string;
  email?: string | null;
  telefone?: string | null;
  joinUrl?: string | null;
  origem: string;
  origemLabel: string;
  eventTitle: string;
  /** ISO datetime com offset, ex. 2026-09-10T18:00:00-03:00 */
  eventDateTime?: string | null;
  tags: string[];
  /** Só re-aplica a tag de confirmação quando a inscrição é nova. */
  triggerConfirmation: boolean;
  /** Tag ManyChat que dispara o fluxo. Sem ela, não dispara confirmação. */
  confirmationTag?: string | null;
  consentPhrase: string;
};

export type ManyChatResult = {
  ok: boolean;
  skipped?: boolean;
  subscriberId?: string;
  error?: string;
};

function apiKey(): string {
  return Deno.env.get("MANYCHAT_API_KEY") || Deno.env.get("MANYCHAT_API_TOKEN") || "";
}

function e164(phone?: string | null): string | null {
  if (!phone) return null;
  const d = String(phone).replace(/\D/g, "");
  if (d.length < 10) return null;
  if (d.startsWith("55") && d.length >= 12) return `+${d}`;
  return `+55${d}`;
}

async function mc(
  method: string,
  endpoint: string,
  body?: unknown,
): Promise<{ status: number; data: Record<string, unknown> | null }> {
  const key = apiKey();
  const res = await fetch(`${BASE}/${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  let data: Record<string, unknown> | null = null;
  try {
    data = JSON.parse(text) as Record<string, unknown>;
  } catch {
    data = { raw: text.slice(0, 200) };
  }
  return { status: res.status, data };
}

async function findExistingId(
  nome: string,
  phone: string,
  email?: string | null,
): Promise<string | undefined> {
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneVariants = uniquePhones(phoneDigits);

  for (const variant of phoneVariants) {
    const r = await mc(
      "GET",
      `subscriber/findBySystemField?phone=${encodeURIComponent(variant)}`,
    );
    const id = subscriberIdFrom(r.data);
    if (id) return id;
  }

  if (email) {
    const r = await mc(
      "GET",
      `subscriber/findBySystemField?email=${encodeURIComponent(email)}`,
    );
    const id = subscriberIdFrom(r.data);
    if (id) return id;
  }

  const full = nome.trim();
  const r = await mc("GET", `subscriber/findByName?name=${encodeURIComponent(full)}`);
  const list = Array.isArray(r.data?.data)
    ? (r.data.data as Array<{ id?: string; whatsapp_phone?: string; phone?: string }>)
    : [];
  for (const s of list) {
    const sPhone = String(s.whatsapp_phone || s.phone || "").replace(/\D/g, "");
    if (sPhone && phoneDigits.endsWith(sPhone.slice(-10)) && s.id) return String(s.id);
    if (sPhone && sPhone.endsWith(phoneDigits.slice(-10)) && s.id) return String(s.id);
  }
  return undefined;
}

function uniquePhones(digits: string): string[] {
  const with55 = digits.startsWith("55") ? digits : `55${digits}`;
  const local = with55.replace(/^55/, "");
  return [...new Set([`+${with55}`, with55, `+${local}`, local])];
}

function subscriberIdFrom(data: Record<string, unknown> | null): string | undefined {
  if (!data || data.status !== "success" || !data.data) return undefined;
  const raw = data.data as { id?: string } | Array<{ id?: string }>;
  const id = Array.isArray(raw) ? raw[0]?.id : raw.id;
  return id ? String(id) : undefined;
}

const FIELD_TYPES: Record<string, string> = {
  link_reuniao: "text",
  link_individual_zoom: "text",
  "CRM - Origem": "text",
  "origem-evento": "text",
  "nome-do-evento": "text",
  "data-e-horario-da-live": "datetime",
  "data-live": "text",
  "horario-live": "text",
};

type McTag = { id: number; name: string };
type McField = { id: number; name: string; caption?: string; type?: string };

let tagCatalog: McTag[] | null = null;
let fieldCatalog: McField[] | null = null;
let catalogLogged = false;

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^cf_/, "")
    .replace(/[^a-z0-9]/g, "");
}

function asList<T>(data: Record<string, unknown> | null): T[] {
  const raw = data?.data;
  return Array.isArray(raw) ? (raw as T[]) : [];
}

async function loadTags(): Promise<McTag[]> {
  if (tagCatalog) return tagCatalog;
  const r = await mc("GET", "page/getTags");
  tagCatalog = asList<McTag>(r.data).filter((t) => t?.id && t?.name);
  return tagCatalog;
}

async function loadFields(): Promise<McField[]> {
  if (fieldCatalog) return fieldCatalog;
  const r = await mc("GET", "page/getCustomFields");
  fieldCatalog = asList<McField>(r.data).filter((f) => f?.id && (f.name || f.caption));
  return fieldCatalog;
}

async function logCatalogOnce(): Promise<void> {
  if (catalogLogged) return;
  catalogLogged = true;
  const [tags, fields] = await Promise.all([loadTags(), loadFields()]);
  console.log(
    "[manychat] catalog tags",
    tags.map((t) => t.name).slice(0, 80).join(" | "),
  );
  console.log(
    "[manychat] catalog fields",
    fields
      .map((f) => `${f.caption || ""}=${f.name}`)
      .slice(0, 80)
      .join(" | "),
  );
}

function findTag(wanted: string, tags: McTag[]): McTag | undefined {
  const n = norm(wanted);
  return (
    tags.find((t) => t.name === wanted) ||
    tags.find((t) => t.name.toLowerCase() === wanted.toLowerCase()) ||
    tags.find((t) => norm(t.name) === n)
  );
}

function findField(wanted: string, fields: McField[]): McField | undefined {
  const n = norm(wanted);
  return (
    fields.find((f) => f.name === wanted || f.caption === wanted) ||
    fields.find((f) => f.name?.toLowerCase() === wanted.toLowerCase()) ||
    fields.find((f) => f.caption?.toLowerCase() === wanted.toLowerCase()) ||
    fields.find((f) => norm(f.name) === n || (f.caption && norm(f.caption) === n))
  );
}

async function resolveTagId(tag: string): Promise<number | undefined> {
  const existing = findTag(tag, await loadTags());
  if (existing) return existing.id;
  const created = await mc("POST", "page/createTag", { name: tag });
  tagCatalog = null;
  if (created.data?.status === "success") {
    const data = created.data.data as { id?: number } | undefined;
    if (data?.id) return Number(data.id);
  }
  return findTag(tag, await loadTags())?.id;
}

async function resolveFieldId(field: string): Promise<number | undefined> {
  const existing = findField(field, await loadFields());
  if (existing) return existing.id;
  const created = await mc("POST", "page/createCustomField", {
    caption: field,
    type: FIELD_TYPES[field] || "text",
  });
  fieldCatalog = null;
  if (created.data?.status === "success") {
    const data = created.data.data as { id?: number } | undefined;
    if (data?.id) return Number(data.id);
  }
  return findField(field, await loadFields())?.id;
}

async function addTag(subscriberId: string, tag: string): Promise<void> {
  await logCatalogOnce();
  const tagId = await resolveTagId(tag);
  if (!tagId) {
    console.warn("[manychat] tag not found and create failed", tag);
    return;
  }
  const r = await mc("POST", "subscriber/addTag", {
    subscriber_id: subscriberId,
    tag_id: tagId,
  });
  if (r.data?.status === "success") return;
  console.warn("[manychat] tag failed", tag, tagId, r.status, r.data);
}

async function setField(subscriberId: string, field: string, value: string): Promise<void> {
  if (!value) return;
  await logCatalogOnce();
  const fieldId = await resolveFieldId(field);
  if (!fieldId) {
    console.warn("[manychat] field not found and create failed", field);
    return;
  }
  const r = await mc("POST", "subscriber/setCustomField", {
    subscriber_id: subscriberId,
    field_id: fieldId,
    field_value: value,
  });
  if (r.data?.status === "success") return;
  console.warn("[manychat] cuf failed", field, fieldId, r.status, r.data);
}

function formatDataBR(isoDateTime: string): string | null {
  const m = isoDateTime.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return `${m[3]}/${m[2]}/${m[1]}`;
}

function formatHorarioBR(isoDateTime: string): string | null {
  const m = isoDateTime.match(/T(\d{2}):(\d{2})/);
  if (!m) return null;
  return m[2] === "00" ? `${Number(m[1])}h` : `${Number(m[1])}h${m[2]}`;
}

export async function subscribeManyChat(
  input: ManyChatSubscribeInput,
): Promise<ManyChatResult> {
  if (!apiKey()) return { ok: false, skipped: true, error: "missing_token" };
  const phone = e164(input.telefone);
  if (!phone) return { ok: false, skipped: true, error: "missing_phone" };

  const parts = input.nome.trim().split(/\s+/);
  const payload: Record<string, unknown> = {
    whatsapp_phone: phone,
    consent_phrase: input.consentPhrase,
    has_opt_in_email: true,
    first_name: parts[0] || input.nome,
    last_name: parts.slice(1).join(" ") || undefined,
  };
  if (input.email) payload.email = input.email;

  let subscriberId: string | undefined;
  const created = await mc("POST", "subscriber/createSubscriber", payload);
  if (created.status === 200 && created.data?.status === "success") {
    const data = created.data.data as { id?: string } | undefined;
    subscriberId = data?.id ? String(data.id) : undefined;
  } else {
    const errStr = JSON.stringify(created.data ?? {});
    console.warn("[manychat] createSubscriber", created.status, errStr.slice(0, 400));
    subscriberId = await findExistingId(input.nome, phone, input.email);
  }
  if (!subscriberId) {
    return { ok: false, error: "subscriber_not_found" };
  }

  if (input.joinUrl) {
    await setField(subscriberId, MANYCHAT_JOIN_URL_FIELD, input.joinUrl);
  }
  await setField(subscriberId, MANYCHAT_ORIGEM_FIELD, input.origemLabel || input.origem);
  await setField(subscriberId, MANYCHAT_EVENTO_FIELD, input.eventTitle);
  if (input.eventDateTime) {
    await setField(subscriberId, MANYCHAT_DATETIME_FIELD, input.eventDateTime);
    const dataBR = formatDataBR(input.eventDateTime);
    const horaBR = formatHorarioBR(input.eventDateTime);
    if (dataBR) await setField(subscriberId, MANYCHAT_DATA_FIELD, dataBR);
    if (horaBR) await setField(subscriberId, MANYCHAT_HORARIO_FIELD, horaBR);
  }

  const tags = [...input.tags];
  if (
    input.triggerConfirmation &&
    input.confirmationTag &&
    !tags.includes(input.confirmationTag)
  ) {
    tags.push(input.confirmationTag);
  }
  for (const tag of tags) {
    if (!tag) continue;
    await addTag(subscriberId, tag);
  }

  return { ok: true, subscriberId };
}
