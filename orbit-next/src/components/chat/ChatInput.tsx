'use client';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { validateEmail } from '@/lib/email-validation';

interface ChatInputProps {
  label: string;
  placeholder: string;
  onSubmit: (value: string) => void;
  type?: string;
}

export default function ChatInput({ label, placeholder, onSubmit, type = 'text' }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (type === 'email') {
      const result = validateEmail(trimmed);
      if (!result.valid) {
        setError(result.error || 'E-mail inválido');
        setSuggestion(result.suggestion || '');
        return;
      }
    }
    setError('');
    setSuggestion('');
    onSubmit(trimmed);
    setValue('');
  };

  const applySuggestion = () => {
    if (suggestion) {
      setValue(suggestion);
      setError('');
      setSuggestion('');
    }
  };

  return (
    <div className="animate-fade-in-up">
      <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-2 px-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className={`flex-1 min-w-0 flex items-center bg-secondary rounded-full px-4 py-3 border transition-colors ${error ? 'border-destructive' : 'border-border focus-within:border-primary'}`}>
          <input
            type={type}
            value={value}
            onChange={(e) => { setValue(e.target.value); if (error) setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={placeholder}
            className="flex-1 min-w-0 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base"
            autoFocus
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 transition-all disabled:opacity-30 disabled:bg-muted disabled:text-muted-foreground active:scale-95"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
      {error && (
        <div className="mt-2 px-1">
          <p className="text-destructive text-sm">{error}</p>
          {suggestion && (
            <button onClick={applySuggestion} className="text-primary text-sm underline mt-1">
              Usar {suggestion}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
