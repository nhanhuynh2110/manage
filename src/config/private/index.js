const config = process.env.NODE_ENV === 'production' ? require('./production') : require('./development')

const common = {
  auth: {
    cookieName: 'tnh',
    successRedirect: '/',
    failureRedirect: '/login'
  },
  logger: {
    trace: false
  }
}

module.exports = {...common, ...config}
