'use strict';
var mongoose = require('mongoose');
var MessageORM = require('./bin/ReactChatORM');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var _ = require('lodash');
var crypto = require('crypto');

app.use(express.static(path.join(__dirname, 'src')))

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

app.get('/', nocache, (req, res) => {
  res.sendFile('index.html')
})

//io.set('origins', 'http://localhost:8080');


var connectedClients = [];
var messagesHistory = [];
//setup the messages history
MessageORM.find({}).then(function(docs){
  messagesHistory = docs
}).catch(err=>{
  console.error(err);
})



io.sockets.on('connection', function(socket) {

  console.log('New incoming connection from', socket.handshake.address);

  socket.emit('update-clients', connectedClients)
  socket.emit('request-history', messagesHistory)
  socket.on('first-message', function(email){
    let emailHash = crypto.createHash('md5').update(email).digest('hex');
    connectedClients.push({
      id: socket.id,
      email: email,
      gravatar: "https://secure.gravatar.com/avatar/"+emailHash
    });
    io.emit('update-clients', connectedClients)

  })
  //console.log(connectedClientsEmails.length);

  socket.on('send-message', data => {
    messagesHistory.push(data);

    let _message = new MessageORM({
      email: data.email,
      message: data.message
    })

    let promis = _message.save()
      .then(function(elem){
        //console.log('enregistré!')
        socket.broadcast.emit('receive-message', data)
      }).catch(function(err){
        socket.emit('error-message', err)
      })
  })

  socket.on('disconnect', function() {
    _.remove(connectedClients, function(client){
      return client.id == socket.id;
    })
  })
})


http.listen(3000, function(){
  console.log('Listening!');
})
