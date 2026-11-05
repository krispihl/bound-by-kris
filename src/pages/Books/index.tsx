import { useState } from 'react'

import { PageHeading } from '../../components/PageHeading'
import type { Book } from '../../data/books'
import { BOOKS } from '../../data/books'
import { usePageTitle } from '../../hooks/usePageTitle'

import styles from './index.module.css'

// A heading with a button in it, like the a11y bites, rather than <details>: a heading inside <summary> isn't
// reliably exposed as one, so heading navigation would skip every book.
const BookEntry = ({ book, index }: { book: Book; index: number }) => {
	const [isOpen, setIsOpen] = useState(false)
	const reviewId = `book-${index}-review`

	// Lets a click on the opened content close its book, unless the reader is selecting text.
	const closeOnContentClick = () => {
		if (!window.getSelection()?.toString()) {
			setIsOpen(false)
		}
	}

	return (
		<li className={`${styles.book}${isOpen ? ` ${styles['book--open']}` : ''}`}>
			<h2 className={styles.heading}>
				<button
					type="button"
					className={styles.toggle}
					aria-expanded={isOpen}
					aria-controls={reviewId}
					onClick={() => setIsOpen((open) => !open)}
				>
					<span className={styles.title}>
						<span lang={book.titleLang}>{book.title}</span>
						{book.titleEN ? ` (${book.titleEN})` : null}
					</span>
					{/* Keeps the title and author apart in the button's name; the grid doesn't show it. */}{' '}
					<span className={styles.author}>By {book.author}</span>
				</button>
			</h2>
			{/* Mouse-only shortcut: keyboard and assistive tech close the book with its title button, which stays the real control. */}
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
			<div id={reviewId} className={styles.review} hidden={!isOpen} onClick={closeOnContentClick}>
				<p className={styles.readTime}>Read in {book.readTime}</p>
				<p>{book.review}</p>
			</div>
		</li>
	)
}

export const Books = () => {
	usePageTitle('Books')

	return (
		<div className={styles.page}>
			<header className={styles.page__header}>
				<PageHeading className={styles.page__title}>Books</PageHeading>
				<p className={styles.page__intro}>My book journey starts here.</p>
			</header>

			<ul className={styles.list}>
				{BOOKS.map((book, index) => (
					<BookEntry key={book.title} book={book} index={index} />
				))}
			</ul>
		</div>
	)
}
