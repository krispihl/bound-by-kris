import { BOOKS } from '../../data/books'

export const Books = () => {
  return (
    <div className="container">
      <h1 className="title">Books</h1>
      <p className="subtitle">My book journey starts here.</p>
      <div className="lexicon-container">
        {BOOKS.map((book, index) => (
          <div key={index} className="book-card">
            <h2>
              {book.title} {book.titleEN && `(${book.titleEN})`}
            </h2>
            <h3>
              By {book.author} — <small>{book.readTime}</small>
            </h3>
            <p>{book.review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
