import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { BOOKS } from '../../data/books'

import { Books } from '.'

describe('Books', () => {
	it('lists every book as a closed heading button with its title and author', () => {
		render(<Books />)

		expect(screen.getByRole('heading', { level: 1, name: 'Books' })).toBeInTheDocument()
		expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(BOOKS.length)
		expect(screen.getByRole('button', { name: 'Atomic Habits By James Clear' })).toHaveAttribute('aria-expanded', 'false')
		expect(screen.queryByText(/I have now read this book three times/)).not.toBeVisible()
	})

	it('opens a book on activation to reveal its review', async () => {
		const user = userEvent.setup()
		render(<Books />)

		const toggle = screen.getByRole('button', { name: /Atomic Habits/ })
		await user.click(toggle)

		expect(toggle).toHaveAttribute('aria-expanded', 'true')
		expect(screen.getByText(/I have now read this book three times/)).toBeVisible()
	})

	it('closes an open book when its content is clicked', async () => {
		const user = userEvent.setup()
		render(<Books />)

		const toggle = screen.getByRole('button', { name: /Atomic Habits/ })
		await user.click(toggle)
		await user.click(screen.getByText(/I have now read this book three times/))

		expect(toggle).toHaveAttribute('aria-expanded', 'false')
	})

	it('marks an Estonian title with its language, but not the English translation after it', () => {
		render(<Books />)

		const title = screen.getByText('Hõbedamängiga mees')

		expect(title).toHaveAttribute('lang', 'et')
		expect(title.parentElement).toHaveTextContent('Hõbedamängiga mees (The Hallmarked Man)')
		expect(screen.getByText('Atomic Habits')).not.toHaveAttribute('lang')
	})
})
