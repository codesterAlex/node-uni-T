var socket = io();

socket.on('connect',function(){
  console.log('Connected to the server');

});



// socket.on('newEmail', function(email){
//   console.log('New email',email);
// });


socket.on('disconnect',function(){
  console.log('Disconnected to the server.');
});

socket.on('newMessage',function(message){
  console.log('Message From server ',message);

  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'Daemon',
    text:jQuery('[name=message]').val()
  }, function(){

  })

})
