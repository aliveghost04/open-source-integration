'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const FinancialHealthController = require('../controllers/financial-health');

router
  .route('/:cedulaRnc')
  .get((req, res, next) => {
    const model = req._database;
    const financialHealthController = FinancialHealthController(model);

    if (req.params.cedulaRnc) {
      return financialHealthController.get(
        req.params.cedulaRnc,
        req.user.id,
        req.ip
      )
      .then((financialHealth) => {
        res.json(financialHealth);
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