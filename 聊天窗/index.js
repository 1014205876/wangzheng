var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    console.log('get')
    res.sendfile('index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    //监听客户端的消息
    socket.on('message', function (msg) {
        console.log('message');
        io.sockets.emit("message",msg);
        // socket('group1').emit('message', '发给分组一');//给指定用户发送消息
        // socket('group2').emit('message', '发给分组二');//给指定用户发送消息
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});