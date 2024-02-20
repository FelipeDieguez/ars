import { api } from '../../../../utils/services/api';

export function layerList(data) {
  return api.post('/layer', data)
}

export function layerRegister(data) {
  return api.post('/layer/register', data);
}

export function layerEdit(data) {
  return api.post('/layer/edit', data);
}

export function layerRemove(data) {
  return api.post('/layer/remove', data);
}

export function investigationList(data) {
  return api.post('/investigation', data)
}

export function investigationRegister(data) {
  return api.post('/investigation/register', data)
}

export function investigationEdit(data) {
  return api.post('/investigation/edit', data)
}

export function investigationRemove(data) {
  return api.post('/investigation/remove', data)
}

export function geotechnicsCalculate(data) {
  return api.post('/geotechnics/calculate', data);
}

export function geotechnicsMemorial(data) {
  return api.post('/geotechnics/memorial', data);
}