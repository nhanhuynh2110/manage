export default (req, res, next) => {
  const xAPI = req.headers['x-api']
  if (!xAPI) return res.notFound()
  req.api = xAPI
  next()
}
