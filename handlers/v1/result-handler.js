'use strict'

const BluebirdPromise = require('bluebird')
const ResultService = require('../../services/result-service')
const ProcessRequestStrategy = require('../../strategies/process-request-strategy')
const ErrorHandler = require('../common/error-handler')

module.exports = {
  getResult: request => {
    return new BluebirdPromise((resolve, reject) => {
      ResultService.getResult(request).then(response => {
        ProcessRequestStrategy.version('v1')
        ProcessRequestStrategy.strategy('result-strategy')

        resolve(ProcessRequestStrategy.process(response))
      }).catch(err => {
        reject(ErrorHandler.process(err))
      })
    })
  },

  getId: id => {
    return new BluebirdPromise((resolve, reject) => {
      Promise.all([
        ResultService.getId(id),
        ResultService.getDescription(id)
      ])
      .then(results => {
        const [ item, description ] = results
        ProcessRequestStrategy.version('v1')
        ProcessRequestStrategy.strategy('id-strategy')

        resolve(ProcessRequestStrategy.process({ item, description }))
      })
      .catch(err => reject(ErrorHandler.process(err)))
    })
  }
}
