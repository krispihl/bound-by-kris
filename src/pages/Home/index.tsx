import type { PointerEvent } from 'react'

import { SocialLinks } from '../../components/SocialLinks'

import styles from './index.module.css'

const FIRST_NAME = 'Kristina'
const LAST_NAME = 'Pihl'
// PIHL waits for the difference in length, so it fades in under the end of KRISTINA and both finish together.
const LETTER_DELAY = 0.1

// Letters fade in one after another, left to right; `offset` is the number of letter slots to wait before the first one.
const renderLetters = (word: string, offset = 0) =>
	Array.from(word, (letter, index) => (
		<span key={index} className={styles.hero__letter} style={{ animationDelay: `${(offset + index) * LETTER_DELAY}s` }}>
			{letter}
		</span>
	))

// Where the pointer is over the name, for the glow that follows it. Written straight to the style, so moving the pointer
// doesn't re-render the page.
const followPointer = (event: PointerEvent<HTMLHeadingElement>) => {
	const box = event.currentTarget.getBoundingClientRect()
	event.currentTarget.style.setProperty('--glow-x', `${event.clientX - box.left}px`)
	event.currentTarget.style.setProperty('--glow-y', `${event.clientY - box.top}px`)
}

const renderName = () => (
	<>
		<span className={styles.hero__line}>{renderLetters(FIRST_NAME)}</span>
		<span className={`${styles.hero__line} ${styles['hero__line--right']}`}>
			{renderLetters(LAST_NAME, FIRST_NAME.length - LAST_NAME.length)}
		</span>
	</>
)

export const Home = () => {
	return (
		<div className={styles.hero}>
			<div className={styles.hero__title}>
				<p className={styles.hero__intro}>Frontend developer passionate about accessibility and fond of good design.</p>
				<h1 className={styles.hero__name} aria-label={`${FIRST_NAME} ${LAST_NAME}`} onPointerMove={followPointer}>
					<span className={styles.hero__lines} aria-hidden="true">
						{renderName()}
					</span>
					<span className={styles.hero__rule} aria-hidden="true" />
					{/* The same name again in the accent colour on top, shown only in a circle around the pointer. */}
					<span className={styles.hero__glow} aria-hidden="true">
						{renderName()}
					</span>
				</h1>
			</div>
			<footer className={styles.hero__footer}>
				<SocialLinks />
			</footer>
		</div>
	)
}
