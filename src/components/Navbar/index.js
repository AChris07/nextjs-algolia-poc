import Image from 'next/image'
import Autocomplete from '@/components/Autocomplete'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </a>

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
