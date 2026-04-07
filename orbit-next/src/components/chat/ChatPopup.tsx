'use client';
import { useState, useEffect, useRef } from 'react';
import { User, Mail, Building2, X, MessageCircle, ChevronDown, Loader2 } from 'lucide-react';
import { supabaseMkt } from '@/lib/supabase-mkt';
import { normalizePhone } from '@/lib/phone';
import { validateEmail } from '@/lib/email-validation';

const COUNTRIES = [
  { code: 'BR', ddi: '55', flag: '🇧🇷', name: 'Brasil', maxDigits: 11 },
  { code: 'PT', ddi: '351', flag: '🇵🇹', name: 'Portugal', maxDigits: 9 },
  { code: 'US', ddi: '1', flag: '🇺🇸', name: 'EUA', maxDigits: 10 },
  { code: 'AR', ddi: '54', flag: '🇦🇷', name: 'Argentina', maxDigits: 10 },
  { code: 'ES', ddi: '34', flag: '🇪🇸', name: 'Espanha', maxDigits: 9 },
];

// Tokens inline para escapar do reset agressivo do orbit.css
const C = {
  cardBg: '#0d1117',
  inputBg: '#1c2230',
  inputBgFocus: '#242b3a',
  border: 'rgba(255,255,255,0.1)',
  borderFocus: '#ffba1a',
  borderError: '#f85149',
  text: '#ffffff',
  textMuted: '#8b949e',
  textPlaceholder: 'rgba(139,148,158,0.6)',
  primary: '#ffba1a',
  primaryDark: '#0d1117',
  destructive: '#f85149',
};

const inputBox = (focused: boolean, error: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: focused ? C.inputBgFocus : C.inputBg,
  borderRadius: '14px',
  padding: '14px 18px',
  border: `1.5px solid ${error ? C.borderError : focused ? C.borderFocus : C.border}`,
  transition: 'all 0.15s ease',
});

const inputEl: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  background: 'transparent',
  outline: 'none',
  border: 'none',
  color: C.text,
  fontSize: '15px',
  fontFamily: 'inherit',
  padding: 0,
};

type PopupMode = 'chat' | 'checkout';

// Pipedrive labels por página de origem
const PIPE_LABELS: Record<string, { id: number; name: string }> = {
  '/empresarios': { id: 498, name: 'DIRETO ORBIT B2B' },
  '/consultores': { id: 497, name: 'CANAL ORBIT' },
};

function detectLabelFromPath(path: string): number | null {
  for (const key in PIPE_LABELS) {
    if (path === key || path.startsWith(key + '/')) return PIPE_LABELS[key].id;
  }
  return null;
}

