import styles from './index.module.css'

export const About = () => {
	return (
		<div className={styles.page}>
			<header className={styles.page__header}>
				<h1 className={styles.page__title}>About</h1>
				<p className={styles.page__intro}>A few words about me.</p>
			</header>

			<div className={styles.content}>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
					veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
		</div>
	)
}
