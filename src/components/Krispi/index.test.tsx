import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Krispi } from '.'

describe('Krispi', () => {
	it('is hidden from screen readers', () => {
		const { container } = render(<Krispi />)

		expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
	})

	it('has no hands when idle', () => {
		const { container } = render(<Krispi />)

		expect(container.querySelector('[class*="krispi__hand"]')).not.toBeInTheDocument()
	})

	it('grips the edge with a hand on each side when peeking', () => {
		const { container } = render(<Krispi pose="peek" />)

		expect(container.querySelector('[class*="krispi__hand--left"]')).toBeInTheDocument()
		expect(container.querySelector('[class*="krispi__hand--right"]')).toBeInTheDocument()
	})

	it('asks a question in its speech bubble', () => {
		const { getByText } = render(<Krispi />)

		expect(getByText('Learned anything new?')).toBeInTheDocument()
	})

	it('keeps the class a placement passes in', () => {
		const { container } = render(<Krispi className="placement" />)

		expect(container.firstElementChild).toHaveClass('placement')
	})
})
