'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const ExchangeRateModel = require('../controllers/exchange-rate');
const UsageDataModel = require('../controllers/usage-data');
const Model = require('../models/');

router
  .route('/:currencyCode?')
  .get((req, res, next) => {
    if (req.params.currencyCode) {
      let _connection;
      return Model
        .getConnection()
        .then((connection) => {
          _connection = connection;
          return Model
            .beginTransaction(connection);
        })
        .then(() => {
          return Promise.all([
            ExchangeRateModel
              .get(req.params.currencyCode),
            // TODO: Change for real userID
            UsageDataModel
              .register(1, req.ip)
          ])
        })
        .then(([ exchangeRate ]) => {
          return Model
            .commit(_connection);
        })
        .then(() => {
          _connection.release();
          res.json(exchangeRate);
        })
        .catch((err) => {
          if (_connection) {
            return Model
              .rollback(_connection)
              .then(() => {
                next(err);
              });
          } else {
            next(err);
          }

        });
    } else {
      next(ErrorFactory('MISSING_CURRENCY_CODE'));
    }
  })
  .all((req, res, next) => {
    next(ErrorFactory('NOT_IMPLEMENTED'));
  });

module.exports = router;