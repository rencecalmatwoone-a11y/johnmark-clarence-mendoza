import { useCallback, useEffect, useMemo, useState } from 'react'
import { createInteractionAudio } from './interactionAudio'
import { SoundContext } from './useInteractionSounds'
import './InteractionSounds.css'

export function InteractionSoundsProvider({ children }) {
  const [audio] = useState(createInteractionAudio)

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
  const playMessage = useCallback(() => audio.play('message'), [audio])
  const value = useMemo(() => ({ playHover, playSwipe, playMessage }), [playHover, playSwipe, playMessage])

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
