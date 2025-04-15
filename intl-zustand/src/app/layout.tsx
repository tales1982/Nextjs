// src/app/layout.tsx
import { ReactNode } from 'react';
import IntlWrapper from './IntlWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body>
        {/* Envolve as páginas com o IntlWrapper */}
        <IntlWrapper>{children}</IntlWrapper>
      </body>
    </html>
  );
}