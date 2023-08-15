'use client'
import { SearchBox, Hits, RefinementList, Pagination, Configure } from "react-instantsearch"
import Hit from "./Hit"
import styles from './SearchResults.module.css'
import 'instantsearch.css/themes/algolia.css'

export default function SearchResults() {
  return (
    <section className="row row-gap-2 mt-3">
      <Configure hitsPerPage={40} />
      <SearchBox classNames={{ input: styles.searchboxInput }} />
      <RefinementList attribute="brand" classNames={{ root: 'col-12 col-xl-2', list: styles.refinementList }}/>
      <Hits hitComponent={Hit} classNames={{ root: 'col-12 col-xl-10', item: styles.hitsItem }} />
    <Pagination classNames={{ item: styles.paginationItem }} />
    </section>
  )
}
