// src/app/IntlWrapper.tsx
'use client';

import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import useStore from '../store';
import enMessages from '../locales/en.json';
import ptMessages from '../locales/pt.json';
import esMessages from '../locales/es.json';

const messages = {
  en: enMessages,
  pt: ptMessages,
  es: esMessages,
};

export default function IntlWrapper({ children }: { children: ReactNode }) {
  const { locale } = useStore(); // Obtenha o idioma atual da store

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}