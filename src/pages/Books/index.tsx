import type { MouseEvent } from 'react'

import { BOOKS } from '../../data/books'

import styles from './index.module.css'

// Lets a click on the opened content close its book, unless the reader is selecting text.
const closeOnContentClick = (event: MouseEvent<HTMLDivElement>) => {
  if (window.getSelection()?.toString()) {
    return
  }
  const details = event.currentTarget.closest('details')
  if (details) {
    details.open = false
  }
}

export const Books = () => {
  return (
    <div className={styles.page}>
      <header className={styles.page__header}>
        <h1 className={styles.page__title}>Books</h1>
        <p className={styles.page__intro}>My book journey starts here.</p>
      </header>

      <ul className={styles.list}>
        {BOOKS.map((book) => (
          <li key={book.title} className={styles.book}>
            <details className={styles.details}>
              <summary className={styles.summary}>
                <h2 className={styles.title}>
                  {book.title} {book.titleEN ? `(${book.titleEN})` : null}
                </h2>
                <span className={styles.author}>By {book.author}</span>
              </summary>
              {/* Mouse-only shortcut: keyboard and assistive tech close the book with the summary, which stays the real control. */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div className={styles.review} onClick={closeOnContentClick}>
                <p className={styles.readTime}>Read in {book.readTime}</p>
                <p>{book.review}</p>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  )
}
