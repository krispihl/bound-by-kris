import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Home } from '.'

describe('Home', () => {
	it('shows the full name as the page heading and an introduction', () => {
		render(<Home />)

		expect(screen.getByRole('heading', { level: 1, name: 'Kristina Pihl' })).toBeInTheDocument()
		expect(screen.getByText('Kristina Pihl')).toHaveAttribute('lang', 'et')
		expect(screen.getByText(/Frontend developer passionate about accessibility/)).toBeInTheDocument()
	})

	it('moves the glow to the pointer without changing the heading name', async () => {
		const user = userEvent.setup()
		render(<Home />)

		const name = screen.getByRole('heading', { level: 1, name: 'Kristina Pihl' })
		await user.pointer({ target: name, coords: { clientX: 120, clientY: 40 } })

		expect(name.style.getPropertyValue('--glow-x')).toBe('120px')
		expect(name.style.getPropertyValue('--glow-y')).toBe('40px')
	})
})
