function readCollection(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, count: payload.length }
  }

  if (!payload || typeof payload !== 'object') {
    return { items: [], count: 0 }
  }

  for (const key of ['results', 'data', 'items', 'records']) {
    const value = payload[key]
    if (Array.isArray(value)) {
      return { items: value, count: payload.count ?? payload.total ?? value.length }
    }
    if (value && typeof value === 'object') {
      const nested = readCollection(value)
      const hasCollectionShape = ['count', 'total', 'results', 'data', 'items', 'records']
        .some((nestedKey) => nestedKey in value)
      if (nested.items.length > 0 || hasCollectionShape) {
        return {
          items: nested.items,
          count: payload.count ?? payload.total ?? nested.count,
        }
      }
    }
  }

  return { items: [], count: payload.count ?? payload.total ?? 0 }
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }

  return readCollection(await response.json())
}