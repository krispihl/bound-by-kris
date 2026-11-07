import { FaHouse } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'

import { SocialLinks } from '../SocialLinks'
import styles from './index.module.css'

export const Footer = () => {
	const { pathname } = useLocation()

	return (
		<footer className={styles.footer}>
			{pathname === '/' ? (
				<SocialLinks />
			) : (
				<Link to="/" className={styles.link} aria-label="Back to home page">
					<FaHouse className={styles.icon} aria-hidden="true" focusable="false" />
				</Link>
			)}
		</footer>
	)
}
