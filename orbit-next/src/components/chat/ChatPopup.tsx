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

export default function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const countryRef = useRef<HTMLDivElement>(null);

  // Intercepta clicks em links que apontam para /chat (em qualquer página)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href === '/chat' || href === '/chat/') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ESC fecha o popup
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
    if (!name.trim() || name.trim().split(' ').length < 2) {
      errs.name = 'Digite seu nome completo (nome e sobrenome)';
    }
    const emailResult = validateEmail(email);
    if (!emailResult.valid) errs.email = emailResult.error || 'Email inválido';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 8) errs.phone = 'Telefone incompleto';
    if (!company.trim()) errs.company = 'Informe o nome da empresa';
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

    // Salva lead parcial no Supabase
    let leadId: number | null = null;
    try {
      const { data, error } = await supabaseMkt
        .from('leads')
        .insert({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: country.code === 'BR' ? normalizePhone(fullPhone) : fullPhone,
          company: company.trim(),
          status: 'parcial',
        })
        .select('id')
        .single();
      if (error) console.warn('Insert lead failed:', error);
      else leadId = data.id;
    } catch (err) {
      console.error('Save lead failed:', err);
    }

    // Salva no sessionStorage para o /chat continuar
    try {
      sessionStorage.setItem('orbit_lp_data', JSON.stringify({
        nome: firstName,
        sobrenome: lastName,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: country.code === 'BR' ? normalizePhone(fullPhone) : fullPhone,
        company: company.trim(),
        leadId,
      }));
    } catch (err) {
      console.error('SessionStorage failed:', err);
    }

    window.location.href = '/chat';
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fade-in overflow-y-auto"
      style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        className="w-full my-auto rounded-3xl border border-border p-6 sm:p-8 relative animate-fade-in-up shadow-2xl"
        style={{
          maxWidth: '28rem',
          background: 'linear-gradient(135deg, #161B22 0%, #0D1117 100%)',
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary/80 hover:bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-1">Preencha para iniciar:</h2>
          <p className="text-sm text-muted-foreground">100% gratuito • Sem compromisso</p>
        </div>

        <div className="space-y-4">
          {/* Nome */}
          <div>
            <div className={`flex items-center gap-3 bg-secondary/60 rounded-2xl px-5 py-4 border transition-colors ${errors.name ? 'border-destructive' : 'border-border focus-within:border-primary'}`}>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: '' }); }}
                placeholder="Nome Completo *"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
              />
              <User className="w-5 h-5 text-muted-foreground/60" />
            </div>
            {errors.name && <p className="text-destructive text-xs mt-1 ml-2">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <div className={`flex items-center gap-3 bg-secondary/60 rounded-2xl px-5 py-4 border transition-colors ${errors.email ? 'border-destructive' : 'border-border focus-within:border-primary'}`}>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }}
                placeholder="Email *"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
              />
              <Mail className="w-5 h-5 text-muted-foreground/60" />
            </div>
            {errors.email && <p className="text-destructive text-xs mt-1 ml-2">{errors.email}</p>}
          </div>

          {/* Telefone com DDI */}
          <div>
            <div className="flex items-center gap-2">
              <div className="relative" ref={countryRef}>
                <button
                  type="button"
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="flex items-center gap-2 bg-secondary/60 rounded-2xl px-4 py-4 border border-border hover:border-primary/40 transition-colors"
                >
                  <span className="text-base">{country.flag}</span>
                  <span className="text-sm text-foreground">+{country.ddi}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
                {countryOpen && (
                  <div className="absolute top-full left-0 mt-1 z-50 bg-popover border border-border rounded-xl shadow-xl max-h-52 overflow-y-auto w-52">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => { setCountry(c); setPhone(''); setCountryOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-accent transition-colors text-sm"
                      >
                        <span className="text-base">{c.flag}</span>
                        <span className="text-foreground flex-1 text-xs">{c.name}</span>
                        <span className="text-muted-foreground text-xs">+{c.ddi}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className={`flex-1 bg-secondary/60 rounded-2xl px-5 py-4 border transition-colors ${errors.phone ? 'border-destructive' : 'border-border focus-within:border-primary'}`}>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => { handlePhoneChange(e.target.value); if (errors.phone) setErrors({ ...errors, phone: '' }); }}
                  placeholder={country.code === 'BR' ? '(11) 99999-9999' : 'Número'}
                  className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
                />
              </div>
            </div>
            {errors.phone && <p className="text-destructive text-xs mt-1 ml-2">{errors.phone}</p>}
          </div>

          {/* Empresa */}
          <div>
            <div className={`flex items-center gap-3 bg-secondary/60 rounded-2xl px-5 py-4 border transition-colors ${errors.company ? 'border-destructive' : 'border-border focus-within:border-primary'}`}>
              <input
                type="text"
                value={company}
                onChange={(e) => { setCompany(e.target.value); if (errors.company) setErrors({ ...errors, company: '' }); }}
                placeholder="Nome da Empresa *"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
              />
              <Building2 className="w-5 h-5 text-muted-foreground/60" />
            </div>
            {errors.company && <p className="text-destructive text-xs mt-1 ml-2">{errors.company}</p>}
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => { setConsent(e.target.checked); if (errors.consent) setErrors({ ...errors, consent: '' }); }}
              className="mt-1 w-4 h-4 accent-primary"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              Ao preencher este formulário, concordo em compartilhar meus dados com a Orbit para fins de contato e demonstração, conforme a{' '}
              <a href="/politica-privacidade" target="_blank" className="text-primary underline">Política de Privacidade</a>.
            </span>
          </label>
          {errors.consent && <p className="text-destructive text-xs ml-7">{errors.consent}</p>}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full mt-2 flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-bold text-base py-4 rounded-2xl transition-colors"
            style={{ boxShadow: '0 4px 24px rgba(255,186,26,0.25)' }}
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageCircle className="w-5 h-5" />}
            {submitting ? 'Enviando...' : 'INICIAR CONVERSA'}
          </button>
        </div>
      </div>
    </div>
  );
}
