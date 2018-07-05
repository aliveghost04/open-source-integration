'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const ExchangeRateModel = require('../controllers/exchange-rate');
const UsageDataModel = require('../controllers/usage-data');

router
  .route('/:currencyCode?')
  .get((req, res, next) => {
    if (req.params.currencyCode) {
      console.log(req.ip);
      return Promise.all([
        ExchangeRateModel
          .get(req.params.currencyCode),
        // TODO: Change for real userID
        UsageDataModel
          .register(1, req.ip)
      ])
      .then(([ exchangeRate ]) => {
        console.log();
        res.json(exchangeRate);
      })
      .catch(next)
    } else {
      next(ErrorFactory('MISSING_CURRENCY_CODE'));
    }
  })
  .all((req, res, next) => {
    next(ErrorFactory('NOT_IMPLEMENTED'));
  });

module.exports = router;