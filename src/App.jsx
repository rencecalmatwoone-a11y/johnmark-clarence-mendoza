import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import LightRays from './LightRays'
import HeroRole from './HeroRole'
import HeroPeek from './HeroPeek'
import VisitorActivity from './VisitorActivity'
import GitHubActivity from './GitHubActivity'
import SiteCursor from './SiteCursor'
import ContactChat from './ContactChat'
import { useInteractionSounds } from './useInteractionSounds'
import useVisibleSound from './useVisibleSound'
import useCardSwipe from './useCardSwipe'
import portraitImageLight from './assets/4D5D0585-DFC6-4EC7-BCDB-D0E89B846AA9.png'
import portraitImageDark from './assets/BEBB1230-213E-4394-995C-D9CC1F9F41D8.png'
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
import aiFundamentalsBadge from './assets/ai-fundamentals-badge.png'
import itCustomerSupportBadge from './assets/it-customer-support-badge.png'
import ncstLogo from './assets/ncst-logo.png'
import databricksLogo from './assets/databricks-logo.svg'
import hackerrankLogo from './assets/hackerrank-logo.svg'
import googleLogo from './assets/google-logo.svg'
import projectShot from './assets/Screenshot 2026-08-31 181008.png'
import musyncShot from './assets/musync.png'
import nodejsIcon from './assets/nodejs.svg'
import gitIcon from './assets/git.svg'
import vscodeIcon from './assets/vscode.svg'
import stitchIcon from './assets/google-stitch.png'
import figmaIcon from './assets/figma.svg'
import supabaseIcon from './assets/supabase.svg'
import bootstrapIcon from './assets/bootstrap.svg'

