# 🧩 Documentação do Frontend - Next.js 15 (App Router) com Autenticação JWT

---

## 📦 Tecnologias Utilizadas

| Tecnologia     | Função                              |
|----------------|-------------------------------------|
| **Next.js 15** | Frontend React com SSR + App Router |
| **Tailwind CSS** | Estilização rápida e moderna       |
| **Axios**      | Requisições HTTP                    |
| **TypeScript** | Tipagem estática segura             |

---

##
### ⚙️ Setup Inicial

### 1. Criar o projeto

```bash
npx create-next-app@latest frontend \
  --app \
  --ts \
  --tailwind \
  --eslint \
  --src-dir \
  --import-alias "@/*"
```  
# 
### 2. Instalar dependências adicionais
```bash
cd frontend
npm install axios
```
# 📁 Estrutura de Pastas
```bash
frontend/
├── app/
│   ├── login/            # Página de login
│   │   └── page.tsx
│   ├── register/         # Página de cadastro
│   │   └── page.tsx
│   ├── profile/          # Página protegida (usuário logado)
│   │   └── page.tsx
│   └── layout.tsx
├── components/           # Componentes reutilizáveis (ex: Input)
├── lib/
│   ├── api.ts            # Axios configurado
│   └── auth.ts           # Funções de login, cadastro e perfil
├── types/
│   └── user.ts           # Interface do usuário
└── tailwind.config.ts
```
#
### 🔐 Fluxo de Autenticação

### 📌 Registro de usuário  
- Página: `/register`  
- Chama `POST /api/register` do backend  
- Redireciona para `/login`  
### 📌 Login  
- Página: `/login`  
- Chama `POST /api/login` e armazena o token JWT no `localStorage`  
- Redireciona para `/profile`  
### 📌 Acesso ao perfil  
- Página: `/profile`  
- Verifica o token do `localStorage`  
- Se for **inválido ou ausente** → redireciona para `/login`  
- Se for **válido** → mostra dados do usuário  

#
### 📚 Funções principais

