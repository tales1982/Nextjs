import axios from "axios";

const API_URL = "http://localhost:3001";

export async function ft_Login(params) {
  try {
    console.log("Enviando a requisição pra logar");

    const response = await axios.post(`${API_URL}/api/auth/login`, params);

    return response.data; // geralmente você quer apenas o .data
  } catch (error) {
    console.error("Erro no login:", error);

    // Opcional: lançar erro tratado para o frontend reagir
    throw error.response?.data || "Erro desconhecido ao fazer login.";
  }
}
