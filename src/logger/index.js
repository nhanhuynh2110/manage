import log4js from 'log4js'
import conf from '../config/private'

log4js.configure(conf.logger)

const logger = log4js.getLogger('log')

export default logger
