import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === 'object') {
        return item.name ?? item.username ?? item.id ?? item._id ?? JSON.stringify(item)
      }
      return item
    }).join(', ')
  }
  if (typeof value === 'object') {
    return value.name ?? value.username ?? value.id ?? value._id ?? JSON.stringify(value)
  }
  return value
}

export default function CollectionPage({ resource, endpoint, title, description, columns }) {
  const [collection, setCollection] = useState({ items: [], count: 0 })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, controller.signal)
      .then(setCollection)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [resource, endpoint, reloadCount])

  return (
    <section className="collection-page" aria-labelledby="collection-title">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER <span> / </span> DIRECTORY</p>
          <h1 id="collection-title">{title}</h1>
          <p className="intro-copy">{description}</p>
        </div>
        <span className="collection-count">{loading ? 'Loading' : `${collection.count} records`}</span>
      </div>

      <div className="collection-sheet">
        {loading && <p className="collection-message" role="status">Loading {title.toLowerCase()}…</p>}
        {!loading && error && (
          <div className="collection-message collection-error" role="alert">
            <span>Could not load {title.toLowerCase()}: {error}</span>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => {
                setLoading(true)
                setError('')
                setReloadCount((count) => count + 1)
              }}
            >
              Try again
            </button>
          </div>
        )}
        {!loading && !error && collection.items.length === 0 && (
          <p className="collection-message">No {title.toLowerCase()} found.</p>
        )}
        {!loading && !error && collection.items.length > 0 && (
          <div className="table-responsive">
            <table className="table collection-table mb-0">
              <thead>
                <tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {collection.items.map((item, index) => (
                  <tr key={item.id ?? item._id ?? `${resource}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.key}>{formatValue(item[column.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}