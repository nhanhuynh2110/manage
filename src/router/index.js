import express from 'express'
import path from 'path'
import {withAPI, useApi} from './middlewares'
import auth from './auth'
import conf from '../config/private'

const router = express.Router()

router.use(withAPI())


auth(router)

// router.use('/*', useApi)

router.use('*', (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect(conf.auth.failureRedirect)
  next()
})

router.get('/*', (req, res) => {
  return res.sendFile(path.resolve(path.join(__dirname, '../views/index.html')))
})


router.get('/base-api', (req, res) => {
  try {
    return res.OK(req.api)
  } catch (error) { res.serverError(error) }
})

export default router

// router.post('/base-api', (req, res) => {})

// router.put('/base-api', (req, res) => {})

// router.patch('/base-api', (req, res) => {})

// router.delete('/base-api', (req, res) => {})

// module.exports = (app) => {
//   // router.use(withAPI)
//   // app.use(useAPI)
//   // app.use(useAPI)

// }
