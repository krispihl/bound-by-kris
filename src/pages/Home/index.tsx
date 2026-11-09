import cx from 'classnames'
import type { PointerEvent } from 'react'

import { Cursor } from '../../components/Cursor'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './index.module.css'

const FIRST_NAME = 'Kristina'
const LAST_NAME = 'Pihl'
const LETTER_DELAY = 0.1

// Letters fade in one after another, left to right; `offset` is the number of letter slots to wait before the first
// one. The glow copy skips the fade, as it is invisible until the pointer is over the name.
const renderLetters = (word: string, offset: number, animated: boolean) =>
	Array.from(word, (letter, index) => (
		<span
			key={index}
			className={animated ? styles.hero__letter : undefined}
			style={animated ? { animationDelay: `${(offset + index) * LETTER_DELAY}s` } : undefined}
		>
			{letter}
		</span>
	))

// Where the pointer is over the name, for the glow that follows it.
// Written straight to the style, so moving the pointer doesn't re-render the page.
const followPointer = (event: PointerEvent<HTMLHeadingElement>) => {
	const box = event.currentTarget.getBoundingClientRect()
	event.currentTarget.style.setProperty('--glow-x', `${event.clientX - box.left}px`)
	event.currentTarget.style.setProperty('--glow-y', `${event.clientY - box.top}px`)
}

const Name = ({ animated }: { animated: boolean }) => (
	<>
		<span className={styles.hero__line} aria-hidden="true">
			{renderLetters(FIRST_NAME, 0, animated)}
		</span>
		<span className={cx(styles.hero__line, styles['hero__line--right'])} aria-hidden="true">
			{renderLetters(LAST_NAME, FIRST_NAME.length - LAST_NAME.length, animated)}
		</span>
	</>
)

export const Home = () => {
	usePageTitle()

	return (
		<>
			<div className={styles.hero}>
				<div className={styles.hero__title}>
					<h1 className={styles.hero__name} onPointerMove={followPointer}>
						{/* The name as text for screen readers, marked Estonian so it is said the Estonian way. An aria-label can't
						    carry its own language, so the name is real text here and the letters below are hidden instead. */}
						<span className="screenreader-only" lang="et">
							{FIRST_NAME} {LAST_NAME}
						</span>
						<Name animated />
						<span className={styles.hero__divider} aria-hidden="true" />
						{/* The same name again in the accent colour on top, shown only in a circle around the pointer. */}
						<span className={styles.hero__glow} aria-hidden="true">
							<Name animated={false} />
						</span>
					</h1>
					<p className={styles.hero__intro}>
						Frontend developer passionate about accessibility and fond of good design. <br />A bit serious. A bit fun.
					</p>
				</div>
			</div>
			<Cursor />
		</>
	)
}
