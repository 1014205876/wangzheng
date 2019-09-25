var express = require('express')
var proxy = require('http-proxy-middleware');
var multer = require('multer');
const ConnectCas = require('connect-cas2');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);
const path = require('path');
const app = express();
const server = app.listen(3300);

var fileUtils = require('./upload/fileUtils');

var proxyConfig = proxy({
    target: 'http://192.168.111.217:8040',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
    pathRewrite: {
        '^/api': '' // remove base path
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        console.log(123)
        proxyReq.setHeader('AUTH_ID', '3316dc67-2517-46f5-958d-1cd46d4eab58');//217获客平台
        proxyReq.setHeader('AUTH_USER', encodeURI('admin'));
    }
});
app.use('/api', proxyConfig)
let uploadSingle = multer({ dest: 'upload/' });

app.post('/upload', uploadSingle.single('file'), function (req, res) {
    console.log(456)
    // 文件信息
    if (!req.file) {
        res.send(req.error);
        return;
    }
    var file = req.file;
    // 腾讯云
    // fileUtils.putObject(file.path, file.originalname, file.size, function (err, result) {
    //     if (err) {
    //         res.send(500, 'upload fail!');
    //     }
    //     else {
    //         res.send({ location: 'http://' + result.Location, name: file.originalname });
    //     }
    // });
    // 阿里云
    fileUtils(file.originalname, file.path, function (code, result) {
        if (code == 200) {
            res.send({
                code: 200,
                location: result.url,
                name: result.name,
                data: result
            });
        } else {
            res.send({
                code: 500,
                reason: result
            });
        }
    });

});



//静态页面的入口文件夹
app.use(express.static(path.join(__dirname, 'dist')));
//登出cas
// app.get('/logout', casClient.logout());

//把路由交给angular管理
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})
