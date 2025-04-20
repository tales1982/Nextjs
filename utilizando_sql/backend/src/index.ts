import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/api/usuarios', async (req: Request, res: Response): Promise<void> => {
  const usuarios = await prisma.usuario.findMany()
  res.json(usuarios)
})

app.post('/api/usuarios', async (req: Request, res: Response): Promise<void> => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    res.status(400).json({ error: 'Campos obrigatórios' })
    return
  }

  try {
    const novo = await prisma.usuario.create({
      data: { nome, email, senha },
    })
    res.status(201).json(novo)
  } catch (err: any) {
    if (err.code === 'P2002') {
      res.status(400).json({ error: 'Email já cadastrado' })
    } else {
      res.status(500).json({ error: 'Erro interno' })
    }
  }
})

app.post('/api/login', async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body

  if (!email || !senha) {
    res.status(400).json({ error: 'Email e senha obrigatórios' })
    return
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email },
  })

  if (!usuario || usuario.senha !== senha) {
    res.status(401).json({ error: 'Credenciais inválidas' })
    return
  }

  res.status(200).json({
    message: 'Login realizado com sucesso',
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
  })
})

// UPLOAD

const uploadDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir)
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

app.post('/api/upload/:userId', upload.single('foto'), async (req, res) => {
    const { userId } = req.params
    const file = req.file
  
    if (!file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' })
      return
    }
  
    try {
      const usuario = await prisma.usuario.update({
        where: { id: Number(userId) },
        data: {
          imagem: `/uploads/${file.filename}`,
        },
      })
  
      res.json({ message: 'Imagem salva', imagem: usuario.imagem })
    } catch (err) {
      res.status(500).json({ error: 'Erro ao salvar imagem no banco' })
    }
  })
  

app.use('/uploads', express.static(uploadDir))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`)
})
