module.exports = {
  PORT: 4100,
  api: {
    domain: 'http://localhost:3100'
  },
  session: {
    secret: 'NHAN'
  },
  logger: {
    appenders: { log: { type: 'file', filename: 'log.txt' } },
    categories: { default: { appenders: ['log'], level: 'error' } }
  }
}
