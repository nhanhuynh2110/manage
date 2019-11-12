import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import path from 'path'
import _ from 'lodash'
import conf from './config/private'
import logger from './logger'
import router from './router'

const app = express()

app.use(session({
  secret: 'DEVNH',
  name: 'manage-NH'
}))
app.use(cookieParser())
app.use(bodyParser())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.use('/', express.static(path.resolve(__dirname, '../dist/dist')))

app.use((req, res, next) => {
  const user = _.get(req.session, 'user')
  req.isAuthenticated = () => !!user
  next()
})

app.use('/', router)

app.listen(conf.PORT, () => {
  logger.info(`Server listen port ${conf.PORT}`)
})
