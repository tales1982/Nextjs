// src/App.js
import React, { useState } from 'react';
import api from './api';

function App() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('1234');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login realizado com sucesso!');
    } catch (err) {
      setMessage('Erro no login!');
    }
  };

  const accessProtected = async () => {
    try {
      const res = await api.get('/protected');
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Falha ao acessar rota protegida.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login com JWT</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={accessProtected} style={{ marginLeft: 10 }}>
        Rota Protegida
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
