import { useEffect, useRef, useState } from 'react'

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

// How long Krispi takes to burst apart once dismissed, in ms: the --leave-duration in the CSS.
const LEAVE_DURATION = 900

// Krispi, the site's pill-shaped mascot, drawn in CSS. Only decoration, so screen readers skip the drawing; the one
// thing they reach is the button that hides it, which a visitor who'd rather not have it around can press to hide it
// on every page from then on. Where it sits and how it moves is up to the page placing it (through className); the
// pose sets the face and hands.
export const Krispi = ({ pose = 'idle', glances = false, className }: KrispiProps) => {
	const { isDismissed, dismiss } = useDismissed('krispi-dismissed')
	const [isLeaving, setIsLeaving] = useState(false)
	const [isRevealed, setIsRevealed] = useState(false)
	const ref = useRef<HTMLSpanElement>(null)

	// A touch screen can't hover to bring out the dismiss button, so a tap on Krispi does, and a tap anywhere else puts
	// it away again. A mouse has hover for that, so its clicks are left alone.
	useEffect(() => {
		const onPointerDown = (event: PointerEvent) => {
			if (event.pointerType === 'mouse') {
				return
			}

			setIsRevealed(event.target instanceof Node && Boolean(ref.current?.contains(event.target)))
		}

		document.addEventListener('pointerdown', onPointerDown)
		return () => document.removeEventListener('pointerdown', onPointerDown)
	}, [])

	// Bursts apart first, and is only removed once that has played out.
	useEffect(() => {
		if (!isLeaving) {
			return
		}

		const timer = window.setTimeout(dismiss, LEAVE_DURATION)
		return () => window.clearTimeout(timer)
	}, [isLeaving, dismiss])

	if (isDismissed) {
		return null
	}

	const leave = () => {
		// Without motion there's nothing to wait for, so Krispi goes at once.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			dismiss()
		} else {
			setIsLeaving(true)
		}
	}

	const classes = [
		styles.krispi,
		POSE_CLASSES[pose],
		glances && styles['krispi--glance'],
		isRevealed && styles['krispi--revealed'],
		isLeaving && styles['krispi--leaving'],
		className,
	]
		.filter(Boolean)
		.join(' ')

	return (
		<span ref={ref} className={classes}>
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
				<button className={styles.krispi__dismiss} aria-label="Hide the Krispi mascot" onClick={leave} />
			</span>
		</span>
	)
}
