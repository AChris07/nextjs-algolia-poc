'use client'
import { InstantSearch } from 'react-instantsearch'
import { history } from 'instantsearch.js/es/lib/routers';
import { searchClient } from '@/utils/algolia'

export default function App({ children }) {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX
  const routing = {
    router: history(),
    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState[indexName];
        return {
          query: indexUiState.query,
          categories: indexUiState.menu?.categories,
          brand: indexUiState.refinementList?.brand,
          page: indexUiState.page,
        };
      },
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
