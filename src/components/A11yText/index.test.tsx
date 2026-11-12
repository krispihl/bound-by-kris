import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { A11yText } from '.'

describe('A11yText', () => {
	it('shows "a11y" but is named "accessibility"', () => {
		render(
			<a href="/bites">
				<A11yText /> bites
			</a>
		)

		expect(screen.getByRole('link', { name: 'accessibility bites' })).toBeInTheDocument()
		expect(screen.getByText('a11y')).toBeVisible()
	})
})
