'use strict';

const mysql = require('mysql');

module.exports = function UsageDataModel(Model) {
  return {
    register(user, ip, requestedService) {
      return Model
        .query(
          `INSERT INTO usage_data (user, ip, requested_service, access_date)
          VALUES (?, ?, ?, NOW())`,
          [
            user,
            ip,
            requestedService
          ]
        );
    },
    get(user, from, to, limit = 250) {
      return Model
        .getConnection()
        .then((connection) => {
          
          let fromDate = from || mysql.raw('DATE_SUB(CURDATE(), INTERVAL 3 MONTH)');
          let toDate = to || mysql.raw('CURDATE()');

          if (user) {
            return Model
              .query(
                `SELECT u.user, ud.requested_service, ud.access_date
                FROM usage_data ud
                INNER JOIN users u
                  ON u.id = ud.user
                WHERE (
                    ud.user = ?
                    OR u.fullname = ?
                  )
                  AND DATE(access_date) >= ?
                  AND DATE(access_date) <= ?
                ORDER BY access_date DESC
                LIMIT ?`,
                [
                  user,
                  user,
                  fromDate,
                  toDate,
                  limit
                ]
              );
          } else {
            return Model
              .query(
                `SELECT u.user, ud.ip, ud.requested_service, ud.access_date
                FROM usage_data ud
                INNER JOIN users u
                  ON u.id = ud.user
                WHERE DATE(access_date) >= ?
                  AND DATE(access_date) <= ?
                ORDER BY access_date DESC
                LIMIT ?`,
                [
                  fromDate,
                  toDate,
                  limit
                ]
              );
          }
        });
    }
  };
}