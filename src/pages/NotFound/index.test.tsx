import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NotFound } from '.'

describe('NotFound', () => {
	it('says the page was not found in its heading', () => {
		render(<NotFound />)

		expect(screen.getByRole('heading', { level: 1, name: /^Page not found\./ })).toBeInTheDocument()
	})

	it('greets the wanderer with the quote', () => {
		render(<NotFound />)

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not all those who wander are lost. But you seem to be.')
	})

	it('names the page in the document title', () => {
		render(<NotFound />)

		expect(document.title).toBe('Page not found – Kristina Pihl')
	})

	it('asks search engines not to index it, only while it is shown', () => {
		const { unmount } = render(<NotFound />)

		expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex')

		unmount()

		expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
	})
})
