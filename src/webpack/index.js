const confEnv = require(process.env.NODE_ENV === 'production' ? './production' : './development')
console.log('>>>>>>>>>>>>>>>>>>>>>> confEnv', confEnv)

const common = require('./common')

module.exports = { ...common, ...confEnv }
