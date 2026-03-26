'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import ptMessages from '../../messages/pt.json';
import enMessages from '../../messages/en.json';

type Locale = 'pt' | 'en';

const allMessages: Record<Locale, typeof ptMessages> = { pt: ptMessages, en: enMessages };

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
}>({ locale: 'pt', setLocale: () => {} });

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('orbit_lang');
    if (saved === 'en') setLocaleState('en');
  }, []);

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem('orbit_lang', next);
    setLocaleState(next);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={allMessages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
