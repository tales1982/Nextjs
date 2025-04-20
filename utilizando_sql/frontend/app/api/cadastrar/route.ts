// app/api/cadastrar/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()

  // Aqui você pode salvar no banco, validar, etc.
  console.log('Dados recebidos:', data)

  return NextResponse.json({ message: 'Usuário cadastrado com sucesso' })
}
