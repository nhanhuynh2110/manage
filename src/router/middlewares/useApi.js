export default (req, res, next) => {
  if (!req.session.user || !req.session.user.token) return res.forbidden()
  const xAPI = req.headers['x-api']
  if (!xAPI) return res.notFound()
  req.api = xAPI
  next()
}
