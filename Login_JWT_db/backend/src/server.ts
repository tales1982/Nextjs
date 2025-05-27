// src/server.ts
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes'

/////////////////////////////////////////////////////////////////////////////////////////////////////
/// 🔽 Imports (importações):                                                                     ///
/// → Importa o framework Express, usado para criar o servidor HTTP.                              ///
/// → Importa o pacote dotenv, que carrega as variáveis de ambiente do arquivo .env.              ///
/// → Importa o middleware cors, que permite sua API ser acessada por outros domínios no frontend.///
/// → Importa as rotas de autenticação que você definiu no arquivo auth.routes.ts.                ///
/////////////////////////////////////////////////////////////////////////////////////////////////////
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

////////////////////////////////////////////////////////////////////////////////////////////
/// 🌍 Configuração do ambiente:                                                         ///
/// dotenv.config();                                                                     ///
/// 🚀 Inicializando o app Express:                                                      ///
/// const app = express();                                                               ///
/// 🧩 Middlewares globais:                                                              ///
/// app.use(cors());                                                                     ///
/// Ativa o CORS (Cross-Origin Resource Sharing), permitindo que o frontend conect       ///
/// app.use(express.json());                                                             ///
/// → Diz ao Express para entender requisições com Content-Type: application/json, como: ///
/// { "email": "thales@email.com", "password": "1234" }                                  ///
/// 🧭 Definindo as rotas da API:                                                        ///
/// app.use('/api', authRoutes);                                                         ///
/// → Define um prefixo /api para todas as rotas de autenticação.                        ///
/// 📡 Start do servidor:                                                                ///
/// const PORT = process.env.PORT || 4000                                                ///
/// → Define a porta do servidor, vindo do .env ou usando 4000 como padrão.              ///
////////////////////////////////////////////////////////////////////////////////////////////
/// app.listen(PORT, () => {                                                             ///
///    console.log(`🚀 Server running on http://localhost:${PORT}`)                      ///
///   })                                                                                 ///
///  → Inicia o servidor e exibe uma mensagem no terminal quando estiver pronto.         ///
////////////////////////////////////////////////////////////////////////////////////////////