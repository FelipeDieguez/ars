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

export function soilInvestigationList(data) {
  return api.post('/soilinvestigation', data)
}

export function soilInvestigationRegister(data) {
  return api.post('/soilinvestigation/register', data)
}

export function soilInvestigationEdit(data) {
  return api.post('/soilinvestigation/edit', data)
}

export function soilInvestigationRemove(data) {
  return api.post('/soilinvestigation/remove', data)
}

export function calculate(data) {
  return api.post('/investigation/calculate', data);
}

export function memorial(data) {
  return api.post('/investigation/memorial', data);
}