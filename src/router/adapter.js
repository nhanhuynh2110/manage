import fetch from 'isomorphic-fetch'
import logger from '../logger'
import { options, queryString, resultHandler, responseHandler } from './utils'

class Adapter {
  get (url, query = {}, token = null) {
    logger.info(`api methods get with url ${url}`)
    logger.info(`api ${queryString(url, query)}`)
    return fetch(queryString(url, query), options('GET', null, token)).then(responseHandler).then(resultHandler)
  }

  post (url, query, body = {}, token = null) {
    logger.info(`api methods post with url ${url}`)
    logger.info(`api ${queryString(url, query)}`)
    return fetch(queryString(url, query), options('POST', body, token)).then(responseHandler).then(resultHandler)
  }

  put (url, query, body, token = null) {
    logger.info(`api methods put with url ${url}`)
    logger.info(`api ${queryString(url, query)}`)
    return fetch(queryString(url, query), options('PUT', body, token)).then(responseHandler).then(resultHandler)
  }

  patch (url, query, body, token = null) {
    logger.info(`api methods patch with url ${url}`)
    logger.info(`api ${queryString(url, query)}`)
    return fetch(queryString(url, query), options('PATCH', body, token)).then(responseHandler).then(resultHandler)
  }

  delete (url, query, body, token = null) {
    logger.info(`api methods delete with url ${url}`)
    logger.info(`api ${queryString(url, query)}`)
    return fetch(queryString(url, query), options('DELETE', body, token)).then(responseHandler).then(resultHandler)
  }
}

export default Adapter
