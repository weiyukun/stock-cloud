var fs = require('fs');
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
var app = express();
var port = 8001;
var pathes = __dirname.split(path.sep);
var rootPath = pathes.join(path.sep);
var expire_time = 10 * 24 * 60 * 60 * 1000;

app.use(express.static(pathes.join(path.sep)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.listen(port);
console.log('成功启动：http://localhost:' + port);

var testOpenId = 'od9sft-0BiK4GAAlPSZkO96R_dTU';

app.get('/', function (req, res) {
    console.log('===/');
    var openId = req.query.open_id;
    var expire_time = 10 * 24 * 60 * 60 * 1000;

    if (!openId) {
        openId = req.cookies['open_id'];
    } else {
        res.cookie("open_id", openId, {maxAge: expire_time});
    }

    if (!openId) {
        res.send('请从公众号进入');
        return;
    }

    res.redirect('/home')
});

//多一步跳转，用于隐藏openId
app.get('/home', function (req, res) {
    console.log('===main');
    var open_id = req.cookies['open_id'];
    if (!open_id) {
        res.send('请从公众号进入');
        return;
    }

    res.sendFile('/template/yun/index/index.html', {
        root: rootPath
    });
});



// ========================================= 接口配置 begin
(function () {
    var cloudDao = require('./server/cloud-dao');
    var userInfo = null;

    app.get('/u/data', function (req, res) {
        res.json(data);
    });

    var index = '/u/index';
    app.get('/u/index', function (req, res) {
        setTimeout(function () {
            res.json(data[index]);
        }, 500);
    });

    var pause = '/u/pause';
    app.get('/u/pause', function (req, res) {
        setTimeout(function () {
            res.json(data[pause]);
        }, 500);
    });

    var open = '/u/open';
    app.get('/u/open', function (req, res) {
        setTimeout(function () {
            res.json(data[open]);
        }, 500);
    });

    var del = '/u/del';
    app.get('/u/del', function (req, res) {
        setTimeout(function () {
            res.json(data[del]);
        }, 500);
    });

    var add = '/u/add';
    app.get('/u/add', function (req, res) {
        setTimeout(function () {
            res.json(data[add]);
        }, 500);
    });

    var search = '/u/search';
    app.get('/u/search', function (req, res) {
        setTimeout(function () {
            res.json(data[search]);
        }, 500);
    });

    var setting = '/u/setting';
    app.get('/u/setting', function (req, res) {
        setTimeout(function () {
            res.json(data[setting]);
        }, 500);
    });

    var settingSubmit = '/u/setting/submit';
    app.get('/u/setting/submit', function (req, res) {
        setTimeout(function () {
            res.json(data[settingSubmit]);
        }, 500);
    });

    //用户进入页面后，校验openId是否正确
    app.get('/u/authQuery', function (req, res) {
        console.log('===auth query');
        var openId = req.cookies['openId'];
        cloudDao.checkUserIsExist(openId).then(function (resp) {
            if(resp[0]){
                userInfo = resp[1];
            }
            res.send(resp[0]);
        });
    })
})();