import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function getFunction(params) {
    const response = await axios.get(`${API_URL}/ola`);
    return response.data;
}

export async function postFuntion(params) {
    const response = await axios.post(`${API_URL}/cadastro`, {nome: "Tales",idade: 42,telefone: 661124040})
    return response.data;
}