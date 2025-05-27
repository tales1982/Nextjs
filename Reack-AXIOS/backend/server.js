import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const cadastro = [];

//fais uma pesquisa
app.get('/consulta', (req, res) => {

  console.log('consultando cadastro..');
  res.json({ cadastro });
});

//recebe dados para cadastra no banco
app.post('/cadastro',(req, res) => {
  console.log('recebendo casdastro d front');

  cadastro.push({
    nome: req.body.nome,
    idade: parseInt(req.body.idade),
    telefone: parseInt(req.body.telefone)
  });

  res.json({message: "Cadastro recebido com sucesso.."})

})

app.delete('/deletar', (req, res) => {
  console.log('Apagando cliente...');

  const nome = req.body.nome;

  const index = cadastro.findIndex(cliente => cliente.nome === nome);

  if (index !== -1) {
    cadastro.splice(index, 1); // Remove o cliente do array
    return res.json({ message: "Cadastro apagado com sucesso." });
  } else {
    return res.status(404).json({ error: "Cliente não encontrado." });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


