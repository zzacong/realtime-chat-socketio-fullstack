import React from 'react'
import styles from '../styles/Messages.module.css'
import Message from './Message'

export default function Messages({ messages, name }) {
  return (
    <div className={styles.messages}>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  )
}
