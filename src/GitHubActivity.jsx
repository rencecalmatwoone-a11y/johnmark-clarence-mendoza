import { useEffect, useRef, useState } from 'react'
import './GitHubActivity.css'

const username = 'rencecalmatwoone-a11y'
const profileUrl = `https://github.com/${username}`
const monthFormat = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' })
const dayFormat = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const parseDate = (date) => new Date(`${date}T00:00:00Z`)
const describeDay = (day) => `${day.count.toLocaleString()} contribution${day.count === 1 ? '' : 's'} on ${dayFormat.format(parseDate(day.date))}`

function Calendar({ days }) {
  const [selected, setSelected] = useState(null)
  const [focused, setFocused] = useState(days.length - 1)
  const scrollRef = useRef(null)
  const buttonsRef = useRef([])
  const offset = parseDate(days[0].date).getUTCDay()
  const weeks = Math.ceil((offset + days.length) / 7)
  const months = []

  days.forEach((day, index) => {
    const date = parseDate(day.date)
    const week = Math.floor((index + offset) / 7)
    if ((index === 0 || date.getUTCDate() === 1) && week < weeks - 1) {
      if (months.length && week - months[months.length - 1].week < 3) months.pop()
      months.push({ week, label: monthFormat.format(date) })
    }
  })

  useEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return undefined
    const observer = new ResizeObserver(() => { scroll.scrollLeft = scroll.scrollWidth })
    observer.observe(scroll)
    return () => observer.disconnect()
  }, [])

  function navigate(event, index) {
    const steps = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 }
    let next
    if (event.key in steps) next = index + steps[event.key]
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = days.length - 1
    else return
    event.preventDefault()
    next = Math.max(0, Math.min(days.length - 1, next))
    setFocused(next)
    buttonsRef.current[next]?.focus()
  }

  return (
    <>
      <div className="github-calendar-scroll" ref={scrollRef}>
        <div className="github-calendar" style={{ '--weeks': weeks }} role="group" aria-label="Daily GitHub contributions. Use arrow keys to explore days, Home for the first day, and End for the last day.">
          <div className="github-months" aria-hidden="true">
            {months.map((month) => <span key={month.week} style={{ gridColumn: month.week + 1 }}>{month.label}</span>)}
          </div>
          <div className="github-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
          <div className="github-days" onMouseLeave={() => setSelected(null)}>
            {days.map((day, index) => (
              <button
                key={day.date}
                ref={(element) => { buttonsRef.current[index] = element }}
                className="github-day"
                data-level={day.level}
                type="button"
                style={{ gridColumn: Math.floor((index + offset) / 7) + 1, gridRow: (index + offset) % 7 + 1 }}
                tabIndex={focused === index ? 0 : -1}
                aria-label={describeDay(day)}
                title={describeDay(day)}
                onMouseEnter={() => setSelected(day)}
                onFocus={() => { setFocused(index); setSelected(day) }}
                onBlur={() => setSelected(null)}
                onClick={() => setSelected(day)}
                onKeyDown={(event) => navigate(event, index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="github-calendar-detail">
        <span>{selected ? describeDay(selected) : `${dayFormat.format(parseDate(days[0].date))} – ${dayFormat.format(parseDate(days[days.length - 1].date))}`}</span>
        <span className="github-scroll-hint">Swipe to explore</span>
      </div>
    </>
  )
}

export default function GitHubActivity() {
  const [activity, setActivity] = useState(null)
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    async function loadActivity() {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { signal: controller.signal })
        if (!response.ok) throw new Error('Activity unavailable')
        const data = await response.json()
        if (!Array.isArray(data.contributions) || !data.contributions.length) throw new Error('Missing activity')
        const days = data.contributions
        if (!days.every((day) => /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isFinite(parseDate(day.date).getTime()) && Number.isInteger(day.count) && day.count >= 0 && Number.isInteger(day.level) && day.level >= 0 && day.level <= 4)) throw new Error('Invalid activity')
        days.sort((a, b) => a.date.localeCompare(b.date))
        if (active) {
          setActivity({ days, total: days.reduce((sum, day) => sum + day.count, 0) })
          setStatus('ready')
        }
      } catch {
        if (active) setStatus('error')
      } finally {
        window.clearTimeout(timeout)
      }
    }

    loadActivity()
    return () => { active = false; window.clearTimeout(timeout); controller.abort() }
  }, [attempt])

  return (
    <section className="block reveal github-block" id="github-activity" aria-labelledby="github-heading">
      <div className="wrap">
        <header className="block-head">
          <p className="section-kicker">Behind the builds</p>
          <h2 id="github-heading">GitHub activity</h2>
          <p>A little progress, every day. A look at what I&apos;ve been building over the past year.</p>
        </header>
        <div className="github-panel" aria-busy={status === 'loading'}>
          <div className="github-panel-head">
            <a className="github-profile" href={profileUrl} target="_blank" rel="noopener noreferrer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.1.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.71 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
              <span>@{username}</span><span aria-hidden="true">↗</span>
            </a>
            <span className="github-period">Last 12 months</span>
          </div>
          {status === 'ready' ? <Calendar days={activity.days} /> : (
            <div className={`github-placeholder github-placeholder--${status}`}>
              <p role="status">{status === 'loading' ? 'Loading contributions…' : 'Contributions are temporarily unavailable.'}</p>
              {status === 'error' && <button className="github-retry" type="button" onClick={() => { setStatus('loading'); setAttempt((value) => value + 1) }}>Try again <span aria-hidden="true">↗</span></button>}
            </div>
          )}
          <div className="github-panel-footer">
            <p className="github-total" role="status">{status === 'ready' ? <><strong>{activity.total.toLocaleString()}</strong> contributions in the last year</> : <a href={profileUrl} target="_blank" rel="noopener noreferrer">View activity on GitHub ↗</a>}</p>
            <div className="github-legend" aria-label="Contribution intensity from less to more">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => <i className="github-day" data-level={level} key={level} aria-hidden="true" />)}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
