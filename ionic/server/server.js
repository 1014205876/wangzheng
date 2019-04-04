const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken'); // 使用jwt签名
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MemoryStore = require('session-memory-store')(session);
const proxy = require('http-proxy-middleware');
const app = express();
const http = require('http');
// const qs = require('querystring');
// const server = app.listen(3200);
const server = app.listen(process.env.NODE_PORT);

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.post('/api/auth/login', function (appReq, res) {
    
    userInfos = appReq.body
    var content = JSON.stringify(userInfos);
    var options = {
        hostname: "192.168.111.217", //服务器id
        port: "8040", //服务器端口号
        // hostname: process.env.ZUUL_HOST,  //服务器id
        // port: process.env.ZUUL_PORT,    //服务器端口号
        path: '/kalanchoe-app/v2/app/pre/user',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'AUTH_USER': appReq.body.mobile
        }
    };

    var req;
    req = http.request(options, function (e) {
        e.setEncoding('utf8');
        e.on('data', function (user) {
            user = JSON.parse(user);
            if (user.code == "200") {
                var token = jwt.sign({
                    mobile: appReq.body.mobile
                }, 'zhonggao', {
                        expiresIn: 60 * 60 * 24
                    });
                res.json({
                    "code": "200",
                    "reason": "",
                    "result": {
                        "token": token
                    }
                });
            } else {
                res.json(user)
            }
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(content);

    req.end();

})

app.all('/api\*', function (req, res) {
    // let appId = process.env.AUTH_ID;
    
    // let token = req.headers.cookie
    // let arr = token.split(';')
    // let account = arr[0].split('=')
    // token = account[1]
    let token = req.headers.Authorization || req.headers.authorization
    let auth_user = ''
    if (token) {
        jwt.verify(token, 'zhonggao', (error, decode) => {
            if (error) auth_user = ''
            else auth_user = decode.mobile
        })
    }

    let superagent = require('superagent');
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=UTF-8'
    });
    let path = req.path.replace('/api', '');
    // let url = "192.168.111.217:8040" + path;
    let url = process.env.ZUUL_URL + path;
    console.log('Authorization', req.headers.Authorization)
    console.log('authorization', req.headers.authorization)
    var sreq;
    if (req.method == 'GET') {
        sreq = superagent.get(url);
        sreq
            .query(req.query);
    } else if (req.method == 'HEAD') {
        sreq = superagent.head(url);
        sreq
            .query(req.query)
    } else if (req.method == 'POST') {
        sreq = superagent.post(url);
        sreq
            .send(req.body);
    } else if (req.method == 'PUT') {
        sreq = superagent.put(url);
        sreq
            .send(req.body);
    } else if (req.method == 'PATCH') {
        sreq = superagent.patch(url);
        sreq
            .send(req.body);
    } else if (req.method == 'DELETE') {
        sreq = superagent.delete(url);
        sreq
            .send(req.body);
    }
    sreq
        .set('AUTH_USER', auth_user)
        .pipe(res)
        .on('end', function () {
            console.log(`请求${path}已完成！`);
        });
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})