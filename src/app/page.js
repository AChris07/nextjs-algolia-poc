import Image from 'next/image'
import styles from './page.module.css'
import App from '@/components/App'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <App>
      <main className="container-fluid">
        <Navbar />
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
    </App>
  )
}
