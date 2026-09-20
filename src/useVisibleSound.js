import { useCallback, useEffect, useRef } from 'react'

export default function useVisibleSound(sound) {
  const ref = useRef(null)
  const visible = useRef(false)
  const stopSound = useRef(null)

  useEffect(() => {
    const stop = () => {
      stopSound.current?.()
      stopSound.current = null
    }
    const observer = new IntersectionObserver((entries) => {
      visible.current = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)
      if (!visible.current) stop()
    }, { threshold: 0.5 })
    observer.observe(ref.current)
    const handleVisibility = () => {
      if (document.hidden) stop()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      visible.current = false
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      stop()
    }
  }, [])

  const play = useCallback((...args) => {
    if (!visible.current || document.hidden) return
    const stop = sound(...args)
    if (stop) {
      stopSound.current?.()
      stopSound.current = stop
    }
  }, [sound])

  return { ref, play }
}
