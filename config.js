'use strict'

exports.conf = {
  environment: 'Local',
  appName: 'Autos API',
  server: '0.0.0.0',
  port: 3003,
  apiRootPath: '/meli-api',
  swagger: {
    documentationPath: '/meli-api/documentation',
    uiPath: '/meli-api/swaggerui/',
    schemes: ['http']
  },
  log: {
    directory: './logs',
    filename: 'meli-api.log'
  },
  portal: {
    id: 'MELI'
  },
  meli: {
    url: 'https://api.mercadolibre.com'
  },
  securityKeys: [
    'a4811fx8e88a6x11c78g',
    'r7t8r54s6s3re77f421b'
  ],
  version: {
    valid: [1],
    current: 1
  }
}