import { FaHouse } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'

import { SocialLinks } from '../SocialLinks'

import styles from './index.module.css'

// The site footer, at the bottom right of every page. Kept outside <main> so it's the page's footer landmark. The
// homepage has the social links in it; every other page has a link back to the homepage.
export const Footer = () => {
	const { pathname } = useLocation()

	return (
		<footer className={styles.footer}>
			{pathname === '/' ? (
				<SocialLinks />
			) : (
				<Link to="/" className={styles.link} aria-label="Home page">
					<FaHouse className={styles.icon} aria-hidden="true" focusable="false" />
				</Link>
			)}
		</footer>
	)
}
