'use strict';

const errors = {
  'NOT_FOUND': {
    message: 'Requested resource was not found',
    status: 404
  },
  'SERVER_ERROR': {
    message: 'An error has occurred. Please try again later or contact administrator',
    status: 500
  },
  'MISSING_CURRENCY_CODE': {
    message: 'Missing currency code in url parameter',
    status: 400
  },
  'NOT_IMPLEMENTED': {
    message: 'Method not implemented',
    status: 501
  },
  'CURRENCY_CODE_NOT_FOUND': {
    message: 'Currency code exchange rate not found',
    status: 404
  }
};

module.exports = (error) => {
  let err;

  if (errors[error]) {
    err = errors[error];
    err.name = `E_${error}`;
  } else {
    err = errors['SERVER_ERROR'];
    err.name = 'E_SERVER_ERROR';
  }

  return err;
};