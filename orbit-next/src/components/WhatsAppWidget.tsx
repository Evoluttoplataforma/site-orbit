'use client';
import { useState, useEffect, useRef } from 'react';
import { X, User, Mail, Building2, Send, Loader2 } from 'lucide-react';
import { supabaseMkt } from '@/lib/supabase-mkt';
import { normalizePhone } from '@/lib/phone';
import { validateEmail } from '@/lib/email-validation';

const PHONE = '554898149776';

// Pipedrive labels por página de origem
const PIPE_LABELS: Record<string, number> = {
  '/empresarios': 498, // DIRETO ORBIT B2B
  '/consultores': 497, // CANAL ORBIT
};
function detectLabelFromPath(path: string): number | null {
  for (const key in PIPE_LABELS) {
    if (path === key || path.startsWith(key + '/')) return PIPE_LABELS[key];
  }
  return null;
}

const C = {
  green: '#25D366',
  greenDark: '#128C7E',
  card: '#0d1117',
  cardLight: '#1c2230',
  cardLighter: '#242b3a',
  border: 'rgba(255,255,255,0.1)',
  text: '#ffffff',
  textMuted: '#8b949e',
  primary: '#ffba1a',
  destructive: '#f85149',
};

export default function WhatsAppWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;
    if (path.startsWith('/chat')) return;
    if (path.startsWith('/acesso')) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const formatBR = (digits: string) => {
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    setPhone(formatBR(digits));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Informe seu nome';
    const emailResult = validateEmail(email);
    if (!emailResult.valid) errs.email = emailResult.error || 'Email inválido';
    if (phone.replace(/\D/g, '').length < 10) errs.phone = 'Telefone incompleto';
    if (!company.trim()) errs.company = 'Informe a empresa';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    const parts = name.trim().split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    const normalizedPhone = normalizePhone(phone);

    // Tracking UTMs
    let tracking: Record<string, string> = {};
    let utmData: Record<string, string> = {};
    try {
      const utmRaw = sessionStorage.getItem('__wl_tracking');
      if (utmRaw) {
        utmData = JSON.parse(utmRaw);
        if (utmData.originPage && !utmData.origin_page) utmData.origin_page = utmData.originPage;
        const trackingFields = [
          'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
          'gclid', 'gbraid', 'wbraid', 'gad_campaignid', 'gad_source',
          'fbclid', 'ttclid', 'msclkid', 'li_fat_id', 'sck',
          'landing_page', 'origin_page', 'session_attributes_encoded',
          'apex_session_id',
        ];
        for (const f of trackingFields) if (utmData[f]) tracking[f] = utmData[f];
      }
    } catch {}

    // 1. Salva no Supabase
    let leadId: number | null = null;
    try {
      const { data, error } = await supabaseMkt
        .from('leads')
        .insert({
          nome: firstName,
          sobrenome: lastName,
          whatsapp: normalizedPhone,
          email: email.trim().toLowerCase(),
          empresa: company.trim(),
          status: 'parcial',
          oque_faz: 'Widget WhatsApp',
          ...tracking,
        })
        .select('id')
        .single();
      if (error) console.warn('[WA Widget] Insert lead failed:', error);
      else leadId = data.id;
    } catch (err) {
      console.error('[WA Widget] Save lead failed:', err);
    }

    // 2. Cria deal no Pipedrive com nota indicando origem + label da página
    const labelId = typeof window !== 'undefined' ? detectLabelFromPath(window.location.pathname) : null;
    try {
      await supabaseMkt.functions.invoke('create-pipedrive-lead', {
        body: {
          action: 'create',
          name: name.trim(),
          whatsapp: normalizedPhone,
          email: email.trim().toLowerCase(),
          empresa: company.trim(),
          oqueFaz: 'Widget WhatsApp',
          ...(labelId ? { label: labelId } : {}),
          leadId,
          utmData,
          noteExtra: '🟢 Lead via Widget WhatsApp do site',
        },
      });
    } catch (err) {
      console.warn('[WA Widget] Pipedrive create failed:', err);
    }

    // 3. Monta mensagem do WhatsApp com os dados
    const lines = [
      `Olá! Vim do site da Orbit.`,
      ``,
      `*Nome:* ${name.trim()}`,
      `*Empresa:* ${company.trim()}`,
      `*E-mail:* ${email.trim()}`,
      `*Telefone:* ${normalizedPhone}`,
    ];
    if (message.trim()) {
      lines.push(``, `*Mensagem:*`, message.trim());
    }
    const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;

    // 4. Redireciona pro WhatsApp
    window.location.href = waUrl;
  };

  if (!mounted) return null;

  // Botão flutuante (estado fechado)
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Falar no WhatsApp"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9990,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: C.green,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.3)',
          padding: 0,
          animation: 'wa-pulse 2.4s ease-in-out infinite',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <svg viewBox="0 0 32 32" width="32" height="32" fill="#fff" style={{ display: 'block' }}>
          <path d="M16.003 0C7.17 0 0 7.17 0 16c0 2.823.74 5.476 2.04 7.78L0 32l8.4-2.2A15.94 15.94 0 0 0 16.003 32C24.83 32 32 24.83 32 16S24.83 0 16.003 0zm0 29.2c-2.49 0-4.92-.66-7.05-1.92l-.5-.3-5.01 1.31 1.34-4.88-.33-.51A13.13 13.13 0 0 1 2.8 16C2.8 8.72 8.72 2.8 16 2.8S29.2 8.72 29.2 16 23.28 29.2 16 29.2zm7.27-9.86c-.4-.2-2.36-1.16-2.73-1.3-.37-.13-.63-.2-.9.2-.27.4-1.04 1.3-1.27 1.57-.23.27-.47.3-.86.1-.4-.2-1.69-.62-3.22-1.98-1.19-1.06-2-2.37-2.23-2.77-.23-.4-.02-.61.18-.81.18-.18.4-.47.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.23-2.97-.32-.78-.65-.67-.9-.68l-.77-.01c-.27 0-.7.1-1.07.5-.37.4-1.4 1.37-1.4 3.34 0 1.97 1.43 3.88 1.63 4.15.2.27 2.83 4.32 6.86 6.06.96.41 1.7.66 2.28.85.96.31 1.83.27 2.52.16.77-.12 2.36-.97 2.69-1.9.33-.93.33-1.73.23-1.9-.1-.17-.37-.27-.77-.47z" />
        </svg>
        <style>{`
          @keyframes wa-pulse {
            0%, 100% { box-shadow: 0 6px 24px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.3), 0 0 0 0 rgba(37,211,102,0.5); }
            50% { box-shadow: 0 6px 24px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.3), 0 0 0 14px rgba(37,211,102,0); }
          }
        `}</style>
      </button>
    );
  }

  // Card expandido com form
  const inputBox = (key: string, hasError: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: focused === key ? C.cardLighter : C.cardLight,
    borderRadius: '12px',
    padding: '12px 14px',
    border: `1.5px solid ${hasError ? C.destructive : focused === key ? C.green : C.border}`,
    transition: 'all 0.15s',
  });

  const inputEl: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: C.text,
    fontSize: '14px',
    fontFamily: 'inherit',
    padding: 0,
  };

  return (
    <div
      ref={cardRef}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9990,
        width: 'min(360px, calc(100vw - 32px))',
        maxHeight: 'calc(100vh - 48px)',
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,211,102,0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: 'wa-slide-up 0.25s ease-out',
      }}
    >
      {/* Header verde */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenDark} 100%)`,
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 32 32" width="24" height="24" fill="#fff">
            <path d="M16.003 0C7.17 0 0 7.17 0 16c0 2.823.74 5.476 2.04 7.78L0 32l8.4-2.2A15.94 15.94 0 0 0 16.003 32C24.83 32 32 24.83 32 16S24.83 0 16.003 0zm7.27 19.34c-.4-.2-2.36-1.16-2.73-1.3-.37-.13-.63-.2-.9.2-.27.4-1.04 1.3-1.27 1.57-.23.27-.47.3-.86.1-.4-.2-1.69-.62-3.22-1.98-1.19-1.06-2-2.37-2.23-2.77-.23-.4-.02-.61.18-.81.18-.18.4-.47.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.23-2.97-.32-.78-.65-.67-.9-.68l-.77-.01c-.27 0-.7.1-1.07.5-.37.4-1.4 1.37-1.4 3.34 0 1.97 1.43 3.88 1.63 4.15.2.27 2.83 4.32 6.86 6.06.96.41 1.7.66 2.28.85.96.31 1.83.27 2.52.16.77-.12 2.36-.97 2.69-1.9.33-.93.33-1.73.23-1.9-.1-.17-.37-.27-.77-.47z" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>Fale com a Orbit</div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', marginTop: '2px' }}>Resposta em poucos minutos</div>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
        <p style={{ fontSize: '13px', color: C.textMuted, margin: 0, lineHeight: 1.5 }}>
          Preencha seus dados e a gente já te chama no WhatsApp 👇
        </p>

        <div style={inputBox('name', !!errors.name)}>
          <User size={16} color={C.textMuted} style={{ flexShrink: 0 }} />
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: '' }); }}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            placeholder="Nome completo"
            style={inputEl}
          />
        </div>

        <div style={inputBox('email', !!errors.email)}>
          <Mail size={16} color={C.textMuted} style={{ flexShrink: 0 }} />
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder="Email"
            style={inputEl}
          />
        </div>

        <div style={inputBox('phone', !!errors.phone)}>
          <span style={{ fontSize: '14px', color: C.textMuted, flexShrink: 0 }}>🇧🇷 +55</span>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => { handlePhoneChange(e.target.value); if (errors.phone) setErrors({ ...errors, phone: '' }); }}
            onFocus={() => setFocused('phone')}
            onBlur={() => setFocused(null)}
            placeholder="(11) 99999-9999"
            style={inputEl}
          />
        </div>

        <div style={inputBox('company', !!errors.company)}>
          <Building2 size={16} color={C.textMuted} style={{ flexShrink: 0 }} />
          <input
            type="text"
            value={company}
            onChange={(e) => { setCompany(e.target.value); if (errors.company) setErrors({ ...errors, company: '' }); }}
            onFocus={() => setFocused('company')}
            onBlur={() => setFocused(null)}
            placeholder="Nome da empresa"
            style={inputEl}
          />
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensagem (opcional)"
          rows={3}
          style={{
            background: C.cardLight,
            border: `1.5px solid ${C.border}`,
            borderRadius: '12px',
            padding: '12px 14px',
            color: C.text,
            fontSize: '14px',
            fontFamily: 'inherit',
            outline: 'none',
            resize: 'none',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: C.green,
            color: '#fff',
            fontWeight: 700,
            fontSize: '14px',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.6 : 1,
            boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
            fontFamily: 'inherit',
            marginTop: '4px',
            letterSpacing: '0.3px',
          }}
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {submitting ? 'ENVIANDO...' : 'ABRIR CONVERSA NO WHATSAPP'}
        </button>

        <p style={{ fontSize: '11px', color: C.textMuted, margin: '4px 0 0', textAlign: 'center', lineHeight: 1.5 }}>
          Seus dados são salvos e enviamos junto da mensagem.
        </p>
      </div>

      <style>{`
        @keyframes wa-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
