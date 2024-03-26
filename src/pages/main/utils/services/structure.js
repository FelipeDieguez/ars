import { api } from '../../../../utils/services/api';

export function columnList(data) {
  return api.post('/column', data)
}

export function columnRegister(data) {
  return api.post('/column/register', data);
}

export function columnEdit(data) {
  return api.post('/column/edit', data);
}

export function columnRemove(data) {
  return api.post('/column/remove', data);
}