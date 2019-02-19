var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(
        200,
        { 'Content-Type': 'text/plain' }
    );
    response.end('Hello World\n123');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://localhost:8888/');