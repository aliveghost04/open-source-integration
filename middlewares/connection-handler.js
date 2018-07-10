'use strict';

const getConnection = require('../models/connection');
const Model = require('../models');

module.exports = function connectionHandler(req, res, next) {
  getConnection()
    .then((connection) => {
      req._database = Model(connection);
      next();
    })
    .catch(next)

  res.on('finish', () => {
    req
      ._database
      .getConnection()
      .then(connection => connection.release())
      .catch(console.error)
  });
}