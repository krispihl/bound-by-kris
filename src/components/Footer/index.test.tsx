import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { Footer } from '.'

const renderAt = (path: string) =>
	render(
		<MemoryRouter initialEntries={[path]}>
			<Footer />
		</MemoryRouter>
	)

describe('Footer', () => {
	it('links back to the homepage from other pages', () => {
		renderAt('/about')

		expect(screen.getByRole('link', { name: 'Back to home page' })).toHaveAttribute('href', '/')
		expect(screen.queryByRole('navigation', { name: 'Social profiles' })).not.toBeInTheDocument()
	})

	it('has the social profiles instead on the homepage', () => {
		renderAt('/')

		const social = screen.getByRole('navigation', { name: 'Social profiles' })
		expect(within(social).getByRole('link', { name: /GitHub/ })).toBeInTheDocument()
		expect(within(social).getByRole('link', { name: /LinkedIn/ })).toBeInTheDocument()
		expect(screen.queryByRole('link', { name: 'Back to home page' })).not.toBeInTheDocument()
	})

	it('is the page footer landmark', () => {
		renderAt('/')

		expect(screen.getByRole('contentinfo')).toBeInTheDocument()
	})
})
