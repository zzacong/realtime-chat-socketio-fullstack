import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { router } from './router'

const app = express()
app.use(router)

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

io.on('connection', socket => {
  console.log('--- We have a new connection!! ---')

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room)
    // const error = true
    // if (error) callback({ error: 'error' })
  })

  socket.on('disconnect', () => {
    console.log('--- User have left ---')
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
)
