'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const UsageDataController = require('../controllers/usage-data');

router
  .route('/:name?')
  .get((req, res, next) => {
    const model = req._database;
    const usageDataController = UsageDataController(model);

    if (req.params.name) {
      return usageDataController
        .get(
          req.params.name,
          req.query.from,
          req.query.to,
          req.user.id,
          req.ip
        )
        .then((usageData) => {
          res.json(usageData);
        })
        .catch(next);
    } else {
      next(ErrorFactory('MISSING_SERVICE_NAME'));
    }
  })
  .all((req, res, next) => {
    next(ErrorFactory('NOT_IMPLEMENTED'));
  });

module.exports = router;