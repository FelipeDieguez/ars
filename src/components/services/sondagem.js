import axios from "axios";

export function cadastrarSondagem(data) {
  return axios.post("/sondagem/cadastrar", data);
}

export function editarSondagem(data) {
  return axios.post("/sondagem/editar", data);
}

export function listar() {
  return axios.get("/sondagem");
}
