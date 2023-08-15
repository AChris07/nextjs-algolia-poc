import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
      <main className="container-fluid">
        <div className="row justify-content-md-center">
          <div className={`col col-md-6 ${styles.description}`}>
            <p>
              Get started by editing&nbsp;
              <code className={styles.code}>src/app/page.js</code>
            </p>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
      </main>
  )
}
