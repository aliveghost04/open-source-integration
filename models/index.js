'use strict';

const config = require('../config');
const mysql = require('mysql');

const pool = mysql.createPool(config.database);

const methods = {
  getConnection() {
    return new Promise((res, rej) => {
      pool
        .getConnection((err, connection) => {
          if (err) return rej(err);

          res(connection)
        });
    });
  },
  query(connection, query, data) {
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
  },
  beginTransaction(connection) {
    return new Promise((res, rej) => {
      connection.beginTransaction((err) => {
        if (err) return rej(err);

        res();
      });
    });
  },
  commit(connection) {
    return new Promise((res, rej) => {
      connection.commit((err) => {
        if (err) {
          methods
            .rollback(connection)
            .then(() => {
              return rej(err);
            })
            .catch(rej);
        }

        res();
      });
    });
  },
  rollback(connection) {
    return new Promise((res, rej) => {
      connection.rollback(() => {
        res();
      });
    });
  }
};

module.exports = methods;