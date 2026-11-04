import { useCallback, useState } from 'react'
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

	const close = useCallback(() => setIsOpen(false), [])

	useEscapeKey(isOpen, close)
	useScrollLock(isOpen)

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
					{LINKS.map(({ to, label, note }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) => `${styles.link}${isActive ? ` ${styles['link--active']}` : ''}`}
								onClick={close}
							>
								{label} <span className={styles.note}>{note}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
