'use client'
import { InstantSearch } from 'react-instantsearch'
import { history } from 'instantsearch.js/es/lib/routers';
import { searchClient } from '@/utils/algolia'

export default function App({ children }) {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX
  /**
   * This object can be passed to the InstantSearch provider to configure routing (permalinks).
   * Passing 'true' implements the default routing configuration, but we can also pass how we want
   * the search state to map to which query params.
   */
  const routing = {
    router: history(),
    stateMapping: {
      // Defines which query params to update when the search state changes
      stateToRoute(uiState) {
        const indexUiState = uiState[indexName];
        return {
          query: indexUiState.query,
          categories: indexUiState.menu?.categories,
          brand: indexUiState.refinementList?.brand,
          page: indexUiState.page,
        };
      },
      // Defines how to set the state when a page with a given query param is loaded
      routeToState(routeState) {
        return {
          [indexName]: {
            query: routeState.query,
            menu: {
              categories: routeState.categories,
            },
            refinementList: {
              brand: routeState.brand,
            },
            page: routeState.page,
          },
        };
      },
    },
  };

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName} routing={routing}>
      {children}
    </InstantSearch>
  )
}
