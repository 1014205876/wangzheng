var http = require('http');

const linsen=3000


http.createServer(function (request, response) {
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(linsen);
console.log('服务器开启正常,打开'+linsen+'查看')