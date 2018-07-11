'use strict';

const ExchangeRateModel = require('../models/exchange-rate');
const UsageDataModel = require('../models/usage-data');
const ErrorFactory = require('../middlewares/error');

module.exports = function ExchangeRateController(model) {
  const exchangeRateModel = ExchangeRateModel(model);
  const usageDataModel = UsageDataModel(model);

  return { 
    get(currencyCode, userId, clientIp) {
      return model
        .beginTransaction()
        .then(() => {
          return Promise.all([
            exchangeRateModel
              .get(currencyCode),
            usageDataModel
              .register(userId, clientIp, 'exchange-rate')
          ]);
        })
        .then((data) => {
          return model
            .commit()
            .then(() => Promise.resolve(data));
        })
        .then(([ results, insert ]) => {
          if (results.length === 1) {
            if (insert.affectedRows === 1) {
              return Promise.resolve({
                exchangeRate: results[0].exchange_value,
                lastUpdate: results[0].updated_at,
              });
            } else {
              return Promise.reject(ErrorFactory('CAN_NOT_REGISTER_USAGE_DATA'));
            }
          } else {
            return Promise.reject(ErrorFactory('CURRENCY_CODE_NOT_FOUND'));
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