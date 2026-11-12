import cx from 'classnames'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { A11yText } from '../A11yText'
import { HEADER_HEADING_ID } from '../PageHeading'
import { useScrollLock } from '../../hooks/useScrollLock'
import styles from './index.module.css'

const LINKS: { to: string; label: ReactNode }[] = [
	{ to: '/', label: 'Home' },
	{ to: '/about', label: 'About' },
	{
		to: '/a11y-bites',
		label: (
			<>
				<A11yText /> bites
			</>
		),
	},
	{ to: '/boardgames', label: 'Board games' },
]

// Passes the link's position to the CSS, which uses it to fade the links in one after another.
const linkStyle = (index: number): CSSProperties & Record<'--index', number> => ({ '--index': index })

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	// The page stays locked until the menu has finished closing, not just until it starts to: unlocking brings the
	// scrollbar back, and its strip would cut off the edge of the menu while it is still shrinking away.
	const [isLocked, setIsLocked] = useState(false)
	if (isOpen && !isLocked) {
		setIsLocked(true)
	}

	const headerRef = useRef<HTMLElement>(null)
	const toggleRef = useRef<HTMLButtonElement>(null)

	const close = () => setIsOpen(false)

	useScrollLock(isLocked)

	// Escape closes the open menu and moves focus back to the toggle rather than to the page.
	useEffect(() => {
		if (!isOpen) {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false)
				toggleRef.current?.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen])

	// The open menu covers the whole window, so the page beside the header (main and the footer) is made inert while it is open.
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
		<header ref={headerRef} className={styles.header} data-site-header>
			{/* Where the page heading settles once the page has scrolled (see PageHeading). */}
			<div id={HEADER_HEADING_ID} className={styles.heading} />
			<button
				ref={toggleRef}
				className={cx(styles.toggle, isOpen && styles['toggle--open'])}
				aria-expanded={isOpen}
				aria-controls="site-menu"
				onClick={() => setIsOpen((open) => !open)}
			>
				<span>{isOpen ? 'Close' : 'Menu'}</span>
				<span className={styles.toggleIcon} aria-hidden="true" />
			</button>

			<nav
				id="site-menu"
				aria-label="Main"
				className={cx(styles.menu, isOpen && styles['menu--open'])}
				onTransitionEnd={(event) => {
					// Visibility is the menu's last change on closing, with or without reduced motion.
					if (!isOpen && event.target === event.currentTarget && event.propertyName === 'visibility') {
						setIsLocked(false)
					}
				}}
			>
				<ul className={styles.list}>
					{LINKS.map(({ to, label }, index) => (
						<li key={to} style={linkStyle(index)}>
							<NavLink to={to} className={({ isActive }) => cx(styles.link, isActive && styles['link--active'])} onClick={close}>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
