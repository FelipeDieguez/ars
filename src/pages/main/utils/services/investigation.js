import { api } from "../../../../utils/services/api";

export function investigationList() {
  return api.get("/investigation")
}

export function layerRegister(data) {
  return api.post("/investigation/register", data);
}

export function layerEdit(data) {
  return api.post("/investigation/edit", data);
}

export function layerRemove(data) {
  return api.post('/investigation/remove', data);
}

export function calculate(data) {
  return api.post('/investigation/calculate', data);
}

export function memorial(data) {
  return api.post('/investigation/memorial', data);
}