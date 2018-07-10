'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const UsageDataController = require('../controllers/usage-data');

router
  .route('/:name?')
  .get((req, res, next) => {
    const model = req._database;
    const usageDataController = UsageDataController(model);
    let _usageData;

    if (req.params.name) {
      return model
        .beginTransaction()
        .then(() => {
          return usageDataController
            .get(
              req.params.name,
              req.query.from,
              req.query.to,
              req.user.id,
              req.ip
            );
        })
        .then((usageData) => {
          _usageData = usageData;

          return model
            .commit();
        })
        .then(() => {
          res.json(_usageData);
        })
        .catch((err) => {
          model
            .rollback()
            .then(() => next(err))
            .catch(next);
        });
    } else {
      next(ErrorFactory('MISSING_SERVICE_NAME'));
    }
  })
  .all((req, res, next) => {
    next(ErrorFactory('NOT_IMPLEMENTED'));
  });

module.exports = router;