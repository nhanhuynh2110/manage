import path from 'path'
import {authService} from '../../services'
import conf from '../../config/private'
import logger from '../../logger'

export default (router) => {
  router.get('/login', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../../views/login.html')))
  })
  router.post('/login', (req, res) => {
    return authService.getUser({...req.body})
      .then(user => {
        req.session.user = user
        return authService.createBearToken(user)
      })
      .then(bearToken => {
        res.cookie(conf.auth.cookieName, bearToken)
        res.redirect(conf.auth.successRedirect)
      })
      .catch((error) => {
        logger.error(error)
        req.session.destroy()
        res.redirect(conf.auth.failureRedirect)
      })
  })

  router.use('/logout', (req, res) => {
    res.clearCookie(conf.auth.cookieName)
    res.clearCookie('connect.sid')
    req.session.destroy()
    res.redirect(conf.auth.failureRedirect)
  })

  router.use((req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect(conf.auth.failureRedirect)
    return next()
  })
}
