'use strict'

const _ = require('lodash')

module.exports = {
  process: response => {
    const { id, title, price, currency_id, pictures, condition, shipping, sold_quantity } = response.item
    return {
      author: {
        name: 'Juan Pablo',
        lastname: 'Ferrari'
      },
      item: {
        id,
        title,
        price: {
          currency: currency_id,
          amount: (price % 1 === 0) ? price : Math.floor(price),
          decimals: (price % 1 === 0 ) ? 0 : Math.round(( price % 1 ) * 100) / 100
        },
        picture: _.first(pictures).url,
        condition,
        free_shipping: shipping.free_shipping,
        sold_quantity,
        description: response.description
      }
    }
  }
}
