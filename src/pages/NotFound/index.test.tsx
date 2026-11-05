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
})
