'use strict';

const ErrorFactory = require('./error');

module.exports = (app) => {
  app.use((req, res, next) => {
    next(ErrorFactory('NOT_FOUND'));
  });

  app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500);

    let error = {};
    Object.keys(err).forEach((key) => {
      error[key] = err[key];
    });
    error['message'] = err.message;

    res.json(error);
  });
};