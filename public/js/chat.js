var socket = io();


function scrollToBottom(){
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  //Height
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');

  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight =  newMessage.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+ lastMessageHeight >=scrollHeight)
  {
    messages.scrollTop(scrollHeight);
  }
}
socket.on('connect',function(){
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err)
    {
      alert(err);
      window.location.href="/";
    }
    else{
      console.log('No error');
    }
  })

});



// socket.on('newEmail', function(email){
//   console.log('New email',email);
// });


socket.on('disconnect',function(){
  console.log('Disconnected to the server.');
});

socket.on('updateUserList', function(users){
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage',function(message){
  var formattedTime  = moment(message.createdAt).format('h:mm: a');
  var templete = jQuery('#message-templete').html();
  var html = Mustache.render(templete,{
    text: message.text,
    from: message.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();


  // var formattedTime  = moment(message.createdAt).format('h:mm: a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){


  var formattedTime  = moment(message.createdAt).format('h:mm: a');
  var templete = jQuery('#location-message-templete').html();
  var html = Mustache.render(templete,{
    url: message.url,
    from: message.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();




  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // var a = jQuery("<a target='_blank'>My Current Location</a>");
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href',message.url);
  //
  // li.append(a);
  // jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage',{
    text:messageTextBox.val()
  }, function(){
    messageTextBox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){

  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  },function(){
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location');
  });
})
