'use strict';

const FinancialHealthModel = require('../models/financial-health');
const UsageDataModel = require('../models/usage-data');
const ErrorFactory = require('../middlewares/error');

module.exports = function FinancialHealthController(model) {
  const financialHealthModel = FinancialHealthModel(model);
  const usageDataModel = UsageDataModel(model);

  return { 
    get(cedulaRnc, userId, clientIp) {
      return model
        .beginTransaction()
        .then(() => {
          return Promise.all([
            financialHealthModel
              .get(cedulaRnc),
            usageDataModel
              .register(userId, clientIp, 'financial-health')
          ]);
        })
        .then((data) => {
          return model
            .commit()
            .then(() => data);
        })
        .then(([ results, insert ]) => {
          if (results.length > 0) {
            if (insert.affectedRows === 1) {
              return Promise.resolve(results);
            } else {
              return Promise.reject(ErrorFactory('CAN_NOT_REGISTER_USAGE_DATA'));
            }
          } else {
            return Promise.reject(ErrorFactory('CLIENT_NOT_FOUND'));
          }
        })
        .catch((err) => {
          return model
            .rollback()
            .then(() => {
              return Promise.reject(err);
            });
        });
    }
  };
};