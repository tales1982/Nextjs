/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Title } from './styledPageHome'

const Home = () => {
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const nome = formData.get('nome')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const senha = formData.get('senha')?.toString().trim()

    if (!nome || !email || !senha) {
      setErro('Todos os campos são obrigatórios')
      return
    }

    try {
      const res = await fetch('http://localhost:3001/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error || 'Erro ao cadastrar')
        return
      }

      setMensagem('Usuário cadastrado com sucesso!')
      setErro('')

      // Redireciona após 2 segundos
      setTimeout(() => {
        router.push('/login')
      }, 2000)

    } catch (error) {
      setErro('Erro ao conectar com o servidor.')
    }
  }

  return (
    <Container>
      <Title>Cadastro</Title>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label><br />
        <input type="text" id="nome" name="nome" required /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" required /><br /><br />

        <label htmlFor="senha">Senha:</label><br />
        <input type="password" id="senha" name="senha" required /><br /><br />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </Container>
  )
}

export default Home
