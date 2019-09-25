let express = require('express')
let proxy = require('http-proxy-middleware');
let multer = require('multer');
const ConnectCas = require('connect-cas2');
const session = require('express-session');
let userArr = require('./json/user.json');
const MemoryStore = require('session-memory-store')(session);
const formidable = require('formidable');
const path = require('path');
const app = express();
const router = express.Router();
const server = app.listen(3300);

var fileUtils = require('./fileUtils');

var proxyConfig = proxy({//node代理转接
    target: 'http://jsonplaceholder.typicode.com',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
    pathRewrite: {
        '^/api': '' // remove base path
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        // proxyReq.setHeader('AUTH_ID', '3316dc67-2517-46f5-958d-1cd46d4eab58');//217获客平台
        // proxyReq.setHeader('AUTH_USER', encodeURI('admin'));
    }
});
app.use('/api', proxyConfig);

app.use('/node',
    router.post('/login', (req, res) => {//修改用户信息
        var form = new formidable.IncomingForm(req.url);
        form.parse(req, function (err, data, files) {
            if (err) {
                res.send({
                    code: 400,
                    data: '',
                    reason: err
                })
            } else {
                let has = false;
                userArr.forEach((item) => {
                    if (item.userName == data.userName) {
                        has = true;
                        if (item.password == data.password) {
                            res.send({
                                code: 200,
                                data: item,
                            })
                        } else {
                            res.send({
                                code: 404,
                                data: '',
                                reason: '密码错误'
                            })
                        }
                    }
                });
                if(has){
                    res.send({
                        code: 404,
                        data: '',
                        reason: '查无此人'
                    })
                }
            }
        })
    }),
    router.get('/user', (req, res) => {//查询所有已注册的用户
        var form = new formidable.IncomingForm(req.url);
        form.parse(req, function (err, data, files) {
            if (err) {
                res.send({
                    code: 400,
                    data: '',
                    reason: err
                })
            } else {
                res.send({
                    code: 200,
                    data: userArr,
                })
            }
        })
    }),
    router.post('/user', (req, res) => {//修改用户信息
        var form = new formidable.IncomingForm(req.url);
        form.parse(req, function (err, data, files) {
            userArr[0] = data;
            if (err) {
                res.send({
                    code: 400,
                    data: '',
                    reason: err
                })
            } else {
                res.send({
                    code: 200,
                    data: userArr,
                })
            }
        })
    }),
    router.post('/register', (req, res) => {//注册接口
        var form = new formidable.IncomingForm(req.url);
        form.parse(req, function (err, data, files) {
            userArr.push(data);
            if (err) {
                res.send({
                    code: 400,
                    data: '',
                    reason: err
                })
            } else {
                res.send({
                    code: 200,
                    data: userArr,
                })
            }
        })
    })
)

let uploadSingle = multer({ dest: 'upload/' });
app.post('/upload', uploadSingle.single('file'), function (req, res) {
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

//把路由交给angular管理
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})
