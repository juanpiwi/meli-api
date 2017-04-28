'use strict'

const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const HapiCors = require('hapi-cors')
const HapiApiVersion = require('hapi-api-version')
const HapiIO = require('hapi-io')
const HapiAuthBearer = require('hapi-auth-bearer-token')
const Pack = require('./package')
const Config = require('./config').conf

// Hapi Swagger configuration options
const HapiSwaggerOptions = {
  documentationPath: Config.swagger.documentationPath,
  schemes: Config.swagger.schemes,
  host: Config.swagger.host || undefined,
  basePath: Config.apiRootPath,
  swaggerUIPath: Config.swagger.uiPath,
  jsonPath: Config.apiRootPath,
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ Bearer: [] }],
  pathPrefixSize: 2,
  info: {
    title: 'Meli API Documentation',
    description: 'A continuación se encuentra la documentación detallada de los servicios de la API',
    version: Pack.version,
    contact: {
      name: Pack.author
    }
  },
  tags: [{
    name: 'health-check',
    description: 'API Health Check'
  }, {
    name: 'keep-alive',
    description: 'API Alive Check'
  }, {
    name: 'v1',
    description: 'API Version 1'
  }, {
    name: 'v2',
    description: 'API Version 2'
  }]
}

// Hapi CORS configuration options
const HapiCorsOptions = {
  origins: ['*']
}

// Hapi API version configuration options
const HapiApiVersionOptions = {
  validVersions: Config.version.valid,
  defaultVersion: Config.version.current,
  vendorName: 'mel'
}

// Plugins array
const plugins = [ Inert, Vision, HapiIO, {
  register: HapiSwagger,
  options: HapiSwaggerOptions
}, {
  register: HapiCors,
  options: HapiCorsOptions
}, {
  register: HapiApiVersion,
  options: HapiApiVersionOptions
}, {
  register: HapiAuthBearer
}]

module.exports = plugins
