'use strict';

module.exports = function ExchangeRateModel(Model) {
  return {
    get(year, month) {
      return Model
        .query(
          `SELECT value, year, month, created_at
          FROM inflations_rates
          WHERE year = ?
            AND month = ?
          LIMIT 1`,
          [
            year,
            month
          ]
        );
    }
  };
}