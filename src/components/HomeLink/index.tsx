import { FaHouse } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'

import styles from './index.module.css'

// Sits at the bottom right of every page but the homepage itself.
export const HomeLink = () => {
	const { pathname } = useLocation()

	if (pathname === '/') {
		return null
	}

	return (
		<footer className={styles.footer}>
			<Link to="/" className={styles.link} aria-label="Home page">
				<FaHouse className={styles.icon} aria-hidden="true" focusable="false" />
			</Link>
		</footer>
	)
}
