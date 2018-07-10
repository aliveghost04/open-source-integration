'use strict';

const UsageDataModel = require('../models/usage-data');
const ErrorFactory = require('../middlewares/error');

module.exports = function UsageDataController(Model) {
  return {
    get(user, from, to, userId, clientIp) {
      const usageDataModel = UsageDataModel(Model);
      let _usageData;

      return Promise.all([
        usageDataModel
          .get(user, from, to),
        usageDataModel
          .register(userId, clientIp, 'usage-data')
      ])
      .then(([ usageData, insert ]) => {
        if (usageData.length > 0) {
          if (insert.affectedRows === 1) {
            return Promise.resolve(usageData);
          } else {
            return Promise.reject(ErrorFactory('CAN_NOT_REGISTER_USAGE_DATA'));
          }
        } else {
          return Promise.reject(ErrorFactory('SERVICE_NOT_FOUND'));
        }
      });
    }
  };
}