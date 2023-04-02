import { api } from "./api";

export function listar() {
    return api.get("/sondagem")
}

export function cadastrarCamada(data) {
  return api.post("/sondagem/cadastrar", data);
}

export function editarCamada(data) {
  return api.post("/sondagem/editar", data);
}

export function removerCamada(data) {
    return api.post('/sondagem/remover', data);
}

export function calcular(data) {
    return api.post('/sondagem/calcular', data);
}

export function memorial(data) {
  return api.post('/sondagem/memorial', data);
}