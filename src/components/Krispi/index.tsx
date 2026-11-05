import { useDismissed } from '../../hooks/useDismissed'

import styles from './index.module.css'

type KrispiProps = {
	pose?: 'idle' | 'peek'
	// Every few blinks, Krispi glances up to the top right between two of them, then looks back at the reader.
	glances?: boolean
	className?: string
}

const POSE_CLASSES = {
	idle: '',
	peek: styles['krispi--peek'],
}

// Krispi, the site's pill-shaped mascot, drawn in CSS. Only decoration, so screen readers skip the drawing; the one
// thing they reach is the button that hides it, which a visitor who'd rather not have it around can press to hide it
// on every page from then on. Where it sits and how it moves is up to the page placing it (through className); the
// pose sets the face and hands.
export const Krispi = ({ pose = 'idle', glances = false, className }: KrispiProps) => {
	const { isDismissed, dismiss } = useDismissed('krispi-dismissed')

	if (isDismissed) {
		return null
	}

	const classes = [styles.krispi, POSE_CLASSES[pose], glances && styles['krispi--glance'], className].filter(Boolean).join(' ')

	return (
		<span className={classes}>
			<span className={styles.krispi__hair} aria-hidden="true">
				{(['left', 'middle', 'right'] as const).map((side) => (
					<span key={side} className={`${styles.krispi__strand} ${styles[`krispi__strand--${side}`]}`} />
				))}
			</span>
			<span className={styles.krispi__face} aria-hidden="true">
				<span className={styles.krispi__eye} />
				<span className={styles.krispi__eye} />
				<span className={styles.krispi__mouth} />
			</span>
			{pose === 'peek'
				? (['left', 'right'] as const).map((side) => (
						<span key={side} className={`${styles.krispi__hand} ${styles[`krispi__hand--${side}`]}`} aria-hidden="true">
							<span className={styles.krispi__finger} />
							<span className={styles.krispi__finger} />
							<span className={styles.krispi__finger} />
						</span>
					))
				: null}
			<span className={styles.krispi__corner}>
				<button type="button" className={styles.krispi__dismiss} aria-label="Hide the Krispi mascot" onClick={dismiss} />
			</span>
		</span>
	)
}
