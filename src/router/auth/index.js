import path from 'path'
import { authService } from '../../services'
import conf from '../../config/private'
import logger from '../../logger'

export default (router) => {
  router.get('/login', (req, res) => {
    return res.sendFile(path.resolve(path.join(__dirname, '../../views/login.html')))
  })
  router.post('/login', (req, res) => {
    // get user
    return authService.getUser({ ...req.body })
      .then(data => {
        req.session.user = data.user
        return authService.createBearToken(data.user) // create bear token
      })
      .then(bearToken => {
        res.cookie(conf.auth.cookieName, bearToken) // set token to cookie
        return res.redirect(conf.auth.successRedirect) // successed redirect home
      })
      .catch((error) => {
        logger.error(error)
        req.session.destroy() // remove sesion
        res.redirect(conf.auth.failureRedirect) // failed redirect to login
      })
  })

  router.use('/logout', (req, res) => {
    res.clearCookie(conf.auth.cookieName)
    res.clearCookie('connect.sid')
    req.session.destroy()
    res.redirect(conf.auth.failureRedirect)
  })
}
