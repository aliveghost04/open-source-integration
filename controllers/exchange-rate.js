'use strict';

const query = require('../models');
const ErrorFactory = require('../middlewares/error');

module.exports = {
  get(currencyCode) {
    return query(
      `SELECT exchange_value, updated_at
      FROM exchanges_rates
      WHERE code = ?
      ORDER BY updated_at DESC
      LIMIT 1`,
      [ currencyCode ]
    )
    .then((results) => {
      if (results.length === 1) {
        return Promise.resolve({
          exchangeRate: results[0].exchange_value,
          lastUpdate: results[0].updated_at,
        });
      } else {
        return Promise.reject(ErrorFactory('CURRENCY_CODE_NOT_FOUND'));
      }
    });
  }
};