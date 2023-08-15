'use client'
import { SearchBox, Hits, RefinementList, Pagination, Configure } from "react-instantsearch"
import Hit from "./Hit"
import styles from './SearchResults.module.css'
// Algolia InstantSearch's components come unstyled to be customized,
// but we can also import pre-existing themes for faster development.
import 'instantsearch.css/themes/algolia.css'

export default function SearchResults() {
  /**
   * The elements to be rendered in the Search page. The Algolia InstantSearch includes
   * both customizable components, as used below, to cover most use cases. They can be customized
   * as needed. It also includes React hooks to access both the search state and API to implement
   * more complex use cases (automatic search triggering, completely custom components.)
   */
  return (
    <section className="row row-gap-2 mt-3">
      {/* Sets up search configuration */}
      <Configure hitsPerPage={40} />
      {/* Searchbox, does not support autocomplete, meant to be used inside a search page
        * to immediately update the search state.
        */}
      <SearchBox classNames={{ input: styles.searchboxInput }} />
      {/* Refinement List (ie. facets)*/}
      <RefinementList attribute="brand" classNames={{ root: 'col-12 col-xl-2', list: styles.refinementList }}/>
      {/* Hits, or results*/}
      <Hits hitComponent={Hit} classNames={{ root: 'col-12 col-xl-10', item: styles.hitsItem }} />
      {/* Pagination */}
      <Pagination classNames={{ item: styles.paginationItem }} />
    </section>
  )
}
