import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import conf from './config/private'
import logger from './logger'
import router from './router'

const app = express()

app.use(session({ secret: 'DEVNH', name: 'manage-NH' }))
app.use(cookieParser())
app.use(bodyParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use((req, res, next) => {
  req.isAuthenticated = () => !!req.session.user
  next()
})

app.use('/', router)

app.listen(conf.PORT, () => {
  logger.info(`Server listen port ${conf.PORT}`)
})
