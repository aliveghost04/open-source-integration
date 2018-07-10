'use strict';

const InflationRateModel = require('../models/inflation-rate');
const UsageDataModel = require('../models/usage-data');
const ErrorFactory = require('../middlewares/error');

module.exports = function InflationRateController(model) {
  const inflationRateModel = InflationRateModel(model);
  const usageDataModel = UsageDataModel(model);

  return { 
    get(year, month, userId, clientIp) {
      return Promise.all([
        inflationRateModel
          .get(year, month),
        usageDataModel
          .register(userId, clientIp, 'inflation-rate')
      ])
      .then(([ results, insert ]) => {
        if (results.length === 1) {
          if (insert.affectedRows === 1) {
            return Promise.resolve({
              inflationRate: results[0].value,
              month: results[0].month,
              year: results[0].year,
              createdAt: results[0].created_at
            });
          } else {
            return Promise.reject(ErrorFactory('CAN_NOT_REGISTER_USAGE_DATA'));
          }
        } else {
          return Promise.reject(ErrorFactory('INFLATION_RATE_NOT_FOUND'));
        }
      });
    }
  };
};