'use strict';

const router = require('express').Router();

router.use('/exchange-rate', require('./exchange-rate'));

module.exports = router;