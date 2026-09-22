import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import philippinesMap from './assets/philippines.svg'
import './HeroPeek.css'

export default function HeroPeek({ kind, portrait }) {
  const isLocation = kind === 'location'
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const closeTimerRef = useRef(null)
  const id = useId()

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), [])

  const positionCard = () => {
    const dialog = dialogRef.current
    const anchor = triggerRef.current.getBoundingClientRect()
    const width = dialog.offsetWidth
    const height = dialog.offsetHeight
    const viewport = window.visualViewport
    const viewportLeft = viewport?.offsetLeft ?? 0
    const viewportTop = viewport?.offsetTop ?? 0
    const viewportWidth = viewport?.width ?? window.innerWidth
    const viewportHeight = viewport?.height ?? window.innerHeight
    const clamp = (value, min, max) => Math.max(min, Math.min(value, max))
    const above = anchor.top - height - 8
    const top = above >= viewportTop + 12 ? above : anchor.bottom + 8
    dialog.style.left = `${clamp(anchor.left + anchor.width / 2 - width / 2, viewportLeft + 12, viewportLeft + viewportWidth - width - 12)}px`
    dialog.style.top = `${clamp(top, viewportTop + 12, viewportTop + viewportHeight - height - 12)}px`
  }

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    window.addEventListener('resize', positionCard)
    window.visualViewport?.addEventListener('resize', positionCard)
    window.visualViewport?.addEventListener('scroll', positionCard)
    return () => {
      root.style.overflow = previousOverflow
      window.removeEventListener('resize', positionCard)
      window.visualViewport?.removeEventListener('resize', positionCard)
      window.visualViewport?.removeEventListener('scroll', positionCard)
    }
  }, [open])

  const show = () => {
    dialogRef.current.showModal()
    positionCard()
    setOpen(true)
  }

  const finishClose = () => {
    window.clearTimeout(closeTimerRef.current)
    dialogRef.current?.close()
  }

  const close = () => {
    const dialog = dialogRef.current
    if (!dialog.open || dialog.dataset.closing === 'true') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishClose()
      return
    }
    // Continue from the current frame, even when dismissed during entrance.
    const style = window.getComputedStyle(dialog)
    dialog.style.setProperty('--peek-exit-opacity', style.opacity)
    dialog.style.setProperty('--peek-exit-transform', style.transform)
    dialog.style.setProperty('--peek-backdrop-opacity', window.getComputedStyle(dialog, '::backdrop').opacity)
    dialog.dataset.closing = 'true'
    closeTimerRef.current = window.setTimeout(finishClose, 320)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`hero-highlight hero-peek-trigger${isLocation ? ' hero-highlight-location' : ''}`}
        aria-label={isLocation ? 'PH: view the Philippines' : 'RENCE: view profile photo'}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={show}
      >
        {isLocation ? 'PH' : 'RENCE'}
      </button>
      {createPortal(
        <dialog
          ref={dialogRef}
          id={id}
          className="hero-peek"
          aria-label={isLocation ? 'The Philippines' : 'Rence’s profile photo'}
          tabIndex={-1}
          onCancel={(event) => {
            event.preventDefault()
            close()
          }}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && event.animationName === 'heroPeekExit') finishClose()
          }}
          onKeyDown={(event) => {
            if (event.key === 'Tab') {
              event.preventDefault()
              event.currentTarget.focus()
            }
          }}
          onClose={() => {
            window.clearTimeout(closeTimerRef.current)
            delete dialogRef.current.dataset.closing
            setOpen(false)
            triggerRef.current?.focus({ preventScroll: true })
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return
            const rect = event.currentTarget.getBoundingClientRect()
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close()
          }}
        >
          {isLocation ? (
            <div className="hero-peek-map" style={{ '--map-image': `url("${philippinesMap}")` }}>
              <span className="hero-peek-map-grid" aria-hidden="true" />
              <span className="hero-peek-map-silhouette" role="img" aria-label="Silhouette of the Philippine archipelago" />
            </div>
          ) : (
            <img className="hero-peek-portrait" src={portrait} alt="JohnMark Clarence Mendoza, known as Rence" width="256" height="256" />
          )}
        </dialog>,
        document.body,
      )}
    </>
  )
}
