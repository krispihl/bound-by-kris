import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from '.'

describe('Spinner', () => {
	it('is a status announced by its label', () => {
		render(<Spinner label="Loading the games…" />)

		expect(screen.getByRole('status')).toHaveTextContent('Loading the games…')
	})

	it('hides the drawn ring from screen readers', () => {
		render(<Spinner label="Loading" />)

		expect(screen.getByRole('status').firstElementChild).toHaveAttribute('aria-hidden', 'true')
	})
})
