'use strict';

const router = require('express').Router();
const ErrorFactory = require('../middlewares/error');
const UsageDataController = require('../controllers/usage-data');

router
  .route('/')
  .get((req, res, next) => {
    const model = req._database;
    const usageDataController = UsageDataController(model);

    return usageDataController
      .get(
        req.query.name,
        req.query.from,
        req.query.to,
        req.user.id,
        req.ip
      )
      .then((usageData) => {
        res.json(usageData);
      })
      .catch(next);
  })
  .all((req, res, next) => {
    next(ErrorFactory('NOT_IMPLEMENTED'));
  });

module.exports = router;