var sqlUtils = require('./sql-utils.js');
var Promise = require('bluebird');

var cloudDao = {
    //校验openId是否正确
    checkUserIsExist: function (openId) {
        return new Promise(function (resolve, reject) {
            if (!openId) {
                resolve([false]);
            } else {
                var sql = "SELECT * FROM mobile_user WHERE openId = ?";
                var params = [openId];

                sqlUtils.query(sql, params, function (err, rows, fields) {
                    if (!err && rows.length > 0) {
                        resolve([true, rows[0]]);
                    } else {
                        resolve([false]);
                    }
                });
            }
        });
    },

    //查询某用户订阅的股票以及条件
    queryUserStockInfo: function (openId) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT *, count(szLabel) AS 'ruleCount' FROM rule_info WHERE user_openid = ? GROUP BY szLabel";
            var params = [openId];

            sqlUtils.query(sql, params, function (err, rows, fields) {
                if (!err) {
                    resolve(rows);
                } else {
                    reject(err);
                }
            });
        });
    },

    //查询广告信息
    queryAdInfo: function () {
        return new Promise(function (resolve, reject) {
            var sql = 'SELECT * FROM ad_info WHERE state = ?'
            var params = [true];

            sqlUtils.query(sql, params, function (err, rows, fields) {
                if (!err) {
                    if(rows.length > 0){
                        resolve(rows[0]);
                    }else{
                        resolve(null);
                    }
                } else {
                    reject(err);
                }
            });

        });
    }, 
    
    //查询某用户的某股票的设置条件
    queryRules: function (openId, stockLabel) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM rule_info WHERE user_openid = ? and szLabel = ?";
            var params = [openId, stockLabel];

            sqlUtils.query(sql, params, function (err, rows, fields) {
                if (!err) {
                    resolve(rows);
                } else {
                    reject(err);
                }
            });
        });
    }


};

module.exports = cloudDao;
