import { BOOKS } from '../../data/books'

import styles from './index.module.css'

export const Books = () => {
  return (
    <div className="container">
      <h1 className="title">Books</h1>
      <p className="subtitle">My book journey starts here.</p>
      <ul className={styles.list}>
        {BOOKS.map((book) => (
          <li key={book.title}>
            <article className={styles.book}>
              <h2>
                {book.title} {book.titleEN ? `(${book.titleEN})` : null}
              </h2>
              <h3>
                By {book.author} — <small>{book.readTime}</small>
              </h3>
              <p>{book.review}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
