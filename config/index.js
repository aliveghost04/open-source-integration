'use strict';

try {
  module.exports = require('./config');
} catch (e) {
  console.error('** NO CONFIG FILE FOUND **');
  process.exit();
}