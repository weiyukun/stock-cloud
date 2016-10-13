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
                    }
                    resolve([false]);
                });
            }
        });
    }
};

module.exports = cloudDao;
