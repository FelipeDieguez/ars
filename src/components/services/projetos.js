import { api } from "./api"

export function projectList() {
    return api.get("/projetos")
}

export function projectRegister(data) {
    return api.post("/projetos/cadastrar", data)
}

export function projectEdit(data) {
    return api.post("/projetos/editar", data)
}

export function projectRemove(data) {
    return api.post("/projetos/remover", data)
}