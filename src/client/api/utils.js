import qs from 'qs'

const options = (method = 'GET', body = null, api = null) => {
  const headers = api ? { 'Content-Type': 'application/json', 'x-api': api } : { 'Content-Type': 'application/json' }
  if (body) return { method, headers, body: JSON.stringify(body) }
  return { method, headers }
}

const queryString = (url, query = {}) => {
  if (!query) return url
  if (Object.keys(query).length <= 0) return url
  return url + '?' + qs.stringify(query)
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
  if (response.status !== 200) return Promise.reject(new Error(response.message || 'Request api invalid'))
  return Promise.resolve({ ...response.data })
}

export {
  options,
  queryString,
  responseHandler,
  resultHandler
}
