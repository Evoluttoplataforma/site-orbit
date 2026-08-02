// supabase/functions/_shared/zoom.ts
// Cliente mínimo da API do Zoom via Server-to-Server OAuth.
// Credenciais SO via secrets do Supabase — nunca no frontend.

/** Erro classificado: 'retryable' vale nova tentativa, 'permanent' não. */
export class ZoomError extends Error {
  kind: "retryable" | "permanent";
  status?: number;
  constructor(message: string, kind: "retryable" | "permanent", status?: number) {
    super(message);
    this.name = "ZoomError";
    this.kind = kind;
    this.status = status;
  }
}

// Cache do token só na memória do isolate. NAO persistir em tabela: é credencial
// bearer, e gravar cria superfície de exfiltração sem ganho no volume atual.
// O Zoom aceita múltiplos tokens válidos simultâneos, então isolates concorrentes
// não se invalidam.
let cached: { token: string; expMs: number } | null = null;

export function hasZoomCreds(): boolean {
  return Boolean(
    Deno.env.get("ZOOM_ACCOUNT_ID") &&
      Deno.env.get("ZOOM_CLIENT_ID") &&
      Deno.env.get("ZOOM_CLIENT_SECRET")
  );
}

export async function getZoomToken(): Promise<string> {
  // margem de 5 min para não usar token que expira no meio da chamada
  if (cached && cached.expMs - 300_000 > Date.now()) return cached.token;

  const accountId = Deno.env.get("ZOOM_ACCOUNT_ID") || "";
  const clientId = Deno.env.get("ZOOM_CLIENT_ID") || "";
  const clientSecret = Deno.env.get("ZOOM_CLIENT_SECRET") || "";
  if (!accountId || !clientId || !clientSecret) {
    throw new ZoomError("missing_credentials", "permanent");
  }

  const basic = btoa(`${clientId}:${clientSecret}`);
  let res: Response;
  try {
    res = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(accountId)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        signal: AbortSignal.timeout(8000),
      }
    );
  } catch (e) {
    throw new ZoomError(`oauth_network:${String(e)}`, "retryable");
  }

  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    console.error("[zoom] oauth failed", res.status, detail);
    // 401/400 = credencial errada; não adianta retentar
    const kind = res.status === 401 || res.status === 400 ? "permanent" : "retryable";
    throw new ZoomError(`oauth_${res.status}`, kind, res.status);
  }

  const j = await res.json();
  if (!j?.access_token) throw new ZoomError("oauth_no_token", "retryable");
  cached = { token: j.access_token, expMs: Date.now() + (j.expires_in ?? 3600) * 1000 };
  return cached.token;
}

async function zoomFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getZoomToken();
  try {
    return await fetch(`https://api.zoom.us/v2${path}`, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });
  } catch (e) {
    throw new ZoomError(`network:${String(e)}`, "retryable");
  }
}

function classify(status: number): "retryable" | "permanent" {
  if (status === 429) return "retryable";
  if (status >= 500) return "retryable";
  return "permanent";
}

export interface ZoomRegistrant {
  registrant_id: string;
  id: string;
  join_url: string;
  topic?: string;
  start_time?: string;
}

/**
 * Registra alguém numa reunião.
 *
 * NAO passa occurrence_ids de propósito: com registration_type=1 ("inscrito
 * participa de qualquer ocorrência") o registro já vale para a série inteira.
 * Passar occurrence_ids escoparia o registro a ocorrências específicas, que é o
 * oposto do que queremos.
 */
