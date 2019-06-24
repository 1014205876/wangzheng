var http = require('http');
var express = require('express');
var url = require('url');
var formidable = require('formidable');
const path = require('path');

const linsen = 3300;
const app = express();
var router = express.Router();

let data = [];

app.listen(linsen);

app.use('/api',
    router.get('/get', (req, res) => {
        var data=url.parse(req.url,true).query; 
        res.send({
            code: 200,
            data: data
        })
    }),
    router.post('/login', (req, res) => {
        var form = new formidable.IncomingForm(req.url);
        form.parse(req, function (err, data, files) {
            if (err) {
                res.send({
                    code: 400,
                    data: '',
                    reason:err
                })
            } else {
                res.send({
                    code: 200,
                    data: data
                })
            }
        })
    })
)


//静态页面的入口文件夹
app.use(express.static(path.join(__dirname, 'dist')));

// app.post('/api/login', function (req, res) {
//     var form = new formidable.IncomingForm(req.url);
//     form.parse(req, function (err, fields, files) {
//         if (err) {
//             res.send({
//                 code: 400,
//                 data: '',
//                 reason:err
//             })
//         } else {
//             res.send({
//                 code: 200,
//                 data: fields
//             })
//         }
//     })
// })
//把路由交给angular管理
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

// http.createServer(function (request, response) {
//     // // 发送 HTTP 头部 
//     // // HTTP 状态值: 200 : OK
//     // // 内容类型: text/plain
//     // response.writeHead(200, { 'Content-Type': 'text/plain' });
//     // response.end('Hello World\n');
//     response.sendFile(path.join(__dirname + '/dist/index.html'));
// }).listen(linsen);
console.log('服务器开启正常,打开' + linsen + '查看')
console.log(__dirname);//此文件所在的目录