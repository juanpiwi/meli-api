'use strict'

const BluebirdPromise = require('bluebird')
const BluebirdRequest = BluebirdPromise.promisifyAll(require('request'))
const Config = require('../config').conf
const Logger = require('../handlers/common/log-handler')

module.exports = {
  // Result service
  getResult: payload => {
    let options = {
      method: 'GET',
      uri: `${Config.meli.url}/sites/MLA/search?q=${payload}`,
      json: true,
      time: true,
      exceptions: false
    }

    Logger.debug('Autocomplete Service : autocomplete : Endpoint %s', options.uri)

    return BluebirdRequest.getAsync(options).then(response => {
      if (response.statusCode === 200) {
        return BluebirdPromise.resolve(response.body)
      } else {
        return BluebirdPromise.reject(response)
      }
    }).catch(err => {
      return BluebirdPromise.reject(err.body)
    })
  },
  getId: payload => {
    let options = {
      method: 'GET',
      uri: `${Config.meli.url}/items/${payload}`,
      json: true,
      time: true,
      exceptions: false
    }

    Logger.debug('Detail Service : detail : Endpoint %s', options.uri)

    return BluebirdRequest.getAsync(options).then(response => {
      if (response.statusCode === 200) {
        return BluebirdPromise.resolve(response.body)
      } else {
        return BluebirdPromise.reject(response)
      }
    }).catch(err => {
      return BluebirdPromise.reject(err.body)
    })
  },
  getDescription: payload => {    
    let options = {
      method: 'GET',
      uri: `${Config.meli.url}/items/${payload}/description`,
      json: true,
      time: true,
      exceptions: false
    }

    Logger.debug('Description Service : description : Endpoint %s', options.uri)

    return BluebirdRequest.getAsync(options).then(response => {
      if (response.statusCode === 200) {
        return BluebirdPromise.resolve(response.body)
      } else {
        return BluebirdPromise.reject(response)
      }
    }).catch(err => {
      return BluebirdPromise.reject(err.body)
    })
  }
}
