import { useCallback, useEffect, useMemo, useState } from 'react'
import { createInteractionAudio } from './interactionAudio'
import { SoundContext, useInteractionSounds } from './useInteractionSounds'
import './InteractionSounds.css'

const preferenceKey = 'portfolio-interaction-sounds'

export function InteractionSoundsProvider({ children }) {
  const [audio] = useState(createInteractionAudio)
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem(preferenceKey) !== 'off' } catch { return true }
  })

  useEffect(() => {
    audio.setEnabled(enabled)
    try { localStorage.setItem(preferenceKey, enabled ? 'on' : 'off') } catch { /* Private browsing. */ }
  }, [audio, enabled])

  useEffect(() => {
    const unlock = () => audio.unlock()
    const visibility = () => document.hidden ? audio.silence() : audio.restore()
    document.addEventListener('pointerdown', unlock, { passive: true })
    document.addEventListener('keydown', unlock)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      document.removeEventListener('pointerdown', unlock)
      document.removeEventListener('keydown', unlock)
      document.removeEventListener('visibilitychange', visibility)
      audio.dispose()
    }
  }, [audio])

  const playHover = useCallback((level = 0, position = 0) => audio.play('hover', level, position), [audio])
  const playSwipe = useCallback((direction) => audio.play('swipe', direction), [audio])
  const toggle = useCallback(() => {
    const next = !enabled
    audio.setEnabled(next)
    if (next) audio.unlock()
    setEnabled(next)
  }, [audio, enabled])
  const value = useMemo(() => ({ enabled, toggle, playHover, playSwipe }), [enabled, toggle, playHover, playSwipe])

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function SoundToggle() {
  const { enabled, toggle } = useInteractionSounds()
  return (
    <button className="sound-toggle" type="button" onClick={toggle} aria-pressed={enabled} aria-label="Interaction sounds" title={enabled ? 'Mute interaction sounds' : 'Enable interaction sounds'}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        {enabled ? <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></> : <path d="m16 9 6 6m0-6-6 6" />}
      </svg>
      <span>Sound {enabled ? 'on' : 'off'}</span>
    </button>
  )
}
