'use strict';

const Model = require('../models');
const ErrorFactory = require('../middlewares/error');

module.exports = {
  register(user, ip) {
    return Model
      .getConnection()
      .then((connection) => {
        
      }).query(
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
  },
  get(user, from, to) {
    let sql = `SELECT user, ip, access_date
    FROM usage_data 
    WHERE user like '%?%'
      and access_data >= ?
      and access_data <= ?`;
  }
};