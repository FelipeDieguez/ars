import { api } from "./api"

export function listarProjetos() {
    return api.get("/projetos")
}

export function cadastrarProjeto(data) {
    return api.post("/projetos/cadastrar", data)
}

export function editarProjeto(data) {
    return api.post("/projetos/editar", data)
}

export function removerProjeto(data) {
    return api.post("/projetos/remover", data)
}