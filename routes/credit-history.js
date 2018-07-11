'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const CreditHistoryController = require('../controllers/credit-history');

router
  .route('/:cedulaRnc')
  .get((req, res, next) => {
    const model = req._database;
    const creditHistoryController = CreditHistoryController(model);

    if (req.params.cedulaRnc) {
      return creditHistoryController.get(
        req.params.cedulaRnc,
        req.user.id,
        req.ip
      )
      .then((creditHistory) => {
        res.json(creditHistory);
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