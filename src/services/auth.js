import jwt from 'jsonwebtoken'
import conf from '../config/private'
import Adapter from '../router/adapter'
import logger from '../logger'

export default {
  getUser: ({ username, password }) => {
    logger.info('>>>>>>>> Get User')
    const adapter = new Adapter()
    return adapter.get('/api/admin/login', { username, password })
  },
  createBearToken: (user) => {
    logger.info('>>>>>>>> Get User ID ' + user._id)
    logger.info('>>>>>>>> create bear token')
    const bearToken = jwt.sign(
      { id: user._id },
      conf.session.secret,
      {
        expiresIn: conf.session.maxAge
      }
    )

    logger.info('>>>>>>>> created token: ' + bearToken)
    return bearToken
  }
}