export async function addMeetingRegistrant(
  meetingId: string,
  p: {
    email: string;
    firstName: string;
    lastName?: string;
    phone?: string | null;
    org?: string | null;
  }
): Promise<ZoomRegistrant> {
  const res = await zoomFetch(`/meetings/${encodeURIComponent(meetingId)}/registrants`, {
    method: "POST",
    body: JSON.stringify({
      email: p.email,
      first_name: p.firstName,
      ...(p.lastName ? { last_name: p.lastName } : {}),
      ...(p.phone ? { phone: p.phone } : {}),
      ...(p.org ? { org: p.org } : {}),
      auto_approve: true,
    }),
  });

  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 300);
    console.error("[zoom] addRegistrant failed", meetingId, res.status, detail);
    throw new ZoomError(`zoom_${res.status}:${detail.slice(0, 120)}`, classify(res.status), res.status);
  }

  const j = await res.json();
  return {
    registrant_id: String(j.registrant_id ?? ""),
    id: String(j.id ?? ""),
    join_url: String(j.join_url ?? ""),
    topic: j.topic,
    start_time: j.start_time,
  };
}

export interface ZoomMeetingSummary {
  id: string;
  join_url: string;
  topic: string;
  occurrences?: { occurrence_id: string; start_time: string; status: string }[];
}

export async function getMeeting(meetingId: string): Promise<ZoomMeetingSummary> {
  const res = await zoomFetch(`/meetings/${encodeURIComponent(meetingId)}`);
  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    throw new ZoomError(`zoom_get_${res.status}:${detail}`, classify(res.status), res.status);
  }
  const j = await res.json();
  return {
    id: String(j.id),
    join_url: String(j.join_url ?? ""),
    topic: String(j.topic ?? ""),
    occurrences: Array.isArray(j.occurrences) ? j.occurrences : undefined,
  };
}

/**
 * Cria reunião recorrente semanal com registro obrigatório.
 *
 * ATENÇÃO ao weekly_days: o Zoom usa 1=Domingo, deslocado +1 do getDay() do JS.
 * Segunda = '2', Quarta = '4', Sexta = '6'. Errar aqui cria no dia errado.
 */
export async function createWeeklyMeeting(p: {
  topic: string;
  agenda?: string;
  weekdayJs: number;
  hour: number;
  minute: number;
  durationMin: number;
  timezone?: string;
  firstStartDate: string; // 'YYYY-MM-DD' local
  endTimes?: number; // máx 50 no Zoom
}): Promise<ZoomMeetingSummary & { recurrence_end?: string }> {
  const tz = p.timezone || "America/Sao_Paulo";
  const pad = (n: number) => String(n).padStart(2, "0");
  const startTime = `${p.firstStartDate}T${pad(p.hour)}:${pad(p.minute)}:00`;

  const res = await zoomFetch(`/users/me/meetings`, {
    method: "POST",
    body: JSON.stringify({
      topic: p.topic,
      agenda: p.agenda ?? "",
      type: 8, // recorrente com hora fixa
      start_time: startTime,
      timezone: tz,
      duration: p.durationMin,
      recurrence: {
        type: 2, // semanal
        repeat_interval: 1,
        weekly_days: String(p.weekdayJs + 1), // Zoom: 1=Domingo
        end_times: Math.min(p.endTimes ?? 50, 50),
      },
      settings: {
        approval_type: 0, // aprovação automática — necessário para o join_url voltar na hora
        registration_type: 1, // inscrito participa de qualquer ocorrência
        registrants_confirmation_email: true,
        registrants_email_notification: true,
        join_before_host: false,
        waiting_room: false,
        host_video: true,
        participant_video: false,
        mute_upon_entry: true,
        audio: "both",
        auto_recording: "none",
      },
    }),
  });

  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 300);
    console.error("[zoom] createMeeting failed", res.status, detail);
    throw new ZoomError(`zoom_create_${res.status}:${detail}`, classify(res.status), res.status);
  }

  const j = await res.json();
  const occ = Array.isArray(j.occurrences) ? j.occurrences : [];
  return {
    id: String(j.id),
    join_url: String(j.join_url ?? ""),
    topic: String(j.topic ?? ""),
    occurrences: occ,
    recurrence_end: occ.length ? occ[occ.length - 1].start_time : undefined,
  };
}
