const express = require('express');
const socket = require('socket.io');

const app = express();
app.use(express.static(__dirname+'/public'));
const server = app.listen(4000, function(){
    console.log('Server starting!');
});

let io = socket(server);
io.on('connection', function(socket){
    socket.on('chat',function(data){
        io.sockets.emit('chat',data)
    });

    socket.on('writing',function(data){
        socket.broadcast.emit('writing',data);
    });
});