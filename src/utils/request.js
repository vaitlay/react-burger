import { checkResponse } from './check-response.js'
import { checkSuccess } from './check-success.js'

export function request(endpoint, options = {}, baseUrl = 'https://norma.nomoreparties.space/api/') {
  return fetch(`${baseUrl}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}