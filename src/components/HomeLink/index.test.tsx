import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { HomeLink } from '.'

const renderAt = (path: string) =>
	render(
		<MemoryRouter initialEntries={[path]}>
			<HomeLink />
		</MemoryRouter>
	)

describe('HomeLink', () => {
	it('links back to the homepage from other pages', () => {
		renderAt('/about')

		expect(screen.getByRole('link', { name: 'Home page' })).toHaveAttribute('href', '/')
	})

	it('is not shown on the homepage', () => {
		renderAt('/')

		expect(screen.queryByRole('link', { name: 'Home page' })).not.toBeInTheDocument()
	})
})
