const STORAGE_KEY = 'portfolio:visitor:v1'
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function validateStats(data) {
  if (!data || !Number.isSafeInteger(data.views) || data.views < 0 ||
      !Number.isSafeInteger(data.visitors) || data.visitors < 0 || data.visitors > data.views ||
      !Array.isArray(data.recent) || data.recent.length > 4) {
    throw new Error('Invalid visitor statistics')
  }
  const ids = new Set()
  for (const visitor of data.recent) {
    if (typeof visitor.id !== 'string' || !visitor.id || ids.has(visitor.id) ||
        !Number.isInteger(visitor.avatar) || visitor.avatar < 0 || visitor.avatar > 3 ||
        typeof visitor.lastSeen !== 'string' || !Number.isFinite(Date.parse(visitor.lastSeen))) {
      throw new Error('Invalid recent visitor')
    }
    ids.add(visitor.id)
  }
  return data
}

// Each tracker lives for one page load. Sharing the promise prevents React StrictMode,
// theme changes, polling, and retries from registering the same view twice.
export function createVisitorTracker({ url, key, storage, fetcher = fetch, uuid = () => crypto.randomUUID() } = {}) {
  let visitPromise
  let identity
  let pageViewId
  let localStats
  const configured = Boolean(url && key)

  function getIdentity() {
    if (identity) return identity
    let saved
    try { saved = JSON.parse(storage?.getItem(STORAGE_KEY) || 'null') } catch { /* Storage may be disabled. */ }
    identity = {
      id: UUID.test(saved?.id) ? saved.id : uuid(),
      views: Number.isSafeInteger(saved?.views) && saved.views >= 0 ? saved.views : 0,
    }
    return identity
  }

  function saveIdentity() {
    try { storage?.setItem(STORAGE_KEY, JSON.stringify(identity)) } catch { /* Keep an in-memory identity. */ }
  }

  async function rpc(name, body) {
    const response = await fetcher(`${url.replace(/\/$/, '')}/rest/v1/rpc/${name}`, {
      method: 'POST',
      headers: { apikey: key, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    })
    if (!response.ok) throw new Error('Visitor statistics are unavailable')
    return { ...validateStats(await response.json()), source: 'shared' }
  }

  async function record() {
    const visitor = getIdentity()
    saveIdentity()
    if (configured) {
      pageViewId ||= uuid()
      return rpc('record_portfolio_view', { p_visitor_id: visitor.id, p_view_id: pageViewId })
    }
    if (!localStats) {
      visitor.views += 1
      saveIdentity()
      localStats = {
        views: visitor.views,
        visitors: 1,
        recent: [{ id: 'You', avatar: parseInt(visitor.id.slice(0, 8), 16) % 4, lastSeen: new Date().toISOString() }],
        source: 'local',
      }
    }
    return localStats
  }

  return {
    record() {
      visitPromise ||= record().catch((error) => {
        visitPromise = undefined
        throw error
      })
      return visitPromise
    },
    async refresh() {
      await this.record()
      return configured ? rpc('get_portfolio_visitors', {}) : localStats
    },
  }
}

let tracker
export function getVisitorTracker() {
  if (!tracker) {
    let storage
    try { storage = window.localStorage } catch { /* Browser storage is optional. */ }
    tracker = createVisitorTracker({
      url: import.meta.env.VITE_SUPABASE_URL,
      key: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      storage,
    })
  }
  return tracker
}

// Keep the four displayed portraits distinct, even if visitors share a preferred image.
export function assignAvatars(visitors) {
  const used = new Set()
  return visitors.map((visitor) => {
    let avatar = visitor.avatar
    while (used.has(avatar)) avatar = (avatar + 1) % 4
    used.add(avatar)
    return { ...visitor, avatar }
  })
}
