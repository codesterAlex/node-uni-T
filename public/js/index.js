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

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery("<a target='_blank'>My Current Location</a>");

  li.text(`${message.from}: `);
  a.attr('href',message.url);

  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'Daemon',
    text:jQuery('[name=message]').val()
  }, function(){

  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){

  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  },function(){
    alert('Unable to fetch location.');
  });
})