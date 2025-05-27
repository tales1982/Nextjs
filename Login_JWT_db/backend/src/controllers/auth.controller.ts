// src/controllers/auth.controller.ts

import { Request, Response } from 'express'
import { prisma } from '../prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
////////////////////////////////////////////////////////////////////////////////////
/// 🔽 Importações                                                               ///
/// → Importa os tipos do Express pra usar com TypeScript nas funções de rota.   ///
/// → Importa a instância do Prisma pra acessar o banco de dados.                ///
/// → Importa o bcryptjs pra criptografar senhas e comparar no login.            ///
/// → Importa o jsonwebtoken pra gerar tokens JWT.                               ///
////////////////////////////////////////////////////////////////////////////////////

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
////////////////////////////////////////////////////////////////////////
/// → Lê a variável JWT_SECRET do .env. Se não existir, usa 'secret' ///
////////////////////////////////////////////////////////////////////////



export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    res.status(400).json({ message: 'Email already in use' })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }
  })

  res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email } })
}
/////////////////////////////////////////////////////////////////////////////////////////////////
/// 🔐 register — Cadastra um novo usuário                                                    ///
/// → Define a função assíncrona register, que recebe req e res e não retorna nada (void).    ///
/// → Extrai os dados enviados na requisição (nome, e-mail e senha).                          ///
/// → Verifica se já existe um usuário com esse e-mail.                                       ///
/// → Se já existir, responde com erro 400 e interrompe a função com return.                  ///
/// → Criptografa a senha com 10 rounds de salt.                                              ///
/// → Cria o novo usuário no banco com os dados e senha criptografada.                        ///
/// → Retorna status 201 Created com os dados básicos do usuário (sem a senha).               ///
/////////////////////////////////////////////////////////////////////////////////////////////////



export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    res.status(400).json({ message: 'Invalid credentials' })
    return
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    res.status(400).json({ message: 'Invalid credentials' })
    return
  }

  const token = jwt.sign(
    { userId: user.id },      // payload: o que vai dentro do token
    JWT_SECRET,               // chave secreta que assina o token
    { expiresIn: '1h' }       // tempo de expiração (1 hora)
  )
  res.status(200).json({ token })
//////////////////////////////////////////////////////////////////////////////////////
/// 1° Payload – informações codificadas no token:                                 ///
/// { userId: user.id }                                                            ///
/// Esse valor é usado depois pra identificar o usuário em requisições protegidas. ///
//////////////////////////////////////////////////////////////////////////////////////
/// 2° Chave secreta – vinda do .env:                                              ///
/// JWT_SECRET="chave-muito-secreta"                                               ///
/// É a chave usada para assinar o token e garantir que ele não foi alterado.      ///  
/// Se alguém tentar falsificar o token, a assinatura não bate e o backend rejeita.///
//////////////////////////////////////////////////////////////////////////////////////
/// 3° Opções (ex: validade):                                                      ///
/// { expiresIn: '1h' }                                                            ///
/// Isso define que o token expira em 1 hora.                                      ///
/// Depois disso, o usuário precisaria logar novamente.                            ///
//////////////////////////////////////////////////////////////////////////////////////
}
///////////////////////////////////////////////////////////////////////
/// 🔐 login — Autentica o usuário                                  ///
/// → Extrai e-mail e senha da requisição.                          ///
/// → Busca o usuário no banco de dados.                            ///
/// → Se não encontrar, retorna erro 400 e para a função.           ///
/// → Compara a senha enviada com a salva (criptografada).          ///
/// → Se a senha não bater, retorna erro 400 e encerra.             ///
/// → Gera um token JWT com o ID do usuário, válido por 1 hora.     ///
/// → Retorna status 200 com o token JWT.                           ///
///////////////////////////////////////////////////////////////////////
///       🚀 Resumo do fluxo                                        ///
/// 📥 Login → Backend valida credenciais                           ///
/// ✅ Gera JWT com userId, assinado com JWT_SECRET                 ///
/// ⬅️ Envia token para o frontend                                  ///
/// 📦 Frontend armazena o token (localStorage)                     ///
/// 🔐 Ao acessar rotas protegidas → Envia token via Header         ///
/// 🛡️ Backend verifica token, extrai userId e autoriza             ///
///////////////////////////////////////////////////////////////////////

export const profile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true }
  })

  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }

  res.json(user)
}
///////////////////////////////////////////////////////////////////////////////////////////////
/// 👤 profile — Retorna os dados do usuário logado                                         ///
/// → Pega o userId da requisição. Adicionado por um middleware que verifica o token JWT.   ///
/// → Busca o usuário no banco somente com os campos necessários.                           ///
/// → Se o usuário não existir, retorna erro 404.                                           ///
/// → Retorna os dados do usuário em JSON.                                                  ///
///////////////////////////////////////////////////////////////////////////////////////////////