import styles from './index.module.css'

// A ring with an accent arc and a glowing dot chasing it round, with "Loading" in the middle.
export const Spinner = () => {
	return (
		<div className={styles.spinner} aria-hidden="true">
			<span className={styles.spinner__ring}>
				<span className={styles.spinner__arc} />
				<span className={styles.spinner__dot} />
				<span className={styles.spinner__text}>Loading</span>
			</span>
		</div>
	)
}
