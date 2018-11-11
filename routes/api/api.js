var express = require('express')
const router = express.Router()
const mySql = require('../../lib/mysqldb')
let db = new mySql()
const check = require('../../middlewares/check')

router.get('/loginCheck', check.checkNotLogin, function (req, res) {
  let connection = db.connection();
  let account = req.query.account;
  let password = req.query.passWord;
  let paras = {account: account, password: password}
  db.baseSql('search', 'user').searchExtra('acc', {account: account}).sqlQuery(connection)
      .then((result) => {
    if (result.length > 0) {
        res.json({result: '账号重复'});
    } else {
        db.baseSql('insert', 'user', paras).sqlQuery(connection)
            .then((bool) => {
                if (bool) {
                    req.session.user = account;
                }
                res.json({result: req.session.user});
            })
    }
  });
  db.close(connection);
});

router.post('/fileUpload', function (req, res) {
    console.log(req.files)
})

module.exports = router;
