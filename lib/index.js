"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _socket = require("socket.io");

var _router = require("./router");

var _user = require("./user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var server = (0, _http.createServer)(app);
app.use(_router.router);
var io = new _socket.Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});
io.on('connection', function (socket) {
  console.log('--- We have a new connection!! ---');
  console.log('Socket id: ', socket.id);
  socket.on('join', function (_ref, callback) {
    var name = _ref.name,
        room = _ref.room;

    var _addUser = (0, _user.addUser)({
      id: socket.id,
      name: name,
      room: room
    }),
        user = _addUser.user,
        error = _addUser.error;

    if (error) return callback(error);
    console.log("".concat(user.name, " has joined"));
    socket.emit('message', {
      user: 'admin',
      text: "".concat(user.name, ", welcome to the room ").concat(user.room)
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: "".concat(user.name, " has joined!")
    });
    socket.join(user.room);
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: (0, _user.getUsersInRoom)(user.room)
    });
    callback();
  });
  socket.on('sendMessage', function (message, callback) {
    var user = (0, _user.getUser)(socket.id);
    if (!user) return callback();
    console.log("".concat(user.name, ": "), message);
    io.to(user.room).emit('message', {
      user: user.name,
      text: message
    });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: (0, _user.getUsersInRoom)(user.room)
    });
    callback();
  });
  socket.on('disconnect', function () {
    var user = (0, _user.removeUser)(socket.id);

    if (user) {
      console.log('--- User have left ---');
      io.to(user.room).emit('message', {
        user: 'admin',
        text: "".concat(user.name, " has left.")
      });
    }
  });
});
var PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
  return console.log("Server is listening on http://localhost:".concat(PORT));
});