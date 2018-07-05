'use strict';

const config = require('../config');
const mysql = require('mysql');

const pool = mysql.createPool(config.database);

module.exports = function Query(query, data) {
  return new Promise((res, rej) => {
    pool
      .getConnection((err, connection) => {
        if (err) return rej(err);

        res(connection)
      });
  })
  .then((connection) => {
    return new Promise((res, rej) => {
      connection
        .query(
          query,
          data,
          (err, results) => {
            if (err) return rej(err);

            res(results);
          }
        );
    });
  });
};