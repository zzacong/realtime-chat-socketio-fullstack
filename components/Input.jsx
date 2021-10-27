import React from 'react'
import styles from '../styles/Input.module.css'

export default function Input({ message, setMessage, sendMessage }) {
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && sendMessage(e)}
      />
      <button className={styles.sendButton} onClick={e => sendMessage(e)}>
        Send
      </button>
    </form>
  )
}
