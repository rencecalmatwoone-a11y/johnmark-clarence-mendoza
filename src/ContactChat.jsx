import { useEffect, useRef, useState } from 'react'
import { useInteractionSounds } from './useInteractionSounds'
import './ContactChat.css'

export default function ContactChat({ portrait }) {
  const { playMessage } = useInteractionSounds()
  const chatRef = useRef(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const timers = []
    let visible = false
    let stopMessage
    const clearTimers = () => {
      timers.forEach(window.clearTimeout)
      timers.length = 0
      stopMessage?.()
      stopMessage = undefined
    }
    function reveal() {
      clearTimers()
      if (motion.matches) {
        setStage(4)
        return
      }
      if (!visible || document.hidden) return
      // Keep the email available while someone is using the link.
      if (chatRef.current?.contains(document.activeElement)) {
        setStage(4)
        timers.push(window.setTimeout(reveal, 1000))
        return
      }
      setStage(0)
      timers.push(window.setTimeout(() => setStage(1), 350))
      timers.push(window.setTimeout(() => {
        if (!visible || document.hidden) return
        setStage(2)
        stopMessage = playMessage()
      }, 1350))
      timers.push(window.setTimeout(() => setStage(3), 2100))
      timers.push(window.setTimeout(() => {
        if (!visible || document.hidden) return
        setStage(4)
        stopMessage = playMessage()
      }, 3700))
      timers.push(window.setTimeout(exitConversation, 7700))
    }
    function exitConversation() {
      clearTimers()
      if (chatRef.current?.contains(document.activeElement)) {
        timers.push(window.setTimeout(exitConversation, 1000))
        return
      }
      setStage(5)
      timers.push(window.setTimeout(reveal, 650))
    }
    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)
      if (visible) reveal()
      else clearTimers()
    }, { threshold: 0.5 })
    observer.observe(chatRef.current)

    const handleMotionChange = () => reveal()
    const handleVisibilityChange = () => {
      if (document.hidden) clearTimers()
      else if (visible) reveal()
    }
    motion.addEventListener('change', handleMotionChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      observer.disconnect()
      clearTimers()
      motion.removeEventListener('change', handleMotionChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [playMessage])

  return (
    <div className="contact-chat" ref={chatRef}>
      <h3>Let&apos;s have a conversation</h3>
      <div
        className={`contact-chat-messages${stage === 5 ? ' is-exiting' : ''}`}
        onFocusCapture={() => { if (stage === 5) setStage(4) }}
      >
        {stage > 0 && (
          <div className="contact-chat-row contact-chat-reply">
            <img className="contact-chat-avatar" src={portrait} alt="" width="40" height="40" />
            {stage === 1 ? (
              <div className="contact-chat-bubble contact-chat-typing" aria-label="JohnMark is typing">
                <span /><span /><span />
              </div>
            ) : (
              <p className="contact-chat-bubble contact-chat-greeting">Want to work together? Just want to chat?</p>
            )}
          </div>
        )}
        {stage > 2 && (
          <div className="contact-chat-row contact-chat-reply">
            <img className="contact-chat-avatar" src={portrait} alt="" width="40" height="40" />
            {stage === 3 ? (
              <div className="contact-chat-bubble contact-chat-typing" aria-label="JohnMark is typing">
                <span /><span /><span />
              </div>
            ) : (
              <p className="contact-chat-bubble contact-chat-email">
                <span>Drop me a line at</span>
                <a href="mailto:rencecalmatwo.one@gmail.com">rencecalmatwo.one@gmail.com <span aria-hidden="true">↗</span></a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
