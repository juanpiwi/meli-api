'use strict'

const BluebirdPromise = require('bluebird')
const Config = require('../config').conf
const Logger = require('../handlers/common/log-handler')
const BluebirdRequest = BluebirdPromise.promisifyAll(require('request'))

module.exports = {
  // Keep alive service
  keepAlive: endpoint => {
    let options = {
      method: 'GET',
      uri: Config[endpoint].url.keepAlive,
      timeout: Config[endpoint].timeout,
      time: true
    }

    Logger.debug('Health Check Service : keepAlive : Endpoint %s', endpoint)

    return BluebirdRequest.getAsync(options).then(response => {
      if (response.statusCode === 200) {
        Logger.info('Health Check Service : keepAlive : success | time: %s ms', response.elapsedTime)
        return BluebirdPromise.resolve(response.body)
      } else {
        return BluebirdPromise.reject(response)
      }
    })
  }
}
