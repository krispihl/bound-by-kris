import { useEffect, useRef, useState } from 'react'

import { BiteContent } from '../../components/BiteContent'
import { RichText } from '../../components/RichText'
import { A11Y_BITES } from '../../data/a11yBites'

import styles from './index.module.css'

export const A11yBites = () => {
  const [openNumber, setOpenNumber] = useState<number | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Opening a bite can leave it above the viewport (e.g. after closing a long one higher up), so bring its whole row back,
  // including the space above the title.
  useEffect(() => {
    const row = listRef.current?.querySelector('[aria-expanded="true"]')?.closest('li')
    if (!row) {
      return
    }

    const title = row.querySelector('h2')?.getBoundingClientRect()
    if (row.getBoundingClientRect().top < 0 || (title && title.bottom > window.innerHeight)) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      row.scrollIntoView({ block: 'start', behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }
  }, [openNumber])

  return (
    <div className={styles.page}>
      <header className={styles.page__header}>
        <h1 className={styles.page__title}>a11y bites</h1>
        <p className={styles.page__intro}>Bite-sized accessibility lessons, one topic at a time. Click one to read it.</p>
      </header>

      <div className={styles.container}>
        <ul ref={listRef} className={styles.list}>
          {A11Y_BITES.map((bite) => {
            const isOpen = openNumber === bite.number
            const buttonId = `bite-${bite.number}-button`
            const panelId = `bite-${bite.number}-panel`
            const summaryId = `bite-${bite.number}-summary`

            return (
              <li key={bite.number} className={`${styles.row}${isOpen ? ` ${styles['row--open']}` : ''}`}>
                <h2 className={styles.row__heading}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.row__button}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-describedby={summaryId}
                    onClick={() => setOpenNumber(isOpen ? null : bite.number)}
                  >
                    {bite.title}
                  </button>
                </h2>
                <span className={styles.row__number} aria-hidden="true">
                  {String(bite.number).padStart(2, '0')}
                </span>
                <p id={summaryId} className={styles.row__summary}>
                  <RichText text={bite.summary} />
                </p>
                <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.row__panel} hidden={!isOpen}>
                  {isOpen ? <BiteContent blocks={bite.content} /> : null}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
