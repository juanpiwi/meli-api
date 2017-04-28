'use strict'

const Config = require('../../config').conf.author
const _ = require('lodash')

module.exports = {
  process: response => {
    const { results, filters } = response
    const categories = _categories(filters)

    return results.map(result => {
      const { id, title, price, currency_id, thumbnail, condition, shipping } = result
      let dtoCondition = 'No especificado'

      switch (condition) {
        case 'new':
          dtoCondition = 'Nuevo'
          break
        case 'used':
          dtoCondition = 'Usado'
        default:
          dtoCondition
      }

      return {
        author: {
          name: Config.name,
          lastname: Config.lastname
        },
        categories,
        items: {
          id,
          title,
          price: {
            currency: currency_id,
            amount: (price % 1 === 0) ? price : Math.floor(price),
            decimals: (price % 1 === 0 ) ? 0 : Math.round(( price % 1 ) * 100) / 100
          },
          picture: thumbnail,
          condition: dtoCondition,
          free_shipping: shipping.free_shipping
        }
      }
    })
  }
}

function _categories (filters) {
  if (_.isEmpty(filters)) {
    return filters
  } else {
    const filtered = _.first(filters.filter(filter => {
      return filter.id === 'category'
    }))

    return _.first(filtered.values.map(value => {
      return value.path_from_root.map(path => {
        return path.name
      })
    }))
  }
}
