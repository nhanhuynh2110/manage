import fetch from 'isomorphic-fetch'
import qs from 'qs'
import conf from '../config/private'

const prefixAPI = conf.api.domain

const apiUrl = (uri) => prefixAPI + uri

const queryString = (url, obj) => qs.stringify(obj) ? apiUrl(url + '?' + qs.stringify(obj)) : apiUrl(url)

const options = (method = 'GET', body = null) => {
  if (body) return { method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body) }
  return { method, headers: { 'Content-Type': 'application/json' } }
}

const responseHandler = (response) => {
  if (response.status === 401) return
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}

const resultHandler = (response) => {
  if (!response.status) return Promise.reject(new Error('Request api invalid'))
  if (response.status !== 200) return Promise.rejec({ error: response.message || 'request api invalid' })
  return Promise.resolve({ ...response })
}

class Adapter {
  get (url, query = {}) {
    return fetch(queryString(url, query), options()).then(responseHandler).then(resultHandler)
  }

  post (url, query, body = {}) {
    return fetch(queryString(url, query), options('POST', body)).then(responseHandler).then(resultHandler)
  }

  put (url, query, body) {
    return fetch(queryString(url, query), options('PUT', body)).then(responseHandler).then(resultHandler)
  }

  patch (url, query, body) {
    return fetch(queryString(url, query), options('PATCH', body)).then(responseHandler).then(resultHandler)
  }

  delete (url, query, body) {
    return fetch(queryString(url, query), options('DELETE', body)).then(responseHandler).then(resultHandler)
  }
}

export default Adapter
