var http = require('http');
var express = require('express');
const path = require('path');

const linsen = 3300;
const app = express();
const server = app.listen(linsen);
var router = express.Router();

router.get('*', (req, res) => {
    console.log(123)
    // res.send({
    //     success: "成功",
    //     data: '返回' // 权限数据
    // })
})

//静态页面的入口文件夹
app.use(express.static(path.join(__dirname, 'dist')));
//登出cas
// app.get('/logout', casClient.logout());

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