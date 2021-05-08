const socket = io.connect('http://localhost:4000', { transport : ['websocket'] });

let message = document.getElementById('message');
let head = document.getElementById('head');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

btn.addEventListener('click',function(){
    socket.emit('chat',{
        message : message.value,
        head : head.value
    });
    message.value = '';
});

socket.on('chat',function(data){
    output.innerHTML += '<p><strong>'+data.head+'</strong> '+data.message+'</p>';
    feedback.innerHTML = '';
});

message.addEventListener('keypress',function(){
    socket.emit('writing',head.value);
});

socket.on('writing',function(data){
    feedback.innerHTML = '<p><em>'+data+' writing...</em> '+data.message+'</p>';
});
