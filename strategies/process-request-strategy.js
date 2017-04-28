'use strict'

const Logger = require('../handlers/common/log-handler')

module.exports = {
  version: version => {
    this.version = version
  },

  strategy: strategy => {
    let strategyRequired

    try {
      strategyRequired = require(`./${this.version}/${strategy}`)
    } catch (err) {
      console.error(err)
      // Load default strategy
      Logger.warn('Streategy pattern: %s strategy structure not implemented', `./${this.version}/${strategy}`)

      strategyRequired = {
        process: response => {
          return response
        }
      }
    }

    this.strategy = strategyRequired
  },

  process: response => {
    return this.strategy.process(response)
  }
}
