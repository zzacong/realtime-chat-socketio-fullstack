import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import io from 'socket.io-client'

let socket

export default function Chat() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const { query } = useRouter()
  const ENDPOINT = 'http://localhost:5000'

  useEffect(() => {
    const { name, room } = query

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, ({ error }) => {
      if (error) alert(error)
    })

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [ENDPOINT, query])

  return <div>Chat</div>
}
