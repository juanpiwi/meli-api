'use strict'

const Config = require('./config').conf
const Logger = require('./handlers/common/log-handler')

var routes = []
Config.version.valid.forEach(version => {
  Logger.info('Adding v%s routes', version)
  routes.push(require(`./routes-version/v${version}/routes`))
})

module.exports = [].concat.apply([], routes)
