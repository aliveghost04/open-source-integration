'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const ExchangeRateController = require('../controllers/exchange-rate');

router
  .route('/:currencyCode?')
  .get((req, res, next) => {
    const model = req._database;
    const exchangeRateController = ExchangeRateController(model);

    if (req.params.currencyCode) {
      return exchangeRateController
        .get(
          req.params.currencyCode,
          req.user.id,
          req.ip
        )
        .then((exchangeRate) => {
          res.json(exchangeRate);
        })
        .catch(next);
    } else {
      next(ErrorFactory('MISSING_CURRENCY_CODE'));
    }
  })
  .all((req, res, next) => {
    next(ErrorFactory('NOT_IMPLEMENTED'));
  });

module.exports = router;