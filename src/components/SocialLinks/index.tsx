import { FaGithub, FaLinkedin } from 'react-icons/fa6'

import styles from './index.module.css'

const LINKS = [
	{ href: 'https://www.linkedin.com/in/kristina-pihl-97461a10a/', label: "Kristina's LinkedIn profile", Icon: FaLinkedin },
	{ href: 'https://github.com/kristinapihl', label: "Kristina's GitHub profile", Icon: FaGithub },
]

export const SocialLinks = () => {
	return (
		<nav aria-label="Social profiles">
			<ul className={styles.list}>
				{LINKS.map(({ href, label, Icon }) => (
					<li key={label}>
						<a className={styles.link} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
							<Icon className={styles.icon} aria-hidden="true" />
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}
