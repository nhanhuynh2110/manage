import express from 'express'
import {withAPI, useApi} from './middlewares'
import auth from './auth'

const router = express.Router()

router.use(withAPI())

auth(router)

router.use('*', useApi)

router.get('/', (req, res) => {
  res.send('server is ready')
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
