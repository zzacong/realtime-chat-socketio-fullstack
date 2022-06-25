import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import styles from '../styles/Chat.module.css'
import InfoBar from '../components/InfoBar'
import Input from '../components/Input'
import Messages from '../components/Messages'
import TextContainer from '../components/TextContainer'

let socket

export default function Chat() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const router = useRouter()

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:5001')

    const { name, room } = router.query
    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, error => {
      if (error) {
        alert(error)
        router.push('/')
      }
    })

    socket.on('connect', () => {
      console.log(`Connected on ${socket.id}`)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected')
    })

    socket.on('message', message => {
      console.log(message)
      setMessages(prev => [...prev, message])
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })

    return () => {
      socket.disconnect()
    }
  }, [router.query])

  const sendMessage = e => {
    e.preventDefault()
    if (message) socket.emit('sendMessage', message, () => setMessage(''))
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  )
}
