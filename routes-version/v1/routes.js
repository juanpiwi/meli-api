'use strict'

const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)
const Moment = require('moment-timezone')
const Config = require('../../config').conf
const ResultHandler = require ('../../handlers/v1/result-handler')

module.exports = [{
  method: 'GET',
  path: `${Config.apiRootPath}/keep-alive`,
  config: {
    tags: ['api', 'keep-alive'],
    description: 'Get if the API is alive',
    notes: 'Returns the API status'
  },
  handler: (request, reply) => {
    return reply({
      response: 'ok'
    })
  }
}, {
  method: 'GET',
  path: `${Config.apiRootPath}/v1/items`,
  config: {
    tags: ['api', 'items'],
    description: 'Search endpoint',
    auth: 'token',
    notes: 'Use a query parameter',
    validate: {
      query: {
        q: Joi.string()
      }
    }
  },
  handler: (request, reply) => {
    ResultHandler.getResult(request.query.q).then(response => {
      return reply(response)
    }).catch(err => {
      return reply(err)
    })
  }
}, {
  method: 'GET',
  path: `${Config.apiRootPath}/v1/items/{id}`,
  config: {
    tags: ['api', 'items'],
    description: 'Get an item data',
    auth: 'token',
    notes: 'Needs an ID param',
    validate: {
      params: {
        id: Joi.string()
      }
    }
  },
  handler: (request, reply) => {
    ResultHandler.getId(request.params.id).then(response => {
      return reply(response)
    }).catch(err => {
      return reply(err)
    })
  }
}]
