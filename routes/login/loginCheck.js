const mySql = require('../../lib/mysqldb')
let db = new mySql()

function loginCheck() {
  this.check = function (account, password) {
    if (account === '123' && password === '123') {
        let project = {account: account, password: password};
        let results;
        let connection = db.connection();
        db.insert(connection, project, function(bool) {
          results = bool;
          console.log(results);
          db.close(connection);
          return results;
        });
    }
    else
      return 'false'
  }
}
module.exports = loginCheck;
