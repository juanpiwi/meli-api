'use strict'

const Hapi = require('hapi')
const Lodash = require('lodash')
const Plugins = require('./plugins')
const Config = require('./config').conf
const Routes = require('./routes')
const Logger = require('./handlers/common/log-handler')
const Port = Number.parseInt(process.argv[2], 0) || Config.port

const App = new Hapi.Server()

App.connection({
  host: Config.server,
  port: Port,
  routes: {
    cors: true
  }
})

// Register plugins
App.register(Plugins, registerErr => {
  if (registerErr) {
    Logger.error('Plugins load error: %s', registerErr)
  } else {
    // Server token access authentication
    App.auth.strategy('token', 'bearer-access-token', {
      validateFunc: function (token, callback) {
        if (Lodash.includes(Config.securityKeys, token)) {
          return callback(null, true, { token: token })
        }
        return callback(null, false, { token: token })
      }
    })

    // Adding routes
    App.route(Routes)

    // Start server if not testing
    if (!module.parent) {
      App.start(err => {
        if (err) {
          Logger.error('Application start error: %s', err)
          throw err
        }
        Logger.info('%s running on http://%s:%s [%s]', Config.appName, Config.server, Port, Config.environment)
        console.log('%s running on http://%s:%s', Config.appName, Config.server, Port)
      })
    }
  }
})

// for testing purpose
module.exports = App