const navItems = [
  { label: 'About me', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  {
    id: '[ SRV_01 ]',
    title: 'UI/UX Design',
    description:
      'I design and build wireframes, interactive prototypes, and design systems built for seamless handoff—ensuring high-contrast interfaces with strong typographic hierarchy across web and mobile.',
    tags: ['#FIGMA', 'WORDPRESS'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 22" fill="none" aria-hidden="true">
        <circle cx="12" cy="11" r="8.2" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="12" cy="11" rx="3.4" ry="8.2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3.8 11h16.4M6.2 6.4h11.6M6.2 15.6h11.6" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: '[ SRV_02 ]',
    title: 'Front-end Development',
    description:
      'Dynamic user interfaces and scalable full-stack web applications wired with efficient APIs, seamless server-side rendering, and robust database management.',
    tags: ['#REACTJS', '#TYPESCRIPT',],
    icon: (
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden="true">
        <rect x="3.2" y="1.2" width="11.6" height="19.6" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.4 3.2h3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
        <circle cx="9" cy="17.4" r="0.7" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: '[ SRV_03 ]',
    title: 'Project Management',
    description:
      'End-to-end agile delivery, cloud infrastructure alignment, and cross-functional leadership ensuring milestones ship on time, within scope, and aligned with core business goals.',
    tags: ['#SCRUM', '#PROJECT MANAGEMENT'],
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

const skillFilters = [
  { label: 'All', names: null },
  { label: 'Frontend', names: ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'Bootstrap', 'ReactJS', 'Next.js', 'TypeScript'] },
  { label: 'Backend', names: ['PHP', 'JavaScript', 'TypeScript', 'Node.js', 'Supabase'] },
  { label: 'Design', names: ['Figma', 'Google Stitch'] },
  { label: 'Databases', names: ['MySQL', 'Supabase'] },
  { label: 'Tools & platforms', names: ['WordPress', 'Cursor', 'VS Code', 'Vercel', 'Git', 'GitHub'] },
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
  { name: 'Bootstrap', logo: bootstrapIcon },
  { name: 'PHP', logo: phpIcon },
  { name: 'ReactJS', logo: null, svg: (
    <svg viewBox="0 0 32 32" role="img" aria-hidden="true">
      <circle cx="16" cy="16" r="2.4" fill="#61DAFB" />
      <ellipse cx="16" cy="16" rx="11.5" ry="4.4" fill="none" stroke="#61DAFB" strokeWidth="1.6" />
      <ellipse cx="16" cy="16" rx="11.5" ry="4.4" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="11.5" ry="4.4" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 16 16)" />
    </svg>
  ) },
  { name: 'Next.js', logo: null, svg: (
    <svg viewBox="0 0 180 180" role="img" aria-hidden="true">
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <path d="M149.508 157.52 69.142 54H54v71.97h12.114V69.384l73.885 95.46a90.45 90.45 0 0 0 9.509-7.324Z" fill="#ffffff" />
      <path d="M115 54h12v72h-12z" fill="#ffffff" />
    </svg>
  ) },
  { name: 'TypeScript', logo: typescriptIcon },
  { name: 'Figma', logo: figmaIcon },
  { name: 'WordPress', logo: wordpressIcon },
  { name: 'Node.js', logo: nodejsIcon },
  { name: 'MySQL', logo: mysqlIcon },
  { name: 'Cursor', logo: null, svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
      <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z" />
    </svg>
  ) },
  { name: 'VS Code', logo: vscodeIcon },
  { name: 'Google Stitch', logo: stitchIcon },
  { name: 'Supabase', logo: supabaseIcon },
  { name: 'Vercel', logo: null, svg: (
    <svg viewBox="0 0 32 32" role="img" aria-hidden="true">
      <path d="M16 3 31 29H1Z" fill="currentColor" />
    </svg>
  ) },
  { name: 'Git', logo: gitIcon },
  { name: 'GitHub', logo: null, svg: (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path fill="currentColor" d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.652.242 2.873.12 3.176.768.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.624-5.48 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.902-.015 3.296 0 .322.216.696.825.578C20.565 22.297 24 17.8 24 12.5c0-6.63-5.373-12-12-12Z" />
    </svg>
  ) },
]

function HeroStack({ category }) {
  const stack = category === 'Management'
    ? [{ name: 'Microsoft 365', logo: microsoftBadge }, { name: 'Google Workspace', logo: googleLogo }]
    : (category === 'Frontend'
      ? ['ReactJS', 'Next.js', 'TypeScript', 'Tailwind']
      : skillFilters.find((filter) => filter.label === category).names
    ).map((name) => skills.find((skill) => skill.name === name))

  if (category === 'Design') {
    stack.push(skills.find((skill) => skill.name === 'WordPress'))
  }

  return (
    <span className="hero-stack">
      {stack.map((skill) => (
        <span className="hero-stack-item" key={skill.name} tabIndex={0} role="img" aria-label={skill.name}>
          <span className="hero-stack-logo" aria-hidden="true">
            {skill.logo ? <img src={skill.logo} alt="" /> : skill.svg}
          </span>
          <span className="hero-stack-tooltip" aria-hidden="true">{skill.name}</span>
        </span>
      ))}
    </span>
  )
}

const certifications = [
  {
    index: '[ 01 ]',
    type: 'Front-end',
    badge: ibmBadge,
    organization: 'IBM',
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
    organization: 'Microsoft',
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
    organization: 'Packt',
    label: 'Specialization',
    title: 'CompTIA Security+ (SY0-701) Specialization',
    description: 'Focused on cybersecurity fundamentals, operational security, and resilient system practices.',
    href: 'https://www.coursera.org/account/accomplishments/specialization/certificate/PT0AFOSJ1HLK',
    featured: false,
    badgeClass: '',
  },
  {
    index: '[ 04 ]',
    type: 'IoT',
    badge: ncstLogo,
    organization: 'NCST',
    label: 'Seminar',
    title: 'Internet of Things Seminar',
    description: 'A seminar credential covering IoT concepts, connected systems, and emerging technology applications.',
    href: 'https://credsverse.com/credentials/ca9e8a9a-519d-4b0c-8bdb-4e72bb8f8ca5?preview=1',
    featured: false,
    badgeClass: 'organization',
  },
  {
    index: '[ 05 ]', type: 'AI', badge: aiFundamentalsBadge, organization: 'IBM SkillsBuild', badgeClass: 'credential',
    label: 'Credential', title: 'AI Fundamentals',
    description: 'Foundational concepts in artificial intelligence and its practical applications.',
    href: 'https://www.credly.com/badges/996e6d25-1f0c-4114-8bd4-28d3938bac6d',
  },
  {
    index: '[ 06 ]', type: 'Generative AI', badge: databricksLogo, organization: 'Databricks', badgeClass: 'organization',
    label: 'Databricks', title: 'Generative AI Fundamentals',
    description: 'An introduction to generative AI concepts and applications.',
    href: 'https://customer-academy.databricks.com/lms/index.php?r=myActivities/downloadCertificate&course_id=1765&id_user=1659338',
  },
  {
    index: '[ 07 ]', type: 'IT Support', badge: itCustomerSupportBadge, organization: 'Cisco', badgeClass: 'credential',
    label: 'Credential', title: 'IT Customer Support Basics',
    description: 'Foundational skills for assisting customers and resolving everyday IT issues.',
    href: 'https://www.credly.com/badges/87c9454f-697e-4e19-a5d0-7d0fb5b3c401/public_url',
  },
  {
    index: '[ 08 ]', type: 'Database', badge: hackerrankLogo, organization: 'HackerRank', badgeClass: 'organization',
    label: 'HackerRank', title: 'SQL (Advanced)',
    description: 'Advanced SQL skills for querying and working with relational data.',
    href: 'https://www.hackerrank.com/certificates/c1aff7f5b805',
  },
  {
    index: '[ 09 ]', type: 'IT Support', badge: googleLogo, organization: 'Google', badgeClass: 'organization',
    label: 'Course', title: 'Technical Support Fundamentals',
    description: 'Core technical support concepts, troubleshooting, and IT fundamentals.',
    href: 'https://www.coursera.org/account/accomplishments/verify/38CLSQF1TA7H?utm_source=ios&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
  },
]

function CertificationBadge({ cert }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = cert.badge && !imageFailed

  return (
    <div className={`cert-badge ${showImage ? cert.badgeClass : 'text'}`}>
      {showImage ? (
        <img src={cert.badge} alt={`${cert.organization} ${cert.badgeClass === 'credential' ? `${cert.title} badge` : 'logo'}`} onError={() => setImageFailed(true)} />
      ) : <span>{cert.organization}</span>}
    </div>
  )
}

function App() {
  const [activeSkillFilter, setActiveSkillFilter] = useState('All')
  const selectedSkillFilter = skillFilters.find((filter) => filter.label === activeSkillFilter)
  const visibleSkills = skills.filter((skill) => !selectedSkillFilter.names || selectedSkillFilter.names.includes(skill.name))
  const [activeCert, setActiveCert] = useState(0)
  const { playSwipe } = useInteractionSounds()
  const { ref: certSoundRef, play: playVisibleSwipe } = useVisibleSound(playSwipe)
  const moveCert = (direction) => {
    playVisibleSwipe(direction)
    setActiveCert((current) => (current + direction + certifications.length) % certifications.length)
  }
  const certSwipe = useCardSwipe(moveCert)
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
  const [navClosing, setNavClosing] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const favicon = document.querySelector('link[rel="icon"]')
    favicon?.setAttribute('href', theme === 'dark' ? portraitImageDark : portraitImageLight)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Ignore private mode issues.
    }
    const themeToggle = document.querySelector('#theme-toggle')
    themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
  }, [theme])

  useEffect(() => {
    const interactiveSurfaces = document.querySelectorAll('.hero-cta, .header-cta, .skill-card, .profile-card, .about-copy, .edu-card, .cert-item')

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
    if (navOpen) {
      setActiveSection(window.location.hash.replace('#', ''))
      return undefined
    }

    const sectionIds = navItems.map((item) => item.href.slice(1))
    const sections = sectionIds
      .map((id) => [id, document.getElementById(id)])
      .filter(([, el]) => el)

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const header = document.querySelector('#site-header')
        const offset = (header?.offsetHeight || 0) + 8
        let current = sectionIds[0] || ''

        for (const [id, el] of sections) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= offset) {
            current = id
          }
        }

        setActiveSection((prev) => (prev !== current ? current : prev))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [navOpen])

  useEffect(() => {
    if (!navOpen) return undefined
    const handleClickOutside = (event) => {
      const headerEl = document.querySelector('#site-header')
      if (headerEl && !headerEl.contains(event.target)) closeNav()
    }
    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [navOpen])

  useEffect(() => {
    const sections = document.querySelectorAll('main .block.reveal')
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
          } else {
            entry.target.classList.remove('is-inview')
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -26% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isReady])

  const handleThemeToggle = () => {
    const apply = () =>
      flushSync(() =>
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
      )

    if (document.startViewTransition) {
      document.startViewTransition(apply)
    } else {
      apply()
    }
  }

  const handleNavClick = (event, href) => {
    event.preventDefault()
    closeNav()
    const target = document.querySelector(href)
    if (!target) return

    setActiveSection(href.slice(1))
    const header = document.querySelector('#site-header')
    const offset = (header?.offsetHeight || 0) + 18
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    if (history.pushState) {
      history.pushState(null, '', href)
    }
  }

  const closeNav = () => {
    if (!navOpen) return
    setNavClosing(true)
    window.setTimeout(() => {
      setNavOpen(false)
      setNavClosing(false)
    }, 260)
  }

  const toggleNav = () => {
    if (navOpen || navClosing) {
      closeNav()
    } else {
      setNavOpen(true)
    }
  }

  const navClassName = `nav ${navOpen || navClosing ? 'is-open' : ''} ${navClosing ? 'is-closing' : ''}`

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
          <nav className={navClassName} aria-label="Primary">
            <ul id="menu" className="menu">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className={activeSection === item.href.slice(1) ? 'is-active' : ''}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <button
              className={`nav-toggle ${navOpen || navClosing ? 'is-open' : ''}`}
              type="button"
              aria-expanded={navOpen}
              aria-controls="menu"
              aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={toggleNav}
            >
              <span className="nav-toggle-line" />
              <span className="nav-toggle-line" />
              <span className="nav-toggle-line" />
            </button>
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
            <a className="btn btn-outline header-cta" href="resume.pdf" download="JohnMark-Clarence-Mendoza-Resume.pdf">
              <span className="btn-label">Download CV</span>
              <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M7 2v7M4 6.5 7 9.5 10 6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 11.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-rays" aria-hidden="true">
            <LightRays
              raysOrigin="top-center"
              raysColor={theme === 'dark' ? '#4cdb55' : '#34a439'}
              lightMode={theme === 'light'}
              raysSpeed={1.2}
              lightSpread={0.9}
              rayLength={5}
              followMouse={true}
              mouseInfluence={0.2}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
              pulsating={false}
              fadeDistance={1.5}
              saturation={1}
            />
          </div>
          <div className="wrap hero-copy">
            <p className="eyebrow">Hello, World!</p>
            <h1>
              I'm <HeroPeek kind="profile" portrait={theme === 'dark' ? portraitImageDark : portraitImageLight} />, A 23-year-old <HeroRole />
              <br />
              based in <HeroPeek kind="location" />
            </h1>
            <p className="lede">
              I&apos;m a UI/UX Designer <HeroStack category="Design" />, Front-End Developer <HeroStack category="Frontend" />, and Project Manager <HeroStack category="Management" />{' '}
              focused on creating intuitive digital experiences and turning ideas into polished, functional products.
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
              <p className="section-kicker">Profile</p>
              <h2>About me</h2>
              <p>Who I am as a designer and developer — the work I do, the stack I work with, and how I fit into a team.</p>
            </header>
            <div className="profile-column">
              <figure className="portrait profile-card">
                <div className="profile-card-glow" aria-hidden="true" />
                <div className="portrait-frame">
                  <img className="portrait-image portrait-image-light" src={portraitImageLight} alt="Portrait" />
                  <img className="portrait-image portrait-image-dark" src={portraitImageDark} alt="" aria-hidden="true" />
                  <span className="portrait-rule" />
                  <div className="profile-card-details">
                    <strong>JohnMark Clarence Mendoza</strong>
                    <span>UI/UX &amp; Front-end</span>
                  </div>
                </div>
                <figcaption>Tagaytay, Cavite · Student</figcaption>
              </figure>
              <div className="profile-social" aria-label="Social links">
                <a className="social-github" href="https://github.com/rencecalmatwoone-a11y" rel="noopener noreferrer" aria-label="GitHub">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.1.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.71 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
                <a className="social-linkedin" href="https://www.linkedin.com/in/johnmark-clarence-mendoza-9941322b5/" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M6.5 8.4H3.6V20h2.9V8.4ZM5 3.3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.4 20h-2.9v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V20H10.6V8.4h2.78v1.58h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44V20Z" />
                  </svg>
                </a>
                <a className="social-x" href="https://x.com/rencedezvous" rel="noopener noreferrer" aria-label="X">
                  <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M18.24 3H21l-6.52 7.45L22 21h-6.17l-4.82-6.3L5.5 21H2.73l6.97-7.97L2 3h6.32l4.36 5.77L18.24 3Zm-1.08 16.2h1.51L6.93 4.7H5.3l11.86 14.5Z" />
                  </svg>
                </a>
                <a className="social-mail" href="https://mail.google.com/mail/u/1/#inbox" rel="noopener noreferrer" aria-label="Email">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.691 2.28 24 3.434 24 5.457z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-label">Profile / 01</p>
              <p className="about-lead">
                I'm a Front-End Developer, working on responsive, user-friendly, visually appealing web applications. I understand and am experienced in modern JavaScript technologies like React, Next and TypeScript.
              </p>
              <p>
                I also want to ensure that I get a balance between good design, clean and efficient code and ensure that websites run well across multiple devices.
              </p>
              <dl className="facts">
                <div>
                  <dt>Focus</dt>
                  <dd>Web apps, sites, and internal tools</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>TypeScript, React, Next.js, MySQL</dd>
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
              <p className="section-kicker">Services</p>
              <h2>What I can do</h2>
              <p>Design and engineering services that span the whole lifecycle — from interface and UX to front-end build and project delivery.</p>
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

        <section className="block reveal" id="skills">
          <div className="wrap">
            <header className="block-head">
              <p className="section-kicker">Stack</p>
              <h2>Skills &amp; technologies</h2>
              <p>The languages, frameworks, and tools I reach for to design and ship real web work.</p>
            </header>
            <div className="skill-filter-bar">
              <div className="skill-filters" role="group" aria-label="Filter technologies">
                {skillFilters.map((filter) => (
                  <button
                    key={filter.label}
                    className="skill-filter"
                    type="button"
                    aria-pressed={activeSkillFilter === filter.label}
                    aria-controls="skill-results"
                    onClick={() => setActiveSkillFilter(filter.label)}
                  >
                    {filter.label}
                    <span aria-hidden="true">{filter.names ? skills.filter((skill) => filter.names.includes(skill.name)).length : skills.length}</span>
                  </button>
                ))}
              </div>
              <p className="skill-filter-status" role="status" aria-live="polite" aria-atomic="true">
                {activeSkillFilter} · {visibleSkills.length} technologies
              </p>
            </div>
            <ul className="skill-board" id="skill-results" aria-label={`${activeSkillFilter} technologies`}>
              {skills.map((skill) => (
                <li className="skill-card" key={skill.name} tabIndex={0} hidden={!visibleSkills.includes(skill)}>
                  <span className="skill-logo" aria-hidden="true">
                    {skill.logo ? <img src={skill.logo} alt="" /> : skill.svg}
                  </span>
                  <span className="skill-name">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="block reveal" id="education">
          <div className="wrap">
            <header className="block-head">
              <p className="section-kicker">Education</p>
              <h2>Education</h2>
              <p>The academic foundation in information technology behind my design and development work.</p>
            </header>
            <div className="education-grid">
              <article className="edu-card">
                <div className="edu-card-head">
                  <span className="edu-index">[ 01 ]</span>
                  <span className="edu-type">Graduate</span>
                </div>
                <div className="edu-body">
                  <p className="edu-label">High School · Senior High School</p>
                  <h3>Tagaytay City Science National High School - Integrated Senior High School</h3>
                  <p>
                    Graduated with honors — having completed secondary education, building a strong foundation in science, mathematics, and technology that sparked an early interest in programming and digital design.
                  </p>
                </div>
                <div className="edu-foot">
                  <span className="edu-school">TCSNHS</span>
                  <span className="edu-years">2016–2022</span>
                  <span className="edu-location">Tagaytay · Cavite</span>
                </div>
              </article>
              <article className="edu-card featured">
                <div className="edu-card-head">
                  <span className="edu-index">[ 02 ]</span>
                  <span className="edu-type">Undergraduate</span>
                </div>
                <div className="edu-body">
                  <p className="edu-label">Bachelor&apos;s degree</p>
                  <h3>BS Information Technology</h3>
                  <p>
                    Pursuing a degree in Information Technology at NCST, Dasmariñas, Cavite — building hands-on expertise in web technologies, interface design, and modern front-end development while applying classroom concepts to real projects.
                  </p>
                </div>
                <div className="edu-foot">
                  <span className="edu-school">NCST</span>
                  <span className="edu-years">2023–2027</span>
                  <span className="edu-location">Dasmariñas · Cavite</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="block reveal" id="work">
          <div className="wrap">
            <header className="block-head">
              <p className="section-kicker">Portfolio</p>
              <h2>Featured projects</h2>
              <p>Selected work that shows how the pieces come together — designed and built end to end.</p>
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
                  <h3>Collecthieves (TuToy Hub)</h3>
                  <p>
                    I managed and designed some part of the Collecthieves (TuToy Hub) website UI/UX from the ground up, focusing on a responsive, accessible interface and a frictionless user journey designed to align with the brand&apos;s core business goals while managing the development process.
                  </p>
                </div>
                <ul className="project-stack">
                  <li>Figma</li>
                  <li>Wireframing</li>
                </ul>
              </article>
              <article className="project">
                <span className="project-corner project-corner-tl" aria-hidden="true" />
                <span className="project-corner project-corner-tr" aria-hidden="true" />
                <span className="project-corner project-corner-bl" aria-hidden="true" />
                <span className="project-corner project-corner-br" aria-hidden="true" />
                <div className="project-preview">
                  <div className="project-shot">
                    <img className="project-image-contain" src={musyncShot} alt="Musync song guessing game with music filters, playback controls, and score tracking" loading="lazy" />
                    <a
                      className="project-preview-link"
                      href="https://musyncsongguessinggame.vercel.app/"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Open live preview for Musync"
                    >
                      Live preview
                    </a>
                    <span className="project-scan" aria-hidden="true" />
                  </div>
                </div>
                <div className="project-body">
                  <h3>Musync</h3>
                  <p>
                    A song guessing game built with React and Node.js, using Supabase for data and authentication. Integrates Spotify login and playback and Deezer as a fallback, with hosting on Vercel. Multiplayer via Supabase Realtime.
                  </p>
                </div>
                <ul className="project-stack">
                  <li>React</li>
                  <li>Node.js</li>
                  <li>Supabase</li>
                  <li>Spotify API</li>
                  <li>Deezer API</li>
                  <li>Vercel</li>
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

            <div className="cert-carousel" ref={certSoundRef} role="region" aria-roledescription="carousel" aria-label="Certifications">
            <div className="cert-stack" {...certSwipe}>
              {certifications.map((cert, index) => {
                const offset = (index - activeCert + certifications.length) % certifications.length
                const position = offset === 0 ? 'active' : offset === 1 ? 'next' : offset === certifications.length - 1 ? 'previous' : 'hidden'
                return (
                <div className={`cert-slide cert-slide--${position}`} key={cert.title} aria-hidden={position === 'hidden'} inert={position === 'hidden' ? true : undefined}>
                {position !== 'active' && position !== 'hidden' && (
                  <button className="cert-select" type="button" aria-label={`Show ${cert.title}`} onClick={() => moveCert(position === 'next' ? 1 : -1)} />
                )}
                <div className="cert-slide-content" inert={position !== 'active' ? true : undefined}>
                <article className={`cert-item ${cert.featured ? 'featured' : ''}`} key={cert.title}>
                  <div className="cert-header">
                    <span className="cert-index">{cert.index}</span>
                    <span className="cert-type">{cert.type}</span>
                  </div>
                  <div className="cert-body">
                    <CertificationBadge cert={cert} />
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
                </div>
                </div>
                )
              })}
            </div>
            <div className="cert-controls">
              <button type="button" onClick={() => moveCert(-1)} aria-label="Previous certification">←</button>
              <p aria-live="polite" aria-atomic="true"><span className="cert-count">{activeCert + 1} / {certifications.length}</span><span className="cert-current-title">{certifications[activeCert].title}</span></p>
              <button type="button" onClick={() => moveCert(1)} aria-label="Next certification">→</button>
            </div>
            <div className="cert-interaction-tools"><p>Swipe or drag to explore</p></div>
            </div>
          </div>
        </section>
        <GitHubActivity />

      <section className="block reveal" id="contact">
          <div className="wrap">
            <div className="contact-intro">
              <header className="block-head contact-heading">
                <p className="section-kicker">Contact</p>
                <h2 aria-label="Let's design, create, and build incredible work together.">
                  <span aria-hidden="true">Let&apos;s <em className="contact-rotating-word">
                    <span>design</span><span>Create</span><span>Build</span>
                  </em><br />incredible work<br />together.</span>
                </h2>
              </header>
              <ContactChat portrait={theme === 'dark' ? portraitImageDark : portraitImageLight} />
            </div>

            <div className="contact-cards">
              <a className="contact-item" href="https://mail.google.com/mail/?view=cm&to=rencecalmatwo.one%40gmail.com" target="_blank" rel="noopener noreferrer">
                <span className="contact-item-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4.5" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="m2.5 5.5 9.5 7 9.5-7" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                <span className="contact-item-copy">
                  <span className="contact-item-label">Email</span>
                  <span className="contact-item-value">rencecalmatwo.one@gmail.com</span>
                </span>
                <span className="contact-item-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 14 14">
                    <path d="M2 7h9M7.5 3.5 11.5 7 7.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </a>
              <a className="contact-item" href="https://github.com/rencecalmatwoone-a11y" target="_blank" rel="noopener noreferrer">
                <span className="contact-item-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.1.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.71 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
                </span>
                <span className="contact-item-copy">
                  <span className="contact-item-label">GitHub</span>
                  <span className="contact-item-value">rencecalmatwoone-a11y</span>
                </span>
                <span className="contact-item-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 14 14">
                    <path d="M2 7h9M7.5 3.5 11.5 7 7.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </a>
              <a className="contact-item" href="https://www.linkedin.com/in/johnmark-clarence-mendoza-9941322b5/" target="_blank" rel="noopener noreferrer">
                <span className="contact-item-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6.5 8.4H3.6V20h2.9V8.4ZM5 3.3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.4 20h-2.9v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V20H10.6V8.4h2.78v1.58h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44V20Z" />
                  </svg>
                </span>
                <span className="contact-item-copy">
                  <span className="contact-item-label">LinkedIn</span>
                  <span className="contact-item-value">JohnMark Clarence Mendoza</span>
                </span>
                <span className="contact-item-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 14 14">
                    <path d="M2 7h9M7.5 3.5 11.5 7 7.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </a>
              <a className="contact-item" href="https://x.com/rencedezvous" target="_blank" rel="noopener noreferrer">
                <span className="contact-item-icon" aria-hidden="true">
                  <svg width="19" height="19" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.24 3H21l-6.52 7.45L22 21h-6.17l-4.82-6.3L5.5 21H2.73l6.97-7.97L2 3h6.32l4.36 5.77L18.24 3Zm-1.08 16.2h1.51L6.93 4.7H5.3l11.86 14.5Z" />
                  </svg>
                </span>
                <span className="contact-item-copy">
                  <span className="contact-item-label">X</span>
                  <span className="contact-item-value">@rencedezvous</span>
                </span>
                <span className="contact-item-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 14 14">
                    <path d="M2 7h9M7.5 3.5 11.5 7 7.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <div className="scroll-reveal-veil" aria-hidden="true" />

      <footer className="site-footer">
        <div className="wrap footer-shell">
          <div className="footer-brand">
            <a className="mark" href="#top" aria-label="Home"><span>J</span></a>
            <p>JohnMark Clarence Mendoza — UI/UX Designer &amp; Front-End Developer</p>
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
                <a href="https://github.com/rencecalmatwoone-a11y" rel="noopener noreferrer" aria-label="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.1.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.71 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/johnmark-clarence-mendoza-9941322b5/" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M6.5 8.4H3.6V20h2.9V8.4ZM5 3.3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.4 20h-2.9v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V20H10.6V8.4h2.78v1.58h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44V20Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://x.com/rencedezvous" rel="noopener noreferrer" aria-label="X">
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M18.24 3H21l-6.52 7.45L22 21h-6.17l-4.82-6.3L5.5 21H2.73l6.97-7.97L2 3h6.32l4.36 5.77L18.24 3Zm-1.08 16.2h1.51L6.93 4.7H5.3l11.86 14.5Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://mail.google.com/mail/u/1/#inbox" rel="noopener noreferrer" aria-label="Email">
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.691 2.28 24 3.434 24 5.457z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="wrap footer-bar">
          <VisitorActivity />
          <p>© 2026 JohnMark Clarence Mendoza</p>
        </div>
      </footer>

      <SiteCursor />
    </div>
  )
}

export default App
