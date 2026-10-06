const FROM_EMAIL = () =>
  Deno.env.get("ORBIT_FROM_EMAIL") || "noreply@orbitgestao.com.br";
const SITE = "https://orbitgestao.com.br";

export type MailResult = { ok: boolean; messageId: string | null; status: number };

export type ConfirmSession = {
  title: string;
  whenLabel: string;
  joinUrl: string;
};

export async function sendMailerSend(opts: {
  to: string;
  nome: string;
  subject: string;
  html: string;
  emailType: string;
  fromName?: string;
}): Promise<MailResult> {
  const key = Deno.env.get("MAILERSEND_API_KEY") || "";
  if (!key) return { ok: false, messageId: null, status: 0 };

  const resp = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from: { email: FROM_EMAIL(), name: opts.fromName || "Orbit Gestão" },
      to: [{ email: opts.to, name: opts.nome || opts.to }],
      subject: opts.subject,
      html: opts.html,
    }),
  });
  const ok = resp.status === 202;
  const messageId = resp.headers.get("x-message-id");

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (supabaseUrl && serviceKey) {
    await fetch(`${supabaseUrl}/rest/v1/email_logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email_type: opts.emailType,
        recipient_email: opts.to,
        recipient_name: opts.nome || null,
        resend_id: messageId,
        success: ok,
        error_message: ok ? null : `HTTP ${resp.status}`,
      }),
    }).catch(() => {});
  }

  return { ok, messageId, status: resp.status };
}

export function trainingConfirmationHTML(
  nome: string,
  originLabel: string,
  sessions: ConfirmSession[],
): string {
  const first = (nome || "").trim().split(/\s+/)[0] || "Olá";
  const blocks = sessions
    .map((s) => {
      const cta = s.joinUrl
        ? `<div style="text-align:center;margin:20px 0 8px;">
<a href="${s.joinUrl}" style="display:inline-block;background:#2D8CFF;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">ENTRAR NA SALA</a>
</div>
<p style="font-size:12px;line-height:1.5;color:#8B949E;text-align:center;">Este é o seu link de acesso — não compartilhe. Vale para as próximas sessões desta série.</p>`
        : `<p style="font-size:14px;color:#C9D1D9;text-align:center;">O link da sala chega neste e-mail assim que o cadastro confirmar.</p>`;
      return `<div style="margin:0 0 22px;padding:18px 16px;border:1px solid rgba(255,255,255,0.08);border-radius:12px;background:rgba(255,255,255,0.02);">
<p style="color:#ffba1a;font-size:13px;font-weight:700;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.6px;">${s.title}</p>
<p style="color:#C9D1D9;font-size:15px;margin:0 0 8px;">${s.whenLabel}</p>
${cta}
</div>`;
    })
    .join("");

  return `<div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#fff;border-radius:12px;overflow:hidden;">
<div style="background:linear-gradient(135deg,#0D1117 0%,#1a1f2e 100%);padding:40px 32px;text-align:center;">
<img src="${SITE}/images/logo-orbit-white.png" alt="Orbit" style="height:40px;margin-bottom:24px;">
<h1 style="color:#ffba1a;font-size:26px;margin:0 0 8px;font-weight:800;">Inscrição confirmada</h1>
<p style="color:#C9D1D9;font-size:18px;margin:0;font-weight:600;">${originLabel}</p>
</div>
<div style="padding:32px;">
<p style="font-size:16px;line-height:1.7;color:#C9D1D9;">Olá <strong style="color:#fff;">${first}</strong>, sua vaga está reservada. Guarde este e-mail: o botão abaixo é o seu acesso à sala.</p>
${blocks}
<p style="font-size:14px;line-height:1.7;color:#C9D1D9;">Perto da sessão você recebe de novo este link por e-mail e no WhatsApp. Não precisa se inscrever outra vez.</p>
</div>
<div style="padding:20px 32px;border-top:1px solid #21262d;text-align:center;">
<p style="font-size:12px;color:#484F58;margin:0;">Orbit Gestão — Gestão Operada por IA</p>
</div>
</div>`;
}

export function nextOccurrenceWhenLabel(
  weekday: number,
  startTime: string,
  dateBRT: string,
): string {
  const weekdays = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];
  const [hh, mm] = (startTime || "00:00").split(":").map(Number);
  const timeLbl = mm ? `${hh}h${String(mm).padStart(2, "0")}` : `${hh}h`;
  const [, m, d] = (dateBRT || "").split("-");
  const dateLbl = d && m ? `${d}/${m}` : "";
  const day = weekdays[weekday] || "";
  return [day, dateLbl, timeLbl].filter(Boolean).join(" · ");
}

export function eventDateTimeBRT(dateBRT: string, startTime: string): string {
  const time = (startTime || "00:00").slice(0, 5);
  return `${dateBRT}T${time}:00-03:00`;
}
