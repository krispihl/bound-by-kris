import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { Krispi } from '.'

afterEach(() => {
	localStorage.clear()
})

describe('Krispi', () => {
	it('hides the drawing from screen readers, leaving only the button that hides Krispi', () => {
		const { container } = render(<Krispi pose="peek" />)

		const parts = Array.from(container.firstElementChild?.children ?? []).filter((part) => !part.querySelector('button'))
		expect(parts.length).toBeGreaterThan(0)
		parts.forEach((part) => expect(part).toHaveAttribute('aria-hidden', 'true'))
		expect(screen.getByRole('button', { name: 'Hide the Krispi mascot' })).toBeInTheDocument()
	})

	it('goes away when dismissed, and stays away after that', async () => {
		const user = userEvent.setup()
		const { container, unmount } = render(<Krispi />)

		await user.click(screen.getByRole('button', { name: 'Hide the Krispi mascot' }))
		expect(container).toBeEmptyDOMElement()

		unmount()
		const { container: again } = render(<Krispi />)
		expect(again).toBeEmptyDOMElement()
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

	it('glances up between blinks only when asked to', () => {
		const { container, rerender } = render(<Krispi />)
		expect(container.firstElementChild?.className).not.toContain('krispi--glance')

		rerender(<Krispi glances />)
		expect(container.firstElementChild?.className).toContain('krispi--glance')
	})

	it('keeps the class a placement passes in', () => {
		const { container } = render(<Krispi className="placement" />)

		expect(container.firstElementChild).toHaveClass('placement')
	})
})
