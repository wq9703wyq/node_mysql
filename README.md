# node_mysql
个人封装node端Mysql语句<br>

准备
----
```javascript
npm install mysql -save
```
配置
-----
```javascript
confing(host, user, password, database, port)
```
>> 示例
```javascript
const mySql = require('/mysqldb') // 引用js文件
let db = new mySql() // 实例化
db.confing('localhost', 'root', '123456', 'node_js', '3306')
```
使用
------
```javascript
const mySql = require('/mysqldb') // 引用js文件
let db = new mySql() // 实例化
let connection = db.connection() // 创建连接
.
.
.
db.baseSql('search', 'user').searchExtra('acc', {account: '123'}).sqlQuery(connection) // 准确查找user表中'account'字段值为'123'的所有记录
      .then((result) => {
        console.log(result) // result为查找数组结果
      });
db.close(connection) // 关闭连接
```

##### 增删改查
```javascript
baseSql(queryType, table, paras)
```
>> 示例
```javascript
db.baseSql('search', 'user').sqlQuery(connection) // 查找user表所有记录
```
>> 参数

|名称|类型|可选参数|备注|必要
|---|---|---|---|---
|queryType|String|search--查找   update--更新   delete--删除   insert--插入|操作参数|必要
|table|String|无|表名|必要
|paras|Object|无|下标为字段名，值为内容,例如:{account: 'account'}|不必要（当更新或插入操作时必要）

##### 执行语句
```javascript
sqlQuery(connection)
```
>> 示例
```javascript
db.baseSql('search', 'user').sqlQuery(connection) // 查找user表所有记录
```
>> 参数

|名称|类型|可选参数|备注|必要
|---|---|---|---|---
|connection|Object|无|数据库连接|必要

##### 返回语句
>> 若想查看语句是否合规范，可用此方法直接返回定义好的sql语句
```javascript
returnSql()
```
>> 示例
```javascript
db.baseSql('search', 'user').returnSql()
```
##### 直接设置sql语句
```javascript
setsqlSentence(sqlSentence)
```
>> 示例
```javascript
db.setsqlSentence('SELECT * FROM user').sqlQuery(connection)
// 查找user表中的所有记录
```
>> 参数

|名称|类型|可选参数|备注|必要
|---|---|---|---|---
|sqlSentence|String|无|mysql语句|必要


##### where查找 // 集合查找未测试不推荐使用
```javascript
searchExtra(searchType, paras)
```
>> 示例
```javascript
db.baseSql('search', 'user').searchExtra('acc', {account: '123'}).sqlQuery(connection)
// 查找user表中account值为'123'的所有记录
```
>> 参数

|名称|类型|可选参数|备注|必要
|---|---|---|---|---
|searchType|String|acc--精确查找 vague--模糊查找 in--集合查找|查找方式|必要
|paras|Object|无|下标为字段名，值为内容,例如:{account: 'account'}|必要

##### group分组 // having功能还未实现
```javascript
groupExtra(paras)
```
>> 示例
```javascript
db.baseSql('search', 'user').groupExtra(['account']).sqlQuery(connection)
// 查找user表中所有记录并根据'account'字段分组
```
>> 参数

|名称|类型|可选参数|备注|必要
|---|---|---|---|---
|paras|Array|无|值为数据表字段名,例如:['account']|必要

##### limi限制行数
```javascript
limitExtra(start, length)
```
>> 示例
```javascript
db.baseSql('search', 'user').limitExtra(2, 4).sqlQuery(connection)
// 查找user表中第3条至第6条，4条记录
```
>> 参数

|名称|类型|可选参数|备注|必要
|---|---|---|---|---
|start|Num|无|开始下标,若输入'2'则从'3'开始|必要
|length|Num|无|选择行数|不必要

##### orderBy排序
```javascript
orderbyExtra(order, paras)
```
>> 示例
```javascript
db.baseSql('search', 'user').orderbyExtra('desc', ['account']).sqlQuery(connection)
// 查找user表所有记录并依照字段名'account'降序排序
```
>> 参数

|名称|类型|可选参数|备注|必要
|---|---|---|---|---
|order|String|asc--升序   desc--降序|排序|必要
|paras|Array|无|值为数据表字段名,例如:['account']|必要
