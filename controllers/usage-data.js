'use strict';

const query = require('../models');
const ErrorFactory = require('../middlewares/error');

module.exports = {
  register(user, ip) {
    return query(
      `INSERT INTO usage_data (user, ip, access_date)
      VALUES (?, ?, NOW())`,
      [
        user,
        ip
      ]
    )
    .then((results) => {
      if (results.insertedRows === 1) {
        return Promise.resolve();
      } else {
        return Promise.reject(ErrorFactory('CAN_NOT_REGISTER_USAGE_DATA'));
      }
    });
  }
};