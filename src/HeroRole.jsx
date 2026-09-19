import { useEffect, useState } from 'react'

const roles = ['UI/UX Designer', 'Front-end Developer', 'Project Manager']
const roleCycleMs = 8000

export default function HeroRole() {
  const [activeRole, setActiveRole] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer
    const updatePlayback = () => {
      window.clearInterval(timer)
      if (!reducedMotion.matches) {
        timer = window.setInterval(() => setActiveRole((current) => (current + 1) % roles.length), roleCycleMs)
      }
    }
    updatePlayback()
    reducedMotion.addEventListener('change', updatePlayback)
    return () => {
      window.clearInterval(timer)
      reducedMotion.removeEventListener('change', updatePlayback)
    }
  }, [])

  return (
    <h2
      key={activeRole}
      className="hero-role"
      style={{ '--role-characters': roles[activeRole].length, '--role-cycle': `${roleCycleMs}ms` }}
      aria-label="UI/UX Designer, Front-end Developer, Project Manager"
    >
      <span className="hero-role-content" aria-hidden="true">
        <span className="hero-role-measure">{roles[activeRole]}</span>
        <span className="hero-role-typing">
          <span className="typewriter-text">{roles[activeRole]}</span>
        </span>
      </span>
      <span className="hero-role-pointer-track" aria-hidden="true">
        <svg className="hero-role-pointer" viewBox="0 0 24 24" fill="none">
          <path d="m4 2 15 13-7 1-4 6L4 2Z" fill="#171717" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="hero-role-selection" aria-hidden="true">
        <span className="hero-role-handle" />
        <span className="hero-role-handle" />
        <span className="hero-role-handle" />
        <span className="hero-role-handle" />
      </span>
    </h2>
  )
}
