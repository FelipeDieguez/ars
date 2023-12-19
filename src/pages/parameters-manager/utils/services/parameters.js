import { api } from "../../../../utils/services/api"

export function parameterList(data) {
    return api.get("/parameters")
}

export function parameterDuplicate(data) {
    return api.post("/parameters/duplicate", data)
}

export function parameterEdit(data) {
    return api.post("/parameters/edit", data)
}

export function parameterRemove(data) {
    return api.post("/parameters/remove", data)
}

export function parameterSave(data) {
    return api.post("/parameters/save", data)
}