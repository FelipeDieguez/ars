import axios from "axios";

export function listar() {
    return axios.get("/sondagem");
}

export function cadastrarCamada(data) {
  return axios.post("/sondagem/cadastrar", data);
}

export function editarCamada(data) {
  return axios.post("/sondagem/editar", data);
}

export function removerCamada(data) {
    return axios.post('/sondagem/remover', data);
}

export function calcular(data) {
    return axios.post('/sondagem/calcular', data);
}



