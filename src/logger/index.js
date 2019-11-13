import conf from '../config/private'

const log4js = require('log4js')

log4js.configure(conf.logger)

const logger = log4js.getLogger('log')

export default logger
