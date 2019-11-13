import conf from '../../config/private'

export default (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect(conf.auth.failureRedirect)
  next()
}
