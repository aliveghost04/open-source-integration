'use strict';

const UsageDataModel = require('../models/usage-data');
const ErrorFactory = require('../middlewares/error');

module.exports = function UsageDataController(Model) {
  const usageDataModel = UsageDataModel(Model);

  return {
    get(user, from, to, userId, clientIp) {
      return Model
        .beginTransaction()
        .then(() => {
          return Promise.all([
            usageDataModel
              .get(user, from, to),
            usageDataModel
              .register(userId, clientIp, 'usage-data')
          ]);
        })
        .then((data) => {
          return Model
            .commit()
            .then(() => Promise.resolve(data));
        })
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
        })
        .catch((err) => {
          return Model
            .rollback()
            .then(() => {
              return Promise.reject(err);
            });
        });
    }
  };
}