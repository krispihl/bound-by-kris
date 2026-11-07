import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from '.'

describe('Spinner', () => {
	it('is hidden from screen readers, which are told about the loading elsewhere', () => {
		const { container } = render(<Spinner />)

		expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
		expect(screen.queryByRole('status')).not.toBeInTheDocument()
	})
})
