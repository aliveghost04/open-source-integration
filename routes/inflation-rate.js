'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const InflationRateController = require('../controllers/inflation-rate');

router
  .route('/:date?')
  .get((req, res, next) => {
    const model = req._database;
    const inflationRateController = InflationRateController(model);

    if (req.params.date) {
      let date = Number(req.params.date);
      if (Number.isNaN(date) || req.params.date.length !== 6) {
        next(ErrorFactory('INFLATION_INVALID_DATE_FORMAT'));
        return;
      }

      let [, year, month] = /^(\d{4})(\d{2})$/.exec(req.params.date);

      return inflationRateController
        .get(
          year,
          month,
          req.user.id,
          req.ip
        )
        .then((inflationRate) => {
          res.json(inflationRate);
        })
        .catch(next);
    } else {
      next(ErrorFactory('INFLATION_INVALID_DATE_FORMAT'));
    }
  })
  .all((req, res, next) => {
    next(ErrorFactory('NOT_IMPLEMENTED'));
  });

module.exports = router;