import styles from './index.module.css'

// A ring with an accent arc and a glowing dot chasing it round, with "Loading" in the middle. Screen readers skip the
// drawing and announce the label instead, which can say what is loading.
export const Spinner = ({ label }: { label: string }) => {
	return (
		<div className={styles.spinner} role="status">
			<span className={styles.spinner__ring} aria-hidden="true">
				<span className={styles.spinner__arc} />
				<span className={styles.spinner__dot} />
				<span className={styles.spinner__text}>Loading</span>
			</span>
			<span className="visually-hidden">{label}</span>
		</div>
	)
}
