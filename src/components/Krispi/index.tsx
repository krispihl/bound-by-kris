import styles from './index.module.css'

type KrispiProps = {
	pose?: 'idle' | 'peek'
	// What Krispi says in a speech bubble while the mouse is over it; without it, there's no bubble.
	says?: string
	// Every few blinks, Krispi glances up to the top right between two of them, then looks back at the reader.
	glances?: boolean
	className?: string
}

const POSE_CLASSES = {
	idle: '',
	peek: styles['krispi--peek'],
}

// Krispi, the site's pill-shaped mascot, drawn in CSS. Only decoration, so screen readers skip it, anything it says in
// its speech bubble included: it just chats when the mouse is over it. Where it sits and how it moves is up to the page
// placing it (through className); the pose sets the face and hands.
export const Krispi = ({ pose = 'idle', says, glances = false, className }: KrispiProps) => {
	const classes = [styles.krispi, POSE_CLASSES[pose], glances && styles['krispi--glance'], className].filter(Boolean).join(' ')

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
			{says ? (
				<span className={styles.krispi__bubble}>
					<span className={styles.krispi__speech}>{says}</span>
				</span>
			) : null}
		</span>
	)
}
