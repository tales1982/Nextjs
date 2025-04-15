// src/app/page.tsx
'use client';

import { useIntl } from 'react-intl';
import useStore from '../store'; // Importe como default
import LanguageSwitcher from './LanguageSwitcher';

export default function Home() {
  const intl = useIntl();
  const { count, increment, decrement } = useStore();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <LanguageSwitcher />
      <h1>{intl.formatMessage({ id: 'greeting' })}</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>
        {intl.formatMessage({ id: 'increment' })}
      </button>
      <button onClick={decrement} style={{ marginLeft: '10px' }}>
        {intl.formatMessage({ id: 'decrement' })}
      </button>
    </div>
  );
}