var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('chat');
});

//An event listener to listen for client connecting to our server
io.on('connection', function(socket) {
  console.log('NEW connection');
   //Step 1: Listen for a new chat message
  socket.on('chat message', function(msg) {
      //Task 2 - Step 2: Emit new chat message to all clients currently connected
      io.emit('chat message', msg);
  })

  socket.on('disconnect', function() {
      console.log('User has disconnected');
  });
});


module.exports = router;
