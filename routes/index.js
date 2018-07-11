'use strict';

const router = require('express').Router();

router.use('/exchange-rate', require('./exchange-rate'));
router.use('/usage-data', require('./usage-data'));
router.use('/inflation-rate', require('./inflation-rate'));
router.use('/credit-history', require('./credit-history'));
router.use('/financial-health', require('./financial-health'));

module.exports = router;