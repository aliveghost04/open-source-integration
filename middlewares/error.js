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
  },
  'CAN_NOT_REGISTER_USAGE_DATA': {
    message: 'Can not registed usage data. Please contact administrator',
    status: 500
  },
  'MISSING_SERVICE_NAME': {
    message: 'Missing service name in url parameter',
    status: 400
  },
  'INFLATION_INVALID_DATE_FORMAT': {
    message: 'Invalid inflation date format, the correct one is "yyyymm"',
    status: 422
  },
  'SERVICE_NOT_FOUND': {
    message: 'Can not found stadistics for the especified service name',
    status: 404
  },
  'INFLATION_RATE_NOT_FOUND': {
    message: 'Can not found inflation rate for the especified date',
    status: 404
  },
  'CREDIT_HISTORY_NOT_FOUND': {
    message: 'Can not found credit history for the especified cedula/rnc',
    status: 404
  },
  'CLIENT_NOT_FOUND': {
    message: 'Can not found client for the especified cedula/rnc',
    status: 404
  }
};

module.exports = (error) => {
  let err;

  if (errors[error]) {
    err = new Error(error);
    err = Object.assign(err, errors[error]);
    err.name = `E_${error}`;
  } else {
    err = new Error('SERVER_ERROR');
    err = Object.assign(err, errors['SERVER_ERROR']);
    err.name = 'E_SERVER_ERROR';
  }

  return err;
};