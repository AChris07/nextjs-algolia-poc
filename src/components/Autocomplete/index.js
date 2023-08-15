'use client'
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { createElement, Fragment, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { searchClient } from '@/utils/algolia';
import qs from 'qs';

import '@algolia/autocomplete-theme-classic';

function redirectToSearchUrl(query, path = window.location.pathname) {
  if (!query?.length) return;

  const queryParams = qs.stringify({ query }, { addQueryPrefix: true });

  window.location.href = `${path}${queryParams}`;
}

export default function Autocomplete({ searchUrl, ...props }) {
  /**
   * The Algolia Autocomplete component (used for autocomplete searchbars for
   * site-wide searchbar use cases) dynamically adds the required behavior and markup
   * to a given ref/node.
   */
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    /**
     * On render or on props change, call the autocomplete widget to be rendered
     * in the parent's ref.
     */
    const search = autocomplete({
      // The container node, we pass the container ref
      container: containerRef.current,
      // Pass the render callbacks to be used. The callbacks passed hitsPerPage
      // depends on the framework being used (React, Preact, Angular, etc.).
      // Use these for React.
      renderer: { createElement, Fragment, render: () => {} },
      // Function to render the autocomplete, allows you to customize the render function.
      // We add nodes to refs here, if we want to use them.
      // Not required.
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      // On submit callback. We add support to redirect with search page with
      // query params.
      onSubmit: ({ state }) => redirectToSearchUrl(state.query, searchUrl),
      // On select callback. Same as above.
      onSelect: ({ item }) => redirectToSearchUrl(item.name, searchUrl),
      // Required, configures the sources you want to get collections from.
      getSources: ({ query }) => [
        {
          sourceId: 'products',
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
                  query,
                  params: {
                    hitsPerPage: 5,
                  },
                },
              ],
            });
          },
          // The Autocomplete component supports templating to customize
          // hits and other elements.
          templates: {
            noResults() {
              return 'No results'
            },
            item({ item, components, html }) {
              return html`<div className="aa-ItemWrapper">
                <div className="aa-ItemContent">
                  <div className="aa-ItemIcon aa-ItemIcon--alignTop">
                    <img
                      src="${item.image}"
                      alt="${item.name}"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                      ${components.Highlight({
                        hit: item,
                        attribute: 'name',
                      })}
                    </div>
                    <div className="aa-ItemContentDescription">
                      ${components.Snippet({
                        hit: item,
                        attribute: 'description',
                      })}
                    </div>
                  </div>
                </div>
              </div>`;
            },
          },
        },
      ],
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [searchUrl, props]);

  return <div ref={containerRef} />;
}
