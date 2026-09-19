import { useEffect, useRef, useState } from 'react'
import { assignAvatars, getVisitorTracker } from './visitorTracking'
import frankBlonde from './assets/visitors/frank-blonde.webp'
import frankProfile from './assets/visitors/frank-profile.webp'
import frankPortrait from './assets/visitors/frank-portrait.webp'
import frankHeadphones from './assets/visitors/frank-headphones.webp'
import './VisitorActivity.css'

const portraits = [frankBlonde, frankProfile, frankPortrait, frankHeadphones]
const number = new Intl.NumberFormat('en-US')

function timeAgo(value) {
  const minutes = Math.max(0, Math.floor((Date.now() - Date.parse(value)) / 60000))
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
  return `${Math.floor(minutes / 1440)}d ago`
}

function Avatar({ index }) {
  return <span className="visitor-avatar"><img src={portraits[index]} alt="" width="40" height="40" /></span>
}

export default function VisitorActivity() {
  const [stats, setStats] = useState(null)
  const [failed, setFailed] = useState(false)
  const [open, setOpen] = useState(false)
  const container = useRef(null)
  const trigger = useRef(null)

  useEffect(() => {
    let active = true
    let busy = false
    const tracker = getVisitorTracker()
    const update = async (refresh = false) => {
      if (busy) return
      busy = true
      try {
        const next = await (refresh ? tracker.refresh() : tracker.record())
        if (active) { setStats(next); setFailed(false) }
      } catch {
        if (active) setFailed(true)
      } finally { busy = false }
    }
    void update()
    const refresh = () => { if (!document.hidden) void update(true) }
    const interval = window.setInterval(refresh, 60000)
    document.addEventListener('visibilitychange', refresh)
    window.addEventListener('online', refresh)
    return () => {
      active = false
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', refresh)
      window.removeEventListener('online', refresh)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const dismiss = (event) => {
      if (!container.current?.contains(event.target)) setOpen(false)
    }
    const escape = (event) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus({ preventScroll: true }) }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('focusin', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('focusin', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  const recent = assignAvatars(stats?.recent || [])
  const label = stats
    ? `${number.format(stats.views)} ${stats.views === 1 ? 'view' : 'views'}`
    : failed ? 'Views unavailable' : 'Counting views…'

  return (
    <div className="visitor-activity" ref={container}>
      <button
        className="visitor-trigger"
        type="button"
        ref={trigger}
        aria-expanded={open}
        aria-controls="recent-visitors"
        aria-label={`${label}${stats?.source === 'local' ? ' in this browser' : ''}. Show recent visitors`}
        onClick={() => setOpen((value) => !value)}
      >
        {recent.length > 0 && <span className="visitor-avatar-stack" aria-hidden="true">
          {recent.map((visitor) => <Avatar key={visitor.id} index={visitor.avatar} />)}
        </span>}
        <span className="visitor-count">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span aria-live="polite" aria-atomic="true">{label}</span>
          {stats?.source === 'local' && <span className="visitor-local-label">· this browser</span>}
        </span>
      </button>
      <section className="visitor-panel" id="recent-visitors" aria-label="Recent visitors" hidden={!open}>
        <div className="visitor-panel-heading">
          <strong>Recent visitors</strong>
          <span>{stats ? `${number.format(stats.visitors)} ${stats.visitors === 1 ? 'visitor' : 'visitors'}` : '—'}</span>
        </div>
        {recent.length > 0 && <ul className="visitor-list">
          {recent.map((visitor) => (
            <li key={visitor.id}>
              <Avatar index={visitor.avatar} />
              <span>{visitor.id === 'You' ? 'You' : `Visitor ${visitor.id.padStart(4, '0')}`}<small>Anonymous visitor</small></span>
              <time dateTime={visitor.lastSeen} title={new Date(visitor.lastSeen).toLocaleString()}>{timeAgo(visitor.lastSeen)}</time>
            </li>
          ))}
        </ul>}
        <p className="visitor-note">
          {failed ? 'Visitor activity is temporarily unavailable. Trying again shortly.'
            : !stats ? 'Loading visitor activity…'
              : stats.source === 'local' ? 'Showing visits from this browser only.'
                : 'A little company along the way. Thanks for stopping by.'}
        </p>
      </section>
    </div>
  )
}
