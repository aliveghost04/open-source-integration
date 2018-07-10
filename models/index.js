'use strict';

module.exports = function Model(connection) {
  let methods = {
    getConnection() {
      return Promise.resolve(connection);
    },
    query(query, data) {
      return new Promise((res, rej) => {
        connection
          .query(
            query,
            data,
            (err, results) => {
              if (err) return rej(err);

              res(results);
            }
          );
      });
    },
    beginTransaction() {
      return new Promise((res, rej) => {
        connection.beginTransaction((err) => {
          if (err) return rej(err);

          res();
        });
      });
    },
    commit() {
      return new Promise((res, rej) => {
        connection.commit((err) => {
          if (err) {
            methods
              .rollback(connection)
              .then(() => {
                return rej(err);
              })
              .catch(rej);
          }

          res();
        });
      });
    },
    rollback() {
      return new Promise((res, rej) => {
        connection.rollback(() => {
          res();
        });
      });
    }
  };

  return methods;
}