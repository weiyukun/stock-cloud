/**
 * Created by wyk on 2016/10/14.
 * 用户每日更新股票列表
 */

var stockList = [];
var initStockList = function () {
    require('./cloud-dao').findAllStock()
        .then(function (data) {
            console.log(data);
            stockList = data;
        })
};


exports.initStockList = initStockList;
exports.stockList = stockList;
