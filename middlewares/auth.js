'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const ErrorFactory = require('./error');

module.exports = {
  requireAuthentication(req, res, next) {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ').pop();

      jwt.verify(
        token,
        config.jwt.secret,
        config.jwt.options,
        (err, decoded) => {
          if (err) return next(err);

          req.user = decoded.user;
          next();
        }
      );
    } else {
      next(ErrorFactory('FORBIDDEN'));
    }
  }
};