'use client'
import { InstantSearch } from 'react-instantsearch'
import { searchClient } from '@/utils/algolia'

export default function App({ children }) {
  return (
    <InstantSearch searchClient={searchClient} indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX}>
      {children}
    </InstantSearch>
  )
}
