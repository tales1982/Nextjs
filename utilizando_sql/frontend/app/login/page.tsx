/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Title } from "../styledPageHome";

const Login = () => {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || "Erro ao logar");
        return;
      }
      localStorage.setItem("userId", data.usuario.id);
      // Sucesso: redireciona para /logado
      router.push("/logado");
    } catch (err) {
      setErro("Erro de conexão com o servidor");
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="senha">Senha:</label>
        <br />
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit">Conectar</button>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </Container>
  );
};

export default Login;
