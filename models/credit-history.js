'use strict';

module.exports = function ExchangeRateModel(Model) {
  return {
    get(cedulaRnc) {
      return Model
        .query(
          `SELECT cedula, updated_at, debt_amount, entity, concept
          FROM credit_histories
          WHERE cedula_rnc = ?
          LIMIT 1`,
          [
            cedulaRnc
          ]
        );
    }
  };
}