# Guia Passo a Passo: Configurar Next.js com Zustand e React-Intl
Este guia ensina como configurar um projeto Next.js com TypeScript ,   
Zustand (para gerenciamento de estado) e React-Intl (para internacionalização).   
Ao final, você terá um aplicativo funcional com suporte a múltiplos idiomas e um contador simples.


## Passo 1: Criar o Projeto Next.js
1. Abra seu terminal e execute o comando abaixo para criar um novo projeto Next.js com TypeScript:
```bash
npx create-next-app@latest meu-projeto-intl-zustand --typescript
```
Substitua meu-projeto-intl-zustand pelo nome desejado para o seu projeto.   
Durante a instalação, aceite os padrões ou personalize conforme necessário.   
Entre na pasta do projeto:   
```bash
cd meu-projeto-intl-zustand
```

## Passo 2: Instalar Dependências Necessárias
- Instale as bibliotecas zustand (para gerenciamento de estado) e react-intl (para internacionalização):

```bash
npm install zustand react-intl
```
## Passo 3: Configurar o Zustand
O Zustand será usado para gerenciar o estado global do aplicativo. Vamos criar uma store simples.

1. Crie um arquivo chamado store.ts na pasta src/:
```ts
// src/store.ts
import { create } from 'zustand';

interface AppState {
  locale: 'en' | 'pt' | 'es'; // Idiomas suportados
  setLocale: (locale: 'en' | 'pt' | 'es') => void;
}

const useStore = create<AppState>((set) => ({
  locale: 'pt', // Idioma padrão
  setLocale: (locale) => set({ locale }),
}));

export default useStore; // Exporta como default
```
2. Essa store gerencia o idioma atual da aplicação. Mais tarde, adicionaremos mais estados, como um contador.

## Passo 4: Configurar o React-Intl
O React-Intl será usado para traduzir mensagens de texto e formatar datas/números.

## 4.1. Criar Arquivos de Tradução
1. Crie uma pasta chamada locales/ dentro de src/.
2. Adicione arquivos JSON para cada idioma suportado. Por exemplo:   
src/locales/en.json:
```json
{
  "greeting": "Hello, World!",
  "increment": "Increment",
  "decrement": "Decrement"
}
```
src/locales/pt.json:    
```json
{
  "greeting": "Olá, Mundo!",
  "increment": "Incrementar",
  "decrement": "Decrementar"
}
```
# 4.2. Criar o Wrapper do IntlProvider
No App Router do Next.js, precisamos garantir que o IntlProvider seja executado apenas no lado do cliente.

1. Crie um arquivo chamado IntlWrapper.tsx na pasta src/app/:
```tsx
// src/app/IntlWrapper.tsx
'use client'; // Importante: Isso habilita o uso de hooks e contextos

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
```
2. Esse componente envolve a aplicação com o IntlProvider e fornece as traduções com base no idioma atual.

# 4.3. Atualizar o layout.tsx
No App Router, o arquivo layout.tsx é usado para envolver todas as páginas. Vamos usar o IntlWrapper aqui.

Edite o arquivo src/app/layout.tsx:
```tsx
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
```
# Passo 5: Criar a Página Inicial
Agora, vamos criar uma página inicial com um contador e botões para alternar o idioma.

1. Edite o arquivo src/app/page.tsx:
```tsx
// src/app/page.tsx
'use client'; // Importante: Isso habilita o uso de hooks

import { useIntl } from 'react-intl';
import useStore from '../store';
import LanguageSwitcher from './LanguageSwitcher';

export default function Home() {
  const intl = useIntl();
  const { count, increment, decrement } = useStore();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <LanguageSwitcher /> {/* Seletor de idioma */}
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
```
# 5.1. Criar o Componente LanguageSwitcher
O componente LanguageSwitcher permitirá que os usuários escolham o idioma.

1. Crie um arquivo chamado LanguageSwitcher.tsx na pasta src/app/:
```tsx
// src/app/LanguageSwitcher.tsx
'use client';

import useStore from '../store';

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
```
# Passo 6: Executar o Projeto
1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
2. Abra seu navegador em http://localhost:3000 e teste o aplicativo:
- Alterne entre os idiomas usando o seletor de idioma.
- Verifique se as traduções estão funcionando corretamente.
- Interaja com o contador

# Conclusão
Você agora tem um projeto Next.js funcional com:   

- Zustand : Para gerenciar o estado global (idioma e contador).
- React-Intl : Para internacionalização (traduções e formatação).
- App Router : A nova estrutura do Next.js 13+.

# Dicas Adicionais
1. Adicionar Novos Idiomas :
- Crie novos arquivos JSON na pasta locales/.
- Atualize o objeto messages no IntlWrapper.tsx.
2. Melhorias Futuras :
- Modularize as traduções por domínio (ex.: auth.json, home.json).
- Adicione testes unitários para garantir que todas as chaves de tradução estejam presentes.
