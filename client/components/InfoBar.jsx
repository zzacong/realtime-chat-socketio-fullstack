import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/InfoBar.module.css'

export default function InfoBar({ room }) {
  return (
    <div className={styles.infoBar}>
      <div className={styles.leftInnerContainer}>
        <Image src="/onlineIcon.png" alt="online icon" width={6} height={6} />
        <h3 style={{ marginLeft: '6%' }}>{room}</h3>
      </div>
      <div className={styles.rightInnerContainer}>
        <Link href="/">
          <a>
            <Image
              src="/closeIcon.png"
              alt="close icon"
              width={10}
              height={10}
            />
          </a>
        </Link>
      </div>
    </div>
  )
}
