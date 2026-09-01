import { useEffect, useRef, useState } from 'react'
import portraitImage from './assets/995D7F39-8D6A-41C7-B0FD-C7028114A3CC.png'
import htmlIcon from './assets/html-5.png'
import cssIcon from './assets/css-3.png'
import jsIcon from './assets/js.png'
import phpIcon from './assets/php.png'
import typescriptIcon from './assets/typescript.png'
import wordpressIcon from './assets/wordpress.png'
import mysqlIcon from './assets/mysql.png'
import ibmBadge from './assets/ibm_PNG19658.png'
import microsoftBadge from './assets/microsoft-logo-microsoft-icon-transparent-free-png.webp'
import packtBadge from './assets/Packt-Logo.png'
import projectShot from './assets/Screenshot 2026-08-31 181008.png'
import packetTracerIcon from './assets/Cisco-Packet-Tracer.webp'

const navItems = [
  { label: 'About me', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#work' },
]

const services = [
  {
    id: '[ PI_01 ]',
    title: 'UI/UX Design',
    description:
      'High-contrast marketing and product surfaces with a real type hierarchy — not a pile of identical cards.',
    tags: ['#FIGMA', '#HTML', '#CSS', '#REACT'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 22" fill="none" aria-hidden="true">
        <circle cx="12" cy="11" r="8.2" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="12" cy="11" rx="3.4" ry="8.2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3.8 11h16.4M6.2 6.4h11.6M6.2 15.6h11.6" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: '[ FS_01 ]',
    title: 'Front-end Development',
    description:
      'APIs, data models, and front-end that share one contract so features actually ship.',
    tags: ['#TYPESCRIPT', '#NEXT.JS', '#NODE.JS', '#MySQL'],
    icon: (
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden="true">
        <rect x="3.2" y="1.2" width="11.6" height="19.6" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.4 3.2h3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
        <circle cx="9" cy="17.4" r="0.7" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: '[ SA_01 ]',
    title: 'Project Management',
    description:
      'Tokens, component kits, performance, and accessibility notes a teammate can use without a walkthrough.',
    tags: ['#MICROSOFT AZURE', '#PROJECT MANAGEMENT'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 22" fill="none" aria-hidden="true">
        <rect x="3.2" y="1.4" width="17.6" height="5.4" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
        <rect x="3.2" y="8.4" width="17.6" height="5.4" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
        <rect x="3.2" y="15.4" width="17.6" height="5.4" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6.4 4.1h2.2M6.4 11.1h2.2M6.4 18.1h2.2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
]

const skills = [
  { name: 'HTML', logo: htmlIcon },
  { name: 'CSS', logo: cssIcon },
  { name: 'JavaScript', logo: jsIcon },
  { name: 'Tailwind', logo: null, svg: (
    <svg viewBox="0 0 54 33" role="img" aria-hidden="true">
      <path
        fill="#38BDF8"
        fillRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.05.51 3.52 2 5.15 3.65C30.74 13.09 33.89 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.05-.51-3.52-2-5.15-3.65C36.76 3.11 33.61 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.05.51 3.52 2 5.15 3.65C17.24 29.29 20.39 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.05-.51-3.52-2-5.15-3.65C23.26 19.31 20.11 16.2 13.5 16.2z"
      />
    </svg>
  ) },
  { name: 'Bootstrap', logo: null, svg: (
    <svg viewBox="0 0 32 32" role="img" aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="#7952B3" />
      <path fill="#fff" d="M9.2 9.4h7.3c1.4 0 2.5.3 3.3.9.8.6 1.2 1.5 1.2 2.6 0 .8-.2 1.4-.6 1.9-.4.5-1 .8-1.7 1 .9.2 1.6.6 2.1 1.2.5.6.7 1.3.7 2.2 0 1.2-.4 2.2-1.3 2.9-.8.7-2 1.1-3.6 1.1H9.2V9.4zm3.3 5.4h3.4c.6 0 1.1-.1 1.4-.4.3-.3.5-.6.5-1.1 0-.5-.2-.9-.5-1.1-.3-.3-.8-.4-1.4-.4h-3.4v3zm0 6.1h3.9c.7 0 1.2-.2 1.6-.5.4-.3.6-.8.6-1.4 0-.6-.2-1-.6-1.3-.4-.3-.9-.5-1.6-.5h-3.9v3.7z" />
    </svg>
  ) },
  { name: 'PHP', logo: phpIcon },
  { name: 'ReactJS', logo: null, svg: (
    <svg viewBox="0 0 32 32" role="img" aria-hidden="true">
      <circle cx="16" cy="16" r="2.4" fill="#61DAFB" />
      <ellipse cx="16" cy="16" rx="11.5" ry="4.4" fill="none" stroke="#61DAFB" strokeWidth="1.6" />
      <ellipse cx="16" cy="16" rx="11.5" ry="4.4" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="11.5" ry="4.4" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 16 16)" />
    </svg>
  ) },
  { name: 'TypeScript', logo: typescriptIcon },
  { name: 'Figma', logo: null, svg: (
    <svg viewBox="0 0 32 32" role="img" aria-hidden="true">
      <path fill="#F24E1E" d="M8.4 4.4h7.6a3.8 3.8 0 0 1 0 7.6H8.4z" />
      <path fill="#FF7262" d="M16 4.4h7.6a3.8 3.8 0 1 1 0 7.6H16z" />
      <path fill="#A259FF" d="M8.4 12.2h7.6v7.6a3.8 3.8 0 0 1-7.6 0z" />
      <circle cx="19.8" cy="16" r="3.8" fill="#1ABCFE" />
      <path fill="#0ACF83" d="M8.4 19.8h7.6v7.6a3.8 3.8 0 1 1-7.6 0z" />
    </svg>
  ) },
  { name: 'WordPress', logo: wordpressIcon },
  { name: 'Packet Tracer', logo: packetTracerIcon },
  { name: 'MySQL', logo: mysqlIcon },
]

const certifications = [
  {
    index: '[ 01 ]',
    type: 'Front-end',
    badge: ibmBadge,
    label: 'Professional certificate',
    title: 'Front-End Developer',
    description: 'Focused on building responsive interfaces, polished user experiences, and maintainable front-end architecture.',
    href: 'https://www.coursera.org/account/accomplishments/professional-cert/VVJ5N064B6XN',
    featured: true,
    badgeClass: 'ibm',
  },
  {
    index: '[ 02 ]',
    type: 'Project Mgmt',
    badge: microsoftBadge,
    label: 'Course',
    title: 'Project Management Fundamentals',
    description: 'Core principles of planning, execution, communication, and successful digital project delivery.',
    href: 'https://www.coursera.org/account/accomplishments/verify/ETX6PQB96PKE?utm_source=ios&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
    featured: false,
    badgeClass: 'google',
  },
  {
    index: '[ 03 ]',
    type: 'Security',
    badge: packtBadge,
    label: 'Specialization',
    title: 'CompTIA Security+ (SY0-701) Specialization',
    description: 'Focused on cybersecurity fundamentals, operational security, and resilient system practices.',
    href: 'https://www.coursera.org/account/accomplishments/specialization/certificate/PT0AFOSJ1HLK',
    featured: false,
    badgeClass: '',
  },
]

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = window.localStorage.getItem('theme')
      const next = stored === 'dark' || stored === 'light' ? stored : 'light'
      return next
    } catch {
      return 'light'
    }
  })
  const [isReady, setIsReady] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [role, setRole] = useState('')
  const canvasRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Ignore private mode issues.
    }
    const themeToggle = document.querySelector('#theme-toggle')
    themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
  }, [theme])

  useEffect(() => {
    const interactiveSurfaces = document.querySelectorAll('.hero-cta, .header-cta, .skill-card, .profile-card, .about-copy')

    const resetPointerState = (button) => {
      button.style.setProperty('--pointer-x', '50%')
      button.style.setProperty('--pointer-y', '50%')
      button.style.setProperty('--offset-x', '0px')
      button.style.setProperty('--offset-y', '0px')
      button.style.setProperty('--tilt-x', '0deg')
      button.style.setProperty('--tilt-y', '0deg')
      button.style.setProperty('--scale-x', '1')
      button.style.setProperty('--scale-y', '1')
    }

    const listeners = Array.from(interactiveSurfaces).map((button) => {
      const setPointerState = (event) => {
        const rect = button.getBoundingClientRect()
        const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
        const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100

        button.style.setProperty('--pointer-x', `${x}%`)
        button.style.setProperty('--pointer-y', `${y}%`)
        button.style.setProperty('--offset-x', `${(nx * 7).toFixed(2)}px`)
        button.style.setProperty('--offset-y', `${(ny * 5).toFixed(2)}px`)
        button.style.setProperty('--tilt-y', `${(nx * -10).toFixed(2)}deg`)
        button.style.setProperty('--tilt-x', `${(ny * 8).toFixed(2)}deg`)
        button.style.setProperty('--scale-x', `${(1 - Math.abs(nx) * 0.08).toFixed(3)}`)
        button.style.setProperty('--scale-y', `${(1 - Math.abs(ny) * 0.05).toFixed(3)}`)
      }

      const reset = () => resetPointerState(button)
      button.addEventListener('pointermove', setPointerState)
      button.addEventListener('pointerenter', setPointerState)
      button.addEventListener('pointerleave', reset)
      return { button, setPointerState, reset }
    })

    return () => {
      listeners.forEach(({ button, setPointerState, reset }) => {
        button.removeEventListener('pointermove', setPointerState)
        button.removeEventListener('pointerenter', setPointerState)
        button.removeEventListener('pointerleave', reset)
      })
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const timer = window.setTimeout(() => {
      setIsReady(true)
      setIsHidden(true)
      document.body.classList.add('site-ready')
    }, reduceMotion.matches ? 0 : 900)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const roles = ['UI/UX Designer', 'Front End Developer', 'Project Manager']
    let currentIndex = 0
    let charIndex = 0
    let deleting = false

    const tick = () => {
      const currentRole = roles[currentIndex] || ''

      if (!deleting && charIndex <= currentRole.length) {
        setRole(currentRole.slice(0, charIndex))
        charIndex += 1

        if (charIndex > currentRole.length) {
          deleting = true
          window.setTimeout(tick, 1200)
          return
        }

        window.setTimeout(tick, 150)
        return
      }

      if (deleting) {
        setRole(currentRole.slice(0, charIndex))
        charIndex -= 1

        if (charIndex < 0) {
          deleting = false
          currentIndex = (currentIndex + 1) % roles.length
          charIndex = 0
          window.setTimeout(tick, 250)
          return
        }

        window.setTimeout(tick, 100)
      }
    }

    const started = window.setTimeout(tick, 350)
    return () => window.clearTimeout(started)
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY)
      setIsScrolled(currentScrollY > 12)

      if (currentScrollY <= 80) {
        setIsHeaderHidden(false)
      } else if (currentScrollY > lastScrollY + 4) {
        setIsHeaderHidden(true)
      } else if (currentScrollY < lastScrollY - 4) {
        setIsHeaderHidden(false)
      }

      lastScrollY = currentScrollY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('main .block')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!sections.length || reduceMotion.matches) {
      sections.forEach((section) => section.classList.add('is-inview'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isReady])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const points = []
    const maxPoints = 36
    const trailDuration = 520
    let raf = 0

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const accent = () => {
      const picker = document.documentElement.dataset.theme || 'light'
      if (picker === 'dark') return '#f1b077'
      return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || 'oklch(48% 0.145 148)'
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      while (points.length && now - points[0].time > trailDuration) {
        points.shift()
      }

      if (!points.length) {
        raf = 0
        return
      }

      const color = accent()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (let i = 1; i < points.length; i += 1) {
        const prev = points[i - 1]
        const point = points[i]
        const age = now - point.time
        const opacity = Math.max(0, 1 - age / trailDuration)
        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(point.x, point.y)
        ctx.strokeStyle = color
        ctx.globalAlpha = opacity * 0.62
        ctx.lineWidth = 1.5 + opacity * 6.5
        ctx.stroke()
      }

      const tip = points[points.length - 1]
      if (tip) {
        const opacity = Math.max(0, 1 - (now - tip.time) / trailDuration)
        ctx.beginPath()
        ctx.arc(tip.x, tip.y, 3.4, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = opacity * 0.85
        ctx.fill()
      }

      ctx.globalAlpha = 1
      raf = window.requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      const samples = event.getCoalescedEvents?.() || [event]
      const now = performance.now()
      const bounds = canvas.getBoundingClientRect()

      samples.forEach((sample) => {
        const x = sample.clientX - bounds.left
        const y = sample.clientY - bounds.top
        const previous = points[points.length - 1]
        if (previous && Math.hypot(x - previous.x, y - previous.y) < 1) {
          previous.time = now
          return
        }

        points.push({ x, y, time: now })
      })

      if (points.length > maxPoints) points.splice(0, points.length - maxPoints)
      if (!raf) raf = window.requestAnimationFrame(draw)
    }

    window.addEventListener('resize', size)
    window.addEventListener('mousemove', onPointerMove, { passive: true })

    size()
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      window.removeEventListener('mousemove', onPointerMove)
    }
  }, [isReady])

  const handleThemeToggle = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const handleNavClick = (event, href) => {
    event.preventDefault()
    setNavOpen(false)
    const target = document.querySelector(href)
    if (!target) return

    const header = document.querySelector('#site-header')
    const offset = (header?.offsetHeight || 0) + 18
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    if (history.pushState) {
      history.pushState(null, '', href)
    }
  }

  const headerClassName = `site-header ${isScrolled ? 'is-scrolled' : ''} ${isHeaderHidden ? 'is-hidden' : ''}`

  return (
    <div className="app-shell" data-theme={theme}>
      <div className={`preloader ${isHidden ? 'is-hidden' : ''}`} aria-live="polite" aria-busy="true">
        <div className="loader" aria-hidden="true" />
        <div className="preloader-text">LOADING</div>
      </div>

      <a className="skip" href="#main">Skip to content</a>

      <header className={headerClassName} id="site-header">
        <div className="wrap header-inner">
          <a className="mark" href="#top" aria-label="JohnMark Clarence Mendoza home">
            <span>J</span>
          </a>
          <nav className={`nav ${navOpen ? 'is-open' : ''}`} aria-label="Primary">
            <button
              className="nav-toggle"
              type="button"
              aria-expanded={navOpen}
              aria-controls="menu"
              aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setNavOpen((value) => !value)}
            >
              <span className="nav-toggle-line" />
              <span className="nav-toggle-line" />
              <span className="nav-toggle-line" />
            </button>
            <ul id="menu" className="menu">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(event) => handleNavClick(event, item.href)}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <button className="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode" onClick={handleThemeToggle}>
              <svg className="icon-moon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path fill="currentColor" d="M13.6 10.2A6.2 6.2 0 0 1 5.8 2.4 6.4 6.4 0 1 0 13.6 10.2Z" />
              </svg>
              <svg className="icon-sun" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                  d="M8 1.4v1.6M8 13v1.6M1.4 8h1.6M13 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M3.2 12.8l1.1-1.1M11.7 4.3l1.1-1.1"
                />
              </svg>
            </button>
            <a className="btn btn-outline header-cta" href="cv.pdf" download="JohnMark-Clarence-Mendoza-CV.pdf">
              <span className="btn-label">Download CV</span>
              <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M2 7h9M7.5 3.5 11.5 7 7.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-field" aria-hidden="true">
            <svg className="hero-ribbon" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop className="ribbon-a" offset="0%" />
                  <stop className="ribbon-b" offset="28%" />
                  <stop className="ribbon-c" offset="52%" />
                  <stop className="ribbon-d" offset="100%" />
                </linearGradient>
                <filter id="soft" x="-15%" y="-50%" width="130%" height="200%">
                  <feGaussianBlur stdDeviation="22" />
                </filter>
              </defs>
              <path
                filter="url(#soft)"
                fill="none"
                stroke="url(#ribbon)"
                strokeWidth="78"
                strokeLinecap="butt"
                d="M-80 430 C 180 310, 380 510, 700 370 S 1160 210, 1520 360"
              />
              <path
                filter="url(#soft)"
                className="ribbon-echo"
                fill="none"
                strokeWidth="36"
                d="M-80 470 C 240 350, 460 540, 760 410 S 1220 250, 1520 400"
              />
            </svg>
          </div>
          <div className="wrap hero-copy">
            <p className="eyebrow">Hello, I am</p>
            <h1>
              <span>JohnMark Clarence</span>
              <span>Mendoza</span>
            </h1>
            <h2 className="hero-role" aria-live="polite" aria-label="UI/UX Designer, Front End Developer, Project Manager">
              <span className="typewriter-text">{role}</span>
              <span className="typewriter-cursor" aria-hidden="true">|</span>
            </h2>
            <p className="lede">
              A UI/UX Designer based in the Philippines, focused on building beautiful and functional web applications.
            </p>
            <a className="btn btn-outline hero-cta" href="#work">
              <span className="btn-label">Check my work</span>
              <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M2 7h9M7.5 3.5 11.5 7 7.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </section>

        <section className="block reveal" id="about">
          <div className="wrap about-grid">
            <header className="block-head span-all">
              <h2>About me</h2>
            </header>
            <figure className="portrait profile-card">
              <div className="profile-card-glow" aria-hidden="true" />
              <div className="portrait-frame">
                <img src={portraitImage} alt="Portrait" />
                <span className="portrait-rule" />
                <div className="profile-card-details">
                  <strong>JohnMark Mendoza</strong>
                  <span>UI/UX &amp; Front-end</span>
                </div>
              </div>
              <figcaption>Cavite · Remote</figcaption>
            </figure>
            <div className="about-copy">
              <p className="about-label">Profile / 01</p>
              <p className="about-lead">
                I design and build web products for teams that care how the thing feels in the hand: tight grids, honest copy, and interfaces that stay quiet until they need to speak.
              </p>
              <p>
                Most of my work sits between engineering and design — translating a brief into components, data, and a page that still looks considered after six months of real use.
              </p>
              <dl className="facts">
                <div>
                  <dt>Focus</dt>
                  <dd>Web apps, sites, and internal tools</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>TypeScript, React, Node, SQL</dd>
                </div>
                <div>
                  <dt>Availability</dt>
                  <dd>Open for selected freelance work</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="block reveal services-block" id="services">
          <div className="wrap">
            <header className="block-head">
              <h2>What I can do</h2>
            </header>
            <ul className="service-cards">
              {services.map((service) => (
                <li className="service-card" key={service.id}>
                  <div className="service-card-head">
                    <span className="service-icon" aria-hidden="true">
                      {service.icon}
                    </span>
                    <span className="service-id">{service.id}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-card-foot">
                    <p className="service-tags">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </p>
                    <span className="service-slot" aria-hidden="true" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="block reveal" id="education">
          <div className="wrap">
            <header className="block-head">
              <h2>Education</h2>
            </header>
            <ol className="timeline">
              <li>
                <time>NCST</time>
                <div>
                  <h3>Bachelor of Science in Information Technology (BSIT)</h3>
                  <p>
                    National College of Science and Technology (NCST), Dasmariñas, Cavite — a foundation in technology, design, and shipping real web work.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="block reveal" id="skills">
          <div className="wrap">
            <header className="block-head">
              <h2>Skills &amp; technologies</h2>
            </header>
            <ul className="skill-board">
              {skills.map((skill) => (
                <li className="skill-card" key={skill.name} tabIndex={0}>
                  <span className="skill-logo" aria-hidden="true">
                    {skill.logo ? <img src={skill.logo} alt="" /> : skill.svg}
                  </span>
                  <span className="skill-name">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="block reveal" id="work">
          <div className="wrap">
            <header className="block-head">
              <h2>Featured projects</h2>
            </header>
            <div className="projects">
              <article className="project">
                <span className="project-corner project-corner-tl" aria-hidden="true" />
                <span className="project-corner project-corner-tr" aria-hidden="true" />
                <span className="project-corner project-corner-bl" aria-hidden="true" />
                <span className="project-corner project-corner-br" aria-hidden="true" />
                <div className="project-preview">
                  <div className="project-shot">
                    <img src={projectShot} alt="TuToy Hub" />
                    <a
                      className="project-preview-link"
                      href="https://tutoyhub.shop/"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Open live preview for TuToy Hub"
                    >
                      Live preview
                    </a>
                    <span className="project-scan" aria-hidden="true" />
                  </div>
                </div>
                <div className="project-body">
                  <h3>TuToy Hub</h3>
                  <p>
                    I designed the TuToy Hub website from the ground up, focusing on a responsive, accessible interface and a frictionless user journey designed to align with the brand&apos;s core business goals.
                  </p>
                </div>
                <ul className="project-stack">
                  <li>Figma</li>
                  <li>React</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="block reveal" id="certifications">
          <div className="wrap">
            <header className="block-head">
              <p className="section-kicker">Credentials</p>
              <h2>Certifications</h2>
              <p>Professional credentials that reinforce my approach to product design, systems thinking, and delivery.</p>
            </header>

            <div className="cert-grid">
              {certifications.map((cert) => (
                <article className={`cert-item ${cert.featured ? 'featured' : ''}`} key={cert.title}>
                  <div className="cert-header">
                    <span className="cert-index">{cert.index}</span>
                    <span className="cert-type">{cert.type}</span>
                  </div>
                  <div className="cert-body">
                    <div className={`cert-badge ${cert.badgeClass}`} aria-label="Certification badge">
                      <img src={cert.badge} alt="Badge logo" />
                    </div>
                    <div className="cert-copy">
                      <p className="cert-label">{cert.label}</p>
                      <h3>{cert.title}</h3>
                      <p>{cert.description}</p>
                      <a className="cert-link" href={cert.href} target="_blank" rel="noreferrer">
                        View certification
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-shell">
          <div className="footer-brand">
            <a className="mark" href="#top" aria-label="Home"><span>J</span></a>
            <p>JohnMark Clarence Mendoza — UI/UX Designer</p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <a href="#top">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#work">Portfolio</a>
            <a href="#education">Education</a>
          </nav>

          <div className="footer-meta">
            <ul className="social" aria-label="Social links">
              <li>
                <a href="https://github.com/" rel="noopener noreferrer" aria-label="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.1.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.71 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M6.5 8.4H3.6V20h2.9V8.4ZM5 3.3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.4 20h-2.9v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V20H10.6V8.4h2.78v1.58h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44V20Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://x.com/" rel="noopener noreferrer" aria-label="X">
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M18.24 3H21l-6.52 7.45L22 21h-6.17l-4.82-6.3L5.5 21H2.73l6.97-7.97L2 3h6.32l4.36 5.77L18.24 3Zm-1.08 16.2h1.51L6.93 4.7H5.3l11.86 14.5Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="wrap footer-bar">
          <p>© 2026 JohnMark Clarence Mendoza</p>
        </div>
      </footer>

      <canvas className="mouse-trail" id="mouse-trail" aria-hidden="true" ref={canvasRef} />
    </div>
  )
}

export default App
