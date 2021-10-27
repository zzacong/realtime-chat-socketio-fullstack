import Image from 'next/image'
import styles from '../styles/TextContainer.module.css'

export default function TextContainer({ users }) {
  return (
    <div className={styles.textContainer}>
      <div>
        <h1>
          Realtime Chat Application{' '}
          <span role="img" aria-label="emoji">
            💬
          </span>
        </h1>
        <h3>
          Created with Next.js, Express, Node and Socket.io{' '}
          <span role="img" aria-label="emoji">
            ❤️
          </span>
        </h3>
        <h3>
          Try it out right now!{' '}
          <span role="img" aria-label="emoji">
            ⬅️
          </span>
        </h3>
      </div>
      {users && (
        <div>
          <h2>People currently chatting:</h2>
          <div className={styles.activeContainer}>
            <ul className={styles.list}>
              {users.map(({ name }) => (
                <li key={name} className={styles.activeItem}>
                  <h3>{name}</h3>
                  <Image
                    src="/onlineIcon.png"
                    alt="Online Icon"
                    width={8}
                    height={8}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
