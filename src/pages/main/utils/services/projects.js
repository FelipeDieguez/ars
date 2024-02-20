import { api } from "../../../../utils/services/api"

export function projectList() {
    return api.get("/project")
}

export function projectRegister(data) {
    return api.post("/project/register", data)
}

export function projectEdit(data) {
    return api.post("/project/edit", data)
}

export function projectRemove(data) {
    return api.post("/project/remove", data)
}