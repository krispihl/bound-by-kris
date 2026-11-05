import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useScrollLock } from '../../hooks/useScrollLock'

import styles from './index.module.css'

const LINKS = [
	{ to: '/', label: 'Home', note: 'page' },
	{ to: '/about', label: 'About', note: 'me' },
	{ to: '/a11y-bites', label: 'a11y bites', note: 'I wrote' },
	{ to: '/boardgames', label: 'Board games', note: 'I play' },
]

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const headerRef = useRef<HTMLElement>(null)
	const toggleRef = useRef<HTMLButtonElement>(null)

	const close = useCallback(() => setIsOpen(false), [])

	// Escape can be pressed on a menu link, which then hides, so focus goes back to the toggle rather than to the page.
	const closeAndRefocus = useCallback(() => {
		setIsOpen(false)
		toggleRef.current?.focus()
	}, [])

	useEscapeKey(isOpen, closeAndRefocus)
	useScrollLock(isOpen)

	// The open menu covers the whole window, so the page beside the header (main and the footer) is made inert while it
	// is: Tab stays between the toggle and the menu links instead of reaching links hidden behind it.
	useEffect(() => {
		const parent = headerRef.current?.parentElement
		if (!isOpen || !parent) {
			return
		}

		const siblings = Array.from(parent.children).filter((child) => child !== headerRef.current)
		siblings.forEach((sibling) => sibling.setAttribute('inert', ''))

		return () => {
			siblings.forEach((sibling) => sibling.removeAttribute('inert'))
		}
	}, [isOpen])

	return (
		<header ref={headerRef} className={styles.header}>
			<button
				ref={toggleRef}
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
					{LINKS.map(({ to, label, note }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) => `${styles.link}${isActive ? ` ${styles['link--active']}` : ''}`}
								onClick={close}
							>
								<span className={styles.label}>{label}</span> <span className={styles.note}>{note}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
