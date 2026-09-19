import assert from 'node:assert/strict'
import test from 'node:test'
import { assignAvatars, createVisitorTracker, validateStats } from '../src/visitorTracking.js'

const visitorId = '12345678-1234-4123-8123-123456789abc'
const viewId = '87654321-1234-4123-8123-123456789abc'
const stats = { views: 9, visitors: 2, recent: [{ id: '1', avatar: 0, lastSeen: '2026-09-19T10:00:00Z' }] }
function memoryStorage() {
  const values = new Map()
  return { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) }
}

test('one page load counts once across repeated mounts and refreshes', async () => {
  const tracker = createVisitorTracker({ storage: memoryStorage(), uuid: () => visitorId })
  const [first, second] = await Promise.all([tracker.record(), tracker.record()])
  assert.equal(first.views, 1)
  assert.deepEqual(first, second)
  assert.equal((await tracker.refresh()).views, 1)
  assert.equal(first.source, 'local')
  assert.equal(first.recent.length, 1)
})

test('new page loads increase local views while keeping the same avatar', async () => {
  const storage = memoryStorage()
  const first = await createVisitorTracker({ storage, uuid: () => visitorId }).record()
  const second = await createVisitorTracker({ storage, uuid: () => viewId }).record()
  assert.equal(second.views, 2)
  assert.equal(second.visitors, 1)
  assert.equal(second.recent[0].avatar, first.recent[0].avatar)
})

test('blocked or corrupt storage does not break tracking', async () => {
  for (const storage of [
    { getItem() { throw Error('blocked') }, setItem() { throw Error('blocked') } },
    { getItem: () => '{broken', setItem() {} },
    { getItem: () => '{"id":"bad-id","views":-40}', setItem() {} },
  ]) {
    const result = await createVisitorTracker({ storage, uuid: () => visitorId }).record()
    assert.equal(result.views, 1)
    assert.equal(result.visitors, 1)
  }
})

test('shared tracking reuses identity, deduplicates calls, and refreshes without writes', async () => {
  const calls = []
  const ids = [visitorId, viewId]
  const tracker = createVisitorTracker({
    url: 'https://example.supabase.co/', key: 'public-key', storage: memoryStorage(),
    uuid: () => ids.shift(),
    fetcher: async (url, options) => { calls.push({ url, options }); return { ok: true, json: async () => stats } },
  })
  await Promise.all([tracker.record(), tracker.record()])
  assert.equal(calls.length, 1)
  assert.deepEqual(JSON.parse(calls[0].options.body), { p_visitor_id: visitorId, p_view_id: viewId })
  assert.equal(calls[0].options.headers.apikey, 'public-key')
  assert.equal((await tracker.refresh()).source, 'shared')
  assert.equal(calls.length, 2)
  assert.ok(calls[1].url.endsWith('/rpc/get_portfolio_visitors'))
})

test('failed requests retry the same page-view ID, without fabricating local totals', async () => {
  const ids = [visitorId, viewId]
  const requests = []
  const tracker = createVisitorTracker({
    url: 'https://example.supabase.co', key: 'public-key', storage: memoryStorage(),
    uuid: () => ids.shift(),
    fetcher: async (_url, options) => {
      requests.push(options.body)
      return { ok: requests.length > 1, json: async () => stats }
    },
  })
  await assert.rejects(tracker.record())
  assert.equal((await tracker.record()).source, 'shared')
  assert.equal(requests[0], requests[1])
})

test('malformed shared statistics are rejected', () => {
  for (const value of [null, {}, { ...stats, views: -1 }, { ...stats, visitors: 10 },
    { ...stats, recent: [{ ...stats.recent[0], lastSeen: 'invalid' }] },
    { ...stats, recent: [{ ...stats.recent[0], avatar: 4 }] },
    { ...stats, recent: [stats.recent[0], stats.recent[0]] },
  ]) assert.throws(() => validateStats(value))
  assert.deepEqual(validateStats(stats), stats)
})

test('four recent visitors always have different portraits', () => {
  const visitors = Array.from({ length: 4 }, (_, i) => ({ id: String(i), avatar: 1 }))
  const assigned = assignAvatars(visitors)
  assert.equal(new Set(assigned.map((visitor) => visitor.avatar)).size, 4)
  assert.deepEqual(visitors.map((visitor) => visitor.avatar), [1, 1, 1, 1])
})
