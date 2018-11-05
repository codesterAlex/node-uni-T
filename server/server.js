const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');
var {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New User connected');

socket.on('join',(params, callback)=>{
  if(!isRealString(params.name)|| !isRealString(params.room)){
    return callback('Name and room are required.');
  }

  socket.join(params.room);
  users.removeUser(socket.id);
  users.addUser(socket.id, params.name,params.room);


  io.to(params.room).emit('updateUserList',users.getUserList(params.room));




  //socket.leave('The Office Fans');

  //io.emit -> io.to('The Office Fans').emit
  //Socket.broadcast.emit-> socket.broadcast.to('The office Fans').emit

  socket.emit('newMessage',generateMessage('admin', 'welcome to chat app'));
  socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} has joined room joined ${params.room}`));

  callback();
});


socket.on('createMessage',(newMessage,callback)=>{
  var user = users.getUser(socket.id);

  if(user && isRealString(newMessage.text))
  {
      io.to(user.room).emit('newMessage',generateMessage(user.name, newMessage.text));
  }

  callback();
});

  socket.on('createLocationMessage',(coords)=>{
    var user = users.getUser(socket.id);

    if(user)
    {
          io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude, coords.longitude));
    }

  });

  socket.on('disconnect', ()=>{
    var user = users.removeUser(socket.id);

    if(user)
    {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} has left.`))
    }
  })
});





server.listen(port,()=>{
  console.log(`Server is started at PORT ${port}`);
})
