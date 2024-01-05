import { api } from "../../../../utils/services/api"

export function projectList() {
    return api.get("/projects")
}

export function projectRegister(data) {
    return api.post("/projects/register", data)
}

export function projectEdit(data) {
    return api.post("/projects/edit", data)
}

export function projectRemove(data) {
    return api.post("/projects/remove", data)
}