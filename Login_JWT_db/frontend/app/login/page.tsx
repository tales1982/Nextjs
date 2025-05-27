/* eslint-disable @typescript-eslint/no-explicit-any */
// ✅ Criar tela de login
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = await login(form.email, form.password)
      localStorage.setItem('token', token)
      router.push('/profile')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao logar')
    }
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Senha" value={form.password} onChange={handleChange} required />
        <button className="bg-blue-600 text-white p-2 rounded" type="submit">Entrar</button>
      </form>
    </main>
  )
}
