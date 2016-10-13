var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '120.26.51.70',
    port     : 3307,
    user     : 'gpyun',
    password : 'gupyun123456',
    database : 'shares'
});

connection.connect(function(err) {
    if (err) {
        console.error('sql connect 【error】!!!! ' + err.stack);
        return;
    }
    console.log('sql connect 【success】 ' + connection.threadId);
});


module.exports = connection;