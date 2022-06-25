import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Join.module.css'

export default function Home() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div>
      <Head>
        <title>Realtime Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.joinOuterContainer}>
        <div className={styles.joinInnerContainer}>
          <h1 className={styles.heading}>Join</h1>
          <div>
            <input
              placeholder="Username"
              className={styles.joinInput}
              type="text"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Room"
              className={styles.joinInput}
              type="text"
              onChange={e => setRoom(e.target.value)}
            />
          </div>
          <Link
            href={{
              pathname: '/chat',
              query: { name, room },
            }}
          >
            <button
              onClick={e => (!name || !room) && e.preventDefault()}
              className={styles.button}
              type="submit"
            >
              Sign In
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}
