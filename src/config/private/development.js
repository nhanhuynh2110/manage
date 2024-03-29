module.exports = {
  PORT: 4000,
  api: {
    domain: 'http://localhost:3100',
    prefix: '/api/admin/'
  },
  cache: {
    maxAge: 0
  },
  session: {
    secret: 'NHAN',
    name: 'manage-dev',
    maxAge: 3600 * 24 * 30
  },
  logger: {
    appenders: { log: { type: 'console', filename: 'log.txt' } },
    categories: { default: { appenders: ['log'], level: 'debug' } }
  }
}
