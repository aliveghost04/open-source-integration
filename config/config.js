'use strict';

let config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'pass',
    database: process.env.DB_NAME || 'database',
    port: process.env.DB_PORT || 3306,
    connectionLimit: process.env.DB_CONLIMIT || 10
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    options: {
      algorithm: process.env.JWT_ALGO || 'HS256',
      expiresIn: process.env.JWT_EXPIRE || '1h'
    }
  },
  app: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    defaultRoute: process.env.DEFAULT_ROUTE || '/api',
    salt: process.env.SALT || 'secure_salt'
  },
  cors: {
    origin: process.env.CORS || 'localhost'
  }
};

module.exports = config;