'use strict';

const config = require('../config');
const mysql = require('mysql');

const pool = mysql.createPool(config.database);

module.exports = function getConnection() {
  return new Promise((res, rej) => {
    pool
      .getConnection((err, connection) => {
        if (err) return rej(err);

        res(connection)
      });
  });
}