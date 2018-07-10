'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const CreditHistoryController = require('../controllers/credit-history');

router
  .route('/:cedulaRnc')
  .get((req, res, next) => {
    const model = req._database;
    const creditHistoryController = CreditHistoryController(model);
    let _creditHistory;

    if (req.params.cedulaRnc) {
      return model
        .beginTransaction()
        .then(() => {
          return creditHistoryController.get(
            req.params.cedulaRnc,
            req.user.id,
            req.ip
          );
        })
        .then((creditHistory) => {
          _creditHistory = creditHistory;

          return model
            .commit();
        })
        .then(() => {
          res.json(_creditHistory);
        })
        .catch((err) => {
          model
            .rollback()
            .then(() => next(err))
            .catch(next);
        });
    } else {
      next(ErrorFactory('MISSING_CURRENCY_CODE'));
    }
  })
  .all((req, res, next) => {
    next(ErrorFactory('NOT_IMPLEMENTED'));
  });

module.exports = router;