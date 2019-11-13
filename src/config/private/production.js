module.exports = {
  PORT: 4100,
  api: {
    domain: 'http://localhost:3100',
    prefix: '/api/admin/'
  },
  session: {
    secret: 'NHAN',
    name: 'manage-pro',
    maxAge: 3600 * 24 * 30
  },
  logger: {
    appenders: { log: { type: 'file', filename: 'log.txt' } },
    categories: { default: { appenders: ['log'], level: 'error' } }
  }
}
