import qs from 'qs'
import conf from '../config/private'

const prefixAPI = conf.api.domain

const apiUrl = (uri) => prefixAPI + uri

const queryString = (url, obj) => qs.stringify(obj) ? apiUrl(url + '?' + qs.stringify(obj)) : apiUrl(url)

const options = (method = 'GET', body = null, token = null) => {
  const headers = token ? { 'Content-Type': 'application/json', token } : { 'Content-Type': 'application/json' }
  if (body) return { method, headers, body: JSON.stringify(body) }
  return { method, headers }
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

export {
  options,
  queryString,
  responseHandler,
  resultHandler
}
