'use client'

import { useState, useEffect } from 'react'

const Logado = () => {
  const [imagem, setImagem] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const id = localStorage.getItem('userId')
    setUserId(id)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImagem(file)
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!imagem || !userId) {
      setErro('Usuário não autenticado ou imagem não selecionada')
      return
    }

    const formData = new FormData()
    formData.append('foto', imagem)

    try {
      const res = await fetch(`http://localhost:3001/api/upload/${userId}`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error || 'Erro ao enviar imagem')
        return
      }

      setMensagem('Imagem enviada com sucesso!')
      setErro('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErro('Erro ao conectar com o servidor')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Logado</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <br /><br />
        <button type="submit">Enviar imagem</button>
      </form>

      {preview && <img src={preview} alt="Preview" style={{ marginTop: '1rem', width: 200 }} />}
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  )
}

export default Logado
