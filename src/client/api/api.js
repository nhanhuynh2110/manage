import fetch from 'isomorphic-fetch'
import conf from '../conf'
import { queryString, responseHandler, resultHandler, options } from './utils'

const prefix = conf.api

class API {
  baseAPI () { return '/base-api' }

  get (url, query = {}, api) {
    return fetch(queryString(url, query), options('GET', null, api)).then(responseHandler).then(resultHandler)
  }

  post (url, query = {}, body = {}, api) {
    return fetch(queryString(url, query), options('POST', body, api)).then(responseHandler).then(resultHandler)
  }

  put (url, query = {}, body = {}, api) {
    return fetch(queryString(url, query), options('PUT', body, api)).then(responseHandler).then(resultHandler)
  }

  delete (url, query = {}, body = {}, api) {
    return fetch(queryString(url, query), options('DELETE', body, api)).then(responseHandler).then(resultHandler)
  }

  apiPrefix (uri) { return prefix + uri }
}

export default API
