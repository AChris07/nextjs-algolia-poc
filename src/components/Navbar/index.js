import Image from 'next/image'
import Autocomplete from '@/components/Autocomplete'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/search">Search</a>
            </li>
          </ul>
        </div>

        <div className="flex-grow-0">
          <Autocomplete
            searchUrl='/search'
            openOnFocus={true}
            placeholder='Search for products'
          /> 
        </div>
      </div>
    </nav>
  )
}
