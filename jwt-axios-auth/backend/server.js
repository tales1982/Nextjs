// backend/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express(); // express(): cria o app.
app.use(cors()); // app.use(cors()): permite requisições de outros domínios (ex: frontend em outra porta).
app.use(express.json()); // app.use(express.json()): permite receber JSON no body da requisição.

// 👤 Simulação de usuários (sem banco de dados)
const users = [
  { id: 1, username: 'admin', password: '1234' },
  { id: 2, username: 'thales', password: 'senha' }
];


//✅ 5. 🔐 Rota de login /login
app.post('/login', (req, res) => {
  const { username, password } = req.body; // Recebe username e password no corpo da requisição.
  const user = users.find(u => u.username === username && u.password === password); // Verifica se as credenciais batem com algum usuário da lista users.
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h', //Se sim, gera um token JWT com os dados do usuário (id, username).
  });
  res.json({ token });
});


//✅ 6. 🔒 Rota protegida /protected
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401); // Nenhum token fornecido
  }

  const token = authHeader.split(' ')[1]; // Remove o "Bearer "

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido ou expirado

    // Token válido, devolve mensagem
    res.json({ message: `Olá, ${user.username}! Acesso autorizado.` });
  });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
