import React, { useEffect, useState } from 'react'
import Promise from 'promise-polyfill'
import { loadResource } from '../../../../utils/front/resources'
import { useDeferredSetter } from '../../../../utils/front/useStateHelpers'

import * as styles from './styles.module.css'

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    docsearch?: (opts: Record<string, unknown>) => void
  }
}

const SearchForm: React.FC = props => {
  const [searchAvailable, setSearchAvailable] = useState<boolean>(false)
  const deferredSetSearchAvailable = useDeferredSetter(setSearchAvailable)
  useEffect(() => {
    if (window) {
      if (!window.docsearch) {
        Promise.all([
          loadResource(
            'https://cdn.jsdelivr.net/npm/docsearch.js@2.6.2/dist/cdn/docsearch.min.css'
          ),
          loadResource(
            'https://cdn.jsdelivr.net/npm/docsearch.js@2.6.2/dist/cdn/docsearch.min.js'
          )
        ]).then(() => {
          if (window.docsearch) {
            window.docsearch({
              apiKey: '755929839e113a981f481601c4f52082',
              indexName: 'dvc',
              inputSelector: '#doc-search',
              debug: false // Set to `true` if you want to inspect the dropdown
            })
            deferredSetSearchAvailable(true)
          }
        })
      } else {
        window.docsearch({
          apiKey: '755929839e113a981f481601c4f52082',
          indexName: 'dvc',
          inputSelector: '#doc-search',
          debug: false // Set to `true` if you want to inspect the dropdown
        })
        deferredSetSearchAvailable(true)
      }
    }
  }, [deferredSetSearchAvailable])

  return (
    <div className={styles.searchArea}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          id="doc-search"
          placeholder="Search docs"
          disabled={!searchAvailable}
          {...props}
        />
      </div>
    </div>
  )
}

export default SearchForm