export default function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<PopupMode>('chat');
  const [redirectUrl, setRedirectUrl] = useState<string>('/chat');
  const [planLabel, setPlanLabel] = useState<string>('');
  const [originPath, setOriginPath] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href');

      // Captura path atual pra mapear label do Pipedrive
      const currentPath = window.location.pathname;

      // Modo checkout: link tem data-popup-target com URL externa
      const popupTarget = link.getAttribute('data-popup-target');
      if (popupTarget) {
        e.preventDefault();
        setMode('checkout');
        setRedirectUrl(popupTarget);
        setPlanLabel(link.getAttribute('data-popup-plan') || '');
        setOriginPath(currentPath);
        setOpen(true);
        return;
      }

      // Modo chat: link aponta pra /chat
      if (href === '/chat' || href === '/chat/') {
        e.preventDefault();
        setMode('chat');
        setRedirectUrl('/chat');
        setPlanLabel('');
        setOriginPath(currentPath);
        setOpen(true);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open]);

  const formatBR = (digits: string) => {
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (raw: string) => {
    let digits = raw.replace(/\D/g, '');
    if (digits.length > country.maxDigits && digits.startsWith(country.ddi)) {
      digits = digits.slice(country.ddi.length);
    }
    digits = digits.slice(0, country.maxDigits);
    setPhone(country.code === 'BR' ? formatBR(digits) : digits);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().split(' ').length < 2) errs.name = 'Digite seu nome completo';
    const emailResult = validateEmail(email);
    if (!emailResult.valid) errs.email = emailResult.error || 'Email inválido';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 8) errs.phone = 'Telefone incompleto';
    if (!company.trim()) errs.company = 'Informe a empresa';
    if (!consent) errs.consent = 'Aceite os termos para continuar';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    const parts = name.trim().split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    const fullPhone = `+${country.ddi}${phone.replace(/\D/g, '')}`;
    const normalizedPhone = country.code === 'BR' ? normalizePhone(fullPhone) : fullPhone;

    // Lê tracking/UTMs do sessionStorage (populado pelo script global no layout.tsx)
    let tracking: Record<string, string> = {};
    let utmData: Record<string, string> = {};
    try {
      const utmRaw = sessionStorage.getItem('__wl_tracking');
      if (utmRaw) {
        utmData = JSON.parse(utmRaw);
        // Normaliza originPage → origin_page
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
          ...tracking,
        })
        .select('id')
        .single();
      if (error) console.warn('Insert lead failed:', error);
      else leadId = data.id;
    } catch (err) {
      console.error('Save lead failed:', err);
    }

    // Determina label do Pipedrive baseado no path de origem
    const labelId = detectLabelFromPath(originPath);

    // Cria deal no Pipedrive (paralelo, não bloqueia)
    let pipedriveIds: { person_id?: number; org_id?: number; deal_id?: number } = {};
    try {
      const { data: pdResult } = await supabaseMkt.functions.invoke('create-pipedrive-lead', {
        body: {
          action: 'create',
          name: name.trim(),
          whatsapp: normalizedPhone,
          email: email.trim().toLowerCase(),
          empresa: company.trim(),
          // Pré-checkout: marca o plano escolhido na origem do deal
          ...(mode === 'checkout' && planLabel
            ? { oqueFaz: `Pré-checkout - Plano ${planLabel}` }
            : {}),
          ...(labelId ? { label: labelId } : {}),
          leadId,
          utmData,
        },
      });
      if (pdResult?.success) {
        pipedriveIds = {
          person_id: pdResult.person_id,
          org_id: pdResult.org_id,
          deal_id: pdResult.deal_id,
        };
      }
    } catch (err) {
      console.warn('Pipedrive create from popup failed:', err);
    }

    // Modo chat: salva LP data pra continuar na rota /chat
    if (mode === 'chat') {
      try {
        sessionStorage.setItem('orbit_lp_data', JSON.stringify({
          nome: firstName,
          sobrenome: lastName,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: normalizedPhone,
          company: company.trim(),
          leadId,
          pipedriveIds,
        }));
      } catch (err) {
        console.error('SessionStorage failed:', err);
      }
    }

    // Redireciona pro destino certo (chat ou checkout externo)
    if (mode === 'checkout') {
      // Anexa os dados do lead como query params no checkout
      try {
        const url = new URL(redirectUrl);
        url.searchParams.set('name', name.trim());
        url.searchParams.set('nome', name.trim());
        url.searchParams.set('email', email.trim().toLowerCase());
        url.searchParams.set('phone', normalizedPhone);
        url.searchParams.set('telefone', normalizedPhone);
        url.searchParams.set('company', company.trim());
        url.searchParams.set('empresa', company.trim());
        if (leadId) url.searchParams.set('lead_id', String(leadId));
        window.location.href = url.toString();
      } catch {
        window.location.href = redirectUrl;
      }
    } else {
      window.location.href = redirectUrl;
    }
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        overflowY: 'auto',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          margin: 'auto',
          background: C.cardBg,
          border: `1px solid ${C.border}`,
          borderRadius: '24px',
          padding: '36px 32px 32px',
          position: 'relative',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,186,26,0.08)',
          fontFamily: 'inherit',
        }}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: C.textMuted,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = C.text; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = C.textMuted; }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: C.primary, margin: '0 0 6px', lineHeight: 1.2 }}>
            {mode === 'checkout'
              ? planLabel
                ? `Plano ${planLabel} — confirme seus dados`
                : 'Confirme seus dados'
              : 'Preencha para iniciar:'}
          </h2>
          <p style={{ fontSize: '13px', color: C.textMuted, margin: 0 }}>
            {mode === 'checkout'
              ? 'Você será redirecionado para o checkout em seguida'
              : '100% gratuito • Sem compromisso'}
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Nome */}
          <div>
            <div style={inputBox(focusedField === 'name', !!errors.name)}>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: '' }); }}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Nome Completo *"
                style={{ ...inputEl, '::placeholder': { color: C.textPlaceholder } } as React.CSSProperties}
              />
              <User size={18} color={C.textMuted} style={{ flexShrink: 0 }} />
            </div>
            {errors.name && <p style={{ color: C.destructive, fontSize: '12px', margin: '6px 0 0 8px' }}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <div style={inputBox(focusedField === 'email', !!errors.email)}>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="Email *"
                style={inputEl}
              />
              <Mail size={18} color={C.textMuted} style={{ flexShrink: 0 }} />
            </div>
            {errors.email && <p style={{ color: C.destructive, fontSize: '12px', margin: '6px 0 0 8px' }}>{errors.email}</p>}
          </div>

          {/* Telefone */}
          <div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative' }} ref={countryRef}>
                <button
                  type="button"
                  onClick={() => setCountryOpen(!countryOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: C.inputBg,
                    border: `1.5px solid ${C.border}`,
                    borderRadius: '14px',
                    padding: '14px 14px',
                    color: C.text,
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{country.flag}</span>
                  <span>+{country.ddi}</span>
                  <ChevronDown size={12} color={C.textMuted} />
                </button>
                {countryOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      zIndex: 50,
                      background: C.cardBg,
                      border: `1px solid ${C.border}`,
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                      maxHeight: '208px',
                      overflowY: 'auto',
                      width: '208px',
                    }}
                  >
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => { setCountry(c); setPhone(''); setCountryOpen(false); }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 14px',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: C.text,
                          fontSize: '13px',
                          textAlign: 'left',
                          fontFamily: 'inherit',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span>{c.flag}</span>
                        <span style={{ flex: 1 }}>{c.name}</span>
                        <span style={{ color: C.textMuted }}>+{c.ddi}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ ...inputBox(focusedField === 'phone', !!errors.phone), flex: 1 }}>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => { handlePhoneChange(e.target.value); if (errors.phone) setErrors({ ...errors, phone: '' }); }}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={country.code === 'BR' ? '(11) 99999-9999' : 'Número'}
                  style={inputEl}
                />
              </div>
            </div>
            {errors.phone && <p style={{ color: C.destructive, fontSize: '12px', margin: '6px 0 0 8px' }}>{errors.phone}</p>}
          </div>

          {/* Empresa */}
          <div>
            <div style={inputBox(focusedField === 'company', !!errors.company)}>
              <input
                type="text"
                value={company}
                onChange={(e) => { setCompany(e.target.value); if (errors.company) setErrors({ ...errors, company: '' }); }}
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
                placeholder="Nome da Empresa *"
                style={inputEl}
              />
              <Building2 size={18} color={C.textMuted} style={{ flexShrink: 0 }} />
            </div>
            {errors.company && <p style={{ color: C.destructive, fontSize: '12px', margin: '6px 0 0 8px' }}>{errors.company}</p>}
          </div>

          {/* Consent */}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginTop: '8px' }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => { setConsent(e.target.checked); if (errors.consent) setErrors({ ...errors, consent: '' }); }}
              style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: C.primary, flexShrink: 0, cursor: 'pointer' }}
            />
            <span style={{ fontSize: '12px', color: C.textMuted, lineHeight: 1.55 }}>
              Ao preencher este formulário, concordo em compartilhar meus dados com a Orbit para fins de contato e demonstração, conforme a{' '}
              <a href="https://demonstracao.orbitgestao.com.br/privacidade" target="_blank" rel="noopener noreferrer" style={{ color: C.primary, textDecoration: 'underline' }}>Política de Privacidade</a>.
            </span>
          </label>
          {errors.consent && <p style={{ color: C.destructive, fontSize: '12px', marginLeft: '26px' }}>{errors.consent}</p>}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              marginTop: '8px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: C.primary,
              color: C.primaryDark,
              fontWeight: 800,
              fontSize: '15px',
              padding: '16px',
              borderRadius: '14px',
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.6 : 1,
              boxShadow: '0 6px 24px rgba(255,186,26,0.3)',
              fontFamily: 'inherit',
              letterSpacing: '0.5px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <MessageCircle size={18} />}
            {submitting
              ? 'ENVIANDO...'
              : mode === 'checkout'
              ? 'IR PARA O CHECKOUT'
              : 'INICIAR CONVERSA'}
          </button>
        </div>
      </div>
    </div>
  );
}
