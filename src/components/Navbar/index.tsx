import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './index.module.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/books', label: 'Books' },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <header>
      <button
        type="button"
        className={`${styles.toggle}${isOpen ? ` ${styles['toggle--open']}` : ''}`}
        aria-expanded={isOpen}
        aria-controls="site-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.toggleLabel}>{isOpen ? 'Close' : 'Menu'}</span>
        <span className={styles.toggleIcon} aria-hidden="true" />
      </button>

      <nav id="site-menu" aria-label="Main" className={`${styles.menu}${isOpen ? ` ${styles['menu--open']}` : ''}`}>
        <ul className={styles.list}>
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => `${styles.link}${isActive ? ` ${styles['link--active']}` : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
