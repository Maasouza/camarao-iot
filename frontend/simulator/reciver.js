var socket = require('socket.io-client')('http://localhost:8000');
function subscribeToTimer() {
  socket.on('message', data => console.log(data));
  socket.emit('subscribe', 1000);
}

subscribeToTimer()
