// src/lib/auth.ts
import  api  from './api'
import { User } from '../types/user'

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  await api.post('/register', { name, email, password })
}

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await api.post('/login', { email, password })
  return response.data.token
}

export const getProfile = async (token: string): Promise<User> => {
  const response = await api.get('/profile', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
