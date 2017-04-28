'use strict'

const Boom = require('boom')
const Logger = require('./log-handler')

module.exports = {
  process: err => {
    Logger.error('handlers : error : ', err)
    if (err.name === 'SequelizeAccessDeniedError') {
      return Boom.serverUnavailable('DB access denied error')
    } else {
      return err.statusCode ? Boom.create(err.statusCode, (err.message || err)) : Boom.badRequest(err.message || err)
    }
  }
}
