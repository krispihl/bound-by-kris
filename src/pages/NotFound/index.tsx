import { usePageTitle } from '../../hooks/usePageTitle'

import styles from './index.module.css'

export const NotFound = () => {
	usePageTitle('Page not found')

	return (
		<div className={styles.page}>
			{/* Starts with what the page is for screen readers, which the quote alone wouldn't say. */}
			<h1 className={styles.page__title}>
				<span className="visually-hidden">Page not found. </span>
				Not all those who wander are lost. <span className={styles.page__twist}>But you seem to be.</span>
			</h1>
			<span className={styles.page__divider} aria-hidden="true" />
			{/* Decoration: the heading already says what it means. */}
			<p className={styles.page__code} aria-hidden="true">
				404
			</p>
		</div>
	)
}
