# 📄 **Documentação do Backend - Login/Cadastro com JWT + Prisma + PostgreSQL**

---

## 📦 Tecnologias Utilizadas

| Tecnologia | Função |
|------------|--------|
| **Node.js** | Ambiente de execução JS para o backend |
| **Express** | Framework web para criação da API REST |
| **Prisma ORM** | ORM para acesso ao banco PostgreSQL |
| **PostgreSQL** | Banco de dados relacional |
| **JWT (jsonwebtoken)** | Autenticação baseada em token |
| **bcryptjs** | Criptografia de senhas |
| **dotenv** | Gerenciamento de variáveis de ambiente |
| **TypeScript** | Tipagem estática para maior segurança |

---

## 📁 Estrutura de Pastas

```
backend/
├── prisma/
│   └── schema.prisma          # Definição do banco via Prisma
├── src/
│   ├── controllers/
│   │   └── auth.controller.ts # Lógica de cadastro, login e perfil
│   ├── middlewares/
│   │   └── auth.middleware.ts # Middleware de autenticação JWT
│   ├── prisma/
│   │   └── client.ts          # Cliente Prisma instanciado
│   ├── routes/
│   │   └── auth.routes.ts     # Rotas da API (login, register, profile)
│   └── server.ts              # Inicialização do servidor Express
├── .env                       # Variáveis de ambiente (ex: JWT_SECRET)
├── package.json
└── tsconfig.json
```

---

## ⚙️ Instalação e Setup

### 1. Clone o projeto e acesse a pasta

```bash
git clone <seu-repo>
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo \`.env\`

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/login_jwt_db?schema=public"
JWT_SECRET="chave-super-segura-gerada"
```

---

### 4. Configure o banco de dados com Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

> O banco será criado automaticamente com a tabela \`User\`.

---

### 5. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Se tudo estiver certo, você verá:
```
🚀 Server running on http://localhost:4000
```

---

## 🔐 Endpoints da API

> Todos os endpoints estão disponíveis em: \`http://localhost:4000/api\`

### 📌 POST \`/api/register\`

Cadastra um novo usuário.

#### Request JSON:
```json
{
  "name": "Tales",
  "email": "tales@email.com",
  "password": "123456"
}
```

#### Response:
```json
{
  "message": "User created",
  "user": {
    "id": "uuid",
    "email": "tales@email.com"
  }
}
```

---

### 📌 POST \`/api/login\`

Realiza login e retorna o token JWT.

#### Request JSON:
```json
{
  "email": "tales@email.com",
  "password": "123456"
}
```

#### Response:
```json
{
  "token": "JWT_TOKEN_AQUI"
}
```

---

### 🔒 GET \`/api/profile\`

Retorna os dados do usuário logado.  
Requer \`Authorization: Bearer TOKEN\` no header.

#### Exemplo de Header:
```
Authorization: Bearer JWT_TOKEN_AQUI
```

#### Response:
```json
{
  "id": "uuid",
  "name": "Tales",
  "email": "tales@email.com"
}
```

---

## ✅ Segurança

- As senhas são **criptografadas com \`bcrypt\`**
- Os tokens JWT têm validade de **1 hora**
- O acesso à rota \`/profile\` é **restrito a usuários autenticados**

---

## 📌 Scripts úteis

```bash
npm run dev       # Roda o servidor em modo desenvolvimento
npx prisma studio # Acessa interface gráfica do banco (localhost:5555)
npx prisma migrate dev # Aplica alterações no schema do banco
```

---
