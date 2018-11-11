function mysqldb() {
	const mysql = require('mysql');
	this.sqlSentence = '' // 数据库语句

    // 数据库连接
	this.connection = () => {
		let connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '123456',
			database: 'node_js',
			port: 3306
		});

		connection.connect((err) => {
			if (err) {
				console.log(err);
				return;
			}
		});
		return connection;
	}

	// 基础语句
    // search---查找
    // update---更新
    // delete---删除
    // insert---插入
    this.baseSql = (queryType, table, paras) => {
        switch (queryType) {
            case 'search':
                this.sqlSentence = this.searchSen(table)
                return this
                break
            case 'update':
                if (!paras) {
                    return false
                }
                this.sqlSentence = this.updateSen(table, paras)
                return this
                break
            case 'insert':
                if (!paras) {
                    return false
                }
                this.sqlSentence = this.insertSen(table, paras)
                return this
                break
            case 'delete':
                if (!paras) {
                    return false
                }
                this.sqlSentence = this.deleteSen(table)
                return this
                break
        }
    }

    // 选择where查找方式
    // acc-----精确查找
    // vague-----模糊查找
    // in-----集合查找
    this.searchExtra = (searchType, paras) => {
	    if (!searchType || !(searchType === 'acc' || 'vague' || 'in') || !paras || !this.sqlSentence) {
	        return false
        }
        if (searchType === 'acc') {
	        this.sqlSentence = this.accSearchSen(this.sqlSentence, paras)
            return this
        } else if (searchType === 'vague') {
	        this.sqlSentence = this.vagueSearchSen(this.sqlSentence, paras)
            return this
        } else if (searchType === 'in') {
	        this.sqlSentence = this.inSearchSen(this.sqlSentence, paras)
            return this
        }
    }

    // 分组排列
    this.groupExtra = (paras, having) => {
	    if (!paras || !this.sqlSentence) {
	        return false
        }
        this.sqlSentence = this.groupSearchSen(this.sqlSentence, paras, having)
        return this
    }

    // 限制行数
    this.limitExtra = (start, length) => {
	    if (!start || !length || !this.sqlSentence) {
	        return false
        }
        this.sqlSentence = this.limitSen(this.sqlSentence, start, length)
        return this
    }

    // 排序
    this.orderbyExtra = (order, paras) => {
	    if (!order || !paras || !this.sqlSentence) {
	        return false
        }
        this.sqlSentence = this.orderbySen(this.sqlSentence, order, paras)
        return this
    }

    // 语句执行
    this.sqlQuery = (connection, callback) => {
	    if (!this.sqlSentence) {
	        return false
        }
        let promise = new Promise((resolve) => {
            connection.query(this.sqlSentence, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                resolve(results);
            })
        })
        return promise
    }

    // 返回语句
    this.returnSql = () => {
	    return this.sqlSentence
    }

	// 基本查找
	this.searchSen = (table) => {
		return 'SELECT * FROM '+ table;
	}

	// 更新语句
	this.updateSen = (table, paras) => {
		let sql = 'UPDATE' + table + ' SET '
		let tempArray = []
		for (let i in paras) {
			tempArray.push(i + '=' + paras[i])
		}
        return sql + tempArray.join(' , ')
	}

	// 删除语句
	this.deleteSen = (table) => {
		return 'DELETE FROM' + table
	}

	// 插入语句
	this.insertSen = (table, paras) => {
		let sql = 'INSERT INTO' + table + ' SET '
		let tempArray = []
		for (let i in paras) {
			tempArray.push(i + '=' + paras[i])
		}
		return sql + tempArray.join(' , ')
	}

	// 精确查找
	this.accSearchSen = (originSql, paras) => {
		let sql = originSql
		let tempArray = []
		for (let i in paras) {
			tempArray.push(i + '=' + paras[i])
		}
		return sql = sql + ' WHERE ' + tempArray.join(' and ')
	}

	// 模糊查找
	this.vagueSearchSen = (originSql, paras) => {
		let sql = originSql
		let tempArray = []
		for (let i in paras) {
            tempArray.push(i + ' like "%' + paras[i] + '%"')
		}
		return (sql + ' WHERE ' + tempArray.join(' and '))
	}

	// 集合查询
	this.inSearchSen = (originSql, paras) => {
        let sql = originSql
        let tempArray = []
		let target
        for (let i in paras) {
        	target = i
            tempArray.push(paras[i])
        }
        return sql = sql + ' WHERE ' + target + ' in (' +tempArray.join(' and ') + ')';
	}

	// 分组查找
	this.groupSearchSen = (originSql, paras, having) => {
        let sql = originSql
        let tempArray = []
        for (let i in paras) {
            tempArray.push(paras[i])
        }
        sql = sql + ' GROUP BY ' + tempArray.join(' , ');
        if (!having) {
        	if (having === 'count' || 'sum' || 'avg' || 'max' || 'min') {
        		sql = sql + 'HAVING ' + having +'(*)'
			}
		}
        return sql;
	}

	// Limit操作
	this.limitSen = (originSql, start, length) => {
		return originSql + ' LIMIT ' + start + ',' + length
	}

	// 排序
	this.orderbySen = (originSql, order, paras) => {
		if (order === 'asc' || 'desc') {
		    let tempArray = []
            for (let i in paras) {
                tempArray.push(paras[i])
            }
			return originSql + ' ORDER BY ' + tempArray.join(' , ') + order
		}
		return originSql
	}

    // 关闭数据库
	this.close = (connection) => {
		connection.end((err) => {
			if (err) {
				return;
			} else {
				// console.log('关闭连接');
			}
		});
	}
}

module.exports = mysqldb;