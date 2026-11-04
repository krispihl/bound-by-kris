import styles from './index.module.css'

type KrispiPose = 'idle' | 'peek'

// Krispi, the site's pill-shaped mascot, drawn in CSS. Only decoration, so screen readers skip it, the question in its
// speech bubble included: it just chats when the mouse is over it. Where it sits and how it moves is up to the page
// placing it (through className); the pose sets the face and hands.
export const Krispi = ({ pose = 'idle', className }: { pose?: KrispiPose; className?: string }) => {
	const classes = [styles.krispi, pose === 'peek' ? styles['krispi--peek'] : '', className].filter(Boolean).join(' ')

	return (
		<span className={classes} aria-hidden="true">
			<span className={styles.krispi__hair}>
				{(['left', 'middle', 'right'] as const).map((side) => (
					<span key={side} className={`${styles.krispi__strand} ${styles[`krispi__strand--${side}`]}`} />
				))}
			</span>
			<span className={styles.krispi__face}>
				<span className={styles.krispi__eye} />
				<span className={styles.krispi__eye} />
				<span className={styles.krispi__mouth} />
			</span>
			{pose === 'peek'
				? (['left', 'right'] as const).map((side) => (
						<span key={side} className={`${styles.krispi__hand} ${styles[`krispi__hand--${side}`]}`}>
							<span className={styles.krispi__finger} />
							<span className={styles.krispi__finger} />
							<span className={styles.krispi__finger} />
						</span>
					))
				: null}
			<span className={styles.krispi__bubble}>
				<span className={styles.krispi__speech}>Learned anything new?</span>
			</span>
		</span>
	)
}
