import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { About } from '.'

describe('About', () => {
	it('renders the page heading', () => {
		render(<About />)

		expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
	})
})
