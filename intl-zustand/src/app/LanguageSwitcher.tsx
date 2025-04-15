// src/app/LanguageSwitcher.tsx
'use client';

import useStore from '../store'; // Importe como default

export default function LanguageSwitcher() {
  const { locale, setLocale } = useStore();

  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={() => setLocale('en')} disabled={locale === 'en'}>
        English
      </button>
      <button onClick={() => setLocale('pt')} disabled={locale === 'pt'}>
        Português
      </button>
      <button onClick={() => setLocale('es')} disabled={locale === 'es'}>
        Español
      </button>
    </div>
  );
}