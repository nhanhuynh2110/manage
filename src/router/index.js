import express from 'express'
import path from 'path'
import Adapter from './adapter'
import { withAPI, useApi, checkAuth } from './middlewares'
import auth from './auth'
import conf from '../config/private'

const router = express.Router()

router.use(withAPI())
auth(router)
router.use('*', checkAuth)
router.use('/base-api', useApi)

router.get('/base-api', (req, res) => {
  try {
    const adapter = new Adapter()
    return adapter.get(conf.api.prefix + req.api, req.query, req.session.user.token)
      .then(resp => res.OK(resp.data)).catch(res.serverError)
  } catch (error) { res.serverError(error) }
})

router.post('/base-api', (req, res) => {
  try {
    const adapter = new Adapter()
    return adapter.post(conf.api.prefix + req.api, req.query, req.body, req.session.user.token)
      .then(resp => res.OK(resp.data)).catch(res.serverError)
  } catch (error) { res.serverError(error) }
})

router.patch('/base-api', (req, res) => {
  try {
    const adapter = new Adapter()
    return adapter.patch(conf.api.prefix + req.api, req.query, req.body, req.session.user.token)
      .then(resp => res.OK(resp.data)).catch(res.serverError)
  } catch (error) { res.serverError(error) }
})

router.put('/base-api', (req, res) => {
  try {
    const adapter = new Adapter()
    return adapter.put(conf.api.prefix + req.api, req.query, req.body, req.session.user.token)
      .then(resp => res.OK(resp.data)).catch(res.serverError)
  } catch (error) { res.serverError(error) }
})

router.delete('/base-api', (req, res) => {
  try {
    const adapter = new Adapter()
    return adapter.delete(conf.api.prefix + req.api, req.query, req.body, req.session.user.token)
      .then(resp => res.OK(resp.data)).catch(res.serverError)
  } catch (error) { res.serverError(error) }
})

router.get('/*', (req, res) => res.sendFile(path.resolve(path.join(__dirname, '../views/index.html'))))

export default router
