import styles from './index.module.css'

// For any address the site doesn't have, and for private pages while locked, so the two look the same.
export const NotFound = () => {
	return (
		<div className={styles.page}>
			<h1 className={styles.page__title}>Page not found</h1>
			<p className={styles.page__text}>There’s nothing at this address.</p>
		</div>
	)
}
