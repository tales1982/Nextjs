// ✅ Criar tela de perfil (rota protegida)
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProfile } from '@/lib/auth'
import { User } from '@/types/user'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')

    getProfile(token)
      .then(setUser)
      .catch(() => router.push('/login'))
  }, [router])

  if (!user) return <p className="p-4">Carregando...</p>

  return (
    <main className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </main>
  )
}
