import { useRef } from 'react'

export default function useCardSwipe(onSwipe) {
  const gesture = useRef(null)
  const suppressClick = useRef(false)

  function reset(element) {
    gesture.current = null
    element.removeAttribute('data-dragging')
    element.style.removeProperty('--swipe-x')
    element.style.removeProperty('--swipe-rotation')
  }

  return {
    onPointerDown(event) {
      if (!event.isPrimary || event.button !== 0) return
      suppressClick.current = false
      gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: false }
    },
    onPointerMove(event) {
      const start = gesture.current
      if (!start || start.id !== event.pointerId) return
      const dx = event.clientX - start.x
      const dy = event.clientY - start.y
      if (!start.dragging) {
        if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
          reset(event.currentTarget)
          return
        }
        if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy)) return
        start.dragging = true
        suppressClick.current = true
        event.currentTarget.setPointerCapture(event.pointerId)
        event.currentTarget.dataset.dragging = 'true'
      }
      const offset = Math.max(-100, Math.min(100, dx * 0.5))
      event.currentTarget.style.setProperty('--swipe-x', `${offset}px`)
      event.currentTarget.style.setProperty('--swipe-rotation', `${offset / 20}deg`)
    },
    onPointerUp(event) {
      const start = gesture.current
      if (!start || start.id !== event.pointerId) return
      const dx = event.clientX - start.x
      const dy = event.clientY - start.y
      reset(event.currentTarget)
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      if (start.dragging && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.25) onSwipe(dx < 0 ? 1 : -1)
    },
    onPointerCancel(event) { reset(event.currentTarget) },
    onLostPointerCapture(event) {
      // Touch starts with implicit capture on the child. Transferring it to
      // the stack also emits this event on that child; keep the swipe alive.
      if (event.target === event.currentTarget) reset(event.currentTarget)
    },
    onPointerLeave(event) {
      if (!gesture.current?.dragging) reset(event.currentTarget)
    },
    onClickCapture(event) {
      if (suppressClick.current && event.detail !== 0) {
        event.preventDefault()
        event.stopPropagation()
        suppressClick.current = false
      }
    },
    onDragStart(event) { event.preventDefault() },
  }
}
