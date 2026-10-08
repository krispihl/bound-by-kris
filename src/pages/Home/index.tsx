import styles from './index.module.css'

// Keep roughly in sync with the letter-reveal animation duration in index.module.css (.hero__letter).
const REVEAL_STEP_SECONDS = 0.2

const FIRST_NAME = 'KRISTINA'
const FIRST_NAME_LARGE_COUNT = 4
const LAST_NAME = 'PIHL'
const LAST_NAME_LARGE_COUNT = 2

type StackedWordProps = {
  word: string
  largeLetterCount: number
  delayOffset?: number
}

const StackedWord = ({ word, largeLetterCount, delayOffset = 0 }: StackedWordProps) => (
  <>
    {word.split('').map((letter, index) => (
      <span
        key={index}
        aria-hidden="true"
        className={`${styles.hero__letter}${
          index < largeLetterCount ? ` ${styles['hero__letter--large']}` : ` ${styles['hero__letter--faded']}`
        }`}
        style={{ animationDelay: `${(index + delayOffset) * REVEAL_STEP_SECONDS}s` }}
      >
        {letter}
      </span>
    ))}
  </>
)

// Reserves layout space matching the first name's large letters so the last name starts where the
// first name's small letters start, without coupling row heights to it.
const LetterSpacer = ({ word }: { word: string }) => (
  <>
    {word.split('').map((letter, index) => (
      <span
        key={index}
        aria-hidden="true"
        className={`${styles.hero__letter} ${styles['hero__letter--large']} ${styles['hero__letter--hidden']}`}
      >
        {letter}
      </span>
    ))}
  </>
)

export const Home = () => {
  return (
    <h1 className={styles.hero}>
      <div className={`${styles.hero__name} ${styles['hero__name--left']}`} aria-label={FIRST_NAME}>
        <StackedWord word={FIRST_NAME} largeLetterCount={FIRST_NAME_LARGE_COUNT} />
      </div>
      <div className={styles.hero__divider} />
      <div className={`${styles.hero__name} ${styles['hero__name--right']}`} aria-label={LAST_NAME}>
        <LetterSpacer word={FIRST_NAME.slice(0, FIRST_NAME_LARGE_COUNT)} />
        <StackedWord word={LAST_NAME} largeLetterCount={LAST_NAME_LARGE_COUNT} delayOffset={FIRST_NAME.length} />
      </div>
    </h1>
  )
}
