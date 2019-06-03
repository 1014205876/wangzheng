/**
 * Module dependencies.
 */
var express = require('express')
var proxy = require('http-proxy-middleware');
var multer = require('multer');
const ConnectCas = require('connect-cas2');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);
const path = require('path');
const app = express();
const server = app.listen(3300);

var fileUtils = require('./fileUtils');


app.use(session({
    name: 'NSESSIONID',
    secret: 'Hello I am a long long long secret',
    resave: true,//添加这行
    saveUninitialized: true,//添加这行
    store: new MemoryStore()  // or other session store
}));

const casClient = new ConnectCas({
    ignore: [
        /\/ignore/
    ],
    match: [],
    servicePrefix: 'http://localhost:4200',
    serverPath: 'http://192.168.111.216:8080',
    paths: {
        validate: '/cas/validate',
        serviceValidate: '/cas/serviceValidate',
        // proxy: '/cas/proxy',
        login: '/cas/login',
        logout: '/cas/logout',
        proxyCallback: ''
    },
    redirect: false,
    gateway: false,
    renew: false,
    slo: true,
    cache: {
        enable: false,
        ttl: 5 * 60 * 1000,
        filter: []
    },
    fromAjax: {
        header: 'x-client-ajax',
        status: 418
    }
});

// app.use(casClient.core());


/**
 * Add the proxy to express
 */
var proxyConfig = proxy({
    target: 'http://192.168.111.217:8040',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
    pathRewrite: {
        '^/api': '' // remove base path
    },
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        console.log(123);
        // proxyReq.setHeader('AUTH_ID', '97a78cc5-2e92-42b8-9a7a-de4a6ad5a3b8');//资源
        // proxyReq.setHeader('AUTH_ID', '3645399f-615a-42f8-89ef-b3caa55a5d44');//进件pc端
        // proxyReq.setHeader('AUTH_ID', '3645399f-615a-42f8-89ef-b3caa55a5d44');//进件H5，无
        // proxyReq.setHeader('AUTH_ID', '6c3a7833-16a1-42fb-905f-4e94b8985b79');//流程pc端
        // proxyReq.setHeader('AUTH_ID', '97a78cc5-2e92-42b8-9a7a-de4a6ad5a3b8');//流程H5，无
        // proxyReq.setHeader('AUTH_ID', '4ab559f0-c372-4d13-b401-3df488d642df');//规则PC端
        proxyReq.setHeader('AUTH_ID', '3316dc67-2517-46f5-958d-1cd46d4eab58');//217获客平台
        // proxyReq.setHeader('AUTH_ID', '97a78cc5-2e92-42b8-9a7a-de4a6ad5a3b8');//217资源平台
        proxyReq.setHeader('AUTH_USER', encodeURI('admin'));
        // proxyReq.setHeader('AUTH_USER', encodeURI('shenlinyun'));//切换流程账号
    }
});
app.use('/api', proxyConfig)
/**
 * Configure proxy middleware
 */


/**
 * 单文件上传
 */
let uploadSingle = multer({ dest: 'upload/' });

app.post('/upload', uploadSingle.single('file'), function (req, res) {
    console.log(req);
    // 文件信息
    if (!req.file) {
        console.log(req.error);
        res.send(req.error);
        return;
    }
    var file = req.file;
    fileUtils.putObject(file.path, file.originalname, file.size, function (err, result) {
        if (err) {
            res.send(500, 'upload fail!');
        }
        else {
            res.send({ location: 'http://' + result.Location, name: file.originalname });
        }
    });
});
// app.put('/upload',uploadSingle.single('file'),function(req,res){
// 	console.log(req);

// 	// 文件信息
//     if(!req.file){
//         console.log(req.error);
//         res.send(req.error);
//         return;
//     }
//     var file = req.file;
//     fileUtils.putObject(file.path,file.originalname,file.size,function(err,result){
//         if(err){
//             res.send(500,'upload fail!');
//         }
//         else{
//             res.send({location:'http://'+result.Location,name:file.originalname});
//         }
//     });
// });



//静态页面的入口文件夹
app.use(express.static(path.join(__dirname, 'dist')));
//登出cas
// app.get('/logout', casClient.logout());

//把路由交给angular管理
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

// console.log('[DEMO] Server: listening on port 4200')
