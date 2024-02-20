import { api } from "../../../../utils/services/api"

export function methodList() {
    return api.get("/method")
}

export function methodDuplicate(data) {
    return api.post("/method/duplicate", data)
}

export function methodEdit(data) {
    return api.post("/method/edit", data)
}

export function methodRemove(data) {
    return api.post("/method/remove", data)
}

export function methodSave(data) {
    return api.post("/method/save", data)
}