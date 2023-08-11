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
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const search = autocomplete({
      container: containerRef.current,
      placeholder: 'Search for products',
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      onSubmit: ({ state }) => redirectToSearchUrl(state.query, searchUrl),
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
          onSelect: ({ item }) => redirectToSearchUrl(item.name, searchUrl),
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
