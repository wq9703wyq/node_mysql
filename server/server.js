const express = require('express');
const session = require('express-session');
const config = require('../config/default');
const path = require('path');
const loginApi = require('../routes/api/api');
const app = express();

app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    }
}))
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, '../public/img'), // 上传文件目录
    keepExtensions: true// 保留后缀
}))
app.use('/user', loginApi);
app.listen(8081, function(req, res) {
  console.log('app is running at 8081')
});
