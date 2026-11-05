import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Krispi } from '.'

afterEach(() => {
	localStorage.clear()
	vi.restoreAllMocks()
})

describe('Krispi', () => {
	it('hides the drawing from screen readers, leaving only the button that hides Krispi', () => {
		const { container } = render(<Krispi pose="peek" />)

		const parts = Array.from(container.firstElementChild?.children ?? []).filter((part) => !part.querySelector('button'))
		expect(parts.length).toBeGreaterThan(0)
		parts.forEach((part) => expect(part).toHaveAttribute('aria-hidden', 'true'))
		expect(screen.getByRole('button', { name: 'Hide the Krispi mascot' })).toBeInTheDocument()
	})

	it('bursts apart when dismissed, then goes away and stays away', async () => {
		const user = userEvent.setup()
		const { container, unmount } = render(<Krispi />)

		await user.click(screen.getByRole('button', { name: 'Hide the Krispi mascot' }))
		expect(container.firstElementChild?.className).toContain('krispi--leaving')

		await waitFor(() => expect(container).toBeEmptyDOMElement(), { timeout: 2000 })

		unmount()
		const { container: again } = render(<Krispi />)
		expect(again).toBeEmptyDOMElement()
	})

	it('goes at once, without the burst, when the visitor prefers reduced motion', async () => {
		const matchMedia = window.matchMedia
		vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({ ...matchMedia(query), matches: true }))
		const user = userEvent.setup()
		const { container } = render(<Krispi />)

		await user.click(screen.getByRole('button', { name: 'Hide the Krispi mascot' }))
		expect(container).toBeEmptyDOMElement()
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
