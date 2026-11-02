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

export const Home = () => {
	return (
		<div className={styles.hero}>
			<div className={styles.hero__title}>
				<p className={styles.hero__intro}>Frontend developer passionate about accessibility and fond of good design.</p>
				<h1 className={styles.hero__name} aria-label={`${FIRST_NAME} ${LAST_NAME}`}>
					<span className={styles.hero__line} aria-hidden="true">
						{renderLetters(FIRST_NAME)}
					</span>{' '}
					<span className={styles.hero__rule} aria-hidden="true" />{' '}
					<span className={`${styles.hero__line} ${styles['hero__line--right']}`} aria-hidden="true">
						{renderLetters(LAST_NAME, FIRST_NAME.length - LAST_NAME.length)}
					</span>
				</h1>
			</div>
			<footer className={styles.hero__footer}>
				<SocialLinks />
			</footer>
		</div>
	)
}
