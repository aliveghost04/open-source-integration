'use strict';

module.exports = function FinancialHealthModel(Model) {
  return {
    get(cedulaRnc) {
      return Model
        .query(
          `SELECT cedula_rnc, updated_at, is_healthy, debt_amount, entity, comment
          FROM financial_health
          WHERE cedula_rnc = ?
          LIMIT 1`,
          [
            cedulaRnc
          ]
        );
    }
  };
}