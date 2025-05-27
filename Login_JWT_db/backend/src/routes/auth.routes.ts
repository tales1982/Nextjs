// src/routes/auth.routes.ts
/**
 * auth.routes.ts define as rotas de autenticação da sua API usando o Express, 
 * de forma bem organizada e modular. Vou te explicar linha por linha:
 */
import { Router } from 'express'                                                               
import { login, register, profile } from '../controllers/auth.controller'                       
import { authenticateToken } from '../middlewares/auth.middleware' 

/////////////////////////////////////////////////////////////////////////////////////////////////////
//→ Importa o Router do Express, que permite criar um grupo de rotas separadas, como um mini-app.////
//→ Importa as funções login, register e profile do controller de autenticação.                  ////
//→ Importa o middleware que verifica o token JWT para proteger rotas privadas, como /profile.   ////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//=================================================================================================//
const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authenticateToken, profile)

export default router;

//////////////////////////////////////////////////////////////////////////////////////////////////////
//const router = Router()                                                                           //
//→ Cria uma instância de router. Você vai usar ela para declarar rotas como /register, /login, etc.//
//==================================================================================================//
//router.post('/register', register)                                                                //                                                          
//→ Cria a rota POST /register que chama a função register do controller.                           // 
//==================================================================================================//
//router.post('/login', login)                                                                      //
//→ Cria a rota POST /login que chama a função login.                                               //
//📤 Usada para autenticar e retornar um token JWT.                                                 //
//==================================================================================================//
//router.get('/profile', authenticateToken, profile)                                                //
//→ Cria a rota GET /profile protegida com o middleware authenticateToken.                          //
//📥 Primeiro o middleware valida o token; se estiver OK, chama a função profile.                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////