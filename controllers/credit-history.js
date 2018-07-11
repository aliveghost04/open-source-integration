'use strict';

const CreditHistoryModel = require('../models/credit-history');
const UsageDataModel = require('../models/usage-data');
const ErrorFactory = require('../middlewares/error');

module.exports = function CreditHistoryController(model) {
  const creditHistoryModel = CreditHistoryModel(model);
  const usageDataModel = UsageDataModel(model);

  return { 
    get(cedulaRnc, userId, clientIp) {
      return model
        .beginTransaction()
        .then(() => {
          return Promise.all([
            creditHistoryModel
              .get(cedulaRnc),
            usageDataModel
              .register(userId, clientIp, 'credit-history')
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
            return Promise.reject(ErrorFactory('CREDIT_HISTORY_NOT_FOUND'));
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