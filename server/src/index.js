import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { config as dotenv } from 'dotenv'

import { router } from './router'
import { addUser, removeUser, getUser, getUsersInRoom } from './user'

if (process.env.NODE_ENV !== 'production') dotenv()
const app = express()
const server = createServer(app)

app.use(router)

let allowedOrigins = process.env.ALLOWED_ORIGINS
allowedOrigins = allowedOrigins?.includes?.(',')
  ? allowedOrigins.split(',')
  : allowedOrigins ?? 'http://localhost:3000'

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://realtime-chat-socketio-client.vercel.app',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

io.on('connection', socket => {
  console.log('--- We have a new connection!! ---')
  console.log('Socket id: ', socket.id)

  socket.on('join', ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    console.log(`${user.name} has joined`)

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    })

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` })

    socket.join(user.room)

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    if (!user) return callback()

    console.log(`${user.name}: `, message)

    io.to(user.room).emit('message', { user: user.name, text: message })
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      console.log('--- User have left ---')
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      })
    }
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
)
