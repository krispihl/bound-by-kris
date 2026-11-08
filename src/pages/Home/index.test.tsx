import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Home } from '.'

describe('Home', () => {
	it('shows the full name as the page heading and an introduction', () => {
		render(<Home />)

		expect(screen.getByRole('heading', { level: 1, name: 'Kristina Pihl' })).toBeInTheDocument()
		expect(screen.getByText('Kristina Pihl')).toHaveAttribute('lang', 'et')
		expect(screen.getByText(/Frontend developer passionate about accessibility.*A bit serious. A bit fun./)).toBeInTheDocument()
	})

	it('moves the glow to the pointer without changing the heading name', async () => {
		const user = userEvent.setup()
		render(<Home />)

		const name = screen.getByRole('heading', { level: 1, name: 'Kristina Pihl' })
		// jsdom has no layout, so the heading is given a position for the pointer to be measured from.
		vi.spyOn(name, 'getBoundingClientRect').mockReturnValue(new DOMRect(100, 30, 800, 300))
		await user.pointer({ target: name, coords: { clientX: 120, clientY: 40 } })

		expect(name.style.getPropertyValue('--glow-x')).toBe('20px')
		expect(name.style.getPropertyValue('--glow-y')).toBe('10px')
	})

	it('hides the drawn letters from screen readers, so the name is read once', () => {
		render(<Home />)

		const name = screen.getByRole('heading', { level: 1 })
		const readable = Array.from(name.children).filter((child) => child.getAttribute('aria-hidden') !== 'true')

		expect(readable).toHaveLength(1)
		expect(readable[0]).toHaveTextContent('Kristina Pihl')
	})
})
