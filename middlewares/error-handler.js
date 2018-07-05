'use strict';

const ErrorFactory = require('./error');

module.exports = (app) => {
  app.use((req, res, next) => {
    next(ErrorFactory('NOT_FOUND'));
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    
    console.error(err);

    res.json(err);
  });
};