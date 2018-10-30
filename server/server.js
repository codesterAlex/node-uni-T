const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New User connected');

socket.emit('newMessage',generateMessage('admin', 'welcome to chat app'));

socket.broadcast.emit('newMessage',generateMessage('admin','New user joined'));

socket.on('createMessage',(newMessage,callback)=>{
  console.log('Created message: ', newMessage);
  io.emit('newMessage',generateMessage(newMessage.from, newMessage.text));
  callback('This is message from server');
})


  socket.on('disconnect', ()=>{
    console.log('User is disconnected');
  })
});





server.listen(port,()=>{
  console.log(`Server is started at PORT ${port}`);
})
