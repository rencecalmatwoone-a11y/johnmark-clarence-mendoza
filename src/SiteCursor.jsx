import { useEffect, useRef } from 'react'
import './SiteCursor.css'

export default function SiteCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const root = document.documentElement
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const nativeTargets = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, video, audio'
    const interactiveTargets = 'a[href], button, summary, [role="button"], [role="link"]'

    const hide = () => {
      cursor.dataset.visible = 'false'
      cursor.dataset.pressed = 'false'
      root.classList.remove('has-site-cursor')
    }

    const move = (event) => {
      const target = event.target instanceof Element ? event.target : null
      if (!finePointer.matches || event.pointerType !== 'mouse' || target?.closest(nativeTargets)) {
        hide()
        return
      }

      // Keep the arrow tip on the actual hit point; only the badge flips at edges.
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      cursor.dataset.left = String(event.clientX > root.clientWidth - 64)
      cursor.dataset.above = String(event.clientY > root.clientHeight - 56)
      cursor.dataset.interactive = String(Boolean(target?.closest(interactiveTargets)))
      cursor.dataset.visible = 'true'
      root.classList.add('has-site-cursor')
    }

    const press = (event) => {
      move(event)
      cursor.dataset.pressed = String(event.pointerType === 'mouse' && event.button === 0)
    }
    const release = () => { cursor.dataset.pressed = 'false' }
    const leave = (event) => { if (!event.relatedTarget) hide() }
    const keyboard = (event) => { if (event.key === 'Tab') hide() }
    const visibility = () => { if (document.hidden) hide() }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', move, { passive: true })
    window.addEventListener('pointerdown', press, { passive: true })
    window.addEventListener('pointerup', release, { passive: true })
    window.addEventListener('pointercancel', hide)
    window.addEventListener('pointerout', leave)
    window.addEventListener('blur', hide)
    window.addEventListener('keydown', keyboard)
    document.addEventListener('visibilitychange', visibility)
    finePointer.addEventListener('change', hide)

    return () => {
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', move)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', hide)
      window.removeEventListener('pointerout', leave)
      window.removeEventListener('blur', hide)
      window.removeEventListener('keydown', keyboard)
      document.removeEventListener('visibilitychange', visibility)
      finePointer.removeEventListener('change', hide)
    }
  }, [])

  return (
    <div ref={cursorRef} className="site-cursor" aria-hidden="true">
      <svg className="site-cursor-arrow" width="22" height="26" viewBox="0 0 22 26" fill="none">
        <path d="M1 1.5V22L6.9 16.3L15.2 15.2L1 1.5Z" fill="currentColor" stroke="var(--bg)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="site-cursor-label">You</span>
    </div>
  )
}
