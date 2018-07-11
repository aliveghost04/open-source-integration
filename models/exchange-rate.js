'use strict';

module.exports = function ExchangeRateModel(Model) {
  return {
    get(currencyCode) {
      return Model
        .query(
          `SELECT exchange_value, updated_at
          FROM exchanges_rates
          WHERE code = ?
          ORDER BY updated_at DESC
          LIMIT 10`,
          [ currencyCode ]
        );
    }
  };
}