'use client';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ft_Login } from "@/service/api";
import { useState } from "react";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(2, 1, 15);
  color: aliceblue;
`;

const Login = styled.div`
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  background-color: rgb(39, 143, 13);
  border-radius: 8px;
`;

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await ft_Login({ email, password });
      alert("Login realizado com sucesso!");
      console.log("Dados recebidos:", data);
      // Aqui você pode salvar token, redirecionar, etc.
    } catch (err) {
      alert("Erro ao fazer login: " + err);
      console.error(err);
    }
  }

  return (
    <Container>
      <Login>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Login>
    </Container>
  );
}
