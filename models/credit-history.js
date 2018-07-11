'use strict';

module.exports = function CreditHistoryModel(Model) {
  return {
    get(cedulaRnc) {
      return Model
        .query(
          `SELECT cedula_rnc, updated_at, debt_amount, entity, concept
          FROM credit_histories
          WHERE cedula_rnc = ?
          LIMIT 10`,
          [
            cedulaRnc
          ]
        );
    }
  };
}